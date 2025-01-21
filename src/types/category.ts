export interface Category {
    id: number
    name: string
    [key: string]: any
}

export type CategoryWithChildren = Category & {
    image: string | null
    children: CategoryWithChildren[]
}