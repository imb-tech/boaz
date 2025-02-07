import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useRequest } from "@/hooks/useRequest"
import { cn } from "@/lib/utils"
import { Link, useNavigate, useSearch } from "@tanstack/react-router"
import { Check } from "lucide-react"
import { useCallback, useEffect, useMemo } from "react"

export function mergeSubCategories(categories: CategoryItem[]): CategoryItem[] {
    if (!categories || categories.length === 0) {
        return []
    }

    return categories.map((el) => {
        const allSubCategories = collectAllSubCategories(el.subRows)

        return {
            ...el,
            subRows: allSubCategories,
        }
    })
}

function collectAllSubCategories(
    subCategories: CategoryItem[],
): CategoryItem[] {
    let result: CategoryItem[] = []

    for (const sub of subCategories) {
        result.push({ ...sub, subRows: [] })
        result = result.concat(collectAllSubCategories(sub.subRows))
    }

    return result?.filter((el) => el.name)
}

type CategoryResponse = {
    count: number
    categories: CategoryItem[]
}

export default function Filter() {
    const navigate = useNavigate()
    const search: any = useSearch({ from: "__root__" })

    const { post, data: categoriesData } = useRequest<CategoryResponse>()

    const getCategories = useCallback(() => {
        post("", {
            path: "v2/category?limit=30",
        })
    }, [])

    const mergedCategories = useMemo(
        () => mergeSubCategories(categoriesData?.categories || []),
        [categoriesData],
    )
    console.log(mergedCategories)

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <Accordion
            type="single"
            collapsible
            value={search.parent_category || ""}
            className={cn("w-full md:w-80 bg-background rounded-lg p-4")}
            // md:fixed md:top-[13vh]
            onValueChange={(value) =>
                navigate({
                    search: {
                        ...search,
                        child_category: undefined,
                        parent_category: value ? value : undefined,
                    } as any,
                })
            }>
            {mergedCategories?.map((category) => (
                <AccordionItem
                    className="border-none mb-2"
                    value={category.id}
                    key={category.id}>
                    <AccordionTrigger
                        className={cn(
                            "text-sm font-medium text-gray-800 py-3 px-6 rounded-md bg-gray-100 hover:bg-gray-200 focus:outline-none",
                            search.parent_category == category.id &&
                                "bg-muted text-primary",
                        )}>
                        <div className="flex items-center gap-3">
                            {/* {!!category.image && (
                                <img
                                    src={category?.image}
                                    alt=""
                                    className="rounded-md w-6 h-6"
                                />
                            )} */}
                            {category.name}
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-1 pt-1">
                        {category.subRows?.map((vendor) => (
                            <Link
                                search={{
                                    ...search,
                                    child_category:
                                        search.child_category === vendor.id ?
                                            undefined
                                        :   vendor.id,
                                }}
                                className="flex items-center justify-between py-2 px-6 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none"
                                activeProps={{
                                    className: "text-primary bg-gray-50",
                                }}
                                key={vendor.id}>
                                <span className="text-sm">{vendor.name}</span>
                                <Check
                                    width={14}
                                    className={cn(
                                        "text-transparent",
                                        search.child_category === vendor.id &&
                                            "text-primary",
                                    )}
                                />
                            </Link>
                        ))}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}
