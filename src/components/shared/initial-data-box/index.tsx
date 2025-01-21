"use client"

import Spinner from "@/components/ui/spinner"
import { AlertCircle } from "lucide-react"
import React, { memo } from "react"

interface InitialDataBoxProps {
    message?: string
    isError?: boolean
    isLoading?: boolean
}

const InitialDataBox: React.FC<InitialDataBoxProps> = ({
    message = "Ma'lumotlarni olishda xatolik yuzaga keldi",
    isError = false,
    isLoading,
}) => {
    return (
        isLoading ?
            <div className="p-20 flex items-center justify-center bg-background">
                <Spinner size="md" />
            </div>
        : isError ?
            <div className="bg-background p-4 flex items-center justify-center my-2">
                <div
                    className={`w-full bg-red-50 rounded-lg p-4 transition-all duration-300 ease-in-out`}
                    role="alert">
                    <div className="flex items-start gap-3 w-full justify-center">
                        <AlertCircle
                            className="h-5 w-5 text-red-400"
                            aria-hidden="true"
                        />
                        <p className="text-sm font-medium text-red-800">
                            {message}
                        </p>
                    </div>
                </div>
            </div>
        :   ""
    )
}

export default memo(InitialDataBox)
