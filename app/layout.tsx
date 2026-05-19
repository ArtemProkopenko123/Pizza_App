import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import CartNavItem from "@/components/navigation/cart-nav-item";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type NavItemProps = {
  href: string;
  text: string;
}

const NavItem = ({ href, text }: NavItemProps) => {
  return (
    <Link href={href} className="text-white  p-2 hover:text-black transition-colors duration-500">
      {text}
    </Link>
  )
}

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
        <header className="flex flex-col items-center font-sans  bg-teal-500">
          <nav className="flex w-full flex-wrap max-w-6xl px-2 items-center justify-between">
            <div className="flex items-center text-white">
              <span className="font-semibold text-xl tracking-tight mr-2" >🍕 PizzaFast</span>
              <div>
                <NavItem href="/" text="Menu" />
                <NavItem href="/contact" text="Contact" />
              </div>
            </div>
            <CartNavItem />
          </nav>
        </header>
        <div className="flex flex-col flex-1 items-center font-sans">
          <main className="flex flex-1 w-full max-w-6xl flex-col p-4">
            {children}
          </main>
        </div>
        <footer className="flex flex-col items-center font-sans  bg-teal-500">
          <p className="text-white">© 2026 PizzaFast. All rights reserved.</p>
        </footer>
        </body>
    </html>
  );
}
