import { useLanguage } from "@/components/custom/languageContext"
import { ProductBreadcrumb } from "@/components/shared/breadcrumb"
import { useGet } from "@/hooks/useGet"
import Loading from "@/layouts/loading"
import { useNavigate, useParams, useSearch } from "@tanstack/react-router"
import { useEffect, useMemo } from "react"
import HomeProductsGrid from "../home/home-products-grid"
import ProductCarousel from "./carousel"
import RightOptions from "./options"
import RightInfo from "./right-info"

export default function Product() {
    const params = useParams({ from: "/_main/products/$product" })
    const search: any = useSearch({ from: "/_main/products/$product" })
    const navigate = useNavigate()

    const { data: d, isLoading } = useGet<Product>(
        `base-product/` + params.product + "/",
        undefined,
        {
            enabled: !!params.product,
        },
    )

    const { name } = useLanguage()

    const slides = useMemo(() => {
        if ((d?.products?.length || 0) > 0) {
            const imgs =
                d?.colors
                    ?.filter((d) =>
                        search.color ? d.id === search.color : true,
                    )
                    ?.map((d) => d.images) || []
            return [
                !search.color && d?.main_image,
                ...(imgs?.flatMap((d) => d.map((d) => d.image)) || []),
            ]?.filter((d) => !!d)
        } else {
            return [d?.main_image]
        }
    }, [d, search.color])

    const minPriceProduct = useMemo(() => {
        return d?.products?.sort((a, b) => a.price - b.price)[0]
    }, [d])

    // useEffect(() => {
    //     navigate({
    //         search: {
    //             color: minPriceProduct?.color,
    //             // option: minPriceProduct?.option,
    //         } as any,
    //     })
    // }, [d])

    return (
        <Loading loading={isLoading}>
            {!!d && (
                <div className="space-y-4 sm:space-y-4">
                    <ProductBreadcrumb
                        items={[
                            { name: "Mahsulotlar", href: "/products" },
                            { name: d.name },
                        ]}
                    />
                    <h2 className="text-lg sm:text-xl md:text-2xl font-medium">
                        {d.name}{" "}
                    </h2>
                    <div className="flex flex-col lg:flex-row gap-8 w-full">
                        <ProductCarousel slides={(slides as any) || []} />
                        <div className="h-full w-full lg:max-w-md flex flex-col md:flex-row lg:flex-col items-start gap-4 sm:gap-6">
                            {!!d?.colors && d?.colors?.length > 0 && (
                                <RightOptions
                                    data={d?.colors as Product["colors"]}
                                    attr={d?.attr}
                                    products={d?.products}
                                />
                            )}
                            <RightInfo d={d as Product} />
                        </div>
                    </div>
                    <div className="p-8 bg-background rounded-3xl">
                        <p className="text-sm sm:text-base text-muted-foreground">
                            {d.description}
                        </p>
                    </div>
                </div>
            )}

            <div className="mt-5">
                <HomeProductsGrid
                    url="base-product/?highest_discount=true"
                    title="O'xshash mahsulotlar"
                    link="highest-discount"
                />
            </div>
        </Loading>
    )
}
