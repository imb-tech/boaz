import React from "react"

type CarouselProps = {
    images: string[]
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
    return (
        <div>
            <div className="max-w-4xl mx-auto text-center">
                <h3 className="text-3xl">Title title title</h3>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Facere quae autem fugit reiciendis facilis tempora possimus
                    porro vitae. Dicta aliquam fuga numquam, modi obcaecati
                    neque minus. Nostrum eius facere magni.
                </p>
            </div>
            <div className="relative flex overflow-x-hidden">
                <div className="py-12 animate-marquee whitespace-nowrap flex">
                    {images.map((image, index) => (
                        <div
                            className={`text-4xl mx-4 ${index % 2 === 0 ? "transform: rotate-2" : "transform: -rotate-2"} transition-all duration-300 hover:rotate-0`}
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
                    {images.map((image, index) => (
                        <div
                            className={`text-4xl mx-4 ${index % 2 === 1 ? "transform: rotate-2" : "transform: -rotate-2"} transition-all duration-300 hover:rotate-0`}
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
