"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, ChevronRight, Eye, Pin } from "lucide-react";
import { toast, Toaster } from "sonner";
import { updates, announcements } from "@/data/UniversityData";
import { useGetAnnouncements } from "@/hooks/tanstack/useAnnouncements";

export default function UpdatesAndAnnouncements() {
  const [pinnedAnnouncements, setPinnedAnnouncements] = useState([]);

  const togglePin = (id) => {
    if (pinnedAnnouncements.includes(id)) {
      setPinnedAnnouncements(pinnedAnnouncements.filter((item) => item !== id));
      toast.success("Announcement unpinned");
    } else {
      setPinnedAnnouncements([...pinnedAnnouncements, id]);
      toast.success("Announcement pinned for later reference");
    }
  };

  const markAsRead = (id, type) => {
    toast.success(
      `${type === "update" ? "Update" : "Announcement"} marked as read`
    );
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // const { data, isLoading } = useGetAnnouncements();

  return (
    <div className="container mx-auto py-8 px-4">
      <Toaster position="top-right" />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          University Information Center
        </h1>
        <p className="text-slate-500 mt-1">
          Stay informed with the latest updates and announcements
        </p>
      </div>

      <Tabs defaultValue="updates" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="updates" className="text-base">
            <Calendar className="mr-2 h-4 w-4" />
            Updates
          </TabsTrigger>
          <TabsTrigger value="announcements" className="text-base">
            <Bell className="mr-2 h-4 w-4" />
            Announcements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="updates" className="space-y-4">
          {updates.map((update) => (
            <Card
              key={update.id}
              className="overflow-hidden transition-all hover:shadow-sm"
            >
              <CardHeader className="py-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-semibold text-slate-800">
                      {update.title}
                    </CardTitle>
                    <CardDescription className="text-sm mt-0">
                      {formatDate(update.date)} • {update.department}
                    </CardDescription>
                  </div>
                  <Badge
                    variant={
                      update.category === "Academic"
                        ? "default"
                        : update.category === "Administrative"
                        ? "secondary"
                        : update.category === "Event"
                        ? "outline"
                        : "destructive"
                    }
                  >
                    {update.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="py-0">
                <p className="text-sm text-slate-600 line-clamp-2">
                  {update.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="announcements" className="space-y-4">
          {announcements.map((announcement) => (
            <Card
              key={announcement.id}
              className={`overflow-hidden transition-all hover:shadow-sm ${
                pinnedAnnouncements.includes(announcement.id)
                  ? "border border-red-600"
                  : ""
              }`}
            >
              <CardHeader className="py-0">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-semibold text-slate-800 flex items-center">
                      {announcement.title}
                      {announcement.important && (
                        <Badge variant="destructive" className="ml-2 text-xs">
                          Important
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="text-sm mt-0">
                      {formatDate(announcement.date)} • {announcement.from}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => togglePin(announcement.id)}
                    className={
                      pinnedAnnouncements.includes(announcement.id)
                        ? "text-primary"
                        : ""
                    }
                  >
                    <Pin className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="py-0">
                <p className="text-sm text-slate-600 line-clamp-2">
                  {announcement.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
