"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"
import { cn } from "@/lib/utils"

Chart.register(...registerables)

export function BarChart({ className }: { className?: string }) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["22 March", "23 March", "24 March", "25 March", "26 March", "27 March", "28 March"],
        datasets: [
          {
            label: "Entries",
            data: [30, 40, 25, 48, 35, 55, 50],
            backgroundColor: "#4C4DDC", // Updated to primary color
            borderRadius: 4,
            barThickness: 30,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              title: (tooltipItems) => tooltipItems[0].label,
              label: (context) => `Patients: ${context.raw}`,
            },
            backgroundColor: "#4C4DDC", // Updated to primary color
            titleColor: "#FFFFFF",
            bodyColor: "#FFFFFF",
            borderColor: "#4C4DDC", // Updated to primary color
            borderWidth: 1,
            padding: 10,
            displayColors: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: "#EEEEEE",
            },
            ticks: {
              precision: 0,
            },
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return <canvas ref={chartRef} className={cn("w-full", className)} />
}

export function PieChart({ className }: { className?: string }) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    chartInstance.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Approved", "Rejected", "Pending"],
        datasets: [
          {
            data: [65, 20, 15],
            backgroundColor: ["#4C4DDC", "#8584E8", "#efeefc"], // Updated to theme colors
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              usePointStyle: true,
              pointStyle: "rect",
              padding: 20,
            },
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || ""
                const value = context.raw as number
                const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0) as number
                const percentage = Math.round((value / total) * 100)
                return `${label}: ${percentage}%`
              },
            },
            backgroundColor: "#4C4DDC", // Updated to primary color
            titleColor: "#FFFFFF",
            bodyColor: "#FFFFFF",
            borderColor: "#4C4DDC", // Updated to primary color
            borderWidth: 1,
            padding: 10,
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return <canvas ref={chartRef} className={cn("w-full max-w-[300px]", className)} />
}
