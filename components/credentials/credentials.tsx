// spencer-lynch/components/credentials/credentials.tsx
import { CredentialCard, type CredentialCardProps } from "./credential-card";

const CARDS: CredentialCardProps[] = [
  {
    suit: "clubs",
    rank: "A",
    title: "Premier Magician",
    body: "Official magician of LFC for over 20 years.",
  },
  {
    suit: "hearts",
    rank: "Q",
    title: "Over 30 Years Experience",
    body: "Working for some of the biggest most recognised brands.",
  },
  {
    suit: "spades",
    rank: "K",
    title: "All Kinds of Events",
    body: "Weddings, parties, dinner parties, trade shows, corporate events.",
  },
  {
    suit: "diamonds",
    rank: "J",
    title: "Why Choose Me",
    body: "I will meet you before you book me, you can experience my magic and how it all comes together in a performance before you decide.",
  },
];


export function Credentials() {
  return (
    <section className="px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto grid max-w-[1100px] grid-cols-2 gap-4 px-2 md:grid-cols-4 md:gap-6">
        {CARDS.map((card) => (
          <CredentialCard key={card.suit} {...card} />
        ))}
      </div>
    </section>
  );
}
