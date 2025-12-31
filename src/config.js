const config = {
  site: {
    name: "Nashville 3D Printing",
    description: "Starter template for future sites.",
    year: 2025,
    email: "nashville3dprinting@gmail.com",
    logoSrc: "/assets/logo.png",      // or "/assets/logo.png"
    logoAlt: "Nashville3DPrinting logo",
    logoLinkTo: "/",                  // where clicking the brand goes
  },
  nav: {
    links: [
      { to: "/", label: "Home", end: true },
      { to: "/about", label: "About" },
      { to: "/contact", label: "Contact" },
      { to: "/faq", label: "FAQ" },
      { to: "/gallery", label: "Gallery" },
    ],
  },
  social: { twitter: "", instagram: "", github: "" },
  theme: { default: "dark" },

  about: {
    showFounder: true,
    founder: {
      name: "Alex Founder",
      title: "Owner & Creative Lead",
      photo: "/assets/people/founder.png",
      email: "alex@mysite.com",
      bio:
        "Alex is the founder of MySite. Passionate about clean design, fast websites, and building products people love.",
      socials: {
        twitter: "https://twitter.com/",
        instagram: "https://instagram.com/",
        github: "https://github.com/",
      },
    },

    showTeam: true,
    team: [
      {
        name: "Jamie Dev",
        title: "Frontend Engineer",
        photo: "/assets/people/jamie.png",
        bio: "Focuses on React, accessibility, and performance.",
      },
      {
        name: "Riley Ops",
        title: "Operations",
        photo: "/assets/people/jamie.png",
        bio: "Keeps projects on time and budgets happy.",
      },
    ],
  },
};

export default config;
