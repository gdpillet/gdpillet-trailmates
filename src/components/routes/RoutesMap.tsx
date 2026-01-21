import { useEffect, useRef, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { HikingRoute } from '@/types/routes';

// Fix for default Leaflet markers not showing
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom marker icon
const createCustomIcon = (difficulty: string) => {
  const colors: Record<string, string> = {
    easy: '#22c55e',
    moderate: '#f59e0b',
    hard: '#ef4444',
    expert: '#7c3aed',
  };
  const color = colors[difficulty] || '#00AD7D';
  
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="width:32px;height:32px;background:${color};border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;box-shadow:0 3px 10px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;"><svg style="transform:rotate(45deg);width:14px;height:14px;fill:white;" viewBox="0 0 24 24"><path d="M13,3L4,14H12V21L20,10H13V3Z"/></svg></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

// User location icon
const userLocationIcon = L.divIcon({
  className: 'user-location-marker',
  html: `<div style="width:20px;height:20px;background:hsl(160,100%,34%);border-radius:50%;border:4px solid white;box-shadow:0 0 0 2px hsl(160,100%,34%),0 3px 10px rgba(0,0,0,0.3);"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

const difficultyLabels: Record<string, string> = {
  easy: 'Easy',
  moderate: 'Moderate',
  hard: 'Hard',
  expert: 'Expert',
};

interface RoutesMapProps {
  routes: HikingRoute[];
  onRouteClick?: (route: HikingRoute) => void;
  userLocation?: [number, number] | null;
  className?: string;
}

function RoutesMap({ routes, onRouteClick, userLocation, className = '' }: RoutesMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);

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

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    mapRef.current = L.map(containerRef.current, {
      center: defaultCenter,
      zoom: 5,
      scrollWheelZoom: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapRef.current);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update markers when routes change
  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add route markers
    routesWithCoords.forEach((route) => {
      if (!route.coordinates) return;

      const marker = L.marker(route.coordinates, {
        icon: createCustomIcon(route.difficulty),
      });

      const popupContent = `
        <div style="min-width:200px;">
          <div style="position:relative;height:96px;margin:-12px -12px 12px -12px;overflow:hidden;">
            <img 
              src="${route.image}" 
              alt="${route.name}"
              style="width:100%;height:100%;object-fit:cover;"
            />
            <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.6),transparent);"></div>
            <span style="position:absolute;top:8px;right:8px;padding:4px 8px;border-radius:4px;background:${route.difficulty === 'easy' ? 'hsl(var(--secondary))' : 'hsl(var(--primary))'};color:${route.difficulty === 'easy' ? 'hsl(var(--secondary-foreground))' : 'hsl(var(--primary-foreground))'};font-size:12px;font-weight:500;">
              ${difficultyLabels[route.difficulty]}
            </span>
          </div>
          <h3 style="font-weight:600;margin-bottom:4px;">${route.name}</h3>
          <p style="font-size:12px;color:#666;margin-bottom:12px;">${route.location}</p>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;font-size:12px;color:#666;">
            <div>${route.distance}km</div>
            <div>${route.duration}h</div>
            <div>${route.elevationGain}m</div>
          </div>
          <div style="display:flex;align-items:center;gap:4px;margin-top:8px;padding-top:8px;border-top:1px solid #eee;">
            <span style="color:#eab308;">★</span>
            <span style="font-size:12px;font-weight:500;">${route.rating}</span>
            <span style="font-size:12px;color:#666;">(${route.reviewCount})</span>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.on('click', () => onRouteClick?.(route));
      marker.addTo(mapRef.current!);
      markersRef.current.push(marker);
    });

    // Add user location marker if available
    if (userLocation) {
      const userMarker = L.marker(userLocation, { icon: userLocationIcon });
      userMarker.bindPopup('<div style="text-align:center;font-weight:500;">You are here</div>');
      userMarker.addTo(mapRef.current);
      markersRef.current.push(userMarker);
    }

    // Fit bounds to show all markers
    const points: [number, number][] = routesWithCoords
      .filter(r => r.coordinates)
      .map(r => r.coordinates as [number, number]);
    
    if (userLocation) {
      points.push(userLocation);
    }
    
    if (points.length > 0) {
      const bounds = L.latLngBounds(points);
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [routesWithCoords, userLocation, onRouteClick]);

  return (
    <div className={`rounded-xl overflow-hidden border border-border shadow-lg relative z-0 ${className}`}>
      <div 
        ref={containerRef} 
        className="h-full w-full [&_.leaflet-pane]:z-[1] [&_.leaflet-control]:z-[2]"
        style={{ minHeight: '280px' }}
      />
    </div>
  );
}

export default RoutesMap;