import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, CalendarCheck, Palette, Code, Theater, Briefcase, Globe, Code2, Lightbulb, Trophy } from 'lucide-react';

// Helper function to get the icon component
const getIconComponent = (iconName) => {
  const icons = {
    Palette: Palette,
    Code: Code,
    Theater: Theater,
    Briefcase: Briefcase,
    Globe: Globe,
    Code2: Code2,
    Lightbulb: Lightbulb,
    Trophy: Trophy,
  };
  
  const IconComponent = icons[iconName] || Palette;
  return <IconComponent className="h-5 w-5" />;
};

// Helper component for event cards
const EventCard = ({ event }) => {
  const statusColors = {
    past: "text-gray-500 bg-gray-100",
    ongoing: "text-green-500 bg-green-100",
    upcoming: "text-blue-500 bg-blue-100"
  };
  
  const statusIcons = {
    past: <Calendar className="h-4 w-4 mr-1" />,
    ongoing: <Clock className="h-4 w-4 mr-1" />,
    upcoming: <CalendarCheck className="h-4 w-4 mr-1" />
  };
  
  return (
    <Card className="mb-3 px-8 hover:shadow-md transition-all">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base">{event.title}</CardTitle>
          <Badge variant="outline" className={statusColors[event.status]}>
            <span className="flex items-center">
              {statusIcons[event.status]}
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm">{event.description}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <p className="text-xs text-muted-foreground">{event.date}</p>
      </CardFooter>
    </Card>
  );
};

const EventModal = ({ isOpen, onClose, club }) => {
  const [activeTab, setActiveTab] = useState("all");

  // Filter events based on active tab
  const getFilteredEvents = () => {
    if (!club) return [];
    
    if (activeTab === "all") {
      return club.events;
    } else {
      return club.events.filter(event => event.status === activeTab);
    }
  };

  return (
    <Sheet  open={isOpen} onOpenChange={onClose} side="right">
      <SheetContent className="sm:max-w-md md:max-w-lg overflow-y-auto">
        {club && (
          <>
            <SheetHeader className="mb-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-full bg-muted">
                  {getIconComponent(club.icon)}
                </div>
                <SheetTitle>{club.name}</SheetTitle>
              </div>
              <SheetDescription>{club.description}</SheetDescription>
              <Badge className="mt-2 self-start">{club.category}</Badge>
            </SheetHeader>
            
            <Tabs defaultValue="all" className="mt-6" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="mt-0">
                {getFilteredEvents().length > 0 ? (
                  getFilteredEvents().map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No events in this category</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
            
           
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default EventModal;
