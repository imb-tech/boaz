import ParamAnimatedTabs from "@/components/param/animated-tab"
import { useTranslation } from "react-i18next"
import Categories from "./categories"
import Orders from "./orders"
import Products from "./products"

export default function Admin() {
    const { t } = useTranslation()
    return (
        <>
            <ParamAnimatedTabs
                options={[
                    {
                        name: t("Buyurtmalar"),
                        id: "orders",
                        content: <Orders />,
                    },
                    {
                        name: t("Maxsulotlar"),
                        id: "products",
                        content: <Products />,
                    },
                    {
                        name: t("Kategoriyalar"),
                        id: "categories",
                        content: <Categories />,
                    },
                ]}
            />
        </>
    )
}
