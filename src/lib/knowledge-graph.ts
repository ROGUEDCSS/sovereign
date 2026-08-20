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
  text: string;
}

/**
 * Steelmanned, named-source pros/cons of the category itself, specifically
 * weighed against individual sovereignty — not a generic "is this good"
 * take. Same discipline as KGEntity.pros/cons (Capitalism): real named
 * thinkers, no strawmen, and cons aren't automatically "wins" — a con here
 * is a real tension the reader should weigh, not a verdict. Labeled per
 * the scannable-content standard so a reader can scan the topic before
 * deciding to read the sentence.
 */
export const WORLD_CATEGORY_SOVEREIGNTY: Partial<Record<EntityType, { pros: WorldSovereigntyPoint[]; cons: WorldSovereigntyPoint[] }>> = {
  governance: {
    pros: [
      { label: "Enforceable property rights", text: "Rule of law is what makes ownership real rather than just claimed — John Locke's Second Treatise of Government (1689) argued government exists specifically to secure life, liberty, and property, without which 'ownership' is only as strong as your own ability to personally defend it." },
      { label: "Checks on power", text: "Constitutional limits — separation of powers, elections, judicial review — exist specifically to stop any single actor, including the state itself, from accumulating unchecked control; Montesquieu's The Spirit of the Laws (1748) is the foundational argument for this structure." },
      { label: "Baseline public goods", text: "Currency, courts, basic infrastructure, external defence are what make sustained individual self-reliance possible at all; Thomas Hobbes' Leviathan (1651) argued that without any central authority, no long-term individual project, sovereign or otherwise, survives for long." },
    ],
    cons: [
      { label: "Permission over right", text: "Regulation can turn a natural right into a state-granted permission — needing approval to build, work, or travel converts liberty into a privilege that can be revoked; Friedrich Hayek's The Road to Serfdom (1944) argues that expanding central planning erodes individual liberty by design, not by accident." },
      { label: "Consent-free taxation", text: "Taxation and redistribution move resources you earned without your individual consent to each specific use — Robert Nozick's Anarchy, State, and Utopia (1974) argued redistributive taxation is functionally similar to forced labour, since it claims a portion of your work's proceeds without your agreement to that specific claim." },
      { label: "Surveillance creep", text: "Expanding administrative and surveillance capacity — digital ID, data collection, financial monitoring — concentrates the ability to observe and restrict individual behaviour, even under a democratically elected government; this is the throughline connecting most of the specific entities already mapped under Governance and Law in this Codex." },
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
