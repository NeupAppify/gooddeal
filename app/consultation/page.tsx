import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle, Calendar, MessageSquare, ArrowRight } from "lucide-react";

export default function ConsultationPage() {
  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      
      <main className="flex-grow bg-white">
        <section className="pt-44 pb-20">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12 text-center">
            <h1 className="text-5xl font-serif text-charcoal mb-6">Expert Consultation</h1>
            <p className="text-lg text-warm-gray max-w-2xl mx-auto">
              Get personalized advice from our real estate experts. Whether you are buying, selling, or need legal verification, we are here to guide you.
            </p>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto max-w-[1000px] px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              
              {/* Left Column: Benefits */}
              <div>
                <h2 className="text-3xl font-serif text-charcoal mb-8">Why Consult With Us?</h2>
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-platinum flex items-center justify-center text-russian-purple shrink-0">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg text-charcoal mb-2">Unbiased Advice</h3>
                      <p className="text-warm-gray leading-relaxed">
                        We don&apos;t just sell properties; we protect your interests. Our advice is based on data and legal facts, not just sales targets.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-platinum flex items-center justify-center text-russian-purple shrink-0">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg text-charcoal mb-2">Legal Clarity</h3>
                      <p className="text-warm-gray leading-relaxed">
                        Understand the legal complexities of land ownership, taxes, and inheritance laws before you commit your capital.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-platinum flex items-center justify-center text-russian-purple shrink-0">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg text-charcoal mb-2">Market Insight</h3>
                      <p className="text-warm-gray leading-relaxed">
                        Access real transaction data and future development plans to ensure you are paying the fair market price.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 p-6 bg-platinum/50 rounded-lg border border-platinum">
                  <h4 className="font-serif text-lg mb-2">Consultation Fee</h4>
                  <p className="text-warm-gray mb-4">
                    Our initial 30-minute discovery call is free. For detailed legal review or property valuation, fees start at Rs. 5,000.
                  </p>
                </div>
              </div>

              {/* Right Column: Booking Form */}
              <div className="bg-white rounded-2xl border border-platinum p-8 shadow-lg">
                <h3 className="text-2xl font-serif text-charcoal mb-6">Book Your Session</h3>
                <form className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-charcoal uppercase tracking-wider mb-2">First Name</label>
                      <input type="text" className="w-full bg-platinum/30 border border-platinum rounded px-4 py-3 focus:outline-none focus:border-russian-purple transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-charcoal uppercase tracking-wider mb-2">Last Name</label>
                      <input type="text" className="w-full bg-platinum/30 border border-platinum rounded px-4 py-3 focus:outline-none focus:border-russian-purple transition-colors" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-charcoal uppercase tracking-wider mb-2">Phone Number</label>
                    <input type="tel" className="w-full bg-platinum/30 border border-platinum rounded px-4 py-3 focus:outline-none focus:border-russian-purple transition-colors" placeholder="+977" />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-charcoal uppercase tracking-wider mb-2">Topic</label>
                    <select className="w-full bg-platinum/30 border border-platinum rounded px-4 py-3 focus:outline-none focus:border-russian-purple transition-colors outline-none">
                      <option>Property Buying Advice</option>
                      <option>Selling Consultation</option>
                      <option>Legal Verification</option>
                      <option>Investment Planning</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-charcoal uppercase tracking-wider mb-2">Preferred Date</label>
                    <div className="relative">
                      <input type="date" className="w-full bg-platinum/30 border border-platinum rounded px-4 py-3 focus:outline-none focus:border-russian-purple transition-colors" />
                      <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-charcoal uppercase tracking-wider mb-2">Message (Optional)</label>
                    <textarea className="w-full bg-platinum/30 border border-platinum rounded px-4 py-3 focus:outline-none focus:border-russian-purple transition-colors h-24 resize-none" placeholder="Briefly describe your needs..."></textarea>
                  </div>

                  <button className="w-full btn-primary flex items-center justify-center gap-2">
                    Request Appointment <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>

            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="pt-44 pb-20">
          <div className="container mx-auto max-w-[800px] px-6">
            <h2 className="text-3xl font-serif text-charcoal text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: "Is the initial consultation really free?",
                  a: "Yes, we offer a complimentary 30-minute discovery call to understand your needs and determine how we can best assist you."
                },
                {
                  q: "Can I bring my own legal documents?",
                  a: "Absolutely. If you have existing property documents (Lalpurja, Naxa), please bring copies so we can give you a preliminary assessment."
                },
                {
                  q: "Do you offer virtual consultations?",
                  a: "Yes, we can conduct sessions via Zoom, Google Meet, or WhatsApp Video for clients who cannot visit our office."
                }
              ].map((faq, i) => (
                <div key={i} className="bg-white p-6 rounded-lg border border-platinum">
                  <h3 className="font-medium text-charcoal flex items-start gap-3">
                    <MessageSquare className="w-5 h-5 text-russian-purple shrink-0 mt-0.5" />
                    {faq.q}
                  </h3>
                  <p className="text-warm-gray mt-2 ml-8 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
