"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { useQuoteModal } from '@/context/QuoteModalContext';
import { HeroContactForm } from '@/components/sections/HeroContactForm';
import {
  ArrowRight, CheckCircle2, ChevronDown, ShoppingBag, Palette,
  Puzzle, Globe, Star, Shield, Users, Code2, Zap, Smartphone, Lock,
  TrendingUp, BarChart3, Wrench, MousePointer,
} from "lucide-react";

const GOLD = "#7C3AED";
const pillStyle = { background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.22)" };
const cardStyle = { background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" };

/* ── Data ── */
const services = [
  {
    icon: ShoppingBag,
    title: "Shopify Store Setup",
    body: "We understand setting up a new Shopify store can be overwhelming. Our team of experts will guide you through the process from store creation to domain setup, ensuring that your store is fully optimised and ready to start trading. We handle every detail so you can focus on your products and customers from day one.",
    bullets: ["Full store configuration", "Domain & DNS setup", "Payment & tax settings", "Collections & products"],
  },
  {
    icon: Palette,
    title: "Theme Customisation",
    body: "We create the store with the right Shopify theme that aligns perfectly with your brand identity. Our designers and developers will work closely with you to create a visually stunning and user-friendly store that engages your customers and drives conversions. Every theme is fully responsive and performance-optimised.",
    bullets: ["Custom theme builds", "Brand-aligned UI/UX", "Liquid template editing", "Speed optimised"],
  },
  {
    icon: Puzzle,
    title: "App Integration",
    body: "Enhance the functionality of your Shopify store by integrating powerful third-party apps. Whether you need a payment gateway, inventory management, or a marketing platform, we can efficiently integrate the right apps to streamline your operations. We select and configure apps that genuinely add value without bloating your store.",
    bullets: ["Payment gateways", "Inventory management", "CRM & email marketing", "Loyalty programmes"],
  },
  {
    icon: Smartphone,
    title: "Responsive Web Design",
    body: "Having a mobile-friendly store brings a positive definitive ecommerce experience to your customers. Our team has extensive knowledge and experience in maximising your reach to potential customers. With mobile commerce accounting for over 60% of ecommerce traffic, a flawless mobile experience is essential for maximising sales.",
    bullets: ["Mobile-first design", "Cross-device testing", "Touch-optimised UX", "Fast load times"],
  },
  {
    icon: TrendingUp,
    title: "SEO and Digital Marketing",
    body: "Drive organic traffic to your store and increase your online visibility with our expert SEO and digital marketing services. From keyword research to on-page optimisation and content strategy, our team employs proven strategies to improve search engine rankings and attract more qualified visitors to your Shopify store.",
    bullets: ["On-page SEO setup", "Schema markup", "Content strategy", "Analytics integration"],
  },
  {
    icon: MousePointer,
    title: "Conversion Rate Optimisation",
    body: "We make our customers use conversion rate optimisation (CRO) techniques. We ensure you listen to your audience, conduct A/B testing, and make data-driven changes to your store to maximise every sales opportunity, improve sales funnels, and increase your overall ROI. Helping you turn more visitors into loyal paying customers.",
    bullets: ["A/B testing", "Checkout optimisation", "Heatmap analysis", "UX improvements"],
  },
  {
    icon: Wrench,
    title: "Ongoing Support and Maintenance",
    body: "We provide reliable ongoing support to ensure your Shopify store runs smoothly at all times, from troubleshooting technical issues to updating content and generating content. We're here to support you whenever you need us, with flexible monthly retainers covering everything from security updates to feature enhancements.",
    bullets: ["Monthly retainers", "Security & app updates", "Content management", "Priority support"],
  },
];

const whyShopify = [
  {
    icon: Users,
    title: "User-Friendly Interface",
    body: "Shopify provides an intuitive and user-friendly interface, making it easy for individuals with minimal technical knowledge to set up and manage their online stores effortlessly. Its clean dashboard makes day-to-day store management simple, even for non-technical business owners.",
  },
  {
    icon: Smartphone,
    title: "Mobile Responsiveness",
    body: "Shopify themes are designed to be mobile responsive, ensuring that your online store looks and functions well on various devices, including smartphones and tablets. Mobile-first design is built into every Shopify theme, giving your customers a seamless shopping experience wherever they are.",
  },
  {
    icon: Lock,
    title: "Secure and Reliable",
    body: "Shopify takes care of security and technical aspects such as hosting, maintenance, and software updates. It provides SSL certificates, PCI-DSS compliance, and 99.99% uptime out of the box — meaning you can focus entirely on growing your business with peace of mind.",
  },
  {
    icon: Star,
    title: "Payment and Shipping Options",
    body: "Shopify supports a wide range of payment gateways, allowing you to accept payments from major credit cards, digital wallets, PayPal, Apple Pay, and more. Combined with its flexible shipping integrations, you can offer customers exactly the checkout experience they expect.",
  },
];

const whyUs = [
  { icon: Star,    text: "Our expertise and in-depth knowledge of the Shopify products" },
  { icon: Code2,   text: "Expert Shopify developer" },
  { icon: Palette, text: "We will recommend and seamlessly integrate the right Shopify apps for all devices" },
  { icon: Globe,   text: "Full knowledge of Shopify Liquid and Module Knowledge" },
  { icon: Zap,     text: "High quality services, competitive pricing, with specialised expertise" },
  { icon: Shield,  text: "Required Shopify development firm" },
];

const faqs = [
  {
    q: "How much does it cost to hire a Shopify developer in the UK?",
    a: "Costs vary depending on the scope and complexity of your project. We offer transparent, competitive pricing with flexible options — from fixed-price project quotes to monthly retainer arrangements. Contact us for a free, no-obligation estimate tailored to your specific requirements.",
  },
  {
    q: "Do I need technical knowledge to use Shopify?",
    a: "No. Shopify is specifically designed for business owners without technical backgrounds. Our team handles all the technical setup, configuration, and customisation so you can focus on running your business. We also provide training so you can manage your store confidently day-to-day.",
  },
  {
    q: "How long does it take to set up a Shopify store?",
    a: "A standard Shopify store can typically be launched within 2–6 weeks, depending on the complexity of the design, number of products, and integrations required. We agree clear milestones with you upfront and keep you informed throughout the build.",
  },
  {
    q: "Can you customise my Shopify theme?",
    a: "Absolutely. Our Shopify developers and designers have deep expertise in Liquid, Shopify's templating language, and can customise any theme to match your brand exactly. We also build fully bespoke custom themes from scratch when an off-the-shelf solution won't meet your needs.",
  },
  {
    q: "Will my store work on mobile phones?",
    a: "Yes. All our Shopify stores are built with a mobile-first approach, thoroughly tested across a wide range of devices and screen sizes. With over 60% of ecommerce traffic now coming from mobile, we ensure your store delivers a flawless experience on every device.",
  },
  {
    q: "What happens if my Shopify store isn't launched yet?",
    a: "No problem. We work with businesses at every stage — from brand new startups to established retailers migrating from other platforms. Whether you're starting from scratch or need help taking an existing store to the next level, we have the expertise to help.",
  },
  {
    q: "Can you help me with SEO and getting customers to my store?",
    a: "Yes. Our team provides comprehensive Shopify SEO services including keyword research, on-page optimisation, technical SEO, schema markup, and content strategy. We also offer broader digital marketing support to drive qualified traffic and improve conversions.",
  },
];

/* ── FAQ accordion ── */
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

export default function ShopifyPage() {
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
            src="/shopify-hero-banner.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(0.45) saturate(1.1)" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(8,3,22,0.85) 0%, rgba(8,3,22,0.55) 50%, rgba(8,3,22,0.80) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(124,58,237,0.07) 0%, transparent 65%)" }} />
        </motion.div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-14 items-center">
          <motion.div style={{ opacity: heroOp }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-6"
              style={pillStyle}
            >
              <ShoppingBag className="w-3 h-3" /> Shopify Development Services
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.65 }}
              className="text-4xl md:text-6xl font-black text-white leading-[1.08] tracking-tight mb-6"
            >
              Hire our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">
                Shopify Developers UK
              </span>
              <br />today
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
              className="text-white/50 text-xl leading-relaxed mb-10 max-w-md"
            >
              Build the right product from the very start — with UK's leading Shopify development agency.
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

          {/* Contact card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.7 }}
            className="rounded-2xl p-8"
            style={{ background: "rgba(6,2,16,0.7)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}
          >
            <h3 className="text-white font-bold text-xl mb-1">Start Your Project</h3>
            <p className="text-white/40 text-sm mb-6">Free consultation, no commitment</p>
            <HeroContactForm pageName="Shopify Development" extraField={{ label: "Website URL", type: "url", placeholder: "https://yourstore.co.uk" }} textareaPlaceholder="Tell us about your Shopify project..." />
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
                <ShoppingBag className="w-3 h-3" /> Hire Expert Shopify Developers in the UK
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.08 }}
                className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6"
              >
                UK's Premier{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">
                  Shopify Agency
                </span>
              </motion.h2>
              {[
                "Want to Hire a Shopify developer in the UK? Let's turn your e-commerce dreams into a reality. Shopify website development is the process of creating and building an online store on the Shopify platform. Whether you're just starting out or need to elevate your brand, it is important to hire an expert Shopify developer who can help you put together a professional-looking storefront in a short time.",
                "A skilled Shopify developer can help you improve user experience, and when you hire a Shopify theme developer, you'll have a professional-looking store that will attract more customers and increase sales.",
                "At HireProgrammer, we connect you with the UK's best Shopify developers who have the experience and expertise to build stores that convert visitors into loyal customers — from first brief through to launch and growth.",
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
                  alt="Shopify development"
                  className="w-full h-80 object-cover"
                  style={{ filter: "brightness(0.70) saturate(0.85)" }}
                />
                <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.08) 0%, transparent 60%)" }} />
              </div>
              <div
                className="absolute -bottom-6 -left-6 px-5 py-4 rounded-xl"
                style={{ background: "rgba(6,2,16,0.92)", border: "1px solid rgba(124,58,237,0.3)", backdropFilter: "blur(10px)" }}
              >
                <div className="text-2xl font-black text-primary">250+</div>
                <div className="text-white/50 text-xs font-semibold uppercase tracking-wider mt-0.5">Shopify Stores Launched</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25) 50%, transparent)" }} />

      {/* ── Why Shopify ── */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: cards */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5"
                style={pillStyle}
              >
                <Star className="w-3 h-3" /> Why Shopify?
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.08 }}
                className="text-3xl md:text-4xl font-bold text-white leading-tight mb-8"
              >
                Why{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">
                  Shopify Website Development?
                </span>
              </motion.h2>
              <div className="space-y-4">
                {whyShopify.map((item, i) => {
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
            </div>

            {/* Right: image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="relative hidden lg:block"
            >
              <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                <img
                  src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=900&q=80"
                  alt="Why Shopify"
                  className="w-full h-[480px] object-cover"
                  style={{ filter: "brightness(0.65) saturate(0.8)" }}
                />
                <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(225deg, rgba(124,58,237,0.09) 0%, transparent 60%)" }} />
              </div>
              <div
                className="absolute -bottom-6 -right-6 px-5 py-4 rounded-xl"
                style={{ background: "rgba(6,2,16,0.92)", border: "1px solid rgba(124,58,237,0.25)", backdropFilter: "blur(10px)" }}
              >
                <div className="text-2xl font-black text-primary">10+</div>
                <div className="text-white/50 text-xs font-semibold uppercase tracking-wider mt-0.5">Years of Shopify Expertise</div>
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
                  Live Shopify Store
                </span>
              </motion.h2>
              {[
                "We can take your ideas and turn them into a fully functional project. Our team has the experience of helping businesses across various industries to develop applications right from the ideation phase.",
                "From the initial discovery session through to launch day and ongoing growth support, our Shopify experts manage every stage with full transparency — acting as a true extension of your team to ensure the best possible outcome.",
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
                <ShoppingBag className="w-3 h-3" /> What We Offer
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
              End-to-end Shopify solutions for ambitious UK businesses.
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
                Partnering with HireProgrammer gives you instant access to elite Shopify specialists who precisely match your business requirements with full accountability and transparency.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-3 gap-4"
              >
                {[
                  { val: "250+", label: "Stores Built" },
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
                Hire our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">
                  Shopify Developers UK
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
