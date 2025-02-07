import EmptyBox from "@/components/shared/initial-data-box/empty-box"
import ProductCard2 from "@/components/shared/product-card/product-card"
import { useUser } from "@/constants/useUser"
import { useGet } from "@/hooks/useGet"
import Loading from "@/layouts/loading"
import { useSearch } from "@tanstack/react-router"
import { Fade } from "react-awesome-reveal"
import { useTranslation } from "react-i18next"
import Filter from "./filter"

type ProductsResponse = {
    count: number
    products: Product2[]
}

export default function Category() {
    const { parent_category, child_category } = useSearch({ from: "/_main/categories/" })
    const { t } = useTranslation()

    const { data, isLoading } = useGet<ProductsResponse>("products", {
        category_id: child_category || parent_category,
    })

    // const { data: categories } =
    //     useGet<CategoryWithChildren[]>("parent-category/")

    // const { t } = useTranslation()

    // const items = useMemo<CategoryType[] | undefined>(() => {
    //     return categories?.filter((el) => el.id == search?.parent_category)
    // }, [categories, search?.parent_category])

    // const childItem = useMemo<CategoryType[] | undefined>(() => {
    //     return items?.[0] ?
    //             items?.[0]?.children?.filter(
    //                 (el) => el.id == search?.child_category,
    //             )
    //         :   []
    // }, [categories, search?.child_category])

    const { username } = useUser()
    return (
        <>
            {/* {categories && (
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
            )} */}
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
                            {data?.products?.length ?
                                <div className="w-full grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,_minmax(14rem,_auto))] gap-2 sm:gap-4">
                                    {data?.products?.map((d) => (
                                        <Fade key={d.id} damping={0.5}>
                                            <ProductCard2
                                                p={d}
                                                key={d.id}
                                                is_authenticated={!!username}
                                            />
                                        </Fade>
                                    ))}
                                </div>
                            :   <div className="w-full flex justify-center py-10">
                                    <EmptyBox />
                                </div>
                            }
                            {/* <div
                                className="w-full flex justify-center py-4"
                                ref={ref}>
                                {isFetchingNextPage && (
                                    <Loader size="responsive" />
                                )}
                            </div> */}
                        </div>
                    </Loading>
                </div>
            </div>
        </>
    )
}
