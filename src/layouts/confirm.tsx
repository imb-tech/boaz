import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { createContext, KeyboardEvent, ReactNode, useState } from "react"
import { useTranslation } from "react-i18next"
interface ConfirmContextProps {
    confirm: (options: UseConfirmProps) => Promise<boolean>
}

export const ConfirmContext = createContext<ConfirmContextProps | undefined>(
    undefined,
)

interface UseConfirmProps {
    title?: ReactNode
    description?: ReactNode
}

export const ConfirmProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [resolvePromise, setResolvePromise] = useState<
        (value: boolean) => void
    >(() => {})
    const [dialogProps, setDialogProps] = useState<UseConfirmProps>({})
    const { t } = useTranslation()
    const confirm = (options: UseConfirmProps) => {
        setDialogProps(options)
        setIsOpen(true)
        return new Promise<boolean>((resolve) => {
            setResolvePromise(() => resolve)
        })
    }

    const handleConfirm = () => {
        setIsOpen(false)
        resolvePromise(true)
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter") {
            event.preventDefault()
            handleConfirm()
        }
    }

    const handleCancel = () => {
        setIsOpen(false)
        resolvePromise(false)
    }

    return (
        <ConfirmContext.Provider value={{ confirm }}>
            {children}
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogContent onKeyDown={handleKeyDown}>
                    <AlertDialogTitle>
                        {dialogProps.title || t("Tasdiqlash")}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {dialogProps.description}
                    </AlertDialogDescription>
                    <AlertDialogFooter className="!flex !flex-row items-center gap-4">
                        <AlertDialogCancel
                            onClick={handleCancel}
                            className="m-0 w-full">
                            {t("Bekor qilish")}
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleConfirm}
                            className="w-full">
                            {t("Tasdiqlash")}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </ConfirmContext.Provider>
    )
}
