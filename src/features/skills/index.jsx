import PillWithIcon from "../../components/common/pill/PillWithIcon";
import styles from "./skills.module.css";
import { useTranslation } from "next-i18next/pages";

const Skills = ({ skills }) => {
    const { t } = useTranslation("translation");
    // const skillClasses = `${styles["skills-container"]}`;

    return (
        <div className="bg-linear-to-r from-slate-200 to-gray-100 dark:from-slate-800 dark:to-gray-900 border border-gray-300  dark:border-gray-700 rounded-lg p-3 w-full">
            {Object.keys(skills).map((category) => {
                return (
                    <div className="grid sm:grid-cols-[auto_1fr] gap-5 mt-6 first:mt-0  divide-y sm:divide-y-0 sm:divide-x divide-gray-300 dark:divide-gray-700" key={category}>
                        <div className="min-w-40 w-full  flex items-center justify-start sm:justify-center pb-2 sm:pb-0">
                            <span className="text-lg capitalize text-primary font-bold">{t(`skills.categories.${category}`)}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 items-center">
                            {skills[category].map((skill) => {
                                return <PillWithIcon key={skill.name} icon={skill.icon} text={skill.name} />
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default Skills;
