import HomeSlider from "@/components/shared/home-slider"
import { useInfiniteGet } from "@/hooks/useInfiniteGet"
import { useSearch } from "@tanstack/react-router"
import { format } from "date-fns"
import CompanyInfo from "./company-info"
import Hero from "./hero"
import HomeProducts from "./home-products"
import HomeProductsGrid from "./home-products-grid"

export default function Home() {
    const search: any = useSearch({ from: "__root__" })
    const sevenDaysAgo = format(
        new Date(new Date().setDate(new Date().getDate() - 7)),
        "yyyy-MM-dd",
    )

    const latest = useInfiniteGet<Product>(
        "base-product/?created_at_from=" + sevenDaysAgo,
        search,
    )

    return (
        <div className="space-y-6 sm:space-y-9 md:space-y-12 overflow-hidden">
            <Hero />
            <HomeProducts />
            <HomeProductsGrid
                title="Chegirmadan bahramand bo'ling"
                url="base-product/?highest_discount=true"
                link="highest-discount"
            />
            <HomeProductsGrid
                title="top mahsulotlar"
                url="base-product/?most_sold=true"
                link="most-sold"
            />

            <HomeSlider
                images={[
                    "https://tools-api.webcrumbs.org/image-placeholder/280/180/nature/1",
                    "https://tools-api.webcrumbs.org/image-placeholder/280/180/nature/2",
                    "https://tools-api.webcrumbs.org/image-placeholder/280/180/nature/3",
                    "https://tools-api.webcrumbs.org/image-placeholder/280/180/nature/8",
                    "https://tools-api.webcrumbs.org/image-placeholder/280/180/nature/5",
                    "https://tools-api.webcrumbs.org/image-placeholder/280/180/nature/6",
                    "https://tools-api.webcrumbs.org/image-placeholder/280/180/nature/7",
                ]}
            />
            <CompanyInfo />
        </div>
    )
}
