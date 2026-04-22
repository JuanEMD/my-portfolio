import University from "@/components/icons/University";
import { useTranslation } from "next-i18next/pages";

const EducationCard = ({ education }) => {
    const { title, institution, startDate, endDate, countryName } = education;
    const { t } = useTranslation("translation");

    const containerClasses = "grid grid-cols-[auto_1fr] gap-4 bg-linear-to-r from-slate-200 to-gray-100 dark:from-slate-800 dark:to-gray-900 rounded-lg p-3 border border-gray-300 dark:border-gray-700 text-primary";
    const educationContainer = "w-34 flex flex-col items-center justify-center gap-2 border-r border-gray-300 dark:border-gray-700 pr-3";
    const descriptionContainer = "grid";

    return (
        <div className={containerClasses}>
            <div className={educationContainer}>
                <University className="w-18 h-18" />
            </div>
            <div className={descriptionContainer}>
                <span className="text-lg text-secondary">{t(title)}</span>
                <span className="text-md">{institution}</span>
                <div className="text-sm">
                    <span>{startDate} - {endDate}</span>
                    <span>{" ▪ "}</span>
                    <span>{t(countryName)}</span>
                </div>
            </div>
        </div>
    )
}

export default EducationCard;
