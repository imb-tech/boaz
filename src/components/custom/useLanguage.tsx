import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import Select from "../ui/select"
import { useLanguage } from "./languageContext"

const LanguageSwitcher = () => {
    const { name, setName } = useLanguage()
    const { i18n } = useTranslation()
    const queryClient = useQueryClient()

    useEffect(() => {
        if (name === "name_uz") {
            i18n.changeLanguage("uz")
        } else if (name === "name_fa") {
            i18n.changeLanguage("afg")
        }
    }, [name, i18n])

    const handleChangeLanguage = (lang: string) => {
        setName(lang)
        i18n.changeLanguage(lang)
        queryClient.clear()
    }

    return (
        <Select
            label={i18n.language}
            value={name}
            setValue={(val) => handleChangeLanguage(val as string)}
            returnVal="id"
            options={[
                {
                    name: "Uzb",
                    id: "name_uz",
                },
                {
                    name: "دری",
                    id: "name_fa",
                },
            ]}
        />
    )
}

export default LanguageSwitcher
