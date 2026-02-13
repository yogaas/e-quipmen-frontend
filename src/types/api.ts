export interface ApiResponse<T> {
    success: boolean
    message: string
    data: T
    errors?: any
}

export interface ApiListResponse<T> {
    success: boolean
    message: string
    data: T
    totalCount?: number
    pageSize?: number
    pageIndex?: number
    sortOrder: string
    orderByFieldName: string
    errors?: any
}