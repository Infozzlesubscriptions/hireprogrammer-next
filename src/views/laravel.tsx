"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { useQuoteModal } from '@/context/QuoteModalContext';
import { HeroContactForm } from '@/components/sections/HeroContactForm';
import {
  ArrowRight, CheckCircle2, ChevronDown, Code2, Zap, Shield,
  Star, Globe, Puzzle, Wrench, Users, BarChart3, Lock, Server,
} from "lucide-react";

const GOLD = "#7C3AED";
const pillStyle = { background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.22)" };
const cardStyle = { background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" };

const services = [
  {
    icon: Globe,
    title: "Laravel Application Development",
    body: "As one of the leading custom web development agencies in London, we help our clients with complex Laravel web development solutions to tackle rich designs and user-friendly interfaces using the Laravel framework. From e-commerce development to web app development, we offer an extensive range of services that can customise the built-in functionalities to the client's business requirements.",
    bullets: ["Custom Laravel builds", "Scalable architecture", "E-commerce solutions", "API development"],
  },
  {
    icon: Server,
    title: "Laravel Enterprise Development",
    body: "HireProgrammer has a robust Laravel enterprise development solution that provides enterprise-grade web development and bespoke UK development and designing. Our enterprise Laravel applications are built with the performance, security, and maintainability that ambitious businesses require.",
    bullets: ["Enterprise architecture", "Multi-tenancy", "Role-based access", "Audit logging"],
  },
  {
    icon: Wrench,
    title: "Ongoing Maintenance and Support",
    body: "Our team of top Laravel developers addresses all the errors and queries, ensuring the installation of all the latest security protocols, app upgrades, and enhancement. We provide flexible monthly retainers covering security patches, Laravel version upgrades, feature enhancements, and priority technical support whenever you need it.",
    bullets: ["Monthly retainers", "Security patching", "Version upgrades", "Priority support"],
  },
  {
    icon: Puzzle,
    title: "Third-party API Integration",
    body: "We ensure smooth integration and seamless data synchronisation of the Laravel web application with the third-party API. Whether you need payment gateway integrations, CRM connections, social media APIs, or logistics services, our Laravel team handles the full integration lifecycle with precision.",
    bullets: ["Payment gateways", "CRM integrations", "Social APIs", "Logistics & shipping"],
  },
];

const whyLaravel = [
  "Exceptional database migration and error handling",
  "Seamless Integration with the mail system",
  "High-class security that prevents security threats and malicious activities",
  "Large community of developers for regular updates and maintenance",
  "Easy and smooth integration of tools for building modular and responsive ready-made apps",
];

const whyUsLeft = [
  "Dedicated Laravel web development agency in the UK",
  "Excellent customer support",
  "Highly skilled and certified Laravel developers",
  "Innovative and result-oriented WordPress solutions",
];

const whyUsRight = [
  "Reporting/maintenance and quality assurance",
  "Expert business consulting and strategy",
  "Custom Laravel solutions at competitive rates",
];

const faqs = [
  {
    q: "What is Laravel and why should I use it for my website?",
    a: "Laravel is a free, open-source PHP framework built on the MVC pattern. It provides elegant syntax, a powerful ORM (Eloquent), built-in authentication, queuing, caching, and a rich ecosystem of packages. It's ideal for building secure, scalable, and maintainable web applications of any complexity.",
  },
  {
    q: "How much does Laravel website development cost in the UK?",
    a: "Costs depend on project scope, complexity, and timeline. We offer fixed-price project quotes and flexible monthly retainer arrangements. Contact us for a free, no-obligation estimate tailored to your specific requirements.",
  },
  {
    q: "What types of projects can be built with Laravel?",
    a: "Laravel is extremely versatile — suitable for everything from simple brochure sites and APIs to complex enterprise platforms, SaaS applications, e-commerce stores, membership portals, real-time dashboards, and multi-tenant systems.",
  },
  {
    q: "How long does it take to develop a Laravel website?",
    a: "A standard Laravel project typically takes 4–10 weeks, depending on scope, complexity, and integrations. We agree clear milestones upfront and provide weekly progress updates throughout the project.",
  },
  {
    q: "Do you provide ongoing support and maintenance for Laravel websites?",
    a: "Yes. We offer flexible monthly support packages covering security patches, Laravel version upgrades, performance monitoring, bug fixes, content updates, and priority technical assistance.",
  },
  {
    q: "Can you integrate my Laravel website with existing systems and APIs?",
    a: "Absolutely. Our team has extensive experience integrating Laravel applications with a wide range of third-party services including payment gateways, CRMs, ERPs, marketing platforms, social media APIs, and logistics providers.",
  },
  {
    q: "What makes your Laravel development services different from others?",
    a: "We combine deep technical Laravel expertise with genuine business insight. Every project benefits from thorough discovery, clean code standards, full test coverage, transparent communication, and post-launch support — delivering long-term value, not just a one-off deliverable.",
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

export default function LaravelPage() {
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
          <img src="/laravel-hero-banner.png" alt="Laravel Development Services"
title="Laravel Development Services" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.45) saturate(1.1)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(8,3,22,0.85) 0%, rgba(8,3,22,0.55) 50%, rgba(8,3,22,0.80) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(124,58,237,0.07) 0%, transparent 65%)" }} />
        </motion.div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-14 items-center">
          <motion.div style={{ opacity: heroOp }}>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-6" style={pillStyle}>
              <Code2 className="w-3 h-3" /> Laravel Development Services
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.65 }} className="text-4xl md:text-6xl font-black text-white leading-[1.08] tracking-tight mb-6">
              Hire Expert{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">Laravel Developers UK</span>
              <br />for Your Project
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-white/50 text-xl leading-relaxed mb-10 max-w-md">
              Build the right product from the very start — with UK's leading Laravel development agency.
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
            <HeroContactForm pageName="Laravel Development" extraField={{ label: "Requirement", type: "text", placeholder: "Describe your project..." }} />
          </motion.div>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4) 50%, transparent)" }} />

      {/* Intro */}
      <section className="py-24 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(124,58,237,0.04) 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>
                <Code2 className="w-3 h-3" /> Laravel Website Development
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
                UK's Premier{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">Laravel Agency</span>
              </motion.h2>
              {[
                "Laravel is an open-source PHP-based framework that follows a quick development approach, allowing superior coding foundations and modular programming. Its MVC architecture helps develop high-quality and scalable web applications and websites. Laravel uses the best-in-class tools and frameworks and provides a comprehensive set of tools and an application framework to capture the essence of responsive, high-end, modern, reliable, and functional web solutions. HireProgrammer's expert Laravel developers to offer exceptional quality web solutions at a very competitive price and according to the client's requirements.",
                "We closely work with our clients to understand their business needs and how best we can utilise Laravel to develop premium quality web applications that elevate their business.",
              ].map((p, i) => (
                <motion.p key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08 }} className="text-white/55 leading-relaxed mb-4 text-sm">{p}</motion.p>
              ))}
            </div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }} className="relative">
              <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&q=80" alt="Laravel development" className="w-full h-80 object-cover" style={{ filter: "brightness(0.70) saturate(0.85)" }} />
                <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.08) 0%, transparent 60%)" }} />
              </div>
              <div className="absolute -bottom-6 -left-6 px-5 py-4 rounded-xl" style={{ background: "rgba(6,2,16,0.92)", border: "1px solid rgba(124,58,237,0.3)", backdropFilter: "blur(10px)" }}>
                <div className="text-2xl font-black text-primary">300+</div>
                <div className="text-white/50 text-xs font-semibold uppercase tracking-wider mt-0.5">Laravel Projects Delivered</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25) 50%, transparent)" }} />

      {/* Why Laravel */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>
                <Star className="w-3 h-3" /> Why Laravel?
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="text-3xl md:text-4xl font-bold text-white leading-tight mb-8">
                Why{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">Laravel Development?</span>
              </motion.h2>
              <div className="space-y-3">
                {whyLaravel.map((text, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-start gap-4 p-4 rounded-xl group hover:border-primary/30 transition-all duration-300" style={cardStyle}>
                    <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: GOLD }} />
                    <span className="text-white/65 text-sm leading-snug group-hover:text-white transition-colors duration-300">{text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }} className="relative hidden lg:block">
              <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=80" alt="Why Laravel" className="w-full h-[420px] object-cover" style={{ filter: "brightness(0.65) saturate(0.8)" }} />
                <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(225deg, rgba(124,58,237,0.09) 0%, transparent 60%)" }} />
              </div>
              <div className="absolute -bottom-6 -right-6 px-5 py-4 rounded-xl" style={{ background: "rgba(6,2,16,0.92)", border: "1px solid rgba(124,58,237,0.25)", backdropFilter: "blur(10px)" }}>
                <div className="text-2xl font-black text-primary">10+</div>
                <div className="text-white/50 text-xs font-semibold uppercase tracking-wider mt-0.5">Years of Laravel Expertise</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25) 50%, transparent)" }} />

      {/* From Ideas to Live */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(124,58,237,0.05) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }} className="relative">
              <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80" alt="From ideas to live" className="w-full h-96 object-cover" style={{ filter: "brightness(0.65) saturate(0.85)" }} />
                <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(225deg, rgba(124,58,237,0.1) 0%, transparent 60%)" }} />
              </div>
              <div className="absolute -right-6 top-8 px-5 py-4 rounded-xl space-y-1" style={{ background: "rgba(6,2,16,0.92)", border: "1px solid rgba(124,58,237,0.25)", backdropFilter: "blur(10px)" }}>
                {["Discovery", "Design", "Build", "Launch"].map((step, i) => (
                  <div key={step} className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg cursor-default transition-all duration-200 group/step hover:-translate-y-0.5 hover:bg-white/5">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0 transition-all duration-200 group-hover/step:shadow-[0_0_10px_rgba(124,58,237,0.6)] group-hover/step:scale-110" style={{ background: "#7C3AED", color: "#ffffff" }}>{i + 1}</div>
                    <span className="text-white/70 text-xs font-semibold transition-colors duration-200 group-hover/step:text-white">{step}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>
                <Zap className="w-3 h-3" /> Bringing Your Ideas to Life
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
                From Ideas to a{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">Live Laravel App</span>
              </motion.h2>
              {[
                "We can take your ideas and turn it into a fully functional project. Our team has experience of helping businesses across various industries to develop applications right from the ideation phase.",
                "From discovery and architecture through to launch, our Laravel team works as a transparent extension of your business — delivering measurable results on time and on budget.",
              ].map((p, i) => (
                <motion.p key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12 + i * 0.08 }} className="text-white/55 leading-relaxed mb-5 text-sm">{p}</motion.p>
              ))}
              <motion.a href="/contact-us" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.28 }} className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(124,58,237,0.35)]" style={{ background: "#7C3AED", color: "#ffffff" }}>
                Start Your Project <ArrowRight className="w-4 h-4" />
              </motion.a>
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
              <Code2 className="w-3 h-3" /> What We Offer
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
              Our Services &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">Offerings</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.14 }} className="text-white/40 text-sm max-w-2xl leading-relaxed">
              With HireProgrammer, you can get instant access to top Laravel developers of one of the top Laravel development agencies in the UK. Partnering with us allows you to hire Laravel developers for Laravel web application development for your business.
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

      {/* Why Choose Us */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124,58,237,0.05) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="text-center mb-14">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>
              <Shield className="w-3 h-3" /> Our Advantages
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Why Choose Us?
            </motion.h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-5 mb-12">
            <div className="space-y-3">
              {whyUsLeft.map((text, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="relative flex items-start gap-4 p-5 rounded-xl group overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30" style={{ background: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(180deg, transparent, ${GOLD}, transparent)` }} />
                  <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5 relative z-10" style={{ background: GOLD }} />
                  <span className="relative z-10 text-white/65 text-sm leading-snug group-hover:text-white transition-colors duration-300">{text}</span>
                </motion.div>
              ))}
            </div>
            <div className="space-y-3">
              {whyUsRight.map((text, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="relative flex items-start gap-4 p-5 rounded-xl group overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30" style={{ background: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5 relative z-10" style={{ background: GOLD }} />
                  <span className="relative z-10 text-white/65 text-sm leading-snug group-hover:text-white transition-colors duration-300">{text}</span>
                </motion.div>
              ))}
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
                Hire expert{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">Laravel Developers UK</span>
                <br />for your project
              </h2>
              <p className="text-white/45 text-xl mb-12 leading-relaxed">Reach out to us to book your free consultation and explore how we can support you.</p>
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
