import { useContactForm } from "./useContactForm";
import ContactForm from "./ContactForm";

const Contact = () => {
    const { handleSubmit, isPending, currentState } = useContactForm();

    return (
        <div className="sm:grid sm:justify-center ">
            <ContactForm onSubmit={handleSubmit} isPending={isPending} currentState={currentState} />
        </div>
    )
}

export default Contact;