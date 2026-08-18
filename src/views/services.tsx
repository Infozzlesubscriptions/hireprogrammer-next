"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { useQuoteModal } from '@/context/QuoteModalContext';
import {
  ArrowRight, ArrowUpRight, CheckCircle2, Code2, Cpu, Shield, Smartphone,
  Globe, Zap, RefreshCw, Server, Users, Star, Layers, Lock,
  BarChart3, Search, Handshake,
} from "lucide-react";

const GOLD = "#7C3AED";
const pillStyle = { background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.22)" };
const cardStyle = { background: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.07)" };

/* ── Floating particle component ── */
function Particle({ delay, x, y, size, duration }: { delay: number; x: number; y: number; size: number; duration: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: `radial-gradient(circle, rgba(124,58,237,0.6) 0%, transparent 70%)` }}
      animate={mounted ? { y: [0, -30, 0], opacity: [0, 0.7, 0], scale: [0.5, 1, 0.5] } : { y: 0, opacity: 0, scale: 0.5 }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/* ── 3D Tilt card for Why section ── */
function TiltCard({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-60, 60], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-60, 60], [-6, 6]), { stiffness: 300, damping: 30 });
  const glowX = useTransform(x, [-60, 60], [0, 100]);
  const glowY = useTransform(y, [-60, 60], [0, 100]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }
  function onLeave() { x.set(0); y.set(0); }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ ...style, rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ scale: { type: "spring", stiffness: 300, damping: 25 } }}
    >
      {/* dynamic glow spot that follows the cursor */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none z-0"
        style={{
          background: useTransform([glowX, glowY], ([gx, gy]) =>
            `radial-gradient(circle at ${gx}% ${gy}%, rgba(124,58,237,0.10) 0%, transparent 60%)`),
        }}
      />
      {children}
    </motion.div>
  );
}

/* ── Animated service count ── */
function AnimatedCount({ value, trigger }: { value: number; trigger: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    setDisplay(0);
    let start = 0;
    const end = value;
    if (start === end) return;
    const stepTime = Math.abs(Math.floor(400 / end));
    const timer = setInterval(() => {
      start += 1;
      setDisplay(start);
      if (start === end) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [value, trigger]);
  return <>{String(display).padStart(2, "0")}</>;
}

const serviceCategories = [
  {
    heading: "CMS Development",
    short: "CMS",
    icon: Layers,
    description: "Powerful, flexible content management systems tailored to your business — from enterprise WordPress builds to bespoke WooCommerce stores.",
    services: [
      { label: "WordPress Development",      href: "/wordpress-development-services-uk", num: "01" },
      { label: "WooCommerce Development",    href: "/woocommerce-web-developers",      num: "02" },
      { label: "Drupal Development",         href: "/drupal-development-services-uk",  num: "03" },
      { label: "Magento Development",        href: "/magento-development-uk",          num: "04" },
      { label: "Shopify Development",        href: "/shopify-developers-for-hire-uk",  num: "05" },
      { label: "Joomla Website Development", href: "/joomla-developer-uk",             num: "06" },
    ],
  },
  {
    heading: "Web Development",
    short: "Web",
    icon: Code2,
    description: "Custom web applications built with battle-tested frameworks — scalable, secure, and engineered for long-term performance.",
    services: [
      { label: "Laravel Development",    href: "/laravel-developers-uk",      num: "01" },
      { label: "CodeIgniter Development",href: "/codeigniter-development",    num: "02" },
      { label: "PHP Web Development",    href: "/php-development-company-uk", num: "03" },
    ],
  },
  {
    heading: "AI & Emerging Tech",
    short: "AI",
    icon: Cpu,
    description: "Future-proof your business with AI, automation, and cloud-native solutions built by engineers at the cutting edge.",
    services: [
      { label: "AI Developers",               href: "/hire-ai-developers-uk",          num: "01" },
      { label: "Generative AI Development",   href: "/hire-generative-ai-developers-uk", num: "02" },
      { label: "Java Development",            href: "/hire-java-programmer",           num: "03" },
      { label: "DevOps Services",             href: "/devops-services-uk",             num: "04" },
      { label: "Linux Server Administration", href: "/linux-server-support-uk",        num: "05" },
      { label: "Zoho CRM Development",        href: "/zoho-crm-developers-uk",         num: "06" },
      { label: "Zapier Development",          href: "/zapier-automation-services",      num: "07" },
    ],
  },
  {
    heading: "Security",
    short: "Security",
    icon: Shield,
    description: "Comprehensive security services to protect your digital assets, ensure compliance, and harden your infrastructure against real-world threats.",
    services: [
      { label: "Information Security",  href: "/information-security-services-uk",  num: "01" },
      { label: "Penetration Testing",   href: "/penetration-testing-services-uk",   num: "02" },
    ],
  },
  {
    heading: "Mobile Development",
    short: "Mobile",
    icon: Smartphone,
    description: "High-performance native and cross-platform mobile applications that deliver seamless user experiences on iOS and Android.",
    services: [
      { label: "Mobile App Development",   href: "#", num: "01", soon: true },
      { label: "React Native Development", href: "#", num: "02", soon: true },
      { label: "Flutter Development",      href: "#", num: "03", soon: true },
    ],
  },
];

const whyUs = [
  { num: "01", title: "Senior Engineers", body: "Deep specialisation across every technology stack we offer — no generalists, only experts." },
  { num: "02", title: "Transparent Comms", body: "Regular progress updates and honest communication throughout every stage of your project." },
  { num: "03", title: "Rigorous QA", body: "We test thoroughly before anything goes live — automated, manual, and performance testing." },
  { num: "04", title: "Flexible Models", body: "Fixed price, retainer, or team augmentation — we adapt to how your business works best." },
  { num: "05", title: "UK Management", body: "UK-based project management combined with global engineering capacity for round-the-clock delivery." },
  { num: "06", title: "Long-Term Partners", body: "We build lasting partnerships, not one-off transactions. Your growth is our success." },
];

const stats = [
  { value: "10+",  label: "Years Experience" },
  { value: "500+", label: "Projects Delivered" },
  { value: "98%",  label: "Client Satisfaction" },
  { value: "50+",  label: "Expert Developers" },
];

const qualities = [
  {
    icon: Handshake,
    title: "Understanding Your Business",
    subtitle: "Tailored Solutions for Your Goals",
    body: "HireProgrammer is fully dedicated to learning about and understanding your business. By building a relationship with each of our clients, we can ensure our strategy is built with the sole focus of solving the problems your business faces. Each of our projects are built with the client's needs in mind to solve the greatest technology problems.",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&q=80",
  },
  {
    icon: BarChart3,
    title: "Quality Assurance",
    subtitle: "Benchmarking and Problem Solving",
    body: "Our quality assurance team performs a full audit of each project both during development and prior to deployment. This ensures that the final product meets our quality standards while also ensuring specific security and ease-of-management factors are taken into consideration for a successful website launch.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
  },
];

export default function ServicesPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const { openQuoteModal } = useQuoteModal();
  const { scrollY } = useScroll();
  const heroY  = useTransform(scrollY, [0, 700], ["0%", "30%"]);
  const heroOp = useTransform(scrollY, [0, 490], [1, 0]);
  const [activeTab, setActiveTab] = useState(0);
  const [prevTab,   setPrevTab]   = useState(0);

  const switchTab = (i: number) => {
    setPrevTab(activeTab);
    setActiveTab(i);
  };

  const cat = serviceCategories[activeTab];
  const CatIcon = cat.icon;

  /* seed stable particles — deterministic so SSR and client match */
  const particles = useMemo(() => {
    const s = (n: number) => { let x = Math.sin(n + 1) * 10000; return x - Math.floor(x); };
    const r2 = (n: number) => Math.round(n * 100) / 100;
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: r2(s(i * 3) * 100),
      y: r2(s(i * 3 + 1) * 100),
      size: r2(2 + s(i * 3 + 2) * 3),
      delay: r2(s(i * 5) * 4),
      duration: r2(4 + s(i * 5 + 1) * 5),
    }));
  }, []);

  return (
    <main className="min-h-screen bg-[#080316] text-foreground overflow-x-hidden selection:bg-primary/30">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative min-h-[80vh] flex items-start overflow-hidden pt-32 md:pt-36">
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <img src="/services-hero-banner.png" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.30) saturate(0.8)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(8,3,22,0.55) 0%, rgba(8,3,22,0.65) 60%, rgba(8,3,22,0.98) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 65% at 50% 50%, rgba(124,58,237,0.08) 0%, transparent 65%)" }} />
        </motion.div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div style={{ opacity: heroOp }} className="max-w-3xl mx-auto text-center">
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.65 }} className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
              Strategic{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">Development</span>
              <br />Services
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-white/50 text-xl leading-relaxed mb-10 max-w-xl mx-auto">
              Build the right product from the very start — with UK's leading software development agency across CMS, web, AI, security, and mobile.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="flex flex-wrap gap-4 justify-center">
              <a href="/quote" className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(124,58,237,0.45)]" style={{ background: "#7C3AED", color: "#ffffff" }}>
                Get a Free Quote <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>
        </div>

      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4) 50%, transparent)" }} />

      {/* ── Understanding Your Business + QA ── */}
      <section className="py-28 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(124,58,237,0.04) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 space-y-24">
          {qualities.map((q, qi) => {
            const Icon = q.icon;
            const reverse = qi % 2 !== 0;
            return (
              <div key={qi} className={`grid lg:grid-cols-2 gap-16 items-center ${reverse ? "lg:grid-flow-col-dense" : ""}`}>
                <motion.div initial={{ opacity: 0, x: reverse ? 30 : -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }} className={`relative${reverse ? " lg:col-start-2" : ""}`}>
                  <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                    <img src={q.image} alt={q.title} className="w-full h-80 object-cover" style={{ filter: "brightness(0.65) saturate(0.85)" }} />
                    <div className="absolute inset-0 rounded-2xl" style={{ background: `linear-gradient(${reverse ? "315" : "225"}deg, rgba(124,58,237,0.10) 0%, transparent 60%)` }} />
                  </div>
                  <div className="absolute -bottom-5 -right-5 w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: "rgba(6,2,16,0.95)", border: "1px solid rgba(124,58,237,0.3)" }}>
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: reverse ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }} className={reverse ? "lg:col-start-1 lg:row-start-1" : ""}>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-4" style={pillStyle}>
                    <Icon className="w-3 h-3" /> {qi === 0 ? "Our Approach" : "Quality"}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-2">{q.title}</h2>
                  <p className="text-primary font-semibold text-sm mb-5 uppercase tracking-wide">{q.subtitle}</p>
                  <p className="text-white/55 leading-relaxed text-sm mb-8">{q.body}</p>
                  <a href="/contact-us" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]" style={{ background: "#7C3AED", color: "#ffffff" }}>
                    Start a Project <ArrowRight className="w-4 h-4" />
                  </a>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25) 50%, transparent)" }} />

      {/* ── From Ideas to Live ── */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #080316 0%, #080316 50%, #080316 100%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(124,58,237,0.05) 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>
                <Zap className="w-3 h-3" /> From Ideas to Live
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-3">
                Bringing Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">Ideas to Life</span>
              </h2>
              <p className="text-primary font-semibold text-sm uppercase tracking-wide mb-6">Your Vision, Our Expertise</p>
              <p className="text-white/55 leading-relaxed text-sm mb-8 max-w-lg">
                We can take your ideas and turn them into a fully functional project. Our team has experience of helping businesses across various industries to develop applications right from the ideation phase, through design and development, to deployment and beyond.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-10">
                {["Discovery & Planning", "UI/UX Design", "Development & Build", "Testing & QA", "Launch & Deploy", "Ongoing Support"].map((step, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl" style={cardStyle}>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0" style={{ background: "rgba(124,58,237,0.15)", color: GOLD }}>{i + 1}</div>
                    <span className="text-white/65 text-xs font-medium">{step}</span>
                  </div>
                ))}
              </div>
              <a href="/contact-us" className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(124,58,237,0.4)]" style={{ background: "#7C3AED", color: "#ffffff" }}>
                Free Quote <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }} className="relative">
              <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80" alt="Team" className="w-full h-[500px] object-cover" style={{ filter: "brightness(0.6) saturate(0.85)" }} />
                <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.08) 0%, transparent 60%)" }} />
              </div>
              <motion.div animate={{ y: mounted ? [0, -8, 0] : 0 }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-6 bottom-12 px-5 py-4 rounded-xl" style={{ background: "rgba(6,2,16,0.95)", border: "1px solid rgba(124,58,237,0.3)", backdropFilter: "blur(12px)" }}>
                <div className="text-primary font-black text-2xl">500+</div>
                <div className="text-white/50 text-xs font-semibold uppercase tracking-wider mt-0.5">Projects Delivered</div>
              </motion.div>
              <motion.div animate={{ y: mounted ? [0, 8, 0] : 0 }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute -right-6 top-12 px-5 py-4 rounded-xl" style={{ background: "rgba(6,2,16,0.95)", border: "1px solid rgba(124,58,237,0.25)", backdropFilter: "blur(12px)" }}>
                <div className="text-primary font-black text-2xl">98%</div>
                <div className="text-white/50 text-xs font-semibold uppercase tracking-wider mt-0.5">Client Satisfaction</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25) 50%, transparent)" }} />

      {/* ══════════════════════════════════════════════════════
          ── SERVICE PORTFOLIO: Animated Tab Explorer ──
      ══════════════════════════════════════════════════════ */}
      <section className="py-28 relative overflow-hidden">
        {/* Particle field */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map(p => <Particle key={p.id} {...p} />)}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 90% 70% at 50% 40%, rgba(124,58,237,0.045) 0%, transparent 70%)" }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          {/* Heading */}
          <div className="text-center mb-14">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>
              <Star className="w-3 h-3" /> Everything We Do
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
              Our Complete{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">Service Portfolio</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.14 }} className="text-white/40 text-sm max-w-xl mx-auto leading-relaxed">
              Select a discipline to explore our full range of services.
            </motion.p>
          </div>

          {/* Explorer layout */}
          <div className="flex flex-col lg:flex-row gap-6 min-h-[580px]">

            {/* LEFT — vertical tabs */}
            <div className="flex lg:flex-col gap-3 lg:gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 lg:w-72 flex-shrink-0">
              {serviceCategories.map((c, i) => {
                const TIcon = c.icon;
                const isActive = i === activeTab;
                return (
                  <motion.button
                    key={i}
                    onClick={() => switchTab(i)}
                    className="relative flex-shrink-0 lg:flex-shrink text-left rounded-2xl overflow-hidden"
                    animate={{
                      background: isActive ? "rgba(124,58,237,0.09)" : "rgba(255,255,255,0.02)",
                      borderColor: isActive ? "rgba(124,58,237,0.38)" : "rgba(255,255,255,0.06)",
                    }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    style={{ border: "1px solid" }}
                  >
                    {/* animated gold left bar */}
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full"
                      animate={{ opacity: isActive ? 1 : 0, boxShadow: isActive ? `0 0 16px ${GOLD}` : "none" }}
                      style={{ background: GOLD }}
                    />
                    {/* active shimmer sweep */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        initial={{ x: "-100%" }}
                        animate={{ x: "200%" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.12), transparent)", width: "50%" }}
                      />
                    )}
                    <div className="px-5 py-4 flex items-center gap-4">
                      <motion.div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        animate={{
                          background: isActive ? "rgba(124,58,237,0.20)" : "rgba(255,255,255,0.04)",
                          borderColor: isActive ? "rgba(124,58,237,0.42)" : "rgba(255,255,255,0.07)",
                          scale: isActive ? 1.05 : 1,
                        }}
                        style={{ border: "1px solid" }}
                      >
                        <motion.div animate={{ rotate: isActive ? [0, -10, 10, 0] : 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
                          <TIcon className="w-4 h-4" style={{ color: isActive ? GOLD : "rgba(255,255,255,0.35)" }} />
                        </motion.div>
                      </motion.div>
                      <div className="min-w-0">
                        <div className="font-bold text-sm whitespace-nowrap transition-colors duration-300" style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.45)" }}>{c.heading}</div>
                        <div className="text-xs mt-0.5 transition-colors duration-300" style={{ color: isActive ? GOLD : "rgba(255,255,255,0.22)" }}>{c.services.length} service{c.services.length !== 1 ? "s" : ""}</div>
                      </div>
                      {/* pulse dot when active */}
                      {isActive && (
                        <motion.div
                          className="w-1.5 h-1.5 rounded-full ml-auto flex-shrink-0"
                          animate={mounted ? { scale: [1, 1.6, 1], opacity: [1, 0.4, 1] } : { scale: 1, opacity: 1 }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          style={{ background: GOLD }}
                        />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* RIGHT — animated panel */}
            <div className="relative flex-1 rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.018)", border: "1px solid rgba(255,255,255,0.07)" }}>
              {/* slowly rotating watermark icon */}
              <div className="absolute inset-0 flex items-center justify-end pr-8 pointer-events-none overflow-hidden">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                >
                  <CatIcon className="w-72 h-72 opacity-[0.03] text-primary" />
                </motion.div>
              </div>

              {/* top gold shimmer bar */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`bar-${activeTab}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute top-0 left-0 right-0 h-0.5 origin-left"
                  style={{ background: `linear-gradient(90deg, ${GOLD}, rgba(124,58,237,0.2), transparent)` }}
                />
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: activeTab > prevTab ? 50 : -50, scale: 0.97 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: activeTab > prevTab ? -50 : 50, scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 320, damping: 32 }}
                  className="relative z-10 p-8 h-full"
                >
                  {/* category meta */}
                  <div className="mb-7 flex items-start justify-between gap-4">
                    <div>
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] text-primary font-semibold uppercase tracking-widest mb-3"
                        style={pillStyle}
                      >
                        <CatIcon className="w-3 h-3" /> {cat.heading}
                      </motion.div>
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-white/45 text-sm max-w-lg leading-relaxed">{cat.description}</motion.p>
                    </div>
                    {/* animated count */}
                    <motion.div
                      key={activeTab}
                      initial={{ scale: 0.4, opacity: 0, y: 12 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 22, delay: 0.08 }}
                      className="text-right flex-shrink-0"
                    >
                      <div className="text-5xl font-black leading-none tabular-nums" style={{ color: "rgba(124,58,237,0.18)" }}>
                        <AnimatedCount value={cat.services.length} trigger={activeTab} />
                      </div>
                      <div className="text-white/25 text-[10px] uppercase tracking-widest mt-1">services</div>
                    </motion.div>
                  </div>

                  {/* animated divider */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                    className="h-px mb-7 origin-left"
                    style={{ background: "linear-gradient(90deg, rgba(124,58,237,0.4), transparent)" }}
                  />

                  {/* service cards — staggered spring */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {cat.services.map((svc, si) => {
                      const isPlaceholder = (svc as { soon?: boolean }).soon;
                      return (
                        <motion.a
                          key={svc.label}
                          href={svc.href}
                          initial={{ opacity: 0, y: 20, scale: 0.94 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ type: "spring", stiffness: 380, damping: 28, delay: 0.12 + si * 0.06 }}
                          whileHover={!isPlaceholder ? { y: -3, scale: 1.02 } : undefined}
                          className={`group relative flex items-center gap-4 px-5 py-4 rounded-xl overflow-hidden ${isPlaceholder ? "cursor-default" : "cursor-pointer"}`}
                          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                        >
                          {/* hover border glow */}
                          {!isPlaceholder && (
                            <motion.div
                              className="absolute inset-0 rounded-xl pointer-events-none"
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                              style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.07) 0%, transparent 60%)", border: "1px solid rgba(124,58,237,0.22)" }}
                            />
                          )}
                          {/* number */}
                          <span className="text-[13px] font-black tabular-nums flex-shrink-0" style={{ color: isPlaceholder ? "rgba(255,255,255,0.12)" : "rgba(124,58,237,0.55)" }}>
                            {svc.num}
                          </span>
                          {/* label */}
                          <span className={`relative z-10 text-sm font-semibold flex-1 transition-colors duration-200 ${isPlaceholder ? "text-white/25" : "text-white/65 group-hover:text-white"}`}>
                            {svc.label}
                          </span>
                          {/* trailing */}
                          {isPlaceholder ? (
                            <span className="relative z-10 text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.2)" }}>Soon</span>
                          ) : (
                            <motion.div
                              className="relative z-10 flex-shrink-0"
                              initial={{ opacity: 0, x: 4, y: -4 }}
                              whileHover={{ opacity: 1, x: 0, y: 0 }}
                            >
                              <ArrowUpRight className="w-4 h-4" style={{ color: GOLD }} />
                            </motion.div>
                          )}
                        </motion.a>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25) 50%, transparent)" }} />

      {/* ══════════════════════════════════════════════════════
          ── WHY HIREPROGRAMMER: 3D Tilt Magazine Grid ──
      ══════════════════════════════════════════════════════ */}
      <section className="py-28 relative overflow-hidden">
        {/* ambient glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124,58,237,0.05) 0%, transparent 70%)" }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          {/* Header */}
          <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>
                <Users className="w-3 h-3" /> Why HireProgrammer?
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="text-3xl md:text-5xl font-bold text-white leading-tight">
                The agency that becomes
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">part of your team</span>
              </motion.h2>
            </div>
            <motion.a href="/contact-us" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-sm flex-shrink-0 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(124,58,237,0.4)]" style={{ background: "#7C3AED", color: "#ffffff" }}>
              Start a Conversation <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>

          {/* 3D Tilt cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyUs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 36, scale: 0.93 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 260, damping: 24, delay: i * 0.08 }}
              >
                <TiltCard
                  className="group relative rounded-2xl overflow-hidden p-8 h-full"
                  style={{ background: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  {/* scanning line that sweeps top→bottom on hover */}
                  <motion.div
                    className="absolute left-0 right-0 h-px pointer-events-none z-20"
                    style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }}
                    initial={{ top: "-2px", opacity: 0 }}
                    whileHover={{ top: ["0%", "100%"], opacity: [0, 0.8, 0] }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                  />

                  {/* gold left-edge glow bar */}
                  <motion.div
                    className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full z-10"
                    style={{ background: `linear-gradient(180deg, transparent, ${GOLD} 50%, transparent)` }}
                    initial={{ opacity: 0, scaleY: 0 }}
                    whileHover={{ opacity: 1, scaleY: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* giant watermark number — slides up into view */}
                  <motion.div
                    className="absolute bottom-3 right-5 font-black select-none pointer-events-none"
                    style={{ fontSize: 88, lineHeight: 1, color: "rgba(124,58,237,0.07)" }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 + 0.2, duration: 0.6 }}
                    whileHover={{ color: "rgba(124,58,237,0.12)", scale: 1.05 }}
                  >
                    {item.num}
                  </motion.div>

                  {/* content */}
                  <div className="relative z-10">
                    {/* decorative rule */}
                    <motion.div
                      className="text-xs font-black tracking-[0.2em] mb-5"
                      style={{ color: "rgba(124,58,237,0.5)" }}
                      whileHover={{ color: "rgba(124,58,237,0.85)", letterSpacing: "0.28em" }}
                      transition={{ duration: 0.25 }}
                    >
                      — {item.num}
                    </motion.div>

                    <motion.h3
                      className="text-xl font-bold text-white mb-3 leading-snug"
                      whileHover={{ color: GOLD }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.title}
                    </motion.h3>

                    <p className="text-white/45 text-sm leading-relaxed group-hover:text-white/65 transition-colors duration-300">
                      {item.body}
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="relative overflow-hidden">
        <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.5) 50%, transparent)" }} />
        <div className="relative" style={{ background: "linear-gradient(135deg, #080316 0%, #0D0819 50%, #080316 100%)" }}>
          <div className="absolute inset-0 pointer-events-none glow-pulse-bg" style={{ background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(124,58,237,0.10) 0%, transparent 70%)" }} />
          <div className="relative z-10 py-28 px-6 text-center max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
                Ready to build something{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">extraordinary?</span>
              </h2>
              <p className="text-white/45 text-xl mb-12 leading-relaxed">
                Reach out now to book your free consultation and explore how we can support you.
              </p>
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
