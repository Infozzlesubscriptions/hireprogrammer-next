"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { useQuoteModal } from '@/context/QuoteModalContext';
import { HeroContactForm } from '@/components/sections/HeroContactForm';
import {
  ArrowRight, CheckCircle2, ChevronDown, FileText, Palette,
  ArrowUpDown, Puzzle, MessageSquare, Globe, Star, Shield, Users, Code2, Zap, Lock,
} from "lucide-react";

const GOLD = "#7C3AED";
const pillStyle = { background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.22)" };
const cardStyle = { background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" };

/* ── Data ── */
const services = [
  {
    icon: Globe,
    title: "Customised Drupal Website",
    body: "At HireProgrammer we have the expert Drupal developers for you to use a top Drupal development agency in the UK. Working with us enables you to access skilled web developers who need web application development for your business. Our dedicated Drupal developers from us who will transform business requirements and visions into a high-performing and customised dedicated Drupal page for your web application.",
    bullets: ["Custom theme development", "Brand-aligned design", "Responsive across devices", "Accessibility compliant"],
  },
  {
    icon: Code2,
    title: "Drupal Web Development",
    body: "We are considered as one of the best Drupal development companies in the UK for our deep dedication to Drupal website development. Our expert Drupal developers will design custom modules and functionality whenever it will enhance the client's business requirement. We offer comprehensive Drupal web development using Drupal's robust and flexible content management system. Our team of experienced developers can create custom Drupal solutions tailored to your business needs.",
    bullets: ["Custom module creation", "API integrations", "Performance optimisation", "Multi-site management"],
  },
  {
    icon: ArrowUpDown,
    title: "Migration and Upgrades",
    body: "If you're currently using an older version of Drupal or a different CMS and need to migrate to Drupal 10, we can help make the transition smooth and hassle-free. Our team has extensive experience in Drupal migrations and upgrades ensuring that your data is securely transferred and your website functions seamlessly on the latest Drupal version.",
    bullets: ["Legacy Drupal upgrades", "CMS-to-Drupal migrations", "Data integrity assurance", "Zero-downtime deployments"],
  },
  {
    icon: Puzzle,
    title: "Custom Module Development",
    body: "Sometimes you may require additional functionality that is not available in existing Drupal modules. Our skilled developers can create custom modules specifically to meet your unique business requirements. Whether it's integrating third-party APIs, building advanced workflows, or enhancing Drupal's core functionality, we can develop custom modules that extend the capabilities of your Drupal website.",
    bullets: ["Bespoke module builds", "Third-party API integration", "Workflow automation", "Drupal hooks & events"],
  },
  {
    icon: MessageSquare,
    title: "Drupal Consulting",
    body: "If you need expert advice on optimising your Drupal website, our consulting services can provide you with the guidance you need. Our Drupal consultants have deep knowledge and experience working with Drupal and they can review your website, provide recommendations, and help you make informed decisions to achieve your business goals.",
    bullets: ["Architecture review", "Performance audits", "Security assessments", "Roadmap planning"],
  },
];

const whyDrupal = [
  {
    icon: FileText,
    title: "Content Management",
    body: "Drupal offers a robust content management system that allows website administrators to create, edit, organise, and publish content easily. Its flexible content architecture means it suits everything from simple blogs to complex enterprise platforms with thousands of content types.",
  },
  {
    icon: Palette,
    title: "Customisation and Theming",
    body: "Drupal allows developers to create fully customised websites by leveraging its extensive theming capabilities. With Twig templates, a rich theme system, and powerful layout builder, Drupal gives designers and developers full control over the visual presentation of every page.",
  },
  {
    icon: Globe,
    title: "Scalability and Performance",
    body: "Drupal is designed to handle websites of all sizes, from small personal blogs to large enterprise applications with millions of visitors. Its caching system, CDN support, and modular architecture ensure excellent performance under heavy load.",
  },
  {
    icon: Lock,
    title: "Security",
    body: "Drupal has a strong focus on security and often releases several built-in features to protect websites against vulnerabilities. Its dedicated security team actively monitors threats and releases timely patches, making it the CMS of choice for governments, banks, and enterprises worldwide.",
  },
];

const whyUs = [
  { icon: Star,    text: "Our team's expertise and experience in working with Drupal" },
  { icon: Palette, text: "Tailored website design, functionality, and features to match your business" },
  { icon: Users,   text: "Professionals who understand the platform well" },
  { icon: Code2,   text: "Drupal Type and Module Knowledge" },
  { icon: Zap,     text: "Unique and customised solutions using Drupal" },
  { icon: Globe,   text: "Our expertise in creating responsive and mobile-friendly Drupal websites" },
];

const faqs = [
  {
    q: "Why should I hire Drupal developers in the UK?",
    a: "UK-based Drupal developers bring local market understanding, timezone alignment, and knowledge of UK compliance requirements including GDPR and accessibility standards. They can collaborate in real time and respond quickly to your evolving needs.",
  },
  {
    q: "What services does a Drupal development company provide?",
    a: "A professional Drupal agency offers end-to-end services: custom website development, theme design, module creation, API integration, migration and upgrades, performance optimisation, security hardening, and ongoing maintenance.",
  },
  {
    q: "How much does it cost to hire Drupal developers in the UK?",
    a: "Costs vary depending on project complexity, the level of customisation required, and engagement model. We offer flexible arrangements — fixed-price projects, time and materials, or dedicated team retainers. Contact us for a free quote tailored to your requirements.",
  },
  {
    q: "Can you migrate my website to the latest version of Drupal?",
    a: "Yes. We handle full Drupal version migrations — including from Drupal 7 and 8 to Drupal 10 — as well as migrations from other CMS platforms. We ensure data integrity, URL structure preservation, and minimal business disruption throughout the process.",
  },
  {
    q: "Do you provide custom Drupal module development?",
    a: "Absolutely. Our developers build bespoke Drupal modules to extend your site's functionality beyond what off-the-shelf solutions provide — from custom workflows and third-party integrations to advanced data processing and automation.",
  },
  {
    q: "Is Drupal suitable for large enterprise websites?",
    a: "Yes. Drupal is purpose-built for scale and is the platform of choice for large government, financial, healthcare, and media organisations worldwide. Its robust security, multi-site management, and granular permissions make it ideal for complex enterprise requirements.",
  },
  {
    q: "Do you offer ongoing Drupal maintenance and support?",
    a: "Yes. We provide flexible monthly support packages covering security patches, Drupal core and module updates, performance monitoring, content changes, and priority technical support — giving you peace of mind and keeping your site running at peak performance.",
  },
];

/* ── FAQ accordion item ── */
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

export default function DrupalPage() {
  const { openQuoteModal } = useQuoteModal();
  const { scrollY } = useScroll();
  const heroY  = useTransform(scrollY, [0, 700], ["0%", "30%"]);
  const heroOp = useTransform(scrollY, [0, 490], [1, 0]);

  return (
    <main className="min-h-screen bg-[#080316] text-foreground overflow-x-hidden selection:bg-primary/30">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-24">
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <img
            src="/drupal-hero-banner.png"
            alt="Drupal SEO Services"
            title="Drupal SEO Services"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(0.45) saturate(1.1)" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(8,3,22,0.85) 0%, rgba(8,3,22,0.55) 50%, rgba(8,3,22,0.80) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(124,58,237,0.07) 0%, transparent 65%)" }} />
        </motion.div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <motion.div style={{ opacity: heroOp }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-6"
              style={pillStyle}
            >
              <Globe className="w-3 h-3" /> Drupal Development Services
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.65 }}
              className="text-4xl md:text-6xl font-black text-white leading-[1.08] tracking-tight mb-6"
            >
              Expert{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">
                Drupal Development
              </span>
              <br />Services UK
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
              className="text-white/50 text-xl leading-relaxed mb-10 max-w-md"
            >
              Build the right product from the very start — with UK's leading Drupal development agency.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <a href="/quote"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(124,58,237,0.45)]"
                style={{ background: "#7C3AED", color: "#ffffff" }}
              >
                Get a Free Quote <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right — contact card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.7 }}
            className="rounded-2xl p-8"
            style={{ background: "rgba(6,2,16,0.7)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}
          >
            <h3 className="text-white font-bold text-xl mb-1">Start Your Project</h3>
            <p className="text-white/40 text-sm mb-6">Free consultation, no commitment</p>
            <HeroContactForm pageName="Drupal Development" extraField={{ label: "Website URL", type: "url", placeholder: "https://yoursite.co.uk" }} textareaPlaceholder="Tell us about your Drupal project..." />
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4) 50%, transparent)" }} />

      {/* ── Intro ── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(124,58,237,0.04) 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5"
                style={pillStyle}
              >
                <Globe className="w-3 h-3" /> Drupal Website Development
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.08 }}
                className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6"
              >
                UK's Premier{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">
                  Drupal Agency
                </span>
              </motion.h2>
              {[
                "Drupal Website Development refers to the process of creating websites using the Drupal content management system (CMS). Drupal is a popular open-source CMS that provides a flexible framework for building and managing websites, ranging from personal blogs to large enterprise-level applications.",
                "Our team of expert Drupal developers in the UK specialise in building custom, scalable, and secure Drupal websites that deliver measurable results. Whether you need a brand new Drupal site built from the ground up or want to enhance an existing one, HireProgrammer has the expertise to help.",
                "From enterprise content platforms to complex multi-site networks, our dedicated Drupal developers bring deep platform knowledge, best-practice architecture, and a commitment to quality that ensures your project is delivered on time and on budget.",
              ].map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="text-white/55 leading-relaxed mb-4 text-sm"
                >
                  {p}
                </motion.p>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                <img
                  src="https://images.unsplash.com/photo-1547658719-da2b51169166?w=900&q=80"
                  alt="Drupal development"
                  className="w-full h-80 object-cover"
                  style={{ filter: "brightness(0.70) saturate(0.85)" }}
                />
                <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.08) 0%, transparent 60%)" }} />
              </div>
              <div
                className="absolute -bottom-6 -left-6 px-5 py-4 rounded-xl"
                style={{ background: "rgba(6,2,16,0.92)", border: "1px solid rgba(124,58,237,0.3)", backdropFilter: "blur(10px)" }}
              >
                <div className="text-2xl font-black text-primary">200+</div>
                <div className="text-white/50 text-xs font-semibold uppercase tracking-wider mt-0.5">Drupal Projects Delivered</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25) 50%, transparent)" }} />

      {/* ── Why Drupal ── */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: cards */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-2"
                style={pillStyle}
              >
                <Star className="w-3 h-3" /> Why Drupal?
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.08 }}
                className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6"
              >
                Why{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">
                  Drupal Web Development
                </span>{" "}
                Framework?
              </motion.h2>
              {whyDrupal.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.09 }}
                    className="group flex gap-4 p-5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30"
                    style={cardStyle}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:shadow-[0_0_12px_rgba(124,58,237,0.3)] transition-all duration-300"
                      style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.22)" }}
                    >
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

            {/* Right: image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="relative hidden lg:block"
            >
              <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                <img
                  src="https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=900&q=80"
                  alt="Why Drupal"
                  className="w-full h-[520px] object-cover"
                  style={{ filter: "brightness(0.65) saturate(0.8)" }}
                />
                <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(225deg, rgba(124,58,237,0.09) 0%, transparent 60%)" }} />
              </div>
              <div
                className="absolute -bottom-6 -right-6 px-5 py-4 rounded-xl"
                style={{ background: "rgba(6,2,16,0.92)", border: "1px solid rgba(124,58,237,0.25)", backdropFilter: "blur(10px)" }}
              >
                <div className="text-2xl font-black text-primary">10+</div>
                <div className="text-white/50 text-xs font-semibold uppercase tracking-wider mt-0.5">Years of Drupal Expertise</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25) 50%, transparent)" }} />

      {/* ── From Ideas to Live ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(124,58,237,0.05) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80"
                  alt="From ideas to live"
                  className="w-full h-96 object-cover"
                  style={{ filter: "brightness(0.65) saturate(0.85)" }}
                />
                <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(225deg, rgba(124,58,237,0.1) 0%, transparent 60%)" }} />
              </div>
              <div
                className="absolute -right-6 top-8 px-5 py-4 rounded-xl space-y-1"
                style={{ background: "rgba(6,2,16,0.92)", border: "1px solid rgba(124,58,237,0.25)", backdropFilter: "blur(10px)" }}
              >
                {["Discovery", "Design", "Build", "Launch"].map((step, i) => (
                  <div
                    key={step}
                    className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg cursor-default transition-all duration-200 group/step hover:-translate-y-0.5 hover:bg-white/5"
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0 transition-all duration-200 group-hover/step:shadow-[0_0_10px_rgba(124,58,237,0.6)] group-hover/step:scale-110"
                      style={{ background: "#7C3AED", color: "#ffffff" }}
                    >
                      {i + 1}
                    </div>
                    <span className="text-white/70 text-xs font-semibold transition-colors duration-200 group-hover/step:text-white">{step}</span>
                    <div className="ml-auto w-3 h-3 rounded-full border flex-shrink-0 flex items-center justify-center opacity-0 group-hover/step:opacity-100 transition-opacity duration-200" style={{ borderColor: `${GOLD}60` }}>
                      <div className="w-1 h-1 rounded-full" style={{ background: GOLD }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5"
                style={pillStyle}
              >
                <Zap className="w-3 h-3" /> Bringing Your Ideas to Life
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.08 }}
                className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6"
              >
                From Ideas to a{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">
                  Live Drupal Site
                </span>
              </motion.h2>
              {[
                "We can take your ideas and turn them into a fully functional Drupal project. Our team has the experience of helping businesses across various industries to develop applications right from the ideation phase.",
                "From discovery and architecture planning through to launch and ongoing support, we manage every stage with transparency and precision — acting as a true extension of your team throughout the entire project lifecycle.",
              ].map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: 0.12 + i * 0.08 }}
                  className="text-white/55 leading-relaxed mb-5 text-sm"
                >
                  {p}
                </motion.p>
              ))}
              <motion.a
                href="/quote"
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.28 }}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(124,58,237,0.35)]"
                style={{ background: "#7C3AED", color: "#ffffff" }}
              >
                Start Your Project <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25) 50%, transparent)" }} />

      {/* ── Services ── */}
      <section id="services" className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(124,58,237,0.04) 0%, transparent 65%)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5"
                style={pillStyle}
              >
                <Globe className="w-3 h-3" /> What We Offer
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.08 }}
                className="text-3xl md:text-5xl font-bold text-white leading-tight"
              >
                Our Services &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">
                  Offerings
                </span>
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.14 }}
              className="text-white/40 text-base max-w-xs lg:text-right leading-relaxed"
            >
              End-to-end Drupal solutions for ambitious UK businesses.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-5">
            {services.map((s, i) => {
              const Icon = s.icon;
              const num  = String(i + 1).padStart(2, "0");
              const isLast = i === services.length - 1 && services.length % 2 !== 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className={`group relative rounded-2xl p-8 overflow-hidden transition-all duration-300 hover:border-primary/40${isLast ? " lg:col-span-2 lg:max-w-[calc(50%-10px)] lg:mx-auto lg:w-full" : ""}`}
                  style={{ background: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <span
                    className="absolute top-4 right-6 text-7xl font-black select-none pointer-events-none leading-none"
                    style={{ color: "rgba(124,58,237,0.06)" }}
                  >
                    {num}
                  </span>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{ background: "radial-gradient(ellipse 60% 50% at 0% 0%, rgba(124,58,237,0.06) 0%, transparent 70%)" }}
                  />
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-5">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)" }}
                      >
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(124,58,237,0.3), transparent)" }} />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-3 group-hover:text-primary transition-colors duration-300">{s.title}</h3>
                    <p className="text-white/45 text-sm leading-relaxed mb-5">{s.body}</p>
                    <div className="flex flex-wrap gap-2">
                      {s.bullets.map((b, j) => (
                        <span
                          key={j}
                          className="px-3 py-1 rounded-full text-xs font-medium text-white/55"
                          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25) 50%, transparent)" }} />

      {/* ── Why Choose Us ── */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 100% 50%, rgba(124,58,237,0.05) 0%, transparent 65%)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-6"
                style={pillStyle}
              >
                <Shield className="w-3 h-3" /> Why Choose Us
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.08 }}
                className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6"
              >
                Why{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">
                  HireProgrammer?
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.14 }}
                className="text-white/45 text-base leading-relaxed mb-10"
              >
                Partnering with HireProgrammer gives you instant access to elite Drupal specialists who precisely match your business requirements with accountability and transparency.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-3 gap-4"
              >
                {[
                  { val: "200+", label: "Projects Built" },
                  { val: "98%",  label: "Satisfaction" },
                  { val: "10+",  label: "Years" },
                ].map(stat => (
                  <div
                    key={stat.label}
                    className="rounded-xl p-5 text-center"
                    style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.18)" }}
                  >
                    <div className="text-2xl font-black text-primary mb-1">{stat.val}</div>
                    <div className="text-white/40 text-xs font-semibold uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="space-y-3">
              {whyUs.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="relative flex items-center gap-5 p-5 rounded-xl group overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_4px_24px_rgba(124,58,237,0.07)]"
                    style={{ background: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(180deg, transparent, ${GOLD}, transparent)` }} />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: "linear-gradient(90deg, rgba(124,58,237,0.04) 0%, transparent 60%)" }} />
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 relative z-10 transition-all duration-300 group-hover:shadow-[0_0_14px_rgba(124,58,237,0.35)] group-hover:scale-110"
                      style={{ background: "rgba(124,58,237,0.09)", border: "1px solid rgba(124,58,237,0.2)" }}
                    >
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="relative z-10 text-white/65 text-sm leading-snug group-hover:text-white transition-colors duration-300">{item.text}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25) 50%, transparent)" }} />

      {/* ── FAQ ── */}
      <section className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
            <div className="lg:sticky lg:top-32">
              <motion.div
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-6"
                style={pillStyle}
              >
                <ChevronDown className="w-3 h-3" /> FAQs
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.08 }}
                className="text-3xl md:text-4xl font-bold text-white leading-tight mb-5"
              >
                Frequently Asked{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">
                  Questions
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.14 }}
                className="text-white/40 text-sm leading-relaxed mb-8"
              >
                Can't find what you're looking for? Reach out to our team directly.
              </motion.p>
              <motion.a
                href="/contact-us"
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105"
                style={{ background: "#7C3AED", color: "#ffffff" }}
              >
                Ask Us Anything <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>
            <div className="space-y-3">
              {faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} index={i} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="relative overflow-hidden">
        <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.5) 50%, transparent)" }} />
        <div className="relative" style={{ background: "linear-gradient(135deg, #080316 0%, #0D0819 50%, #080316 100%)" }}>
          <div className="absolute inset-0 pointer-events-none glow-pulse-bg" style={{ background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(124,58,237,0.1) 0%, transparent 70%)" }} />
          <div className="relative z-10 py-28 px-6 text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px w-16" style={{ background: `linear-gradient(90deg, transparent, ${GOLD})` }} />
                <div className="w-2 h-2 rounded-full" style={{ background: GOLD }} />
                <div className="h-px w-16" style={{ background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
                Launch your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">
                  Drupal Development Services UK
                </span>
                <br />today
              </h2>
              <p className="text-white/45 text-xl mb-12 leading-relaxed">
                Free consultation. No commitment. UK-based team ready to help.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a href="/quote"
                  className="inline-flex items-center gap-2.5 px-10 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(124,58,237,0.5)]"
                  style={{ background: "#7C3AED", color: "#ffffff" }}
                >
                  Get a Free Quote <ArrowRight className="w-5 h-5" />
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
