"use client";
import CartNavItem from "@/components/navigation/cart-nav-item";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavItemProps = {
    href: string;
    text: string;
    isVisible: boolean;
  }
  
  const NavItem = ({ href, text, isVisible }: NavItemProps) => {
    return (
      <Link href={href} className={`text-white text-xl p-2 ${isVisible ? 'hover:text-black' : 'hover:text-white'}  transition-colors duration-500`}>
        {text}
      </Link>
    )
  }

const Navigation = () => {
    const pathname = usePathname();
    const isHome = pathname === "/";
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if(!isHome) {
            setIsVisible(true);
            return;
        }
        const handleScroll = () => setIsVisible(window.scrollY > 200);
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHome]);
    
    return (
        <header className={`flex flex-col items-center font-sans fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isVisible ? 'bg-teal-500' : 'bg-transparent'} `}>
            <nav className="flex w-full flex-wrap max-w-6xl px-2 items-center justify-between">
                <div className="flex items-center text-white">
                    <span className="font-semibold text-3xl tracking-tight mr-2 border-r-2 pr-4">🍕 PizzaFast</span>
                    <div className="flex items-center gap-4">
                        <NavItem href="/" text="Menu" isVisible={isVisible} />
                        <NavItem href="/contact" text="Contact" isVisible={isVisible} />
                    </div>
                </div>
                <CartNavItem />
            </nav>
        </header>
    )
}

export default Navigation;