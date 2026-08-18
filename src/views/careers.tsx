"use client";

import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { motion } from "framer-motion";
import { Mail, Code2, Globe, Cpu, Shield, Smartphone } from "lucide-react";

const GOLD = "#7C3AED";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

const DISCIPLINES = [
  { icon: Globe, label: "Full-Stack Web Development", stack: "React, Laravel, PHP, Node.js" },
  { icon: Code2, label: "CMS & E-Commerce", stack: "WordPress, WooCommerce, Shopify, Magento" },
  { icon: Cpu, label: "AI & Machine Learning", stack: "Python, LangChain, OpenAI, RAG" },
  { icon: Smartphone, label: "Mobile Development", stack: "React Native, Flutter, iOS, Android" },
  { icon: Shield, label: "DevOps & Security", stack: "Linux, Docker, Pen Testing, SIEM" },
];

const PERKS = [
  { title: "Remote-first", body: "Work from anywhere. Our team spans the UK, Europe and South Asia." },
  { title: "Flexible hours", body: "Core overlap hours only. Build your schedule around the work, not the clock." },
  { title: "Interesting clients", body: "Projects range from early-stage startups to established UK businesses." },
  { title: "No bureaucracy", body: "Small teams, short feedback loops, and direct communication with clients." },
];

export default function Careers() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <div
        className="pt-32 pb-20 px-6 text-center"
        style={{ background: "linear-gradient(180deg,#0d0720 0%,#080316 100%)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
            style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)", color: GOLD }}
          >
            Join Our Team
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-5">
            Careers at Hire Programmer
          </h1>
          <p className="text-base sm:text-lg max-w-lg mx-auto leading-relaxed" style={{ color: "rgba(220,200,255,0.6)" }}>
            We connect talented developers with clients who need real expertise.
            We're always looking for people who care about their craft.
          </p>
        </motion.div>
      </div>

      {/* Open roles notice */}
      <div className="container mx-auto px-6 lg:px-10 py-16 max-w-4xl">

        <motion.div
          {...fadeUp(0)}
          className="rounded-2xl p-8 mb-16 text-center"
          style={{ background: "rgba(124,58,237,0.07)", border: "1px solid rgba(124,58,237,0.20)" }}
        >
          <h2 className="text-white font-bold text-2xl mb-3">No Open Listings Right Now</h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
            We don't have any formally listed roles at the moment, but we're always
            interested in hearing from strong developers. Send us a brief introduction
            and we'll keep your details on file for upcoming projects.
          </p>
          <a
            href="mailto:contact@hireprogrammer.co.uk?subject=Developer%20Application"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105"
            style={{ background: GOLD, color: "#ffffff" }}
          >
            <Mail className="w-4 h-4" />
            Send Us Your CV
          </a>
        </motion.div>

        {/* Disciplines */}
        <motion.div {...fadeUp(0.05)} className="mb-16">
          <h2 className="text-white font-bold text-2xl mb-2">Areas We Hire For</h2>
          <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
            Disciplines we recruit across on a rolling basis.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DISCIPLINES.map(({ icon: Icon, label, stack }) => (
              <div
                key={label}
                className="rounded-xl p-5 flex gap-4 items-start"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.22)" }}
                >
                  <Icon className="w-4 h-4" style={{ color: GOLD }} />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm mb-1">{label}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>{stack}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Perks */}
        <motion.div {...fadeUp(0.08)} className="mb-16">
          <h2 className="text-white font-bold text-2xl mb-2">What to Expect</h2>
          <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
            How we work with our developer network.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {PERKS.map(({ title, body }) => (
              <div
                key={title}
                className="rounded-xl p-6"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <p className="font-bold text-white mb-2">{title}</p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{body}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          {...fadeUp(0.1)}
          className="rounded-2xl p-10 text-center"
          style={{ background: "linear-gradient(135deg,rgba(124,58,237,0.12),rgba(160,64,255,0.06))", border: "1px solid rgba(124,58,237,0.22)" }}
        >
          <h2 className="text-white font-black text-2xl mb-3">Interested?</h2>
          <p className="text-sm leading-relaxed mb-6 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
            Email us your CV and a short note about your experience and the type of work
            you're looking for. We'll respond within 2 business days.
          </p>
          <a
            href="mailto:contact@hireprogrammer.co.uk?subject=Developer%20Application"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_28px_rgba(124,58,237,0.4)]"
            style={{ background: GOLD, color: "#ffffff" }}
          >
            <Mail className="w-4 h-4" />
            contact@hireprogrammer.co.uk
          </a>
        </motion.div>

      </div>

      <Footer />
    </div>
  );
}
