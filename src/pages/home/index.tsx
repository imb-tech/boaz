import HomeSlider from "@/components/shared/home-slider"
import CompanyInfo from "./company-info"
import Hero from "./hero"
import HomeProducts from "./home-products"
import HomeProductsGrid from "./home-products-grid"

export default function Home() {
    return (
        <div className="space-y-6 sm:space-y-9 md:space-y-12 overflow-hidden">
            <Hero />
            <HomeProducts />
            <HomeProductsGrid link="most-sold" title="Mahsulotlar" limit={20} />

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
