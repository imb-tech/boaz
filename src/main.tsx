import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import ReactDOM from "react-dom/client"
import { LanguageProvider } from "./components/custom/languageContext"
import "./i18n.js"
import "./index.css"
import { ConfirmProvider } from "./layouts/confirm"
import { routeTree } from "./routeTree.gen"

const router = createRouter({
    routeTree,
    defaultPreload: "intent",
})

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router
    }
}

const queryClient = new QueryClient()

const rootElement = document.getElementById("app")!

if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <LanguageProvider>
            <QueryClientProvider client={queryClient}>
                <ConfirmProvider>
                    <RouterProvider router={router} />
                </ConfirmProvider>
                <ReactQueryDevtools />
            </QueryClientProvider>
        </LanguageProvider>,
    )
}
