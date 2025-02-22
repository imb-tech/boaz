import Image from "@/components/custom/image"
import { useLanguage } from "@/components/custom/languageContext" // Assuming useLanguage is a custom hook for language handling
import { Button } from "@/components/ui/button"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { useConfirm } from "@/hooks/useConfirm"
import { useRequest } from "@/hooks/useRequest"
import { formatMoney } from "@/lib/format-money"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@radix-ui/react-accordion"
import { useQueryClient } from "@tanstack/react-query"
import { useSearch } from "@tanstack/react-router"
import Autoplay from "embla-carousel-autoplay"
import Fade from "embla-carousel-fade"
import { Trash2 } from "lucide-react"
import { useRef } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
export default function OrderCard({
    p,
}: {
    p: {
        user: any
        id: number
        quantity: number
        status: number
        updated_at: string
        cart: { id: number; order: 1; product: Product; quantity: number }[]
    }
}) {
    const plugin = useRef(Autoplay({ delay: 3000 }))
    const fade = useRef(Fade())
    const { t } = useTranslation()
    const { name } = useLanguage() // Assuming this provides the current language (e.g., 'uz', 'fa')

    const confirm = useConfirm()
    const search: any = useSearch({ from: "__root__" })
    const { patch } = useRequest()
    const queryClient = useQueryClient()

    async function handleCancel(id: number) {
        const isConfirmed = await confirm({
            title: `${t("Buyurtmani bekor qilinsinmi?")}`,
        })
        if (isConfirmed) {
            toast.promise(patch(`order/${id}/`, { status: 3 }), {
                loading: `${t("O'zgartirilmoqda...")}`,
                success: () => {
                    queryClient.invalidateQueries({
                        queryKey: ["order/", search],
                    })
                    return `${t("Muvaffaqiyatli bekor qilindi")}`
                },
            })
        }
    }

    const statuses = {
        0: `${t("To'lov qilinmagan")}`,
        1: `${t("Faol")}`,
        2: `${t("Yetkazilmoqda")}`,
        3: `${t("bekor qilingan")}`,
        4: `${t("Yetkazilgan")}`,
    }

    return (
        <Accordion
            type="single"
            collapsible
            className="w-full bg-background p-4 rounded mt-0 ">
            <div className="flex items-center justify-between pb-4">
                <p>
                    {t("Holat")}:{" "}
                    <span className="text-foreground font-semibold">
                        {statuses[p.status as 0 | 1 | 2 | 3 | 4]}
                    </span>
                </p>
                <p>
                    {t("Yetkazilish sanasi")}:{" "}
                    <span className="text-foreground font-semibold">
                        {p.updated_at.split("T")[0]}
                    </span>
                </p>
            </div>
            {p.cart?.map((c, i) => (
                <AccordionItem value={c.id?.toString()} key={i}>
                    <AccordionTrigger>
                        <div className="flex flex-col items-start gap-2">
                            <p className="font-normal text-muted-foreground">
                                {t("Buyurtma id raqami")}:{" "}
                                <span className="text-foreground font-semibold">
                                    {c.id}
                                </span>
                            </p>
                            <p className="font-normal text-muted-foreground">
                                {t("Soni")}:{" "}
                                <span className="text-foreground font-semibold">
                                    {c.quantity}
                                </span>
                            </p>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="flex items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <Carousel
                                    className="w-32"
                                    plugins={[plugin.current, fade.current]}>
                                    <CarouselContent>
                                        {[
                                            c.product.image1,
                                            c.product.image2,
                                            c.product.image3,
                                            c.product.image4,
                                        ]
                                            ?.filter((f) => !!f)
                                            ?.map((i) => (
                                                <CarouselItem key={i}>
                                                    <Image
                                                        src={i}
                                                        alt={c.product.name}
                                                        width={100}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </CarouselItem>
                                            ))}
                                    </CarouselContent>
                                </Carousel>
                                <div className="flex flex-col gap-2 items-start">
                                    <div className="flex items-center gap-2 text-base">
                                        <p className="font-semibold text-muted-foreground">
                                            {t("Nomi")}:{" "}
                                        </p>
                                        <p>{c.product.name}</p>
                                    </div>
                                    <div className="flex items-center gap-2 text-base">
                                        <p className="font-semibold text-muted-foreground">
                                            {t("Narxi")}:{" "}
                                        </p>
                                        <p>
                                            {formatMoney(
                                                c.product?.discounted_price ||
                                                    c.product?.price,
                                                undefined,
                                                true,
                                                t,
                                            )}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 text-base">
                                        <p className="font-semibold text-muted-foreground">
                                            {t("Mijoz ismi")}:{" "}
                                        </p>
                                        <p>
                                            {p.user.full_name ?
                                                p.user.full_name
                                            :   p.user.username}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold text-muted-foreground">
                                            {t("qo'shimcha ma'lumot")}:{" "}
                                        </p>
                                        <p>{c.product.description}</p>
                                    </div>
                                </div>
                            </div>
                            {![2, 3, 4].includes(p.status) && (
                                <Button
                                    icon={<Trash2 width={18} />}
                                    variant="ghost"
                                    className="!text-destructive"
                                    onClick={() => handleCancel(p.id)}
                                />
                            )}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}
