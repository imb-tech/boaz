import { useNavigate, useSearch } from "@tanstack/react-router"
import { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { ClassNameValue } from "tailwind-merge"
import { Input } from "../ui/input"

export default function ParamInput({
    className,
    fullWidth,
    clearOthers = true,
    paramName = "param",
}: ParamInputProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()
    const params: any = useSearch({ from: "__root__" })

    const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const { t } = useTranslation()
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = e.target.value

        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current)
        }
        debounceTimeoutRef.current = setTimeout(() => {
            if (newSearchTerm) {
                navigate({
                    search:
                        clearOthers ?
                            ({
                                [paramName]: newSearchTerm,
                            } as any)
                        :   {
                                ...params,
                                [paramName]: newSearchTerm,
                            },
                })
            } else {
                navigate({
                    search: {
                        ...params,
                        [paramName]: undefined,
                        search: undefined,
                    },
                })
            }
        }, 300)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const searchValue = inputRef.current?.value
            if (searchValue) {
                navigate({
                    to: "/categories",
                    search:
                        clearOthers ?
                            ({
                                [paramName]: searchValue,
                                search: searchValue,
                            } as any)
                        :   {
                                ...params,
                                [paramName]: searchValue,
                                search: searchValue,
                            },
                })
            } else {
                navigate({
                    search: {
                        ...params,
                        [paramName]: undefined,
                        search: undefined,
                    },
                })
            }
        }
    }

    useEffect(() => {
        if (params.search || params.q) {
            if (inputRef.current) {
                inputRef.current.value = params.q || params.search || ""
            }
        } else {
            if (inputRef.current) {
                inputRef.current.value = ""
            }
        }
    }, [params.search, params.q, inputRef.current])

    return (
        <>
            <Input
                placeholder={t("qidirish")}
                type="search"
                className={`${className}`}
                fullWidth={fullWidth}
                ref={inputRef}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onIconClick={() =>
                    navigate({
                        to: "/categories",
                        search: {
                            ...params,
                            q: inputRef.current?.value,
                            search: inputRef.current?.value,
                        },
                    })
                }
                wrapperClassName="w-full bbg-foreground"
            />
        </>
    )
}

interface ParamInputProps {
    className?: ClassNameValue
    fullWidth?: boolean
    clearOthers?: boolean
    paramName?: string
}
