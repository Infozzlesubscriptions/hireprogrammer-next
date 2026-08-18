"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

const logoPath = "/logo-r-1_1779194780236.png";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

const ColHeading = ({ children }: { children: React.ReactNode }) => (
  <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5 pb-3 border-b border-white/8">
    {children}
  </h4>
);

const FootLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <Link href={href} className="text-sm text-white/45 hover:text-primary transition-colors duration-200">
      {children}
    </Link>
  </li>
);

export function Footer() {
  return (
    <footer className="bg-[#090713] border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-10 py-16">

        {/* ── Brand row ── */}
        <motion.div {...fadeUp(0)} className="mb-12">
          <Link href="/">
            <img src={logoPath} alt="HireProgrammer" className="h-10 w-auto mb-4" style={{ filter: "brightness(0) invert(1)" }} />
          </Link>
          <p className="text-sm text-white/40 leading-relaxed max-w-xs">
            Elite UK programmers, on demand. No contracts, no minimums — delivered fast and built to last.
          </p>
        </motion.div>

        {/* ── Link columns ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-[repeat(5,minmax(0,1fr))_minmax(14rem,1fr)] gap-10">

          {/* CMS Development */}
          <motion.div {...fadeUp(0.05)}>
            <ColHeading>CMS Development</ColHeading>
            <ul className="space-y-3">
              <FootLink href="/wordpress-development-services-uk">WordPress</FootLink>
              <FootLink href="/woocommerce-web-developers">WooCommerce</FootLink>
              <FootLink href="/drupal-development-services-uk">Drupal</FootLink>
              <FootLink href="/magento-development-uk">Magento</FootLink>
              <FootLink href="/shopify-developers-for-hire-uk">Shopify</FootLink>
              <FootLink href="/joomla-developer-uk">Joomla</FootLink>
            </ul>
          </motion.div>

          {/* Web Development */}
          <motion.div {...fadeUp(0.08)}>
            <ColHeading>Web Development</ColHeading>
            <ul className="space-y-3">
              <FootLink href="/laravel-developers-uk">Laravel</FootLink>
              <FootLink href="/codeigniter-development">CodeIgniter</FootLink>
              <FootLink href="/php-development-company-uk">PHP Development</FootLink>
              <FootLink href="/hire-ai-developers-uk">AI Developers</FootLink>
              <FootLink href="/hire-generative-ai-developers-uk">Generative AI</FootLink>
              <FootLink href="/hire-java-programmer">Java Development</FootLink>
              <FootLink href="/devops-services-uk">DevOps</FootLink>
              <FootLink href="/linux-server-support-uk">Linux Server</FootLink>
              <FootLink href="/zoho-crm-developers-uk">Zoho CRM</FootLink>
              <FootLink href="/zapier-automation-services">Zapier</FootLink>
              <FootLink href="/information-security-services-uk">Info Security</FootLink>
              <FootLink href="/penetration-testing-services-uk">Pen Testing</FootLink>
            </ul>
          </motion.div>

          {/* Mobile Development */}
          <motion.div {...fadeUp(0.11)}>
            <ColHeading>Mobile Development</ColHeading>
            <ul className="space-y-3">
              <FootLink href="/mobile-app-development-uk">Mobile App</FootLink>
              <FootLink href="/hire-react-native-developers">React Native</FootLink>
              <FootLink href="/hire-flutter-developers">Flutter</FootLink>
            </ul>
          </motion.div>

          {/* Solutions Built with AI */}
          <motion.div {...fadeUp(0.14)}>
            <ColHeading>AI Solutions</ColHeading>
            <ul className="space-y-3">
              <FootLink href="/ai-social-media-services">AI Social Media</FootLink>
              <FootLink href="/ai-team-training-services">AI Team Training</FootLink>
              <FootLink href="/ai-agent-development-services">AI Agents</FootLink>
              <FootLink href="/ai-team-transformation-services">AI Transformation</FootLink>
              <FootLink href="/workflow-automation-services">Workflow Automation</FootLink>
              <FootLink href="/vibe-coding-cleaner">Vibe Coding Cleaner</FootLink>
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div {...fadeUp(0.17)}>
            <ColHeading>Company</ColHeading>
            <ul className="space-y-3">
              <FootLink href="/about-us">About Us</FootLink>
              <FootLink href="/clients">Clients</FootLink>
              <FootLink href="/blog">Blog</FootLink>
              <FootLink href="/careers">Careers</FootLink>
              <FootLink href="/privacy-policy">Privacy Policy</FootLink>
              <FootLink href="/cookie-policy">Cookie Policy</FootLink>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div {...fadeUp(0.20)}>
            <ColHeading>Contact</ColHeading>
            <ul className="space-y-4">
              <li className="flex items-start gap-2.5 text-sm text-white/45">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                80 Telford Ave, London, SW2 4XF
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/45">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="tel:02080589005" className="hover:text-primary transition-colors">0208 058 9005</a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/45">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="mailto:contact@hireprogrammer.co.uk" className="hover:text-primary transition-colors whitespace-nowrap">
                  contact@hireprogrammer.co.uk
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/45">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-primary flex-shrink-0">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <a
                  href="https://uk.linkedin.com/company/hireprogrammer-co-uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  HireProgrammer.co.uk
                </a>
              </li>
            </ul>
          </motion.div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/5 py-5">
        <p className="text-center text-xs text-white/25">© Copyright 2026. HireProgrammer.co.uk. All rights reserved.</p>
      </div>
    </footer>
  );
}
