import ProjectCard from "./ProjectCard";

const Projects = ({ projects }) => {
    const projectsClasses = ` grid grid-cols-1 gap-10`;
    
    return (
        <div className={projectsClasses}>
            {projects?.map((project, index) => (
                <ProjectCard key={index} {...project} />
            ))}
        </div>
    )
}

export default Projects;