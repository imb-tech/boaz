import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useGet } from "@/hooks/useGet"
import { cn } from "@/lib/utils"
import { Link, useNavigate, useSearch } from "@tanstack/react-router"
import { Check } from "lucide-react"

export default function Filter() {
    const navigate = useNavigate()
    const search: any = useSearch({ from: "__root__" })

    const { data } = useGet<
        {
            id: number
            name: string
            image: string | null
            children: {
                id: number
                name: string
                image: string | null
            }[]
        }[]
    >("parent-category/")

    return (
        <Accordion
            type="single"
            collapsible
            value={search.parent_category?.toString() || ""}
            className="w-full md:w-80 bg-background rounded-lg p-4"
            // md:fixed md:top-[13vh]
            onValueChange={(value) =>
                navigate({
                    search: {
                        ...search,
                        child_category: undefined,
                        parent_category: value ? +value : undefined,
                    } as any,
                })
            }>
            {data
                ?.sort((a, b) => a.id - b.id)
                .map((category) => (
                    <AccordionItem
                        className="border-none mb-2"
                        value={category.id.toString()}
                        key={category.id}>
                        <AccordionTrigger className="text-sm font-medium text-gray-800 py-3 px-6 rounded-md bg-gray-100 hover:bg-gray-200 focus:outline-none">
                            <div className="flex items-center gap-3">
                                {!!category.image && (
                                    <img
                                        src={category?.image}
                                        alt=""
                                        className="rounded-md w-6 h-6"
                                    />
                                )}
                                {category.name}
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-1 pt-1">
                            {category.children?.map((vendor) => (
                                <Link
                                    search={{
                                        ...search,
                                        child_category:
                                            (
                                                search.child_category ===
                                                vendor.id
                                            ) ?
                                                undefined
                                            :   vendor.id,
                                    }}
                                    className="flex items-center justify-between py-2 px-6 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none"
                                    activeProps={{
                                        className: "text-primary bg-gray-50",
                                    }}
                                    key={vendor.id}>
                                    <span className="text-sm">
                                        {/* Display vendor name based on the selected language */}
                                        {vendor.name}
                                    </span>
                                    <Check
                                        width={14}
                                        className={cn(
                                            "text-transparent",
                                            search.child_category ===
                                                vendor.id && "text-primary",
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
