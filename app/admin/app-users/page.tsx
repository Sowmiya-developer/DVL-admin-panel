"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useSearchParams } from "next/navigation"
import ApprovalsPage from "./approvals/page"
import UsersListPage from "./users-list/page"

export default function AppUsersPage() {
  const searchParams = useSearchParams()
  const initialTab = searchParams.get("tab") || "approvals"
  const [currentTab, setCurrentTab] = useState(initialTab)

  const handleTabChange = (value: string) => {
    setCurrentTab(value)

    // Update URL without navigation for bookmarking purposes
    const url = new URL(window.location.href)
    url.searchParams.set("tab", value)
    window.history.pushState({}, "", url.toString())
  }

  return (
    <div className="">
      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <TabsList className="block w-full">
          <TabsTrigger value="approvals">Approvals</TabsTrigger>
          <TabsTrigger value="users-list">Users list</TabsTrigger>
        </TabsList>

        <TabsContent value="approvals">
          <ApprovalsPage />
        </TabsContent>

        <TabsContent value="users-list">
          <UsersListPage />
        </TabsContent>
      </Tabs>
    </div>
  )
}
