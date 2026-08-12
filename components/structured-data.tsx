export function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://howdidhedothat.co.uk/#spencer",
        name: "Spencer Lynch",
        jobTitle: "Professional Close-Up Magician",
        description:
          "Spencer Lynch is Liverpool FC's Club Magician since 2006 and the first Club Magician at Everton FC. Twenty years of close-up magic at stadiums, boardrooms, weddings and private events across the UK.",
        url: "https://howdidhedothat.co.uk",
        sameAs: ["https://www.linkedin.com/in/spencelynch/"],
        telephone: "+447706319468",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Liverpool",
          addressRegion: "Merseyside",
          addressCountry: "GB",
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://howdidhedothat.co.uk/#business",
        name: "Spencer Lynch — Memorable Magic",
        description:
          "Professional close-up magician available for corporate events, weddings, stadium hospitality, private parties and charity events across the UK.",
        url: "https://howdidhedothat.co.uk",
        telephone: "+447706319468",
        priceRange: "££££",
        areaServed: [
          { "@type": "Country", name: "United Kingdom" },
          { "@type": "City", name: "Liverpool" },
          { "@type": "City", name: "Manchester" },
          { "@type": "City", name: "London" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Magic Entertainment Services",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Corporate Event Magic" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Wedding Magic" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Stadium Hospitality Magic" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Private Party Magic" } },
          ],
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
