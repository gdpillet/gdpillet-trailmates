import { useEffect, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { HikingRoute } from '@/types/routes';
import { Badge } from '@/components/ui/badge';
import { Mountain, Clock, TrendingUp, Star } from 'lucide-react';

// Fix for default markers not showing
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom marker icon
const createCustomIcon = (difficulty: string) => {
  const colors = {
    easy: '#22c55e',
    moderate: '#f59e0b',
    hard: '#ef4444',
    expert: '#7c3aed',
  };
  const color = colors[difficulty as keyof typeof colors] || '#00AD7D';
  
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: 32px;
        height: 32px;
        background: ${color};
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 3px 10px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <svg style="transform: rotate(45deg); width: 14px; height: 14px; fill: white;" viewBox="0 0 24 24">
          <path d="M13,3L4,14H12V21L20,10H13V3Z"/>
        </svg>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

// User location icon
const userLocationIcon = L.divIcon({
  className: 'user-location-marker',
  html: `
    <div style="
      width: 20px;
      height: 20px;
      background: hsl(160, 100%, 34%);
      border-radius: 50%;
      border: 4px solid white;
      box-shadow: 0 0 0 2px hsl(160, 100%, 34%), 0 3px 10px rgba(0,0,0,0.3);
      animation: pulse 2s infinite;
    "></div>
    <style>
      @keyframes pulse {
        0% { box-shadow: 0 0 0 2px hsl(160, 100%, 34%), 0 3px 10px rgba(0,0,0,0.3); }
        50% { box-shadow: 0 0 0 6px hsla(160, 100%, 34%, 0.3), 0 3px 10px rgba(0,0,0,0.3); }
        100% { box-shadow: 0 0 0 2px hsl(160, 100%, 34%), 0 3px 10px rgba(0,0,0,0.3); }
      }
    </style>
  `,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

interface FitBoundsProps {
  routes: HikingRoute[];
  userLocation?: [number, number] | null;
}

const FitBounds = ({ routes, userLocation }: FitBoundsProps) => {
  const map = useMap();
  
  useEffect(() => {
    const points: [number, number][] = routes
      .filter(r => r.coordinates)
      .map(r => r.coordinates as [number, number]);
    
    if (userLocation) {
      points.push(userLocation);
    }
    
    if (points.length > 0) {
      const bounds = L.latLngBounds(points);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [routes, userLocation, map]);
  
  return null;
};

interface RoutesMapProps {
  routes: HikingRoute[];
  onRouteClick?: (route: HikingRoute) => void;
  userLocation?: [number, number] | null;
  className?: string;
}

const RoutesMap = ({ routes, onRouteClick, userLocation, className = '' }: RoutesMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  
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

  const difficultyLabels = {
    easy: 'Easy',
    moderate: 'Moderate',
    hard: 'Hard',
    expert: 'Expert',
  };

  return (
    <div className={`rounded-xl overflow-hidden border border-border shadow-lg ${className}`}>
      <MapContainer
        center={defaultCenter}
        zoom={5}
        className="h-full w-full"
        style={{ minHeight: '400px' }}
        ref={mapRef}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        <FitBounds routes={routesWithCoords} userLocation={userLocation} />
        
        {/* User location marker */}
        {userLocation && (
          <Marker position={userLocation} icon={userLocationIcon}>
            <Popup>
              <div className="text-center font-medium">You are here</div>
            </Popup>
          </Marker>
        )}
        
        {/* Route markers */}
        {routesWithCoords.map((route) => (
          <Marker
            key={route.id}
            position={route.coordinates!}
            icon={createCustomIcon(route.difficulty)}
            eventHandlers={{
              click: () => onRouteClick?.(route),
            }}
          >
            <Popup>
              <div className="min-w-[200px]">
                <div className="relative h-24 -mx-3 -mt-3 mb-3 overflow-hidden">
                  <img 
                    src={route.image} 
                    alt={route.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge 
                    className="absolute top-2 right-2 text-xs"
                    variant={route.difficulty === 'easy' ? 'secondary' : 'default'}
                  >
                    {difficultyLabels[route.difficulty]}
                  </Badge>
                </div>
                <h3 className="font-semibold text-foreground mb-1">{route.name}</h3>
                <p className="text-xs text-muted-foreground mb-3">{route.location}</p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Mountain className="h-3 w-3" />
                    <span>{route.distance}km</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{route.duration}h</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <TrendingUp className="h-3 w-3" />
                    <span>{route.elevationGain}m</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2 pt-2 border-t border-border">
                  <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-medium">{route.rating}</span>
                  <span className="text-xs text-muted-foreground">({route.reviewCount})</span>
                </div>
                <button 
                  onClick={() => onRouteClick?.(route)}
                  className="w-full mt-3 py-2 px-3 bg-primary text-primary-foreground rounded-md text-xs font-medium hover:bg-primary/90 transition-colors"
                >
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default RoutesMap;
