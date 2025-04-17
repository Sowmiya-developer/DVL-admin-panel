"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock success and redirect to OTP verification
    setIsSubmitting(false)
    router.push("/auth/otp-verification")
  }

  return (
    <div className="flex h-screen">
      {/* Left side with DVL Archive */}
      <div className="w-1/2 bg-secondary flex items-center justify-center">
        <h1 className="text-primary text-6xl font-bold">DVL Archive</h1>
      </div>

      {/* Right side with forgot password form */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-[450px] p-8 bg-white rounded-lg shadow-sm">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">Forgot Password?</h1>
            <p className="text-gray-500 text-sm">Send a request & receive an OTP to your mail</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Sameer@gmail.com"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 bg-primary text-white rounded font-medium hover:bg-primary/90 transition-colors"
            >
              {isSubmitting ? "Sending..." : "Send Request"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/auth" className="inline-flex items-center text-sm text-gray-500 hover:text-black">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Login
            </Link>
          </div>

          <p className="mt-6 text-center text-xs text-gray-500">
            By Clicking send request a mail will be sent to with the OTP to reset password
          </p>
        </div>
      </div>
    </div>
  )
}
