"use client"

import { useCallback, useRef, useState } from "react"

interface ZoomImageProps {
    src: string
    alt: string
}

export function ZoomImage({ src, alt }: ZoomImageProps) {
    const [showMagnifier, setShowMagnifier] = useState(false)
    const [[x, y], setXY] = useState([0, 0])
    const containerRef = useRef<HTMLDivElement>(null)

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!containerRef.current) return

            const elem = containerRef.current
            const { left, top, width, height } = elem.getBoundingClientRect()

            if (
                typeof e.clientX === "undefined" ||
                typeof e.clientY === "undefined"
            )
                return

            const newX = Math.max(0, Math.min((e.clientX - left) / width, 1))
            const newY = Math.max(0, Math.min((e.clientY - top) / height, 1))

            setXY([newX * width, newY * height])
        },
        [],
    )

    const magnifierSize = 200
    const zoomLevel = 1.2

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full overflow-hidden cursor-none hover:cursor-zoom-in"
            onMouseEnter={() => setShowMagnifier(true)}
            onMouseLeave={() => setShowMagnifier(false)}
            onMouseMove={handleMouseMove}>
            <img src={src} alt={alt} className="object-cover" />
            {showMagnifier && containerRef.current && (
                <div
                    style={{
                        position: "absolute",
                        left: `${Math.max(0, Math.min(x - magnifierSize / 2, containerRef.current.offsetWidth - magnifierSize))}px`,
                        top: `${Math.max(0, Math.min(y - magnifierSize / 2, containerRef.current.offsetHeight - magnifierSize))}px`,
                        width: `${magnifierSize}px`,
                        height: `${magnifierSize}px`,
                        border: "2px solid #fff",
                        borderRadius: "50%",
                        pointerEvents: "none",
                        overflow: "hidden",
                        boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                    }}>
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            backgroundImage: `url(${src})`,
                            backgroundPosition: `-${x * zoomLevel - magnifierSize / 2}px -${y * zoomLevel - magnifierSize / 2}px`,
                            backgroundSize: `${containerRef.current.offsetWidth * zoomLevel}px ${containerRef.current.offsetHeight * zoomLevel}px`,
                        }}
                    />
                </div>
            )}
            <style>{`
                .hover\\:cursor-zoom-in:hover {
                    cursor:
                        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'%3E%3C/circle%3E%3Cline x1='21' y1='21' x2='16.65' y2='16.65'%3E%3C/line%3E%3C/svg%3E")
                            20 20,
                        zoom-in;
                }
            `}</style>
        </div>
    )
}
