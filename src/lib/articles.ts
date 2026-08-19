export type BlockType = "fact" | "scenario" | "opinion";

export interface ArticleBlock {
  type: BlockType;
  text: string;
}

export type EvidenceRating = 1 | 2 | 3 | 4 | 5;

export type IndependenceSource =
  | "Government source"
  | "Academic source"
  | "Industry source"
  | "Commercial source"
  | "Expert analysis"
  | "Anecdotal";

export interface Article {
  slug: string;
  title: string;
  dek: string;
  evidenceRating: EvidenceRating;
  independenceSource: IndependenceSource;
  blocks: ArticleBlock[];
}

export const ARTICLES: Article[] = [
  {
    slug: "digital-id",
    title: "Digital identity: what it is, and how to stay resilient inside it",
    dek: "Digital ID is not inherently authoritarian — but the number of essential services that depend on one credential is the number that actually matters.",
    evidenceRating: 4,
    independenceSource: "Government source",
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
  },
  {
    slug: "cbdcs",
    title: "Central bank digital currencies: the five questions that actually matter",
    dek: "Skip the debate about whether CBDCs are good or bad. Ask what the specific design does to cash, privacy, and your ability to spend your own money.",
    evidenceRating: 4,
    independenceSource: "Government source",
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
  },
  {
    slug: "2030-agenda",
    title: "What the 2030 Agenda actually is — and isn't",
    dek: "2030 is a policy horizon that most targets are behind schedule for, not a date on which anything switches on.",
    evidenceRating: 5,
    independenceSource: "Government source",
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
  },
];
