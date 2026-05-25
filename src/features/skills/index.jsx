import { useState } from "react";
import { useTranslation } from "next-i18next/pages";
import { mainStack } from "../../constants/data";
import StackCard from "./StackCard";
import SkillsModal from "./SkillsModal";
import PlusCircle from "../../components/icons/PlusCircle";

const wrapperClasses = "w-full bg-linear-to-r from-slate-200 to-gray-100 dark:from-slate-800 dark:to-gray-900 border border-gray-300 dark:border-gray-700 rounded-2xl p-6";
const gridClasses = "grid grid-cols-2 sm:grid-cols-5 gap-2.5";
const moreRowClasses = "flex justify-center mt-5";
const moreBtnClasses = "inline-flex items-center gap-[0.4rem] px-[1.1rem] py-[0.45rem] rounded-full border border-btn-border bg-btn-bg text-btn-text text-[0.78rem] font-medium cursor-pointer tracking-[0.02em] transition-[opacity,transform] duration-150 hover:opacity-85 hover:-translate-y-px";
const badgeClasses = "bg-white/20 rounded-full px-[0.4rem] py-[0.05rem] text-[0.65rem] font-bold leading-normal";

const Skills = ({ skills }) => {
    const { t } = useTranslation("translation");
    const [modalOpen, setModalOpen] = useState(false);

    const totalSkills = Object.values(skills).reduce((sum, arr) => sum + arr.length, 0);

    return (
        <div className={wrapperClasses}>
            <div className={gridClasses}>
                {mainStack.map((tech, i) => (
                    <StackCard
                        key={tech.name}
                        {...tech}
                        animationDelay={`${i * 75}ms`}
                    />
                ))}
            </div>

            <div className={moreRowClasses}>
                <button className={moreBtnClasses} onClick={() => setModalOpen(true)}>
                    <PlusCircle className="w-[13px] h-[13px]" />
                    {t("skills.allSkills")}
                    <span className={badgeClasses}>{totalSkills}</span>
                </button>
            </div>

            {modalOpen && (
                <SkillsModal skills={skills} onClose={() => setModalOpen(false)} />
            )}
        </div>
    );
};

export default Skills;

