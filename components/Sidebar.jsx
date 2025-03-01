"use client"

import * as React from "react"
import {
  BookOpen,
  LayoutDashboard,
  Users,
  GraduationCap,
  Calendar,
  ClipboardList,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function SchoolSidebar() {
  const [isCompact, setIsCompact] = React.useState(false)

  return (
    <Sidebar className="border-r bg-slate-50/50 dark:bg-slate-950/50">
      <SidebarHeader className="px-4 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          {!isCompact && <span className="text-xl font-semibold">SchooLama</span>}
        </div>
      </SidebarHeader>
      <SidebarContent className="px-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive>
              <a
                href="#"
                className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <LayoutDashboard className="h-5 w-5 text-slate-500" />
                {!isCompact && <span>Dashboard</span>}
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a
                href="#"
                className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Users className="h-5 w-5 text-slate-500" />
                {!isCompact && <span>Students</span>}
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a
                href="#"
                className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <GraduationCap className="h-5 w-5 text-slate-500" />
                {!isCompact && <span>Teachers</span>}
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a
                href="#"
                className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Calendar className="h-5 w-5 text-slate-500" />
                {!isCompact && <span>Classes</span>}
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a
                href="#"
                className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <ClipboardList className="h-5 w-5 text-slate-500" />
                {!isCompact && <span>Assignments</span>}
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a
                href="#"
                className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <MessageSquare className="h-5 w-5 text-slate-500" />
                {!isCompact && <span>Messages</span>}
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t px-4 py-4">
        <div className={cn("mb-4 flex items-center gap-3", isCompact && "flex-col")}>
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
            <AvatarFallback>AH</AvatarFallback>
          </Avatar>
          {!isCompact && (
            <div className="flex flex-col">
              <span className="text-sm font-medium">Adam Holland</span>
              <span className="text-xs text-slate-500">admin@schoolama.com</span>
            </div>
          )}
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a
                href="#"
                className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Settings className="h-5 w-5 text-slate-500" />
                {!isCompact && <span>Settings</span>}
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a
                href="#"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50"
              >
                <LogOut className="h-5 w-5" />
                {!isCompact && <span>Logout</span>}
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-6 z-10 h-6 w-6 rounded-full bg-slate-100 p-0 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
        onClick={() => setIsCompact(!isCompact)}
      >
        {isCompact ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path
              fillRule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path
              fillRule="evenodd"
              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </Button>
      <SidebarRail />
    </Sidebar>
  )
}

