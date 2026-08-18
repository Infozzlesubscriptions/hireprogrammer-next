"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { HeroContactForm } from '@/components/sections/HeroContactForm';
import {
  ArrowRight, Sparkles, CheckCircle2, Zap, Clock, DollarSign,
  Bot, Shield, MessageCircle, PhoneCall, BellRing, ShoppingCart,
} from "lucide-react";

const PURPLE = "#7C3AED";
const pillStyle = { background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.22)" };
const cardStyle = { background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" };

function IllustrationCustomerService() {
  return (
    <svg viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <defs>
        <radialGradient id="cs-bg" cx="50%" cy="60%" r="65%">
          <stop offset="0%" stopColor="#4c1d95" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#080316" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="280" height="220" fill="#0d0620" />
      <rect width="280" height="220" fill="url(#cs-bg)" />
      {/* Left chat bubble */}
      <rect x="18" y="90" width="78" height="38" rx="12" fill="#1a0840" stroke="rgba(168,85,247,0.35)" strokeWidth="1" />
      <line x1="30" y1="101" x2="82" y2="101" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="30" y1="111" x2="70" y2="111" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeLinecap="round" />
      <polygon points="26,128 18,140 36,128" fill="#1a0840" />
      {/* User avatar top-left */}
      <circle cx="44" cy="56" r="16" fill="#160636" stroke="rgba(168,85,247,0.4)" strokeWidth="1" />
      <circle cx="44" cy="51" r="6" fill="rgba(168,85,247,0.55)" />
      <path d="M30,72 Q44,64 58,72" fill="rgba(168,85,247,0.35)" />
      {/* Robot body */}
      <rect x="105" y="72" width="70" height="80" rx="16" fill="#160636" stroke="rgba(124,58,237,0.7)" strokeWidth="1.5" />
      {/* Robot head */}
      <rect x="112" y="50" width="56" height="46" rx="14" fill="#1e0a4a" stroke="rgba(124,58,237,0.7)" strokeWidth="1.5" />
      {/* Robot eyes */}
      <circle cx="129" cy="70" r="9" fill="#7c3aed" />
      <circle cx="151" cy="70" r="9" fill="#7c3aed" />
      <circle cx="130" cy="69" r="3.5" fill="white" />
      <circle cx="152" cy="69" r="3.5" fill="white" />
      {/* Robot smile */}
      <path d="M126 84 Q140 93 154 84" stroke="#a855f7" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Antenna */}
      <line x1="140" y1="50" x2="140" y2="34" stroke="rgba(124,58,237,0.9)" strokeWidth="2" />
      <circle cx="140" cy="30" r="5" fill="#a855f7" />
      {/* Robot ears */}
      <rect x="96" y="98" width="9" height="22" rx="4.5" fill="#160636" stroke="rgba(124,58,237,0.6)" strokeWidth="1" />
      <rect x="175" y="98" width="9" height="22" rx="4.5" fill="#160636" stroke="rgba(124,58,237,0.6)" strokeWidth="1" />
      {/* Chat icon on robot body */}
      <rect x="116" y="88" width="48" height="32" rx="8" fill="rgba(124,58,237,0.12)" />
      <circle cx="128" cy="104" r="3" fill="rgba(168,85,247,0.6)" />
      <circle cx="140" cy="104" r="3" fill="rgba(168,85,247,0.6)" />
      <circle cx="152" cy="104" r="3" fill="rgba(168,85,247,0.6)" />
      {/* Right bubble with ? */}
      <rect x="184" y="52" width="76" height="44" rx="12" fill="#1a0840" stroke="rgba(168,85,247,0.35)" strokeWidth="1" />
      <text x="222" y="80" textAnchor="middle" fontSize="22" fontWeight="bold" fill="rgba(168,85,247,0.8)">?</text>
      <polygon points="254,96 264,108 244,96" fill="#1a0840" />
      {/* Bottom decorative dots */}
      <circle cx="60" cy="175" r="3" fill="rgba(124,58,237,0.3)" />
      <circle cx="80" cy="185" r="2" fill="rgba(124,58,237,0.2)" />
      <circle cx="200" cy="170" r="2.5" fill="rgba(168,85,247,0.3)" />
      <circle cx="220" cy="182" r="2" fill="rgba(168,85,247,0.2)" />
    </svg>
  );
}

function IllustrationVoiceAI() {
  return (
    <svg viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <defs>
        <radialGradient id="va-bg" cx="50%" cy="45%" r="70%">
          <stop offset="0%" stopColor="#3b0764" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#080316" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="280" height="220" fill="#0d0620" />
      <rect width="280" height="220" fill="url(#va-bg)" />
      {/* Person silhouette */}
      <circle cx="140" cy="72" r="32" fill="#160636" stroke="rgba(124,58,237,0.5)" strokeWidth="1.5" />
      <circle cx="140" cy="60" r="16" fill="rgba(80,40,120,0.8)" />
      <path d="M104,110 Q140,90 176,110 L180,130 Q140,118 100,130 Z" fill="rgba(60,20,100,0.7)" />
      {/* Earpiece/headset hint */}
      <circle cx="108" cy="72" r="8" fill="rgba(124,58,237,0.4)" stroke="rgba(168,85,247,0.5)" strokeWidth="1" />
      <circle cx="172" cy="72" r="8" fill="rgba(124,58,237,0.4)" stroke="rgba(168,85,247,0.5)" strokeWidth="1" />
      {/* Waveform bars */}
      {[
        { x: 48,  h: 20 },
        { x: 62,  h: 36 },
        { x: 76,  h: 52 },
        { x: 90,  h: 28 },
        { x: 104, h: 44 },
        { x: 118, h: 60 },
        { x: 132, h: 44 },
        { x: 146, h: 60 },
        { x: 160, h: 44 },
        { x: 174, h: 28 },
        { x: 188, h: 52 },
        { x: 202, h: 36 },
        { x: 216, h: 20 },
      ].map((bar, i) => (
        <rect key={i} x={bar.x} y={155 - bar.h / 2} width="8" height={bar.h} rx="4"
          fill={i >= 5 && i <= 7 ? "#a855f7" : "rgba(124,58,237,0.45)"} />
      ))}
      {/* Call buttons */}
      <circle cx="110" cy="190" r="18" fill="#ef4444" />
      <text x="110" y="197" textAnchor="middle" fontSize="16" fill="white">✕</text>
      <circle cx="170" cy="190" r="18" fill="#22c55e" />
      <text x="170" y="197" textAnchor="middle" fontSize="14" fill="white">📞</text>
    </svg>
  );
}

function IllustrationPaymentReminder() {
  return (
    <svg viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <defs>
        <radialGradient id="pr-bg" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#4c1d95" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#080316" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="280" height="220" fill="#0d0620" />
      <rect width="280" height="220" fill="url(#pr-bg)" />
      {/* Invoice card */}
      <rect x="36" y="22" width="208" height="172" rx="16" fill="#120530" stroke="rgba(124,58,237,0.3)" strokeWidth="1" />
      {/* Invoice header */}
      <text x="56" y="52" fontSize="11" fill="rgba(255,255,255,0.45)" fontFamily="monospace">Invoice #INV-2487</text>
      {/* Amount */}
      <text x="56" y="80" fontSize="26" fontWeight="bold" fill="white" fontFamily="monospace">£2,850.00</text>
      {/* Pending badge */}
      <rect x="195" y="64" width="38" height="20" rx="10" fill="rgba(234,179,8,0.15)" stroke="rgba(234,179,8,0.5)" strokeWidth="1" />
      <text x="214" y="78" textAnchor="middle" fontSize="9" fill="#eab308" fontWeight="600">Pending</text>
      {/* Divider */}
      <line x1="56" y1="92" x2="224" y2="92" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      {/* Email row */}
      <rect x="44" y="100" width="192" height="26" rx="8" fill="rgba(255,255,255,0.04)" />
      <rect x="48" y="104" width="16" height="16" rx="4" fill="rgba(124,58,237,0.3)" />
      <text x="72" y="116" fontSize="10" fill="rgba(255,255,255,0.6)">Email Reminder</text>
      <rect x="186" y="106" width="42" height="14" rx="7" fill="rgba(34,197,94,0.2)" />
      <text x="207" y="116" textAnchor="middle" fontSize="9" fill="#22c55e" fontWeight="600">Sent</text>
      {/* SMS row */}
      <rect x="44" y="132" width="192" height="26" rx="8" fill="rgba(255,255,255,0.04)" />
      <rect x="48" y="136" width="16" height="16" rx="4" fill="rgba(124,58,237,0.3)" />
      <text x="72" y="148" fontSize="10" fill="rgba(255,255,255,0.6)">SMS Reminder</text>
      <rect x="186" y="138" width="42" height="14" rx="7" fill="rgba(34,197,94,0.2)" />
      <text x="207" y="148" textAnchor="middle" fontSize="9" fill="#22c55e" fontWeight="600">Sent</text>
      {/* Call row */}
      <rect x="44" y="164" width="192" height="26" rx="8" fill="rgba(255,255,255,0.04)" />
      <rect x="48" y="168" width="16" height="16" rx="4" fill="rgba(124,58,237,0.3)" />
      <text x="72" y="180" fontSize="10" fill="rgba(255,255,255,0.6)">Call Reminder</text>
      <rect x="178" y="170" width="50" height="14" rx="7" fill="rgba(234,179,8,0.15)" stroke="rgba(234,179,8,0.4)" strokeWidth="0.5" />
      <text x="203" y="180" textAnchor="middle" fontSize="9" fill="#eab308" fontWeight="600">Pending</text>
    </svg>
  );
}

function IllustrationAbandonedCart() {
  return (
    <svg viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <defs>
        <radialGradient id="ac-bg" cx="60%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#4c1d95" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#080316" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="280" height="220" fill="#0d0620" />
      <rect width="280" height="220" fill="url(#ac-bg)" />
      {/* Speech bubble */}
      <rect x="22" y="24" width="148" height="72" rx="14" fill="#160636" stroke="rgba(168,85,247,0.35)" strokeWidth="1" />
      <polygon points="40,96 28,114 56,96" fill="#160636" />
      <text x="38" y="50" fontSize="11" fontWeight="600" fill="rgba(255,255,255,0.8)">Still thinking</text>
      <text x="38" y="65" fontSize="11" fontWeight="600" fill="rgba(255,255,255,0.8)">about it?</text>
      <line x1="38" y1="74" x2="142" y2="74" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <text x="38" y="87" fontSize="10" fill="rgba(168,85,247,0.8)">Your cart is waiting!</text>
      {/* Shopping bag icon - top right area */}
      <rect x="176" y="30" width="70" height="80" rx="12" fill="#1a0840" stroke="rgba(124,58,237,0.4)" strokeWidth="1" />
      <path d="M196,50 C196,44 204,38 211,38 C218,38 226,44 226,50" stroke="rgba(168,85,247,0.7)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <rect x="190" y="54" width="42" height="40" rx="6" fill="rgba(124,58,237,0.2)" />
      <circle cx="200" cy="54" r="3" fill="rgba(168,85,247,0.6)" />
      <circle cx="222" cy="54" r="3" fill="rgba(168,85,247,0.6)" />
      {/* Shopping cart */}
      <g transform="translate(60, 120)">
        {/* Cart body */}
        <rect x="20" y="14" width="110" height="62" rx="10" fill="#1a0840" stroke="rgba(124,58,237,0.6)" strokeWidth="1.5" />
        {/* Cart handle */}
        <path d="M0,6 L12,6 L24,14" stroke="rgba(124,58,237,0.7)" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* Cart items */}
        <rect x="32" y="26" width="34" height="28" rx="6" fill="rgba(124,58,237,0.25)" stroke="rgba(168,85,247,0.3)" strokeWidth="1" />
        <rect x="74" y="26" width="44" height="28" rx="6" fill="rgba(124,58,237,0.15)" stroke="rgba(168,85,247,0.25)" strokeWidth="1" />
        {/* Wheels */}
        <circle cx="42" cy="82" r="9" fill="#160636" stroke="rgba(124,58,237,0.7)" strokeWidth="2" />
        <circle cx="42" cy="82" r="3" fill="rgba(124,58,237,0.5)" />
        <circle cx="108" cy="82" r="9" fill="#160636" stroke="rgba(124,58,237,0.7)" strokeWidth="2" />
        <circle cx="108" cy="82" r="3" fill="rgba(124,58,237,0.5)" />
      </g>
      {/* Sparkle dots */}
      <circle cx="174" cy="148" r="3" fill="rgba(168,85,247,0.5)" />
      <circle cx="164" cy="160" r="2" fill="rgba(168,85,247,0.35)" />
      <circle cx="254" cy="130" r="2.5" fill="rgba(124,58,237,0.4)" />
    </svg>
  );
}

const AI_SOLUTIONS = [
  {
    Icon: MessageCircle,
    title: "Customer Service\nAI Agent",
    body: "Provide instant customer support, answer FAQs, and resolve queries 24/7 without human intervention.",
    Illustration: IllustrationCustomerService,
    href: "/ai-agent-development-services/customer-service-ai-agent",
  },
  {
    Icon: PhoneCall,
    title: "Voice AI Agent",
    body: "Handle inbound and outbound calls, qualify leads, schedule appointments, and improve response times.",
    Illustration: IllustrationVoiceAI,
    href: "/ai-agent-development-services/voice-ai-agent",
  },
  {
    Icon: BellRing,
    title: "Payment Reminder\nAI Agent",
    body: "Automatically follow up on invoices and pending payments through calls, SMS, and email reminders.",
    Illustration: IllustrationPaymentReminder,
    href: "/ai-agent-development-services/payment-reminder-ai-agent",
  },
  {
    Icon: ShoppingCart,
    title: "Abandoned Cart\nAI Agent",
    body: "Recover lost sales by automatically engaging customers who leave products in their cart.",
    Illustration: IllustrationAbandonedCart,
    href: "/ai-agent-development-services/abandoned-cart-ai-agent",
  },
];

const capabilities = [
  { icon: Zap,        title: "Lightning Fast",     body: "Process thousands of requests simultaneously with zero delays." },
  { icon: Clock,      title: "Always Available",   body: "Never miss a lead or customer inquiry, even outside business hours." },
  { icon: DollarSign, title: "Cost Effective",      body: "Reduce operational costs while improving service quality and consistency." },
];

const capabilitiesList = [
  "24/7 automated customer support",
  "Lead qualification and routing",
  "Document processing and analysis",
  "Appointment scheduling",
  "Email management and responses",
  "Data entry and validation",
];

export default function AiAgentsPage() {
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
              <Bot className="w-3 h-3" /> AI Automation
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.65 }}
              className="font-black text-white leading-[1.08] tracking-tight mb-6"
              style={{ fontSize: "clamp(2.2rem, 4.8vw, 4rem)" }}>
              AI Agent{" "}
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #e070ff 0%, #a040ff 50%, #c040ff 100%)" }}>
                Development Services
              </span>{" "}
              for Your Business
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
              className="text-white/55 text-lg leading-relaxed mb-8 max-w-lg">
              Transform your business operations with intelligent AI agents that handle routine tasks, process leads, and provide exceptional customer support around the clock.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-3">
              <a href="/contact-us"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(124,58,237,0.45)]"
                style={{ background: PURPLE, color: "#ffffff" }}>
                Get Started Today <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.7 }}
            className="rounded-2xl p-8"
            style={{ background: "rgba(6,2,16,0.7)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>
            <h3 className="text-white font-bold text-xl mb-1">Start Your Project</h3>
            <p className="text-white/40 text-sm mb-6">Free consultation, no commitment</p>
            <HeroContactForm pageName="AI Agents" extraField={{ label: "Requirement", type: "text", placeholder: "Describe your AI agent needs..." }} />
          </motion.div>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4) 50%, transparent)" }} />

      {/* ── What Our AI Agents Can Do ── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(124,58,237,0.04) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="text-center mb-14">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>
              <Sparkles className="w-3 h-3" /> Capabilities
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
              className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              What Our AI Agents{" "}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #e070ff 0%, #a040ff 50%, #c040ff 100%)" }}>
                Can Do
              </span>
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.14 }}
              className="text-white/45 text-sm max-w-md mx-auto">
              From lead processing to customer support, our AI agents handle the tasks that consume your team's time.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 mb-16">
            {capabilities.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09 }}
                  className="group p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30" style={cardStyle}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-[0_0_14px_rgba(124,58,237,0.3)] transition-all duration-300"
                    style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.22)" }}>
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="text-white font-bold text-base mb-2 group-hover:text-primary transition-colors">{c.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{c.body}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <motion.h3 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="text-2xl font-bold text-white mb-6">Capabilities Include</motion.h3>
              <div className="space-y-3">
                {capabilitiesList.map((item, i) => (
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
              <h3 className="text-white font-bold text-lg mb-1">Ready to Get Started?</h3>
              <p className="text-white/40 text-sm mb-6">Let's discuss how AI agents can transform your business operations.</p>
              <a href="/contact-us"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-bold text-sm mb-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(124,58,237,0.35)]"
                style={{ background: PURPLE, color: "#ffffff" }}>
                Schedule a Consultation
              </a>
              <a href="/clients"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-semibold text-sm transition-colors hover:text-white text-white/60"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                View Case Studies
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25) 50%, transparent)" }} />

      {/* ── AI Agent Solutions ── */}
      <section style={{ padding: "120px 0" }} className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(124,58,237,0.07) 0%, transparent 65%)" }} />
        <div style={{ maxWidth: 1400 }} className="mx-auto px-6 lg:px-10 relative z-10">

          {/* Heading */}
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>
              <Bot className="w-3 h-3" /> AI Agent Solutions
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
              className="font-black text-white leading-tight mb-4"
              style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}>
              Types of{" "}
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #e070ff 0%, #a040ff 50%, #c040ff 100%)" }}>
                AI Agents
              </span>
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.14 }}
              className="text-white/45 text-base max-w-xl mx-auto leading-relaxed">
              Choose a ready-to-deploy AI agent designed to automate customer interactions, boost efficiency, and generate more revenue.
            </motion.p>
          </div>

          {/* 4 Cards */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {AI_SOLUTIONS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
                className="group flex flex-col transition-all duration-300"
                style={{
                  background: "rgba(14,6,32,0.95)",
                  border: "1px solid rgba(168,85,247,0.22)",
                  borderRadius: 24,
                  overflow: "hidden",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.transform = "translateY(-8px)";
                  el.style.borderColor = "rgba(168,85,247,0.6)";
                  el.style.boxShadow = "0 24px 64px rgba(124,58,237,0.22)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.transform = "translateY(0)";
                  el.style.borderColor = "rgba(168,85,247,0.22)";
                  el.style.boxShadow = "none";
                }}
              >
                {/* Illustration panel — overflow hidden keeps SVG clipped to card top */}
                <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
                  <s.Illustration />
                </div>

                {/* Floating icon orb — sibling between panel and text, not clipped */}
                <div style={{ display: "flex", justifyContent: "center", marginTop: -26, position: "relative", zIndex: 10 }}>
                  <div
                    className="transition-transform duration-300 group-hover:scale-110"
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      background: "#7C3AED",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 4px 24px rgba(124,58,237,0.5)",
                      border: "2px solid rgba(124,58,237,0.5)",
                    }}
                  >
                    <s.Icon style={{ width: 22, height: 22, color: "white" }} />
                  </div>
                </div>

                {/* Text + CTA */}
                <div style={{ padding: "44px 24px 28px", textAlign: "center", display: "flex", flexDirection: "column", flex: 1 }}>
                  <h3 style={{ color: "white", fontWeight: 800, fontSize: 18, lineHeight: 1.35, marginBottom: 12, whiteSpace: "pre-line" }}>
                    {s.title}
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.48)", fontSize: 13.5, lineHeight: 1.65, marginBottom: 24, flex: 1 }}>
                    {s.body}
                  </p>
                  <a
                    href={s.href}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      width: "100%",
                      padding: "13px 0",
                      borderRadius: 999,
                      fontWeight: 700,
                      fontSize: 14,
                      background: "#7C3AED",
                      color: "#fff",
                      textDecoration: "none",
                      transition: "background 0.2s, transform 0.2s",
                      boxShadow: "0 4px 20px rgba(124,58,237,0.35)",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "linear-gradient(135deg, #9B3FFF 0%, #7C3AED 55%, #5B21B6 100%)"; e.currentTarget.style.transform = "scale(1.02)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#7C3AED"; e.currentTarget.style.transform = "scale(1)"; }}
                  >
                    Explore Solution <ArrowRight style={{ width: 15, height: 15 }} />
                  </a>
                </div>
              </motion.div>
            ))}
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
            Deploy Your First{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #e070ff 0%, #a040ff 50%, #c040ff 100%)" }}>
              AI Agent
            </span>{" "}
            This Week
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-white/50 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Join UK businesses already running AI agents that handle support, qualify leads, and never take a day off.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-wrap items-center justify-center gap-4">
            <a href="/contact-us"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(124,58,237,0.45)]"
              style={{ background: PURPLE, color: "#ffffff" }}>
              Build My AI Agent <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
