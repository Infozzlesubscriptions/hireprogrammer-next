"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { useQuoteModal } from '@/context/QuoteModalContext';
import { HeroContactForm } from '@/components/sections/HeroContactForm';
import {
  ArrowRight, CheckCircle2, ChevronDown, Zap, Shield,
  Star, Brain, Sparkles, Globe, Cpu, FileText, Image, Users, Code2,
} from "lucide-react";

const GOLD = "#7C3AED";
const pillStyle = { background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.22)" };
const cardStyle = { background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" };

const whyGenAI = [
  {
    icon: FileText,
    title: "Advanced Content Generation",
    body: "Integrate AI to generate images, code, and even audio on demand. Our Generative AI developers design workflows that automate high-quality content production at scale, and synchronise workflows. We'll put it's best to your brand and show you what AI can do.",
    highlight: "Advanced Content Generation",
  },
  {
    icon: Users,
    title: "Personalisation at Scale",
    body: "Boost customer engagement with Generative AI for UX. Deliver dynamic product recommendations, personalised user journeys, and smart content — enabling you to personalise your project to your client as well as the client, with the aim to improve their experience and reduce costs.",
    highlight: "Personalisation at Scale",
  },
  {
    icon: Globe,
    title: "Cross-Platform Compatibility",
    body: "Thanks to proven standard models like GPT and Stable Diffusion, our solutions offer seamless cross-platform compatibility. With a pool of over 30 experienced Generative AI developers in the UK, we help you develop software without reinventing the wheel.",
    highlight: "Cross-Platform Compatibility",
  },
];

const services = [
  {
    icon: FileText,
    title: "Custom Generative AI Models",
    body: "Our Generative AI developers create custom trained models that can generate content, analyse data, and offer real-time text summarisation to automated. Our team uses the latest LLM architectures and fine-tuning techniques to build models that match your exact use case.",
    bullets: ["LLM fine-tuning", "Custom model training", "RAG architectures", "Prompt engineering"],
  },
  {
    icon: Image,
    title: "Design Smarter Interfaces with AI",
    body: "Design smarter interfaces with AI from Automated streamlining to content suggestions, our team uses Generative AI in the UK to speed up design workflows and eliminate repetitive creative practice. From AI-assisted UI generation to intelligent design systems, we bring creativity and technology together.",
    bullets: ["AI UI generation", "Design automation", "Content suggestion AI", "Creative workflows"],
  },
  {
    icon: Sparkles,
    title: "Improve Your Generative AI SEO Services",
    body: "Improve your website or Generative AI SEO services, we develop tools that generate optimised content, identify keyword opportunities, and provide intelligent SEO recommendations. Our Generative AI is consultant in this area — helping you stay ahead of search algorithms.",
    bullets: ["AI content creation", "SEO automation", "Keyword clustering", "Meta generation"],
  },
  {
    icon: Code2,
    title: "AI-Powered App Development",
    body: "Already using agility systems or scaling platforms? We offer Generative AI solutions to help you with your current tech. Our Generative AI is consultant in the digital world, so let us help you incorporate AI into your business without disrupting operations.",
    bullets: ["AI integration", "App modernisation", "Workflow AI", "Legacy AI uplift"],
  },
];

const useCases = [
  "AI-generated Content & Image Creation",
  "AI-Driven Marketing and Modelling Tools",
  "Analytical interfaces and Customer Insights",
  "Laravel Development with AI Features",
];

const consultingServices = [
  "Custom Generative AI solutions for your unique industry",
  "One-to-one Generative AI consulting sessions",
  "Generative AI and SEO improvements to enhance visibility",
  "Support with Generative AI-to-AI improvements",
];

const faqs = [
  {
    q: "What is Generative AI and how can it benefit my business?",
    a: "Generative AI refers to AI systems that can create new content — text, images, code, audio, and video — based on patterns learned from large datasets. For businesses, it can automate content creation, personalise customer experiences, accelerate product development, and generate insights from complex data at a scale not previously possible.",
  },
  {
    q: "How can I hire a Generative AI developer in the UK?",
    a: "HireProgrammer connects you with expert Generative AI developers based in the UK who are proficient in LLMs, diffusion models, fine-tuning, RAG architectures, and prompt engineering. Contact us to discuss your requirements and we'll match you with the right specialists.",
  },
  {
    q: "What industries can benefit from Generative AI development?",
    a: "Virtually every industry can benefit — from e-commerce (product descriptions, personalisation), legal (document summarisation), marketing (content generation), healthcare (clinical notes), education (personalised learning), to finance (report generation and data analysis).",
  },
  {
    q: "Can you provide Generative AI consulting services before development begins?",
    a: "Yes. We offer dedicated Generative AI consulting to help you identify the right use cases, evaluate available models and tools, assess data readiness, and define a clear AI roadmap — ensuring you invest in solutions that genuinely move your business forward.",
  },
  {
    q: "Can Generative AI improve my website's / content's SEO performance?",
    a: "Yes. Generative AI can accelerate SEO content production, generate keyword-rich articles and meta descriptions, identify content gaps, and create structured data markup at scale. Our team builds responsible AI content systems that align with Google's quality guidelines.",
  },
  {
    q: "How is Generative AI different from traditional AI?",
    a: "Traditional AI classifies, detects, or predicts based on existing data. Generative AI creates entirely new outputs — writing, images, code, audio — by learning the underlying patterns of its training data. This makes it uniquely powerful for creative and content-heavy applications.",
  },
  {
    q: "Is Generative AI safe to use?",
    a: "When properly implemented, yes. We follow responsible AI principles including output monitoring, bias evaluation, human-in-the-loop validation, and transparent documentation. We also ensure all AI deployments comply with UK data protection regulations including GDPR.",
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

export default function GenerativeAiPage() {
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
          <img src="/generative-ai-hero-banner.png" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.45) saturate(1.1)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(8,3,22,0.85) 0%, rgba(8,3,22,0.55) 50%, rgba(8,3,22,0.80) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(124,58,237,0.07) 0%, transparent 65%)" }} />
        </motion.div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-14 items-center">
          <motion.div style={{ opacity: heroOp }}>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-6" style={pillStyle}>
              <Sparkles className="w-3 h-3" /> Generative AI Development
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.65 }} className="text-4xl md:text-6xl font-black text-white leading-[1.08] tracking-tight mb-6">
              Hire Expert{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">Generative AI Developers UK</span>
              <br />for Your Business
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-white/50 text-xl leading-relaxed mb-10 max-w-md">
              Build the right product from the very start — with UK's leading Generative AI development agency.
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
            <HeroContactForm pageName="Generative AI" extraField={{ label: "Requirement", type: "text", placeholder: "Describe your Generative AI project..." }} />
          </motion.div>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4) 50%, transparent)" }} />

      {/* Intro + Why */}
      <section className="py-24 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(124,58,237,0.04) 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>
                <Sparkles className="w-3 h-3" /> Generative AI Development
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
                UK's Leading{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">Generative AI Agency</span>
              </motion.h2>
              {[
                "Unlock the power of next-generation technology with our Generative AI development services. In HireProgrammer, we help businesses across the air to harness the transformative potential of AI to automate processes, personalise experiences, and design innovative solutions at scale.",
                "Whether you're a startup or an enterprise seeking to scale and AI to automate processes, personalise experiences, and design innovative solutions, it is best to build innovative, reliable, and scalable solutions tailored to your unique business goals.",
              ].map((p, i) => (
                <motion.p key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08 }} className="text-white/55 leading-relaxed mb-4 text-sm">{p}</motion.p>
              ))}
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="mt-6 rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                <img src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=80" alt="Generative AI" className="w-full h-56 object-cover" style={{ filter: "brightness(0.65) saturate(0.8)" }} />
              </motion.div>
            </div>
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>
                <Star className="w-3 h-3" /> Why Generative AI?
              </motion.div>
              <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="text-2xl font-bold text-white leading-tight mb-6">
                Why Choose Generative AI for Your Brand?
              </motion.h3>
              <div className="space-y-4">
                {whyGenAI.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09 }} className="group flex gap-4 p-5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30" style={cardStyle}>
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:shadow-[0_0_12px_rgba(124,58,237,0.3)] transition-all duration-300" style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.22)" }}>
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
          </div>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25) 50%, transparent)" }} />

      {/* Human First Banner */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&q=80" alt="" className="w-full h-full object-cover" style={{ filter: "brightness(0.2) saturate(0.5)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(8,3,22,0.85) 0%, rgba(14,13,8,0.7) 100%)" }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div>
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Generative AI, Human First</p>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">We build smart AI solution that feels<br />natural, helpful, and human.</h2>
            <p className="text-white/45 mt-4 text-base max-w-lg">From concept to launch — Intelligent solutions, naturally.</p>
          </div>
          <a href="/contact-us" className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105" style={{ background: "#7C3AED", color: "#ffffff" }}>
            Contact Us <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25) 50%, transparent)" }} />

      {/* Why Choose HireProgrammer */}
      <section className="py-24 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(124,58,237,0.04) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="mb-12 text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>
              <Shield className="w-3 h-3" /> Why Choose Us
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Why Choose HireProgrammer for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">Generative AI Development?</span>
            </motion.h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 mb-10">
            <div>
              <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-white/55 text-sm leading-relaxed mb-6">
                With over a decade of experience in software and AI-based development, we understand the evolving needs of businesses in the digital world. Our in-house team of Generative AI developers in London and across the country are experts in building intelligent applications that drive genuine competitive advantage.
              </motion.p>
              <div className="space-y-2">
                {[
                  "Custom AI solutions for web and cross-platform platforms",
                  "One-to-one Generative AI consulting decisions",
                  "Generative AI SEO improvements to enhance visibility",
                  "Support with Generative AI to AI improvements",
                ].map((text, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="flex items-start gap-3 p-3 rounded-lg" style={cardStyle}>
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: GOLD }} />
                    <span className="text-white/65 text-sm leading-snug">{text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-white/55 text-sm leading-relaxed mb-6">
                If you're not sure where to start, our Generative AI consulting services will guide you. We'll assess your existing architecture, we offer reliable and trustworthy insights to ensure your AI investments deliver real value.
              </motion.p>
              <div className="space-y-2">
                {[
                  "Generative AI Consulting Services",
                  "Our Generative AI Services",
                  "Generative AI in Servicing & Training",
                ].map((text, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="flex items-start gap-3 p-3 rounded-lg" style={cardStyle}>
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: GOLD }} />
                    <span className="text-white/65 text-sm leading-snug">{text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
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
              <Sparkles className="w-3 h-3" /> What We Offer
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Our Generative AI{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">Services</span>
            </motion.h2>
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
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>
                <Users className="w-3 h-3" /> Hire Generative AI Developers in the UK
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
                Connect with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">Expert Gen AI Talent</span>
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12 }} className="text-white/55 leading-relaxed mb-5 text-sm">
                Looking to hire Generative AI developers in the UK who truly understand your business needs? HireProgrammer connects you with the best-in-class Generative AI engineers — versed in the latest Generative AI frameworks and programming languages. Based in London and serving clients nationwide, we're ready to support your goals with flexible hiring arrangements and top-tier AI expertise.
              </motion.p>
              <motion.a href="/contact-us" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.22 }} className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(124,58,237,0.35)]" style={{ background: "#7C3AED", color: "#ffffff" }}>
                Hire Gen AI Developers <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>
                <Zap className="w-3 h-3" /> Generative AI Use Cases We Support
              </motion.div>
              <div className="grid grid-cols-1 gap-3">
                {useCases.map((uc, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-center gap-4 p-4 rounded-xl group transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30" style={cardStyle}>
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: GOLD }} />
                    <span className="text-white/65 text-sm group-hover:text-white transition-colors duration-300">{uc}</span>
                  </motion.div>
                ))}
              </div>
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">Generative AI project</span>
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
