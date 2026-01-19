import {
  MapPin,
  Star,
  Clock,
  Mountain,
  Route,
  Users,
  ChevronRight,
  Waves,
  Droplets,
  Landmark,
  Building,
  Home,
  Navigation,
  RotateCw,
  ArrowLeftRight,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { HikingRoute, Difficulty, RouteType } from '@/types/routes';

interface RouteCardProps {
  route: HikingRoute;
  onClick?: () => void;
}

const difficultyConfig: Record<Difficulty, { label: string; className: string }> = {
  easy: { label: 'Easy', className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' },
  moderate: { label: 'Moderate', className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
  hard: { label: 'Hard', className: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' },
  expert: { label: 'Expert', className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
};

const routeTypeConfig: Record<RouteType, { label: string; icon: React.ElementType }> = {
  loop: { label: 'Loop', icon: RotateCw },
  'out-and-back': { label: 'Out & Back', icon: ArrowLeftRight },
  'point-to-point': { label: 'Point to Point', icon: Navigation },
};

const highlightIcons: Record<string, React.ElementType> = {
  lakes: Waves,
  rivers: Droplets,
  waterfalls: Droplets,
  coastline: Waves,
  ruins: Landmark,
  'historical-sites': Landmark,
};

const facilityIcons: Record<string, React.ElementType> = {
  restaurants: Building,
  'mountain-huts': Home,
};

const RouteCard = ({ route, onClick }: RouteCardProps) => {
  const difficulty = difficultyConfig[route.difficulty];
  const routeType = routeTypeConfig[route.routeType];
  const RouteTypeIcon = routeType.icon;

  const handleClick = () => {
    onClick?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <article
      className="group bg-card rounded-2xl overflow-hidden border border-border card-hover cursor-pointer focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
      tabIndex={0}
      role="button"
      aria-label={`View details for ${route.name}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={route.image}
          alt={`${route.name} hiking trail`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Difficulty Badge */}
        <div className="absolute top-3 left-3">
          <Badge className={`${difficulty.className} border-0 font-medium`}>
            {difficulty.label}
          </Badge>
        </div>

        {/* Technical Grade */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-card/90 backdrop-blur-sm text-xs font-semibold text-foreground">
          {route.technicalDifficulty}
        </div>

        {/* Route Type */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-card/90 backdrop-blur-sm text-xs font-medium text-foreground">
          <RouteTypeIcon className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{routeType.label}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 space-y-3">
        {/* Title & Location */}
        <div>
          <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {route.name}
          </h3>
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm mt-1">
            <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="line-clamp-1">{route.location}</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 py-2 border-y border-border">
          <div className="flex flex-col items-center text-center">
            <Route className="h-4 w-4 text-muted-foreground mb-1" aria-hidden="true" />
            <span className="text-sm font-medium text-foreground">{route.distance} km</span>
            <span className="text-xs text-muted-foreground">Distance</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Clock className="h-4 w-4 text-muted-foreground mb-1" aria-hidden="true" />
            <span className="text-sm font-medium text-foreground">{route.duration}h</span>
            <span className="text-xs text-muted-foreground">Duration</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Mountain className="h-4 w-4 text-muted-foreground mb-1" aria-hidden="true" />
            <span className="text-sm font-medium text-foreground">{route.elevationGain}m</span>
            <span className="text-xs text-muted-foreground">Elevation</span>
          </div>
        </div>

        {/* Highlights & Facilities Icons */}
        <div className="flex items-center gap-2 flex-wrap">
          {route.highlights.slice(0, 3).map((highlight) => {
            const Icon = highlightIcons[highlight];
            return Icon ? (
              <span
                key={highlight}
                className="p-1.5 rounded-md bg-accent"
                title={highlight.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
              >
                <Icon className="h-3.5 w-3.5 text-accent-foreground" aria-hidden="true" />
              </span>
            ) : null;
          })}
          {route.facilities.map((facility) => {
            const Icon = facilityIcons[facility];
            return Icon ? (
              <span
                key={facility}
                className="p-1.5 rounded-md bg-muted"
                title={facility.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
              >
                <Icon className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
              </span>
            ) : null;
          })}
        </div>

        {/* Rating & Reviews */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" aria-hidden="true" />
            <span className="font-semibold text-foreground">{route.rating}</span>
            <span className="text-muted-foreground text-sm flex items-center gap-1">
              <Users className="w-3.5 h-3.5" aria-hidden="true" />
              {route.reviewCount}
            </span>
          </div>
          <ChevronRight 
            className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" 
            aria-hidden="true"
          />
        </div>
      </div>
    </article>
  );
};

export default RouteCard;
