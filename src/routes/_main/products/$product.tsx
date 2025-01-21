import Product from "@/pages/product"
import { createFileRoute } from "@tanstack/react-router"
import { z } from "zod"

export const Route = createFileRoute("/_main/products/$product")({
    component: Product,
    validateSearch: z.object({
        color: z.number().optional(),
        option: z.string().optional(),
    }),
})
