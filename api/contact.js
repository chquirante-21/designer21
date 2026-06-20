import { Resend } from "resend";
import { Buffer } from "node:buffer";
import process from "node:process";

const CONTACT_EMAIL = "designer21.misa@gmail.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Designer21 Portfolio <onboarding@resend.dev>";

const json = (response, payload, status = 200) => {
  response.statusCode = status;
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(payload));
};

const sanitize = (value = "") =>
  String(value).replace(/[<>]/g, "").trim().slice(0, 4000);

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const buildEmailHtml = ({ name, email, message, sourceUrl }) => `
  <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
    <h1 style="font-size: 22px; margin-bottom: 16px;">New portfolio inquiry</h1>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
    <p><strong>Source:</strong> ${sourceUrl || "Portfolio contact form"}</p>
    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
    <p style="white-space: pre-wrap;">${message}</p>
  </div>
`;

const buildEmailText = ({ name, email, message, sourceUrl }) => [
  "New portfolio inquiry",
  "",
  `Name: ${name}`,
  `Email: ${email}`,
  `Source: ${sourceUrl || "Portfolio contact form"}`,
  "",
  message,
].join("\n");

const readBody = async (request) => {
  if (request.body && typeof request.body === "object") {
    return request.body;
  }

  if (typeof request.body === "string") {
    return JSON.parse(request.body);
  }

  const chunks = [];

  for await (const chunk of request) {
    chunks.push(chunk);
  }

  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
};

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return json(response, { message: "Method not allowed." }, 405);
  }

  if (!process.env.RESEND_API_KEY) {
    return json(
      response,
      {
        message:
          "Email delivery is not configured yet. Please email designer21.misa@gmail.com directly.",
      },
      503,
    );
  }

  try {
    const payload = await readBody(request);
    const name = sanitize(payload.name);
    const email = sanitize(payload.email).toLowerCase();
    const message = sanitize(payload.message);
    const sourceUrl = sanitize(payload.sourceUrl);

    if (!name || !email || !message) {
      return json(response, { message: "Please complete all required fields." }, 400);
    }

    if (!isValidEmail(email)) {
      return json(response, { message: "Please enter a valid email address." }, 400);
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `New portfolio inquiry from ${name}`,
      html: buildEmailHtml({ name, email, message, sourceUrl }),
      text: buildEmailText({ name, email, message, sourceUrl }),
    });

    if (error) {
      console.error("Resend error:", error);
      return json(
        response,
        {
          message:
            "Message could not be sent right now. Please email designer21.misa@gmail.com directly.",
        },
        502,
      );
    }

    return json(response, { message: "Message sent successfully." });
  } catch (error) {
    console.error("Contact API error:", error);
    return json(
      response,
      {
        message:
          "Message could not be sent right now. Please email designer21.misa@gmail.com directly.",
      },
      500,
    );
  }
}
