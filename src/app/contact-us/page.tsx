import type { Metadata } from "next";
import ContactPage from "@/views/contact";

export const metadata: Metadata = {
  title: { absolute: "Contact Hire Programmer" },
  description: "Contact Hire Programmer to discuss your software development, AI, cloud, cybersecurity, or digital transformation project with our experienced team.",
  alternates: { canonical: "https://hireprogrammer.co.uk/contact-us" },
  openGraph: {
    type: "website",
    url: "https://hireprogrammer.co.uk/contact-us",
    title: "Contact Hire Programmer",
    description: "Contact Hire Programmer to discuss your software development, AI, cloud, cybersecurity, or digital transformation project with our experienced team.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Hire Programmer",
    description: "Contact Hire Programmer to discuss your software development, AI, cloud, cybersecurity, or digital transformation project with our experienced team.",
  },
};

export default ContactPage;
