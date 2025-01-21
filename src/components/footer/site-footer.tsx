import { Link } from "@tanstack/react-router"
import {
    Facebook,
    Instagram,
    TextIcon as Telegram,
    Youtube,
} from "lucide-react"

export default function SiteFooter() {
    return (
        <footer className="w-full py-12 pb-6 bg-background mt-10">
            <div className="xl:container !max-w-[1360px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-6">
                <div className="space-y-4">
                    <h3 className="text-md font-semibold">Biz haqimizda</h3>
                    <nav className="flex flex-col space-y-2">
                        <Link
                            href="#"
                            className="hover:underline text-muted-foreground text-sm">
                            Topshirish punktlari
                        </Link>
                        <Link
                            href="#"
                            className="hover:underline text-muted-foreground text-sm">
                            Vakansiyalar
                        </Link>
                    </nav>
                </div>

                <div className="space-y-4">
                    <h3 className="text-md font-semibold">
                        Foydalanuvchilarga
                    </h3>
                    <nav className="flex flex-col space-y-2">
                        <Link
                            href="#"
                            className="hover:underline text-muted-foreground text-sm">
                            Biz bilan bog'lanish
                        </Link>
                        <Link
                            href="#"
                            className="hover:underline text-muted-foreground text-sm">
                            Savol-Javob
                        </Link>
                    </nav>
                </div>

                <div className="space-y-4">
                    <h3 className="text-md font-semibold">Tadbirkorlarga</h3>
                    <nav className="flex flex-col space-y-2">
                        <Link
                            href="#"
                            className="hover:underline text-muted-foreground text-sm">
                            Boazda soting
                        </Link>
                        <Link
                            href="#"
                            className="hover:underline text-muted-foreground text-sm">
                            Sotuvchi kabinetiga kirish
                        </Link>
                        <Link
                            href="#"
                            className="hover:underline text-muted-foreground text-sm">
                            Topshirish punktini ochish
                        </Link>
                    </nav>
                </div>

                <div className="space-y-4">
                    <h3 className="text-md font-semibold">
                        Ilovani yuklab olish
                    </h3>
                    <div className="flex gap-4">
                        <Link href="#" className="hover:text-primary">
                            <Instagram className="h-6 w-6" />
                            <span className="sr-only">Instagram</span>
                        </Link>
                        <Link href="#" className="hover:text-primary">
                            <Telegram className="h-6 w-6" />
                            <span className="sr-only">Telegram</span>
                        </Link>
                        <Link href="#" className="hover:text-primary">
                            <Facebook className="h-6 w-6" />
                            <span className="sr-only">Facebook</span>
                        </Link>
                        <Link href="#" className="hover:text-primary">
                            <Youtube className="h-6 w-6" />
                            <span className="sr-only">YouTube</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom Links */}
            <div className="xl:container !max-w-[1360px] mx-auto px-4 md:px-6 mt-8 pt-4 border-t">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex gap-4">
                        <Link href="#" className="hover:underline text-sm">
                            Maxfiylik kelishuvi
                        </Link>
                        <Link href="#" className="hover:underline text-sm">
                            Foydalanuvchi kelishuvi
                        </Link>
                    </div>
                    <p>
                        ©2025© XK MCH.J «BOAZ». STIR 309376127. Barcha
                        huquqlar himoyalangan»
                    </p>
                </div>
            </div>
        </footer>
    )
}
