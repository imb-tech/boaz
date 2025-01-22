type ProductImage = {
    id: number
    image: string
}

type ProductColor = {
    id: number
    name: string
    images: ProductImage[]
}

type BaseProduct = {
    id: number
    name: string
    price: number
    discounted_price: number
    stock: number
    sold: string
    color: ProductColor
    option: string
}

type CartItems = {
    id: BaseProduct["id"]
    count: number
}

type ProductItem = BaseProduct & {
    color: number
}

type Product = BaseProduct & {
    main_image: string
    description: string
    category: number
    vendor: number
    count: number
    attr: string
    created_at: string
    colors?: ProductColor[]
    products: ProductItem[]
}

type ProductWithBase = Product & {
    id: number
    base_product: Product
    color: ProductColor
}
