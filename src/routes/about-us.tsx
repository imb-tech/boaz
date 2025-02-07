import AboutUs from "@/pages/about-us"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/about-us")({
    component: RouteComponent,
})

function RouteComponent() {
    return <AboutUs />
}
