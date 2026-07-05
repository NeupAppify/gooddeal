import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { teamMembers } from "@/src/lib/team";

/*
::neup.documentation::gooddeal-team-page
::function TeamPage()
::title Good Deal Team Page

::public

Renders the Good Deal team listing with member images, roles, and direct contact
details.

Links each card to the corresponding team member profile page.

::returns
::datatype JSX.Element

The team page layout.

::public end

::end
*/

export default function TeamPage() {
  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      
      <main className="flex-grow">
        <section className="pt-44 pb-20 bg-platinum/30">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12 text-center">
            <h1 className="text-5xl font-serif text-charcoal mb-6">Our Team</h1>
            <p className="text-lg text-warm-gray max-w-2xl mx-auto">
              The professionals ensuring your real estate journey is safe and successful.
            </p>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <Link key={member.slug} href={`/about/team/${member.slug}`} className="group block">
                  <div className="aspect-[3/4] relative overflow-hidden bg-platinum rounded-lg mb-6">
                    <Image 
                      src={member.image} 
                      alt={member.name} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-xl font-serif text-charcoal mb-1">{member.name}</h3>
                  <p className="text-russian-purple text-sm font-medium uppercase tracking-wider mb-4">{member.role}</p>
                  <div className="space-y-2 text-sm text-warm-gray">
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-russian-purple" />
                      {member.phone}
                    </p>
                    <p className="flex items-center gap-2 break-all">
                      <Mail className="w-4 h-4 text-russian-purple" />
                      {member.email}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Hiring CTA */}
        <section className="py-24 bg-platinum/30 border-t border-platinum">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12 text-center">
            <h2 className="text-3xl font-serif text-charcoal mb-4">We might be hiring</h2>
            <p className="text-warm-gray max-w-xl mx-auto mb-8">
              We are always looking for talented individuals who share our commitment to transparency and integrity in real estate.
            </p>
            <Link href="/about/careers" className="btn-secondary group">
              Check Open Positions <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
