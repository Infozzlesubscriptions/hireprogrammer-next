"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { HeroContactForm } from "@/components/sections/HeroContactForm";
import {
  PhoneCall, ArrowRight, CheckCircle2, Mic, Users, Calendar,
  Database, GitBranch, Globe, BarChart3, Heart, Home, Landmark,
  ShoppingCart, Briefcase, GraduationCap, Search, Layout,
  Code2, Brain, Rocket, ChevronDown, Sparkles, Bot, Zap,
} from "lucide-react";

const PURPLE = "#7C3AED";
const pillStyle = { background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.22)" };
const cardStyle = { background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" };
const gradientText = { backgroundImage: "linear-gradient(135deg, #e070ff 0%, #a040ff 50%, #c040ff 100%)" };

const CAPABILITIES = [
  "Answer inbound calls around the clock",
  "Handle customer enquiries efficiently",
  "Qualify leads before they reach the sales team",
  "Schedule appointments and consultations",
  "Route calls to the correct department",
  "Capture customer information",
  "Send follow-up communications",
  "Integrate with CRM and business systems",
];

const BENEFITS = [
  { label: "Faster customer response times", icon: Zap },
  { label: "Reduced operational costs", icon: ArrowRight },
  { label: "Improved lead qualification", icon: Users },
  { label: "Increased customer satisfaction", icon: Heart },
  { label: "Consistent customer experiences", icon: CheckCircle2 },
  { label: "24/7 availability", icon: Globe },
  { label: "Better scalability for growing businesses", icon: Rocket },
  { label: "Enhanced productivity across teams", icon: Sparkles },
];

const FEATURES = [
  {
    icon: Mic,
    title: "Human-Like Voice Interactions",
    body: "Our Voice AI Agent understands customer needs, recognises conversational context, and delivers natural responses that create engaging and seamless customer experiences.",
  },
  {
    icon: Users,
    title: "Automated Lead Qualification",
    body: "Capture customer details, ask relevant questions, and identify qualified prospects before transferring them to your sales team.",
  },
  {
    icon: Calendar,
    title: "Appointment Scheduling",
    body: "Enable customers to book, reschedule, or cancel appointments through simple voice interactions.",
  },
  {
    icon: Database,
    title: "CRM & Software Integration",
    body: "Our AI agents can integrate with CRM platforms, databases, booking systems, and other business applications to keep information synchronised across your organisation.",
  },
  {
    icon: GitBranch,
    title: "Intelligent Call Routing",
    body: "Direct callers to the right department, team member, or service based on their requirements.",
  },
  {
    icon: Globe,
    title: "Multi-Language Communication",
    body: "Support customers across different regions with multilingual Voice AI Agent capabilities.",
  },
  {
    icon: BarChart3,
    title: "Reporting & Insights",
    body: "Monitor performance through detailed analytics, including call volumes, customer interactions, response quality, and conversion rates.",
  },
];

const INDUSTRIES = [
  {
    icon: Heart,
    title: "Healthcare",
    body: "Manage appointment scheduling, patient enquiries, and follow-up communications more efficiently.",
  },
  {
    icon: Home,
    title: "Real Estate",
    body: "Handle property enquiries, qualify leads, and schedule viewings automatically.",
  },
  {
    icon: Landmark,
    title: "Financial Services",
    body: "Provide customer support, payment reminders, and account-related assistance.",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    body: "Support customers with order updates, product enquiries, and abandoned cart recovery initiatives.",
  },
  {
    icon: Briefcase,
    title: "Professional Services",
    body: "Automate client enquiries, appointment bookings, and customer onboarding processes.",
  },
  {
    icon: GraduationCap,
    title: "Education",
    body: "Assist prospective students, manage admissions enquiries, and improve communication workflows.",
  },
];

const PROCESS = [
  {
    icon: Search,
    step: "01",
    title: "Discovery & Strategy",
    body: "We begin by understanding your business goals, customer interactions, and automation opportunities.",
  },
  {
    icon: Layout,
    step: "02",
    title: "Solution Design",
    body: "Our team designs a custom Voice AI Agent tailored to your workflows, industry, and customer journey.",
  },
  {
    icon: Code2,
    step: "03",
    title: "Development & Integration",
    body: "We develop and integrate the AI agent with your existing software, communication tools, and operational systems.",
  },
  {
    icon: Brain,
    step: "04",
    title: "Training & Optimisation",
    body: "The AI agent is trained using your business information, frequently asked questions, and service processes to ensure accurate responses.",
  },
  {
    icon: Rocket,
    step: "05",
    title: "Launch & Continuous Improvement",
    body: "After deployment, we monitor performance and continuously optimise the AI agent to improve customer interactions and business outcomes.",
  },
];

const AGENT_TYPES = [
  "Voice AI Agents",
  "Payment Reminder AI Agents",
  "Abandoned Cart AI Agents",
  "Customer Support AI Agents",
  "Lead Generation AI Agents",
  "Appointment Booking AI Agents",
  "Custom Business AI Agents",
];

const FAQS = [
  {
    q: "How can a Voice AI Agent help my business?",
    a: "A Voice AI Agent can automate routine phone conversations, answer customer enquiries, qualify leads, book appointments, and provide support outside business hours. This helps businesses improve response times, reduce manual workload, and deliver a better customer experience.",
  },
  {
    q: "Can HireProgrammer build a custom Voice AI Agent for my business?",
    a: "Yes. At HireProgrammer, we develop custom Voice AI Agent solutions based on your business processes, customer journey, and operational requirements. The AI agent can be tailored to your industry, workflows, and communication goals.",
  },
  {
    q: "Can a Voice AI Agent integrate with my existing software?",
    a: "Absolutely. Our AI agents can connect with CRM systems, booking platforms, helpdesk software, databases, and other business tools to streamline operations and automate tasks.",
  },
  {
    q: "Which industries can benefit from Voice AI Agents?",
    a: "Voice AI Agents can support businesses across multiple industries, including healthcare, real estate, financial services, e-commerce, education, legal services, and professional consulting. Any organisation that handles customer calls or enquiries can benefit from AI-powered automation.",
  },
  {
    q: "Why choose HireProgrammer for AI Agent development?",
    a: "HireProgrammer combines AI expertise with custom software development experience to build intelligent AI agents that solve real business challenges. We focus on creating scalable, reliable, and fully customised solutions that align with your business objectives.",
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

export default function VoiceAiAgentPage() {
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
              <PhoneCall className="w-3 h-3" /> Voice AI Agent
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.65 }}
              className="font-black text-white leading-[1.08] tracking-tight mb-6"
              style={{ fontSize: "clamp(2rem, 4.4vw, 3.6rem)" }}>
              Voice AI Agent{" "}
              <span className="text-transparent bg-clip-text" style={gradientText}>
                Development Services
              </span>{" "}
              UK
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
              className="text-white/55 text-lg leading-relaxed mb-8 max-w-lg">
              Transform customer interactions with a custom Voice AI Agent. HireProgrammer builds intelligent AI agents that answer calls, qualify leads, book appointments, and automate business communication 24/7.
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
            <HeroContactForm pageName="Voice AI Agent" extraField={{ label: "Requirement", type: "text", placeholder: "Describe your Voice AI Agent needs..." }} />
          </motion.div>
        </div>
      </section>

      {divider}

      {/* ── Overview ── */}
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
              Voice AI Agent Solutions Built for{" "}
              <span className="text-transparent bg-clip-text" style={gradientText}>Modern Businesses</span>
            </motion.h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-5">
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-white/60 text-base leading-relaxed">
              Customer expectations are changing rapidly, and businesses need faster, smarter ways to communicate. A Voice AI Agent helps organisations automate conversations, respond to enquiries instantly, and provide consistent support without increasing operational costs.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
              className="text-white/60 text-base leading-relaxed">
              At HireProgrammer, we build custom AI agents designed around your unique business requirements. Whether you need an AI-powered receptionist, appointment booking assistant, lead qualification system, or customer support solution, our Voice AI Agent services help businesses improve efficiency while delivering a better customer experience.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.14 }}
              className="text-white/60 text-base leading-relaxed">
              Our AI agents are built to integrate seamlessly with your existing systems, helping you automate repetitive tasks and scale customer interactions without compromising quality.
            </motion.p>
          </div>
        </div>
      </section>

      {divider}

      {/* ── What is a Voice AI Agent ── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(124,58,237,0.06) 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>
                <Bot className="w-3 h-3" /> How Voice AI Works
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
                What is a{" "}
                <span className="text-transparent bg-clip-text" style={gradientText}>Voice AI Agent?</span>
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-5">
                A Voice AI Agent is an intelligent software solution that communicates with customers through natural voice conversations. Unlike traditional phone systems that rely on rigid menus and limited responses, modern AI agents can understand customer intent, maintain context, and respond in a way that feels natural and engaging.
              </p>
              <p className="text-white/60 text-base leading-relaxed">
                Using artificial intelligence, speech recognition, and natural language processing technologies, a Voice AI Agent can handle conversations, answer questions, collect information, and perform business-related tasks automatically.
              </p>
            </motion.div>

            <div>
              <motion.h3 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="text-xl font-bold text-white mb-6">
                A Voice AI Agent can help businesses:
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

      {/* ── Why Businesses Are Investing in AI Agents ── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(124,58,237,0.05) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>
                <Zap className="w-3 h-3" /> Why AI Agents
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
                Why Businesses Are Investing in{" "}
                <span className="text-transparent bg-clip-text" style={gradientText}>AI Agents</span>
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-5">
                Businesses across multiple industries are adopting AI agents to improve customer service, reduce manual workloads, and create more efficient operations.
              </p>
              <p className="text-white/60 text-base leading-relaxed">
                Unlike traditional automation tools, AI agents can manage real conversations and adapt to customer needs in real time. This allows businesses to provide faster responses while freeing up staff to focus on more complex tasks.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <h3 className="text-white font-bold text-lg mb-6">Benefits of AI Agents</h3>
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
              <Mic className="w-3 h-3" /> Key Features
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
              className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              Key Features of Our{" "}
              <span className="text-transparent bg-clip-text" style={gradientText}>Voice AI Agent</span>
            </motion.h2>
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
              <span className="text-transparent bg-clip-text" style={gradientText}>Voice AI Agents</span>
            </motion.h2>
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
              How Our Voice AI Agent{" "}
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
                At <a href="https://hireprogrammer.co.uk/" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">HireProgrammer</a>, we combine software development expertise with advanced AI implementation capabilities to create intelligent AI agents that deliver measurable business value.
              </p>
              <p className="text-white/60 text-base leading-relaxed mb-5">
                We focus on building practical, scalable solutions that improve efficiency, enhance customer experiences, and support long-term growth.
              </p>
              <p className="text-white/60 text-base leading-relaxed mb-8">
                As your business evolves, additional AI agents can be added and integrated into your existing processes, creating a connected ecosystem of intelligent automation.
              </p>
              <a href="/quote"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(124,58,237,0.45)]"
                style={{ background: PURPLE, color: "#ffffff" }}>
                Start Your AI Project <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <h3 className="text-white font-bold text-lg mb-6">Our team develops:</h3>
              <div className="space-y-3 mb-8">
                {AGENT_TYPES.map((type, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                    className="flex items-center gap-3 p-4 rounded-xl" style={cardStyle}>
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: PURPLE }} />
                    <span className="text-white/70 text-sm font-medium">{type}</span>
                  </motion.div>
                ))}
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
            <PhoneCall className="w-3 h-3" /> Transform Customer Communication
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
            className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
            Transform Customer Communication with a{" "}
            <span className="text-transparent bg-clip-text" style={gradientText}>Voice AI Agent</span>
          </motion.h2>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.14 }}
            className="text-white/55 text-base leading-relaxed mb-4 max-w-2xl mx-auto">
            <p className="mb-4">
              A Voice AI Agent can help businesses create faster, more efficient, and more personalised customer interactions. From answering calls and qualifying leads to scheduling appointments and supporting customers around the clock, AI agents are transforming the way organisations communicate.
            </p>
            <p>
              HireProgrammer develops custom AI agents that are tailored to your business objectives, integrate with your existing systems, and scale as your organisation grows. Whether you are looking to improve customer service, automate routine tasks, or increase operational efficiency, our Voice AI Agent solutions can help you achieve your goals.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mt-10">
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
