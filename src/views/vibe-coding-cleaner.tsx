"use client";

import { motion } from "framer-motion";
import { HeroContactForm } from '@/components/sections/HeroContactForm';
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { useQuoteModal } from '@/context/QuoteModalContext';
import {
  ArrowRight, Sparkles, CheckCircle2, Trash2, Clock, TrendingUp, Code2,
} from "lucide-react";

const PURPLE = "#7C3AED";
const pillStyle = { background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.22)" };
const cardStyle = { background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" };

const cleanUpBenefits = [
  { icon: Trash2,      title: "Deep Clean",          body: "Comprehensive analysis and cleanup of your entire codebase — nothing missed." },
  { icon: Clock,       title: "Time Saver",           body: "Free your team from technical debt to focus on building new features." },
  { icon: TrendingUp,  title: "Better Performance",  body: "Optimised code that runs faster, uses fewer resources, and loads in milliseconds." },
];

const cleanupProcess = [
  "Remove dead code and unused dependencies",
  "Improve code readability and documentation",
  "Fix technical debt and code smells",
  "Optimise performance bottlenecks",
  "Standardise coding patterns",
  "Update outdated dependencies safely",
];

const perfectFor = [
  "Projects started months/years ago that need revival",
  "Codebases with multiple contributors and no standards",
  "Applications suffering from performance issues",
  "Code inherited from previous developers",
  "Pre-launch cleanup before going to production",
];

const whatYouGet = [
  "Comprehensive code audit report",
  "Technical debt assessment",
  "Prioritised cleanup roadmap",
  "Cost & timeline estimate",
  "Performance optimisation plan",
];

export default function VibeCodingCleanerPage() {
  const { openQuoteModal } = useQuoteModal();
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
              <Code2 className="w-3 h-3" /> Code Cleanup
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.65 }}
              className="font-black text-white leading-[1.08] tracking-tight mb-6"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.6rem)" }}>
              Professional{" "}
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #e070ff 0%, #a040ff 50%, #c040ff 100%)" }}>
                Vibe Coding Cleaner
              </span>{" "}
              Services
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
              className="text-white/55 text-lg leading-relaxed mb-8 max-w-lg">
              Started a project months or years ago and now it's full of technical debt? We dive deep into your codebase and clean it to perfection — removing dead code, fixing bugs, optimising performance, and making it maintainable again.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-3">
              <a href="/contact-us"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(124,58,237,0.45)]"
                style={{ background: PURPLE, color: "#ffffff" }}>
                Request Code Audit <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.7 }}
            className="rounded-2xl p-8"
            style={{ background: "rgba(6,2,16,0.7)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>
            <h3 className="text-white font-bold text-xl mb-1">Start Your Project</h3>
            <p className="text-white/40 text-sm mb-6">Free consultation, no commitment</p>
            <HeroContactForm pageName="Vibe Coding Cleaner" extraField={{ label: "Requirement", type: "text", placeholder: "Describe your codebase..." }} />
          </motion.div>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4) 50%, transparent)" }} />

      {/* ── What We Clean Up ── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(124,58,237,0.04) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="text-center mb-14">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>
              <Sparkles className="w-3 h-3" /> Our Scope
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
              className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              What We{" "}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #e070ff 0%, #a040ff 50%, #c040ff 100%)" }}>
                Clean Up
              </span>
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.14 }}
              className="text-white/45 text-sm max-w-md mx-auto">
              From legacy code to modern messes — we handle all aspects of code cleanup to give you a fresh, maintainable codebase.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {cleanUpBenefits.map((b, i) => {
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

      {/* ── Cleanup Process + CTA ── */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <motion.h3 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="text-2xl font-bold text-white mb-6">Our Cleanup Process</motion.h3>
              <div className="space-y-3 mb-8">
                {cleanupProcess.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                    className="flex items-center gap-3 p-4 rounded-xl" style={cardStyle}>
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-white/65 text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="p-6 rounded-2xl" style={{ background: "rgba(124,58,237,0.05)", border: "1px solid rgba(124,58,237,0.15)" }}>
                <h4 className="text-white font-bold text-sm mb-3">Perfect For:</h4>
                <ul className="space-y-2">
                  {perfectFor.map((pf, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/55">
                      <span className="text-primary flex-shrink-0 mt-1">•</span>
                      {pf}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="p-8 rounded-2xl" style={{ background: "rgba(6,2,16,0.7)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>
              <h3 className="text-white font-bold text-lg mb-1">Ready for Clean Code?</h3>
              <p className="text-white/40 text-sm mb-6">Let's audit your codebase and create a cleanup plan tailored to your project.</p>
              <a href="/contact-us"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-bold text-sm mb-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(124,58,237,0.35)]"
                style={{ background: PURPLE, color: "#ffffff" }}>
                Book Free Code Audit
              </a>
              <a href="/clients"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-semibold text-sm text-white/60 hover:text-white transition-colors mb-6"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                View Success Stories
              </a>
              <div className="p-5 rounded-xl" style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.15)" }}>
                <h4 className="text-white font-semibold text-sm mb-3">What You'll Get:</h4>
                <div className="space-y-2">
                  {whatYouGet.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-white/55">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      {item}
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
            Time to Kill the{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #e070ff 0%, #a040ff 50%, #c040ff 100%)" }}>
              Technical Debt
            </span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-white/50 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            A clean codebase ships faster, breaks less, and is worth more. Let's transform yours in weeks, not months.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-wrap items-center justify-center gap-4">
            <a href="/contact-us"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(124,58,237,0.45)]"
              style={{ background: PURPLE, color: "#ffffff" }}>
              Start My Code Cleanup <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
