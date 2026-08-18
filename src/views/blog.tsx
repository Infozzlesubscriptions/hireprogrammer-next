"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import {
  ArrowRight, ArrowUpRight, Clock, Calendar, Tag, Search,
  BookOpen, TrendingUp, Code2, Cpu, Shield, Globe,
} from "lucide-react";

const GOLD = "#7C3AED";
const pillStyle = { background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.22)" };
const cardStyle = { background: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.07)" };

const CATEGORIES = ["All", "Startups", "E-commerce", "AI & Tech", "Security", "Web Dev", "Mobile"];

const POSTS = [
  {
    slug: "/blog/why-every-startup-needs-a-scalable-tech-stack-in-2026",
    tag: "Startups",
    tagIcon: TrendingUp,
    title: "Why Every Startup Needs a Scalable Tech Stack in 2025",
    excerpt: "Launching a startup is one of the most exciting journeys an entrepreneur can take. You have the idea, the passion, and the ambition — but transforming that vision into a reality requires more than just drive. It requires a solid, scalable technology foundation.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&q=80",
    date: "12 Jan 2025",
    readTime: "6 min read",
    featured: true,
  },
  {
    slug: "/blog/is-shopify-worth-it-for-a-small-business",
    tag: "E-commerce",
    tagIcon: Globe,
    title: "Is Shopify Worth It for a Small Business? [2025]",
    excerpt: "Yes, Shopify is worth it for small businesses in 2024. It offers user-friendly tools, customisable themes, secure payment options, and scalable features. With excellent customer support and integrations, it simplifies your path to online success.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80",
    date: "08 Jan 2025",
    readTime: "5 min read",
    featured: false,
  },
  {
    slug: "/blog/how-generative-ai-is-reshaping-software-development-in-2026",
    tag: "AI & Tech",
    tagIcon: Cpu,
    title: "How Generative AI Is Reshaping Software Development in 2025",
    excerpt: "AI pair-programming tools, automated testing, and code generation are no longer experimental. Here's how forward-thinking development teams are integrating generative AI into their workflows to ship faster and reduce technical debt.",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=80",
    date: "03 Jan 2025",
    readTime: "8 min read",
    featured: false,
  },
  {
    slug: "/blog/top-10-cybersecurity-threats-businesses-must-prepare-for-in-2026",
    tag: "Security",
    tagIcon: Shield,
    title: "Top 10 Cybersecurity Threats Businesses Must Prepare For",
    excerpt: "From ransomware to supply-chain attacks, the threat landscape is more complex than ever. We break down the ten most prevalent threats in 2025 and the concrete steps your business can take to mitigate each one.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=900&q=80",
    date: "28 Dec 2024",
    readTime: "7 min read",
    featured: false,
  },
  {
    slug: "/blog/laravel-vs-codeigniter-which-php-framework-should-you-choose",
    tag: "Web Dev",
    tagIcon: Code2,
    title: "Laravel vs CodeIgniter: Which PHP Framework Should You Choose?",
    excerpt: "Both frameworks power millions of applications worldwide, but they suit very different project types. We compare performance, ecosystem, developer experience, and long-term maintainability to help you make the right call.",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=900&q=80",
    date: "20 Dec 2024",
    readTime: "9 min read",
    featured: false,
  },
  {
    slug: "/blog/woocommerce-vs-magento-the-ultimate-comparison-for-2026",
    tag: "E-commerce",
    tagIcon: Globe,
    title: "WooCommerce vs Magento: The Ultimate Comparison for 2025",
    excerpt: "Choosing between WooCommerce and Magento can define the trajectory of your online store. We examine cost, scalability, plugin ecosystem, and developer support to give you a clear-eyed view of which platform wins for your use case.",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=900&q=80",
    date: "15 Dec 2024",
    readTime: "10 min read",
    featured: false,
  },
];

function PostCard({ post, index }: { post: typeof POSTS[0]; index: number }) {
  const TagIcon = post.tagIcon;
  return (
    <motion.a
      href={post.slug}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.5, type: "spring", stiffness: 260, damping: 24 }}
      whileHover={{ y: -6 }}
      className="group block rounded-2xl overflow-hidden h-full"
      style={cardStyle}
    >
      {/* image */}
      <div className="relative overflow-hidden h-52">
        <motion.img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.6) saturate(0.8)" }}
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(8,3,22,0.9) 100%)" }} />
        {/* tag pill */}
        <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider" style={pillStyle}>
          <TagIcon className="w-3 h-3 text-primary" />
          <span className="text-primary">{post.tag}</span>
        </div>
      </div>

      {/* body */}
      <div className="p-6 flex flex-col flex-1">
        {/* meta */}
        <div className="flex items-center gap-4 mb-4">
          <span className="flex items-center gap-1.5 text-white/35 text-xs">
            <Calendar className="w-3 h-3" /> {post.date}
          </span>
          <span className="w-px h-3 bg-white/15" />
          <span className="flex items-center gap-1.5 text-white/35 text-xs">
            <Clock className="w-3 h-3" /> {post.readTime}
          </span>
        </div>

        <h3 className="text-white font-bold text-lg leading-snug mb-3 group-hover:text-primary transition-colors duration-300">
          {post.title}
        </h3>
        <p className="text-white/45 text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-2 text-primary font-semibold text-sm">
          Read more
          <motion.div
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            className="inline-flex"
          >
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>
      </div>
    </motion.a>
  );
}

export default function BlogPage() {
  const { scrollY } = useScroll();
  const heroY  = useTransform(scrollY, [0, 700], ["0%", "28%"]);
  const heroOp = useTransform(scrollY, [0, 490], [1, 0]);

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = POSTS.filter(p => {
    const matchCat = activeCategory === "All" || p.tag === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = POSTS[0];
  const FeaturedIcon = featured.tagIcon;
  const featuredHref = "/blog/why-every-startup-needs-a-scalable-tech-stack-in-2026";

  return (
    <main className="min-h-screen bg-[#080316] text-foreground overflow-x-hidden selection:bg-primary/30">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative min-h-[55vh] flex items-center overflow-hidden pt-24">
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <img src="/blog-hero-banner.png" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.35) saturate(1.1)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(8,3,22,0.92) 0%, rgba(8,3,22,0.50) 55%, rgba(8,3,22,0.88) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 70% at 30% 50%, rgba(124,58,237,0.08) 0%, transparent 65%)" }} />
        </motion.div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 py-20">
          <motion.div style={{ opacity: heroOp }}>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-6" style={pillStyle}>
              <BookOpen className="w-3 h-3" /> Our Blog
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }} className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight mb-5">
              Technology & Software{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">Development Blog</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.55 }} className="text-white/50 text-xl leading-relaxed max-w-xl">
              We are fully committed to elevating our clients to new heights — explore our latest thinking on tech, strategy, and growth.
            </motion.p>
          </motion.div>
        </div>

        {/* bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-10" style={{ background: "linear-gradient(to bottom, transparent, #080316)" }} />
      </section>

      {/* ── Featured Post ── */}
      <section className="pt-16 pb-10 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-8" style={pillStyle}>
            <TrendingUp className="w-3 h-3" /> Featured Article
          </motion.div>

          <motion.a
            href={featuredHref}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -4 }}
            className="group grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            {/* image side */}
            <div className="relative overflow-hidden h-64 lg:h-auto min-h-[320px]">
              <motion.img
                src={featured.image}
                alt={featured.title}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: "brightness(0.55) saturate(0.85)" }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(270deg, rgba(6,2,16,0.6) 0%, transparent 50%)" }} />
              {/* featured badge */}
              <div className="absolute top-5 left-5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: "#7C3AED", color: "#ffffff" }}>
                <FeaturedIcon className="w-3 h-3" /> {featured.tag}
              </div>
            </div>

            {/* content side */}
            <div className="p-10 flex flex-col justify-center relative overflow-hidden">
              {/* hover tint */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.05) 0%, transparent 60%)" }} />
              {/* top gold bar on hover */}
              <motion.div className="absolute top-0 left-0 right-0 h-0.5 origin-left" initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.4 }} style={{ background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />

              <div className="flex items-center gap-4 mb-5">
                <span className="flex items-center gap-1.5 text-white/35 text-xs">
                  <Calendar className="w-3 h-3" /> {featured.date}
                </span>
                <span className="w-px h-3 bg-white/15" />
                <span className="flex items-center gap-1.5 text-white/35 text-xs">
                  <Clock className="w-3 h-3" /> {featured.readTime}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4 group-hover:text-primary transition-colors duration-300">
                {featured.title}
              </h2>
              <p className="text-white/50 text-sm leading-relaxed mb-8">
                {featured.excerpt}
              </p>
              <div className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-300 self-start group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]" style={{ background: "#7C3AED", color: "#ffffff" }}>
                Read Article <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </motion.a>
        </div>
      </section>

      <div className="h-px w-full my-6" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25) 50%, transparent)" }} />

      {/* ── Filter Bar ── */}
      <section className="py-10 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row gap-5 items-start md:items-center justify-between">
            {/* category pills */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => {
                const active = cat === activeCategory;
                return (
                  <motion.button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-250"
                    style={{
                      background: active ? GOLD : "rgba(255,255,255,0.04)",
                      color: active ? "#080316" : "rgba(255,255,255,0.55)",
                      border: active ? `1px solid ${GOLD}` : "1px solid rgba(255,255,255,0.08)",
                      boxShadow: active ? `0 0 20px rgba(124,58,237,0.3)` : "none",
                    }}
                  >
                    {cat}
                  </motion.button>
                );
              })}
            </div>

            {/* search */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 rounded-xl text-sm text-white/70 placeholder:text-white/25 outline-none focus:border-primary/50 transition-colors duration-200 w-64"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Posts Grid ── */}
      <section className="pb-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 30%, rgba(124,58,237,0.04) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, i) => (
                <PostCard key={post.title} post={post} index={i} />
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
              <BookOpen className="w-12 h-12 text-primary/30 mx-auto mb-4" />
              <p className="text-white/40 text-lg font-semibold">No articles match your search.</p>
              <button onClick={() => { setActiveCategory("All"); setSearchQuery(""); }} className="mt-4 text-primary text-sm underline underline-offset-4">
                Clear filters
              </button>
            </motion.div>
          )}

          {/* load more placeholder */}
          {filtered.length > 0 && (
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-14">
              <button className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-sm text-white/55 hover:text-white transition-all duration-300 hover:border-primary/40" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                Load More Articles <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Newsletter / CTA ── */}
      <section className="relative overflow-hidden">
        <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.5) 50%, transparent)" }} />
        <div className="relative py-20 px-6" style={{ background: "linear-gradient(135deg, #080316 0%, #0D0819 50%, #080316 100%)" }}>
          <div className="absolute inset-0 pointer-events-none glow-pulse-bg" style={{ background: "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(124,58,237,0.09) 0%, transparent 70%)" }} />
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-6" style={pillStyle}>
              <BookOpen className="w-3 h-3" /> Stay Updated
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="text-3xl md:text-5xl font-black text-white mb-5 leading-tight">
              Reach out now for your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">free consultation</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.14 }} className="text-white/45 text-lg mb-10 leading-relaxed">
              Explore how we can support you and take your business to the next level.
            </motion.p>
            <motion.a href="/contact-us" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2.5 px-10 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(124,58,237,0.5)]" style={{ background: "#7C3AED", color: "#ffffff" }}>
              Contact Us <ArrowRight className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
