import DefaultImage from "@/assets/default-image.svg"
import CustomImage from "@/components/custom/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { shop_id } from "@/constants/api-endpoints"
import useCart from "@/hooks/useCart"
import { useRequest } from "@/hooks/useRequest"
import { formatMoney } from "@/lib/format-money"
import { cn } from "@/lib/utils"
import { Link } from "@tanstack/react-router"
import { Heart, Minus, ShoppingCart } from "lucide-react"
import { memo, useMemo } from "react"
import { useTranslation } from "react-i18next"
import XitBadge from "../xit-badge"

function ProductCard2({
    p,
    xit,
}: {
    p: Product2
    isLikeds?: boolean
    is_authenticated: boolean
    xit?: boolean
}) {
    const { t } = useTranslation()
    const { isPending } = useRequest()
    const { removeFromCart, addToCart, cart } = useCart()

    const price = useMemo(
        () =>
            p?.shop_prices?.find((p) => p.shop_id === shop_id)?.retail_price ||
            0,
        [p],
    )

    const stock = useMemo(
        () =>
            p?.shop_measurement_values?.find((p) => p.shop_id === shop_id)
                ?.total_active_measurement_value || 0,
        [p],
    )

    const isLiked = false

    const cartCount = useMemo(() => {
        return cart?.find((b) => b.id === p.id)?.count || 0
    }, [cart])

    const isInBasket = useMemo(() => {
        return cart?.some((b) => b.id === p.id)
    }, [cart])

    const toggleLiked = () => {
        // if (isLiked) {
        //     remove("user/favourite/", p.id)
        //     setLikeds(likeds?.filter((l) => l !== p.id) || [])
        // } else {
        //     post("user/favourite/", { product: p.id })
        //     setLikeds([...(likeds || []), p.id])
        // }
    }

    const toggleBasket = () => {
        addToCart(p)
    }

    return (
        <Card
            className="overflow-hidden relative group hover:shadow-none duration-300 rounded-xl border-none"
            key={p.id}>
            <CardContent className="p-0">
                {/* <Button
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
                /> */}
                <div className="relative w-full h-40 sm:h-[200px] flex items-center justify-center">
                    {xit && <XitBadge className="absolute top-2 left-2" />}
                    <Link
                        to={`/products/${p.id}`}
                        className="flex justify-center items-center">
                        <CustomImage
                            key={p.name}
                            src={p.main_image_url || DefaultImage}
                            alt="product image"
                            contain
                            height={200}
                            width={"90%"}
                            className="mix-blend-multiply group-hover:scale-[1.02] !h-40 sm:h-[200px] duration-300"
                        />
                    </Link>
                </div>
                <div className="p-2 sm:p-3">
                    {false ?
                        <div>
                            <p className="text-xs line-through text-muted-foreground">
                                {formatMoney(price, "", true, t)}
                            </p>
                            <p className="text-xs sm:text-sm font-medium text-primary">
                                {formatMoney(
                                    price,
                                    "bg-primary text-white px-0.5",
                                    true,
                                    t,
                                )}
                            </p>
                        </div>
                    :   <p className="text-md sm:text-lg font-medium text-primary">
                            {formatMoney(price, " px-0.5 ", true, t)}
                        </p>
                    }

                    <Link to={`/products/${p.id}`}>
                        <h2 className="text-sm sm:text-base line-clamp-1">
                            {p.name}
                        </h2>
                        <p className="text-xs text-muted-foreground pt-0">
                            {stock > 0 ? t("Omborda") + ":" : ""}
                            {stock > 0 ?
                                <span className="text-foreground font-medium">
                                    {" "}
                                    {stock} {t("ta")}
                                </span>
                            :   <span className="text-foreground font-medium">
                                    {t("tugagan")}
                                </span>
                            }
                        </p>
                    </Link>
                    <div className="flex items-center justify-between pt-0 mt-2">
                        {/* <Button
                            variant="secondary"
                            className="text-primary"
                            onClick={toggleBasket}
                            disabled={stock === 0}>
                            {t("Bittada xarid")}
                        </Button> */}
                        <div className="w-max h-max relative -mr-1">
                            {isInBasket && (
                                <Button
                                    icon={<Minus className="w-4 sm:w-[18px]" />}
                                    variant="outline"
                                    className="w-7 h-7 sm:w-10 sm:h-10 mr-1 transition-all duration-200"
                                    onClick={() => removeFromCart(p.id)}
                                />
                            )}
                            <Button
                                disabled={stock === 0}
                                icon={
                                    <ShoppingCart className="w-4 sm:w-[18px]" />
                                }
                                variant="secondary"
                                className="w-7 h-7 sm:w-10 sm:h-10"
                                onClick={toggleBasket}
                            />
                            {isInBasket && (
                                <Badge className="absolute -top-2 right-1 sm:-right-2 sm:py-0.5 text-[9px] sm:p-auto sm:text-xs flex items-center justify-center">
                                    {cartCount}
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default memo(ProductCard2, (prevProps, nextProps) => {
    return (
        prevProps.p.id === nextProps.p.id &&
        prevProps.isLikeds === nextProps.isLikeds
    )
})
