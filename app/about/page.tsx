import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { ShieldCheck, Users, Target } from "lucide-react";
import { teamMembers } from "@/lib/team";

export const metadata: Metadata = {
  title: "About Us, Good Deal",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-44 pb-20">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12 text-center">
            <h1 className="text-5xl md:text-6xl font-serif text-charcoal mb-6">
              Restoring Trust in Real Estate.
            </h1>
            <p className="text-lg text-warm-gray max-w-2xl mx-auto leading-relaxed">
              We started Good Deal with a single mission: to replace the chaos of the property market with clarity, verification, and professional integrity.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-platinum">
                <Image 
                  src="/hero.png" 
                  alt="Our Office" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-russian-purple font-medium text-sm tracking-wider uppercase mb-2 block">Our Story</span>
                <h2 className="text-4xl font-serif mb-6">Built on Transparency</h2>
                <div className="space-y-6 text-warm-gray leading-relaxed">
                  <p>
                    For too long, buying or selling property has been a stressful gamble. Hidden fees, unclear titles, and unprofessional middlemen have made what should be a milestone moment into a headache.
                  </p>
                  <p>
                    We believe there is a better way. By combining rigorous legal verification with transparent advisory, we ensure that every transaction is secure, fair, and clear.
                  </p>
                  <p>
                    Today, Good Deal is the trusted partner for families and investors who value peace of mind above all else.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Grid */}
        <section className="py-24">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  icon: <ShieldCheck className="w-8 h-8" />,
                  title: "Verification First",
                  desc: "We never list or recommend a property until it has passed our 50-point legal and physical check."
                },
                {
                  icon: <Users className="w-8 h-8" />,
                  title: "Client Advocacy",
                  desc: "We sit on your side of the table. Whether buying or selling, your interests dictate our strategy."
                },
                {
                  icon: <Target className="w-8 h-8" />,
                  title: "Data-Driven Insight",
                  desc: "We move beyond speculation, using real market data to guide valuations and investment decisions."
                }
              ].map((val, i) => (
                <div key={i} className="flex flex-col gap-4">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-russian-purple shadow-sm">
                    {val.icon}
                  </div>
                  <h3 className="text-xl font-serif text-charcoal">{val.title}</h3>
                  <p className="text-warm-gray text-sm leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Teaser */}
        <section className="py-24">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12">
            <h2 className="text-4xl font-serif font-semibold mb-2">Meet the Experts</h2>
            <p className="text-warm-gray mb-12">
              Our team consists of certified real estate agents, property lawyers, and market analysts. <Link href="/about/team" className="text-russian-purple hover:underline">View all team.</Link>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.slice(0, 4).map((member) => (
                <Link key={member.slug} href={`/about/team/${member.slug}`} className="group">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-platinum mb-4">
                    <Image src={member.image} alt={member.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <h3 className="text-xl font-semibold text-charcoal group-hover:text-russian-purple transition-colors">{member.name}</h3>
                  <p className="mt-1 text-sm uppercase tracking-wider text-russian-purple">{member.role}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Founder Message */}
        <section className="py-24">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-platinum">
                <Image src="/team/founder.jpg" alt="Mukti Nath Nepal, Founder" fill className="object-cover" />
              </div>
              <div>
                <span className="text-russian-purple font-medium text-sm tracking-wider uppercase mb-2 block">Founder Message</span>
                <h2 className="text-4xl font-serif font-semibold mb-2">A Promise Built on Trust</h2>
                <p className="text-warm-gray text-lg leading-relaxed">
                  When I founded Good Deal, I wanted to create a real estate platform built on trust, integrity, and exceptional service. Every client deserves clear information, verified properties, and professional guidance at every step.
                </p>
                <Link href="/about/founder" className="btn-secondary mt-8">
                  View Full Message
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
