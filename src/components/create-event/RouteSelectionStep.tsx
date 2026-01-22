import { useState } from 'react';
import { MapPin, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import RouteSearch from '@/components/routes/RouteSearch';
import RouteSortSelect from '@/components/routes/RouteSortSelect';
import RouteFiltersPanel from '@/components/routes/RouteFiltersPanel';
import ActiveFilterChips from '@/components/routes/ActiveFilterChips';
import RouteCard from '@/components/routes/RouteCard';
import { useRouteFiltering } from '@/hooks/useRouteFiltering';
import { HikingRoute } from '@/types/routes';
import { cn } from '@/lib/utils';

interface RouteSelectionStepProps {
  selectedRouteId: string | null;
  onSelectRoute: (routeId: string) => void;
  onContinue: () => void;
}

export function RouteSelectionStep({ selectedRouteId, onSelectRoute, onContinue }: RouteSelectionStepProps) {
  const {
    filters,
    setFilters,
    sortBy,
    setSortBy,
    activeFilterCount,
    filteredRoutes,
    handleRemoveFilter,
    handleClearAllFilters,
  } = useRouteFiltering();

  const selectedRoute = filteredRoutes.find((r) => r.id === selectedRouteId);

  const handleRouteClick = (route: HikingRoute) => {
    onSelectRoute(route.id);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="text-center px-4 pt-4 pb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Pick a route for your group</h2>
        <p className="text-muted-foreground">
          Find the perfect trail that matches your crew's vibe ✨
        </p>
      </div>

      {/* Search and Sort Row */}
      <div className="px-4 pb-4">
        <div className="flex flex-col sm:flex-row gap-3 max-w-3xl mx-auto">
          <RouteSearch
            value={filters.search}
            onChange={(search) => setFilters((prev) => ({ ...prev, search }))}
          />
          <RouteSortSelect value={sortBy} onChange={setSortBy} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="flex gap-6 lg:gap-8 h-full max-h-[calc(100vh-320px)] px-4 lg:px-6">
          {/* Filters Panel - Desktop only */}
          <div className="hidden lg:block shrink-0">
            <ScrollArea className="h-full">
              <RouteFiltersPanel
                filters={filters}
                onChange={setFilters}
                activeFilterCount={activeFilterCount}
              />
            </ScrollArea>
          </div>

          {/* Routes Grid */}
          <div className="flex-1 min-w-0 flex flex-col">
            {/* Mobile Filters + Results Count */}
            <div className="mb-4 space-y-3">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">{filteredRoutes.length}</span>{' '}
                  {filteredRoutes.length === 1 ? 'route' : 'routes'} found
                </p>
                {/* Mobile filter button */}
                <div className="lg:hidden">
                  <RouteFiltersPanel
                    filters={filters}
                    onChange={setFilters}
                    activeFilterCount={activeFilterCount}
                  />
                </div>
              </div>
              <ActiveFilterChips
                filters={filters}
                onRemoveFilter={handleRemoveFilter}
                onClearAll={handleClearAllFilters}
              />
            </div>

            {/* Scrollable Grid */}
            <ScrollArea className="flex-1">
              {filteredRoutes.length > 0 ? (
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 pb-4 pr-4"
                  role="list"
                  aria-label="Available routes"
                >
                  {filteredRoutes.map((route) => (
                    <div key={route.id} role="listitem" className="relative">
                      {/* Selection indicator */}
                      {selectedRouteId === route.id && (
                        <div className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg">
                          <Check className="w-5 h-5 text-primary-foreground" />
                        </div>
                      )}
                      <div
                        className={cn(
                          'rounded-2xl transition-all',
                          selectedRouteId === route.id && 'ring-2 ring-primary ring-offset-2'
                        )}
                      >
                        <RouteCard
                          route={route}
                          onClick={() => handleRouteClick(route)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">No routes found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters to find more routes.
                  </p>
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </div>

      {/* Footer with CTA */}
      <div className="px-4 py-4 border-t border-border bg-background mt-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-3xl mx-auto">
          {selectedRoute ? (
            <p className="text-sm text-muted-foreground">
              Selected: <span className="font-medium text-foreground">{selectedRoute.name}</span>
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Select a route or continue without one
            </p>
          )}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onContinue}>
              Skip for now
            </Button>
            <Button onClick={onContinue} disabled={!selectedRouteId}>
              Continue with route
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
