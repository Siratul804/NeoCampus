"use client"

import { useState } from "react"
import { format, parseISO } from "date-fns"
import { Trash2, MoreHorizontal } from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const statusColors = {
  upcoming: "bg-blue-100 text-blue-800 hover:bg-blue-100/80",
  ongoing: "bg-green-100 text-green-800 hover:bg-green-100/80",
  past: "bg-gray-100 text-gray-800 hover:bg-gray-100/80",
}

export function EventTable({ club, onDeleteEvent }) {
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
      toast.success("Event deleted successfully")
    } catch (error) {
      toast.error("Failed to delete event", {
        description: error.message || "Something went wrong. Please try again.",
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
            <div className="text-center py-10">
              <p className="text-muted-foreground">No events found in this category</p>
            </div>
          ) : (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{event.title}</TableCell>
                      <TableCell>{format(parseISO(event.date), "MMM d, yyyy")}</TableCell>
                      <TableCell>
                        <Badge className={statusColors[event.status]}>
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{event.description}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              className="text-red-600 focus:text-red-600"
                              onClick={() => handleDeleteClick(event.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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

