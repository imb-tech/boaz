type Category = {
    name: string
    name_uz: string
    name_fa: string
    image: any
    id: number
}

type CategoryResponse = {
    count: number
    next: string | null
    previous: string | null
    results: Category[]
}

type CategoryItem = {
    id: string
    name: string
    parent_id: string
    all_parent_ids: null | string[]
    subRows: CategoryItem[]
    product_count: number
    company_id: string
    is_open: boolean
    level_number: number
    from_parent: boolean
    super_parent_id: string
}
