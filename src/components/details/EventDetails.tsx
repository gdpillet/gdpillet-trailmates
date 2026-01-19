import { useState } from 'react';
import { Share2, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DetailViewLayout from './DetailViewLayout';
import ImageGallery from './ImageGallery';
import OrganizerSection from './OrganizerSection';
import ParticipantsSection from './ParticipantsSection';
import DiscussionSection from './DiscussionSection';
import RouteStatsGrid from './RouteStatsGrid';
import event1 from '@/assets/event-1.jpg';
import event2 from '@/assets/event-2.jpg';
import event3 from '@/assets/event-3.jpg';
import event4 from '@/assets/event-4.jpg';
import profileGaston from '@/assets/profile-gaston.jpeg';

// Sample event data
const sampleEventData = {
  id: '1',
  date: 'May 10, Sunday',
  time: '06:40 AM - 17:00 PM',
  title: 'Pottenstein ring: A land of caves and castles, rivers and rocks',
  activity: 'Hiking',
  difficulty: 'T3 Moderate',
  departsFrom: 'Munich',
  transport: 'Train, bus',
  description:
    'Many poets and painters walked through the countryside of Franconian Switzerland hundreds years ago and catched it in word and on paintings. Franconian Switzerland is one of the largest nature parks in Germany and a real hidden gem. The area is very well known for its impressive caves, rock formations and green scenery. Also, there are many medieval castles and ruins..',
  meetingInfo: {
    location: 'Munich HBF, Platform 29',
    time: '6:40 AM',
    transport: 'Train, bus 145 to Lindau',
    ticketPrice: '€16 per person',
    note: 'We meet on platform and buy a group ticket all together.',
  },
  equipment: [
    'Hiking boots',
    'food and drinks',
    'Cash for the ticket',
    'Helmet',
    'Poles',
    'Headlamp',
  ],
  routeDetails: {
    distance: '29km',
    ascent: '500',
    descent: '400',
    highestPoint: '1560',
    duration: '2:29',
    rating: '650',
  },
  organizer: {
    name: 'John Doe',
    role: 'Bedge',
    avatar: profileGaston,
  },
  participants: {
    count: 12,
    max: 20,
    avatars: Array(7).fill(profileGaston),
  },
  discussion: [
    {
      author: 'Victor',
      avatar: profileGaston,
      text: "Do you think winter hiking boots or lighter trail running shoes would be better for this trek? If there's no snow and it's not too cold, I'm leaning towards the trail running shoes being best.",
      time: '1d ago',
    },
    {
      author: 'Anna',
      avatar: profileGaston,
      text: "I only carry some clothes and necessary stuff, in total less than 4 kilos. I'm staying in houses",
      time: '1d ago',
    },
  ],
  galleryImages: [event1, event2, event3, event4, event1, event2],
};

interface EventDetailsProps {
  eventId?: string;
}

const EventDetails = ({ eventId }: EventDetailsProps) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const event = sampleEventData; // In a real app, fetch by eventId

  const gallery = (
    <ImageGallery 
      images={event.galleryImages} 
      title={event.title}
    />
  );

  const header = (
    <div>
      {/* Date & Time */}
      <div className="mb-4">
        <p className="text-foreground text-lg font-bold">{event.date}</p>
        <p className="text-muted-foreground text-sm">{event.time}</p>
      </div>

      {/* Title */}
      <h1 className="text-foreground text-2xl font-bold mb-6 leading-tight">
        {event.title}
      </h1>

      {/* Attributes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        <div>
          <p className="text-muted-foreground text-sm font-medium mb-1">Activity</p>
          <p className="text-foreground">{event.activity}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-sm font-medium mb-1">Difficulty</p>
          <p className="text-foreground">{event.difficulty}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-sm font-medium mb-1">Departs from</p>
          <p className="text-foreground">{event.departsFrom}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-sm font-medium mb-1">Transport</p>
          <p className="text-foreground">{event.transport}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button 
            className="w-10 h-10 rounded-xl bg-muted hover:bg-muted/80 transition-colors flex items-center justify-center"
            aria-label="Share event"
          >
            <Share2 className="w-5 h-5 text-muted-foreground" />
          </button>
          <button 
            className="w-10 h-10 rounded-xl bg-muted hover:bg-muted/80 transition-colors flex items-center justify-center"
            aria-label="Bookmark event"
          >
            <Bookmark className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          Join event
        </Button>
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
            ? event.description
            : `${event.description.substring(0, 200)}...`}
        </p>
        <button
          onClick={() => setShowFullDescription(!showFullDescription)}
          className="text-primary text-sm font-medium hover:underline mt-2"
        >
          {showFullDescription ? 'Show less' : 'Show more'}
        </button>
      </div>

      <div className="h-px bg-border" />

      {/* Meeting and Transport */}
      <div>
        <h2 className="text-foreground text-xl font-bold mb-3">Meeting and transport</h2>
        <p className="text-foreground leading-relaxed mb-4">{event.meetingInfo.note}</p>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-muted-foreground text-sm font-medium mb-1">Meeting location</p>
            <p className="text-foreground">{event.meetingInfo.location}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm font-medium mb-1">Meeting time</p>
            <p className="text-foreground">{event.meetingInfo.time}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm font-medium mb-1">Transport</p>
            <p className="text-foreground">{event.meetingInfo.transport}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm font-medium mb-1">Ticket price</p>
            <p className="text-foreground">{event.meetingInfo.ticketPrice}</p>
          </div>
        </div>
      </div>

      <div className="h-px bg-border" />

      {/* Equipment */}
      <div>
        <h2 className="text-foreground text-xl font-bold mb-3">Equipment</h2>
        <div className="grid grid-cols-2 gap-2">
          {event.equipment.map((item, idx) => (
            <p key={idx} className="text-foreground">{item}</p>
          ))}
        </div>
      </div>

      <div className="h-px bg-border" />

      {/* Route Details */}
      <RouteStatsGrid stats={event.routeDetails} />
    </>
  );

  const sidebar = (
    <>
      <OrganizerSection
        name={event.organizer.name}
        role={event.organizer.role}
        avatar={event.organizer.avatar}
        label="Organizer"
      />
      <div className="mt-6">
        <ParticipantsSection
          count={event.participants.count}
          max={event.participants.max}
          avatars={event.participants.avatars}
        />
      </div>
      <div className="mt-6">
        <DiscussionSection 
          comments={event.discussion} 
          totalComments={5}
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

export default EventDetails;
