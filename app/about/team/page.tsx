import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getEnvVariable } from "@neup/core/helpers/env";
import { members } from "@neup/logica/people/members";

export const metadata: Metadata = {
  title: "Our Team, Good Deal",
};

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

export default async function TeamPage() {
  const projectId = getEnvVariable("NEUP_SITES_PROJECT_ID", true);
  if (!projectId) throw new Error("NEUP_SITES_PROJECT_ID is required to load team members.");
  const response = await members(projectId);
  console.info("[people] members response:", response);
  const teamMembers = response.ok && response.body.success && Array.isArray(response.body.data)
    ? response.body.data
    : [];
  const membersError = response.ok
    ? response.body.error
    : `Team members request failed (${response.status}).`;

  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      
      <main className="flex-grow">
        <section className="pt-44 pb-20">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12 text-center">
            <h1 className="text-5xl font-serif text-charcoal mb-6">Our Team</h1>
            <p className="text-lg text-warm-gray max-w-2xl mx-auto">
              The professionals ensuring your real estate journey is safe and successful.
            </p>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {membersError && (
                <p className="col-span-full rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                  {membersError}
                </p>
              )}
              {teamMembers.map((member) => (
                <Link key={member.slug} href={`/about/team/${member.slug}`} className="group block">
                  <div className="aspect-[3/4] relative overflow-hidden bg-platinum rounded-lg mb-6">
                    <Image
                      src={member.displayImage || "/team/founder.jpg"}
                      alt={member.name} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-xl font-serif text-charcoal mb-1">{member.name}</h3>
                  <p className="text-russian-purple text-sm font-medium uppercase tracking-wider mb-4">{member.role}</p>
                </Link>
              ))}
              {response.ok && teamMembers.length === 0 && !membersError && (
                <p className="col-span-full text-warm-gray">No team members are available right now.</p>
              )}
            </div>
          </div>
        </section>

        {/* Hiring CTA */}
        <section className="py-24 border-t border-platinum">
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
