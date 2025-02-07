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

// Product new API

type ProductCustomField = {
    custom_field_name: string
    custom_field_system_name: string
    custom_field_id: string
    custom_field_value: string
    from_parent: boolean
}

type ProductShopPrice = {
    shop_id: string
    shop_name: string
    retail_price: number
    retail_currency: string
    supply_price: number
    supply_currency: string
    promo_price: number
    promos: null
}

type ProductShopMeasurementValue = {
    shop_id: string
    shop_name: string
    active_measurement_value: number
}

type ProductMeasurementUnit = {
    id: string
    name: string
    short_name: string
}

type Product2 = {
    id: string
    name: string
    description: string
    main_image_url: string
    main_image_url_: string
    is_variative: boolean
    parent_id: string
    product_type_id: string
    measurement_unit: ProductMeasurementUnit
    shop_prices: ProductShopPrice[]
    shop_measurement_values: ProductShopMeasurementValue[]
    product_attributes: string[]
    custom_fields: ProductCustomField[] | null
    photos: {
        photo_url: string
        sequence: number
        is_main: boolean
    }[]
    categories: string[]
    brand_id: string
    brand_name: string
    sku: string
}

type CartItem = Product2 & {
    count: number
    is_best?: boolean
}
