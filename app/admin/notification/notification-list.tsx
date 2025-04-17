"use client"

import { Search } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { Notification } from "@/types/notification/notification-type"

interface NotificationListProps {
  notifications: Notification[]
  selectedNotification: Notification | null
  onSelectNotification: (notification: Notification) => void
  searchQuery: string
  onSearchChange: (value: string) => void
  filterActive: boolean
  onFilterToggle: () => void
}

export default function NotificationList({
  notifications,
  selectedNotification,
  onSelectNotification,
  searchQuery,
  onSearchChange,
  filterActive,
  onFilterToggle,
}: NotificationListProps) {
  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <Input
            placeholder="Search..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        <Button
          variant={filterActive ? "default" : "outline"}
          size="sm"
          onClick={onFilterToggle}
          className="flex items-center gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-filter"
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          Filter
        </Button>
      </div>

      <div className="space-y-2 h-[calc(100vh-18rem)] overflow-auto md:pr-3">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            isSelected={selectedNotification?.id === notification.id}
            onClick={() => onSelectNotification(notification)}
          />
        ))}
      </div>
    </>
  )
}

// Notification Item Component
interface NotificationItemProps {
  notification: Notification
  isSelected: boolean
  onClick: () => void
}

function NotificationItem({ notification, isSelected, onClick }: NotificationItemProps) {
    const [isHovered, setIsHovered] = useState(false)
  return (
    <div
      className={`flex items-start gap-3 p-3 rounded-md border ${
        isSelected ? "border-primary bg-thirdcolor" : "border-gray-100"
      } hover:bg-gray-50 cursor-pointer transition-colors group`}
      onClick={onClick}
      onMouseEnter={()=> setIsHovered(true)}
      onMouseLeave={()=> setIsHovered(false)}
    >
      <div
        className={`${notification.user.color} w-15 h-15 rounded-md flex items-center justify-center text-primary font-medium`}
      >
        {notification.user.initial}
      </div>

      <div className="flex-1 min-w-0">
        <div className="">
        <span className="text-xs text-gray-500">{notification.timestamp}</span>
          <h3 className="font-medium text-sm">{notification.user.name}</h3>

        </div>
        <p className="text-sm text-gray-600 truncate">{notification.message}</p>
      </div>

        {isHovered && (
          <Button size="sm" variant="outline" className="cursor-pointer bg-primary text-white hover:bg-primary hover:text-white">
          View
        </Button>
            )}

    </div>
  )
}

