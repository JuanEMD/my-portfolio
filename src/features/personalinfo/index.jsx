import Image from "next/image";
import { useTranslation } from "next-i18next/pages";
import profilePhoto from "../../../public/images/jemd_formal_smile.png";
import { targetAnimationElements } from "./const";
import Linkedin from "@/components/icons/Linkedin";
import Mail from "@/components/icons/Mail";
import Github from "@/components/icons/Github";
import LinkButtonWithIcon from "@/components/common/button/LinkButtonWithIcon";
import { useAnimationObserver } from "@/hooks/useAnimationObserver";
import { DELAY_BASE } from "@/constants/animation";

const PersonalInfo = ({ className, info }) => {
    const { name, role, descriptionPart1, descriptionHighlight, descriptionPart2, mail, linkedinUrl, githubUrl } = info;
    const { t } = useTranslation("translation");

    useAnimationObserver({ targetElements: targetAnimationElements });

    const personalInfoClasses = `${className} grid sm:grid-cols-[auto_1fr] gap-10`;

    return (
        <div className={personalInfoClasses}>
            <div className="grid items-center justify-center">
                <Image
                    id="profile-photo"
                    width={170}
                    height={170}
                    src={profilePhoto}
                    alt="Profile picture"
                    className="opacity-0 rounded-full object-cover border-2 border-primary"
                    placeholder="blur"
                    priority
                />
            </div>
            <div className="grid gap-2">
                <h1 id="name" className="opacity-0 text-3xl text-primary font-medium" style={{ animationDelay: `${DELAY_BASE}ms` }} >
                    {name}
                </h1>
                <h2 id="role" className="opacity-0 text-3xl text-secondary font-medium" style={{ animationDelay: `${DELAY_BASE * 2}ms` }} >
                    {t(role)}
                </h2>
                <p id="description" className="opacity-0 text-md text-primary max-w-140" style={{ animationDelay: `${DELAY_BASE * 4}ms` }}>
                    {t(descriptionPart1)}
                    <span className="text-secondary font-bold">{t(descriptionHighlight)}</span>
                    {t(descriptionPart2)}
                </p>
                <div className="flex gap-3">
                    <LinkButtonWithIcon id="contact-me" url={`mailto:${mail}`} ariaLabel={t("personalInfo.contactMe")} className="opacity-0" style={{ animationDelay: `${DELAY_BASE}ms` }} >
                        <Mail className="w-4 h-4 fill-icon" />
                    </LinkButtonWithIcon>
                    <LinkButtonWithIcon id="linkedin" url={linkedinUrl} target="_blank" ariaLabel="LinkedIn" className="opacity-0" style={{ animationDelay: `${DELAY_BASE * 2}ms` }}>
                        <Linkedin className="w-4 h-4 fill-icon" />
                    </LinkButtonWithIcon>
                    <LinkButtonWithIcon id="github" url={githubUrl} target="_blank" ariaLabel="GitHub" className="opacity-0" style={{ animationDelay: `${DELAY_BASE * 3}ms` }}>
                        <Github className="w-4 h-4 fill-icon" />
                    </LinkButtonWithIcon>
                </div>
            </div>
        </div >
    )
}

export default PersonalInfo;
