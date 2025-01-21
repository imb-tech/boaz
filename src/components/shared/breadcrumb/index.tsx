import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Fragment } from "react/jsx-runtime"

type BreadcrumbItem = {
    name: string
    href?: string | undefined
}

type Props = {
    items: BreadcrumbItem[]
}

export function ProductBreadcrumb({ items }: Props) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Asosiy</BreadcrumbLink>
                </BreadcrumbItem>
                {items?.map((item) => (
                    <Fragment key={item.name}>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem key={item.name}>
                            <BreadcrumbLink href={item.href}>
                                {item.name}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
