"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Send, User, Mail, Phone, Briefcase,
  MessageSquare, CheckCircle2, ChevronDown,
} from "lucide-react";
import { sendEmail } from "@/lib/emailjs";

const GOLD = "#7C3AED";

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
];

const BUDGETS = ["Under £1k","£1k–£5k","£5k–£15k","£15k–£50k","£50k+","Not sure"];

type F = { name:string; email:string; phone:string; service:string; budget:string; message:string };
const INIT: F = { name:"",email:"",phone:"",service:"",budget:"",message:"" };

interface Props { open:boolean; onClose:()=>void; initialService?: string; }

export function QuoteModal({ open, onClose, initialService }: Props) {
  const [mounted, setMounted]       = useState(false);
  const [form, setForm]             = useState<F>(INIT);
  const [errors, setErrors]         = useState<Partial<F>>({});
  const [submitted, setSubmitted]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!open) return;
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      setSubmitted(false);
      setErrors({});
      setForm({ ...INIT, service: initialService ?? "" });
    } else {
      setTimeout(() => { setSubmitted(false); setForm(INIT); setErrors({}); }, 300);
    }
    return () => { document.body.style.overflow = ""; };
  }, [open, initialService]);

  const set = (k: keyof F) => (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
    setForm(f => ({ ...f, [k]: e.target.value }));
    setErrors(er => ({ ...er, [k]: "" }));
  };

  const validate = () => {
    const e: Partial<F> = {};
    if (!form.name.trim())  e.name  = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Invalid email";
    if (!form.service)      e.service = "Required";
    return e;
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    try {
      await sendEmail({
        from_name:   form.name,
        from_email:  form.email,
        phone:       form.phone,
        service:     form.service,
        budget:      form.budget,
        message:     form.message,
        page_source: "Quote Request Modal",
      }, e.currentTarget);
      setSubmitted(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      alert("Sorry, something went wrong sending your request. Please email us directly at srinath.u@infozzle.com");
    } finally {
      setSubmitting(false);
    }
  };

  /* shared field styles */
  const fieldBase: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: 10,
    color: "#fff",
    fontSize: 13,
    outline: "none",
    padding: "9px 12px 9px 32px",
    boxSizing: "border-box",
  };

  if (!mounted) return null;
  return createPortal(
    <AnimatePresence>
      {open && (
        /* ── full-screen backdrop, click-to-close ── */
        <motion.div
          ref={backdropRef}
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={e => { if (e.target === backdropRef.current) onClose(); }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(4,4,6,0.88)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
        >
          {/* ── modal card ── */}
          <motion.div
            key="card"
            initial={{ opacity: 0, scale: 0.93, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: "spring", stiffness: 360, damping: 30 }}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 600,
              background: "linear-gradient(145deg,#0f0f11,#0b0b0d)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 18,
              boxShadow: "0 0 0 1px rgba(124,58,237,0.14), 0 32px 80px rgba(0,0,0,0.8)",
              overflow: "hidden",
            }}
          >
            {/* gold top line */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 1,
              background: `linear-gradient(90deg,transparent,${GOLD},transparent)`,
              zIndex: 1,
            }} />

            {/* close */}
            <button
              onClick={onClose}
              style={{
                position: "absolute", top: 14, right: 14, zIndex: 10,
                width: 28, height: 28, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.10)",
                cursor: "pointer",
              }}
            >
              <X style={{ width: 14, height: 14, color: "rgba(255,255,255,0.55)" }} />
            </button>

            <AnimatePresence mode="wait">
              {submitted ? (
                /* ── success ── */
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center",
                    justifyContent: "center", textAlign: "center",
                    padding: "60px 40px",
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 380, damping: 20, delay: 0.08 }}
                    style={{
                      width: 56, height: 56, borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.3)",
                      marginBottom: 20,
                    }}
                  >
                    <CheckCircle2 style={{ width: 28, height: 28, color: GOLD }} />
                  </motion.div>
                  <h3 style={{ color: "#fff", fontSize: 20, fontWeight: 900, marginBottom: 10 }}>
                    Quote Request Sent!
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, lineHeight: 1.6, maxWidth: 280, marginBottom: 28 }}>
                    Thanks <span style={{ color: GOLD, fontWeight: 600 }}>{form.name.split(" ")[0]}</span>! Our team will review your project and respond within 1 business day.
                  </p>
                  <button
                    onClick={onClose}
                    style={{
                      padding: "10px 32px", borderRadius: 999,
                      background: "#7C3AED", color: "#ffffff",
                      fontWeight: 700, fontSize: 13, cursor: "pointer",
                      border: "none",
                    }}
                  >
                    Done
                  </button>
                </motion.div>
              ) : (
                /* ── form ── */
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ padding: "28px 28px 24px" }}
                >
                  {/* header */}
                  <div style={{ marginBottom: 20 }}>
                    <div style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      padding: "4px 12px", borderRadius: 999,
                      background: "rgba(124,58,237,0.10)", border: "1px solid rgba(124,58,237,0.25)",
                      color: GOLD, fontSize: 10, fontWeight: 700,
                      textTransform: "uppercase", letterSpacing: "0.08em",
                      marginBottom: 10,
                    }}>
                      <Briefcase style={{ width: 10, height: 10 }} /> Free Quote
                    </div>
                    <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 900, lineHeight: 1.2, margin: "0 0 4px" }}>
                      Tell us about your{" "}
                      <span style={{ color: GOLD }}>project</span>
                    </h2>
                    <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 12, margin: 0 }}>
                      We'll respond within 1 business day with a detailed quote.
                    </p>
                  </div>

                  <form onSubmit={submit} noValidate>
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ display: "none" }} aria-hidden="true" />
                    {/* row 1: name + email */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                      <Field label="Full Name *" icon={<User style={{ width: 13, height: 13 }} />} err={errors.name}>
                        <input type="text" placeholder="Jane Smith" value={form.name} onChange={set("name")}
                          style={{ ...fieldBase, borderColor: errors.name ? "rgba(239,68,68,0.55)" : "rgba(255,255,255,0.10)" }} />
                      </Field>
                      <Field label="Email *" icon={<Mail style={{ width: 13, height: 13 }} />} err={errors.email}>
                        <input type="email" placeholder="jane@company.com" value={form.email} onChange={set("email")}
                          style={{ ...fieldBase, borderColor: errors.email ? "rgba(239,68,68,0.55)" : "rgba(255,255,255,0.10)" }} />
                      </Field>
                    </div>

                    {/* row 2: phone + service */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                      <Field label="Phone" icon={<Phone style={{ width: 13, height: 13 }} />}>
                        <input type="tel" placeholder="+44 7700 900000" value={form.phone} onChange={set("phone")} style={fieldBase} />
                      </Field>
                      <Field label="Service *" icon={<Briefcase style={{ width: 13, height: 13 }} />} err={errors.service}>
                        <div style={{ position: "relative" }}>
                          <select value={form.service} onChange={set("service")} style={{
                            ...fieldBase,
                            paddingRight: 28,
                            appearance: "none",
                            cursor: "pointer",
                            color: form.service ? "#fff" : "rgba(255,255,255,0.3)",
                            borderColor: errors.service ? "rgba(239,68,68,0.55)" : "rgba(255,255,255,0.10)",
                          }}>
                            <option value="" disabled style={{ background: "#0f0f11" }}>Select a service…</option>
                            {SERVICES.map(s => <option key={s} value={s} style={{ background: "#0f0f11", color: "#fff" }}>{s}</option>)}
                          </select>
                          <ChevronDown style={{
                            position: "absolute", right: 9, top: "50%", transform: "translateY(-50%)",
                            width: 14, height: 14, color: "rgba(255,255,255,0.3)", pointerEvents: "none",
                          }} />
                        </div>
                      </Field>
                    </div>

                    {/* budget */}
                    <div style={{ marginBottom: 12 }}>
                      <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
                        Budget Range
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {BUDGETS.map(b => {
                          const on = form.budget === b;
                          return (
                            <button key={b} type="button" onClick={() => setForm(f => ({ ...f, budget: b }))} style={{
                              padding: "6px 12px", borderRadius: 999, fontSize: 11, fontWeight: 600,
                              cursor: "pointer", transition: "all 0.2s",
                              background: on ? GOLD : "rgba(255,255,255,0.04)",
                              color: on ? "#080316" : "rgba(255,255,255,0.5)",
                              border: on ? `1px solid ${GOLD}` : "1px solid rgba(255,255,255,0.09)",
                              boxShadow: on ? "0 0 12px rgba(124,58,237,0.28)" : "none",
                            }}>
                              {b}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* message */}
                    <div style={{ marginBottom: 16 }}>
                      <Field label="Project Details" icon={<MessageSquare style={{ width: 13, height: 13 }} />} textarea>
                        <textarea
                          placeholder="Briefly describe your project, goals, or any questions…"
                          value={form.message} onChange={set("message")} rows={3}
                          style={{ ...fieldBase, resize: "none", paddingTop: 9, paddingLeft: 32 }}
                        />
                      </Field>
                    </div>

                    {/* submit */}
                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={{ scale: 1.015, boxShadow: "0 0 32px rgba(124,58,237,0.42)" }}
                      whileTap={{ scale: 0.975 }}
                      style={{
                        width: "100%", padding: "13px 0", borderRadius: 12,
                        background: "#7C3AED", color: "#ffffff", border: "none",
                        fontWeight: 700, fontSize: 13, cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                        boxShadow: "0 0 18px rgba(124,58,237,0.22)",
                        opacity: submitting ? 0.65 : 1,
                        marginBottom: 10,
                      }}
                    >
                      {submitting ? (
                        <>
                          <motion.div animate={{ rotate: 360 }}
                            transition={{ duration: 0.75, repeat: Infinity, ease: "linear" }}
                            style={{
                              width: 14, height: 14, borderRadius: "50%",
                              border: "2px solid rgba(0,0,0,0.25)", borderTopColor: "#000",
                            }} />
                          Sending…
                        </>
                      ) : (
                        <><Send style={{ width: 13, height: 13 }} /> Send My Free Quote Request</>
                      )}
                    </motion.button>

                    <p style={{ textAlign: "center", color: "rgba(255,255,255,0.22)", fontSize: 11, margin: 0 }}>
                      No spam, ever. We'll only contact you about your project.
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

/* ── field wrapper ── */
function Field({ label, icon, err, textarea, children }: {
  label: string; icon: React.ReactNode; err?: string; textarea?: boolean; children: React.ReactNode;
}) {
  return (
    <div>
      <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
        {label}
      </p>
      <div style={{ position: "relative" }}>
        <div style={{
          position: "absolute", left: 10, zIndex: 1, pointerEvents: "none",
          color: "rgba(255,255,255,0.28)",
          top: textarea ? 10 : "50%",
          transform: textarea ? "none" : "translateY(-50%)",
        }}>
          {icon}
        </div>
        {children}
      </div>
      {err && <p style={{ marginTop: 4, fontSize: 11, color: "rgba(239,68,68,0.9)" }}>{err}</p>}
    </div>
  );
}
