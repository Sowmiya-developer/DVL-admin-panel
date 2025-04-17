"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, CheckCircle, XCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import type { AccountApproval } from "@/types/app-users/app-user.type"
import Header from "@/app/admin/components/Header"

export default function AccountApprovalsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(2)

  // Dialog state
  const [approveDialogOpen, setApproveDialogOpen] = useState(false)
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false)
  const [selectedApproval, setSelectedApproval] = useState<AccountApproval | null>(null)
  const [rejectReason, setRejectReason] = useState("")

  // Mock data for account approvals (users who created an account)
  const [accountApprovals] = useState<AccountApproval[]>([
    {
      id: "3",
      name: "Alice Brown",
      email: "alice@example.com",
      phoneNumber: "+91 98765-43210",
      status: "Pending",
      type: "account",
      nmcID: "NMC/REG/2023/345678",
      iadvlNo: "IADVL/MH/2025/23456",
    },
    {
      id: "4",
      name: "Charlie Wilson",
      email: "charlie@example.com",
      phoneNumber: "+91 87654-32109",
      status: "Pending",
      type: "account",
      nmcID: "NMC/REG/2023/456789",
      iadvlNo: "IADVL/MH/2025/34567",
    },
    {
      id: "10",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phoneNumber: "+91 66778-90123",
      status: "Pending",
      type: "account",
      nmcID: "NMC/REG/2023/567890",
      iadvlNo: "IADVL/MH/2025/45678",
    },
  ])

  // Filter approvals based on search term and status filter
  const filteredApprovals = accountApprovals.filter((approval) => {
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

  // Handle approve action
  const handleApprove = () => {
    console.log("Approving user:", selectedApproval)
    // In a real app, you would call an API to approve the user
    setApproveDialogOpen(false)
    // Reset selected approval
    setSelectedApproval(null)
  }

  // Handle reject action
  const handleReject = () => {
    console.log("Rejecting user:", selectedApproval, "Reason:", rejectReason)
    // In a real app, you would call an API to reject the user
    setRejectDialogOpen(false)
    // Reset selected approval and reason
    setSelectedApproval(null)
    setRejectReason("")
  }

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
              <SelectItem value="Pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Header */}
      <Header description="Pending users who have created an account">Account Approvals</Header>

      {/* Approvals List Table */}
      <div className="border rounded-md">
        <div className="overflow-x-auto pt-2 pb-4">
          <Table>
            <TableHeader>
              <TableRow className="border-b">
                <TableHead className="pl-4 font-semibold">Name/Email</TableHead>
                <TableHead className="font-semibold">Phone Number</TableHead>
                <TableHead className="font-semibold">NMC ID</TableHead>
                <TableHead className="font-semibold">IADVL No.</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Action</TableHead>
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
                      {approval.status === "Pending" ? (
                        <div className="flex gap-4">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:text-green-700 bg-green-500 w-25"
                            onClick={() => {
                              setSelectedApproval(approval)
                              setApproveDialogOpen(true)
                            }}
                          >
                            <CheckCircle className="h-5 w-5" />
                            Approve
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:text-green-700 bg-red-500 w-25"
                            onClick={() => {
                              setSelectedApproval(approval)
                              setRejectDialogOpen(true)
                            }}
                          >
                            <XCircle className="h-5 w-5" />
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">-</span>
                      )}
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

      {/* Approve Dialog */}
      <Dialog open={approveDialogOpen} onOpenChange={setApproveDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Approve User</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {selectedApproval && (
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Name:</span> {selectedApproval.name}
                </div>
                <div>
                  <span className="font-medium">Email:</span> {selectedApproval.email}
                </div>
                <div>
                  <span className="font-medium">NMC ID:</span> {selectedApproval.nmcID}
                </div>
                <div>
                  <span className="font-medium">IADVL No.:</span> {selectedApproval.iadvlNo}
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setApproveDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-green-600 text-white hover:bg-green-700" onClick={handleApprove}>
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reject User</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this user. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {selectedApproval && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">Name:</span> {selectedApproval.name}
                  </div>
                  <div>
                    <span className="font-medium">Email:</span> {selectedApproval.email}
                  </div>
                  <div>
                    <span className="font-medium">NMC ID:</span> {selectedApproval.nmcID}
                  </div>
                  <div>
                    <span className="font-medium">IADVL No.:</span> {selectedApproval.iadvlNo}
                  </div>
                </div>
                <div>
                  <label htmlFor="reject-reason" className="block text-sm font-medium mb-1">
                    Rejection Reason
                  </label>
                  <Textarea
                    id="reject-reason"
                    placeholder="Enter reason for rejection"
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={handleReject}
              disabled={!rejectReason.trim()}
            >
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
