"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import {
  ArrowRight, Calendar, Clock, Tag, TrendingUp, Globe,
  Cpu, MessageSquare, User, Mail, ExternalLink,
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
    tag: "E-commerce", icon: Globe,
    title: "Is Shopify Worth It for a Small Business? [2025]",
    excerpt: "Yes, Shopify is worth it for small businesses in 2025 — user-friendly tools, customisable themes, and scalable features included.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=75",
    date: "08 Jan 2025", readTime: "5 min read", href: "/blog/is-shopify-worth-it-for-a-small-business",
  },
  {
    tag: "AI & Tech", icon: Cpu,
    title: "How Generative AI Is Reshaping Software Development in 2025",
    excerpt: "AI pair-programming and code-generation tools are no longer experimental — here's how forward-thinking teams are using them.",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=75",
    date: "03 Jan 2025", readTime: "8 min read", href: "/blog/how-generative-ai-is-reshaping-software-development-in-2026",
  },
  {
    tag: "Web Dev", icon: TrendingUp,
    title: "Laravel vs CodeIgniter: Which PHP Framework Should You Choose?",
    excerpt: "We compare performance, ecosystem, developer experience, and long-term maintainability to help you decide.",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&q=75",
    date: "20 Dec 2024", readTime: "9 min read", href: "/blog/laravel-vs-codeigniter-which-php-framework-should-you-choose",
  },
];

export default function BlogPostPage() {
  const [comment, setComment] = useState({ name: "", email: "", website: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="min-h-screen bg-[#080316] text-foreground overflow-x-hidden selection:bg-primary/30">
      <Navbar />

      {/* ── Hero banner ── */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(124,58,237,0.06) 0%, transparent 65%)" }} />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-10">
          {/* breadcrumb */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-xs text-white/35 mb-8">
            <a href="/" className="hover:text-primary transition-colors">Home</a>
            <span>/</span>
            <a href="/blog" className="hover:text-primary transition-colors">Blog</a>
            <span>/</span>
            <span className="text-white/55">Scalable Tech Stack</span>
          </motion.div>

          {/* tag + meta */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }} className="flex flex-wrap items-center gap-4 mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider" style={pillStyle}>
              <TrendingUp className="w-3 h-3 text-primary" />
              <span className="text-primary">Startups</span>
            </div>
            <span className="flex items-center gap-1.5 text-white/35 text-xs"><Calendar className="w-3 h-3" /> 12 Jan 2025</span>
            <span className="w-px h-3 bg-white/15" />
            <span className="flex items-center gap-1.5 text-white/35 text-xs"><Clock className="w-3 h-3" /> 6 min read</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }} className="text-3xl md:text-5xl font-black text-white leading-[1.1] tracking-tight mb-6">
            Why Every Startup Needs a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">Scalable Tech Stack</span>
            {" "}in 2025
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }} className="text-white/50 text-lg leading-relaxed">
            Launching a startup is one of the most exciting journeys an entrepreneur can take. You have the idea, the passion, and the ambition — but transforming that vision into a reality requires more than just drive. It requires a solid, scalable technology foundation.
          </motion.p>
        </div>
      </section>

      {/* ── hero image ── */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }} className="max-w-4xl mx-auto px-6 lg:px-10 mb-16">
        <div className="rounded-2xl overflow-hidden h-72 md:h-96">
          <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=85" alt="Scalable Tech Stack" className="w-full h-full object-cover" style={{ filter: "brightness(0.7) saturate(0.9)" }} />
        </div>
      </motion.div>

      {/* ── Article body ── */}
      <article className="max-w-4xl mx-auto px-6 lg:px-10 pb-20">
        {/* intro */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <p className="text-white/65 text-base leading-relaxed mb-5">
            You now face the challenge of building a product that not only works today but can also grow with your business tomorrow. Technology choices you make in your early days will have a profound impact on your ability to scale, adapt, and thrive in a competitive market.
          </p>
          <p className="text-white/65 text-base leading-relaxed">
            This article explores why scalable tech is essential for startups and how to start building right from the very first line of code.
          </p>
        </motion.div>

        {/* divider */}
        <div className="h-px mb-12" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.2) 50%, transparent)" }} />

        {/* Section 1 */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3">
            <span className="w-1 h-6 rounded-full flex-shrink-0" style={{ background: GOLD }} />
            Why Scalability Matters in 2025
          </h2>
          <p className="text-white/60 text-base leading-relaxed mb-5">
            The digital landscape is evolving faster than ever. Best-in-class startups leverage tech that allows them to handle large-scale systems with a single, cloud-native option.
          </p>
          <p className="text-white/60 text-base leading-relaxed mb-6">
            When building a startup, scalability is as important as your business plan. Think back to Facebook, Uber, or Airbnb — each of them didn't stand on its own from the beginning. Their growth wasn't standalone, an effort by themselves but with other businesses, and its underlying tech stacks and platforms are the key to their success.
          </p>
          <p className="text-white/55 text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: GOLD }}>A scalable stack is one that can:</p>
          <ul className="space-y-3 mb-6">
            {[
              "Support a rapidly growing user base without degrading performance",
              "Handle increasing amounts of data as you acquire customers",
              "Maintain system performance through organic and paid growth spikes",
              "Be maintained cost-effectively without emergency re-architecture",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-white/60 text-sm leading-relaxed">
                <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 text-[10px] font-bold" style={{ background: "rgba(124,58,237,0.12)", color: GOLD }}>{i + 1}</span>
                {item}
              </li>
            ))}
          </ul>
        </motion.section>

        {/* divider */}
        <div className="h-px mb-12" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.2) 50%, transparent)" }} />

        {/* Section 2 */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3">
            <span className="w-1 h-6 rounded-full flex-shrink-0" style={{ background: GOLD }} />
            Building Blocks of a Scalable Stack
          </h2>
          <p className="text-white/60 text-base leading-relaxed mb-8">
            We understand how small businesses combine together with the right tech to create a scalable infrastructure. Combining the right platforms and tools, you can align your platform to grow with your business. Here's how the key components fit together:
          </p>

          {[
            { n: "1.", title: "Cloud Infrastructure", body: "Build on AWS, GCP, or Azure. Cloud-native services (auto-scaling groups, managed databases, CDN layers) mean you pay for what you use and scale instantly — no hardware procurement, no lead time. This is the single most impactful infrastructure decision a startup can make." },
            { n: "2.", title: "Frontend Without Monolith", body: "Avoid tightly-coupled frontends. React, Vue, or Next.js with a headless architecture lets your product team ship independently of your API team. Component-based design also accelerates future redesigns and A/B testing." },
            { n: "3.", title: "Backend Solutions", body: "Opt for microservices or a well-structured monolith with clear boundaries. Laravel, Node.js, or Python FastAPI can all serve you well at scale — what matters is clean separation of concerns, proper caching strategies (Redis, Memcached), and robust API design." },
            { n: "4.", title: "Authentication Tools", body: "Never roll your own auth. Use established identity providers — Clerk, Auth0, or AWS Cognito — that handle multi-factor authentication, social login, session management, and compliance out of the box. This is security infrastructure, not a differentiator." },
            { n: "5.", title: "Payment System", body: "Integrate Stripe or a similar PCI-compliant processor from day one. Building payment infrastructure in-house is expensive, legally risky, and rarely a competitive advantage. Modern payment platforms also give you subscriptions, invoicing, and analytics for free." },
          ].map(({ n, title, body }) => (
            <motion.div key={n} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex gap-5 p-5 rounded-2xl mb-4" style={cardStyle}>
              <span className="text-2xl font-black flex-shrink-0 leading-none mt-0.5" style={{ color: "rgba(124,58,237,0.35)" }}>{n}</span>
              <div>
                <p className="text-white font-bold text-sm mb-2">{title}</p>
                <p className="text-white/50 text-sm leading-relaxed">{body}</p>
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* divider */}
        <div className="h-px mb-12" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.2) 50%, transparent)" }} />

        {/* Section 3 */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3">
            <span className="w-1 h-6 rounded-full flex-shrink-0" style={{ background: GOLD }} />
            Why Scalability Matters at an Early Stage
          </h2>
          <p className="text-white/60 text-base leading-relaxed mb-4">
            Many founders treat scalability as a "later problem" — something to address after product-market fit. This is a costly mistake. The time to architect for scale is before you need it, not after your system is already under pressure.
          </p>
          <p className="text-white/60 text-base leading-relaxed mb-4">
            When you begin thinking about scalability only in your fast-growing stage, you'll be fixing under fire — managing a rewrite whilst simultaneously serving customers, dealing with outages, and trying to ship new features. The technical debt compounds rapidly.
          </p>
          <p className="text-white/60 text-base leading-relaxed">
            A scalable system also attracts better investors. Experienced VCs and angels examine your architecture during due diligence. A well-structured, cloud-native stack signals technical maturity and dramatically de-risks their investment.
          </p>
        </motion.section>

        {/* Final thoughts */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 p-8 rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.07) 0%, rgba(124,58,237,0.03) 100%)", border: "1px solid rgba(124,58,237,0.16)" }}>
          <h2 className="text-xl font-black text-white mb-4">Final Thoughts</h2>
          <p className="text-white/60 text-sm leading-relaxed mb-3">
            In 2025, startups can't afford to build on brittle foundations. Whether you're pre-launch or post-seed, the decisions you make today about your technology stack will determine how far and how fast you can grow tomorrow.
          </p>
          <p className="text-white/60 text-sm leading-relaxed">
            At HireProgrammer, we help startups and growing businesses build scalable, maintainable systems from the ground up. Our UK-based engineers work alongside your team to make the right architectural decisions early — so you spend more time building product and less time fighting fires.
          </p>
        </motion.section>

        {/* tags */}
        <div className="flex flex-wrap gap-2 pb-8 border-b border-white/[0.06]">
          {["Startups", "Tech Stack", "Scalability", "Cloud Infrastructure", "Backend", "Architecture"].map(t => (
            <span key={t} className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full" style={pillStyle}>
              <Tag className="w-2.5 h-2.5 text-primary" /><span className="text-primary/80">{t}</span>
            </span>
          ))}
        </div>
      </article>

      {/* ── Related Topics ── */}
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

      {/* ── Leave a Reply ── */}
      <section className="py-16 max-w-4xl mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 max-w-[40px]" style={{ background: `linear-gradient(90deg, transparent, ${GOLD})` }} />
          <span className="text-primary text-xs font-bold uppercase tracking-[0.16em] flex items-center gap-2">
            <MessageSquare className="w-3 h-3" /> Leave a Reply
          </span>
          <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 rounded-2xl" style={cardStyle}>
          <p className="text-white/40 text-sm mb-8">Your email address will not be published. Required fields are marked *</p>

          {submitted ? (
            <div className="text-center py-10">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(124,58,237,0.12)" }}>
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <p className="text-white font-bold text-lg mb-2">Comment submitted!</p>
              <p className="text-white/45 text-sm">Your comment is awaiting moderation. Thank you for contributing.</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
              <div className="grid md:grid-cols-3 gap-5">
                {[
                  { key: "name",    label: "Name *",    type: "text",  icon: User,         placeholder: "Jane Smith" },
                  { key: "email",   label: "Email *",   type: "email", icon: Mail,         placeholder: "jane@company.co.uk" },
                  { key: "website", label: "Website",   type: "url",   icon: ExternalLink, placeholder: "https://yoursite.co.uk" },
                ].map(({ key, label, type, icon: Icon, placeholder }) => (
                  <div key={key}>
                    <label className="block text-white/40 text-[11px] font-bold uppercase tracking-wider mb-2">{label}</label>
                    <div className="relative">
                      <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25 pointer-events-none" />
                      <input type={type} placeholder={placeholder} required={key !== "website"}
                        value={comment[key as keyof typeof comment]}
                        onChange={e => setComment(c => ({ ...c, [key]: e.target.value }))}
                        style={{ ...inputStyle, paddingLeft: 36 }}
                        onFocus={e => (e.currentTarget.style.borderColor = "rgba(124,58,237,0.4)")}
                        onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-white/40 text-[11px] font-bold uppercase tracking-wider mb-2">Comment *</label>
                <textarea placeholder="Share your thoughts on this article..." rows={5} required
                  value={comment.message}
                  onChange={e => setComment(c => ({ ...c, message: e.target.value }))}
                  style={{ ...inputStyle, resize: "none", paddingTop: 11 }}
                  onFocus={e => (e.currentTarget.style.borderColor = "rgba(124,58,237,0.4)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")}
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input type="checkbox" className="accent-primary w-4 h-4" />
                  <span className="text-white/35 text-xs leading-snug">Save my name and details in this browser for the next time I comment.</span>
                </label>
              </div>

              <motion.button type="submit" whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(124,58,237,0.35)" }} whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-sm transition-all duration-300"
                style={{ background: "#7C3AED", color: "#ffffff" }}>
                Post Comment <ArrowRight className="w-4 h-4" />
              </motion.button>
            </form>
          )}
        </motion.div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden">
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0e0b05 0%, #080316 100%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 20% 50%, rgba(124,58,237,0.12) 0%, transparent 60%)" }} />
          <div className="absolute inset-0 rounded-3xl" style={{ border: "1px solid rgba(124,58,237,0.2)" }} />
          <div className="relative z-10 px-10 py-14 text-center">
            <p className="text-white/40 text-xs uppercase tracking-widest font-bold mb-4">Ready to build?</p>
            <h2 className="text-2xl md:text-4xl font-black text-white mb-4 leading-tight">
              Reach out now for your free consultation<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">and explore how we can support you.</span>
            </h2>
            <a href="/contact-us" className="inline-flex items-center gap-2.5 px-10 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(124,58,237,0.45)]" style={{ background: "#7C3AED", color: "#ffffff" }}>
              Contact Us <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
