import CustomImage from "@/components/custom/image"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

function Hero() {
    const slides: string[] = [
        "https://mini-io-api.texnomart.uz/newcontent/RichContent/2024-10-03/m7GLdRKkKILnev6UV6UEyyhSxICqR9vmbJII1WnK.webp",
        "https://mini-io-api.texnomart.uz/newcontent/RichContent/2024-10-03/m7GLdRKkKILnev6UV6UEyyhSxICqR9vmbJII1WnK.webp",
    ]

    return (
        <div className="flex gap-4">
            <Carousel
                className="rounded-lg max-w-full w-full"
                opts={{ loop: true, align: "start" }}>
                <CarouselContent className="flex items-center">
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
                                    className="h-full w-full max-w-full object-contain rounded-lg"
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute top-1/2 left-2 -translate-y-1/2 scale-125" />
                <CarouselNext className="absolute top-1/2 right-2 -translate-y-1/2 scale-125" />
            </Carousel>
        </div>
    )
}

export default Hero
