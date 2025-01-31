import { ProductBreadcrumb } from "@/components/shared/breadcrumb"
import { useGet } from "@/hooks/useGet"
import Loading from "@/layouts/loading"
import { useParams } from "@tanstack/react-router"
import DOMPurify from "dompurify"
import { useEffect, useMemo } from "react"
import HomeProductsGrid from "../home/home-products-grid"
import ProductCarousel from "./carousel"
import RightInfo from "./right-info"

type ProductsResponse = {
    count: number
    products: Product2[]
}

export default function Product() {
    const params = useParams({ from: "/_main/products/$product" })

    const { data, isLoading } = useGet<ProductsResponse | undefined>(
        `products`,
        {
            limit: 1,
            product_id: params?.product,
        },
    )

    const product = useMemo(() => {
        return data?.products?.[0]
    }, [data])

    const sanitizedHtml = useMemo(() => {
        return DOMPurify.sanitize(product?.description || ``)
    }, [product])

    const slides = useMemo(() => {
        return product?.photos
            ?.sort((a, b) => Number(a.is_main) - Number(b.is_main))
            ?.map((p) => p.photo_url)
    }, [product])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [params?.product])

    return (
        <Loading loading={isLoading}>
            {!!product && (
                <div className="space-y-4 sm:space-y-4">
                    <ProductBreadcrumb
                        items={[
                            { name: "Mahsulotlar", href: "/products" },
                            { name: product.name },
                        ]}
                    />
                    <h2 className="text-lg sm:text-xl md:text-2xl font-medium">
                        {product.name}{" "}
                    </h2>
                    <div className="flex flex-col lg:flex-row gap-3 w-full">
                        <ProductCarousel slides={(slides as any) || []} />
                        <div className="h-full w-full lg:max-w-md flex flex-col md:flex-row lg:flex-col items-start gap-4 sm:gap-6">
                            {/* {!!d?.colors && d?.colors?.length > 0 && (
                                <RightOptions
                                    data={d?.colors as Product["colors"]}
                                    attr={d?.attr}
                                    products={d?.products}
                                />
                            )} */}
                            <RightInfo d={product} />
                            {/* {product?.description && (
                                <div className="p-3 bg-background rounded-xl w-full h-full">
                                    <p className="text-sm sm:text-base text-muted-foreground">
                                        {product?.description}
                                    </p>
                                </div>
                            )} */}
                        </div>
                    </div>
                    {product?.description && (
                        <div className="p-8 bg-background rounded-3xl">
                            <p
                                className="text-sm sm:text-base text-muted-foreground"
                                dangerouslySetInnerHTML={{
                                    __html: sanitizedHtml,
                                }}></p>
                        </div>
                    )}
                </div>
            )}

            <div className="mt-5">
                <HomeProductsGrid
                    title="O'xshash mahsulotlar"
                    link="highest-discount"
                />
            </div>
        </Loading>
    )
}
