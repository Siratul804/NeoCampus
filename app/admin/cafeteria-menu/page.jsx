"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { socket } from "@/socket";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Plus, ClipboardList, Trash2 } from "lucide-react";

export default function CafeteriaMenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [notification, setNotification] = useState("");
  const [loading, setLoading] = useState(true);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [preordersOpen, setPreordersOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    nutrition: "",
    image: "",
  });

  console.log(notification);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preorders, setPreorders] = useState([
    { id: 1, userName: "John Doe", itemName: "Chicken Salad", price: 8.99 },
    { id: 2, userName: "Jane Smith", itemName: "Veggie Burger", price: 7.5 },
    {
      id: 3,
      userName: "Mike Johnson",
      itemName: "Pasta Primavera",
      price: 9.25,
    },
    {
      id: 4,
      userName: "Sarah Williams",
      itemName: "Caesar Salad",
      price: 6.75,
    },
  ]);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/cafeteriaGet");

      if (!response.ok) {
        throw new Error("Failed to fetch menu items");
      }

      const data = await response.json();
      const allMeals = data.data.flatMap((entry) => entry.meals);
      setMenuItems(allMeals);
    } catch (error) {
      toast.error("Failed to load menu items", {
        description:
          error.message || "An error occurred while fetching menu items",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setFormData({
      name: "",
      price: "",
      nutrition: "",
      image: "",
    });
    setAddDialogOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/cafeteria", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clerkId: "123456", // Replace with actual clerkId
          date: new Date().toISOString().split("T")[0], // Sending only the date part
          meals: [
            {
              name: formData.name,
              price: Number.parseFloat(formData.price),
              nutrition: formData.nutrition,
              image: formData.image,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add menu item");
      }

      if (response.ok) {
        console.log("added successfully");
      }

      // const result = await response.json();

      setAddDialogOpen(false);
      fetchMenuItems(); // Refresh menu list after adding
    } catch (error) {
      toast.error("Failed to add menu item", {
        description: error.message || "An error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const response = await fetch("/api/itemDelete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          menuId: "67c53858f642cf46069cb44c",
          mealId: itemId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete menu item");
      }

      setMenuItems(menuItems.filter((item) => item._id !== itemId));
      toast.success("Menu item deleted successfully");
    } catch (error) {
      toast.error("Failed to delete menu item", {
        description: error.message || "An error occurred",
      });
    }
  };

  const handleCancelPreorder = (orderId) => {
    setPreorders(preorders.filter((order) => order.id !== orderId));
    toast.success("Preorder cancelled successfully");
  };

  const handleViewPreorders = () => {
    setPreordersOpen(true);
  };

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Cafeteria Menu</CardTitle>
            <CardDescription>Today's menu items</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleViewPreorders}>
              <ClipboardList className="mr-2 h-4 w-4" />
              View Preorders
            </Button>
            <Button onClick={handleAddNew}>
              <Plus className="mr-2 h-4 w-4" />
              Add Menu Item
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {menuItems.length === 0 ? (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  No menu items available
                </div>
              ) : (
                menuItems.map((item) => (
                  <Card key={item._id} className="overflow-hidden">
                    <CardHeader className="px-3 py-0">
                      <CardTitle className="text-sm">{item.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="px-3 py-0">
                      <div className="relative w-full h-28 mb-2">
                        <Image
                          src={
                            item.image ||
                            "/placeholder.svg?height=112&width=112"
                          }
                          alt={item.name}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-md"
                        />
                      </div>
                      <p className="font-bold text-sm">
                        ${item.price.toFixed(2)}
                      </p>
                      {item.nutrition && (
                        <p className="text-xs text-muted-foreground mt-1 truncate">
                          {item.nutrition}
                        </p>
                      )}
                    </CardContent>
                    <CardFooter className="px-3 py-0">
                      <Button
                        // variant="destructive"
                        size="sm"
                        className="bg-transparent text-red-600"
                        onClick={() => handleDeleteItem(item._id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Menu Item Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Menu Item</DialogTitle>
            <DialogDescription>
              Enter the details for the new menu item.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitAdd}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="nutrition">Nutrition Info</Label>
                <Input
                  id="nutrition"
                  name="nutrition"
                  value={formData.nutrition}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  name="image"
                  type="url"
                  value={formData.image}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setAddDialogOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Add Menu Item
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Preorders Sheet */}
      <Sheet open={preordersOpen} onOpenChange={setPreordersOpen}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle>User Preorders</SheetTitle>
            <SheetDescription>
              View and manage all current preorders
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-4">
            {preorders.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No preorders available
              </div>
            ) : (
              preorders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{order.userName}</h3>
                        <p className="text-sm text-muted-foreground">
                          {order.itemName}
                        </p>
                        <p className="font-bold mt-1">
                          ${order.price.toFixed(2)}
                        </p>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleCancelPreorder(order.id)}
                      >
                        Cancel Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
