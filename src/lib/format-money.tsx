import { ClassNameValue } from "tailwind-merge"

export function formatMoney(
    amount?: number | string,
    className?: ClassNameValue,
    suffix?: boolean,
    t?: (key: string) => string,
) {
    const [integerPart, decimalPart] =
        amount ? amount.toString().split(".") : []
    const newIntegerPart = integerPart?.replace(/\B(?=(\d{3})+(?!\d))/g, " ")

    const suffixText = suffix && t ? ` ${t("so'm")}` : ""

    if (amount) {
        if (decimalPart && +decimalPart > 0) {
            return (
                <span className={`text-nowrap ${className}`} dir="ltr">
                    {newIntegerPart}.{decimalPart}
                    {suffixText}
                </span>
            )
        } else {
            return (
                <span className={`text-nowrap ${className}`} dir="ltr">
                    {newIntegerPart}
                    {suffixText}
                </span>
            )
        }
    } else {
        return (
            <span className={`text-nowrap ${className}`} dir="ltr">
                0{suffixText}
            </span>
        )
    }
}
