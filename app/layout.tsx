import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { site } from "@/lib/site";
import "./globals.css";

const outfit = localFont({
  src: "../public/fonts/outfit-latin.woff2",
  display: "swap",
  variable: "--font-outfit",
  weight: "100 900",
});
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.ico?v=ay-2", sizes: "16x16 32x32 48x48" },
      { url: "/favicon.png?v=ay-2", type: "image/png", sizes: "64x64" },
    ],
    apple: [{ url: "/apple-touch-icon.png?v=ay-2", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    url: site.url,
    title: site.title,
    description: site.description,
    siteName: "Asfand Yar — Portfolio",
    locale: "en_US",
    images: [
      {
        url: "/social-preview.png",
        width: 1200,
        height: 630,
        alt: "Asfand Yar — Software, Backend & AI Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/social-preview.png"],
  },
};

// Apply a saved preference before paint; private browsers may disable storage.
const themeScript = `try{var t=localStorage.getItem('portfolio-theme');document.documentElement.dataset.theme=t==='light'?'light':'dark'}catch(e){}`;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={outfit.variable}>
        {children}
        {process.env.VERCEL === "1" && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  );
}

