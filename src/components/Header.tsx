"use client";

import Link from "next/link";

const Header = () => {
    return (
        <header
            className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md py-4 shadow-md transition-all duration-500"
        >
            <div className="container mx-auto max-w-[1440px] px-6 md:px-12 flex items-center justify-between">
                <Link href="/" className="group flex items-center gap-2">
                    <div className="w-8 h-8 bg-russian-purple rounded flex items-center justify-center text-white font-serif italic text-xl">
                        G
                    </div>
                    <span className="font-serif text-2xl tracking-tight text-charcoal">
                        Good Deal
                    </span>
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
