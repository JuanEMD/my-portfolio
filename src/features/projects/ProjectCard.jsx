import { useState } from 'react';
import { useTranslation } from 'next-i18next/pages';
import Pill from '../../components/common/pill/Pill';
import LinkButton from '../../components/common/button/LinkButton';
import ArrowUpRight from '../../components/icons/ArrowUpRight';
import AppWindow from '@/components/icons/AppWindow';
import ProjectModal from './ProjectModal';

const ImageContainer = ({ imageUrl, notPublic1, notPublic2 }) => {
    const imgContainerClasses = ` text-primary font-bold ${!imageUrl ? 'w-full flex flex-col justify-center items-center pr-1 pb-2 sm:pb-0 ' : ''}`;

    return (
        <div className={imgContainerClasses}>
            <AppWindow className='w-35 h-35' />
            <div className='text-md flex flex-col text-sm'>
                <span className=' text-center'>{notPublic1}</span>
                <span className=' text-center'>{notPublic2}</span>
            </div>
        </div>
    )
}

const ContentContainer = ({ title, description, skills, projectUrl, viewDetails, onViewDetails }) => {
    const contentContainerClasses = 'min-h-50 rounded rounded-lg';

    return (
        <div className={contentContainerClasses}>
            <h3 className='text-lg mb-4 text-secondary font-bold'>{title}</h3>
            <p className='mb-4 text-primary'>{description}</p>
            <div className='flex flex-wrap gap-x-2 gap-y-2 mb-4'>
                {skills?.map((skill, index) => (
                    <Pill key={index} text={skill.name} />
                ))}
            </div>
            <div className='w-full flex justify-end items-center gap-2 mt-10'>
                <button
                    onClick={onViewDetails}
                    className="text-sm text-secondary border border-secondary/40 rounded-lg px-3 py-1.5 hover:bg-secondary/10 transition-colors duration-200 hover:cursor-pointer flex items-center gap-1.5"
                >
                    <span>{viewDetails}</span>
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
                {projectUrl && (
                    <LinkButton url={projectUrl} target='_blank'>
                        {'Preview'}
                        <ArrowUpRight />
                    </LinkButton>
                )}
            </div>
        </div>
    )
}

const ProjectCard = ({ project }) => {
    const { title, description, highlightsKey, company, skills, imageUrl, projectUrl } = project;
    const { t } = useTranslation("translation");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const cardClasses = 'grid sm:grid-cols-[1fr_2fr] gap-5 gap-5 rounded rounded-lg border border-gray-300 bg-linear-to-r from-slate-200 to-gray-100 dark:from-slate-800 dark:to-gray-900 p-4 dark:border-gray-700 divide-y sm:divide-y-0 sm:divide-x divide-gray-300 dark:divide-gray-700';

    return (
        <>
            <div className={cardClasses}>
                <ImageContainer
                    imageUrl={imageUrl}
                    notPublic1={t('projects.previewText.notPublic1')}
                    notPublic2={t('projects.previewText.notPublic2')}
                />
                <ContentContainer
                    title={t(title)}
                    description={t(description)}
                    skills={skills}
                    projectUrl={projectUrl}
                    viewDetails={t('projects.viewDetails')}
                    onViewDetails={() => setIsModalOpen(true)}
                />
            </div>

            {isModalOpen && (
                <ProjectModal
                    title={title}
                    description={description}
                    highlightsKey={highlightsKey}
                    skills={skills}
                    company={company}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </>
    )
}

export default ProjectCard;
