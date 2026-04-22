import PillWithIcon from "../../components/common/pill/PillWithIcon";
import styles from "./skills.module.css";
import { useTranslation } from "next-i18next/pages";

const Skills = ({ skills }) => {
    const { t } = useTranslation("translation");
    const skillClasses = `${styles["skills-container"]}`;

    return (
        <section className={skillClasses}>
            <div className="bg-linear-to-r from-slate-200 to-gray-100 dark:from-slate-800 dark:to-gray-900 border border-gray-300  dark:border-gray-700 rounded-lg p-3 w-full">
                {Object.keys(skills).map((category) => {
                    return (
                        <div className="grid grid-cols-[auto_1fr] gap-5 mt-6 first:mt-0" key={category}>
                            <div className="min-w-40 border-r border-gray-400  dark:border-gray-700 flex items-center justify-center">
                                <span className="text-lg capitalize text-primary font-bold">{t(`skills.categories.${category}`)}</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5 items-start">
                                {skills[category].map((skill) => {
                                    return <PillWithIcon key={skill.name} icon={skill.icon} text={skill.name} />
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    )
}

export default Skills;
