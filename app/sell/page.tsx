"use client";

import { FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SellPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const submitted = searchParams.get("status") === "submitted";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/sell?status=submitted");
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        <section className="bg-platinum/30 px-6 pb-16 pt-40 md:px-12 md:pb-24 md:pt-48">
          <div className="mx-auto max-w-[1440px]">
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.22em] text-sage">
              Sell with Good Deal
            </p>
            <h1 className="max-w-2xl text-5xl leading-[1.05] tracking-tight text-charcoal md:text-7xl">
              Let&apos;s start with the basics.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-warm-gray">
              Share a few details and our team will get in touch to understand your property and next steps.
            </p>
          </div>
        </section>

        <section className="px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto grid max-w-[1100px] gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <p className="text-sm leading-7 text-warm-gray">
                Whether you own the property or represent the owner, we&apos;ll help you take the next step with clarity.
              </p>
            </div>

            {submitted ? (
              <div className="rounded-2xl border border-sage/20 bg-sage/5 p-8 md:p-10" role="status">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-sage text-xl text-white">
                  ✓
                </div>
                <h2 className="text-3xl tracking-tight text-charcoal">Submitted</h2>
                <p className="mt-4 max-w-md leading-7 text-warm-gray">
                  Thank you. We&apos;ve received your details and will be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-charcoal">Your name</label>
                  <input id="name" name="name" type="text" required autoComplete="name" placeholder="Enter your full name" className="w-full rounded-lg border border-black/10 bg-platinum/20 px-4 py-3.5 text-charcoal outline-none transition-colors placeholder:text-warm-gray/70 focus:border-russian-purple" />
                </div>

                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-charcoal">Phone number</label>
                  <input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="Enter your phone number" className="w-full rounded-lg border border-black/10 bg-platinum/20 px-4 py-3.5 text-charcoal outline-none transition-colors placeholder:text-warm-gray/70 focus:border-russian-purple" />
                </div>

                <fieldset>
                  <legend className="mb-3 text-sm font-medium text-charcoal">You are the</legend>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-black/10 px-4 py-3.5 text-sm transition-colors has-[:checked]:border-russian-purple has-[:checked]:bg-russian-purple/5">
                      <input type="radio" name="role" value="owner" required className="accent-russian-purple" />
                      Property owner
                    </label>
                    <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-black/10 px-4 py-3.5 text-sm transition-colors has-[:checked]:border-russian-purple has-[:checked]:bg-russian-purple/5">
                      <input type="radio" name="role" value="representative" className="accent-russian-purple" />
                      Owner&apos;s representative
                    </label>
                  </div>
                </fieldset>

                <button type="submit" className="btn-primary w-full sm:w-auto">Submit details</button>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
