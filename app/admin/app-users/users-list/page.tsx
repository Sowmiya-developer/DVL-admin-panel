"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Trash2, Edit } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import Header from "@/app/admin/components/Header"
import type { AppUser } from "@/types/app-users/app-user.type"

export default function UsersListPage() {
  // Mock data for app users
  const [users, setUsers] = useState<AppUser[]>([
    {
      id: "1",
      name: "James",
      email: "james@gmail.com",
      phoneNumber: "+91 88789-65567",
      status: "Active",
      isAIML: false,
    },
    {
      id: "2",
      name: "Salman",
      email: "salman@gmail.com",
      phoneNumber: "+91 98465-54510",
      status: "Active",
      isAIML: false,
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob@example.com",
      phoneNumber: "+91 76543-21098",
      status: "Inactive",
      isAIML: true,
    },
    {
      id: "4",
      name: "Alice Brown",
      email: "alice@example.com",
      phoneNumber: "+91 87654-32109",
      status: "Active",
      isAIML: false,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  // Toggle user status
  const handleToggleStatus = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === "Active" ? "Inactive" : "Active",
            }
          : user,
      ),
    )
  }

  // Delete user
  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId))
  }

  // Filter users based on search term and status filter
  const filteredUsers = users.filter((user) => {
    // Search filter
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phoneNumber.includes(searchTerm)

    // Status filter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage)
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)

  return (
    <div className="p-4">
      {/* Search and Filter */}
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-72">
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-4"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        </div>
        <div className="flex gap-2">
          <Select
            value={statusFilter}
            onValueChange={(value) => {
              setStatusFilter(value)
              setCurrentPage(1)
            }}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Header */}
      <Header description="You can see and manage all your app users here">Users list</Header>

      <div className="border border-gray-200 rounded-md">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b">
                <TableHead className="pl-4 font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Phone Number</TableHead>
                <TableHead className="font-semibold">AI/ML</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedUsers.map((user) => (
                  <TableRow key={user.id} className="border-b">
                    <TableCell className="pl-4">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phoneNumber}</TableCell>
                    <TableCell>{user.isAIML ? "Yes" : "-"}</TableCell>
                    <TableCell>
                      <span
                        className={`px-3 py-1 text-xs rounded-full ${
                          user.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <button
                          className="text-gray-500 hover:text-blue-600"
                          onClick={() =>
                            (window.location.href = `/admin/app-users/users-list/edit-user-list?id=${user.id}`)
                          }
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-gray-500 hover:text-red-600" onClick={() => handleDeleteUser(user.id)}>
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <Switch
                          checked={user.status === "Active"}
                          onCheckedChange={() => handleToggleStatus(user.id)}
                          className="data-[state=checked]:bg-black"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination - Updated to match approvals design */}
      {filteredUsers.length > 0 && (
        <div className="flex items-center justify-between pt-5 px-4 py-2 text-sm">
          <div>0 of {filteredUsers.length} row(s) selected</div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <span>Rows per page</span>
              <Select
                value={rowsPerPage.toString()}
                onValueChange={(value) => {
                  setRowsPerPage(Number(value))
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="w-[70px] h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <span>
              Page {currentPage} of {totalPages || 1}
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="border-2 text-xl"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                {"««"}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-2 text-xl"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                {"‹"}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-2 text-xl"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages || 1))}
                disabled={currentPage === (totalPages || 1)}
              >
                {"›"}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-2 text-xl"
                onClick={() => setCurrentPage(totalPages || 1)}
                disabled={currentPage === (totalPages || 1)}
              >
                {"»»"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
