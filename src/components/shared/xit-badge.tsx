import { Badge } from "@/components/ui/badge"

interface XitBadgeProps {
    text?: string
    className?: string
}

export default function XitBadge({ text = "ХИТ", className }: XitBadgeProps) {
    return (
        <Badge
            className={`
        bg-gradient-to-r from-blue-600 to-purple-600 
        text-white font-medium px-3 py-1 
        border-none hover:from-blue-600 hover:to-purple-600
        transform -skew-x-12 rounded-md
        ${className}
      `}>
            {text}
        </Badge>
    )
}
