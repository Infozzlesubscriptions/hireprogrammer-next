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

const CookieTable = ({
  rows,
}: {
  rows: { name: string; provider: string; purpose: string; expiry: string }[];
}) => (
  <div className="overflow-x-auto rounded-xl mt-4 mb-2" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
    <table className="w-full text-xs" style={{ borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ background: "rgba(255,255,255,0.04)" }}>
          {["Cookie", "Provider", "Purpose", "Expiry"].map((h) => (
            <th
              key={h}
              className="text-left px-4 py-3 font-semibold uppercase tracking-wider"
              style={{ color: "rgba(255,255,255,0.5)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <td className="px-4 py-3 font-mono" style={{ color: GOLD }}>{r.name}</td>
            <td className="px-4 py-3" style={{ color: "rgba(255,255,255,0.6)" }}>{r.provider}</td>
            <td className="px-4 py-3" style={{ color: "rgba(255,255,255,0.5)" }}>{r.purpose}</td>
            <td className="px-4 py-3" style={{ color: "rgba(255,255,255,0.4)" }}>{r.expiry}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function CookiePolicy() {
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
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">Cookie Policy</h1>
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
          <Section title="What Are Cookies?">
            <p>
              Cookies are small text files stored on your device when you visit a website.
              They help the site remember your preferences, measure traffic, and improve
              the browsing experience.
            </p>
          </Section>

          <Section title="How We Use Cookies">
            <p>
              HireProgrammer.co.uk uses a minimal set of cookies. We do not use advertising
              or tracking cookies beyond basic site analytics.
            </p>
          </Section>

          <Section title="Strictly Necessary Cookies">
            <p>
              These cookies are required for the website to function and cannot be disabled.
              They are usually set in response to actions you take (e.g. filling in a form).
            </p>
            <CookieTable
              rows={[
                {
                  name: "__session",
                  provider: "HireProgrammer",
                  purpose: "Maintains your session state across pages",
                  expiry: "Session",
                },
              ]}
            />
          </Section>

          <Section title="Analytics Cookies">
            <p>
              We use Google Analytics to understand how visitors interact with the site.
              All data is anonymised — we do not collect personally identifiable information
              through these cookies.
            </p>
            <CookieTable
              rows={[
                {
                  name: "_ga",
                  provider: "Google Analytics",
                  purpose: "Distinguishes unique users",
                  expiry: "2 years",
                },
                {
                  name: "_ga_*",
                  provider: "Google Analytics",
                  purpose: "Maintains session state for GA4",
                  expiry: "2 years",
                },
                {
                  name: "_gid",
                  provider: "Google Analytics",
                  purpose: "Distinguishes users within a 24-hour window",
                  expiry: "24 hours",
                },
              ]}
            />
          </Section>

          <Section title="Managing Cookies">
            <p>
              You can control and delete cookies through your browser settings. Disabling
              analytics cookies will not affect your ability to use the site.
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong className="text-white/70">Chrome</strong> — Settings → Privacy and Security → Cookies and other site data
              </li>
              <li>
                <strong className="text-white/70">Firefox</strong> — Settings → Privacy & Security → Cookies and Site Data
              </li>
              <li>
                <strong className="text-white/70">Safari</strong> — Preferences → Privacy → Manage Website Data
              </li>
              <li>
                <strong className="text-white/70">Edge</strong> — Settings → Cookies and site permissions
              </li>
            </ul>
          </Section>

          <Section title="Third-Party Cookies">
            <p>
              Google Analytics sets cookies under the <code className="px-1 py-0.5 rounded text-xs" style={{ background: "rgba(255,255,255,0.07)", color: GOLD }}>google.com</code> domain.
              For more information see{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline transition-colors"
                style={{ color: GOLD }}
              >
                Google's Privacy Policy
              </a>.
            </p>
          </Section>

          <Section title="Contact Us">
            <p>
              If you have questions about our use of cookies, please contact us at{" "}
              <a href="mailto:contact@hireprogrammer.co.uk" className="underline" style={{ color: GOLD }}>
                contact@hireprogrammer.co.uk
              </a>.
            </p>
          </Section>

          <div
            className="rounded-xl p-5 text-sm mt-8"
            style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.18)", color: "rgba(255,255,255,0.45)" }}
          >
            This policy may be updated to reflect changes in our cookie usage or applicable law. The date at the top shows when it was last revised.
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
