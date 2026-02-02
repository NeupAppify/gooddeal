import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, Linkedin } from "lucide-react";

export default function TeamMemberPage() {
  // Mock data - would normally fetch based on params.slug
  const member = {
    name: "Mukti Nath Nepal",
    role: "Founder & CEO, Good Deal",
    image: "/hero.png",
    bio: "Mukti Nath Nepal founded Good Deal with a vision to bring transparency to Nepal's real estate market. With over 15 years of experience in high-value asset acquisition and legal compliance, he has helped hundreds of families and investors secure safe properties.",
    specialties: ["Luxury Residential", "Commercial Land", "Legal Due Diligence"],
    contact: {
      email: "contact@gooddeal.com.np",
      phone: "+977 984 0518336",
      linkedin: "#"
    }
  };

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
                <p className="text-russian-purple font-medium text-lg uppercase tracking-wide mb-8">{member.role}</p>

                <div className="prose prose-lg text-warm-gray mb-10">
                  <p>{member.bio}</p>
                </div>

                <div className="mb-10">
                  <h3 className="font-serif text-xl text-charcoal mb-4">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((spec, i) => (
                      <span key={i} className="bg-platinum px-4 py-2 rounded-full text-sm text-charcoal">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-platinum pt-8">
                  <h3 className="font-serif text-xl text-charcoal mb-6">Contact</h3>
                  <div className="space-y-4">
                    <a href={`mailto:${member.contact.email}`} className="flex items-center gap-3 text-warm-gray hover:text-russian-purple transition-colors">
                      <Mail className="w-5 h-5" />
                      {member.contact.email}
                    </a>
                    <a href={`tel:${member.contact.phone}`} className="flex items-center gap-3 text-warm-gray hover:text-russian-purple transition-colors">
                      <Phone className="w-5 h-5" />
                      {member.contact.phone}
                    </a>
                    <a href={member.contact.linkedin} className="flex items-center gap-3 text-warm-gray hover:text-russian-purple transition-colors">
                      <Linkedin className="w-5 h-5" />
                      LinkedIn Profile
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
