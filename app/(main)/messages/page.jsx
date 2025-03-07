"use client";

import { useState } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

import { facultyData } from "@/data/FacultyData";
import { ChatInterface } from "@/app/components/chat-interface";
import { FacultySidebar } from "@/app/components/faculty-sidebar";

export default function MessagesPage() {
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  const handleSelectFaculty = (faculty) => {
    setSelectedFaculty(faculty);
  };

  return (
    <SidebarProvider className={""}>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] h-screen p-5 rounded-2xl">
        {/* Main chat area on the left */}
        <SidebarInset className="flex-1 rounded-2xl">
          <ChatInterface selectedFaculty={selectedFaculty} />
        </SidebarInset>

        {/* Faculty sidebar on the right */}
        {/* <div className="h-[50vh] overflow-hidden"> */}
        <FacultySidebar
          faculties={facultyData}
          loading={false}
          onSelectFaculty={handleSelectFaculty}
          selectedFaculty={selectedFaculty}
        />
      </div>
      {/* </div> */}
    </SidebarProvider>
  );
}
