"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { useQuoteModal } from '@/context/QuoteModalContext';
import { HeroContactForm } from '@/components/sections/HeroContactForm';
import {
  ArrowRight, CheckCircle2, ChevronDown, Globe, Palette,
  ArrowUpDown, ShoppingCart, Wrench, Star, Shield, Users, Code2, Zap, Lock,
  Layout, Puzzle, BookOpen,
} from "lucide-react";

const GOLD = "#7C3AED";
const pillStyle = { background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.22)" };
const cardStyle = { background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" };

/* ── Data ── */
const services = [
  {
    icon: Globe,
    title: "Joomla Website Development",
    body: "We're a top web development company specialising in Joomla, a powerful and versatile content management system (CMS). Our team of experienced Joomla developers and designers can create custom websites that perfectly align with your unique business needs. Whether you need a Joomla developer to deliver a visionary idea or start a project, we have the experts in Joomla design and development to deliver exceptional solutions. Contact us now to hire a Joomla developer and start your project.",
    bullets: ["Custom Joomla builds", "Enterprise architecture", "Multi-language sites", "SEO-optimised structure"],
  },
  {
    icon: Puzzle,
    title: "Custom Joomla Extensions",
    body: "Extend the power of your Joomla website with our custom extension development service. Our Joomla experts can create custom modules, plugins, and templates that enhance the features and capabilities of your Joomla website. From bespoke booking systems and membership portals to advanced data feeds and custom forms, we build exactly what your business needs.",
    bullets: ["Custom components", "Plugins & modules", "Template extensions", "Third-party integrations"],
  },
  {
    icon: Palette,
    title: "Joomla Theme Customisation",
    body: "While we'll be the first to admit a professionally customised Joomla theme can make a real impact, our designers work closely with you to create custom Joomla themes that are not only visually appealing but also responsive, fast-loading, and perfectly aligned with your brand identity. Every theme we create is built to convert visitors into customers.",
    bullets: ["Custom theme creation", "Brand-aligned design", "Responsive & accessible", "Performance optimised"],
  },
  {
    icon: ArrowUpDown,
    title: "Joomla Migration and Upgrade",
    body: "If you're using an older version of Joomla or a different CMS, we can help you migrate your current site/store to Joomla seamlessly. We also keep you up to date with the latest Joomla upgrades. Our team has experience with data migration, preserving URL structures for SEO, and ensuring zero downtime throughout the transition.",
    bullets: ["CMS-to-Joomla migration", "Version upgrades", "SEO URL preservation", "Data integrity guaranteed"],
  },
  {
    icon: ShoppingCart,
    title: "Joomla eCommerce Solutions",
    body: "Set up a powerful online store with Joomla's robust e-commerce capabilities. Our developers can integrate e-commerce extensions, configure product catalogues, set up payment gateways, and establish inventory management systems to help you maximise sales and provide an exceptional shopping experience for your customers.",
    bullets: ["VirtueMart integration", "Payment gateway setup", "Inventory management", "Multi-currency support"],
  },
  {
    icon: Wrench,
    title: "Ongoing Maintenance and Support",
    body: "We offer ongoing maintenance and support services to keep your Joomla website running smoothly at all times, from troubleshooting technical issues to updating content and implementing new features. Our flexible monthly support packages cover security patches, Joomla core updates, extension upgrades, and priority technical assistance.",
    bullets: ["Monthly maintenance", "Security patches", "Core & extension updates", "Priority support"],
  },
];

const whyJoomla = [
  {
    icon: Layout,
    title: "Template Development",
    body: "Joomla allows you to choose from a vast library that are both tried and tested templates. You can create custom templates to match your unique design requirements, choosing from a great template library. Joomla's template system provides granular control over layout, typography, and responsiveness.",
  },
  {
    icon: Puzzle,
    title: "Component Development",
    body: "Joomla can be extended using components, which can be used as standalone apps. Components can handle complex data systems, an online store or a membership system. Joomla provides a powerful and flexible development framework that makes it easier to develop complex web applications.",
  },
  {
    icon: Code2,
    title: "Plugin and Extension Development",
    body: "Modules and plugins are software extensions that add specific functionality to your Joomla website, whether it's links to forms or analytics tracking. Plugins on the other hand, can integrate and add additional functionality to a website. There are thousands of modules and plugins available through Joomla's extension directory.",
  },
  {
    icon: Lock,
    title: "Security Considerations",
    body: "When developing Joomla websites it's crucial to pay attention to security. Keep your Joomla installation and extensions up to date with the latest security patches and updates. Use strong passwords, secure your website against common vulnerabilities, and use strong, secure passwords to protect your website.",
  },
  {
    icon: BookOpen,
    title: "Community and Resources",
    body: "When developing Joomla websites, you can find additional Community and resources you can use to help you learn and improve, contributing to this by sharing your knowledge and creating best practices, and plugins using Joomla's extension framework. The community provides forums, documentation, and ongoing development support.",
  },
];

const whyUsLeft = [
  "Expertise and in-depth knowledge of Joomla products",
  "We will recommend and seamlessly integrate the right Joomla Apps and extensions for all devices",
  "High quality services, competitive pricing with specialised Joomla expertise",
  "Excellent Track Record: Our portfolio showcases a successful history of delivering Joomla projects on time",
];

const whyUsRight = [
  "Expert Joomla developer team available for all devices",
  "Full knowledge of Joomla Template and Module Knowledge",
  "Excellent Customer Support: We believe in building long-term relationships with our clients",
  "Innovative Solutions: We believe in creating the perfect Joomla project on time and delivering quality",
];

const faqs = [
  {
    q: "What is Joomla?",
    a: "Joomla is a free, open-source content management system (CMS) built on PHP, used to build and manage websites and web applications. It powers millions of websites worldwide — from simple blogs to complex enterprise portals — and is known for its balance of flexibility and ease of use.",
  },
  {
    q: "Can I hire a Joomla developer in the UK?",
    a: "Yes. HireProgrammer connects you with experienced, UK-based Joomla developers who understand local market requirements, GDPR compliance, and accessibility standards. Our team is available during UK business hours for seamless collaboration.",
  },
  {
    q: "What is Joomla development for me?",
    a: "Joomla development covers everything from building a new Joomla website from scratch, to customising themes, developing bespoke extensions, migrating from another CMS, integrating e-commerce, and providing ongoing maintenance and support.",
  },
  {
    q: "How long does it take to develop a Joomla website?",
    a: "A standard Joomla website typically takes 3–8 weeks depending on scope, design complexity, and the number of custom extensions required. We agree clear milestones upfront and provide regular progress updates throughout the build.",
  },
  {
    q: "Can I self-manage my Joomla site?",
    a: "Yes. Joomla's back-end administration panel is designed for non-technical users. We provide training as part of every project handover so you can confidently manage your content, media, and site settings independently.",
  },
  {
    q: "Can you purchase and work with Joomla?",
    a: "Joomla is completely free and open-source. You can download and use it at no cost. Costs arise from hosting, premium templates, commercial extensions, and professional development services — all of which we can advise on and manage for you.",
  },
  {
    q: "Do you provide support after launch?",
    a: "Yes. We offer flexible ongoing support and maintenance packages post-launch covering security updates, Joomla core and extension upgrades, performance monitoring, content changes, and priority technical support.",
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

export default function JoomlaPage() {
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
            src="/joomla-hero-banner.png"
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
              <Globe className="w-3 h-3" /> Joomla Development Services
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.65 }}
              className="text-4xl md:text-6xl font-black text-white leading-[1.08] tracking-tight mb-6"
            >
              Expert{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">
                Joomla Development
              </span>
              <br />Services UK
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
              className="text-white/50 text-xl leading-relaxed mb-10 max-w-md"
            >
              Build the right product from the very start — with UK's leading Joomla development agency.
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
            <HeroContactForm pageName="Joomla Development" extraField={{ label: "Website URL", type: "url", placeholder: "https://yoursite.co.uk" }} textareaPlaceholder="Tell us about your Joomla project..." />
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
                <Globe className="w-3 h-3" /> Hire Joomla Developers in the UK
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.08 }}
                className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6"
              >
                UK's Premier{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">
                  Joomla Agency
                </span>
              </motion.h2>
              {[
                "Joomla is an open-source content management system (CMS) used to build websites and web applications. Written in PHP and using a MySQL database, Joomla is a flexible framework for building and managing websites, ranging from personal blogs to large enterprise-level applications. HireProgrammer provides expert solutions, our team is an expert in Joomla design and development in the UK, so your Joomla website developer is the ideal Joomla developer to be on board. It doesn't matter if you are an individual or a corporate web development team of Joomla website developers in the UK.",
                "When you hire a Joomla developer at HireProgrammer, you'll have access to a dedicated team of Joomla development with thorough knowledge of PHP, HTML, CSS and MySQL. It's a must for Joomla development and our experts have all of these.",
                "Whether you need a brand new Joomla site, a migration from another CMS, or expert ongoing support, our team delivers results you can rely on — on time and on budget.",
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
                  alt="Joomla development"
                  className="w-full h-80 object-cover"
                  style={{ filter: "brightness(0.70) saturate(0.85)" }}
                />
                <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.08) 0%, transparent 60%)" }} />
              </div>
              <div
                className="absolute -bottom-6 -left-6 px-5 py-4 rounded-xl"
                style={{ background: "rgba(6,2,16,0.92)", border: "1px solid rgba(124,58,237,0.3)", backdropFilter: "blur(10px)" }}
              >
                <div className="text-2xl font-black text-primary">120+</div>
                <div className="text-white/50 text-xs font-semibold uppercase tracking-wider mt-0.5">Joomla Projects Delivered</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25) 50%, transparent)" }} />

      {/* ── Why Joomla ── */}
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
                <Star className="w-3 h-3" /> Why Joomla?
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.08 }}
                className="text-3xl md:text-4xl font-bold text-white leading-tight mb-8"
              >
                Why{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">
                  Joomla Website Development?
                </span>
              </motion.h2>
              <div className="space-y-4">
                {whyJoomla.map((item, i) => {
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
                  src="https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=900&q=80"
                  alt="Why Joomla"
                  className="w-full h-[560px] object-cover"
                  style={{ filter: "brightness(0.65) saturate(0.8)" }}
                />
                <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(225deg, rgba(124,58,237,0.09) 0%, transparent 60%)" }} />
              </div>
              <div
                className="absolute -bottom-6 -right-6 px-5 py-4 rounded-xl"
                style={{ background: "rgba(6,2,16,0.92)", border: "1px solid rgba(124,58,237,0.25)", backdropFilter: "blur(10px)" }}
              >
                <div className="text-2xl font-black text-primary">10+</div>
                <div className="text-white/50 text-xs font-semibold uppercase tracking-wider mt-0.5">Years of Joomla Expertise</div>
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
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&q=80"
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
                  Live Joomla Site
                </span>
              </motion.h2>
              {[
                "We can take your ideas and turn them into a fully functional project. Our team has the experience of helping businesses across various industries to develop applications right from the ideation phase.",
                "From initial discovery and architecture planning through to launch day and beyond, our Joomla specialists act as a true extension of your team — delivering every phase transparently and on schedule.",
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
                href="/contact-us"
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
              End-to-end Joomla solutions for ambitious UK businesses.
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
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124,58,237,0.05) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5"
              style={pillStyle}
            >
              <Shield className="w-3 h-3" /> Our Advantages
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-3xl md:text-5xl font-bold text-white leading-tight"
            >
              Why Choose Us for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">
                Joomla Development?
              </span>
            </motion.h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-5 mb-12">
            {/* Left column */}
            <div className="space-y-3">
              {whyUsLeft.map((text, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="relative flex items-start gap-4 p-5 rounded-xl group overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30"
                  style={{ background: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(180deg, transparent, ${GOLD}, transparent)` }} />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: "linear-gradient(90deg, rgba(124,58,237,0.04) 0%, transparent 60%)" }} />
                  <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5 relative z-10" style={{ background: GOLD }} />
                  <span className="relative z-10 text-white/65 text-sm leading-snug group-hover:text-white transition-colors duration-300">{text}</span>
                </motion.div>
              ))}
            </div>
            {/* Right column */}
            <div className="space-y-3">
              {whyUsRight.map((text, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="relative flex items-start gap-4 p-5 rounded-xl group overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30"
                  style={{ background: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="absolute right-0 top-0 bottom-0 w-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(180deg, transparent, ${GOLD}, transparent)` }} />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: "linear-gradient(270deg, rgba(124,58,237,0.04) 0%, transparent 60%)" }} />
                  <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5 relative z-10" style={{ background: GOLD }} />
                  <span className="relative z-10 text-white/65 text-sm leading-snug group-hover:text-white transition-colors duration-300">{text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {[
              { val: "120+", label: "Projects Delivered" },
              { val: "98%",  label: "Satisfaction Rate" },
              { val: "10+",  label: "Years Experience" },
              { val: "24/7", label: "Support Available" },
            ].map(stat => (
              <div
                key={stat.label}
                className="px-8 py-5 rounded-xl text-center"
                style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.18)" }}
              >
                <div className="text-2xl font-black text-primary mb-1">{stat.val}</div>
                <div className="text-white/40 text-xs font-semibold uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
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
                  Joomla Development Services UK
                </span>
                <br />today
              </h2>
              <p className="text-white/45 text-xl mb-12 leading-relaxed">
                Reach out to us to book your free consultation and explore how we can support you.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="/contact-us"
                  className="inline-flex items-center gap-2.5 px-10 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(124,58,237,0.5)]"
                  style={{ background: "#7C3AED", color: "#ffffff" }}
                >
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
