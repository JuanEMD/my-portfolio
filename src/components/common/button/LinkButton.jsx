import Link from "next/link";

const LinkButton = ({ children, url, target, props }) => {

    const buttonClasses = `flex w-fit py-1 px-2 rounded-lg text-btn-text bg-btn-bg hover:bg-btn-bg/90 font-medium transition-colors duration-300 border border-btn-border`;

    return (<Link href={url} className={buttonClasses} target={target} {...props}>
        {children}
    </Link>)
}

export default LinkButton;