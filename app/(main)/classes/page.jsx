"use client"

import { useState } from "react"
import { CalendarIcon, Clock, Users, ChevronLeft, ChevronRight, Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

// Reduced schedule data
const scheduleData = {
  weekRange: "September 16 – 20",
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  timeSlots: ["8:00 AM", "9:00 AM", "10:00 AM"],
  classes: [
    {
      id: 1,
      day: 0,
      startTime: "8:00 AM",
      endTime: "8:45 AM",
      class: "4A",
      subject: "Physics",
      color: "bg-blue-50 border-blue-200 ",
    },
    {
      id: 2,
      day: 2,
      startTime: "8:00 AM",
      endTime: "8:45 AM",
      class: "1A",
      subject: "Chemistry",
      color: "bg-blue-50 border-blue-200 ",
    },
    {
      id: 3,
      day: 0,
      startTime: "9:00 AM",
      endTime: "9:45 AM",
      class: "3B",
      subject: "Physics",
      color: "bg-amber-50 border-amber-200 ",
    },
    {
      id: 4,
      day: 1,
      startTime: "9:00 AM",
      endTime: "9:45 AM",
      class: "2B",
      subject: "Physics",
      color: "bg-amber-50 border-amber-200 ",
    },
    {
      id: 5,
      day: 0,
      startTime: "10:00 AM",
      endTime: "10:45 AM",
      class: "2B",
      subject: "Math",
      color: "bg-purple-50 border-purple-200",
    },
    {
      id: 6,
      day: 3,
      startTime: "10:00 AM",
      endTime: "10:45 AM",
      class: "6B",
      subject: "Chemistry",
      color: "bg-blue-50 border-blue-200 ",
    },
  ],
}

// Reduced faculty data
const facultyData = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    email: "sjohnson@school.edu",
    phone: "(555) 123-4567",
    department: "CSE",
    courses: ["Physics 101", "Advanced Physics"],
    officeHours: "Monday, Wednesday: 2:00 PM - 4:00 PM",
    office: "Science Building, Room 305",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    email: "mchen@school.edu",
    phone: "(555) 234-5678",
    department: "EEE",
    courses: ["Chemistry 101", "Organic Chemistry"],
    officeHours: "Tuesday, Thursday: 1:00 PM - 3:00 PM",
    office: "Science Building, Room 210",
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

export default function ClassesPage() {
  const [view, setView] = useState("schedule")
  const [currentWeek, setCurrentWeek] = useState(scheduleData.weekRange)
  const [searchTerm, setSearchTerm] = useState("")
  const [date, setDate] = useState(new Date())
  const [reminderEnabled, setReminderEnabled] = useState(false)
  const [selectedReminderTime, setSelectedReminderTime] = useState("5 minutes")

  // Filter faculty based on search term
  const filteredFaculty = facultyData.filter(
    (faculty) =>
      faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Get classes for a specific time and day
  const getClassesForTimeAndDay = (time, day) => {
    return scheduleData.classes.filter((cls) => cls.startTime === time && cls.day === day)
  }

  // Weekly Schedule Component
  function WeeklySchedule() {
    return (
      <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" size="icon" className="rounded-full">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-xl font-semibold">{currentWeek}</h2>
          <Button variant="outline" size="icon" className="rounded-full">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-4 font-medium text-sm text-muted-foreground"></th>
                {scheduleData.days.map((day, index) => (
                  <th key={index} className="p-4 font-medium text-center">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {scheduleData.timeSlots.map((time, timeIndex) => (
                <tr key={timeIndex}>
                  <td className="p-4 font-medium text-sm text-muted-foreground">{time}</td>
                  {scheduleData.days.map((_, dayIndex) => {
                    const classes = getClassesForTimeAndDay(time, dayIndex)
                    return (
                      <td key={dayIndex} className="p-2 min-h-24 align-top">
                        {classes.map((cls) => (
                          <div key={cls.id} className={`p-3 rounded-md border ${cls.color} mb-2`}>
                            <div className="text-xs opacity-75">
                              {cls.startTime} – {cls.endTime}
                            </div>
                            <div className="font-medium">
                              {cls.class} - {cls.subject}
                            </div>
                          </div>
                        ))}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  // Faculty Directory Component
  function FacultyDirectory() {
    return (
      <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name or department..."
            className="pl-9 rounded-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid gap-4">
          {filteredFaculty.map((faculty) => (
            <Card key={faculty.id} className="overflow-hidden">
              <div className="flex items-center gap-4 p-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={faculty.avatar} alt={faculty.name} />
                  <AvatarFallback className="text-lg">
                    {faculty.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{faculty.name}</h3>
                  <p className="text-muted-foreground">{faculty.phone}</p>
                  <Badge variant="secondary" className="mt-1">
                    {faculty.department}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-3 mb-6">
          <Button variant="outline" size="sm" className="rounded-full">
            <Clock className="h-4 w-4 mr-2" />
            Daily
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Weekly
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - 8 cols (Schedule/Faculty) */}
          <div className="lg:col-span-8">
            <Tabs defaultValue="schedule" className="w-full" onValueChange={setView}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="schedule" className="rounded-l-lg">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Schedule
                </TabsTrigger>
                <TabsTrigger value="faculty" className="rounded-r-lg">
                  <Users className="h-4 w-4 mr-2" />
                  Faculty Directory
                </TabsTrigger>
              </TabsList>

              <TabsContent value="schedule" className="mt-0">
                <WeeklySchedule />
              </TabsContent>

              <TabsContent value="faculty" className="mt-0">
                <FacultyDirectory />
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - 4 cols (Calendar & Reminders) */}
          <div className="lg:col-span-4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reminders</CardTitle>
                <CardDescription>Get notified before your classes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="reminder-toggle" className="text-base font-medium">
                      Enable Reminders
                    </Label>
                    <p className="text-sm text-muted-foreground">Receive notifications</p>
                  </div>
                  <Switch id="reminder-toggle" checked={reminderEnabled} onCheckedChange={setReminderEnabled} />
                </div>

                <div className={reminderEnabled ? "opacity-100" : "opacity-50 pointer-events-none"}>
                  <Label className="mb-3 block text-base font-medium">Reminder Time</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {["5 minutes", "10 minutes", "15 minutes"].map((time) => (
                      <Button
                        key={time}
                        variant="outline"
                        size="sm"
                        className={cn(
                          "rounded-full",
                          selectedReminderTime === time && "bg-primary text-primary-foreground",
                        )}
                        onClick={() => setSelectedReminderTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

