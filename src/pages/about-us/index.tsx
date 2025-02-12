import { ProductBreadcrumb } from "@/components/shared/breadcrumb"
import { useTranslation } from "react-i18next"

export default function AboutUs() {
    const { t } = useTranslation()

    return (
        <section>
            <ProductBreadcrumb
                items={[
                    { name: "Asosiy", href: "/" },
                    { name: "Biz haqimizda" },
                ]}
            />

            <h1 className="mt-5 text-primary text-xl font-medium">
                {t("Biz haqimizda")}
            </h1>

            <div className="py-4 rounded-md bg-background">
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Quam debitis voluptatem doloremque tempora ut voluptates cum
                    fuga asperiores? Impedit accusantium eveniet totam quidem
                    commodi, quis ratione autem ut. Deserunt corporis, numquam
                    natus quaerat molestiae suscipit, atque, adipisci quis
                    nesciunt debitis iste consequuntur veniam neque nisi
                    praesentium doloremque amet. Necessitatibus fugiat odit
                    mollitia, animi cupiditate ipsam totam natus recusandae
                    soluta veniam? Distinctio nisi exercitationem mollitia,
                    nulla debitis esse, asperiores eos recusandae architecto
                    alias sunt iure minima. Adipisci, consectetur, ipsam
                    reprehenderit omnis dolore eaque eos hic corporis sed,
                    impedit dolorem? Nihil quia, consectetur omnis repellendus
                    dolorum laborum? Adipisci molestiae eligendi, optio natus
                    velit quasi nam sit quos eos officia itaque nobis
                    voluptatibus molestias, similique vel ipsa eius consequuntur
                    nesciunt quae cumque autem veritatis facilis! Sit dolorum
                    unde fuga, doloremque, at atque ipsam ipsum nostrum,
                    assumenda velit earum? Culpa quam esse cum ratione quis
                    numquam quae amet mollitia vitae delectus magni
                    exercitationem rem nemo natus at explicabo corporis,
                    molestiae dolor maxime, consequuntur ipsa quidem soluta
                    assumenda. Recusandae quod error vero ex blanditiis nulla
                    perferendis sapiente nisi accusamus ullam beatae quaerat
                    sunt, adipisci a facere. Veritatis nihil, repellat error
                    laboriosam id quo dignissimos ut harum earum alias aliquid
                    pariatur fugiat suscipit officiis expedita cum dolores
                    dolore nemo, quam cupiditate. Optio esse voluptatibus facere
                    natus exercitationem quae enim reprehenderit nobis adipisci
                    iure, illum animi rerum libero mollitia vitae? Iure optio
                    neque, exercitationem at iste pariatur reiciendis eligendi
                    fugiat numquam asperiores qui dolore voluptates quod ipsum
                    quidem quos aspernatur repudiandae possimus adipisci dicta.
                    Sequi quasi officiis aspernatur cum voluptas hic ullam,
                    deserunt veniam eius similique adipisci voluptate, natus
                    eaque. Atque iusto, maiores officia molestiae explicabo
                    architecto accusamus cupiditate quae odit ut corrupti labore
                    voluptatem quis consequuntur vel ex repellat earum ipsum
                    consequatur, ratione unde obcaecati, animi amet debitis?
                    Iure dolor laudantium illum quidem recusandae natus
                    temporibus?
                </p>
            </div>
        </section>
    )
}
