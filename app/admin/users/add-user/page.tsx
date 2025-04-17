"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Header from "@/app/admin/components/Header"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { formSchema, type FormValues } from "@/types/users/user.schema"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

export default function AddUserPage() {
  const [showPassword, setShowPassword] = useState(false)

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
    console.log("Form submitted:", data)
    window.history.back()
  }

  // Define save button for header
  const saveButton = {
    name: "Save",
    type: "submit" as const,
    form: "addUserForm",
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg border overflow-hidden">
        {/* Header with Active/Inactive switch */}
        <Header icon={true} method2={saveButton} >
          Add New User
        </Header>

        <div className="h-[calc(100vh-13rem)] overflow-auto">
          {/* Form */}
          <Form {...form}>
            <form id="addUserForm" onSubmit={form.handleSubmit(onSubmit)} className="px-4">
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
