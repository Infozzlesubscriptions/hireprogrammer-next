"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";

const stats = [
  { value: 1200, suffix: "+", label: "Projects Delivered" },
  { value: 47, suffix: "", label: "Expert Programmers" },
  { value: 20, prefix: "£", suffix: "/hr", label: "Starting Rate" },
  { value: 98, suffix: "%", label: "Client Satisfaction" }
];

export function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const targets = document.querySelectorAll(".stat-number");
      targets.forEach((target) => {
        const endValue = parseFloat(target.getAttribute("data-value") || "0");
        gsap.to(target, {
          innerHTML: endValue,
          duration: 2,
          ease: "power2.out",
          snap: { innerHTML: 1 },
          onUpdate: function() {
            target.innerHTML = Math.round(Number(this.targets()[0].innerHTML)).toString();
          }
        });
      });
    }
  }, [isInView]);

  return (
    <section className="py-14 relative overflow-hidden" ref={containerRef} style={{ background: "#120624" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle at center, rgba(124,58,237,0.12) 0%, transparent 70%)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/25 blur-[150px] rounded-[100%] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-6xl font-bold text-white mb-2 flex items-center justify-center">
                {stat.prefix && <span className="text-primary">{stat.prefix}</span>}
                <span className="stat-number text-primary" data-value={stat.value}>0</span>
                {stat.suffix && <span className="text-primary">{stat.suffix}</span>}
              </div>
              <div className="text-sm md:text-base text-white/60 uppercase tracking-wider font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
