"use client";

import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Mail, Wrench } from "lucide-react";

const LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/services", label: "Our Services", icon: Wrench },
  { href: "/contact-us", label: "Contact Us", icon: Mail },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#080316] text-foreground flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="max-w-xl w-full text-center">

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div
              className="inline-block text-[120px] sm:text-[160px] font-black leading-none tracking-tighter select-none"
              style={{
                background: "linear-gradient(135deg, #9B3FFF 0%, #7C3AED 50%, #5B21B6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              404
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <h1 className="text-2xl sm:text-3xl font-black text-white mb-4">
              Page Not Found
            </h1>
            <p className="text-white/50 text-base leading-relaxed mb-10 max-w-sm mx-auto">
              The page you're looking for doesn't exist or may have been moved.
              Here are some helpful links instead.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10"
          >
            {LINKS.map(({ href, label, icon: Icon }) => (
              <a
                key={href}
                href={href}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105"
                style={{
                  background: "rgba(124,58,237,0.10)",
                  border: "1px solid rgba(124,58,237,0.25)",
                  color: "#C4B5FD",
                }}
              >
                <Icon className="w-4 h-4" />
                {label}
              </a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.4 }}
          >
            <a
              href="/"
              className="inline-flex items-center gap-2 text-sm text-white/35 hover:text-white/70 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to homepage
            </a>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
