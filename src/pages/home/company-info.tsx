import Image from '@/assets/media/2.jpg'

const CompanyInfo = () => {
    return (
        <div className="flex w-full p-2 md:p-5 bg-background rounded-3xl gap-5">
            <img
                src={Image}
                alt="company image"
                className="rounded-3xl hidden md:block w-1/2"
            />
            <div
                style={{
                    position: "relative",
                    overflow: "hidden",
                }}
                className="flex-1">
                <iframe
                    loading="lazy"
                    className="w-full h-full rounded-3xl"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3300.29614363578!2d67.4217998!3d37.2423721!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38cad3cdf5e4d2a5%3A0xdef195c7a83a3776!2sAiritom%20Free%20Zone!5e1!3m2!1suz!2s!4v1738822330795!5m2!1suz!2s"
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
