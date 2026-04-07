import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Users, Target } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-44 pb-20 bg-platinum/30">
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
        <section className="py-24 bg-white">
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
        <section className="py-24 bg-platinum/30">
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
        <section className="py-24 bg-white text-center">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12">
            <h2 className="text-4xl font-serif mb-6">Meet the Experts</h2>
            <p className="text-warm-gray max-w-xl mx-auto mb-12">
              Our team consists of certified real estate agents, property lawyers, and market analysts.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/about/team" className="btn-primary">
                View Our Team
              </Link>
              <Link href="/about/founder" className="btn-secondary">
                Founder&apos;s Message
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
