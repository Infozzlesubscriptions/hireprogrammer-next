"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { useQuoteModal } from '@/context/QuoteModalContext';
import { HeroContactForm } from '@/components/sections/HeroContactForm';
import {
  ArrowRight, CheckCircle2, ChevronDown, Zap, Shield,
  Star, Brain, Bot, BarChart3, Users, Workflow, MessageSquare,
  Globe, Cpu, Wrench,
} from "lucide-react";

const GOLD = "#7C3AED";
const pillStyle = { background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.22)" };
const cardStyle = { background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" };

const whyMatters = [
  {
    icon: Workflow,
    title: "Automate Repetitive Tasks",
    body: "Our AI automation services simplify workflows by automating repetitive tasks, reducing errors, and boosting overall productivity. Whether it's data entry, document processing, or routine business operations, our AI solutions free your team to focus on what genuinely matters.",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Insights",
    body: "With machine learning and predictive analytics our AI developers uncover insights from your data, helping you forecast trends and make smarter business decisions. Turn raw data into actionable intelligence that drives measurable growth.",
  },
  {
    icon: MessageSquare,
    title: "Improve Customer Experience",
    body: "We design AI-driven chatbots, recommendation systems, and personalisation tools that enhance customer satisfaction and increase engagement. Deliver personalised, responsive experiences at scale without increasing headcount.",
  },
  {
    icon: Globe,
    title: "Scale Your Operations",
    body: "From simple process automation to large-scale AI deployments, our AI development company, to, it ensures smooth integration and scalability across all platforms. Build AI systems that grow with your business and adapt to changing needs.",
  },
];

const services = [
  {
    icon: Bot,
    title: "Tailored AI Applications",
    body: "AI applications built for web, mobile, and cloud environments to meet your specific business needs. Every solution is designed around your exact requirements, ensuring maximum relevance and return on investment.",
    bullets: ["Web & mobile AI apps", "Cloud-native AI", "Custom ML models", "Bespoke solutions"],
  },
  {
    icon: Workflow,
    title: "Intelligent Workflow Automation",
    body: "Intelligent workflow automation that simplifies processes, improves accuracy, and saves valuable time. We identify the highest-impact automation opportunities within your existing operations and implement them precisely.",
    bullets: ["Process automation", "RPA integration", "Document AI", "Workflow orchestration"],
  },
  {
    icon: Brain,
    title: "Generative AI Solutions",
    body: "Leverage the power of Generative AI to create new content, automate creative tasks, and accelerate innovation. From AI-powered copywriting and image generation to product descriptions and code assistance — we deliver it all.",
    bullets: ["LLM integration", "Content generation", "Image AI", "Code automation"],
  },
  {
    icon: MessageSquare,
    title: "Conversational AI",
    body: "Build advanced conversational AI tools that enhance customer support and streamline communication. Our chatbots and virtual agents are trained on your data to deliver accurate, contextual, on-brand responses 24/7.",
    bullets: ["AI chatbots", "Virtual assistants", "NLP processing", "Omnichannel deploy"],
  },
  {
    icon: BarChart3,
    title: "Predictive Analytics & ML",
    body: "Turn raw data into actionable insights using machine learning and predictive modelling techniques. We build models that forecast demand, detect anomalies, optimise pricing, and surface opportunities hidden in your data.",
    bullets: ["Demand forecasting", "Anomaly detection", "Recommendation AI", "ML pipelines"],
  },
  {
    icon: Cpu,
    title: "AI Integration",
    body: "Seamlessly integrate AI capabilities into your existing tech stack to immediately unlock value. Whether you're adding AI to an existing website, CRM, ERP, or mobile app, our team handles the complete integration with minimal disruption.",
    bullets: ["API-first AI", "Legacy integration", "CRM & ERP AI", "Real-time inference"],
  },
];

const useCases = [
  "Business Process Automation",
  "AI-Powered Websites & Personalisation",
  "Intelligent Chatbots & Customer Support Tools",
  "Predictive Data Tools & Data Modelling",
  "AI-Driven Mapping and Workflow Automation",
  "Laravel Development with AI Features",
];

const faqs = [
  {
    q: "What are AI development and automation services?",
    a: "AI development and automation services cover designing, building, and integrating artificial intelligence and machine learning solutions into your business. This includes custom AI applications, intelligent workflow automation, chatbots, predictive analytics, generative AI tools, and AI integrations with existing systems.",
  },
  {
    q: "How can I hire AI developers in the UK?",
    a: "HireProgrammer connects you with highly skilled AI and machine learning engineers based in the UK. Simply contact us with your requirements and we'll match you with the right specialists — whether you need a single developer or a full AI team.",
  },
  {
    q: "What is AI development services?",
    a: "AI development services encompass the full lifecycle of building AI-powered products — from discovery and data strategy through model training, integration, testing, and ongoing maintenance. We cover everything from simple chatbots to complex ML systems.",
  },
  {
    q: "How long does an AI development project take?",
    a: "Timelines vary significantly based on complexity. A simple chatbot integration can be delivered in 2–4 weeks, while a custom ML model or enterprise AI platform may take 3–6 months. We agree clear milestones and provide regular progress updates throughout.",
  },
  {
    q: "Can you integrate AI into my existing systems or websites?",
    a: "Yes. We specialise in integrating AI capabilities into existing technology stacks — whether that's adding a recommendation engine to an e-commerce site, embedding an AI chatbot into a CRM, or building predictive analytics into a business dashboard.",
  },
  {
    q: "Why should I choose HireProgrammer for AI development in the UK?",
    a: "We combine deep technical AI and ML expertise with genuine business understanding. Our UK-based team stays at the forefront of AI innovation, works transparently, and delivers solutions tailored precisely to your goals — with ongoing support to ensure long-term success.",
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

export default function AiDevelopersPage() {
  const { openQuoteModal } = useQuoteModal();
  const { scrollY } = useScroll();
  const heroY  = useTransform(scrollY, [0, 700], ["0%", "30%"]);
  const heroOp = useTransform(scrollY, [0, 490], [1, 0]);

  return (
    <main className="min-h-screen bg-[#080316] text-foreground overflow-x-hidden selection:bg-primary/30">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-24">
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <img src="/ai-developers-hero-banner.png" alt="AI Developer Services"
title="AI Developer Services" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.45) saturate(1.1)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(8,3,22,0.85) 0%, rgba(8,3,22,0.55) 50%, rgba(8,3,22,0.80) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(124,58,237,0.07) 0%, transparent 65%)" }} />
        </motion.div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-14 items-center">
          <motion.div style={{ opacity: heroOp }}>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-6" style={pillStyle}>
              <Brain className="w-3 h-3" /> AI Development Services
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.65 }} className="text-4xl md:text-6xl font-black text-white leading-[1.08] tracking-tight mb-6">
              Hire Expert{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">AI Developers UK</span>
              <br />for Your Business
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-white/50 text-xl leading-relaxed mb-10 max-w-md">
              Build the right product from the very start — with UK's leading AI development agency.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="flex flex-wrap gap-4">
              <a href="/quote" className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(124,58,237,0.45)]" style={{ background: "#7C3AED", color: "#ffffff" }}>
                Get a Free Quote <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.7 }} className="rounded-2xl p-8" style={{ background: "rgba(6,2,16,0.7)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>
            <h3 className="text-white font-bold text-xl mb-1">Start Your Project</h3>
            <p className="text-white/40 text-sm mb-6">Free consultation, no commitment</p>
            <HeroContactForm pageName="AI Developers" extraField={{ label: "Requirement", type: "text", placeholder: "Describe your AI project..." }} />
          </motion.div>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4) 50%, transparent)" }} />

      {/* Intro */}
      <section className="py-24 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(124,58,237,0.04) 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>
                <Brain className="w-3 h-3" /> AI Developers in the UK
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
                Expert AI Development &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">Automation Services</span>
              </motion.h2>
              {[
                "HireProgrammer connects your business with highly skilled AI developers and automation specialists who help you in the UK who build intelligent systems, automate workflows, and deliver next-generation digital solutions.",
                "Whether you're a startup or an enterprise, HireProgrammer provides scalable, secure, and high-performance AI services tailored to your business goals. Our programmers has far reaching extensive experience in artificial intelligence, automation and software engineering — helping your organisation save time, reduce costs, and gain a competitive advantage.",
              ].map((p, i) => (
                <motion.p key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08 }} className="text-white/55 leading-relaxed mb-4 text-sm">{p}</motion.p>
              ))}
            </div>

            {/* Why AI Matters */}
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>
                <Star className="w-3 h-3" /> Why AI Matters
              </motion.div>
              <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="text-2xl font-bold text-white leading-tight mb-6">
                Why AI Development Matters for Your Business
              </motion.h3>
              <div className="space-y-3">
                {whyMatters.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group flex gap-4 p-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30" style={cardStyle}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:shadow-[0_0_12px_rgba(124,58,237,0.3)] transition-all duration-300" style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.22)" }}>
                        <Icon className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-sm mb-1 group-hover:text-primary transition-colors duration-300">{item.title}</h4>
                        <p className="text-white/50 text-xs leading-relaxed">{item.body}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25) 50%, transparent)" }} />

      {/* Human-First Banner */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1600&q=80" alt="" className="w-full h-full object-cover" style={{ filter: "brightness(0.25) saturate(0.6)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(8,3,22,0.85) 0%, rgba(14,13,8,0.7) 100%)" }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div>
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">AI Developers, Human-First</p>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">We create AI that thinks with purpose<br />and works for people.</h2>
            <p className="text-white/45 mt-4 text-base max-w-lg">From concept to launch — Intelligent solutions, naturally.</p>
          </div>
          <div className="flex-shrink-0 flex gap-3">
            <a href="/contact-us" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105" style={{ background: "#7C3AED", color: "#ffffff" }}>
              Contact Us <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25) 50%, transparent)" }} />

      {/* Services */}
      <section id="services" className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(124,58,237,0.04) 0%, transparent 65%)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="mb-14">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>
              <Cpu className="w-3 h-3" /> What We Offer
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
              Our AI Development &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">Automation Services</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.14 }} className="text-white/40 text-sm max-w-2xl leading-relaxed">
              At HireProgrammer, we offer a complete range of AI solutions designed to empower your business.
            </motion.p>
          </div>
          <div className="grid lg:grid-cols-2 gap-5">
            {services.map((s, i) => {
              const Icon = s.icon;
              const num  = String(i + 1).padStart(2, "0");
              const isLast = i === services.length - 1 && services.length % 2 !== 0;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className={`group relative rounded-2xl p-8 overflow-hidden transition-all duration-300 hover:border-primary/40${isLast ? " lg:col-span-2 lg:max-w-[calc(50%-10px)] lg:mx-auto lg:w-full" : ""}`}
                  style={{ background: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <span className="absolute top-4 right-6 text-7xl font-black select-none pointer-events-none leading-none" style={{ color: "rgba(124,58,237,0.06)" }}>{num}</span>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" style={{ background: "radial-gradient(ellipse 60% 50% at 0% 0%, rgba(124,58,237,0.06) 0%, transparent 70%)" }} />
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)" }}>
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(124,58,237,0.3), transparent)" }} />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-3 group-hover:text-primary transition-colors duration-300">{s.title}</h3>
                    <p className="text-white/45 text-sm leading-relaxed mb-5">{s.body}</p>
                    <div className="flex flex-wrap gap-2">
                      {s.bullets.map((b, j) => (
                        <span key={j} className="px-3 py-1 rounded-full text-xs font-medium text-white/55" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>{b}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25) 50%, transparent)" }} />

      {/* Hire + Use Cases */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124,58,237,0.04) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>
                <Users className="w-3 h-3" /> Hire AI Developers in the UK
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
                Connect with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">Expert AI Talent</span>
              </motion.h2>
              {[
                "Looking to hire AI developers in the UK who truly understand your business needs? HireProgrammer connects you with highly skilled AI specialists in Python, Laravel, Algorithms, and experts in frameworks. Whether you need to work on development or bilateral integrations, our flexible hiring model gives you access to expert developers when you need them most.",
                "Based in London and serving clients nationwide, we're ready to empower startups, agencies, and enterprises with cutting-edge AI solutions.",
              ].map((p, i) => (
                <motion.p key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08 }} className="text-white/55 leading-relaxed mb-4 text-sm">{p}</motion.p>
              ))}
              <motion.a href="/contact-us" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.26 }} className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm mt-2 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(124,58,237,0.35)]" style={{ background: "#7C3AED", color: "#ffffff" }}>
                Hire AI Developers <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>
                <Zap className="w-3 h-3" /> AI Development Use Cases We Support
              </motion.div>
              <div className="grid grid-cols-1 gap-3">
                {useCases.map((uc, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="relative flex items-center gap-4 p-4 rounded-xl group overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30" style={{ background: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: GOLD }} />
                    <span className="text-white/65 text-sm group-hover:text-white transition-colors duration-300">{uc}</span>
                  </motion.div>
                ))}
              </div>
              <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="text-white/40 text-xs mt-4 leading-relaxed">
                We provide AI, software and mobile app development plus dedicated service teams to help you scale efficiently with agile, flexible solutions.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25) 50%, transparent)" }} />

      {/* FAQ */}
      <section className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
            <div className="lg:sticky lg:top-32">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-6" style={pillStyle}>
                <ChevronDown className="w-3 h-3" /> FAQs
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
                Frequently Asked{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">Questions</span>
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.14 }} className="text-white/40 text-sm leading-relaxed mb-8">Can't find what you're looking for? Reach out directly.</motion.p>
              <motion.a href="/contact-us" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105" style={{ background: "#7C3AED", color: "#ffffff" }}>
                Ask Us Anything <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>
            <div className="space-y-3">
              {faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} index={i} />)}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.5) 50%, transparent)" }} />
        <div className="relative" style={{ background: "linear-gradient(135deg, #080316 0%, #0D0819 50%, #080316 100%)" }}>
          <div className="absolute inset-0 pointer-events-none glow-pulse-bg" style={{ background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(124,58,237,0.1) 0%, transparent 70%)" }} />
          <div className="relative z-10 py-28 px-6 text-center max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
                Start your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">AI project</span>
                <br />today
              </h2>
              <p className="text-white/45 text-xl mb-12 leading-relaxed">Reach out to book your free consultation and explore how we can support you.</p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a href="/contact-us" className="inline-flex items-center gap-2.5 px-10 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(124,58,237,0.5)]" style={{ background: "#7C3AED", color: "#ffffff" }}>
                  Contact Us <ArrowRight className="w-5 h-5" />
                </a>
                
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
