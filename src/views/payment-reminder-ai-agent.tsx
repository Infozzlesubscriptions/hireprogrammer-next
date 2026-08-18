"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { HeroContactForm } from "@/components/sections/HeroContactForm";
import {
  BellRing, ArrowRight, CheckCircle2, Zap, Clock, TrendingUp,
  DollarSign, BarChart3, Database, Layers, Users, AlertCircle,
  Landmark, Heart, ShoppingCart, GraduationCap, Briefcase,
  Search, Layout, Code2, Brain, Rocket, ChevronDown, Sparkles,
  MessageSquare, RefreshCw, Globe,
} from "lucide-react";

const PURPLE = "#7C3AED";
const pillStyle = { background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.22)" };
const cardStyle = { background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" };
const gradientText = { backgroundImage: "linear-gradient(135deg, #e070ff 0%, #a040ff 50%, #c040ff 100%)" };

const CAPABILITIES = [
  "Send automated payment reminders",
  "Notify customers about upcoming due dates",
  "Follow up on overdue invoices",
  "Provide payment instructions",
  "Answer basic payment-related questions",
  "Escalate complex cases to staff",
  "Track payment statuses",
  "Update CRM and accounting systems",
];

const BENEFITS = [
  { label: "Reduced late payments", icon: TrendingUp },
  { label: "Improved cash flow management", icon: DollarSign },
  { label: "Automated customer follow-ups", icon: RefreshCw },
  { label: "Lower administrative workload", icon: Users },
  { label: "Increased collection rates", icon: BarChart3 },
  { label: "Consistent customer communication", icon: MessageSquare },
  { label: "Better payment visibility", icon: CheckCircle2 },
  { label: "Scalable collections process", icon: Globe },
];

const FEATURES = [
  {
    icon: BellRing,
    title: "Automated Payment Notifications",
    body: "Send reminders before, on, and after payment due dates through multiple communication channels.",
  },
  {
    icon: MessageSquare,
    title: "Personalised Customer Communication",
    body: "Our AI agents can personalise messages using customer information, payment history, and account details to improve engagement.",
  },
  {
    icon: Layers,
    title: "Multi-Channel Reminder System",
    body: "Reach customers through voice calls, SMS, email, WhatsApp, and other preferred communication methods.",
  },
  {
    icon: RefreshCw,
    title: "Intelligent Follow-Up Workflows",
    body: "Automatically adjust reminder schedules based on customer responses and payment status.",
  },
  {
    icon: Database,
    title: "CRM and Accounting Software Integration",
    body: "Connect your Payment Reminder AI Agent with accounting platforms, ERP systems, billing software, and CRM solutions.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Payment Tracking",
    body: "Monitor reminder delivery, customer responses, payment completion rates, and collection performance.",
  },
  {
    icon: AlertCircle,
    title: "Escalation Management",
    body: "Automatically transfer unresolved cases to your collections or customer service teams when needed.",
  },
];

const INDUSTRIES = [
  {
    icon: Landmark,
    title: "Financial Services",
    body: "Automate loan repayment reminders, credit payment notifications, and customer follow-ups.",
  },
  {
    icon: Heart,
    title: "Healthcare",
    body: "Manage billing reminders, appointment-related payments, and patient account communications.",
  },
  {
    icon: RefreshCw,
    title: "Subscription-Based Businesses",
    body: "Reduce missed subscription payments and improve recurring revenue collection.",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    body: "Handle payment reminders for instalment plans, business accounts, and outstanding invoices.",
  },
  {
    icon: GraduationCap,
    title: "Education",
    body: "Automate tuition fee reminders and student payment notifications.",
  },
  {
    icon: Briefcase,
    title: "Professional Services",
    body: "Improve invoice collection processes for legal firms, consultants, agencies, and service providers.",
  },
];

const PROCESS = [
  {
    icon: Search,
    step: "01",
    title: "Discovery and Planning",
    body: "We analyse your billing processes, collection workflows, and business requirements.",
  },
  {
    icon: Layout,
    step: "02",
    title: "Solution Design",
    body: "Our team creates a custom Payment Reminder AI Agent aligned with your customer journey and payment processes.",
  },
  {
    icon: Code2,
    step: "03",
    title: "Integration and Development",
    body: "We integrate the AI agent with your existing CRM, ERP, accounting software, and communication systems.",
  },
  {
    icon: Brain,
    step: "04",
    title: "Testing and Optimisation",
    body: "The AI agent is trained and tested to ensure accurate reminders and seamless customer interactions.",
  },
  {
    icon: Rocket,
    step: "05",
    title: "Deployment and Continuous Improvement",
    body: "After launch, we monitor performance and optimise workflows to maximise collection efficiency.",
  },
];

const AGENT_TYPES = [
  "Voice AI Agents",
  "Payment Reminder AI Agents",
  "Customer Support AI Agents",
  "Lead Generation AI Agents",
  "Appointment Booking AI Agents",
  "Abandoned Cart AI Agents",
  "Custom Business AI Agents",
];

const FAQS = [
  {
    q: "How does a Payment Reminder AI Agent work?",
    a: "A Payment Reminder AI Agent automatically sends reminders to customers before and after payment due dates through channels such as voice calls, SMS, email, or WhatsApp. It helps businesses automate follow-ups and improve collection rates.",
  },
  {
    q: "Can the Payment Reminder AI Agent integrate with our billing software?",
    a: "Yes. HireProgrammer can integrate the AI agent with accounting software, CRM platforms, ERP systems, billing tools, and other business applications.",
  },
  {
    q: "Can reminders be customised for different customers?",
    a: "Absolutely. The AI agent can personalise reminders based on customer information, payment history, account status, and business rules.",
  },
  {
    q: "Which communication channels can the AI agent use?",
    a: "Depending on your requirements, the Payment Reminder AI Agent can communicate through voice calls, SMS, email, WhatsApp, and other supported channels.",
  },
  {
    q: "Why choose HireProgrammer for Payment Reminder AI Agent development?",
    a: "HireProgrammer develops custom AI agents tailored to your business needs. We focus on building scalable, secure, and efficient solutions that improve payment collection processes and support long-term business growth.",
  },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const divider = (
  <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25) 50%, transparent)" }} />
);

export default function PaymentReminderAiAgentPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-[#080316] text-foreground overflow-x-hidden selection:bg-primary/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 30% 40%, rgba(124,58,237,0.09) 0%, transparent 65%)" }} />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-14 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-6"
              style={pillStyle}>
              <BellRing className="w-3 h-3" /> Payment Reminder AI Agent
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.65 }}
              className="font-black text-white leading-[1.08] tracking-tight mb-6"
              style={{ fontSize: "clamp(2rem, 4.4vw, 3.6rem)" }}>
              Payment Reminder AI Agent{" "}
              <span className="text-transparent bg-clip-text" style={gradientText}>
                Development Services
              </span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
              className="text-white/55 text-lg leading-relaxed mb-8 max-w-lg">
              Automate payment follow-ups with a custom Payment Reminder AI Agent from HireProgrammer. Reduce late payments, improve cash flow, and streamline collections with intelligent AI agents.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-3">
              <a href="/quote"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(124,58,237,0.45)]"
                style={{ background: PURPLE, color: "#ffffff" }}>
                Get a Free Quote <ArrowRight className="w-4 h-4" />
              </a>
              <a href="/contact-us"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-white/70 hover:text-white transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                Talk to an Expert
              </a>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.7 }}
            className="rounded-2xl p-8"
            style={{ background: "rgba(6,2,16,0.7)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>
            <h3 className="text-white font-bold text-xl mb-1">Start Your Project</h3>
            <p className="text-white/40 text-sm mb-6">Free consultation, no commitment</p>
            <HeroContactForm pageName="Payment Reminder AI Agent" extraField={{ label: "Requirement", type: "text", placeholder: "Describe your payment collection needs..." }} />
          </motion.div>
        </div>
      </section>

      {divider}

      {/* ── Intro ── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(124,58,237,0.04) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="text-center mb-12">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5"
              style={pillStyle}>
              <Sparkles className="w-3 h-3" /> Overview
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
              className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
              Payment Reminder AI Agent Solutions for Faster Collections{" "}
              <span className="text-transparent bg-clip-text" style={gradientText}>and Improved Cash Flow</span>
            </motion.h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-5">
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-white/60 text-base leading-relaxed">
              Late payments can impact cash flow, increase administrative workload, and slow business growth. A Payment Reminder AI Agent helps businesses automate payment follow-ups, send timely reminders, and improve collection rates without requiring manual intervention.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
              className="text-white/60 text-base leading-relaxed">
              At HireProgrammer, we develop custom AI agents that simplify payment collection processes and improve customer communication. Whether you manage subscription payments, invoices, loan repayments, service fees, or recurring billing, our Payment Reminder AI Agent can help automate reminders while maintaining a professional customer experience.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12 }}
              className="text-white/60 text-base leading-relaxed">
              Our AI agents are designed to integrate with your existing systems, enabling businesses to reduce overdue payments and streamline collection workflows.
            </motion.p>
          </div>
        </div>
      </section>

      {divider}

      {/* ── What is a Payment Reminder AI Agent ── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(124,58,237,0.06) 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>
                <BellRing className="w-3 h-3" /> What is a Payment Reminder AI Agent?
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
                Smarter Payment Collections,{" "}
                <span className="text-transparent bg-clip-text" style={gradientText}>Powered by AI</span>
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-5">
                A Payment Reminder AI Agent is an intelligent automation solution that helps businesses send personalised payment reminders through voice calls, SMS messages, emails, WhatsApp, and other communication channels.
              </p>
              <p className="text-white/60 text-base leading-relaxed">
                Unlike traditional reminder systems that follow rigid schedules, AI agents can personalise communication, adapt follow-up timing, and engage customers more effectively.
              </p>
            </motion.div>

            <div>
              <motion.h3 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="text-xl font-bold text-white mb-6">
                A Payment Reminder AI Agent Can:
              </motion.h3>
              <div className="space-y-3">
                {CAPABILITIES.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-3 p-4 rounded-xl" style={cardStyle}>
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-white/65 text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {divider}

      {/* ── Why Businesses Are Using ── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(124,58,237,0.05) 0%, transparent 65%)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
                Why Businesses Are Using AI Agents{" "}
                <span className="text-transparent bg-clip-text" style={gradientText}>for Payment Reminders</span>
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-5">
                Many businesses spend significant time chasing overdue payments and manually following up with customers. AI agents automate these repetitive tasks, allowing teams to focus on higher-value activities.
              </p>
              <p className="text-white/60 text-base leading-relaxed">
                By automating payment reminders, businesses can improve collection efficiency while delivering a better customer experience.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <h3 className="text-white font-bold text-lg mb-6">Benefits of Payment Reminder AI Agents</h3>
              <div className="grid grid-cols-2 gap-3">
                {BENEFITS.map((b, i) => {
                  const Icon = b.icon;
                  return (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl" style={cardStyle}>
                      <Icon className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-white/65 text-xs leading-snug">{b.label}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {divider}

      {/* ── Key Features ── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(124,58,237,0.05) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="text-center mb-14">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5"
              style={pillStyle}>
              <Zap className="w-3 h-3" /> Key Features
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
              className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              Key Features of Our{" "}
              <span className="text-transparent bg-clip-text" style={gradientText}>Payment Reminder AI Agent</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.14 }}
              className="text-white/45 text-sm max-w-lg mx-auto">
              Everything you need to automate payment follow-ups and improve cash flow across every channel.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="group p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
                  style={cardStyle}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-[0_0_14px_rgba(124,58,237,0.3)] transition-all duration-300"
                    style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.22)" }}>
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="text-white font-bold text-base mb-2 group-hover:text-primary transition-colors">{f.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{f.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {divider}

      {/* ── Industries ── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(124,58,237,0.06) 0%, transparent 65%)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="text-center mb-14">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5"
              style={pillStyle}>
              <Briefcase className="w-3 h-3" /> Industries
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
              className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              Industries That Benefit from{" "}
              <span className="text-transparent bg-clip-text" style={gradientText}>Payment Reminder AI Agents</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.14 }}
              className="text-white/45 text-sm max-w-lg mx-auto">
              Any business that manages invoices, subscriptions, or recurring payments can benefit from AI-powered reminders.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {INDUSTRIES.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09 }}
                  className="group p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
                  style={cardStyle}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-[0_0_14px_rgba(124,58,237,0.3)] transition-all duration-300"
                    style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.22)" }}>
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="text-white font-bold text-base mb-2 group-hover:text-primary transition-colors">{ind.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{ind.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {divider}

      {/* ── Development Process ── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(124,58,237,0.05) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="text-center mb-14">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5"
              style={pillStyle}>
              <Code2 className="w-3 h-3" /> Our Process
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
              className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              How Our Payment Reminder AI Agent{" "}
              <span className="text-transparent bg-clip-text" style={gradientText}>Development Process Works</span>
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {PROCESS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="relative flex flex-col items-center text-center group">
                  {i < PROCESS.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[58%] w-full h-px" style={{ background: "linear-gradient(90deg, rgba(124,58,237,0.4), rgba(124,58,237,0.05))" }} />
                  )}
                  <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:shadow-[0_0_24px_rgba(124,58,237,0.35)]"
                    style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.3)" }}>
                    <Icon className="w-6 h-6 text-primary" />
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-[9px] font-bold flex items-center justify-center"
                      style={{ background: PURPLE, color: "white" }}>{step.step}</span>
                  </div>
                  <h3 className="text-white font-bold text-sm mb-2 leading-snug">{step.title}</h3>
                  <p className="text-white/45 text-xs leading-relaxed">{step.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {divider}

      {/* ── Why Choose HireProgrammer ── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 30% 50%, rgba(124,58,237,0.07) 0%, transparent 65%)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>
                <Sparkles className="w-3 h-3" /> Why HireProgrammer
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
                Why Choose HireProgrammer for{" "}
                <span className="text-transparent bg-clip-text" style={gradientText}>AI Agent Development?</span>
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-5">
                HireProgrammer develops intelligent AI agents that help businesses automate operations, improve efficiency, and enhance customer engagement.
              </p>
              <p className="text-white/60 text-base leading-relaxed mb-5">
                We build custom AI agents designed around your specific business goals and operational requirements.
              </p>
              <p className="text-white/60 text-base leading-relaxed mb-8">
                As your organisation grows, additional AI agents can be integrated to create a fully connected automation ecosystem.
              </p>
              <a href="/quote"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(124,58,237,0.45)]"
                style={{ background: PURPLE, color: "#ffffff" }}>
                Start Your AI Project <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <h3 className="text-white font-bold text-lg mb-6">Our AI Agent Solutions Include</h3>
              <div className="space-y-3 mb-8">
                {AGENT_TYPES.map((type, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                    className="flex items-center gap-3 p-4 rounded-xl" style={cardStyle}>
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: PURPLE }} />
                    <span className="text-white/70 text-sm font-medium">{type}</span>
                  </motion.div>
                ))}
              </div>

              <div className="p-6 rounded-2xl" style={{ background: "rgba(124,58,237,0.07)", border: "1px solid rgba(124,58,237,0.2)" }}>
                <h4 className="text-white font-bold text-base mb-3">Ready to Improve Your Collections?</h4>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  Let's discuss how a custom Payment Reminder AI Agent can transform your collection workflows.
                </p>
                <a href="/contact-us"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-full font-bold text-sm transition-all duration-300 hover:scale-[1.02]"
                  style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.35)", color: "rgba(168,85,247,1)" }}>
                  Schedule a Consultation
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {divider}

      {/* ── CTA Banner ── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124,58,237,0.14) 0%, transparent 70%)" }} />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-6"
            style={pillStyle}>
            <BellRing className="w-3 h-3" /> Improve Collections
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
            className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
            Improve Collections with a{" "}
            <span className="text-transparent bg-clip-text" style={gradientText}>Payment Reminder AI Agent</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.14 }}
            className="text-white/55 text-base leading-relaxed mb-10 max-w-2xl mx-auto">
            A Payment Reminder AI Agent helps businesses automate payment follow-ups, reduce overdue accounts, and improve cash flow without increasing operational costs. By delivering timely reminders and personalised customer communication, AI agents enable organisations to streamline collections while maintaining positive customer relationships.
            <br /><br />
            At <a href="https://hireprogrammer.co.uk/" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">HireProgrammer</a>, we develop custom AI agents that integrate seamlessly with your existing systems and scale alongside your business. Whether you need automated invoice reminders, subscription payment notifications, or advanced collection workflows, our Payment Reminder AI Agent solutions can help improve efficiency and financial performance.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4">
            <a href="/quote"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(124,58,237,0.5)]"
              style={{ background: PURPLE, color: "#ffffff" }}>
              Get a Free Quote <ArrowRight className="w-4 h-4" />
            </a>
            <a href="/ai-agent-development-services"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm text-white/70 hover:text-white transition-all duration-300"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
              Explore All AI Agents
            </a>
          </motion.div>
        </div>
      </section>

      {divider}

      {/* ── FAQ ── */}
      <section className="py-24 relative">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="text-center mb-14">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5"
              style={pillStyle}>
              <Sparkles className="w-3 h-3" /> FAQ
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
              className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Frequently Asked{" "}
              <span className="text-transparent bg-clip-text" style={gradientText}>Questions</span>
            </motion.h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="rounded-2xl overflow-hidden transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.025)", border: openFaq === i ? "1px solid rgba(124,58,237,0.4)" : "1px solid rgba(255,255,255,0.07)" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="text-white font-semibold text-sm leading-snug">{faq.q}</span>
                  <ChevronDown
                    className="w-4 h-4 text-primary flex-shrink-0 transition-transform duration-300"
                    style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ overflow: "hidden" }}
                    >
                      <p className="px-5 pb-5 text-white/55 text-sm leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
