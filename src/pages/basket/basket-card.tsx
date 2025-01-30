import CustomImage from "@/components/custom/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import SeeInView from "@/components/ui/see-in-view"
import { useStore } from "@/hooks/useStore"
import { formatMoney } from "@/lib/format-money"
import Autoplay from "embla-carousel-autoplay"
import { MinusIcon, PlusIcon, Trash2 } from "lucide-react"
import { useMemo, useRef } from "react"

import { Input } from "@/components/ui/input"
import useCart from "@/hooks/useCart"
import { useState } from "react"
import { useTranslation } from "react-i18next"

const id = "fac0d3fd-4d70-4082-88f4-2da77752f071"

export default function BasketCard({ product }: { product: CartItem }) {
    const plugin = useRef(Autoplay({ delay: 1000 }))
    const { setStore } = useStore<Product2[]>("cart")
    const { removeFromCart, addToCart, cart } = useCart()

    const currentProduct = useMemo(() => {
        return cart?.find((p) => p.id === product.id)
    }, [cart, product])

    const [inputValue, setInputValue] = useState(currentProduct?.count || 1)

    const handleQuantity = (action: "increase" | "decrease") => {
        if (!cart) return
        if (action === "increase") {
            setInputValue(Number(currentProduct?.count) + 1)
            addToCart(product)
        } else {
            removeFromCart(product.id)
            setInputValue(Number(currentProduct?.count) - 1)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10)
        if (value >= 1) {
            setInputValue(value)
        } else if (e.target.value === "") {
            setInputValue(0)
        }
    }

    const handleInputBlur = () => {
        if (!cart) return
        const newcart = cart.map((item) => {
            if (item.id === product.id) {
                return { ...item, count: inputValue }
            }
            return item
        })
        setStore(newcart)
    }

    const { t } = useTranslation()

    const price = useMemo(() => {
        return (
            product.shop_prices?.find((p) => p.shop_id === id)?.retail_price ||
            0
        )
    }, [product])

    return (
        <Card key={product.id} className="p-2 sm:p-4 shadow-none border-none">
            <CardContent className="p-0">
                <div className="flex items-center gap-4 w-full justify-between">
                    <SeeInView
                        url={product?.main_image_url_full}
                        className="w-max">
                        <CustomImage
                            src={product?.main_image_url_full}
                            alt="product image"
                            height={120}
                            width={120}
                            contain
                            onMouseEnter={() => plugin.current.play()}
                            onMouseLeave={() => plugin.current.stop()}
                            className="rounded-md !w-24 sm:!w-28"
                        />
                    </SeeInView>
                    <div className="w-full space-y-2">
                        <h3 className="text-base sm:text-lg font-medium">
                            {product.name}
                        </h3>
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground">
                                        {/* {product?.attribute}: */}
                                        Tanlanmagan
                                    </span>
                                    <p className="text-sm">
                                        {/* {product?.option} */}
                                        Tanlanmagan
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground">
                                        {t("Rangi")}:
                                    </span>
                                    <p className="text-sm">
                                        Tanlanmagan
                                        {/* {product?.color?.name} */}
                                    </p>
                                </div>
                            </div>
                            <div className="hidden md:flex items-center gap-6">
                                <div className="flex flex-col">
                                    <p className="font-medium text-base sm:text-lg">
                                        {formatMoney(price, "", true, t)}
                                    </p>
                                    <span className="line-through text-sm text-muted-foreground">
                                        {formatMoney(price, "", true, t)}
                                    </span>
                                </div>
                                <div className="flex xsm:max-sm:max-w-[21vh] items-center gap-2 sm:max-md:gap-1 xsm:max-sm:gap-1">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() =>
                                            handleQuantity("decrease")
                                        }
                                        className="sm:max-md:w-8 xsm:max-sm:w-14">
                                        <MinusIcon width={18} />
                                    </Button>
                                    <div className="w-14 sm:w-auto">
                                        <Input
                                            min="1"
                                            value={inputValue}
                                            onChange={handleInputChange}
                                            onBlur={handleInputBlur}
                                            className="w-20 sm:max-md:w-16 text-center xsm:max-sm:w-12"
                                        />
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() =>
                                            handleQuantity("increase")
                                        }
                                        className="sm:max-md:w-8 xsm:max-sm:w-14">
                                        <PlusIcon width={18} />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() =>
                                            removeFromCart(product.id)
                                        }
                                        className="!text-destructive h-7 w-7 sm:w-10 sm:h-10 xsm:max-sm:w-14 ">
                                        <Trash2 width={18} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between gap-x-6 mt-6 md:hidden">
                    <div className="flex flex-col">
                        <p className="font-medium text-base sm:text-lg">
                            {formatMoney(price, "", true, t)}
                        </p>
                        <span className="line-through text-sm text-muted-foreground">
                            {formatMoney(price, "", true, t)}
                        </span>
                    </div>
                    <div className="flex xsm:max-sm:max-w-[21vh] items-center gap-2 sm:max-md:gap-1 xsm:max-sm:gap-1">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleQuantity("decrease")}
                            className="!min-w-6 !w-6 h-8">
                            <MinusIcon width={18} className="w-[14px]" />
                        </Button>
                        <div>
                            <Input
                                min="1"
                                value={inputValue}
                                onChange={handleInputChange}
                                onBlur={handleInputBlur}
                                className="text-center h-8"
                                wrapperClassName="h-8 !w-16"
                            />
                        </div>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleQuantity("increase")}
                            className="!min-w-6 !w-6 sm:w-10 h-8">
                            <PlusIcon width={18} className="w-[14px]" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(product.id)}
                            className="!text-destructive !min-w-8 !w-8 sm:w-10 h-8">
                            <Trash2 width={18} />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
