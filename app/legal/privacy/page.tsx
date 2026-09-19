import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy, Good Deal",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      
      <main className="flex-grow bg-white">
        <section className="pt-44 pb-20">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12 text-center">
            <h1 className="text-4xl md:text-5xl font-serif text-charcoal mb-4">Privacy Policy</h1>
            <p className="text-warm-gray">Last Updated: October 2024</p>
          </div>
        </section>

        <section className="pt-44 pb-20">
          <div className="container mx-auto max-w-[800px] px-6">
            <div className="prose prose-lg text-charcoal/80 prose-headings:font-serif prose-headings:text-charcoal prose-a:text-russian-purple">
              <p>
                At Good Deal Advisory, we respect your privacy and are committed to protecting the personal information you share with us. This policy explains how we collect, use, and safeguard your data.
              </p>

              <h3>1. Information We Collect</h3>
              <p>
                We collect information you provide directly to us, such as when you fill out a contact form, request a property verification, or subscribe to our newsletter. This may include your name, email address, phone number, and property details.
              </p>

              <h3>2. How We Use Your Information</h3>
              <ul>
                <li>To provide and maintain our services.</li>
                <li>To notify you about changes to our services.</li>
                <li>To provide customer support.</li>
                <li>To monitor the usage of our services.</li>
              </ul>

              <h3>3. Data Security</h3>
              <p>
                The security of your data is important to us, but remember that no method of transmission over the Internet is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
              </p>

              <h3>4. Third-Party Services</h3>
              <p>
                We may employ third-party companies and individuals to facilitate our Service (&quot;Service Providers&quot;), to provide the Service on our behalf, or to assist us in analyzing how our Service is used. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
