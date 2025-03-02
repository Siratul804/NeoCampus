// pages/dashboard.tsx

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Dummy data for demo purposes
const dummyMenu = [
  { id: 1, name: "Chicken Sandwich", price: "$5.00", description: "Grilled chicken with lettuce & tomato." },
  { id: 2, name: "Veggie Wrap", price: "$4.50", description: "Fresh vegetables in a whole wheat wrap." },
];

const dummyBus = [
  { id: 1, route: "Route A", arrival: "5 min" },
  { id: 2, route: "Route B", arrival: "10 min" },
];

const dummyClasses = [
  { id: 1, course: "Math 101", time: "09:00 AM" },
  { id: 2, course: "History 201", time: "11:00 AM" },
];

const dummyEvents = [
  { id: 1, title: "Club Fair", date: "Today, 3:00 PM" },
  { id: 2, title: "Guest Lecture", date: "Tomorrow, 1:00 PM" },
];

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      
      {/* Grid for overview cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Cafeteria Menu Card */}
        <Card>
          <CardHeader>
            <CardTitle>Cafeteria Menu</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {dummyMenu.map((item) => (
              <div key={item.id}>
                <div className="font-semibold">
                  {item.name} <span className="text-sm text-muted-foreground">- {item.price}</span>
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
            <Button variant="outline" size="sm">View More</Button>
          </CardContent>
        </Card>

        {/* Bus Routes Card */}
        <Card>
          <CardHeader>
            <CardTitle>Bus Arrivals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {dummyBus.map((bus) => (
              <div key={bus.id}>
                <div className="font-semibold">{bus.route}</div>
                <p className="text-sm text-muted-foreground">Arriving in {bus.arrival}</p>
              </div>
            ))}
            <Button variant="outline" size="sm">Live Map</Button>
          </CardContent>
        </Card>

        {/* Class Schedule Card */}
        <Card>
          <CardHeader>
            <CardTitle>Class Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {dummyClasses.map((cls) => (
              <div key={cls.id}>
                <div className="font-semibold">{cls.course}</div>
                <p className="text-sm text-muted-foreground">{cls.time}</p>
              </div>
            ))}
            <Button variant="outline" size="sm">View Calendar</Button>
          </CardContent>
        </Card>

        {/* Events & Announcements Card */}
        <Card>
          <CardHeader>
            <CardTitle>Events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {dummyEvents.map((event) => (
              <div key={event.id}>
                <div className="font-semibold">{event.title}</div>
                <p className="text-sm text-muted-foreground">{event.date}</p>
              </div>
            ))}
            <Button variant="outline" size="sm">More Events</Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Additional Announcements Section */}
      <Card>
        <CardHeader>
          <CardTitle>Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            Welcome to Uforia! Check out our latest updates and features to enhance your campus experience.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
