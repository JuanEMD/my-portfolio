import { useTranslation } from "next-i18next/pages";
import Modal from "@/components/modal";
import Pill from "@/components/common/pill/Pill";
import Company from "@/components/icons/Company";

const ProjectModal = ({ title, description, highlightsKey, skills, company, onClose }) => {
    const { t } = useTranslation("translation");
    const highlights = t(highlightsKey, { returnObjects: true });

    return (
        <Modal title={t(title)} onClose={onClose}>
            <div className="flex items-center gap-2 mb-5 pb-4 border-b border-secondary/15">
                <Company className="w-5 h-5 text-primary dark:text-secondary opacity-70" />
                <span className="text-sm text-primary dark:text-secondary opacity-70">{company}</span>
            </div>

            <p className="text-sm text-primary leading-relaxed mb-5 opacity-90">
                {t(description)}
            </p>

            {Array.isArray(highlights) && highlights.length > 0 && (
                <ul className="flex flex-col gap-2.5 mb-6">
                    {highlights.map((highlight, i) => (
                        <li key={i} className="flex gap-2 text-sm text-primary">
                            <span className="text-secondary shrink-0 mt-0.5 opacity-70">▸</span>
                            <span className="leading-relaxed">{highlight}</span>
                        </li>
                    ))}
                </ul>
            )}

            <div className="flex flex-wrap gap-1.5">
                {skills?.map((skill, i) => (
                    <Pill key={i} text={skill.name} />
                ))}
            </div>
        </Modal>
    );
};

export default ProjectModal;
