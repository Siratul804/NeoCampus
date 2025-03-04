"use client"

import { useState, useEffect } from "react"
import { Map, Marker } from "pigeon-maps"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { buildingsData } from "@/data/BuildingData"
import { Search, MapPin, Navigation, Info, MapIcon, ArrowRight } from "lucide-react"

const CampusNavigationPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [arMode, setArMode] = useState(false)
  const [selectedBuilding, setSelectedBuilding] = useState(null)
  const [mapCenter, setMapCenter] = useState([23.8103, 90.4125])
  const [mapZoom, setMapZoom] = useState(15)

  // Filter buildings by name based on search query
  const filteredBuildings = buildingsData.filter((b) => b.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // Update map center when search query changes
  useEffect(() => {
    if (filteredBuildings.length > 0) {
      setMapCenter(filteredBuildings[0].coords)
      setMapZoom(17)
      setSelectedBuilding(filteredBuildings[0])
    } else {
      // Reset to default if no buildings match
      setMapCenter([23.8103, 90.4125])
      setMapZoom(15)
      setSelectedBuilding(null)
    }
  }, [filteredBuildings])

  // Handle building selection
  const handleBuildingSelect = (building) => {
    setSelectedBuilding(building)
    setMapCenter(building.coords)
    setMapZoom(17)
  }

  return (
    <div className="container mx-auto p-4 space-y-6 max-w-7xl">
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl font-bold">Campus Navigation</CardTitle>
              <CardDescription>Explore buildings and locations around campus</CardDescription>
            </div>
            <Button
              onClick={() => setArMode((prev) => !prev)}
              variant={arMode ? "default" : "outline"}
              className="gap-2"
            >
              <Navigation className="h-4 w-4" />
              {arMode ? "Disable AR Mode" : "Enable AR Mode"}
            </Button>
          </div>
          {arMode && (
            <div className="p-3 bg-blue-50 text-blue-800 rounded-md mt-4 flex items-center gap-2">
              <Info className="h-5 w-5" />
              <p className="text-sm">
                AR Mode is enabled. Point your device at buildings to see information. (Mobile AR overlay coming soon!)
              </p>
            </div>
          )}
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Search className="h-4 w-4" />
              Find Locations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Search for a building..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />

            <ScrollArea className="h-[calc(100vh-350px)] pr-4">
              <div className="space-y-2">
                {filteredBuildings.length > 0 ? (
                  filteredBuildings.map((building) => (
                    <div
                      key={building.id}
                      className={`p-3 border rounded-md cursor-pointer transition-colors ${
                        selectedBuilding?.id === building.id ? "bg-primary/10 border-primary" : "hover:bg-muted"
                      }`}
                      onClick={() => handleBuildingSelect(building)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{building.name}</h3>
                         
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 shrink-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleBuildingSelect(building)
                          }}
                        >
                          <MapPin className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    <p>No buildings found matching your search.</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <Tabs defaultValue="map">
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Campus View</CardTitle>
                <TabsList>
                  <TabsTrigger value="map" className="flex items-center gap-1">
                    <MapIcon className="h-4 w-4" />
                    Map
                  </TabsTrigger>
                  <TabsTrigger value="info" className="flex items-center gap-1">
                    <Info className="h-4 w-4" />
                    Details
                  </TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <TabsContent value="map" className="m-0">
                <div className="w-full h-[calc(100vh-300px)] rounded-lg overflow-hidden border">
                  <Map
                    width={800}
                    height={500}
                    center={mapCenter}
                    zoom={mapZoom}
                    onBoundsChanged={({ center, zoom }) => {
                      setMapCenter(center)
                      setMapZoom(zoom)
                    }}
                    style={{ width: "100%", height: "100%" }}
                  >
                    {filteredBuildings.map((building) => (
                      <Marker
                        key={building.id}
                        width={50}
                        anchor={building.coords}
                        color={selectedBuilding?.id === building.id ? "#ff0000" : "#3b82f6"}
                        onClick={() => handleBuildingSelect(building)}
                      />
                    ))}
                  </Map>
                </div>
              </TabsContent>
              <TabsContent value="info" className="m-0">
                {selectedBuilding ? (
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-xl font-semibold">{selectedBuilding.name}</h2>
                      <Badge variant="outline" className="mt-2">
                        ID: {selectedBuilding.id}
                      </Badge>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
                      <p>{selectedBuilding.description}</p>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Coordinates</h3>
                      <p className="font-mono text-sm">
                        Latitude: {selectedBuilding.coords[0].toFixed(4)}, Longitude:{" "}
                        {selectedBuilding.coords[1].toFixed(4)}
                      </p>
                    </div>
                    <div className="pt-4">
                      <Button className="w-full gap-2">
                        Get Directions <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[calc(100vh-300px)] text-center p-4">
                    <Info className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No Location Selected</h3>
                    <p className="text-muted-foreground mt-2">
                      Select a location from the list to view detailed information
                    </p>
                  </div>
                )}
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}

export default CampusNavigationPage

