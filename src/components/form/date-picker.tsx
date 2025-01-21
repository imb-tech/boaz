import { cn } from "@/lib/utils"
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form"
import { ClassNameValue } from "tailwind-merge"
import { CalendarProps } from "../ui/calendar"
import { DatePicker } from "../ui/date-picker"
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

export default function FormDatePicker<IForm extends FieldValues>({
    methods,
    name,
    label,
    hideError = false,
    disabled,
    format,
    ...calendarProps
}: IProps<IForm> & CalendarProps) {
    const {
        formState: { errors },
    } = methods
    return (
        <fieldset className="flex flex-col gap-2">
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
                    <DatePicker
                        date={field.value}
                        setDate={field.onChange}
                        format={format}
                        placeholder={label}
                        disabled={field.disabled || disabled}
                        fullWidth
                        {...calendarProps}
                        defaultMonth={
                            field.value ?
                                new Date(
                                    field.value?.toString()?.replace("/", "-"),
                                )
                            :   new Date()
                        }
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
