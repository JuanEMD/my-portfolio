import ExperienceCard from "./ExperienceCard";

const Experiences = ({ experiences }) => {
    return (
        <div className="grid gap-5">
            {experiences?.map((experience, index) => (
                <ExperienceCard key={index} experience={experience} />
            ))}
        </div>
    )
}

export default Experiences;