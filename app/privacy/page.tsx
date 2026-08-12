import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy | Spencer Lynch",
  description: "How this site handles your data when you send a booking enquiry.",
  alternates: { canonical: "https://howdidhedothat.co.uk/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-[720px] px-5 pb-24 pt-32 text-cream md:px-10">
      <p className="font-mono text-[10px] uppercase tracking-eyebrow-wide text-gold">Privacy</p>
      <h1 className="mt-3 font-display text-4xl italic">How your data is handled</h1>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-cream/80">
        <section>
          <h2 className="font-display text-2xl italic text-cream">What this site collects</h2>
          <p className="mt-3">
            The only personal data this site collects is what you type into the booking
            enquiry form: your name, email address, event date, event type, location and
            message. Nothing is collected from you just for visiting.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl italic text-cream">Where it goes</h2>
          <p className="mt-3">
            Enquiries are received and stored by Netlify Forms (our hosting provider) and
            forwarded to Spencer by email so he can reply to you. Your details are used
            only to respond to your enquiry and arrange your booking — they are never
            sold or shared with anyone else.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl italic text-cream">Cookies and tracking</h2>
          <p className="mt-3">
            This site sets no advertising or analytics cookies and runs no trackers. The
            showreel is embedded from Vimeo with &ldquo;do not track&rdquo; enabled.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl italic text-cream">Your rights</h2>
          <p className="mt-3">
            If you would like a copy of the details you have sent, or want them deleted,
            just ask — use the contact details on the booking page and it will be sorted.
          </p>
        </section>
      </div>
    </main>
  );
}
