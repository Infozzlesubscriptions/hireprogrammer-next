"use client";

import { motion } from "framer-motion";
import { MapPin, Globe2, Award, ShieldCheck, Clock, Users, Zap } from "lucide-react";

export function About() {

  const cards = [
    {
      icon: Globe2,
      title: "Fluent English Communication",
      body: "Direct access to UK-based tech leads and project managers — daily standups, clear updates, zero language barriers.",
      tag: "No middle-men",
    },
    {
      icon: ShieldCheck,
      title: "UK-Compliant & Regulated",
      body: "We operate under UK employment law, GDPR compliance, and IR35-aware contracts. No legal headaches, ever.",
      tag: "GDPR · IR35 ready",
    },
    {
      icon: Award,
      title: "Top 1% Global Talent",
      body: "Every developer passes a rigorous 5-stage technical screening. Only the top performers join our network.",
      tag: "Vetted & verified",
    },
    {
      icon: Clock,
      title: "24-Hour Onboarding",
      body: "Stop waiting months to build a team. Your dedicated engineer can be coding in your codebase within 24 hours.",
      tag: "Same-day kick-off",
    },
  ];

  return (
    <section id="about" className="py-14 relative overflow-hidden" style={{ background: "#0B0418" }}>
      {/* Ambient glow */}
      <div
        style={{ background: "radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)" }}
        className="absolute top-1/2 right-0 w-[500px] h-[500px] -translate-y-1/2 translate-x-1/3 rounded-full pointer-events-none"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center max-w-7xl mx-auto">

          {/* ── Left: text content ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/25 bg-primary/6 text-primary text-xs font-medium mb-7">
              <MapPin className="w-3.5 h-3.5" />
              Based in London, UK
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white leading-[1.1]">
              Elite Engineering,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">
                Locally Managed
              </span>
            </h2>

            <p className="text-white/72 text-lg leading-relaxed mb-8 max-w-lg">
              HireProgrammer bridges global engineering talent with UK business standards. Unlike traditional offshore agencies, you work directly with fluent English-speaking leads who understand your market, compliance needs, and culture.
            </p>

            {/* Divider */}
            <div className="h-px w-full mb-8" style={{ background: "linear-gradient(90deg, rgba(124,58,237,0.3) 0%, transparent 70%)" }} />

            {/* Key metrics row */}
            <div className="grid grid-cols-3 gap-6 mb-10">
              {[
                { icon: Users, value: "47+", label: "Expert engineers" },
                { icon: Zap, value: "24hr", label: "Onboarding time" },
                { icon: Award, value: "98%", label: "Client satisfaction" },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex flex-col gap-1.5">
                  <Icon className="w-5 h-5 text-primary/70 mb-1" />
                  <div className="text-2xl font-bold text-white">{value}</div>
                  <div className="text-xs text-white/40">{label}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="/about-us"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm transition-colors duration-200 hover:opacity-90"
              style={{ background: "#7C3AED", color: "#ffffff" }}
            >
              Meet Our Team
            </a>
          </motion.div>

          {/* ── Right: stacked feature cards ── */}
          <div className="flex flex-col gap-3">
            {cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                  className="flex items-start gap-5 p-5 rounded-2xl group cursor-default"
                  style={{
                    background: "rgba(20,12,40,0.88)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    backdropFilter: "blur(8px)",
                    boxShadow: "0 0 40px rgba(124,58,237,0.06)",
                  }}
                >
                  {/* Icon badge */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-300 group-hover:bg-primary/20"
                    style={{ background: "rgba(124,58,237,0.10)", border: "1px solid rgba(124,58,237,0.20)" }}
                  >
                    <Icon className="w-5 h-5 text-primary" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3 mb-1.5">
                      <h3 className="text-sm font-semibold text-white">{card.title}</h3>
                      <span
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0"
                        style={{ background: "rgba(124,58,237,0.10)", color: "rgba(124,58,237,0.8)", border: "1px solid rgba(124,58,237,0.15)" }}
                      >
                        {card.tag}
                      </span>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed">{card.body}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
