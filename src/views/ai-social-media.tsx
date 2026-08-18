"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { useQuoteModal } from '@/context/QuoteModalContext';
import { HeroContactForm } from '@/components/sections/HeroContactForm';
import {
  ArrowRight, ChevronDown, Sparkles, CheckCircle2, BarChart2,
  Calendar, Share2, TrendingUp, FileText, Users, Clock, Star,
  Zap, Shield, MessageSquare,
} from "lucide-react";

const PURPLE = "#7C3AED";
const pillStyle = { background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.22)" };
const cardStyle = { background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" };

/* ── Data ── */
const outcomes = [
  { icon: FileText, title: "10x More Content",       body: "Generate 10x more posts without spending extra hours on writing or ideation." },
  { icon: Shield,   title: "Consistent Branding",    body: "Every post matches your tone, style, and visual identity — always on-brand." },
  { icon: Clock,    title: "Save 20+ Hours/Month",   body: "Reclaim your time with AI-automated content workflows and scheduling." },
  { icon: TrendingUp, title: "Organic Lead Growth",  body: "Content crafted to attract and convert your ideal audience without paid ads." },
  { icon: CheckCircle2, title: "100% Ethical AI",    body: "Human-reviewed, brand-safe posts you can be proud to publish every day." },
];

const platforms = [
  { name: "LinkedIn",  color: "#0A66C2" },
  { name: "Twitter/X", color: "#ffffff" },
  { name: "Instagram", color: "#E1306C" },
  { name: "Facebook",  color: "#1877F2" },
  { name: "TikTok",    color: "#ff0050" },
  { name: "YouTube",   color: "#FF0000" },
];

const packageItems = [
  { icon: FileText,     title: "AI-Generated Drafts",         body: "High-volume, on-brand content created by AI and reviewed by human editors." },
  { icon: Users,        title: "Human Editing & Branding",    body: "Every post is refined to match your voice, tone, and brand guidelines." },
  { icon: Calendar,     title: "Content Calendar",            body: "A structured monthly plan so you're never scrambling for ideas again." },
  { icon: Share2,       title: "Cross-Platform Distribution", body: "Content optimised and scheduled across all your social channels." },
  { icon: MessageSquare,title: "Engagement Boosting",         body: "Captions, hashtags, and hooks engineered for maximum organic reach." },
  { icon: BarChart2,    title: "Monthly Performance Report",  body: "Clear analytics showing what's working and where to improve each month." },
];

const stats = [
  { value: "7x",   label: "Posts/Week" },
  { value: "280%", label: "Engagement" },
  { value: "2x",   label: "Inbound Leads" },
];

const perfectFor = [
  { title: "Startups",       body: "Growing brands that need consistent content without a full-time social team." },
  { title: "SMEs",           body: "Established businesses looking to scale their social media presence fast." },
  { title: "Busy Founders",  body: "Entrepreneurs who want real results without managing content themselves." },
];

const steps = [
  { n: "01", title: "Audit",    body: "We analyse your current social media presence, content gaps, and competitor positioning." },
  { n: "02", title: "Plan",     body: "We build a content strategy tailored to your audience, platforms, and business goals." },
  { n: "03", title: "Create",   body: "Our AI + human team produces high-quality posts, captions, and visuals ready to publish." },
  { n: "04", title: "Optimise", body: "We review performance data each month and continuously refine your strategy for better ROI." },
];

const pricing = [
  {
    name: "Starter Package",
    price: "£997",
    period: "/mo",
    tag: null,
    features: ["10 posts/month", "2 platforms", "AI drafts + human edit", "Content calendar", "Monthly report"],
    cta: "Get Started",
  },
  {
    name: "Growth Package",
    price: "£1,997",
    period: "/mo",
    tag: "Most Popular",
    features: ["20 posts/month", "4 platforms", "AI drafts + human edit", "Content calendar", "Engagement boosting", "Monthly report"],
    cta: "Get Started",
    featured: true,
  },
  {
    name: "Premium Package",
    price: "Custom",
    period: "",
    tag: null,
    features: ["Unlimited posts", "All platforms", "Full brand management", "Dedicated strategist", "Weekly reports", "Paid ad management"],
    cta: "Contact Us",
  },
];

const faqs = [
  {
    q: "Can you manage my whole social media or just create content?",
    a: "We offer both. Our Growth and Premium packages include full social media management — strategy, content creation, scheduling, and performance reporting. The Starter package focuses on content creation that you can post yourself.",
  },
  {
    q: "What platforms do you specialise in?",
    a: "We work across LinkedIn, Instagram, Facebook, Twitter/X, TikTok, and YouTube. Each platform gets content optimised to its format, audience, and algorithm — not repurposed copy-paste.",
  },
  {
    q: "Is the content fully AI-generated?",
    a: "No — AI creates the first draft at scale, but every piece is reviewed and refined by a human editor who understands your brand. The result is high-volume content that reads as naturally as if a human wrote every word.",
  },
  {
    q: "How quickly will I see results?",
    a: "Most clients see measurable improvements in engagement within 30 days. Lead generation results typically build over 60–90 days as your content library grows and the algorithm picks up consistent posting signals.",
  },
  {
    q: "Do you provide paid ad management too?",
    a: "Paid ad management is included in our Premium package. For other tiers, it can be added on. We handle organic content by default — paid amplification is available to accelerate results once your organic strategy is solid.",
  },
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

export default function AiSocialMediaPage() {
  const { openQuoteModal } = useQuoteModal();
  return (
    <main className="min-h-screen bg-[#080316] text-foreground overflow-x-hidden selection:bg-primary/30">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 60% 40%, rgba(124,58,237,0.10) 0%, transparent 65%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 50% at 20% 70%, rgba(180,80,255,0.06) 0%, transparent 60%)" }} />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-14 items-center">
          {/* Left — copy */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-6" style={pillStyle}>
              <Sparkles className="w-3 h-3" /> AI-Powered Social Media
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.65 }}
              className="font-black text-white leading-[1.08] tracking-tight mb-6"
              style={{ fontSize: "clamp(2.2rem, 4.8vw, 4rem)" }}>
              Expert{" "}
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #e070ff 0%, #a040ff 50%, #c040ff 100%)" }}>
                AI Social Media Services
              </span>
              {" "}for Your Business
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
              className="text-white/55 text-lg leading-relaxed mb-8 max-w-lg">
              Turn AI into your content engine. We create and manage posts that grow your visibility, authority, and leads — without spending hours brainstorming.
            </motion.p>

            {/* Proven results row */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}
              className="flex flex-wrap gap-4 mb-8">
              {[
                { val: "+280%", label: "Engagement" },
                { val: "+200%", label: "Followers" },
                { val: "20+",   label: "Platforms Managed" },
              ].map(s => (
                <div key={s.label} className="flex flex-col px-4 py-2.5 rounded-xl" style={cardStyle}>
                  <span className="text-xl font-black" style={{ color: PURPLE }}>{s.val}</span>
                  <span className="text-xs text-white/45">{s.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="flex flex-wrap gap-3">
              <a href="/quote"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(124,58,237,0.45)]"
                style={{ background: PURPLE, color: "#ffffff" }}>
                Start Your Free Analysis <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#package"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-white/60 hover:text-white transition-colors"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                See What's Included
              </a>
            </motion.div>
          </motion.div>

          {/* Right — contact form */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.7 }}
            className="rounded-2xl p-8"
            style={{ background: "rgba(6,2,16,0.7)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>
            <h3 className="text-white font-bold text-xl mb-1">Start Your Project</h3>
            <p className="text-white/40 text-sm mb-6">Free consultation, no commitment</p>
            <HeroContactForm pageName="AI Social Media" extraField={{ label: "Social Media Goals", type: "text", placeholder: "e.g. grow LinkedIn presence, 3x Instagram followers..." }} />
          </motion.div>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4) 50%, transparent)" }} />

      {/* ── Transform Your Social Media Impact ── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(124,58,237,0.04) 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>
              <Star className="w-3 h-3" /> Core Outcomes
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
              className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              Transform Your{" "}
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #e070ff 0%, #a040ff 50%, #c040ff 100%)" }}>
                Social Media Impact
              </span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.14 }}
              className="text-white/45 text-sm max-w-md mx-auto">
              Five core outcomes that will revolutionise your online presence.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {outcomes.map((o, i) => {
              const Icon = o.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="group p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
                  style={cardStyle}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-[0_0_14px_rgba(124,58,237,0.3)] transition-all duration-300"
                    style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.22)" }}>
                    <Icon className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <h3 className="text-white font-bold text-base mb-2 group-hover:text-primary transition-colors duration-300">{o.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{o.body}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Platforms */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="mt-14 text-center">
            <p className="text-white/35 text-xs uppercase tracking-widest font-semibold mb-6">We Optimise for Every Platform</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {platforms.map((p, i) => (
                <motion.div key={p.name} initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="px-5 py-2 rounded-full text-sm font-semibold"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: p.color === "#ffffff" ? "rgba(255,255,255,0.7)" : p.color + "cc" }}>
                  {p.name}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25) 50%, transparent)" }} />

      {/* ── What's Included ── */}
      <section id="package" className="py-24 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(124,58,237,0.035) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="text-center mb-14">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>
              <Zap className="w-3 h-3" /> What's Included
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
              className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              What's Included in{" "}
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #e070ff 0%, #a040ff 50%, #c040ff 100%)" }}>
                Your Package
              </span>
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.14 }}
              className="text-white/45 text-sm max-w-sm mx-auto">
              Everything you need for a professional social media presence that converts.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {packageItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="group flex gap-4 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30"
                  style={cardStyle}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:shadow-[0_0_12px_rgba(124,58,237,0.3)] transition-all duration-300"
                    style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.22)" }}>
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm mb-1.5 group-hover:text-primary transition-colors duration-300">{item.title}</h4>
                    <p className="text-white/50 text-sm leading-relaxed">{item.body}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25) 50%, transparent)" }} />

      {/* ── Real Results in 30 Days ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(124,58,237,0.05) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 items-start">

            {/* Left — quote + stats */}
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-6" style={pillStyle}>
                <TrendingUp className="w-3 h-3" /> Proven Results
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
                className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
                Real Results in{" "}
                <span className="text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(135deg, #e070ff 0%, #a040ff 50%, #c040ff 100%)" }}>
                  30 Days
                </span>
              </motion.h2>

              <motion.blockquote initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.14 }}
                className="p-6 rounded-2xl mb-8"
                style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.18)", borderLeft: "3px solid #7C3AED" }}>
                <p className="text-white/70 text-sm leading-relaxed italic">
                  "After 30 days, our client went from posting once a week to daily posts. Engagement increased by 280%, and inbound leads doubled without spending on ads."
                </p>
              </motion.blockquote>

              <div className="grid grid-cols-3 gap-4">
                {stats.map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.07 }}
                    className="text-center p-4 rounded-2xl" style={cardStyle}>
                    <div className="text-3xl font-black mb-1" style={{ color: PURPLE }}>{s.value}</div>
                    <div className="text-xs text-white/45">{s.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right — Perfect For */}
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-6" style={pillStyle}>
                <Users className="w-3 h-3" /> Perfect For
              </motion.div>
              <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
                className="text-2xl font-bold text-white leading-tight mb-6">
                Who Is This For?
              </motion.h3>
              <div className="space-y-4">
                {perfectFor.map((pf, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09 }}
                    className="flex gap-4 p-5 rounded-2xl" style={cardStyle}>
                    <div className="w-2 h-2 rounded-full flex-shrink-0 mt-2" style={{ background: PURPLE }} />
                    <div>
                      <h4 className="text-white font-bold text-sm mb-1">{pf.title}</h4>
                      <p className="text-white/50 text-sm leading-relaxed">{pf.body}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25) 50%, transparent)" }} />

      {/* ── Our 4-Step Process ── */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>
              <Sparkles className="w-3 h-3" /> How It Works
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
              className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              Our{" "}
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #e070ff 0%, #a040ff 50%, #c040ff 100%)" }}>
                4-Step Process
              </span>
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.14 }}
              className="text-white/45 text-sm max-w-sm mx-auto">
              From audit to optimisation — here's how we transform your social media presence.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="relative p-6 rounded-2xl" style={cardStyle}>
                <div className="text-5xl font-black mb-4 leading-none" style={{ color: "rgba(124,58,237,0.18)" }}>{s.n}</div>
                <h3 className="text-white font-bold text-base mb-2">{s.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{s.body}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px" style={{ background: "rgba(124,58,237,0.3)" }} />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25) 50%, transparent)" }} />

      {/* ── Pricing ── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(124,58,237,0.04) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="text-center mb-14">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>
              <BarChart2 className="w-3 h-3" /> Investment & ROI
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
              className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              Pricing That{" "}
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #e070ff 0%, #a040ff 50%, #c040ff 100%)" }}>
                Makes Sense
              </span>
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.14 }}
              className="text-white/45 text-sm max-w-sm mx-auto">
              Professional social media management that pays for itself.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {pricing.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="relative flex flex-col p-7 rounded-2xl"
                style={p.featured ? {
                  background: "rgba(124,58,237,0.08)",
                  border: "1px solid rgba(124,58,237,0.3)",
                  boxShadow: "0 0 40px rgba(124,58,237,0.1)",
                } : cardStyle}>
                {p.tag && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold px-3 py-1 rounded-full"
                    style={{ background: PURPLE, color: "#ffffff" }}>
                    {p.tag}
                  </span>
                )}
                <h3 className="text-white font-bold text-base mb-1">{p.name}</h3>
                <div className="flex items-end gap-0.5 mb-6">
                  <span className="text-4xl font-black" style={{ color: p.featured ? PURPLE : "white" }}>{p.price}</span>
                  {p.period && <span className="text-white/40 text-sm mb-1">{p.period}</span>}
                </div>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {p.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2.5 text-sm text-white/60">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="/quote"
                  className="block text-center py-3 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105"
                  style={p.featured
                    ? { background: PURPLE, color: "#ffffff" }
                    : { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#ffffff" }}>
                  {p.cta}
                </a>
              </motion.div>
            ))}
          </div>

          {/* ROI note */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="mt-10 max-w-2xl mx-auto p-6 rounded-2xl text-center"
            style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.15)" }}>
            <p className="text-white/60 text-sm leading-relaxed italic">
              ROI Example: "Team Transformation + 3 months of service. Now we see 4× ROI on AI social — leads that more than cover the monthly investment."
            </p>
          </motion.div>
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
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #e070ff 0%, #a040ff 50%, #c040ff 100%)" }}>
                Questions
              </span>
            </motion.h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} index={i} />)}
          </div>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25) 50%, transparent)" }} />

      {/* ── CTA Banner ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(124,58,237,0.08) 0%, transparent 70%)" }} />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-6" style={pillStyle}>
            <Sparkles className="w-3 h-3" /> Get Started
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
            className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
            Ready to Transform Your{" "}
            <span className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #e070ff 0%, #a040ff 50%, #c040ff 100%)" }}>
              Social Media?
            </span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
            className="text-white/50 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Join successful businesses who have elevated their social media presence, grown their audience, and generated real leads.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.22 }}
            className="flex flex-wrap items-center justify-center gap-4">
            <a href="/contact-us"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(124,58,237,0.45)]"
              style={{ background: PURPLE, color: "#ffffff" }}>
              Start Your Free Social Strategy <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
