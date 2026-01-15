import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  MapPin,
  Clock,
  Mountain,
  ArrowUp,
  ArrowDown,
  Star,
  Share2,
  Bookmark,
} from "lucide-react";
import event1 from "@/assets/event-1.jpg";
import event2 from "@/assets/event-2.jpg";
import event3 from "@/assets/event-3.jpg";
import event4 from "@/assets/event-4.jpg";
import profileGaston from "@/assets/profile-gaston.jpeg";

// Sample event data - in a real app, this would come from an API
const sampleEventData = {
  id: "1",
  date: "May 10, Sunday",
  time: "06:40 AM - 17:00 PM",
  title: "Pottenstein ring: A land of caves and castles, rivers and rocks",
  activity: "Hiking",
  difficulty: "T3 Moderate",
  departsFrom: "Munich",
  transport: "Train, bus",
  description:
    "Many poets and painters walked through the countryside of Franconian Switzerland hundreds years ago and catched it in word and on paintings. Franconian Switzerland is one of the largest nature parks in Germany and a real hidden gem. The area is very well known for its impressive caves, rock formations and green scenery. Also, there are many medieval castles and ruins..",
  meetingInfo: {
    location: "Munich HBF, Platform 29",
    time: "6:40 AM",
    transport: "Train, bus 145 to Lindau",
    ticketPrice: "€16 per person",
    note: "We meet on platform and buy a group ticket all together.",
  },
  equipment: [
    "Hiking boots",
    "food and drinks",
    "Cash for the ticket",
    "Headlamp (just in case)",
    "Helmet",
    "Poles",
    "Headlamp",
  ],
  routeDetails: {
    distance: "29km",
    ascent: "500",
    descent: "400",
    highestPoint: "1560",
    duration: "2:29",
    rating: "650",
  },
  organizer: {
    name: "John Doe",
    role: "Bedge",
    avatar: profileGaston,
  },
  participants: {
    count: 12,
    max: 20,
    avatars: [
      profileGaston,
      profileGaston,
      profileGaston,
      profileGaston,
      profileGaston,
      profileGaston,
      profileGaston,
    ],
  },
  discussion: [
    {
      author: "Victor",
      avatar: profileGaston,
      text: "Do you think winter hiking boots or lighter trail running shoes would be better for this trek? If there's no snow and it's not too cold, I'm leaning towards the trail running shoes being best.",
      time: "1d ago",
    },
    {
      author: "Anna",
      avatar: profileGaston,
      text: "I only carry some clothes and necessary stuff, in total less than 4 kilos. I'm staying in houses",
      time: "1d ago",
    },
  ],
  galleryImages: [event1, event2, event3, event4],
};

const EventDetail = () => {
  const { id } = useParams();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const event = sampleEventData; // In a real app, fetch by id

  const availableSpots = event.participants.max - event.participants.count;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="section-container">
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Gallery Section */}
            <div className="w-full lg:w-[379px] flex-shrink-0">
              <div className="flex flex-wrap gap-2.5">
                {/* Main large image */}
                <div className="w-full lg:w-[359px] h-[381px] rounded-[5px] overflow-hidden">
                  <img
                    src={event.galleryImages[0]}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Second image */}
                <div className="w-[256px] h-[211px] rounded-[5px] overflow-hidden">
                  <img
                    src={event.galleryImages[1]}
                    alt="Event gallery"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Small images column */}
                <div className="flex flex-col gap-1.5 w-[96px]">
                  <div className="w-full h-[102px] rounded-[5px] overflow-hidden">
                    <img
                      src={event.galleryImages[2]}
                      alt="Event gallery"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-full h-[102px] rounded-[5px] overflow-hidden">
                    <img
                      src={event.galleryImages[3]}
                      alt="Event gallery"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                {/* Additional images */}
                <div className="w-[152px] h-[120px] rounded-[5px] overflow-hidden">
                  <img
                    src={event.galleryImages[0]}
                    alt="Event gallery"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-[96px] h-[120px] rounded-[5px] overflow-hidden">
                  <img
                    src={event.galleryImages[1]}
                    alt="Event gallery"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <button className="mt-2.5 text-primary text-base font-normal hover:underline">
                Add route photos
              </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 max-w-[602px] py-6">
              {/* Event Header */}
              <div className="flex flex-col gap-[52px] mb-10">
                <div>
                  <div className="flex flex-col gap-1.5 mb-5">
                    <p className="text-foreground text-lg font-bold">{event.date}</p>
                    <p className="text-muted-foreground text-sm">{event.time}</p>
                  </div>
                  <h1 className="text-foreground text-2xl font-bold mb-5 leading-tight">
                    {event.title}
                  </h1>

                  {/* Event Attributes */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-20 mb-5">
                    <div className="flex flex-col gap-2.5">
                      <p className="text-muted-foreground text-sm font-bold">Activity</p>
                      <p className="text-foreground text-base leading-[26px]">{event.activity}</p>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <p className="text-muted-foreground text-sm font-bold">Difficulty</p>
                      <p className="text-foreground text-base leading-[26px]">{event.difficulty}</p>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <p className="text-muted-foreground text-sm font-bold">Departs from</p>
                      <p className="text-foreground text-base leading-[26px]">{event.departsFrom}</p>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <p className="text-muted-foreground text-sm font-bold">Transport</p>
                      <p className="text-foreground text-base leading-[26px]">{event.transport}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button className="w-10 h-10 rounded-[13px] bg-muted hover:bg-muted/80 transition-colors flex items-center justify-center">
                        <Share2 className="w-5 h-5 text-muted-foreground" />
                      </button>
                      <button className="w-10 h-10 rounded-[13px] bg-muted hover:bg-muted/80 transition-colors flex items-center justify-center">
                        <Bookmark className="w-5 h-5 text-muted-foreground" />
                      </button>
                    </div>
                    <Button className="bg-primary text-white hover:bg-primary/90 rounded-lg h-10 px-6">
                      Join event
                    </Button>
                  </div>
                </div>
              </div>

              <div className="h-[2px] bg-border my-10" />

              {/* Description */}
              <div className="flex flex-col gap-2 mb-10">
                <h2 className="text-foreground text-xl font-bold">Description</h2>
                <p className="text-foreground text-base leading-[26px]">
                  {showFullDescription
                    ? event.description
                    : `${event.description.substring(0, 200)}...`}
                </p>
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-primary text-base font-normal hover:underline self-start"
                >
                  {showFullDescription ? "Show less" : "Show more"}
                </button>
              </div>

              <div className="h-[2px] bg-border my-10" />

              {/* Meeting and Transport */}
              <div className="flex flex-col gap-4 mb-10">
                <h2 className="text-foreground text-xl font-bold">Meeting and transport</h2>
                <p className="text-foreground text-base leading-[26px]">{event.meetingInfo.note}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                  <div className="flex flex-col gap-2">
                    <p className="text-muted-foreground text-sm font-bold">Meeting location</p>
                    <p className="text-foreground text-base leading-[26px]">
                      {event.meetingInfo.location}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-muted-foreground text-sm font-bold">Meeting time</p>
                    <p className="text-foreground text-base leading-[26px]">
                      {event.meetingInfo.time}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-muted-foreground text-sm font-bold">Transport</p>
                    <p className="text-foreground text-base leading-[26px]">
                      {event.meetingInfo.transport}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-muted-foreground text-sm font-bold">Ticket price</p>
                    <p className="text-foreground text-base leading-[26px]">
                      {event.meetingInfo.ticketPrice}
                    </p>
                  </div>
                </div>
              </div>

              <div className="h-[2px] bg-border my-10" />

              {/* Equipment */}
              <div className="flex flex-col gap-4 mb-10">
                <h2 className="text-foreground text-xl font-bold">Equipment</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    {event.equipment.slice(0, 4).map((item, idx) => (
                      <p key={idx} className="text-foreground text-lg leading-[30px]">
                        {item}
                      </p>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2">
                    {event.equipment.slice(4).map((item, idx) => (
                      <p key={idx} className="text-foreground text-lg leading-[30px]">
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="h-[2px] bg-border my-10" />

              {/* Route Details */}
              <div className="flex flex-col gap-4">
                <h2 className="text-foreground text-xl font-bold">Route details</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                  {/* Distance */}
                  <div className="border border-border rounded-[5px] p-4 h-[100px] flex flex-col items-center justify-center relative">
                    <MapPin className="w-4 h-4 text-muted-foreground absolute top-3" />
                    <p className="text-muted-foreground text-sm font-bold mb-1">Distance</p>
                    <p className="text-foreground text-lg leading-[30px]">{event.routeDetails.distance}</p>
                  </div>

                  {/* Ascent */}
                  <div className="border border-border rounded-[5px] p-4 h-[100px] flex flex-col items-center justify-center relative">
                    <ArrowUp className="w-4 h-4 text-muted-foreground absolute top-3" />
                    <p className="text-muted-foreground text-sm font-bold mb-1">Ascent</p>
                    <p className="text-foreground text-lg leading-[30px]">{event.routeDetails.ascent}</p>
                  </div>

                  {/* Descent */}
                  <div className="border border-border rounded-[5px] p-4 h-[100px] flex flex-col items-center justify-center relative">
                    <ArrowDown className="w-4 h-4 text-muted-foreground absolute top-3" />
                    <p className="text-muted-foreground text-sm font-bold mb-1">Descent</p>
                    <p className="text-foreground text-lg leading-[30px]">{event.routeDetails.descent}</p>
                  </div>

                  {/* Highest Point */}
                  <div className="border border-border rounded-[5px] p-4 h-[100px] flex flex-col items-center justify-center relative">
                    <Mountain className="w-4 h-4 text-muted-foreground absolute top-3" />
                    <p className="text-muted-foreground text-sm font-bold mb-1">Highest point</p>
                    <p className="text-foreground text-lg leading-[30px]">
                      {event.routeDetails.highestPoint}
                    </p>
                  </div>

                  {/* Duration */}
                  <div className="border border-border rounded-[5px] p-4 h-[100px] flex flex-col items-center justify-center relative">
                    <Clock className="w-4 h-4 text-muted-foreground absolute top-3" />
                    <p className="text-muted-foreground text-sm font-bold mb-1">Duration</p>
                    <p className="text-foreground text-lg leading-[30px]">{event.routeDetails.duration}</p>
                  </div>

                  {/* Rating */}
                  <div className="border border-border rounded-[5px] p-4 h-[100px] flex flex-col items-center justify-center relative">
                    <Star className="w-4 h-4 text-muted-foreground absolute top-3" />
                    <p className="text-muted-foreground text-sm font-bold mb-1">Rating</p>
                    <p className="text-foreground text-lg leading-[30px]">{event.routeDetails.rating}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-[400px] flex-shrink-0 lg:sticky lg:top-24">
              <div className="bg-muted rounded-[13px] p-6">
                {/* Organizer */}
                <div className="pb-6 border-b border-border mb-6">
                  <h3 className="text-foreground text-xl font-bold mb-4">Organizer</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="w-12 h-12 border-3 border-background">
                      <AvatarImage src={event.organizer.avatar} alt={event.organizer.name} />
                      <AvatarFallback>{event.organizer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-foreground text-base font-bold">{event.organizer.name}</p>
                      <p className="text-foreground text-sm">{event.organizer.role}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80 border-0"
                  >
                    Send a message
                  </Button>
                </div>

                {/* Participants */}
                <div className="pb-6 border-b border-border mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-foreground text-xl font-bold">Participants</h3>
                    <p className="text-foreground text-sm text-right">
                      {event.participants.count} out of {event.participants.max} /{" "}
                      <span className="font-bold">{availableSpots} spots left</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {event.participants.avatars.slice(0, 7).map((avatar, idx) => (
                      <Avatar
                        key={idx}
                        className="w-8 h-8 border-2 border-background -ml-2 first:ml-0"
                      >
                        <AvatarImage src={avatar} alt={`Participant ${idx + 1}`} />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    ))}
                    {availableSpots > 0 && (
                      <button className="w-8 h-8 rounded-[13px] bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold hover:bg-primary/90 transition-colors">
                        +
                      </button>
                    )}
                    {availableSpots > 1 && (
                      <>
                        <div className="w-8 h-8 rounded-[13px] bg-muted border-2 border-dashed border-border" />
                        <div className="w-8 h-8 rounded-[13px] bg-muted border-2 border-dashed border-border" />
                        <div className="w-8 h-8 rounded-[13px] bg-muted border-2 border-dashed border-border" />
                      </>
                    )}
                  </div>
                </div>

                {/* Discussion */}
                <div>
                  <h3 className="text-foreground text-xl font-bold mb-4">Discussion</h3>
                  <div className="space-y-6">
                    {event.discussion.map((comment, idx) => (
                      <div key={idx} className="flex gap-3">
                        <Avatar className="w-8 h-8 border-2 border-background flex-shrink-0">
                          <AvatarImage src={comment.avatar} alt={comment.author} />
                          <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm leading-[22px] mb-1">
                            <span className="text-primary font-bold">{comment.author}</span>{" "}
                            <span className="text-foreground">{comment.text}</span>
                          </p>
                          <div className="flex items-center gap-2 text-xs">
                            <button className="text-primary hover:underline">Like</button>
                            <span className="text-muted-foreground">-</span>
                            <button className="text-primary hover:underline">Reply</button>
                            <span className="text-muted-foreground">-</span>
                            <span className="text-muted-foreground">{comment.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button className="text-primary text-sm font-normal hover:underline">
                      + 3 comments
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EventDetail;
