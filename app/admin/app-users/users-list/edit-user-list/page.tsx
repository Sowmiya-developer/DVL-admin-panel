"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import Header from "@/app/admin/components/Header"
import type { AppUser } from "@/types/app-users/app-user.type"

// Mock data for app users
const appUsers: AppUser[] = [
  {
    id: "1",
    name: "James",
    email: "james@gmail.com",
    phoneNumber: "9566337372",
    status: "Active",
    isAIML: false,
    password: "********",
    nmcID: "NMC/REG/2023/987890",
    iadvlNo: "IADVL/MH/2025/12345",
  },
  {
    id: "2",
    name: "Salman",
    email: "salman@example.com",
    phoneNumber: "9846554510",
    status: "Active",
    isAIML: false,
    password: "********",
    nmcID: "NMC/REG/2023/234567",
    iadvlNo: "IADVL/MH/2025/78901",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    phoneNumber: "7654321098",
    status: "Inactive",
    isAIML: true,
    password: "********",
    nmcID: "NMC/REG/2023/345678",
    iadvlNo: "IADVL/MH/2025/23456",
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice@example.com",
    phoneNumber: "8765432109",
    status: "Active",
    isAIML: false,
    password: "********",
    nmcID: "NMC/REG/2023/456789",
    iadvlNo: "IADVL/MH/2025/34567",
  },
]

interface FormValues {
  name: string
  email: string
  phoneNumber: string
  password: string
  nmcID: string
  iadvlNo: string
  isAIML: boolean
  isActive: boolean
}

export default function EditUserListPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get("id")

  const [user, setUser] = useState<AppUser | null>(null)
  const [loading, setLoading] = useState(true)

  // Initialize form
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      nmcID: "",
      iadvlNo: "",
      isAIML: false,
      isActive: true,
    },
  })

  useEffect(() => {
    if (id) {
      // Find the user in the mock data
      const foundUser = appUsers.find((u) => u.id === id)
      if (foundUser) {
        setUser(foundUser)
        // Set form values
        form.reset({
          name: foundUser.name,
          email: foundUser.email,
          phoneNumber: foundUser.phoneNumber,
          password: foundUser.password || "********",
          nmcID: foundUser.nmcID || "",
          iadvlNo: foundUser.iadvlNo || "",
          isAIML: foundUser.isAIML,
          isActive: foundUser.status === "Active",
        })
      }
      setLoading(false)
    }
  }, [id, form])

  const onSubmit = (data: FormValues) => {
    console.log("Saving user:", data)
    router.push("/admin/app-users?tab=users-list")
  }

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>
  }

  if (!user) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold mb-4">User not found</h2>
        <Button onClick={() => router.push("/admin/app-users?tab=users-list")}>Back to Users List</Button>
      </div>
    )
  }

  // Define save button for header
  const saveButton = {
    name: "Save",
    type: "submit" as const,
    form: "editUserForm",
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg border overflow-hidden">
        <Header icon={true} method2={saveButton} control={form.control}>
          {user.name}
        </Header>

        <div className="p-6">
          <Form {...form}>
            <form id="editUserForm" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex items-center gap-2 mb-6">
                <FormField
                  control={form.control}
                  name="isAIML"
                  render={({ field }) => (
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="aiml"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-black data-[state=checked]:border-black"
                      />
                      <Label htmlFor="aiml">Assign to AI/ML</Label>
                    </div>
                  )}
                />
              </div>

              <h3 className="text-lg font-semibold mb-4">User Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field}  />
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
                        <Input {...field}  />
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
                        <Input {...field}  />
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
                      <FormControl>
                        <Input type="password" {...field}  />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nmcID"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NMC ID</FormLabel>
                      <FormControl>
                        <Input {...field}  />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="iadvlNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>IADVL No.</FormLabel>
                      <FormControl>
                        <Input {...field}  />
                      </FormControl>
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
