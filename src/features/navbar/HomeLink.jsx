import { useTranslation } from "next-i18next/pages";

const HomeLink = ({ href, label, children }) => {
    const { t } = useTranslation("translation");
    const homeLinkClasses = "max-w-fit font-bold text-primary text-3xl hover:scale-110 transition duration-300 ease-in-out";

    return (
        <a href={href} aria-label={t(label)} className={homeLinkClasses}>
            {t(children)}
        </a>
    )
}

export default HomeLink;
