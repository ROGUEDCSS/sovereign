import { CommunitySignal, SovereignAlignment } from "./knowledge-graph";

export interface CodexItem {
  name: string;
  description?: string;
}

export interface CodexPathway {
  label: string;
  options: string[];
}

export interface RelatedTool {
  label: string;
  href: string;
}

export interface CodexConnection {
  path: string[];
}

export interface CodexNode {
  slug: string;
  name: string;
  tagline: string;
  /** One or two extra sentences shown on the PARENT node's branch-preview card, so a listing page doesn't just repeat the one-line tagline. */
  elaboration?: string;
  definition?: string;
  facts?: string[];
  practicalQuestion?: string;
  items?: CodexItem[];
  connections?: CodexConnection[];
  /** Forward references to systems that don't exist yet (e.g. the Sovereign Almanac) — rendered as plain text, never a link. */
  futureRefs?: string[];
  pathways?: CodexPathway[];
  branches?: CodexNode[];
  relatedTools?: RelatedTool[];
  /** Full content exists for this node. False = stub, not yet mapped. */
  detailed: boolean;
  /** Show the Sovereign Principle / Legal Reality / evidence framework panel. */
  sovereignFramework?: boolean;
  /** Same living-status signal every World entity carries. Undefined until real activity exists — never fabricated. */
  communitySignal?: CommunitySignal;
  sovereignAlignment?: SovereignAlignment;
}

/**
 * The onion model. Four circles, radiating out from the individual:
 * Individual -> Family -> Home & Land -> Community.
 * Nature, Resources, and Capability are not circles of their own — they're
 * things that exist within and across the circles they were dissolved into.
 * The World (src/lib/knowledge-graph.ts, routed at /world) is deliberately
 * not a circle here — see the CODEX_BRANCHES comment below for why.
 */

// ---------- CIRCLE 1: INDIVIDUAL ----------

const IDENTITY: CodexNode = {
  slug: "identity",
  name: "Identity",
  tagline: "Who you are, how you prove it, and how much of it you have to hand over to do so.",
  elaboration:
    "From your passport to your passwords, identity increasingly determines what you're allowed to do, access, or prove. This branch covers how resilient that proof actually is, and how much of yourself you have to disclose just to be believed.",
  definition:
    "Identity is your ability to prove who you are — to institutions, to strangers, and to yourself — without any single document, device, or company being the only thing standing between you and being believed.",
  facts: [
    "For most people, identity is provable through only one primary channel — a phone, or a single government-issued document. Losing that one channel is an ordinary event (a stolen phone, a house fire, a lost wallet), not a rare catastrophe.",
    "Digital identity works best when split into three separate roles — issuer, holder, and verifier — so no single party has to hold or control everything, the same way a driver's licence works: the government issues it, you hold it, a bar checks it without calling the government.",
    "Replacing a lost primary ID document typically requires other forms of ID to apply for it — a bootstrapping problem for anyone whose identity proof was concentrated in that one document.",
    "Account-takeover attacks overwhelmingly target the single weakest verification channel available — SIM-swap attacks against phone-based two-factor authentication are a well-documented example of exploiting exactly this kind of single point of failure.",
  ],
  practicalQuestion: "How can you prove what's actually necessary about yourself, to whoever needs it, without surrendering everything else?",
  detailed: true,
  sovereignFramework: true,
  items: [
    { name: "Legal identity", description: "Passports, birth certificates, and government-issued documents — the base layer, and the hardest to replace if lost." },
    { name: "Digital identity", description: "Online accounts, digital credentials, and the authentication methods that stand in for you when you're not physically present." },
    { name: "Identity resilience", description: "Certified copies, offline records, and more than one way to prove who you are — so no single lost device or locked account can strand you." },
    { name: "Privacy & disclosure", description: "What you actually choose to reveal, to whom, and why — proving the specific claim asked for, not your entire file." },
    { name: "Digital security tools", description: "Hardware security keys, password managers, and encrypted storage — the tools that make disclosure a choice instead of an accident." },
  ],
  connections: [{ path: ["individual", "finance"] }, { path: ["family", "family-finance"] }],
};

const PERSONAL_DEVELOPMENT: CodexNode = {
  slug: "personal-development",
  name: "Personal development",
  tagline: "What you actually know and are deliberately learning — theory and practice, outside of any formal system.",
  elaboration:
    "The knowledge and skills you're actively building outside any classroom or workplace — reading, practising, and teaching yourself the things that make you more capable and harder to replace.",
  definition:
    "Personal development is the deliberate practice of getting better at things that matter to you — outside any classroom, curriculum, or employer's agenda, and driven by your own judgment about what's worth learning.",
  facts: [
    "Deliberate, structured practice — practice with clear feedback and a specific stretch goal — produces far more improvement than passive repetition or simply logging hours, a consistent finding across skill-acquisition research.",
    "Skills that combine well together can make someone genuinely hard to replace in a way that being merely excellent at one narrow skill often doesn't — rare combinations, not single specialisms, are what's actually scarce.",
    "Self-directed learners retain and apply knowledge better when they can immediately connect it to a real problem they're solving, rather than learning material in the abstract, disconnected from use.",
    "Formal credentials and actual on-the-job competence are measurably different things — a growing number of employers now use skills-based assessments specifically because holding a credential doesn't reliably predict capability.",
  ],
  practicalQuestion: "What's one skill you've been meaning to learn for over a year — and what's actually stopped you from starting?",
  detailed: true,
  items: [
    { name: "Reading & study", description: "Deliberately reading and absorbing material outside anything required of you — the foundation everything else draws on." },
    { name: "Practical skills", description: "Hands-on capability you build by actually doing the thing, not just knowing about it." },
    { name: "Skill stacking", description: "Combining two or more skills into a rarer, harder-to-replace combination than either alone." },
    { name: "Teaching yourself", description: "Structuring your own learning without a curriculum, and knowing how to tell if it's actually working." },
    { name: "Mentors & communities", description: "Learning faster by borrowing someone else's experience instead of relying only on your own trial and error." },
  ],
  connections: [{ path: ["family", "education"] }],
};

const HEALTH: CodexNode = {
  slug: "health",
  name: "Health",
  tagline: "Physical and mental wellbeing — the capacity everything else depends on.",
  elaboration:
    "Resilience isn't separate from health — it's built on it. This branch covers the habits, capacity, and reserves that determine whether you can actually act on everything else in this Codex when it matters.",
  definition:
    "Health, in practical terms, is what you eat and drink, how much you move — cardio and strength training — how well you sleep, and how you manage stress. It's the one form of capacity you can't borrow, outsource, or buy back once it's gone — everything else in this Codex depends on you actually having it.",
  facts: [
    "Health is more than the absence of disease — it's your actual physical and mental capacity, and it declines measurably when movement, sleep, or nutrition are neglected for long enough.",
    "Sedentary behaviour and poor nutrition are strongly linked to higher rates of chronic disease — cardiovascular problems, diabetes, reduced life expectancy — even in people who exercise occasionally.",
    "Sleep deprivation impairs cognitive function, decision-making, and immune response within days, not months.",
    "Mental health conditions are common, not rare or exceptional — most people will experience real mental strain, or a diagnosable condition, at some point in their life.",
  ],
  practicalQuestion: "If your body or mind stopped functioning at full capacity for a month, what in your life would actually still work?",
  detailed: true,
  items: [
    { name: "Physical fitness", description: "Strength, cardiovascular capacity, and mobility — the basic ability to do physical work when it's actually required." },
    { name: "Nutrition", description: "What you actually eat, not what you know you should eat — the fuel everything else runs on." },
    { name: "Sleep", description: "Often the first thing sacrificed, and the first thing that degrades everything else once it is." },
    { name: "Mental health", description: "Stress, resilience, and knowing when and how to actually get support, not just push through." },
    { name: "Preventive care", description: "Check-ups and screenings — catching problems while they're still small and cheap to fix." },
  ],
  connections: [{ path: ["family", "family-capability"] }],
};

const FINANCE: CodexNode = {
  slug: "finance",
  name: "Finance",
  tagline: "Personal income, savings, and financial independence — before it becomes a household concern.",
  elaboration:
    "Covers both sides of the ledger: managing what you already have (savings, spending, reserves) and how resilient your ability to earn actually is — one employer vs. transferable skills vs. more than one income source.",
  definition:
    "Financial independence is the ability to meet your own needs and absorb a shock — a lost job, a medical bill, a bad month — without immediately depending on credit, family, or the state to bridge the gap.",
  facts: [
    "A cash emergency fund covering three to six months of essential expenses is a real buffer, not overkill — the exact number varies by household, but having no buffer at all is the actual risk.",
    "Concentrating savings in a single bank exposes you to that one institution's outages, freezes, or failures — bank failures are rare, but real, and losing access to your only account is not a hypothetical.",
    "Income concentrated in a single employer or client is a single point of failure in the same way savings in a single account are — job loss is one of the most common triggers of financial hardship.",
    "Cash and physical currency remain functional when card networks, apps, or the power grid itself do not — a form of resilience a purely digital financial life doesn't have.",
  ],
  practicalQuestion: "If your main income stopped tomorrow, how many months could your household actually cover its real expenses?",
  detailed: true,
  items: [
    { name: "Income", description: "What actually comes in — salary, wages, business revenue — and how many genuinely independent sources it comes from, not just how much." },
    { name: "Savings & reserves", description: "The buffer between a disruption and real hardship. Split by purpose: emergency fund, short-term goals, longer-term reserve." },
    { name: "Debt", description: "What you owe, to whom, and on what terms — and how much control that gives someone else over your decisions until it's cleared." },
    { name: "Insurance", description: "Transferring the risks you can't personally absorb — income protection, health, home and contents — onto someone who can." },
    { name: "Financial literacy", description: "Actually knowing your own numbers: net worth, real cash flow, and the real interest rate you're paying or earning, not the advertised one." },
  ],
  connections: [{ path: ["family", "family-finance"] }],
};

const MINDSET_RESPONSIBILITY: CodexNode = {
  slug: "mindset-responsibility",
  name: "Mindset & responsibility",
  tagline: "Self-governance — the character and judgement a Sovereign individual actually runs on.",
  elaboration:
    "Skills and resources only matter if the person holding them is disciplined enough to actually use them well. This branch is about the follow-through — showing up, owning outcomes, and making sound calls under pressure.",
  detailed: true,
  connections: [{ path: ["family", "responsibility"] }],
};

const INDIVIDUAL: CodexNode = {
  slug: "individual",
  name: "Individual",
  tagline: "Me. Who am I, what do I know, what can I do, what do I own, and how independent am I?",
  detailed: true,
  branches: [IDENTITY, PERSONAL_DEVELOPMENT, HEALTH, FINANCE, MINDSET_RESPONSIBILITY],
};

// ---------- CIRCLE 2: FAMILY ----------

const FAMILY_LIFE: CodexNode = {
  slug: "family-life",
  name: "Family life",
  tagline: "Relationships, cooperation, shared responsibilities, and the practical functioning of the family unit.",
  detailed: true,
};

const CHILDREN: CodexNode = {
  slug: "children",
  name: "Children",
  tagline: "Raising capable, responsible, and independent children while respecting their privacy, development, and individual sovereignty.",
  detailed: true,
};

const EDUCATION: CodexNode = {
  slug: "education",
  name: "Education",
  tagline: "Formal education, home education, practical education, apprenticeships, and the Sovereign learning system.",
  detailed: true,
  connections: [{ path: ["individual", "personal-development"] }],
};

const RESPONSIBILITY: CodexNode = {
  slug: "responsibility",
  name: "Responsibility",
  tagline: "The responsibilities family members voluntarily assume toward one another.",
  detailed: true,
};

const FAMILY_FINANCE: CodexNode = {
  slug: "family-finance",
  name: "Family finance",
  tagline: "Household income, expenditure, assets, ownership, planning, and financial resilience.",
  detailed: true,
  connections: [{ path: ["individual", "finance"] }],
};

const FAMILY_CAPABILITY: CodexNode = {
  slug: "family-capability",
  name: "Family capability",
  tagline: "What the family collectively knows and can do — the practical skills no one had to look up.",
  detailed: true,
  items: [
    { name: "Growing food" },
    { name: "Repairing equipment" },
    { name: "Building" },
    { name: "Cooking" },
    { name: "First aid" },
    { name: "Managing animals" },
    { name: "Emergency preparedness" },
  ],
};

const FAMILY_LEGACY: CodexNode = {
  slug: "family-legacy",
  name: "Family legacy",
  tagline: "Knowledge, skills, traditions, property, records, and practical experience passed between generations.",
  detailed: true,
  futureRefs: ["Sovereign Almanac"],
};

const FAMILY: CodexNode = {
  slug: "family",
  name: "Family",
  tagline: "Us. The family unit, children, education, relationships, finances, capability, and intergenerational knowledge.",
  detailed: true,
  branches: [FAMILY_LIFE, CHILDREN, EDUCATION, RESPONSIBILITY, FAMILY_FINANCE, FAMILY_CAPABILITY, FAMILY_LEGACY],
};

// ---------- CIRCLE 3: HOME & LAND ----------

const HOUSEHOLD_SYSTEMS: CodexNode = {
  slug: "household-systems",
  name: "Household systems",
  tagline: "The utilities and systems that keep the dwelling running day to day — and what happens when one of them stops.",
  detailed: true,
  connections: [{ path: ["home", "energy"] }, { path: ["home", "water"] }],
};

const HOUSEHOLD_SECURITY: CodexNode = {
  slug: "household-security",
  name: "Household security",
  tagline: "The physical security of the home itself — and what you're actually allowed to do to protect it.",
  practicalQuestion: "What can a household reasonably do to secure itself, and where does that right actually stop?",
  detailed: true,
  sovereignFramework: true,
  connections: [{ path: ["family", "responsibility"] }],
};

const HOUSEHOLD_STORES: CodexNode = {
  slug: "household-stores",
  name: "Household stores",
  tagline: "What's kept in reserve inside the home — food, water, supplies, and documents, ready before they're needed.",
  detailed: true,
  connections: [{ path: ["home", "food-production"] }, { path: ["individual", "identity"] }],
  relatedTools: [{ label: "Build my system", href: "/build-my-system" }],
};

const HOUSEHOLD_MAINTENANCE: CodexNode = {
  slug: "household-maintenance",
  name: "Household maintenance",
  tagline: "Keeping the dwelling itself in working order — what breaks, what's diagnosed, what's actually fixed, and the tools that make it possible.",
  practicalQuestion: "If you had the skill but not the tool, could you still get the job done?",
  detailed: true,
  items: [
    { name: "Hand tools", description: "The core kit — measuring, cutting, fastening, and general repair." },
    { name: "Power tools", description: "Faster and more capable, and dependent on a charged battery or mains power." },
    { name: "Diagnostic equipment", description: "Multimeters, testers, and the tools that tell you what's actually wrong before you fix it." },
  ],
  connections: [{ path: ["family", "family-capability"] }],
};

const HOUSEHOLD_ROUTINES: CodexNode = {
  slug: "household-routines",
  name: "Household routines",
  tagline: "The daily and weekly rhythm that keeps a household functioning — including the plan for when it doesn't.",
  detailed: true,
  connections: [{ path: ["family", "family-life"] }],
  relatedTools: [{ label: "Scenario room", href: "/scenario-room" }],
};

const FOOD_PRODUCTION: CodexNode = {
  slug: "food-production",
  name: "Food production",
  tagline: "How much of your own food can your land reliably provide?",
  practicalQuestion: "How can land provide a reliable proportion of the food required by the individual and family?",
  detailed: true,
  sovereignFramework: true,
  items: [
    { name: "Gardens", description: "Vegetables, herbs, and small-scale food production." },
    { name: "Crops", description: "Grains, legumes, vegetables, and other field crops." },
    { name: "Orchards", description: "Fruit, nuts, and perennial food production." },
    { name: "Livestock", description: "Animals providing food and other useful outputs." },
    { name: "Poultry", description: "Eggs, meat, and small-scale poultry production." },
    { name: "Fish & aquaculture", description: "Fish production where appropriate." },
    { name: "Food preservation", description: "Drying, fermenting, preserving, smoking, freezing, and other methods." },
  ],
  connections: [{ path: ["home", "water"] }, { path: ["home", "nature"] }, { path: ["family", "family-capability"] }],
  relatedTools: [{ label: "Build my system", href: "/build-my-system" }],
};

const BUILDING: CodexNode = {
  slug: "building",
  name: "Building",
  tagline: "What can you build on your land to create a functional, productive, resilient life — turning materials and skill into something finished?",
  practicalQuestion: "What can an individual build on their land to create a functional, productive and resilient life?",
  detailed: true,
  sovereignFramework: true,
  items: [
    { name: "Dwellings", description: "Houses, cabins, and alternative forms of accommodation." },
    { name: "Workshops", description: "Spaces for making, repairing, and storing tools." },
    { name: "Storage", description: "Sheds, barns, food stores, and equipment storage." },
    { name: "Agricultural structures", description: "Animal shelters, greenhouses, fencing, and other productive structures." },
    { name: "Water structures", description: "Dams, ponds, tanks, and associated infrastructure." },
    { name: "Other useful structures", description: "Structures suited to the particular land and purpose." },
  ],
  pathways: [
    { label: "Earth", options: ["Rammed earth", "Adobe", "Cob", "Earth blocks"] },
    { label: "Timber", options: ["Timber framing", "Pole construction", "Traditional structures"] },
    { label: "Stone", options: ["Masonry", "Stone walls", "Foundations"] },
  ],
};

const WATER: CodexNode = {
  slug: "water",
  name: "Water",
  tagline: "Where your water actually comes from, and what happens if that source stops.",
  definition:
    "Water is the single most essential input for human life — more urgent than food, shelter, or almost anything else you could stockpile. Every cell, organ, and system in the body depends on it.",
  facts: [
    "The human body is roughly 60% water, and every major bodily system depends on it functioning.",
    "Most people can survive only about 3 days without water — compared to several weeks without food.",
    "Losing just 2% of your body's water (mild dehydration) is enough to measurably impair concentration and physical performance.",
    "Municipal water systems typically hold only a few days of treated reserve — a mains failure, contamination event, or extended outage can interrupt supply with very little warning.",
    "A single adult needs a minimum of roughly 3 litres a day just to survive — more for cooking, hygiene, and any physical exertion.",
  ],
  practicalQuestion: "How much of your household's water can come from a source you control directly?",
  detailed: true,
  sovereignFramework: true,
  items: [
    { name: "Mains connection", description: "The default source for most households — reliable until it isn't." },
    { name: "Rainwater harvesting", description: "Collection, first-flush systems, and storage — often the most accessible independent source." },
    { name: "Bore & groundwater", description: "Where geology and regulation allow it — a genuinely independent supply." },
    { name: "Storage & purification", description: "Tanks, filtration, and treatment — the difference between having water and having water you can actually use." },
  ],
  connections: [{ path: ["home", "household-systems"] }, { path: ["home", "food-production"] }],
};

const ENERGY: CodexNode = {
  slug: "energy",
  name: "Energy",
  tagline: "Where your power actually comes from, and how many of those sources you actually control.",
  practicalQuestion: "If the grid failed for a week, how much of your household's energy need could you still meet yourself?",
  detailed: true,
  sovereignFramework: true,
  items: [
    { name: "Grid connection", description: "The default source — centralised, reliable most of the time, and entirely outside your control." },
    { name: "Solar & battery", description: "Generation and storage you own outright, on your own property." },
    { name: "Generator & fuel", description: "Backup capacity that depends on stored fuel rather than continuous sun or wind." },
    { name: "Efficiency", description: "The cheapest unit of energy is the one you never needed — reducing draw before adding supply." },
  ],
  connections: [{ path: ["home", "household-systems"] }],
};

const MATERIALS: CodexNode = {
  slug: "materials",
  name: "Materials",
  tagline: "The raw materials behind everything you might build, repair, or make.",
  detailed: true,
  items: [
    { name: "Timber", description: "Structural and general-purpose building material." },
    { name: "Metal", description: "Fasteners, structural steel, and materials for fabrication and repair." },
    { name: "Earth & stone", description: "Rammed earth, adobe, masonry — building materials sourced close to home." },
    { name: "Textiles & fibre", description: "Materials for clothing, repair, and general household use." },
  ],
  connections: [{ path: ["home", "building"] }],
};

const MOBILITY: CodexNode = {
  slug: "mobility",
  name: "Mobility",
  tagline: "How you and your household actually move, and what happens when the usual way stops working.",
  detailed: true,
  items: [
    { name: "Personal vehicle", description: "The default — fast and flexible, and dependent on fuel and parts supply chains." },
    { name: "Fuel storage", description: "A buffer against short-term shortages or price spikes." },
    { name: "Alternative transport", description: "Bicycles, public transport, and other modes that don't depend on your own vehicle." },
    { name: "Vehicle maintenance", description: "The difference between a vehicle you can keep running and one you can only replace." },
  ],
  connections: [{ path: ["family", "family-capability"] }],
};

const NATURE: CodexNode = {
  slug: "nature",
  name: "Nature",
  tagline: "Ecosystems, soil, climate, and the natural cycles your land and home actually depend on.",
  practicalQuestion: "How much can you shape the land you're on before you need approval to do it?",
  detailed: true,
  sovereignFramework: true,
  items: [
    { name: "Soil", description: "Soil health and fertility — the foundation everything grown on your land actually depends on." },
    { name: "Ecosystems & biodiversity", description: "The native species and ecological balance on and around your land." },
    { name: "Climate & seasons", description: "Your local climate and seasonal rhythm — working with the pattern instead of against it." },
    { name: "Natural cycles", description: "How water, nutrients, and energy actually regenerate themselves in a working system, without external input." },
  ],
  connections: [{ path: ["home", "food-production"] }, { path: ["home", "water"] }],
};

const HOME: CodexNode = {
  slug: "home",
  name: "Home & Land",
  tagline: "Our place. Not just the dwelling — the water, food, energy, materials, tools, and land it actually sits on.",
  detailed: true,
  branches: [
    HOUSEHOLD_SYSTEMS,
    HOUSEHOLD_SECURITY,
    HOUSEHOLD_STORES,
    HOUSEHOLD_MAINTENANCE,
    HOUSEHOLD_ROUTINES,
    FOOD_PRODUCTION,
    BUILDING,
    WATER,
    ENERGY,
    MATERIALS,
    MOBILITY,
    NATURE,
  ],
};

// ---------- CIRCLE 4: COMMUNITY ----------

const NEIGHBOURS: CodexNode = {
  slug: "neighbours",
  name: "Neighbours",
  tagline: "The closest circle — the people physically near enough to help, or be helped, quickly.",
  detailed: true,
  connections: [{ path: ["home", "household-routines"] }],
};

const LOCAL_NETWORK: CodexNode = {
  slug: "local-network",
  name: "Local network",
  tagline: "Friends, tradespeople, and local relationships that aren't formal but are genuinely reliable.",
  detailed: true,
};

const GROUPS_INSTITUTIONS: CodexNode = {
  slug: "groups-institutions",
  name: "Groups & institutions",
  tagline: "Clubs, faith communities, and associations — the groups you're actually part of, not just aware of.",
  detailed: true,
};

const MUTUAL_AID: CodexNode = {
  slug: "mutual-aid",
  name: "Mutual aid",
  tagline: "Reciprocal help in practice — what you'd offer, what you'd ask for, and the trust that makes both possible.",
  detailed: true,
  connections: [{ path: ["individual", "mindset-responsibility"] }],
};

const COMMUNITY: CodexNode = {
  slug: "community",
  name: "Community",
  tagline: "Our people. Neighbours, friends, contributors, cooperatives, and resilient local communities.",
  detailed: true,
  branches: [NEIGHBOURS, LOCAL_NETWORK, GROUPS_INSTITUTIONS, MUTUAL_AID],
};

/**
 * Deliberately four circles, not five. The World (see src/lib/knowledge-graph.ts,
 * routed at /world) is NOT part of the Codex — it's the opposing pillar the
 * Codex is juxtaposed against. The Codex is what you build; the World is
 * what exists regardless of you, and what the aggregate of everyone
 * practicing sovereignty is trying to make better. Nesting it under /codex
 * was a mistake — it said "chapter of the Codex" when it should say "peer."
 */
export const CODEX_BRANCHES: CodexNode[] = [INDIVIDUAL, FAMILY, HOME, COMMUNITY];

export interface ResolvedCodexPath {
  node: CodexNode;
  trail: CodexNode[];
}

export function resolveCodexPath(segments: string[]): ResolvedCodexPath | null {
  if (segments.length === 0) return null;
  let list = CODEX_BRANCHES;
  const trail: CodexNode[] = [];
  let node: CodexNode | undefined;
  for (const segment of segments) {
    node = list.find((n) => n.slug === segment);
    if (!node) return null;
    trail.push(node);
    list = node.branches ?? [];
  }
  return { node: node!, trail };
}

export function allCodexPaths(): string[][] {
  const paths: string[][] = [];
  function walk(nodes: CodexNode[], prefix: string[]) {
    for (const n of nodes) {
      const path = [...prefix, n.slug];
      paths.push(path);
      if (n.branches) walk(n.branches, path);
    }
  }
  walk(CODEX_BRANCHES, []);
  return paths;
}
