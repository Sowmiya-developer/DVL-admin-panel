"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Header from "@/app/admin/components/Header"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { formSchema, type FormValues } from "@/types/users/user.schema"
import { useState, useEffect } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

// Mock data for users
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phoneNumber: "123-456-7890",
    password: "securepass1",
    role: "admin",
    status: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phoneNumber: "234-567-8901",
    password: "securepass2",
    role: "editor",
    status: true,
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    phoneNumber: "345-678-9012",
    password: "securepass3",
    role: "viewer",
    status: false,
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    phoneNumber: "456-789-0123",
    password: "securepass4",
    role: "editor",
    status: true,
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    phoneNumber: "567-890-1234",
    password: "securepass5",
    role: "viewer",
    status: true,
  },
]

export default function EditUserPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const userId = searchParams.get("id")

  // Initialize form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      isActive: true,
    },
  })

  // Load user data when component mounts
  useEffect(() => {
    if (userId) {
      // Find user in mock data
      const user = mockUsers.find((u) => u.id === Number.parseInt(userId))
      if (user) {
        form.reset({
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          password: user.password,
          isActive: user.status,
        })
      } else {
        // User not found, redirect back to users list
        router.push("/admin/users")
      }
    }
  }, [userId, router, form])

  // Generate random password
  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
    let password = ""
    for (let i = 0; i < 10; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    form.setValue("password", password)
  }

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    setIsPending(true)
    console.log("Form submitted:", data)

    // Simulate API call
    setTimeout(() => {
      setIsPending(false)
      router.push("/admin/users")
    }, 1000)
  }

  // Define update button for header
  const updateButton = {
    name: "Save",
    type: "submit" as const,
    form: "editUserForm",
    isPending: isPending,
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg border overflow-hidden">
        {/* Header with Active/Inactive switch */}
        <Header icon={true} method2={updateButton}>
        {form.watch("name")}
        </Header>

        <div className="h-[calc(100vh-13rem)] overflow-auto">
          {/* Form */}
          <Form {...form}>
            <form id="editUserForm" onSubmit={form.handleSubmit(onSubmit)} className="px-4">
              <h2 className="text-lg font-semibold py-3">User Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Phone Number" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter email address" type="email" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <FormControl>
                            <Input placeholder="Enter password" type={showPassword ? "text" : "password"} {...field} />
                          </FormControl>
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        <Button
                          type="button"
                          onClick={generatePassword}
                          className="bg-primary text-white whitespace-nowrap"
                        >
                          Generate
                        </Button>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
