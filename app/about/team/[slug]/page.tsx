import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { getEnvVariable } from "@neup/core/helpers/env";
import { members } from "@neup/logica/people/members";

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

::end
*/

type TeamMemberPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getProjectId() {
  const projectId = getEnvVariable("NEUP_SITES_PROJECT_ID", true);
  if (!projectId) throw new Error("NEUP_SITES_PROJECT_ID is required to load team members.");
  return projectId;
}

export async function generateStaticParams() {
  const response = await members(getProjectId());
  const teamMembers = response.ok && response.body.success && Array.isArray(response.body.data)
    ? response.body.data
    : [];
  return teamMembers.map((person) => ({
    slug: person.slug,
  }));
}

export default async function TeamMemberPage({ params }: TeamMemberPageProps) {
  const { slug } = await params;
  const response = await members(getProjectId());
  console.info("[people] members response:", response);
  const member = response.ok && response.body.success && Array.isArray(response.body.data)
    ? response.body.data.find((item) => item.slug === slug)
    : undefined;

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
                  src={member.displayImage || "/team/founder.jpg"}
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

              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
