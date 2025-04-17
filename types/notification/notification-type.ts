// Notification Types
export interface User {
    id: string
    name: string
    initial: string
    color: string
  }
  
  export interface Notification {
    id: string
    user: User
    timestamp: string
    message: string
    read: boolean
    fullContent?: string
  }
  
  