"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, PieChart } from "./chart-component"
import Header from "../../components/Header"

export default function ChartsPage() {
  return (
    <div className="bg-white rounded-lg shadow-sm m-4">
      <Header icon={true} description="Visualize your data with interactive charts">
        Charts
      </Header>

      <div className="p-6 space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-[#E0E0E0]">
            <CardHeader>
              <CardTitle>Entries Overtime</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <BarChart />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#E0E0E0]">
            <CardHeader>
              <CardTitle>Entry Status Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center">
                <PieChart />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
