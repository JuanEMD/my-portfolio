import ContactForm from "./ContactForm";
import { useContactForm } from "./useContactForm";

const Contact = () => {
    const { handleSubmit, isPending, currentState } = useContactForm();

    return (
        <div className="sm:grid sm:justify-center ">
            <ContactForm onSubmit={handleSubmit} isPending={isPending} currentState={currentState} />
        </div>
    )
}

export default Contact;