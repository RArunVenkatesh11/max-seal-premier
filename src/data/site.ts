// Structured mock data. Designed to map cleanly to a future CMS schema.

export type SeoMeta = {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
};

export type Cta = {
  label: string;
  href: string;
  variant?: "primary" | "ghost" | "brand";
};

export type ValveType =
  | "resilient-seated"
  | "high-performance"
  | "triple-offset"
  | "pfa-lined";

export type OperationType = "Manual lever" | "Gear operator" | "Pneumatic" | "Electric";

export type ProductFamily = {
  slug: string;
  name: string;
  shortName: string;
  valveType: ValveType;
  tagline: string;
  summary: string;
  pressureClass: string;
  pressureBuckets: ("150" | "300" | "600" | "900" | "1500" | "2500")[];
  temperatureRange: string;
  temperatureBuckets: ("cryogenic" | "low" | "ambient" | "elevated" | "high")[];
  sizeRange: string;
  sizeBuckets: ("under-4" | "4-to-12" | "14-to-36" | "over-36")[];
  sealMaterial: string[];
  bodyMaterial: string[];
  mediaTypes: string[];
  industries: string[];
  operationTypes: OperationType[];
  applications: string[];
  highlights: string[];
  considerations: string[];
  certifications: string[];
  downloads: { label: string; type: string; href: string }[];
  seo: SeoMeta;
};

export type Industry = {
  slug: string;
  name: string;
  lede: string;
  description: string;
  challenges: string[];
  valveNeeds: string[];
  technicalConsiderations: string[];
  recommendedFamilies: string[];
  applications: string[];
  seo: SeoMeta;
};

export type ResourceDoc = {
  title: string;
  category: "Catalog" | "Datasheet" | "Installation" | "Maintenance" | "Technical" | "Brochure";
  type: "PDF" | "DWG" | "STEP";
  size: string;
  href: string;
  productSlugs: string[];
  industrySlugs: string[];
  gated?: boolean;
};

export type Faq = { q: string; a: string };

export const SITE = {
  brand: "Max-Seal",
  tagline: "Engineered butterfly valves. Built for performance.",
  description:
    "US-based engineered butterfly valve manufacturer. One source for resilient seated, high performance, triple offset, and PFA lined valves.",
  phone: "+1 (000) 000-0000",
  email: "sales@max-seal.example",
  address: "Houston, Texas, USA",
  nav: [
    { label: "Products", href: "/products" },
    { label: "Industries", href: "/industries" },
    { label: "Engineering", href: "/engineering-advantage" },
    { label: "Resources", href: "/resources" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};

export const HOME: {
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    lede: string;
    primary: Cta;
    secondary: Cta;
  };
  pillars: { number: string; title: string; body: string }[];
  stats: { value: string; label: string }[];
  ctaBand: { title: string; body: string; cta: Cta };
} = {
  hero: {
    eyebrow: "Engineered Butterfly Valves / US Manufactured",
    title: "Not just ordinary butterfly valves.",
    titleAccent: "Built for performance.",
    lede:
      "Max-Seal is a US-based engineered valve partner. One source for resilient seated, high performance, triple offset, and PFA lined butterfly valves. Many solutions. Zero compromise.",
    primary: { label: "Request a Quote", href: "/request-a-quote", variant: "brand" },
    secondary: { label: "Explore Products", href: "/products", variant: "ghost" },
  },
  pillars: [
    {
      number: "01",
      title: "Engineered, not assembled",
      body: "Every valve is specified, tested, and supported by engineers who understand the service.",
    },
    {
      number: "02",
      title: "One source, many solutions",
      body: "Resilient seated, high performance, triple offset, and PFA lined valves under one program.",
    },
    {
      number: "03",
      title: "US-based support",
      body: "Application help, drawings, and quotes from a domestic team that answers the phone.",
    },
    {
      number: "04",
      title: "A stronger alternative",
      body: "Built to outlast generic low-cost imports without overspecifying what you do not need.",
    },
  ],
  stats: [
    { value: '1/2" to 96"', label: "Size range" },
    { value: "ANSI 150 to 2500", label: "Pressure class" },
    { value: "-320 to 1100°F", label: "Service temperature" },
    { value: "100%", label: "Tested before shipment" },
  ],
  ctaBand: {
    title: "Specify with confidence.",
    body: "Send line conditions, materials, and quantities. You will get a clear quote with the right valve, not the easiest one to ship.",
    cta: { label: "Request a Quote", href: "/request-a-quote", variant: "brand" },
  },
};

export const MEDIA_TYPES = [
  "Water",
  "Wastewater",
  "Steam",
  "Hydrocarbons",
  "Acids",
  "Caustics",
  "Chlorine",
  "LNG / Cryogenic",
  "Slurry",
  "Air and gas",
];

export const CERTIFICATIONS = [
  "API 609",
  "API 607",
  "ISO 5208",
  "ISO 15848",
  "AWWA C504",
  "NSF/ANSI 61",
  "PED 2014/68/EU",
];

export const MATERIALS = [
  "Ductile Iron",
  "Carbon Steel",
  "Stainless Steel",
  "Duplex",
  "Inconel",
  "Hastelloy",
  "Alloy 20",
  "PFA Lined",
];

export const PRODUCT_FAMILIES: ProductFamily[] = [
  {
    slug: "resilient-seated-butterfly-valves",
    name: "Resilient Seated Butterfly Valves",
    shortName: "Resilient Seated",
    valveType: "resilient-seated",
    tagline: "Bubble-tight shutoff for general service.",
    summary:
      "A workhorse design for water, wastewater, HVAC, and low-pressure utility service. Replaceable elastomer seat, ductile iron body, and a stem that stays concentric under load.",
    pressureClass: "150 psi / PN10 / PN16",
    pressureBuckets: ["150"],
    temperatureRange: "-20 to 250°F",
    temperatureBuckets: ["low", "ambient"],
    sizeRange: '2" to 48"',
    sizeBuckets: ["under-4", "4-to-12", "14-to-36", "over-36"],
    sealMaterial: ["EPDM", "Buna-N", "Viton"],
    bodyMaterial: ["Ductile Iron", "Carbon Steel", "Stainless Steel"],
    mediaTypes: ["Water", "Wastewater", "Air and gas"],
    industries: ["water-and-wastewater", "food-and-beverage", "mining"],
    operationTypes: ["Manual lever", "Gear operator", "Pneumatic", "Electric"],
    applications: ["Water and wastewater", "HVAC chilled water", "Fire protection", "General utilities"],
    highlights: [
      "Bubble-tight shutoff in both directions",
      "Replaceable bonded or cartridge seat options",
      "Lugged and wafer body styles",
      "ISO 5211 top flange for direct mount actuation",
    ],
    considerations: [
      "Not intended for steam or hydrocarbon service",
      "Elastomer selection drives temperature limit",
    ],
    certifications: ["AWWA C504", "NSF/ANSI 61", "API 609"],
    downloads: [
      { label: "Resilient Seated Catalog", type: "PDF", href: "#" },
      { label: "Engineering Datasheet", type: "PDF", href: "#" },
      { label: "2D General Arrangement", type: "DWG", href: "#" },
    ],
    seo: {
      title: "Resilient Seated Butterfly Valves | Max-Seal",
      description:
        'AWWA and NSF compliant resilient seated butterfly valves for water, wastewater, HVAC, and utility service. 2" to 48".',
    },
  },
  {
    slug: "high-performance-butterfly-valves",
    name: "High Performance Butterfly Valves",
    shortName: "High Performance",
    valveType: "high-performance",
    tagline: "Double offset performance for demanding process service.",
    summary:
      "A double offset disc and stem geometry that lifts the seat off the seal in the first few degrees of rotation. Lower torque, longer seat life, and tight shutoff at higher pressures.",
    pressureClass: "ANSI 150 / 300 / 600",
    pressureBuckets: ["150", "300", "600"],
    temperatureRange: "-50 to 750°F",
    temperatureBuckets: ["low", "ambient", "elevated"],
    sizeRange: '2" to 48"',
    sizeBuckets: ["under-4", "4-to-12", "14-to-36", "over-36"],
    sealMaterial: ["RTFE", "PEEK", "Fire-safe graphite"],
    bodyMaterial: ["Carbon Steel", "Stainless Steel", "Duplex", "Alloy 20"],
    mediaTypes: ["Steam", "Hydrocarbons", "Air and gas", "Water"],
    industries: ["oil-and-gas", "power", "chemical-processing", "food-and-beverage"],
    operationTypes: ["Manual lever", "Gear operator", "Pneumatic", "Electric"],
    applications: ["Process isolation", "Steam service", "Hydrocarbons", "Refinery utilities"],
    highlights: [
      "Double offset stem and disc",
      "Bidirectional bubble-tight shutoff",
      "Fire-safe per API 607 available",
      "Blowout-proof stem with anti-static device",
    ],
    considerations: [
      "Soft seat sets the upper temperature limit",
      "Specify fire-safe variant for hydrocarbon service",
    ],
    certifications: ["API 609", "API 607", "ISO 15848"],
    downloads: [
      { label: "High Performance Catalog", type: "PDF", href: "#" },
      { label: "Cv and Torque Tables", type: "PDF", href: "#" },
      { label: "3D STEP Model", type: "STEP", href: "#" },
    ],
    seo: {
      title: "High Performance Butterfly Valves | Max-Seal",
      description:
        "Double offset high performance butterfly valves for process, steam, and hydrocarbon service. ANSI 150 to 600.",
    },
  },
  {
    slug: "triple-offset-butterfly-valves",
    name: "Triple Offset Butterfly Valves",
    shortName: "Triple Offset",
    valveType: "triple-offset",
    tagline: "Metal-to-metal sealing where leakage is not an option.",
    summary:
      "Three independent offsets create a torque-seated, friction-free seal. Zero leakage shutoff, fire-safe by design, and engineered for severe service across temperature and pressure.",
    pressureClass: "ANSI 150 to 2500",
    pressureBuckets: ["150", "300", "600", "900", "1500", "2500"],
    temperatureRange: "-320 to 1100°F",
    temperatureBuckets: ["cryogenic", "low", "ambient", "elevated", "high"],
    sizeRange: '3" to 96"',
    sizeBuckets: ["4-to-12", "14-to-36", "over-36"],
    sealMaterial: ["Laminated stainless / graphite", "Solid metal"],
    bodyMaterial: ["Carbon Steel", "Stainless Steel", "Inconel", "Hastelloy"],
    mediaTypes: ["Steam", "Hydrocarbons", "LNG / Cryogenic", "Chlorine", "Air and gas"],
    industries: ["oil-and-gas", "power", "chemical-processing"],
    operationTypes: ["Gear operator", "Pneumatic", "Electric"],
    applications: ["LNG and cryogenic", "High temperature steam", "Critical isolation", "Refinery and petrochem"],
    highlights: [
      "Zero leakage to ISO 5208 Rate A",
      "Fire-safe per API 607 standard",
      "Cryogenic extended bonnet available",
      "In-line maintainable seat ring",
    ],
    considerations: [
      "Higher torque than soft seated equivalents",
      "Lead time longer for severe service trims",
    ],
    certifications: ["API 609", "API 607", "ISO 5208", "PED 2014/68/EU"],
    downloads: [
      { label: "Triple Offset Catalog", type: "PDF", href: "#" },
      { label: "Cryogenic Service Datasheet", type: "PDF", href: "#" },
      { label: "Installation Manual", type: "PDF", href: "#" },
    ],
    seo: {
      title: "Triple Offset Butterfly Valves | Max-Seal",
      description:
        "Zero leakage triple offset butterfly valves for cryogenic, high temperature, and critical isolation service.",
    },
  },
  {
    slug: "pfa-lined-butterfly-valves",
    name: "PFA Lined Butterfly Valves",
    shortName: "PFA Lined",
    valveType: "pfa-lined",
    tagline: "Corrosion resistance for aggressive chemical service.",
    summary:
      "A fully PFA lined body and disc isolate the process from any metallic wetted parts. Built for acids, caustics, and chlorinated chemistry where ordinary valves do not survive.",
    pressureClass: "ANSI 150",
    pressureBuckets: ["150"],
    temperatureRange: "-20 to 350°F",
    temperatureBuckets: ["low", "ambient", "elevated"],
    sizeRange: '1" to 24"',
    sizeBuckets: ["under-4", "4-to-12", "14-to-36"],
    sealMaterial: ["PFA"],
    bodyMaterial: ["PFA Lined"],
    mediaTypes: ["Acids", "Caustics", "Chlorine"],
    industries: ["chemical-processing"],
    operationTypes: ["Manual lever", "Gear operator", "Pneumatic", "Electric"],
    applications: ["Concentrated acids", "Caustic transfer", "Chlorine and bromine", "Pharma and fine chemical"],
    highlights: [
      "Zero metallic wetted parts",
      "Anti-permeation barrier on demand",
      "Bidirectional dead-end service rated",
      "Steam jacketed bodies available",
    ],
    considerations: [
      "Temperature limited by PFA properties",
      "Avoid mechanical shock to the lining",
    ],
    certifications: ["API 609", "ISO 5208"],
    downloads: [
      { label: "PFA Lined Catalog", type: "PDF", href: "#" },
      { label: "Chemical Compatibility Guide", type: "PDF", href: "#" },
    ],
    seo: {
      title: "PFA Lined Butterfly Valves | Max-Seal",
      description:
        'PFA lined butterfly valves for concentrated acids, caustics, and aggressive chemical service. 1" to 24".',
    },
  },
];

export const INDUSTRIES: Industry[] = [
  {
    slug: "water-and-wastewater",
    name: "Water and Wastewater",
    lede: "Municipal-grade isolation that meets AWWA and NSF without overspecifying.",
    description:
      "Treatment plants, lift stations, and distribution networks need valves that last decades with low maintenance. Max-Seal supplies resilient seated and high performance valves with the right coatings and the right paperwork.",
    challenges: [
      "Long service life under cyclic load",
      "Potable water certification",
      "Buried and submerged service",
    ],
    valveNeeds: [
      "AWWA C504 compliant body and disc",
      "NSF/ANSI 61 elastomer seat",
      "Manual gear or electric actuation",
    ],
    technicalConsiderations: [
      "Specify fusion bonded epoxy coating for buried service",
      "Match flange drilling to AWWA C207 Class D, E, or F",
      "Include position indicator for SCADA integration",
    ],
    recommendedFamilies: ["resilient-seated-butterfly-valves", "high-performance-butterfly-valves"],
    applications: ["Raw water intake", "Filter isolation", "Backwash", "Distribution headers"],
    seo: {
      title: "Butterfly Valves for Water and Wastewater | Max-Seal",
      description: "AWWA C504 and NSF/ANSI 61 butterfly valves for treatment and distribution.",
    },
  },
  {
    slug: "chemical-processing",
    name: "Chemical Processing",
    lede: "Lined and metal-seated valves that hold up to aggressive chemistry.",
    description:
      "Concentrated acids, caustics, and chlorinated streams demand the right body, lining, and stem packing. Max-Seal pairs PFA lined and triple offset valves with material recommendations grounded in service history.",
    challenges: ["Permeation and corrosion", "Fugitive emissions", "Dead-end isolation"],
    valveNeeds: [
      "PFA lined body for wetted isolation",
      "Live-loaded stem packing for low emissions",
      "Metal seat option for elevated temperature",
    ],
    technicalConsiderations: [
      "Confirm chemical compatibility for trace impurities",
      "Specify ISO 15848 packing for VOC service",
      "Use steam jacketed body where freeze risk exists",
    ],
    recommendedFamilies: ["pfa-lined-butterfly-valves", "triple-offset-butterfly-valves"],
    applications: ["Acid transfer", "Reactor isolation", "Caustic dosing", "Solvent handling"],
    seo: {
      title: "Butterfly Valves for Chemical Processing | Max-Seal",
      description: "PFA lined and triple offset butterfly valves for acids, caustics, and aggressive chemistry.",
    },
  },
  {
    slug: "oil-and-gas",
    name: "Oil and Gas",
    lede: "Fire-safe, fugitive-emission rated valves for upstream to downstream.",
    description:
      "From wellhead utilities to refinery process headers, Max-Seal supplies high performance and triple offset valves with the certifications operators require, including API 607 and ISO 15848.",
    challenges: ["Fire-safe shutoff", "Fugitive emissions", "Cryogenic and hot service"],
    valveNeeds: [
      "API 607 fire-safe seat construction",
      "Anti-static device on stem",
      "Cryogenic extended bonnet for LNG service",
    ],
    technicalConsiderations: [
      "Match body material to fluid corrosivity and CO2 partial pressure",
      "Specify ISO 15848 Class B for fugitive emission control",
      "Confirm SIL capability if used in safety loops",
    ],
    recommendedFamilies: ["high-performance-butterfly-valves", "triple-offset-butterfly-valves"],
    applications: ["Refinery isolation", "LNG", "Pipeline blowdown", "Tank farm"],
    seo: {
      title: "Butterfly Valves for Oil and Gas | Max-Seal",
      description: "API 607 fire-safe high performance and triple offset butterfly valves for oil and gas.",
    },
  },
  {
    slug: "power",
    name: "Power Generation",
    lede: "Steam-rated isolation that holds tight shift after shift.",
    description:
      "Combined cycle, biomass, and conventional plants run on isolation that does not fail. Max-Seal triple offset valves serve high temperature steam, feedwater, and balance of plant utilities.",
    challenges: ["High temperature steam", "Thermal cycling", "Long maintenance intervals"],
    valveNeeds: [
      "Metal seated triple offset for HP steam",
      "Forged body for thermal cycling",
      "Pneumatic actuation with fail-safe spring",
    ],
    technicalConsiderations: [
      "Account for differential thermal growth at supports",
      "Use graphite gasket on flange joints above 750°F",
      "Specify actuator with sized stroke time for trip events",
    ],
    recommendedFamilies: ["triple-offset-butterfly-valves", "high-performance-butterfly-valves"],
    applications: ["HP and IP steam", "Feedwater", "Cooling water", "Auxiliary steam"],
    seo: {
      title: "Butterfly Valves for Power Generation | Max-Seal",
      description: "Triple offset and high performance butterfly valves for steam and balance of plant service.",
    },
  },
  {
    slug: "food-and-beverage",
    name: "Food and Beverage",
    lede: "Hygienic isolation for utilities and clean process service.",
    description:
      "Sanitary plants need valves that can be cleaned in place, sealed with food grade elastomers, and traceable end to end. Max-Seal supplies resilient seated and high performance valves built to the right standards.",
    challenges: ["CIP and SIP cycles", "Food grade elastomers", "Traceability"],
    valveNeeds: [
      "FDA-compliant EPDM seat",
      "316 stainless body and disc",
      "Pneumatic actuator with position feedback",
    ],
    technicalConsiderations: [
      "Specify electropolished trim for product contact",
      "Provide material traceability per heat number",
      "Use clamp ends only where the line schedule allows",
    ],
    recommendedFamilies: ["resilient-seated-butterfly-valves", "high-performance-butterfly-valves"],
    applications: ["CIP supply", "Steam utilities", "Process water", "Sugar and syrup"],
    seo: {
      title: "Butterfly Valves for Food and Beverage | Max-Seal",
      description: "FDA-compliant elastomer butterfly valves for hygienic plants and utility service.",
    },
  },
  {
    slug: "mining",
    name: "Mining and Minerals",
    lede: "Abrasion-aware valve solutions for slurry and process water.",
    description:
      "Tailings, slurry, and process water lines punish valves. Max-Seal pairs resilient seated and high performance valves with hardened trims and elastomer selections that survive in the field.",
    challenges: ["Abrasive slurry", "Remote service", "Long lead resilience"],
    valveNeeds: [
      "Heavy duty resilient seat for slurry",
      "Hardened disc edge for erosion control",
      "Manual gear operator rated for remote sites",
    ],
    technicalConsiderations: [
      "Select elastomer based on solids size and concentration",
      "Plan for cyclic dewatering and freeze conditions",
      "Specify stem extension for buried installations",
    ],
    recommendedFamilies: ["resilient-seated-butterfly-valves", "high-performance-butterfly-valves"],
    applications: ["Slurry isolation", "Process water", "Reagent dosing", "Tailings"],
    seo: {
      title: "Butterfly Valves for Mining | Max-Seal",
      description: "Hardened butterfly valves for slurry, process water, and reagent service in mining.",
    },
  },
];

export const RESOURCES: ResourceDoc[] = [
  {
    title: "Max-Seal Master Catalog 2026",
    category: "Catalog",
    type: "PDF",
    size: "12 MB",
    href: "#",
    productSlugs: PRODUCT_FAMILIES.map((p) => p.slug),
    industrySlugs: INDUSTRIES.map((i) => i.slug),
  },
  {
    title: "Resilient Seated Engineering Datasheet",
    category: "Datasheet",
    type: "PDF",
    size: "1.4 MB",
    href: "#",
    productSlugs: ["resilient-seated-butterfly-valves"],
    industrySlugs: ["water-and-wastewater", "food-and-beverage", "mining"],
  },
  {
    title: "High Performance Cv and Torque Tables",
    category: "Datasheet",
    type: "PDF",
    size: "820 KB",
    href: "#",
    productSlugs: ["high-performance-butterfly-valves"],
    industrySlugs: ["oil-and-gas", "power", "chemical-processing"],
  },
  {
    title: "Triple Offset for Cryogenic Service",
    category: "Technical",
    type: "PDF",
    size: "2.1 MB",
    href: "#",
    productSlugs: ["triple-offset-butterfly-valves"],
    industrySlugs: ["oil-and-gas", "power"],
    gated: true,
  },
  {
    title: "PFA Lined Chemical Compatibility Guide",
    category: "Technical",
    type: "PDF",
    size: "1.9 MB",
    href: "#",
    productSlugs: ["pfa-lined-butterfly-valves"],
    industrySlugs: ["chemical-processing"],
  },
  {
    title: "Installation Guide, All Families",
    category: "Installation",
    type: "PDF",
    size: "3.2 MB",
    href: "#",
    productSlugs: PRODUCT_FAMILIES.map((p) => p.slug),
    industrySlugs: [],
  },
  {
    title: "Maintenance and Spare Parts Manual",
    category: "Maintenance",
    type: "PDF",
    size: "2.7 MB",
    href: "#",
    productSlugs: PRODUCT_FAMILIES.map((p) => p.slug),
    industrySlugs: [],
  },
  {
    title: "General Arrangement Drawings, Resilient Seated",
    category: "Technical",
    type: "DWG",
    size: "640 KB",
    href: "#",
    productSlugs: ["resilient-seated-butterfly-valves"],
    industrySlugs: ["water-and-wastewater"],
  },
  {
    title: "3D STEP Model Library, High Performance",
    category: "Technical",
    type: "STEP",
    size: "Varies",
    href: "#",
    productSlugs: ["high-performance-butterfly-valves"],
    industrySlugs: [],
  },
  {
    title: "Max-Seal Company Brochure",
    category: "Brochure",
    type: "PDF",
    size: "4.8 MB",
    href: "#",
    productSlugs: [],
    industrySlugs: [],
  },
];

export const FAQS: Faq[] = [
  {
    q: "How is Max-Seal different from low-cost import suppliers?",
    a: "Every valve ships with documented testing, traceable materials, and US-based application support. The price reflects what is inside the valve, not just what is on the outside.",
  },
  {
    q: "Do you support custom configurations?",
    a: "Yes. Body, trim, seat, packing, and actuation can be specified to your service. Send line conditions and we will build the right assembly.",
  },
  {
    q: "What lead times should we plan for?",
    a: "Stock sizes ship in days. Engineered configurations typically ship in four to eight weeks. Expedite programs are available.",
  },
  {
    q: "Can Max-Seal valves replace existing brands in place?",
    a: "Most face-to-face dimensions match industry standards. Send a tag list and we will confirm fit and recommend equivalents.",
  },
];

export const ENGINEERING_PILLARS = [
  {
    title: "Disc and stem geometry",
    body: "Concentric, double, and triple offset geometries selected for the duty, not the catalog page.",
  },
  {
    title: "Seat technology",
    body: "Bonded elastomer, cartridge, RTFE, PEEK, and laminated metal seats matched to pressure and temperature.",
  },
  {
    title: "Materials science",
    body: "From ductile iron to Hastelloy. We specify trims that resist the actual fluid, not a generic spec.",
  },
  {
    title: "Actuation and controls",
    body: "Manual, gear, pneumatic, and electric actuation sized to required torque with safety factor.",
  },
  {
    title: "Testing and traceability",
    body: "Hydrostatic, seat, and functional tests on every valve. Material certs and test reports on request.",
  },
  {
    title: "Application engineering",
    body: "Real engineers on the phone. Selection help before the PO, support after it ships.",
  },
];

// Selector wizard taxonomy.
export const SELECTOR = {
  industries: INDUSTRIES.map((i) => ({ value: i.slug, label: i.name })),
  media: MEDIA_TYPES,
  priorities: [
    { value: "zero-leak", label: "Zero leakage shutoff" },
    { value: "corrosion", label: "Corrosion resistance" },
    { value: "high-pressure", label: "High pressure or temperature" },
    { value: "low-cost", label: "Best value for general service" },
    { value: "low-emission", label: "Low fugitive emissions" },
  ],
  valveTypes: [
    { value: "any", label: "Open to recommendation" },
    { value: "resilient-seated", label: "Resilient seated" },
    { value: "high-performance", label: "High performance" },
    { value: "triple-offset", label: "Triple offset" },
    { value: "pfa-lined", label: "PFA lined" },
  ],
  operations: ["Manual lever", "Gear operator", "Pneumatic", "Electric"] as const,
  support: [
    { value: "yes", label: "Yes, ask an engineer to follow up" },
    { value: "no", label: "Not yet, I am still scoping" },
  ],
};
