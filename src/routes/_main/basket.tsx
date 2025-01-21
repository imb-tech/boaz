import Basket from "@/pages/basket"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/basket")({
    component: Basket,
})
