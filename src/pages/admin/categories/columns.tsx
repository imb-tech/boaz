import { Button } from "@/components/ui/button"
import SeeInView from "@/components/ui/see-in-view"
import { useConfirm } from "@/hooks/useConfirm"
import http from "@/lib/http"
import { useQueryClient } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import { ColumnDef } from "@tanstack/react-table"
import { Edit, Plus, Trash2 } from "lucide-react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
export const useColumns = ({
    onEdit,
    onEdit2,
    onAdd,
}: {
    onEdit: (val: Category) => void
    onEdit2: (val: Category) => void
    onAdd: () => void
}): ColumnDef<any>[] => {
    const queryClient = useQueryClient()
    const confirm = useConfirm()

    const { t } = useTranslation()

    async function onDelete(data: {
        id: number
        type: string
        parent_category: number
    }) {
        console.log(data)
        const isConfirmed = await confirm({
            title: `${t("O'chirilsinmi")}?`,
        })
        if (isConfirmed) {
            toast.promise(http.delete("parent-category/" + data.id + "/"), {
                loading: `${t("O'chirilmoqda")}`,
                success: () => {
                    if (data.type == "parent") {
                        queryClient.setQueryData(
                            ["parent-category/"],
                            (oldData: any) =>
                                oldData?.filter((f: any) => f.id !== data.id),
                        )
                        return `${t("muvaffaqiyatli o'chirildi")}`
                    } else {
                        queryClient.setQueryData(
                            ["category/"],
                            (oldData: any) =>
                                oldData?.map((f: any) => {
                                    if (f.id == data.parent_category) {
                                        return {
                                            ...f,
                                            children: f.children.filter(
                                                (f: any) => f.id !== data.id,
                                            ),
                                        }
                                    }
                                    return f
                                }),
                        )
                        return `${t("muvaffaqiyatli o'chirildi")}`
                    }
                },
            })
        }
    }

    return [
        {
            id: "index",
            header: () => <div className="text-center">№</div>,
            cell: ({ row }) => (
                <div className="text-center">{row.index + 1}</div>
            ),
        },
        {
            header: "Rasmi",
            cell: ({ row }) =>
                row.getCanExpand() && (
                    <div className="text-center">
                        <SeeInView url={row.original.image}>
                            <img
                                src={row.original.image}
                                alt={row.original.name_uz}
                                className="w-10 h-10 object-cover rounded-full"
                            />
                        </SeeInView>
                    </div>
                ),
        },
        {
            id: "name_uz",
            header: () => <div className="text-center">{t("Nomi3")}</div>,
            accessorKey: "name_uz",
            cell: ({ row }) => (
                <div className="text-center">{row.original.name_uz}</div>
            ),
        },
        {
            id: "name_fa",
            header: () => <div className="text-center">{t("Nomi2")}</div>,
            accessorKey: "name_fa",
            cell: ({ row }) => (
                <div className="text-center">{row.original.name_fa}</div>
            ),
        },
        {
            id: "actions",
            header: () => <div className="text-center"> </div>,
            cell: ({ row }) => (
                <div className="flex justify-center items-center">
                    <Button
                        icon={<Edit width={18} />}
                        size="sm"
                        variant="ghost"
                        className="!text-primary"
                        onClick={() =>
                            row.original.type === "parent" ?
                                onEdit(row.original)
                            :   onEdit2(row.original)
                        }
                    />
                    <Button
                        icon={<Trash2 width={18} />}
                        size="sm"
                        variant="ghost"
                        className="!text-destructive"
                        onClick={() => onDelete(row.original)}
                    />
                    {row.original.type === "parent" ?
                        <Link
                            to={`/admin/products?page_tabs=categories&category=${row.original.id}`}>
                            <Button
                                icon={<Plus width={18} />}
                                size="sm"
                                variant="ghost"
                                className="!text-primary"
                                onClick={() => onAdd()}
                            />
                        </Link>
                    :   <Button variant="link" />}
                </div>
            ),
        },
    ]
}
