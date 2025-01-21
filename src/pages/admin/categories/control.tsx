import FormImagePicker from "@/components/form/image-picker"
import FormInput from "@/components/form/input"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useRequest } from "@/hooks/useRequest"
import { zodResolver } from "@hookform/resolvers/zod"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { useQueryClient } from "@tanstack/react-query"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import { z } from "zod"

const ControlName = ({
    open,
    setOpen,
    current,
    child_current,
}: {
    open: boolean
    setOpen: (open: boolean) => void
    current: Category | undefined
    child_current: Category | undefined
}) => {
    const queryClient = useQueryClient()
    const { t } = useTranslation()
    const navigate = useNavigate()

    const last_current = child_current?.id ? child_current : current

    const { post, patch, isPending } = useRequest(
        {},
        { contentType: "multipart/form-data" },
    )
    const search: any = useSearch({ from: "__root__" })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        disabled: isPending,
        values:
            !!search.category ?
                undefined
            :   ((current?.id ? current : (
                    child_current?.id && {
                        ...child_current,
                        image: "none",
                    }
                )) as any),
    })

    async function onSubmit(data: z.infer<typeof formSchema>) {
        if (last_current?.id) {
            await patch(`parent-category/${last_current?.id}/`, {
                ...data,
                image: typeof data.image == "string" ? undefined : data?.image,
                parent_category: search.category,
            })
            toast.success(`${t("Muvaffaqiyatli tahrirlandi")}`)
            setOpen(false)
        } else {
            if (!search.category && !data.image) {
                toast.error("Rasm tanlang")
            } else {
                await post("parent-category/", {
                    ...data,
                    parent_category: search.category,
                })
                toast.success(`${t("Muvaffaqiyatli qo'shildi")}`)
                setOpen(false)
            }
        }
        queryClient.invalidateQueries({ queryKey: ["parent-category/"] })
        navigate({ search: { ...search, category: undefined } })
    }

    useEffect(() => {
        if (!open) {
            form.reset({
                name_fa: current?.name_fa || "",
                name_uz: current?.name_uz || "",
            })
        }
    }, [open, current, form])

    useEffect(() => {
        setOpen(!!search.category)
    }, [search.category])

    return (
        <Dialog
            open={open}
            onOpenChange={(val) => {
                if (!val) {
                    navigate({ search: { ...search, category: undefined } })
                    setOpen(false)
                }
            }}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>
                        {last_current?.id ?
                            `${t("Tahrirlash")}`
                        :   `${t("qo'shish")}`}
                    </DialogTitle>
                    <VisuallyHidden>
                        <DialogDescription>
                            {last_current?.id ?
                                `${t("Tahrirlash")}`
                            :   `${t("qo'shish")}`}
                        </DialogDescription>
                    </VisuallyHidden>
                </DialogHeader>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-4">
                    {!child_current?.id && !search.category && (
                        <FormImagePicker
                            methods={form}
                            name="image"
                            avatar
                            label="Rasm"
                        />
                    )}
                    <FormInput
                        methods={form}
                        name="name_fa"
                        label={t("Nomi2")}
                    />
                    <FormInput
                        methods={form}
                        name="name_uz"
                        label={t("Nomi3")}
                    />
                    <div className="flex gap-4 justify-end">
                        <Button loading={isPending}>{t("Saqlash")}</Button>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => {
                                navigate({
                                    search: { ...search, category: undefined },
                                })
                                setOpen(false)
                            }}
                            disabled={isPending}>
                            {t("Bekor qilish")}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default ControlName

const formSchema = z.object({
    name_fa: z
        .string({ message: "Nomi kiritilishi shart (Dari)" })
        .min(1, { message: "Nomi kiritilishi shart (Dari)" }),
    name_uz: z
        .string({ message: "Nomi kiritilishi shart (Uzbek)" })
        .min(1, { message: "Nomi kiritilishi shart (Uzbek)" }),
    image: z
        .instanceof(File, { message: "Rasm tanlang" })
        .or(z.string())
        .optional(),
})
