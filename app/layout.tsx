import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WelcomePage from "./components/welcome-page";
import Navigation from "./components/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col ">
        <Navigation />
        <main>
          <WelcomePage />
          <div className="flex flex-col flex-1 items-center font-sans">
            <div className="flex flex-1 w-full max-w-6xl flex-col p-4 pt-[44px] min-h-[calc(100vh-24px)]">
              {children}
            </div>
          </div>
        </main>
        <footer className="flex flex-col items-center font-sans  bg-teal-500">
          <p className="text-white">© 2026 PizzaFast. All rights reserved.</p>
        </footer>
      </body>
    </html >
  );
}
