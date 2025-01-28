import CustomImage from "@/components/custom/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import useCart from "@/hooks/useCart"
import { useRequest } from "@/hooks/useRequest"
import { useStore } from "@/hooks/useStore"
import { formatMoney } from "@/lib/format-money"
import { cn } from "@/lib/utils"
import { Link } from "@tanstack/react-router"
import { Heart, Minus, ShoppingCart } from "lucide-react"
import { memo, useMemo } from "react"
import { useTranslation } from "react-i18next"
import DetailModal from "../detail-modal"
import XitBadge from "../xit-badge"

function ProductCard({
    p,
    isLikeds,
    xit,
}: {
    p: Product
    isLikeds?: boolean
    is_authenticated: boolean
    xit?: boolean
}) {
    const { store: likeds, setStore: setLikeds } = useStore<number[]>("likeds")

    const { t } = useTranslation()
    const { post, isPending, remove } = useRequest()
    const { removeFromCart, addToCart, cart: baskets } = useCart()

    const isLiked =
        isLikeds ||
        useMemo(() => {
            return likeds?.some((l) => l === p.id)
        }, [likeds])

    const basketCount = useMemo(() => {
        return baskets?.find((b) => b.id === p.id)?.count || 0
    }, [baskets])

    const isInBasket = useMemo(() => {
        return baskets?.some((b) => b.id === p.id)
    }, [baskets])

    const toggleLiked = () => {
        if (isLiked) {
            remove("user/favourite/", p.id)
            setLikeds(likeds?.filter((l) => l !== p.id) || [])
        } else {
            post("user/favourite/", { product: p.id })
            setLikeds([...(likeds || []), p.id])
        }
    }

    const toggleBasket = () => {
        addToCart(p.id, p.id)
    }

    return (
        <Card
            className="overflow-hidden relative group hover:shadow-none duration-300 rounded-xl border-none"
            key={p.id}>
            <CardContent className="p-0">
                <Button
                    icon={
                        <Heart
                            className={cn(
                                "text-destructive w-4 sm:w-[18px]",
                                isLiked && "fill-destructive",
                            )}
                        />
                    }
                    variant="ghost"
                    className="w-7 h-7 sm:w-10 sm:h-10 absolute top-2 right-2 z-20 bg-secondary/60 rounded-full"
                    disabled={isPending}
                    onClick={toggleLiked}
                />
                <div className="relative w-full h-40 sm:h-[200px] flex items-center justify-center">
                    {xit && <XitBadge className="absolute top-2 left-2" />}
                    <Link to={`/products/${p.id}`}>
                        <CustomImage
                            key={p.name}
                            src={p.main_image}
                            alt="product image"
                            contain
                            height={200}
                            width={"90%"}
                            className="mix-blend-multiply group-hover:scale-[1.02] !h-40 sm:h-[200px] duration-300"
                        />
                    </Link>
                </div>
                <div className="p-2 sm:p-3">
                    <Link to={`/products/${p.id}`}>
                        <h2 className="text-sm sm:text-base line-clamp-1">
                            {p.name}
                        </h2>
                        {/* <p className="text-xs text-muted-foreground line-clamp-2 h-9 pt-1">
                            {p.description}
                        </p> */}
                        {/* <p className="text-xs sm:text-sm text-muted-foreground pt-2">
                            {t("Omborda")}:{" "}
                            <span className="text-foreground font-medium">
                                {p.stock} {t("ta")}
                            </span>
                        </p> */}
                    </Link>
                    <div className="flex items-center justify-between pt-2 mt-auto">
                        {p.discounted_price ?
                            <div>
                                <p className="text-xs line-through text-muted-foreground">
                                    {formatMoney(p.price, "", true, t)}
                                </p>
                                <p className="text-xs sm:text-sm font-medium">
                                    {formatMoney(
                                        p.discounted_price,
                                        "bg-primary text-white px-0.5",
                                        true,
                                        t,
                                    )}
                                </p>
                            </div>
                        :   <p className="text-xs sm:text-sm font-medium bg-primary text-primary-foreground">
                                {formatMoney(
                                    p.discounted_price,
                                    "bg-primary text-white px-0.5",
                                    true,
                                    t,
                                )}
                            </p>
                        }
                        <div className="w-max h-max relative -mr-1">
                            {isInBasket && (
                                <Button
                                    icon={<Minus className="w-4 sm:w-[18px]" />}
                                    variant="secondary"
                                    className="w-7 h-7 sm:w-10 sm:h-10 mr-1 transition-all duration-200"
                                    onClick={() => removeFromCart(p.id)}
                                />
                            )}
                            {isInBasket ?
                                <Button
                                    icon={
                                        <ShoppingCart className="w-4 sm:w-[18px]" />
                                    }
                                    variant="secondary"
                                    className="w-7 h-7 sm:w-10 sm:h-10"
                                    onClick={toggleBasket}
                                />
                            :   <DetailModal product={p}>
                                    <Button
                                        icon={
                                            <ShoppingCart className="w-4 sm:w-[18px]" />
                                        }
                                        variant="secondary"
                                        className="w-7 h-7 sm:w-10 sm:h-10"
                                    />
                                </DetailModal>
                            }
                            {isInBasket && (
                                <Badge className="absolute -top-2 right-1 sm:-right-2 px-1 sm:px-2 py-0 sm:py-0.5 text-[10px] sm:p-auto sm:text-xs">
                                    {basketCount}
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default memo(ProductCard, (prevProps, nextProps) => {
    return (
        prevProps.p.id === nextProps.p.id &&
        prevProps.isLikeds === nextProps.isLikeds
    )
})
