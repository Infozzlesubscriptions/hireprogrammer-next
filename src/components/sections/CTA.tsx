"use client";

import { motion } from "framer-motion";
import { useQuoteModal } from "@/context/QuoteModalContext";

export function CTA() {
  const { openQuoteModal } = useQuoteModal();

  return (
    <section className="py-14 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#080316] to-[#140828]" />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/10 blur-[150px] rounded-[100%] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-primary/10 blur-[120px] rounded-[100%] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto bg-card/30 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-12 md:p-20 text-center shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white">
            Ready to hire <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C060FF] to-[#E040FF]">elite programmers?</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Stop waiting months to build your tech team. Get a free quote today and start building the future with our UK-based engineering talent.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={() => openQuoteModal()}
              className="inline-flex items-center justify-center w-full sm:w-auto h-14 px-8 text-base rounded-full font-semibold transition-all duration-200 hover:scale-105"
              style={{ background: "#ffffff", color: "#080316" }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "linear-gradient(135deg, #9B3FFF 0%, #7C3AED 55%, #5B21B6 100%)";
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.boxShadow = "0 0 28px rgba(124,58,237,0.6)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "#ffffff";
                e.currentTarget.style.color = "#080316";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Get Free Quote
            </button>
            <a
              href="/contact-us"
              className="inline-flex items-center justify-center w-full sm:w-auto h-14 px-8 text-base rounded-full font-semibold transition-all duration-200 hover:bg-white/5"
              style={{ border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff" }}
            >
              Contact Us
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-white/10">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Call Us</div>
              <div className="font-medium text-white">0208 058 9005</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Email</div>
              <div className="font-medium text-white">contact@hireprogrammer.co.uk</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Address</div>
              <div className="font-medium text-white">80 Telford Ave, London, SW2 4XF</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
