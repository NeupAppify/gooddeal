import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import Image from "next/image";
import { Quote } from "lucide-react";

export default function FounderPage() {
  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      
      <main className="flex-grow">
        <section className="pt-44 pb-24 bg-white">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div className="relative aspect-[3/4] bg-platinum rounded-2xl overflow-hidden lg:sticky lg:top-32">
                 <Image 
                  src="/team/founder.jpg" 
                  alt="Mukti Nath Nepal, Founder" 
                  fill 
                  className="object-cover"
                />
              </div>
              
              <div className="max-w-prose">
                <Quote className="w-12 h-12 text-russian-purple/20 mb-8" />
                <h1 className="text-4xl md:text-5xl font-serif text-charcoal mb-8">
                  Our Promise to Every Client
                </h1>
                
                <div className="space-y-6 text-lg text-charcoal/80 leading-relaxed font-light">
                  <p>
                    Dear Valued Clients, Partners, and Visitors,
                  </p>
                  <p>
                    Welcome to our website, and thank you for taking the time to learn more about our company.
                  </p>
                  <p>
                    When I founded this company, I had one clear vision: to create a real estate platform built on trust, integrity, and exceptional service. I believed that buying or selling property should be a transparent, secure, and rewarding experience for everyone. Today, that vision continues to guide everything we do.
                  </p>
                  <p>
                    Real estate is more than land and buildings&mdash;it is about families finding a place to call home, entrepreneurs building their businesses, and investors creating opportunities for future growth. We understand that every property transaction represents an important milestone, and we are honored to be part of that journey.
                  </p>
                  <p>
                    Our commitment is to provide verified property listings, reliable market insights, and professional guidance that empower our clients to make informed decisions with confidence. We strive to build lasting relationships based on honesty, respect, and a genuine commitment to your success.
                  </p>
                  <p>
                    As Nepal&apos;s real estate sector continues to evolve, we remain dedicated to embracing innovation while maintaining the highest standards of professionalism and ethics. Through our website, we aim to make property information more accessible, transparent, and convenient for everyone.
                  </p>
                  <p>
                    On behalf of our entire team, I sincerely thank you for your trust and support. We invite you to explore our properties, read our resources, and connect with us whenever you need expert real estate advice. We look forward to helping you achieve your property goals and becoming your trusted partner in every step of your real estate journey.
                  </p>
                  <p>
                    Thank you for choosing us.
                  </p>
                </div>

                <div className="mt-12 pt-8 border-t border-platinum">
                  <h3 className="font-serif text-2xl text-charcoal">Mukti Nath Nepal</h3>
                  <p className="text-russian-purple font-medium uppercase tracking-wider text-sm mt-2">Founder & CEO, Good Deal</p>
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
