import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { getTeamMemberBySlug, teamMembers } from "@/src/lib/team";

/*
::neup.documentation::gooddeal-team-member-page
::function TeamMemberPage({ params })
::title Good Deal Team Member Page

::public

Renders a team member profile page resolved from the slug route parameter.

Returns a 404 page when the team member slug does not exist.

::param external params
::datatype Promise<{ slug: string }>
::required true

The dynamic route params for the requested team member.

::returns
::datatype Promise<JSX.Element>

The team member profile page.

::public end

::private

The member lookup is shared with the team listing page through `src/lib/team.ts`.

::private end

::end
*/

type TeamMemberPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatPhoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function generateStaticParams() {
  return teamMembers.map((member) => ({
    slug: member.slug,
  }));
}

export default async function TeamMemberPage({ params }: TeamMemberPageProps) {
  const { slug } = await params;
  const member = getTeamMemberBySlug(slug);

  if (!member) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      
      <main className="flex-grow bg-white">
        <section className="pt-44 pb-20">
          <div className="container mx-auto max-w-[1000px] px-6">
            <Link href="/about/team" className="inline-flex items-center gap-2 text-sm text-warm-gray hover:text-russian-purple mb-12 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Team
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
              <div className="aspect-[3/4] relative overflow-hidden bg-platinum rounded-xl md:sticky md:top-32">
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  fill 
                  className="object-cover"
                />
              </div>

              <div className="md:col-span-2">
                <h1 className="text-4xl font-serif text-charcoal mb-2">{member.name}</h1>
                <p className="text-russian-purple font-medium text-lg uppercase tracking-wide mb-10">{member.role}</p>

                <div className="rounded-2xl bg-platinum/40 p-6 md:p-8 mb-10">
                  <h2 className="font-serif text-2xl text-charcoal mb-3">Team Member</h2>
                  <p className="text-warm-gray leading-relaxed">
                    Contact {member.name} directly for Good Deal inquiries related to {member.role.toLowerCase()}.
                  </p>
                </div>

                <div className="border-t border-platinum pt-8">
                  <h3 className="font-serif text-xl text-charcoal mb-6">Contact</h3>
                  <div className="space-y-4">
                    <a href={`mailto:${member.email}`} className="flex items-center gap-3 text-warm-gray hover:text-russian-purple transition-colors break-all">
                      <Mail className="w-5 h-5" />
                      {member.email}
                    </a>
                    <a href={formatPhoneHref(member.phone)} className="flex items-center gap-3 text-warm-gray hover:text-russian-purple transition-colors">
                      <Phone className="w-5 h-5" />
                      {member.phone}
                    </a>
                  </div>
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
