import ContactForm from "./ContactForm";
import { useContactForm } from "./useContactForm";

const Contact = () => {
    const { handleSubmit, isPending, currentState } = useContactForm();

    return (
        <section className="grid justify-center ">
            <ContactForm onSubmit={handleSubmit} isPending={isPending} currentState={currentState} />
        </section>
    )
}

export default Contact;