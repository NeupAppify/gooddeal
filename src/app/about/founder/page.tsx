import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
              <div className="relative aspect-[3/4] bg-platinum rounded-2xl overflow-hidden sticky top-32">
                 <Image 
                  src="/hero.png" 
                  alt="Mukti Nath Nepal, Founder" 
                  fill 
                  className="object-cover"
                />
              </div>
              
              <div className="max-w-prose">
                <Quote className="w-12 h-12 text-russian-purple/20 mb-8" />
                <h1 className="text-4xl md:text-5xl font-serif text-charcoal mb-8">
                  &quot;Real estate isn&apos;t just about assets. It&apos;s about trust.&quot;
                </h1>
                
                <div className="space-y-6 text-lg text-warm-gray leading-relaxed font-light">
                  <p>
                    I started Good Deal after witnessing firsthand the lack of transparency in our local real estate market. I saw friends lose savings to disputed land, and families stressed by opaque legal processes.
                  </p>
                  <p>
                    It became clear that the market didn&apos;t need another salesperson; it needed an advisor. Someone who would say &quot;no&quot; to a bad deal even if it meant losing a commission.
                  </p>
                  <p>
                    At Good Deal, we have built a system where verification comes before listing, and clarity comes before closing. We are not just selling properties; we are providing the peace of mind that your investment is secure.
                  </p>
                  <p>
                    This is my promise to you: We will treat your investment with the same care and rigor as we would our own.
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
