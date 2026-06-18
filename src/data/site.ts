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

export type ValveType = string;

export type OperationType = "Manual lever" | "Gear operator" | "Pneumatic" | "Electric";

export type ProductCategory =
  | "resilient-seated"
  | "high-performance"
  | "triple-offset"
  | "cryogenic"
  | "awwa"
  | "automation";

export type ProductFamily = {
  slug: string;
  name: string;
  shortName: string;
  category: ProductCategory;
  valveType: ValveType;
  tagline: string;
  summary: string;
  bestSuitedFor: string;
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
  related?: string[];
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

export type ResourceCategory =
  | "Catalog"
  | "Datasheet"
  | "Installation"
  | "Maintenance"
  | "Technical"
  | "Brochure"
  | "Seat Guide"
  | "Actuator";

export type ResourceDoc = {
  title: string;
  category: ResourceCategory;
  type: "PDF" | "DWG" | "STEP";
  size: string;
  href: string;
  productSlugs: string[];
  industrySlugs: string[];
  gated?: boolean;
};

export type Faq = { q: string; a: string };

// =====================================================================
// SITE & NAVIGATION
// =====================================================================

export type MegaGroup = {
  title: string;
  items: { label: string; href: string; description?: string }[];
};

export type NavItem = {
  label: string;
  href: string;
  groups?: MegaGroup[];
};

export const SITE = {
  brand: "Max-Seal",
  tagline: "Engineered butterfly valves. Built for performance.",
  description:
    "US-based engineered butterfly valve manufacturer. One source for resilient seated, high performance, triple offset, cryogenic, and AWWA butterfly valves.",
  phone: "+1 (000) 000-0000",
  email: "sales@max-seal.example",
  address: "Houston, Texas, USA",
};

export const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    href: "/products",
    groups: [
      {
        title: "Start Here",
        items: [
          { label: "All Products", href: "/products", description: "Browse the full catalogue" },
          { label: "Product Selector", href: "/products/selector", description: "Six questions to the right valve" },
          { label: "Compare Product Families", href: "/products/compare", description: "Side by side comparison" },
          { label: "Product Downloads", href: "/products/downloads", description: "Catalogues and datasheets" },
        ],
      },
      {
        title: "Butterfly Valve Families",
        items: [
          { label: "Resilient Seated Butterfly Valves", href: "/products/resilient-seated-butterfly-valves" },
          { label: "ISO Series", href: "/products/iso-series" },
          { label: "Chem Flo Series", href: "/products/chem-flo-series" },
          { label: "Hi-Tek Series", href: "/products/hi-tek-series" },
          { label: "High Performance Series", href: "/products/high-performance-series" },
          { label: "Chem Tek Series", href: "/products/chem-tek-series" },
          { label: "Triple Offset Butterfly Valves", href: "/products/triple-offset-butterfly-valves" },
          { label: "Tri-Max Series", href: "/products/tri-max-series" },
          { label: "Z-Tek Series", href: "/products/z-tek-series" },
          { label: "Cryogenic Butterfly Valves", href: "/products/cryogenic-butterfly-valves" },
          { label: "AWWA Butterfly Valves", href: "/products/awwa-butterfly-valves" },
        ],
      },
      {
        title: "Automation and Operation",
        items: [
          { label: "Gear Ops", href: "/products/gear-ops" },
          { label: "Actuators", href: "/products/actuators" },
          { label: "Automation and Accessories", href: "/products/automation-accessories" },
        ],
      },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    groups: [
      {
        title: "Industries Served",
        items: [
          { label: "All Industries", href: "/industries" },
          { label: "Water and Wastewater", href: "/industries/water-and-wastewater" },
          { label: "Chemical Processing", href: "/industries/chemical-processing" },
          { label: "Oil and Gas", href: "/industries/oil-and-gas" },
          { label: "Power", href: "/industries/power" },
          { label: "Food and Beverage", href: "/industries/food-and-beverage" },
          { label: "Mining", href: "/industries/mining" },
        ],
      },
    ],
  },
  { label: "Engineering Advantage", href: "/engineering-advantage" },
  {
    label: "Resources",
    href: "/resources",
    groups: [
      {
        title: "Technical Library",
        items: [
          { label: "All Resources", href: "/resources" },
          { label: "Catalogs", href: "/resources/catalogs" },
          { label: "Technical Bulletins", href: "/resources/technical-bulletins" },
          { label: "Seat Selection Guides", href: "/resources/seat-selection-guides" },
          { label: "Installation and Maintenance", href: "/resources/installation-maintenance" },
          { label: "Actuator Selection", href: "/resources/actuator-selection" },
          { label: "Terms and Conditions", href: "/resources/terms" },
        ],
      },
    ],
  },
  {
    label: "About",
    href: "/about",
    groups: [
      {
        title: "Company",
        items: [
          { label: "Company", href: "/about" },
          { label: "Team", href: "/about/team" },
          { label: "End Users", href: "/about/end-users" },
          { label: "Global Partners", href: "/about/global-partners" },
        ],
      },
    ],
  },
  { label: "Ask The Experts", href: "/ask-the-experts" },
  { label: "Contact", href: "/contact" },
];

// =====================================================================
// HOME
// =====================================================================

export const HOME_STATS: { value: string; label: string }[] = [
  { value: '1/2" to 96"', label: "Size range" },
  { value: "ANSI 150 to 2500", label: "Pressure class" },
  { value: "-320 to 1100°F", label: "Service temperature" },
  { value: "100%", label: "Tested before shipment" },
];

export const HOME = {
  hero: {
    eyebrow: "Engineered Butterfly Valves / US Based",
    title: "Built for performance",
    titleAccent: "when ordinary valves are not enough.",
    lede:
      "Max-Seal designs and supplies engineered butterfly valve solutions for demanding industrial applications, with the product range, technical support, and quality focus to help teams specify with confidence.",
    trustLine: "US-based support. Engineered product range. Many solutions. Zero compromise.",
    ctas: [
      { label: "Explore Solutions", href: "/products", variant: "primary" as const },
      { label: "Use Product Selector", href: "/products/selector", variant: "ghost" as const },
      { label: "Request a Quote", href: "/request-a-quote", variant: "brand" as const },
    ],
  },
  story: {
    eyebrow: "Why Max-Seal",
    title: "A stronger alternative to generic low-cost valve suppliers.",
    body:
      "When valve selection affects uptime, safety, and service life, teams need more than a catalogue. Max-Seal brings engineered product knowledge, application support, and a focused butterfly valve range built for real operating conditions.",
    proofPoints: [
      { title: "Engineered valve selection support", body: "Specify against the service, not the shelf." },
      { title: "Broad butterfly valve range", body: "Resilient seated through triple offset and cryogenic." },
      { title: "US-based support and distributor reach", body: "Domestic team, sales offices in the Americas." },
    ],
  },
  pathways: {
    eyebrow: "Find your starting point",
    title: "Start with the way you specify.",
    cards: [
      {
        title: "By performance need",
        body: "Pressure, temperature, media, and shutoff class guide the valve.",
        cta: "Open Product Selector",
        href: "/products/selector",
      },
      {
        title: "By application",
        body: "Match the valve to the line conditions and operating profile.",
        cta: "Browse Products",
        href: "/products",
      },
      {
        title: "By industry",
        body: "See how Max-Seal valves are specified across sectors.",
        cta: "View Industries",
        href: "/industries",
      },
      {
        title: "By valve family",
        body: "Compare resilient seated, high performance, triple offset, and more.",
        cta: "Compare Families",
        href: "/products/compare",
      },
    ],
  },
  curatedRanges: {
    eyebrow: "Product range",
    title: "Engineered platforms, curated for your service.",
    items: [
      {
        title: "Resilient seated solutions",
        body: "Bubble-tight shutoff for water, wastewater, HVAC, and general utility service.",
        href: "/products/resilient-seated-butterfly-valves",
      },
      {
        title: "High performance and severe service",
        body: "Double and triple offset valves for process, steam, and critical isolation.",
        href: "/products/high-performance-series",
      },
      {
        title: "Lined and chemical service",
        body: "PFA and elastomer lined valves engineered for aggressive chemistry.",
        href: "/products/chem-flo-series",
      },
      {
        title: "Automation and operation",
        body: "Gear operators, pneumatic and electric actuators, and accessories.",
        href: "/products/automation-accessories",
      },
    ],
  },
  company: {
    eyebrow: "Company",
    title: "Built on valve experience. Backed by reach.",
    timeline: [
      { year: "2008", label: "Established", body: "Max-Seal founded as an engineered butterfly valve supplier." },
      { year: "40+ yrs", label: "Leadership", body: "Led by President Martin Gibbons, with deep valve industry experience." },
      { year: "US", label: "Main facilities", body: "Lumberton, North Carolina and Houston, Texas." },
      { year: "Americas", label: "Sales offices", body: "Argentina, Chile, and Mexico, with distributors across the US." },
    ],
  },
  industries: {
    eyebrow: "Where we are specified",
    title: "Specified across demanding operating environments.",
    items: [
      {
        slug: "water-and-wastewater",
        name: "Water and wastewater",
        challenge: "Long service life in buried and treatment plant service.",
        need: "AWWA C504 valves with NSF/ANSI 61 certified seats.",
      },
      {
        slug: "chemical-processing",
        name: "Chemical processing",
        challenge: "Aggressive media that destroys generic elastomer seats.",
        need: "PFA lined and high performance valves matched to chemistry.",
      },
      {
        slug: "oil-and-gas",
        name: "Oil and gas",
        challenge: "Tight shutoff at higher pressure and temperature.",
        need: "High performance and triple offset valves with fire safe build.",
      },
      {
        slug: "power",
        name: "Power",
        challenge: "Steam, condensate, and cooling water service.",
        need: "Metal seated and high performance valves rated for cycling.",
      },
      {
        slug: "food-and-beverage",
        name: "Food and beverage",
        challenge: "Clean utility lines with reliable isolation.",
        need: "Resilient seated valves with appropriate elastomer selection.",
      },
      {
        slug: "mining",
        name: "Mining",
        challenge: "Slurry, abrasion, and heavy duty cycling.",
        need: "Heavy wall resilient seated and lined valves for slurry service.",
      },
    ],
  },
  process: {
    eyebrow: "Engineering confidence",
    title: "Specification is the product.",
    body:
      "The valve is only one part of the decision. Materials, seat selection, pressure, temperature, media, operation, and service conditions all matter. Max-Seal helps teams move from requirement to the right solution.",
    steps: [
      { number: "01", title: "Understand the application", body: "Line conditions, media, and operating profile." },
      { number: "02", title: "Match the valve family", body: "Resilient seated, high performance, triple offset, lined." },
      { number: "03", title: "Review technical needs", body: "Materials, seat, certifications, and operation." },
      { number: "04", title: "Support quote and supply", body: "Clear quote with the right valve, ready to ship." },
    ],
  },
  finalCta: {
    title: "Need the right valve for a demanding application?",
    body: "Talk to a Max-Seal engineer or send your line conditions for a clear quote.",
  },
};

// =====================================================================
// SHARED LISTS
// =====================================================================

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

// =====================================================================
// PRODUCT FAMILIES
// =====================================================================

export const PRODUCT_GROUPS: {
  title: string;
  slug: string;
  description: string;
  slugs: string[];
}[] = [
  {
    title: "Butterfly Valve Families",
    slug: "butterfly-valve-families",
    description: "Resilient seated and general service workhorses.",
    slugs: ["resilient-seated-butterfly-valves", "iso-series", "awwa-butterfly-valves"],
  },
  {
    title: "High Performance and Severe Service",
    slug: "high-performance-and-severe-service",
    description: "Double and triple offset for process, steam, and critical isolation.",
    slugs: [
      "high-performance-series",
      "hi-tek-series",
      "triple-offset-butterfly-valves",
      "tri-max-series",
      "z-tek-series",
      "cryogenic-butterfly-valves",
    ],
  },
  {
    title: "Lined and Chemical Service",
    slug: "lined-and-chemical-service",
    description: "PFA and elastomer lined valves for aggressive chemistry.",
    slugs: ["chem-flo-series", "chem-tek-series"],
  },
  {
    title: "Automation and Operation",
    slug: "automation-and-operation",
    description: "Gear operators, pneumatic and electric actuators, accessories.",
    slugs: ["gear-ops", "actuators", "automation-accessories"],
  },
];

export const PRODUCT_FAMILIES: ProductFamily[] = [
  {
    slug: "resilient-seated-butterfly-valves",
    name: "Resilient Seated Butterfly Valves",
    shortName: "Resilient Seated",
    category: "resilient-seated",
    valveType: "resilient-seated",
    tagline: "Bubble-tight shutoff for general service.",
    summary:
      "A workhorse design for water, wastewater, HVAC, and low-pressure utility service. Replaceable elastomer seat, ductile iron body, and a stem that stays concentric under load.",
    bestSuitedFor: "Water, wastewater, HVAC, low-pressure utility lines.",
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
    considerations: ["Not intended for steam or hydrocarbon service", "Elastomer selection drives temperature limit"],
    certifications: ["AWWA C504", "NSF/ANSI 61", "API 609"],
    downloads: [
      { label: "Resilient Seated Catalog", type: "PDF", href: "#" },
      { label: "Engineering Datasheet", type: "PDF", href: "#" },
      { label: "2D General Arrangement", type: "DWG", href: "#" },
    ],
    related: ["iso-series", "awwa-butterfly-valves", "chem-flo-series"],
    seo: {
      title: "Resilient Seated Butterfly Valves | Max-Seal",
      description:
        'AWWA and NSF compliant resilient seated butterfly valves for water, wastewater, HVAC, and utility service. 2" to 48".',
    },
  },
  {
    slug: "iso-series",
    name: "ISO Series Butterfly Valves",
    shortName: "ISO Series",
    category: "resilient-seated",
    valveType: "resilient-seated",
    tagline: "Resilient seated valve built to ISO face-to-face and top-flange dimensions.",
    summary:
      "An ISO 5752 compliant resilient seated butterfly valve with ISO 5211 mounting. Drop-in compatibility with European actuator platforms and a clean stem-to-disc connection.",
    bestSuitedFor: "Plants standardised on ISO mounting and metric flange drilling.",
    pressureClass: "PN10 / PN16",
    pressureBuckets: ["150"],
    temperatureRange: "-20 to 250°F",
    temperatureBuckets: ["low", "ambient"],
    sizeRange: 'DN50 to DN600',
    sizeBuckets: ["under-4", "4-to-12", "14-to-36"],
    sealMaterial: ["EPDM", "Buna-N", "Viton"],
    bodyMaterial: ["Ductile Iron", "Stainless Steel"],
    mediaTypes: ["Water", "Wastewater", "Air and gas"],
    industries: ["water-and-wastewater", "food-and-beverage"],
    operationTypes: ["Manual lever", "Gear operator", "Pneumatic", "Electric"],
    applications: ["Plant utilities", "Water treatment", "HVAC", "OEM packages"],
    highlights: [
      "ISO 5752 face-to-face",
      "ISO 5211 direct mount",
      "Lug, wafer, and U-section bodies",
      "Stem-to-disc double D connection",
    ],
    considerations: ["Soft seat sets temperature limit", "Specify metric flange drilling at order"],
    certifications: ["API 609", "ISO 5208"],
    downloads: [{ label: "ISO Series Datasheet", type: "PDF", href: "#" }],
    related: ["resilient-seated-butterfly-valves", "awwa-butterfly-valves"],
    seo: {
      title: "ISO Series Butterfly Valves | Max-Seal",
      description: "ISO 5752 resilient seated butterfly valves with ISO 5211 mounting for OEM and plant utility service.",
    },
  },
  {
    slug: "awwa-butterfly-valves",
    name: "AWWA Butterfly Valves",
    shortName: "AWWA",
    category: "awwa",
    valveType: "awwa",
    tagline: "AWWA C504 compliant valves for municipal and waterworks service.",
    summary:
      "Heavy duty resilient seated butterfly valves built to AWWA C504. Fusion bonded epoxy coatings, buried service options, and NSF/ANSI 61 potable certification.",
    bestSuitedFor: "Treatment plants, raw water intake, distribution headers, buried service.",
    pressureClass: "AWWA Class 150B / 250B",
    pressureBuckets: ["150", "300"],
    temperatureRange: "-20 to 180°F",
    temperatureBuckets: ["low", "ambient"],
    sizeRange: '3" to 96"',
    sizeBuckets: ["4-to-12", "14-to-36", "over-36"],
    sealMaterial: ["EPDM", "Buna-N"],
    bodyMaterial: ["Ductile Iron", "Carbon Steel"],
    mediaTypes: ["Water", "Wastewater"],
    industries: ["water-and-wastewater"],
    operationTypes: ["Gear operator", "Electric"],
    applications: ["Raw water intake", "Filter isolation", "Buried service", "Distribution"],
    highlights: [
      "AWWA C504 short and long body",
      "Fusion bonded epoxy interior and exterior",
      "Stainless steel stem and bushings",
      "NSF/ANSI 61 certified seats",
    ],
    considerations: ["Specify buried service kit for direct burial", "Match flange drilling to AWWA C207"],
    certifications: ["AWWA C504", "NSF/ANSI 61"],
    downloads: [{ label: "AWWA Series Catalog", type: "PDF", href: "#" }],
    related: ["resilient-seated-butterfly-valves", "iso-series"],
    seo: {
      title: "AWWA Butterfly Valves | Max-Seal",
      description: 'AWWA C504 butterfly valves with NSF/ANSI 61 certified seats for municipal water. 3" to 96".',
    },
  },
  {
    slug: "high-performance-series",
    name: "High Performance Series",
    shortName: "High Performance",
    category: "high-performance",
    valveType: "high-performance",
    tagline: "Double offset performance for demanding process service.",
    summary:
      "A double offset disc and stem geometry that lifts the seat off the seal in the first few degrees of rotation. Lower torque, longer seat life, and tight shutoff at higher pressures.",
    bestSuitedFor: "Process isolation, steam service, hydrocarbons, refinery utilities.",
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
    considerations: ["Soft seat sets the upper temperature limit", "Specify fire-safe variant for hydrocarbon service"],
    certifications: ["API 609", "API 607", "ISO 15848"],
    downloads: [
      { label: "High Performance Catalog", type: "PDF", href: "#" },
      { label: "Cv and Torque Tables", type: "PDF", href: "#" },
      { label: "3D STEP Model", type: "STEP", href: "#" },
    ],
    related: ["hi-tek-series", "triple-offset-butterfly-valves", "tri-max-series"],
    seo: {
      title: "High Performance Series Butterfly Valves | Max-Seal",
      description: "Double offset high performance butterfly valves for process, steam, and hydrocarbon service. ANSI 150 to 600.",
    },
  },
  {
    slug: "hi-tek-series",
    name: "Hi-Tek Series",
    shortName: "Hi-Tek",
    category: "high-performance",
    valveType: "high-performance",
    tagline: "Premium double offset trim for severe duty cycles.",
    summary:
      "Hi-Tek upgrades the High Performance platform with reinforced trim, enhanced packing, and tightened tolerances for heavy duty cycle and elevated emission control requirements.",
    bestSuitedFor: "High cycle process isolation and emission controlled service.",
    pressureClass: "ANSI 150 / 300 / 600",
    pressureBuckets: ["150", "300", "600"],
    temperatureRange: "-50 to 800°F",
    temperatureBuckets: ["low", "ambient", "elevated"],
    sizeRange: '2" to 36"',
    sizeBuckets: ["under-4", "4-to-12", "14-to-36"],
    sealMaterial: ["RTFE", "PEEK", "Fire-safe graphite"],
    bodyMaterial: ["Carbon Steel", "Stainless Steel", "Duplex"],
    mediaTypes: ["Hydrocarbons", "Steam", "Air and gas"],
    industries: ["oil-and-gas", "chemical-processing", "power"],
    operationTypes: ["Gear operator", "Pneumatic", "Electric"],
    applications: ["High cycle isolation", "Fugitive emission service", "Refinery process"],
    highlights: [
      "ISO 15848 Class B packing as standard",
      "Hardfaced disc edge",
      "Live-loaded stem packing",
      "Fire-safe API 607",
    ],
    considerations: ["Specify packing class at order"],
    certifications: ["API 609", "API 607", "ISO 15848"],
    downloads: [{ label: "Hi-Tek Series Datasheet", type: "PDF", href: "#" }],
    related: ["high-performance-series", "tri-max-series"],
    seo: {
      title: "Hi-Tek Series Butterfly Valves | Max-Seal",
      description: "Premium double offset butterfly valves with ISO 15848 packing for high cycle process service.",
    },
  },
  {
    slug: "triple-offset-butterfly-valves",
    name: "Triple Offset Butterfly Valves",
    shortName: "Triple Offset",
    category: "triple-offset",
    valveType: "triple-offset",
    tagline: "Metal-to-metal sealing where leakage is not an option.",
    summary:
      "Three independent offsets create a torque-seated, friction-free seal. Zero leakage shutoff, fire-safe by design, and engineered for severe service across temperature and pressure.",
    bestSuitedFor: "LNG, high temperature steam, critical isolation, refinery and petrochem.",
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
    considerations: ["Higher torque than soft seated equivalents", "Lead time longer for severe service trims"],
    certifications: ["API 609", "API 607", "ISO 5208", "PED 2014/68/EU"],
    downloads: [
      { label: "Triple Offset Catalog", type: "PDF", href: "#" },
      { label: "Cryogenic Service Datasheet", type: "PDF", href: "#" },
      { label: "Installation Manual", type: "PDF", href: "#" },
    ],
    related: ["tri-max-series", "z-tek-series", "cryogenic-butterfly-valves"],
    seo: {
      title: "Triple Offset Butterfly Valves | Max-Seal",
      description: "Zero leakage triple offset butterfly valves for cryogenic, high temperature, and critical isolation service.",
    },
  },
  {
    slug: "tri-max-series",
    name: "Tri-Max Series",
    shortName: "Tri-Max",
    category: "triple-offset",
    valveType: "triple-offset",
    tagline: "Flagship triple offset for the most demanding severe service.",
    summary:
      "Tri-Max combines a forged body, laminated metal seat, and torque-seated geometry for zero leakage performance in HP steam, LNG, and critical hydrocarbon isolation.",
    bestSuitedFor: "Severe service hydrocarbon, HP steam, and LNG isolation.",
    pressureClass: "ANSI 150 to 2500",
    pressureBuckets: ["150", "300", "600", "900", "1500", "2500"],
    temperatureRange: "-320 to 1100°F",
    temperatureBuckets: ["cryogenic", "low", "ambient", "elevated", "high"],
    sizeRange: '3" to 60"',
    sizeBuckets: ["4-to-12", "14-to-36", "over-36"],
    sealMaterial: ["Laminated stainless / graphite", "Solid Inconel"],
    bodyMaterial: ["Forged Carbon Steel", "Forged Stainless Steel", "Inconel"],
    mediaTypes: ["Hydrocarbons", "Steam", "LNG / Cryogenic"],
    industries: ["oil-and-gas", "power"],
    operationTypes: ["Pneumatic", "Electric"],
    applications: ["HP steam isolation", "LNG receiving", "Cryogenic transfer", "Critical process"],
    highlights: [
      "Forged body construction",
      "Class VI / Rate A shutoff",
      "Fire-safe API 607",
      "SIL capable trim",
    ],
    considerations: ["Engineered lead times typically eight to twelve weeks"],
    certifications: ["API 609", "API 607", "ISO 5208", "ISO 15848"],
    downloads: [{ label: "Tri-Max Datasheet", type: "PDF", href: "#" }],
    related: ["triple-offset-butterfly-valves", "z-tek-series", "cryogenic-butterfly-valves"],
    seo: {
      title: "Tri-Max Series Triple Offset Butterfly Valves | Max-Seal",
      description: "Forged body triple offset butterfly valves for HP steam, LNG, and critical hydrocarbon service.",
    },
  },
  {
    slug: "z-tek-series",
    name: "Z-Tek Series",
    shortName: "Z-Tek",
    category: "triple-offset",
    valveType: "triple-offset",
    tagline: "Compact triple offset for general severe service.",
    summary:
      "Z-Tek is a wafer and lugged triple offset for plants that need zero leakage isolation in a shorter face-to-face. Ideal for retrofit and where weight and envelope matter.",
    bestSuitedFor: "Retrofit zero leakage isolation, plant process headers.",
    pressureClass: "ANSI 150 / 300 / 600",
    pressureBuckets: ["150", "300", "600"],
    temperatureRange: "-50 to 1000°F",
    temperatureBuckets: ["low", "ambient", "elevated", "high"],
    sizeRange: '3" to 36"',
    sizeBuckets: ["4-to-12", "14-to-36"],
    sealMaterial: ["Laminated stainless / graphite"],
    bodyMaterial: ["Carbon Steel", "Stainless Steel"],
    mediaTypes: ["Steam", "Hydrocarbons", "Air and gas"],
    industries: ["chemical-processing", "power", "oil-and-gas"],
    operationTypes: ["Gear operator", "Pneumatic", "Electric"],
    applications: ["Process isolation", "Steam headers", "Plant retrofit"],
    highlights: [
      "Short face-to-face wafer and lug",
      "Zero leakage shutoff",
      "Fire-safe API 607",
      "Top entry seat ring access",
    ],
    considerations: ["For full bore service select Tri-Max"],
    certifications: ["API 609", "API 607", "ISO 5208"],
    downloads: [{ label: "Z-Tek Datasheet", type: "PDF", href: "#" }],
    related: ["triple-offset-butterfly-valves", "tri-max-series"],
    seo: {
      title: "Z-Tek Series Triple Offset Butterfly Valves | Max-Seal",
      description: "Compact wafer and lug triple offset butterfly valves for zero leakage process isolation.",
    },
  },
  {
    slug: "cryogenic-butterfly-valves",
    name: "Cryogenic Butterfly Valves",
    shortName: "Cryogenic",
    category: "cryogenic",
    valveType: "cryogenic",
    tagline: "Extended bonnet shutoff for LNG and industrial gas service.",
    summary:
      "Triple offset construction with cryogenic extended bonnets, tested to BS 6364. Built for LNG receiving, air separation, and industrial gas plants.",
    bestSuitedFor: "LNG, LIN, LOX, LAR, ethylene, and industrial gas service.",
    pressureClass: "ANSI 150 / 300 / 600",
    pressureBuckets: ["150", "300", "600"],
    temperatureRange: "-320 to 200°F",
    temperatureBuckets: ["cryogenic", "low", "ambient"],
    sizeRange: '3" to 48"',
    sizeBuckets: ["4-to-12", "14-to-36", "over-36"],
    sealMaterial: ["Laminated stainless / graphite"],
    bodyMaterial: ["Stainless Steel", "Low Temp Carbon Steel"],
    mediaTypes: ["LNG / Cryogenic", "Air and gas"],
    industries: ["oil-and-gas", "chemical-processing"],
    operationTypes: ["Gear operator", "Pneumatic", "Electric"],
    applications: ["LNG receiving", "Air separation", "Ethylene", "Industrial gas"],
    highlights: [
      "BS 6364 cryogenic tested",
      "Extended bonnet length per service",
      "Anti-static device",
      "Fire-safe API 607",
    ],
    considerations: ["Specify bonnet length for installation orientation"],
    certifications: ["API 609", "API 607", "ISO 5208"],
    downloads: [{ label: "Cryogenic Service Datasheet", type: "PDF", href: "#" }],
    related: ["triple-offset-butterfly-valves", "tri-max-series"],
    seo: {
      title: "Cryogenic Butterfly Valves | Max-Seal",
      description: "Extended bonnet triple offset cryogenic butterfly valves for LNG, air separation, and industrial gas.",
    },
  },
  {
    slug: "chem-flo-series",
    name: "Chem Flo Series",
    shortName: "Chem Flo",
    category: "high-performance",
    valveType: "pfa-lined",
    tagline: "PFA lined butterfly valves for aggressive chemical service.",
    summary:
      "A fully PFA lined body and disc isolate the process from any metallic wetted parts. Built for acids, caustics, and chlorinated chemistry where ordinary valves do not survive.",
    bestSuitedFor: "Concentrated acids, caustics, and chlorinated chemistry.",
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
    considerations: ["Temperature limited by PFA properties", "Avoid mechanical shock to the lining"],
    certifications: ["API 609", "ISO 5208"],
    downloads: [
      { label: "Chem Flo Catalog", type: "PDF", href: "#" },
      { label: "Chemical Compatibility Guide", type: "PDF", href: "#" },
    ],
    related: ["chem-tek-series"],
    seo: {
      title: "Chem Flo Series PFA Lined Butterfly Valves | Max-Seal",
      description: 'PFA lined butterfly valves for concentrated acids, caustics, and aggressive chemical service. 1" to 24".',
    },
  },
  {
    slug: "chem-tek-series",
    name: "Chem Tek Series",
    shortName: "Chem Tek",
    category: "high-performance",
    valveType: "pfa-lined",
    tagline: "PFA lined valves with reinforced trim for severe chemical duty.",
    summary:
      "Chem Tek builds on the Chem Flo platform with thicker linings, stainless reinforced stems, and steam jacketed body options for severe chemical service.",
    bestSuitedFor: "Severe chemical service, dead-end isolation, steam jacketed lines.",
    pressureClass: "ANSI 150",
    pressureBuckets: ["150"],
    temperatureRange: "-20 to 400°F",
    temperatureBuckets: ["low", "ambient", "elevated"],
    sizeRange: '1" to 16"',
    sizeBuckets: ["under-4", "4-to-12", "14-to-36"],
    sealMaterial: ["PFA"],
    bodyMaterial: ["PFA Lined"],
    mediaTypes: ["Acids", "Caustics", "Chlorine"],
    industries: ["chemical-processing"],
    operationTypes: ["Gear operator", "Pneumatic", "Electric"],
    applications: ["Severe acid service", "Steam jacketed lines", "Dead-end isolation"],
    highlights: [
      "Thicker PFA liner for permeation control",
      "Stainless reinforced stem",
      "Steam jacket option",
      "Anti-static device",
    ],
    considerations: ["Confirm jacket inlet and outlet orientation"],
    certifications: ["API 609", "ISO 5208"],
    downloads: [{ label: "Chem Tek Datasheet", type: "PDF", href: "#" }],
    related: ["chem-flo-series"],
    seo: {
      title: "Chem Tek Series PFA Lined Butterfly Valves | Max-Seal",
      description: "Reinforced PFA lined butterfly valves for severe acid and caustic service.",
    },
  },
  {
    slug: "gear-ops",
    name: "Gear Operators",
    shortName: "Gear Ops",
    category: "automation",
    valveType: "automation",
    tagline: "Worm gear operators sized for every Max-Seal valve.",
    summary:
      "Self-locking worm gear operators with adjustable open and close stops, weatherproof housing, and ISO 5211 mounting. Manual override with rising handwheel.",
    bestSuitedFor: "Manual operation of larger or high-torque valves.",
    pressureClass: "n/a",
    pressureBuckets: [],
    temperatureRange: "Ambient",
    temperatureBuckets: ["ambient"],
    sizeRange: 'Sized to valve',
    sizeBuckets: [],
    sealMaterial: [],
    bodyMaterial: ["Ductile Iron"],
    mediaTypes: [],
    industries: ["water-and-wastewater", "oil-and-gas", "power", "chemical-processing", "food-and-beverage", "mining"],
    operationTypes: ["Gear operator"],
    applications: ["Manual valve operation", "Stem extension for buried service"],
    highlights: [
      "Adjustable open and close stops",
      "Weatherproof IP67 housing",
      "Self-locking worm gear",
      "ISO 5211 mounting",
    ],
    considerations: ["Confirm valve torque before sizing"],
    certifications: [],
    downloads: [{ label: "Gear Operator Sizing Guide", type: "PDF", href: "#" }],
    related: ["actuators", "automation-accessories"],
    seo: {
      title: "Gear Operators for Butterfly Valves | Max-Seal",
      description: "Self-locking worm gear operators with weatherproof housing for Max-Seal butterfly valves.",
    },
  },
  {
    slug: "actuators",
    name: "Pneumatic and Electric Actuators",
    shortName: "Actuators",
    category: "automation",
    valveType: "automation",
    tagline: "Pneumatic and electric actuation packages, sized and tested.",
    summary:
      "Rack and pinion or scotch yoke pneumatic actuators and quarter turn electric actuators, sized to the valve and tested as an assembly before shipment.",
    bestSuitedFor: "On-off and modulating control of any Max-Seal valve.",
    pressureClass: "n/a",
    pressureBuckets: [],
    temperatureRange: "-40 to 175°F",
    temperatureBuckets: ["low", "ambient", "elevated"],
    sizeRange: 'Sized to valve',
    sizeBuckets: [],
    sealMaterial: [],
    bodyMaterial: ["Aluminum", "Stainless Steel"],
    mediaTypes: [],
    industries: ["water-and-wastewater", "oil-and-gas", "power", "chemical-processing", "food-and-beverage"],
    operationTypes: ["Pneumatic", "Electric"],
    applications: ["On-off control", "Modulating control", "Fail-safe spring return"],
    highlights: [
      "Double acting and spring return",
      "ATEX and explosion proof options",
      "Modulating positioner ready",
      "Fully tested with the valve",
    ],
    considerations: ["Specify supply pressure and fail position"],
    certifications: [],
    downloads: [{ label: "Actuator Selection Guide", type: "PDF", href: "#" }],
    related: ["gear-ops", "automation-accessories"],
    seo: {
      title: "Pneumatic and Electric Actuators | Max-Seal",
      description: "Sized and tested pneumatic and electric actuation packages for Max-Seal butterfly valves.",
    },
  },
  {
    slug: "automation-accessories",
    name: "Automation and Accessories",
    shortName: "Automation & Accessories",
    category: "automation",
    valveType: "automation",
    tagline: "Solenoids, limit switches, positioners, and air sets.",
    summary:
      "A complete accessory program: solenoid valves, limit switch boxes, smart positioners, filter regulators, and quick exhaust valves. Mounted and tested.",
    bestSuitedFor: "Completing the automated valve assembly.",
    pressureClass: "n/a",
    pressureBuckets: [],
    temperatureRange: "-40 to 175°F",
    temperatureBuckets: ["low", "ambient", "elevated"],
    sizeRange: 'n/a',
    sizeBuckets: [],
    sealMaterial: [],
    bodyMaterial: [],
    mediaTypes: [],
    industries: ["oil-and-gas", "chemical-processing", "power", "water-and-wastewater"],
    operationTypes: ["Pneumatic", "Electric"],
    applications: ["Position feedback", "Modulating control", "Safety shutdown"],
    highlights: [
      "NAMUR mounted solenoids",
      "Smart positioners HART and Fieldbus",
      "ATEX limit switch boxes",
      "Air preparation sets",
    ],
    considerations: ["Specify hazardous area certification"],
    certifications: [],
    downloads: [{ label: "Accessories Catalog", type: "PDF", href: "#" }],
    related: ["actuators", "gear-ops"],
    seo: {
      title: "Automation Accessories for Butterfly Valves | Max-Seal",
      description: "Solenoids, limit switches, positioners, and air sets for Max-Seal automated valve assemblies.",
    },
  },
];

// =====================================================================
// INDUSTRIES
// =====================================================================

export const INDUSTRIES: Industry[] = [
  {
    slug: "water-and-wastewater",
    name: "Water and Wastewater",
    lede: "Municipal-grade isolation that meets AWWA and NSF without overspecifying.",
    description:
      "Treatment plants, lift stations, and distribution networks need valves that last decades with low maintenance. Max-Seal supplies resilient seated and high performance valves with the right coatings and the right paperwork.",
    challenges: ["Long service life under cyclic load", "Potable water certification", "Buried and submerged service"],
    valveNeeds: ["AWWA C504 compliant body and disc", "NSF/ANSI 61 elastomer seat", "Manual gear or electric actuation"],
    technicalConsiderations: [
      "Specify fusion bonded epoxy coating for buried service",
      "Match flange drilling to AWWA C207 Class D, E, or F",
      "Include position indicator for SCADA integration",
    ],
    recommendedFamilies: ["awwa-butterfly-valves", "resilient-seated-butterfly-valves", "high-performance-series"],
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
    recommendedFamilies: ["chem-flo-series", "chem-tek-series", "triple-offset-butterfly-valves", "z-tek-series"],
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
    recommendedFamilies: ["high-performance-series", "hi-tek-series", "tri-max-series", "cryogenic-butterfly-valves"],
    applications: ["Refinery isolation", "LNG", "Pipeline blowdown", "Tank farm"],
    seo: {
      title: "Butterfly Valves for Oil and Gas | Max-Seal",
      description: "API 607 fire-safe high performance and triple offset butterfly valves for oil and gas.",
    },
  },
  {
    slug: "power",
    name: "Power",
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
    recommendedFamilies: ["tri-max-series", "triple-offset-butterfly-valves", "high-performance-series"],
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
    valveNeeds: ["FDA-compliant EPDM seat", "316 stainless body and disc", "Pneumatic actuator with position feedback"],
    technicalConsiderations: [
      "Specify electropolished trim for product contact",
      "Provide material traceability per heat number",
      "Use clamp ends only where the line schedule allows",
    ],
    recommendedFamilies: ["resilient-seated-butterfly-valves", "iso-series", "high-performance-series"],
    applications: ["CIP supply", "Steam utilities", "Process water", "Sugar and syrup"],
    seo: {
      title: "Butterfly Valves for Food and Beverage | Max-Seal",
      description: "FDA-compliant elastomer butterfly valves for hygienic plants and utility service.",
    },
  },
  {
    slug: "mining",
    name: "Mining",
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
    recommendedFamilies: ["resilient-seated-butterfly-valves", "high-performance-series"],
    applications: ["Slurry isolation", "Process water", "Reagent dosing", "Tailings"],
    seo: {
      title: "Butterfly Valves for Mining | Max-Seal",
      description: "Hardened butterfly valves for slurry, process water, and reagent service in mining.",
    },
  },
];

// =====================================================================
// RESOURCES
// =====================================================================

export const RESOURCE_CATEGORIES: { slug: string; label: string; category: ResourceCategory; description: string }[] = [
  { slug: "catalogs", label: "Catalogs", category: "Catalog", description: "Master and product-family catalogues." },
  { slug: "technical-bulletins", label: "Technical Bulletins", category: "Technical", description: "Engineering notes and service bulletins." },
  { slug: "seat-selection-guides", label: "Seat Selection Guides", category: "Seat Guide", description: "Elastomer and metal seat selection by service." },
  { slug: "installation-maintenance", label: "Installation and Maintenance", category: "Installation", description: "Install, commission, and maintain Max-Seal valves." },
  { slug: "actuator-selection", label: "Actuator Selection", category: "Actuator", description: "Size and specify pneumatic and electric actuation." },
  { slug: "terms", label: "Terms and Conditions", category: "Brochure", description: "Standard commercial terms." },
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
    productSlugs: ["resilient-seated-butterfly-valves", "iso-series", "awwa-butterfly-valves"],
    industrySlugs: ["water-and-wastewater", "food-and-beverage", "mining"],
  },
  {
    title: "High Performance Cv and Torque Tables",
    category: "Datasheet",
    type: "PDF",
    size: "820 KB",
    href: "#",
    productSlugs: ["high-performance-series", "hi-tek-series"],
    industrySlugs: ["oil-and-gas", "power", "chemical-processing"],
  },
  {
    title: "Triple Offset for Cryogenic Service",
    category: "Technical",
    type: "PDF",
    size: "2.1 MB",
    href: "#",
    productSlugs: ["triple-offset-butterfly-valves", "tri-max-series", "cryogenic-butterfly-valves"],
    industrySlugs: ["oil-and-gas", "power"],
    gated: true,
  },
  {
    title: "PFA Lined Chemical Compatibility Guide",
    category: "Technical",
    type: "PDF",
    size: "1.9 MB",
    href: "#",
    productSlugs: ["chem-flo-series", "chem-tek-series"],
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
    productSlugs: ["resilient-seated-butterfly-valves", "iso-series"],
    industrySlugs: ["water-and-wastewater"],
  },
  {
    title: "3D STEP Model Library, High Performance",
    category: "Technical",
    type: "STEP",
    size: "Varies",
    href: "#",
    productSlugs: ["high-performance-series", "hi-tek-series"],
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
  {
    title: "Seat Selection Guide for Process Service",
    category: "Seat Guide",
    type: "PDF",
    size: "1.1 MB",
    href: "#",
    productSlugs: ["high-performance-series", "hi-tek-series", "triple-offset-butterfly-valves"],
    industrySlugs: ["chemical-processing", "oil-and-gas", "power"],
  },
  {
    title: "Actuator Selection Guide",
    category: "Actuator",
    type: "PDF",
    size: "1.6 MB",
    href: "#",
    productSlugs: ["actuators", "gear-ops", "automation-accessories"],
    industrySlugs: [],
  },
  {
    title: "Technical Bulletin: Fugitive Emissions Packing",
    category: "Technical",
    type: "PDF",
    size: "620 KB",
    href: "#",
    productSlugs: ["hi-tek-series", "high-performance-series"],
    industrySlugs: ["oil-and-gas", "chemical-processing"],
  },
  {
    title: "Standard Terms and Conditions of Sale",
    category: "Brochure",
    type: "PDF",
    size: "240 KB",
    href: "#",
    productSlugs: [],
    industrySlugs: [],
  },
];

// =====================================================================
// FAQS
// =====================================================================

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

// =====================================================================
// ENGINEERING PILLARS
// =====================================================================

export const ENGINEERING_PILLARS: { title: string; body: string }[] = [
  { title: "Material science first", body: "Body, trim, and seat are selected from service history. We design against the line, not a catalogue page." },
  { title: "Geometry that lasts", body: "Concentric, double, and triple offset platforms matched to the duty. Less wear, longer seat life." },
  { title: "Sealing systems", body: "From elastomer to laminated metal-graphite seats. Bidirectional bubble tight or zero leakage to ISO 5208 Rate A." },
  { title: "Fire-safe and emissions", body: "API 607 fire-safe construction and ISO 15848 fugitive emission packing on demand." },
  { title: "Cryogenic engineering", body: "Extended bonnets tested to BS 6364 for LNG and industrial gas service." },
  { title: "Tested, documented, supported", body: "Every valve hydrotested, seat tested, and shipped with traceable paperwork. US engineers on call." },
];

// =====================================================================
// SELECTOR DATA
// =====================================================================

export const SELECTOR: {
  industries: { value: string; label: string }[];
  media: string[];
  priorities: { value: string; label: string }[];
  valveTypes: { value: string; label: string }[];
  operations: OperationType[];
  support: { value: string; label: string }[];
} = {
  industries: INDUSTRIES.map((i) => ({ value: i.slug, label: i.name })),
  media: MEDIA_TYPES,
  priorities: [
    { value: "zero-leak", label: "Tight zero-leakage shutoff" },
    { value: "low-emission", label: "Fugitive emission control" },
    { value: "high-pressure", label: "High pressure or temperature" },
    { value: "corrosion", label: "Corrosion resistance" },
    { value: "low-cost", label: "Best value for general service" },
  ],
  valveTypes: [
    { value: "any", label: "Open to recommendation" },
    { value: "resilient-seated", label: "Resilient seated" },
    { value: "high-performance", label: "High performance" },
    { value: "triple-offset", label: "Triple offset" },
    { value: "pfa-lined", label: "PFA lined" },
    { value: "cryogenic", label: "Cryogenic" },
    { value: "awwa", label: "AWWA" },
  ],
  operations: ["Manual lever", "Gear operator", "Pneumatic", "Electric"],
  support: [
    { value: "engineer", label: "Yes, have an engineer call me" },
    { value: "quote", label: "Send a written quote first" },
    { value: "browse", label: "Just give me the recommendation" },
  ],
};

// Back-compat: legacy SITE.nav reference used by older Header.
// Kept as a simple flat list. Replaced by NAV mega-menu structure.
(SITE as unknown as { nav: { label: string; href: string }[] }).nav = NAV.map((n) => ({ label: n.label, href: n.href }));
