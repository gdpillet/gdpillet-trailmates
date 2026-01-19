import { useState } from 'react';
import { Share2, Bookmark, MapPin, Star, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import DetailViewLayout from './DetailViewLayout';
import ImageGallery from './ImageGallery';
import OrganizerSection from './OrganizerSection';
import PastEventsSection from './PastEventsSection';
import DiscussionSection from './DiscussionSection';
import RouteStatsGrid from './RouteStatsGrid';
import { HikingRoute, Difficulty } from '@/types/routes';
import profileGaston from '@/assets/profile-gaston.jpeg';

const difficultyConfig: Record<Difficulty, { label: string; className: string }> = {
  easy: { label: 'Easy', className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' },
  moderate: { label: 'Moderate', className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
  hard: { label: 'Hard', className: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' },
  expert: { label: 'Expert', className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
};

// Sample data
const sampleCreator = {
  name: 'Maria Schmidt',
  role: 'Trail Expert',
  avatar: profileGaston,
};

const samplePastEvents = [
  {
    id: '1',
    date: 'Mar 15, 2024',
    title: 'Spring Hiking Adventure',
    participants: 12,
    organizerAvatar: profileGaston,
    organizerName: 'John',
  },
  {
    id: '2',
    date: 'Feb 20, 2024',
    title: 'Winter Trek',
    participants: 8,
    organizerAvatar: profileGaston,
    organizerName: 'Anna',
  },
  {
    id: '3',
    date: 'Jan 10, 2024',
    title: 'New Year Hike',
    participants: 15,
    organizerAvatar: profileGaston,
    organizerName: 'Victor',
  },
];

const sampleDiscussion = [
  {
    author: 'Victor',
    avatar: profileGaston,
    text: "Do you think winter hiking boots or lighter trail running shoes would be better for this trek?",
    time: '1d ago',
  },
  {
    author: 'Anna',
    avatar: profileGaston,
    text: "I did this route last month. The views are absolutely stunning! Highly recommend.",
    time: '2d ago',
  },
];

interface RouteDetailsProps {
  route: HikingRoute;
}

const RouteDetails = ({ route }: RouteDetailsProps) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const difficulty = difficultyConfig[route.difficulty];

  // Generate gallery images from route image
  const galleryImages = [route.image, route.image, route.image, route.image];

  const gallery = (
    <ImageGallery 
      images={galleryImages} 
      title={route.name}
    />
  );

  const header = (
    <div>
      {/* Badges */}
      <div className="flex items-center gap-2 mb-4">
        <Badge className={`${difficulty.className} border-0 font-medium`}>
          {difficulty.label}
        </Badge>
        <Badge variant="outline" className="font-medium">
          {route.technicalDifficulty}
        </Badge>
      </div>

      {/* Title */}
      <h1 className="text-foreground text-2xl font-bold mb-3 leading-tight">
        {route.name}
      </h1>

      {/* Location */}
      <div className="flex items-center gap-1.5 text-muted-foreground mb-6">
        <MapPin className="w-4 h-4" />
        <span>{route.location}</span>
        <span className="mx-2">•</span>
        <span>{route.region}</span>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-1.5">
          <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
          <span className="font-semibold text-foreground">{route.rating}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Users className="w-4 h-4" />
          <span>{route.reviewCount} reviews</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button 
          className="w-10 h-10 rounded-xl bg-muted hover:bg-muted/80 transition-colors flex items-center justify-center"
          aria-label="Share route"
        >
          <Share2 className="w-5 h-5 text-muted-foreground" />
        </button>
        <button 
          className="w-10 h-10 rounded-xl bg-muted hover:bg-muted/80 transition-colors flex items-center justify-center"
          aria-label="Bookmark route"
        >
          <Bookmark className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>
    </div>
  );

  const mainContent = (
    <>
      {/* Description */}
      <div>
        <h2 className="text-foreground text-xl font-bold mb-3">Description</h2>
        <p className="text-foreground leading-relaxed">
          {showFullDescription
            ? route.description
            : `${route.description.substring(0, 200)}${route.description.length > 200 ? '...' : ''}`}
        </p>
        {route.description.length > 200 && (
          <button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="text-primary text-sm font-medium hover:underline mt-2"
          >
            {showFullDescription ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>

      <div className="h-px bg-border" />

      {/* Route Stats */}
      <RouteStatsGrid 
        stats={{
          distance: `${route.distance}km`,
          ascent: `${route.elevationGain}m`,
          descent: `${Math.round(route.elevationGain * 0.8)}m`,
          highestPoint: `${Math.round(route.elevationGain + 500)}m`,
          duration: `${route.duration}h`,
          rating: route.rating.toString(),
        }} 
      />

      <div className="h-px bg-border" />

      {/* Highlights */}
      {route.highlights.length > 0 && (
        <>
          <div>
            <h2 className="text-foreground text-xl font-bold mb-3">Highlights</h2>
            <div className="flex flex-wrap gap-2">
              {route.highlights.map((highlight) => (
                <Badge key={highlight} variant="secondary">
                  {highlight.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                </Badge>
              ))}
            </div>
          </div>
          <div className="h-px bg-border" />
        </>
      )}

      {/* Features */}
      {route.features.length > 0 && (
        <div>
          <h2 className="text-foreground text-xl font-bold mb-3">Features</h2>
          <div className="flex flex-wrap gap-2">
            {route.features.map((feature) => (
              <Badge key={feature} variant="outline">
                {feature.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </>
  );

  const sidebar = (
    <>
      <OrganizerSection
        name={sampleCreator.name}
        role={sampleCreator.role}
        avatar={sampleCreator.avatar}
        label="Route Creator"
      />
      <div className="mt-6">
        <PastEventsSection events={samplePastEvents} />
      </div>
      <div className="mt-6">
        <DiscussionSection 
          comments={sampleDiscussion} 
          totalComments={8}
        />
      </div>
    </>
  );

  return (
    <DetailViewLayout
      gallery={gallery}
      header={header}
      mainContent={mainContent}
      sidebar={sidebar}
    />
  );
};

export default RouteDetails;
