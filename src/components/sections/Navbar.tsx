"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Phone, Mail, ChevronDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const logoPath = "/logo-r-1_1779194780236.png";
import { QuoteModal } from "./QuoteModal";

const SERVICES_COLS = [
  {
    heading: "CMS Development",
    items: [
      { label: "WordPress",                href: "/wordpress-development-services-uk" },
      { label: "WooCommerce",              href: "/woocommerce-web-developers" },
      { label: "Drupal",                   href: "/drupal-development-services-uk" },
      { label: "Magento",                  href: "/magento-development-uk" },
      { label: "Shopify",                  href: "/shopify-developers-for-hire-uk" },
      { label: "Joomla Website Development", href: "/joomla-developer-uk" },
    ],
  },
  {
    heading: "Web Development",
    items: [
      { label: "Laravel",                      href: "/laravel-developers-uk" },
      { label: "Codeigniter",                  href: "/codeigniter-development" },
      { label: "PHP Web Development",          href: "/php-development-company-uk" },
      { label: "AI Developers",                href: "/hire-ai-developers-uk" },
      { label: "Generative AI Development",    href: "/hire-generative-ai-developers-uk" },
      { label: "Java Development",             href: "/hire-java-programmer" },
      { label: "DevOps",                       href: "/devops-services-uk" },
      { label: "Linux Server Administration",  href: "/linux-server-support-uk" },
      { label: "Zoho CRM Development Services",href: "/zoho-crm-developers-uk" },
      { label: "Zapier Development Services",  href: "/zapier-automation-services" },
      { label: "Information Security",         href: "/information-security-services-uk" },
      { label: "Penetration Testers",          href: "/penetration-testing-services-uk" },
    ],
  },
  {
    heading: "Mobile Development",
    items: [
      { label: "Mobile App",               href: "/mobile-app-development-uk" },
      { label: "React Native Development", href: "/hire-react-native-developers" },
      { label: "Flutter Development",      href: "/hire-flutter-developers" },
    ],
  },
  {
    heading: "Solutions Built with AI",
    items: [
      { label: "AI-Powered Social Media",  href: "/ai-social-media-services" },
      { label: "AI Team Training",         href: "/ai-team-training-services",       badge: "Popular" },
      { label: "Done-For-You AI Agents",   href: "/ai-agent-development-services" },
      { label: "AI Team Transformation",   href: "/ai-team-transformation-services" },
      { label: "Workflow Automation",      href: "/workflow-automation-services" },
      { label: "Vibe Coding Cleaner",      href: "/vibe-coding-cleaner" },
    ],
  },
];

const NAV_LINKS = [
  { label: "Home",     href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Clients",  href: "/clients" },
  { label: "Blog",     href: "/blog" },
  { label: "Contact",  href: "/contact-us" },
];

export function Navbar() {
  const [scrolled,           setScrolled]           = useState(false);
  const [active,             setActive]             = useState("Home");
  const [servicesOpen,       setServicesOpen]       = useState(false);
  const [mobileOpen,         setMobileOpen]         = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [quoteOpen,          setQuoteOpen]          = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#080316]/96 backdrop-blur-md py-2.5 shadow-[0_4px_30px_rgba(0,0,0,0.6)] border-b border-white/[0.04]"
            : "bg-[#080316]/85 backdrop-blur-sm py-3"
        }`}
      >
        <div className="relative w-full px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4">

          {/* ── Logo ── */}
          <Link href="/" className="flex-shrink-0 z-10">
            <img src={logoPath} alt="HireProgrammer" className="h-8 sm:h-10 w-auto object-contain" style={{ filter: "brightness(0) invert(1)" }} />
          </Link>

          {/* ── Desktop Nav links — centered ── */}
          <nav className="hidden lg:flex items-center gap-0.5 text-sm font-medium flex-1 justify-center">
            <a
              href="/"
              onClick={() => setActive("Home")}
              className={`px-3 py-2 rounded-md transition-colors duration-200 whitespace-nowrap ${
                active === "Home" ? "text-primary" : "text-white/65 hover:text-white"
              }`}
            >
              Home
            </a>
            <a
              href="/about-us"
              onClick={() => setActive("About Us")}
              className={`px-3 py-2 rounded-md transition-colors duration-200 whitespace-nowrap ${
                active === "About Us" ? "text-primary" : "text-white/65 hover:text-white"
              }`}
            >
              About Us
            </a>

            {/* Services mega-menu */}
            <div
              ref={servicesRef}
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                onClick={() => { setActive("Services"); window.location.href = "/services"; }}
                onMouseEnter={() => setServicesOpen(true)}
                className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors duration-200 whitespace-nowrap ${
                  active === "Services" ? "text-primary" : "text-white/65 hover:text-white"
                }`}
              >
                Services
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[980px] bg-[#0D0819] border border-white/8 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] overflow-hidden"
                  >
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                    <div className="grid grid-cols-4 gap-0 p-8">
                      {SERVICES_COLS.map((col, ci) => (
                        <div
                          key={col.heading}
                          className={[
                            ci === 0 ? "pr-6" : "",
                            ci > 0 && ci < SERVICES_COLS.length - 1 ? "px-6 border-l border-white/6" : "",
                            ci === SERVICES_COLS.length - 1 ? "pl-6 border-l border-white/6" : "",
                          ].join(" ")}
                        >
                          <h5 className="text-primary font-semibold text-sm mb-4">{col.heading}</h5>
                          <ul className="space-y-2.5">
                            {col.items.map(item => (
                              <li key={item.label}>
                                <a href={item.href} className="flex items-center gap-2 text-white/60 text-sm hover:text-white transition-colors duration-150 leading-snug">
                                  {item.label}
                                  {"badge" in item && item.badge && (
                                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0"
                                      style={{ background: "rgba(124,58,237,0.18)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.3)" }}>
                                      {item.badge}
                                    </span>
                                  )}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Remaining links */}
            {NAV_LINKS.filter(l => !["Home", "About Us"].includes(l.label)).map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setActive(label)}
                className={`px-3 py-2 rounded-md transition-colors duration-200 whitespace-nowrap ${
                  active === label ? "text-primary" : "text-white/65 hover:text-white"
                }`}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* ── Right: contact + CTA + hamburger ── */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Phone — lg+ only */}
            <a
              href="tel:02080589005"
              className="hidden lg:flex items-center gap-1.5 text-white text-sm font-semibold whitespace-nowrap hover:text-primary transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              0208 058 9005
            </a>

            {/* Divider + email — xl+ only */}
            <span className="hidden xl:block w-px h-4 bg-white/15 mx-1" />
            <a
              href="mailto:contact@hireprogrammer.co.uk"
              className="hidden xl:flex items-center gap-1.5 text-white/50 text-sm whitespace-nowrap hover:text-primary transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-primary/60 flex-shrink-0" />
              contact@hireprogrammer.co.uk
            </a>

            <button
              onClick={() => setQuoteOpen(true)}
              className="hidden lg:inline-flex items-center justify-center h-9 px-4 rounded-full text-sm font-bold transition-all duration-200 whitespace-nowrap hover:scale-105 ml-1"
              style={{ background: "#ffffff", color: "#080316" }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "linear-gradient(135deg, #9B3FFF 0%, #7C3AED 55%, #5B21B6 100%)";
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.boxShadow = "0 0 22px rgba(124,58,237,0.55)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "#ffffff";
                e.currentTarget.style.color = "#080316";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Get a Free Quote
            </button>

            {/* Hamburger — mobile + tablet */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-colors"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>

        </div>

        <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
      </header>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={closeMobile}
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[85vw] max-w-sm flex flex-col md:hidden overflow-y-auto"
              style={{ background: "#080316", borderLeft: "1px solid rgba(255,255,255,0.08)" }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
                <img src={logoPath} alt="HireProgrammer" className="h-8 w-auto object-contain" style={{ filter: "brightness(0) invert(1)" }} />
                <button onClick={closeMobile} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <X className="w-4 h-4 text-white/70" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 px-5 py-6 space-y-1">
                {NAV_LINKS.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    onClick={closeMobile}
                    className="flex items-center px-3 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {label}
                  </a>
                ))}

                {/* Services accordion */}
                <div>
                  <button
                    onClick={() => setMobileServicesOpen(v => !v)}
                    className="flex items-center justify-between w-full px-3 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Services
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 pb-2 space-y-4 pt-2">
                          {SERVICES_COLS.map(col => (
                            <div key={col.heading}>
                              <p className="text-primary text-[11px] font-bold uppercase tracking-wider mb-2 px-3">{col.heading}</p>
                              {col.items.map(item => (
                                <a
                                  key={item.label}
                                  href={item.href}
                                  onClick={closeMobile}
                                  className="block px-3 py-2 rounded-lg text-sm text-white/55 hover:text-white hover:bg-white/5 transition-colors"
                                >
                                  {item.label}
                                </a>
                              ))}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </nav>

              {/* Bottom: contact info + CTA */}
              <div className="px-5 pb-8 pt-4 border-t border-white/8 space-y-4">
                <a href="tel:02080589005" className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  0208 058 9005
                </a>
                <a href="mailto:contact@hireprogrammer.co.uk" className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  contact@hireprogrammer.co.uk
                </a>
                <button
                  onClick={() => { setQuoteOpen(true); setMobileOpen(false); }}
                  className="w-full h-11 rounded-full font-bold text-sm mt-2 transition-all duration-200 hover:opacity-90 flex items-center justify-center"
                  style={{ background: "#7C3AED", color: "#ffffff" }}
                >
                  Get a Free Quote
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
