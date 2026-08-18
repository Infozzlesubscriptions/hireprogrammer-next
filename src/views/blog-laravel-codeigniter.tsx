"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import {
  Calendar, Clock, Tag, Code2, TrendingUp, Cpu,
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
    tag: "AI & Tech", icon: Cpu,
    title: "How Generative AI Is Reshaping Software Development in 2025",
    excerpt: "AI pair-programming and code-generation tools are no longer experimental — here's how forward-thinking teams use them.",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=75",
    date: "03 Jan 2025", readTime: "8 min read", href: "/blog/how-generative-ai-is-reshaping-software-development-in-2026",
  },
  {
    tag: "E-commerce", icon: TrendingUp,
    title: "WooCommerce vs Magento: The Ultimate Comparison for 2025",
    excerpt: "Choosing between WooCommerce and Magento can define the trajectory of your online store. We examine every angle.",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600&q=75",
    date: "15 Dec 2024", readTime: "10 min read", href: "/blog/woocommerce-vs-magento-the-ultimate-comparison-for-2026",
  },
];

export default function BlogLaravelCodeIgniterPage() {
  const [comment, setComment] = useState({ name: "", email: "", website: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const comparison = [
    { aspect: "Learning curve", laravel: "Moderate — rich ecosystem to learn", ci: "Gentle — minimal magic" },
    { aspect: "ORM", laravel: "Eloquent (built-in, expressive)", ci: "None built-in; use Doctrine or raw SQL" },
    { aspect: "Authentication", laravel: "Laravel Breeze / Jetstream", ci: "Manual or third-party library" },
    { aspect: "CLI tooling", laravel: "Artisan — generators, migrations, queues", ci: "Basic CLI" },
    { aspect: "Community & packages", laravel: "Vast (Packagist / Laravel ecosystem)", ci: "Smaller, leaner" },
    { aspect: "Performance", laravel: "Very fast with OPcache + queue workers", ci: "Slightly faster baseline; simpler stack" },
    { aspect: "Best for", laravel: "Complex apps, SaaS, APIs, queues", ci: "Small-to-medium sites, rapid prototypes" },
  ];

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
            <span className="text-white/55">Laravel vs CodeIgniter</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }} className="flex flex-wrap items-center gap-4 mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider" style={pillStyle}>
              <Code2 className="w-3 h-3 text-primary" />
              <span className="text-primary">Web Dev</span>
            </div>
            <span className="flex items-center gap-1.5 text-white/35 text-xs"><Calendar className="w-3 h-3" /> 20 Dec 2024</span>
            <span className="w-px h-3 bg-white/15" />
            <span className="flex items-center gap-1.5 text-white/35 text-xs"><Clock className="w-3 h-3" /> 9 min read</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }} className="text-3xl md:text-5xl font-black text-white leading-[1.1] tracking-tight mb-6">
            Laravel vs CodeIgniter:{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">Which PHP Framework</span>
            {" "}Should You Choose?
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }} className="text-white/50 text-lg leading-relaxed mb-8">
            Both frameworks power millions of applications worldwide, but they suit very different project types. We compare performance, ecosystem, developer experience, and long-term maintainability to help you make the right call.
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
            <img src="https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=1200&q=85" alt="PHP Development" className="w-full h-full object-cover" style={{ filter: "brightness(0.65) saturate(0.85)" }} />
          </div>
        </motion.div>
      </section>

      <article className="max-w-4xl mx-auto px-6 lg:px-10 pb-10">
        {[
          {
            title: "A Brief History",
            body: `Both Laravel (2011) and CodeIgniter (2006) are PHP MVC frameworks, but they were built with very different philosophies. CodeIgniter was created to be lightweight and get out of the developer's way — minimal configuration, no command-line magic, just PHP.\n\nLaravel arrived five years later with a radically different vision: an expressive, elegant syntax with deep integration across authentication, queuing, broadcasting, caching, and testing. It borrowed liberally from Ruby on Rails and grew into the dominant PHP ecosystem within a decade.`,
          },
          {
            title: "Developer Experience",
            body: `Laravel's Artisan CLI is transformative for day-to-day development. Scaffolding a full authentication system (routes, controllers, migrations, views) takes a single command. Generating a model with its migration and controller takes two. Artisan alone saves hours per week on any large project.\n\nCodeIgniter's appeal is the inverse: there's almost no magic, which means less to learn and fewer places for things to go wrong. A developer who knows PHP can be productive in CodeIgniter in an afternoon. Laravel's ecosystem — Eloquent, Blade, Jobs, Events, Notifications — takes weeks to absorb properly.`,
          },
          {
            title: "Side-by-Side Comparison",
            body: `See the comparison table below for a structured breakdown across seven key dimensions.`,
          },
          {
            title: "When to Choose Laravel",
            body: `Choose Laravel when you're building something that will grow. If your requirements include:\n\n• Multiple user roles with complex permissions\n• Background job processing (emails, notifications, data imports)\n• Real-time features via WebSockets\n• A rich API consumed by a mobile app or SPA\n• Long-term maintainability across a team\n\n…then Laravel's ecosystem pays for the steeper initial learning curve many times over.`,
          },
          {
            title: "When to Choose CodeIgniter",
            body: `CodeIgniter still has a strong case for:\n\n• Maintaining existing CodeIgniter 3/4 codebases (migration cost is high)\n• Hosting-constrained environments where shared hosts don't support Composer properly\n• Very simple CRUD sites where the overhead of Laravel's service container is genuinely unnecessary\n• Teams with strong PHP fundamentals but no Laravel experience, on a tight timeline\n\nFor greenfield projects in 2025, the honest advice is to default to Laravel unless you have a specific reason not to. The ecosystem, tooling, and hiring pool are simply superior.`,
          },
        ].map(({ title, body }, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="mb-10">
            <h2 className="text-white text-xl font-bold mb-4">{title}</h2>
            {body.split("\n\n").map((para, j) => (
              <p key={j} className="text-white/60 leading-relaxed mb-4 text-[15px]" style={{ whiteSpace: "pre-line" }}>{para}</p>
            ))}
            {i === 2 && (
              <div className="overflow-x-auto rounded-xl border border-white/[0.07] mt-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: "rgba(124,58,237,0.10)" }}>
                      <th className="text-left px-4 py-3 text-white/60 font-semibold text-xs uppercase tracking-wider">Aspect</th>
                      <th className="text-left px-4 py-3 text-primary font-semibold text-xs uppercase tracking-wider">Laravel</th>
                      <th className="text-left px-4 py-3 text-white/60 font-semibold text-xs uppercase tracking-wider">CodeIgniter</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((row, r) => (
                      <tr key={r} style={{ background: r % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                        <td className="px-4 py-3 text-white/50 text-xs font-medium">{row.aspect}</td>
                        <td className="px-4 py-3 text-white/75 text-xs">{row.laravel}</td>
                        <td className="px-4 py-3 text-white/50 text-xs">{row.ci}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        ))}

        <div className="flex flex-wrap gap-2 pb-8 border-b border-white/[0.06]">
          {["PHP", "Laravel", "CodeIgniter", "Web Development", "Backend", "Framework"].map(t => (
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
