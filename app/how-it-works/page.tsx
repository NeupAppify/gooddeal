import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "How it works, Good Deal",
};

const steps = [
    {
        title: "Requirement Assessment",
        desc: "We begin by understanding your specific needs, financial goals, and risk tolerance. This stage defines the scope of our advisory.",
        documents: "Personal ID, Financial Statements (optional), Requirement Brief",
        timeline: "1-2 Days",
    },
    {
        title: "Property Shortlisting",
        desc: "Our team identifies properties that match your criteria. We prioritize quality and long-term value over volume.",
        documents: "Property Portfolios, Market Comparison Reports",
        timeline: "3-7 Days",
    },
    {
        title: "Document Verification",
        desc: "A meticulous review of ownership records, land titles, and regulatory approvals to ensure the property is legally sound.",
        documents: "Lalpurja, Blueprints, Tax Clearance, Trace Maps",
        timeline: "5-10 Days",
    },
    {
        title: "Legal Review & Negotiation",
        desc: "Our legal experts review all agreements. We represent your interests during price and term negotiations.",
        documents: "Sales Agreements, Power of Attorney (if applicable)",
        timeline: "3-5 Days",
    },
    {
        title: "Transfer & Settlement",
        desc: "We facilitate the official transfer process at the Land Revenue Office (Malpot) and ensure all paperwork is completed accurately.",
        documents: "Registered Deeds, Payment Receipts",
        timeline: "1-2 Days",
    },
    {
        title: "Post-Deal Support",
        desc: "Ensuring utilities are transferred and final documents are in your possession. We remain your advisor even after the keys are handed over.",
        documents: "Utility Records, Final Verification Certificates",
        timeline: "Ongoing",
    },
];

export default function HowItWorks() {
    return (
        <div className="min-h-screen flex flex-col ">
            <Header />

            <main className="flex-grow">
                <section className="pt-44 pb-20 bg-platinum">
                    <div className="container mx-auto max-w-[1440px] px-6 md:px-12">
                        <div className="max-w-3xl">
                            <h1 className="text-5xl md:text-6xl mb-8">Structured Process. Clear Outcomes.</h1>
                            <p className="text-lg text-warm-gray leading-relaxed mb-12">
                                Real estate shouldn&apos;t be a game of chance. Our advisory approach is built on a disciplined,
                                6-step process that ensures every transaction is handled with legal precision and professional oversight.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-white">
                    <div className="container mx-auto max-w-[1440px] px-6 md:px-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {steps.map((step, i) => (
                                <div key={i} className="flex flex-col gap-6 p-8 border-l border-platinum hover:border-russian-purple transition-colors duration-500">
                                    <div className="text-5xl font-serif text-platinum group-hover:text-russian-purple transition-colors">
                                        0{i + 1}
                                    </div>
                                    <h3 className="text-2xl">{step.title}</h3>
                                    <p className="text-warm-gray text-sm leading-relaxed">{step.desc}</p>

                                    <div className="mt-auto space-y-4 pt-6 border-t border-platinum">
                                        <div>
                                            <h4 className="text-[10px] uppercase tracking-widest text-warm-gray mb-1">Documents Involved</h4>
                                            <p className="text-xs font-medium text-charcoal">{step.documents}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-[10px] uppercase tracking-widest text-warm-gray mb-1">Expected Timeline</h4>
                                            <p className="text-xs font-medium text-charcoal">{step.timeline}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-platinum/30 border-t border-platinum">
                    <div className="container mx-auto max-w-[1440px] px-6 md:px-12">
                        <div className="max-w-4xl mx-auto bg-white p-12 md:p-20 card-premium">
                            <h2 className="text-3xl mb-8">Transparency Statement</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm text-warm-gray leading-relaxed">
                                <div>
                                    <h4 className="text-charcoal font-semibold mb-4 italic">Our Commitments</h4>
                                    <ul className="space-y-4 list-disc pl-4">
                                        <li>Full disclosure of any discovered legal risks or encumbrances.</li>
                                        <li>No hidden commissions from third parties.</li>
                                        <li>Accountability for every document handled by our team.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-charcoal font-semibold mb-4 italic">When We Decline Services</h4>
                                    <p>
                                        To maintain our integrity, we may decline services for properties with unresolved
                                        disputes, unclear ownership chains, or those that do not meet our ethical standards.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
