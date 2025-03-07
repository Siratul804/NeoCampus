'use client'

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
  SidebarInput
} from '@/components/ui/sidebar'
import { Search, Users } from 'lucide-react'
import { useState } from 'react'

export function UserSidebar({ users, loading, onSelectUser, selectedUser }) {
  const [searchQuery, setSearchQuery] = useState('')
  
  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Sidebar side="right">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <Users className="h-5 w-5" />
          <h2 className="text-lg font-semibold">User Chat</h2>
        </div>
        <div className="px-2 pb-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <SidebarInput
              placeholder="Search users..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Users</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <SidebarMenuItem key={i}>
                    <div className="animate-pulse flex flex-col gap-2 p-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </SidebarMenuItem>
                ))
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <SidebarMenuItem key={user.id}>
                    <SidebarMenuButton 
                      onClick={() => onSelectUser(user)}
                      isActive={selectedUser?.id === user.id}
                    >
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{user.name}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-muted-foreground">
                  No users found
                </div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
