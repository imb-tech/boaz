import { useStore } from "./useStore"

export default function useCart() {
    const { store, setStore } = useStore<CartItem[]>("cart", [])

    function isHaveProduct(id: string) {
        return store?.some((b) => b.id === id)
    }

    function addToCart(product: Product2) {
        const updatedCart =
            store?.map((item) =>
                item.id === product.id ?
                    { ...item, count: (item.count || 0) + 1 }
                :   item,
            ) || []

        // Agar mahsulot mavjud bo'lmasa, yangisini qo'shamiz
        if (!isHaveProduct(product.id)) {
            updatedCart.push({ ...product, count: 1 })
        }

        setStore(updatedCart.filter((item) => item.count > 0))
    }

    function removeFromCart(id: string) {
        const updatedCart = store
            ?.map((item) =>
                item.id === id ?
                    { ...item, count: (item.count || 0) - 1 }
                :   item,
            )
            .filter((item) => item.count > 0)

        setStore(updatedCart || [])
    }

    return {
        cart: store,
        addToCart,
        removeFromCart,
        isHaveProduct,
    }
}
