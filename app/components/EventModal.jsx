"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, Clock, MapPin, Users } from "lucide-react"

export default function EventModal({ isOpen, onClose, club }) {
  const [rsvpEvents, setRsvpEvents] = useState({})
  const [reminders, setReminders] = useState({})

  if (!club) return null

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

  // Group events by status
  const upcomingEvents = club.events.filter((event) => event.status === "upcoming")
  const ongoingEvents = club.events.filter((event) => event.status === "ongoing")
  const pastEvents = club.events.filter((event) => event.status === "past")

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{club.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <DialogTitle>{club.name}</DialogTitle>
            <Badge variant="outline">{club.category}</Badge>
          </div>
          <DialogDescription>{club.description}</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="upcoming" className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">Upcoming ({upcomingEvents.length})</TabsTrigger>
            <TabsTrigger value="ongoing">Ongoing ({ongoingEvents.length})</TabsTrigger>
            <TabsTrigger value="past">Past ({pastEvents.length})</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-auto">
            <TabsContent value="upcoming" className="p-1">
              {upcomingEvents.length > 0 ? (
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <Card key={event.id}>
                      <CardHeader>
                        <CardTitle>{event.title}</CardTitle>
                        <CardDescription className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" /> {event.date}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>{event.description}</p>
                        {event.location && (
                          <div className="flex items-center mt-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 mr-1" /> {event.location}
                          </div>
                        )}
                        {event.time && (
                          <div className="flex items-center mt-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 mr-1" /> {event.time}
                          </div>
                        )}
                        {event.attendees && (
                          <div className="flex items-center mt-2 text-sm text-muted-foreground">
                            <Users className="h-4 w-4 mr-1" /> {event.attendees} attendees
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="flex justify-between border-t pt-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`modal-rsvp-${event.id}`}
                            checked={rsvpEvents[event.id] || false}
                            onCheckedChange={() => handleRsvpToggle(event.id)}
                          />
                          <Label htmlFor={`modal-rsvp-${event.id}`}>RSVP</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`modal-reminder-${event.id}`}
                            checked={reminders[event.id] || false}
                            onCheckedChange={() => handleReminderToggle(event.id)}
                          />
                          <Label htmlFor={`modal-reminder-${event.id}`}>Reminder</Label>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No upcoming events</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="ongoing" className="p-1">
              {ongoingEvents.length > 0 ? (
                <div className="space-y-4">
                  {ongoingEvents.map((event) => (
                    <Card key={event.id}>
                      <CardHeader>
                        <CardTitle>{event.title}</CardTitle>
                        <CardDescription className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" /> {event.date}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>{event.description}</p>
                        {event.location && (
                          <div className="flex items-center mt-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 mr-1" /> {event.location}
                          </div>
                        )}
                        {event.time && (
                          <div className="flex items-center mt-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 mr-1" /> {event.time}
                          </div>
                        )}
                        {event.attendees && (
                          <div className="flex items-center mt-2 text-sm text-muted-foreground">
                            <Users className="h-4 w-4 mr-1" /> {event.attendees} attendees
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="flex justify-between border-t pt-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`modal-rsvp-${event.id}`}
                            checked={rsvpEvents[event.id] || false}
                            onCheckedChange={() => handleRsvpToggle(event.id)}
                          />
                          <Label htmlFor={`modal-rsvp-${event.id}`}>RSVP</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`modal-reminder-${event.id}`}
                            checked={reminders[event.id] || false}
                            onCheckedChange={() => handleReminderToggle(event.id)}
                          />
                          <Label htmlFor={`modal-reminder-${event.id}`}>Reminder</Label>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No ongoing events</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="past" className="p-1">
              {pastEvents.length > 0 ? (
                <div className="space-y-4">
                  {pastEvents.map((event) => (
                    <Card key={event.id}>
                      <CardHeader>
                        <CardTitle>{event.title}</CardTitle>
                        <CardDescription className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" /> {event.date}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>{event.description}</p>
                        {event.location && (
                          <div className="flex items-center mt-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 mr-1" /> {event.location}
                          </div>
                        )}
                        {event.time && (
                          <div className="flex items-center mt-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 mr-1" /> {event.time}
                          </div>
                        )}
                        {event.attendees && (
                          <div className="flex items-center mt-2 text-sm text-muted-foreground">
                            <Users className="h-4 w-4 mr-1" /> {event.attendees} attendees
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No past events</p>
                </div>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

