"use client"

import { useState } from "react"
import { PlusCircle, Filter, ChevronDown } from "lucide-react"
import { Toaster, toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CreateEventForm } from "@/components/adminComponents/create-event-form"
import { EventTable } from "@/components/adminComponents/event-table"
import { clubsData } from "@/data/ClubData"

export default function EventsClubsAdmin() {
  const [clubs, setClubs] = useState(clubsData)
  const [selectedClub, setSelectedClub] = useState(clubs[0])
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = ["all", ...new Set(clubs.map((club) => club.category))]

  const filteredClubs = activeCategory === "all" ? clubs : clubs.filter((club) => club.category === activeCategory)

  const handleSelectClub = (club) => {
    setSelectedClub(club)
  }

  const handleCreateEvent = (newEvent) => {
    setClubs((prevClubs) =>
      prevClubs.map((club) => {
        if (club.id === selectedClub.id) {
          const updatedClub = {
            ...club,
            events: [...club.events, newEvent],
          }
          setSelectedClub(updatedClub)
          return updatedClub
        }
        return club
      }),
    )
    toast.success("Event created successfully")
  }

  const handleDeleteEvent = (eventId) => {
    setClubs((prevClubs) =>
      prevClubs.map((club) => {
        if (club.id === selectedClub.id) {
          const updatedClub = {
            ...club,
            events: club.events.filter((event) => event.id !== eventId),
          }
          setSelectedClub(updatedClub)
          return updatedClub
        }
        return club
      }),
    )
    toast.success("Event deleted successfully")
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Events & Clubs</h1>
            <p className="text-muted-foreground">Manage club events and activities across your organization</p>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-1">
                  <Filter className="h-4 w-4" />
                  Filter by Category
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={activeCategory === category ? "bg-muted" : ""}
                  >
                    {category === "all" ? "All Categories" : category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button onClick={() => setIsCreateEventOpen(true)}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClubs.map((club) => {
            const upcomingCount = club.events.filter((e) => e.status === "upcoming").length
            const ongoingCount = club.events.filter((e) => e.status === "ongoing").length

            return (
              <Card
                key={club.id}
                className={`cursor-pointer hover:border-primary/50 transition-colors ${
                  selectedClub?.id === club.id ? "border-primary" : ""
                }`}
                onClick={() => handleSelectClub(club)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between items-center">
                    <span>{club.name}</span>
                    <div className="flex gap-2 text-xs">
                      {upcomingCount > 0 && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                          {upcomingCount} upcoming
                        </span>
                      )}
                      {ongoingCount > 0 && (
                        <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                          {ongoingCount} ongoing
                        </span>
                      )}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">{club.description}</p>
                  <div className="text-xs font-medium text-muted-foreground">
                    {club.events.length} events • {club.category}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {selectedClub && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>{selectedClub.name} Events</CardTitle>
            </CardHeader>
            <CardContent>
              <EventTable club={selectedClub} onDeleteEvent={handleDeleteEvent} />
            </CardContent>
          </Card>
        )}
      </div>

      <CreateEventForm
        isOpen={isCreateEventOpen}
        onClose={() => setIsCreateEventOpen(false)}
        clubId={selectedClub?.id}
        onEventCreated={handleCreateEvent}
      />

      <Toaster />
    </div>
  )
}

