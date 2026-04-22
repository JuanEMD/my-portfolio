import Image from "next/image";
import Tooltip from "../common/tooltip";

const IconWithContainer = ({ icon, name, iconWidth = 20, iconHeight = 20 }) => {

    const containerClasses = "flex justify-center items-center bg-white w-25 h-25 p-2 rounded-full hover:scale-110 transition-all duration-200";

    return (
        <div className={containerClasses}>
            {!icon ? <Image src={icon} alt={name} width={iconWidth} height={iconHeight} /> : <div className="w-20 h-20 rounded-full bg-white" />}
        </div>
    )
}

export default IconWithContainer;