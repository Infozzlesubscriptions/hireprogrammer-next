"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { useQuoteModal } from '@/context/QuoteModalContext';
import { HeroContactForm } from '@/components/sections/HeroContactForm';
import {
  ArrowRight, CheckCircle2, ChevronDown, Code2, Zap, Shield,
  Star, Globe, ShoppingCart, LayoutDashboard, Wrench, Puzzle, Server,
} from "lucide-react";

const GOLD = "#7C3AED";
const pillStyle = { background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.22)" };
const cardStyle = { background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" };

const services = [
  {
    icon: Globe,
    title: "Custom Web Development",
    body: "Our seasoned CodeIgniter developers successfully transform your business requirements and values into a highly performing and result-oriented dynamic CodeIgniter web application. From simple informational websites to complex web systems, our bespoke CodeIgniter solutions are built to scale with your business.",
    bullets: ["Bespoke web applications", "MVC architecture", "RESTful APIs", "Scalable solutions"],
  },
  {
    icon: ShoppingCart,
    title: "CodeIgniter Shopping Cart",
    body: "Make your e-commerce business and user experience more secure with CodeIgniter technology and build all e-commerce shopping applications. Our team builds high-performance, secure online stores with full payment gateway integration, inventory management, and an intuitive customer-facing experience.",
    bullets: ["E-commerce builds", "Payment gateways", "Inventory management", "Secure checkout"],
  },
  {
    icon: LayoutDashboard,
    title: "CodeIgniter Portal Development",
    body: "Take your online business to global level with the help of the top programmer CodeIgniter engineers that can develop web portals using the advance CodeIgniter coding. From membership portals and B2B platforms to HR systems and client dashboards, we build portals that power your operations.",
    bullets: ["Membership portals", "B2B platforms", "Admin dashboards", "Client portals"],
  },
  {
    icon: Code2,
    title: "CMS Development",
    body: "Our CodeIgniter Development Company is the UK that has supported multiple clients with CodeIgniter development service, we understand that each business have different requirements according to their goals and values. Hence our team of experts can help you create a customised and efficient CodeIgniter CMS that serves your needs within your expected time frame.",
    bullets: ["Custom CMS builds", "Content workflows", "Multi-user roles", "Media management"],
  },
  {
    icon: Wrench,
    title: "Maintenance and Support",
    body: "We give you team that is accessible for your CodeIgniter website running smoothly at all times. Whether it's a bug fix, a security update, a performance improvement, or a new feature addition, our team responds quickly and works transparently with monthly retainer or ad-hoc arrangements.",
    bullets: ["Monthly retainers", "Security patches", "Performance tuning", "Priority support"],
  },
  {
    icon: Puzzle,
    title: "Third-party API Integration",
    body: "Whether you need to integrate social media, Google maps, or payment gateways, HireProgrammer's team of CodeIgniter engineers can support you with complete integration support. We ensure seamless data exchange, reliable connections, and thorough testing for every integration we deliver.",
    bullets: ["Payment APIs", "Social integrations", "Maps & location", "CRM connections"],
  },
];

const whyCodeigniter = [
  { title: "Event Handling", body: "CodeIgniter framework helps you create error-free web applications with user-friendly interfaces that rely on a flexible framework that you can update the error functions." },
  { title: "Built-In Libraries", body: "It offers you a full range of libraries that cover all the web related activities such as in emailing, massaging, database management etc., making it possible to build fully functional websites quickly." },
  { title: "Fast and Lightweight", body: "CodeIgniter is a very light-weight framework that requires a very small set of minimum requirements and is extremely fast. Its minimal footprint means more server resources go directly to your application." },
  { title: "Security", body: "It has a built-in security tool that lets the users experience a very high level of security, including XSS filtering, CSRF protection, and encrypted session handling." },
];

const whyUsLeft = [
  "Expert team of CodeIgniter designers and developers",
  "Reporting/maintenance and quality assurance",
  "A Customised PHP development solutions",
  "Innovative, customer-centric, and result-orientated",
];

const whyUsRight = [
  "Dedicated CodeIgniter web development agency in the UK",
  "Excellent Customer Support",
  "Custom CodeIgniter web development and CMS solutions at competitive rates",
];

const faqs = [
  {
    q: "What is CodeIgniter and why is it good for web development?",
    a: "CodeIgniter is a lightweight, open-source PHP framework built on the MVC pattern. It's renowned for its speed, small footprint, and ease of use — making it ideal for building fast, secure, and scalable web applications without the overhead of heavier frameworks.",
  },
  {
    q: "How much does CodeIgniter website development cost in the UK?",
    a: "Costs vary depending on project complexity, design requirements, and timeline. We offer transparent fixed-price quotes and flexible monthly retainer arrangements. Contact us for a free, no-obligation estimate.",
  },
  {
    q: "What types of websites can be built with CodeIgniter?",
    a: "CodeIgniter is well-suited for custom web applications, e-commerce stores, CMS platforms, membership portals, REST APIs, admin dashboards, and enterprise-level business systems. Its flexibility makes it suitable for virtually any web project.",
  },
  {
    q: "Is CodeIgniter secure for handling sensitive business data?",
    a: "Yes. CodeIgniter has strong built-in security features including XSS filtering, CSRF protection, SQL injection prevention, and encrypted session management. Our team also applies additional security best practices on every project.",
  },
  {
    q: "Can you integrate third-party APIs into my CodeIgniter website?",
    a: "Absolutely. We have extensive experience integrating CodeIgniter applications with payment gateways, CRMs, social media platforms, mapping services, marketing tools, and many other third-party APIs.",
  },
  {
    q: "Do you provide ongoing maintenance for CodeIgniter websites?",
    a: "Yes. We offer flexible monthly maintenance packages covering security updates, framework upgrades, performance monitoring, bug fixes, content updates, and priority technical support.",
  },
  {
    q: "What makes CodeIgniter different from other PHP frameworks?",
    a: "CodeIgniter stands out for its minimal configuration, exceptional speed, small footprint, and gentle learning curve. Unlike heavier frameworks, it doesn't force a rigid project structure — giving developers the flexibility to build exactly what the project needs.",
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

export default function CodeigniterPage() {
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
          <img src="/codeigniter-hero-banner.png" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.45) saturate(1.1)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(8,3,22,0.85) 0%, rgba(8,3,22,0.55) 50%, rgba(8,3,22,0.80) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(124,58,237,0.07) 0%, transparent 65%)" }} />
        </motion.div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-14 items-center">
          <motion.div style={{ opacity: heroOp }}>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-6" style={pillStyle}>
              <Code2 className="w-3 h-3" /> CodeIgniter Development Services
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.65 }} className="text-4xl md:text-6xl font-black text-white leading-[1.08] tracking-tight mb-6">
              Expert{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">CodeIgniter Development</span>
              <br />Services
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-white/50 text-xl leading-relaxed mb-10 max-w-md">
              Build the right product from the very start — with UK's leading CodeIgniter development agency.
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
            <HeroContactForm pageName="CodeIgniter Development" extraField={{ label: "Requirement", type: "text", placeholder: "Describe your project..." }} />
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
                <Code2 className="w-3 h-3" /> CodeIgniter Website Development Services
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
                UK's Premier{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">CodeIgniter Agency</span>
              </motion.h2>
              {[
                "CodeIgniter framework helps you build effective open source web applications using open source PHP that creates web applications that contain huge amount of data, making the web applications and websites very secure. HireProgrammer is one of the highly regarded CodeIgniter web development agencies in the UK that offers complete CodeIgniter web development services in order to deliver top-notch web development services.",
                "Our expert CodeIgniter developers help businesses of all sizes build fast, secure, and scalable web applications. We work closely with you to understand your requirements and deliver solutions that precisely match your goals and vision.",
              ].map((p, i) => (
                <motion.p key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08 }} className="text-white/55 leading-relaxed mb-4 text-sm">{p}</motion.p>
              ))}
            </div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }} className="relative">
              <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                <img src="https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=900&q=80" alt="CodeIgniter development" className="w-full h-80 object-cover" style={{ filter: "brightness(0.70) saturate(0.85)" }} />
                <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.08) 0%, transparent 60%)" }} />
              </div>
              <div className="absolute -bottom-6 -left-6 px-5 py-4 rounded-xl" style={{ background: "rgba(6,2,16,0.92)", border: "1px solid rgba(124,58,237,0.3)", backdropFilter: "blur(10px)" }}>
                <div className="text-2xl font-black text-primary">200+</div>
                <div className="text-white/50 text-xs font-semibold uppercase tracking-wider mt-0.5">CodeIgniter Projects Delivered</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25) 50%, transparent)" }} />

      {/* Why CodeIgniter */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>
                <Star className="w-3 h-3" /> Why CodeIgniter?
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="text-3xl md:text-4xl font-bold text-white leading-tight mb-8">
                Why Choose{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">CodeIgniter Web Framework?</span>
              </motion.h2>
              <div className="space-y-4">
                {whyCodeigniter.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09 }} className="group flex gap-4 p-5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30" style={cardStyle}>
                    <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5 group-hover:shadow-[0_0_8px_rgba(124,58,237,0.8)] transition-all duration-300" style={{ background: GOLD }} />
                    <div>
                      <h4 className="text-white font-semibold text-sm mb-1.5 group-hover:text-primary transition-colors duration-300">{item.title}</h4>
                      <p className="text-white/50 text-sm leading-relaxed">{item.body}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }} className="relative hidden lg:block">
              <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                <img src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=900&q=80" alt="Why CodeIgniter" className="w-full h-[440px] object-cover" style={{ filter: "brightness(0.65) saturate(0.8)" }} />
                <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(225deg, rgba(124,58,237,0.09) 0%, transparent 60%)" }} />
              </div>
              <div className="absolute -bottom-6 -right-6 px-5 py-4 rounded-xl" style={{ background: "rgba(6,2,16,0.92)", border: "1px solid rgba(124,58,237,0.25)", backdropFilter: "blur(10px)" }}>
                <div className="text-2xl font-black text-primary">10+</div>
                <div className="text-white/50 text-xs font-semibold uppercase tracking-wider mt-0.5">Years of CI Expertise</div>
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
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0 group-hover/step:shadow-[0_0_10px_rgba(124,58,237,0.6)] group-hover/step:scale-110 transition-all duration-200" style={{ background: "#7C3AED", color: "#ffffff" }}>{i + 1}</div>
                    <span className="text-white/70 text-xs font-semibold group-hover/step:text-white transition-colors duration-200">{step}</span>
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">Live CodeIgniter App</span>
              </motion.h2>
              {[
                "We can take your ideas and turn it into a fully functional project. Our team has experience of helping businesses across various industries to develop applications right from the ideation phase.",
                "From discovery through to deployment, our CodeIgniter specialists manage every phase transparently, acting as a true extension of your team to deliver results on time and on budget.",
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
              From custom CodeIgniter web development to CMS development to Maintenance and Support, HireProgrammer — a leading CodeIgniter agency in the UK supports you with complete web development solution using this dynamic and secure framework.
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
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="text-3xl md:text-5xl font-bold text-white leading-tight">Why Choose Us?</motion.h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-5">
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
                Start your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">CodeIgniter Development Services</span>
                <br />today
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
