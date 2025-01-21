import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import * as React from "react"

const categories = [
    {
        title: "Smartfonlar va telefonlar",
        items: [
            {
                title: "Smartfonlar",
                subcategories: [
                    { title: "Smartfonlar Apple", url: "#" },
                    { title: "Smartfonlar Samsung", url: "#" },
                    { title: "Smartfonlar Huawei", url: "#" },
                    { title: "Smartfonlar Xiaomi", url: "#" },
                    { title: "Smartfonlar VIVO", url: "#" },
                    { title: "Smartfonlar Honor", url: "#" },
                    { title: "Smartfonlar Realme", url: "#" },
                    { title: "Smartfonlar Oppo", url: "#" },
                    { title: "Smartfonlar Tecno", url: "#" },
                ],
            },
            {
                title: "Кнопочные телефоны",
                subcategories: [
                    { title: "Кнопочные телефоны NOVEY", url: "#" },
                    { title: "Кнопочные телефоны Ajib", url: "#" },
                ],
            },
        ],
    },
    {
        title: "TV, audio va video",
        items: [],
    },
    {
        title: "Maishiy texnika",
        items: [],
    },
    {
        title: "Go'zallik va so'glik",
        items: [],
    },
    {
        title: "Noutbuklar va kompyuterlar",
        items: [],
    },
    {
        title: "Gadjetlar va aksessuarlar",
        items: [],
    },
    {
        title: "Avto zona",
        items: [],
    },
    {
        title: "Sport uchun buyumlar",
        items: [],
    },
    {
        title: "Ta'mirlash uchun asboblar",
        items: [],
    },
]

type Props = {
    children: React.ReactNode
}

export default function CategoryDialog({ children }: Props) {
    const [selectedCategory, setSelectedCategory] = React.useState<
        string | null
    >(null)

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
                            {categories.map((category) => (
                                <div
                                    key={category.title}
                                    onMouseEnter={() =>
                                        setSelectedCategory(category.title)
                                    }
                                    className={cn(
                                        `flex rounded-xl items-center justify-between px-4 py-3 text-sm hover:bg-muted cursor-pointer text-left ${
                                            (
                                                selectedCategory ===
                                                category.title
                                            ) ?
                                                "bg-muted"
                                            :   ""
                                        }`,
                                    )}>
                                    {category.title}
                                    <ChevronRight className="h-4 w-4" />
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Subcategories */}
                    <div className="flex-1 p-6 bg-white rounded-xl">
                        {selectedCategory && (
                            <div>
                                <h3 className="text-lg font-semibold mb-4">
                                    {selectedCategory}
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {categories
                                        .find(
                                            (cat) =>
                                                cat.title === selectedCategory,
                                        )
                                        ?.items.map((item) => (
                                            <div key={item.title}>
                                                <h4 className="font-medium mb-2">
                                                    {item.title}
                                                </h4>
                                                <div className="space-y-2">
                                                    {item.subcategories?.map(
                                                        (sub) => (
                                                            <a
                                                                key={sub.title}
                                                                href={sub.url}
                                                                className="block text-sm text-muted-foreground hover:text-foreground">
                                                                {sub.title}
                                                            </a>
                                                        ),
                                                    )}
                                                </div>
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
