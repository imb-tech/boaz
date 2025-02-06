import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useRequest } from "@/hooks/useRequest"
import { cn } from "@/lib/utils"
import { CategoryWithChildren } from "@/types/category"
import { PopoverClose } from "@radix-ui/react-popover"
import { useNavigate } from "@tanstack/react-router"
import { ChevronRight } from "lucide-react"
import * as React from "react"

type Props = {
    children: React.ReactNode
}

type CategoryResponse = {
    count: number
    categories: CategoryItem[]
}

export default function CategoryDialog({ children }: Props) {
    const [selectedCategory, setSelectedCategory] =
        React.useState<CategoryItem | null>(null)

    const { post, data: categoriesData } = useRequest<CategoryResponse>()

    React.useEffect(() => {
        post("", {
            path: "v2/category?limit=10&is_deleted=false",
        })
    }, [])

    const navigate = useNavigate()

    return (
        <Popover>
            <PopoverTrigger asChild>{children}</PopoverTrigger>
            <PopoverContent
                className="w-[800px] p-0 bg-transparent mt-3 border-none shadow-none"
                align="start"
                sideOffset={0}>
                <div className="flex border-none gap-2 bg-transparent">
                    {/* Categories */}
                    <div className="w-[280px] bg-white rounded-xl">
                        <div className="flex flex-col p-2">
                            {categoriesData?.categories?.map((category) => (
                                <PopoverClose key={category.id}>
                                    <div
                                        onMouseEnter={() =>
                                            setSelectedCategory(category)
                                        }
                                        className={cn(
                                            `flex rounded-xl items-center justify-between px-4 py-2 text-sm hover:bg-muted cursor-pointer text-left ${
                                                (
                                                    selectedCategory?.id ===
                                                    category.id
                                                ) ?
                                                    "bg-muted"
                                                :   ""
                                            }`,
                                        )}
                                        onClick={() =>
                                            navigate({
                                                to: "/categories",
                                                search: {
                                                    parent_category:
                                                        category.id,
                                                },
                                            })
                                        }>
                                        <div className="flex items-center gap-2">
                                            {/* <img
                                                src={category.image || ""}
                                                width={28}
                                            /> */}
                                            {category.name}
                                        </div>
                                        <ChevronRight className="h-4 w-4" />
                                    </div>
                                </PopoverClose>
                            ))}
                        </div>
                    </div>
                    {/* Subcategories */}
                    <div className="flex-1 p-6 bg-white rounded-xl">
                        {selectedCategory && (
                            <div>
                                <h3 className="text-lg font-semibold mb-1">
                                    {selectedCategory.name}
                                </h3>
                                <div className="grid grid-cols-2 gap-1">
                                    {categoriesData?.categories
                                        ?.find(
                                            (cat) =>
                                                cat.id === selectedCategory.id,
                                        )
                                        ?.subRows.map((item) => (
                                            <div
                                                className="space-y-2"
                                                key={item.id}>
                                                <a
                                                    key={item.name}
                                                    href={`/categories?parent_category=${selectedCategory.id}&child_category=${item.id}`}
                                                    className="block text-sm text-muted-foreground hover:underline">
                                                    {item.name}
                                                </a>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
