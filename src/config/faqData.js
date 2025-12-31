// src/config/faqData.js

const faqData = [
  {
    category: "Getting Started",
    items: [
      {
        id: "gen-get-quote",
        question: "How do I get a quote?",
        answer: `
        You can request a quote by filling out our online form and we'll get back to you in 1-3 days.
        <br />
        <br />
        We also do quotes via e-mail: nashville3dprinting@gmail.com
        <br />
        And through phone call / text messaging at (209) 202-3221`
      },
      {
        id: "gen-what-can-print",
        question: "What can I print?",
        answer: `
            Props, Toys, Ornaments, Figurines, Jewelry, Shelf Mounts almost anything you can think of!
            <br />
            <br />
            Here's some websites you can search for things to print:
            <ul>
                <li><a href="https://www.thingiverse.com" target="_blank">Thingiverse</a></li>
                <li><a href="https://www.printables.com" target="_blank">Printables</a></li>
                <li><a href="https://www.makersworld.com" target="_blank">MakersWorld</a></li>
            </ul>
            Alternatively if you find it on TikTok or Facebook you can directly send us the post and we'll find it for you.
            `
      },
      {
        id: "gen-no-file",
        question: "What does this cost?",
        answer:
          "Costs are factored by: Size of the object, Time to print, How many colors, Materials needed, How many you need, and if you need shipping! Generally prints go from $20 - $100.",
      },
    ],
  },
  {
    category: "Files & Requirements",
    items: [
      {
        id: "file-formats",
        question: "What file formats do you accept?",
        answer:
          "We primarily accept STL and OBJ files. STEP or 3MF files are also welcome. If you’re unsure, send what you have and we’ll let you know if it’s compatible or needs conversion.",
      },
      {
        id: "file-quality",
        question: "What makes a good printable file?",
        answer:
          "Your model should be watertight (no holes), have reasonable wall thickness, and be scaled to the correct size. Very tiny details may not show well at smaller scales. If we see issues, we’ll let you know before printing.",
      },
      {
        id: "file-sizing",
        question: "Can you resize my model?",
        answer:
          "Yes. We can scale models up or down as long as the new size is practical for printing and your intended use. Some extreme size changes may affect strength or detail, which we’ll discuss before printing.",
      },
    ],
  },
  {
    category: "Materials & Quality",
    items: [
      {
        id: "mat-types",
        question: "What materials do you offer?",
        answer:
          "Common materials include PLA for general prints, PETG for stronger and more heat-resistant parts, and other specialty filaments on request. If you’re not sure which to choose, tell us how the part will be used and we’ll recommend a material.",
      },
      {
        id: "mat-colors",
        question: "Can I choose the color?",
        answer:
          "Yes. We keep a variety of colors in stock and can special-order others when needed. Let us know your preferred color when requesting a quote, and we’ll confirm availability or suggest close alternatives.",
      },
      {
        id: "mat-strength",
        question: "Are 3D printed parts strong?",
        answer:
          "Strength depends on material, wall thickness, infill percentage, and part design. For functional parts we typically increase wall thickness and infill. If your part needs to handle stress or impact, mention that when you request a quote.",
      },
    ],
  },
  {
    category: "Pricing & Turnaround",
    items: [
      {
        id: "price-how",
        question: "How is pricing calculated?",
        answer:
          "Pricing is based on print time, material usage, part complexity, and any design or post-processing work (sanding, priming, etc.). We’ll give you a clear breakdown in your quote before you commit.",
      },
      {
        id: "turnaround-time",
        question: "How long does printing usually take?",
        answer:
          "Typical turnaround is a few days for smaller jobs, depending on our current queue and the size of your print. Large or multi-part projects may take longer. We’ll include an estimated completion date with your quote.",
      },
      {
        id: "rush-orders",
        question: "Do you offer rush orders?",
        answer:
          "In many cases, yes. Rush orders depend on our current schedule and printer availability and may include an additional fee. Let us know your deadline when you contact us so we can check what’s possible.",
      },
    ],
  },
  {
    category: "Orders & Pickup",
    items: [
      {
        id: "order-approve",
        question: "What happens after I approve a quote?",
        answer:
          "Once you approve the quote, we schedule your job, begin printing, and keep you updated if anything changes. When your order is ready, we’ll contact you with pickup details or shipping information, depending on what you chose.",
      },
      {
        id: "order-changes",
        question: "Can I change my order after printing starts?",
        answer:
          "Minor changes may be possible if printing has not begun. Once a print is in progress or completed, significant changes usually require a new print and may incur additional cost. We’ll always discuss options with you first.",
      },
      {
        id: "order-issues",
        question: "What if there’s a problem with my print?",
        answer:
          "If there’s a defect or the print doesn’t match what we agreed upon, contact us as soon as possible with photos and details. We’ll review the issue and work with you on a reprint or adjustment when appropriate.",
      },
    ],
  },
];

export default faqData;
