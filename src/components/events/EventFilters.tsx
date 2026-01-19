import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, ChevronDown } from "lucide-react";

interface EventFiltersProps {
  location: string;
  activity: string;
  onLocationChange: (value: string) => void;
  onActivityChange: (value: string) => void;
}

const locations = [
  { value: "all", label: "All locations" },
  { value: "munich", label: "Munich" },
  { value: "zurich", label: "Zurich" },
  { value: "geneva", label: "Geneva" },
  { value: "vienna", label: "Vienna" },
];

const activities = [
  { value: "all", label: "All activities" },
  { value: "hiking", label: "Hiking" },
  { value: "cycling", label: "Cycling" },
  { value: "ski-touring", label: "Ski Touring" },
  { value: "bouldering", label: "Bouldering" },
  { value: "social", label: "Social" },
];

const EventFilters = ({
  location,
  activity,
  onLocationChange,
  onActivityChange,
}: EventFiltersProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-border">
      <Button
        variant="secondary"
        size="sm"
        className="bg-secondary text-foreground font-medium"
      >
        Upcoming events
      </Button>
      
      <Select value={location} onValueChange={onLocationChange}>
        <SelectTrigger className="w-auto min-w-[140px] border-0 bg-transparent hover:bg-secondary gap-2">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <SelectValue placeholder="From location" />
        </SelectTrigger>
        <SelectContent>
          {locations.map((loc) => (
            <SelectItem key={loc.value} value={loc.value}>
              {loc.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={activity} onValueChange={onActivityChange}>
        <SelectTrigger className="w-auto min-w-[140px] border-0 bg-transparent hover:bg-secondary gap-2">
          <SelectValue placeholder="All activities" />
        </SelectTrigger>
        <SelectContent>
          {activities.map((act) => (
            <SelectItem key={act.value} value={act.value}>
              {act.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default EventFilters;
