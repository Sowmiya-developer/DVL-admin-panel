"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { usePathname } from "next/navigation"
import LoginApprovalsPage from "./login-approvals/page"
import AccountApprovalsPage from "./account-approvals/page"
import ApprovalsHistoryPage from "./approvals-history/page"

export default function ApprovalsPage() {
  const [activeTab, setActiveTab] = useState("login-approvals")
  // const router = useRouter()
  const pathname = usePathname()

  // Update URL when tab changes without full navigation
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    // Update the URL to reflect the current tab for bookmarking/sharing
    window.history.pushState(null, "", `/admin/app-users/approvals/${value}`)
  }

  // Set the active tab based on the current pathname when component mounts
  useEffect(() => {
    if (pathname.includes("/login-approvals")) {
      setActiveTab("login-approvals")
    } else if (pathname.includes("/account-approvals")) {
      setActiveTab("account-approvals")
    } else if (pathname.includes("/approvals-history")) {
      setActiveTab("approvals-history")
    }
  }, [pathname])

  return (
    <div className="p-4">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-4">
        <TabsList className="border inline-flex h-11 items-center justify-center rounded-md p-1 text-muted-foreground">
          <TabsTrigger
            value="login-approvals"
            className="rounded-sm border-none px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            Login Approval
          </TabsTrigger>
          <TabsTrigger
            value="account-approvals"
            className="rounded-sm border-none px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            Account Approval
          </TabsTrigger>
          <TabsTrigger
            value="approvals-history"
            className="rounded-sm border-none px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            Approvals History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="login-approvals" className="mt-4">
          <LoginApprovalsPage />
        </TabsContent>

        <TabsContent value="account-approvals" className="mt-4">
          <AccountApprovalsPage />
        </TabsContent>

        <TabsContent value="approvals-history" className="mt-4">
          <ApprovalsHistoryPage />
        </TabsContent>
      </Tabs>
    </div>
  )
}
