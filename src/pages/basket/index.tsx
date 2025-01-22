import EmptyBox from "@/components/shared/initial-data-box/empty-box"
import { Button } from "@/components/ui/button"
import { useGet } from "@/hooks/useGet"
import { useRequest } from "@/hooks/useRequest"
import { useStore } from "@/hooks/useStore"
import Loading from "@/layouts/loading"
import { formatMoney } from "@/lib/format-money"
import { useMemo } from "react"
import { Fade } from "react-awesome-reveal"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import BasketCard from "./basket-card"

export default function Basket() {
    const { store: cart, setStore } = useStore<CartItems[]>("baskets")
    const { post, isPending, isIdle } = useRequest()
    const { data, isLoading } = useGet<{
        results: ProductWithBase[]
    }>(
        "product/",
        {
            ids: cart?.map((p) => p.id).join(",") || "",
        },
        {
            enabled: !!cart && cart?.length > 0,
        },
    )

    const store = useMemo(() => {
        return (
            data?.results?.map((el) => ({
                ...el,
                count: cart?.find((p) => p.id === el.id)?.count || 1,
                main_image: el.base_product.main_image,
                attr: el.base_product.attr,
            })) || []
        )
    }, [data])

    const { t } = useTranslation()

    const totalPrice =
        store?.reduce(
            (acc, item) =>
                acc + (item.discounted_price || item.price) * (item.count || 1),
            0,
        ) || 0

    const allPrice = useMemo(() => {
        return data?.results?.reduce(
            (acc, item) =>
                acc +
                (item.discounted_price || item.price) *
                    (store?.find((p) => p.id === item.id)?.count || 1),
            0,
        )
    }, [data?.results])

    const handleSell = async () => {
        await post("order/", {
            carts:
                store?.map((p) => ({
                    product: p.id,
                    quantity: p.count,
                })) || [],
        })
        setStore([])
        toast.success(`${t("Muvaffaqiyatli amalga oshirildi")}`)
    }

    return (
        <div className="space-y-6 overflow-hidden">
            <h2 className="text-lg sm:text-xl md:text-2xl font-medium border-b pb-2">
                {t("savatingiz")}{" "}
                {!!store?.length ?
                    <span className="text-muted-foreground">
                        {store?.length} {t("maxsulot")}
                    </span>
                :   ""}
            </h2>

            <div className="flex flex-col gap-4">
                <Loading loading={isLoading}>
                    {store?.map((product) => (
                        <Fade key={product?.id + "_" + product?.color?.id}>
                            <BasketCard key={product.id} product={product} />
                        </Fade>
                    ))}
                    {!store?.length && <EmptyBox />}
                </Loading>
            </div>

            {!!store?.length && (
                <div className=" border-t pt-2 sm:pt-4 flex sm:items-center justify-between gap-x-4 gap-y-2 flex-col sm:flex-row">
                    <div className="text-lg font-medium">
                        {t("Jami")}:{" "}
                        {formatMoney(allPrice?.toFixed(2), undefined, true, t)}
                    </div>
                    <Button onClick={handleSell} size="lg" loading={isPending}>
                        {t("Buyurtmani amalga oshirsh")}
                    </Button>
                </div>
            )}
        </div>
    )
}
