import Carousel from "@/components/carousel";
import EducationCard from "./EducationCard";

const Education = ({ education, certificates }) => {
    return (
        <>
            <div className="grid gap-5">
                {education?.map((e, index) => (
                    <EducationCard key={index} education={e} />
                ))}
            </div>
            <Carousel items={certificates} />
        </>

    )
}

export default Education;