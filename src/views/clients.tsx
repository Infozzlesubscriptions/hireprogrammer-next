"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Star, Quote, ArrowRight, Users, Award, Globe, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

const GOLD = "#7C3AED";
const pillStyle = {
  background: "rgba(124,58,237,0.10)",
  border: "1px solid rgba(124,58,237,0.25)",
};

/* ── Client data ── */
const clients = [
  {
    logo: "/logos/amulette.png",
    name: "Amulette London",
    industry: "Luxury Jewellery",
    desc: "E-commerce platform rebuild with bespoke product configurator and real-time stock integration.",
    tags: ["WooCommerce", "Laravel", "UI/UX"],
  },
  {
    logo: "/logos/london.png",
    name: "The London Experience",
    industry: "Tourism & Hospitality",
    desc: "Booking portal with live availability, payment gateway integration, and multi-currency support.",
    tags: ["React", "Node.js", "Stripe"],
  },
  {
    logo: "/logos/london-city.png",
    name: "London City Skin Clinic",
    industry: "Healthcare & Aesthetics",
    desc: "Patient management system with online consultations, booking, and GDPR-compliant data handling.",
    tags: ["PHP", "MySQL", "GDPR"],
  },
  {
    logo: "/logos/shelikes.png",
    name: "Shelikes",
    industry: "Fashion & Retail",
    desc: "Subscription commerce platform with personalised product feeds and automated fulfilment flows.",
    tags: ["Shopify", "React", "API"],
  },
  {
    logo: "/logos/stylewise.png",
    name: "Stylewise Direct",
    industry: "Fashion Wholesale",
    desc: "Trade portal with wholesale pricing tiers, bulk ordering, and real-time inventory management.",
    tags: ["Magento", "PHP", "B2B"],
  },
  {
    logo: "/logos/personal.png",
    name: "Personal Retirement Planning",
    industry: "Financial Services",
    desc: "Secure client portal for pension planning with document management and advisor dashboards.",
    tags: ["Laravel", "Vue.js", "Security"],
  },
  {
    logo: "/logos/kiddiwinks.png",
    name: "Kiddiwinks",
    industry: "Children's Education",
    desc: "Parent-facing booking system for nursery and after-school care with digital invoicing.",
    tags: ["WordPress", "WooCommerce", "UX"],
  },
  {
    logo: "/logos/city-therapy.png",
    name: "City Therapy",
    industry: "Mental Health & Wellness",
    desc: "Therapist directory and appointment platform with encrypted session notes and teleconsultations.",
    tags: ["React", "Node.js", "HIPAA"],
  },
  {
    logo: "/logos/central23.png",
    name: "Central23",
    industry: "Creative Agency",
    desc: "Portfolio CMS with client collaboration tools, project timelines, and asset delivery system.",
    tags: ["Craft CMS", "Tailwind", "API"],
  },
  {
    logo: "/logos/vivichi.png",
    name: "Vivichi",
    industry: "Beauty & Wellness",
    desc: "Multi-vendor marketplace connecting beauty professionals with local clients and bookings.",
    tags: ["Laravel", "React", "Marketplace"],
  },
  {
    logo: "/logos/tavistock.png",
    name: "Tavistock Tutors",
    industry: "Education & Tutoring",
    desc: "Tutor matching platform with scheduling, video sessions, and automated billing for families.",
    tags: ["PHP", "MySQL", "Zoom API"],
  },
  {
    logo: "/logos/sapnay.png",
    name: "Sapnay",
    industry: "Events & Culture",
    desc: "Event ticketing and community platform with dynamic seating maps and social sharing tools.",
    tags: ["React", "Stripe", "WebSockets"],
  },
  {
    logo: "/logos/ideal-mats.svg",
    name: "Ideal Mats",
    industry: "Home & Commercial",
    desc: "Custom product builder for bespoke floor matting with live preview and trade account management.",
    tags: ["WooCommerce", "JS", "B2B"],
  },
  {
    logo: "/logos/specialist-mats.png",
    name: "Specialist Mats",
    industry: "Safety & Industrial",
    desc: "B2B ordering portal for safety flooring with specification sheets, bulk pricing and logistics.",
    tags: ["PHP", "ERP Integration", "B2B"],
  },
];

/* ── Testimonials ── */
const testimonials = [
  {
    quote: "HireProgrammer delivered our entire platform rebuild in under 12 weeks. The team's communication and technical depth were exceptional — we've never worked with a development partner this reliable.",
    name: "Sarah Mitchell",
    role: "CEO, Amulette London",
    logo: "/logos/amulette.png",
    stars: 5,
  },
  {
    quote: "Our booking conversions increased by 40% after launch. The team understood our business needs immediately and translated them into a flawless user experience. Highly recommended.",
    name: "James Thornton",
    role: "Operations Director, Tavistock Tutors",
    logo: "/logos/tavistock.png",
    stars: 5,
  },
  {
    quote: "We needed a GDPR-compliant, secure client portal fast. HireProgrammer hit every milestone on time and the quality was outstanding. Our clients love the new system.",
    name: "Dr. Priya Anand",
    role: "Founder, London City Skin Clinic",
    logo: "/logos/london-city.png",
    stars: 5,
  },
];

/* ── Stats ── */
const stats = [
  { icon: Users, value: "200+", label: "Clients Served" },
  { icon: Globe, value: "12+", label: "Industries" },
  { icon: Award, value: "98%", label: "Satisfaction Rate" },
  { icon: TrendingUp, value: "10+", label: "Years Delivering" },
];

/* ── Marquee row ── */
function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const logos = clients.map(c => ({ src: c.logo, alt: c.name }));
  const direction = reverse ? "marquee-reverse" : "marquee-fwd";

  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-40 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #080316, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-40 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #080316, transparent)" }} />

      <div className={`flex animate-[${direction}_40s_linear_infinite]`}>
        {[1, 2].map(set => (
          <div key={set} className="flex flex-shrink-0 items-center">
            {logos.map((logo, i) => (
              <div
                key={`${set}-${i}`}
                className="flex items-center justify-center px-10 flex-shrink-0"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-20 w-auto object-contain select-none"
                  style={{ filter: "brightness(0) invert(1)", opacity: 0.65, maxWidth: 240 }}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Testimonial card ── */
function TestimonialCard({ t, index }: { t: typeof testimonials[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className="relative rounded-3xl p-8 flex flex-col gap-6"
      style={{
        background: "rgba(8,3,22,0.88)",
        border: "1px solid rgba(124,58,237,0.14)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Glow */}
      <div
        className="absolute top-0 left-0 w-40 h-40 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${GOLD}08 0%, transparent 70%)`, transform: "translate(-30%,-30%)" }}
      />

      {/* Stars */}
      <div className="flex gap-1 relative z-10">
        {Array.from({ length: t.stars }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-current" style={{ color: GOLD }} />
        ))}
      </div>

      {/* Quote icon */}
      <Quote className="w-8 h-8 relative z-10" style={{ color: `${GOLD}30` }} />

      {/* Quote text */}
      <p className="text-white/70 text-base leading-relaxed italic relative z-10 flex-1">
        "{t.quote}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-4 relative z-10 pt-2 border-t border-white/[0.07]">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}
        >
          <img
            src={t.logo}
            alt={t.name}
            className="h-6 w-auto object-contain"
            style={{ filter: "brightness(0) invert(1)", opacity: 0.7 }}
          />
        </div>
        <div>
          <div className="text-white font-semibold text-sm">{t.name}</div>
          <div className="text-white/40 text-xs">{t.role}</div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Testimonials slider ── */
function TestimonialsSlider() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (next: number) => {
    setDir(next > active ? 1 : -1);
    setActive(next);
  };
  const prev = () => go((active - 1 + testimonials.length) % testimonials.length);
  const next = () => go((active + 1) % testimonials.length);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 80%, rgba(124,58,237,0.05) 0%, transparent 70%)" }} />

      <div className="w-full px-6 lg:px-10 max-w-4xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5"
            style={pillStyle}
          >
            <Star className="w-3 h-3" /> Client Testimonials
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-3xl md:text-5xl font-bold text-white leading-tight"
          >
            What Clients{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">
              Say About Us
            </span>
          </motion.h2>
        </div>

        {/* Slide */}
        <div className="relative overflow-hidden" style={{ minHeight: 340 }}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={active}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <TestimonialCard t={testimonials[active]} index={0} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-10">
          {/* Prev */}
          <button
            onClick={prev}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)" }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = `${GOLD}60`)}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
          >
            <ChevronLeft className="w-5 h-5 text-white/60" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === active ? 28 : 8,
                  height: 8,
                  background: i === active ? GOLD : "rgba(255,255,255,0.18)",
                }}
              />
            ))}
          </div>

          {/* Next */}
          <button
            onClick={next}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)" }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = `${GOLD}60`)}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
          >
            <ChevronRight className="w-5 h-5 text-white/60" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ── Main page ── */
export default function ClientsPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const { scrollY } = useScroll();
  const heroVideoY = useTransform(scrollY, [0, 700], [0, -160]);
  const heroContentY = useTransform(scrollY, [0, 600], [0, -70]);
  const heroOpacity = useTransform(scrollY, [0, 420], [1, 0]);
  const heroGlowY = useTransform(scrollY, [0, 600], [0, -90]);

  const sliderGlowY = "-20%";


  const ctaGlowY = "-25%";

  return (
    <main className="min-h-screen bg-[#080316] text-foreground overflow-x-hidden selection:bg-primary/30">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden pt-20 pb-20">
        {/* Video */}
        <motion.div className="absolute inset-0 scale-[1.2]" style={{ y: heroVideoY }}>
          <video autoPlay loop muted playsInline preload="none" className="w-full h-full object-cover" style={{ opacity: 0.12 }}>
            <source src="/hero_bg_tech_gold.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Animated grid */}
        <motion.div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(124,58,237,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.6) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
          animate={{ backgroundPosition: mounted ? ["0px 0px", "60px 60px"] : "0px 0px" }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        {/* Glow */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ y: heroGlowY }}>
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 65% 55% at 50% 60%, rgba(124,58,237,0.14) 0%, transparent 70%)" }} />
        </motion.div>

        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(8,3,22,0.65) 0%, rgba(8,3,22,0.45) 50%, rgba(8,3,22,0.82) 100%)" }} />

        {/* Content */}
        <motion.div className="relative z-10 text-center px-6 max-w-3xl mx-auto" style={{ y: heroContentY, opacity: heroOpacity }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-6"
            style={pillStyle}
          >
            <Users className="w-3 h-3" /> 200+ Businesses Trust Us
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-bold leading-[1.05] mb-5 tracking-tight"
          >
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">
              Clients
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-white/50 text-xl leading-relaxed max-w-xl mx-auto"
          >
            From London startups to established UK businesses — we've helped them all build and scale with elite engineering.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Stats strip ── */}
      <div style={{ background: "rgba(6,2,16,0.95)", borderTop: "1px solid rgba(124,58,237,0.12)", borderBottom: "1px solid rgba(124,58,237,0.12)" }}>
        <div className="w-full px-6 lg:px-10 max-w-7xl mx-auto py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-y-2 md:divide-y-0 md:divide-x divide-white/[0.07]">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="flex flex-col items-center justify-center gap-2 px-6 py-6 text-center"
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-1"
                    style={{ background: "rgba(124,58,237,0.10)", border: "1px solid rgba(124,58,237,0.22)" }}>
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-3xl font-black" style={{ color: GOLD }}>{s.value}</div>
                  <div className="text-white/40 text-xs uppercase tracking-widest font-semibold">{s.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Logo slider section ── */}
      <section className="py-20 relative overflow-hidden">
        <motion.div className="absolute inset-0 pointer-events-none" style={{ y: sliderGlowY }}>
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(124,58,237,0.05) 0%, transparent 70%)" }} />
        </motion.div>

        <div className="w-full px-6 lg:px-10 max-w-7xl mx-auto mb-12 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5"
            style={pillStyle}
          >
            <Globe className="w-3 h-3" /> Trusted Brands
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-3xl md:text-5xl font-bold text-white leading-tight"
          >
            Companies That{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">
              Choose Us
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className="text-white/40 text-lg mt-4 max-w-md mx-auto"
          >
            Across retail, healthcare, finance, education and more.
          </motion.p>
        </div>

        {/* Single marquee */}
        <div className="relative z-10">
          <MarqueeRow />
        </div>

        <style>{`
          @keyframes marquee-fwd {
            0%   { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* Divider */}
      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4) 50%, transparent)" }} />

      {/* ── Testimonials slider ── */}
      <TestimonialsSlider />

      {/* Divider */}
      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4) 50%, transparent)" }} />

      {/* ── CTA ── */}
      <section className="py-24 relative overflow-hidden">
        <motion.div className="absolute inset-0 pointer-events-none" style={{ y: ctaGlowY }}>
          <motion.div
            animate={{ opacity: mounted ? [0.4, 0.7, 0.4] : 0.4 }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.07) 0%, transparent 50%, rgba(124,58,237,0.07) 100%)" }}
          />
        </motion.div>
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.5) 50%, transparent)" }} />
        <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.3) 50%, transparent)" }} />

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight"
          >
            Ready to join our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C060FF] to-[#E040FF]">
              client family?
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/50 text-lg mb-10 leading-relaxed"
          >
            Let's talk about your project. Free consultation, no commitment.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.18 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="/contact-us"
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(124,58,237,0.45)]"
              style={{ background: "#7C3AED", color: "#ffffff" }}
            >
              Get in Touch <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
