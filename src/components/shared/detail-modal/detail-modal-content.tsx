import { DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import Loading from "@/layouts/loading"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { useEffect, useMemo } from "react"
import ProductCarousel from "./carousel"
import RightInfo from "./detail-right-info"
import RightOptions from "./detail-right-options"

export default function DetailModalContent({
    product: d,
    isLoading,
}: {
    product: Product
    isLoading: boolean
}) {
    const search: any = useSearch({ strict: false })

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

    const navigate = useNavigate()

    const minPriceProduct = useMemo(() => {
        return d?.products?.sort((a, b) => a.price - b.price)[0]
    }, [d])

    useEffect(() => {
        if (
            d?.colors &&
            d?.colors.length > 1 &&
            d?.colors?.[0]?.images?.length
        ) {
            navigate({
                search: {
                    color: minPriceProduct?.color,
                    // option: minPriceProduct?.option,
                } as any,
            })
        }
    }, [d])

    return (
        <Loading loading={isLoading} className="h-[320px]">
            {!!d && (
                <div className="space-y-4 sm:space-y-4">
                    <DrawerHeader>
                        <DrawerTitle className="text-center">
                            {d.name}
                        </DrawerTitle>
                    </DrawerHeader>
                    <div className="flex flex-col items-start lg:flex-row gap-4 w-full max-w-4xl">
                        <ProductCarousel slides={(slides as any) || []} />
                        <div className="h-full w-full  flex flex-col items-start gap-4 sm:gap-6">
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
                </div>
            )}
        </Loading>
    )
}
