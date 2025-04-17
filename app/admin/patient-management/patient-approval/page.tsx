"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Eye } from "lucide-react"
import Link from "next/link"
import Header from "@/app/admin/components/Header"
import type { Patient } from "@/types/patient-management/patient.type"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PatientApprovalPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Add pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  // Mock data for patients pending approval
  const [patients] = useState<Patient[]>([
    {
      id: "1",
      uhid: "23348939",
      name: "James",
      sex: "Male",
      age: 24,
      phoneNumber: "+91 9876556567",
      occupation: "Sales",
      status: "Pending",
    },
    {
      id: "2",
      uhid: "23348976",
      name: "Salman",
      sex: "Male",
      age: 22,
      phoneNumber: "+91 9876556567",
      occupation: "Engineer",
      status: "Pending",
    },
    {
      id: "3",
      uhid: "23348932",
      name: "Virat",
      sex: "Male",
      age: 35,
      phoneNumber: "+91 9876556567",
      occupation: "Doctor",
      status: "Rejected",
    },
    {
      id: "4",
      uhid: "23348933",
      name: "Rohit",
      sex: "Male",
      age: 28,
      phoneNumber: "+91 9876556567",
      occupation: "Engineer",
      status: "Pending",
    },
    {
      id: "5",
      uhid: "23348934",
      name: "Dhoni",
      sex: "Male",
      age: 42,
      phoneNumber: "+91 9876556567",
      occupation: "Cricketer",
      status: "Pending",
    },
    {
      id: "6",
      uhid: "23348935",
      name: "Sachin",
      sex: "Male",
      age: 50,
      phoneNumber: "+91 9876556567",
      occupation: "Cricketer",
      status: "Pending",
    },
    {
      id: "7",
      uhid: "23348936",
      name: "Rahul",
      sex: "Male",
      age: 32,
      phoneNumber: "+91 9876556567",
      occupation: "Doctor",
      status: "Rejected",
    },
  ])

  // Filter patients based on search term
  const filteredPatients = patients.filter(
    (patient) => patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || patient.uhid.includes(searchTerm),
  )

  // Pagination logic
  const totalPages = Math.ceil(filteredPatients.length / rowsPerPage)
  const paginatedPatients = filteredPatients.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)

  return (
    <div className="p-4 space-y-4">
      {/* Search and Filter above header */}
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
        <Button variant="outline" className="flex items-center gap-2">
          Filter
        </Button>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        {/* Header using Header component */}
        <Header description="You can see and approve all your new patients here">New Entry Approvals list</Header>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>UHID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Sex</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedPatients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No patients found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>{patient.uhid}</TableCell>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.sex}</TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          patient.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {patient.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/admin/patient-management/patient-approval/view-patient-approval?id=${patient.uhid}`}
                      >
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Add Pagination */}
      {filteredPatients.length > 0 && (
        <div className="flex items-center justify-between pt-5 px-4 py-2 text-sm">
          <div>0 of {filteredPatients.length} row(s) selected</div>
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
