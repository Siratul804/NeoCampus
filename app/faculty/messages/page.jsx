"use client"

import { useState, useEffect } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

import { toast } from "sonner"
import { FacultyChatInterface } from "@/app/components/faculty-chat-interface"
import { UserSidebar } from "@/components/facultyComponent/UserSidebar"

export default function FacultyMessagesPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/usersGet")
        if (!response.ok) {
          throw new Error("Failed to fetch users")
        }
        const data = await response.json()
        setUsers(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
        toast.error("Failed to load user list")
      }
    }

    fetchUsers()
  }, [])

  const handleSelectUser = (user) => {
    setSelectedUser(user)
  }

  return (
    <SidebarProvider>
      <div className="h-screen flex">
        {/* Main chat area on the left */}
        <SidebarInset className="flex-1">
          <FacultyChatInterface selectedUser={selectedUser} />
        </SidebarInset>

        {/* User sidebar on the right */}
        <UserSidebar users={users} loading={loading} onSelectUser={handleSelectUser} selectedUser={selectedUser} />
      </div>
    </SidebarProvider>
  )
}

