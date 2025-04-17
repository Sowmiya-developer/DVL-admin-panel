export interface AppUser {
    id: string
    name: string
    email: string
    phoneNumber: string
    status: "Active" | "Inactive"
    isAIML: boolean
    password?: string
    nmcID?: string
    iadvlNo?: string
  }
  
  export interface LoginApproval {
    id: string
    name: string
    email: string
    phoneNumber: string
    status: "Pending" | "Approved" | "Rejected"
    type: "login"
    nmcID: string
    iadvlNo: string
  }
  
  export interface AccountApproval {
    id: string
    name: string
    email: string
    phoneNumber: string
    status: "Pending" | "Approved" | "Rejected"
    type: "account"
    nmcID: string
    iadvlNo: string
  }
  