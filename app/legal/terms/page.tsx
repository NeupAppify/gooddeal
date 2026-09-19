import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions, Good Deal",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      
      <main className="flex-grow bg-white">
        <section className="pt-44 pb-20">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12 text-center">
            <h1 className="text-4xl md:text-5xl font-serif text-charcoal mb-4">Terms of Service</h1>
            <p className="text-warm-gray">Last Updated: October 2024</p>
          </div>
        </section>

        <section className="pt-44 pb-20">
          <div className="container mx-auto max-w-[800px] px-6">
            <div className="prose prose-lg text-charcoal/80 prose-headings:font-serif prose-headings:text-charcoal prose-a:text-russian-purple">
              <p>
                Please read these Terms of Service carefully before using the Good Deal Advisory website operated by us.
              </p>

              <h3>1. Advisory Nature of Services</h3>
              <p>
                Good Deal Advisory provides consultation, verification, and facilitation services for real estate transactions. We are not the final authority on land ownership or legality; that power resides with the Government of Nepal. Our reports are based on available data at the time of verification.
              </p>

              <h3>2. No Guarantee of Transaction</h3>
              <p>
                While we facilitate buying and selling, we do not guarantee that a transaction will occur. Market conditions, buyer/seller intent, and legal hurdles are outside our total control.
              </p>

              <h3>3. Accuracy of Information</h3>
              <p>
                We strive to ensure all property listings and legal guides are accurate. However, we cannot warrant that all information is error-free, complete, or current. You acknowledge that such information may contain inaccuracies.
              </p>

              <h3>4. Limitation of Liability</h3>
              <p>
                In no event shall Good Deal Advisory, nor its directors, employees, or partners, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits or data, resulting from your use of our services.
              </p>

              <h3>5. Governing Law</h3>
              <p>
                These Terms shall be governed and construed in accordance with the laws of Nepal, without regard to its conflict of law provisions.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
