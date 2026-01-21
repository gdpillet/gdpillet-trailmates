import { useState } from 'react';
import {
  Gauge,
  Mountain,
  Clock,
  Route,
  Sparkles,
  Compass,
  Home,
  RotateCw,
  ChevronDown,
  Filter,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  RouteFilters,
  Difficulty,
  TechnicalDifficulty,
  Highlight,
  RouteFeature,
  Facility,
  RouteType,
  defaultFilters,
} from '@/types/routes';
import { useIsMobile } from '@/hooks/use-mobile';

interface RouteFiltersPanelProps {
  filters: RouteFilters;
  onChange: (filters: RouteFilters) => void;
  activeFilterCount: number;
}

interface FilterSectionProps {
  title: string;
  icon: React.ElementType;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

const FilterSection = ({ title, icon: Icon, defaultOpen = false, children }: FilterSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <button
          className="flex items-center justify-between w-full p-3 text-left hover:bg-muted/50 rounded-lg transition-colors group"
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <span className="font-medium text-sm">{title}</span>
          </div>
          <ChevronDown
            className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="px-3 pb-3 space-y-2">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

const difficulties: { value: Difficulty; label: string }[] = [
  { value: 'easy', label: 'Easy' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'hard', label: 'Hard' },
  { value: 'expert', label: 'Expert' },
];

const technicalGrades: TechnicalDifficulty[] = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'];

const highlights: { value: Highlight; label: string }[] = [
  { value: 'lakes', label: 'Lakes' },
  { value: 'rivers', label: 'Rivers' },
  { value: 'waterfalls', label: 'Waterfalls' },
  { value: 'coastline', label: 'Coastline' },
  { value: 'ruins', label: 'Ruins' },
  { value: 'historical-sites', label: 'Historical Sites' },
];

const features: { value: RouteFeature; label: string }[] = [
  { value: 'via-ferrata', label: 'Via Ferrata' },
  { value: 'climbing', label: 'Climbing' },
  { value: 'canyoning', label: 'Canyoning' },
  { value: 'ridges', label: 'Ridges' },
  { value: 'mountain-passes', label: 'Mountain Passes' },
  { value: 'avoid-main-roads', label: 'Avoid Main Roads' },
];

const facilities: { value: Facility; label: string }[] = [
  { value: 'restaurants', label: 'Restaurants' },
  { value: 'mountain-huts', label: 'Mountain Huts' },
];

const routeTypes: { value: RouteType; label: string }[] = [
  { value: 'loop', label: 'Loop' },
  { value: 'out-and-back', label: 'Out & Back' },
  { value: 'point-to-point', label: 'Point to Point' },
];

const FiltersContent = ({ filters, onChange }: { filters: RouteFilters; onChange: (filters: RouteFilters) => void }) => {
  const toggleArrayFilter = <T extends string>(
    key: 'difficulty' | 'technicalDifficulty' | 'highlights' | 'features' | 'facilities' | 'routeType',
    value: T
  ) => {
    const currentArray = filters[key] as T[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((v) => v !== value)
      : [...currentArray, value];
    onChange({ ...filters, [key]: newArray });
  };

  return (
    <div className="space-y-1">
      {/* Difficulty */}
      <FilterSection title="Difficulty" icon={Gauge} defaultOpen>
        <div className="space-y-2">
          {difficulties.map((d) => (
            <div key={d.value} className="flex items-center gap-2">
              <Checkbox
                id={`difficulty-${d.value}`}
                checked={filters.difficulty.includes(d.value)}
                onCheckedChange={() => toggleArrayFilter('difficulty', d.value)}
              />
              <Label htmlFor={`difficulty-${d.value}`} className="text-sm font-normal cursor-pointer">
                {d.label}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Technical Difficulty */}
      <FilterSection title="Technical Grade (SAC)" icon={Mountain}>
        <div className="grid grid-cols-3 gap-2">
          {technicalGrades.map((grade) => (
            <button
              key={grade}
              onClick={() => toggleArrayFilter('technicalDifficulty', grade)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                filters.technicalDifficulty.includes(grade)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
              aria-pressed={filters.technicalDifficulty.includes(grade)}
            >
              {grade}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Distance Range */}
      <FilterSection title="Distance" icon={Route}>
        <div className="space-y-4 pt-2">
          <Slider
            value={filters.distanceRange}
            onValueChange={(value) => onChange({ ...filters, distanceRange: value as [number, number] })}
            min={0}
            max={50}
            step={1}
            aria-label="Distance range"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{filters.distanceRange[0]} km</span>
            <span>{filters.distanceRange[1]} km</span>
          </div>
        </div>
      </FilterSection>

      {/* Duration Range */}
      <FilterSection title="Duration" icon={Clock}>
        <div className="space-y-4 pt-2">
          <Slider
            value={filters.durationRange}
            onValueChange={(value) => onChange({ ...filters, durationRange: value as [number, number] })}
            min={0}
            max={12}
            step={0.5}
            aria-label="Duration range"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{filters.durationRange[0]}h</span>
            <span>{filters.durationRange[1]}h</span>
          </div>
        </div>
      </FilterSection>

      {/* Elevation Range */}
      <FilterSection title="Elevation Gain" icon={Mountain}>
        <div className="space-y-4 pt-2">
          <Slider
            value={filters.elevationRange}
            onValueChange={(value) => onChange({ ...filters, elevationRange: value as [number, number] })}
            min={0}
            max={3000}
            step={50}
            aria-label="Elevation range"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{filters.elevationRange[0]}m</span>
            <span>{filters.elevationRange[1]}m</span>
          </div>
        </div>
      </FilterSection>

      {/* Highlights */}
      <FilterSection title="Highlights" icon={Sparkles}>
        <div className="space-y-2">
          {highlights.map((h) => (
            <div key={h.value} className="flex items-center gap-2">
              <Checkbox
                id={`highlight-${h.value}`}
                checked={filters.highlights.includes(h.value)}
                onCheckedChange={() => toggleArrayFilter('highlights', h.value)}
              />
              <Label htmlFor={`highlight-${h.value}`} className="text-sm font-normal cursor-pointer">
                {h.label}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Route Features */}
      <FilterSection title="Route Features" icon={Compass}>
        <div className="space-y-2">
          {features.map((f) => (
            <div key={f.value} className="flex items-center gap-2">
              <Checkbox
                id={`feature-${f.value}`}
                checked={filters.features.includes(f.value)}
                onCheckedChange={() => toggleArrayFilter('features', f.value)}
              />
              <Label htmlFor={`feature-${f.value}`} className="text-sm font-normal cursor-pointer">
                {f.label}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Facilities */}
      <FilterSection title="Facilities" icon={Home}>
        <div className="space-y-2">
          {facilities.map((f) => (
            <div key={f.value} className="flex items-center gap-2">
              <Checkbox
                id={`facility-${f.value}`}
                checked={filters.facilities.includes(f.value)}
                onCheckedChange={() => toggleArrayFilter('facilities', f.value)}
              />
              <Label htmlFor={`facility-${f.value}`} className="text-sm font-normal cursor-pointer">
                {f.label}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Route Type */}
      <FilterSection title="Route Type" icon={RotateCw}>
        <div className="space-y-2">
          {routeTypes.map((t) => (
            <div key={t.value} className="flex items-center gap-2">
              <Checkbox
                id={`routetype-${t.value}`}
                checked={filters.routeType.includes(t.value)}
                onCheckedChange={() => toggleArrayFilter('routeType', t.value)}
              />
              <Label htmlFor={`routetype-${t.value}`} className="text-sm font-normal cursor-pointer">
                {t.label}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>
    </div>
  );
};

const RouteFiltersPanel = ({ filters, onChange, activeFilterCount }: RouteFiltersPanelProps) => {
  const isMobile = useIsMobile();

  const handleClearFilters = () => {
    onChange(defaultFilters);
  };

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="h-11 gap-2">
            <Filter className="h-4 w-4" aria-hidden="true" />
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-1 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[320px] p-0 z-[60]">
          <SheetHeader className="p-4 border-b">
            <div className="flex items-center justify-between">
              <SheetTitle>Filters</SheetTitle>
              {activeFilterCount > 0 && (
                <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                  Clear all
                </Button>
              )}
            </div>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-80px)]">
            <div className="p-4">
              <FiltersContent filters={filters} onChange={onChange} />
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside className="w-72 shrink-0">
      <div className="sticky top-24 bg-card border border-border rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <span className="font-semibold text-foreground">Filters</span>
          </div>
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="h-8 px-2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4 mr-1" aria-hidden="true" />
              Clear
            </Button>
          )}
        </div>
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="p-2">
            <FiltersContent filters={filters} onChange={onChange} />
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
};

export default RouteFiltersPanel;
