import OneCategory from "@/pages/one-category"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/categories/$category")({
    component: OneCategory,
})
