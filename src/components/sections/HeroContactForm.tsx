"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { sendEmail } from "@/lib/emailjs";

const GOLD = "#7C3AED";

interface ExtraField {
  label:       string;
  type?:       string;
  placeholder: string;
}

interface Props {
  pageName:            string;
  extraField?:         ExtraField;
  textareaPlaceholder?: string;
  buttonText?:         string;
}

export function HeroContactForm({
  pageName,
  extraField,
  textareaPlaceholder,
  buttonText = "Get a Free Quote",
}: Props) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", extra: "", message: "" });
  const [sending,   setSending]   = useState(false);
  const [sent,      setSent]      = useState(false);
  const [error,     setError]     = useState("");

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));

  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.currentTarget.style.borderColor = `${GOLD}55`);
  const blur  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)");

  const inputCls = "w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all duration-200";
  const inputStyle = { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" };
  const labelCls  = "block text-white/50 text-xs font-semibold uppercase tracking-wider mb-1.5";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    setSending(true);
    setError("");
    try {
      await sendEmail({
        from_name:   form.name,
        from_email:  form.email,
        phone:       form.phone,
        service:     extraField ? `${extraField.label}: ${form.extra}` : undefined,
        message:     form.message || form.extra,
        page_source: pageName,
      });
      setSent(true);
    } catch {
      setError("Something went wrong. Please email us directly at srinath.u@infozzle.com");
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-10 gap-4">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.3)" }}
        >
          <CheckCircle2 style={{ width: 28, height: 28, color: GOLD }} />
        </div>
        <div>
          <p className="text-white font-bold text-lg mb-1">Message Received!</p>
          <p className="text-white/45 text-sm">We'll be in touch within 1 business day.</p>
        </div>
        <button
          onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", extra: "", message: "" }); }}
          className="text-xs font-semibold px-5 py-2 rounded-full transition-colors"
          style={{ background: "rgba(124,58,237,0.10)", color: GOLD, border: "1px solid rgba(124,58,237,0.25)" }}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className={labelCls}>Full Name *</label>
        <input
          type="text" required placeholder="Jane Smith"
          value={form.name} onChange={set("name")}
          className={inputCls} style={inputStyle}
          onFocus={focus} onBlur={blur}
        />
      </div>

      <div>
        <label className={labelCls}>Email Address *</label>
        <input
          type="email" required placeholder="jane@company.co.uk"
          value={form.email} onChange={set("email")}
          className={inputCls} style={inputStyle}
          onFocus={focus} onBlur={blur}
        />
      </div>

      <div>
        <label className={labelCls}>Phone Number</label>
        <input
          type="tel" placeholder="+44 20 XXXX XXXX"
          value={form.phone} onChange={set("phone")}
          className={inputCls} style={inputStyle}
          onFocus={focus} onBlur={blur}
        />
      </div>

      {extraField && (
        <div>
          <label className={labelCls}>{extraField.label}</label>
          <input
            type={extraField.type ?? "text"} placeholder={extraField.placeholder}
            value={form.extra} onChange={set("extra")}
            className={inputCls} style={inputStyle}
            onFocus={focus} onBlur={blur}
          />
        </div>
      )}

      {textareaPlaceholder && (
        <div>
          <label className={labelCls}>Project Details</label>
          <textarea
            rows={3} placeholder={textareaPlaceholder}
            value={form.message} onChange={set("message")}
            className={`${inputCls} resize-none`} style={inputStyle}
            onFocus={focus} onBlur={blur}
          />
        </div>
      )}

      {error && <p className="text-red-400 text-xs">{error}</p>}

      <button
        type="submit" disabled={sending}
        className="w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(124,58,237,0.35)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
        style={{ background: "#7C3AED", color: "#ffffff" }}
      >
        {sending ? "Sending…" : buttonText}
      </button>
    </form>
  );
}
