"use client";

import { useState, useEffect } from "react";
import { Map, Marker } from "pigeon-maps";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Bus, Clock, MapPin, Info } from "lucide-react";

const TransportationPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [busRoutes, setBusRoutes] = useState([]);

  useEffect(() => {
    const fetchBusSchedules = async () => {
      try {
        const response = await fetch("/api/getBusSchedule"); // Adjust the API endpoint if needed
        if (!response.ok) throw new Error("Failed to fetch bus schedules");
        const data = await response.json();
        setBusRoutes(data);
      } catch (error) {
        console.error("Error fetching bus schedules:", error);
      }
    };

    fetchBusSchedules();
  }, []);

  const filteredRoutes = busRoutes.filter((route) => {
    return (
      route.roadNumber?.toString().includes(searchTerm) ||
      route.startLocation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.endLocation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (route.currentLocation &&
        route.currentLocation
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      route.stops.some((stop) =>
        stop.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });

  const getDelayBadgeColor = (delay) => {
    if (delay.includes("On time")) return "bg-green-500 hover:bg-green-600";
    if (delay.includes("5 min")) return "bg-yellow-500 hover:bg-yellow-600";
    return "bg-red-500 hover:bg-red-600";
  };

  return (
    <div className="container mx-auto p-4 space-y-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 ">
          <div className="bg-white p-4 ">
            <h2 className="text-lg font-semibold py-2">
              Current Buses Location
            </h2>

            <CardContent className="p-0">
              <div className="w-full overflow-hidden">
                <Map
                  width={800}
                  height={500}
                  defaultCenter={[23.8103, 90.4125]}
                  defaultZoom={13}
                  attribution={false}
                  style={{ width: "100%", height: "100%" }}
                >
                  {busRoutes.map((route, index) => (
                    <Marker
                      key={index}
                      width={50}
                      anchor={[23.8103, 90.4125]}
                    />
                  ))}
                </Map>
              </div>
              <div className="flex flex-wrap gap-4 text-sm pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>On Time</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span>Slight Delay</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>Significant Delay</span>
                </div>
              </div>
            </CardContent>
          </div>
        </div>

        <div className="space-y-4">
          <Tabs defaultValue="all">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search routes, stops or locations..."
                className="pl-10 h-12 bg-white rounded-lg shadow-sm border-muted focus-visible:ring-2 focus-visible:ring-offset-0"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <TabsContent value="all" className="m-0">
              <div className="space-y-3 overflow-y-auto pr-1 max-h-[565px] py-4 custom-scrollbar">
                {filteredRoutes.length > 0 ? (
                  filteredRoutes.map((route) => (
                    <Card
                      key={route._id}
                      className="shadow-sm hover:shadow-md transition-shadow"
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <Badge variant="outline" className="mb-1 font-bold">
                              Route {route.routeNumber}
                            </Badge>
                            <CardTitle className="text-base">
                              {route.startLocation} → {route.endLocation}
                            </CardTitle>
                          </div>
                          <Badge
                            className={getDelayBadgeColor(route.delayInfo)}
                          >
                            {route.delayInfo}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Bus className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              Current:
                            </span>
                          </div>
                          <div className="font-medium">
                            {route.startLocation}
                          </div>

                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              Departure:
                            </span>
                          </div>
                          <div className="font-medium">
                            {route.departureTimes.join(", ")}
                          </div>
                        </div>

                        <div className="mt-3">
                          <div className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> Stops:
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {route.stops.map((stop, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs"
                              >
                                {stop}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-center text-gray-500">
                    No bus routes found.
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TransportationPage;
