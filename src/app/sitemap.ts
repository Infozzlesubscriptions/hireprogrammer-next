import type { MetadataRoute } from "next";

const BASE = "https://hireprogrammer.co.uk";

const URLS: { loc: string; priority: string; changefreq: string }[] = [
  { loc: "/", priority: "1.0", changefreq: "weekly" },
  { loc: "/about-us", priority: "0.8", changefreq: "monthly" },
  { loc: "/contact-us", priority: "0.8", changefreq: "monthly" },
  { loc: "/clients", priority: "0.9", changefreq: "monthly" },
  { loc: "/services", priority: "0.8", changefreq: "monthly" },
  { loc: "/careers", priority: "0.6", changefreq: "monthly" },
  // CMS Development
  { loc: "/wordpress-development-services-uk", priority: "0.9", changefreq: "monthly" },
  { loc: "/woocommerce-web-developers", priority: "0.8", changefreq: "monthly" },
  { loc: "/drupal-development-services-uk", priority: "0.8", changefreq: "monthly" },
  { loc: "/magento-development-uk", priority: "0.8", changefreq: "monthly" },
  { loc: "/shopify-developers-for-hire-uk", priority: "0.8", changefreq: "monthly" },
  { loc: "/joomla-developer-uk", priority: "0.8", changefreq: "monthly" },
  // Web Development
  { loc: "/laravel-developers-uk", priority: "0.9", changefreq: "monthly" },
  { loc: "/codeigniter-development", priority: "0.8", changefreq: "monthly" },
  { loc: "/php-development-company-uk", priority: "0.9", changefreq: "monthly" },
  { loc: "/hire-java-programmer", priority: "0.8", changefreq: "monthly" },
  { loc: "/devops-services-uk", priority: "0.8", changefreq: "monthly" },
  { loc: "/linux-server-support-uk", priority: "0.8", changefreq: "monthly" },
  { loc: "/information-security-services-uk", priority: "0.8", changefreq: "monthly" },
  { loc: "/penetration-testing-services-uk", priority: "0.8", changefreq: "monthly" },
  { loc: "/zoho-crm-developers-uk", priority: "0.8", changefreq: "monthly" },
  { loc: "/zapier-automation-services", priority: "0.8", changefreq: "monthly" },
  // Mobile Development
  { loc: "/mobile-app-development-uk", priority: "0.9", changefreq: "monthly" },
  { loc: "/hire-react-native-developers", priority: "0.8", changefreq: "monthly" },
  { loc: "/hire-flutter-developers", priority: "0.8", changefreq: "monthly" },
  // AI Solutions
  { loc: "/hire-ai-developers-uk", priority: "0.8", changefreq: "monthly" },
  { loc: "/hire-generative-ai-developers-uk", priority: "0.8", changefreq: "monthly" },
  { loc: "/ai-social-media-services", priority: "0.7", changefreq: "monthly" },
  { loc: "/ai-team-training-services", priority: "0.7", changefreq: "monthly" },
  { loc: "/ai-agent-development-services", priority: "0.7", changefreq: "monthly" },
  { loc: "/ai-team-transformation-services", priority: "0.7", changefreq: "monthly" },
  { loc: "/workflow-automation-services", priority: "0.7", changefreq: "monthly" },
  { loc: "/vibe-coding-cleaner", priority: "0.7", changefreq: "monthly" },
  // Blog
  { loc: "/blog", priority: "0.7", changefreq: "weekly" },
  { loc: "/blog/why-every-startup-needs-a-scalable-tech-stack-in-2026", priority: "0.6", changefreq: "yearly" },
  { loc: "/blog/is-shopify-worth-it-for-a-small-business", priority: "0.6", changefreq: "yearly" },
  { loc: "/blog/how-generative-ai-is-reshaping-software-development-in-2026", priority: "0.6", changefreq: "yearly" },
  { loc: "/blog/top-10-cybersecurity-threats-businesses-must-prepare-for-in-2026", priority: "0.6", changefreq: "yearly" },
  { loc: "/blog/laravel-vs-codeigniter-which-php-framework-should-you-choose", priority: "0.6", changefreq: "yearly" },
  { loc: "/blog/woocommerce-vs-magento-the-ultimate-comparison-for-2026", priority: "0.6", changefreq: "yearly" },
  // Legal
  { loc: "/privacy-policy", priority: "0.3", changefreq: "yearly" },
  { loc: "/cookie-policy", priority: "0.3", changefreq: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return URLS.map(({ loc, priority, changefreq }) => ({
    url: `${BASE}${loc}`,
    lastModified: new Date(),
    changeFrequency: changefreq as MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: Number(priority),
  }));
}
