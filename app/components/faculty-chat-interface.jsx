"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import { toast } from "sonner"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Simulated faculty ID (in a real app, this would come from authentication)
const FACULTY_ID = "faculty123"

export function FacultyChatInterface({ selectedUser }) {
  const [messages, setMessages] = useState({})
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef(null)

  // Load messages from local storage on component mount
  useEffect(() => {
    const storedMessages = localStorage.getItem("facultyMessages")
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages))
    }
  }, [])

  // Save messages to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("facultyMessages", JSON.stringify(messages))
  }, [messages])

  // Initialize or get user chat history
  useEffect(() => {
    if (selectedUser) {
      if (!messages[selectedUser.id]) {
        setMessages((prev) => ({
          ...prev,
          [selectedUser.id]: [],
        }))
      }
    }
  }, [selectedUser, messages])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, selectedUser])

  // Simulated polling for new messages
  useEffect(() => {
    const pollInterval = setInterval(() => {
      if (selectedUser) {
        checkForNewMessages(selectedUser.id)
      }
    }, 5000) // Check every 5 seconds

    return () => clearInterval(pollInterval)
  }, [selectedUser])

  const checkForNewMessages = (userId) => {
    // In a real app, this would be an API call to check for new messages
    // For this example, we'll simulate a 20% chance of receiving a new message
    if (Math.random() < 0.2) {
      const newMessage = {
        id: Date.now(),
        content: `This is a simulated new message from user ${userId}`,
        sender: userId,
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => ({
        ...prev,
        [userId]: [...(prev[userId] || []), newMessage],
      }))

      toast.info("New message received")
    }
  }

  const handleSendMessage = (e) => {
    e.preventDefault()

    if (!selectedUser) {
      toast.error("Please select a user first")
      return
    }

    if (!inputValue.trim()) return

    const userId = selectedUser.id

    // Add faculty message
    const facultyMessage = {
      id: Date.now(),
      content: inputValue,
      sender: FACULTY_ID,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => ({
      ...prev,
      [userId]: [...(prev[userId] || []), facultyMessage],
    }))

    setInputValue("")
    toast.success("Message sent to user")
  }

  const currentMessages = selectedUser ? messages[selectedUser.id] || [] : []

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b p-4">
        {selectedUser ? (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{selectedUser.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{selectedUser.name}</h3>
              <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground">Select a user to start chatting</p>
        )}
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        {selectedUser ? (
          currentMessages.length > 0 ? (
            <div className="space-y-4">
              {currentMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === FACULTY_ID ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === FACULTY_ID ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-muted-foreground">No messages yet. Start a conversation!</p>
            </div>
          )
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-muted-foreground">Select a user from the sidebar to start chatting</p>
          </div>
        )}
      </ScrollArea>

      {/* Message Input */}
      <div className="border-t p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            placeholder={selectedUser ? "Type your message..." : "Select a user first..."}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={!selectedUser}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!selectedUser || !inputValue.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}

