import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactPayload {
  from_name?: string;
  from_email?: string;
  phone?: string;
  service?: string;
  budget?: string;
  message?: string;
  page_source?: string;
}

const CONTACT_EMAIL = "contact@hireprogrammer.co.uk";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactPayload;

    if (!body.from_name?.trim() || !body.from_email?.trim()) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!host || !user || !pass) {
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const html = `
      <h2>New contact form submission</h2>
      <table>
        <tr><td><strong>Name</strong></td><td>${escapeHtml(body.from_name)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escapeHtml(body.from_email)}</td></tr>
        ${body.phone ? `<tr><td><strong>Phone</strong></td><td>${escapeHtml(body.phone)}</td></tr>` : ""}
        ${body.service ? `<tr><td><strong>Service</strong></td><td>${escapeHtml(body.service)}</td></tr>` : ""}
        ${body.budget ? `<tr><td><strong>Budget</strong></td><td>${escapeHtml(body.budget)}</td></tr>` : ""}
        ${body.page_source ? `<tr><td><strong>Page source</strong></td><td>${escapeHtml(body.page_source)}</td></tr>` : ""}
        ${body.message ? `<tr><td><strong>Message</strong></td><td>${escapeHtml(body.message).replace(/\n/g, "<br/>")}</td></tr>` : ""}
      </table>
    `;

    await transporter.sendMail({
      from: `"HireProgrammer Website" <${user}>`,
      to: CONTACT_EMAIL,
      cc: "srinath.u@infozzle.com",
      replyTo: body.from_email,
      subject: `New enquiry from ${body.from_name}`,
      text: buildPlainText(body),
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact email error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}

function buildPlainText(body: ContactPayload): string {
  return [
    "New contact form submission",
    "",
    `Name: ${body.from_name}`,
    `Email: ${body.from_email}`,
    body.phone ? `Phone: ${body.phone}` : "",
    body.service ? `Service: ${body.service}` : "",
    body.budget ? `Budget: ${body.budget}` : "",
    body.page_source ? `Page source: ${body.page_source}` : "",
    body.message ? `Message:\n${body.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
