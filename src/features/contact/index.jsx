import { DELAY_BASE } from "@/constants/animation";
import { useContactForm } from "./useContactForm";
import ContactForm from "./ContactForm";
import { useAnimationObserver } from "@/hooks/useAnimationObserver";

const targetAnimationElements = [{ element: "contact-form", identificatorType: "class" }];

const Contact = () => {
    const { handleSubmit, isPending, currentState } = useContactForm();
    useAnimationObserver({ targetElements: targetAnimationElements });

    return (
        <div className="sm:grid sm:justify-center ">
            <ContactForm onSubmit={handleSubmit} isPending={isPending} currentState={currentState} className="opacity-0 contact-form" style={{ animationDelay: `${DELAY_BASE * 3}ms` }} />
        </div>
    )
}

export default Contact;