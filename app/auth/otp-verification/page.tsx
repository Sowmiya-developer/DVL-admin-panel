"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function OTPVerificationPage() {
  const [otp, setOtp] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Show verification success
    setIsSubmitting(false)
    setIsVerified(true)

    // Redirect to reset password after showing success
    setTimeout(() => {
      router.push("/auth/reset-password")
    }, 2000)
  }

  if (isVerified) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <img src="/circle-group.svg" alt="Success" className="w-64 h-64" />
          </div>
          <h1 className="text-2xl font-bold mb-2">OTP Verified</h1>
          <p className="text-gray-500">OTP has been verified successfully</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen">
      {/* Left side with DVL Archive */}
      <div className="w-1/2 bg-secondary flex items-center justify-center">
        <h1 className="text-primary text-6xl font-bold">DVL Archive</h1>
      </div>

      {/* Right side with OTP verification form */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-[450px] p-8 bg-white rounded-lg shadow-sm">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">Enter your OTP</h1>
            <p className="text-gray-500 text-sm">An OTP has been sent to your mail</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="otp" className="block text-sm font-medium">
                OTP
              </label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => {
                  // Only allow digits and limit to 6 characters
                  const value = e.target.value.replace(/\D/g, "").slice(0, 6)
                  setOtp(value)
                }}
                pattern="[0-9]{6}"
                minLength={6}
                maxLength={6}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="123456"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 bg-primary text-white rounded font-medium hover:bg-primary/90 transition-colors"
            >
              {isSubmitting ? "Verifying..." : "Verify"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            By verifying the OTP you can create your new password
          </p>
        </div>
      </div>
    </div>
  )
}
