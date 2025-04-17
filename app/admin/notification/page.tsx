"use client"

import { useState } from "react"
import NotificationList from "./notification-list"
import NotificationView from "./notification-view"
import type { Notification } from "@/types/notification/notification-type"
import Header from '../components/Header';

// Sample data
const SAMPLE_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    user: {
      id: "u1",
      name: "Azarudeen Ali",
      initial: "A",
      color: "bg-secondary",
    },
    timestamp: "Feb23, 2025, 01:00AM",
    message: "Hi, I need access to the admin dashboard. Can you help me with that?",
    fullContent:
      "Hi, I need access to the admin dashboard. Can you help me with that? I've been trying to access it for the past week but I keep getting an error message saying I don't have the right permissions. I need to update some user settings and check the analytics for our recent campaign. This is becoming urgent as we have a presentation with stakeholders next week and I need to prepare the reports. Could you please grant me access or let me know what I need to do to get it? Thanks in advance for your help.",
    read: false,
  },
  {
    id: "2",
    user: {
      id: "u2",
      name: "Mohammed",
      initial: "M",
      color: "bg-secondary",
    },
    timestamp: "Feb23, 2025, 01:00AM",
    message: "The latest update is causing issues with my account settings.",
    fullContent:
      "The latest update is causing issues with my account settings. After the system update yesterday, I can't access my profile settings anymore. When I click on the settings icon, the page loads indefinitely. I've tried clearing my cache and using different browsers, but the problem persists. This is preventing me from updating my contact information which is important as I'm expecting some important notifications. Could you please look into this issue as soon as possible? I've attached a screenshot of the error I'm seeing.",
    read: false,
  },
  {
    id: "3",
    user: {
      id: "u3",
      name: "Kabil",
      initial: "K",
      color: "bg-secondary",
    },
    timestamp: "Feb23, 2025, 01:00AM",
    message: "When will the new feature be available? I've been waiting for it.",
    fullContent:
      "When will the new feature be available? I've been waiting for it since it was announced in the newsletter last month. Our team is particularly excited about the collaborative editing functionality as it would significantly improve our workflow. Do you have an estimated release date? Also, will there be any training sessions or documentation available when it launches? We want to make sure our team can start using it effectively right away. Thanks for any information you can provide!",
    read: false,
  },
  {
    id: "4",
    user: {
      id: "u4",
      name: "Sameer",
      initial: "S",
      color: "bg-secondary",
    },
    timestamp: "Feb23, 2025, 01:00AM",
    message: "Thanks for resolving my ticket so quickly! Great service.",
    fullContent:
      "Thanks for resolving my ticket so quickly! Great service. I was really impressed with how fast your team responded to my issue and provided a solution. The step-by-step instructions were clear and easy to follow, and now everything is working perfectly. It's refreshing to deal with such an efficient support team. I've already recommended your service to several colleagues who were having similar problems. Keep up the excellent work!",
    read: false,
  },
  {
    id: "5",
    user: {
      id: "u1",
      name: "Azarudeen Ali",
      initial: "A",
      color: "bg-secondary",
    },
    timestamp: "Feb23, 2025, 01:00AM",
    message: "I'm still having issues with my password reset. Can we try another approach?",
    fullContent:
      "I'm still having issues with my password reset. Can we try another approach? I've followed all the steps in your previous email but I'm still not receiving the reset link in my inbox. I've checked my spam folder and it's not there either. This is preventing me from accessing my account and I have some urgent tasks I need to complete. Is there an alternative way to verify my identity and reset my password? Perhaps a phone verification or security questions? I would really appreciate your help with this matter.",
    read: false,
  },
  {
    id: "6",
    user: {
      id: "u2",
      name: "Mohammed",
      initial: "M",
      color: "bg-secondary",
    },
    timestamp: "Feb23, 2025, 01:00AM",
    message: "Just wanted to follow up on my previous request about the API access.",
    fullContent:
      "Just wanted to follow up on my previous request about the API access. It's been a week since I submitted the application form and I haven't heard back yet. Our development team is waiting on this access to continue building our integration with your platform. The delay is affecting our project timeline. Could you please check the status of my application and let me know if there's any additional information you need from me? Our project deadline is approaching and this is becoming quite urgent.",
    read: false,
  },
  {
    id: "7",
    user: {
      id: "u3",
      name: "Kabil",
      initial: "K",
      color: "bg-secondary",
    },
    timestamp: "Feb23, 2025, 01:00AM",
    message: "I've uploaded the documents you requested. Please let me know if you need anything else.",
    fullContent:
      "I've uploaded the documents you requested. Please let me know if you need anything else. You should be able to access them in the shared folder I created. I've included all the financial statements, project proposals, and the signed contracts as discussed in our meeting. If any of the documents are unclear or if you need additional information, please don't hesitate to reach out. I'm available for a call this week if you'd like to discuss any of the details further.",
    read: false,
  },
]

export default function NotificationsPage() {
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(SAMPLE_NOTIFICATIONS[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterActive, setFilterActive] = useState(false)

  const filteredNotifications = SAMPLE_NOTIFICATIONS.filter(
    (notification) =>
      notification.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
        <div className="border rounded-2xl m-4">
    <Header
        icon={false}
        description="You can see and add all your notifications here">
        Notifications
        </Header> 
      <div className="p-4 h-[calc(100vh-13rem)] md:overflow-hidden">
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="w-full md:w-1/2">
            <NotificationList
              notifications={filteredNotifications}
              selectedNotification={selectedNotification}
              onSelectNotification={setSelectedNotification}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filterActive={filterActive}
              onFilterToggle={() => setFilterActive(!filterActive)}
            />
          </div>

          <div className="w-full md:w-1/2">
            {selectedNotification && <NotificationView notification={selectedNotification} />}
          </div>
        </div>
      </div>
      </div>

  )
}




// import React from 'react'
// import Header from '../components/Header';


// // const method2 = {
// //     name: "Save",
// //     type: "button" as const,
// //       };

// export default function page() {
//   return (
//    <>
//     <div className="border rounded-2xl m-4">
//     <Header
//         icon={false}
//         description="You can see and add all your notifications here">
//         Notifications
//         </Header> 
//       <div className="p-4">

//       </div>
//       </div>
//    </>
//   )
// }
