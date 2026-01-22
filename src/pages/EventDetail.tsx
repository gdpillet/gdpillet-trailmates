import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MapPin,
  Clock,
  Mountain,
  ArrowUp,
  ArrowDown,
  Star,
  Share2,
  Bookmark,
  ArrowLeft,
} from "lucide-react";
import { useEvent, formatEventDateDisplay } from "@/hooks/useEvents";

const activityLabels: Record<string, string> = {
  hiking: "Hiking",
  cycling: "Cycling",
  "ski-touring": "Ski Touring",
  bouldering: "Bouldering",
  social: "Social",
};

const transportLabels: Record<string, string> = {
  train: "Train",
  bus: "Bus",
  carpool: "Carpool",
  none: "No transport",
};

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showFullDescription, setShowFullDescription] = useState(false);

  const { data: event, isLoading, error } = useEvent(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="section-container">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-[379px]">
                <Skeleton className="w-full h-[381px] rounded-lg" />
              </div>
              <div className="flex-1 space-y-6">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="section-container text-center py-12">
            <h1 className="text-2xl font-bold text-foreground mb-4">Event not found</h1>
            <p className="text-muted-foreground mb-6">
              The event you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate("/events")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const availableSpots = event.participants.max - event.participants.count;
  const formattedDate = formatEventDateDisplay(event.eventDate);
  const timeRange = `${event.startTime} - End of day`;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="section-container">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Gallery Section */}
            <div className="w-full lg:w-[379px] flex-shrink-0 order-2 lg:order-1">
              <div className="flex flex-wrap gap-2.5">
                {/* Main large image */}
                <div className="w-full lg:w-[359px] h-[381px] rounded-[5px] overflow-hidden">
                  <img
                    src={event.galleryImages[0] || event.coverImage}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Second image */}
                {event.galleryImages[1] && (
                  <div className="w-[256px] h-[211px] rounded-[5px] overflow-hidden">
                    <img
                      src={event.galleryImages[1]}
                      alt="Event gallery"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {/* Small images column */}
                <div className="flex flex-col gap-1.5 w-[96px]">
                  {event.galleryImages[2] && (
                    <div className="w-full h-[102px] rounded-[5px] overflow-hidden">
                      <img
                        src={event.galleryImages[2]}
                        alt="Event gallery"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  {event.galleryImages[3] && (
                    <div className="w-full h-[102px] rounded-[5px] overflow-hidden">
                      <img
                        src={event.galleryImages[3]}
                        alt="Event gallery"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
              <button className="mt-2.5 text-primary text-base font-normal hover:underline">
                Add route photos
              </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0 py-6 order-1 lg:order-2">
              {/* Event Header */}
              <div className="flex flex-col gap-[52px] mb-10">
                <div>
                  <div className="flex flex-col gap-1.5 mb-5">
                    <p className="text-foreground text-lg font-bold">{formattedDate}</p>
                    <p className="text-muted-foreground text-sm">{timeRange}</p>
                  </div>
                  <h1 className="text-foreground text-2xl font-bold mb-5 leading-tight">
                    {event.title}
                  </h1>

                  {/* Event Attributes */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-20 mb-5">
                    <div className="flex flex-col gap-2.5">
                      <p className="text-muted-foreground text-sm font-bold">Activity</p>
                      <p className="text-foreground text-base leading-[26px]">
                        {activityLabels[event.activity.type] || event.activity.type}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <p className="text-muted-foreground text-sm font-bold">Difficulty</p>
                      <p className="text-foreground text-base leading-[26px]">
                        {event.activity.difficulty || "N/A"}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <p className="text-muted-foreground text-sm font-bold">Departs from</p>
                      <p className="text-foreground text-base leading-[26px]">
                        {event.departure.place}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <p className="text-muted-foreground text-sm font-bold">Transport</p>
                      <p className="text-foreground text-base leading-[26px]">
                        {transportLabels[event.departure.transport] || event.departure.transport}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button 
                        className="w-10 h-10 rounded-[13px] bg-muted hover:bg-muted/80 transition-colors flex items-center justify-center"
                        aria-label="Share event"
                      >
                        <Share2 className="w-5 h-5 text-muted-foreground" />
                      </button>
                      <button 
                        className="w-10 h-10 rounded-[13px] bg-muted hover:bg-muted/80 transition-colors flex items-center justify-center"
                        aria-label="Bookmark event"
                      >
                        <Bookmark className="w-5 h-5 text-muted-foreground" />
                      </button>
                    </div>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg h-10 px-6">
                      Join event
                    </Button>
                  </div>
                </div>
              </div>

              <div className="h-[2px] bg-border my-10" />

              {/* Description */}
              {event.description && (
                <>
                  <div className="flex flex-col gap-2 mb-10">
                    <h2 className="text-foreground text-xl font-bold">Description</h2>
                    <p className="text-foreground text-base leading-[26px]">
                      {showFullDescription
                        ? event.description
                        : `${event.description.substring(0, 200)}...`}
                    </p>
                    {event.description.length > 200 && (
                      <button
                        onClick={() => setShowFullDescription(!showFullDescription)}
                        className="text-primary text-base font-normal hover:underline self-start"
                      >
                        {showFullDescription ? "Show less" : "Show more"}
                      </button>
                    )}
                  </div>
                  <div className="h-[2px] bg-border my-10" />
                </>
              )}

              {/* Meeting and Transport */}
              {(event.meetingInfo.location || event.meetingInfo.note) && (
                <>
                  <div className="flex flex-col gap-4 mb-10">
                    <h2 className="text-foreground text-xl font-bold">Meeting and transport</h2>
                    {event.meetingInfo.note && (
                      <p className="text-foreground text-base leading-[26px]">
                        {event.meetingInfo.note}
                      </p>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                      {event.meetingInfo.location && (
                        <div className="flex flex-col gap-2">
                          <p className="text-muted-foreground text-sm font-bold">Meeting location</p>
                          <p className="text-foreground text-base leading-[26px]">
                            {event.meetingInfo.location}
                          </p>
                        </div>
                      )}
                      {event.meetingInfo.time && (
                        <div className="flex flex-col gap-2">
                          <p className="text-muted-foreground text-sm font-bold">Meeting time</p>
                          <p className="text-foreground text-base leading-[26px]">
                            {event.meetingInfo.time}
                          </p>
                        </div>
                      )}
                      {event.meetingInfo.transport && (
                        <div className="flex flex-col gap-2">
                          <p className="text-muted-foreground text-sm font-bold">Transport</p>
                          <p className="text-foreground text-base leading-[26px]">
                            {event.meetingInfo.transport}
                          </p>
                        </div>
                      )}
                      {event.meetingInfo.ticketPrice && (
                        <div className="flex flex-col gap-2">
                          <p className="text-muted-foreground text-sm font-bold">Ticket price</p>
                          <p className="text-foreground text-base leading-[26px]">
                            {event.meetingInfo.ticketPrice}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="h-[2px] bg-border my-10" />
                </>
              )}

              {/* Equipment */}
              {event.equipment.length > 0 && (
                <>
                  <div className="flex flex-col gap-4 mb-10">
                    <h2 className="text-foreground text-xl font-bold">Equipment</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        {event.equipment.slice(0, Math.ceil(event.equipment.length / 2)).map((item, idx) => (
                          <p key={idx} className="text-foreground text-lg leading-[30px]">
                            {item}
                          </p>
                        ))}
                      </div>
                      <div className="flex flex-col gap-2">
                        {event.equipment.slice(Math.ceil(event.equipment.length / 2)).map((item, idx) => (
                          <p key={idx} className="text-foreground text-lg leading-[30px]">
                            {item}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="h-[2px] bg-border my-10" />
                </>
              )}

              {/* Route Details */}
              {(event.routeDetails.distance || event.routeDetails.ascent) && (
                <div className="flex flex-col gap-4">
                  <h2 className="text-foreground text-xl font-bold">Route details</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                    {event.routeDetails.distance && (
                      <div className="border border-border rounded-[5px] p-4 h-[100px] flex flex-col items-center justify-center relative">
                        <MapPin className="w-4 h-4 text-muted-foreground absolute top-3" />
                        <p className="text-muted-foreground text-sm font-bold mb-1">Distance</p>
                        <p className="text-foreground text-lg leading-[30px]">
                          {event.routeDetails.distance}
                        </p>
                      </div>
                    )}
                    {event.routeDetails.ascent && (
                      <div className="border border-border rounded-[5px] p-4 h-[100px] flex flex-col items-center justify-center relative">
                        <ArrowUp className="w-4 h-4 text-muted-foreground absolute top-3" />
                        <p className="text-muted-foreground text-sm font-bold mb-1">Ascent</p>
                        <p className="text-foreground text-lg leading-[30px]">
                          {event.routeDetails.ascent}
                        </p>
                      </div>
                    )}
                    {event.routeDetails.descent && (
                      <div className="border border-border rounded-[5px] p-4 h-[100px] flex flex-col items-center justify-center relative">
                        <ArrowDown className="w-4 h-4 text-muted-foreground absolute top-3" />
                        <p className="text-muted-foreground text-sm font-bold mb-1">Descent</p>
                        <p className="text-foreground text-lg leading-[30px]">
                          {event.routeDetails.descent}
                        </p>
                      </div>
                    )}
                    {event.routeDetails.highestPoint && (
                      <div className="border border-border rounded-[5px] p-4 h-[100px] flex flex-col items-center justify-center relative">
                        <Mountain className="w-4 h-4 text-muted-foreground absolute top-3" />
                        <p className="text-muted-foreground text-sm font-bold mb-1">Highest point</p>
                        <p className="text-foreground text-lg leading-[30px]">
                          {event.routeDetails.highestPoint}
                        </p>
                      </div>
                    )}
                    {event.routeDetails.duration && (
                      <div className="border border-border rounded-[5px] p-4 h-[100px] flex flex-col items-center justify-center relative">
                        <Clock className="w-4 h-4 text-muted-foreground absolute top-3" />
                        <p className="text-muted-foreground text-sm font-bold mb-1">Duration</p>
                        <p className="text-foreground text-lg leading-[30px]">
                          {event.routeDetails.duration}
                        </p>
                      </div>
                    )}
                    {event.routeDetails.rating && (
                      <div className="border border-border rounded-[5px] p-4 h-[100px] flex flex-col items-center justify-center relative">
                        <Star className="w-4 h-4 text-muted-foreground absolute top-3" />
                        <p className="text-muted-foreground text-sm font-bold mb-1">Rating</p>
                        <p className="text-foreground text-lg leading-[30px]">
                          {event.routeDetails.rating}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-[320px] xl:w-[360px] flex-shrink-0 lg:sticky lg:top-24 order-3">
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
                      <div className="w-8 h-8 rounded-full bg-background border-2 border-dashed border-border flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">+{availableSpots}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Discussion placeholder */}
                <div>
                  <h3 className="text-foreground text-xl font-bold mb-4">Discussion</h3>
                  <p className="text-muted-foreground text-sm">
                    Discussion feature coming soon...
                  </p>
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
