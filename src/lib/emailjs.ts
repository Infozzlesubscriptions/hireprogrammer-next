export interface EmailPayload {
  from_name:    string;
  from_email:   string;
  phone?:       string;
  service?:     string;
  budget?:      string;
  message?:     string;
  page_source?: string;
}

const pageLoadedAt = Date.now();

export async function sendEmail(
  payload: EmailPayload,
  form?: HTMLFormElement
): Promise<void> {
  const website = form
    ? String(new FormData(form).get("website") ?? "")
    : "";

  const res = await fetch("/api/contact", {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({
      ...payload,
      website,
      form_started_at: pageLoadedAt,
    }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { error?: string }).error ?? `HTTP ${res.status}`);
  }
}
