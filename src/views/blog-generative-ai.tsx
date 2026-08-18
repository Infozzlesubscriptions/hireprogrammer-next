"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import {
  Calendar, Clock, Tag, Cpu, TrendingUp, Globe,
  MessageSquare, User, Mail, ExternalLink,
} from "lucide-react";

const GOLD = "#7C3AED";
const pillStyle = { background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.22)" };
const cardStyle = { background: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.07)" };
const inputStyle = {
  width: "100%", padding: "11px 16px", borderRadius: 12, fontSize: 13,
  color: "#fff", background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.09)", outline: "none",
};

const RELATED = [
  {
    tag: "Startups", icon: TrendingUp,
    title: "Why Every Startup Needs a Scalable Tech Stack in 2025",
    excerpt: "Transforming your startup vision into reality requires more than drive — it requires a solid, scalable technology foundation.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=75",
    date: "12 Jan 2025", readTime: "6 min read", href: "/blog/why-every-startup-needs-a-scalable-tech-stack-in-2026",
  },
  {
    tag: "Web Dev", icon: Globe,
    title: "Laravel vs CodeIgniter: Which PHP Framework Should You Choose?",
    excerpt: "We compare performance, ecosystem, developer experience, and long-term maintainability to help you decide.",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&q=75",
    date: "20 Dec 2024", readTime: "9 min read", href: "/blog/laravel-vs-codeigniter-which-php-framework-should-you-choose",
  },
  {
    tag: "E-commerce", icon: Globe,
    title: "Is Shopify Worth It for a Small Business? [2025]",
    excerpt: "Yes, Shopify is worth it for small businesses in 2025 — user-friendly tools, customisable themes, and scalable features included.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=75",
    date: "08 Jan 2025", readTime: "5 min read", href: "/blog/is-shopify-worth-it-for-a-small-business",
  },
];

export default function BlogGenerativeAIPage() {
  const [comment, setComment] = useState({ name: "", email: "", website: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="min-h-screen bg-[#080316] text-foreground overflow-x-hidden selection:bg-primary/30">
      <Navbar />

      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(124,58,237,0.06) 0%, transparent 65%)" }} />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-xs text-white/35 mb-8">
            <a href="/" className="hover:text-primary transition-colors">Home</a>
            <span>/</span>
            <a href="/blog" className="hover:text-primary transition-colors">Blog</a>
            <span>/</span>
            <span className="text-white/55">Generative AI in Development</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }} className="flex flex-wrap items-center gap-4 mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider" style={pillStyle}>
              <Cpu className="w-3 h-3 text-primary" />
              <span className="text-primary">AI & Tech</span>
            </div>
            <span className="flex items-center gap-1.5 text-white/35 text-xs"><Calendar className="w-3 h-3" /> 03 Jan 2025</span>
            <span className="w-px h-3 bg-white/15" />
            <span className="flex items-center gap-1.5 text-white/35 text-xs"><Clock className="w-3 h-3" /> 8 min read</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }} className="text-3xl md:text-5xl font-black text-white leading-[1.1] tracking-tight mb-6">
            How Generative AI Is{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">Reshaping Software Development</span>
            {" "}in 2025
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }} className="text-white/50 text-lg leading-relaxed mb-8">
            AI pair-programming tools, automated testing, and code generation are no longer experimental. Here's how forward-thinking development teams are integrating generative AI into their workflows to ship faster and reduce technical debt.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }} className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(124,58,237,0.18)", border: "1px solid rgba(124,58,237,0.3)" }}>
              <User className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">HireProgrammer Editorial</p>
              <p className="text-white/35 text-xs">Engineering Team · London, UK</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden mb-12">
        <motion.div initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease: "easeOut" }} className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="rounded-2xl overflow-hidden" style={{ height: 420 }}>
            <img src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=85" alt="Generative AI in Software Development" className="w-full h-full object-cover" style={{ filter: "brightness(0.65) saturate(0.85)" }} />
          </div>
        </motion.div>
      </section>

      <article className="max-w-4xl mx-auto px-6 lg:px-10 pb-10">
        {[
          {
            title: "The AI-Native Developer Has Arrived",
            body: `In 2025, the term "AI-native developer" has moved from marketing buzzword to genuine job description. Teams using tools like GitHub Copilot, Cursor, and Claude are routinely shipping 30–50% more code per sprint — not because they're cutting corners, but because they're offloading the repetitive scaffolding work that consumed hours of their time.\n\nThis shift is structural, not cosmetic. Developers who leverage AI effectively don't just autocomplete lines — they architect at a higher level, delegating implementation details to AI whilst focusing on system design, business logic, and code review.`,
          },
          {
            title: "Code Generation: Reality vs. Hype",
            body: `There's no shortage of breathless headlines claiming AI will replace developers. The reality is subtler and more interesting. AI-generated code tends to excel in three areas:\n\n• Boilerplate and scaffolding (API routes, CRUD endpoints, test stubs)\n• Refactoring and type migration (converting JS to TS, upgrading from v1 to v2 of a library)\n• Documentation and comment generation\n\nWhere it still struggles: novel algorithms, nuanced business rules that aren't well-documented, and security-critical code paths where correctness is non-negotiable. The savvy teams we work with use AI as a force multiplier for the first category, while maintaining rigorous human review for the second.`,
          },
          {
            title: "Testing and QA: The Hidden AI Win",
            body: `One of the least-discussed but highest-ROI applications of generative AI is automated test generation. Tools like Playwright's AI-assisted test recorder and Copilot's unit-test suggestions can produce meaningful test coverage in minutes rather than hours.\n\nHireProgrammer clients who adopted AI-driven test generation in 2024 reported a 68% reduction in regression bugs reaching production — not because the AI writes perfect tests, but because it lowers the friction of writing them at all. When writing a test takes 30 seconds instead of 15 minutes, developers actually do it.`,
          },
          {
            title: "The Risk: Technical Debt at AI Speed",
            body: `There's a dark side to shipping 50% faster: you can accumulate technical debt 50% faster too. We've seen teams that adopted AI tooling without adjusting their code review processes end up with codebases full of subtly inconsistent patterns, duplicated logic, and security anti-patterns the AI confidently reproduced from its training data.\n\nThe fix is cultural, not technical. AI output needs the same (arguably stricter) review process as junior developer output. The AI doesn't understand your architecture constraints, your team's naming conventions, or the regulatory requirements your product must meet.`,
          },
          {
            title: "What This Means for Hiring",
            body: `The demand for "AI-native" developers is reshaping hiring in two ways. First, developers who can prompt effectively, review AI output critically, and integrate AI into CI/CD pipelines are commanding a meaningful salary premium. Second, clients are starting to ask: how do I know my development partner is using AI to my advantage rather than cutting corners?\n\nAt HireProgrammer, every engagement now includes a transparency component — we're explicit about which parts of the codebase used AI assistance and how the output was reviewed. That's the standard the market should hold every development partner to.`,
          },
        ].map(({ title, body }, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="mb-10">
            <h2 className="text-white text-xl font-bold mb-4" style={{ color: i === 0 ? "#fff" : "#fff" }}>{title}</h2>
            {body.split("\n\n").map((para, j) => (
              <p key={j} className="text-white/60 leading-relaxed mb-4 text-[15px]" style={{ whiteSpace: "pre-line" }}>{para}</p>
            ))}
          </motion.div>
        ))}

        <div className="flex flex-wrap gap-2 pb-8 border-b border-white/[0.06]">
          {["AI", "Generative AI", "Software Development", "GitHub Copilot", "Developer Productivity", "Code Review"].map(t => (
            <span key={t} className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full" style={pillStyle}>
              <Tag className="w-2.5 h-2.5 text-primary" /><span className="text-primary/80">{t}</span>
            </span>
          ))}
        </div>
      </article>

      <section className="py-16 max-w-4xl mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 max-w-[40px]" style={{ background: `linear-gradient(90deg, transparent, ${GOLD})` }} />
          <span className="text-primary text-xs font-bold uppercase tracking-[0.16em]">Related Topics</span>
          <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />
        </motion.div>
        <div className="grid md:grid-cols-3 gap-5">
          {RELATED.map(({ tag, icon: Icon, title, excerpt, image, date, readTime, href }, i) => (
            <motion.a key={i} href={href} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              whileHover={{ y: -5 }} className="group block rounded-2xl overflow-hidden" style={cardStyle}>
              <div className="relative overflow-hidden h-40">
                <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" style={{ filter: "brightness(0.55) saturate(0.8)" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(8,3,22,0.9) 100%)" }} />
                <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider" style={pillStyle}>
                  <Icon className="w-2.5 h-2.5 text-primary" /><span className="text-primary">{tag}</span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex items-center gap-1 text-white/30 text-[11px]"><Calendar className="w-2.5 h-2.5" />{date}</span>
                  <span className="w-px h-3 bg-white/10" />
                  <span className="flex items-center gap-1 text-white/30 text-[11px]"><Clock className="w-2.5 h-2.5" />{readTime}</span>
                </div>
                <h4 className="text-white font-bold text-sm leading-snug mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">{title}</h4>
                <p className="text-white/40 text-xs leading-relaxed line-clamp-2">{excerpt}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 max-w-[40px]" style={{ background: `linear-gradient(90deg, transparent, ${GOLD})` }} />
          <span className="text-primary text-xs font-bold uppercase tracking-[0.16em] flex items-center gap-2">
            <MessageSquare className="w-3 h-3" /> Leave a Reply
          </span>
          <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />
        </motion.div>
        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 rounded-2xl" style={cardStyle}>
            <p className="text-white font-bold text-lg mb-2">Thank you for your comment!</p>
            <p className="text-white/40 text-sm">It will appear after moderation.</p>
          </motion.div>
        ) : (
          <motion.form initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { key: "name", label: "Name *", icon: User, type: "text", placeholder: "Your name" },
                { key: "email", label: "Email *", icon: Mail, type: "email", placeholder: "your@email.com" },
                { key: "website", label: "Website", icon: ExternalLink, type: "url", placeholder: "https://yoursite.com" },
              ].map(({ key, label, icon: Icon, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-white/40 text-[11px] font-semibold uppercase tracking-wider mb-2">{label}</label>
                  <div className="relative">
                    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20 pointer-events-none" />
                    <input type={type} placeholder={placeholder} value={comment[key as keyof typeof comment]}
                      onChange={e => setComment(c => ({ ...c, [key]: e.target.value }))}
                      style={{ ...inputStyle, paddingLeft: 36 }} required={key !== "website"} />
                  </div>
                </div>
              ))}
            </div>
            <div>
              <label className="block text-white/40 text-[11px] font-semibold uppercase tracking-wider mb-2">Comment *</label>
              <textarea rows={5} placeholder="Share your thoughts…" value={comment.message}
                onChange={e => setComment(c => ({ ...c, message: e.target.value }))}
                style={{ ...inputStyle, resize: "none" }} required />
            </div>
            <button type="submit" className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105"
              style={{ background: "#7C3AED", color: "#fff" }}>
              Post Comment <MessageSquare className="w-3.5 h-3.5" />
            </button>
          </motion.form>
        )}
      </section>

      <Footer />
    </main>
  );
}
