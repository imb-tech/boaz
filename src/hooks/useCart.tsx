import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import { useStore } from "./useStore"

export default function useCart() {
    const { store, setStore } = useStore<Product[] | undefined>("baskets")
    const { t } = useTranslation()

    const findProductById = (id: Product["id"]) =>
        store?.find((p) => p.id === id)

    const updateProductCount = (
        productId: Product["id"],
        increment: number,
    ) => {
        return store?.map((product) =>
            product.id === productId ?
                { ...product, count: (product.count || 0) + increment }
            :   product,
        )
    }

    function addToCart(product: Product) {
        const existingProduct = findProductById(product.id)

        const updatedBaskets =
            existingProduct ?
                updateProductCount(product.id, 1)
            :   [...(store || []), { ...product, count: 1 }]

        setStore(updatedBaskets || [])

        if (!existingProduct) {
            toast.success(`${product.name} ${t("savatchaga qo'shildi")}`)
        }
    }

    function removeFromCart(
        productId: Product["id"],
        removeAll: boolean = false,
    ) {
        if (removeAll) {
            return setStore([])
        }
        const existingProduct = findProductById(productId)

        if (!existingProduct) return

        const updatedBaskets =
            existingProduct.count === 1 ?
                store?.filter((product) => product.id !== productId)
            :   updateProductCount(productId, -1)

        setStore(updatedBaskets || [])
    }

    return {
        cart: store || [],
        addToCart,
        removeFromCart,
    }
}
