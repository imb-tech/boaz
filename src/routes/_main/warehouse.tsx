import Warehouse from "@/pages/warehouse"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/warehouse")({
    component: Warehouse,
})
