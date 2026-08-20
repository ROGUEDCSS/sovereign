import { EvidenceRating, IndependenceSource } from "./articles";

export type EntityType =
  | "governance"
  | "law"
  | "corporates"
  | "finance"
  | "economics"
  | "media"
  | "technology"
  | "science"
  | "history"
  | "geography"
  | "organisations"
  | "people"
  | "events";

/** Order here is the canonical display order for the World index. */
export const ENTITY_TYPES: EntityType[] = [
  "governance",
  "law",
  "corporates",
  "finance",
  "economics",
  "media",
  "technology",
  "science",
  "history",
  "geography",
  "organisations",
  "people",
  "events",
];

export const ENTITY_TYPE_LABELS: Record<EntityType, string> = {
  governance: "Governance",
  law: "Law",
  corporates: "Corporates",
  finance: "Finance",
  economics: "Economics",
  media: "Media",
  technology: "Technology",
  science: "Science",
  history: "History",
  geography: "Geography",
  organisations: "Organisations",
  people: "People",
  events: "Events",
};

/**
 * Second-level Subsections per category, from docs/world-taxonomy.md.
 * Only populated for categories that have actually been built out — a
 * category missing here just falls back to a flat entity list. Don't
 * fabricate a full 13-category set to make this look more complete than
 * it is.
 */
export const WORLD_SUBSECTIONS: Partial<Record<EntityType, string[]>> = {
  governance: [
    "Governments",
    "Political systems",
    "Executive government",
    "Legislatures",
    "Public administration",
    "Elections",
    "Political parties",
    "Public policy",
    "Government agencies",
    "Local government",
    "International governance",
    "Treaties & agreements",
    "Public spending",
    "Government accountability",
    "Political power & influence",
  ],
};

/** Related-category cross-links, from docs/world-taxonomy.md's "Connections" line per category. */
export const WORLD_CATEGORY_CONNECTIONS: Partial<Record<EntityType, EntityType[]>> = {
  governance: ["law", "finance", "economics", "geography", "organisations", "events", "people"],
};

/** One-line definition per category, tied specifically to what it means for your own sovereignty — not a generic dictionary gloss. */
export const WORLD_CATEGORY_DESCRIPTIONS: Record<EntityType, string> = {
  governance: "How collective political authority is organised and exercised — the rules and institutions that decide what you're permitted to do without asking, and what you're not.",
  law: "The rules that are actually enforceable in your jurisdiction — the difference between what you're free to do in principle and what you can do without real consequence.",
  corporates: "The commercial entities you depend on for income, goods, and services — and how much of your daily life runs through companies you don't own or control.",
  finance: "The institutions and systems that move money and capital — who holds your wealth, and how much of your financial life depends on their continued cooperation.",
  economics: "How resources, prices, and incentives actually behave at scale — the conditions your personal finances operate inside, whether you notice them or not.",
  media: "How information reaches you — and how much of what you believe about the world was actually verified, versus simply repeated.",
  technology: "The tools and systems you rely on daily — and how much of your capability disappears if the technology, or its owner, stops cooperating.",
  science: "What's actually been tested and shown to be true — the difference between a real finding and a confident claim wearing its authority.",
  history: "What's already happened, and what it actually proves — patterns worth knowing before you repeat someone else's mistake.",
  geography: "Where you actually are, and how much that shapes what's possible — the same plan produces different outcomes on different land.",
  organisations: "The structured collective entities — governments, companies, non-profits, and more — that you deal with as if they were a single person, even though none of them are.",
  people: "The individuals whose decisions, work, or authority actually affect you — named because they're relevant to something, not catalogued for their own sake.",
  events: "What happened, when, and to whom — the specific occurrences that actually moved governance, law, markets, or your own circumstances.",
};

export interface WorldSovereigntyPoint {
  label: string;
  points: string[];
}

/**
 * Steelmanned, named-source pros/cons of the category itself, specifically
 * weighed against individual sovereignty — not a generic "is this good"
 * take. Same discipline as KGEntity.pros/cons (Capitalism): real named
 * thinkers, no strawmen, and cons aren't automatically "wins" — a con here
 * is a real tension the reader should weigh, not a verdict.
 *
 * STANDARD (applies to every category, always): each point gets multiple
 * bullets, not one dense sentence — the goal is to actually educate on the
 * power dynamic (who holds power over whom: the individual over themself,
 * vs. governance/the category holding power over the individual), not just
 * assert a labeled claim. Lead with the concrete mechanism, end with the
 * named source.
 */
export const WORLD_CATEGORY_SOVEREIGNTY: Partial<Record<EntityType, { pros: WorldSovereigntyPoint[]; cons: WorldSovereigntyPoint[] }>> = {
  governance: {
    pros: [
      {
        label: "Enforceable property rights",
        points: [
          "Ownership without enforcement is just a claim — anyone stronger than you can take it, and you'd have no real recourse.",
          "A land title register, a functioning court system, and police who'll act on a judgment are what convert 'I built this' into something the state will actually defend on your behalf.",
          "This flips the power dynamic in your favour: instead of personally guarding everything you own around the clock, you delegate that defence to an institution — but only for as long as it keeps acting impartially.",
          "Locke's Second Treatise of Government (1689) argued this is the entire justification for government existing at all: protecting life, liberty, and property that would otherwise be defenceless.",
        ],
      },
      {
        label: "Checks on power",
        points: [
          "A single ruler with no checks can change the rules whenever it suits them — today's protection becomes tomorrow's confiscation, with no warning and no appeal.",
          "Splitting power across branches — legislative, executive, judicial — and forcing regular elections means no single person or party can hold unchecked control indefinitely.",
          "Crucially, this protects you from the government itself, not just from other people — an independent judiciary can rule against the state, in your favour.",
          "Montesquieu's The Spirit of the Laws (1748) is the foundational argument that liberty survives only when power is divided, never concentrated in one place.",
        ],
      },
      {
        label: "Baseline public goods",
        points: [
          "Currency, courts, roads, and national defence are expensive, coordination-heavy projects that are extremely hard for any one household to build alone.",
          "Government pools resources from everyone to provide a shared foundation — a currency you can actually save in, roads you can travel on, courts you can use.",
          "This isn't a substitute for self-reliance — it's the infrastructure individual self-reliance is actually built on top of.",
          "Hobbes' Leviathan (1651) argued that without this baseline, individual life reverts to a constant struggle for basic survival, leaving no real room to build anything of your own.",
        ],
      },
    ],
    cons: [
      {
        label: "Permission over right",
        points: [
          "A right, in principle, is yours by default — no one has to approve it before you can exercise it.",
          "Regulation quietly reverses that default: you now need a permit to extend your house, a licence to work certain jobs, an approval to travel to certain places.",
          "Every one of those approvals is a point where someone else — a department, an officer, a system — can say no, delay you, or attach conditions you didn't choose.",
          "Hayek's The Road to Serfdom (1944) tracked exactly this shift: as central planning expands, individual freedom doesn't disappear all at once — it erodes permission by permission, rule by rule.",
        ],
      },
      {
        label: "Consent-free taxation",
        points: [
          "You don't get to individually agree or disagree with each specific use of your tax dollars — the decision is made collectively, by people you didn't necessarily vote for on that specific issue.",
          "This is a real transfer of control: money you earned through your own labour is redirected according to someone else's priorities, not yours.",
          "The scale compounds the effect — it isn't a one-off, it's a permanent, recurring claim on your future earnings too.",
          "Nozick's Anarchy, State, and Utopia (1974) argued this is functionally similar to compelled labour: a portion of your work's proceeds is claimed without your individual agreement to that specific claim.",
        ],
      },
      {
        label: "Surveillance creep",
        points: [
          "The same digital systems built to make government services faster — digital ID, online tax filing, benefit payments — also generate a detailed record of your activity.",
          "Once that data exists, sharing it between agencies is a policy decision, not a technical barrier — today's convenience can become tomorrow's monitoring without you being asked again.",
          "Financial monitoring in particular sits at the intersection of Governance and Law, because both can be used to restrict what you're allowed to buy, hold, or transfer — not just observe it.",
          "None of this requires bad intent from any individual official — the risk is structural: more capability to observe always means more capacity to restrict, whoever ends up holding it.",
        ],
      },
    ],
  },
};

export function slugifySubsection(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export interface KGRelationship {
  /** Short verb phrase, kept deliberately modest — "cites", "member of", "researches" — never "controls" or "influences" without real sourcing. */
  type: string;
  targetSlug: string;
  note?: string;
}

export interface KGCodexLink {
  path: string[];
  note: string;
}

/**
 * Per-content interaction, not a truth verdict: ? = "I question or challenge
 * this" (opens scrutiny — what do you question, with evidence/comment/
 * correction), + = "I'm contributing something new" (article, video, source,
 * correction, experience, how-to, comment). There's no separate "endorse" —
 * that would just duplicate the editorial evidenceRating/independenceSource
 * signal above, which already covers "is this entry trustworthy" without a
 * popularity vote. No backend exists yet, so this stays undefined (never
 * fabricated) until a real community system is built.
 */
export interface CommunitySignal {
  questioned: number;
  contributed: number;
}

/**
 * Whether the community thinks the thing being described helps or hurts
 * individual sovereignty — a value judgment, never conflated with factual
 * accuracy (that's evidenceRating's job). Real counts, not a verdict string,
 * so the numbers themselves show consensus or its absence.
 */
export interface SovereignAlignment {
  positive: number;
  negative: number;
}

export interface KGEntity {
  slug: string;
  name: string;
  type: EntityType;
  /** Second-level grouping within the category, per docs/world-taxonomy.md's Subsections list. Optional because most categories don't have their Subsections built out yet. */
  subsection?: string;
  /** "What is it?" */
  summary: string;
  /** "Why does it matter?" */
  whyItMatters?: string;
  /** Sourced factual statements only — no speculation, no unverified claims about motive or control. */
  facts: string[];
  /** Steelmanned, named-source arguments for — real schools of thought, not strawmen. */
  pros?: string[];
  /** Steelmanned, named-source arguments against — real schools of thought, not strawmen. */
  cons?: string[];
  /** Plain citations (title, author, year) — never a fabricated URL. */
  furtherReading?: string[];
  relationships: KGRelationship[];
  codexLinks?: KGCodexLink[];
  knowledgeBaseSlug?: string;
  evidenceRating: EvidenceRating;
  independenceSource: IndependenceSource;
  communitySignal?: CommunitySignal;
  sovereignAlignment?: SovereignAlignment;
}

/**
 * Deliberately small. Every entity and every relationship here is grounded
 * in what's already sourced in the knowledge-base articles — this is not
 * an attempt to map "the world," which would mean asserting ownership,
 * control, or influence claims about real institutions without real
 * research. Expanding this responsibly means adding entities the same
 * way: sourced first, graph second.
 */
export const KG_ENTITIES: KGEntity[] = [
  {
    slug: "united-nations",
    name: "United Nations",
    type: "organisations",
    summary: "The international organisation whose member states adopted the 2030 Agenda for Sustainable Development in 2015.",
    facts: [
      "Member states adopted the 2030 Agenda for Sustainable Development in 2015, containing 17 Sustainable Development Goals and 169 targets.",
      "The UN's own 2025 progress assessment found only about 35% of assessed SDG targets on track or making moderate progress; 48% progressing insufficiently, 18% regressed.",
    ],
    relationships: [{ type: "adopted", targetSlug: "2030-agenda", note: "By member states, 2015." }],
    knowledgeBaseSlug: "2030-agenda",
    evidenceRating: 5,
    independenceSource: "Government source",
  },
  {
    slug: "2030-agenda",
    name: "2030 Agenda / SDGs",
    type: "governance",
    subsection: "International governance",
    summary: "The UN's voluntary international framework of 17 goals and 169 targets, adopted by member states in 2015 — not a binding global law.",
    facts: [
      "Contains 17 Sustainable Development Goals and 169 targets covering poverty, health, education, water, energy, cities, climate, and institutions, among others.",
      "SDG target 16.9 calls for 'legal identity for all' by 2030, aimed primarily at the roughly one billion people worldwide who currently lack any officially recognised identity.",
      "Implementation occurs through each member country's own domestic laws and institutions — the Agenda itself does not compel a single policy or lifestyle.",
    ],
    relationships: [
      { type: "adopted by", targetSlug: "united-nations" },
      {
        type: "cited by",
        targetSlug: "australia-digital-id-act",
        note: "Australia's own framing references the broader global push for legal identity — this is an alignment, not a directive.",
      },
    ],
    codexLinks: [{ path: ["individual", "identity"], note: "SDG 16.9's legal-identity target is the clearest through-line to the Identity node." }],
    knowledgeBaseSlug: "2030-agenda",
    evidenceRating: 5,
    independenceSource: "Government source",
  },
  {
    slug: "australia-digital-id-act",
    name: "Australia's Digital ID Act",
    type: "law",
    summary: "Commenced November 2024 — a framework the Australian Government describes as voluntary, with privacy and consumer protections built in.",
    facts: [
      "Commenced in November 2024.",
      "Described by the Australian Government as voluntary, with privacy and consumer protections built in.",
    ],
    relationships: [
      {
        type: "cites",
        targetSlug: "2030-agenda",
        note: "Aligns with, but was not directed by, the SDG 16.9 legal-identity push.",
      },
    ],
    codexLinks: [{ path: ["individual", "identity"], note: "The direct legal instance of the Identity node's practical question." }],
    knowledgeBaseSlug: "digital-id",
    evidenceRating: 4,
    independenceSource: "Government source",
  },
  {
    slug: "reserve-bank-of-australia",
    name: "Reserve Bank of Australia",
    type: "finance",
    summary: "Australia's central bank. States no decision has been made to issue a retail CBDC, and that cash would not automatically be replaced by one.",
    facts: [
      "Currently states no decision has been made to issue a retail CBDC.",
      "States that cash would not automatically be replaced by a CBDC if one were introduced.",
    ],
    relationships: [
      {
        type: "participates in",
        targetSlug: "bank-for-international-settlements",
        note: "Central banks worldwide coordinate CBDC research in part through the BIS.",
      },
    ],
    codexLinks: [{ path: ["individual", "finance"], note: "Central bank policy on cash and CBDCs directly affects personal financial resilience." }],
    knowledgeBaseSlug: "cbdcs",
    evidenceRating: 4,
    independenceSource: "Government source",
  },
  {
    slug: "bank-for-international-settlements",
    name: "Bank for International Settlements",
    type: "finance",
    summary: "An international body coordinating central-bank research, including CBDC technology — APIs, interoperability, offline payments, biometric authentication, privacy design, and programmability.",
    facts: [
      "Coordinates central-bank CBDC research including APIs, interoperability, offline payments, biometric authentication devices, privacy-preserving design, and programmability.",
    ],
    relationships: [],
    knowledgeBaseSlug: "cbdcs",
    evidenceRating: 4,
    independenceSource: "Government source",
  },
  {
    slug: "c40-cities",
    name: "C40 Cities",
    type: "organisations",
    summary: "A network of cities promoting '15-minute neighbourhood' planning — access to everyday services by walking or cycling — including Paris, Melbourne, Vancouver, and Bogotá.",
    facts: [
      "Promotes neighbourhoods where everyday services can be reached by walking or cycling.",
      "States residents remain free to travel longer distances — the model concerns local access, not a travel restriction.",
    ],
    relationships: [],
    evidenceRating: 3,
    independenceSource: "Industry source",
  },
  {
    slug: "capitalism",
    name: "Capitalism",
    type: "economics",
    summary: "An economic system based on private ownership of the means of production, market-based allocation of goods and capital, and production organised for profit within a price system.",
    whyItMatters: "It's the dominant economic system across most of the world today, but the word itself is used to describe everything from near-laissez-faire markets to heavily regulated mixed economies with large public sectors — which is exactly why arguments about 'capitalism' so often talk past each other: people are frequently defending or attacking very different versions of it.",
    facts: [
      "The term does not have one single agreed technical definition among economists — it is used for systems ranging from minimally regulated markets to heavily regulated mixed economies.",
      "Most economies commonly called 'capitalist' combine market allocation with substantial state intervention — regulation, public spending, redistribution — making a 'pure' capitalist or socialist economy largely a theoretical extreme rather than a real-world case.",
    ],
    pros: [
      "Price signals coordinate the decisions of dispersed, independent actors without centralised planning — Friedrich Hayek's 'The Use of Knowledge in Society' (1945) argued this decentralised information-processing is something no central planner can replicate.",
      "Private property and profit incentives are widely credited with rapid gains in living standards since industrialisation — economic historian Deirdre McCloskey's work on the 'Great Enrichment' is a prominent mainstream account of this link.",
      "Competition creates a strong, continuous incentive for innovation and efficiency, since firms that don't improve lose market share to those that do.",
    ],
    cons: [
      "Karl Marx's core critique (Capital, 1867) is that the system structurally requires extracting surplus value from labour — making the conflict between capital and labour inherent to the system, not incidental to it.",
      "Markets left alone don't price in externalities — costs like pollution or resource depletion that fall on third parties or future generations — a standard point in mainstream economics too, made forcefully by Nobel laureate Joseph Stiglitz, not only by critics of capitalism generally.",
      "Karl Polanyi's 'The Great Transformation' (1944) argued that treating land, labour, and money as pure market commodities ('fictitious commodities') is socially destabilising and has historically required constant political intervention to contain the damage.",
      "Capital concentration over time — documented empirically by Thomas Piketty in 'Capital in the Twenty-First Century' (2013) — can produce wealth inequality severe enough to undermine the roughly equal starting conditions markets are supposed to assume.",
    ],
    furtherReading: [
      "Friedrich Hayek, 'The Use of Knowledge in Society' (1945)",
      "Karl Marx, 'Capital, Volume I' (1867)",
      "Karl Polanyi, 'The Great Transformation' (1944)",
      "Thomas Piketty, 'Capital in the Twenty-First Century' (2013)",
    ],
    relationships: [],
    codexLinks: [{ path: ["individual", "finance"], note: "The system your personal financial independence actually operates inside." }],
    evidenceRating: 4,
    independenceSource: "Academic source",
  },
  {
    slug: "identity",
    name: "Identity",
    type: "law",
    summary: "The ability to prove who you are — to yourself and to others — without depending on any single person, company, or government to vouch for you.",
    whyItMatters: "Almost everything else depends on it: opening a bank account, crossing a border, proving you own something, or simply being believed when you say who you are. The more of that proof routes through one login, one document, or one authority, the more a single failure or gatekeeper can lock you out of your own life.",
    facts: [
      "Identity has always rested on more than one form of proof — physical documents, biometrics, and the testimony of people who already know you are independent channels; resilience comes from not relying on just one of them.",
      "Digital identity systems increasingly split identity into three separate roles — issuer, holder, and verifier — precisely so no single party has to see or control everything (see Digital ID).",
      "Losing your only form of identification is one of the most common ways people get locked out of housing, banking, and employment — the risk isn't hypothetical, it's a routine failure mode of relying on a single point of proof.",
    ],
    relationships: [
      { type: "specific form", targetSlug: "digital-identity", note: "The digital-systems version of the same underlying problem." },
    ],
    codexLinks: [{ path: ["individual", "identity"], note: "The Codex node this concept underpins." }],
    evidenceRating: 4,
    independenceSource: "Academic source",
  },
  {
    slug: "digital-identity",
    name: "Digital ID",
    type: "technology",
    summary: "A model for proving facts about yourself online that separates the job into three roles — issuer, holder, and verifier — so no single party has to see or control everything.",
    whyItMatters: "Most digital ID systems people already use quietly collapse issuer and verifier into the same party — the company or government that issued the credential is also the one checking it every time, seeing every place you use it. The issuer/holder/verifier split is the standard alternative model: it's how a physical driver's licence already works (the government issues it, you hold it, a bar checks it without calling the government), and modern digital identity standards are built to replicate that same separation online.",
    facts: [
      "The World Wide Web Consortium's Verifiable Credentials Data Model — a real, published web standard — formalises the three roles: an issuer creates and signs a credential, a holder stores and controls it, and a verifier checks it's valid without needing to contact the issuer directly.",
      "Identity researcher Kim Cameron's 'Laws of Identity' (2005), written while he was Microsoft's Identity Architect, argued that a trustworthy digital identity system must give the holder control over what's disclosed and to whom — a foundational, widely-cited framing for this model.",
      "When issuer and verifier are the same party, that party can see every time and place the credential is used — the three-role split exists specifically to remove that single vantage point.",
    ],
    relationships: [
      { type: "generalises to", targetSlug: "identity", note: "The broader, non-digital version of the same concept." },
    ],
    codexLinks: [{ path: ["individual", "identity"], note: "Where this model applies directly to your own setup." }],
    knowledgeBaseSlug: "digital-id",
    furtherReading: [
      "W3C, 'Verifiable Credentials Data Model' (w3.org/TR/vc-data-model/)",
      "Kim Cameron, 'The Laws of Identity' (2005)",
    ],
    evidenceRating: 4,
    independenceSource: "Academic source",
  },
];

export function getEntity(slug: string): KGEntity | undefined {
  return KG_ENTITIES.find((e) => e.slug === slug);
}

/** Every category, in canonical order, even ones with no entities yet — the World index shows all 13 as clickable, not just populated ones. */
export function entitiesByType(): { type: EntityType; entities: KGEntity[] }[] {
  return ENTITY_TYPES.map((type) => ({ type, entities: KG_ENTITIES.filter((e) => e.type === type) }));
}
