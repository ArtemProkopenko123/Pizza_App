"use client";

import { useParams, useRouter, usePathname } from "next/navigation";

const WelcomePage = () => {
    const pathname = usePathname();
    if(pathname !== "/") return null;
    return (
        <div className="w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url('/images/main.png')` }}>
            <div className="w-full h-full bg-black/50">
                <div className="w-full h-full flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-bold text-white">Welcome to PizzaFast</h1>
                    <p className="text-2xl text-white">Best pizza in the world</p>
                </div>
            </div>
        </div>
    )
}

export default WelcomePage;