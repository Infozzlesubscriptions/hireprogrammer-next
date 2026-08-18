"use client";

import { motion } from "framer-motion";
import { PhoneCall, MessageSquare, FileText, Rocket } from "lucide-react";

const steps = [
  {
    icon: <PhoneCall className="w-6 h-6" />,
    title: "Call/Email",
    description: "Reach out to us with your initial requirements.",
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Discuss Needs",
    description: "We dive deep into your tech stack and project goals.",
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Upfront Quote",
    description: "Transparent pricing and timelines with no hidden fees.",
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    title: "Delivery",
    description: "Our elite developers start building immediately.",
  }
];

export function Process() {
  return (
    <section className="py-14 relative overflow-hidden" style={{ background: "#080316" }}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            How We <span className="text-primary">Work</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/65 text-lg"
          >
            A streamlined process designed to get you the talent you need in record time.
          </motion.p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative flex flex-col items-center text-center group"
              >
                <div className="w-24 h-24 rounded-full bg-card border border-white/10 flex items-center justify-center text-primary mb-6 relative z-10 group-hover:scale-110 group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(124,58,237,0.3)] transition-all duration-300">
                  <div className="absolute inset-0 rounded-full bg-primary/5 animate-ping opacity-0 group-hover:opacity-100" style={{ animationDuration: '2s' }} />
                  {step.icon}
                </div>
                <div className="text-xl font-bold mb-2 text-white">{step.title}</div>
                <p className="text-sm text-white/65 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
