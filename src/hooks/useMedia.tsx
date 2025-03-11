import { useEffect, useState } from "react"

type Breakpoints = {
    xs: boolean
    sm: boolean
    md: boolean
    lg: boolean
    xl: boolean
    "2xl": boolean
}

const breakpoints: Record<keyof Breakpoints, string> = {
    xs: "(max-width: 475px)",
    sm: "(min-width: 640px)",
    md: "(min-width: 768px)",
    lg: "(min-width: 1024px)",
    xl: "(min-width: 1280px)",
    "2xl": "(min-width: 1536px)",
}

export function useMedia(): Breakpoints {
    const getMatches = (): Breakpoints =>
        Object.keys(breakpoints).reduce((acc, key) => {
            const query = breakpoints[key as keyof Breakpoints]
            acc[key as keyof Breakpoints] = window.matchMedia(query).matches
            return acc
        }, {} as Breakpoints)

    const [matches, setMatches] = useState<Breakpoints>(getMatches)

    useEffect(() => {
        const handler = () => setMatches(getMatches())

        const mediaQueryLists = Object.values(breakpoints).map((query) =>
            window.matchMedia(query),
        )

        mediaQueryLists.forEach((mql) =>
            mql.addEventListener("change", handler),
        )

        return () => {
            mediaQueryLists.forEach((mql) =>
                mql.removeEventListener("change", handler),
            )
        }
    }, [])

    return matches
}
