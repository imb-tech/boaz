import CustomImage from "@/components/custom/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useConfirm } from "@/hooks/useConfirm"
import { useRequest } from "@/hooks/useRequest"
import { formatMoney } from "@/lib/format-money"
import { useQueryClient } from "@tanstack/react-query"
import { Edit2, Trash2 } from "lucide-react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"

export default function AdminProductCard({
    p,
    onEdit,
}: {
    p: Product
    onEdit: () => void
}) {
    const confirm = useConfirm()
    const { remove, isPending } = useRequest()
    const queryClient = useQueryClient()

    const { t } = useTranslation()

    async function deleteProduct() {
        const isConfirmed = await confirm({
            title: p?.name + `${t("ni o'chirmoqchimisiz?")}`,
        })
        if (isConfirmed) {
            toast.promise(remove("product/" + p.id + "/"), {
                loading: `${t("O'chirilmoqda")}`,
                success: () => {
                    queryClient.setQueryData(
                        ["product/"],
                        (oldData: {
                            pageParams: string[]
                            pages: {
                                next: string
                                previous: string
                                results: Product[]
                            }[]
                        }) => {
                            if (!oldData) return oldData

                            return {
                                ...oldData,
                                pages: oldData.pages
                                    .map((page) => ({
                                        ...page,
                                        results: page.results.filter(
                                            (product) => product.id !== p.id,
                                        ),
                                    }))
                                    .filter((page) => page.results.length > 0),
                            }
                        },
                    )

                    return p.name + `${t("Muvaffaqiyatli o'chirildi")}`
                },
            })
        }
    }

    return (
        <Card className="overflow-hidden">
            <CardContent className="p-0">
                <CustomImage
                    key={p.id}
                    src={p.main_image}
                    alt="product image"
                    contain
                    height={200}
                    width={"100%"}
                    className="mix-blend-multiply group-hover:scale-[1.02] !h-40 sm:h-[200px] duration-300"
                />
                <div className="p-3">
                    <h2 className="text-sm sm:text-base font-medium">
                        {p.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 h-10">
                        {p.description}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground pt-2">
                        Omborda:{" "}
                        <span className="text-foreground font-medium">
                            {p.stock} ta
                        </span>
                    </p>
                    <div className="flex items-center justify-between pt-2">
                        <div>
                            <p className="text-xs line-through text-muted-foreground">
                                {formatMoney(p.price, "", true, t)}
                            </p>
                            <p className="text-xs sm:text-sm font-medium">
                                {formatMoney(p.discounted_price, "", true, t)}
                            </p>
                        </div>
                        <div className="flex">
                            <Button
                                icon={<Trash2 className="w-4 sm:w-[18px]" />}
                                variant="ghost"
                                className="!text-destructive w-7 h-7 sm:w-10 sm:h-10"
                                disabled={isPending}
                                onClick={deleteProduct}
                            />
                            <Button
                                icon={<Edit2 className="w-4 sm:w-[18px]" />}
                                variant="ghost"
                                className="w-7 h-7 sm:w-10 sm:h-10"
                                onClick={onEdit}
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
