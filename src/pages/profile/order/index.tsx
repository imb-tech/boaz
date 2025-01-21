import ParamAnimatedTabs from "@/components/param/animated-tab"
import Loader from "@/components/ui/loader"
import { useInfiniteGet } from "@/hooks/useInfiniteGet"
import Loading from "@/layouts/loading"
import { useSearch } from "@tanstack/react-router"
import { Fade } from "react-awesome-reveal"
import { useTranslation } from "react-i18next"
import OrderCard from "./order-card"

export default function OrdersHistory() {
    const search: any = useSearch({ from: "__root__" })
    const { t } = useTranslation()
    const { data, ref, isLoading, isFetchingNextPage } = useInfiniteGet<{
        id: number
        user: string
        quantity: number
        status: number
        updated_at: string
        cart: { id: number; order: 1; product: Product; quantity: number }[]
    }>("order/", { ...search, status: undefined })

    return (
        <div className="overflow-hidden">
            <ParamAnimatedTabs
                paramName="status"
                options={[
                    {
                        name: t("Barcha buyurtmalar"),
                        id: 0,
                    },
                    {
                        name: t("To'lov qilinmagan"),
                        id: "10",
                    },
                    {
                        name: t("Bekor qilingan"),
                        id: "3",
                    },
                    {
                        name: t("Yetkazilgan"),
                        id: "4",
                    },
                ]}
                wrapperClassName="flex flex-wrap gap-4 justify-center sm:max-md:block"
            />
            <Loading loading={isLoading}>
                <div className="flex flex-col gap-4">
                    {data
                        ?.filter((d) =>
                            !!search.status ?
                                d.status ==
                                (search.status == 10 ? 0 : search.status)
                            :   true,
                        )
                        ?.map((d) => (
                            <Fade damping={0.5} key={d.id}>
                                <OrderCard p={d} />
                            </Fade>
                        ))}
                </div>

                <div className="w-full flex justify-center py-4" ref={ref}>
                    {isFetchingNextPage && <Loader size="responsive" />}
                </div>
            </Loading>
        </div>
    )
}
