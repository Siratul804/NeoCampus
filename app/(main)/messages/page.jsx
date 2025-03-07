"use client"

import { useState } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

import { facultyData } from "@/data/FacultyData"
import { ChatInterface } from "@/app/components/chat-interface"
import { FacultySidebar } from "@/app/components/faculty-sidebar"

export default function MessagesPage() {
  const [selectedFaculty, setSelectedFaculty] = useState(null)

  const handleSelectFaculty = (faculty) => {
    setSelectedFaculty(faculty)
  }

  return (
    <SidebarProvider>
      <div className="h-screen flex">
        {/* Main chat area on the left */}
        <SidebarInset className="flex-1">
          <ChatInterface selectedFaculty={selectedFaculty} />
        </SidebarInset>

        {/* Faculty sidebar on the right */}
        <FacultySidebar
          faculties={facultyData}
          loading={false}
          onSelectFaculty={handleSelectFaculty}
          selectedFaculty={selectedFaculty}
        />
      </div>
    </SidebarProvider>
  )
}

