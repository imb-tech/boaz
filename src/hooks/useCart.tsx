import { useUser } from "@/constants/useUser"
import { useLocation } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"
import { useStore } from "./useStore"

export default function useCart() {
    const { store, setStore } = useStore<CartItem[] | undefined>("baskets")
    const { t } = useTranslation()
    const pathname = useLocation().pathname
    const { is_best_client } = useUser()

    const findProductById = (id: Product["id"]): CartItem | undefined =>
        store?.find((p) => p.id === id)

    function updateProductCount(id: Product["id"], interval: number) {
        const item = findProductById(id)
        if (item?.count === 1 && interval === -1) {
            // setStore(store?.filter((p) => p.id !== id))
            return store?.filter((p) => p.id !== id)
        }

        return store?.map((product) =>
            product.id === id ?
                { ...product, count: (product.count || 0) + interval }
            :   product,
        )
    }

    function increment(id: Product["id"]) {
        setStore(updateProductCount(id, 1))
    }

    function decrement(id: Product["id"]) {
        setStore(updateProductCount(id, -1))
    }

    function inCart(id: number) {
        return (
            store?.some((p) => p.id === id) &&
            Number(store?.find((p) => p.id === id)?.count || 1) > 0
        )
    }

    function addToCart(
        baseProduct: Product["id"],
        orginal_product: Product["id"],
    ) {
        if (inCart(baseProduct)) {
            return increment(baseProduct)
        }

        return setStore([
            ...(store || []),
            { id: baseProduct, count: 1, orginal_product },
        ])
    }

    function removeFromCart(baseProduct: Product["id"], removeItem?: boolean) {
        if (!store) return
        if (removeItem) return setStore([])

        if (inCart(baseProduct)) {
            return decrement(baseProduct)
        }
    }

    return {
        cart: store || [],
        addToCart,
        removeFromCart,
    }
}
