"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

// Dummy data based on the schema
const dummyMenuData = [
  {
    clerkId: "clerk_123",
    date: new Date("2025-03-02"),
    meals: [
      {
        name: "Spaghetti Bolognese",
        price: 4.5,
        nutrition: "Calories: 450, Protein: 22g, Carbs: 65g, Fat: 12g",
      },
      {
        name: "Vegetable Stir Fry",
        price: 3.75,
        nutrition: "Calories: 320, Protein: 15g, Carbs: 45g, Fat: 8g",
      },
      {
        name: "Grilled Chicken Salad",
        price: 5.25,
        nutrition: "Calories: 380, Protein: 28g, Carbs: 18g, Fat: 14g",
      },
    ],
  },
  {
    clerkId: "clerk_123",
    date: new Date("2025-03-03"),
    meals: [
      {
        name: "Beef Tacos",
        price: 4.25,
        nutrition: "Calories: 420, Protein: 24g, Carbs: 48g, Fat: 16g",
      },
      {
        name: "Vegetarian Pizza",
        price: 3.5,
        nutrition: "Calories: 380, Protein: 14g, Carbs: 52g, Fat: 12g",
      },
      {
        name: "Tuna Sandwich",
        price: 3.95,
        nutrition: "Calories: 340, Protein: 22g, Carbs: 38g, Fat: 10g",
      },
    ],
  },
  {
    clerkId: "clerk_123",
    date: new Date("2025-03-04"),
    meals: [
      {
        name: "Chicken Curry with Rice",
        price: 5.0,
        nutrition: "Calories: 520, Protein: 26g, Carbs: 68g, Fat: 18g",
      },
      {
        name: "Vegetable Lasagna",
        price: 4.5,
        nutrition: "Calories: 460, Protein: 18g, Carbs: 58g, Fat: 16g",
      },
      {
        name: "Caesar Salad",
        price: 3.75,
        nutrition: "Calories: 280, Protein: 12g, Carbs: 14g, Fat: 18g",
      },
    ],
  },
]

export default function CafeteriaMenuPage() {
  const [date, setDate] = useState(new Date())
  const [cart, setCart] = useState([])

  // Filter menu items by selected date
  const menuForSelectedDate = dummyMenuData.find(
    (menu) => format(new Date(menu.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd"),
  )

  // Add item to cart
  const addToCart = (meal) => {
    setCart([...cart, { ...meal, id: Math.random().toString(36).substr(2, 9) }])
  }

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price, 0)

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="w-full md:w-3/4">
          <div className="flex justify-end items-center mb-6">
            
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    {format(date, "MMMM d, yyyy")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {cart.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                        {cart.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Your Cart</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    {cart.length === 0 ? (
                      <p className="text-muted-foreground">Your cart is empty</p>
                    ) : (
                      <>
                        <div className="space-y-4">
                          {cart.map((item) => (
                            <div key={item.id} className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                              </div>
                              <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.id)}>
                                Remove
                              </Button>
                            </div>
                          ))}
                        </div>
                        <Separator className="my-4" />
                        <div className="flex justify-between items-center font-medium">
                          <span>Total</span>
                          <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <Button className="w-full mt-4">Checkout</Button>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {menuForSelectedDate ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuForSelectedDate.meals.map((meal, index) => (
                <MealCard key={index} meal={meal} onAddToCart={() => addToCart(meal)} />
              ))}
            </div>
          ) : (
            <Card className="w-full">
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  No menu available for this date. Please select another date.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <Card className="w-full md:w-1/4 sticky top-4">
          <CardHeader>
            <CardTitle>Weekly Menu</CardTitle>
            <CardDescription>View available meals for the week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {dummyMenuData.map((menu, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    format(new Date(menu.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd") && "bg-secondary",
                  )}
                  onClick={() => setDate(new Date(menu.date))}
                >
                  {format(new Date(menu.date), "EEEE, MMM d")}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function MealCard({ meal, onAddToCart }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{meal.name}</CardTitle>
        <CardDescription>${meal.price.toFixed(2)}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">
          <p>{meal.nutrition}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onAddToCart} className="w-full">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

