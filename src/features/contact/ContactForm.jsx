import { useState, useMemo } from "react";
import { useTranslation } from "next-i18next/pages";
import { formValidations } from "./utils/validations";
import Button from "../../components/common/button";
import Textbox from "../../components/common/input/Textbox";
import TextInput from "../../components/common/input/TextInput";
import StatusMessage from "../../components/Message/StatusMessage";

const ContactForm = ({ onSubmit = () => undefined, isPending = false, currentState = {} }) => {
    const { t } = useTranslation("translation");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [touched, setTouched] = useState({});

    const formErrors = useMemo(() => formValidations({ firstName, lastName, email, message }), [firstName, lastName, email, message]);

    const isValid = Object.keys(formErrors).length === 0;

    const handleBlur = (field) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
    };

    const errors = Object.fromEntries(
        Object.entries(formErrors).map(([field, msg]) => [field, touched[field] ? t(msg) : undefined])
    );

    const clearForm = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setMessage("");
        setTouched({});
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (!isValid) {
            setTouched({ firstName: true, lastName: true, email: true, message: true });
            const firstErrorField = Object.keys(formErrors)[0];
            const fieldMap = { firstName: "home-first-name", lastName: "home-last-name", email: "home-email", message: "home-message" };
            document.getElementById(fieldMap[firstErrorField])?.focus();
            return;
        }

        const formData = { firstName, lastName, email, message };

        onSubmit(formData, clearForm);
    };

    const formClasses = "bg-linear-to-r from-slate-200 to-gray-100 dark:from-slate-800 dark:to-gray-900 rounded-lg p-7 flex flex-col gap-0 w-full max-w-2xl border border-gray-300 dark:border-gray-700";
    const inputWrapperClasses = "grid";

    return (
        <form onSubmit={handleOnSubmit} className={formClasses} aria-label="Contact form">
            <div className="grid sm:grid-cols-2 gap-1 sm:gap-7">
                <div className={inputWrapperClasses}>
                    <TextInput
                        id="home-first-name"
                        name="first-name"
                        label={t("contact.form.label.firstName")}
                        placeholder={t("contact.form.placeholder.firstName")}
                        value={firstName}
                        onChange={setFirstName}
                        onBlur={() => handleBlur("firstName")}
                        required
                        error={errors.firstName}
                        errorId="home-first-name-error"
                    />
                    <StatusMessage id="home-first-name-error" message={errors.firstName} type="error" />
                </div>
                <div className={inputWrapperClasses}>
                    <TextInput
                        id="home-last-name"
                        name="last-name"
                        label={t("contact.form.label.lastName")}
                        placeholder={t("contact.form.placeholder.lastName")}
                        value={lastName}
                        onChange={setLastName}
                        onBlur={() => handleBlur("lastName")}
                        required
                        error={errors.lastName}
                        errorId="home-last-name-error"
                    />
                    <StatusMessage id="home-last-name-error" message={errors.lastName} type="error" />
                </div>
            </div>
            <TextInput
                id="home-email"
                name="email"
                type="email"
                label={t("contact.form.label.email")}
                placeholder={t("contact.form.placeholder.email")}
                value={email}
                onChange={setEmail}
                onBlur={() => handleBlur("email")}
                required
                error={errors.email}
                errorId="home-email-error"
                autoComplete="email"
            />
            <StatusMessage id="home-email-error" message={errors.email} type="error" />

            <Textbox
                id="home-message"
                name="message"
                label={t("contact.form.label.message")}
                placeholder={t("contact.form.placeholder.message")}
                value={message}
                onChange={setMessage}
                onBlur={() => handleBlur("message")}
                required
                error={errors.message}
                errorId="home-message-error"
            />
            <StatusMessage id="home-message-error" message={errors.message} type="error" />
            <Button type="submit" disabled={isPending} className="mt-2 mb-1">
                {isPending ? t("contact.form.label.sending") : t("contact.form.label.submit")}
            </Button>
            <div aria-live="polite" aria-atomic="true" className="self-center">
                {currentState.success && currentState.message && <StatusMessage type="success" message={t(currentState.message)} />}
                {!currentState.success && currentState.message && <StatusMessage type="error" message={t(currentState.message)} />}
            </div>
        </form>
    )
}

export default ContactForm;