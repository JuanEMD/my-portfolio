import { useTranslation } from 'next-i18next/pages';
import PillWithIcon from '../../components/common/pill/PillWithIcon';
import LinkButton from '../../components/common/button/LinkButton';
import ArrowUpRight from '../../components/icons/ArrowUpRight';
import AppWindow from '@/components/icons/AppWindow';

const ImageContainer = ({ imageUrl }) => {
    const { t } = useTranslation("translation");

    const imgContainerClasses = ` text-primary font-bold ${!imageUrl ? 'w-full flex flex-col justify-center items-center pr-1 pb-2 sm:pb-0 ' : ''}`;

    return (
        <div className={imgContainerClasses}>
            <AppWindow className='w-35 h-35' />
            <div className='text-md flex flex-col text-sm'>
                <span className=' text-center'>{t('projects.previewText.notPublic1')}</span>
                <span className=' text-center'>{t('projects.previewText.notPublic2')}</span>
            </div>
        </div>
    )
}

const ContentContainer = ({ title, description, skills, projectUrl }) => {
    const contentContainerClasses = 'min-h-50 rounded rounded-lg';

    return (
        <div className={contentContainerClasses}>
            <h4 className='text-lg mb-4 text-secondary font-bold'>{title}</h4>
            <p className='mb-4 text-primary'>{description}</p>
            <div className='flex flex-wrap gap-x-2 gap-y-2 mb-4'>
                {skills?.map((skill, index) => (
                    <PillWithIcon key={index} text={skill.name} icon={skill.icon} />
                ))}
            </div>
            <div className='w-full grid justify-end mt-10'>
                {projectUrl && <LinkButton url={projectUrl} target='_blank' >
                    {'Preview'}
                    <ArrowUpRight />
                </LinkButton>}
            </div>
        </div>

    )
}

const ProjectCard = ({ title, description, skills, imageUrl, projectUrl }) => {
    const { t } = useTranslation("translation");
    const cardClasses = 'grid sm:grid-cols-[1fr_2fr] gap-5 gap-5 rounded rounded-lg border border-gray-300 bg-linear-to-r from-slate-200 to-gray-100 dark:from-slate-800 dark:to-gray-900 p-4 dark:border-gray-700 divide-y sm:divide-y-0 sm:divide-x divide-gray-300 dark:divide-gray-700';

    return (
        <div className={cardClasses}>
            <ImageContainer imageUrl={imageUrl} />
            <ContentContainer title={t(title)} description={t(description)} skills={skills} projectUrl={projectUrl} />
        </div>
    )
}

export default ProjectCard;
