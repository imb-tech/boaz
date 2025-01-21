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
        <div className="flex flex-col-reverse md:flex-row items-start gap-5 w-full h-full">
            {slides?.length > 2 && (
                <Carousel
                    className="h-[70px] md:h-[490px] md:!w-[70px]"
                    opts={{ dragFree: true, align: "start" }}>
                    <CarouselContent className="flex flex-row md:flex-col h-[490px] my-1 mx-0.5">
                        {slides?.map((m, i) => (
                            <CarouselItem
                                key={i}
                                className="basis-auto !h-20 pt-2 cursor-pointer"
                                onClick={() => onThumbClick(i)}>
                                <div
                                    className={cn(
                                        " bg-white w-full h-full flex items-center justify-center object-cover rounded-xl overflow-hidden",
                                        selectedIndex === i &&
                                            "ring-2 ring-primary",
                                    )}>
                                    <CustomImage
                                        src={m}
                                        alt={`Product image ${i}`}
                                        contain
                                        className="h-[90%] w-full max-w-full object-contain"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute top-2 !min-h-6 !max-h-6 !h-6 bg-accent/80" />
                    <CarouselNext className="absolute bottom-2 !min-h-6 !max-h-6 !h-6 bg-accent/80" />
                </Carousel>
            )}
            {slides?.length > 1 ?
                <Carousel
                    className="rounded-lg max-w-full w-full h-full"
                    opts={{ loop: true, align: "start" }}
                    setApi={(emblaMainApi1) => setEmblaMainApi(emblaMainApi1)}>
                    <CarouselContent className="flex h-[520px] items-center">
                        {slides?.map((m, i) => (
                            <CarouselItem key={i} className="w-full h-full">
                                <div
                                    className={cn(
                                        "w-full h-full flex items-center justify-center object-cover rounded-xl bg-background",
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
            :   <CustomImage
                    src={slides[0]}
                    alt={`Product image ${0}`}
                    contain
                    className="h-[490px] object-cover max-w-full"
                />
            }
        </div>
    )
}
