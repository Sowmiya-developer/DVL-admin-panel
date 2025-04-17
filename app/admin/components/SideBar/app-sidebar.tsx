"use client"

import type * as React from "react"
import { useState, useEffect } from "react"
import {
  LineChartIcon as ChartLine,
  Users,
  BookOpenText,
  LayoutDashboard,
  Stethoscope,
  Shield,
} from "lucide-react"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, useSidebar } from "@/components/ui/sidebar"

// Add a function to handle token removal since it's used in nav-user.tsx
export function removeToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token")
  }
}

const data = {
  user: {
    name: "Admin",
    email: "admin@gmail.com",
    avatar: "/user-icon.svg",
  },
  // teams: [
  //   {
  //     name: "Logo",
  //     logo: GalleryVerticalEnd,
  //   },
  //   {
  //     name: "Acme Corp.",
  //     logo: AudioWaveform,
  //     plan: "Startup",
  //   },
  //   {
  //     name: "Evil Corp.",
  //     logo: Command,
  //     plan: "Free",
  //   },
  // ],
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Patient Management",
      url: "/admin/patient-management",
      icon: Stethoscope,
      isActive: true,
    },
    {
      title: "App Users",
      url: "/admin/app-users",
      icon: Users,
      isActive: true,
    },
    {
      title: "Admin Users",
      url: "/admin/users",
      icon: Shield,
      isActive: true,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Track sidebar state locally to ensure we have a reliable state
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Get sidebar state from context
  const sidebar = useSidebar()

  // Update local state when sidebar context changes
  useEffect(() => {
    if (sidebar) {
      setIsCollapsed(sidebar.state === "collapsed")

      // Also listen for changes to the sidebar:state cookie
      const checkCookie = () => {
        const cookies = document.cookie.split(";")
        const sidebarCookie = cookies.find((cookie) => cookie.trim().startsWith("sidebar:state="))
        if (sidebarCookie) {
          const value = sidebarCookie.split("=")[1]
          setIsCollapsed(value !== "true")
        }
      }

      checkCookie()

      // Set up an interval to check the cookie periodically
      const interval = setInterval(checkCookie, 500)
      return () => clearInterval(interval)
    }
  }, [sidebar])

  // Handle rail click to toggle sidebar
  const handleRailClick = () => {
    if (sidebar?.toggleSidebar) {
      sidebar.toggleSidebar()
      // Also update our local state
      setIsCollapsed(!isCollapsed)
    }
  }

  // Debug output to console
  useEffect(() => {
    console.log("Sidebar state:", isCollapsed ? "collapsed" : "expanded")
  }, [isCollapsed])

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex justify-center pt-10 pb-2 ">
        {isCollapsed ? (
          // Small logo or icon for collapsed state
          <h1 className="text-2xl font-bold text-center">D</h1>
          // <img src="/Avatar.png" alt="logo" className="w-8 h-8" data-state="collapsed" />
        ) : (
          // Full logo for expanded state
          
          <div className="text-center">
          {/* <img src="/my-group-logo.png" alt="logo" data-state="expanded" /> */}
            <h1 className="text-2xl font-bold text-center">DVL Archive</h1>
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail onClick={handleRailClick} />
    </Sidebar>
  )
}
