"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import {
  User, Mail, Phone, Briefcase, MessageSquare, Send,
  CheckCircle2, ChevronDown, ArrowRight,
} from "lucide-react";
import { sendEmail } from "@/lib/emailjs";

const ACCENT = "#7C3AED";
const BG = "#080316";

const SERVICES = [
  "WordPress Development",
  "WooCommerce Development",
  "Drupal Development",
  "Magento Development",
  "Shopify Development",
  "Joomla Website Development",
  "Laravel Development",
  "CodeIgniter Development",
  "PHP Web Development",
  "AI Developers",
  "Generative AI Development",
  "Java Development",
  "DevOps",
  "Linux Server Administration",
  "Zoho CRM Development Services",
  "Zapier Development Services",
  "Information Security",
  "Penetration Testing",
  "Mobile App Development",
  "React Native Development",
  "Flutter Development",
  "AI-Powered Social Media",
  "AI Team Training",
  "Done-For-You AI Agents",
  "AI Team Transformation",
  "Workflow Automation",
  "Vibe Coding Cleanup",
  "Other / Not sure",
];

const BUDGETS = ["Under £1k", "£1k–£5k", "£5k–£15k", "£15k–£50k", "£50k+", "Not sure"];

type F = { name: string; email: string; phone: string; service: string; budget: string; message: string };
const INIT: F = { name: "", email: "", phone: "", service: "", budget: "", message: "" };

const inputBase: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: 12,
  color: "#fff",
  fontSize: 15,
  outline: "none",
  padding: "12px 14px 12px 42px",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
};

function FieldWrap({
  label, icon, err, children,
}: { label: string; icon: React.ReactNode; err?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.65)", letterSpacing: "0.03em" }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <span style={{
          position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)",
          color: "rgba(255,255,255,0.35)", pointerEvents: "none",
        }}>
          {icon}
        </span>
        {children}
      </div>
      {err && <p style={{ fontSize: 12, color: "#f87171", margin: 0 }}>{err}</p>}
    </div>
  );
}

export default function QuotePage() {
  const [form, setForm] = useState<F>(INIT);
  const [errors, setErrors] = useState<Partial<F>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (k: keyof F) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [k]: e.target.value }));
    setErrors(er => ({ ...er, [k]: "" }));
  };

  const validate = (): Partial<F> => {
    const e: Partial<F> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Invalid email";
    if (!form.service) e.service = "Required";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    try {
      await sendEmail({
        from_name: form.name,
        from_email: form.email,
        phone: form.phone,
        service: form.service,
        budget: form.budget,
        message: form.message,
        page_source: "Quote Request Page",
      });
      setSubmitted(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      alert("Sorry, something went wrong. Please email us directly at contact@hireprogrammer.co.uk");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ background: BG, minHeight: "100vh", color: "#fff" }}>
      <Navbar />

      {/* Hero strip */}
      <section style={{
        paddingTop: 120,
        paddingBottom: 64,
        textAlign: "center",
        background: `radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.18) 0%, transparent 70%)`,
      }}>
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(124,58,237,0.12)",
            border: "1px solid rgba(124,58,237,0.30)",
            borderRadius: 999, padding: "6px 18px",
            fontSize: 13, fontWeight: 600, color: ACCENT,
            marginBottom: 20,
          }}>
            <ArrowRight style={{ width: 14, height: 14 }} />
            Free Quote — No Obligation
          </span>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", fontWeight: 800, margin: "0 0 16px", lineHeight: 1.15 }}>
            Request a <span style={{ color: ACCENT }}>Project Quote</span>
          </h1>
          <p style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "rgba(255,255,255,0.55)", maxWidth: 520, margin: "0 auto" }}>
            Tell us about your project and we'll respond within 1 business day with a tailored proposal.
          </p>
        </motion.div>
      </section>

      {/* Form card */}
      <section style={{ padding: "0 16px 100px", maxWidth: 780, margin: "0 auto" }}>
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(124,58,237,0.30)",
                borderRadius: 20,
                padding: "60px 40px",
                textAlign: "center",
              }}
            >
              <CheckCircle2 style={{ width: 56, height: 56, color: ACCENT, margin: "0 auto 20px" }} />
              <h2 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: 12 }}>
                Thanks, <span style={{ color: ACCENT }}>{form.name.split(" ")[0]}</span>!
              </h2>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 16, maxWidth: 440, margin: "0 auto 32px" }}>
                We've received your request and our team will review your project and respond within 1 business day.
              </p>
              <a
                href="/"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: ACCENT, color: "#fff",
                  padding: "12px 28px", borderRadius: 999,
                  fontWeight: 700, fontSize: 15, textDecoration: "none",
                }}
              >
                Back to Home <ArrowRight style={{ width: 16, height: 16 }} />
              </a>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20,
                padding: "clamp(24px, 5vw, 48px)",
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}
            >
              {/* Row 1: name + email */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="quote-grid">
                <FieldWrap label="Full Name *" icon={<User style={{ width: 15, height: 15 }} />} err={errors.name}>
                  <input
                    type="text"
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={set("name")}
                    style={{
                      ...inputBase,
                      borderColor: errors.name ? "rgba(239,68,68,0.55)" : "rgba(255,255,255,0.10)",
                    }}
                  />
                </FieldWrap>
                <FieldWrap label="Email Address *" icon={<Mail style={{ width: 15, height: 15 }} />} err={errors.email}>
                  <input
                    type="email"
                    placeholder="jane@company.com"
                    value={form.email}
                    onChange={set("email")}
                    style={{
                      ...inputBase,
                      borderColor: errors.email ? "rgba(239,68,68,0.55)" : "rgba(255,255,255,0.10)",
                    }}
                  />
                </FieldWrap>
              </div>

              {/* Row 2: phone + service */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="quote-grid">
                <FieldWrap label="Phone (optional)" icon={<Phone style={{ width: 15, height: 15 }} />}>
                  <input
                    type="tel"
                    placeholder="+44 7700 900000"
                    value={form.phone}
                    onChange={set("phone")}
                    style={inputBase}
                  />
                </FieldWrap>
                <FieldWrap label="Service Required *" icon={<Briefcase style={{ width: 15, height: 15 }} />} err={errors.service}>
                  <div style={{ position: "relative" }}>
                    <select
                      value={form.service}
                      onChange={set("service")}
                      style={{
                        ...inputBase,
                        appearance: "none",
                        WebkitAppearance: "none",
                        paddingRight: 36,
                        cursor: "pointer",
                        color: form.service ? "#fff" : "rgba(255,255,255,0.35)",
                        borderColor: errors.service ? "rgba(239,68,68,0.55)" : "rgba(255,255,255,0.10)",
                      }}
                    >
                      <option value="" disabled style={{ background: "#0f0f11" }}>Select a service…</option>
                      {SERVICES.map(s => (
                        <option key={s} value={s} style={{ background: "#0f0f11", color: "#fff" }}>{s}</option>
                      ))}
                    </select>
                    <ChevronDown style={{
                      position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                      width: 15, height: 15, color: "rgba(255,255,255,0.40)", pointerEvents: "none",
                    }} />
                  </div>
                </FieldWrap>
              </div>

              {/* Budget pills */}
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.65)", letterSpacing: "0.03em", display: "block", marginBottom: 10 }}>
                  Budget (optional)
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {BUDGETS.map(b => {
                    const active = form.budget === b;
                    return (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, budget: f.budget === b ? "" : b }))}
                        style={{
                          padding: "7px 16px",
                          borderRadius: 999,
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: "pointer",
                          transition: "all 0.18s",
                          background: active ? ACCENT : "rgba(255,255,255,0.06)",
                          border: active ? `1.5px solid ${ACCENT}` : "1.5px solid rgba(255,255,255,0.12)",
                          color: active ? "#fff" : "rgba(255,255,255,0.65)",
                        }}
                      >
                        {b}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message */}
              <FieldWrap label="Project Details (optional)" icon={<MessageSquare style={{ width: 15, height: 15 }} />}>
                <textarea
                  placeholder="Tell us about your project, goals, timeline, or anything else that's useful…"
                  value={form.message}
                  onChange={set("message")}
                  rows={5}
                  style={{
                    ...inputBase,
                    padding: "12px 14px 12px 42px",
                    resize: "vertical",
                    lineHeight: 1.6,
                  }}
                />
              </FieldWrap>

              {/* Submit */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 10,
                    background: submitting ? "rgba(124,58,237,0.5)" : ACCENT,
                    color: "#fff",
                    padding: "14px 36px",
                    borderRadius: 999,
                    fontWeight: 700,
                    fontSize: 16,
                    border: "none",
                    cursor: submitting ? "not-allowed" : "pointer",
                    transition: "all 0.2s",
                    boxShadow: submitting ? "none" : "0 0 32px rgba(124,58,237,0.40)",
                  }}
                >
                  {submitting ? "Sending…" : <>Send Request <Send style={{ width: 16, height: 16 }} /></>}
                </button>
              </div>

              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.30)", textAlign: "center", margin: 0 }}>
                No spam. We'll only contact you about your project.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 600px) {
          .quote-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
