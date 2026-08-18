"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "HireProgrammer didn't just provide a developer — they gave us a senior engineer who took full ownership of our platform architecture. Three months later we raised our Series A.",
    name: "Rebecca Huang",
    role: "CTO & Co-founder",
    company: "Remi Finance",
    tag: "Series A",
  },
  {
    quote: "We needed a React Native expert in 48 hours for a critical demo. HireProgrammer had someone onboarded the next morning. Genuinely impressive.",
    name: "James Okafor",
    role: "Engineering Lead",
    company: "Loopline Labs",
    tag: "48hr Hire",
  },
  {
    quote: "The AI-assisted workflows their developers use are mind-blowing. They delivered our MVP in half the time our internal estimates projected.",
    name: "Elena Rodriguez",
    role: "Product Director",
    company: "Stylewise",
    tag: "MVP",
  },
  {
    quote: "Six months in and our contractor is now effectively our lead backend engineer. The UK timezone overlap makes standups seamless.",
    name: "Tom Whitfield",
    role: "CEO",
    company: "Stackr",
    tag: "Long-term",
  },
  {
    quote: "Our e-commerce platform went from 4-second load times to under 800ms after their performance specialist joined. ROI was immediate.",
    name: "Daniel Carr",
    role: "Co-founder",
    company: "ShelfStack",
    tag: "Performance",
  },
  {
    quote: "I've tried three other agencies. HireProgrammer is the only one where the developer actually read our codebase before day one.",
    name: "Aisha Nwosu",
    role: "Head of Product",
    company: "Verdant Digital",
    tag: "Quality",
  },
  {
    quote: "We integrated three senior engineers and the quality of their code exceeded every expectation. UK-based management makes communication flawless.",
    name: "Sarah Jenkins",
    role: "CTO",
    company: "FinTech Startup",
    tag: "Scale-up",
  },
  {
    quote: "Their flexible model let us scale up for a major release and scale down when needed — without any contract headaches whatsoever.",
    name: "Marcus Thorne",
    role: "Founder",
    company: "Amulette",
    tag: "Flexible",
  },
];

function TestimonialCard({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <div
      className="flex-shrink-0 w-[340px] mx-3 rounded-2xl p-6 flex flex-col gap-4"
      style={{
        background: "rgba(18,10,35,0.95)",
        border: "1px solid rgba(255,255,255,0.10)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
          ))}
        </div>
        <span
          className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full"
          style={{
            background: "rgba(124,58,237,0.12)",
            color: "#7C3AED",
            border: "1px solid rgba(124,58,237,0.22)",
          }}
        >
          {t.tag}
        </span>
      </div>

      <p className="text-sm text-white/78 leading-relaxed flex-1">"{t.quote}"</p>

      <div className="flex items-center gap-3 pt-4 border-t border-white/5">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
          style={{ background: "rgba(124,58,237,0.15)", color: "#7C3AED" }}
        >
          {t.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-white truncate">{t.name}</div>
          <div className="text-xs text-white/55 truncate">{t.role} · {t.company}</div>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({ items, reverse = false, duration = 50 }: { items: typeof testimonials; reverse?: boolean; duration?: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const doubled = [...items, ...items];
  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex"
        animate={mounted ? { x: reverse ? ["0%", "50%"] : ["0%", "-50%"] } : { x: "0%" }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        style={{ willChange: "transform" }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
      </motion.div>
    </div>
  );
}

export function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const row1 = testimonials;

  return (
    <section ref={ref} className="relative py-14 border-y border-white/5 overflow-hidden" style={{ background: "#0A0315" }}>
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 1000,
          height: 400,
          background: "radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.14) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Header */}
      <div className="container mx-auto px-4 relative z-10 mb-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-6xl mx-auto">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 text-xs text-primary font-medium mb-5"
              style={{ background: "rgba(124,58,237,0.07)" }}
            >
              <Star className="w-3 h-3 fill-primary" />
              5.0 · 200+ verified reviews
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-3xl md:text-5xl font-bold text-white tracking-tight"
            >
              What Customers{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">
                Say
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.14 }}
            className="text-white/40 text-sm max-w-xs md:text-right leading-relaxed"
          >
            Real feedback from businesses and technical teams who scaled faster with HireProgrammer.
          </motion.p>
        </div>
      </div>

      {/* Scrolling rows */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative z-10 space-y-4"
      >
        {/* Left + right fade masks */}
        <div
          className="absolute inset-y-0 left-0 w-40 z-20 pointer-events-none"
          style={{ background: "linear-gradient(to right, #0A0315 0%, transparent 100%)" }}
        />
        <div
          className="absolute inset-y-0 right-0 w-40 z-20 pointer-events-none"
          style={{ background: "linear-gradient(to left, #0A0315 0%, transparent 100%)" }}
        />

        <MarqueeRow items={row1} reverse={false} duration={55} />
      </motion.div>
    </section>
  );
}
