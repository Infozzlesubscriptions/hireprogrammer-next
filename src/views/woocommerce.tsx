"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { useQuoteModal } from '@/context/QuoteModalContext';
import { HeroContactForm } from '@/components/sections/HeroContactForm';
import {
  ArrowRight, CheckCircle2, ChevronDown, ShoppingCart, Palette,
  CreditCard, Puzzle, Zap, Wrench, Globe, Star, Shield, Users, Code2, BarChart3,
} from "lucide-react";

const GOLD = "#7C3AED";
const pillStyle = { background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.22)" };
const cardStyle = { background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" };

/* ── Data ── */
const services = [
  {
    icon: ShoppingCart,
    title: "WooCommerce Store Setup",
    body: "Our team can set up and launch your WooCommerce store quickly and efficiently. We handle everything from product catalogue configuration to tax and shipping settings, ensuring your store is live and ready to trade from day one. Our dedicated team will configure store identity, payment methods, and make sure everything aligns with your brand.",
    bullets: ["Complete store configuration", "Product catalogue setup", "Tax & shipping rules", "Brand identity integration"],
  },
  {
    icon: Palette,
    title: "Theme and Integration",
    body: "We understand the importance of a visually appealing and responsive ecommerce website. Our WooCommerce theme designers will create a custom theme that resonates with your brand, delivers an exceptional user experience, and converts visitors into customers. Every theme is fully responsive across all devices.",
    bullets: ["Custom theme development", "100% responsive design", "Brand-aligned UI/UX", "Cross-browser compatibility"],
  },
  {
    icon: CreditCard,
    title: "Payment Gateway Integration",
    body: "For most ecommerce websites, integrating a payment system is a critical component. We have extensive experience in integrating popular payment gateways such as Stripe, PayPal, and other UK-preferred solutions. We ensure secure, PCI-compliant checkout flows that build trust and maximise conversion rates.",
    bullets: ["Stripe & PayPal integration", "UK payment gateways", "PCI-DSS compliant flows", "Multi-currency support"],
  },
  {
    icon: Puzzle,
    title: "Plugin Development and Integration",
    body: "Extend the functionality of your WooCommerce store with custom plugins tailored to your specific business needs. Our developers build bespoke plugins and integrate third-party tools that enhance your store's capabilities — from advanced inventory management to loyalty programmes and personalisation engines.",
    bullets: ["Custom plugin creation", "Third-party integrations", "Inventory management", "Loyalty & rewards systems"],
  },
  {
    icon: BarChart3,
    title: "Performance Optimisation",
    body: "Slow loading websites can significantly impact user experience and conversion rates. Our WooCommerce performance specialists will audit your store and implement targeted optimisations — from image compression and caching strategies to database tuning — ensuring fast load times and smooth transaction flows across all devices.",
    bullets: ["Speed audits & fixes", "Image & asset optimisation", "Caching implementation", "Database performance tuning"],
  },
  {
    icon: Wrench,
    title: "Ongoing Support and Maintenance",
    body: "If you are looking for reliable ongoing maintenance to keep your WooCommerce store running smoothly, our team provides flexible monthly support packages. We handle security updates, plugin upgrades, content changes, and priority technical support so you can focus on growing your business with peace of mind.",
    bullets: ["Monthly maintenance packages", "Security & plugin updates", "Priority technical support", "Performance monitoring"],
  },
];

const whyWoo = [
  { icon: Zap,         title: "Easy Setup and Integration",     body: "WooCommerce is designed to seamlessly integrate with WordPress, making it easy to set up a web store on any website. Simply install the plugin, follow the setup wizard, and your store is ready to go — even without technical expertise." },
  { icon: Palette,     title: "Flexibility and Customisation",   body: "WooCommerce accommodates a large enterprise, WooCommerce can scale effortlessly to handle thousands of products, high traffic, and complex operations. It's the platform of choice for ambitious retailers worldwide." },
  { icon: CreditCard,  title: "Wide Range of Payment Options",   body: "WooCommerce supports diverse payment gateways, including PayPal, Stripe, Square and many more. This wide range of payment options helps cater to customers wherever they are, reducing abandoned carts and boosting revenue." },
  { icon: Puzzle,      title: "Extensions and Add-ons",          body: "WooCommerce offers a vast library of extensions and add-ons, allowing you to add functionality to your store — from subscriptions and bookings to memberships and advanced shipping rules — without custom development." },
  { icon: Globe,       title: "SEO-Friendly",                    body: "WooCommerce is built with search engine optimisation in mind. Its clean code structure, customisable permalinks, and native WordPress SEO tools help your store rank higher in search results, driving organic traffic." },
];

const whyUs = [
  { icon: Star,    text: "Dedicated WooCommerce development & design specialists" },
  { icon: Shield,  text: "Proven results with rigorous quality assurance on every project" },
  { icon: Globe,   text: "Partnering with top developers across the UK and beyond" },
  { icon: Zap,     text: "Fast delivery with transparent project management and reporting" },
  { icon: Users,   text: "Cross-industry experience: retail, health, finance, education" },
  { icon: Code2,   text: "Full-stack capability from concept through to deployment" },
];

const faqs = [
  {
    q: "Why should I hire WooCommerce developers in the UK?",
    a: "UK-based WooCommerce developers offer local market knowledge, timezone alignment, and an understanding of UK ecommerce regulations including VAT, GDPR, and consumer protection laws — ensuring your store is built to trade confidently.",
  },
  {
    q: "What services does a WooCommerce developer company provide?",
    a: "A professional WooCommerce agency provides end-to-end services including store setup, custom theme design, payment gateway integration, plugin development, performance optimisation, migration, and ongoing maintenance.",
  },
  {
    q: "Do you offer custom WooCommerce plugin development?",
    a: "Yes. Our developers specialise in building bespoke WooCommerce plugins and extensions tailored to your business requirements — from custom checkout flows to advanced inventory and loyalty systems.",
  },
  {
    q: "How long does it take to build a WooCommerce store?",
    a: "A standard WooCommerce store typically takes 3–8 weeks depending on scope, catalogue size, and custom requirements. We provide clear timelines at the outset and keep you updated throughout the project.",
  },
  {
    q: "Do you provide ongoing WooCommerce support and maintenance?",
    a: "Yes. We offer flexible monthly support packages covering security updates, WooCommerce and plugin upgrades, performance monitoring, content changes, and priority technical support.",
  },
  {
    q: "Can you migrate my existing store to WooCommerce?",
    a: "Absolutely. We handle full migrations from Shopify, Magento, BigCommerce, and other platforms to WooCommerce — including products, orders, customer data, and SEO URL structure — with minimal disruption to your business.",
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

export default function WooCommercePage() {
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
            src="/woo-hero-banner.png"
            alt=""
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
              <ShoppingCart className="w-3 h-3" /> WooCommerce Development Services
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.65 }}
              className="text-4xl md:text-6xl font-black text-white leading-[1.08] tracking-tight mb-6"
            >
              Expert{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">
                WooCommerce Development
              </span>
              <br />Services
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
              className="text-white/50 text-xl leading-relaxed mb-10 max-w-md"
            >
              Build the right product from the very start — with UK's leading WooCommerce development agency.
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
            <HeroContactForm pageName="WooCommerce Development" extraField={{ label: "Website URL", type: "url", placeholder: "https://yourstore.co.uk" }} textareaPlaceholder="Tell us about your WooCommerce project..." />
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
                <ShoppingCart className="w-3 h-3" /> Hire Expert WooCommerce Developers in the UK
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.08 }}
                className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6"
              >
                UK's Premier{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">
                  WooCommerce Agency
                </span>
              </motion.h2>
              {[
                "WooCommerce development is creating and customising online stores with this WordPress plugin to turn your WordPress into a fully-functional eCommerce platform. It allows you to sell physical and digital products online. Our team at HireProgrammer is a leading WooCommerce development agency based in the UK.",
                "A WooCommerce developer in the UK can help you with all aspects of your online store — from the initial setup and theme design through to payment gateway integration, custom plugin development, and ongoing maintenance.",
                "Whether you need a brand new WooCommerce store built from scratch or want to migrate your existing ecommerce site to WooCommerce, our expert team has the skills and experience to deliver outstanding results on time and on budget.",
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
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80"
                  alt="WooCommerce development"
                  className="w-full h-80 object-cover"
                  style={{ filter: "brightness(0.75) saturate(0.85)" }}
                />
                <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.08) 0%, transparent 60%)" }} />
              </div>
              <div
                className="absolute -bottom-6 -left-6 px-5 py-4 rounded-xl"
                style={{ background: "rgba(6,2,16,0.92)", border: "1px solid rgba(124,58,237,0.3)", backdropFilter: "blur(10px)" }}
              >
                <div className="text-2xl font-black text-primary">150+</div>
                <div className="text-white/50 text-xs font-semibold uppercase tracking-wider mt-0.5">WooCommerce Stores Launched</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25) 50%, transparent)" }} />

      {/* ── Why WooCommerce ── */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5"
              style={pillStyle}
            >
              <Star className="w-3 h-3" /> Why WooCommerce?
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-3xl md:text-5xl font-bold text-white leading-tight"
            >
              Why{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">
                WooCommerce?
              </span>
            </motion.h2>
          </div>

          <div className="flex flex-wrap justify-center gap-5">
            {whyWoo.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group p-6 rounded-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5 w-full lg:w-[calc(50%-10px)] xl:w-[calc(33.333%-14px)]"
                  style={cardStyle}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 group-hover:shadow-[0_0_14px_rgba(124,58,237,0.3)] transition-all duration-300"
                    style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.22)" }}
                  >
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <h4 className="text-white font-semibold mb-2 group-hover:text-primary transition-colors duration-300">{item.title}</h4>
                  <p className="text-white/50 text-sm leading-relaxed">{item.body}</p>
                </motion.div>
              );
            })}
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
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&q=80"
                  alt="From ideas to live"
                  className="w-full h-96 object-cover"
                  style={{ filter: "brightness(0.7) saturate(0.85)" }}
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
                We Turn Your Vision Into a{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">
                  Thriving Store
                </span>
              </motion.h2>
              {[
                "We can take your ideas and turn them into a fully functional WooCommerce store. Our team of professional WooCommerce developers in the UK have experience helping businesses across all industries build stores that convert visitors into loyal customers.",
                "From the initial discovery session through to launch and beyond, we act as a true extension of your team — managing timelines, communicating proactively, and ensuring your WooCommerce store is built to the highest standard, on time and on budget.",
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
                Start Your Store <ArrowRight className="w-4 h-4" />
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
                <ShoppingCart className="w-3 h-3" /> What We Offer
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
              End-to-end WooCommerce solutions for ambitious UK businesses.
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
                Partnering with HireProgrammer gives you instant access to elite WooCommerce specialists who precisely match your business requirements with accountability and transparency.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-3 gap-4"
              >
                {[
                  { val: "150+", label: "Stores Built" },
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
                  WooCommerce Development Services
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
