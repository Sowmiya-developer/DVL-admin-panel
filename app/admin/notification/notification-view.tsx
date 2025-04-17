"use client"

import { Button } from "@/components/ui/button"
import type { Notification } from "@/types/notification/notification-type"

interface NotificationViewProps {
  notification: Notification
}

export default function NotificationView({ notification }: NotificationViewProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`${notification.user.color} w-8 h-8 rounded-md flex items-center justify-center text-primary font-medium`}
          >
            {notification.user.initial}
          </div>
          <div>
            <h3 className="font-medium">{notification.user.name}</h3>
            <p className="text-xs text-gray-500">{notification.timestamp}</p>
          </div>
        </div>
        <Button size="sm" className="bg-primary text-white hover:bg-primary cursor-pointer">
          View User
        </Button>
      </div>

      <div className="text-sm text-gray-700 space-y-4 h-[calc(100vh-13rem)] overflow-auto">
        <p>{notification.fullContent || notification.message}</p>
      </div>
    </div>
  )
}

