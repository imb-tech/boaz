import { Link } from "@tanstack/react-router"
import { Clock4, Phone } from "lucide-react"
import { useTranslation } from "react-i18next"

export default function SiteFooter() {
    const { t } = useTranslation()
    return (
        <footer className="w-full py-12 pb-6 bg-background mt-10">
            <div className="xl:container !max-w-[1360px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-6">
                <div className="space-y-4 h-full flex flex-col pb-3">
                    <Link to="/" className="hidden md:inline flex-1">
                        <div className="flex items-center gap-1">
                            <h2 className="hidden md:inline text-3xl  font-semibold font-[Lobster] text-primary">
                                Boaz
                            </h2>
                            <h2 className="hidden md:inline text-3xl  font-semibold font-[Lobster] text-primary">
                                Market
                            </h2>
                        </div>
                    </Link>
                    <div className="flex items-center gap-1">
                        <Phone className="text-primary" size={18} />
                        <span className="text-primary text-sm">
                            +998 95 080 30 01
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock4 className="text-primary" size={18} />
                        <span className="text-sm">
                            {t("Ish vaqti")} 9:00 dan 22:00 gacha
                        </span>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-md font-semibold">
                        {t("Foydalanuvchilarga")}
                    </h3>
                    <nav className="flex flex-col space-y-2">
                        <Link
                            href="#"
                            className="hover:underline text-muted-foreground text-sm">
                            {t("Biz bilan bog'lanish")}
                        </Link>
                        <Link
                            href="#"
                            className="hover:underline text-muted-foreground text-sm">
                            {t("Savol-Javob")}
                        </Link>
                    </nav>
                </div>

                <div className="space-y-4">
                    <h3 className="text-md font-semibold">
                        {t("Tadbirkorlarga")}
                    </h3>
                    <nav className="flex flex-col space-y-2">
                        <Link
                            href="#"
                            className="hover:underline text-muted-foreground text-sm">
                            {t("Boazda soting")}
                        </Link>
                        <Link
                            href="#"
                            className="hover:underline text-muted-foreground text-sm">
                            {t("Sotuvchi kabinetiga kirish")}
                        </Link>
                        <Link
                            href="#"
                            className="hover:underline text-muted-foreground text-sm">
                            {t("Topshirish punktini ochish")}
                        </Link>
                    </nav>
                </div>
            </div>

            {/* Bottom Links */}
            <div className="xl:container !max-w-[1360px] mx-auto px-4 md:px-6 mt-8 pt-4 border-t">
                <div className="flex flex-col md:flex-row justify-start items-center gap-4 text-sm text-muted-foreground">
                    <p>
                        {t("privacy", {
                            year: new Date().getFullYear(),
                        })}
                    </p>
                </div>
            </div>
        </footer>
    )
}
