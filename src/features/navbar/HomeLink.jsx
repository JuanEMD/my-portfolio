
const HomeLink = ({ href, label, children }) => {
    const homeLinkClasses = "max-w-fit font-bold text-primary text-3xl hover:scale-110 transition duration-300 ease-in-out";

    return (
        <a href={href} aria-label={label} className={homeLinkClasses}>
            {children}
        </a>
    )
}

export default HomeLink;
