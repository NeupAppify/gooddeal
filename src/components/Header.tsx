"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
    { label: "Services", href: "/services" },
    { label: "Properties", href: "/properties" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Blogs", href: "/blog" },
    { label: "About", href: "/about" },
];

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => setIsMenuOpen(false);

    useEffect(() => {
        if (!isMenuOpen) {
            return;
        }

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [isMenuOpen]);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 overflow-hidden bg-white/95 backdrop-blur-md shadow-md transition-[height] duration-300 ease-out md:h-auto md:py-4 ${
                isMenuOpen ? "max-md:h-dvh" : "max-md:h-[72px]"
            }`}
        >
            <div className="container mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-6 md:h-auto md:px-12">
                <Link href="/" className="group flex flex-col items-start" onClick={closeMenu}>
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
                    {navItems.map(
                        (item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-charcoal font-sans text-sm font-medium hover:text-russian-purple transition-colors"
                            >
                                {item.label}
                            </Link>
                        )
                    )}
                </nav>

                <div className="hidden md:flex items-center gap-4">
                    <Link
                        href="/contact"
                        className="btn-primary text-sm py-2.5 px-6"
                    >
                        Get Consultation
                    </Link>
                </div>

                <button
                    type="button"
                    className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-[6px] border border-black/10 text-charcoal transition-colors hover:bg-russian-purple/5"
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-navigation"
                    onClick={() => setIsMenuOpen((current) => !current)}
                >
                    {isMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
                </button>
            </div>

            <div
                className={`md:hidden h-px bg-black/10 transition-opacity duration-150 ${
                    isMenuOpen ? "opacity-100" : "opacity-0"
                }`}
            />

            <nav
                id="mobile-navigation"
                className={`md:hidden flex min-h-[calc(100dvh-73px)] flex-col bg-white px-6 pb-8 pt-6 transition-opacity duration-200 ${
                    isMenuOpen ? "opacity-100 delay-150" : "pointer-events-none opacity-0"
                }`}
                aria-label="Mobile navigation"
                aria-hidden={!isMenuOpen}
            >
                <div className="flex flex-col gap-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="rounded-[6px] px-3 py-3 text-charcoal font-sans text-base font-medium transition-colors hover:bg-russian-purple/5 hover:text-russian-purple"
                            onClick={closeMenu}
                            tabIndex={isMenuOpen ? 0 : -1}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                <Link
                    href="/contact"
                    className="btn-primary mt-auto w-full text-sm py-3 px-6"
                    onClick={closeMenu}
                    tabIndex={isMenuOpen ? 0 : -1}
                >
                    Get Consultation
                </Link>
            </nav>
        </header>
    );
};

export default Header;
