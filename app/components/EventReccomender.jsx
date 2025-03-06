"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, Tag, Sparkles, AlertCircle } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function EventRecommender() {
  const [selectedTags, setSelectedTags] = useState([])
  const [recommendedEvents, setRecommendedEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [rsvpEvents, setRsvpEvents] = useState({})
  const [reminders, setReminders] = useState({})

  const availableTags = [
    { id: 1, name: "tech", label: "Technology" },
    { id: 2, name: "art", label: "Art" },
    { id: 3, name: "Shakespeare", label: "Shakespeare" },
    { id: 4, name: "career", label: "Career" },
    { id: 5, name: "modern", label: "Modern" },
    { id: 6, name: "Workshop", label: "Workshop" },
  ]

  // Handle tag selection
  const toggleTag = (tagName) => {
    setSelectedTags((prev) => {
      if (prev.includes(tagName)) {
        return prev.filter((tag) => tag !== tagName)
      } else {
        return [...prev, tagName]
      }
    })
  }

  // Fetch recommended events
  const fetchRecommendedEvents = async () => {
    if (selectedTags.length === 0) {
      setRecommendedEvents([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Use the first selected tag for the API call
      const tag = selectedTags[0]
      const response = await fetch(`/api/event-recommend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tag }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch recommended events")
      }

      const data = await response.json()
      setRecommendedEvents(data.events || [])
    } catch (err) {
      console.error("Error fetching recommended events:", err)
      setError("Failed to load recommendations. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Fetch recommendations when tags change
  useEffect(() => {
    fetchRecommendedEvents()
  }, [selectedTags])

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

  // Get status badge
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
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="mr-2 h-5 w-5" />
            AI Event Recommender
          </CardTitle>
          <CardDescription>Select your interests to get personalized event recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-6">
            {availableTags.map((tag) => (
              <Badge
                key={tag.id}
                variant={selectedTags.includes(tag.name) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/90 transition-colors"
                onClick={() => toggleTag(tag.name)}
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag.label}
              </Badge>
            ))}
          </div>

          {selectedTags.length === 0 ? (
            <div className="text-center py-8">
              <Tag className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium">Select tags to get started</h3>
              <p className="text-muted-foreground text-center mt-2">
                Choose your interests above to receive personalized event recommendations
              </p>
            </div>
          ) : loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/4 mt-2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6 mt-2" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-10 w-full" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <AlertCircle className="h-8 w-8 mx-auto text-destructive mb-2" />
              <h3 className="text-lg font-medium">Error loading recommendations</h3>
              <p className="text-muted-foreground text-center mt-2">{error}</p>
              <Button variant="outline" className="mt-4" onClick={fetchRecommendedEvents}>
                Try Again
              </Button>
            </div>
          ) : (
            <ScrollArea className="h-[500px] pr-4">
              {recommendedEvents.length > 0 ? (
                <div className="space-y-4">
                  {recommendedEvents.map((event) => (
                    <Card key={event.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{event.title}</CardTitle>
                          {getStatusBadge(event.status)}
                        </div>
                        <CardDescription className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" /> {event.date}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{event.description}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t pt-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`rec-rsvp-${event.id}`}
                            checked={rsvpEvents[event.id] || false}
                            onCheckedChange={() => handleRsvpToggle(event.id)}
                          />
                          <Label htmlFor={`rec-rsvp-${event.id}`}>RSVP</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`rec-reminder-${event.id}`}
                            checked={reminders[event.id] || false}
                            onCheckedChange={() => handleReminderToggle(event.id)}
                          />
                          <Label htmlFor={`rec-reminder-${event.id}`}>Reminder</Label>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Sparkles className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <h3 className="text-lg font-medium">No recommendations found</h3>
                  <p className="text-muted-foreground text-center mt-2">
                    Try selecting different tags to find events that match your interests
                  </p>
                </div>
              )}
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

