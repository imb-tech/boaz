import ProductCard from "@/components/shared/product-card"
import { Button } from "@/components/ui/button"
import Loader from "@/components/ui/loader"
import { useUser } from "@/constants/useUser"
import { useInfiniteGet } from "@/hooks/useInfiniteGet"
import LoadingSkeleton from "@/layouts/loading-skeleton"
import { Link, useSearch } from "@tanstack/react-router"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Fade } from "react-awesome-reveal"
import { useTranslation } from "react-i18next"

type Props = {
    title: string
    url: string
    link: string
}

export default function HomeProductsGrid({
    title = "Mahsulotlar",
    url,
    link,
}: Props) {
    const { t } = useTranslation()
    const search = useSearch({ from: "__root__" })

    const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading } =
        useInfiniteGet<Product>(url, search)

    const { username } = useUser()

    return (
        <LoadingSkeleton length={6} loading={isLoading}>
            <div className="space-y-2 md:space-y-4">
                <Link
                    to="/categories/$category"
                    params={{ category: link }}
                    className="flex items-center gap-4">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-medium">
                        {t(title)}
                    </h2>
                    <ChevronRight className="animate-mover " />
                </Link>
                <div className="w-full grid xmd:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 gap-2 sm:gap-4">
                    {data?.map((d, i: number) => (
                        <Fade damping={0.5} key={i}>
                            <ProductCard
                                p={d}
                                key={i}
                                is_authenticated={!!username}
                            />
                        </Fade>
                    ))}
                </div>
                {isFetchingNextPage && (
                    <div className="w-full flex justify-center py-4">
                        <Loader size="responsive" />
                    </div>
                )}
                {hasNextPage && (
                    <div className="flex items-center justify-center pt-8">
                        <Button
                            onClick={fetchNextPage}
                            size="lg"
                            variant="ghost"
                            className="!bg-background flex items-center gap-2">
                            {t("Ko'proq ko'rsatish")} <ChevronDown width={18} />
                        </Button>
                    </div>
                )}
            </div>
        </LoadingSkeleton>
    )
}
