import React, { createContext, useContext, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"

const LanguageContext = createContext<{
    name: string
    setName: React.Dispatch<React.SetStateAction<string>>
} | null>(null)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { i18n } = useTranslation()
    const [name, setName] = useState(
        i18n.language === "uz" ? "name_uz" : "name_fa",
    )

    const contextValue = useMemo(() => ({ name, setName }), [name])

    return (
        <LanguageContext.Provider value={contextValue}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguage = () => {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error("useLanguage must be used within LanguageProvider")
    }
    return context
}
