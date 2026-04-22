import LinkButtonWithIcon from "@/components/common/button/LinkButtonWithIcon";
import Github from "@/components/icons/Github";
import Linkedin from "@/components/icons/Linkedin";
import Mail from "@/components/icons/Mail"
import { useTranslation } from "next-i18next/pages";

const Footer = ({ personalInfo }) => {
    const { mail, linkedinUrl, githubUrl } = personalInfo;
    const { t } = useTranslation("translation");

    const footerClasses = "p-4 my-10 mx-auto w-full";

    return (
        <footer className={footerClasses}>
            <div className="w-full flex justify-between">
                <span className="text-primary">{t("footer.description")}</span>
                <div className="flex gap-3">
                    <span>
                        <LinkButtonWithIcon url={mail} >
                            <Mail className="w-4 h-4 fill-primary" />
                        </LinkButtonWithIcon>
                    </span>
                    <span>
                        <LinkButtonWithIcon url={linkedinUrl} target="_blank">
                            <Linkedin className="w-4 h-4 fill-primary" />
                        </LinkButtonWithIcon >
                    </span>
                    <span>
                        <LinkButtonWithIcon url={githubUrl} target="_blank">
                            <Github className="w-4 h-4 fill-primary" />
                        </LinkButtonWithIcon>
                    </span>
                </div>
            </div>
        </footer>
    )
}

export default Footer;