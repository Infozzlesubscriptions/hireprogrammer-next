"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion, AnimatePresence, useInView,
  useMotionValue, useTransform, useSpring, useScroll,
} from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { useQuoteModal } from "@/context/QuoteModalContext";
import {
  Target, Lightbulb, Eye, Users, GraduationCap,
  Briefcase, TrendingUp, Code2, ArrowRight, MapPin,
  ChevronRight,
} from "lucide-react";

/* ─── Shared helpers ─── */
const GOLD = "#7C3AED";

const pillStyle = {
  background: "rgba(124,58,237,0.08)",
  border: "1px solid rgba(124,58,237,0.22)",
};

/* ─── Values data ─── */
const values = [
  {
    num: "01",
    icon: Target,
    title: "Understanding Your Business",
    subtitle: "Tailored Solutions for Your Goals",
    body: [
      "HireProgrammer is fully dedicated to learning about and understanding your business. By building a relationship with each of our clients, we can ensure our strategy is built with the sole focus of solving the problems your business faces.",
      "Each of our processes are designed with our client's needs in mind using our experience across various projects we have successfully delivered.",
    ],
    stat: { value: "200+", label: "Projects Delivered" },
    tags: ["Discovery", "Strategy", "Alignment"],
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
  },
  {
    num: "02",
    icon: Lightbulb,
    title: "Best Practices & Latest Innovations",
    subtitle: "Superior Work for Best Results",
    body: [
      "We are committed to using the best practices and staying on top of the latest innovations in the industry. New technology strategies are being developed each day to find new ways to efficiently deliver solutions that are top notch and cutting edge.",
      "Whether it's a new E-commerce Platform, Block-chain Solutions or Traditional Programming Methodologies, we are constantly looking for the newest and most innovative ways to deliver exceptional results that exceed our client's expectations.",
    ],
    stat: { value: "10+", label: "Tech Stacks" },
    tags: ["E-commerce", "Blockchain", "AI/ML"],
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
  },
  {
    num: "03",
    icon: Eye,
    title: "Transparency & Forward Strategies",
    subtitle: "See Your Work, Expect Ongoing Gains",
    body: [
      "We are committed to being transparent to our clients. The team at HireProgrammer ensures to provide clients with an understanding of the planning and efforts that have gone into their projects and the results of the same. We are open about what we do and how we do it for our clients to present them with the best long-term value.",
      "We are always available to help them and guide them through understanding how their projects are performing and what we can do for them to give them additional value.",
    ],
    stat: { value: "98%", label: "Client Satisfaction" },
    tags: ["Reporting", "Dashboards", "Roadmaps"],
    img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
  },
];

/* ─── Team data ─── */
const team = [
  {
    name: "Neil",
    role: "Director",
    icon: GraduationCap,
    initial: "N",
    bio: "Neil worked at eBay.co.uk where he became an expert in ecommerce, internet marketing and SEO. He developed many of eBay UK's marketing analysis tools and is a graduate of Cambridge University.",
    skills: ["Strategy", "eBay SEO", "Analytics", "Cambridge"],
    bg: "radial-gradient(ellipse 120% 100% at 30% 0%, #2d1060 0%, #140828 55%, #080316 100%)",
    accent: "#9B3FFF",
  },
  {
    name: "Shaun",
    role: "Project Manager",
    icon: Briefcase,
    initial: "S",
    bio: "A technology expert with over 10 years of experience covering UK, USA and Asia. Shaun holds an MBA from Imperial College, London alongside his engineering qualifications.",
    skills: ["Agile", "Cloud", "MBA", "Imperial College"],
    bg: "radial-gradient(ellipse 120% 100% at 70% 0%, #0f2a5e 0%, #0a1830 55%, #060d1e 100%)",
    accent: "#3B82F6",
  },
  {
    name: "Sam",
    role: "Marketing Manager",
    icon: TrendingUp,
    initial: "S",
    bio: "With 8+ years in Sales and Marketing, Sam leads business development at HireProgrammer, bringing a passion for Technology Sales and growth strategies.",
    skills: ["Sales", "Tech Marketing", "CRO", "Growth"],
    bg: "radial-gradient(ellipse 120% 100% at 50% 0%, #1a0a40 0%, #110620 55%, #080316 100%)",
    accent: "#C060FF",
  },
  {
    name: "Tech Team",
    role: "Various Roles",
    icon: Code2,
    initial: "T",
    bio: "Dynamic individuals delivering cutting-edge solutions daily — carefully selected through a rigorous interview process across all major technologies.",
    skills: ["React", "Node.js", "DevOps", "Mobile"],
    bg: "radial-gradient(ellipse 120% 100% at 60% 10%, #0d3030 0%, #061818 55%, #030d0d 100%)",
    accent: "#10B981",
  },
];

/* ─── Animated ring around icon ─── */
function PulseRing({ color = GOLD }: { color?: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  return (
    <motion.div
      className="absolute inset-0 rounded-full"
      animate={mounted ? { scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] } : { scale: 1, opacity: 0.4 }}
      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      style={{ border: `1px solid ${color}`, pointerEvents: "none" }}
    />
  );
}

/* ─── Magnetic tilt card ─── */
function TiltCard({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-60, 60], [8, -8]);
  const rotateY = useTransform(x, [-60, 60], [-8, 8]);
  const sx = useSpring(rotateX, { stiffness: 200, damping: 24 });
  const sy = useSpring(rotateY, { stiffness: 200, damping: 24 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: sx, rotateY: sy, transformStyle: "preserve-3d", ...style }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Parallax layer — simplified to plain div (avoids SSR hook issues) ─── */
function ParallaxLayer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

/* ─── Single principle row ─── */
function PrincipleRow({ v, index }: { v: typeof values[0]; index: number }) {

  const isEven = index % 2 === 0;
  const Icon = v.icon;

  return (
    <div className="relative">
      {/* Connecting spine dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-20 hidden lg:flex items-center justify-center"
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center font-black text-sm"
          style={{ background: "#080316", border: `2px solid ${GOLD}`, color: GOLD, boxShadow: `0 0 24px ${GOLD}40` }}
        >
          {v.num}
        </div>
      </motion.div>

      <div className={`grid lg:grid-cols-2 gap-0 min-h-[520px] overflow-hidden rounded-3xl ${index < values.length - 1 ? "mb-3" : ""}`}
        style={{ border: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Image side */}
        <motion.div
          className={`relative overflow-hidden ${isEven ? "order-1" : "order-1 lg:order-2"}`}
          initial={{ opacity: 0, x: isEven ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ minHeight: 360 }}
        >
          {/* Photo */}
          <motion.div className="absolute inset-[-10%] w-[120%] h-[120%]">
            <img
              src={v.img}
              alt={v.title}
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.65) saturate(0.85)" }}
            />
          </motion.div>

          {/* Overlays */}
          <div
            className="absolute inset-0"
            style={{ background: isEven
              ? "linear-gradient(to right, rgba(8,3,22,0.0) 0%, rgba(8,3,22,0.85) 100%)"
              : "linear-gradient(to left, rgba(8,3,22,0.0) 0%, rgba(8,3,22,0.85) 100%)"
            }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(8,3,22,0.55) 0%, rgba(8,3,22,0.15) 50%, rgba(8,3,22,0.75) 100%)" }}
          />
          <div
            className="absolute inset-0 opacity-20"
            style={{ background: `linear-gradient(135deg, ${GOLD}22 0%, transparent 60%)` }}
          />

          {/* Icon badge — top corner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: "spring" }}
            className={`absolute top-6 ${isEven ? "left-6" : "right-6"} z-10`}
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center relative"
              style={{ background: "rgba(6,2,16,0.85)", border: "1px solid rgba(124,58,237,0.40)", backdropFilter: "blur(12px)" }}
            >
              <Icon className="w-6 h-6 text-primary" />
              <div className="absolute inset-0 rounded-2xl"><PulseRing /></div>
            </div>
          </motion.div>

          {/* Stat — bottom corner */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className={`absolute bottom-6 ${isEven ? "left-6" : "right-6"} z-10`}
          >
            <div
              className="px-4 py-3 rounded-2xl"
              style={{ background: "rgba(6,2,16,0.80)", border: "1px solid rgba(124,58,237,0.22)", backdropFilter: "blur(16px)" }}
            >
              <div
                className="text-3xl font-black leading-none mb-0.5"
                style={{ color: GOLD, textShadow: `0 0 20px ${GOLD}60` }}
              >
                {v.stat.value}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-white/45 font-semibold">{v.stat.label}</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Text side */}
        <motion.div
          className={`relative flex flex-col justify-center px-10 py-14 ${isEven ? "order-2" : "order-2 lg:order-1"}`}
          style={{ background: "rgba(6,2,16,0.97)" }}
          initial={{ opacity: 0, x: isEven ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          {/* Gold left-edge accent */}
          <div
            className="absolute left-0 top-12 bottom-12 w-0.5 rounded-full"
            style={{ background: `linear-gradient(to bottom, transparent, ${GOLD}60, transparent)` }}
          />

          {/* Mobile-only number */}
          <div
            className="text-5xl font-black leading-none mb-6 lg:hidden"
            style={{ color: `${GOLD}30` }}
          >
            {v.num}
          </div>

          {/* Subtitle pill */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5 self-start"
            style={pillStyle}
          >
            <Icon className="w-3 h-3" />{v.subtitle}
          </motion.div>

          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.24 }}
            className="text-3xl font-bold text-white leading-tight mb-6"
          >
            {v.title}
          </motion.h3>

          {/* Body paragraphs */}
          <div className="space-y-4 mb-7">
            {v.body.map((para, pi) => (
              <motion.p
                key={pi}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.28 + pi * 0.10 }}
                className="text-white/55 text-base leading-relaxed"
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.42 }}
            className="flex flex-wrap gap-2"
          >
            {v.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{ background: "rgba(124,58,237,0.08)", color: GOLD, border: "1px solid rgba(124,58,237,0.22)" }}
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Values section ─── */
function ValuesSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  return (
    <section className="py-28 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(124,58,237,0.06) 0%, transparent 70%)" }}
        />
      </div>

      {/* Ghost "PRINCIPLES" watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        style={{ opacity: 0.012 }}
      >
        <span className="text-[160px] font-black text-white leading-none whitespace-nowrap tracking-tight">
          PRINCIPLES
        </span>
      </div>

      <div className="w-full px-6 lg:px-10 max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-4xl md:text-6xl font-bold text-white leading-tight"
          >
            What We{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">
              Stand For
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className="text-white/40 text-lg mt-4 max-w-md mx-auto"
          >
            Three commitments that define how we work with every client.
          </motion.p>
        </div>

        {/* Principle rows with gold spine */}
        <div className="relative">
          {/* Vertical gold timeline spine (desktop only) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden lg:block overflow-hidden">
            <motion.div
              className="w-full h-full origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{
                background: `linear-gradient(to bottom, transparent, ${GOLD}50 20%, ${GOLD}50 80%, transparent)`,
              }}
            />
          </div>

          <div className="flex flex-col gap-3">
            {values.map((v, i) => (
              <PrincipleRow key={v.num} v={v} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Team section ─── */
function TeamSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  return (
    <section className="py-28 bg-[#080316] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(124,58,237,0.08) 0%, transparent 70%)" }} />
      </div>

      <div className="w-full px-6 lg:px-10 max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
          >
            The People Behind{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">
              HireProgrammer
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className="text-white/45 text-lg max-w-xl mx-auto"
          >
            Experienced leaders and elite engineers delivering exceptional outcomes.
          </motion.p>
        </div>

        {/* ── Grid cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map((member, i) => {
            const Icon = member.icon;
            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="relative rounded-2xl overflow-hidden flex flex-col"
                style={{
                  background: "rgba(14,8,32,0.85)",
                  border: `1px solid rgba(255,255,255,0.07)`,
                  borderTop: `2px solid ${member.accent}`,
                }}
              >
                {/* Top accent glow */}
                <div
                  className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse 80% 100% at 50% 0%, ${member.accent}18 0%, transparent 100%)` }}
                />

                <div className="relative z-10 p-7 flex flex-col flex-1">
                  {/* Icon circle */}
                  <div className="mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center relative"
                      style={{ background: `${member.accent}15`, border: `1px solid ${member.accent}35` }}
                    >
                      <Icon className="w-7 h-7" style={{ color: member.accent }} />
                      {/* Subtle pulse ring */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl"
                        animate={mounted ? { scale: [1, 1.45, 1], opacity: [0.35, 0, 0.35] } : { scale: 1, opacity: 0.35 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
                        style={{ border: `1px solid ${member.accent}` }}
                      />
                    </div>
                  </div>

                  {/* Role pill */}
                  <div
                    className="inline-flex self-start items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3"
                    style={{ background: `${member.accent}18`, color: member.accent, border: `1px solid ${member.accent}30` }}
                  >
                    {member.role}
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight">{member.name}</h3>

                  {/* Bio */}
                  <p className="text-white/50 text-sm leading-relaxed flex-1 mb-5">{member.bio}</p>

                  {/* Divider */}
                  <div className="h-px mb-5" style={{ background: "rgba(255,255,255,0.07)" }} />

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5">
                    {member.skills.map(skill => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-full text-[11px] font-medium"
                        style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.09)" }}
                      >
                        {skill}
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
  );
}

/* ─── Hero counter ─── */
function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (displayed >= target) return;
    const step = Math.ceil(target / 40);
    const id = setTimeout(() => setDisplayed(d => Math.min(d + step, target)), 30);
    return () => clearTimeout(id);
  }, [inView, displayed, target]);

  return <span ref={ref}>{displayed}{suffix}</span>;
}

/* ─── Main page ─── */
export default function AboutPage() {
  const [pageMounted, setPageMounted] = useState(false);
  useEffect(() => { setPageMounted(true); }, []);
  const { openQuoteModal } = useQuoteModal();
  /* Hero-level scroll parallax */
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  const heroVideoY = useTransform(scrollY, [0, 700], [0, -160]);
  const heroContentY = useTransform(scrollY, [0, 600], [0, -70]);
  const heroOpacity = useTransform(scrollY, [0, 420], [1, 0]);
  const heroGlowY = useTransform(scrollY, [0, 600], [0, -90]);


  return (
    <main className="min-h-screen bg-[#080316] text-foreground overflow-x-hidden selection:bg-primary/30">
      <Navbar />

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20 pb-20">
        {/* Parallax video layer */}
        <motion.div
          className="absolute inset-0 scale-[1.25]"
          style={{ y: heroVideoY }}
        >
          <video
            autoPlay loop muted playsInline preload="none"
            className="w-full h-full object-cover"
            style={{ opacity: 0.18 }}
          >
            <source src="/hero_bg_tech_gold.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Parallax glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ y: heroGlowY }}
        >
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 70% 60% at 50% 65%, rgba(124,58,237,0.14) 0%, transparent 70%)" }}
          />
        </motion.div>

        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(8,3,22,0.70) 0%, rgba(8,3,22,0.55) 50%, rgba(8,3,22,0.85) 100%)" }}
        />

        {/* Background image */}
        <img
          src={`/about-commitment-bg.jpg`}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.55) saturate(1.1)" }}
        />
        {/* Black overlay */}
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.55)" }} />

        {/* Parallax content — drifts up + fades as user scrolls away */}
        <motion.div
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
          style={{ y: heroContentY, opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-medium mb-6"
            style={pillStyle}
          >
            <MapPin className="w-3 h-3" /> Based in London, UK
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-bold leading-[1.05] mb-6 tracking-tight"
          >
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">
              Hire Programmer
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-white/55 text-xl leading-relaxed max-w-2xl mx-auto mb-12"
          >
            We are fully committed to elevating our clients to new heights.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            {[
              { value: 47, suffix: "+", label: "Expert Engineers" },
              { value: 200, suffix: "+", label: "Projects Delivered" },
              { value: 98, suffix: "%", label: "Client Satisfaction" },
              { value: 10, suffix: "+", label: "Years Experience" },
            ].map(({ value, suffix, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.08 }}
                className="text-center px-6 py-4 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div className="text-3xl font-black text-primary leading-none mb-1">
                  <CountUp target={value} suffix={suffix} />
                </div>
                <div className="text-xs text-white/40 uppercase tracking-wider">{label}</div>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </section>

      {/* Divider */}
      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4) 50%, transparent)" }} />

      <ValuesSection />

      {/* Divider */}
      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4) 50%, transparent)" }} />

      <TeamSection />

      {/* ── CTA Banner ── */}
      <section className="py-24 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={pageMounted ? { opacity: [0.4, 0.7, 0.4] } : { opacity: 0.4 }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.07) 0%, transparent 50%, rgba(124,58,237,0.07) 100%)" }}
          />
        </div>

        {/* Ghost text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[180px] font-black text-white/[0.012] leading-none whitespace-nowrap">
            HIRE
          </span>
        </div>

        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.5) 50%, transparent)" }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.3) 50%, transparent)" }}
        />

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight"
          >
            Reach out now to book your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C060FF] to-[#E040FF]">
              free consultation
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/50 text-lg mb-10 leading-relaxed"
          >
            Explore how we can support you and your business to grow and scale with elite UK engineering talent.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.18 }}
          >
            <a
              href="/contact-us"
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(124,58,237,0.45)]"
              style={{ background: "#7C3AED", color: "#ffffff" }}
            >
              Contact Us <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
