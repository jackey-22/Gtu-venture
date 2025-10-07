import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Clock, Users, ExternalLink } from "lucide-react";

// Event data based on the content provided
const events = [
  {
    id: 1,
    title: "CowTech Krishi Summit 2025",
    description: "World Environment Day celebration featuring agricultural technology innovations and sustainable farming solutions.",
    date: "2025-06-05",
    time: "09:00 AM",
    location: "GTU Campus, Ahmedabad",
    type: "Summit",
    category: "Agriculture",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    registrationUrl: "https://gtuventures.com/events/cowtech-2025",
    speakers: ["Dr. Rajesh Agrawal", "Prof. Meera Patel"],
    maxAttendees: 500,
    currentAttendees: 324,
  },
  {
    id: 2,
    title: "Startup Funding Masterclass",
    description: "Learn from successful entrepreneurs and investors about securing funding for your startup. Interactive sessions on pitch deck creation and investor relations.",
    date: "2025-02-15",
    time: "02:00 PM",
    location: "Innovation Hub, GTU",
    type: "Workshop",
    category: "Funding",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    registrationUrl: "https://gtuventures.com/events/funding-masterclass",
    speakers: ["Priya Sharma (Sequoia Capital)", "Amit Jain (Matrix Partners)"],
    maxAttendees: 150,
    currentAttendees: 89,
  },
  {
    id: 3,
    title: "Demo Day 2025 - Season 1",
    description: "Watch our latest cohort of startups pitch to investors and industry experts. Showcase of innovative solutions across various sectors.",
    date: "2025-03-20",
    time: "10:00 AM",
    location: "GTU Auditorium",
    type: "Pitch Event",
    category: "Demo Day",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    registrationUrl: "https://gtuventures.com/events/demo-day-2025",
    speakers: ["15 Startup Teams", "Panel of Investors"],
    maxAttendees: 300,
    currentAttendees: 156,
  },
  {
    id: 4,
    title: "AI & Innovation Conclave 2024",
    description: "A comprehensive conference on artificial intelligence applications in business and society.",
    date: "2024-12-15",
    time: "09:30 AM",
    location: "GTU Convention Center",
    type: "Conference",
    category: "Technology",
    status: "past",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    registrationUrl: "#",
    speakers: ["Dr. Rakesh Sharma", "Tech Industry Leaders"],
    maxAttendees: 800,
    currentAttendees: 756,
    outcomes: "5 partnerships formed, 3 research collaborations initiated, ₹2cr in potential funding discussions",
    mediaCoverage: [
      { type: "article", title: "GTU AI Conclave Sets New Standards", source: "Tech Gujarat", url: "#" },
      { type: "video", title: "Keynote Highlights", platform: "YouTube", url: "#" }
    ],
    photos: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    ]
  },
  {
    id: 6,
    title: "Startup Growth Workshop",
    description: "Hands-on workshop covering customer acquisition, product-market fit, and scaling strategies for early-stage startups.",
    date: "2025-04-10",
    time: "10:00 AM",
    location: "Innovation Lab, GTU",
    type: "Workshop",
    category: "Business Development",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    registrationUrl: "https://gtuventures.com/events/growth-workshop",
    speakers: ["Sarah Chen (Growth Hacker)", "Mike Johnson (Serial Entrepreneur)"],
    maxAttendees: 50,
    currentAttendees: 32,
  },
  {
    id: 7,
    title: "AI Innovation Hackathon 2025",
    description: "48-hour hackathon focused on developing AI solutions for social impact. Teams compete for prizes and mentorship opportunities.",
    date: "2025-05-15",
    time: "09:00 AM",
    location: "GTU Tech Park",
    type: "Hackathon",
    category: "Technology",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    registrationUrl: "https://gtuventures.com/events/ai-hackathon",
    speakers: ["AI Experts", "Industry Judges"],
    maxAttendees: 200,
    currentAttendees: 87,
  },
  {
    id: 8,
    title: "Investor Demo Day - Spring 2025",
    description: "Season 2 of our flagship demo day featuring 12 promising startups pitching to a panel of angel investors and VCs.",
    date: "2025-04-25",
    time: "02:00 PM",
    location: "GTU Grand Auditorium",
    type: "Demo Day",
    category: "Funding",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    registrationUrl: "https://gtuventures.com/events/spring-demo-day",
    speakers: ["12 Startup Founders", "Angel Investors", "VC Partners"],
    maxAttendees: 150,
    currentAttendees: 98,
  },
  {
    id: 9,
    title: "Entrepreneur Networking Mixer",
    description: "Casual networking event connecting founders, mentors, and industry professionals. Perfect for building partnerships and finding collaborators.",
    date: "2025-03-30",
    time: "06:00 PM",
    location: "GTU Rooftop Lounge",
    type: "Networking",
    category: "Community",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    registrationUrl: "https://gtuventures.com/events/networking-mixer",
    speakers: ["Community Leaders"],
    maxAttendees: 100,
    currentAttendees: 67,
  },
  {
    id: 10,
    title: "Blockchain Innovation Hackathon 2024",
    description: "Intensive 36-hour hackathon focused on blockchain applications for supply chain and finance sectors.",
    date: "2024-09-20",
    time: "10:00 AM",
    location: "GTU Digital Lab",
    type: "Hackathon",
    category: "Blockchain",
    status: "past",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    registrationUrl: "#",
    speakers: ["Blockchain Developers", "Industry Experts"],
    maxAttendees: 150,
    currentAttendees: 142,
    outcomes: "8 winning projects, 3 blockchain startups formed, ₹1.5cr in development grants awarded",
    mediaCoverage: [
      { type: "article", title: "Blockchain Hackathon Sparks Innovation", source: "Tech Chronicle", url: "#" },
      { type: "video", title: "Winning Project Demos", platform: "YouTube", url: "#" }
    ],
    photos: [
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    ]
  },
  {
    id: 11,
    title: "Winter Demo Day 2024",
    description: "Showcase of 10 innovative startups pitching to investors and industry leaders in our winter cohort finale.",
    date: "2024-10-30",
    time: "11:00 AM",
    location: "GTU Conference Hall",
    type: "Demo Day",
    category: "Showcase",
    status: "past",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    registrationUrl: "#",
    speakers: ["10 Startup Teams", "Investment Panel"],
    maxAttendees: 120,
    currentAttendees: 115,
    outcomes: "₹3.2cr in funding commitments, 7 follow-on meetings scheduled, 2 immediate investments",
    mediaCoverage: [
      { type: "article", title: "Winter Demo Day Breaks Records", source: "Startup Gujarat", url: "#" },
      { type: "video", title: "Pitch Highlights", platform: "YouTube", url: "#" }
    ],
    photos: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    ]
  },
];

const eventTypes = ["All", "Summit", "Workshop", "Conference", "Pitch Event", "Hackathon", "Demo Day", "Networking"];

export default function Events() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedType, setSelectedType] = useState("All");

  const filteredEvents = events.filter(event => {
    const matchesTab = event.status === activeTab;
    const matchesType = selectedType === "All" || event.type === selectedType;
    return matchesTab && matchesType;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getStatusColor = (status: string) => {
    return status === "upcoming" ? "bg-success" : "bg-muted-foreground";
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-gtu-base to-gtu-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-hero font-extrabold text-foreground mb-6">
              Events
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Join our community events, workshops, and conferences designed to accelerate 
              your entrepreneurial journey and connect with like-minded innovators.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs and Filters */}
      <section className="py-12 bg-background border-b">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="space-y-8">
            {/* Event Status Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                <TabsTrigger value="upcoming" data-testid="tab-upcoming">
                  Upcoming Events
                </TabsTrigger>
                <TabsTrigger value="past" data-testid="tab-past">
                  Past Events
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Event Type Filters */}
            <div className="text-center">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
                Filter by Type
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {eventTypes.map((type) => (
                  <Button
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType(type)}
                    data-testid={`filter-type-${type.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                data-testid={`event-card-${event.id}`}
              >
                <Card className="h-full hover-lift overflow-hidden">
                  <div className="relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge 
                        className={`${getStatusColor(event.status)} text-white`}
                      >
                        {event.status === "upcoming" ? "Upcoming" : "Completed"}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary">
                        {event.type}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {event.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                      {event.description}
                    </p>

                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{event.currentAttendees}/{event.maxAttendees} attendees</span>
                      </div>
                    </div>

                    {event.status === "past" && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-foreground mb-2">Event Outcomes:</p>
                        <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                          {event.outcomes}
                        </p>
                      </div>
                    )}

                    <div className="mb-4">
                      <p className="text-sm font-medium text-foreground mb-1">Speakers:</p>
                      <p className="text-sm text-muted-foreground">
                        {Array.isArray(event.speakers) ? event.speakers.join(", ") : event.speakers}
                      </p>
                    </div>

                    {event.status === "past" && event.mediaCoverage && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-foreground mb-2">Media Coverage:</p>
                        <div className="space-y-1">
                          {event.mediaCoverage.map((media, idx) => (
                            <a
                              key={idx}
                              href={media.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-primary hover:underline"
                            >
                              <ExternalLink className="w-3 h-3" />
                              {media.title} - {media.source || media.platform}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {event.status === "past" && event.photos && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-foreground mb-2">Event Photos:</p>
                        <div className="grid grid-cols-3 gap-2">
                          {event.photos.slice(0, 3).map((photo, idx) => (
                            <img
                              key={idx}
                              src={photo}
                              alt={`Event photo ${idx + 1}`}
                              className="w-full h-16 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                              onClick={() => {/* Could open lightbox here */}}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {event.status === "upcoming" && (
                      <Button 
                        asChild 
                        className="w-full bg-primary text-primary-foreground"
                        data-testid={`register-event-${event.id}`}
                      >
                        <a 
                          href={event.registrationUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Register Now
                        </a>
                      </Button>
                    )}

                    {event.status === "past" && (
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        disabled
                        data-testid={`event-completed-${event.id}`}
                      >
                        Event Completed
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
              data-testid="no-events"
            >
              <p className="text-muted-foreground text-lg">
                No events found matching your criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => setSelectedType("All")}
                className="mt-4"
                data-testid="clear-event-filters"
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Calendar Integration CTA removed per design request */}
    </div>
  );
}
