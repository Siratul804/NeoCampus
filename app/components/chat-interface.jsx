"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import { toast } from "sonner"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ChatInterface({ selectedFaculty }) {
  const [messages, setMessages] = useState({})
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef(null)

  // Initialize or get faculty chat history
  useEffect(() => {
    if (selectedFaculty) {
      if (!messages[selectedFaculty.id]) {
        setMessages((prev) => ({
          ...prev,
          [selectedFaculty.id]: [],
        }))
      }
    }
  }, [selectedFaculty, messages])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, selectedFaculty])

  const handleSendMessage = (e) => {
    e.preventDefault()

    if (!selectedFaculty) {
      toast.error("Please select a faculty member first")
      return
    }

    if (!inputValue.trim()) return

    const facultyId = selectedFaculty.id

    // Add user message
    const userMessage = {
      id: Date.now(),
      content: inputValue,
      sender: "user",
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => ({
      ...prev,
      [facultyId]: [...(prev[facultyId] || []), userMessage],
    }))

    setInputValue("")

    // Simulate faculty response (after a short delay)
    setTimeout(() => {
      const facultyResponse = {
        id: Date.now() + 1,
        content: `This is a simulated response from ${selectedFaculty.name}. In a real application, this would be handled by your backend.`,
        sender: "faculty",
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => ({
        ...prev,
        [facultyId]: [...(prev[facultyId] || []), facultyResponse],
      }))

      toast.success("Message sent to faculty")
    }, 1000)
  }

  const currentMessages = selectedFaculty ? messages[selectedFaculty.id] || [] : []

  return (
    <div className="container mx-auto p-4 space-y-8 max-w-7xl">
      {/* Header */}
      <div className="border-b p-4">
        {selectedFaculty ? (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={selectedFaculty.avatar} alt={selectedFaculty.name} />
              <AvatarFallback>{selectedFaculty.name?.charAt(0) || "F"}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{selectedFaculty.name}</h3>
              <p className="text-sm text-muted-foreground">
                {selectedFaculty.designation || selectedFaculty.department}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground">Select a faculty to start chatting</p>
        )}
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        {selectedFaculty ? (
          currentMessages.length > 0 ? (
            <div className="space-y-4">
              {currentMessages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
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
            <p className="text-muted-foreground">Select a faculty from the sidebar to start chatting</p>
          </div>
        )}
      </ScrollArea>

      {/* Message Input */}
      <div className="border-t p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            placeholder={selectedFaculty ? "Type your message..." : "Select a faculty first..."}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={!selectedFaculty}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!selectedFaculty || !inputValue.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}

