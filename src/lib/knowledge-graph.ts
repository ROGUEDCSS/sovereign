export type EvidenceRating = 1 | 2 | 3 | 4 | 5;

export type IndependenceSource =
  | "Government source"
  | "Academic source"
  | "Industry source"
  | "Commercial source"
  | "Expert analysis"
  | "Anecdotal";

export type BlockType = "fact" | "scenario" | "opinion";

export interface ArticleBlock {
  type: BlockType;
  text: string;
}

/** Ordered content within a section, in the order it should render. */
export type ArticleContentBlock =
  | { kind: "p"; text: string }
  | { kind: "subheading"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "diagram"; text: string }
  | { kind: "definitions"; items: { term: string; text: string }[] };

/**
 * A set of related entities that belong in one card, stacked as rows,
 * instead of each getting its own separate card. Use when a fact array
 * would otherwise repeat the same "N. Label: ..." pattern across
 * several consecutive entries — e.g. Issuer / Holder / Verifier.
 */
export interface KGFactGroup {
  items: { label: string; text: string }[];
}

export interface ArticleSection {
  heading: string;
  content: ArticleContentBlock[];
  /**
   * When set, this section is part of a labelled, parallel set (e.g.
   * "PROBLEMS") rather than a step in the essay's sequence. Consecutive
   * sections sharing the same group render as white cards under one
   * shared group heading, with no sequential number — because they
   * aren't a sequence, they're independent items that happen to sit
   * next to each other in the narrative.
   */
  group?: string;
}

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
  finance: [
    "Banks",
    "Central banks",
    "Credit unions",
    "Payment systems",
    "Lending",
    "Mortgages",
    "Credit",
    "Debt",
    "Bonds",
    "Shares",
    "Investment funds",
    "Insurance",
    "Financial markets",
    "Commodities",
    "Digital assets",
    "Monetary systems",
    "Financial regulation",
    "Personal finance",
    "Business finance",
  ],
  technology: [
    "Computing",
    "Artificial intelligence",
    "Software",
    "Hardware",
    "Telecommunications",
    "Internet",
    "Cybersecurity",
    "Robotics",
    "Energy technology",
    "Manufacturing",
    "Agriculture technology",
    "Medical technology",
    "Transportation",
    "Construction technology",
    "Biotechnology",
    "Open-source technology",
    "Emerging technology",
  ],
};

/** Related-category cross-links, from docs/world-taxonomy.md's "Connections" line per category (where specified — inferred where not). */
export const WORLD_CATEGORY_CONNECTIONS: Partial<Record<EntityType, EntityType[]>> = {
  governance: ["law", "finance", "economics", "geography", "organisations", "events", "people"],
  finance: ["economics", "law", "governance", "corporates", "technology"],
  technology: ["science", "corporates", "governance", "law", "economics"],
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
  finance: {
    pros: [
      {
        label: "A place to hold and grow wealth",
        points: [
          "Without banks, safely storing and growing money beyond what you can physically hold is nearly impossible — cash under a mattress doesn't earn interest and doesn't survive a house fire.",
          "Deposit protection schemes cover savings up to a set threshold even if a bank fails, which is a real backstop cash alone doesn't have against theft or disaster.",
          "Access to credit lets you build something — a home, a business — years before you could otherwise pay for it outright, compounding your own effort with someone else's capital.",
        ],
      },
      {
        label: "Payment systems remove barter's limits",
        points: [
          "Without a shared payment system, exchange is limited to what you can directly barter with someone standing in front of you.",
          "Card networks and bank transfers let you transact with strangers across the country or the world in seconds — the infrastructure that makes a modern division-of-labour economy possible at the individual level.",
          "This is what lets you specialise in one thing and still access everything else you need, rather than having to produce it all yourself.",
        ],
      },
      {
        label: "Markets let you own productive assets",
        points: [
          "Shares and bonds let ordinary people own a slice of enterprises and infrastructure they didn't build themselves — a real path to wealth beyond labour income alone.",
          "Regulated markets carry disclosure requirements that give you information you wouldn't have negotiating a private deal on your own.",
          "This is the mechanism that lets savings actually compound over decades, rather than just sitting still losing value to inflation.",
        ],
      },
    ],
    cons: [
      {
        label: "Your bank balance isn't actually your money",
        points: [
          "A bank deposit is legally a claim on the bank, not physical possession of money — it's the bank's liability to you, not an asset sitting in your hand.",
          "If a bank fails, restricts withdrawals, or is instructed to freeze your account, your 'money' becomes inaccessible even though the number still shows in an app.",
          "Deposit protection has limits and doesn't cover every failure mode — it's a backstop, not a guarantee.",
        ],
      },
      {
        label: "Concentration is a single point of failure",
        points: [
          "Most people's entire financial life routes through one or two institutions, by default rather than by decision.",
          "An account freeze, a technical outage, or a compliance flag can cut off access to funds with no immediate recourse, regardless of how much money is actually there.",
          "The more of your financial life concentrated in one place, the more one decision by one institution controls your life.",
        ],
      },
      {
        label: "Digital money can be watched, restricted, or reprogrammed",
        points: [
          "Cashless payments create a detailed transaction record by default — cash doesn't leave that trail.",
          "The technical capability to freeze, block, or condition a digital payment already exists in ordinary commercial banking.",
          "A central bank digital currency would extend that same capability directly to the central bank itself — see the CBDCs entity for what that specifically changes.",
        ],
      },
    ],
  },
  technology: {
    pros: [
      {
        label: "Capability you can carry without institutions",
        points: [
          "A tool you own outright — a hand drill, a solar panel, a properly held cryptographic key — works whether or not any company or government is cooperating that day.",
          "Open-source and widely documented technology in particular can be repaired, understood, and kept running by you, not just by the original vendor.",
          "This is the direct opposite of a subscription or cloud-dependent service: capability that lives with you, not with a server you don't control.",
        ],
      },
      {
        label: "Well-designed systems can protect you by default",
        points: [
          "Cryptography and access-control architecture can be built specifically to limit what any single party can see or do — the issuer/holder/verifier model behind modern digital identity standards is a direct example.",
          "Encryption you control the keys to is one of the few genuinely enforceable privacy protections available to an individual, regardless of what any institution decides later.",
          "Technology that's designed for minimum disclosure — proving a fact about yourself without handing over your whole file — is a real, achievable privacy improvement over older paper-based systems, not just a promise.",
        ],
      },
      {
        label: "Redundancy and resilience become buildable",
        points: [
          "Communication, power generation, and information storage that used to require centralised infrastructure can now be built at household or community scale.",
          "This means a genuine backup — a second way to communicate, generate power, or verify a fact — is achievable by an individual, not just a government or a large company.",
          "The same technology that enables centralisation also enables the opposite: distributed, personally-held capability that doesn't depend on any single institution staying online.",
        ],
      },
    ],
    cons: [
      {
        label: "Convenience often means dependency",
        points: [
          "Most consumer technology is designed to be used, not understood or repaired — when it breaks or the company stops supporting it, your capability disappears with it.",
          "A cloud-dependent tool only works as long as the company behind it keeps the service running, keeps you as a customer, and keeps operating in your country at all.",
          "The more convenient a piece of technology is, the more likely it's quietly outsourcing a capability you used to hold yourself.",
        ],
      },
      {
        label: "The same architecture that protects can also expose",
        points: [
          "Any system capable of minimum-disclosure privacy is, by the same design, capable of the opposite — total disclosure — if the architecture is changed or the rules are reinterpreted.",
          "A device or account you don't fully control can be updated, monitored, or restricted remotely, often without a clear notice that it happened.",
          "Whether a given technology protects you or exposes you depends entirely on who controls the keys, the code, and the update mechanism — not on the technology's label.",
        ],
      },
      {
        label: "Obsolescence and lock-in are business models",
        points: [
          "Proprietary formats, closed ecosystems, and forced updates are often designed specifically to make switching away expensive, not to make the product better.",
          "A skill or tool that only works within one company's ecosystem is a dependency, even if it doesn't feel like one day to day.",
          "The more of your daily capability runs through a small number of technology providers, the more their commercial decisions become decisions about your own life.",
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
  /** A few skimmable, punchy bullet points covering the whole page — for readers who won't read a Deep-dive essay start to finish. Only worth adding once a topic has real sections. */
  tldr?: string[];
  /** Sourced factual statements only — no speculation, no unverified claims about motive or control. A KGFactGroup renders as one card with its items stacked as rows, for a set of related entities that would otherwise repeat the same pattern across separate cards. */
  facts: (string | KGFactGroup)[];
  /** Steelmanned, named-source arguments for — real schools of thought, not strawmen. */
  pros?: string[];
  /** Steelmanned, named-source arguments against — real schools of thought, not strawmen. */
  cons?: string[];
  /** Plain citations (title, author, year) — never a fabricated URL. */
  furtherReading?: string[];
  /**
   * "Who controls it?" — who owns it, operates it, sets the rules, can
   * change the rules, can switch it off, can see the data. Mandatory at
   * Standard tier and up — see docs/topic-framework.md.
   */
  whoControls?: string[];
  /**
   * "What could go wrong?" — misuse, function creep, concentration of
   * power, failure of safeguards, what happens if the assumptions are
   * wrong. Distinct from `cons`: this is about failure modes and power,
   * not the steelmanned opposing argument. Mandatory at Standard tier
   * and up.
   */
  whatCouldGoWrong?: string[];
  /** Laws, technical controls, governance, transparency, accountability, user controls that actually manage the risk. */
  safeguards?: string[];
  /** What's genuinely unresolved or undecided — not a hedge, a real open question. */
  unresolvedQuestions?: string[];
  /** A short, direct SOVEREIGN stance — not "it's evil," not "it's fine because they say so." */
  sovereignPosition?: string;
  /** Numbered questions the reader can run themselves before accepting the thing. Mandatory at Standard tier and up. */
  practicalTest?: string[];
  relationships: KGRelationship[];
  codexLinks?: KGCodexLink[];
  /** Long-form, headed content — rendered above blocks when present. */
  sections?: ArticleSection[];
  /** Short grounding Fact/Scenario/Opinion statements, rendered below sections. */
  blocks?: ArticleBlock[];
  evidenceRating: EvidenceRating;
  independenceSource: IndependenceSource;
  communitySignal?: CommunitySignal;
  sovereignAlignment?: SovereignAlignment;
}

/**
 * Deliberately small. Every entity and every relationship here is grounded
 * in what's already sourced on each entity — this is not
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
    blocks: [
      {
        type: "fact",
        text: "The UN's 2030 Agenda for Sustainable Development contains 17 Sustainable Development Goals (SDGs) and 169 targets, adopted by UN member states in 2015 covering poverty, hunger, health, education, water, energy, work, infrastructure, inequality, cities, consumption, climate, oceans, land, institutions, and international partnerships.",
      },
      {
        type: "fact",
        text: "As of the UN's 2025 progress assessment, only about 35% of assessed targets were on track or making moderate progress; 48% were progressing insufficiently, and 18% had regressed.",
      },
      {
        type: "opinion",
        text: "That gap is the single most important fact about the SDGs that gets left out of most discussion of them, in both directions — by those who treat 2030 as an imminent deadline, and by those who dismiss the whole framework as irrelevant because so little of it has been delivered.",
      },
      {
        type: "fact",
        text: "The SDGs are a voluntary international framework adopted by UN member states, not a binding global law imposing a single lifestyle or policy on individual countries or people. Implementation, where it happens, occurs through each country's own domestic laws and institutions.",
      },
      {
        type: "fact",
        text: "The UN's own material on the 2030 Agenda explicitly identifies artificial intelligence, biotechnology, blockchain, and robotics as technologies being considered in connection with pursuing these goals.",
      },
      {
        type: "opinion",
        text: "Many individual initiatives under this framework are, on their own, understandable and even uncontroversial. The thing worth actually paying attention to is not any single programme, but the cumulative direction: an increasingly interconnected human infrastructure of digital identity, data, and centralised services, built one reasonable-sounding initiative at a time.",
      },
      {
        type: "scenario",
        text: "Given current progress rates, 2030 is likely to function as a political milestone, a measurement point, and a period of intensified policy activity — rather than the moment every objective is achieved. What happens after 2030, for the targets that are missed, is not yet decided.",
      },
    ],
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
    evidenceRating: 4,
    independenceSource: "Government source",
  },
  {
    slug: "cbdcs",
    name: "CBDCs",
    type: "finance",
    subsection: "Monetary systems",
    summary: "Central Bank Digital Currencies — digital money issued directly by a central bank, rather than a claim on a commercial bank the way an ordinary bank deposit is.",
    whyItMatters: "Cash is money you possess directly — no permission needed to hand someone a note. A bank deposit is already a claim on a commercial bank, not money in hand. A CBDC would create a third kind of money: a direct digital liability of the central bank itself. Whether that's a genuine public option or a new point of control depends entirely on the architecture — who can see it, who can block it, and whether it can be programmed.",
    facts: [
      "The RBA describes a retail CBDC as, for the most part, a digital version of cash. Australia does not currently have a retail CBDC, and the RBA says no decision has been made to introduce one.",
      "The RBA is currently more focused on exploring wholesale CBDC and tokenised financial market applications — for banks and financial institutions — than a retail CBDC for ordinary people.",
      "The European Central Bank has explicitly stated its proposed digital euro would not be programmable money and would not restrict what goods or services people could buy — the fact that a CBDC could technically be programmed does not mean a specific CBDC is.",
      "Central banks, including through BIS-coordinated research, are actively investigating offline CBDC payment capability, and identify privacy and data governance as major open design questions.",
      "BIS research specifically identifies potential bank disintermediation — deposits moving faster into CBDC during periods of banking stress — as a real risk to weigh, not just a privacy question.",
    ],
    relationships: [
      { type: "issued by", targetSlug: "reserve-bank-of-australia", note: "Australia's own central bank, currently focused on wholesale applications, not retail." },
      { type: "researched via", targetSlug: "bank-for-international-settlements", note: "Coordinates cross-border CBDC research, including programmability and privacy design." },
      { type: "compounds with", targetSlug: "digital-identity", note: "Linking a CBDC to a universal digital ID is where the two technologies become far more consequential together than either is alone." },
    ],
    codexLinks: [{ path: ["individual", "finance"], note: "Central bank digital currency design directly affects personal financial resilience and privacy." }],
    whoControls: [
      "The issuing central bank sets the architecture — the RBA for Australia — but the wallet, verification, and transaction infrastructure can also involve commercial banks and private technology providers.",
      "Whoever operates the ledger can, in principle, see transaction data, block a transaction, or freeze a wallet — the specific answer depends entirely on the system's design, not on CBDCs in general.",
      "Government sets the legal rules the system runs under, and can change them — the same institution that writes today's safeguards can rewrite them later.",
    ],
    whatCouldGoWrong: [
      "Function creep: a system that starts as 'digital cash' expands stepwise into tax collection, benefits administration, and transaction restrictions — each expansion individually justifiable, the cumulative result very different from the original design.",
      "Linking to Digital ID: if a CBDC becomes interoperable with a universal digital identity, financial activity becomes attachable to a person's broader profile — the two technologies are far more consequential combined than either is alone.",
      "Concentration without cash: if physical cash is allowed to disappear and CBDC becomes the dominant form of money, every property of the digital system — surveillance, programmability, freeze power — stops being optional and becomes unavoidable.",
    ],
    safeguards: [
      "Cash preserved as a legally protected parallel option, not phased out.",
      "CBDC adoption voluntary, not a condition of participating in ordinary life.",
      "Independent due process and appeal before a wallet is frozen or a transaction blocked.",
      "Programmability, if it exists at all, disclosed and limited by law — not a silent technical capability.",
    ],
    unresolvedQuestions: [
      "Whether Australia introduces a retail CBDC at all — the RBA currently says no decision has been made, and its active work is weighted toward wholesale and tokenised markets, not a retail product.",
      "What privacy architecture any eventual retail CBDC would use — the RBA and BIS identify this as a major open design question, not a settled answer.",
    ],
    sovereignPosition: "CBDCs are neither inherently safe nor inherently dangerous — the architecture is what matters. A CBDC with strong privacy protection, no expiry, no spending restrictions, and cash preserved alongside it is a fundamentally different object from one without those features. The strongest protection isn't trusting that today's institutions will behave well; it's designing the system so that even a government acting badly has limited ability to abuse it.",
    practicalTest: [
      "Is cash protected, or does the digital form eventually replace it?",
      "Is it voluntary — can you refuse it without being excluded from ordinary life?",
      "Can the money be programmed, and if so, who has that power?",
      "Can a wallet be frozen, and under what circumstances?",
      "Who sees your transactions — the central bank, government, commercial banks, private companies?",
      "Can transactions be linked to a digital identity?",
      "Can the system operate offline, when the network fails?",
      "Is there independent due process and appeal before money is blocked or taken?",
      "Would you accept the same design under a government you don't trust?",
    ],
    sections: [
      {
        heading: "Central bank digital currencies",
        content: [
          { kind: "p", text: "What is a CBDC?" },
          { kind: "p", text: "A Central Bank Digital Currency, or CBDC, is digital money issued directly by a country's central bank." },
          { kind: "p", text: "In Australia, that would mean digital money issued by the Reserve Bank of Australia, rather than money represented by a balance at a commercial bank." },
          { kind: "p", text: "The simplest description is: a CBDC is essentially digital central-bank money for the public." },
          { kind: "p", text: "The RBA describes a retail CBDC as, for the most part, a digital version of cash. Australia does not currently have a retail CBDC, and the RBA says no decision has been made to introduce one." },
        ],
      },
      {
        heading: "Money we have today",
        content: [
          { kind: "p", text: "There are already two fundamentally different types of Australian money available to ordinary people." },
          {
            kind: "definitions",
            items: [
              { term: "Cash", text: "Issued by the RBA. You hold it directly. No commercial bank is required for a cash transaction." },
              { term: "Bank deposits", text: "The money in your bank account. Your bank owes you that money. It is commercial-bank money, not money issued directly to you by the RBA." },
            ],
          },
          { kind: "p", text: "CBDC would create a third possibility: digital money that is a direct liability of the central bank." },
          { kind: "p", text: "That is one of the fundamental differences between a CBDC and the money in your normal bank account." },
        ],
      },
      {
        heading: "Why would we want one?",
        content: [
          { kind: "p", text: "There are legitimate reasons. Payments are becoming increasingly digital. Cash is declining in everyday use." },
          { kind: "p", text: "Central banks are therefore asking: if people stop using physical central-bank money, should there also be a digital form of central-bank money available to them?" },
          { kind: "p", text: "Possible benefits include:" },
          { kind: "list", items: ["Faster payments", "More competition", "Greater payment resilience", "New forms of digital commerce", "Reduced settlement risk", "Potentially greater financial inclusion", "A public alternative to privately issued digital money"] },
          { kind: "p", text: "These are genuine arguments." },
        ],
      },
      {
        heading: "CBDC is not Bitcoin",
        content: [
          { kind: "p", text: "They are fundamentally different." },
          {
            kind: "definitions",
            items: [
              { term: "Bitcoin", text: "Decentralised. No central bank issues it. No government controls the Bitcoin network." },
              { term: "CBDC", text: "Centralised or centrally governed. Issued by a central bank. Created within a legal and institutional framework controlled by government." },
            ],
          },
          { kind: "p", text: "So: Bitcoin attempts to remove the central authority from money. CBDC puts central-bank money into a digital form." },
        ],
      },
      {
        heading: "CBDC is also not your banking app",
        content: [
          { kind: "p", text: "This distinction is important. You already use digital money every day — you tap your card, transfer money, use Apple Pay, pay a bill online." },
          { kind: "p", text: "None of that means you already have a CBDC. Your bank balance is generally a claim on a commercial bank. A CBDC would be a claim on the central bank." },
        ],
      },
      {
        heading: "Retail vs wholesale CBDC",
        content: [
          { kind: "p", text: "There are two very different concepts." },
          {
            kind: "definitions",
            items: [
              { term: "Retail CBDC", text: "For ordinary people and businesses — think digital cash. You could potentially use it to buy groceries, pay someone, or make online purchases." },
              { term: "Wholesale CBDC", text: "For banks and other financial institutions — think digital central-bank settlement money for the financial system." },
            ],
          },
          { kind: "p", text: "The RBA is currently much more interested in exploring wholesale applications than a retail CBDC. It has not decided to introduce either." },
        ],
      },
      {
        heading: "The big question: who controls it?",
        content: [
          { kind: "p", text: "This is where the Sovereign discussion begins." },
          { kind: "p", text: "Imagine you have $1,000 of cash. You possess it. You can give it to someone. You can spend it. You don't need permission from a central computer every time you hand someone a $20 note." },
          { kind: "p", text: "Now imagine $1,000 of CBDC. The money exists digitally. Therefore the system has to define:" },
          { kind: "list", items: ["Who operates the wallet?", "Who verifies transactions?", "What information is recorded?", "Who can access that information?", "Can transactions be blocked?", "Can money be frozen?", "Can money be returned?", "Can money expire?", "Can conditions be attached to its use?"] },
          { kind: "p", text: "These aren't theoretical questions. They are design questions." },
        ],
      },
      {
        heading: "The programmability question",
        content: [
          { kind: "p", text: "This is probably the most misunderstood part of CBDCs. A digital payment system can potentially contain rules." },
          { kind: "p", text: "For example, \"transfer $500 to John\" is a simple payment. But a programmable payment could theoretically say \"transfer $500 to John only if condition X is satisfied.\"" },
          { kind: "p", text: "That can be extremely useful. For example:" },
          {
            kind: "definitions",
            items: [
              { term: "Escrow", text: "Money is released when a house settlement occurs." },
              { term: "Government payments", text: "A payment could automatically be distributed when eligibility is established." },
              { term: "Business transactions", text: "Payment occurs automatically when goods are delivered." },
            ],
          },
          { kind: "p", text: "There are legitimate uses. The concern is what happens if programmability moves from \"make payments execute automatically\" to \"control what the money can be used for.\"" },
        ],
      },
      {
        heading: "The programmable money danger",
        content: [
          { kind: "p", text: "Imagine your government gives you $1,000 but the system says: you may only spend it on approved food. Or: you must spend it before 30 June. Or: you cannot spend it outside your region. Or: you cannot purchase particular products. Or: your money becomes unavailable if condition X occurs." },
          { kind: "p", text: "Now something fundamental has changed. It isn't simply money. It is money + rules." },
          { kind: "p", text: "That is where the Sovereign concern becomes very serious." },
        ],
      },
      {
        heading: "Important: this does not mean all CBDCs are programmable like this",
        content: [
          { kind: "p", text: "This distinction matters. The fact that something could technically be programmed does not mean a particular CBDC will be." },
          { kind: "p", text: "For example, the European Central Bank has explicitly said its proposed digital euro would not be programmable money and would not restrict what goods or services people could buy." },
          { kind: "p", text: "So Sovereign should never say \"CBDCs automatically mean programmable money.\" The correct question is: \"What rules does this particular CBDC allow, and who has the authority to change those rules?\"" },
        ],
      },
      {
        heading: "The surveillance question",
        content: [
          { kind: "p", text: "Cash has a powerful property: you can transact without creating a digital record held by your bank. Digital money is different." },
          { kind: "p", text: "A CBDC system must determine what transaction information exists and who can see it. That creates a fundamental privacy question: can the government see what you spend your money on?" },
          { kind: "p", text: "The answer depends entirely on the architecture and legal framework. CBDC research by the BIS specifically identifies privacy and data governance as major design issues. Research has also found that privacy protection materially affects people's willingness to use CBDCs." },
        ],
      },
      {
        heading: "The linking problem",
        content: [
          { kind: "p", text: "Now connect CBDC to the Digital ID discussion. Imagine:" },
          { kind: "diagram", text: "DIGITAL ID\n     │\n     ▼\n    CBDC\n     │\n     ├── BANKING\n     ├── PURCHASES\n     ├── TAX\n     ├── BENEFITS\n     ├── LICENCES\n     ├── TRAVEL\n     └── OTHER SERVICES" },
          { kind: "p", text: "If these systems become interoperable and linkable, financial activity could potentially become associated with a person's broader digital identity." },
          { kind: "p", text: "That is where Digital ID + CBDC becomes much more consequential than either technology considered separately." },
        ],
      },
      {
        heading: "The freeze button",
        content: [
          { kind: "p", text: "Consider a traditional bank account. A bank can already freeze an account in certain circumstances under existing laws." },
          { kind: "p", text: "A CBDC could introduce another layer: who has the technical ability to stop a CBDC transaction? And: who can freeze the wallet? And: under what circumstances? And: how quickly? And: who reviews the decision? And: can the individual appeal?" },
          { kind: "p", text: "These questions should be answered before the system exists, not after." },
        ],
      },
      {
        heading: "The function creep problem",
        content: [
          { kind: "p", text: "This is the same danger identified with Digital ID. A CBDC begins as \"digital cash.\" Then it becomes useful for government payments. Then: tax collection. Then: benefits. Then: identity verification. Then: age verification. Then: anti-money-laundering controls. Then: restrictions on particular transactions." },
          { kind: "p", text: "Each individual expansion might have a justification. Eventually the system could become something very different from the original concept. That is function creep." },
        ],
      },
      {
        heading: "The cash question",
        content: [
          { kind: "p", text: "This is one of the most important safeguards. If CBDC is introduced alongside cash, people retain a physical alternative." },
          { kind: "p", text: "If cash disappears and CBDC becomes the dominant form of money, the characteristics of the digital system become much more important." },
          { kind: "p", text: "Australia's current RBA position is that a retail CBDC would not replace cash. The RBA says it would continue to provide cash. That is an important distinction." },
        ],
      },
      {
        heading: "The offline question",
        content: [
          { kind: "p", text: "This is particularly relevant to Sovereign. What happens when:" },
          { kind: "list", items: ["The internet goes down?", "The electricity goes down?", "Your phone dies?", "The network is unavailable?", "A natural disaster occurs?", "Telecommunications fail?"] },
          { kind: "p", text: "A CBDC that only works when the entire digital infrastructure works is not particularly resilient." },
          { kind: "p", text: "Central banks are actively researching offline CBDC payments for precisely these reasons, including resilience and privacy. For Sovereign, the question is even simpler: can you still use your money when the network disappears?" },
        ],
      },
      {
        heading: "The banking system problem",
        content: [
          { kind: "p", text: "CBDCs could also change the relationship between people and commercial banks. Today, much of the money people use exists as commercial-bank deposits." },
          { kind: "p", text: "If people could move large amounts of their money directly into central-bank digital money, commercial banks could lose deposits. That could affect:" },
          { kind: "list", items: ["Bank funding", "Lending", "Mortgages", "Credit", "Financial stability"] },
          { kind: "p", text: "BIS research specifically identifies potential disintermediation and the possibility of faster movement of deposits into CBDC during periods of banking stress. So this isn't just a privacy issue — it could fundamentally change the financial system." },
        ],
      },
      {
        heading: "The government abuse question",
        content: [
          { kind: "p", text: "This is where we need to separate today's government from future governments. A government might introduce a CBDC with excellent safeguards. But technology lasts much longer than political administrations." },
          { kind: "p", text: "The question is: would you give the same powers to every government that might exist 20 or 50 years from now? That is the Sovereign test." },
        ],
      },
      {
        heading: "The worst-case architecture",
        content: [
          { kind: "p", text: "Imagine:" },
          { kind: "diagram", text: "                 DIGITAL ID\n                     │\n                     ▼\n                    CBDC\n                     │\n          ┌──────────┼──────────┐\n          │          │          │\n        MONEY      IDENTITY   DATA\n          │          │          │\n          └──────────┼──────────┘\n                     │\n                     ▼\n                 PERMISSION\n                     │\n                     ▼\n              ACCESS TO LIFE" },
          { kind: "p", text: "Now imagine: your identity determines your access to money. Your money determines what you can buy. Your behaviour determines your eligibility. Your eligibility determines your access." },
          { kind: "p", text: "That would be an extraordinarily powerful system. It does not mean CBDCs inevitably become this. It means a system capable of becoming this must have extremely strong protections against it." },
        ],
      },
      {
        heading: "The Sovereign CBDC test",
        content: [
          { kind: "p", text: "Before accepting a CBDC, ask:" },
          {
            kind: "definitions",
            items: [
              { term: "1. Is cash protected?", text: "Can people continue using physical money?" },
              { term: "2. Is it voluntary?", text: "Can people refuse CBDC without being excluded from society?" },
              { term: "3. Can money be programmed?", text: "If yes, who can program it?" },
              { term: "4. Can money expire?", text: "Can someone make your money disappear because you didn't spend it?" },
              { term: "5. Can transactions be blocked?", text: "Who has that power?" },
              { term: "6. Can wallets be frozen?", text: "Under what circumstances?" },
              { term: "7. Who sees your transactions?", text: "The central bank? Government? Banks? Private companies?" },
              { term: "8. Can transactions be linked to Digital ID?", text: "If so, how?" },
              { term: "9. Is there a universal transaction history?", text: "Who can access it?" },
              { term: "10. Can the system operate offline?", text: "What happens when the network fails?" },
              { term: "11. Can the government change the rules?", text: "How?" },
              { term: "12. Can future governments expand the system?", text: "What prevents function creep?" },
              { term: "13. Is there due process?", text: "Can money be taken or blocked without a fair hearing?" },
              { term: "14. Is there an independent appeal?", text: "Who can overrule the government?" },
              { term: "15. Can you exit?", text: "Can you continue functioning without it?" },
            ],
          },
        ],
      },
      {
        heading: "The Sovereign position",
        content: [
          { kind: "p", text: "Sovereign shouldn't say \"CBDCs are evil.\" That is too simplistic. Nor: \"CBDCs are perfectly safe.\" That is equally simplistic." },
          { kind: "p", text: "The proper question is: what does the architecture allow? And: who controls it? And: what prevents that power being expanded?" },
          { kind: "p", text: "A CBDC could potentially provide safer digital public money, greater payment resilience and useful new capabilities. It could also become dangerous if combined with: universal Digital ID + centralised tracking + programmable money + mandatory adoption + removal of cash + weak due process." },
          { kind: "p", text: "That combination is where the real Sovereign concern lies. Money should be a means of exchange — not a mechanism for controlling behaviour." },
          { kind: "p", text: "And the strongest protection is not trusting that today's institutions will always behave well. It is designing the system so that even a government acting badly has limited ability to abuse it." },
          { kind: "p", text: "Australia currently has no retail CBDC. The RBA says no decision has been made to introduce one, and its current work is also focused heavily on wholesale digital money and tokenised financial markets." },
        ],
      },
    ],
    blocks: [
      {
        type: "fact",
        text: "The Reserve Bank of Australia currently states that no decision has been made to issue a retail CBDC, and that cash would not automatically be replaced by one if it were introduced.",
      },
      {
        type: "fact",
        text: "Central banks worldwide, coordinated in part through the Bank for International Settlements, are actively researching CBDC technology — including APIs, interoperability, offline payments, biometric authentication devices, privacy-preserving designs, and programmability.",
      },
      {
        type: "opinion",
        text: "'CBDCs are bad' is not a useful position — it treats every possible design as identical. A CBDC with strong privacy protection, no expiry, no spending restrictions, and cash preserved alongside it is a very different object from one without those features.",
      },
      {
        type: "fact",
        text: "The design choices that determine the real-world effect of any digital money system are: whether cash remains legally protected, whether the digital form is mandatory, who can see transaction data, whether transactions can be restricted, and whether the money itself can be programmed or conditioned.",
      },
      {
        type: "scenario",
        text: "A digital money system could, in principle, be designed to expire unspent balances, restrict purchases by category, or apply different rules to different people. No major central bank has committed to this today — it is a possible design path worth watching for, not a current fact.",
      },
      {
        type: "opinion",
        text: "The honest response to CBDCs is not fear or dismissal — it's five specific questions, asked of any real proposal, before forming a view on it.",
      },
    ],
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
    subsection: "Cybersecurity",
    summary: "A model for proving facts about yourself online that separates the job into three roles — issuer, holder, and verifier — so no single party has to see or control everything.",
    tldr: [
      "Today, Digital ID proves who you are.",
      "The extreme version can go further.",
      "It can determine what you are allowed to do.",
      "You try to open a bank account.",
      "The system checks your Digital ID.",
      "You try to access a government service.",
      "The system checks your Digital ID.",
      "You try to buy something restricted.",
      "The system checks your Digital ID.",
      "Your identity has changed from proof of who you are into a system that controls what you can do.",
    ],
    whyItMatters: "Most digital ID systems people already use quietly collapse issuer and verifier into the same party — the company or government that issued the credential is also the one checking it every time, seeing every place you use it. The issuer/holder/verifier split is the standard alternative model: it's how a physical driver's licence already works (the government issues it, you hold it, a bar checks it without calling the government), and modern digital identity standards are built to replicate that same separation online.",
    facts: [
      "For most of history, identity was physical — a face people recognised, a signed paper, a passport someone could hold and check.",
      "Then life moved onto a screen. A website can't look at your face or check a signature.",
      "Digital ID exists to fill that gap. Same old idea — prove who you are — rebuilt for a world where most of what you do happens where no one can physically see you.",
      "The standard used for Digital ID is the W3C's Verifiable Credentials Data Model. It has three parts.",
      {
        items: [
          { label: "1. Issuer", text: "The organisation that certifies a fact about you." },
          { label: "Example", text: "The government confirms you're over 18." },
          { label: "2. Holder", text: "You, the credential holder. You decide when to show it. " },
          { label: "3. Verifier", text: "Whoever is asking for proof." },
          { label: "Example", text: "A shop checking your age." },
        ],
      },
      {
        items: [
          { label: "RULE", text: "These 3 entities must never be the same. They must be different. Always." },
          { label: "Example", text: "A shop (Verifier) checks your ID. It never calls the government (Issuer). The government never learns you were at the shop. Only you, the Holder, know both things happened." },
          { label: "TEST", text: "There has to be clarity on what gets disclosed and to whom. If there isn't, the system is not trustworthy. Full stop." },
          { label: "Example", text: "The government is both Issuer and Verifier. Now it can see every time and place you use your ID. That builds a movement log of your life. The three-part split exists to stop this." },
        ],
      },
    ],
    relationships: [
      { type: "generalises to", targetSlug: "identity", note: "The broader, non-digital version of the same concept." },
    ],
    codexLinks: [{ path: ["individual", "identity"], note: "Where this model applies directly to your own setup." }],
    furtherReading: [
      "W3C, 'Verifiable Credentials Data Model' (w3.org/TR/vc-data-model/)",
      "Kim Cameron, 'The Laws of Identity' (2005)",
    ],
    whoControls: [
      "The government is the Issuer, and can revoke what it issued, i.e. a government credential.",
      "The wallet operator controls whether you can open and use your own credentials. In Australia, that's myID, or a private provider accredited under the Digital ID Act 2024.",
      "The verifier decides what it asks for. A good system limits that to a yes/no answer. Nothing forces it to.",
    ],
    whatCouldGoWrong: [
      "Function creep: 'ID for government services' expands into banking, age checks, benefits, travel — one reasonable step at a time — until permission to do ordinary things routes through one credential nobody explicitly signed up for.",
      "Collapsed roles: issuer and verifier become the same party, or link data through a shared identity. Either way, they can track you without asking your permission again. The three-role split exists to stop exactly this.",
      "Revocation without due process: a credential gets switched off electronically, and every permission attached to it goes with it. No appeal, no human review — a system error becomes a person locked out of banking, travel, or work, and no one has to explain why.",
    ],
    safeguards: [
      "The system is built so a verifier only ever gets a yes or no. Never your name, your address, or your date of birth.",
      "Using your ID doesn't automatically create a record of every place and time you used it.",
      "Before anyone can suspend or cancel your credential, you get a real appeal — reviewed by someone independent, not the same body that made the decision.",
      "You can still say no. A non-digital way to prove who you are has to stay available.",
    ],
    unresolvedQuestions: [
      "How many essential services will ultimately route through the same identity layer in Australia — the Digital ID Act's stated framework is voluntary, but the trajectory of adoption isn't yet settled.",
      "Which private organisations end up operating identity or wallet infrastructure under public-private partnerships, and what oversight applies to them.",
    ],
    sovereignPosition: "Digital identity is a genuine privacy improvement over the old system when it's built correctly — proving 'over 18: yes' without disclosing a full driver's licence is strictly better than the paper alternative. The danger isn't the technology; it's what happens if identity becomes the gateway to everyday life, and if identity and permission are allowed to merge into one system. Identity should belong to the individual — it should never become the government's permission slip for living.",
    practicalTest: [
      "Who knows when you use your ID, and what do they actually see?",
      "Who can connect your identity across different services?",
      "Who can switch your identity off, and what happens if they get it wrong?",
      "Is there a non-digital alternative, or is this now mandatory to participate in ordinary life?",
      "Would you accept this system under every future government, not just today's?",
    ],
    sections: [
      {
        heading: "The potential dangers of Digital ID",
        content: [
          { kind: "p", text: "Digital ID is not automatically dangerous." },
          { kind: "p", text: "Digital ID can make life easier." },
          { kind: "p", text: "You can prove who you are without carrying documents. You may be able to prove that you are over 18 without showing your date of birth. You may be able to access government services without repeatedly providing the same information." },
          { kind: "p", text: "The danger is not the technology itself." },
          { kind: "p", text: "The danger is what happens if digital identity becomes the gateway to everyday life." },
          { kind: "p", text: "The central question is:" },
          { kind: "p", text: "Who controls your digital identity, what can they see, and what can they prevent you from doing?" },
        ],
      },
      {
        heading: "Degrees of Digital ID — the boiling frog problem",
        content: [
          { kind: "p", text: "A frog dropped into boiling water jumps out immediately. The same frog in water that's heated slowly, one degree at a time, won't notice until it's too late to jump. That's not really a claim about frog biology — it's a warning about anything that changes gradually enough that no single step looks alarming." },
          { kind: "p", text: "Digital ID is exactly this kind of thing. No system rolls out as a \"total control identity system\" on day one. Every step looks reasonable on its own: a login here, a convenience there, one more service added to the same credential. The danger isn't any single step. It's the direction, and how far it's already travelled by the time anyone asks." },
          { kind: "p", text: "So the right question was never \"do we have Digital ID, yes or no?\" It's: how much power does the identity system actually have over the individual, right now? That's a question of degree, not category — and it helps to see the whole ladder at once, not just the rung you happen to be standing on." },
          {
            kind: "definitions",
            items: [
              { term: "Level 1 — Situational ID", text: "Identity is requested only for a specific situation — proving you're over 18 to buy alcohol, for example. The shop doesn't need your entire history. Effect on the individual: low." },
              { term: "Level 2 — Time-and-place ID", text: "Identity is required because of a particular location, event, or period — entering a secure building, crossing a border, attending a restricted event. Once the situation ends, so does the requirement. Effect: low to moderate." },
              { term: "Level 3 — Persistent ID", text: "Instead of presenting different documents each time, one recognised digital identity follows you between transactions. Convenience increases sharply — and so does the ability to connect those transactions together. Effect: moderate." },
              { term: "Level 4 — Pervasive ID", text: "Digital ID becomes normal everywhere — banking, government, employment, healthcare, education, telecommunications, travel, commerce. You may still technically have a choice, but ordinary life increasingly expects you to use the system. Identity becomes infrastructure. Effect: high." },
              { term: "Level 5 — Linked ID", text: "Your identity becomes the common key connecting different systems — bank, tax, health — so you can be cross-referenced across all of them at once. Substantially more powerful than a digital driver's licence. Effect: very high." },
              { term: "Level 6 — Behavioural ID", text: "The system no longer just knows who you are; it knows what you've been doing — where you've been, what you've bought, who you've interacted with. The danger isn't one organisation seeing everything — it's that separate datasets can be combined into one behavioural history. Effect: very high." },
              { term: "Level 7 — Permission ID", text: "The major conceptual jump: the system stops asking \"who are you?\" and starts asking \"are you allowed to do this?\" Your ID becomes an access-control mechanism, not just proof. Effect: extreme." },
              { term: "Level 8 — Conditional ID", text: "Permissions now depend on conditions attached to your identity — age, licence status, eligibility, location, payment status, regulatory compliance. Your identity starts carrying rules, not just facts. Effect: extreme." },
              { term: "Level 9 — Programmable Identity", text: "Those conditions can change your permissions automatically, without anyone deciding to intervene: a rule evaluates, and access is granted or removed. No human has to act — the system just executes. Effect: extreme." },
              { term: "Level 10 — Total Identity System", text: "The extreme, hypothetical end of the spectrum: your digital identity becomes the master credential for money, work, healthcare, travel, housing, and commerce alike — no longer something you merely possess, but the mechanism through which the system administers your access to society. Effect: maximum." },
            ],
          },
          { kind: "p", text: "Most real systems sit somewhere in the low-to-moderate range today. The point of the ladder isn't to claim any particular system is already at Level 10 — it's to make the direction of travel visible, one degree at a time, so a reasonable-sounding step 6 doesn't get evaluated in isolation from steps 1 through 5." },
        ],
      },
      {
        heading: "The old system",
        content: [
          { kind: "p", text: "Traditionally, you prove who you are using separate things:" },
          { kind: "list", items: ["Passport", "Driver licence", "Birth certificate", "Bank account", "Medicare card", "Membership card", "Paper certificate", "Physical signature"] },
          { kind: "p", text: "These systems are inconvenient." },
          { kind: "p", text: "But they are also fragmented." },
          { kind: "p", text: "Your driver's licence does not automatically know what you bought at the supermarket." },
          { kind: "p", text: "Your supermarket doesn't automatically know your medical history." },
          { kind: "p", text: "Your bank doesn't automatically know which books you borrowed from the library." },
          { kind: "p", text: "There are many separate systems." },
        ],
      },
      {
        heading: "Digital ID changes the model",
        content: [
          { kind: "p", text: "Digital ID can potentially connect many services to one digital identity. For example:" },
          {
            kind: "diagram",
            text: "                 YOUR DIGITAL ID\n                       │\n       ┌───────────────┼───────────────┐\n       │               │               │\n     BANK            HEALTH         GOVERNMENT\n       │               │               │\n    EMPLOYER         TRAVEL          RETAIL\n       │               │               │\n       └───────────────┼───────────────┘\n                       │\n                  ONE PERSON",
          },
          { kind: "p", text: "This can be extremely convenient." },
          { kind: "p", text: "It can also create an enormous concentration of power." },
        ],
      },
      {
        heading: "This can actually be better than the old system",
        content: [
          { kind: "p", text: "Imagine buying alcohol." },
          { kind: "subheading", text: "Old system" },
          { kind: "p", text: "You show your driver's licence. The shop can see:" },
          { kind: "list", items: ["Your name", "Photograph", "Date of birth", "Address", "Licence number"] },
          { kind: "p", text: "But the shop only needed to know: are you over 18?" },
          { kind: "subheading", text: "Better digital system" },
          { kind: "p", text: "Your digital wallet simply proves: OVER 18: YES. Nothing else is disclosed." },
          { kind: "p", text: "That is a genuine privacy improvement." },
        ],
      },
      {
        heading: "The universal ID problem",
        group: "PROBLEMS",
        content: [
          { kind: "p", text: "Imagine your digital ID becomes necessary for:" },
          { kind: "list", items: ["Banking", "Employment", "Healthcare", "Education", "Travel", "Government services", "Buying certain products", "Renting a house", "Running a business", "Social media", "Telecommunications"] },
          { kind: "p", text: "Each individual requirement might sound reasonable. But eventually: your digital ID becomes the key to ordinary life. That creates a single point of control." },
        ],
      },
      {
        heading: "Function creep",
        group: "PROBLEMS",
        content: [
          { kind: "p", text: "This is one of the biggest risks. A system starts with: \"Digital ID for government services.\"" },
          { kind: "p", text: "Then somebody says: \"It would be convenient for banking.\" Then: \"Let's use it for age verification.\" Then: \"Let's use it for online safety.\" Then: \"Let's use it for benefits.\" Then: \"Let's use it for travel.\"" },
          { kind: "p", text: "Each expansion can be justified individually. Eventually the system does something completely different from what it was originally created to do. This is called function creep." },
        ],
      },
      {
        heading: "Public + private partnerships",
        group: "PROBLEMS",
        content: [
          { kind: "p", text: "Government does not have to operate every part of the system. Private companies can potentially become:" },
          { kind: "list", items: ["Identity providers", "Wallet providers", "Banks", "Telecommunications companies", "Technology providers", "Healthcare providers", "Employers", "Retailers", "Platforms"] },
          { kind: "p", text: "This can make the system more useful. It can also make the system much bigger. The question becomes: how many organisations can use the identity, and how much information can be connected through it?" },
        ],
      },
      {
        heading: "The linking problem",
        group: "PROBLEMS",
        content: [
          { kind: "p", text: "Imagine: your bank knows your financial activity. Your employer knows your employment. Your telecommunications company knows your account. Government knows your tax information. A healthcare provider knows your healthcare information. A retailer knows your purchases." },
          { kind: "p", text: "A digital identity system could potentially make these systems easier to connect. You don't necessarily need one giant database — you can have many databases that are linked through a common identity. That can be just as powerful." },
        ],
      },
      {
        heading: "The surveillance problem",
        group: "PROBLEMS",
        content: [
          { kind: "p", text: "A particularly important question is: does the issuer know every time you use your identity?" },
          { kind: "p", text: "If the answer is yes, your identity could potentially create a record of where you authenticate. That could reveal:" },
          { kind: "list", items: ["Where you go", "Which services you use", "Which organisations you interact with", "When you interact with them", "Potentially patterns of behaviour"] },
          { kind: "p", text: "A good system should minimise or prevent this type of tracking." },
        ],
      },
      {
        heading: "The profiling problem",
        group: "PROBLEMS",
        content: [
          { kind: "p", text: "Information from different systems can potentially be combined to create a profile. For example: financial behaviour + location + purchases + employment + services used." },
          { kind: "p", text: "The result could become a detailed picture of an individual. That creates the possibility of profiling people according to their behaviour." },
        ],
      },
      {
        heading: "The social-credit problem",
        group: "PROBLEMS",
        content: [
          { kind: "p", text: "The extreme version is simple:" },
          { kind: "diagram", text: "YOUR BEHAVIOUR\n       ↓\nYOUR PROFILE\n       ↓\nYOUR SCORE\n       ↓\nYOUR ACCESS" },
          { kind: "p", text: "Instead of saying \"you are forbidden to do this,\" a system could potentially say \"your digital identity does not qualify.\" That could affect:" },
          { kind: "list", items: ["Banking", "Travel", "Benefits", "Employment", "Purchases", "Services", "Licences"] },
          { kind: "p", text: "This is why identity and permission must remain separate." },
        ],
      },
      {
        heading: "The revocation problem",
        group: "PROBLEMS",
        content: [
          { kind: "p", text: "A physical document is usually something you possess. A digital credential can be checked electronically. That is useful. But it raises an important question: who can turn it off? And: what happens if they get it wrong?" },
          { kind: "p", text: "A properly designed system needs:" },
          { kind: "list", items: ["Due process", "Appeals", "Human review", "Correction mechanisms", "Independent oversight", "Alternative ways to prove identity"] },
          { kind: "p", text: "Otherwise, a mistake in a digital identity system could become a mistake in your ability to participate in society." },
        ],
      },
      {
        heading: "The \"one switch\" problem",
        group: "PROBLEMS",
        content: [
          { kind: "p", text: "Imagine a future where one digital identity controls access to: money + travel + work + healthcare + government + communication." },
          { kind: "p", text: "Then ask: what happens if that identity stops working? It could be:" },
          { kind: "list", items: ["Hacked", "Incorrectly suspended", "Lost", "Locked", "Revoked", "Technically unavailable", "Inaccessible because the system is offline"] },
          { kind: "p", text: "The more things connected to one identity, the greater the consequences of failure." },
        ],
      },
      {
        heading: "The government abuse problem",
        group: "PROBLEMS",
        content: [
          { kind: "p", text: "A democratic government today may have no intention of abusing a digital identity system. But governments change. Laws change. Emergencies happen. Political systems change. Future governments may have different ideas about what behaviour should be permitted." },
          { kind: "p", text: "Therefore the important question isn't \"do we trust today's government?\" It is \"would we trust every future government with the same power?\" That is a much harder question." },
        ],
      },
      {
        heading: "Where these dangers actually sit on the ladder",
        content: [
          { kind: "p", text: "Every problem raised so far in this essay is really a description of climbing that ladder, one rung at a time." },
          {
            kind: "list",
            items: [
              "The universal ID problem — needing the same ID for banking, employment, healthcare, and travel — is Level 4, Pervasive ID: identity becoming infrastructure.",
              "The linking problem is Level 5, Linked ID: one identity becoming the common key across separate databases.",
              "The surveillance and profiling problems are Level 6, Behavioural ID: a record of where you go and what you do, built from combined datasets.",
              "\"Identity is not the same as permission,\" and the social-credit problem, are Level 7, Permission ID: the system deciding what you're allowed to do, not just who you are.",
              "The \"one switch\" problem and the government abuse problem are Level 10, Total Identity System: enough of life routed through one credential that switching it off, by accident or by design, switches off the person.",
            ],
          },
          { kind: "p", text: "Two rungs on the ladder haven't come up yet, and they're worth naming directly — they're where the danger stops being hypothetical and starts being mechanical." },
          { kind: "subheading", text: "Level 8 — Conditional ID" },
          { kind: "p", text: "This is where access starts depending on conditions attached to your identity, not just facts about it — your licence status, your location, whether a payment cleared, whether you're judged compliant with some regulation." },
          { kind: "subheading", text: "Level 9 — Programmable Identity" },
          { kind: "p", text: "This is where those conditions stop needing a person to apply them. A rule evaluates automatically: condition true, access granted; condition false, access removed. Nobody has to decide to restrict you — the system just executes. It's the same underlying idea as programmable money (see CBDCs) applied to identity instead of currency: once permission is coded as a rule instead of exercised as a judgment, it can be enforced at a scale and speed no human process ever could." },
          { kind: "p", text: "Underneath all ten levels, there are really only four separate questions being asked — and they don't have to be answered the same way:" },
          {
            kind: "definitions",
            items: [
              { term: "Identification", text: "Who are you?" },
              { term: "Persistence", text: "Does the same identity follow you everywhere?" },
              { term: "Linkage", text: "Can different parts of your life be connected through that identity?" },
              { term: "Authority", text: "Can the identity determine what you're allowed to do?" },
            ],
          },
          { kind: "p", text: "The dangerous progression was never simply \"paper ID → digital ID.\" It's Identity → Information → Profile → Permission → Control — and every one of those arrows is a separate decision, made by someone, that didn't have to be made the way it was." },
        ],
      },
      {
        heading: "The most important Sovereign principle",
        content: [
          { kind: "p", text: "A digital identity should help you prove who you are. It should not become a mechanism that determines what you are allowed to do with your life." },
          { kind: "p", text: "That distinction is fundamental:" },
          {
            kind: "definitions",
            items: [
              { term: "Identity", text: "Who are you?" },
              { term: "Credential", text: "What can you prove?" },
              { term: "Verification", text: "Is that proof genuine?" },
              { term: "Permission", text: "Are you allowed to do this?" },
            ],
          },
          { kind: "p", text: "These should remain separate. The danger comes when they become one system: \"We know who you are, therefore we decide whether you may proceed.\"" },
        ],
      },
      {
        heading: "What a Sovereign Digital ID should look like",
        content: [
          { kind: "p", text: "Beyond the safeguards above, a freedom-preserving system would also aim for:" },
          {
            kind: "definitions",
            items: [
              { term: "You control it", text: "You hold your credentials." },
              { term: "No behavioural score", text: "Your identity does not become a score determining your access to society." },
              { term: "Transparency", text: "The system can be independently examined." },
              { term: "Separation", text: "No single organisation controls identity, information and permission." },
              { term: "Exit", text: "You can leave or change providers without losing your ability to function in society." },
            ],
          },
        ],
      },
    ],
    blocks: [
      {
        type: "fact",
        text: "Australia's Digital ID Act commenced in November 2024 and establishes a framework described by the Australian Government as voluntary, with privacy and consumer protections built in.",
      },
      {
        type: "fact",
        text: "SDG target 16.9, part of the UN's 2030 Agenda, calls for 'legal identity for all' by 2030, including birth registration — a goal aimed primarily at the roughly one billion people worldwide who currently lack any form of officially recognised identity.",
      },
      {
        type: "opinion",
        text: "Digital identity is a tool, not a verdict. It can reduce fraud, cut paperwork, and — done well — let you prove a fact about yourself (over 18, licensed, eligible) without handing over your entire file. Whether it helps or harms you depends entirely on the architecture, not the concept.",
      },
      {
        type: "fact",
        text: "The critical design question is not whether a digital ID exists, but how many independent essential services — banking, healthcare, employment, travel, property, telecommunications — ultimately route through the same identity layer.",
      },
      {
        type: "scenario",
        text: "A future government or platform could expand the number of services that require the same digital credential, gradually making it harder to participate in ordinary life without it. This is a plausible trajectory, not a settled outcome — it depends on policy choices not yet made.",
      },
      {
        type: "opinion",
        text: "Concentrating too many essential services behind one identity infrastructure creates a single point of failure for your entire life, regardless of whether the institution running it is well-intentioned today. That risk is worth managing even if you trust the current operator completely.",
      },
      {
        type: "fact",
        text: "Identity resilience is achievable without refusing digital ID: keep physical documents and certified copies, know your account-recovery paths before you need them, use more than one authentication method, and understand exactly what data each service actually requires versus what it collects by default.",
      },
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
