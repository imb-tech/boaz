import ProductCard from "@/components/shared/product-card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import Loader from "@/components/ui/loader"
import { useUser } from "@/constants/useUser"
import { useInfiniteGet } from "@/hooks/useInfiniteGet"
import LoadingSkeleton from "@/layouts/loading-skeleton"
import { Link, useSearch } from "@tanstack/react-router"
import { format } from "date-fns"
import Autoplay from "embla-carousel-autoplay"
import { ChevronRight } from "lucide-react"
import { Fade } from "react-awesome-reveal"
import { useTranslation } from "react-i18next"

export default function HomeProducts() {
    const { t } = useTranslation()
    const sevenDaysAgo = format(
        new Date(new Date().setDate(new Date().getDate() - 7)),
        "yyyy-MM-dd",
    )

    const search = useSearch({ from: "__root__" })

    const { data, hasNextPage, ref, isFetchingNextPage, isLoading } =
        useInfiniteGet<Product>(
            "base-product/?created_at_from=" + sevenDaysAgo,
            search,
        )

    const { username } = useUser()

    return (
        <LoadingSkeleton loading={isLoading} length={5} showTitle>
            <div className="space-y-2 md:space-y-4">
                <Link
                    to="/categories/$category"
                    params={{ category: "most-sold" }}
                    className="flex items-center gap-4">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-medium">
                        {t("top mahsulotlar")}
                    </h2>
                    <ChevronRight className="animate-mover " />
                </Link>
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="container relative rounded max-w-full"
                    plugins={[
                        Autoplay({
                            delay: 3000,
                            stopOnFocusIn: false,
                            stopOnInteraction: false,
                        }),
                    ]}>
                    <CarouselContent className="flex items-center">
                        {data &&
                            data?.map((d, i: number) => (
                                <CarouselItem
                                    className="basis-full xmd:basis-1/2 md:basis-1/3 xl:basis-1/5 2xl:basis-1/5"
                                    key={i}>
                                    <Fade damping={0.5} key={i}>
                                        <ProductCard
                                            xit
                                            p={d}
                                            key={i}
                                            is_authenticated={!!username}
                                        />
                                    </Fade>
                                </CarouselItem>
                            ))}
                        {hasNextPage && (
                            <CarouselItem
                                className="w-0"
                                ref={hasNextPage ? ref : undefined}>
                                {isFetchingNextPage && (
                                    <div className="w-full flex justify-center py-4">
                                        <Loader size="responsive" />
                                    </div>
                                )}
                            </CarouselItem>
                        )}
                    </CarouselContent>
                </Carousel>
            </div>
        </LoadingSkeleton>
    )
}
