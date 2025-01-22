import Icon from "@/assets/empty.png"
import Image from "@/components/custom/image"
import { memo } from "react"
import { Fade } from "react-awesome-reveal"

const EmptyBox = () => {
    return (
        <div className="w-full py-10 flex items-center justify-center">
            <Fade duration={300}>
                <div className="flex flex-col gap-4 items-center">
                    <Image src={Icon} alt="empty" height={120} />
                    <p>Ma'lumot topilmadi</p>
                </div>
            </Fade>
        </div>
    )
}

export default memo(EmptyBox)
