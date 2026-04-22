import Company from "@/components/icons/Company";
import { useTranslation } from "next-i18next/pages";

const ExperienceCard = ({ experience }) => {
    const { company, position, startDate, endDate, description } = experience;
    const { t } = useTranslation("translation");

    const containerClasses = "grid grid-cols-[auto_1fr] gap-4 bg-linear-to-r from-slate-200 to-gray-100 dark:from-slate-800 dark:to-gray-900 rounded-lg p-3 border border-gray-300 dark:border-gray-700 text-primary";
    const companyContainer = "w-34 flex flex-col justify-center items-center gap-2 border-r border-gray-300 dark:border-gray-700 pr-3";

    return (
        <div className={containerClasses}>
            <div className={companyContainer}>
                <Company className="w-18 h-18 " />
            </div>
            <div>
                <span className="text-lg text-secondary">{t(position)}</span>
                <div>
                    <span className="text-md text-primary text-center">{company}</span>
                    <span>{" ▪ "}</span>
                    <span className="text-sm">{startDate} - {endDate}</span>
                </div>
                <p className="text-md mt-3">{t(description)}</p>
            </div>
        </div>
    )
}

export default ExperienceCard;
