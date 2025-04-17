"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { LoginApproval, AccountApproval } from "@/types/app-users/app-user.type"
import Header from "@/app/admin/components/Header"

export default function ApprovalsHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(2)

  // Mock data for approval history (approved or rejected users)
  const [approvalHistory] = useState<(LoginApproval | AccountApproval)[]>([
    {
      id: "5",
      name: "David Miller",
      email: "david@example.com",
      phoneNumber: "+91 76543-21098",
      status: "Rejected",
      type: "login",
      nmcID: "NMC/REG/2023/678901",
      iadvlNo: "IADVL/MH/2025/56789",
    },
    {
      id: "6",
      name: "Eva Garcia",
      email: "eva@example.com",
      phoneNumber: "+91 65432-10987",
      status: "Approved",
      type: "account",
      nmcID: "NMC/REG/2023/789012",
      iadvlNo: "IADVL/MH/2025/67890",
    },
    {
      id: "7",
      name: "Frank Lee",
      email: "frank@example.com",
      phoneNumber: "+91 54321-09876",
      status: "Approved",
      type: "login",
      nmcID: "NMC/REG/2023/890123",
      iadvlNo: "IADVL/MH/2025/78901",
    },
    {
      id: "8",
      name: "Grace Kim",
      email: "grace@example.com",
      phoneNumber: "+91 43210-98765",
      status: "Rejected",
      type: "account",
      nmcID: "NMC/REG/2023/901234",
      iadvlNo: "IADVL/MH/2025/89012",
    },
  ])

  // Filter approvals based on search term and status filter
  const filteredApprovals = approvalHistory.filter((approval) => {
    // Search filter
    const matchesSearch =
      approval.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      approval.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      approval.phoneNumber.includes(searchTerm) ||
      approval.nmcID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      approval.iadvlNo.toLowerCase().includes(searchTerm.toLowerCase())

    // Status filter
    const matchesStatus = statusFilter === "all" || approval.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Get paginated data
  const totalPages = Math.ceil(filteredApprovals.length / rowsPerPage)
  const paginatedData = filteredApprovals.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)

  return (
    <>
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
        <div className="flex items-center gap-2">
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
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Header */}
      <Header description="Users whose approvals have been processed">Approvals History</Header>

      {/* Approvals List Table */}
      <div className="border rounded-md">
        <div className="overflow-x-auto pt-2 pb-4">
          <Table>
            <TableHeader>
              <TableRow className="border-b">
                <TableHead className="pl-4 font-semibold">Name</TableHead>
                {/* <TableHead className="font-semibold">Email</TableHead> */}
                <TableHead className="font-semibold">Phone Number</TableHead>
                <TableHead className="font-semibold">NMC ID</TableHead>
                <TableHead className="font-semibold">IADVL No.</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                    No approvals found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((approval) => (
                  <TableRow key={approval.id} className="border-b">
                    <TableCell className="pl-4">{approval.name}
                        <p>{approval.email}</p>
                    </TableCell>
                    {/* <TableCell>{approval.email}</TableCell> */}
                    <TableCell>{approval.phoneNumber}</TableCell>
                    <TableCell>{approval.nmcID}</TableCell>
                    <TableCell>{approval.iadvlNo}</TableCell>
                    <TableCell>
                      <span
                        className={`px-3 py-1 text-xs rounded-full ${
                          approval.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : approval.status === "Approved"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {approval.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{approval.type === "login" ? "Login" : "Account"}</span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      {filteredApprovals.length > 0 && (
        <div className="flex items-center justify-between pt-5 px-4 py-2 text-sm">
          <div>0 of {filteredApprovals.length} row(s) selected</div>
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
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
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
    </>
  )
}
