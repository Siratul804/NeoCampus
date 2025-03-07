"use client"

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInput,
} from "@/components/ui/sidebar"
import { Search, Users } from "lucide-react"
import { useState } from "react"

export function FacultySidebar({ faculties, loading, onSelectFaculty, selectedFaculty }) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFaculties = faculties.filter(
    (faculty) =>
      faculty.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faculty.designation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faculty.department?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Sidebar side="right" className="flex flex-col h-full border-r">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <Users className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Faculty Chat</h2>
        </div>
        <div className="px-2 pb-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <SidebarInput
              placeholder="Search faculties..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Faculties</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {loading ? (
                Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <SidebarMenuItem key={i}>
                      <div className="animate-pulse flex flex-col gap-2 p-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </SidebarMenuItem>
                  ))
              ) : filteredFaculties.length > 0 ? (
                filteredFaculties.map((faculty) => (
                  <SidebarMenuItem key={faculty.id}>
                    <SidebarMenuButton
                      onClick={() => onSelectFaculty(faculty)}
                      isActive={selectedFaculty?.id === faculty.id}
                    >
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{faculty.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {faculty.designation || faculty.department}
                        </span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-muted-foreground">No faculties found</div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

