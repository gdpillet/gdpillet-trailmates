export type Difficulty = 'easy' | 'moderate' | 'hard' | 'expert';
export type TechnicalDifficulty = 'T1' | 'T2' | 'T3' | 'T4' | 'T5' | 'T6';
export type RouteType = 'loop' | 'out-and-back' | 'point-to-point';

export type Highlight = 
  | 'lakes' 
  | 'rivers' 
  | 'waterfalls' 
  | 'coastline' 
  | 'ruins' 
  | 'historical-sites';

export type RouteFeature = 
  | 'via-ferrata' 
  | 'climbing' 
  | 'canyoning' 
  | 'ridges' 
  | 'mountain-passes' 
  | 'avoid-main-roads';

export type Facility = 'restaurants' | 'mountain-huts';

export interface HikingRoute {
  id: string;
  name: string;
  location: string;
  region: string;
  image: string;
  difficulty: Difficulty;
  technicalDifficulty: TechnicalDifficulty;
  distance: number; // in km
  duration: number; // in hours
  elevationGain: number; // in meters
  routeType: RouteType;
  highlights: Highlight[];
  features: RouteFeature[];
  facilities: Facility[];
  rating: number;
  reviewCount: number;
  description: string;
  coordinates?: [number, number]; // [latitude, longitude]
}

export interface RouteFilters {
  search: string;
  difficulty: Difficulty[];
  technicalDifficulty: TechnicalDifficulty[];
  distanceRange: [number, number];
  durationRange: [number, number];
  elevationRange: [number, number];
  highlights: Highlight[];
  features: RouteFeature[];
  facilities: Facility[];
  routeType: RouteType[];
}

export type SortOption = 
  | 'popular' 
  | 'shortest-duration' 
  | 'lowest-elevation' 
  | 'highest-difficulty';

export const defaultFilters: RouteFilters = {
  search: '',
  difficulty: [],
  technicalDifficulty: [],
  distanceRange: [0, 50],
  durationRange: [0, 12],
  elevationRange: [0, 3000],
  highlights: [],
  features: [],
  facilities: [],
  routeType: [],
};
