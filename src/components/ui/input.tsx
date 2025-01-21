import * as React from "react"

import { cn } from "@/lib/utils"
import { Eye, EyeOff, Search } from "lucide-react"
import { ClassNameValue } from "tailwind-merge"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    fullWidth?: boolean
    suffix?: React.ReactNode
    prefixIcon?: React.ReactNode
    wrapperClassName?: ClassNameValue
    onIconClick?: () => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            type,
            fullWidth,
            suffix,
            prefixIcon,
            wrapperClassName,
            onIconClick,
            ...props
        },
        ref,
    ) => {
        const [hide, setHide] = React.useState<boolean>(true)
        const iconClassnames = `absolute right-1 top-1 text-muted-foreground p-1 box-content cursor-pointer backdrop-blur z-2 ${props.disabled && "pointer-events-none cursor-not-allowed opacity-50"}`

        return (
            <div
                className={` ${props.hidden ? "h-0" : "h-10"} relative ${wrapperClassName}`}>
                {type === "search" && (
                    <div
                        className="absolute top-[1px] right-[1px] text-muted-foreground px-4 py-[3px] rounded-r-md box-content cursor-pointer backdrop-blur z-1 bg-muted h-8 flex items-center"
                        onClick={onIconClick}>
                        <Search width={18} />
                    </div>
                )}
                {!!prefixIcon && (
                    <span className="absolute left-1 top-1 text-muted-foreground p-1 box-content cursor-pointer backdrop-blur z-1">
                        {prefixIcon}
                    </span>
                )}
                <input
                    type={
                        type === "password" ?
                            hide ?
                                "password"
                            :   "text"
                        :   type
                    }
                    className={cn(
                        "flex h-10 w-full rounded-md border bg-background border-input px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                        className,
                        (type === "search" || !!prefixIcon) && "pr-16",
                        (type === "password" || !!suffix) && "pr-8",
                    )}
                    ref={ref}
                    {...props}
                    hidden={props.hidden}
                />
                {type === "password" &&
                    (hide ?
                        <Eye
                            width={18}
                            className={iconClassnames}
                            onClick={() => setHide(false)}
                        />
                    :   <EyeOff
                            width={18}
                            className={iconClassnames}
                            onClick={() => setHide(true)}
                        />)}
                {!!suffix && (
                    <span
                        className={`absolute right-1 top-1 text-muted-foreground p-1 box-content cursor-pointer backdrop-blur z-1 ${props.disabled && "pointer-events-none cursor-not-allowed opacity-50"}`}>
                        {suffix}
                    </span>
                )}
            </div>
        )
    },
)
Input.displayName = "Input"

export { Input }
