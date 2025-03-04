"use client";
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation"; // To handle redirection after submission

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function TodoModal() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [courseName, setCourseName] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const [loading, setLoading] = useState(false); // Loading state

  const { user } = useUser();
  const router = useRouter(); // To navigate after task is created

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const body = {
      clerkId: user?.id,
      type,
      title,
      description,
      courseName,
      dueDate: format(dueDate, "yyyy-MM-dd"),
      status,
      priority,
    };

    try {
      const response = await fetch("/api/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        setOpen(false);
        setTitle("");
        setType("");
        setDescription("");
        setCourseName("");
        setDueDate(null);
        setStatus("");
        setPriority("");
        alert(data.message);
        router.refresh();
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error submitting task:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="gap-2 cursor-pointer">Add New Task</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>
              Create a new task for your course. Fill in all the required
              details.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Input
                id="title"
                className="hidden"
                placeholder="Enter task title"
                value={user?.id}
                readOnly // Made read-only
              />
            </div>
            <div>
              <label htmlFor="title" className="block text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium">
                Type
              </label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select task type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="exam">Exam</SelectItem>
                  <SelectItem value="assignment">Assignment</SelectItem>
                  <SelectItem value="project">Project</SelectItem>
                  <SelectItem value="homework">Homework</SelectItem>
                  <SelectItem value="reading">Reading</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium"
              >
                Description
              </label>
              <Textarea
                id="description"
                placeholder="Describe the task"
                className="resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="courseName" className="block text-sm font-medium">
                Course Name
              </label>
              <Input
                id="courseName"
                placeholder="Enter course name"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium">
                Due Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full text-left font-normal"
                  >
                    {dueDate ? format(dueDate, "PPP") : "Pick a date"}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="status" className="block text-sm font-medium">
                  Status
                </label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="priority" className="block text-sm font-medium">
                  Priority
                </label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="submit"
                className="cursor-pointer"
                disabled={loading}
              >
                {loading ? "Creating Task..." : "Create Task"}{" "}
                {/* Conditionally render loading text */}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
