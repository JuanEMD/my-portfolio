import ProjectCard from "./ProjectCard";
import { DELAY_BASE } from "@/constants/animation";
import { useAnimationObserver } from "@/hooks/useAnimationObserver";

const targetAnimationElements = [{ element: "project-card", identificatorType: "class", animation: "animate-fade-right" }];

const Projects = ({ projects }) => {
    const projectsClasses = ` grid grid-cols-1 gap-10`;

    useAnimationObserver({ targetElements: targetAnimationElements });

    return (
        <div className={projectsClasses}>
            {projects?.map((project, index) => (
                <ProjectCard key={index} id={`project-${index}`} project={project} className="opacity-0 project-card" style={{ animationDelay: `${(index) * DELAY_BASE}ms` }} />
            ))}
        </div>
    )
}

export default Projects;