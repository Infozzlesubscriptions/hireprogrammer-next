"use client";

import { motion } from "framer-motion";
import { HeroContactForm } from '@/components/sections/HeroContactForm';
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import {
  ArrowRight, Sparkles, CheckCircle2, TrendingUp, Layers, Cpu,
  Settings, Zap, Clock,
} from "lucide-react";

const PURPLE = "#7C3AED";
const pillStyle = { background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.22)" };
const cardStyle = { background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" };

const processSteps = [
  { n: "01", title: "Process Analysis",     body: "We map your current workflows to identify automation opportunities and quick wins." },
  { n: "02", title: "Custom Design",        body: "We build automation solutions tailored to your specific business requirements." },
  { n: "03", title: "Implementation",       body: "Deploy and integrate automation into your existing stack with minimal disruption." },
  { n: "04", title: "Training & Support",   body: "Ensure your team can manage and optimise the automation long-term." },
];

const benefits = [
  { icon: TrendingUp, title: "Efficiency Gains",     body: "Reduce manual work by up to 80% with intelligent automation across your processes." },
  { icon: Layers,     title: "Scalable Solutions",   body: "Automation that grows with your business needs — no rework when you scale." },
  { icon: Cpu,        title: "Smart Integration",    body: "Seamlessly connect all your existing tools and systems without disruption." },
];

const opportunities = [
  "Document processing and data extraction",
  "Email management and auto-responses",
  "Inventory management and ordering",
  "Report generation and analytics",
  "Customer onboarding flows",
  "Quality assurance processes",
];

const quickFacts = [
  "Implementation in 2–4 weeks",
  "ROI typically within 3 months",
  "Ongoing support included",
];

export default function WorkflowAutomationPage() {
  return (
    <main className="min-h-screen bg-[#080316] text-foreground overflow-x-hidden selection:bg-primary/30">
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
              <Settings className="w-3 h-3" /> Process Optimisation
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.65 }}
              className="font-black text-white leading-[1.08] tracking-tight mb-6"
              style={{ fontSize: "clamp(2.2rem, 4.8vw, 4rem)" }}>
              Expert{" "}
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #e070ff 0%, #a040ff 50%, #c040ff 100%)" }}>
                Workflow Automation Services
              </span>{" "}
              for Your Business
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
              className="text-white/55 text-lg leading-relaxed mb-8 max-w-lg">
              Streamline your business processes with intelligent automation that adapts to your unique requirements. Free your team from repetitive tasks and focus on what matters most.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-3">
              <a href="/contact-us"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(124,58,237,0.45)]"
                style={{ background: PURPLE, color: "#ffffff" }}>
                Automate Your Workflows <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.7 }}
            className="rounded-2xl p-8"
            style={{ background: "rgba(6,2,16,0.7)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>
            <h3 className="text-white font-bold text-xl mb-1">Start Your Project</h3>
            <p className="text-white/40 text-sm mb-6">Free consultation, no commitment</p>
            <HeroContactForm pageName="Workflow Automation" extraField={{ label: "Requirement", type: "text", placeholder: "Describe your workflow needs..." }} />
          </motion.div>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4) 50%, transparent)" }} />

      {/* ── Our Automation Process ── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(124,58,237,0.04) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="text-center mb-14">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>
              <Sparkles className="w-3 h-3" /> How It Works
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
              className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              Our{" "}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #e070ff 0%, #a040ff 50%, #c040ff 100%)" }}>
                Automation Process
              </span>
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.14 }}
              className="text-white/45 text-sm max-w-md mx-auto">
              From analysis to implementation — we ensure your automation delivers maximum value with minimal disruption.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {processSteps.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="relative p-6 rounded-2xl" style={cardStyle}>
                <div className="text-4xl font-black mb-4 leading-none" style={{ color: "rgba(124,58,237,0.18)" }}>{s.n}</div>
                <h3 className="text-white font-bold text-sm mb-2">{s.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{s.body}</p>
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px" style={{ background: "rgba(124,58,237,0.3)" }} />
                )}
              </motion.div>
            ))}
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09 }}
                  className="group p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30" style={cardStyle}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-[0_0_14px_rgba(124,58,237,0.3)] transition-all"
                    style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.22)" }}>
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="text-white font-bold text-base mb-2 group-hover:text-primary transition-colors">{b.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{b.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25) 50%, transparent)" }} />

      {/* ── Opportunities + CTA ── */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <motion.h3 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="text-2xl font-bold text-white mb-6">Automation Opportunities</motion.h3>
              <div className="space-y-3">
                {opportunities.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                    className="flex items-center gap-3 p-4 rounded-xl" style={cardStyle}>
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-white/65 text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="p-8 rounded-2xl" style={{ background: "rgba(6,2,16,0.7)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>
              <h3 className="text-white font-bold text-lg mb-1">Ready to Automate?</h3>
              <p className="text-white/40 text-sm mb-6">Let's identify the automation opportunities that will have the biggest impact on your business.</p>
              <a href="/contact-us"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-bold text-sm mb-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(124,58,237,0.35)]"
                style={{ background: PURPLE, color: "#ffffff" }}>
                Schedule a Consultation
              </a>
              <a href="/clients"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-semibold text-sm text-white/60 hover:text-white transition-colors mb-6"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                View Case Studies
              </a>
              <div className="p-5 rounded-xl" style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.15)" }}>
                <h4 className="text-white font-semibold text-sm mb-3">Quick Facts</h4>
                <div className="space-y-2">
                  {quickFacts.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-white/55">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
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
            Stop Doing It{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #e070ff 0%, #a040ff 50%, #c040ff 100%)" }}>
              Manually
            </span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-white/50 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Let automation handle the repetitive work so your team can focus on what actually grows the business.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-wrap items-center justify-center gap-4">
            <a href="/contact-us"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(124,58,237,0.45)]"
              style={{ background: PURPLE, color: "#ffffff" }}>
              Automate My Workflows <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
