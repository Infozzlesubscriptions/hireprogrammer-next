"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { HeroContactForm } from "@/components/sections/HeroContactForm";
import {
  MessageCircle, ArrowRight, CheckCircle2, Zap, Users, Clock,
  Layers, Database, BarChart3, Heart, ShoppingCart, Landmark,
  Briefcase, GraduationCap, Search, Layout, Code2, Brain,
  Rocket, ChevronDown, Sparkles, Bot, Globe, Ticket,
} from "lucide-react";

const PURPLE = "#7C3AED";
const pillStyle = { background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.22)" };
const cardStyle = { background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" };
const gradientText = { backgroundImage: "linear-gradient(135deg, #e070ff 0%, #a040ff 50%, #c040ff 100%)" };

const CAPABILITIES = [
  "Answering frequently asked questions",
  "Assisting customers with account-related enquiries",
  "Providing product and service information",
  "Handling support requests",
  "Guiding customers through processes",
  "Creating and managing support tickets",
  "Escalating complex enquiries to human agents",
  "Delivering support 24/7",
];

const BENEFITS = [
  { label: "Faster response times", icon: Zap },
  { label: "Improved customer satisfaction", icon: Heart },
  { label: "Reduced support workload", icon: Users },
  { label: "24/7 customer assistance", icon: Globe },
  { label: "Consistent customer experiences", icon: CheckCircle2 },
  { label: "Lower operational costs", icon: Landmark },
  { label: "Increased support team productivity", icon: Rocket },
  { label: "Scalable customer service operations", icon: Sparkles },
];

const FEATURES = [
  {
    icon: Zap,
    title: "Instant Customer Assistance",
    body: "Provide immediate responses to customer enquiries without requiring customers to wait for support availability.",
  },
  {
    icon: Bot,
    title: "Intelligent Conversation Handling",
    body: "Our AI agents understand customer intent and provide relevant, context-aware responses that create a smoother support experience.",
  },
  {
    icon: Layers,
    title: "Multi-Channel Support",
    body: "Engage customers across websites, mobile applications, email, live chat, social platforms, and messaging services.",
  },
  {
    icon: Ticket,
    title: "Ticket Management Support",
    body: "Automatically create, update, and route support tickets to the appropriate team members when required.",
  },
  {
    icon: Search,
    title: "Knowledge Base Integration",
    body: "Connect your AI agent with internal knowledge bases, FAQs, documentation, and support resources to provide accurate information.",
  },
  {
    icon: Database,
    title: "CRM and Business System Integration",
    body: "Integrate the AI agent with CRM platforms, customer databases, and business applications to deliver personalised support experiences.",
  },
  {
    icon: BarChart3,
    title: "Performance Reporting",
    body: "Track support metrics, customer interactions, response times, and service performance through detailed reporting and analytics.",
  },
];

const INDUSTRIES = [
  {
    icon: ShoppingCart,
    title: "E-commerce",
    body: "Provide product information, order updates, returns assistance, and customer support around the clock.",
  },
  {
    icon: Code2,
    title: "Software & Technology",
    body: "Support users with onboarding, troubleshooting, account management, and technical enquiries.",
  },
  {
    icon: Landmark,
    title: "Financial Services",
    body: "Assist customers with account-related questions, service requests, and general support enquiries.",
  },
  {
    icon: Heart,
    title: "Healthcare",
    body: "Help patients access information, schedule appointments, and receive administrative support.",
  },
  {
    icon: GraduationCap,
    title: "Education",
    body: "Support students with admissions enquiries, course information, and administrative assistance.",
  },
  {
    icon: Briefcase,
    title: "Professional Services",
    body: "Handle client enquiries, appointment requests, and customer communications efficiently.",
  },
];

const PROCESS = [
  {
    icon: Search,
    step: "01",
    title: "Discovery and Requirement Analysis",
    body: "We assess your customer support processes, common enquiries, and business goals.",
  },
  {
    icon: Layout,
    step: "02",
    title: "AI Agent Strategy and Design",
    body: "Our team designs a Customer Service AI Agent tailored to your support workflows and customer journey.",
  },
  {
    icon: Code2,
    step: "03",
    title: "Development and Integration",
    body: "We build and integrate the AI agent with your existing systems, communication channels, and support platforms.",
  },
  {
    icon: Brain,
    step: "04",
    title: "Training and Optimisation",
    body: "The AI agent is trained using your business knowledge, support documentation, and frequently asked questions.",
  },
  {
    icon: Rocket,
    step: "05",
    title: "Deployment and Continuous Improvement",
    body: "After launch, we monitor performance and optimise the AI agent to improve accuracy, efficiency, and customer satisfaction.",
  },
];

const AGENT_TYPES = [
  "Customer Service AI Agents",
  "Voice AI Agents",
  "Payment Reminder AI Agents",
  "Abandoned Cart AI Agents",
  "Lead Generation AI Agents",
  "Appointment Booking AI Agents",
  "Custom Business AI Agents",
];

const FAQS = [
  {
    q: "How can a Customer Service AI Agent improve customer support?",
    a: "A Customer Service AI Agent can handle routine customer enquiries, provide instant responses, assist with support requests, and guide customers through common processes. This helps reduce response times and improves the overall customer experience.",
  },
  {
    q: "Can the AI agent work alongside our existing support team?",
    a: "Yes. The AI agent is designed to complement your support team by managing repetitive tasks while escalating more complex enquiries to human agents when necessary.",
  },
  {
    q: "Can the Customer Service AI Agent integrate with our existing systems?",
    a: "Absolutely. HireProgrammer can integrate the AI agent with CRM platforms, helpdesk software, customer databases, and other business systems.",
  },
  {
    q: "Which communication channels can the AI agent support?",
    a: "The AI agent can support customers through websites, live chat, mobile apps, email, social messaging platforms, and other digital communication channels.",
  },
  {
    q: "Why choose HireProgrammer for Customer Service AI Agent development?",
    a: "HireProgrammer develops custom AI agents tailored to your business requirements. We focus on creating scalable, reliable, and user-friendly solutions that improve customer support efficiency and deliver better customer experiences.",
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

export default function CustomerServiceAiAgentPage() {
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
              <MessageCircle className="w-3 h-3" /> Customer Service AI Agent
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.65 }}
              className="font-black text-white leading-[1.08] tracking-tight mb-6"
              style={{ fontSize: "clamp(2rem, 4.4vw, 3.6rem)" }}>
              Customer Service AI Agent{" "}
              <span className="text-transparent bg-clip-text" style={gradientText}>
                Development Services
              </span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
              className="text-white/55 text-lg leading-relaxed mb-8 max-w-lg">
              Enhance customer support with a custom Customer Service AI Agent from HireProgrammer. Automate enquiries, improve response times, and deliver better customer experiences with intelligent AI agents.
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
            <HeroContactForm pageName="Customer Service AI Agent" extraField={{ label: "Requirement", type: "text", placeholder: "Describe your customer support needs..." }} />
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
              Deliver Faster and Smarter Customer Support{" "}
              <span className="text-transparent bg-clip-text" style={gradientText}>with AI</span>
            </motion.h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-5">
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-white/60 text-base leading-relaxed">
              Customers expect quick responses, accurate information, and consistent support across every interaction. As businesses grow, managing increasing volumes of customer enquiries can become challenging and resource-intensive.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
              className="text-white/60 text-base leading-relaxed">
              A Customer Service AI Agent helps businesses automate customer interactions, provide instant assistance, and improve service efficiency without compromising customer experience.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12 }}
              className="text-white/60 text-base leading-relaxed">
              At HireProgrammer, we develop custom AI agents that help businesses streamline customer support operations and improve engagement across multiple communication channels. Whether you're handling product enquiries, service requests, account questions, or support tickets, our Customer Service AI Agent can help your team deliver faster and more efficient support.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.16 }}
              className="text-white/60 text-base leading-relaxed">
              Designed to work alongside your existing support processes, our AI agents help reduce repetitive workloads while ensuring customers receive timely assistance whenever they need it.
            </motion.p>
          </div>
        </div>
      </section>

      {divider}

      {/* ── What is a Customer Service AI Agent ── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(124,58,237,0.06) 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>
                <Bot className="w-3 h-3" /> Customer Service AI Overview
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
                What is a{" "}
                <span className="text-transparent bg-clip-text" style={gradientText}>Customer Service AI Agent?</span>
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-5">
                A Customer Service AI Agent is an intelligent software solution designed to interact with customers, answer questions, and assist with support-related tasks through automated conversations.
              </p>
              <p className="text-white/60 text-base leading-relaxed">
                Unlike traditional chatbots that rely on limited scripts and predefined responses, modern AI agents can understand customer intent, interpret context, and provide more meaningful assistance.
              </p>
            </motion.div>

            <div>
              <motion.h3 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="text-xl font-bold text-white mb-6">
                Customer Service AI Agents can support businesses by:
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

      {/* ── Why Businesses Are Investing in Customer Service AI Agents ── */}
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
                <span className="text-transparent bg-clip-text" style={gradientText}>Customer Service AI Agents</span>
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-5">
                Customer support teams often spend valuable time answering repetitive questions and handling routine requests. AI agents help automate these interactions, allowing support staff to focus on more complex customer issues.
              </p>
              <p className="text-white/60 text-base leading-relaxed">
                By implementing AI-powered support solutions, businesses can improve efficiency while maintaining high service standards.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <h3 className="text-white font-bold text-lg mb-6">Benefits of Customer Service AI Agents</h3>
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
              <MessageCircle className="w-3 h-3" /> Key Features
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
              className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              Key Features of Our{" "}
              <span className="text-transparent bg-clip-text" style={gradientText}>Customer Service AI Agent</span>
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
              <span className="text-transparent bg-clip-text" style={gradientText}>Customer Service AI Agents</span>
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
              How Our Customer Service AI Agent{" "}
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
                At <a href="https://hireprogrammer.co.uk/" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">HireProgrammer</a>, we build intelligent AI agents that solve practical business challenges and improve operational efficiency.
              </p>
              <p className="text-white/60 text-base leading-relaxed mb-5">
                Our team develops custom AI agents designed to align with your business objectives, customer expectations, and support processes.
              </p>
              <p className="text-white/60 text-base leading-relaxed mb-8">
                As your business evolves, additional AI agents can be integrated to support different departments and business functions.
              </p>
              <a href="/quote"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(124,58,237,0.45)]"
                style={{ background: PURPLE, color: "#ffffff" }}>
                Start Your AI Project <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <h3 className="text-white font-bold text-lg mb-6">Our AI agent solutions include:</h3>
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
            <MessageCircle className="w-3 h-3" /> Improve Customer Experiences
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
            className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
            Improve Customer Experiences with a{" "}
            <span className="text-transparent bg-clip-text" style={gradientText}>Customer Service AI Agent</span>
          </motion.h2>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.14 }}
            className="text-white/55 text-base leading-relaxed mb-4 max-w-2xl mx-auto">
            <p className="mb-4">
              A Customer Service AI Agent helps businesses provide faster responses, improve customer satisfaction, and streamline support operations. By automating routine enquiries and assisting customers in real time, AI agents enable organisations to deliver high-quality service at scale.
            </p>
            <p>
              At HireProgrammer, we develop custom AI agents that integrate seamlessly with your business systems and support long-term growth. Whether you want to reduce support workloads, improve response times, or enhance customer engagement, our Customer Service AI Agent solutions are designed to help your business achieve measurable results.
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
