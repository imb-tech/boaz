import Category from "@/pages/category"
import { createFileRoute } from "@tanstack/react-router"
import { z } from "zod"

export const Route = createFileRoute("/_main/categories/")({
    component: Category,
    validateSearch: z.object({
        parent_category: z.number().optional(),
        child_category: z.number().optional(),
    }),
})
