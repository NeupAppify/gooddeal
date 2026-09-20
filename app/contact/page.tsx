import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact, Good Deal",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      
      <main className="flex-grow bg-white">
        <section className="pt-44 pb-20">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12 text-center">
            <h1 className="text-5xl font-serif text-charcoal mb-6">Get in Touch</h1>
            <p className="text-lg text-warm-gray max-w-2xl mx-auto">
              Ready to verify a property or start your investment journey? We are here to help.
            </p>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              {/* Contact Info */}
              <div>
                <h2 className="text-3xl font-serif text-charcoal mb-2">Contact Information</h2>
                <p className="text-warm-gray mb-8">Visit, call, or write to us and our team will be happy to help.</p>
                <div className="space-y-2 mb-12">
                  <div className="flex items-start gap-4 rounded-lg border border-russian-purple/15 p-5">
                    <div className="w-12 h-12 rounded-full bg-platinum flex items-center justify-center text-russian-purple shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">Visit Our Office</h3>
                      <p className="text-warm-gray">Lazimpat Road, Kathmandu, Nepal</p>
                      <p className="text-warm-gray text-sm mt-1">(Opposite Hotel Ambassador)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-lg border border-russian-purple/15 p-5">
                    <div className="w-12 h-12 rounded-full bg-platinum flex items-center justify-center text-russian-purple shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">Call Us</h3>
                      <p className="text-warm-gray">
                        <a href="tel:+9779840518336" className="hover:text-russian-purple transition-colors">+977 984 0518336</a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-lg border border-russian-purple/15 p-5">
                    <div className="w-12 h-12 rounded-full bg-platinum flex items-center justify-center text-russian-purple shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">Email Us</h3>
                      <p className="text-warm-gray">
                        <a href="mailto:contact@gooddeal.com.np" className="hover:text-russian-purple transition-colors">contact@gooddeal.com.np</a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-lg border border-russian-purple/15 p-5">
                    <div className="w-12 h-12 rounded-full bg-platinum flex items-center justify-center text-russian-purple shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">Working Hours</h3>
                      <p className="text-warm-gray">Sunday - Friday: 10:00 AM - 6:00 PM</p>
                      <p className="text-warm-gray">Saturday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-2xl border border-platinum p-8 md:p-10 shadow-sm">
                <h2 className="text-2xl font-serif text-charcoal mb-2">Send us a Message</h2>
                <p className="text-warm-gray mb-6">Tell us how we can help, and we&apos;ll get back to you as soon as possible.</p>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <label className="block text-xs font-medium text-charcoal uppercase tracking-wider mb-2">Email Address</label>
                    <input type="email" className="w-full bg-platinum/30 border border-platinum rounded px-4 py-3 focus:outline-none focus:border-russian-purple transition-colors" />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-charcoal uppercase tracking-wider mb-2">Subject</label>
                    <select className="w-full bg-platinum/30 border border-platinum rounded px-4 py-3 focus:outline-none focus:border-russian-purple transition-colors outline-none">
                      <option>General Inquiry</option>
                      <option>Property Verification</option>
                      <option>Buying Advisory</option>
                      <option>Selling Representation</option>
                      <option>Legal Support</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-charcoal uppercase tracking-wider mb-2">Message</label>
                    <textarea className="w-full bg-platinum/30 border border-platinum rounded px-4 py-3 focus:outline-none focus:border-russian-purple transition-colors h-32 resize-none"></textarea>
                  </div>

                  <button className="w-full btn-primary">
                    Send Message
                  </button>
                </form>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
