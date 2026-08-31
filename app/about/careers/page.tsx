import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers, Good Deal",
};

export default function CareersPage() {
  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      
      <main className="flex-grow">
        <section className="pt-44 pb-20 bg-platinum/30">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12 text-center">
            <h1 className="text-5xl font-serif text-charcoal mb-6">Join Our Mission</h1>
            <p className="text-lg text-warm-gray max-w-2xl mx-auto">
              Help us redefine the standard of trust in the real estate industry.
            </p>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-serif mb-8">Open Positions</h2>
              
              <div className="space-y-6">
                {[
                  {
                    title: "Real Estate Advisor",
                    type: "Full-time",
                    location: "Kathmandu",
                    desc: "Guide clients through buying and selling processes with ethical sales practices."
                  },
                  {
                    title: "Legal Associate",
                    type: "Full-time",
                    location: "Kathmandu",
                    desc: "Assist in property verification, contract drafting, and due diligence."
                  },
                  {
                    title: "Digital Marketing Specialist",
                    type: "Part-time",
                    location: "Remote / Hybrid",
                    desc: "Manage our digital presence and educational content distribution."
                  }
                ].map((job, i) => (
                  <div key={i} className="border border-platinum p-8 rounded-lg hover:border-russian-purple transition-colors bg-white group cursor-pointer">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                      <div>
                        <h3 className="text-xl font-medium text-charcoal group-hover:text-russian-purple transition-colors">{job.title}</h3>
                        <div className="flex gap-4 text-sm text-warm-gray mt-2">
                          <span>{job.type}</span>
                          <span>•</span>
                          <span>{job.location}</span>
                        </div>
                      </div>
                      <Link href="/contact" className="btn-secondary text-sm">
                        Apply Now
                      </Link>
                    </div>
                    <p className="mt-4 text-warm-gray text-sm">{job.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-16 p-8 bg-platinum/30 rounded-lg text-center">
                <h3 className="text-xl font-medium mb-4">Don&apos;t see a fit?</h3>
                <p className="text-warm-gray mb-6">
                  We are always looking for talented individuals. Send your CV to <a href="mailto:contact@gooddeal.com.np" className="text-russian-purple hover:underline font-medium">contact@gooddeal.com.np</a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
