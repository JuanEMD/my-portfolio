import { useEffect } from "react";
import { useTranslation } from "next-i18next/pages";
import Pill from "../../components/common/pill/Pill";
import Modal from "../../components/modal";

const SkillsModal = ({ skills, onClose }) => {
    const { t } = useTranslation("translation");

    useEffect(() => {
        const handler = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    return (
        <Modal title={t("skills.allSkills")} onClose={onClose}>
            <div className="flex flex-col gap-[1.1rem]">
                {Object.keys(skills).map((category) => (
                    <div key={category} className="flex flex-col gap-2">
                        <span className="text-[0.63rem] font-bold uppercase tracking-[0.1em] text-primary font-mono">
                            {t(`skills.categories.${category}`)}
                        </span>
                        <div className="flex flex-wrap gap-[0.375rem]">
                            {skills[category].map((skill) => (
                                <Pill key={skill.name} text={t(skill.name)} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Modal>
    );
};

export default SkillsModal;
