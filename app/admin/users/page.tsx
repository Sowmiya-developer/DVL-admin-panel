"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon, Trash2, Edit, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { User } from "@/types/users/user.type";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Saleem",
      email: "saleem@example.com",
      department: "Sales",
      role: "Staff",
      status: "Active",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      department: "Marketing",
      role: "Director",
      status: "Active",
    },
    {
      id: "3",
      name: "Michael Johnson",
      email: "michael.j@example.com",
      department: "Engineering",
      role: "Team Lead",
      status: "Active",
    },
    {
      id: "4",
      name: "Sarah Williams",
      email: "sarah.w@example.com",
      department: "Human Resources",
      role: "Coordinator",
      status: "Inactive",
    },
    {
      id: "5",
      name: "Robert Brown",
      email: "robert.b@example.com",
      department: "Sales",
      role: "Staff",
      status: "Active",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  // const [roleFilter, setRoleFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(2);
  const [selectedRows] = useState<string[]>([]);

  // Get unique roles for filter options
  // const uniqueRoles = Array.from(new Set(users.map((user) => user.role)));

  // Toggle user status
  const handleToggleStatus = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === "Active" ? "Inactive" : "Active",
            }
          : user
      )
    );
  };

  // Delete a user
  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // Filter users by search term and filters
  const filteredUsers = users.filter((user) => {
    // Search filter
    const matchesSearch = searchTerm
      ? user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    // Role filter
    // const matchesRole = roleFilter === "all" || roleFilter === "" || user.role === roleFilter

    // Status filter
    const matchesStatus =
      statusFilter === "all" ||
      statusFilter === "" ||
      user.status === statusFilter;

    // return matchesSearch && matchesRole && matchesStatus
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Pagination handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (value: string) => {
    setRowsPerPage(Number(value));
    setCurrentPage(1); // Reset to first page when changing rows per page
  };

  // Define method2 for users header - only show when there's at least one user
  const usersMethod2 =
    users.length > 0
      ? {
          name: "+ Add New",
          type: "button" as const,
          onClick: () => (window.location.href = "/admin/users/add-user"),
          form: "profile-form",
        }
      : undefined;

  return (
    <div className="px-4">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-4 mb-2">
        <div className="relative w-72">
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-4"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        </div>

        <div className="flex flex-wrap gap-2 items-center w-full md:w-auto">
          {/* Role Filter */}
          {/* <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              {uniqueRoles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */}

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        {/* Header with Add New button */}
        <Header
          icon={false}
          method2={usersMethod2}
          description="You can see and add all your admin users here  ">
          Admin Users list
        </Header>

        <div className="h-[calc(100vh-20rem)] overflow-auto">
          {filteredUsers.length === 0 ? (
            <div className="flex flex-col items-center py-0 justify-center">
              <div className="relative w-[150px] h-[150px]">
                <Image
                  src="/circle-group.svg"
                  alt="No Users"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold">No Users</h3>
              <p className="text-sm text-gray-500 mb-2">
                {users.length === 0
                  ? "Create a new user here"
                  : "Try adjusting your search or filters"}
              </p>
              {users.length === 0 ? (
                <Link href="/admin/users/add-user">
                  <Button variant="outline" className="bg-primary text-white">
                    <PlusIcon className="h-4 w-4 mr-1" /> Add New
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => {
                    // setRoleFilter("all")
                    setStatusFilter("all");
                  }}>
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="py-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-4">Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="pl-4">
                        <div>{user.name}</div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <span
                          className={`px-3 py-1 text-xs rounded-full ${
                            user.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}>
                          {user.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <Link href={`/admin/users/edit-user?id=${user.id}`}>
                            <button className=" flex text-gray-500 hover:text-[#4C4DDC]">
                              <Edit className="h-4 w-4" />
                            </button>
                          </Link>
                          <button
                            className="text-gray-500 hover:text-red-500"
                            onClick={() => handleDeleteUser(user.id)}>
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <Switch
                            checked={user.status === "Active"}
                            onCheckedChange={() => handleToggleStatus(user.id)}
                            className="data-[state=checked]:bg-[#4C4DDC]"
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {filteredUsers.length > 0 && (
        <div className="flex items-center justify-between pt-5 px-4 py-2 text-sm">
          <div>
            {selectedRows.length} of {filteredUsers.length} row(s) selected
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <span>Rows per page</span>
              <Select
                value={rowsPerPage.toString()}
                onValueChange={handleRowsPerPageChange}>
                <SelectTrigger className="w-[70px] h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="border-2 text-xl"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}>
                {"««"}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-2 text-xl"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}>
                {"‹"}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-2 text-xl"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}>
                {"›"}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-2 text-xl"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}>
                {"»»"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
