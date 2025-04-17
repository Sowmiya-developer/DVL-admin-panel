"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, ChevronLeft, ChevronRight, Sparkle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { format, addMonths, subMonths, isSameDay, isWithinInterval, isBefore } from "date-fns"
import { cn } from "@/lib/utils"
import { BarChart, PieChart } from "./charts/chart-component"

// Dashboard data based on date ranges
const dashboardDataByRange = {
  "2023-01-20_2023-02-09": {
    totalPatientEntries: 82,
    newEntries: 24,
    activeAppUsers: 8,
    approvedEntries: "86%",
    rejectedEntries: "6%",
    pendingApprovals: 20,
  },
  "2023-02-01_2023-02-28": {
    totalPatientEntries: 95,
    newEntries: 32,
    activeAppUsers: 12,
    approvedEntries: "78%",
    rejectedEntries: "10%",
    pendingApprovals: 25,
  },
  "2023-03-01_2023-03-31": {
    totalPatientEntries: 110,
    newEntries: 40,
    activeAppUsers: 15,
    approvedEntries: "82%",
    rejectedEntries: "8%",
    pendingApprovals: 18,
  },
  "2023-02-05_2023-03-01": {
    totalPatientEntries: 98,
    newEntries: 35,
    activeAppUsers: 14,
    approvedEntries: "80%",
    rejectedEntries: "9%",
    pendingApprovals: 22,
  },
  // Default data
  default: {
    totalPatientEntries: 82,
    newEntries: 24,
    activeAppUsers: 8,
    approvedEntries: "86%",
    rejectedEntries: "6%",
    pendingApprovals: 20,
  },
}

export default function DashboardPage() {
  const [isOpen, setIsOpen] = useState(false)
  const calendarRef = useRef<HTMLDivElement>(null)
  const [startDate, setStartDate] = useState<Date>(new Date(2023, 1, 5)) // Feb 5, 2023
  const [endDate, setEndDate] = useState<Date>(new Date(2023, 2, 1)) // Mar 1, 2023
  const [selecting, setSelecting] = useState<boolean>(false)
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2023, 1, 1)) // February 2023
  const [dashboardData, setDashboardData] = useState(dashboardDataByRange.default)

  // Update dashboard data when date range changes
  useEffect(() => {
    const startKey = format(startDate, "yyyy-MM-dd")
    const endKey = format(endDate, "yyyy-MM-dd")
    const rangeKey = `${startKey}_${endKey}`

    // Check if we have data for this exact range
    if (dashboardDataByRange[rangeKey as keyof typeof dashboardDataByRange]) {
      setDashboardData(dashboardDataByRange[rangeKey as keyof typeof dashboardDataByRange])
    } else {
      // If no exact match, we could implement logic to find the closest range
      // For now, use default data
      setDashboardData(dashboardDataByRange.default)
    }
  }, [startDate, endDate])

  // Handle clicks outside the calendar to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Handle date selection
  const handleDateClick = (date: Date) => {
    if (!selecting) {
      // Start selecting range
      setStartDate(date)
      setEndDate(date)
      setSelecting(true)
    } else {
      // Finish selecting range
      if (isBefore(date, startDate)) {
        setEndDate(startDate)
        setStartDate(date)
      } else {
        setEndDate(date)
      }
      setSelecting(false)
    }
  }

  // Check if a date is the start date
  const isStartDate = (date: Date) => isSameDay(date, startDate)

  // Check if a date is the end date
  const isEndDate = (date: Date) => isSameDay(date, endDate)

  // Check if a date is in the selected range
  const isInRange = (date: Date) => {
    // Make sure we're comparing full dates (year, month, day)
    return isWithinInterval(date, { start: startDate, end: endDate }) && !isStartDate(date) && !isEndDate(date)
  }

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  // Generate calendar for a specific month
  const renderCalendar = (month: Date) => {
    const monthStart = new Date(month.getFullYear(), month.getMonth(), 1)
    const monthName = format(month, "MMMM yyyy")

    // Get day names
    const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

    // Get days in month
    const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()

    // Get the day of the week the month starts on (0 = Sunday, 1 = Monday, etc.)
    const startDay = monthStart.getDay()

    // Get days from previous month to fill in the first week
    const prevMonthDays = []
    const prevMonth = subMonths(monthStart, 1)
    const daysInPrevMonth = new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 0).getDate()

    for (let i = startDay - 1; i >= 0; i--) {
      prevMonthDays.push(new Date(prevMonth.getFullYear(), prevMonth.getMonth(), daysInPrevMonth - i))
    }

    // Get days for current month
    const currentMonthDays = []
    for (let i = 1; i <= daysInMonth; i++) {
      currentMonthDays.push(new Date(month.getFullYear(), month.getMonth(), i))
    }

    // Get days from next month to fill in the last week
    const nextMonthDays = []
    const nextMonthStart = addMonths(monthStart, 1)
    const daysNeeded = 42 - (prevMonthDays.length + currentMonthDays.length) // 42 = 6 rows of 7 days

    for (let i = 1; i <= daysNeeded; i++) {
      nextMonthDays.push(new Date(nextMonthStart.getFullYear(), nextMonthStart.getMonth(), i))
    }

    // Combine all days
    const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]

    return (
      <div className="w-[300px]">
        <div className="text-center font-medium text-lg mb-4">{monthName}</div>
        <div className="grid grid-cols-7 gap-1">
          {dayNames.map((day) => (
            <div key={day} className="text-center text-sm text-gray-500 py-1">
              {day}
            </div>
          ))}

          {allDays.map((date, i) => {
            const isCurrentMonth = date.getMonth() === month.getMonth()
            const isSelected = isStartDate(date) || isEndDate(date)
            const isInSelectedRange = isInRange(date)

            return (
              <div
                key={i}
                className={cn(
                  "h-9 w-9 text-center flex items-center justify-center rounded-md cursor-pointer text-sm",
                  !isCurrentMonth && "text-gray-400",
                  isSelected && "bg-[#4C4DDC] text-white", // Updated to primary color
                  isInSelectedRange && "bg-[#efeefc] text-[#4C4DDC]", // Updated to secondary color with primary text
                )}
                onClick={() => handleDateClick(date)}
              >
                {date.getDate()}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 h-[calc(100vh-5rem)] overflow-y-auto bg-[#faf9fe]">
      {" "}
      {/* Updated to thirdcolor */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="relative">
          <Button variant="outline" className="border-[#E0E0E0] h-10 px-3 py-2" onClick={() => setIsOpen(!isOpen)}>
            <CalendarIcon className="mr-2 h-4 w-4 text-[#4C4DDC]" /> {/* Updated to primary color */}
            {format(startDate, "MMM dd, yyyy")} - {format(endDate, "MMM dd, yyyy")}
          </Button>

          {isOpen && (
            <div
              ref={calendarRef}
              className="absolute right-0 z-50 mt-2 bg-white rounded-md shadow-lg p-4"
              style={{ width: "fit-content" }}
            >
              <div className="flex justify-between items-center mb-4">
                <button className="p-1 rounded-full hover:bg-gray-100" onClick={prevMonth}>
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="flex space-x-8">
                  {renderCalendar(currentMonth)}
                  {renderCalendar(addMonths(currentMonth, 1))}
                </div>
                <button className="p-1 rounded-full hover:bg-gray-100" onClick={nextMonth}>
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">
                    {format(startDate, "MMM dd, yyyy")} - {format(endDate, "MMM dd, yyyy")}
                  </span>
                </div>
                <Button
                  size="sm"
                  className="bg-[#4C4DDC] text-white hover:bg-[#4C4DDC]/90" // Updated to primary color
                  onClick={() => setIsOpen(false)}
                >
                  Apply
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* First row - Metric cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard title="Total Patient Entries" value={dashboardData.totalPatientEntries.toString()} />
        <MetricCard title="New Entries" value={dashboardData.newEntries.toString()} />
        <MetricCard title="Active App Users" value={dashboardData.activeAppUsers.toString()} />
      </div>
      {/* Second row - Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-[#E0E0E0]">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-base font-medium">Entries Overtime</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <BarChart />
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E0E0E0]">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-base font-medium">Entry Status Breakdown</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <PieChart />
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Third row - Metric cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard title="Approved Entries" value={dashboardData.approvedEntries} />
        <MetricCard title="Rejected Entries" value={dashboardData.rejectedEntries} />
        <MetricCard title="Pending App Approvals(Users)" value={dashboardData.pendingApprovals.toString()} />
      </div>
    </div>
  )
}

function MetricCard({ title, value }: { title: string; value: string }) {
  return (
    <Card className="border-[#E0E0E0]">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
          <Sparkle className="h-4 w-4 text-[#4C4DDC]" /> {/* Updated to primary color */}
        </div>
      </CardHeader>
      <CardContent>
        <p
          className={cn(
            "text-3xl font-bold",
            title.includes("Rejected") ? "text-destructive" : "text-[#4C4DDC]", // Updated to primary color
          )}
        >
          {value}
        </p>
      </CardContent>
    </Card>
  )
}
