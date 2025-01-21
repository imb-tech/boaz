import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useGet } from "@/hooks/useGet"
import { cn } from "@/lib/utils"
import { CategoryWithChildren } from "@/types/category"
import { PopoverClose } from "@radix-ui/react-popover"
import { useNavigate } from "@tanstack/react-router"
import { ChevronRight } from "lucide-react"
import * as React from "react"

type Props = {
    children: React.ReactNode
}

export default function CategoryDialog({ children }: Props) {
    const [selectedCategory, setSelectedCategory] =
        React.useState<CategoryWithChildren | null>(null)

    const { data: categories } =
        useGet<CategoryWithChildren[]>("parent-category/")

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
                            {categories?.map((category) => (
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
                                            <img
                                                src={category.image || ""}
                                                width={28}
                                            />
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
                                    {categories
                                        ?.find(
                                            (cat) =>
                                                cat.id === selectedCategory.id,
                                        )
                                        ?.children.map((item) => (
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
