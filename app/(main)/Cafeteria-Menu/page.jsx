"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, ShoppingCart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export default function CafeteriaMenuPage() {
  const [dateRange, setDateRange] = useState({
    from: undefined,
    to: undefined,
  });
  const [filterMode, setFilterMode] = useState("single"); // "single" or "range"

  const [date, setDate] = useState(new Date());
  const [cart, setCart] = useState([]);
  const [menuData, setMenuData] = useState([]); // Store fetched data
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  const [formData, setFormData] = useState({
    quantity: 10,
    pickupTime: Date.now(), // Pickup time input field
    name: "Pizza",
    price: 10,
    totalPrice: 10,
    clerkId: user?.id || "",
    stuName: user?.fullName || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/preorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Pre-order placed successfully!");
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("An error occurred while placing the pre-order.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fetch data from API
  useEffect(() => {
    async function fetchMenu() {
      try {
        setLoading(true);
        const response = await fetch("/api/cafeteriaGet");
        const result = await response.json();
        setMenuData(result.data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();
  }, []);

  const filterMenuByDateRange = (startDate, endDate) => {
    if (!startDate || !endDate) return menuData;

    return menuData.filter((menu) => {
      const menuDate = new Date(menu.date);
      return menuDate >= startDate && menuDate <= endDate;
    });
  };

  const menuForSelectedDate = menuData.find(
    (menu) =>
      format(new Date(menu.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
  );

  const addToCart = (meal) => {
    setCart([
      ...cart,
      { ...meal, id: Math.random().toString(36).substr(2, 9), quantity: 1 },
    ]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="w-full md:w-3/4">
          <div className="flex justify-end items-center mb-6">
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
                          <div
                            key={item.id}
                            className="flex justify-between items-center p-4 "
                          >
                            <div className="p-2">
                              <p className="font-medium">{item.name}</p>

                              <p className="text-sm text-muted-foreground">
                                ${item.price.toFixed(2)} x {item.quantity}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                      <Separator className="my-4  " />
                      <div className="p-4">
                        <label>
                          Pickup Time:
                          <input
                            type="datetime-local"
                            name="pickupTime"
                            value={formData.pickupTime}
                            onChange={handleInputChange}
                            className="font-medium"
                          />
                        </label>
                      </div>
                      <div className="flex justify-between items-center font-medium p-4 ">
                        <span>Total</span>
                        <span>${totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="p-4">
                        <Button onClick={handleSubmit} className="w-full mt-4 ">
                          Place Pre-order
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filterMode === "single" ? (
            menuForSelectedDate ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuForSelectedDate.meals.map((meal, index) => (
                  <MealCard
                    key={`${meal.id}-${index}`}
                    meal={meal}
                    onAddToCart={() => addToCart(meal)}
                  />
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
            )
          ) : dateRange.from && dateRange.to ? (
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Menu for {format(dateRange.from, "MMM d")} -{" "}
                {format(dateRange.to, "MMM d")}
              </h2>
              <div className="space-y-8">
                {filterMenuByDateRange(dateRange.from, dateRange.to).map(
                  (menu) => (
                    <div
                      key={format(new Date(menu.date), "yyyy-MM-dd")}
                      className="mb-6"
                    >
                      <h3 className="text-lg font-medium mb-3">
                        {format(new Date(menu.date), "EEEE, MMMM d")}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {menu.meals.map((meal, index) => (
                          <MealCard
                            key={`${meal.id}-${index}`}
                            meal={meal}
                            onAddToCart={() => addToCart(meal)}
                          />
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          ) : (
            <Card className="w-full">
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  Please select a date range to view menus.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <Card className="w-full md:w-1/4 sticky top-4">
          <CardHeader>
            <CardTitle>Weekly Menu</CardTitle>
            <CardDescription>View available meals for the week</CardDescription>
            <div className="flex items-center gap-2 mb-6 ">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2  "
                  >
                    <CalendarIcon className="h-4 w-4" />
                    {filterMode === "single"
                      ? format(date, "MMMM d, yyyy")
                      : dateRange.from && dateRange.to
                      ? `${format(dateRange.from, "MMM d")} - ${format(
                          dateRange.to,
                          "MMM d"
                        )}`
                      : "Select date range"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  {filterMode === "single" ? (
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      modifiers={{
                        highlighted: (day) =>
                          menuData.some(
                            (menu) =>
                              format(new Date(menu.date), "yyyy-MM-dd") ===
                              format(day, "yyyy-MM-dd")
                          ),
                      }}
                      modifiersStyles={{
                        highlighted: {
                          backgroundColor: "var(--primary-50)",
                          fontWeight: "bold",
                        },
                      }}
                      disabled={(date) =>
                        !menuData.some(
                          (menu) =>
                            format(new Date(menu.date), "yyyy-MM-dd") ===
                            format(date, "yyyy-MM-dd")
                        )
                      }
                    />
                  ) : (
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={setDateRange}
                      initialFocus
                      numberOfMonths={2}
                      modifiers={{
                        highlighted: (day) =>
                          menuData.some(
                            (menu) =>
                              format(new Date(menu.date), "yyyy-MM-dd") ===
                              format(day, "yyyy-MM-dd")
                          ),
                      }}
                      modifiersStyles={{
                        highlighted: {
                          backgroundColor: "var(--primary-50)",
                          fontWeight: "bold",
                        },
                      }}
                    />
                  )}
                </PopoverContent>
              </Popover>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

function MealCard({ meal, onAddToCart }) {
  return (
    <Card>
      <CardHeader>
        <img
          src={meal.image || "/placeholder.svg"}
          alt={meal.name}
          className="w-full h-40 object-cover rounded-md"
        />
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
  );
}
