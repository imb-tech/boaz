import Loader from "@/components/ui/loader"
import { cn } from "@/lib/utils"
import { useIsFetching } from "@tanstack/react-query"

const Loading = ({
    children,
    loading,
    className,
}: {
    children: React.ReactNode
    loading: boolean
    className?: string
}) => {
    const isFetching = useIsFetching({ queryKey: ["user/modules/"] })
    return (
        <>
            {loading || isFetching ?
                <div
                    className={cn(
                        "w-full h-[80vh] flex items-center justify-center",
                        className,
                    )}>
                    {<Loader size="responsive" />}
                </div>
            :   children}
        </>
    )
}

export default Loading
