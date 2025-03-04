"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { clubsData } from "@/data/ClubData"
import { Palette, Code, Theater, Briefcase, Globe, Code2, Lightbulb, Trophy, Search, Filter } from "lucide-react"
import EventModal from "@/app/components/EventModal"


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
  }

  const IconComponent = icons[iconName] || Palette
  return <IconComponent className="h-5 w-5" />
}

// Update the EventsClubsPage component to use the EventModal component
const EventsClubsPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedClub, setSelectedClub] = useState(null)
  const [isDrawerOpen, setDrawerOpen] = useState(false)

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

  const openDrawerForClub = (club) => {
    setSelectedClub(club)
    setDrawerOpen(true)
  }

  const closeDrawer = () => {
    setDrawerOpen(false)
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

  return (
    <div className="container mx-auto p-4 space-y-6">
     

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
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
                onClick={() => openDrawerForClub(club)}
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
                      openDrawerForClub(club)
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

      
      <EventModal isOpen={isDrawerOpen} onClose={closeDrawer} club={selectedClub} />
    </div>
  )
}

export default EventsClubsPage

