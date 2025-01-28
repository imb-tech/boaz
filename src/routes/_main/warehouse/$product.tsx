import ProductWarehouse from "@/pages/product-warehouse"
import { createFileRoute } from "@tanstack/react-router"
import { z } from "zod"

export const Route = createFileRoute("/_main/warehouse/$product")({
    component: ProductWarehouse,
    validateSearch: z.object({
        color: z.number().optional(),
        option: z.string().optional(),
    }),
})
