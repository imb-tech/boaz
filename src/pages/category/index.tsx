import { ProductBreadcrumb } from "@/components/shared/breadcrumb"
import ProductCard from "@/components/shared/product-card"
import Loader from "@/components/ui/loader"
import { useUser } from "@/constants/useUser"
import { useGet } from "@/hooks/useGet"
import { useInfiniteGet } from "@/hooks/useInfiniteGet"
import Loading from "@/layouts/loading"
import {
    CategoryWithChildren as CategoryType,
    CategoryWithChildren,
} from "@/types/category"
import { useSearch } from "@tanstack/react-router"
import { useMemo } from "react"
import { Fade } from "react-awesome-reveal"
import { useTranslation } from "react-i18next"
import Filter from "./filter"

export default function Category() {
    const search: any = useSearch({ from: "__root__" })
    const { data, ref, isFetchingNextPage, isLoading } =
        useInfiniteGet<Product>("base-product/", {
            ...search,
        })

    const { data: categories } =
        useGet<CategoryWithChildren[]>("parent-category/")

    const { t } = useTranslation()

    const items = useMemo<CategoryType[] | undefined>(() => {
        return categories?.filter((el) => el.id == search?.parent_category)
    }, [categories, search?.parent_category])

    const childItem = useMemo<CategoryType[] | undefined>(() => {
        return items?.[0] ?
                items?.[0]?.children?.filter(
                    (el) => el.id == search?.child_category,
                )
            :   []
    }, [categories, search?.child_category])

    const { username } = useUser()
    return (
        <>
            {categories && (
                <ProductBreadcrumb
                    items={[
                        { name: t("Kategoriyalar"), href: "/categories" },
                        ...(items || []).map((d) => ({
                            name: d.name || "",
                            href: `/categories?parent_category=${d.id}`,
                        })),
                        ...(childItem || []).map((d) => ({
                            name: d.name || "",
                        })),
                    ]}
                />
            )}
            <div className="flex items-start gap-2 w-full relative mt-5">
                <div className="hidden md:block">
                    <Filter />
                </div>
                <div className="space-y-3 w-full md:pl-4">
                    {/* <div className="flex items-center justify-between">
                        <h2 className="text-lg sm:text-xl md:text-2xl font-medium">
                            {t("Kategoriyalar")}
                        </h2>
                        <CategoryDrawer />
                    </div> */}
                    <Loading loading={isLoading}>
                        <div className="flex flex-col">
                            {data?.length ?
                                <div className="w-full grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,_minmax(14rem,_auto))] gap-2 sm:gap-4">
                                    {data?.map((d) => (
                                        <Fade key={d.id} damping={0.5}>
                                            <ProductCard
                                                p={d}
                                                key={d.id}
                                                is_authenticated={!!username}
                                            />
                                        </Fade>
                                    ))}
                                </div>
                            :   <div className="w-full flex justify-center py-10">
                                    <p className="text-muted-foreground">ma'lumot topilmadi</p>
                                </div>
                            }
                            <div
                                className="w-full flex justify-center py-4"
                                ref={ref}>
                                {isFetchingNextPage && (
                                    <Loader size="responsive" />
                                )}
                            </div>
                        </div>
                    </Loading>
                </div>
            </div>
        </>
    )
}
