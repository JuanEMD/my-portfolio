import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ firstName, lastName, email, message }) => {
  try {
    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "juanernestomarmolejosdanis@gmail.com",
      subject: `New contact form submission from ${firstName} ${lastName}`,
      html: `
          <h1>New Contact Form Submission</h1>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong><br/> ${message}</p>
        `,
    });

    if (error) {
      console.log("Failed to send email", error);

      return {
        success: false,
        message: "Failed to send email. Please try again later.",
      };
    }

    return {
      success: true,
      message: "Email sent successfully!",
    };
  } catch (error) {
    console.log("Server action error", error);
    return {
      success: false,
      message:
        "An error occurred while sending the email. Please try again later.",
    };
  }
};
