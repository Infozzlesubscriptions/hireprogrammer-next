"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { useQuoteModal } from '@/context/QuoteModalContext';
import { HeroContactForm } from '@/components/sections/HeroContactForm';
import {
  ArrowRight, CheckCircle2, ChevronDown, Shield, AlertTriangle,
  Star, Lock, FileSearch, Eye, BarChart3, Scale, Users, Zap,
} from "lucide-react";

const GOLD = "#7C3AED";
const pillStyle = { background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.22)" };
const cardStyle = { background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" };

const whySecurity = [
  {
    num: "01",
    title: "Cybersecurity",
    body: "Ensuring that information is only accessible to authorised individuals and entities is essential to a secure organisation, including limiting access to sensitive data to only authorised users, ensuring that sensitive information is not vulnerable to data breaches and that information is available when and where it's required.",
  },
  {
    num: "02",
    title: "Intrusion Prevention Systems (IPS)",
    body: "Network security devices that monitor and control incoming and outgoing network traffic and block attempts to gain unauthorised access. IPS solutions deliver real-time protection by analysing packet streams and automatically blocking suspicious activity before it can compromise your systems.",
  },
  {
    num: "03",
    title: "Vulnerability Assessments and Penetration Testing",
    body: "Procedures to identify vulnerabilities in systems, networks, or applications before those vulnerabilities can be exploited. It's better to test vulnerabilities themselves by how teams that help resolve these vulnerabilities, then let the attackers exploit them. Our systematic approach ensures comprehensive coverage across your entire attack surface.",
  },
  {
    num: "04",
    title: "Security Assessments and Training",
    body: "Establishing policies and procedures to enable and support security consciousness, including full cyber security assessments, and network access rights and access policies. Training your staff is often the most cost-effective security investment, transforming your people from a vulnerability into your strongest defence.",
  },
  {
    num: "05",
    title: "Security Assessments and Training",
    body: "Ensuring sales personnel are aware about about information security best practices, ensuring compliance with security standards and company policies, and handling any breach of security that may lead to data breaches or other violations of security policy. Regular assessments track improvement and maintain regulatory standing.",
  },
  {
    num: "06",
    title: "Regulatory Compliance",
    body: "Adhering to legal, industry, and organisational requirements related to information security, including standards such as HIPAA, GDPR, PCI-DSS, and ISO 27001. An information security framework that ensures compliance establishes the internal security practices and policies, standards that help organisations meet and sustain compliance.",
  },
];

const services = [
  {
    icon: AlertTriangle,
    title: "Risk Assessment and Management",
    body: "We conduct thorough assessments to identify potential vulnerabilities and risks within your IT infrastructure. Our experts analyse the findings and develop strategies to manage and mitigate these risks effectively. We deliver a prioritised risk register and treatment plan aligned to your business objectives.",
    bullets: ["Risk register", "Threat modelling", "Impact analysis", "Treatment plans"],
  },
  {
    icon: FileSearch,
    title: "Security Audits",
    body: "Our security audits involve evaluating your systems, networks, and applications to identify security gaps. We provide detailed reports outlining any vulnerabilities and recommendations to enhance your overall security posture. Audits are conducted against industry frameworks including ISO 27001, NIST, and CIS Controls.",
    bullets: ["Network audits", "Application audits", "Policy reviews", "Gap analysis"],
  },
  {
    icon: Shield,
    title: "Security Architecture and Design",
    body: "We assist in designing and implementing robust security architectures that align with your organisational goals and regulatory requirements. Our experts ensure that security is integrated into all aspects of your IT infrastructure from the ground up, not bolted on as an afterthought.",
    bullets: ["Zero-trust design", "Network segmentation", "IAM frameworks", "Secure SDLC"],
  },
  {
    icon: Lock,
    title: "Data Protection and Encryption",
    body: "We help organisations implement robust data protection strategies. By applying end-to-end encryption and data prevention strategies, you can control and also protect your data from breaches. We design solutions covering data at rest, in transit, and in use — across cloud and on-premise environments.",
    bullets: ["Encryption at rest", "TLS/mTLS", "DLP controls", "Key management"],
  },
  {
    icon: Scale,
    title: "Compliance and Regulatory Support",
    body: "We help organisations navigate complex information security regulations and standards, with in-depth knowledge of regulatory requirements such as GDPR, PCI-DSS, HIPAA, and more. Our experts provide guidance and support in aligning your business practices with the latest compliance mandates.",
    bullets: ["GDPR compliance", "ISO 27001", "PCI-DSS", "Audit preparation"],
  },
  {
    icon: Eye,
    title: "Security Monitoring and Incident Detection",
    body: "We provide proactive security monitoring services to detect and respond to potential threats in real time. Our 24/7 monitoring services use the latest security tools and technologies to protect your environment and enable rapid incident response, minimising damage and downtime.",
    bullets: ["SIEM monitoring", "Threat detection", "Incident response", "Forensic analysis"],
  },
];

const whyUsLeft = [
  "Full team of highly skilled and experienced professionals who have deep understanding of information security and cybersecurity",
  "Proactive security measures that help minimise vulnerabilities and reduce the risk of cyber threats",
  "Tailored solutions and strategies that align your business goals",
];

const whyUsRight = [
  "Proactive security measures that help minimise vulnerabilities with robust security features, measures and regulations to comply with industry-specific compliance standards",
  "Ongoing support and updates to evolve your security posture as the threat landscape changes",
  "Transparent reporting and clear communication at every stage",
];

const faqs = [
  {
    q: "What is information security and why do I need it?",
    a: "Information security is the practice of protecting digital and physical information assets from unauthorised access, use, disclosure, disruption, modification, or destruction. Every business that holds customer data, financial information, or intellectual property needs it — data breaches cause financial losses, reputational damage, and legal liability.",
  },
  {
    q: "How much does cybersecurity cost for a small business?",
    a: "Cybersecurity costs depend on your business size, the data you handle, and your risk profile. Basic security assessments can start from a few hundred pounds, while comprehensive ongoing security programmes for SMEs typically run from £500–£3,000 per month. Contact us for a free risk assessment and tailored quote.",
  },
  {
    q: "What's the difference between a firewall and antivirus?",
    a: "A firewall monitors and controls network traffic, acting as a barrier between trusted and untrusted networks. Antivirus software detects and removes malicious software on individual devices. Both are necessary layers in a comprehensive security strategy, but neither alone is sufficient to protect a modern organisation.",
  },
  {
    q: "How often should we run penetration testing?",
    a: "Most security frameworks and compliance standards recommend penetration testing at least annually, with additional tests after significant infrastructure changes, new system deployments, or major software updates. High-risk industries such as finance, healthcare, and e-commerce typically test more frequently — quarterly or even continuously.",
  },
  {
    q: "How does a UK company comply with GDPR?",
    a: "GDPR compliance involves implementing appropriate technical and organisational measures to protect personal data, maintaining records of processing activities, conducting data protection impact assessments for high-risk processing, establishing clear data subject rights procedures, and appointing a Data Protection Officer where required.",
  },
  {
    q: "Is GDPR compliance and security the same thing?",
    a: "No, but they are closely related. GDPR compliance requires implementing security measures to protect personal data, so good security practices support compliance. However, compliance is broader — covering transparency, consent, data subject rights, and lawful basis for processing — while security focuses specifically on protecting information from threats.",
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

export default function InformationSecurityPage() {
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
          <img src="/info-security-hero-banner.png" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.45) saturate(1.1)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(8,3,22,0.85) 0%, rgba(8,3,22,0.55) 50%, rgba(8,3,22,0.80) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(124,58,237,0.07) 0%, transparent 65%)" }} />
        </motion.div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-14 items-center">
          <motion.div style={{ opacity: heroOp }}>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-6" style={pillStyle}>
              <Shield className="w-3 h-3" /> Information Security
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.65 }} className="text-4xl md:text-6xl font-black text-white leading-[1.08] tracking-tight mb-6">
              Expert{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">Information Security</span>
              <br />Services UK
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-white/50 text-xl leading-relaxed mb-10 max-w-md">
              Build the right product from the very start — with UK's leading information security agency.
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
            <HeroContactForm pageName="Information Security" extraField={{ label: "Requirement", type: "text", placeholder: "Describe your security needs..." }} />
          </motion.div>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4) 50%, transparent)" }} />

      {/* Intro + Why */}
      <section className="py-24 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(124,58,237,0.04) 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>
                <Shield className="w-3 h-3" /> Information Security
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
                UK's Premier{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">Cybersecurity Agency</span>
              </motion.h2>
              {[
                "Information security, also known as cybersecurity or information governance, is the practice of protecting information systems, networks, and data from unauthorised access, disclosure, modification, or destruction. It is the practice of protecting information, improving information technologies, and using technologies and protocols to ensure the confidentiality, integrity, and availability of information. It involves the creation and implementation of information security, implementing industry-best technologies, and technological experts to evaluate your information security posture and mitigate risks.",
                "HireProgrammer's information security services give our clients a comprehensive plan to safeguard your digital assets, protect sensitive data, and integrate this risk to your organisation. We work in partnership with your team to build security into your business — not bolt it on as an afterthought.",
              ].map((p, i) => (
                <motion.p key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08 }} className="text-white/55 leading-relaxed mb-4 text-sm">{p}</motion.p>
              ))}
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.28 }} className="mt-4 rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=900&q=80" alt="Cybersecurity" className="w-full h-52 object-cover" style={{ filter: "brightness(0.65) saturate(0.8)" }} />
              </motion.div>
            </div>
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-primary font-semibold uppercase tracking-widest mb-5" style={pillStyle}>
                <Star className="w-3 h-3" /> Why Information Security?
              </motion.div>
              <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="text-2xl font-bold text-white leading-tight mb-6">Why Information Security?</motion.h3>
              <div className="space-y-3">
                {whySecurity.map((item, i) => (
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
                <img src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=900&q=80" alt="Security implementation" className="w-full h-96 object-cover" style={{ filter: "brightness(0.65) saturate(0.85)" }} />
                <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(225deg, rgba(124,58,237,0.1) 0%, transparent 60%)" }} />
              </div>
              <div className="absolute -right-6 top-8 px-5 py-4 rounded-xl space-y-1" style={{ background: "rgba(6,2,16,0.92)", border: "1px solid rgba(124,58,237,0.25)", backdropFilter: "blur(10px)" }}>
                {["Assess", "Design", "Implement", "Monitor"].map((step, i) => (
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">Secure Organisation</span>
              </motion.h2>
              {[
                "We can take your ideas and turn it into a fully functional project. Our team has experience of helping businesses across various industries to develop applications right from the ideation phase.",
                "From initial risk assessment and security architecture design through to ongoing monitoring and incident response, our security specialists partner with you at every stage.",
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
              <Shield className="w-3 h-3" /> What We Offer
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
              Our Services &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">Offerings</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.14 }} className="text-white/40 text-sm max-w-2xl leading-relaxed">
              We provide our Information Security services right to deliver comprehensive services to safeguard your digital assets, protect sensitive data, and mitigate risks across every layer of your organisation.
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
                Expert{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF40C8] via-[#7C3AED] to-[#C060FF]">Information Security Services UK</span>
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
