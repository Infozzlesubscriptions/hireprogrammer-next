"use client";

import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Features } from "@/components/sections/Features";
import { Process } from "@/components/sections/Process";
import { Expertise } from "@/components/sections/Expertise";
import { Stats } from "@/components/sections/Stats";
import { About } from "@/components/sections/About";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";
import { ChatWidget } from "@/components/sections/ChatWidget";

const SITE_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://hireprogrammer.co.uk/#website",
      "url": "https://hireprogrammer.co.uk/",
      "name": "HireProgrammer.co.uk",
      "description": "Hire expert UK programmers and software developers for web development, mobile apps, AI solutions, DevOps, cybersecurity and custom software projects.",
      "inLanguage": "en-GB",
      "publisher": {
        "@id": "https://hireprogrammer.co.uk/#organization",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://hireprogrammer.co.uk/#organization",
      "name": "HireProgrammer.co.uk",
      "url": "https://hireprogrammer.co.uk/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://hireprogrammer.co.uk/assets/logo-r-1_1779194780236-CoCkTSW9.png",
      },
      "email": "contact@hireprogrammer.co.uk",
      "telephone": "+44 208 058 9005",
      "description": "HireProgrammer.co.uk helps businesses hire experienced programmers and software developers for web, mobile, AI, cloud and enterprise development projects.",
      "foundingDate": "2015",
      "sameAs": [
        "https://uk.linkedin.com/company/hireprogrammer-co-uk/",
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Sales",
        "telephone": "+44 208 058 9005",
        "email": "contact@hireprogrammer.co.uk",
        "areaServed": "GB",
        "availableLanguage": ["English"],
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://hireprogrammer.co.uk/#localbusiness",
      "name": "HireProgrammer.co.uk",
      "url": "https://hireprogrammer.co.uk/",
      "image": "https://hireprogrammer.co.uk/assets/logo-r-1_1779194780236-CoCkTSW9.png",
      "telephone": "+44 208 058 9005",
      "email": "contact@hireprogrammer.co.uk",
      "priceRange": "££",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "80 Telford Ave",
        "addressLocality": "London",
        "postalCode": "SW2 4XF",
        "addressCountry": "GB",
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        "opens": "09:00",
        "closes": "17:30",
      },
      "areaServed": {
        "@type": "Country",
        "name": "United Kingdom",
      },
      "parentOrganization": {
        "@id": "https://hireprogrammer.co.uk/#organization",
      },
    },
    {
      "@type": "Service",
      "@id": "https://hireprogrammer.co.uk/#service",
      "name": "Software Development Services",
      "url": "https://hireprogrammer.co.uk/",
      "provider": {
        "@id": "https://hireprogrammer.co.uk/#organization",
      },
      "description": "Hire dedicated software developers and programmers for web development, mobile applications, AI development, cloud solutions, DevOps, CRM systems, cybersecurity and custom software development.",
      "areaServed": {
        "@type": "Country",
        "name": "United Kingdom",
      },
      "serviceType": [
        "Software Development",
        "Dedicated Developers",
        "Web Development",
        "Mobile App Development",
        "WordPress Development",
        "WooCommerce Development",
        "Laravel Development",
        "PHP Development",
        "Magento Development",
        "Shopify Development",
        "Drupal Development",
        "React Development",
        "AI Development",
        "Generative AI Development",
        "AI Agents",
        "Workflow Automation",
        "DevOps Services",
        "Linux Server Administration",
        "Zoho CRM Development",
        "Information Security",
        "Penetration Testing",
        "SEO Services",
      ],
    },
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SITE_SCHEMA) }}
      />
      <Navbar />
      <Hero />
      <Marquee />
      <Features />
      <Process />
      <Expertise />
      <Stats />
      <About />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
      <ChatWidget />
    </main>
  );
}
