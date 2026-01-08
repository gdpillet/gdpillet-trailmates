import { useState, useMemo } from 'react';
import { MapPin } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RouteSearch from '@/components/routes/RouteSearch';
import RouteSortSelect from '@/components/routes/RouteSortSelect';
import RouteFiltersPanel from '@/components/routes/RouteFiltersPanel';
import ActiveFilterChips from '@/components/routes/ActiveFilterChips';
import RouteCard from '@/components/routes/RouteCard';
import { mockRoutes } from '@/data/routes';
import { RouteFilters, SortOption, defaultFilters, HikingRoute } from '@/types/routes';

const Routes = () => {
  const [filters, setFilters] = useState<RouteFilters>(defaultFilters);
  const [sortBy, setSortBy] = useState<SortOption>('popular');

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.difficulty.length) count += filters.difficulty.length;
    if (filters.technicalDifficulty.length) count += filters.technicalDifficulty.length;
    if (filters.highlights.length) count += filters.highlights.length;
    if (filters.features.length) count += filters.features.length;
    if (filters.facilities.length) count += filters.facilities.length;
    if (filters.routeType.length) count += filters.routeType.length;
    if (
      filters.distanceRange[0] !== defaultFilters.distanceRange[0] ||
      filters.distanceRange[1] !== defaultFilters.distanceRange[1]
    ) count++;
    if (
      filters.durationRange[0] !== defaultFilters.durationRange[0] ||
      filters.durationRange[1] !== defaultFilters.durationRange[1]
    ) count++;
    if (
      filters.elevationRange[0] !== defaultFilters.elevationRange[0] ||
      filters.elevationRange[1] !== defaultFilters.elevationRange[1]
    ) count++;
    return count;
  }, [filters]);

  // Filter and sort routes
  const filteredRoutes = useMemo(() => {
    let result = [...mockRoutes];

    // Text search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (route) =>
          route.name.toLowerCase().includes(searchLower) ||
          route.location.toLowerCase().includes(searchLower) ||
          route.region.toLowerCase().includes(searchLower)
      );
    }

    // Difficulty filter
    if (filters.difficulty.length) {
      result = result.filter((route) => filters.difficulty.includes(route.difficulty));
    }

    // Technical difficulty filter
    if (filters.technicalDifficulty.length) {
      result = result.filter((route) =>
        filters.technicalDifficulty.includes(route.technicalDifficulty)
      );
    }

    // Distance range
    result = result.filter(
      (route) =>
        route.distance >= filters.distanceRange[0] &&
        route.distance <= filters.distanceRange[1]
    );

    // Duration range
    result = result.filter(
      (route) =>
        route.duration >= filters.durationRange[0] &&
        route.duration <= filters.durationRange[1]
    );

    // Elevation range
    result = result.filter(
      (route) =>
        route.elevationGain >= filters.elevationRange[0] &&
        route.elevationGain <= filters.elevationRange[1]
    );

    // Highlights filter
    if (filters.highlights.length) {
      result = result.filter((route) =>
        filters.highlights.some((h) => route.highlights.includes(h))
      );
    }

    // Features filter
    if (filters.features.length) {
      result = result.filter((route) =>
        filters.features.some((f) => route.features.includes(f))
      );
    }

    // Facilities filter
    if (filters.facilities.length) {
      result = result.filter((route) =>
        filters.facilities.some((f) => route.facilities.includes(f))
      );
    }

    // Route type filter
    if (filters.routeType.length) {
      result = result.filter((route) => filters.routeType.includes(route.routeType));
    }

    // Sorting
    const difficultyOrder = { easy: 1, moderate: 2, hard: 3, expert: 4 };
    switch (sortBy) {
      case 'popular':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'shortest-duration':
        result.sort((a, b) => a.duration - b.duration);
        break;
      case 'lowest-elevation':
        result.sort((a, b) => a.elevationGain - b.elevationGain);
        break;
      case 'highest-difficulty':
        result.sort((a, b) => difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty]);
        break;
    }

    return result;
  }, [filters, sortBy]);

  // Handle removing individual filters
  const handleRemoveFilter = (key: keyof RouteFilters, value?: string) => {
    if (key === 'distanceRange') {
      setFilters((prev) => ({ ...prev, distanceRange: defaultFilters.distanceRange }));
    } else if (key === 'durationRange') {
      setFilters((prev) => ({ ...prev, durationRange: defaultFilters.durationRange }));
    } else if (key === 'elevationRange') {
      setFilters((prev) => ({ ...prev, elevationRange: defaultFilters.elevationRange }));
    } else if (value) {
      const currentArray = filters[key] as string[];
      setFilters((prev) => ({
        ...prev,
        [key]: currentArray.filter((v) => v !== value),
      }));
    }
  };

  const handleClearAllFilters = () => {
    setFilters(defaultFilters);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1" id="main-content">
        {/* Hero Section */}
        <section className="bg-secondary/30 py-10 md:py-16" aria-labelledby="routes-heading">
          <div className="section-container">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Discover Routes
              </div>
              <h1 id="routes-heading" className="heading-lg text-foreground mb-3">
                Find your perfect trail
              </h1>
              <p className="text-muted-foreground">
                Explore our curated collection of hiking routes across Europe. Filter by difficulty, duration, and features to find your ideal adventure.
              </p>
            </div>

            {/* Search and Sort Row */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-3xl mx-auto">
              <RouteSearch
                value={filters.search}
                onChange={(search) => setFilters((prev) => ({ ...prev, search }))}
              />
              <RouteSortSelect value={sortBy} onChange={setSortBy} />
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="section-container py-8 md:py-12">
          <div className="flex gap-8">
            {/* Filters Panel */}
            <RouteFiltersPanel
              filters={filters}
              onChange={setFilters}
              activeFilterCount={activeFilterCount}
            />

            {/* Routes Grid */}
            <div className="flex-1 min-w-0">
              {/* Active Filters & Results Count */}
              <div className="mb-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">{filteredRoutes.length}</span>{' '}
                    {filteredRoutes.length === 1 ? 'route' : 'routes'} found
                  </p>
                </div>
                <ActiveFilterChips
                  filters={filters}
                  onRemoveFilter={handleRemoveFilter}
                  onClearAll={handleClearAllFilters}
                />
              </div>

              {/* Routes Grid */}
              {filteredRoutes.length > 0 ? (
                <div
                  className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6"
                  role="list"
                  aria-label="Hiking routes"
                >
                  {filteredRoutes.map((route) => (
                    <div key={route.id} role="listitem">
                      <RouteCard route={route} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">No routes found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search term to find more routes.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Routes;
