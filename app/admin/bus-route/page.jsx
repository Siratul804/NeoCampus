"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle,CardDescription } from "@/components/ui/card";
import { Pencil, Trash2, Bus, Loader2,UserPlus } from "lucide-react";
import { Toaster, toast } from "sonner";

export default function TransportationAdmin() {
  const router = useRouter();
  const [busSchedules, setBusSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);
  const [formData, setFormData] = useState({
    routeNumber: "",
    startLocation: "",
    endLocation: "",
    stops: "",
    departureTimes: "",
    delayInfo: "On Time",
  });

  // Fetch bus schedules
  useEffect(() => {
    fetchBusSchedules();
  }, []);

  const fetchBusSchedules = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/getBusSchedule");
      if (!response.ok) {
        throw new Error("Failed to fetch bus schedules");
      }
      const data = await response.json();
      setBusSchedules(data);
    } catch (error) {
      console.error("Error fetching bus schedules:", error);
      toast.error("Failed to load bus schedules", {
        description: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle edit bus
  const handleEditClick = (bus) => {
    setSelectedBus(bus);
    setFormData({
      routeNumber: bus.routeNumber,
      startLocation: bus.startLocation,
      endLocation: bus.endLocation,
      stops: bus.stops.join(", "),
      departureTimes: bus.departureTimes.join(", "),
      delayInfo: bus.delayInfo || "On Time",
    });
    setEditDialogOpen(true);
  };

  // Handle delete bus
  const handleDeleteClick = (bus) => {
    setSelectedBus(bus);
    setDeleteDialogOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Submit edit form
  const handleEditSubmit = async () => {
    try {
      // Convert comma-separated strings to arrays
      const formattedData = {
        ...formData,
        stops: formData.stops.split(",").map((stop) => stop.trim()),
        departureTimes: formData.departureTimes
          .split(",")
          .map((time) => time.trim()),
      };

      const response = await fetch("/api/editBus", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedBus._id,
          ...formattedData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update bus schedule");
      }

      toast.success("Bus schedule updated", {
        description: "The bus information has been successfully updated.",
      });

      setEditDialogOpen(false);
      fetchBusSchedules();
    } catch (error) {
      console.error("Error updating bus schedule:", error);
      toast.error("Failed to update bus schedule", {
        description: "Please check your input and try again.",
      });
    }
  };

  // Delete bus
  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch("/api/deleteBus", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedBus._id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete bus schedule");
      }

      toast.success("Bus schedule deleted", {
        description: "The bus has been successfully removed from the system.",
      });

      setDeleteDialogOpen(false);
      fetchBusSchedules();
    } catch (error) {
      console.error("Error deleting bus schedule:", error);
      toast.error("Failed to delete bus schedule", {
        description: "Please try again later.",
      });
    }
  };

  return (
    <div className="container mx-auto py-6">
      <Toaster richColors position="top-right" />
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex text-2xl">
              {" "}
              <Bus className="h-6 w-6 mr-2" />
              Transportation Management
            </CardTitle>
            <CardDescription>
              Manage your Bus Routes and time from this dashboard
            </CardDescription>
          </div>
          <Button className="ml-auto">
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <Table>
              <TableCaption>
                List of all bus schedules in the system
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Route Number</TableHead>
                  <TableHead>Start Location</TableHead>
                  <TableHead>End Location</TableHead>
                  <TableHead>Departure Times</TableHead>
                  <TableHead>Stops</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {busSchedules.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No bus schedules found
                    </TableCell>
                  </TableRow>
                ) : (
                  busSchedules.map((bus) => (
                    <TableRow key={bus._id}>
                      <TableCell className="font-medium">
                        {bus.routeNumber}
                      </TableCell>
                      <TableCell>{bus.startLocation}</TableCell>
                      <TableCell>{bus.endLocation}</TableCell>
                      <TableCell>
                        <div className="max-h-24 overflow-y-auto">
                          {bus.departureTimes.map((time, index) => (
                            <div key={index} className="mb-1">
                              {time}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-h-24 overflow-y-auto">
                          {bus.stops.map((stop, index) => (
                            <div key={index} className="mb-1">
                              {stop}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            bus.delayInfo === "On Time"
                              ? "bg-green-100 text-green-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {bus.delayInfo}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEditClick(bus)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDeleteClick(bus)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Bus Schedule</DialogTitle>
            <DialogDescription>
              Update the information for route {formData.routeNumber}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="routeNumber">Route Number</Label>
                <Input
                  id="routeNumber"
                  name="routeNumber"
                  value={formData.routeNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="delayInfo">Status</Label>
                <Input
                  id="delayInfo"
                  name="delayInfo"
                  value={formData.delayInfo}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startLocation">Start Location</Label>
                <Input
                  id="startLocation"
                  name="startLocation"
                  value={formData.startLocation}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endLocation">End Location</Label>
                <Input
                  id="endLocation"
                  name="endLocation"
                  value={formData.endLocation}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="departureTimes">
                Departure Times (comma separated)
              </Label>
              <Textarea
                id="departureTimes"
                name="departureTimes"
                value={formData.departureTimes}
                onChange={handleInputChange}
                rows={3}
                placeholder="08:00 AM, 10:00 AM, 12:00 PM"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stops">Stops (comma separated)</Label>
              <Textarea
                id="stops"
                name="stops"
                value={formData.stops}
                onChange={handleInputChange}
                rows={3}
                placeholder="Stop 1, Stop 2, Stop 3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSubmit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the bus schedule for route{" "}
              {selectedBus?.routeNumber}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
