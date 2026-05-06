export type EventCategory =
  | "stadium"
  | "corporate"
  | "wedding"
  | "private"
  | "charity"
  | "hospitality";

export interface WorkEntry {
  slug: string;
  category: EventCategory;
  eyebrow: string;
  title: string;
  subtitle: string;
  body: string[];
  stat?: { value: string; label: string };
  cta?: string;
}

export const CATEGORIES: Record<EventCategory, { label: string; description: string }> = {
  stadium: {
    label: "Stadium & Residencies",
    description:
      "Liverpool FC's official close-up magician since 2006 and the only magician to hold resident positions at two Premier League clubs simultaneously — matchday magic at the highest level.",
  },
  corporate: {
    label: "Corporate & Brand",
    description:
      "Close-up magic for corporate events, product launches, brand activations and executive dinners. Clients include Google, Marks & Spencer, Santander and Aon.",
  },
  wedding: {
    label: "Weddings",
    description:
      "A professional wedding magician who fills the drinks reception, breaks the ice at tables and gives guests a moment they talk about for years. Money-back guarantee.",
  },
  private: {
    label: "Private Events",
    description:
      "Bespoke close-up magic for birthday parties, anniversary dinners and private celebrations — tailored to your guests and your room.",
  },
  charity: {
    label: "Charity & Community",
    description:
      "Twenty years of pro-bono and reduced-rate magic for charitable causes across Merseyside and beyond.",
  },
  hospitality: {
    label: "Hospitality & VIP",
    description:
      "Premium VIP hospitality magic for corporate boxes, sponsor lounges and exclusive suites where first impressions define the evening.",
  },
};

export const WORK: WorkEntry[] = [
  {
    slug: "anfield-residency",
    category: "stadium",
    eyebrow: "— § Liverpool FC · 2006–Present —",
    title: "Anfield Residency",
    subtitle: "Eighteen years as Liverpool FC's official magician.",
    body: [
      "Since 2006 I have been Liverpool Football Club's official magician — the longest-running residency of any magician at a Premier League club. On matchdays I move between the Executive Boxes in the Sir Kenny Dalglish Stand, the Boot Room restaurant, and the museum tour circuit.",
      "The brief is simple: make the room feel extraordinary before a ball is kicked. The magic has to work in tight spaces, with loud crowds, on cold January afternoons and European night games alike.",
      "Over eighteen seasons I have performed for tens of thousands of guests — from first-time visitors on family days to boardroom directors, international delegations, and former players. The show must always feel fresh.",
    ],
    stat: { value: "18+", label: "Seasons at Anfield" },
    cta: "Book for a Private Event",
  },
  {
    slug: "everton-residency",
    category: "stadium",
    eyebrow: "— § Everton FC —",
    title: "Everton FC Residency",
    subtitle: "The first — and only — resident magician at Goodison Park.",
    body: [
      "Before Wrexham, there was Everton. I was the first resident magician ever appointed by Everton Football Club, working matchdays at Goodison Park in their premium hospitality suites.",
      "Running concurrent residencies at both Everton and Liverpool made me the only magician in history to hold simultaneous resident positions at two Premier League clubs — a record that still stands.",
      "The experience of working both sides of Merseyside gave me an unmatched understanding of the football hospitality world: the pace, the crowd, the expectation, and how to deliver close-up magic that works in every corner of a stadium suite.",
    ],
    stat: { value: "1st", label: "Ever resident magician at Everton FC" },
    cta: "Book for Stadium Hospitality",
  },
  {
    slug: "wrexham-matchday",
    category: "stadium",
    eyebrow: "— § Wrexham AFC —",
    title: "Wrexham AFC",
    subtitle: "The club that Hollywood rebuilt — I supplied the magic.",
    body: [
      "When Wrexham AFC's Hollywood-backed resurgence brought a wave of international attention to the Racecourse Ground, I joined the hospitality team for matchday entertainment in their premium suites.",
      "The audience shifted overnight — international guests, media, celebrity visitors alongside the core Red Dragon support. The magic had to land across every demographic in the room.",
      "Working at Wrexham alongside my Anfield residency made me the only magician in history to hold simultaneous resident positions at two professional football clubs.",
    ],
    stat: { value: "2", label: "Club residencies — a first" },
    cta: "Book for Stadium Hospitality",
  },
  {
    slug: "corporate-brand-activations",
    category: "corporate",
    eyebrow: "— § Boardrooms & Brand —",
    title: "Corporate & Brand Activations",
    subtitle: "From Google to Marks & Spencer — magic as a business tool.",
    body: [
      "Magic at a corporate event is not decoration. Done well it breaks down barriers between strangers, gives guests a shared moment to discuss, and anchors your brand to the feeling of surprise.",
      "I have worked with Google, Marks & Spencer, Santander, Morrisons, Specsavers, Five Guys, and Aon — at product launches, team away-days, client entertainment evenings, and trade shows.",
      "For brand activations I build bespoke effects around the product or message. A branded prediction, a technology-driven reveal, an effect that only works with your company's name — the magic earns its place in the room.",
    ],
    stat: { value: "20+", label: "Global brand clients" },
    cta: "Enquire About Corporate Events",
  },
  {
    slug: "weddings",
    category: "wedding",
    eyebrow: "— § Weddings —",
    title: "Wedding Magic",
    subtitle: "The best bit of every wedding you've never planned for.",
    body: [
      "Close-up magic is the perfect wedding entertainment because it works in the spaces that everything else doesn't — the drinks reception, the gap between ceremony and dinner, the post-dinner lull before the band.",
      "I move table to table, group to group, reading the room and calibrating the performance to each audience. Guests who say 'I hate magic' become the loudest voices demanding an encore.",
      "With over twenty years of wedding experience I can handle any room — nervous bridesmaids, unimpressed uncles, screaming children. The guarantee is real: if my performance doesn't exceed your expectations, you don't pay.",
    ],
    cta: "Book for Your Wedding",
  },
  {
    slug: "private-parties",
    category: "private",
    eyebrow: "— § Private Events —",
    title: "Private Parties & Dinners",
    subtitle: "Intimate magic for the guests who've seen everything.",
    body: [
      "Private events are where close-up magic finds its highest expression. No stage, no distance, no hiding — the magic happens in your hands, at your table, inside your living room.",
      "Whether it's a milestone birthday, an anniversary dinner, a house party or a gathering of friends who all think they know how it's done — I calibrate the performance to the room and the moment.",
      "I perform throughout the UK and am happy to travel anywhere for the right event. The first consultation is always free, and the meeting itself includes a taste of what to expect.",
    ],
    cta: "Book for a Private Event",
  },
  {
    slug: "charity-community",
    category: "charity",
    eyebrow: "— § The Work That Matters —",
    title: "Charity & Community",
    subtitle: "Twenty years of giving the trick away.",
    body: [
      "Not every performance is ticketed. Some of the most meaningful magic I've done has been at hospitals, community centres, and charity galas where the audience needed a moment of wonder more than anything else.",
      "I have worked with the LFC Foundation, Liverpool Disabled Supporters Association, Down Syndrome Liverpool, the Owen McVeigh Foundation, and the Countess of Chester Hospital, among others.",
      "If you're running a charity event and want to explore how magic can support it — reach out. I am always open to a conversation.",
    ],
    cta: "Get in Touch",
  },
  {
    slug: "vip-hospitality",
    category: "hospitality",
    eyebrow: "— § VIP & Hospitality —",
    title: "VIP & Premium Hospitality",
    subtitle: "First-class magic for first-class rooms.",
    body: [
      "Hospitality suites and VIP lounges have one thing in common: guests who are hard to impress. They've seen the Michelin restaurants, the private members' clubs, the premium packages.",
      "Magic cuts through because it is genuinely impossible to explain away. A card signed by a guest that appears inside a sealed bottle. A borrowed ring that vanishes and reappears. An effect that makes a room full of jaded professionals stop mid-sentence.",
      "I have performed in executive lounges, UEFA hospitality suites, financial-services client evenings, and high-net-worth private events across the UK. The brief is always the same: make this the thing they remember.",
    ],
    stat: { value: "UEFA", label: "Fixtures included" },
    cta: "Book for a Hospitality Event",
  },
];

export function getWorkBySlug(slug: string): WorkEntry | undefined {
  return WORK.find((w) => w.slug === slug);
}

export function getWorkByCategory(category: EventCategory): WorkEntry[] {
  return WORK.filter((w) => w.category === category);
}
