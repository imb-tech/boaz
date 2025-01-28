import CustomImage from "@/components/custom/image"
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import { useCallback, useEffect, useState } from "react"

export default function ProductCarousel({
    slides,
}: {
    slides: (string | undefined)[]
}) {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [emblaMainApi, setEmblaMainApi] = useState<CarouselApi>()

    const onThumbClick = useCallback(
        (index: number) => {
            if (!emblaMainApi) return
            emblaMainApi.scrollTo(index)
            setSelectedIndex(index)
        },
        [emblaMainApi],
    )

    const onSelect = useCallback(() => {
        if (!emblaMainApi) return
        const newIndex = emblaMainApi.selectedScrollSnap()
        setSelectedIndex(newIndex)
    }, [emblaMainApi])

    useEffect(() => {
        if (!emblaMainApi) return

        emblaMainApi.on("select", onSelect)
        emblaMainApi.on("reInit", onSelect)

        onSelect()
    }, [emblaMainApi, onSelect])

    return (
        <div className="flex flex-col-reverse md:flex-row items-start gap-5 border border-primary rounded-lg w-[240px]">
            {slides?.length > 1 ?
                <Carousel
                    className="rounded-lg max-w-full w-[240px]"
                    opts={{ loop: true, align: "start" }}
                    setApi={(emblaMainApi1) => setEmblaMainApi(emblaMainApi1)}>
                    <CarouselContent className="flex items-center w-[240px]">
                        {slides?.map((m, i) => (
                            <CarouselItem key={i} className="w-[240px] h-[214px]">
                                <div
                                    className={cn(
                                        "w-[240px] h-full flex items-center justify-center object-cover rounded-xl bg-background",
                                    )}>
                                    <CustomImage
                                        src={m}
                                        alt={`Product image ${i}`}
                                        contain
                                        className="h-[100%] w-full max-w-full object-contain"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute top-1/2 left-2 -translate-y-1/2 scale-125" />
                    <CarouselNext className="absolute top-1/2 right-2 -translate-y-1/2 scale-125" />
                </Carousel>
            :   <div
                    className={cn(
                        "w-[240px] h-[220px] flex items-center justify-center object-cover rounded-xl bg-background",
                    )}>
                    <CustomImage
                        src={slides[0]}
                        alt={`Product image ${0}`}
                        contain
                        className="h-2/3 w-full max-w-full object-contain"
                    />
                </div>
            }
        </div>
    )
}
