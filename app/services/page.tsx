import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import Link from "next/link";
import Image from "next/image";

const services = [
    {
        title: "Property Buying Advisory",
        category: "Acquisition",
        desc: "End-to-end guidance for selecting and securing the right property at the right price.",
        link: "/services/buying",
    },
    {
        title: "Property Selling Representation",
        category: "Disposition",
        desc: "Professional representation to position your property for a successful and transparent sale.",
        link: "/services/selling",
    },
    {
        title: "Land & Property Verification",
        category: "Verification",
        desc: "Rigorous document audits and field checks to prevent legal and financial risks.",
        link: "/services/verification",
    },
    {
        title: "Legal & Documentation Support",
        category: "Legal",
        desc: "Assistance with registry, taxes, and specialized real estate legal frameworks.",
        link: "/services/legal",
    },
    {
        title: "NRN Property Assistance",
        category: "Specialized",
        desc: "Tailored services for Non-Resident Nepalis managing or acquiring local assets.",
        link: "/services/nrn",
    },
    {
        title: "Commercial Advisory",
        category: "Commercial",
        desc: "Strategic consulting for commercial real estate developments and acquisitions.",
        link: "/services/commercial",
    },
];

export default function Services() {
    return (
        <div className="min-h-screen flex flex-col ">
            <Header />

            <main className="flex-grow">
                <section className="pt-44 pb-20 bg-white">
                    <div className="container mx-auto max-w-[1440px] px-6 md:px-12 text-center">
                        <h1 className="text-5xl md:text-6xl mb-8">Professional Advisory Services.</h1>
                        <p className="text-lg text-warm-gray leading-relaxed max-w-2xl mx-auto">
                            Our services are structured to provide clarity and professional oversight across every
                            stage of the real estate lifecycle.
                        </p>
                    </div>
                </section>

                <section className="py-12 bg-platinum/30">
                    <div className="container mx-auto max-w-[1440px] px-6 md:px-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.map((service, i) => (
                                <Link
                                    key={i}
                                    href={service.link}
                                    className="card-premium p-10 group flex flex-col items-start"
                                >
                                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-russian-purple/60 mb-6">
                                        {service.category}
                                    </span>
                                    <h3 className="text-2xl mb-4 group-hover:text-russian-purple transition-colors">{service.title}</h3>
                                    <p className="text-warm-gray text-sm leading-relaxed mb-8">{service.desc}</p>
                                    <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-charcoal">
                                        Learn Service Scope
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform translate-x-0 group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-white border-t border-platinum">
                    <div className="container mx-auto max-w-[1440px] px-6 md:px-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                            <div>
                                <h2 className="text-4xl mb-8">Why Professional Advisory Matters.</h2>
                                <div className="space-y-8">
                                    {[
                                        { t: "Risk Mitigation", d: "Buying without verification is the leading cause of legal disputes in the region." },
                                        { t: "Objective Negotiation", d: "We separate emotion from the transaction to secure the most favorable terms for you." },
                                        { t: "Compliance Security", d: "Ensuring every stamp and signature meets current regulatory standards." },
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4">
                                            <div className="w-6 h-6 rounded-full bg-sage/10 text-sage flex items-center justify-center flex-shrink-0">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-charcoal mb-1">{item.t}</h4>
                                                <p className="text-sm text-warm-gray">{item.d}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative aspect-[4/5] bg-platinum rounded-2xl overflow-hidden">
                                <Image
                                    src="/hero.png" // Using the same premium image for now
                                    alt="Professional Office"
                                    fill
                                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
