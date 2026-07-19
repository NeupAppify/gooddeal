"use client";

import Image from "next/image";
import Link from "next/link";

const Header = () => {
    return (
        <header
            className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md py-4 shadow-md transition-all duration-500"
        >
            <div className="container mx-auto max-w-[1440px] px-6 md:px-12 flex items-center justify-between">
                <Link href="/" className="group flex flex-col items-start">
                    <Image
                        src="/logo.png"
                        alt="Good Deal"
                        width={316}
                        height={36}
                        priority
                        className="h-[22px] w-auto"
                    />
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    {["Services", "Properties", "How It Works", "Insights", "About"].map(
                        (item) => (
                            <Link
                                key={item}
                                href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                                className="text-charcoal font-sans text-sm font-medium hover:text-russian-purple transition-colors"
                            >
                                {item}
                            </Link>
                        )
                    )}
                </nav>

                <div className="flex items-center gap-4">
                    <Link
                        href="/contact"
                        className="btn-primary text-sm py-2.5 px-6"
                    >
                        Get Consultation
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
