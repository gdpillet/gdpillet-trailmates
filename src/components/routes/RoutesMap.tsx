import { useEffect, useMemo, useState, lazy, Suspense } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { HikingRoute } from '@/types/routes';
import { Skeleton } from '@/components/ui/skeleton';

// Fix for default Leaflet markers not showing
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface RoutesMapProps {
  routes: HikingRoute[];
  onRouteClick?: (route: HikingRoute) => void;
  userLocation?: [number, number] | null;
  className?: string;
}

// Lazy load the actual map implementation
const LazyMapContent = lazy(() => import('./RoutesMapContent'));

function RoutesMap({ routes, onRouteClick, userLocation, className = '' }: RoutesMapProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const routesWithCoords = useMemo(() => 
    routes.filter(r => r.coordinates), 
    [routes]
  );

  const defaultCenter: [number, number] = useMemo(() => {
    if (userLocation) return userLocation;
    if (routesWithCoords.length > 0 && routesWithCoords[0].coordinates) {
      return routesWithCoords[0].coordinates;
    }
    return [46.5, 9.5]; // Central Alps
  }, [routesWithCoords, userLocation]);

  if (!isClient) {
    return (
      <div className={`rounded-xl overflow-hidden border border-border shadow-lg ${className}`}>
        <Skeleton className="h-full w-full min-h-[280px]" />
      </div>
    );
  }

  return (
    <div className={`rounded-xl overflow-hidden border border-border shadow-lg ${className}`}>
      <Suspense fallback={<Skeleton className="h-full w-full min-h-[280px]" />}>
        <LazyMapContent
          routes={routesWithCoords}
          defaultCenter={defaultCenter}
          userLocation={userLocation}
          onRouteClick={onRouteClick}
        />
      </Suspense>
    </div>
  );
}

export default RoutesMap;