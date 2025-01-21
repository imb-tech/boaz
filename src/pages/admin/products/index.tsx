import { Button } from "@/components/ui/button"
import Loader from "@/components/ui/loader"
import { useInfiniteGet } from "@/hooks/useInfiniteGet"
import Loading from "@/layouts/loading"
import { Plus } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import AdminProductCard from "./admin-product-card"
import ControlProduct from "./control-product"

export default function Products() {
    const [open, setOpen] = useState(false)
    const [current, setCurrent] = useState<Product>()

    const { data, ref, isFetchingNextPage, isLoading } =
        useInfiniteGet<Product>("base-product/")

    const { t } = useTranslation()

    return (
        <>
            <div className="flex flex-col items-end gap-4">
                <Button
                    icon={<Plus width={18} />}
                    onClick={() => {
                        setOpen(true)
                        setCurrent({} as Product)
                    }}></Button>
                <Loading loading={isLoading}>
                    <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2 sm:gap-4">
                        {data?.map((d, i: number) => (
                            <AdminProductCard
                                p={d}
                                key={i}
                                onEdit={() => {
                                    setCurrent(d)
                                    setOpen(true)
                                }}
                            />
                        ))}
                    </div>

                    <div className="w-full flex justify-center py-4" ref={ref}>
                        {isFetchingNextPage && <Loader size="responsive" />}
                    </div>
                </Loading>
            </div>
            <ControlProduct open={open} setOpen={setOpen} current={current} />
        </>
    )
}
