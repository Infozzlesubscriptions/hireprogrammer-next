"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code, Globe, Layout, Search,
  Smartphone, TrendingUp, ShieldCheck, Database,
  ChevronLeft, ChevronRight,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Design & Dev",
    subtitle: "Front & Back-End",
    desc: "Custom, scalable web applications built with React, Vue, Laravel, PHP, and more. From landing pages to complex platforms.",
    tags: ["React", "Laravel", "PHP"],
    accent: "#7C3AED",
    img: "/expertise-web.png",
    href: "/services",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    subtitle: "iOS & Android",
    desc: "Native and cross-platform mobile solutions using React Native and Flutter — shipped fast and built to scale.",
    tags: ["React Native", "Flutter", "iOS"],
    accent: "#7C3AED",
    img: "/expertise-mobile.png",
    href: "/mobile-app",
  },
  {
    icon: Code,
    title: "Desktop Dev",
    subtitle: "Windows & macOS",
    desc: "High-performance desktop applications using .NET, Java, Python, and C — built for enterprise reliability.",
    tags: [".NET", "Java", "Python"],
    accent: "#7C3AED",
    img: "/expertise-desktop.png",
    href: "/services",
  },
  {
    icon: Layout,
    title: "UI/UX & Design",
    subtitle: "2D, 3D & Branding",
    desc: "User-centric interfaces that engage and convert. Logos, motion graphics, and video — polished to perfection.",
    tags: ["Figma", "Branding", "3D"],
    accent: "#7C3AED",
    img: "/expertise-design.png",
    href: "/services",
  },
  {
    icon: Search,
    title: "SEO Experts",
    subtitle: "On & Off-Page",
    desc: "Data-driven search engine optimization, SEM, and Google Ads to boost visibility and drive qualified traffic.",
    tags: ["SEO", "SEM", "AdWords"],
    accent: "#7C3AED",
    img: "/expertise-seo.png",
    href: "/services",
  },
  {
    icon: TrendingUp,
    title: "Sales & Marketing",
    subtitle: "Growth Strategy",
    desc: "Internet marketing, PPC consulting, and conversion-focused campaigns that turn visitors into customers.",
    tags: ["PPC", "Marketing", "CRO"],
    accent: "#7C3AED",
    img: "/expertise-marketing.png",
    href: "/services",
  },
  {
    icon: ShieldCheck,
    title: "Administration",
    subtitle: "Data & Research",
    desc: "Data entry specialists, internet researchers, and virtual assistants — precise, reliable, and always on time.",
    tags: ["Data Entry", "VA", "Research"],
    accent: "#7C3AED",
    img: "/expertise-admin.png",
    href: "/services",
  },
  {
    icon: Database,
    title: "Hosting Solutions",
    subtitle: "Cloud & DevOps",
    desc: "Scalable cloud infrastructure, Linux server administration, and data-centre expertise for any workload.",
    tags: ["AWS", "Linux", "DevOps"],
    accent: "#7C3AED",
    img: "/expertise-hosting.png",
    href: "/devops",
  },
];

/* Card geometry per offset from active */
function cardStyle(offset: number) {
  const abs = Math.abs(offset);
  const sign = Math.sign(offset);
  return {
    x: sign * (abs === 0 ? 0 : 95 + (abs - 1) * 72),
    rotate: sign * abs * 9,
    scale: Math.max(0.52, 1 - abs * 0.11),
    opacity: abs === 0 ? 1 : Math.max(0.22, 0.75 - abs * 0.14),
    zIndex: 20 - abs,
    filter: abs === 0 ? "none" : `grayscale(${Math.min(abs * 30, 75)}%) brightness(0.65)`,
  };
}

export function Expertise() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = services.length;

  const prev = useCallback(() => setActive(a => (a - 1 + n) % n), [n]);
  const next = useCallback(() => setActive(a => (a + 1) % n), [n]);

  /* Auto-rotate every 3.5s */
  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 3500);
    return () => clearInterval(t);
  }, [paused, next]);

  const svc = services[active];

  return (
    <section id="services" className="py-14 bg-[#080316] relative overflow-hidden">
      {/* Ambient glow behind cards */}
      <motion.div
        key={active}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 80%, ${svc.accent}33 0%, transparent 70%)`,
        }}
      />

      <div className="w-full px-6 lg:px-10 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-5"
          >
            Our <span className="text-primary">Expertise</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/65 text-lg"
          >
            A full-spectrum engineering team ready to tackle any technical challenge.
          </motion.p>

          {/* Service tabs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mt-8"
          >
            {services.map((s, i) => (
              <button
                key={i}
                onClick={() => { setActive(i); setPaused(true); }}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                style={
                  i === active
                    ? { background: s.accent, color: "#000", boxShadow: `0 0 16px ${s.accent}55` }
                    : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.08)" }
                }
              >
                {s.title}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Fan deck — desktop only */}
        <div
          className="relative hidden sm:flex items-end justify-center"
          style={{ height: 460 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {services.map((s, i) => {
            const offset = i - active;
            /* wrap around for circular fan */
            const wrapped = offset > n / 2 ? offset - n : offset < -n / 2 ? offset + n : offset;
            const abs = Math.abs(wrapped);
            if (abs > 3) return null; /* only show ±3 cards */
            const { x, rotate, scale, opacity, zIndex, filter } = cardStyle(wrapped);
            const Icon = s.icon;

            return (
              <motion.div
                key={i}
                animate={{ x, rotate, scale, opacity, zIndex }}
                transition={{ type: "spring", stiffness: 220, damping: 28 }}
                className="absolute bottom-0 cursor-pointer"
                style={{ width: 320, height: 420, filter, transformOrigin: "bottom center", zIndex }}
                onClick={() => { if (abs === 0) { window.location.href = s.href; } else { setActive(i); setPaused(true); } }}
              >
                <div
                  className="w-full h-full rounded-3xl overflow-hidden relative"
                  style={{
                    border: `1px solid ${abs === 0 ? s.accent + "70" : "rgba(255,255,255,0.08)"}`,
                    boxShadow: abs === 0
                      ? `0 32px 80px rgba(0,0,0,0.85), 0 0 60px ${s.accent}35`
                      : "0 16px 40px rgba(0,0,0,0.6)",
                  }}
                >
                  {/* Full-card image */}
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ filter: abs === 0 ? "none" : "brightness(0.5)" }}
                  />

                  {/* Gradient overlay — heavier at bottom for text legibility */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: abs === 0
                        ? `linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.82) 45%, rgba(0,0,0,0.99) 100%)`
                        : `linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.98) 100%)`,
                    }}
                  />

                  {/* Accent colour tint on active */}
                  {abs === 0 && (
                    <div
                      className="absolute inset-0"
                      style={{ background: `linear-gradient(to top, ${s.accent}22 0%, transparent 60%)` }}
                    />
                  )}

                  {/* Text content */}
                  <div className="absolute inset-0 flex flex-col justify-between p-6">
                    {/* Top: icon + subtitle */}
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: `${s.accent}25`,
                          border: `1px solid ${s.accent}50`,
                          backdropFilter: "blur(8px)",
                        }}
                      >
                        <Icon className="w-4.5 h-4.5" style={{ color: s.accent, width: 18, height: 18 }} />
                      </div>
                      {abs === 0 && (
                        <motion.span
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                          className="text-[10px] font-semibold tracking-widest uppercase"
                          style={{ color: s.accent }}
                        >
                          {s.subtitle}
                        </motion.span>
                      )}
                    </div>

                    {/* Bottom: title + desc + tags + link */}
                    <div>
                      <h3 className="text-lg font-bold text-white leading-snug mb-2">{s.title}</h3>

                      {abs === 0 && (
                        <>
                          <motion.p
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            className="text-xs text-white/65 leading-relaxed mb-3"
                          >
                            {s.desc}
                          </motion.p>
                          <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.22 }}
                            className="flex flex-wrap gap-1.5 mb-3"
                          >
                            {s.tags.map(tag => (
                              <span
                                key={tag}
                                className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                                style={{
                                  background: `${s.accent}22`,
                                  color: s.accent,
                                  border: `1px solid ${s.accent}40`,
                                  backdropFilter: "blur(4px)",
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </motion.div>
                        </>
                      )}

                      {abs !== 0 && abs <= 2 && (
                        <p className="text-[9px] text-white/30">Click to explore</p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile single-card view */}
        <div className="sm:hidden px-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-3xl overflow-hidden mx-auto"
              style={{ maxWidth: 340, height: 420 }}
              onClick={() => { window.location.href = services[active].href; }}
            >
              <div
                className="w-full h-full rounded-3xl overflow-hidden relative"
                style={{
                  border: `1px solid ${services[active].accent}70`,
                  boxShadow: `0 32px 80px rgba(0,0,0,0.85), 0 0 60px ${services[active].accent}35`,
                }}
              >
                <img src={services[active].img} alt={services[active].title} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.82) 45%, rgba(0,0,0,0.99) 100%)" }} />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${services[active].accent}22 0%, transparent 60%)` }} />
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  <div className="flex items-center gap-2.5">
                    {(() => { const Icon = services[active].icon; return (
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${services[active].accent}25`, border: `1px solid ${services[active].accent}50` }}>
                        <Icon style={{ color: services[active].accent, width: 18, height: 18 }} />
                      </div>
                    ); })()}
                    <span className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: services[active].accent }}>{services[active].subtitle}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white leading-snug mb-2">{services[active].title}</h3>
                    <p className="text-xs text-white/65 leading-relaxed mb-3">{services[active].desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {services[active].tags.map(tag => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: `${services[active].accent}22`, color: services[active].accent, border: `1px solid ${services[active].accent}40` }}>{tag}</span>
                      ))}
                    </div>
                    <p className="text-[10px] text-white/35 mt-3">Tap to open service</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Prev / Next + dot indicator */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={() => { prev(); setPaused(true); }}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
          >
            <ChevronLeft className="w-5 h-5 text-white/60" />
          </button>

          <div className="flex gap-2">
            {services.map((_, i) => (
              <button
                key={i}
                onClick={() => { setActive(i); setPaused(true); }}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === active ? 24 : 7,
                  height: 7,
                  background: i === active ? svc.accent : "rgba(255,255,255,0.18)",
                  boxShadow: i === active ? `0 0 10px ${svc.accent}80` : "none",
                }}
              />
            ))}
          </div>

          <button
            onClick={() => { next(); setPaused(true); }}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
          >
            <ChevronRight className="w-5 h-5 text-white/60" />
          </button>
        </div>

        {/* Active service name label */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="text-center mt-5 text-sm font-medium"
            style={{ color: svc.accent }}
          >
            {svc.title}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
