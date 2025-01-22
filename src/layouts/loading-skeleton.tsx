import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const LoadingSkeleton = ({
    children,
    loading,
    length,
    showTitle,
}: {
    children: React.ReactNode
    loading: boolean
    length?: number
    showTitle?: boolean
}) => {
    return (
        <>
            {loading ?
                <div className="space-y-2 md:space-y-4">
                    {showTitle && (
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-8 w-1/4 bg-gray-200" />
                        </div>
                    )}
                    <div className="w-full grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,_minmax(14rem,_auto))] gap-2 sm:gap-4">
                        {Array(length || 12)
                            .fill(0)
                            .map((_, i) => (
                                <Card
                                    className="relative overflow-hidden rounded-2xl bg-white p-4 transition-shadow hover:shadow-lg border-none"
                                    key={i}>
                                    {/* Product image skeleton */}
                                    <Skeleton className="aspect-square w-full rounded-lg bg-gray-200" />

                                    {/* Product info skeletons */}
                                    <div className="mt-4 space-y-3">
                                        {/* Title skeleton */}
                                        <Skeleton className="h-6 w-3/4 bg-gray-200" />

                                        {/* Description skeleton - two lines */}
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-full bg-gray-200" />
                                            <Skeleton className="h-4 w-2/3 bg-gray-200" />
                                        </div>

                                        {/* Stock amount skeleton */}
                                        <div className="flex items-center gap-2">
                                            <Skeleton className="h-4 w-24 bg-gray-200" />
                                            <Skeleton className="h-4 w-12 bg-gray-200" />
                                        </div>

                                        {/* Price section skeleton */}
                                        <div className="space-y-2">
                                            {/* Old price */}
                                            <Skeleton className="h-4 w-32 bg-gray-200" />
                                            {/* New price */}
                                            <Skeleton className="h-6 w-40 bg-gray-200" />
                                        </div>
                                    </div>

                                    {/* Cart button skeleton */}
                                    <div className="absolute bottom-4 right-4">
                                        <Skeleton className="h-12 w-12 rounded-lg bg-gray-200" />
                                    </div>
                                </Card>
                            ))}
                    </div>
                </div>
            :   children}
        </>
    )
}

export default LoadingSkeleton
