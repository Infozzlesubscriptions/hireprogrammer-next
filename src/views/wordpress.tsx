"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { useQuoteModal } from '@/context/QuoteModalContext';
import { HeroContactForm } from '@/components/sections/HeroContactForm';
import {
  ArrowRight, CheckCircle2, ChevronDown, Settings, Smartphone,
  RefreshCw, Puzzle, CreditCard, Globe, Star, Zap, Shield, Users, Code2,
} from "lucide-react";

const GOLD = "#7C3AED";
const pillStyle = { background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.22)" };
const cardStyle = { background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" };

/* ── Data ── */
const services = [
  {
    icon: Settings,
    title: "WordPress Installation & Configuration",
    body: "Our team of expert WordPress developers can help you with a seamless WordPress installation and configuration. Our dedicated team of WordPress development services can help you do the following: complete WordPress configuration, Database configuration, Theme setup and configuration, and other WordPress configuration.",
    bullets: ["Complete WordPress configuration", "Database & server setup", "Theme installation & config", "Plugin configuration"],
  },
  {
    icon: Smartphone,
    title: "Responsive Theme Designing and Development",
    body: "If you are planning on starting a WordPress website from scratch, our team of experts can help you build a responsive website from scratch. As a leading WordPress design company, our theme designing work includes the following:",
    bullets: ["HTML/CSS designing from Figma", "100% responsive across all devices", "Custom WordPress themes", "Cross-browser compatibility"],
  },
  {
    icon: RefreshCw,
    title: "Migration and Support",
    body: "Our migration aim is to design an as-seamlessly as possible migration as any leading WordPress development agency. Our migration and support services include the following. We swiftly tackle any bugs, issues, or queries related to your WordPress and provide ongoing maintenance and support.",
    bullets: ["Swift bug & issue resolution", "Platform-to-platform migration", "Full data & content migration", "Ongoing maintenance support"],
  },
  {
    icon: Puzzle,
    title: "Plugin Development",
    body: "As the business requirements are, we often create plugins and extensions to our clients to extend the functionality of the website and add new features. Our WordPress developers have extensive experience in plugin development and can create custom plugins tailored to your specific needs.",
    bullets: ["Custom plugin creation", "Third-party plugin integration", "Plugin performance optimisation", "Security hardening"],
  },
  {
    icon: CreditCard,
    title: "Payment Solutions",
    body: "Our team of WordPress developers can manage the complete integration of your desired payment gateways and payment methods to your WordPress website, ensuring a hassle-free transactional experience and utmost security.",
    bullets: ["Stripe & PayPal integration", "WooCommerce checkout setup", "PCI-DSS compliant flows", "Multi-currency support"],
  },
];

const whyUs = [
  { icon: Star,    text: "Dedicated WordPress development & design agency" },
  { icon: Shield,  text: "Innovative results with proven quality assurance" },
  { icon: Globe,   text: "Partnering with top PHP developers across the UK" },
  { icon: Zap,     text: "Fast turnaround with transparent project management" },
  { icon: Users,   text: "Cross-industry experience: retail, health, finance, education" },
  { icon: Code2,   text: "Full-stack capability from concept to deployment" },
];

const faqs = [
  {
    q: "Why should I hire WordPress developers in the UK?",
    a: "UK-based WordPress developers bring local market knowledge, timezone alignment, and a clear understanding of UK business requirements and regulations — ensuring your project is delivered with precision and accountability.",
  },
  {
    q: "What services does a WordPress developer company provide?",
    a: "A professional WordPress agency provides end-to-end services including bespoke theme design, plugin development, WooCommerce setup, migration, speed optimisation, security hardening, and ongoing maintenance.",
  },
  {
    q: "How much does it cost to hire top WordPress developers?",
    a: "Costs vary based on project scope. HireProgrammer offers transparent, competitive rates with no hidden fees. Contact us for a free, no-obligation quote tailored to your requirements.",
  },
  {
    q: "How long does it take to build a WordPress website?",
    a: "A standard business website typically takes 2–6 weeks. Complex projects with custom plugins, ecommerce, or bespoke integrations may take longer. We provide clear timelines at the outset of every project.",
  },
  {
    q: "Do you offer ongoing WordPress maintenance and support?",
    a: "Yes. We offer flexible monthly maintenance packages covering security updates, performance monitoring, backups, content changes, and priority technical support.",
  },
  {
    q: "Can you integrate custom plugins and WordPress functionality?",
    a: "Absolutely. Our developers specialise in building bespoke plugins and custom post types, hooks, and API integrations to extend WordPress exactly as your business demands.",
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

export default function WordPressPage() {
  const { openQuoteModal } = useQuoteModal();
  const heroRef  = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroY  = useTransform(scrollY, [0, 700], ["0%", "30%"]);
  const heroOp   = useTransform(scrollY, [0, 490], [1, 0]);

  return (
    <main className="min-h-screen bg-[#080316] text-foreground overflow-x-hidden selection:bg-primary/30">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-24">
        {/* Video bg */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <img
            src="/wp-hero-banner.png"
            alt="WordPress SEO Services"
            title="WordPress SEO Services"
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
              <Globe className="w-3 h-3" /> WordPress Development Services
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.65 }}
              className="text-4xl md:text-6xl font-black text-white leading-[1.08] tracking-tight mb-6"
            >
              Expert{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">
                WordPress Development
              </span>
              <br />Services UK
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
              className="text-white/50 text-xl leading-relaxed mb-10 max-w-md"
            >
              Build the right product from the very start — with UK's leading WordPress development agency.
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
            <HeroContactForm pageName="WordPress Development" extraField={{ label: "Website URL", type: "url", placeholder: "https://yoursite.co.uk" }} textareaPlaceholder="Tell us about your WordPress project..." />
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4) 50%, transparent)" }} />

      {/* ── Intro section ── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(124,58,237,0.04) 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5"
                style={pillStyle}
              >
                <Globe className="w-3 h-3" /> WordPress Website Development Service
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.08 }}
                className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6"
              >
                UK's Premier{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">
                  WordPress Agency
                </span>
              </motion.h2>
              {[
                "Are you looking to contact a top WordPress development company? Our team at HireProgrammer is a leading WordPress development agency based in the UK. We work with businesses of all sizes — from growing startups to established enterprises — to design, build, and maintain powerful WordPress websites.",
                "Our WordPress design offers a wide range of services from conceptualisation & design, initial migration to deployment, and ongoing maintenance and support. Whether you want a WordPress site from scratch or want to migrate your existing site, we're the single programming team that can be relied upon to deliver exceptional results.",
                "Whether you want a professional blog, an in-depth ecommerce website, our in-house single programming team are experienced in all the necessary requirements of all business types. We use best practices and the very latest technology to deliver unmatched WordPress development services to UK clients and ambitious businesses worldwide.",
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

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                <img
                  src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=900&q=80"
                  alt="WordPress development"
                  className="w-full h-80 object-cover"
                  style={{ filter: "brightness(0.8) saturate(0.9)" }}
                />
                <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.08) 0%, transparent 60%)" }} />
              </div>
              {/* Stat badge */}
              <div
                className="absolute -bottom-6 -left-6 px-5 py-4 rounded-xl"
                style={{ background: "rgba(6,2,16,0.92)", border: "1px solid rgba(124,58,237,0.3)", backdropFilter: "blur(10px)" }}
              >
                <div className="text-2xl font-black text-primary">200+</div>
                <div className="text-white/50 text-xs font-semibold uppercase tracking-wider mt-0.5">WordPress Sites Delivered</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25) 50%, transparent)" }} />

      {/* ── Why WordPress ── */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5"
              style={pillStyle}
            >
              <Star className="w-3 h-3" /> Why WordPress?
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-3xl md:text-5xl font-bold text-white leading-tight"
            >
              Why{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">
                WordPress Development?
              </span>
            </motion.h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-5">
              {[
                { title: "Powers 43% of the Web", body: "Can you imagine a website you last visited isn't a WordPress site? WordPress is the most popular website builder in the world. A good chunk of it — that is, over a third of all top million websites built on WordPress — are hosted on a WordPress provider, all committed through its million downloads." },
                { title: "Unmatched Plugin Ecosystem", body: "When choosing to start your online business, WordPress offers an unbeatable selection of more than 50,000 free and premium plugins. These plugins help add WordPress with your brand guidelines and specific needs. Simply look for WordPress that is perfect for your needs and can help you make smart your site." },
                { title: "Flexibility Across Industries", body: "Explore a wide variety of WordPress plugin development services within the WordPress plugin directory or employ our experts to automate to enhance your websites with additional features such as contact forms, lead generation plugins, social widgets, media galleries and more." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-xl"
                  style={cardStyle}
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                      <p className="text-white/50 text-sm leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="space-y-5">
              {[
                { title: "SEO-Friendly Architecture", body: "WordPress responsiveness is one of the key factors for ranking your website on Google. WordPress offers a wide range of mobile and web-responsive built-in templates to make your site accessible and responsive, enabling visitors to use on any screen and multiple platforms." },
                { title: "Enterprise-Grade Security", body: "As an open source platform, the Progressive effect WordPress has achieved is primarily because of its wide community of contributors, growing ensuring its future of the framework, and its commitment to consistent security. There are currently making continuous improvements to the source code." },
                { title: "Scalable for Any Business", body: "WordPress multi-purpose platform, this Progressive effect WordPress has achieved is primarily its ability to continuously grow; meaning there is currently a wide selection of themes, plugins and extensions that can be installed which allow site owners to make necessary adjustments to the source code." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-xl"
                  style={cardStyle}
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                      <p className="text-white/50 text-sm leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
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
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80"
                  alt="From ideas to live"
                  className="w-full h-96 object-cover"
                  style={{ filter: "brightness(0.75) saturate(0.85)" }}
                />
                <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(225deg, rgba(124,58,237,0.1) 0%, transparent 60%)" }} />
              </div>
              {/* Process steps */}
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
                    <span className="text-white/70 text-xs font-semibold transition-colors duration-200 group-hover/step:text-white">
                      {step}
                    </span>
                    <div className="ml-auto w-3 h-3 rounded-full border flex-shrink-0 flex items-center justify-center opacity-0 group-hover/step:opacity-100 transition-opacity duration-200" style={{ borderColor: `${GOLD}60` }}>
                      <div className="w-1 h-1 rounded-full" style={{ background: GOLD }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Text */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5"
                style={pillStyle}
              >
                <Zap className="w-3 h-3" /> From Ideas to Live
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.08 }}
                className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6"
              >
                We Turn Your Vision Into a{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">
                  Live Product
                </span>
              </motion.h2>
              {[
                "We can take your ideas and turn them into a fully functional project. Our team of professional WordPress developers in the UK, supporting them with PHP developers of one of the most preferred PHP development services in the UK. We specialise in all the sectors and geographies, supporting them with PHP web application development services that perfectly match the business requirements.",
                "From the initial brief through to launch and beyond, we act as a true extension of your team — managing timelines, communicating proactively, and ensuring your WordPress website is built to the highest standard, on time and on budget.",
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
          {/* Heading row */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5"
                style={pillStyle}
              >
                <Settings className="w-3 h-3" /> What We Offer
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
              End-to-end WordPress solutions tailored to your business goals.
            </motion.p>
          </div>

          {/* 2-column numbered cards */}
          <div className="grid lg:grid-cols-2 gap-5">
            {services.map((s, i) => {
              const Icon = s.icon;
              const num  = String(i + 1).padStart(2, "0");
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className={`group relative rounded-2xl p-8 overflow-hidden transition-all duration-300 hover:border-primary/40${i === services.length - 1 && services.length % 2 !== 0 ? " lg:col-span-2 lg:max-w-[calc(50%-10px)] lg:mx-auto lg:w-full" : ""}`}
                  style={{ background: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  {/* Large ghost number */}
                  <span
                    className="absolute top-4 right-6 text-7xl font-black select-none pointer-events-none leading-none"
                    style={{ color: "rgba(124,58,237,0.06)", fontVariantNumeric: "tabular-nums" }}
                  >
                    {num}
                  </span>

                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{ background: "radial-gradient(ellipse 60% 50% at 0% 0%, rgba(124,58,237,0.06) 0%, transparent 70%)" }}
                  />

                  <div className="relative z-10">
                    {/* Icon row */}
                    <div className="flex items-center gap-4 mb-5">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)" }}
                      >
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div
                        className="h-px flex-1"
                        style={{ background: "linear-gradient(90deg, rgba(124,58,237,0.3), transparent)" }}
                      />
                    </div>

                    <h3 className="text-white font-bold text-lg mb-3 group-hover:text-primary transition-colors duration-300">
                      {s.title}
                    </h3>
                    <p className="text-white/45 text-sm leading-relaxed mb-5">{s.body}</p>

                    {/* Bullet pills */}
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

            {/* Left: heading + stats */}
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
                Partnering with HireProgrammer gives you instant access to the top PHP web developers — specialists who perfectly match your business requirements with precision and accountability.
              </motion.p>

              {/* Stat row */}
              <motion.div
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-3 gap-4"
              >
                {[
                  { val: "200+", label: "Projects" },
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

            {/* Right: feature list */}
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
                    {/* Left gold accent bar */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                      style={{ background: `linear-gradient(180deg, transparent, ${GOLD}, transparent)` }}
                    />
                    {/* Hover bg sweep */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                      style={{ background: "linear-gradient(90deg, rgba(124,58,237,0.04) 0%, transparent 60%)" }}
                    />
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

            {/* Left: sticky heading */}
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
                Can't find the answer you're looking for? Reach out to our team directly.
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

            {/* Right: accordion */}
            <div className="space-y-3">
              {faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} index={i} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="relative overflow-hidden">
        {/* Gold bar at top */}
        <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.5) 50%, transparent)" }} />

        <div className="relative" style={{ background: "linear-gradient(135deg, #080316 0%, #0D0819 50%, #080316 100%)" }}>
          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none glow-pulse-bg" style={{ background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(124,58,237,0.1) 0%, transparent 70%)" }} />

          <div className="relative z-10 py-28 px-6 text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Decorative line */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px w-16" style={{ background: `linear-gradient(90deg, transparent, ${GOLD})` }} />
                <div className="w-2 h-2 rounded-full" style={{ background: GOLD }} />
                <div className="h-px w-16" style={{ background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />
              </div>

              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
                Expert{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">
                  WordPress Development Services UK
                </span>
                <br />for your business
              </h2>
              <p className="text-white/45 text-xl mb-12 leading-relaxed">
                Free consultation. No commitment. UK-based team ready to help.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <a href="/quote"
                  className="inline-flex items-center gap-2.5 px-10 py-4.5 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(124,58,237,0.5)]"
                  style={{ background: "#7C3AED", color: "#ffffff" }}
                >
                  Get a Free Quote <ArrowRight className="w-5 h-5" />
                </a>
              </div>

              {/* Trust badges */}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
