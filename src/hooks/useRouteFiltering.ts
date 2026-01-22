import { useState, useMemo } from 'react';
import { mockRoutes } from '@/data/routes';
import { RouteFilters, SortOption, defaultFilters, HikingRoute } from '@/types/routes';

export function useRouteFiltering() {
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

  return {
    filters,
    setFilters,
    sortBy,
    setSortBy,
    activeFilterCount,
    filteredRoutes,
    handleRemoveFilter,
    handleClearAllFilters,
  };
}
