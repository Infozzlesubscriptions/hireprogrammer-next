"use client";

import { useState } from "react";
import { HeroContactForm } from '@/components/sections/HeroContactForm';
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import {
  ArrowRight, ChevronDown, Sparkles, CheckCircle2, TrendingUp,
  Users, Clock, Shield, BookOpen, MessageSquare, Zap,
} from "lucide-react";

const PURPLE = "#7C3AED";
const pillStyle = { background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.22)" };
const cardStyle = { background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" };

const achievements = [
  { icon: TrendingUp, title: "40% Productivity Boost",  body: "Teams become measurably more efficient within the first month of applying AI skills." },
  { icon: BookOpen,   title: "75% Faster Learning",     body: "AI-assisted workflows dramatically reduce the time it takes to onboard new skills." },
  { icon: Shield,     title: "100% GDPR Compliant",     body: "Every tool and workflow we teach meets UK and EU data protection requirements." },
  { icon: Clock,      title: "12 Months Support",       body: "Ongoing access to resources, updates, and Q&A sessions well after training ends." },
];

const curriculum = [
  { module: "Module 1", title: "AI Fundamentals for Business",  hours: "3 hrs", body: "Core AI concepts and real-world business applications across industries." },
  { module: "Module 2", title: "Practical AI Tools Mastery",    hours: "4 hrs", body: "Hands-on training with the leading AI tools your team will use every day." },
  { module: "Module 3", title: "AI Workflow Integration",       hours: "3 hrs", body: "Embed AI into your existing processes to save time and reduce errors." },
  { module: "Module 4", title: "Ethics & Compliance",           hours: "2 hrs", body: "Responsible AI use, bias awareness, and GDPR-compliant workflows." },
  { module: "Module 5", title: "Advanced Applications",         hours: "3 hrs", body: "Deep dives into AI for marketing, operations, customer service, and more." },
];

const everythingYouGet = [
  "Reduce manual work by up to 30%",
  "Eliminate compliance and deviation risk",
  "Faster AI to 100% GDPR compliance",
  "Access to latest tools and updates",
  "Tackle AI with confidence and direction",
  "Weekly group coaching sessions",
  "Private team community access",
];

const steps = [
  { n: "01", title: "Skills Assessment",      body: "We evaluate your team's current AI knowledge and identify the biggest productivity gaps." },
  { n: "02", title: "Custom Curriculum",      body: "We build a tailored training plan around your industry, tools, and team goals." },
  { n: "03", title: "Interactive Training",   body: "Live, hands-on sessions combining theory, real tools, and immediate practice." },
  { n: "04", title: "Implementation Support", body: "We stay with your team as they apply skills in real work — not just in training." },
];

const faqs = [
  { q: "How quickly will my team see productivity improvements?", a: "Most teams report a 20–30% productivity lift within the first two weeks of applying what they've learned. The full 40% improvement typically shows after 30 days of consistent AI tool usage in daily workflows." },
  { q: "Is the training suitable for non-technical teams?", a: "Yes — this programme is specifically designed for non-technical professionals. No coding required. We focus on using AI tools practically, so anyone from marketing to finance to operations can benefit immediately." },
  { q: "What AI tools will my team learn to use?", a: "We cover the most widely adopted tools — ChatGPT, Claude, Gemini, Notion AI, and role-specific tools for your industry. We tailor the toolkit to what will genuinely benefit your team's daily workflows." },
  { q: "Do you provide ongoing support after training?", a: "Yes. All transformation packages include 12 months of post-training support with monthly Q&A sessions, updated course materials as AI evolves, and a private team community for ongoing questions." },
  { q: "How much does AI training cost?", a: "Team Transformation packages start from £1,497 for teams of up to 10. Larger enterprise teams receive custom pricing. Contact us for a tailored quote that matches your team size and goals." },
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

export default function AiTeamTransformationPage() {
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
              <Zap className="w-3 h-3" /> Team Transformation
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.65 }}
              className="font-black text-white leading-[1.08] tracking-tight mb-6"
              style={{ fontSize: "clamp(2.2rem, 4.8vw, 4rem)" }}>
              AI Team{" "}
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #e070ff 0%, #a040ff 50%, #c040ff 100%)" }}>
                Transformation Services
              </span>{" "}
              for Your Business
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
              className="text-white/55 text-lg leading-relaxed mb-8 max-w-lg">
              Transform your team from confused to AI-confident. Our practical training programme gives your team the skills to use AI effectively, ethically, and profitably. No theory, just results.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-3">
              <a href="/contact-us"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(124,58,237,0.45)]"
                style={{ background: PURPLE, color: "#ffffff" }}>
                Start Your Transformation <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.7 }}
            className="rounded-2xl p-8"
            style={{ background: "rgba(6,2,16,0.7)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>
            <h3 className="text-white font-bold text-xl mb-1">Start Your Project</h3>
            <p className="text-white/40 text-sm mb-6">Free consultation, no commitment</p>
            <HeroContactForm pageName="AI Team Transformation" extraField={{ label: "Requirement", type: "text", placeholder: "Describe your team's needs..." }} />
          </motion.div>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4) 50%, transparent)" }} />

      {/* ── Achievements ── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(124,58,237,0.04) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="text-center mb-14">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              What Your Team Achieves{" "}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #e070ff 0%, #a040ff 50%, #c040ff 100%)" }}>
                After Training
              </span>
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="text-white/45 text-sm">Measurable improvements that transform how your business operates.</motion.p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {achievements.map((a, i) => {
              const Icon = a.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09 }}
                  className="group p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30" style={cardStyle}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-[0_0_14px_rgba(124,58,237,0.3)] transition-all"
                    style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.22)" }}>
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="text-white font-bold text-sm mb-2 group-hover:text-primary transition-colors">{a.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{a.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25) 50%, transparent)" }} />

      {/* ── Complete Training Curriculum ── */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>
              <BookOpen className="w-3 h-3" /> Curriculum
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
              className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              Complete{" "}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #e070ff 0%, #a040ff 50%, #c040ff 100%)" }}>
                Training Curriculum
              </span>
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.14 }}
              className="text-white/45 text-sm max-w-md mx-auto">
              Five comprehensive modules designed to take your team from novice to AI-fluent.
            </motion.p>
          </div>

          <div className="space-y-4 mb-10">
            {curriculum.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="flex items-start gap-5 p-6 rounded-2xl" style={cardStyle}>
                <div className="flex-shrink-0">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{m.module}</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-bold text-sm mb-1">{m.title}</h4>
                  <p className="text-white/50 text-sm leading-relaxed">{m.body}</p>
                </div>
                <div className="flex-shrink-0 text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ background: "rgba(124,58,237,0.1)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.2)" }}>
                  {m.hours}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center p-8 rounded-2xl"
            style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.18)" }}>
            <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Total Training Duration</p>
            <p className="text-6xl font-black mb-2" style={{ color: PURPLE }}>13 Hours</p>
            <p className="text-white/45 text-sm">Structured across your team's schedule — on-site or remote</p>
          </motion.div>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25) 50%, transparent)" }} />

      {/* ── Everything Your Team Gets + How We Transform ── */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-14 items-start mb-20">
            <div>
              <motion.h3 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="text-2xl font-bold text-white mb-6">Everything Your Team Gets</motion.h3>
              <p className="text-white/45 text-sm mb-6">Comprehensive training package with ongoing support to ensure lasting results.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {everythingYouGet.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                    className="flex items-start gap-3 p-3 rounded-xl" style={cardStyle}>
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-white/65 text-sm leading-snug">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <motion.h3 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="text-2xl font-bold text-white mb-6">How We Transform Your Team in 30 Days</motion.h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {steps.map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className="p-5 rounded-2xl" style={cardStyle}>
                    <div className="text-3xl font-black mb-3 leading-none" style={{ color: "rgba(124,58,237,0.2)" }}>{s.n}</div>
                    <h4 className="text-white font-bold text-sm mb-1.5">{s.title}</h4>
                    <p className="text-white/50 text-sm leading-relaxed">{s.body}</p>
                  </motion.div>
                ))}
              </div>
            </div>
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
            Join hundreds of UK businesses whose teams already leverage AI with confidence and generate real results.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-wrap items-center justify-center gap-4">
            <a href="/contact-us"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(124,58,237,0.45)]"
              style={{ background: PURPLE, color: "#ffffff" }}>
              Get Your Team Transformed <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
