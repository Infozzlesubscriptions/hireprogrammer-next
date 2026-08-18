"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform, animate, AnimatePresence } from "framer-motion";
import { BrainCircuit, Users, LineChart, Cpu, Zap, Check, GitMerge } from "lucide-react";

/* ── Animated number ── */
function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    let controls: ReturnType<typeof animate> | null = null;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        controls = animate(0, target, {
          duration: 1.6, ease: "easeOut",
          onUpdate: (v) => setVal(Math.round(v)),
        });
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => { observer.disconnect(); controls?.stop(); };
  }, [target]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

/* ── Typing code terminal ── */
const CODE_LINES = [
  "const api = new HireAPI();",
  "await api.match({ stack: 'React' });",
  "// ✓ Found 12 elite devs",
  "const dev = await api.hire();",
  "// ✓ Onboarded in 24 hrs",
];
function TypingCode() {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  useEffect(() => {
    const cursor = setInterval(() => setShowCursor(p => !p), 530);
    return () => clearInterval(cursor);
  }, []);
  useEffect(() => {
    if (currentLine >= CODE_LINES.length) {
      const reset = setTimeout(() => { setLines([]); setCurrentLine(0); setCurrentChar(0); }, 2200);
      return () => clearTimeout(reset);
    }
    const line = CODE_LINES[currentLine];
    if (currentChar < line.length) {
      const t = setTimeout(() => setCurrentChar(c => c + 1), 38);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setLines(prev => [...prev, line]);
        setCurrentLine(l => l + 1);
        setCurrentChar(0);
      }, 320);
      return () => clearTimeout(t);
    }
  }, [currentLine, currentChar]);
  const activeLine = currentLine < CODE_LINES.length ? CODE_LINES[currentLine].slice(0, currentChar) : "";
  return (
    <div className="rounded-2xl p-5 font-mono text-[12px] leading-7 overflow-hidden w-full"
      style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(124,58,237,0.15)" }}>
      <div className="flex gap-1.5 mb-4">
        {["#ff5f57","#febc2e","#28c840"].map(c => (
          <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
        ))}
      </div>
      {lines.map((l, i) => (
        <div key={i} className={l.startsWith("//") ? "text-blue-400/90" : "text-white/70"}>{l}</div>
      ))}
      {currentLine < CODE_LINES.length && (
        <div className={activeLine.startsWith("//") ? "text-blue-400/90" : "text-white/70"}>
          {activeLine}<span className={`inline-block w-[2px] h-[14px] ml-0.5 align-middle ${showCursor ? "bg-primary" : "opacity-0"}`} />
        </div>
      )}
    </div>
  );
}

/* ── Animated bar chart ── */
function AnimatedChart() {
  const bars = [38, 55, 42, 70, 60, 85, 75, 92, 80, 100];
  return (
    <div className="w-full">
      <div className="flex items-end gap-1.5 h-32 mb-3">
        {bars.map((h, i) => (
          <motion.div key={i} className="flex-1 rounded-sm"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 * i + 0.2, duration: 0.5, ease: "easeOut" }}
            style={{
              height: `${h}%`, transformOrigin: "bottom",
              background: i === 9 ? "#7C3AED" : `rgba(124,58,237,${0.12 + i * 0.08})`,
            }}
          />
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-white/30">
        {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct"].map(m => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </div>
  );
}

/* ── Pipeline animation ── */
function Pipeline() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const steps = [
    { label: "Plan", icon: "✦" },
    { label: "Build", icon: "⬡" },
    { label: "Review", icon: "◈" },
    { label: "Deploy", icon: "⬢" },
  ];
  return (
    <div className="w-full">
      <div className="flex items-center">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center flex-1">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 + 0.1, type: "spring", stiffness: 260 }}
              className="flex flex-col items-center gap-2 flex-shrink-0"
            >
              <motion.div
                animate={{ boxShadow: mounted ? ["0 0 0px rgba(124,58,237,0)", "0 0 20px rgba(124,58,237,0.6)", "0 0 0px rgba(124,58,237,0)"] : "0 0 0px rgba(124,58,237,0)" }}
                transition={{ duration: 2.5, delay: i * 0.5, repeat: Infinity }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm"
                style={{ background: "rgba(124,58,237,0.15)", border: "1.5px solid rgba(124,58,237,0.45)" }}
              >
                <Check className="w-4 h-4 text-primary" />
              </motion.div>
              <span className="text-[11px] text-white/50 whitespace-nowrap">{s.label}</span>
            </motion.div>
            {i < steps.length - 1 && (
              <motion.div
                initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                transition={{ delay: i * 0.2 + 0.3, duration: 0.5 }}
                className="flex-1 h-px mx-2"
                style={{ background: "linear-gradient(90deg,rgba(124,58,237,0.5),rgba(124,58,237,0.1))", transformOrigin: "left" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Team avatars ── */
function Avatars() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const members = [
    { initials: "JD", bg: "rgba(124,58,237,0.9)" },
    { initials: "SK", bg: "rgba(20,64,220,0.85)" },
    { initials: "AM", bg: "rgba(80,120,255,0.9)" },
    { initials: "PW", bg: "rgba(14,48,200,0.85)" },
  ];
  return (
    <div className="space-y-5">
      <div className="flex -space-x-3">
        {members.map((m, i) => (
          <motion.div key={i}
            initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: i * 0.1 + 0.2, type: "spring", stiffness: 200 }}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[11px] font-bold border-2 text-black"
            style={{ background: m.bg, borderColor: "#080316", zIndex: members.length - i }}
          >
            {m.initials}
          </motion.div>
        ))}
        <motion.div initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          className="w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-medium border-2"
          style={{ background: "rgba(255,255,255,0.07)", borderColor: "#080316", color: "rgba(255,255,255,0.5)" }}
        >+9</motion.div>
      </div>
      <div className="space-y-2.5">
        {["James D · React Lead", "Sarah K · DevOps", "Alex M · Fullstack"].map((name, i) => (
          <motion.div key={name}
            initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.1 + 0.3 }}
            className="flex items-center gap-2.5 text-[12px]"
          >
            <motion.span animate={{ opacity: mounted ? [1, 0.3, 1] : 1 }} transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.4 }}
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: "#7C3AED" }}
            />
            <span className="text-white/60">{name}</span>
            <span className="ml-auto text-primary/60 text-[10px]">active</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Tab definitions ── */
const TABS = [
  {
    id: "ai", icon: BrainCircuit, label: "AI Automation",
    title: "Ship 3× faster with\nAI-powered engineers",
    description: "Our developers use cutting-edge AI tooling — Cursor, Copilot, custom agents — to write cleaner code faster, catch bugs before they ship, and deploy with confidence.",
    stats: [{ value: 3, suffix: "×", label: "Faster delivery" }, { value: 68, suffix: "%", label: "Bug reduction" }],
    Visual: TypingCode,
  },
  {
    id: "team", icon: Users, label: "Team Integration",
    title: "Drops into your\nexisting workflow",
    description: "Integrated into your Slack, Jira, Linear or GitHub from day one. Your dedicated team communicates like an in-house hire — daily standups, PR reviews, async updates.",
    stats: [{ value: 13, suffix: "+", label: "Integrations" }, { value: 24, suffix: "hr", label: "Onboarding" }],
    Visual: Avatars,
  },
  {
    id: "analytics", icon: LineChart, label: "Live Analytics",
    title: "Full visibility on\ndeveloper velocity",
    description: "Track sprint progress, deployment frequency, bug rates and code quality in real-time. You always know exactly what your team is building and how fast.",
    stats: [{ value: 98, suffix: "%", label: "On-time delivery" }, { value: 100, suffix: "%", label: "Transparency" }],
    Visual: AnimatedChart,
  },
  {
    id: "pipeline", icon: Cpu, label: "CI/CD Pipeline",
    title: "Automated reviews\nand deployments",
    description: "Every project ships with automated code review, test coverage gates, and zero-downtime CI/CD pipelines baked in. No setup required — we bring the DevOps.",
    stats: [{ value: 99.9, suffix: "%", label: "Uptime SLA" }, { value: 0, suffix: " manual\ndeploys", label: "" }],
    Visual: Pipeline,
  },
];

/* ── Main section ── */
export function Features() {
  const [active, setActive] = useState(0);

  return (
    <section id="features" className="py-14 relative overflow-hidden" style={{ background: "#0B0418" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(124,58,237,0.09) 0%, transparent 70%)" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-5 leading-tight"
          >
            Powered by{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">
              Intelligence
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/65 text-lg leading-relaxed"
          >
            Elite UK talent combined with AI workflows to ship software at unprecedented speed.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="max-w-5xl mx-auto"
        >
          {/* Tab bar */}
          <div className="flex items-center justify-center gap-1 mb-8 p-1.5 rounded-2xl w-fit mx-auto"
            style={{ background: "rgba(20,12,40,0.80)", border: "1px solid rgba(255,255,255,0.09)" }}>
            {TABS.map((tab, i) => {
              const Icon = tab.icon;
              const isActive = active === i;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActive(i)}
                  className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200"
                  style={{ color: isActive ? "#ffffff" : "rgba(255,255,255,0.45)" }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="tab-bg"
                      className="absolute inset-0 rounded-xl"
                      style={{ background: "#7C3AED" }}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Feature card */}
          <div className="rounded-3xl overflow-hidden"
            style={{ background: "rgba(8,3,22,0.9)", border: "1px solid rgba(124,58,237,0.14)", backdropFilter: "blur(16px)" }}>
            <AnimatePresence mode="wait">
              {TABS.map((tab, i) => {
                if (active !== i) return null;
                const Icon = tab.icon;
                const Visual = tab.Visual;
                return (
                  <motion.div
                    key={tab.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="grid md:grid-cols-2 gap-0 min-h-[400px]"
                  >
                    {/* Left: content */}
                    <div className="p-10 flex flex-col justify-between"
                      style={{ borderRight: "1px solid rgba(124,58,237,0.08)" }}>
                      <div>
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-7"
                          style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.25)" }}>
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight whitespace-pre-line">
                          {tab.title}
                        </h3>
                        <p className="text-white/70 text-sm leading-relaxed max-w-sm">
                          {tab.description}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="flex gap-8 pt-8 mt-8"
                        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                        {tab.stats.map(({ value, suffix, label }) => (
                          <div key={label}>
                            <div className="text-3xl font-bold text-primary leading-none mb-1">
                              <AnimatedNumber target={value} suffix={suffix} />
                            </div>
                            <div className="text-xs text-white/40 whitespace-pre-line">{label}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: visual */}
                    <div className="p-10 flex items-center justify-center"
                      style={{ background: "rgba(124,58,237,0.02)" }}>
                      <div className="w-full">
                        <Visual />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Bottom feature pills */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {[
              { icon: GitMerge, text: "Auto code review" },
              { icon: Zap, text: "Same-day kick-off" },
              { icon: Check, text: "UK-based QA leads" },
              { icon: Users, text: "Dedicated team" },
            ].map(({ icon: Icon, text }, i) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.07 + 0.1 }}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm text-white/65"
                style={{ background: "rgba(20,12,40,0.75)", border: "1px solid rgba(255,255,255,0.09)" }}
              >
                <Icon className="w-3.5 h-3.5 text-primary/70 flex-shrink-0" />
                {text}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
