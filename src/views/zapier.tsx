"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { useQuoteModal } from '@/context/QuoteModalContext';
import { HeroContactForm } from '@/components/sections/HeroContactForm';
import {
  ArrowRight, CheckCircle2, ChevronDown, Zap, Shield,
  Star, Workflow, Globe, Plug, BarChart3, RefreshCw, Settings, Users,
} from "lucide-react";

const GOLD = "#7C3AED";
const pillStyle = { background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.22)" };
const cardStyle = { background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" };

const whyZapier = [
  {
    num: "01",
    title: "Integration",
    body: "Zapier is an internet application that enables users to create connections or as they're commonly known, flows between different web applications. That makes it an ideal choice for organisations and individuals who are seeking to streamline workflows across applications. The App Integration feature enables the Zap Integration feature to connect between different applications, helping to automate tasks through the Zapier integration, connecting apps and triggering actions with minimal configuration.",
  },
  {
    num: "02",
    title: "Triggers and Actions",
    body: "Triggers and actions are the core building blocks of a Zap. Triggers watch an existing app for specific events (like a new form submission or a new lead), while actions are found on another action's platform in order in response to the trigger. Setting up a complex trigger or trigger actions is essential because it is how you can 'handle zaps a new trigger event'.",
  },
  {
    num: "03",
    title: "Multi-step Zaps",
    body: "With Zapier, you can design intricate workflows by chaining together several actions. So, for example, you set the trigger — say a new email — you could then create a web app with multiple functions. In this case, the entire flow will create a new lead, update it, and then send it. There's an example you could create, of not just triggers, but entire end-to-end business process automations.",
  },
  {
    num: "04",
    title: "Delays and Filters",
    body: "In addition, Zapier offers many features such as, you can also test that the Zap is working from the get-go which further customise the logic and trigger. You set time delays between steps or between actions (time delays) in the workflow. You can also add filters so that actions are only triggered under specific conditions. These features add fluidity and intelligence to your automated workflows.",
  },
  {
    num: "05",
    title: "Error Debugging",
    body: "Zapier has robust debugging tools that help developers understand where their workflow has gone wrong when integrations don't run as intended. Its Zap history is highly scalable so you're able to see recent activity with detailed logs, making it easier to identify which step failed, and why, so you can resolve integration issues rapidly.",
  },
  {
    num: "06",
    title: "Zapier's Developer Platform",
    body: "Zapier also has features that help developers to better customise system integration and further develop the capabilities of apps. With the Zapier developer platform, developers can build custom Zapier apps that are not already available on the platform. This allows your team to bring any internal or custom systems into the Zapier ecosystem and automate them through the development process.",
  },
];

const services = [
  {
    icon: Plug,
    title: "Complete Integration",
    body: "Zapier connects hundreds of apps and all-in-one, all-staff solutions to make it easy to integrate through different platforms. Automates basic tasks, data transfers, information sharing, or other notifications — in order to benefit your business, with the right speed, scale and cost-effectiveness for your business.",
    bullets: ["App connectivity", "API automation", "Data sync", "Event triggers"],
  },
  {
    icon: RefreshCw,
    title: "Automation of Workflow",
    body: "Go focus on the performance of your workflows to maximise its efficiency with Zapier, and help to make better data-led decisions while consuming costs at the same time. We build multi-step Zaps that replace manual, repetitive tasks — freeing your team to focus on high-value work.",
    bullets: ["Multi-step Zaps", "Conditional logic", "Scheduled automations", "Error handling"],
  },
  {
    icon: BarChart3,
    title: "Scalability and Flexibility",
    body: "As you expand and your business gets more complex, Zapier offers the opportunity with you to work to scale to you're looking to build a new Zap for your workflow. Our report will tell you the optimal Zapier setup that scales alongside your business, with architecture that supports hundreds of thousands of automated tasks per month.",
    bullets: ["High-volume Zaps", "Team workspaces", "Custom code steps", "Webhook handling"],
  },
  {
    icon: Settings,
    title: "Seamless Implementation",
    body: "We service all stakeholders in the implementation process, from a planning and strategy to the final setup, testing and deployment. Our expertise in Zapier implementation ensures a seamless and efficient process, minimising disruption while maximising immediate productivity gains from day one.",
    bullets: ["Discovery & planning", "Build & test", "Training & handover", "Ongoing support"],
  },
];

const whyUsLeft = [
  "Highly skilled developers with extensive experience in Zapier and automation platforms",
  "We take a thorough approach that ensures that that the client's software requirements are met, including implementation, testing, and validation",
  "We take a thorough approach to best understand your business workflows before recommending the right automation strategy",
];

const whyUsRight = [
  "Experience in connecting Zapier with various platforms and bespoke integrations, ensuring smooth integration processes",
  "Ongoing support includes thorough testing and high quality through ongoing and on-going support to ensure that your Zap systems work seamlessly",
  "Proactive communication and regular updates keep you informed at every stage",
];

const faqs = [
  {
    q: "What is Zapier and how does it work?",
    a: "Zapier is a no-code automation platform that connects over 6,000 apps and services. It allows you to create automated workflows called 'Zaps' that trigger actions in one app based on events in another — for example, automatically adding new form submissions to a CRM, or sending Slack notifications when a new order is placed.",
  },
  {
    q: "How can I integrate Zapier with my apps?",
    a: "Zapier integrates natively with thousands of popular apps including Gmail, Slack, HubSpot, Salesforce, Shopify, Trello, Airtable, and many more. For custom or proprietary systems, we can build custom Zapier apps or use Webhooks and APIs to connect virtually any system to your Zapier workflows.",
  },
  {
    q: "Do I need coding skills to use Zapier?",
    a: "The standard Zapier interface requires no coding — it's designed to be used by non-technical users. However, for advanced use cases like custom code steps, complex conditional logic, or building private Zapier apps, having developer support from HireProgrammer ensures you can unlock the platform's full potential.",
  },
  {
    q: "What are the benefits of Zapier automation?",
    a: "Zapier automation eliminates repetitive manual tasks, reduces human error, accelerates data flow between systems, frees your team to focus on higher-value work, and scales effortlessly as your business grows. It can reduce hours of manual work each week to zero while improving accuracy and response times.",
  },
  {
    q: "How much does Zapier automation cost?",
    a: "Zapier offers a free plan for basic automations, with paid plans from around £18/month for growing businesses. Our Zapier development and implementation services are priced separately based on the complexity of your workflows. Contact us for a free consultation and tailored quote.",
  },
  {
    q: "Can Zapier work with my growing business?",
    a: "Yes. Zapier scales from solo entrepreneurs to enterprise teams. As your business grows, your Zaps can be expanded, refined, and connected to more systems. We design automation architectures with scalability in mind, so your workflows support growth rather than create bottlenecks.",
  },
];

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  return (
    <motion.details
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="group rounded-xl overflow-hidden"
      style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none gap-4 [&::-webkit-details-marker]:hidden">
        <span className="text-white font-semibold text-sm leading-snug">{q}</span>
        <ChevronDown className="w-5 h-5 text-primary flex-shrink-0 transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <div className="px-6 pb-5 text-white/55 text-sm leading-relaxed border-t border-white/5 pt-4">{a}</div>
    </motion.details>
  );
}

export default function ZapierPage() {
  const { openQuoteModal } = useQuoteModal();
  const { scrollY } = useScroll();
  const heroY  = useTransform(scrollY, [0, 700], ["0%", "30%"]);
  const heroOp = useTransform(scrollY, [0, 490], [1, 0]);

  return (
    <main className="min-h-screen bg-[#080316] text-foreground overflow-x-hidden selection:bg-primary/30">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-24">
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <img src="/zapier-hero-banner.png" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.45) saturate(1.1)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(8,3,22,0.85) 0%, rgba(8,3,22,0.55) 50%, rgba(8,3,22,0.80) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(124,58,237,0.07) 0%, transparent 65%)" }} />
        </motion.div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-14 items-center">
          <motion.div style={{ opacity: heroOp }}>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-6" style={pillStyle}>
              <Zap className="w-3 h-3" /> Zapier Development Services
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.65 }} className="text-4xl md:text-6xl font-black text-white leading-[1.08] tracking-tight mb-6">
              Expert{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">Zapier Automation Services</span>
              <br />for Your Business
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-white/50 text-xl leading-relaxed mb-10 max-w-md">
              Build the right product from the very start — with UK's leading Zapier development agency.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="flex flex-wrap gap-4">
              <a href="/quote" className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(124,58,237,0.45)]" style={{ background: "#7C3AED", color: "#ffffff" }}>
                Get a Free Quote <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.7 }} className="rounded-2xl p-8" style={{ background: "rgba(6,2,16,0.7)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>
            <h3 className="text-white font-bold text-xl mb-1">Start Your Project</h3>
            <p className="text-white/40 text-sm mb-6">Free consultation, no commitment</p>
            <HeroContactForm pageName="Zapier Integration" extraField={{ label: "Requirement", type: "text", placeholder: "Describe your Zapier project..." }} />
          </motion.div>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4) 50%, transparent)" }} />

      {/* Intro */}
      <section className="py-24 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(124,58,237,0.04) 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>
                <Zap className="w-3 h-3" /> Zapier Development Services in the UK
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
                UK's Premier{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">Zapier Agency</span>
              </motion.h2>
              {[
                "Zapier is an internet application that enables users to make connections or as they're commonly known, flows between different web applications. That makes it an ideal choice for organisations and individuals who are seeking to streamline workflows without writing the App Integration feature. The Zap Integration feature connects Zapier to a business — the functionality, finding its unique function — helping to automate tasks through the Zap integration, connecting apps and triggering actions and also common automation of automation.",
                "HireProgrammer specialises in Zapier so that you can rest on us to assist you in optimising your workflows. If you're searching for Zapier experts to assist you in building a Zap with precision, the Zap agency is the company to use. Therefore, HireProgrammer provides the most efficient and best Zapier agency because it would provide the most complete support through a group of Zapier experts who understand the most advanced systems of automation.",
              ].map((p, i) => (
                <motion.p key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08 }} className="text-white/55 leading-relaxed mb-4 text-sm">{p}</motion.p>
              ))}
            </div>

            {/* Why Zapier Framework */}
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>
                <Star className="w-3 h-3" /> Why Zapier?
              </motion.div>
              <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="text-2xl font-bold text-white leading-tight mb-6">Why Choose Zapier Development Framework?</motion.h3>
              <div className="space-y-3">
                {whyZapier.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="group flex gap-4 p-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30" style={cardStyle}>
                    <span className="text-primary font-black text-xs flex-shrink-0 mt-0.5 font-mono">{item.num}</span>
                    <div>
                      <h4 className="text-white font-semibold text-sm mb-1 group-hover:text-primary transition-colors duration-300">{item.title}</h4>
                      <p className="text-white/50 text-xs leading-relaxed">{item.body}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25) 50%, transparent)" }} />

      {/* From Ideas to Live */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(124,58,237,0.05) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }} className="relative">
              <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80" alt="Workflow automation" className="w-full h-96 object-cover" style={{ filter: "brightness(0.65) saturate(0.85)" }} />
                <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(225deg, rgba(124,58,237,0.1) 0%, transparent 60%)" }} />
              </div>
              <div className="absolute -right-6 top-8 px-5 py-4 rounded-xl space-y-1" style={{ background: "rgba(6,2,16,0.92)", border: "1px solid rgba(124,58,237,0.25)", backdropFilter: "blur(10px)" }}>
                {["Map", "Build", "Test", "Launch"].map((step, i) => (
                  <div key={step} className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg cursor-default transition-all duration-200 group/step hover:-translate-y-0.5 hover:bg-white/5">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0 group-hover/step:shadow-[0_0_10px_rgba(124,58,237,0.6)] group-hover/step:scale-110 transition-all duration-200" style={{ background: "#7C3AED", color: "#ffffff" }}>{i + 1}</div>
                    <span className="text-white/70 text-xs font-semibold group-hover/step:text-white transition-colors duration-200">{step}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>
                <Zap className="w-3 h-3" /> Bringing Your Ideas to Life
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
                From Ideas to a{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">Live Zapier Workflow</span>
              </motion.h2>
              {[
                "We can take your ideas and turn it into a fully functional project. Our team has experience of helping businesses across various industries to develop applications right from the ideation phase.",
                "We get you the possibility of starting with you how we can assist you in achieving the best out of our Zapier Agency in the UK in the short-term.",
              ].map((p, i) => (
                <motion.p key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12 + i * 0.08 }} className="text-white/55 leading-relaxed mb-5 text-sm">{p}</motion.p>
              ))}
              <motion.a href="/contact-us" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.28 }} className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(124,58,237,0.35)]" style={{ background: "#7C3AED", color: "#ffffff" }}>
                Start Your Project <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25) 50%, transparent)" }} />

      {/* Services */}
      <section id="services" className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(124,58,237,0.04) 0%, transparent 65%)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="mb-14">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>
              <Workflow className="w-3 h-3" /> What We Offer
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
              Our Services &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">Offerings</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.14 }} className="text-white/40 text-sm max-w-2xl leading-relaxed">
              We get started with you how we can assist you in achieving the best out of our Zapier Agency in the UK. Our team of Zapier experts design, build, and maintain automation workflows that genuinely transform your operations.
            </motion.p>
          </div>
          <div className="grid lg:grid-cols-2 gap-5">
            {services.map((s, i) => {
              const Icon = s.icon;
              const num  = String(i + 1).padStart(2, "0");
              const isLast = i === services.length - 1 && services.length % 2 !== 0;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className={`group relative rounded-2xl p-8 overflow-hidden transition-all duration-300 hover:border-primary/40${isLast ? " lg:col-span-2 lg:max-w-[calc(50%-10px)] lg:mx-auto lg:w-full" : ""}`}
                  style={{ background: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <span className="absolute top-4 right-6 text-7xl font-black select-none pointer-events-none leading-none" style={{ color: "rgba(124,58,237,0.06)" }}>{num}</span>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" style={{ background: "radial-gradient(ellipse 60% 50% at 0% 0%, rgba(124,58,237,0.06) 0%, transparent 70%)" }} />
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)" }}>
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(124,58,237,0.3), transparent)" }} />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-3 group-hover:text-primary transition-colors duration-300">{s.title}</h3>
                    <p className="text-white/45 text-sm leading-relaxed mb-5">{s.body}</p>
                    <div className="flex flex-wrap gap-2">
                      {s.bullets.map((b, j) => (
                        <span key={j} className="px-3 py-1 rounded-full text-xs font-medium text-white/55" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>{b}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25) 50%, transparent)" }} />

      {/* Why Choose Us */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124,58,237,0.05) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="text-center mb-14">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>
              <Users className="w-3 h-3" /> Why Choose Us?
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="text-3xl md:text-5xl font-bold text-white leading-tight">Why Choose Us?</motion.h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-5">
            <div className="space-y-3">
              {whyUsLeft.map((text, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="relative flex items-start gap-4 p-5 rounded-xl group overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30" style={{ background: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(180deg, transparent, ${GOLD}, transparent)` }} />
                  <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5 relative z-10" style={{ background: GOLD }} />
                  <span className="relative z-10 text-white/65 text-sm leading-snug group-hover:text-white transition-colors duration-300">{text}</span>
                </motion.div>
              ))}
            </div>
            <div className="space-y-3">
              {whyUsRight.map((text, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="relative flex items-start gap-4 p-5 rounded-xl group overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30" style={{ background: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5 relative z-10" style={{ background: GOLD }} />
                  <span className="relative z-10 text-white/65 text-sm leading-snug group-hover:text-white transition-colors duration-300">{text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25) 50%, transparent)" }} />

      {/* FAQ */}
      <section className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
            <div className="lg:sticky lg:top-32">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-6" style={pillStyle}>
                <ChevronDown className="w-3 h-3" /> FAQs
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
                Frequently Asked{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">Questions</span>
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.14 }} className="text-white/40 text-sm leading-relaxed mb-8">Can't find what you're looking for? Reach out directly.</motion.p>
              <motion.a href="/contact-us" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105" style={{ background: "#7C3AED", color: "#ffffff" }}>
                Ask Us Anything <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>
            <div className="space-y-3">
              {faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} index={i} />)}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.5) 50%, transparent)" }} />
        <div className="relative" style={{ background: "linear-gradient(135deg, #080316 0%, #0D0819 50%, #080316 100%)" }}>
          <div className="absolute inset-0 pointer-events-none glow-pulse-bg" style={{ background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(124,58,237,0.1) 0%, transparent 70%)" }} />
          <div className="relative z-10 py-28 px-6 text-center max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
                Expert{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">Zapier Automation Services</span>
                <br />for your business
              </h2>
              <p className="text-white/45 text-xl mb-12 leading-relaxed">Reach out to book your free consultation and explore how we can support you.</p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a href="/contact-us" className="inline-flex items-center gap-2.5 px-10 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(124,58,237,0.5)]" style={{ background: "#7C3AED", color: "#ffffff" }}>
                  Contact Us <ArrowRight className="w-5 h-5" />
                </a>
                
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
