import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RouteFilters, defaultFilters } from '@/types/routes';

interface ActiveFilterChipsProps {
  filters: RouteFilters;
  onRemoveFilter: (key: keyof RouteFilters, value?: string) => void;
  onClearAll: () => void;
}

const labelMap: Record<string, string> = {
  // Difficulty
  easy: 'Easy',
  moderate: 'Moderate',
  hard: 'Hard',
  expert: 'Expert',
  // Route Type
  'loop': 'Loop',
  'out-and-back': 'Out & Back',
  'point-to-point': 'Point to Point',
  // Highlights
  'lakes': 'Lakes',
  'rivers': 'Rivers',
  'waterfalls': 'Waterfalls',
  'coastline': 'Coastline',
  'ruins': 'Ruins',
  'historical-sites': 'Historical Sites',
  // Features
  'via-ferrata': 'Via Ferrata',
  'climbing': 'Climbing',
  'canyoning': 'Canyoning',
  'ridges': 'Ridges',
  'mountain-passes': 'Mountain Passes',
  'avoid-main-roads': 'Avoid Main Roads',
  // Facilities
  'restaurants': 'Restaurants',
  'mountain-huts': 'Mountain Huts',
};

const ActiveFilterChips = ({ filters, onRemoveFilter, onClearAll }: ActiveFilterChipsProps) => {
  const chips: { key: keyof RouteFilters; value: string; label: string }[] = [];

  // Array filters
  (['difficulty', 'technicalDifficulty', 'highlights', 'features', 'facilities', 'routeType'] as const).forEach((key) => {
    filters[key].forEach((value) => {
      chips.push({
        key,
        value,
        label: labelMap[value] || value.toUpperCase(),
      });
    });
  });

  // Range filters - only show if changed from default
  if (
    filters.distanceRange[0] !== defaultFilters.distanceRange[0] ||
    filters.distanceRange[1] !== defaultFilters.distanceRange[1]
  ) {
    chips.push({
      key: 'distanceRange',
      value: 'range',
      label: `${filters.distanceRange[0]}-${filters.distanceRange[1]} km`,
    });
  }

  if (
    filters.durationRange[0] !== defaultFilters.durationRange[0] ||
    filters.durationRange[1] !== defaultFilters.durationRange[1]
  ) {
    chips.push({
      key: 'durationRange',
      value: 'range',
      label: `${filters.durationRange[0]}-${filters.durationRange[1]} hrs`,
    });
  }

  if (
    filters.elevationRange[0] !== defaultFilters.elevationRange[0] ||
    filters.elevationRange[1] !== defaultFilters.elevationRange[1]
  ) {
    chips.push({
      key: 'elevationRange',
      value: 'range',
      label: `${filters.elevationRange[0]}-${filters.elevationRange[1]} m`,
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2" role="region" aria-label="Active filters">
      <span className="text-sm text-muted-foreground">Active filters:</span>
      {chips.map((chip, index) => (
        <Badge
          key={`${chip.key}-${chip.value}-${index}`}
          variant="secondary"
          className="pl-2 pr-1 py-1 gap-1 font-normal"
        >
          {chip.label}
          <button
            onClick={() => onRemoveFilter(chip.key, chip.value)}
            className="ml-1 hover:bg-muted rounded p-0.5 transition-colors"
            aria-label={`Remove ${chip.label} filter`}
          >
            <X className="h-3 w-3" aria-hidden="true" />
          </button>
        </Badge>
      ))}
      <Button
        variant="ghost"
        size="sm"
        onClick={onClearAll}
        className="text-muted-foreground hover:text-foreground h-7 px-2"
      >
        Clear all
      </Button>
    </div>
  );
};

export default ActiveFilterChips;
