"use client";

import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { QuoteModal } from "@/components/sections/QuoteModal";

export function Hero() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section
      className="relative min-h-[100dvh] overflow-hidden flex flex-col"
      style={{ background: "#080316" }}
    >
      {/* ── Video background ── */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
          style={{ opacity: 0.95 }}
        >
          <source src={`/globe-bg.mp4`} type="video/mp4" />
        </video>
        {/* Black overlay */}
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.55)" }} />
        {/* Subtle dark vignette so text stays readable */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(8,3,22,0.10) 0%, rgba(8,3,22,0.45) 100%)",
          }}
        />
      </div>
      {/* ── Centred text content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 pt-[clamp(6rem,14vw,10rem)] flex-1">
        {/* Headline — no opacity animation so it is the LCP element immediately */}
        <h1
          className="font-bold leading-[1.1] tracking-tight mb-5 text-white"
          style={{ fontSize: "clamp(2.4rem,5.2vw,4.4rem)" }}
        >
          Hire Expert{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(135deg, #e070ff 0%, #a040ff 50%, #c040ff 100%)" }}
          >
            Software Developers
          </span>
          <br /> in the UK
        </h1>

        {/* Subheading */}
        <motion.p
          initial={mounted ? { opacity: 0, y: 18 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.65 }}
          className="text-base sm:text-lg leading-relaxed mb-9 max-w-lg"
          style={{ color: "rgba(220,200,255,0.68)" }}
        >
          UK-based engineers on demand — from £20/hr. No contracts, no minimums.
          Delivered fast, built to last.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={mounted ? { opacity: 0, y: 16 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.55 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          <button
            onClick={() => setQuoteOpen(true)}
            className="inline-flex items-center gap-2 h-12 px-8 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_24px_rgba(255,255,255,0.35)]"
            style={{
              background: "#ffffff",
              color: "#080316",
            }}
            data-testid="button-get-quote"
          >
            Get Free Quote <ChevronRight className="w-4 h-4" />
          </button>
          <a
            href="/about-us"
            className="inline-flex items-center gap-2 h-12 px-8 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 hover:bg-white/10"
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.6)",
              color: "#ffffff",
            }}
            data-testid="button-learn-more"
          >Why Choose Us</a>
        </motion.div>
      </div>
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </section>
  );
}
