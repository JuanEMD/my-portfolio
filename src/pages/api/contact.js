import { sendEmail } from "@/services/send-email";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { firstName, lastName, email, message } = req.body;

  const result = await sendEmail({ firstName, lastName, email, message });

  if (!result.success) {
    return res.status(500).json({ message: result.message });
  }

  return res.status(200).json({ message: result.message });
}
