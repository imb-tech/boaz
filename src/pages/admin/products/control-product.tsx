import { useLanguage } from "@/components/custom/languageContext"
import FormCombobox from "@/components/form/combobox"
import FormImageDrop from "@/components/form/image-drop"
import FormInput from "@/components/form/input"
import FormNumberInput from "@/components/form/number-input"
import FormTextarea from "@/components/form/textarea"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { useGet } from "@/hooks/useGet"
import { useRequest } from "@/hooks/useRequest"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useSearch } from "@tanstack/react-router"
import { Edit2, Plus } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import { z } from "zod"

interface thisProps {
    open: boolean
    setOpen: (val: boolean) => void
    current?: Product
}

export default function ControlProduct({ open, setOpen, current }: thisProps) {
    const queryClient = useQueryClient()
    const search: any = useSearch({ from: "__root__" })
    const { data } = useGet<CategoryResponse>("parent-category/")
    const category = data?.results

    const { name } = useLanguage()
    const { t } = useTranslation()

    const { post, patch, isPending } = useRequest(
        {
            onSuccess: (data) => {
                if (current?.id) {
                    queryClient.setQueryData(["product/"], (oldData: any) => {
                        if (!oldData) return oldData
                        return {
                            ...oldData,
                            pages: oldData.pages.map(
                                (page: { results: any[] }) => ({
                                    ...page,
                                    results: page.results.map(
                                        (product: { id: number }) =>
                                            product.id === current.id ?
                                                data
                                            :   product,
                                    ),
                                }),
                            ),
                        }
                    })
                } else {
                    queryClient.setQueryData(["product/"], (oldData: any) => {
                        if (!oldData) return oldData

                        return {
                            ...oldData,
                            pages: [
                                {
                                    next: null,
                                    previous: null,
                                    results: [data],
                                },
                                ...oldData.pages,
                            ],
                        }
                    })
                }
            },
        },
        { contentType: "multipart/form-data" },
    )

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        values: {
            ...current,
            image1: "http://url.com",
            image2: "http://url.com",
            image3: "http://url.com",
            image4: "http://url.com",
        } as any,
        disabled: isPending,
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        if (current?.id) {
            await patch("product/" + current.id + "/", {
                ...data,
                discounted_price: data.discounted_price || undefined,
                image1:
                    typeof data.image1 === "string" ? undefined : data.image1,
                image2:
                    typeof data.image2 === "string" ? undefined : data.image2,
                image3:
                    typeof data.image3 === "string" ? undefined : data.image3,
                image4:
                    typeof data.image4 === "string" ? undefined : data.image4,
            })
            toast.success(`${t("Muvaffaqiyatli tahrirlandi")}`)
            setOpen(false)
            form.reset()
        } else {
            await post("product/", {
                ...data,
                discounted_price: data.discounted_price || undefined,
                image1:
                    typeof data.image1 === "object" ? data.image1 : undefined,
                image2:
                    typeof data.image2 === "object" ? data.image2 : undefined,
                image3:
                    typeof data.image3 === "object" ? data.image3 : undefined,
                image4:
                    typeof data.image4 === "object" ? data.image4 : undefined,
            })
            toast.success(`${t("Muvaffaqiyatli qo'shildi")}`)
            setOpen(false)
            form.reset()
        }

        queryClient.invalidateQueries({
            queryKey: ["imb/contacts/", { ...search, tab: undefined }],
        })
    }

    const categoryOptions =
        category?.map((cat: any) => ({
            name: cat[name as keyof Category],
            id: cat.id,
            children: cat.children.map((sub: any) => ({
                name: sub[name as keyof Category],
                id: sub.id,
            })),
        })) || []

    useEffect(() => {
        if (!open) {
            form.reset()
        } else if (!current?.id) {
            form.reset()
        }
    }, [open])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="w-full max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="text-left">
                        {current?.id ?
                            `${current.name} ${t("ni tahrirlash")}`
                        :   `${t("Yangi maxsulot")}`}
                    </DialogTitle>
                </DialogHeader>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-4 max-h-[80vh] overflow-y-auto px-0.5">
                    <div className="grid xmd:grid-cols-2 gap-4">
                        <FormInput
                            methods={form}
                            name="name"
                            label={t("Nomi3")}
                            hideError
                        />
                        <FormInput
                            methods={form}
                            name="name_fa"
                            label={t("Nomi2")}
                            hideError
                        />
                        <FormTextarea
                            methods={form}
                            name="description_uz"
                            label={t("Ma'lumot (Uzbek)")}
                            hideError
                        />
                        <FormTextarea
                            methods={form}
                            name="description_fa"
                            label={t("Ma'lumot (Farsi)")}
                            hideError
                        />
                        <FormCombobox
                            methods={form}
                            name="category"
                            label={t("Kategoriya")}
                            options={categoryOptions}
                        />

                        <FormCombobox
                            methods={form}
                            name="vendor"
                            label={t("Firma")}
                            options={
                                categoryOptions?.find(
                                    (cat: any) =>
                                        cat.id === form.watch("category"),
                                )?.children
                            }
                            disabled={!form.watch("category")}
                            addNew
                        />
                        <FormNumberInput
                            methods={form}
                            name="price"
                            label={t("Narxi")}
                            thousandSeparator=" "
                        />
                        <FormNumberInput
                            methods={form}
                            name="discounted_price"
                            label={t("Chegirma narx")}
                            thousandSeparator=" "
                        />
                        <FormNumberInput
                            methods={form}
                            name="stock"
                            label={t("Miqdori")}
                        />
                        <span></span>
                        <FormImageDrop
                            methods={form}
                            name="image1"
                            label="Rasm"
                        />
                        <FormImageDrop
                            methods={form}
                            name="image2"
                            label="Rasm"
                        />
                        <FormImageDrop
                            methods={form}
                            name="image3"
                            label="Rasm"
                        />
                        <FormImageDrop
                            methods={form}
                            name="image4"
                            label="Rasm"
                        />
                    </div>
                    <Button
                        icon={
                            current?.id ?
                                <Edit2 width={18} />
                            :   <Plus width={18} />
                        }
                        type="submit"
                        loading={isPending}
                        className="w-max ml-auto">
                        {current?.id ? t("Tahrirlash") : t("Qo'shish")}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

const FormSchema = z.object({
    name: z.string().min(1, { message: "Nomi (Uzbek) talab etiladi" }),
    name_fa: z.string().min(1, { message: "Nomi (Farsi) talab etiladi" }),
    description_uz: z
        .string()
        .min(1, { message: "Tavsif (Uzbek) talab etiladi" }),
    description_fa: z
        .string()
        .min(1, { message: "Tavsif (Farsi) talab etiladi" }),
    price: z
        .string()
        .min(3, { message: "Narxi juda kam" })
        .or(z.number().min(3)),
    discounted_price: z
        .string()
        .min(3, { message: "Narxi juda kam" })
        .optional()
        .or(z.number().min(3))
        .nullable(),
    stock: z.string().min(1).or(z.number().min(1)),
    image1: z.union([
        z.string().url({ message: "Valid URL kiriting" }),
        z
            .instanceof(File, { message: "Rasm tanlang" })
            .refine(
                (file) => file.size <= MAX_FILE_SIZE,
                "Rasm hajmi 5 MB dan kichik bo'lishi kerak",
            )
            .refine(
                (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
                "Only .jpg, .jpeg, .png and .webp formats are supported",
            ),
    ]),
    image2: z.union([
        z.string().url({ message: "Valid URL kiriting" }),
        z
            .instanceof(File, { message: "Rasm tanlang" })
            .refine(
                (file) => file.size <= MAX_FILE_SIZE,
                "Rasm hajmi 5 MB dan kichik bo'lishi kerak",
            )
            .refine(
                (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
                "Only .jpg, .jpeg, .png and .webp formats are supported",
            ),
    ]),
    image3: z.union([
        z.string().url({ message: "Valid URL kiriting" }),
        z
            .instanceof(File, { message: "Rasm tanlang" })
            .refine(
                (file) => file.size <= MAX_FILE_SIZE,
                "Rasm hajmi 5 MB dan kichik bo'lishi kerak",
            )
            .refine(
                (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
                "Only .jpg, .jpeg, .png and .webp formats are supported",
            ),
    ]),
    image4: z.union([
        z.string().url({ message: "Valid URL kiriting" }),
        z
            .instanceof(File, { message: "Rasm tanlang" })
            .refine(
                (file) => file.size <= MAX_FILE_SIZE,
                "Rasm hajmi 5 MB dan kichik bo'lishi kerak",
            )
            .refine(
                (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
                "Only .jpg, .jpeg, .png and .webp formats are supported",
            ),
    ]),
    sold: z.string().or(z.number()).optional(),
    category: z.number().min(1),
    vendor: z.number().min(1),
})

const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
]
