"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { useQuoteModal } from '@/context/QuoteModalContext';
import { sendEmail } from "@/lib/emailjs";
import {
  ArrowRight, ChevronDown, Sparkles, CheckCircle2, Users,
  BookOpen, Award, BarChart2, Zap, Shield, Clock, Star, MessageSquare, X, Send,
} from "lucide-react";

/* ── Enquiry Modal ── */
function EnquiryModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    setSending(true);
    try {
      await sendEmail({
        from_name:   form.name,
        from_email:  form.email,
        phone:       form.phone,
        message:     form.message,
        page_source: "AI Team Training Enquiry",
      }, e.currentTarget);
      setSent(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      alert("Sorry, something went wrong. Please email us directly at srinath.u@infozzle.com");
    } finally {
      setSending(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setSent(false); setForm({ name: "", email: "", phone: "", message: "" }); }, 300);
  };

  if (!mounted || !open) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
          onClick={e => { if (e.target === e.currentTarget) handleClose(); }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 20 }} transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="relative w-full max-w-md rounded-2xl p-8 overflow-hidden"
            style={{ background: "#0d0720", border: "1px solid rgba(124,58,237,0.25)", boxShadow: "0 0 60px rgba(124,58,237,0.15)" }}
          >
            {/* Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none opacity-15"
              style={{ background: PURPLE, filter: "blur(70px)", transform: "translate(30%,-30%)" }} />

            <button onClick={handleClose} className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/10">
              <X className="w-4 h-4 text-white/60" />
            </button>

            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)" }}>
                    <CheckCircle2 className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">Enquiry Received!</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-6">We'll be in touch within 24 hours to discuss your AI team training requirements.</p>
                  <button onClick={handleClose} className="px-6 py-2.5 rounded-full font-semibold text-sm transition-all hover:scale-105"
                    style={{ background: PURPLE, color: "#fff" }}>Close</button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="mb-6">
                    <h3 className="text-white font-bold text-xl mb-1">Enquire Now</h3>
                    <p className="text-white/40 text-sm">Tell us about your team — we'll get back to you within 24 hours.</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                    {[
                      { key: "name",    label: "Your Name *",        type: "text",  placeholder: "Jane Smith" },
                      { key: "email",   label: "Email Address *",    type: "email", placeholder: "jane@company.co.uk" },
                      { key: "phone",   label: "Phone Number",       type: "tel",   placeholder: "+44 20 XXXX XXXX" },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="block text-white/50 text-xs font-semibold uppercase tracking-wider mb-1.5">{f.label}</label>
                        <input type={f.type} placeholder={f.placeholder} value={form[f.key as keyof typeof form]}
                          onChange={set(f.key as keyof typeof form)}
                          className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all"
                          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
                          onFocus={e => (e.currentTarget.style.borderColor = `${PURPLE}66`)}
                          onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")} />
                      </div>
                    ))}
                    <div>
                      <label className="block text-white/50 text-xs font-semibold uppercase tracking-wider mb-1.5">Tell us about your team</label>
                      <textarea rows={3} placeholder="e.g. 12-person marketing team, need AI tools training..."
                        value={form.message} onChange={set("message")}
                        className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all resize-none"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
                        onFocus={e => (e.currentTarget.style.borderColor = `${PURPLE}66`)}
                        onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")} />
                    </div>
                    <button type="submit" disabled={sending}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-sm transition-all duration-300 disabled:opacity-60 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(124,58,237,0.35)]"
                      style={{ background: PURPLE, color: "#fff" }}>
                      {sending ? "Sending…" : <><Send className="w-4 h-4" /> Send Enquiry</>}
                    </button>
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

const PURPLE = "#7C3AED";
const pillStyle = { background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.22)" };
const cardStyle = { background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" };

const highlights = [
  "Practical AI tool usage",
  "Ethical guidelines & best practices",
  "Hands-on workshop exercises",
  "Ongoing support & resources",
];

const workshopFeatures = [
  "AI fundamentals & real-world applications",
  "Hands-on tool demonstrations",
  "Immediate implementation strategies",
  "Complete team transformation",
];

const workshopPerfectFor = [
  "Teams new to AI who want to get started quickly",
  "Businesses looking for immediate AI implementation",
  "Organisations needing practical, actionable AI skills",
];

const modules = [
  { icon: BookOpen, title: "Practical Knowledge",   body: "Your team gains real-world AI skills they can use immediately — no theory overload." },
  { icon: Award,    title: "Certification",          body: "Official completion certificates for professional development and team recognition." },
  { icon: BarChart2,title: "Measurable Results",    body: "Track productivity improvements and skill development progress over time." },
];

const whatWeCover = [
  "AI Fundamentals for Business",
  "Ethical AI Usage Guidelines",
  "Prompt Engineering Mastery",
  "AI Tools for Daily Workflows",
  "Data Privacy & Security",
  "Hands-on Practice Sessions",
];

const faqs = [
  { q: "How quickly will my team see productivity improvements?", a: "Most teams report measurable productivity gains within the first week of applying the training. The AI Accelerator Workshop is designed for immediate implementation — your team leaves with skills they can use the same day." },
  { q: "Is the training suitable for non-technical teams?", a: "Absolutely. Our training is specifically designed for non-technical professionals. We focus on practical applications and tools rather than coding or technical theory, so anyone can participate regardless of their background." },
  { q: "What AI tools will my team learn to use?", a: "We cover the most widely adopted AI tools for business — including ChatGPT, Claude, Gemini, and specialist tools for your industry. We tailor the toolkit to what will genuinely benefit your team's daily workflows." },
  { q: "Do you provide ongoing support after training?", a: "Yes. All packages include 30 days of post-training support via email and chat. Our Premium package includes 12 months of ongoing support, monthly Q&A sessions, and access to updated training materials as AI tools evolve." },
  { q: "How much does AI training cost?", a: "Our AI Accelerator Workshop starts from £497 per session for up to 10 team members. Full transformation packages are tailored to your team size and goals — contact us for a custom quote." },
];

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  return (
    <motion.details
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="group rounded-xl overflow-hidden"
      style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none gap-4 [&::-webkit-details-marker]:hidden">
        <span className="text-white font-semibold text-sm leading-snug">{q}</span>
        <ChevronDown className="w-5 h-5 text-primary flex-shrink-0 transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <div className="px-6 pb-5 text-white/55 text-sm leading-relaxed border-t border-white/5 pt-4">{a}</div>
    </motion.details>
  );
}

export default function AiTeamTrainingPage() {
  const { openQuoteModal } = useQuoteModal();
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [heroForm, setHeroForm] = useState({ name: "", email: "", phone: "", team: "" });
  const [heroSent, setHeroSent] = useState(false);
  const [heroSending, setHeroSending] = useState(false);

  const setHero = (k: keyof typeof heroForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setHeroForm(f => ({ ...f, [k]: e.target.value }));

  const handleHeroSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!heroForm.name.trim() || !heroForm.email.trim()) return;
    setHeroSending(true);
    try {
      await sendEmail({
        from_name:   heroForm.name,
        from_email:  heroForm.email,
        phone:       heroForm.phone,
        message:     heroForm.team,
        page_source: "AI Team Training Hero Form",
      }, e.currentTarget);
      setHeroSent(true);
    } catch {
      alert("Sorry, something went wrong. Please email us directly at contact@hireprogrammer.co.uk");
    } finally {
      setHeroSending(false);
    }
  };
  return (
    <main className="min-h-screen bg-[#080316] text-foreground overflow-x-hidden selection:bg-primary/30">
      <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 30% 40%, rgba(124,58,237,0.09) 0%, transparent 65%)" }} />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-14 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-6" style={pillStyle}>
              <Users className="w-3 h-3" /> Team Empowerment
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.65 }}
              className="font-black text-white leading-[1.08] tracking-tight mb-6"
              style={{ fontSize: "clamp(2.2rem, 4.8vw, 4rem)" }}>
              AI Team Training{" "}
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #e070ff 0%, #a040ff 50%, #c040ff 100%)" }}>
                Services
              </span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
              className="text-white/55 text-lg leading-relaxed mb-8 max-w-lg">
              Empower your non-tech teams to use AI confidently and ethically. Our hands-on workshops turn AI complexity into clear, actionable skills your team can use immediately.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-3">
              <a href="/contact-us"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(124,58,237,0.45)]"
                style={{ background: PURPLE, color: "#ffffff" }}>
                Book Training Session <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>

          {/* ── Hero inline form ── */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.7 }}
            className="rounded-2xl p-8 relative overflow-hidden"
            style={{ background: "rgba(6,2,16,0.85)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>
            {/* subtle glow */}
            <div className="absolute top-0 right-0 w-56 h-56 pointer-events-none opacity-10"
              style={{ background: PURPLE, filter: "blur(80px)", transform: "translate(30%,-30%)" }} />

            <AnimatePresence mode="wait">
              {heroSent ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10 relative z-10">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)" }}>
                    <CheckCircle2 className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">Enquiry Received!</h3>
                  <p className="text-white/50 text-sm leading-relaxed">We'll be in touch within 24 hours to discuss your AI team training requirements.</p>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10">
                  <div className="mb-6">
                    <h3 className="text-white font-bold text-xl mb-1">Book Your Training Session</h3>
                    <p className="text-white/40 text-sm">Free consultation, no commitment</p>
                  </div>
                  <form onSubmit={handleHeroSubmit} className="space-y-4">
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                    {[
                      { key: "name",  label: "FULL NAME *",       type: "text",  placeholder: "Jane Smith" },
                      { key: "email", label: "EMAIL ADDRESS *",   type: "email", placeholder: "jane@company.co.uk" },
                      { key: "phone", label: "PHONE NUMBER",      type: "tel",   placeholder: "+44 20 XXXX XXXX" },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="block text-white/50 text-xs font-semibold tracking-wider mb-1.5">{f.label}</label>
                        <input
                          type={f.type}
                          placeholder={f.placeholder}
                          value={heroForm[f.key as keyof typeof heroForm]}
                          onChange={setHero(f.key as keyof typeof heroForm)}
                          className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all"
                          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
                          onFocus={e => (e.currentTarget.style.borderColor = `${PURPLE}66`)}
                          onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")}
                        />
                      </div>
                    ))}
                    <div>
                      <label className="block text-white/50 text-xs font-semibold tracking-wider mb-1.5">TEAM SIZE & GOALS</label>
                      <textarea
                        rows={3}
                        placeholder="e.g. 15-person marketing team, need AI tools training..."
                        value={heroForm.team}
                        onChange={setHero("team")}
                        className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all resize-none"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
                        onFocus={e => (e.currentTarget.style.borderColor = `${PURPLE}66`)}
                        onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={heroSending}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 disabled:opacity-60 hover:brightness-110 hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
                      style={{ background: PURPLE, color: "#fff" }}>
                      {heroSending ? "Sending…" : "Get a Free Quote"}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4) 50%, transparent)" }} />

      {/* ── AI Accelerator Workshop ── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(124,58,237,0.04) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="text-center mb-10">
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>
              <Zap className="w-3 h-3" /> Featured Workshop
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
              className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              AI Accelerator{" "}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #e070ff 0%, #a040ff 50%, #c040ff 100%)" }}>
                Workshop
              </span>
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.14 }}
              className="text-white/45 text-sm max-w-lg mx-auto">
              Get your team AI-ready in just 2 hours! Our intensive crash course covers the essentials of AI for business in a focused, practical session.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="p-8 rounded-2xl" style={cardStyle}>
              <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-5">Workshop Highlights — Everything your team needs to start using AI effectively</p>
              <div className="grid grid-cols-3 gap-4 mb-7">
                {[{ val: "2", label: "Hours Only" }, { val: "AI", label: "Essentials" }, { val: "100%", label: "Practical" }].map((s, i) => (
                  <div key={i} className="text-center p-3 rounded-xl" style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.15)" }}>
                    <div className="text-2xl font-black mb-1" style={{ color: PURPLE }}>{s.val}</div>
                    <div className="text-xs text-white/40">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-2.5">
                {workshopFeatures.map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-white/65 text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <div className="p-7 rounded-2xl mb-5" style={cardStyle}>
                <h4 className="text-white font-bold text-sm mb-4">Perfect For:</h4>
                <div className="space-y-2.5">
                  {workshopPerfectFor.map((pf, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: PURPLE }} />
                      <span className="text-white/60 text-sm leading-snug">{pf}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={() => setEnquiryOpen(true)}
                className="flex items-center justify-center gap-2 w-full py-4 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(124,58,237,0.4)]"
                style={{ background: PURPLE, color: "#ffffff" }}>
                Enquire Now <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-center text-white/30 text-xs mt-3">Limited seats available · Most popular workshop</p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25) 50%, transparent)" }} />

      {/* ── Training Modules ── */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>
              <BookOpen className="w-3 h-3" /> Curriculum
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
              className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              Training{" "}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #e070ff 0%, #a040ff 50%, #c040ff 100%)" }}>
                Modules
              </span>
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.14 }}
              className="text-white/45 text-sm max-w-md mx-auto">
              Comprehensive curriculum designed for non-technical professionals who want to leverage AI in their daily work.
            </motion.p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 mb-14">
            {modules.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09 }}
                  className="group p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30" style={cardStyle}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-[0_0_14px_rgba(124,58,237,0.3)] transition-all duration-300"
                    style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.22)" }}>
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="text-white font-bold text-base mb-2 group-hover:text-primary transition-colors">{m.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{m.body}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <motion.h3 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="text-xl font-bold text-white mb-6">What We Cover</motion.h3>
              <div className="space-y-3">
                {whatWeCover.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                    className="flex items-center gap-3 p-4 rounded-xl" style={cardStyle}>
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-white/65 text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                className="mt-6 p-5 rounded-2xl" style={{ background: "rgba(124,58,237,0.05)", border: "1px solid rgba(124,58,237,0.15)" }}>
                <h4 className="text-white font-semibold text-sm mb-2">Training Format</h4>
                <p className="text-white/50 text-sm leading-relaxed">
                  Interactive workshops combining theory with hands-on practice. Sessions can be delivered on-site or remotely, tailored to your team's schedule and learning preferences.
                </p>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="p-8 rounded-2xl" style={{ background: "rgba(6,2,16,0.7)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>
              <h3 className="text-white font-bold text-lg mb-1">Ready to Upskill Your Team?</h3>
              <p className="text-white/40 text-sm mb-6">Transform your team into confident AI users with our practical training programs.</p>
              <a href="/contact-us"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-bold text-sm mb-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(124,58,237,0.35)]"
                style={{ background: PURPLE, color: "#ffffff" }}>
                Schedule a Consultation
              </a>
              <div className="grid grid-cols-2 gap-4">
                {[{ val: "500+", label: "Professionals Trained" }, { val: "95%", label: "Satisfaction Rate" }].map((s, i) => (
                  <div key={i} className="text-center p-4 rounded-xl" style={cardStyle}>
                    <div className="text-2xl font-black mb-1" style={{ color: PURPLE }}>{s.val}</div>
                    <div className="text-xs text-white/40">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25) 50%, transparent)" }} />

      {/* ── FAQ ── */}
      <section className="py-24 relative">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>
              <MessageSquare className="w-3 h-3" /> FAQ
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
              className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Frequently Asked{" "}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #e070ff 0%, #a040ff 50%, #c040ff 100%)" }}>Questions</span>
            </motion.h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} index={i} />)}
          </div>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25) 50%, transparent)" }} />

      {/* ── CTA ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(124,58,237,0.08) 0%, transparent 70%)" }} />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
            Ready to Transform{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #e070ff 0%, #a040ff 50%, #c040ff 100%)" }}>
              Your Team?
            </span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-white/50 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Join hundreds of UK businesses whose teams already use AI confidently every day with AI training.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-wrap items-center justify-center gap-4">
            <a href="/contact-us"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(124,58,237,0.45)]"
              style={{ background: PURPLE, color: "#ffffff" }}>
              Get Your Team Started <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
