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
