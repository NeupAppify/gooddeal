import Image from "next/image";
import Link from "next/link";

import { Facebook, Instagram, Youtube, Twitter, Linkedin, Mail, Phone } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-charcoal text-white pt-20 pb-10">
            <div className="container mx-auto max-w-[1440px] px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex flex-col items-start mb-6">
                            <Image
                                src="/logo.inverted.png"
                                alt="Good Deal"
                                width={316}
                                height={36}
                                className="h-[22px] w-auto"
                            />
                            <span className="mt-1 text-xs font-medium leading-none text-warm-gray">
                                Invest in your Future
                            </span>
                        </Link>
                        <p className="text-warm-gray text-sm leading-relaxed max-w-xs mb-6">
                            Professional real estate advisory for buying, selling, and verifying property with full transparency and care.
                        </p>
                        
                        <div className="flex flex-col gap-3 mb-6">
                            <a href="tel:+9779840518336" className="flex items-center gap-3 text-sm text-warm-gray hover:text-white transition-colors">
                                <Phone className="w-4 h-4" />
                                <span>+977 984 0518336</span>
                            </a>
                            <a href="mailto:contact@gooddeal.com.np" className="flex items-center gap-3 text-sm text-warm-gray hover:text-white transition-colors">
                                <Mail className="w-4 h-4" />
                                <span>contact@gooddeal.com.np</span>
                            </a>
                        </div>

                        <div className="flex items-center gap-4">
                            <a href="https://facebook.com/gooddealnp" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-russian-purple transition-colors">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="https://instagram.com/gooddealnp" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-russian-purple transition-colors">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="https://youtube.com/@gooddealnp" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-russian-purple transition-colors">
                                <Youtube className="w-4 h-4" />
                            </a>
                            <a href="https://twitter.com/gooddealnp" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-russian-purple transition-colors">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="https://linkedin.com/company/gooddealnp" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-russian-purple transition-colors">
                                <Linkedin className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-serif text-lg mb-6 text-white">Services</h4>
                        <ul className="space-y-4">
                            {[
                                { name: "Buying Advisory", href: "/services/buying" },
                                { name: "Selling Representation", href: "/services/selling" },
                                { name: "Property Verification", href: "/services/verification" },
                                { name: "Legal Support", href: "/services/legal" },
                                { name: "NRN Property Services", href: "/services/nrn" },
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-warm-gray hover:text-white transition-colors text-sm"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-serif text-lg mb-6 text-white">Company</h4>
                        <ul className="space-y-4">
                            {[
                                { name: "About Us", href: "/about" },
                                { name: "Our Team", href: "/about/team" },
                                { name: "Careers", href: "/about/careers" },
                                { name: "Market Insights (Blog)", href: "/blog" },
                                { name: "Contact", href: "/contact" },
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-warm-gray hover:text-white transition-colors text-sm"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-serif text-lg mb-6 text-white">Legal</h4>
                        <ul className="space-y-4">
                            {[
                                { name: "Privacy Policy", href: "/legal/privacy" },
                                { name: "Terms of Service", href: "/legal/terms" },
                                { name: "Legal Documents", href: "/legal/documents" },
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-warm-gray hover:text-white transition-colors text-sm"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-warm-gray">
                    <p>© {new Date().getFullYear()} Good Deal Advisory. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
