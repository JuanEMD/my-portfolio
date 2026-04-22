import Image from "next/image";

const PillWithIcon = ({ icon, text, className }) => {
    const pillClasses = `${className} bg-pill-bg border border-pill-border text-pill-text rounded-xl flex justify-start items-center gap-1 py-1 px-2 text-sm`;
    return (
        <span className={pillClasses}>
            {icon && <Image src={icon} alt={text} width={20} height={20} />} {text}
        </span>)
}

export default PillWithIcon;