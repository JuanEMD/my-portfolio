import ExperienceCard from "./ExperienceCard";
import { DELAY_BASE } from "@/constants/animation";
import { useAnimationObserver } from "@/hooks/useAnimationObserver";

const targetAnimationElements = [{ element: "experience-card", identificatorType: "class", animation: "animate-fade-right" }];

const Experiences = ({ experiences }) => {
    useAnimationObserver({ targetElements: targetAnimationElements });

    return (
        <div className="grid gap-5">
            {experiences?.map((experience, index) => (
                <ExperienceCard key={index} experience={experience} className="opacity-0 experience-card" style={{ animationDelay: `${(index + 3) * DELAY_BASE}ms` }} />
            ))}
        </div>
    )
}

export default Experiences;