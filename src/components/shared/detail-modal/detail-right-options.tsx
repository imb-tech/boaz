import { useLanguage } from "@/components/custom/languageContext"
import { cn } from "@/lib/utils"
import { Link, useSearch } from "@tanstack/react-router"
import { useMemo } from "react"

export default function RightOptions({
    data,
    attr,
    products,
}: {
    data: Product["colors"]
    attr: Product["attr"]
    products: Product["products"]
}) {
    const search: any = useSearch({ strict: false })
    const { name } = useLanguage()

    const lastData = useMemo(() => {
        return data?.map((d) => ({
            name: d.name,
            image: d.images?.[0]?.image,
            id: d.id,
        }))
    }, [data])

    const options = useMemo(() => {
        const seen = new Set()
        return products
            ?.filter((product) => {
                const optionValue = product?.option
                const optionId = product?.option

                const uniqueKey = `${optionValue}-${optionId}`
                if (seen.has(uniqueKey)) return false
                seen.add(uniqueKey)
                return true
            })
            ?.map((d) => d.option)
    }, [products, name, search.color])

    const currentProducts: Product["products"] = useMemo(() => {
        return products?.filter((d) =>
            search.color ? d.color === search.color : true,
        )
    }, [products, search.color])

    const currentProducts2: Product["products"] = useMemo(() => {
        return products?.filter((d) =>
            // search.option ? d.option?.id === search.option : true
            search.option ? d.option === search.option : true,
        )
    }, [products, search.option])

    return (
        lastData &&
        lastData?.length > 1 && (
            <div className="w-full p-2 sm:p-4 rounded-xl space-y-4 bg-white border border-primary">
                <div>
                    <p className="pb-2">
                        {name === "name_uz" ? "Rangi" : "رنگ"}:{" "}
                        <span className="font-medium">
                            {lastData?.find((d) => d.id === search.color)?.name}
                        </span>
                    </p>
                    <div className="flex gap-2">
                        {lastData?.map((d, i: number) => {
                            const isDisabled = !currentProducts2?.find(
                                (f) => f.color === d.id,
                            )?.stock

                            return (
                                <Link
                                    disabled={isDisabled}
                                    search={
                                        {
                                            ...search,
                                            option:
                                                isDisabled ? undefined : (
                                                    search.option
                                                ),
                                            color:
                                                search.color === d.id ?
                                                    undefined
                                                :   d.id,
                                        } as any
                                    }
                                    key={i}
                                    className={cn(
                                        "w-max relative",
                                        isDisabled ? " opacity-50" : "",
                                    )}>
                                    <div
                                        className={cn(
                                            "w-14 h-16 border-2 rounded cursor-pointer p-0.5",
                                            search.color === d.id &&
                                                "border-primary",
                                        )}>
                                        <img
                                            key={i}
                                            src={d.image}
                                            alt={d.name}
                                            className="w-full h-full object-cover rounded border"
                                        />
                                    </div>
                                    {isDisabled && (
                                        <span className="absolute -top-[10%] right-1/2 h-[120%] w-2 border-r-2 border-foreground/30 rotate-[30deg]"></span>
                                    )}
                                </Link>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <p className="pb-2">
                        {attr}:{" "}
                        <span className="font-medium">{options[0]}</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {options?.map((d, i: number) => {
                            const isDisabled = !currentProducts?.find(
                                (f) => f.option === d,
                            )?.stock
                            return (
                                <Link
                                    disabled={isDisabled}
                                    search={
                                        {
                                            ...search,
                                            color:
                                                isDisabled ? undefined : (
                                                    search.color
                                                ),
                                            option:
                                                search?.option === d ?
                                                    undefined
                                                :   d,
                                        } as any
                                    }
                                    key={i}
                                    className={cn(
                                        "w-max relative",
                                        isDisabled ? "opacity-50" : "",
                                    )}>
                                    <p
                                        className={cn(
                                            "px-2 py-1 border-2 rounded cursor-pointer text-muted-foreground",
                                            search?.option === d &&
                                                "border-primary text-foreground",
                                        )}>
                                        {d}
                                    </p>
                                    {isDisabled && (
                                        <span className="absolute top-1/2 w-full border-t-2 border-foreground/30 -rotate-45"></span>
                                    )}
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    )
}
