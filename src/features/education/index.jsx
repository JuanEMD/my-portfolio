import Carousel from "@/components/carousel";
import EducationCard from "./EducationCard";
import { DELAY_BASE } from "@/constants/animation";
import { useAnimationObserver } from "@/hooks/useAnimationObserver";

const targetAnimationElements = [{ element: "education-card", identificatorType: "class", animation: "animate-fade-right" }];

const Education = ({ education, certificates }) => {
    useAnimationObserver({ targetElements: targetAnimationElements });

    return (
        <>
            <div className="grid gap-5">
                {education?.map((e, index) => (
                    <EducationCard key={index} education={e} className="opacity-0 education-card" style={{ animationDelay: `${(index + 3) * DELAY_BASE}ms` }} />
                ))}
            </div>
            <Carousel items={certificates} />
        </>

    )
}

export default Education;