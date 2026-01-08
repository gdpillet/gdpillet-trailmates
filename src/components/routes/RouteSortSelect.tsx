import { ArrowUpDown, TrendingUp, Clock, Mountain, Gauge } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SortOption } from '@/types/routes';

interface RouteSortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string; icon: React.ElementType }[] = [
  { value: 'popular', label: 'Most Popular', icon: TrendingUp },
  { value: 'shortest-duration', label: 'Shortest Duration', icon: Clock },
  { value: 'lowest-elevation', label: 'Lowest Elevation', icon: Mountain },
  { value: 'highest-difficulty', label: 'Highest Difficulty', icon: Gauge },
];

const RouteSortSelect = ({ value, onChange }: RouteSortSelectProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger 
        className="w-[200px] h-11" 
        aria-label="Sort routes"
      >
        <ArrowUpDown className="h-4 w-4 mr-2" aria-hidden="true" />
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => {
          const Icon = option.icon;
          return (
            <SelectItem key={option.value} value={option.value}>
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span>{option.label}</span>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default RouteSortSelect;
