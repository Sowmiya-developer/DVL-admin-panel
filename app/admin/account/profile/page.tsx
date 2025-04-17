"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { z } from "zod"
import { Edit, FileText, Save,  XCircle } from "lucide-react"
import Header from "@/app/admin/components/Header"

// Form schema
const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phoneNumber: z.string().min(10, { message: "Please enter a valid phone number." }),
  password: z.string().optional(),
})

type ProfileFormValues = z.infer<typeof profileSchema>

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Mock profile data
  const defaultValues: ProfileFormValues = {
    name: "Admin",
    email: "admin@gmail.com",
    phoneNumber: "9876543210",
    password: "Admin@123",
  }

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  })

  const toggleEditMode = () => {
    if (isEditing) {
      // If currently editing, submit the form
      form.handleSubmit(onSubmit)()
    } else {
      // If not editing, show loading briefly before enabling edit mode
      setIsSaving(true)
      setTimeout(() => {
        setIsEditing(true)
        setIsSaving(false)
      }, 500) // Show loading for 500ms
    }
  }

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSaving(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Profile updated:", data)
    setIsEditing(false)
    setIsSaving(false)
  }
  const [file, setFile] = useState<File | null>(null);
  const handleRemove = () => {
    setFile(null);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  // Header button configuration
  const method2 = {
    name: isEditing ? "Save" : "Edit",
    type: "button" as const,
    onClick: toggleEditMode,
    isPending: isSaving,
    form: "profile-form",
    icon: isEditing ? <Save size={16} /> : <Edit size={16} />,
  }

  return (
    <div className="container mx-auto p-4">
      <div className="border rounded-lg overflow-hidden">
        <Header icon={false} method2={method2} description="You can view and edit your details here">
          Profile
        </Header>
<div className="p-4 h-[calc(100vh-13rem)] overflow-y-auto">
          <Form {...form}>
            <form id="profile-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div           className="flex flex-col items-center border-2 border-dashed border-gray-300 rounded-lg w-full"        >
          <label className="cursor-pointer bg-thirdcolor p-6 rounded-lg w-full text-center">
            <input
              type="file"
              disabled={!isEditing}
              className="hidden"
              onChange={handleFileChange}
              suppressHydrationWarning
            />
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-lg font-bold">Upload Profile Image</h2>
              <p className="text-gray-500">Supported file types: JPEG, PNG</p>
            </div>

            {file && (
              <div
                className="mt-4 flex items-center justify-center gap-2"
                suppressHydrationWarning
              >
                <FileText className="h-5 w-5 text-green-500" />
                <p className="text-sm text-gray-700">{file.name}</p>
                <XCircle
                  className="h-5 w-5 text-red-500 cursor-pointer"
                  onClick={handleRemove}
                />
              </div>
            )}
          </label>
        </div>

              <h3 className="text-lg font-semibold pt-4">User Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={!isEditing} className={!isEditing ? "bg-gray-50" : ""} />
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
                        <Input {...field} disabled={!isEditing} className={!isEditing ? "bg-gray-50" : ""} />
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
                        <Input
                          {...field}
                          type="email"
                          disabled={!isEditing}
                          className={!isEditing ? "bg-gray-50" : ""}
                        />
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
                        <Input
                          {...field}
                          type="password"
                          disabled={!isEditing}
                          className={!isEditing ? "bg-gray-50" : ""}
                        />
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
