
export interface User {
    id: number
    name: string
    email: string
    owner : number
    owner_id : number
    email_verified_at: string | null
    created_at: string
    updated_at: string
  }
  
  export interface UserQuery {
    pageSize: number
    pageIndex: number
    search?: string
    sortOrder?: 'asc' | 'desc'
    orderByFieldName?: string
  }
  
  export interface UserState {
    list: User[]
    totalCount: number
    loading: boolean
    pageIndex: number
    pageSize: number
    sortOrder: string
    orderByFieldName: string
    search: string
    error: string | null
    user: User | null
  }

  


