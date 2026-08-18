import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      // WordPress
      { source: "/wordpress", destination: "/wordpress-development-services-uk", permanent: true },
      { source: "/wordpress/", destination: "/wordpress-development-services-uk", permanent: true },
      { source: "/services/wordpress", destination: "/wordpress-development-services-uk", permanent: true },
      { source: "/services/wordpress/", destination: "/wordpress-development-services-uk", permanent: true },
      // WooCommerce
      { source: "/woocommerce", destination: "/woocommerce-web-developers", permanent: true },
      { source: "/woocommerce/", destination: "/woocommerce-web-developers", permanent: true },
      { source: "/services/woocommerce", destination: "/woocommerce-web-developers", permanent: true },
      { source: "/services/woocommerce/", destination: "/woocommerce-web-developers", permanent: true },
      // Drupal
      { source: "/drupal", destination: "/drupal-development-services-uk", permanent: true },
      { source: "/drupal/", destination: "/drupal-development-services-uk", permanent: true },
      { source: "/services/drupal", destination: "/drupal-development-services-uk", permanent: true },
      { source: "/services/drupal/", destination: "/drupal-development-services-uk", permanent: true },
      // Magento
      { source: "/magento", destination: "/magento-development-uk", permanent: true },
      { source: "/magento/", destination: "/magento-development-uk", permanent: true },
      { source: "/services/magento", destination: "/magento-development-uk", permanent: true },
      { source: "/services/magento/", destination: "/magento-development-uk", permanent: true },
      // Shopify
      { source: "/shopify", destination: "/shopify-developers-for-hire-uk", permanent: true },
      { source: "/shopify/", destination: "/shopify-developers-for-hire-uk", permanent: true },
      { source: "/services/shopify", destination: "/shopify-developers-for-hire-uk", permanent: true },
      { source: "/services/shopify/", destination: "/shopify-developers-for-hire-uk", permanent: true },
      // Joomla
      { source: "/joomla", destination: "/joomla-developer-uk", permanent: true },
      { source: "/joomla/", destination: "/joomla-developer-uk", permanent: true },
      { source: "/joomla-website-development", destination: "/joomla-developer-uk", permanent: true },
      { source: "/joomla-website-development/", destination: "/joomla-developer-uk", permanent: true },
      { source: "/services/joomla-website-development", destination: "/joomla-developer-uk", permanent: true },
      { source: "/services/joomla-website-development/", destination: "/joomla-developer-uk", permanent: true },
      // Laravel
      { source: "/laravel", destination: "/laravel-developers-uk", permanent: true },
      { source: "/laravel/", destination: "/laravel-developers-uk", permanent: true },
      { source: "/services/laravel", destination: "/laravel-developers-uk", permanent: true },
      { source: "/services/laravel/", destination: "/laravel-developers-uk", permanent: true },
      // CodeIgniter
      { source: "/codeigniter", destination: "/codeigniter-development", permanent: true },
      { source: "/codeigniter/", destination: "/codeigniter-development", permanent: true },
      { source: "/services/codeigniter", destination: "/codeigniter-development", permanent: true },
      { source: "/services/codeigniter/", destination: "/codeigniter-development", permanent: true },
      // PHP
      { source: "/php", destination: "/php-development-company-uk", permanent: true },
      { source: "/php/", destination: "/php-development-company-uk", permanent: true },
      { source: "/services/php", destination: "/php-development-company-uk", permanent: true },
      { source: "/services/php/", destination: "/php-development-company-uk", permanent: true },
      // AI Developers
      { source: "/ai-developers", destination: "/hire-ai-developers-uk", permanent: true },
      { source: "/ai-developers/", destination: "/hire-ai-developers-uk", permanent: true },
      { source: "/ai-developers-in-london-uk-hire-ai-development-experts", destination: "/hire-ai-developers-uk", permanent: true },
      { source: "/ai-developers-in-london-uk-hire-ai-development-experts/", destination: "/hire-ai-developers-uk", permanent: true },
      { source: "/services/ai-developers-in-london-uk-hire-ai-development-experts", destination: "/hire-ai-developers-uk", permanent: true },
      { source: "/services/ai-developers-in-london-uk-hire-ai-development-experts/", destination: "/hire-ai-developers-uk", permanent: true },
      // Generative AI
      { source: "/generative-ai", destination: "/hire-generative-ai-developers-uk", permanent: true },
      { source: "/generative-ai/", destination: "/hire-generative-ai-developers-uk", permanent: true },
      { source: "/generative-ai-development", destination: "/hire-generative-ai-developers-uk", permanent: true },
      { source: "/generative-ai-development/", destination: "/hire-generative-ai-developers-uk", permanent: true },
      { source: "/services/generative-ai-development", destination: "/hire-generative-ai-developers-uk", permanent: true },
      { source: "/services/generative-ai-development/", destination: "/hire-generative-ai-developers-uk", permanent: true },
      // Java
      { source: "/java", destination: "/hire-java-programmer", permanent: true },
      { source: "/java/", destination: "/hire-java-programmer", permanent: true },
      { source: "/java-development", destination: "/hire-java-programmer", permanent: true },
      { source: "/java-development/", destination: "/hire-java-programmer", permanent: true },
      { source: "/services/java-development", destination: "/hire-java-programmer", permanent: true },
      { source: "/services/java-development/", destination: "/hire-java-programmer", permanent: true },
      // DevOps
      { source: "/devops", destination: "/devops-services-uk", permanent: true },
      { source: "/devops/", destination: "/devops-services-uk", permanent: true },
      { source: "/services/devops", destination: "/devops-services-uk", permanent: true },
      { source: "/services/devops/", destination: "/devops-services-uk", permanent: true },
      // Linux Server
      { source: "/linux-server", destination: "/linux-server-support-uk", permanent: true },
      { source: "/linux-server/", destination: "/linux-server-support-uk", permanent: true },
      { source: "/linux-server-administration", destination: "/linux-server-support-uk", permanent: true },
      { source: "/linux-server-administration/", destination: "/linux-server-support-uk", permanent: true },
      { source: "/services/linux-server-administration", destination: "/linux-server-support-uk", permanent: true },
      { source: "/services/linux-server-administration/", destination: "/linux-server-support-uk", permanent: true },
      { source: "/services/linux-server-administration/amp/", destination: "/linux-server-support-uk", permanent: true },
      { source: "/services/linux-server-administration/amp", destination: "/linux-server-support-uk", permanent: true },
      // Zoho CRM
      { source: "/zoho-crm", destination: "/zoho-crm-developers-uk", permanent: true },
      { source: "/zoho-crm/", destination: "/zoho-crm-developers-uk", permanent: true },
      { source: "/services/zoho-crm", destination: "/zoho-crm-developers-uk", permanent: true },
      { source: "/services/zoho-crm/", destination: "/zoho-crm-developers-uk", permanent: true },
      // Zapier
      { source: "/zapier", destination: "/zapier-automation-services", permanent: true },
      { source: "/zapier/", destination: "/zapier-automation-services", permanent: true },
      { source: "/zapier-development", destination: "/zapier-automation-services", permanent: true },
      { source: "/zapier-development/", destination: "/zapier-automation-services", permanent: true },
      { source: "/services/zapier-development", destination: "/zapier-automation-services", permanent: true },
      { source: "/services/zapier-development/", destination: "/zapier-automation-services", permanent: true },
      // Information Security
      { source: "/information-security", destination: "/information-security-services-uk", permanent: true },
      { source: "/information-security/", destination: "/information-security-services-uk", permanent: true },
      { source: "/services/information-security", destination: "/information-security-services-uk", permanent: true },
      { source: "/services/information-security/", destination: "/information-security-services-uk", permanent: true },
      // Penetration Testing
      { source: "/penetration-testing", destination: "/penetration-testing-services-uk", permanent: true },
      { source: "/penetration-testing/", destination: "/penetration-testing-services-uk", permanent: true },
      { source: "/penetration-testers", destination: "/penetration-testing-services-uk", permanent: true },
      { source: "/penetration-testers/", destination: "/penetration-testing-services-uk", permanent: true },
      { source: "/services/penetration-testers", destination: "/penetration-testing-services-uk", permanent: true },
      { source: "/services/penetration-testers/", destination: "/penetration-testing-services-uk", permanent: true },
      // Mobile App
      { source: "/mobile-app", destination: "/mobile-app-development-uk", permanent: true },
      { source: "/mobile-app/", destination: "/mobile-app-development-uk", permanent: true },
      { source: "/services/mobile-app", destination: "/mobile-app-development-uk", permanent: true },
      { source: "/services/mobile-app/", destination: "/mobile-app-development-uk", permanent: true },
      // React Native
      { source: "/react-native-development", destination: "/hire-react-native-developers", permanent: true },
      { source: "/react-native-development/", destination: "/hire-react-native-developers", permanent: true },
      { source: "/services/react-native-development", destination: "/hire-react-native-developers", permanent: true },
      { source: "/services/react-native-development/", destination: "/hire-react-native-developers", permanent: true },
      { source: "/services/react-native-development/amp/", destination: "/hire-react-native-developers", permanent: true },
      { source: "/services/react-native-development/amp", destination: "/hire-react-native-developers", permanent: true },
      // Flutter
      { source: "/flutter-development", destination: "/hire-flutter-developers", permanent: true },
      { source: "/flutter-development/", destination: "/hire-flutter-developers", permanent: true },
      { source: "/services/flutter-development", destination: "/hire-flutter-developers", permanent: true },
      { source: "/services/flutter-development/", destination: "/hire-flutter-developers", permanent: true },
      // AI Solutions
      { source: "/ai-social-media", destination: "/ai-social-media-services", permanent: true },
      { source: "/ai-social-media/", destination: "/ai-social-media-services", permanent: true },
      { source: "/ai-team-training", destination: "/ai-team-training-services", permanent: true },
      { source: "/ai-team-training/", destination: "/ai-team-training-services", permanent: true },
      { source: "/ai-agents", destination: "/ai-agent-development-services", permanent: true },
      { source: "/ai-agents/", destination: "/ai-agent-development-services", permanent: true },
      { source: "/ai-team-transformation", destination: "/ai-team-transformation-services", permanent: true },
      { source: "/ai-team-transformation/", destination: "/ai-team-transformation-services", permanent: true },
      { source: "/workflow-automation", destination: "/workflow-automation-services", permanent: true },
      { source: "/workflow-automation/", destination: "/workflow-automation-services", permanent: true },
      // Contact
      { source: "/contact", destination: "/contact-us", permanent: true },
      { source: "/contact/", destination: "/contact-us", permanent: true },
      // Blog
      { source: "/blog/scalable-tech-stack", destination: "/blog/why-every-startup-needs-a-scalable-tech-stack-in-2026", permanent: true },
      { source: "/blog/scalable-tech-stack/", destination: "/blog/why-every-startup-needs-a-scalable-tech-stack-in-2026", permanent: true },
      { source: "/blog/shopify-small-business", destination: "/blog/is-shopify-worth-it-for-a-small-business", permanent: true },
      { source: "/blog/shopify-small-business/", destination: "/blog/is-shopify-worth-it-for-a-small-business", permanent: true },
      { source: "/blog/generative-ai-development-2025", destination: "/blog/how-generative-ai-is-reshaping-software-development-in-2026", permanent: true },
      { source: "/blog/generative-ai-development-2025/", destination: "/blog/how-generative-ai-is-reshaping-software-development-in-2026", permanent: true },
      { source: "/blog/cybersecurity-threats-2025", destination: "/blog/top-10-cybersecurity-threats-businesses-must-prepare-for-in-2026", permanent: true },
      { source: "/blog/cybersecurity-threats-2025/", destination: "/blog/top-10-cybersecurity-threats-businesses-must-prepare-for-in-2026", permanent: true },
      { source: "/blog/laravel-vs-codeigniter", destination: "/blog/laravel-vs-codeigniter-which-php-framework-should-you-choose", permanent: true },
      { source: "/blog/laravel-vs-codeigniter/", destination: "/blog/laravel-vs-codeigniter-which-php-framework-should-you-choose", permanent: true },
      { source: "/blog/woocommerce-vs-magento", destination: "/blog/woocommerce-vs-magento-the-ultimate-comparison-for-2026", permanent: true },
      { source: "/blog/woocommerce-vs-magento/", destination: "/blog/woocommerce-vs-magento-the-ultimate-comparison-for-2026", permanent: true },
      // About
      { source: "/about", destination: "/about-us", permanent: true },
      { source: "/about/", destination: "/about-us", permanent: true },
      { source: "/about-us/amp/", destination: "/about-us", permanent: true },
      { source: "/about-us/amp", destination: "/about-us", permanent: true },
    ];
  },
};

export default nextConfig;
