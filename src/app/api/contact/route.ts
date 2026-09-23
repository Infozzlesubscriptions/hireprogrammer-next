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
  website?: string;
  form_started_at?: number;
}

const CONTACT_EMAIL = "contact@hireprogrammer.co.uk";
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const MIN_FORM_TIME_MS = 2_000;
const rateLimits = new Map<string, number[]>();

export async function POST(request: NextRequest) {
  try {
    if (!isAllowedOrigin(request)) {
      return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
    }

    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > 20_000) {
      return NextResponse.json({ error: "Request is too large." }, { status: 413 });
    }

    const body = (await request.json()) as ContactPayload;

    if (isAutomatedSubmission(body)) {
      return NextResponse.json({ success: true });
    }

    const validationError = validatePayload(body);
    if (validationError) {
      return NextResponse.json(
        { error: validationError },
        { status: 400 }
      );
    }

    if (isRateLimited(getClientIp(request))) {
      return NextResponse.json({ success: true });
    }

    const fromName = body.from_name?.trim() ?? "";
    const fromEmail = body.from_email?.trim() ?? "";

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
        <tr><td><strong>Name</strong></td><td>${escapeHtml(fromName)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escapeHtml(fromEmail)}</td></tr>
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
      replyTo: fromEmail,
      subject: `New enquiry from ${fromName}`,
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

function isAllowedOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    const originUrl = new URL(origin);
    return (
      origin === request.nextUrl.origin ||
      originUrl.hostname === "hireprogrammer.co.uk" ||
      originUrl.hostname === "www.hireprogrammer.co.uk"
    );
  } catch {
    return false;
  }
}

function isAutomatedSubmission(body: ContactPayload): boolean {
  const startedAt = Number(body.form_started_at);
  return (
    Boolean(body.website?.trim()) ||
    !Number.isFinite(startedAt) ||
    startedAt <= 0 ||
    Date.now() - startedAt < MIN_FORM_TIME_MS
  );
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (rateLimits.get(ip) ?? []).filter(
    timestamp => now - timestamp < RATE_LIMIT_WINDOW_MS
  );

  if (recent.length >= RATE_LIMIT_MAX) {
    rateLimits.set(ip, recent);
    return true;
  }

  recent.push(now);
  rateLimits.set(ip, recent);
  return false;
}

function validatePayload(body: ContactPayload): string | null {
  const name = body.from_name?.trim() ?? "";
  const email = body.from_email?.trim() ?? "";

  if (!name || !email) return "Name and email are required.";
  if (name.length > 100) return "Name is too long.";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "A valid email address is required.";
  }

  const limits: Array<[string | undefined, number, string]> = [
    [body.phone, 50, "Phone number"],
    [body.service, 150, "Service"],
    [body.budget, 100, "Budget"],
    [body.message, 5_000, "Message"],
    [body.page_source, 150, "Page source"],
  ];

  for (const [value, maxLength, label] of limits) {
    if (value && value.length > maxLength) return `${label} is too long.`;
  }

  return null;
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
