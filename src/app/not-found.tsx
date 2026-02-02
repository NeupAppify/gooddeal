import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col ">
      <Header />

      <main className="flex-grow flex items-center justify-center bg-platinum/30">
        <div className="container mx-auto px-6 py-24 text-center">
          <div className="max-w-2xl mx-auto">
            <span className="text-russian-purple font-bold text-9xl block mb-4 opacity-10">404</span>
            <h1 className="text-4xl md:text-5xl font-serif text-charcoal mb-6">
              Page Not Found
            </h1>
            <p className="text-lg text-warm-gray mb-10 leading-relaxed">
              The page or property you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/" className="btn-primary">
                Return Home
              </Link>
              <Link href="/contact" className="btn-secondary">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
