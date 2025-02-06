import HomeSlider from "@/components/shared/home-slider"
import { useSearch } from "@tanstack/react-router"
import CompanyInfo from "./company-info"
import Hero from "./hero"
import HomeProducts from "./home-products"
import HomeProductsGrid from "./home-products-grid"

export default function Home() {
    const search: { search: string | undefined } = useSearch({
        from: "__root__",
    })

    return (
        <div className="space-y-6 sm:space-y-9 md:space-y-12 overflow-hidden">
            <Hero />
            <HomeProducts search={search?.search} />
            <HomeProductsGrid search={search?.search} link="" title="Mahsulotlar" limit={20} />

            <HomeSlider/>
            <CompanyInfo />
        </div>
    )
}
