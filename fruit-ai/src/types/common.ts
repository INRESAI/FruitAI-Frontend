export interface IPagination {
    offset: number
    size: number
}

export interface ICommonListResponse {
    items: Array<Record<string, any>>
    total: number
}