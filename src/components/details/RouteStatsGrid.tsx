import { ArrowLeftRight, ArrowUp, ArrowDown, Mountain, Clock, Star } from 'lucide-react';

interface RouteStats {
  distance: string;
  ascent: string;
  descent: string;
  highestPoint: string;
  duration: string;
  rating: string;
}

interface RouteStatsGridProps {
  stats: RouteStats;
}

const RouteStatsGrid = ({ stats }: RouteStatsGridProps) => {
  const statItems = [
    { icon: ArrowLeftRight, label: 'Distance', value: stats.distance },
    { icon: ArrowUp, label: 'Ascent', value: stats.ascent },
    { icon: ArrowDown, label: 'Descent', value: stats.descent },
    { icon: Mountain, label: 'Highest point', value: stats.highestPoint },
    { icon: Clock, label: 'Duration', value: stats.duration },
    { icon: Star, label: 'Rating', value: stats.rating },
  ];

  return (
    <div>
      <h2 className="text-foreground text-xl font-bold mb-4">Route details</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
        {statItems.map(({ icon: Icon, label, value }) => (
          <div 
            key={label}
            className="border border-border rounded-md p-4 flex flex-col items-center justify-center text-center min-h-[100px]"
          >
            <Icon className="w-4 h-4 text-muted-foreground mb-2" aria-hidden="true" />
            <p className="text-muted-foreground text-sm font-medium mb-1">{label}</p>
            <p className="text-foreground text-lg font-semibold">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouteStatsGrid;
