import { CollapsibleDataTable } from "@/components/custom/collapsible-table"
import { Button } from "@/components/ui/button"
import { useGet } from "@/hooks/useGet"
import { Plus } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useColumns } from "./columns"
import ControlName from "./control"

export default function Categories() {
    const [open, setOpen] = useState(false)
    const [current, setCurrent] = useState<Category>()
    const [child_current, setChild_current] = useState<Category>()

    const { data, isLoading } = useGet<any>("parent-category/", undefined, {
        enabled: !localStorage.getItem("titles"),
    })

    const { t } = useTranslation()

    return (
        <div className="flex flex-col items-end gap-4">
            <Button
                icon={<Plus width={18} />}
                onClick={() => {
                    setOpen(true)
                    setCurrent({} as Category)
                    setChild_current({} as Category)
                }}>
                {t("Kategoriya")}
            </Button>
            <div className="w-full text-center">
                {/* <DataTable
                    columns={useColumns({
                        onEdit: (val) => {
                            setCurrent(val);
                            setOpen(true);
                        },
                    })}
                    data={data}
                    loading={isLoading}
                /> */}
                <CollapsibleDataTable
                    loading={isLoading}
                    columns={useColumns({
                        onEdit: (val) => {
                            setCurrent(val)
                            setOpen(true)
                            setChild_current({} as Category)
                        },
                        onEdit2: (val) => {
                            setChild_current(val)
                            setOpen(true)
                            setCurrent({} as Category)
                        },
                        onAdd: () => {
                            setChild_current({} as Category)
                            setCurrent({} as Category)
                            setOpen(true)
                        },
                    })}
                    data={data?.map((f: any) => ({
                        ...f,
                        type: "parent",
                        subRows: f.children,
                    }))}
                    rowColor={(val) =>
                        val.type !== "parent" ? "bg-border/50" : ""
                    }
                    viewAll
                />
            </div>
            <ControlName
                open={open}
                setOpen={setOpen}
                current={current}
                child_current={child_current}
            />
        </div>
    )
}
