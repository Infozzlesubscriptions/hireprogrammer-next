"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { HeroContactForm } from '@/components/sections/HeroContactForm';
import {
  ArrowRight, CheckCircle2, ChevronDown, Smartphone, Layers,
  Cpu, TestTube2, Rocket, Megaphone, Wrench, Users, BarChart3,
} from "lucide-react";
const heroImg = "/mobile-app-hero.png";
import { useQuoteModal } from '@/context/QuoteModalContext';

const GOLD = "#7C3AED";
const pillStyle = { background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.22)" };
const cardStyle = { background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" };

const services = [
  {
    icon: Layers,
    title: "Concept Development",
    body: "We work closely with you to understand your vision and requirements for the app. Our team conducts thorough research to define the concept, ensuring that it aligns with your business goals and target audience.",
    bullets: ["Market research", "Feature scoping", "Wireframing", "Proof of concept"],
  },
  {
    icon: Users,
    title: "UI/UX Design",
    body: "Our experts create visually appealing and intuitive user interfaces that enhance the overall user experience. Our design experts combine delivering a seamless user experience that ensures your app stands out and engages end-users effectively.",
    bullets: ["User research", "Prototype design", "Accessibility", "Brand consistency"],
  },
  {
    icon: Smartphone,
    title: "Native and Cross-Platform Development",
    body: "Our team has expertise in both native and cross-platform mobile app development, using platform-specific tools. We always choose the most suitable approach based on your specific needs, budget, and business objectives.",
    bullets: ["iOS & Android", "React Native", "Flutter", "Platform optimisation"],
  },
  {
    icon: Rocket,
    title: "Agile Development",
    body: "We follow an agile development methodology that emphasises flexibility and transparency throughout the app development lifecycle. We break the project into sprints, providing you with regular updates and prompt feedback along the way.",
    bullets: ["Sprint planning", "Daily standups", "Iterative delivery", "Rapid feedback"],
  },
  {
    icon: Cpu,
    title: "Robust Backend Development",
    body: "We understand the importance of a strong backend infrastructure for seamless app performance. Our skilled developers build scalable, secure backend systems and REST/GraphQL APIs that ensure your app functions flawlessly at any scale.",
    bullets: ["Scalable APIs", "Cloud deployment", "Database design", "Real-time sync"],
  },
  {
    icon: TestTube2,
    title: "Quality Assurance and Testing",
    body: "To deliver flawless apps, we conduct rigorous testing across various devices and platforms. Our QA team performs functional testing, usability testing, performance testing, and security testing to ensure a polished, reliable experience.",
    bullets: ["Automated testing", "Device matrix", "Performance benchmarks", "Security audits"],
  },
  {
    icon: Wrench,
    title: "App Deployment and Support",
    body: "Our team is ready to assist you with the deployment process, ensuring it is available in the respective app stores. We also provide ongoing maintenance and support to keep your app current, implement updates, and address any issues as needed.",
    bullets: ["App Store submission", "Play Store listing", "Crash monitoring", "Ongoing support"],
  },
  {
    icon: Megaphone,
    title: "Post-launch Marketing Strategy",
    body: "Launching is just the beginning. Our team can help you develop a comprehensive marketing strategy to increase app visibility. We utilise push notifications, various channels such as social media, email marketing, digital advertising, and ASO.",
    bullets: ["ASO optimisation", "Push notifications", "User acquisition", "Analytics setup"],
  },
];

const whyUs = [
  { left: true,  text: "We specialise in creating innovative and high quality mobile apps" },
  { left: false, text: "Creative visually appealing and intuitive interfaces that meet your target audience's expectations" },
  { left: true,  text: "Proven track record of successful mobile app projects" },
  { left: false, text: "In-depth expertise across multiple mobile technologies and frameworks" },
  { left: true,  text: "Transparent timelines and competitive pricing models" },
  { left: false, text: "Client-centric approach — we align every feature with your business goals to ensure the long-term success of your app launch" },
];

const faqs = [
  { q: "How much does it cost to develop a mobile app?", a: "The cost of mobile app development varies greatly depending on complexity, features, platform, and design requirements. Simple apps typically start from £5,000 while complex enterprise solutions can range from £25,000 to £100,000+. We provide detailed, fixed-price quotes after a free discovery session." },
  { q: "How long does it take to build a mobile app?", a: "A typical mobile app takes 3–6 months from concept to launch. Simple MVP apps can be delivered in 6–8 weeks, while complex multi-feature applications may take 9–12 months. We provide clear milestone-based timelines during the planning phase." },
  { q: "Should I build a native or cross-platform app?", a: "It depends on your budget, timeline, and performance requirements. Native apps (Swift for iOS, Kotlin for Android) offer the best performance and platform-specific features. Cross-platform solutions like React Native or Flutter offer faster development and cost savings while delivering near-native performance." },
  { q: "Do I need an iOS and Android app?", a: "If your target audience uses both platforms, building for both maximises your reach. We can build cross-platform apps efficiently so you cover iOS and Android without doubling the cost and time." },
  { q: "How do I get my mobile app on the App Store and Google Play?", a: "We handle the entire submission process — from creating developer accounts, configuring app metadata, writing descriptions, preparing screenshots, and submitting for review. We also manage any revisions required by the stores." },
  { q: "What happens after the app is launched?", a: "We provide post-launch support packages covering bug fixes, OS compatibility updates, performance monitoring, new feature additions, and user feedback analysis. We treat your app as a living product, not a one-off delivery." },
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

export default function MobileAppPage() {
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
          <img src={heroImg} alt="Mobile App Development" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.35) saturate(1.1)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(8,3,22,0.90) 0%, rgba(8,3,22,0.50) 50%, rgba(8,3,22,0.85) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(124,58,237,0.07) 0%, transparent 65%)" }} />
        </motion.div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-14 items-center">
          <motion.div style={{ opacity: heroOp }}>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-6" style={pillStyle}>
              <Smartphone className="w-3 h-3" /> Mobile App Development
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.65 }} className="text-4xl md:text-6xl font-black text-white leading-[1.08] tracking-tight mb-6">
              Mobile App{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">Development UK</span>
              <br />Services
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-white/50 text-xl leading-relaxed mb-10 max-w-md">
              Build the right product from the very start — with the UK's leading mobile app development agency.
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
            <HeroContactForm pageName="Mobile App Development" extraField={{ label: "Requirement", type: "text", placeholder: "Describe your app idea..." }} />
          </motion.div>
        </div>
      </section>

      {/* ── Why Mobile ── */}
      <section className="py-28 relative overflow-hidden">
        {/* decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-[0.04]" style={{ background: GOLD, filter: "blur(120px)" }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          {/* top label */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center gap-3 mb-16">
            <div className="h-px flex-1 max-w-[60px]" style={{ background: `linear-gradient(90deg, transparent, ${GOLD})` }} />
            <span className="text-primary text-xs font-bold uppercase tracking-[0.18em]">Why Mobile App Development?</span>
            <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />
          </motion.div>

          {/* split layout */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* left — big heading + body */}
            <div>
              <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }} className="text-4xl md:text-5xl font-black text-white leading-[1.08] tracking-tight mb-6">
                Your customers live{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">on their phones.</span>
                <br />Meet them there.
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="text-white/50 text-lg leading-relaxed mb-10">
                Mobile app development refers to the process of creating software applications that run specifically on mobile devices such as smartphones and tablets — designing, building, and deploying for iOS and Android.
              </motion.p>
              {/* stat strip */}
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.22 }} className="flex gap-8">
                {[["6.8B", "smartphone users worldwide"], ["90%", "of mobile time spent in apps"], ["3×", "higher engagement vs mobile web"]].map(([n, l]) => (
                  <div key={n}>
                    <p className="text-3xl font-black text-primary leading-none mb-1">{n}</p>
                    <p className="text-white/35 text-xs leading-snug max-w-[90px]">{l}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* right — 4 benefit cards with left-gold-border style */}
            <div className="space-y-4">
              {[
                { icon: BarChart3, num: "01", label: "Increased customer engagement", text: "Mobile apps provide a direct, personalised channel for businesses to engage with their customers anytime, anywhere." },
                { icon: Smartphone,  num: "02", label: "Enhanced user experience", text: "Apps leverage device features — GPS, camera, accelerometer, biometrics — creating richer, faster experiences than any website can." },
                { icon: Users,       num: "03", label: "Access to a wider audience", text: "A well-designed app opens a global storefront available 24/7, dramatically expanding your addressable market." },
                { icon: Rocket,      num: "04", label: "Improved brand recognition", text: "Your icon lives on every user's home screen — a constant brand touchpoint that builds loyalty, recognition, and repeat engagement." },
              ].map(({ icon: Icon, num, label, text }, i) => (
                <motion.div key={num} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09, duration: 0.55 }}
                  className="group flex gap-5 p-5 rounded-2xl transition-all duration-300 hover:translate-x-1"
                  style={{ background: "rgba(255,255,255,0.025)", borderLeft: `2px solid ${GOLD}`, border: "1px solid rgba(255,255,255,0.07)", borderLeftWidth: "2px", borderLeftColor: GOLD }}>
                  <div className="flex-shrink-0 pt-0.5">
                    <span className="text-[10px] font-black text-primary/40 tracking-widest">{num}</span>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center mt-1" style={{ background: "rgba(124,58,237,0.10)" }}>
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm mb-1.5">{label}</p>
                    <p className="text-white/45 text-sm leading-relaxed">{text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Process Timeline ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(124,58,237,0.035) 50%, transparent 100%)" }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>From Ideas to Live</div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">How We <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C060FF] to-[#E040FF]">Bring It to Life</span></h2>
            <p className="text-white/40 max-w-xl mx-auto text-base leading-relaxed">A battle-tested process that turns your concept into a polished, store-ready app — fast.</p>
          </motion.div>

          {/* horizontal steps */}
          <div className="relative">
            {/* connecting line */}
            <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.35) 20%, rgba(124,58,237,0.35) 80%, transparent)" }} />

            <div className="grid lg:grid-cols-5 gap-6">
              {[
                { n: "01", title: "Discovery", desc: "We deep-dive into your goals, users, and market to map the full scope." },
                { n: "02", title: "Design",    desc: "Wire-frames evolve into pixel-perfect, brand-aligned UI screens." },
                { n: "03", title: "Build",     desc: "Agile sprints deliver working features you can review every two weeks." },
                { n: "04", title: "Test",      desc: "Rigorous QA across real devices before a single byte goes live." },
                { n: "05", title: "Launch",    desc: "App Store & Play Store submission, then ongoing growth support." },
              ].map(({ n, title, desc }, i) => (
                <motion.div key={n} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative flex flex-col items-center text-center pt-4">
                  {/* step bubble */}
                  <div className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center mb-5 font-black text-xl" style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.18), rgba(124,58,237,0.06))", border: `1px solid rgba(124,58,237,0.35)`, color: GOLD, boxShadow: "0 0 24px rgba(124,58,237,0.14)" }}>
                    {n}
                  </div>
                  <h4 className="text-white font-bold text-base mb-2">{title}</h4>
                  <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="py-8 pb-28 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-4" style={pillStyle}>
              Our Services &amp; Offerings
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="text-3xl md:text-4xl font-black text-white leading-tight">
              Everything you need,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C060FF] to-[#E040FF]">nothing you don't.</span>
            </motion.h2>
          </div>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-white/40 max-w-xs text-sm leading-relaxed">
            End-to-end mobile development from first sketch to post-launch growth.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {services.map(({ icon: Icon, title, body, bullets }, i) => (
            <motion.div key={title}
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.055 }}
              className="group relative p-7 rounded-2xl overflow-hidden transition-all duration-400 hover:-translate-y-1"
              style={{ background: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.07)" }}>
              {/* hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.06) 0%, transparent 60%)", border: "1px solid rgba(124,58,237,0.22)" }} />

              <div className="relative z-10">
                {/* header row */}
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "rgba(124,58,237,0.10)", border: "1px solid rgba(124,58,237,0.18)" }}>
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-4xl font-black leading-none" style={{ color: "rgba(124,58,237,0.12)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="text-white font-bold text-lg mb-3 leading-snug group-hover:text-primary/90 transition-colors duration-300">{title}</h3>
                <p className="text-white/45 text-sm leading-relaxed mb-5">{body}</p>

                {/* pill tags */}
                <div className="flex flex-wrap gap-2">
                  {bullets.map(b => (
                    <span key={b} className="text-[11px] font-semibold px-3 py-1 rounded-full" style={{ background: "rgba(124,58,237,0.08)", color: "rgba(124,58,237,0.75)", border: "1px solid rgba(124,58,237,0.15)" }}>{b}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-28 relative overflow-hidden">
        {/* big radial glow */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.05] pointer-events-none" style={{ background: GOLD, filter: "blur(100px)" }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
          {/* left — decorative badge */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-8" style={pillStyle}>Why Choose Us?</div>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.08] mb-6">
              The agency<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">that ships.</span>
            </h2>
            <p className="text-white/45 text-lg leading-relaxed mb-10 max-w-md">
              We don't just write code — we build products that work, grow, and last. Every decision we make is grounded in delivering real value to your users and your business.
            </p>

            {/* large decorative ring */}
            <div className="relative w-52 h-52">
              <div className="absolute inset-0 rounded-full" style={{ border: "1px solid rgba(124,58,237,0.18)" }} />
              <div className="absolute inset-4 rounded-full" style={{ border: "1px dashed rgba(124,58,237,0.12)" }} />
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-4xl font-black text-primary">500+</span>
                <span className="text-white/40 text-xs uppercase tracking-widest mt-1">Apps Delivered</span>
              </div>
              {/* orbit dots */}
              {[0, 72, 144, 216, 288].map((deg, i) => (
                <div key={i} className="absolute w-2.5 h-2.5 rounded-full" style={{ background: GOLD, opacity: 0.5 + i * 0.1, top: `calc(50% + ${Math.sin(deg * Math.PI / 180) * 96}px - 5px)`, left: `calc(50% + ${Math.cos(deg * Math.PI / 180) * 96}px - 5px)` }} />
              ))}
            </div>
          </motion.div>

          {/* right — stacked points */}
          <div className="space-y-4">
            {whyUs.map(({ text }, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="group flex items-start gap-4 p-5 rounded-2xl transition-all duration-300 hover:translate-x-1"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5" style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.25)" }}>
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
                <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors duration-300">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 max-w-4xl mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>FAQ</div>
          <h2 className="text-3xl md:text-4xl font-black text-white">Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C060FF] to-[#E040FF]">Questions</span></h2>
        </motion.div>
        <div className="space-y-3">
          {faqs.map((faq, i) => <FaqItem key={i} {...faq} index={i} />)}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6">
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden">
          {/* layered background */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0e0b05 0%, #080316 100%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 20% 50%, rgba(124,58,237,0.13) 0%, transparent 60%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 40% at 80% 50%, rgba(124,58,237,0.07) 0%, transparent 60%)" }} />
          <div className="absolute inset-0 rounded-3xl" style={{ border: "1px solid rgba(124,58,237,0.22)" }} />
          {/* scattered gold dots */}
          {[[12, 20], [88, 15], [25, 75], [75, 65], [50, 88], [92, 55]].map(([x, y], i) => (
            <div key={i} className="absolute w-1 h-1 rounded-full" style={{ left: `${x}%`, top: `${y}%`, background: GOLD, opacity: 0.3 + (i % 3) * 0.15 }} />
          ))}

          <div className="relative z-10 px-10 py-16 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-6" style={pillStyle}>Ready to build?</div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
              Your app idea deserves<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">a world-class team.</span>
            </h2>
            <p className="text-white/45 text-lg mb-10 max-w-lg mx-auto">Book a free consultation and we'll map out exactly how to bring your idea to life — no pressure, no commitment.</p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a href="/contact-us" className="inline-flex items-center gap-2.5 px-10 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(124,58,237,0.45)]" style={{ background: "#7C3AED", color: "#ffffff" }}>
                Book a Free Call <ArrowRight className="w-5 h-5" />
              </a>
              
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
