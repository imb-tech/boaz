import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useTranslation } from "react-i18next"
import { Fragment } from "react/jsx-runtime"

type BreadcrumbItem = {
    name: string
    href?: string | undefined
}

type Props = {
    items: BreadcrumbItem[]
}

export function ProductBreadcrumb({ items }: Props) {
    const { t } = useTranslation()
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">{t("Asosiy")}</BreadcrumbLink>
                </BreadcrumbItem>
                {items?.map((item) => (
                    <Fragment key={item.name}>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem key={item.name}>
                            <BreadcrumbLink href={item.href}>
                                {t(item.name)}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
