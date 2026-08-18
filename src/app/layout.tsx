import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "./globals.css";
import { ClientProviders } from "./providers";

export const metadata: Metadata = {
  title: {
    default: "Software Development Company UK | Hire Programmer",
    template: "%s | Hire Programmer",
  },
  description:
    "Hire Programmer provides expert software developers in the UK for web, mobile, AI, cloud, and custom software solutions tailored to your business needs.",
  openGraph: {
    type: "website",
    title: "Hire Programmers UK - Expert Developers | HireProgrammer",
    description:
      "Hire top UK & global programmers from £20/hr. No contracts, no minimums. Expert developers in WordPress, React, AI and more.",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-TT68EGJYRK" />
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-TT68EGJYRK');`,
          }}
        />
      </head>
      <body className="antialiased">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
