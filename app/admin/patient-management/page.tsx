"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PatientApprovalTab from "./patient-approval/page"
import PatientListTab from "./patient-list/page"
import { useSearchParams, useRouter } from "next/navigation"

export default function PatientManagementPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const currentTab = searchParams.get("tab") || "patient-approval"

  const handleTabChange = (value: string) => {
    const url = new URL(window.location.href)
    url.searchParams.set("tab", value)
    router.push(url.toString(), { scroll: false })
  }

  return (
    <div className="">
      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <TabsList className="block w-full">
          <TabsTrigger value="patient-approval">Approvals</TabsTrigger>
          <TabsTrigger value="patient-list">Patients List</TabsTrigger>
        </TabsList>
        <TabsContent value="patient-approval">
          <PatientApprovalTab />
        </TabsContent>
        <TabsContent value="patient-list">
          <PatientListTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
