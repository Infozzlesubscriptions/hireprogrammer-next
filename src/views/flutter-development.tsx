"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { HeroContactForm } from '@/components/sections/HeroContactForm';
import {
  ArrowRight, CheckCircle2, ChevronDown, Smartphone, Cpu,
  Zap, Puzzle, Wrench, Layers, BarChart3, TestTube2,
} from "lucide-react";
const heroImg = "/flutter-hero.png";
import { useQuoteModal } from '@/context/QuoteModalContext';

const GOLD = "#7C3AED";
const pillStyle = { background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.22)" };
const cardStyle = { background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" };

const whyFlutter = [
  { label: "Single codebase for all platforms", text: "Flutter runs on iOS, Android, web, and desktop from one codebase — dramatically reducing development cost and time compared to building separate native apps." },
  { label: "Pixel-perfect UI on every platform", text: "Flutter's own rendering engine (Skia/Impeller) draws every pixel itself, guaranteeing your UI looks identical on every device and OS version — no platform-specific quirks." },
  { label: "Hot reload for rapid iteration", text: "Flutter's stateful hot reload lets developers see changes instantly in the running app without losing state. This makes iteration and bug-fixing dramatically faster." },
  { label: "Near-native performance", text: "Flutter compiles directly to native ARM code, delivering near-native performance without the JavaScript bridge overhead found in other cross-platform frameworks." },
  { label: "Rich widget library", text: "Flutter provides a comprehensive set of customisable Material and Cupertino widgets out of the box, along with a thriving ecosystem of third-party packages for almost any functionality." },
];

const services = [
  {
    icon: Layers,
    title: "Flutter App Development",
    body: "Our skilled Flutter developers produce beautiful, cross-platform mobile apps for iOS and Android using a single codebase. Whether you need a single-app enterprise level or a consumer-facing solution, we build Flutter applications tailored to your requirements.",
    bullets: ["iOS & Android from one codebase", "Web & desktop Flutter apps", "Custom widget development", "State management architecture"],
  },
  {
    icon: Smartphone,
    title: "UI/UX Design",
    body: "We are dedicated to delivering exceptional user experiences through captivating and intuitive designs. Our UI/UX design team works closely with our clients to understand their requirements and deliver designs that boost functionality and aesthetic appeal.",
    bullets: ["Material 3 & Cupertino", "Lottie animations", "Responsive layouts", "Brand-aligned components"],
  },
  {
    icon: Puzzle,
    title: "Custom Widget Development",
    body: "If you have specific requirements for your Flutter app, our developers can create bespoke solutions to meet your needs. We have a proven track record of designing and implementing custom Flutter widgets — from complex data visualisations to innovative interactive experiences.",
    bullets: ["Custom rendering", "Complex animations", "Interactive charts", "Platform channel widgets"],
  },
  {
    icon: TestTube2,
    title: "Flutter App Testing and Quality Assurance",
    body: "Once your app is built, we thoroughly test every aspect of your Flutter app to identify and fix any bugs or performance issues. We conduct comprehensive testing across various devices and screen sizes to ensure flawless functionality and an outstanding user experience.",
    bullets: ["Unit & widget tests", "Integration testing", "Device matrix testing", "Performance profiling"],
  },
  {
    icon: Wrench,
    title: "Maintenance and Support",
    body: "Once your app is live, we provide ongoing maintenance and support services to ensure smooth operations. We offer regular updates, Flutter SDK version upgrades, and feature enhancements to keep your app aligned with the latest mobile industry standards.",
    bullets: ["Flutter SDK upgrades", "OS compatibility patches", "Performance monitoring", "Feature additions"],
  },
];

const whyUs = [
  "Expertise our team has extensive experience in Flutter development",
  "Quality and reliability — the value your trust and endorse you commit to meeting your expectations",
  "Proven track record of successful Flutter projects across industries",
  "Client-centric approach: we understand the importance of meeting your individual use case and ensure the overall development process is smooth and efficient",
  "In-depth understanding of Flutter's capabilities and limitations",
  "Dedicated support and maintenance for long-term success",
];

const faqs = [
  { q: "What is Flutter and why should I choose it for my app?", a: "Flutter is Google's open-source UI framework for building natively compiled applications for mobile, web, and desktop from a single codebase. It uses the Dart programming language and its own rendering engine, delivering pixel-perfect, high-performance UIs across all platforms." },
  { q: "How much does Flutter app development cost in the UK?", a: "Flutter development costs vary based on complexity, features, and timeline. Simple apps typically start from £8,000; medium-complexity apps range £20,000–£60,000; enterprise solutions can exceed £100,000. Because Flutter targets multiple platforms from one codebase, total cost is generally lower than building separate native apps." },
  { q: "Is Flutter better than React Native?", a: "Both are strong choices. Flutter offers superior rendering consistency and performance thanks to its own graphics engine. React Native has a larger JavaScript ecosystem and is easier for web developers to adopt. The best choice depends on your team's skills, design requirements, and platform targets." },
  { q: "How long does Flutter app development take?", a: "A simple Flutter MVP can be delivered in 6–10 weeks. Medium complexity apps typically take 3–5 months. Enterprise-grade applications may take 6–12 months depending on scope and integrations." },
  { q: "What programming language does Flutter use?", a: "Flutter uses Dart — a modern, strongly-typed, object-oriented language developed by Google. Dart is straightforward to learn, especially for developers familiar with Java, Kotlin, or TypeScript, and compiles to native ARM code for excellent performance." },
  { q: "Do I need separate developers for iOS and Android if I use Flutter?", a: "No — that's one of Flutter's biggest advantages. A single Flutter developer (or team) can build, test, and maintain apps for both iOS and Android simultaneously, reducing your team size and development costs significantly." },
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

export default function FlutterPage() {
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
          <img src={heroImg} alt="Flutter Development" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.35) saturate(1.1)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(8,3,22,0.90) 0%, rgba(8,3,22,0.50) 50%, rgba(8,3,22,0.85) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(124,58,237,0.07) 0%, transparent 65%)" }} />
        </motion.div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-14 items-center">
          <motion.div style={{ opacity: heroOp }}>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-6" style={pillStyle}>
              <Smartphone className="w-3 h-3" /> Flutter Development
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.65 }} className="text-4xl md:text-6xl font-black text-white leading-[1.08] tracking-tight mb-6">
              Hire Expert{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">Flutter Developers</span>
              <br />for Your App
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-white/50 text-xl leading-relaxed mb-10 max-w-md">
              Build the right product from the very start — with the UK's leading Flutter development agency.
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
            <HeroContactForm pageName="Flutter Development" extraField={{ label: "Requirement", type: "text", placeholder: "Describe your Flutter project..." }} />
          </motion.div>
        </div>
      </section>

      {/* ── Why Flutter ── */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-6" style={pillStyle}>
          Hire Expert Flutter App Developers in the UK
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
          What Makes Flutter Ideal for Your App?
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="text-white/50 text-lg leading-relaxed mb-10 max-w-3xl">
          Flutter is an open-source framework by Google that compiles to native code, enabling fast development and running on multiple platforms from a single codebase. It is both developer-friendly and end-user-focused, delivering beautiful, pixel-perfect experiences consistently across iOS, Android, web, and desktop.
        </motion.p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyFlutter.map(({ label, text }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="p-5 rounded-2xl" style={cardStyle}>
              <p className="text-primary font-bold text-sm mb-2">{i + 1}. {label}</p>
              <p className="text-white/50 text-sm leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── From Ideas to Live ── */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(124,58,237,0.03) 50%, transparent 100%)" }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <span className="text-primary font-bold text-sm uppercase tracking-widest">From Ideas to Live</span>
          <h2 className="text-3xl md:text-4xl font-black text-white mt-3 mb-4">Bringing Your Idea to Life</h2>
          <p className="text-white/45 max-w-2xl mx-auto text-base leading-relaxed">
            We can take your ideas and turn it into a fully functional project. Our team has experience of helping businesses across various industries to develop outstanding mobile applications right from the ideation phase.
          </p>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="py-8 pb-24 max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-6" style={pillStyle}>
          Our Services and Offerings
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-white/45 max-w-2xl mb-12 text-base leading-relaxed">
          At HireProgrammer, we specialise in creating beautiful mobile apps using the Flutter framework. Whether you need a simple app or a complex enterprise-level solution, our team is dedicated to delivering exceptional app experiences.
        </motion.p>
        <div className="grid md:grid-cols-2 gap-6">
          {services.map(({ icon: Icon, title, body, bullets }, i) => (
            <motion.div key={title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="p-7 rounded-2xl group hover:border-primary/30 transition-colors duration-300" style={cardStyle}>
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "rgba(124,58,237,0.12)" }}>
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-white font-bold text-lg leading-snug pt-1">{title}</h3>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-5">{body}</p>
              <ul className="space-y-2">
                {bullets.map(b => (
                  <li key={b} className="flex items-center gap-2 text-white/60 text-sm">
                    <ArrowRight className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(124,58,237,0.04) 50%, transparent 100%)" }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-4" style={pillStyle}>Why Choose Us?</div>
            <h2 className="text-3xl md:text-4xl font-black text-white">Why HireProgrammer?</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {whyUs.map((text, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="flex items-start gap-3 p-4 rounded-xl" style={cardStyle}>
                <CheckCircle2 className="w-4.5 h-4.5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-white/70 text-sm leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 max-w-4xl mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-4" style={pillStyle}>FAQ</div>
          <h2 className="text-3xl md:text-4xl font-black text-white">Frequently Asked Questions</h2>
        </motion.div>
        <div className="space-y-3">
          {faqs.map((faq, i) => <FaqItem key={i} {...faq} index={i} />)}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto text-center rounded-3xl py-16" style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.10) 0%, rgba(124,58,237,0.04) 100%)", border: "1px solid rgba(124,58,237,0.18)" }}>
          <p className="text-white/50 text-sm uppercase tracking-widest font-semibold mb-4">Ready to build?</p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Click here to book your free consultation and explore how we can support you.</h2>
          <a href="/contact-us" className="inline-flex items-center gap-2.5 px-10 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(124,58,237,0.4)]" style={{ background: "#7C3AED", color: "#ffffff" }}>
            Contact Us <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
