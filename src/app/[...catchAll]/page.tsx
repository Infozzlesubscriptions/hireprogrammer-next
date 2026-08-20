import type { Metadata } from "next";
import NotFoundPage from "@/views/not-found";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist.",
  robots: "noindex, nofollow",
};

export default NotFoundPage;
