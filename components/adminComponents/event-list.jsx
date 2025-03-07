"use client"

import { useState } from "react"
import { format, parseISO } from "date-fns"
import { CalendarDays, Clock, Trash2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"

const statusColors = {
  upcoming: "bg-blue-100 text-blue-800 hover:bg-blue-100/80",
  ongoing: "bg-green-100 text-green-800 hover:bg-green-100/80",
  past: "bg-gray-100 text-gray-800 hover:bg-gray-100/80",
}

export function EventList({ club, onDeleteEvent }) {
  const [activeTab, setActiveTab] = useState("all")
  const [deleteDialog, setDeleteDialog] = useState({ open: false, eventId: null })

  const filteredEvents = activeTab === "all" ? club.events : club.events.filter((event) => event.status === activeTab)

  const handleDeleteClick = (eventId) => {
    setDeleteDialog({ open: true, eventId })
  }

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch("/api/eventDelete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clubId: club.id,
          eventId: deleteDialog.eventId,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to delete event")
      }

      onDeleteEvent(deleteDialog.eventId)
      toast({
        title: "Event deleted",
        description: "The event has been deleted successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setDeleteDialog({ open: false, eventId: null })
    }
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab} className="mt-6">
          {filteredEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <CalendarDays className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No events found</h3>
              <p className="text-sm text-muted-foreground mt-1">
                There are no {activeTab !== "all" ? activeTab : ""} events for this club.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => (
                <Card key={event.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <Badge className={statusColors[event.status]}>
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center mt-1">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      {format(parseISO(event.date), "MMMM d, yyyy")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 ml-auto"
                      onClick={() => handleDeleteClick(event.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={deleteDialog.open} onOpenChange={(open) => !open && setDeleteDialog({ open, eventId: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Event</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this event? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialog({ open: false, eventId: null })}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

