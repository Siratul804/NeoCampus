"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  CalendarIcon,
  Search,
  Filter,
  Clock,
  Palette,
  Code,
  Theater,
  Briefcase,
  Globe,
  Lightbulb,
  Trophy,
} from "lucide-react"
import { format } from "date-fns"

import { clubsData } from "@/data/ClubData"
import EventModal from "@/app/components/EventModal"
import EventRecommender from "@/app/components/EventReccomender"


// Helper function to get the icon component
const getIconComponent = (iconName) => {
  const icons = {
    Palette: Palette,
    Code: Code,
    Theater: Theater,
    Briefcase: Briefcase,
    Globe: Globe,
    Lightbulb: Lightbulb,
    Trophy: Trophy,
  }

  const IconComponent = icons[iconName] || Palette
  return <IconComponent className="h-5 w-5" />
}

export default function UniversityPortal() {
  const [date, setDate] = useState(new Date())
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedClub, setSelectedClub] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [view, setView] = useState("calendar")
  const [events, setEvents] = useState([])
  const [rsvpEvents, setRsvpEvents] = useState({})
  const [reminders, setReminders] = useState({})

  // Get unique categories
  const categories = ["all", ...new Set(clubsData.map((club) => club.category))]

  // Filter clubs based on search and category
  const filteredClubs = clubsData.filter((club) => {
    const matchesSearch =
      club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || club.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  // Extract all events from clubs
  useEffect(() => {
    const allEvents = []
    clubsData.forEach((club) => {
      club.events.forEach((event) => {
        allEvents.push({
          ...event,
          clubId: club.id,
          clubName: club.name,
          clubIcon: club.icon,
          clubCategory: club.category,
        })
      })
    })
    setEvents(allEvents)
  }, [])

  // Get events for the selected date
  const getEventsForDate = (selectedDate) => {
    const dateStr = format(selectedDate, "yyyy-MM-dd")
    return events.filter((event) => event.date === dateStr)
  }

  const selectedDateEvents = getEventsForDate(date)

  // Handle RSVP toggle
  const handleRsvpToggle = (eventId) => {
    setRsvpEvents((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }))
  }

  // Handle reminder toggle
  const handleReminderToggle = (eventId) => {
    setReminders((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }))
  }

  // Open modal for club
  const openModalForClub = (club) => {
    setSelectedClub(club)
    setIsModalOpen(true)
  }

  // Count events by status for a club
  const countEventsByStatus = (club) => {
    const counts = {
      past: club.events.filter((e) => e.status === "past").length,
      ongoing: club.events.filter((e) => e.status === "ongoing").length,
      upcoming: club.events.filter((e) => e.status === "upcoming").length,
    }
    return counts
  }

  // Get event status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "upcoming":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            Upcoming
          </Badge>
        )
      case "ongoing":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            Ongoing
          </Badge>
        )
      case "past":
        return (
          <Badge variant="secondary" className="bg-gray-100 text-gray-700">
            Past
          </Badge>
        )
      default:
        return null
    }
  }

  // Get category color
  const getCategoryColor = (category) => {
    switch (category) {
      case "Technology":
        return "bg-blue-500"
      case "Creative":
        return "bg-pink-500"
      case "Cultural":
        return "bg-amber-500"
      case "Professional":
        return "bg-emerald-500"
      case "Sports":
        return "bg-red-500"
      default:
        return "bg-indigo-500"
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">University Events & Clubs</h1>
        <p className="text-muted-foreground">Discover events, join clubs, and stay connected with campus activities</p>
      </div>

      <Tabs defaultValue="calendar" className="w-full" onValueChange={setView}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="clubs">Clubs & Organizations</TabsTrigger>
          <TabsTrigger value="recommended">Recommended Events</TabsTrigger>
        </TabsList>

        {/* Calendar Tab */}
        <TabsContent value="calendar" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarIcon className="mr-2 h-5 w-5" />
                  Event Calendar
                </CardTitle>
                <CardDescription>Select a date to view events</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => setDate(newDate || new Date())}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Events on {format(date, "MMMM d, yyyy")}
                </CardTitle>
                <CardDescription>
                  {selectedDateEvents.length} event{selectedDateEvents.length !== 1 ? "s" : ""} scheduled
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  {selectedDateEvents.length > 0 ? (
                    <div className="space-y-4">
                      {selectedDateEvents.map((event) => (
                        <Card key={event.id} className="overflow-hidden">
                          <div className={`h-2 ${getCategoryColor(event.clubCategory)}`} />
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-lg">{event.title}</CardTitle>
                                <CardDescription className="flex items-center mt-1">
                                  <div className="p-1 rounded-full bg-muted mr-2">
                                    {getIconComponent(event.clubIcon)}
                                  </div>
                                  {event.clubName}
                                </CardDescription>
                              </div>
                              {getStatusBadge(event.status)}
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm">{event.description}</p>
                          </CardContent>
                          <CardFooter className="flex justify-between border-t pt-4">
                            <div className="flex items-center space-x-2">
                              <Switch
                                id={`rsvp-${event.id}`}
                                checked={rsvpEvents[event.id] || false}
                                onCheckedChange={() => handleRsvpToggle(event.id)}
                              />
                              <Label htmlFor={`rsvp-${event.id}`}>RSVP</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch
                                id={`reminder-${event.id}`}
                                checked={reminders[event.id] || false}
                                onCheckedChange={() => handleReminderToggle(event.id)}
                              />
                              <Label htmlFor={`reminder-${event.id}`}>Reminder</Label>
                            </div>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full py-8">
                      <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No events scheduled</h3>
                      <p className="text-muted-foreground text-center mt-2">
                        There are no events scheduled for this date. Try selecting a different date.
                      </p>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Clubs Tab */}
        <TabsContent value="clubs" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search clubs by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-white rounded-lg shadow-sm border-muted focus-visible:ring-2 focus-visible:ring-offset-0"
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full h-12 bg-white">
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by category" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredClubs.length === 0 ? (
            <div className="text-center py-10">
              <h3 className="text-xl font-medium">No clubs found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredClubs.map((club) => {
                const eventCounts = countEventsByStatus(club)

                return (
                  <Card
                    key={club.id}
                    className="cursor-pointer hover:shadow-lg transition-all duration-300 border-t-4"
                    style={{
                      borderTopColor:
                        club.category === "Technology"
                          ? "#3b82f6"
                          : club.category === "Creative"
                            ? "#ec4899"
                            : club.category === "Cultural"
                              ? "#f59e0b"
                              : club.category === "Professional"
                                ? "#10b981"
                                : club.category === "Sports"
                                  ? "#ef4444"
                                  : "#6366f1",
                    }}
                    onClick={() => openModalForClub(club)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="p-1.5 rounded-full bg-muted">{getIconComponent(club.icon)}</div>
                          <CardTitle className="text-lg">{club.name}</CardTitle>
                        </div>
                        <Badge variant="outline">{club.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{club.description}</p>
                      <div className="flex space-x-2">
                        {eventCounts.upcoming > 0 && (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                            {eventCounts.upcoming} Upcoming
                          </Badge>
                        )}
                        {eventCounts.ongoing > 0 && (
                          <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-200">
                            {eventCounts.ongoing} Ongoing
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation()
                          openModalForClub(club)
                        }}
                      >
                        View Club Events
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>

        {/* Recommended Events Tab */}
        <TabsContent value="recommended">
          <EventRecommender />
        </TabsContent>
      </Tabs>

      {/* Event Modal */}
      <EventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} club={selectedClub} />
    </div>
  )
}

