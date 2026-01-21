import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LocationState {
  coordinates: [number, number] | null;
  address: string | null;
  loading: boolean;
  error: string | null;
  permissionStatus: 'prompt' | 'granted' | 'denied' | 'unavailable';
}

interface LocationContextType extends LocationState {
  requestLocation: () => Promise<void>;
  clearLocation: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

const STORAGE_KEY = 'trailmates_user_location';

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<LocationState>({
    coordinates: null,
    address: null,
    loading: false,
    error: null,
    permissionStatus: 'prompt',
  });

  // Load saved location from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setState(prev => ({
          ...prev,
          coordinates: parsed.coordinates,
          address: parsed.address,
          permissionStatus: 'granted',
        }));
      } catch (e) {
        console.error('Failed to parse saved location:', e);
      }
    }

    // Check permission status
    if ('permissions' in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        setState(prev => ({
          ...prev,
          permissionStatus: result.state as 'prompt' | 'granted' | 'denied',
        }));
      }).catch(() => {
        // permissions API not fully supported
      });
    }
  }, []);

  const reverseGeocode = async (lat: number, lon: number): Promise<string | null> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`
      );
      const data = await response.json();
      if (data.address) {
        const { city, town, village, state, country } = data.address;
        const locality = city || town || village || state;
        return locality ? `${locality}, ${country}` : country;
      }
      return null;
    } catch (e) {
      console.error('Reverse geocoding failed:', e);
      return null;
    }
  };

  const requestLocation = async () => {
    if (!('geolocation' in navigator)) {
      setState(prev => ({
        ...prev,
        error: 'Geolocation is not supported by your browser',
        permissionStatus: 'unavailable',
      }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes cache
        });
      });

      const coordinates: [number, number] = [
        position.coords.latitude,
        position.coords.longitude,
      ];

      const address = await reverseGeocode(coordinates[0], coordinates[1]);

      const newState = {
        coordinates,
        address,
        loading: false,
        error: null,
        permissionStatus: 'granted' as const,
      };

      setState(newState);

      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        coordinates,
        address,
      }));
    } catch (error) {
      const geoError = error as GeolocationPositionError;
      let errorMessage = 'Failed to get your location';
      let permissionStatus: 'prompt' | 'granted' | 'denied' = 'prompt';

      if (geoError.code === geoError.PERMISSION_DENIED) {
        errorMessage = 'Location access was denied. Please enable it in your browser settings.';
        permissionStatus = 'denied';
      } else if (geoError.code === geoError.POSITION_UNAVAILABLE) {
        errorMessage = 'Location information is unavailable';
      } else if (geoError.code === geoError.TIMEOUT) {
        errorMessage = 'Location request timed out. Please try again.';
      }

      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
        permissionStatus,
      }));
    }
  };

  const clearLocation = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState({
      coordinates: null,
      address: null,
      loading: false,
      error: null,
      permissionStatus: 'prompt',
    });
  };

  return (
    <LocationContext.Provider value={{ ...state, requestLocation, clearLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
