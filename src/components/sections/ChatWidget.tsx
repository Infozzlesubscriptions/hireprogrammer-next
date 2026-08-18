"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, ChevronRight, Loader2 } from "lucide-react";

/* ── Types ── */
interface LeadData {
  name: string;
  email: string;
  company: string;
  need: string;
}

interface Message {
  id: number;
  from: "bot" | "user";
  text: string;
  options?: string[];
}

/* ── Bot brain ── */
const BOT_INTRO = (name: string): Message => ({
  id: Date.now(),
  from: "bot",
  text: `Hi ${name}! 👋 I'm the HireProgrammer assistant. I can help you find the right engineering talent, explain our process, or get you a quote. What would you like to know?`,
  options: ["How does hiring work?", "What are your rates?", "How fast can you start?", "What tech stacks?", "Book a free call"],
});

const RESPONSES: { keywords: string[]; reply: string; options?: string[] }[] = [
  {
    keywords: ["how", "work", "process", "hire", "hiring"],
    reply: "Our process is simple:\n\n1. **Call/Email** — tell us your requirements\n2. **Discuss Needs** — we deep-dive into your tech stack\n3. **Upfront Quote** — transparent pricing, no hidden fees\n4. **Delivery** — engineers start within 24 hours\n\nWe handle all the screening so you only meet pre-vetted talent.",
    options: ["What are your rates?", "How fast can you start?", "Get a free quote"],
  },
  {
    keywords: ["rate", "rates", "price", "pricing", "cost", "much", "fee"],
    reply: "Our rates are transparent and flexible:\n\n• **Starter** — £20/hr (junior–mid developers)\n• **Professional** — £30/hr (senior engineers, AI workflows, advanced integrations)\n\nNo lock-in contracts. Scale up or down anytime. All rates include UK-based project management.",
    options: ["How does hiring work?", "How fast can you start?", "Get a free quote"],
  },
  {
    keywords: ["fast", "quick", "soon", "start", "when", "onboard", "24"],
    reply: "⚡ We're known for speed. Once you confirm, your developer can be:\n\n• **Added to your Slack/GitHub** — same day\n• **Reading your codebase** — within hours\n• **Writing code** — within 24 hours\n\nWe've successfully onboarded engineers in 48 hours for critical demos.",
    options: ["What are your rates?", "What tech stacks?", "Get a free quote"],
  },
  {
    keywords: ["tech", "stack", "language", "react", "node", "python", "java", "mobile", "flutter", "native"],
    reply: "Our engineers cover a wide range of technologies:\n\n**Frontend:** React, Vue, Angular, Next.js\n**Backend:** Node.js, Laravel, PHP, Python, Java, .NET\n**Mobile:** React Native, Flutter (iOS & Android)\n**Cloud/DevOps:** AWS, GCP, Linux, Docker, CI/CD\n**AI/ML:** LLMs, custom agents, AI-assisted workflows\n\nDon't see your stack? Just ask — we likely have someone.",
    options: ["What are your rates?", "How fast can you start?", "Get a free quote"],
  },
  {
    keywords: ["ai", "artificial", "intelligence", "machine", "learning", "llm", "gpt"],
    reply: "Our developers are AI-native. They use tools like Cursor, GitHub Copilot, and custom AI agents to deliver code **3× faster** than traditional developers with **68% fewer bugs**.\n\nWe also build AI-powered products — LLM integrations, custom agents, RAG pipelines, and more.",
    options: ["What tech stacks?", "What are your rates?", "Get a free quote"],
  },
  {
    keywords: ["quote", "call", "contact", "book", "consultation", "free", "talk"],
    reply: "I'd love to connect you with our team! You can reach us directly:\n\n📧 **contact@hireprogrammer.co.uk**\n\nOr fill out our contact form on the site for a callback within 2 hours during business hours (Mon–Fri, 9am–6pm UK).",
    options: ["How does hiring work?", "What are your rates?", "What tech stacks?"],
  },
  {
    keywords: ["uk", "london", "based", "location", "where", "offshore"],
    reply: "We're **headquartered in London, UK** 🇬🇧\n\nOur engineering talent is distributed globally (giving you the best developers at competitive rates), but all project management, communication, and quality control is handled by our UK-based leads.\n\nThis means UK business standards, GDPR compliance, and IR35-aware contracts.",
    options: ["What are your rates?", "How does hiring work?", "Get a free quote"],
  },
  {
    keywords: ["gdpr", "ir35", "legal", "contract", "compliance", "law"],
    reply: "We take compliance seriously:\n\n✅ **GDPR compliant** — all data handling follows UK/EU regulations\n✅ **IR35 aware** — our contracts are structured to protect you\n✅ **UK employment law** — operating under full UK legal standards\n\nNo legal headaches, ever.",
    options: ["How does hiring work?", "What are your rates?", "Get a free quote"],
  },
];

function getBotReply(input: string): { reply: string; options?: string[] } {
  const lower = input.toLowerCase();
  for (const r of RESPONSES) {
    if (r.keywords.some(k => lower.includes(k))) {
      return { reply: r.reply, options: r.options };
    }
  }
  return {
    reply: "Great question! I'd recommend speaking directly with our team for the most accurate answer. You can email us at **contact@hireprogrammer.co.uk** or use the contact form on our site.",
    options: ["How does hiring work?", "What are your rates?", "Get a free quote"],
  };
}

/* ── Markdown-lite renderer ── */
function BotText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <p className="text-sm leading-relaxed whitespace-pre-line">
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**")
          ? <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>
          : <span key={i}>{part}</span>
      )}
    </p>
  );
}

/* ── Lead form ── */
function LeadForm({ onSubmit }: { onSubmit: (data: LeadData) => void }) {
  const [form, setForm] = useState<LeadData>({ name: "", email: "", company: "", need: "" });
  const [errors, setErrors] = useState<Partial<LeadData>>({});

  const validate = () => {
    const e: Partial<LeadData> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    return e;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4">
      <div className="flex flex-col gap-1">
        <div
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl"
          style={{ background: "rgba(124,58,237,0.10)", border: "1px solid rgba(124,58,237,0.25)" }}
        >
          <Bot className="w-4 h-4 text-primary flex-shrink-0" />
          <p className="text-sm text-white/80">
            Hi! Before we chat, let me grab a few quick details so I can help you better.
          </p>
        </div>
      </div>

      {[
        { key: "name", label: "Your Name *", placeholder: "e.g. Sarah Johnson", type: "text" },
        { key: "email", label: "Work Email *", placeholder: "sarah@company.com", type: "email" },
        { key: "company", label: "Company (optional)", placeholder: "e.g. Acme Corp", type: "text" },
      ].map(({ key, label, placeholder, type }) => (
        <div key={key} className="flex flex-col gap-1">
          <label className="text-xs text-white/50 font-medium">{label}</label>
          <input
            type={type}
            placeholder={placeholder}
            value={form[key as keyof LeadData]}
            onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
            className="w-full px-3 py-2 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: `1px solid ${errors[key as keyof LeadData] ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.08)"}`,
            }}
          />
          {errors[key as keyof LeadData] && (
            <span className="text-xs text-red-400">{errors[key as keyof LeadData]}</span>
          )}
        </div>
      ))}

      <div className="flex flex-col gap-1">
        <label className="text-xs text-white/50 font-medium">What are you looking for?</label>
        <select
          value={form.need}
          onChange={e => setForm(f => ({ ...f, need: e.target.value }))}
          className="w-full px-3 py-2 rounded-xl text-sm text-white outline-none transition-all appearance-none"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <option value="" style={{ background: "#0B0418" }}>Select an option…</option>
          <option value="developer" style={{ background: "#0B0418" }}>Hire a developer</option>
          <option value="team" style={{ background: "#0B0418" }}>Build a team</option>
          <option value="project" style={{ background: "#0B0418" }}>Project delivery</option>
          <option value="consulting" style={{ background: "#0B0418" }}>Technical consulting</option>
          <option value="other" style={{ background: "#0B0418" }}>Something else</option>
        </select>
      </div>

      <button
        type="submit"
        className="flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.02] mt-1"
        style={{ background: "linear-gradient(135deg, #9B3FFF 0%, #7C3AED 55%, #5B21B6 100%)", color: "#fff" }}
      >
        Start Chat <ChevronRight className="w-4 h-4" />
      </button>
    </form>
  );
}

/* ── Main widget ── */
export function ChatWidget() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<"form" | "chat">("form");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (open) { setUnread(0); setTimeout(() => inputRef.current?.focus(), 300); }
  }, [open]);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, open]);

  const handleLeadSubmit = (data: LeadData) => {
    setStage("chat");
    setTimeout(() => {
      setMessages([BOT_INTRO(data.name.split(" ")[0])]);
    }, 400);
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), from: "user", text: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      const { reply, options } = getBotReply(text);
      const botMsg: Message = { id: Date.now() + 1, from: "bot", text: reply, options };
      setMessages(prev => [...prev, botMsg]);
      if (!open) setUnread(u => u + 1);
    }, 900 + Math.random() * 600);
  };

  if (!mounted) return null;

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform"
        style={{ background: "linear-gradient(135deg, #9B3FFF 0%, #7C3AED 55%, #5B21B6 100%)" }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        animate={{ boxShadow: open ? "0 0 0 0 rgba(124,58,237,0)" : ["0 0 0 0 rgba(124,58,237,0.4)", "0 0 0 16px rgba(124,58,237,0)", "0 0 0 0 rgba(124,58,237,0)"] }}
        transition={{ boxShadow: { repeat: Infinity, duration: 2.5, delay: 3 } }}
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}><X className="w-5 h-5 text-white" /></motion.div>
            : <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}><MessageCircle className="w-6 h-6 text-white" /></motion.div>
          }
        </AnimatePresence>
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
            {unread}
          </span>
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] rounded-3xl overflow-hidden flex flex-col"
            style={{
              height: stage === "form" ? "auto" : 520,
              background: "#0D0720",
              border: "1px solid rgba(124,58,237,0.25)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 60px rgba(124,58,237,0.12)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #9B3FFF 0%, #7C3AED 60%, #5B21B6 100%)" }}
            >
              <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.15)" }}>
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-white">HireProgrammer AI</div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="text-[11px] text-white/70">Online · Typically replies instantly</span>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form stage */}
            {stage === "form" && (
              <div className="overflow-y-auto" style={{ maxHeight: 480 }}>
                <LeadForm onSubmit={handleLeadSubmit} />
              </div>
            )}

            {/* Chat stage */}
            {stage === "chat" && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 min-h-0">
                  <AnimatePresence initial={false}>
                    {messages.map(msg => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className={`flex gap-2 ${msg.from === "user" ? "flex-row-reverse" : "flex-row"}`}
                      >
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: msg.from === "bot" ? "rgba(124,58,237,0.25)" : "rgba(255,255,255,0.1)" }}
                        >
                          {msg.from === "bot" ? <Bot className="w-3.5 h-3.5 text-primary" /> : <User className="w-3.5 h-3.5 text-white/70" />}
                        </div>
                        <div className="flex flex-col gap-2 max-w-[80%]">
                          <div
                            className="px-3.5 py-2.5 rounded-2xl"
                            style={
                              msg.from === "bot"
                                ? { background: "rgba(20,12,40,0.95)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.78)" }
                                : { background: "linear-gradient(135deg, #9B3FFF 0%, #7C3AED 100%)", color: "#fff" }
                            }
                          >
                            {msg.from === "bot" ? <BotText text={msg.text} /> : <p className="text-sm">{msg.text}</p>}
                          </div>
                          {msg.options && msg.from === "bot" && (
                            <div className="flex flex-wrap gap-1.5 mt-0.5">
                              {msg.options.map(opt => (
                                <button
                                  key={opt}
                                  onClick={() => sendMessage(opt)}
                                  className="text-[11px] px-2.5 py-1 rounded-full transition-all duration-200 hover:scale-105"
                                  style={{ background: "rgba(124,58,237,0.14)", color: "#A78BFA", border: "1px solid rgba(124,58,237,0.28)" }}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {typing && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(124,58,237,0.25)" }}>
                        <Bot className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <div className="px-4 py-3 rounded-2xl flex items-center gap-1" style={{ background: "rgba(20,12,40,0.95)", border: "1px solid rgba(255,255,255,0.08)" }}>
                        {[0, 0.2, 0.4].map(d => (
                          <motion.span key={d} className="w-1.5 h-1.5 rounded-full bg-primary/60"
                            animate={{ y: [0, -4, 0] }} transition={{ duration: 0.7, repeat: Infinity, delay: d }} />
                        ))}
                      </div>
                    </motion.div>
                  )}
                  <div ref={bottomRef} />
                </div>

                {/* Input bar */}
                <div className="flex-shrink-0 px-3 pb-3 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <form
                    onSubmit={e => { e.preventDefault(); sendMessage(input); }}
                    className="flex items-center gap-2 px-3 py-2 rounded-2xl"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      placeholder="Ask me anything…"
                      className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || typing}
                      className="w-7 h-7 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-30"
                      style={{ background: input.trim() && !typing ? "#7C3AED" : "rgba(124,58,237,0.3)" }}
                    >
                      {typing ? <Loader2 className="w-3.5 h-3.5 text-white animate-spin" /> : <Send className="w-3.5 h-3.5 text-white" />}
                    </button>
                  </form>
                  <p className="text-center text-[10px] text-white/25 mt-2">HireProgrammer · London, UK 🇬🇧</p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
