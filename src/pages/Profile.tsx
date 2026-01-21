import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, MessageSquare, Mountain, Bike, MapPin, Calendar, Route, Award, Navigation, Loader2, X } from "lucide-react";
import profileImage from "@/assets/profile-gaston.jpeg";
import { useLocation } from "@/contexts/LocationContext";

const Profile = () => {
  const { coordinates, address, loading, error, permissionStatus, requestLocation, clearLocation } = useLocation();
  
  const user = {
    name: "Gastón",
    avatar: profileImage,
    level: "Trail Rookie",
    reviews: 34,
    age: 32,
    badges: ["Sustainer"],
    location: "🇪🇸 Based in Spain",
    experience: "5 years hiking",
    eventsOrganised: 43,
    hikesCompleted: 61,
    cyclingActivities: 4,
    routesCreated: 52,
    viaFerrataActivities: 8,
    stats: {
      distance: "34km",
      elevation: "3.982m"
    },
    activityBreakdown: [{
      label: "Hiking",
      count: 43,
      icon: Mountain
    }, {
      label: "Cycling",
      count: 4,
      icon: Bike
    }],
    difficultyLevels: [{
      level: "T1",
      count: 0
    }, {
      level: "T2",
      count: 34
    }, {
      level: "T3",
      count: 23
    }, {
      level: "T4",
      count: 3
    }, {
      level: "T5",
      count: 15
    }, {
      level: "T6",
      count: 4
    }]
  };
  const reviews = [{
    id: 1,
    text: 'Gaston, thank you for organising an excellent "tramping trip". Certainly a fit and furious hike. See you on the next one',
    author: "Karina",
    event: "Hochstaufen (1771m)",
    date: "June 2024",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
  }, {
    id: 2,
    text: "Excellent organisation and great company. Gaston knows all the best trails!",
    author: "Marcus",
    event: "Zugspitze Trail",
    date: "May 2024",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  }];
  return <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="section-container section-padding">
          {/* Profile Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="relative mb-4">
              <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-primary/20">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Award className="w-4 h-4 text-primary-foreground" />
              </div>
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <button className="absolute top-24 right-4 md:right-8 p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Settings">
                <Settings className="w-5 h-5" />
              </button>
            </div>
            
            <h1 className="text-2xl font-bold text-foreground mb-1">{user.name}</h1>
            
            <div className="flex items-center gap-2 text-sm mb-4">
              <span className="text-primary font-medium flex items-center gap-1">
                <Mountain className="w-4 h-4" />
                {user.level}
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                {user.reviews} reviews
              </span>
            </div>
            
            {/* User Badges */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <Badge variant="outline" className="text-xs">{user.age} y.o.</Badge>
              {user.badges.map(badge => <Badge key={badge} variant="outline" className="text-xs">🌱 {badge}</Badge>)}
              <Badge variant="outline" className="text-xs">{user.location}</Badge>
            </div>
            
            {/* Location Card */}
            <Card className="w-full max-w-md mb-4">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      coordinates ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                    }`}>
                      <Navigation className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-foreground">
                        {coordinates ? 'Your Location' : 'Share your location'}
                      </p>
                      {coordinates && address ? (
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {address}
                        </p>
                      ) : coordinates ? (
                        <p className="text-xs text-muted-foreground">
                          {coordinates[0].toFixed(4)}°, {coordinates[1].toFixed(4)}°
                        </p>
                      ) : (
                        <p className="text-xs text-muted-foreground">
                          Find trails near you
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {coordinates ? (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={clearLocation}
                      className="text-muted-foreground hover:text-destructive"
                      aria-label="Remove location"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={requestLocation}
                      disabled={loading}
                      className="gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Locating...
                        </>
                      ) : (
                        <>
                          <MapPin className="w-4 h-4" />
                          Enable
                        </>
                      )}
                    </Button>
                  )}
                </div>
                
                {error && (
                  <p className="mt-3 text-xs text-destructive bg-destructive/10 rounded-md p-2">
                    {error}
                  </p>
                )}
                
                {permissionStatus === 'denied' && !error && (
                  <p className="mt-3 text-xs text-muted-foreground bg-muted rounded-md p-2">
                    Location access was denied. Enable it in your browser settings to use this feature.
                  </p>
                )}
              </CardContent>
            </Card>
            
            {/* Stats Badges */}
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary" className="text-xs">
                <Calendar className="w-3 h-3 mr-1" />
                {user.experience}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                <Mountain className="w-3 h-3 mr-1" />
                {user.eventsOrganised} events organised
              </Badge>
              <Badge variant="secondary" className="text-xs">
                <Award className="w-3 h-3 mr-1" />
                {user.hikesCompleted} hikes completed
              </Badge>
              <Badge variant="secondary" className="text-xs">
                <Bike className="w-3 h-3 mr-1" />
                {user.cyclingActivities} Cycling activities
              </Badge>
              <Badge variant="secondary" className="text-xs">
                <Route className="w-3 h-3 mr-1" />
                {user.routesCreated} routes created
              </Badge>
            </div>
          </div>
          
          {/* Stats Card */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <Tabs defaultValue="all-time" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="last-month">Last Month | 9</TabsTrigger>
                  <TabsTrigger value="all-time">All Time | 49</TabsTrigger>
                  <TabsTrigger value="last-year">Last Year | 43</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all-time" className="space-y-6">
                  {/* Activity Icons */}
                  <div className="flex justify-center gap-4">
                    <div className="flex items-center gap-1 text-sm">
                      <Mountain className="w-4 h-4 text-primary" />
                      <span>Hiking | 43</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Bike className="w-4 h-4 text-muted-foreground" />
                      <span>4</span>
                    </div>
                  </div>
                  
                  {/* Distance & Elevation */}
                  <div className="flex justify-center gap-8 text-sm">
                    <div>
                      <span className="text-muted-foreground">Distance: </span>
                      <span className="font-semibold">{user.stats.distance}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Elevation: </span>
                      <span className="font-semibold">{user.stats.elevation}</span>
                    </div>
                  </div>
                  
                  {/* Difficulty Levels */}
                  <div className="gap-4 flex items-end justify-center">
                    {user.difficultyLevels.map(diff => <div key={diff.level} className="flex flex-col items-center">
                        <div className="w-8 rounded-full mb-1 flex items-center justify-center text-xs font-bold text-primary-foreground" style={{
                      height: `${Math.max(20, diff.count * 2)}px`,
                      backgroundColor: diff.level === "T1" ? "hsl(var(--muted))" : diff.level === "T2" ? "hsl(160, 100%, 45%)" : diff.level === "T3" ? "hsl(160, 100%, 40%)" : diff.level === "T4" ? "hsl(45, 100%, 50%)" : diff.level === "T5" ? "hsl(25, 100%, 50%)" : "hsl(0, 85%, 60%)"
                    }}>
                          {diff.level}
                        </div>
                        <span className="text-xs text-muted-foreground">{diff.count}</span>
                      </div>)}
                  </div>
                </TabsContent>
                
                <TabsContent value="last-month">
                  <p className="text-center text-muted-foreground">Last month stats coming soon</p>
                </TabsContent>
                
                <TabsContent value="last-year">
                  <p className="text-center text-muted-foreground">Last year stats coming soon</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Reviews Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">
                {user.name.toUpperCase()}'S REVIEWS ({user.reviews})
              </h2>
              <Button variant="link" className="text-primary p-0">
                Show all →
              </Button>
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
              {reviews.map(review => <Card key={review.id} className="min-w-[280px] max-w-[320px] flex-shrink-0">
                  <CardContent className="p-4">
                    <p className="text-sm text-foreground mb-4 line-clamp-3">
                      {review.text}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <img src={review.avatar} alt={review.author} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{review.author}</p>
                        <p className="text-xs text-muted-foreground">
                          {review.event}, {review.date}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>)}
            </div>
          </div>
          
          {/* Activities Section */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {user.name.toUpperCase()}'S ACTIVITIES
            </h2>
            
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="w-full justify-start mb-4 bg-transparent border-b border-border rounded-none h-auto p-0">
                <TabsTrigger value="upcoming" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2">
                  Upcoming | 2
                </TabsTrigger>
                <TabsTrigger value="recent" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2">
                  Recent | 1
                </TabsTrigger>
                <TabsTrigger value="past" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2">
                  Past | 60
                </TabsTrigger>
                <TabsTrigger value="organised" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2">
                  Organised | 43
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming">
                <p className="text-muted-foreground">Your upcoming activities will appear here.</p>
              </TabsContent>
              
              <TabsContent value="recent">
                <p className="text-muted-foreground">Recent activities will appear here.</p>
              </TabsContent>
              
              <TabsContent value="past">
                <p className="text-muted-foreground">Past activities will appear here.</p>
              </TabsContent>
              
              <TabsContent value="organised">
                <p className="text-muted-foreground">Events you've organised will appear here.</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default Profile;