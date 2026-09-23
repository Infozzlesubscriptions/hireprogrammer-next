import type { Metadata } from "next";
import AboutPage from "@/views/about";

export const metadata: Metadata = {
  title: { absolute: "About Hire Programmer | Software Development Experts" },
  description: "Learn about Hire Programmer, a trusted UK software development company delivering AI, web, mobile, cloud, and digital transformation solutions.",
  alternates: { canonical: "https://hireprogrammer.co.uk/about-us" },
  openGraph: {
    type: "website",
    url: "https://hireprogrammer.co.uk/about-us",
    title: "About Hire Programmer | Software Development Experts",
    description: "Learn about Hire Programmer, a trusted UK software development company delivering AI, web, mobile, cloud, and digital transformation solutions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Hire Programmer | Software Development Experts",
    description: "Learn about Hire Programmer, a trusted UK software development company delivering AI, web, mobile, cloud, and digital transformation solutions.",
  },
};

export default AboutPage;
