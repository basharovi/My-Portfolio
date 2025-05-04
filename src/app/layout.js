import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import PageTransitionWrapper from "@/components/layout/PageTransitionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bashar Ovi | Software Engineer",
  description: "Professional portfolio of Bashar Ovi, a passionate muslim Software Engineer specialized in C# and .NET ecosystem, with experience in building scalable microservice architectures.",
  keywords: "Bashar Ovi, software engineer, C#, .NET, full stack developer, microservices, portfolio",
  authors: [{ name: "Bashar Ovi", url: "https://basharovi.vercel.app" }],
  creator: "Muhammad Mominur Bashar Ovi",
  publisher: "Bashar Ovi",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://basharovi.vercel.app",
    title: "Bashar Ovi | Senior Software Engineer",
    description: "Professional portfolio of a passionate Software Engineer specialized in C# and .NET ecosystem",
    siteName: "Bashar Ovi Portfolio",
    images: [
      {
        url: "/images/basharovi.jpg",
        width: 1200,
        height: 1200,
        alt: "Bashar Ovi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bashar Ovi | Senior Software Engineer",
    description: "Professional portfolio of a passionate Software Engineer specialized in C# and .NET ecosystem",
    images: ["/images/basharovi.jpg"],
    creator: "@basharovi",
  },
  facebook: {
    appId: "", // If you have a Facebook app ID
    title: "Bashar Ovi | Software Engineer",
    description: "Professional portfolio of a passionate Software Engineer specialized in C# and .NET ecosystem",
    images: ["/images/basharovi.jpg"],
    url: "https://basharovi.vercel.app",
  },
  whatsapp: {
    title: "Bashar Ovi | Software Engineer",
    description: "Professional portfolio of a passionate Software Engineer specialized in C# and .NET ecosystem",
    image: "/images/basharovi.jpg",
  },
  alternates: {
    canonical: "https://basharovi.vercel.app",
  },
  verification: {
    google: "", // Your Google verification code if you have one
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* WhatsApp preview metadata */}
        <meta property="og:image" content="/images/basharovi.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="1200" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <Navbar />
          <main className="flex-grow pt-16">
            <PageTransitionWrapper>
              {children}
            </PageTransitionWrapper>
          </main>
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
