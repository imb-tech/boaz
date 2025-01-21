import afgTranslation from "@/locales/afg.json"
import uzTranslation from "@/locales/uz.json"
import i18n from "i18next"
import languageDetector from "i18next-browser-languagedetector"
import Backend from "i18next-http-backend"
import { initReactI18next } from "react-i18next"

i18n.use(Backend)
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "uz",
        debug: false,
        resources: {
            uz: { translation: uzTranslation },
            afg: { translation: afgTranslation },
        },
    })

export default i18n
