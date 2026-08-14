// spencer-lynch/app/book/page.tsx
import type { Metadata } from "next";
import { TopNav } from "@/components/nav/top-nav";
import { SiteFooter } from "@/components/footer/site-footer";
import { EnquiryForm } from "@/components/contact/enquiry-form";

const PHONE_TEL = "+447706319468";       // Spencer's real number
const EMAIL = "spencario@yahoo.com";

export const metadata: Metadata = {
  title: "Book Spencer Lynch · Memorable Magic",
  description:
    "Booking enquiries for close-up, tech illusion, and big-event magic by Spencer Lynch.",
};

export default function BookPage() {
  return (
    <>
      <TopNav />

      <main className="pinstripe relative bg-ink">
        <section className="px-6 py-24 md:px-10">
          <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-16 lg:grid-cols-[1fr_1.4fr]">
            <aside className="flex flex-col gap-8">
              <p className="font-mono text-[10px] uppercase tracking-eyebrow-wide text-gold/85">
                Bookings
              </p>
              <h1 className="font-display text-4xl italic leading-tight text-cream md:text-5xl">
                It all starts<br />with a chat.
              </h1>
              <p className="text-[14px] leading-relaxed text-cream/75">
                Tell Spencer about your event. Most replies come within a working day.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href={`tel:${PHONE_TEL}`} className="min-w-[100px] border border-gold/50 bg-ink px-8 py-4 text-center font-display text-2xl italic text-cream transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
                  Call
                </a>
                <a href={`mailto:${EMAIL}`} className="min-w-[100px] border border-gold/50 bg-ink px-8 py-4 text-center font-display text-2xl italic text-cream transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
                  Email
                </a>
                <a href="#enquiry" className="min-w-[100px] border border-gold bg-gold/15 px-8 py-4 text-center font-display text-2xl italic text-gold transition-all hover:bg-gold/25">
                  Book
                </a>
              </div>
            </aside>

            <section id="enquiry">
              <EnquiryForm />
            </section>
          </div>
        </section>
      </main>

      <SiteFooter phoneTel={PHONE_TEL} emailMailto={EMAIL} />
    </>
  );
}
