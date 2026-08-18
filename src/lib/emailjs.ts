export interface EmailPayload {
  from_name:    string;
  from_email:   string;
  phone?:       string;
  service?:     string;
  budget?:      string;
  message?:     string;
  page_source?: string;
}

export async function sendEmail(payload: EmailPayload): Promise<void> {
  const res = await fetch("/api/contact", {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { error?: string }).error ?? `HTTP ${res.status}`);
  }
}
