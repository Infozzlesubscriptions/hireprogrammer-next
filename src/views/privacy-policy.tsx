"use client";

import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { motion } from "framer-motion";

const GOLD = "#7C3AED";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <h2 className="text-white font-bold text-xl mb-4" style={{ color: "rgba(255,255,255,0.95)" }}>
      {title}
    </h2>
    <div className="text-sm leading-relaxed space-y-3" style={{ color: "rgba(255,255,255,0.55)" }}>
      {children}
    </div>
  </div>
);

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <div
        className="pt-32 pb-16 px-6 text-center"
        style={{ background: "linear-gradient(180deg,#0d0720 0%,#080316 100%)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
            style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)", color: GOLD }}
          >
            Legal
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">Privacy Policy</h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            Last updated: 1 June 2025
          </p>
        </motion.div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-10 py-16 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Section title="Who We Are">
            <p>
              HireProgrammer.co.uk is operated by Infozzle Ltd, registered in England and Wales.
              Our registered address is 80 Telford Ave, London, SW2 4XF. We provide on-demand
              software development and technical services.
            </p>
            <p>
              This Privacy Policy explains how we collect, use, and protect personal information
              when you visit our website or use our services.
            </p>
          </Section>

          <Section title="Information We Collect">
            <p>We may collect the following types of information:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-white/70">Contact details</strong> — name, email address, phone number when you fill in a contact or quote form.</li>
              <li><strong className="text-white/70">Usage data</strong> — pages visited, time on site, browser type, and IP address via Google Analytics.</li>
              <li><strong className="text-white/70">Communications</strong> — any messages you send us via email or the website chat widget.</li>
            </ul>
          </Section>

          <Section title="How We Use Your Information">
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Respond to enquiries and deliver the services you request.</li>
              <li>Send you project updates or follow-up communications relevant to your enquiry.</li>
              <li>Improve our website experience through aggregated analytics.</li>
              <li>Comply with legal obligations.</li>
            </ul>
            <p>We do not sell, rent, or trade your personal data to third parties.</p>
          </Section>

          <Section title="Legal Basis for Processing">
            <p>Under UK GDPR, we process your data on the following bases:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-white/70">Contract</strong> — to fulfil a service you have requested.</li>
              <li><strong className="text-white/70">Legitimate interests</strong> — to respond to enquiries and improve our services.</li>
              <li><strong className="text-white/70">Consent</strong> — where you have opted in to marketing communications.</li>
            </ul>
          </Section>

          <Section title="Cookies">
            <p>
              We use cookies to improve site performance and gather analytics. For full details
              on the cookies we set and how to manage them, please see our{" "}
              <a href="/cookie-policy" className="underline transition-colors" style={{ color: GOLD }}>
                Cookie Policy
              </a>.
            </p>
          </Section>

          <Section title="Data Retention">
            <p>
              We retain your personal data for as long as necessary to provide our services and
              meet our legal obligations. Contact enquiries are kept for up to 3 years unless you
              ask us to delete them sooner.
            </p>
          </Section>

          <Section title="Your Rights">
            <p>Under UK GDPR you have the right to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request deletion of your data ("right to be forgotten").</li>
              <li>Object to or restrict processing.</li>
              <li>Data portability.</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us at{" "}
              <a href="mailto:contact@hireprogrammer.co.uk" className="underline" style={{ color: GOLD }}>
                contact@hireprogrammer.co.uk
              </a>.
            </p>
          </Section>

          <Section title="Third-Party Services">
            <p>We use the following third-party services that may process your data:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-white/70">Google Analytics</strong> — website traffic analysis (anonymised).</li>
              <li><strong className="text-white/70">EmailJS</strong> — for delivering contact form submissions to our inbox.</li>
            </ul>
            <p>
              Each service operates under its own privacy policy and data processing agreements.
            </p>
          </Section>

          <Section title="Contact Us">
            <p>
              If you have questions about this policy or how we handle your data, please contact:
            </p>
            <p>
              <strong className="text-white/70">Infozzle Ltd</strong><br />
              80 Telford Ave, London, SW2 4XF<br />
              <a href="mailto:contact@hireprogrammer.co.uk" className="underline" style={{ color: GOLD }}>
                contact@hireprogrammer.co.uk
              </a>
            </p>
          </Section>

          <div
            className="rounded-xl p-5 text-sm mt-8"
            style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.18)", color: "rgba(255,255,255,0.45)" }}
          >
            This policy may be updated from time to time. The date at the top of this page shows when it was last revised.
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
