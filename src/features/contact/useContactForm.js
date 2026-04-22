import { useState } from "react";

export const useContactForm = () => {
  const [isPending, setIsPending] = useState(false);
  const [currentState, setCurrentState] = useState({});

  const handleSubmit = async (formData, onSuccess) => {
    setIsPending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setCurrentState({
        success: res.ok,
        message: "contact.form.api." + (res.ok ? "success" : "error"),
      });
      if (res.ok) onSuccess?.();
    } catch {
      setCurrentState({ success: false, message: "contact.form.api.error" });
    } finally {
      setIsPending(false);
    }
  };

  return { handleSubmit, isPending, currentState };
};
