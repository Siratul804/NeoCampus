"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Plus } from "lucide-react"

export default function CafeteriaMenuPage() {
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    nutrition: "",
    image: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchMenuItems()
  }, [])

  const fetchMenuItems = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/cafeteriaGet")

      if (!response.ok) {
        throw new Error("Failed to fetch menu items")
      }

      const data = await response.json()
      // Flatten the meals from all menu entries
      const allMeals = data.data.flatMap((entry) => entry.meals)
      setMenuItems(allMeals)
    } catch (error) {
      toast.error("Failed to load menu items", {
        description: error.message || "An error occurred while fetching menu items",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAddNew = () => {
    setFormData({
      name: "",
      price: "",
      nutrition: "",
      image: "",
    })
    setAddDialogOpen(true)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmitAdd = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/cafeteria", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: Number.parseFloat(formData.price),
          date: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to add menu item")
      }

      const newItem = await response.json()

      // Add new item to state
      setMenuItems([...menuItems, newItem])

      toast.success("Menu item added successfully")

      setAddDialogOpen(false)
    } catch (error) {
      toast.error("Failed to add menu item", {
        description: error.message || "An error occurred",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePreorder = (itemId) => {
    // Simulate preorder functionality
    toast.success("Item preordered successfully")
  }

  const handleCancelOrder = (itemId) => {
    // Simulate cancel order functionality
    toast.success("Order cancelled successfully")
  }

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Cafeteria Menu</CardTitle>
            <CardDescription>Today's menu items</CardDescription>
          </div>
          <Button className="ml-auto" onClick={handleAddNew}>
            <Plus className="mr-2 h-4 w-4" />
            Add Menu Item
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {menuItems.length === 0 ? (
                <div className="col-span-full text-center py-8 text-muted-foreground">No menu items available</div>
              ) : (
                menuItems.map((item) => (
                  <Card key={item._id}>
                    <CardHeader>
                      <CardTitle>{item.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-square relative mb-4">
                        <img
                          src={item.image || "/placeholder.svg?height=300&width=300"}
                          alt={item.name}
                          className="object-cover rounded-md"
                          style={{ width: "40%", height: "40%" }}
                        />
                      </div>
                      <p className="font-bold text-lg">${item.price.toFixed(2)}</p>
                      {item.nutrition && <p className="text-sm text-muted-foreground mt-2">{item.nutrition}</p>}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button onClick={() => handlePreorder(item._id)}>Preorder</Button>
                      <Button variant="outline" onClick={() => handleCancelOrder(item._id)}>
                        Cancel Order
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
            <DialogDescription>Enter the details for the new menu item.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitAdd}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
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
                <Input id="nutrition" name="nutrition" value={formData.nutrition} onChange={handleInputChange} />
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
              <Button type="button" variant="outline" onClick={() => setAddDialogOpen(false)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add Menu Item
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

