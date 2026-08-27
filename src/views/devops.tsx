"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { useQuoteModal } from '@/context/QuoteModalContext';
import { HeroContactForm } from '@/components/sections/HeroContactForm';
import {
  ArrowRight, CheckCircle2, ChevronDown, Code2, Zap, Shield,
  Star, RefreshCw, Cpu, Lock, BarChart3, AlertTriangle, Settings, Users,
} from "lucide-react";

const GOLD = "#7C3AED";
const pillStyle = { background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.22)" };
const cardStyle = { background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" };

const whyDevops = [
  {
    num: "01",
    title: "Continuous Integration (CI)",
    body: "Continuous Integration integrates code changes from multiple developers into a shared repository frequently. It automates the use of automated build and testing processes to ensure integration happens as often as possible, typically daily, at a minimum. This helps prevent integration problems and keeps the team aligned.",
  },
  {
    num: "02",
    title: "Infrastructure as Code (IaC)",
    body: "Infrastructure as Code allows you to manage and provision infrastructure through code, rather than manual configurations. IaC ensures consistency across servers, environments, and deployments by defining and maintaining desired system states declaratively, leading to reproducibility and maintainability.",
  },
  {
    num: "03",
    title: "Continuous Monitoring",
    body: "DevOps encourages real-time monitoring of applications and infrastructure to help quickly resolve issues, track key metrics, and facilitate proactive maintenance. Our experts are experienced in deploying the right monitoring stacks to surface actionable insight across your entire delivery pipeline.",
  },
  {
    num: "04",
    title: "Security",
    body: "Security is an integral part of DevOps practices. DevOps promotes security-first thinking in development, surrounding it throughout the software lifecycle. Our team integrates automated security scanning, vulnerability management, and compliance-as-code across all your pipelines.",
  },
];

const services = [
  {
    icon: RefreshCw,
    title: "Continuous Integration and Continuous Delivery (CI/CD)",
    body: "We design and implement robust CI/CD pipelines that automate the build, test, and deployment process, enabling rapid and reliable software delivery. Our expertise in cutting-edge CI/CD tools enables us to establish seamless integration workflows that accelerate delivery and increase quality.",
    bullets: ["Pipeline automation", "GitOps workflows", "Blue-green deploys", "Rollback strategies"],
  },
  {
    icon: Cpu,
    title: "Infrastructure as Code",
    body: "We help you build a culture of efficiency, reliability, and collaboration by implementing industry best practices. We utilise code-based tools like Terraform, Ansible, or Pulumi to handle infrastructure automatically, ensuring reproducible and version-controlled environments at any scale.",
    bullets: ["Terraform", "Ansible", "Pulumi", "CloudFormation"],
  },
  {
    icon: AlertTriangle,
    title: "Containerisation and Orchestration",
    body: "We assist in containerising your applications using Docker and orchestrating container deployment using Kubernetes, ensuring a consistent, scalable, and efficient cloud-native environment. We handle everything from cluster design to workload configuration and auto-scaling policies.",
    bullets: ["Docker", "Kubernetes", "Helm charts", "Service meshes"],
  },
  {
    icon: BarChart3,
    title: "Monitoring and Logging",
    body: "We employ automated monitoring and monitoring tools to give real-time visibility to gain. Our senior cadre uses tools like Prometheus, Grafana, ELK Stack or New Relic to set up, monitor, and alert on key service metrics, ensuring your teams can detect and resolve issues rapidly and effectively.",
    bullets: ["Prometheus & Grafana", "ELK Stack", "Alerting rules", "SLO/SLA monitoring"],
  },
  {
    icon: Settings,
    title: "Configuration Management",
    body: "HireProgrammer has experienced DevOps engineers who are comfortable orchestrating a wide range of infrastructure, spinning deployment tools and managing different management solutions for configuration management of systems, ensuring deployment stability and environment consistency across every tier.",
    bullets: ["Chef & Puppet", "Ansible playbooks", "Secret management", "Environment parity"],
  },
  {
    icon: Shield,
    title: "Security and Compliance",
    body: "HireProgrammer has experienced DevOps engineers who know how to incorporate Security like DevSecOps principles ensuring compliance, scalability, scanning and vulnerability through all DevOps pipelines. Our team helps organisations meet compliance requirements such as HIPAA, SOC2, and ISO standards while performing static analysis and regulatory adherence checks.",
    bullets: ["DevSecOps", "SAST/DAST scanning", "Compliance as code", "Secret rotation"],
  },
];

const whyUsLeft = [
  "Hired DevOps engineers with extensive experience in deploying scalable, secure systems",
  "We work closely with you to develop tailored DevOps strategies that align with your business goals",
  "High-quality services with the highest standards of testing and validation procedures",
];

const whyUsRight = [
  "Expertise in building strong partnerships with our clients to ensure lasting results",
  "Transparent communication and regular updates keep you informed at every stage, faster release cycles, and improved overall efficiency",
  "Cost-effective strategy by outsourcing senior management",
];

const faqs = [
  {
    q: "What is DevOps and why does my business need it?",
    a: "DevOps is a set of practices that combines software development (Dev) and IT operations (Ops), aiming to shorten the development lifecycle while delivering high-quality software continuously. Businesses benefit through faster releases, fewer failures, quicker recovery times, and a culture of continuous improvement.",
  },
  {
    q: "How much do DevOps services cost in the UK?",
    a: "DevOps costs depend on project scope, tooling, infrastructure size, and engagement model. We offer flexible arrangements from project-based engagements to monthly retainers. Contact us for a free consultation and tailored quote.",
  },
  {
    q: "What is CI/CD and how can it help my organisation?",
    a: "CI/CD stands for Continuous Integration and Continuous Delivery/Deployment. It automates the build, test, and release process so software can be released reliably and frequently. Organisations using CI/CD experience fewer bugs in production, faster time to market, and more confident deployments.",
  },
  {
    q: "Can you integrate our existing infrastructure to DevOps practices?",
    a: "Yes. We specialise in assessing existing environments and progressively introducing DevOps tooling and culture without disrupting live systems. Our team can work with legacy infrastructure and modernise it incrementally towards a fully automated pipeline.",
  },
  {
    q: "Which DevOps tools and technologies do you use?",
    a: "We work across the full DevOps toolchain including Jenkins, GitHub Actions, GitLab CI, CircleCI, Docker, Kubernetes, Terraform, Ansible, Prometheus, Grafana, ELK Stack, Vault, and more. We select tools based on your existing environment and specific requirements.",
  },
  {
    q: "How Does DevOps improve security and compliance?",
    a: "DevOps integrates security throughout the entire development and delivery pipeline (DevSecOps). This includes automated security scanning, secret management, compliance as code, and continuous audit logging — shifting security left rather than treating it as a final gate before release.",
  },
  {
    q: "What is involved in training support and monitoring for DevOps implementation?",
    a: "We provide hands-on training for your engineering teams, comprehensive runbooks and documentation, monitoring dashboards, alerting configurations, and ongoing support retainers to ensure your DevOps implementation continues to deliver value long after initial rollout.",
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

export default function DevopsPage() {
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
          <img src="/devops-hero-banner.png" alt="DevOps Services"
title="DevOps Services" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.45) saturate(1.1)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(8,3,22,0.85) 0%, rgba(8,3,22,0.55) 50%, rgba(8,3,22,0.80) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(124,58,237,0.07) 0%, transparent 65%)" }} />
        </motion.div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-14 items-center">
          <motion.div style={{ opacity: heroOp }}>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-6" style={pillStyle}>
              <RefreshCw className="w-3 h-3" /> DevOps Services
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.65 }} className="text-4xl md:text-6xl font-black text-white leading-[1.08] tracking-tight mb-6">
              Expert{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">DevOps Services UK</span>
              <br />for Your Business
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-white/50 text-xl leading-relaxed mb-10 max-w-md">
              Build the right product from the very start — with UK's leading DevOps agency.
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
            <HeroContactForm pageName="DevOps" extraField={{ label: "Requirement", type: "text", placeholder: "Describe your DevOps needs..." }} />
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
                <RefreshCw className="w-3 h-3" /> DevOps
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
                UK's Premier{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">DevOps Agency</span>
              </motion.h2>
              {[
                "DevOps, short for Development Operations, is a set of principles that helps the management and maintenance of any software development (Dev) and IT operations (Ops) to help improve collaboration, communication, and efficiency in the software development lifecycle. DevOps as a service help to streamline and share all the processes involved in building, testing, deploying, and running software applications.",
                "HireProgrammer's expert DevOps engineers work as a true extension of your business — bringing automation, visibility, and velocity to every stage of your software delivery pipeline.",
              ].map((p, i) => (
                <motion.p key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08 }} className="text-white/55 leading-relaxed mb-4 text-sm">{p}</motion.p>
              ))}
            </div>

            {/* Why DevOps */}
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>
                <Star className="w-3 h-3" /> Why DevOps?
              </motion.div>
              <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="text-2xl font-bold text-white leading-tight mb-6">Why DevOps?</motion.h3>
              <div className="space-y-3">
                {whyDevops.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group flex gap-4 p-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30" style={cardStyle}>
                    <span className="text-primary font-black text-xs flex-shrink-0 mt-0.5 font-mono">{item.num}</span>
                    <div>
                      <h4 className="text-white font-semibold text-sm mb-1.5 group-hover:text-primary transition-colors duration-300">{item.title}</h4>
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
                <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=80" alt="From ideas to live" className="w-full h-96 object-cover" style={{ filter: "brightness(0.65) saturate(0.85)" }} />
                <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(225deg, rgba(124,58,237,0.1) 0%, transparent 60%)" }} />
              </div>
              <div className="absolute -right-6 top-8 px-5 py-4 rounded-xl space-y-1" style={{ background: "rgba(6,2,16,0.92)", border: "1px solid rgba(124,58,237,0.25)", backdropFilter: "blur(10px)" }}>
                {["Plan", "Build", "Ship", "Monitor"].map((step, i) => (
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">Live DevOps Pipeline</span>
              </motion.h2>
              {[
                "We can take your ideas and turn it into a fully functional project. Our team has experience of helping businesses across various industries to develop applications right from the ideation phase.",
                "From infrastructure design and pipeline setup through to monitoring and long-term support, our DevOps team works transparently as an extension of your engineering organisation.",
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
              <Code2 className="w-3 h-3" /> What We Offer
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
              Our Services &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">Offerings</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.14 }} className="text-white/40 text-sm max-w-2xl leading-relaxed">
              HireProgrammer is providing our client DevOps services to help organisations streamline their software development and delivery processes. Our team of experienced DevOps engineers are proficient in cutting-edge tools and technologies and deliver real, measurable results.
            </motion.p>
          </div>
          <div className="grid lg:grid-cols-2 gap-5">
            {services.map((s, i) => {
              const Icon = s.icon;
              const num  = String(i + 1).padStart(2, "0");
              const isLast = i === services.length - 1 && services.length % 2 !== 0;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
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
                Start your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">DevOps Services UK</span>
                <br />journey today
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
