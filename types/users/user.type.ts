export interface User {
    id: string
    name: string
    email: string
    department: string
    role: string
    status: "Active" | "Inactive"
  }
  
  // Available roles with their departments
  export const roles = {
    sales: ["Service Charity", "Operations", "Team Leader", "Manager", "Head"],
    marketing: ["Marketing Specialist", "Content Creator", "Campaign Manager"],
    engineering: ["Developer", "QA Engineer", "DevOps Specialist"],
    hr: ["HR Coordinator", "Recruiter", "HR Manager"],
  }
  
  