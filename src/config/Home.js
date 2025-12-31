// Home.js
// Home page content (copy + sections). Edit this file to update the homepage.

const homeConfig = {
  seo: {
    title: "Home",
    description:
      "Nashville-based 3D printing and CAD services. Printing since 2020 with 100+ companies served and 1,000+ customers.",
  },

  hero: {
    headingPrefix: "Welcome to",
  },

  intro: {
    paragraphs: [
      "We are Nashville 3D Printing, previously known as Valley3DPrints from California. We have been printing since 2020 during the pandemic.",
      "Since then we have worked with 100+ companies and over 1,000 customers. We have been in local markets, some stores and our Etsy. We offer 3D Printing Services and CAD Services.",
    ],
  },

  services: {
    items: [
      {
        title: "3D Printing Services",
        body:
          "FDM printing for prototypes, functional parts, enclosures, fixtures, and custom designs. Every job is reviewed for fit, finish, and durability.",
      },
      {
        title: "CAD Services",
        body:
          "We can design, modify, or repair models to make them printable and production-ready—ideal for custom parts and replacements.",
      },
    ],
  },

  materials: {
    title: "Materials",
    note: "* Materials marked with an asterisk will cost more.",
    items: [
      { name: "PLA", premium: false },
      { name: "PETG", premium: false },
      { name: "TPU", premium: true },
      { name: "ABS", premium: true },
    ],
  },

  colors: {
    title: "Default Colors",
    body: "Our default offered colors are White & Black. Other colors may be available upon request depending on material and availability.",
  },

  cta: {
    title: "Get a Quote",
    body: "Have a file ready or just an idea? Send details and we’ll get back to you with next steps.",
    buttonText: "Get a Quote",
    href: "/contact",
  },
};

export default homeConfig;
