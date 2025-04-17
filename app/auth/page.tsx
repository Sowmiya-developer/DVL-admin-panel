"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"

export default function AuthPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock login logic
    if (email && password) {
      router.push("/admin/dashboard")
    } else {
      alert("Please enter both email and password")
    }

    setIsLoading(false)
  }

  return (
    <div className="flex h-screen">
      {/* Left side with DVL Archive */}
      <div className="w-1/2 bg-secondary flex items-center justify-center">
        <h1 className="text-primary text-6xl font-bold">DVL Archive</h1>
      </div>

      {/* Right side with login form */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-[450px] p-8 bg-white rounded-lg shadow-sm">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">Login to your account</h1>
            <p className="text-gray-500 text-sm">Enter your email & password below to login to your account</p>
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
                placeholder="m@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <Link href="/auth/forgotpassword" className="text-sm text-gray-500 hover:text-black">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded pr-10"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-primary text-white rounded font-medium hover:bg-primary/90 transition-colors"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            By clicking continue, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )}