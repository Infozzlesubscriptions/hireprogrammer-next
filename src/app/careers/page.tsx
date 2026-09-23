import type { Metadata } from "next";
import Careers from "@/views/careers";

export const metadata: Metadata = {
  title: { absolute: "Careers at Hire Programmer" },
  description: "Join Hire Programmer and build your career with a team delivering innovative software development, AI, cloud, and digital transformation solutions.",
  alternates: { canonical: "https://hireprogrammer.co.uk/careers" },
  openGraph: {
    type: "website",
    url: "https://hireprogrammer.co.uk/careers",
    title: "Careers at Hire Programmer",
    description: "Join Hire Programmer and build your career with a team delivering innovative software development, AI, cloud, and digital transformation solutions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at Hire Programmer",
    description: "Join Hire Programmer and build your career with a team delivering innovative software development, AI, cloud, and digital transformation solutions.",
  },
};

export default Careers;
