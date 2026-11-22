// Response of the paginated list apis (?page=1&limit=9).
export type Paginated<T> = {
    items: T[]
    total: number
    page: number
    limit: number
}
