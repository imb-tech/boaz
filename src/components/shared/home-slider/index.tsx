import Image1 from "@/assets/media/1.jpg"
import Image10 from "@/assets/media/10.jpg"
import Image2 from "@/assets/media/2.jpg"
import Image3 from "@/assets/media/3.jpg"
import Image4 from "@/assets/media/4.jpg"
import Image5 from "@/assets/media/5.jpg"
import Image6 from "@/assets/media/6.jpg"
import Image7 from "@/assets/media/7.jpg"
import Image8 from "@/assets/media/8.jpg"
import Image9 from "@/assets/media/9.jpg"
import React from "react"

type CarouselProps = {
    images?: string[] | undefined
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
    const defaultImages = [
        Image1,
        Image2,
        Image3,
        Image4,
        Image5,
        Image6,
        Image7,
        Image8,
        Image9,
        Image10,
    ]

    return (
        <div>
            <div className="relative flex overflow-x-hidden">
                <div className="py-12 animate-marquee whitespace-nowrap flex">
                    {(images || defaultImages)?.map((image, index) => (
                        <div
                            className={`text-4xl mx-4 transition-all duration-300`}
                            key={index}>
                            <img
                                src={image}
                                alt={`Carousel ${index}`}
                                className="h-64 min-w-[300px] rounded-3xl object-cover"
                            />
                        </div>
                    ))}
                </div>

                <div className="absolute top-0 py-12 animate-marquee2 whitespace-nowrap flex">
                    {(images || defaultImages)?.map((image, index) => (
                        <div
                            className={`text-4xl mx-4 transition-all duration-300`}
                            key={index}>
                            <img
                                src={image}
                                alt={`Carousel ${index}`}
                                className="h-64 min-w-[300px] rounded-3xl object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Carousel
