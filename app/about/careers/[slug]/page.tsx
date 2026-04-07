import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";

export default function JobDetailPage() {
  // Mock data - would normally fetch based on params.slug
  const job = {
    title: "Real Estate Advisor",
    location: "Kathmandu",
    type: "Full-time",
    description: "We are looking for a dedicated Real Estate Advisor to join our growing team. You will be responsible for guiding clients through buying and selling processes with ethical sales practices and deep market knowledge.",
    responsibilities: [
      "Consult with clients to identify their needs and preferences",
      "Conduct property viewings and provide honest assessments",
      "Verify property documentation before listing",
      "Negotiate terms that are fair to all parties",
      "Stay updated on market trends and legal regulations"
    ],
    requirements: [
      "2+ years of experience in real estate or sales",
      "Strong understanding of Kathmandu's property market",
      "Excellent communication and negotiation skills",
      "Integrity and commitment to transparency",
      "Valid driving license and vehicle"
    ]
  };

  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      
      <main className="flex-grow bg-white">
        <section className="pt-44 pb-20 bg-platinum/30">
          <div className="container mx-auto max-w-[800px] px-6">
            <Link href="/about/careers" className="inline-flex items-center gap-2 text-sm text-warm-gray hover:text-russian-purple mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Careers
            </Link>
            
            <h1 className="text-4xl font-serif text-charcoal mb-4">{job.title}</h1>
            <div className="flex gap-4 text-sm text-warm-gray mb-8">
              <span className="bg-white px-3 py-1 rounded border border-platinum">{job.type}</span>
              <span className="bg-white px-3 py-1 rounded border border-platinum">{job.location}</span>
            </div>
          </div>
        </section>

        <section className="pt-44 pb-20">
          <div className="container mx-auto max-w-[800px] px-6">
            <div className="mb-12">
              <h3 className="text-2xl font-serif mb-4">About the Role</h3>
              <p className="text-warm-gray leading-relaxed">{job.description}</p>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-serif mb-6">Responsibilities</h3>
              <ul className="space-y-3">
                {job.responsibilities.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-warm-gray">
                    <CheckCircle className="w-5 h-5 text-russian-purple flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-serif mb-6">Requirements</h3>
              <ul className="space-y-3">
                {job.requirements.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-warm-gray">
                    <CheckCircle className="w-5 h-5 text-russian-purple flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-platinum/30 p-8 rounded-xl border border-platinum">
              <h3 className="text-xl font-serif mb-4">Apply for this position</h3>
              <p className="text-warm-gray mb-6">
                Send your CV and a cover letter to <a href="mailto:contact@gooddeal.com.np" className="text-russian-purple hover:underline font-medium">contact@gooddeal.com.np</a> with the subject line &quot;Application: {job.title}&quot;.
              </p>
              <a href={`mailto:contact@gooddeal.com.np?subject=Application: ${job.title}`} className="btn-primary inline-flex">
                Send Application
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
