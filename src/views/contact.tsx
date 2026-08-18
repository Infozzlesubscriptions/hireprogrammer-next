"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion, AnimatePresence, useScroll, useTransform, useSpring,
} from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import {
  MapPin, Phone, Mail, Send, Clock, CheckCircle2,
  ArrowRight, ChevronRight, MessageSquare,
} from "lucide-react";
import { sendEmail } from "@/lib/emailjs";

const GOLD = "#7C3AED";
const pillStyle = {
  background: "rgba(124,58,237,0.08)",
  border: "1px solid rgba(124,58,237,0.22)",
};

/* ─── Contact info cards data ─── */
const contactInfo = [
  {
    icon: MapPin,
    label: "Visit Us",
    value: "80 Telford Ave",
    sub: "London, SW2 4XF",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "0208 058 9005",
    sub: "Mon–Fri, 9am–5:30pm",
    href: "tel:02080589005",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "contact@hireprogrammer.co.uk",
    sub: "We reply within 24hrs",
    href: "mailto:contact@hireprogrammer.co.uk",
  },
];

/* ─── Why us items ─── */
const whyUs = [
  { num: "01", text: "Expert engineers across all major tech stacks" },
  { num: "02", text: "UK-based team with 10+ years of delivery experience" },
  { num: "03", text: "Transparent, milestone-driven project management" },
  { num: "04", text: "Free consultation — no commitment required" },
];

/* ─── Input field ─── */
function Field({
  label, name, type = "text", placeholder, value, onChange, rows,
}: {
  label: string; name: string; type?: string;
  placeholder: string; value: string;
  onChange: (v: string) => void; rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  const Tag = rows ? "textarea" : "input";

  return (
    <div className="relative">
      <motion.label
        animate={{ color: focused ? GOLD : "rgba(255,255,255,0.45)", y: 0 }}
        transition={{ duration: 0.18 }}
        className="block text-xs font-semibold uppercase tracking-widest mb-2"
      >
        {label}
      </motion.label>
      <div className="relative">
        <Tag
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          rows={rows}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={e => onChange(e.target.value)}
          className="w-full bg-transparent text-white placeholder-white/25 text-sm outline-none resize-none"
          style={{
            padding: rows ? "16px 16px" : "14px 16px",
            background: focused ? "rgba(124,58,237,0.05)" : "rgba(255,255,255,0.03)",
            border: `1px solid ${focused ? "rgba(124,58,237,0.45)" : "rgba(255,255,255,0.10)"}`,
            borderRadius: 14,
            transition: "all 0.22s ease",
          }}
        />
        {/* animated bottom border accent */}
        <motion.div
          className="absolute bottom-0 left-0 h-px rounded-full"
          animate={{ width: focused ? "100%" : "0%", opacity: focused ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }}
        />
      </div>
    </div>
  );
}

/* ─── Contact form ─── */
function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k: keyof typeof form) => (v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendEmail({
        from_name:   form.name,
        from_email:  form.email,
        phone:       form.phone,
        message:     form.message,
        page_source: "Contact Page",
      });
      setSent(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      alert("Sorry, something went wrong. Please email us directly at srinath.u@infozzle.com");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="rounded-3xl p-8 md:p-10 relative overflow-hidden h-full"
      style={{
        background: "rgba(8,3,22,0.85)",
        border: "1px solid rgba(124,58,237,0.14)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Corner glow */}
      <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none opacity-10"
        style={{ background: GOLD, filter: "blur(80px)", transform: "translate(30%,-30%)" }} />
      {/* Grid texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(124,58,237,1) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,1) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }} />

      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 flex flex-col items-center justify-center text-center min-h-[400px] gap-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.35)" }}
            >
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
              <p className="text-white/50 text-base max-w-xs">
                Thank you for reaching out. We'll be in touch within 24 hours.
              </p>
            </div>
            <motion.button
              onClick={() => { setSent(false); setForm({ name: "", phone: "", email: "", message: "" }); }}
              className="px-6 py-2.5 rounded-full text-sm font-semibold transition-colors"
              style={{ background: "rgba(124,58,237,0.10)", color: GOLD, border: "1px solid rgba(124,58,237,0.25)" }}
              whileHover={{ scale: 1.04 }}
            >
              Send Another
            </motion.button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="relative z-10 flex flex-col gap-6"
          >
            <div className="mb-2">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-4"
                style={pillStyle}
              >
                <MessageSquare className="w-3 h-3" /> Get In Touch
              </div>
              <h2 className="text-3xl font-bold text-white leading-tight">
                Let's start a{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C060FF] to-[#E040FF]">
                  conversation
                </span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Your Name" name="name" placeholder="John Smith" value={form.name} onChange={set("name")} />
              <Field label="Phone Number" name="phone" type="tel" placeholder="+44 7700 000000" value={form.phone} onChange={set("phone")} />
            </div>
            <Field label="Email Address" name="email" type="email" placeholder="john@company.com" value={form.email} onChange={set("email")} />
            <Field label="Tell Us About Your Project" name="message" placeholder="What are you looking to build or improve?" value={form.message} onChange={set("message")} rows={4} />

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02, boxShadow: `0 0 40px ${GOLD}55` }}
              whileTap={{ scale: 0.97 }}
              className="relative flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-bold text-sm overflow-hidden transition-all duration-300"
              style={{ background: "#7C3AED", color: "#ffffff" }}
            >
              {loading ? (
                <>
                  <motion.div
                    className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  />
                  Sending…
                </>
              ) : (
                <>
                  Send Message <Send className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Main page ─── */
export default function ContactPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  /* Hero parallax */
  const { scrollY } = useScroll();
  const heroGridY = useTransform(scrollY, [0, 600], [0, -100]);
  const heroGlowY = useTransform(scrollY, [0, 600], [0, -80]);
  const heroContentY = useTransform(scrollY, [0, 500], [0, -55]);
  const heroOpacity = useTransform(scrollY, [0, 380], [1, 0]);

  /* Info strip parallax */
  const stripY = "-20%";

  /* Main section parallax */
  const mainOrbY = "-30px";
  const mainOrbY2 = "30px";
  const mainGhostY = "-15px";

  return (
    <main className="min-h-screen bg-[#080316] text-foreground overflow-x-hidden selection:bg-primary/30">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative min-h-[52vh] flex items-center justify-center overflow-hidden pt-20 pb-20">
        {/* Parallax video layer */}
        <motion.div
          className="absolute inset-0 scale-[1.2]"
          style={{ y: heroGridY }}
        >
          <video
            autoPlay loop muted playsInline preload="none"
            className="w-full h-full object-cover"
            style={{ opacity: 0.12 }}
          >
            <source src="/hero_bg_tech_gold.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Parallax animated grid */}
        <motion.div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            y: heroGridY,
            backgroundImage: "linear-gradient(rgba(124,58,237,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.6) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
          animate={{ backgroundPosition: mounted ? ["0px 0px", "60px 60px"] : "0px 0px" }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        {/* Parallax glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ y: heroGlowY }}
        >
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 65% 55% at 50% 60%, rgba(124,58,237,0.13) 0%, transparent 70%)" }}
          />
        </motion.div>

        {/* Dark vignette */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(8,3,22,0.65) 0%, rgba(8,3,22,0.45) 50%, rgba(8,3,22,0.80) 100%)" }}
        />

        {/* Content */}
        <motion.div
          className="relative z-10 text-center px-6 max-w-3xl mx-auto"
          style={{ y: heroContentY, opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-6"
            style={pillStyle}
          >
            <MapPin className="w-3 h-3" /> London, UK — Available Worldwide
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-bold leading-[1.05] mb-5 tracking-tight"
          >
            Contact{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">
              Hire Programmer
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-white/50 text-xl leading-relaxed max-w-xl mx-auto"
          >
            Tell us about your project and we'll get back to you within 24 hours with a tailored plan.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Contact Info Strip ── */}
      <div
        className="relative overflow-hidden"
        style={{ background: "rgba(6,2,16,0.95)", borderTop: "1px solid rgba(124,58,237,0.12)", borderBottom: "1px solid rgba(124,58,237,0.12)" }}
      >
        <motion.div style={{ y: stripY }} className="w-full px-6 lg:px-10 max-w-7xl mx-auto py-8">
          <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/[0.07]">
            {contactInfo.map((item, i) => {
              const Icon = item.icon;
              const inner = (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-4 px-6 md:px-8 py-5 group cursor-pointer"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{ background: "rgba(124,58,237,0.10)", border: "1px solid rgba(124,58,237,0.22)" }}
                  >
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-white/35 font-semibold mb-0.5">{item.label}</div>
                    <div className="text-white text-sm font-semibold group-hover:text-primary transition-colors">{item.value}</div>
                    <div className="text-white/35 text-xs">{item.sub}</div>
                  </div>
                  {item.href && (
                    <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-primary ml-auto transition-colors" />
                  )}
                </motion.div>
              );
              return item.href ? (
                <a key={item.label} href={item.href}>{inner}</a>
              ) : (
                <div key={item.label}>{inner}</div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* ── Main section: form + why us ── */}
      <section className="py-24 relative overflow-hidden">
        {/* Parallax orbs */}
        <motion.div
          className="absolute top-20 left-[-100px] w-96 h-96 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${GOLD}07 0%, transparent 70%)`, y: mainOrbY }}
        />
        <motion.div
          className="absolute bottom-10 right-[-80px] w-72 h-72 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${GOLD}06 0%, transparent 70%)`, y: mainOrbY2 }}
        />

        {/* Ghost text */}
        <motion.div
          className="absolute bottom-16 left-6 text-[130px] font-black pointer-events-none select-none leading-none"
          style={{ color: "rgba(124,58,237,0.022)", y: mainGhostY }}
        >
          HIRE
        </motion.div>

        <div className="w-full px-6 lg:px-10 max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-5 gap-10 items-end">

            {/* Left: form (3 cols) */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>

            {/* Right: info panel (2 cols) */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Why us card */}
              <motion.div
                initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5 }}
                className="rounded-3xl p-8 relative overflow-hidden"
                style={{ background: "rgba(8,3,22,0.85)", border: "1px solid rgba(124,58,237,0.12)", backdropFilter: "blur(20px)" }}
              >
                <div className="absolute top-0 left-0 w-48 h-48 pointer-events-none opacity-8"
                  style={{ background: GOLD, filter: "blur(70px)", transform: "translate(-40%,-40%)" }} />

                <div className="relative z-10">
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5"
                    style={pillStyle}
                  >
                    Why HireProgrammer
                  </div>
                  <h3 className="text-xl font-bold text-white mb-6 leading-snug">
                    Four reasons clients{" "}
                    <span className="text-primary">choose us</span>
                  </h3>
                  <div className="flex flex-col gap-4">
                    {whyUs.map((item, i) => (
                      <motion.div
                        key={item.num}
                        initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.09 }}
                        className="flex items-start gap-3"
                      >
                        <span
                          className="text-sm font-black flex-shrink-0 mt-0.5"
                          style={{ color: "rgba(124,58,237,0.45)" }}
                        >
                          {item.num}
                        </span>
                        <p className="text-white/60 text-sm leading-relaxed">{item.text}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Office hours card */}
              <motion.div
                initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-3xl p-7 relative overflow-hidden"
                style={{ background: "rgba(8,3,22,0.7)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(16px)" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(124,58,237,0.10)", border: "1px solid rgba(124,58,237,0.22)" }}
                  >
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-white font-semibold text-sm">Office Hours</span>
                </div>
                <div className="flex flex-col gap-2.5">
                  {[
                    { day: "Monday",    time: "9:00 AM – 5:30 PM" },
                    { day: "Tuesday",   time: "9:00 AM – 5:30 PM" },
                    { day: "Wednesday", time: "9:00 AM – 5:30 PM" },
                    { day: "Thursday",  time: "9:00 AM – 5:30 PM" },
                    { day: "Friday",    time: "9:00 AM – 5:30 PM" },
                    { day: "Saturday",  time: "Closed" },
                    { day: "Sunday",    time: "Closed" },
                  ].map(row => (
                    <div key={row.day} className="flex justify-between items-center">
                      <span className="text-white/45 text-xs">{row.day}</span>
                      <span
                        className="text-xs font-semibold"
                        style={{ color: row.time === "Closed" ? "rgba(255,255,255,0.25)" : GOLD }}
                      >
                        {row.time}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Quick CTA card */}
              <motion.a
                href="tel:02080589005"
                initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.18 }}
                whileHover={{ scale: 1.02, boxShadow: `0 0 40px ${GOLD}30` }}
                className="rounded-3xl p-6 flex items-center gap-4 cursor-pointer transition-all duration-300"
                style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.25)" }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: GOLD }}
                >
                  <Phone className="w-5 h-5 text-black" />
                </div>
                <div className="flex-1">
                  <div className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-0.5">Prefer to call?</div>
                  <div className="text-white font-bold text-lg">0208 058 9005</div>
                </div>
                <ArrowRight className="w-5 h-5 text-primary" />
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4) 50%, transparent)" }} />

      {/* ── CTA Banner ── */}
      <section className="py-24 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: mounted ? [0.4, 0.7, 0.4] : 0.4 }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.07) 0%, transparent 50%, rgba(124,58,237,0.07) 100%)" }}
        />
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.5) 50%, transparent)" }} />
        <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.3) 50%, transparent)" }} />

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight"
          >
            Ready to hire your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C060FF] to-[#E040FF]">
              next developer?
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/50 text-lg mb-10 leading-relaxed"
          >
            Join over 200 businesses across the UK that trust HireProgrammer for elite engineering talent.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.18 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="mailto:contact@hireprogrammer.co.uk"
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(124,58,237,0.45)]"
              style={{ background: "#7C3AED", color: "#ffffff" }}
            >
              Email Us <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="tel:02080589005"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm text-white/60 hover:text-white transition-colors"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <Phone className="w-4 h-4" /> 0208 058 9005
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
