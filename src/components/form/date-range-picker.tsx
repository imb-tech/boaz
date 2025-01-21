import { cn } from "@/lib/utils"
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form"
import { ClassNameValue } from "tailwind-merge"
import { CalendarProps } from "../ui/calendar"
import { DateRangePicker } from "../ui/date-range-picker"
import ErrorMessage from "../ui/error-message"
import { Label } from "../ui/label"

interface IProps<IForm extends FieldValues> {
    methods: UseFormReturn<IForm>
    name: Path<IForm>
    label?: string
    wrapperClassName?: ClassNameValue
    hideError?: boolean
    disabled?: boolean
    format?: string
}

export default function FormDateRangePicker<IForm extends FieldValues>({
    methods,
    name,
    label,
    hideError = false,
    disabled,
    format = "dd/MM/yyyy",
    wrapperClassName,
    ...calendarProps
}: IProps<IForm> & CalendarProps) {
    const {
        formState: { errors },
    } = methods

    return (
        <fieldset className={cn("flex flex-col gap-2", wrapperClassName)}>
            {label && (
                <Label
                    htmlFor={name}
                    className={cn(
                        !!errors?.[name] && "text-destructive",
                        "cursor-pointer",
                    )}>
                    {label}
                </Label>
            )}
            <Controller
                name={name}
                control={methods.control}
                render={({ field }) => (
                    <DateRangePicker
                        date={field.value}
                        setDate={field.onChange}
                        format={format}
                        placeholder={label}
                        disabled={field.disabled || disabled}
                        className="w-full"
                        {...calendarProps}
                    />
                )}
            />
            {!hideError && errors[name] && (
                <ErrorMessage className="-mt-1">
                    {errors[name].message as string}
                </ErrorMessage>
            )}
        </fieldset>
    )
}
