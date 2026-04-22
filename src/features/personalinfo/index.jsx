import Image from "next/image";
import profilePhoto from "../../../public/images/formal_smile.png";
import Linkedin from "@/components/icons/Linkedin";
import Mail from "@/components/icons/Mail";
import Github from "@/components/icons/Github";
import LinkButtonWithIcon from "@/components/common/button/LinkButtonWithIcon";
import { useTranslation } from "next-i18next/pages";

const PersonalInfo = ({ className, info }) => {
    const { name, role, description1, mail, linkedinUrl, githubUrl } = info;
    const { t } = useTranslation("translation");

    const personalInfoClasses = `${className} grid grid-cols-[auto_1fr] gap-10`;

    return (
        <section className={personalInfoClasses}>
            <div className="grid items-center">
                <Image
                    width={170}
                    height={170}
                    src={profilePhoto}
                    alt="Profile picture"
                    className="rounded-full object-cover border-2 border-primary"
                />
            </div>
            <div className="grid gap-2">
                <h2 className="text-3xl text-primary font-medium">
                    {name}
                </h2>
                <h3 className="text-3xl text-secondary font-medium ">
                    {t(role)}
                </h3>
                <p className="text-md text-primary max-w-140">
                    {t(description1)}
                </p>
                <div className="flex gap-3">
                    <LinkButtonWithIcon url={mail} label={t("personalInfo.contactMe")} >
                        <Mail className="w-4 h-4 fill-primary" />
                    </LinkButtonWithIcon>
                    <LinkButtonWithIcon url={linkedinUrl} target="_blank" label="LinkedIn" >
                        <Linkedin className="w-4 h-4 fill-primary" />
                    </LinkButtonWithIcon >
                    <LinkButtonWithIcon url={githubUrl} target="_blank" label="GitHub" >
                        <Github className="w-4 h-4 fill-primary" />
                    </LinkButtonWithIcon>
                </div>
            </div>
        </section >
    )
}

export default PersonalInfo;
