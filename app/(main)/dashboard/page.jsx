"use client"

import { useState } from "react"
import { format, addDays, subDays } from "date-fns"
import { CalendarIcon, Clock, BookOpen, AlertTriangle } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

// Dummy data for demo purposes
const dummyTodos = [
  {
    id: 1,
    type: "assignment",
    title: "Research Paper",
    description: "Complete 5-page research paper on renewable energy",
    courseName: "Environmental Science",
    dueDate: new Date("2025-03-15"),
    status: "pending",
    priority: "high",
  },
  {
    id: 2,
    type: "exam",
    title: "Midterm Exam",
    description: "Chapters 1-5 will be covered",
    courseName: "Calculus II",
    dueDate: new Date("2025-03-10"),
    status: "pending",
    priority: "high",
  },
  {
    id: 3,
    type: "assignment",
    title: "Lab Report",
    description: "Write up results from last week's experiment",
    courseName: "Chemistry",
    dueDate: new Date("2025-03-08"),
    status: "pending",
    priority: "medium",
  },
  {
    id: 4,
    type: "assignment",
    title: "Group Presentation",
    description: "Prepare slides for group presentation",
    courseName: "Business Communication",
    dueDate: new Date("2025-03-20"),
    status: "pending",
    priority: "medium",
  },
  {
    id: 5,
    type: "exam",
    title: "Quiz",
    description: "Short quiz on recent material",
    courseName: "Psychology 101",
    dueDate: new Date("2025-03-05"),
    status: "completed",
    priority: "low",
  },
]

const dummyEvents = [
  {
    id: 1,
    title: "Book Fair",
    date: "2025-03-05",
    time: "09:00 - 16:00",
    description: "Browse and purchase books at our annual school Book Fair.",
  },
  {
    id: 2,
    title: "Sports Day",
    date: "2025-03-10",
    time: "10:00 - 15:00",
    description: "A fun-filled day of athletic events and team competitions.",
  },
  {
    id: 3,
    title: "Art Exhibition",
    date: "2025-03-15",
    time: "13:00 - 17:00",
    description: "Display your artwork for the school community to admire.",
  },
  {
    id: 4,
    title: "Career Fair",
    date: "2025-03-20",
    time: "11:00 - 14:00",
    description: "Meet representatives from various industries and universities.",
  },
]

// Helper function to get priority badge color
const getPriorityColor = (priority) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-900 "
    case "medium":
      return "bg-yellow-100 text-yellow-900 "
    case "low":
      return "bg-green-100 text-green-900 "
    default:
      return "bg-slate-100 text-slate-900"
  }
}

// Helper function to get status badge color
const getStatusColor = (status) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-900 "
    case "pending":
      return "bg-blue-100 text-blue-900 "
    case "overdue":
      return "bg-red-100 text-red-900 "
    default:
      return "bg-slate-100 text-slate-900 "
  }
}

// Helper function to get type icon
const getTypeIcon = (type) => {
  switch (type) {
    case "assignment":
      return <BookOpen className="h-4 w-4 mr-1" />
    case "exam":
      return <AlertTriangle className="h-4 w-4 mr-1" />
    default:
      return null
  }
}

export default function Dashboard() {
  const [date, setDate] = useState(new Date())

  return (
    <div className="container mx-auto p-4">
      

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - To-Do List and Task Summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* To-Do List Card */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>To-Do List</CardTitle>
              <CardDescription>Track your assignments and exams</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="assignments">Assignments</TabsTrigger>
                  <TabsTrigger value="exams">Exams</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  {dummyTodos.map((todo) => (
                    <div key={todo.id} className="flex flex-col space-y-2 p-3 rounded-lg border">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          {getTypeIcon(todo.type)}
                          <h3 className="font-semibold">{todo.title}</h3>
                        </div>
                        <div className="flex space-x-2">
                          <Badge className={getPriorityColor(todo.priority)}>{todo.priority}</Badge>
                          <Badge className={getStatusColor(todo.status)}>{todo.status}</Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{todo.description}</p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-medium">{todo.courseName}</span>
                       
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        Due: {format(todo.dueDate, "MMM dd, yyyy")}
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="assignments" className="space-y-4">
                  {dummyTodos
                    .filter((todo) => todo.type === "assignment")
                    .map((todo) => (
                      <div key={todo.id} className="flex flex-col space-y-2 p-3 rounded-lg border">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            {getTypeIcon(todo.type)}
                            <h3 className="font-semibold">{todo.title}</h3>
                          </div>
                          <Badge className={getPriorityColor(todo.priority)}>{todo.priority}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{todo.description}</p>
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-medium">{todo.courseName}</span>
                          <Badge className={getStatusColor(todo.status)}>{todo.status}</Badge>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          Due: {format(todo.dueDate, "MMM dd, yyyy")}
                        </div>
                      </div>
                    ))}
                </TabsContent>

                <TabsContent value="exams" className="space-y-4">
                  {dummyTodos
                    .filter((todo) => todo.type === "exam")
                    .map((todo) => (
                      <div key={todo.id} className="flex flex-col space-y-2 p-3 rounded-lg border">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            {getTypeIcon(todo.type)}
                            <h3 className="font-semibold">{todo.title}</h3>
                          </div>
                          <Badge className={getPriorityColor(todo.priority)}>{todo.priority}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{todo.description}</p>
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-medium">{todo.courseName}</span>
                          <Badge className={getStatusColor(todo.status)}>{todo.status}</Badge>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          Due: {format(todo.dueDate, "MMM dd, yyyy")}
                        </div>
                      </div>
                    ))}
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Add New Task</Button>
            </CardFooter>
          </Card>

          {/* Task Summary Card */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Task Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Pending Tasks</span>
                  <Badge variant="outline" className="font-bold">
                    {dummyTodos.filter((todo) => todo.status === "pending").length}
                  </Badge>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span>Completed Tasks</span>
                  <Badge variant="outline" className="font-bold">
                    {dummyTodos.filter((todo) => todo.status === "completed").length}
                  </Badge>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span>High Priority</span>
                  <Badge variant="outline" className="font-bold">
                    {dummyTodos.filter((todo) => todo.priority === "high").length}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Calendar and Events */}
        <div className="lg:col-span-1 space-y-6">
          {/* Calendar Card */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>{format(date, "MMMM yyyy")}</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => newDate && setDate(newDate)}
                className="rounded-md border w-full mx-auto"
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" onClick={() => setDate(subDays(date, 30))}>
                Previous Month
              </Button>
              <Button variant="outline" size="sm" onClick={() => setDate(addDays(date, 30))}>
                Next Month
              </Button>
            </CardFooter>
          </Card>

          {/* Events Card */}
          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Stay updated with campus activities</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dummyEvents.map((event) => (
                  <div key={event.id} className="flex flex-col space-y-2 p-3 rounded-lg border">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg">{event.title}</h3>
                      <Badge variant="secondary">
                        <CalendarIcon className="h-3 w-3 mr-1" />
                        {event.date}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {event.time}
                    </div>
                    <p className="text-sm">{event.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

