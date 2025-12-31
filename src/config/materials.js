const materials = [
  {
    key: "pla",
    name: "PLA",
    premium: false,
    summary: "Great for prototypes and visual models. Fast and affordable.",
    bestFor: ["Prototypes", "Display parts", "General use"],
    notes: "Not ideal for high heat environments.",
  },
  {
    key: "petg",
    name: "PETG",
    premium: false,
    summary: "Stronger and more temperature-resistant than PLA.",
    bestFor: ["Functional parts", "Outdoor use", "Durability"],
    notes: "Good balance of strength and finish.",
  },
  {
    key: "tpu",
    name: "TPU*",
    premium: true,
    summary: "Flexible and impact-resistant for parts that bend or grip.",
    bestFor: ["Gaskets", "Covers", "Flexible parts"],
    notes: "* Premium material (costs more).",
  },
  {
    key: "abs",
    name: "ABS*",
    premium: true,
    summary: "Heat-tolerant and durable for tougher functional applications.",
    bestFor: ["Higher heat", "Enclosures", "Mechanical parts"],
    notes: "* Premium material (costs more).",
  },
];

export default materials;
