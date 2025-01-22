const CompanyInfo = () => {
    return (
        <div className="flex w-full p-2 md:p-5 bg-background rounded-3xl gap-5">
            <img
                src="https://placehold.jp/500x500.png"
                alt="company image"
                className="rounded-3xl hidden md:block"
            />
            <div
                style={{
                    position: "relative",
                    overflow: "hidden",
                }}
                className="flex-1">
                <a href="https://yandex.uz/maps/10335/tashkent/?utm_medium=mapframe&utm_source=maps"></a>
                <a href="https://yandex.uz/maps/10335/tashkent/?ll=69.236212%2C41.201160&mode=whatshere&utm_medium=mapframe&utm_source=maps&whatshere%5Bpoint%5D=69.236299%2C41.201063&whatshere%5Bzoom%5D=18.74&z=18.74"></a>
                <iframe
                    loading="lazy"
                    className="w-full h-full rounded-3xl"
                    src="https://yandex.uz/map-widget/v1/?ll=69.236212%2C41.201160&mode=whatshere&whatshere%5Bpoint%5D=69.236299%2C41.201063&whatshere%5Bzoom%5D=18.74&z=18.74"
                    height="400"
                    allowFullScreen
                    style={{
                        position: "relative",
                    }}></iframe>
            </div>
        </div>
    )
}

export default CompanyInfo
