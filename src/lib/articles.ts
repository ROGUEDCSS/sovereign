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

/** Ordered content within a section, in the order it should render. */
export type ArticleContentBlock =
  | { kind: "p"; text: string }
  | { kind: "subheading"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "diagram"; text: string }
  | { kind: "definitions"; items: { term: string; text: string }[] };

export interface ArticleSection {
  heading: string;
  content: ArticleContentBlock[];
}

export interface Article {
  slug: string;
  title: string;
  dek: string;
  evidenceRating: EvidenceRating;
  independenceSource: IndependenceSource;
  /** Long-form, headed content — rendered above blocks when present. */
  sections?: ArticleSection[];
  blocks: ArticleBlock[];
}

export const ARTICLES: Article[] = [
  {
    slug: "digital-id",
    title: "Digital identity: what it is, and how to stay resilient inside it",
    dek: "Digital ID is not inherently authoritarian — but the number of essential services that depend on one credential is the number that actually matters.",
    evidenceRating: 4,
    independenceSource: "Expert analysis",
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
        heading: "Holder, issuer and verifier",
        content: [
          { kind: "p", text: "These are three basic parts of a digital identity system." },
          {
            kind: "definitions",
            items: [
              { term: "Issuer", text: "The organisation that says: \"We certify that this is true.\" For example: \"This person is over 18,\" or: \"This person holds a driver's licence.\"" },
              { term: "Holder", text: "You. You hold the digital credential in your digital wallet." },
              { term: "Verifier", text: "The organisation asking for proof. For example: \"Are you over 18?\" Ideally, the verifier receives only: YES — OVER 18. It does not need your full name, address or date of birth." },
            ],
          },
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
        heading: "So where is the danger?",
        content: [
          { kind: "p", text: "The danger starts when digital ID changes from \"prove something about yourself\" into \"you must use this identity to participate.\"" },
          { kind: "p", text: "That is a very different system." },
        ],
      },
      {
        heading: "Identity is not the same as permission",
        content: [
          { kind: "p", text: "This distinction is fundamental." },
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
        heading: "The universal ID problem",
        content: [
          { kind: "p", text: "Imagine your digital ID becomes necessary for:" },
          { kind: "list", items: ["Banking", "Employment", "Healthcare", "Education", "Travel", "Government services", "Buying certain products", "Renting a house", "Running a business", "Social media", "Telecommunications"] },
          { kind: "p", text: "Each individual requirement might sound reasonable. But eventually: your digital ID becomes the key to ordinary life. That creates a single point of control." },
        ],
      },
      {
        heading: "Function creep",
        content: [
          { kind: "p", text: "This is one of the biggest risks. A system starts with: \"Digital ID for government services.\"" },
          { kind: "p", text: "Then somebody says: \"It would be convenient for banking.\" Then: \"Let's use it for age verification.\" Then: \"Let's use it for online safety.\" Then: \"Let's use it for benefits.\" Then: \"Let's use it for travel.\"" },
          { kind: "p", text: "Each expansion can be justified individually. Eventually the system does something completely different from what it was originally created to do. This is called function creep." },
        ],
      },
      {
        heading: "Public + private partnerships",
        content: [
          { kind: "p", text: "Government does not have to operate every part of the system. Private companies can potentially become:" },
          { kind: "list", items: ["Identity providers", "Wallet providers", "Banks", "Telecommunications companies", "Technology providers", "Healthcare providers", "Employers", "Retailers", "Platforms"] },
          { kind: "p", text: "This can make the system more useful. It can also make the system much bigger. The question becomes: how many organisations can use the identity, and how much information can be connected through it?" },
        ],
      },
      {
        heading: "The linking problem",
        content: [
          { kind: "p", text: "Imagine: your bank knows your financial activity. Your employer knows your employment. Your telecommunications company knows your account. Government knows your tax information. A healthcare provider knows your healthcare information. A retailer knows your purchases." },
          { kind: "p", text: "A digital identity system could potentially make these systems easier to connect. You don't necessarily need one giant database — you can have many databases that are linked through a common identity. That can be just as powerful." },
        ],
      },
      {
        heading: "The surveillance problem",
        content: [
          { kind: "p", text: "A particularly important question is: does the issuer know every time you use your identity?" },
          { kind: "p", text: "If the answer is yes, your identity could potentially create a record of where you authenticate. That could reveal:" },
          { kind: "list", items: ["Where you go", "Which services you use", "Which organisations you interact with", "When you interact with them", "Potentially patterns of behaviour"] },
          { kind: "p", text: "A good system should minimise or prevent this type of tracking." },
        ],
      },
      {
        heading: "The profiling problem",
        content: [
          { kind: "p", text: "Information from different systems can potentially be combined to create a profile. For example: financial behaviour + location + purchases + employment + services used." },
          { kind: "p", text: "The result could become a detailed picture of an individual. That creates the possibility of profiling people according to their behaviour." },
        ],
      },
      {
        heading: "The social-credit problem",
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
        content: [
          { kind: "p", text: "A physical document is usually something you possess. A digital credential can be checked electronically. That is useful. But it raises an important question: who can turn it off? And: what happens if they get it wrong?" },
          { kind: "p", text: "A properly designed system needs:" },
          { kind: "list", items: ["Due process", "Appeals", "Human review", "Correction mechanisms", "Independent oversight", "Alternative ways to prove identity"] },
          { kind: "p", text: "Otherwise, a mistake in a digital identity system could become a mistake in your ability to participate in society." },
        ],
      },
      {
        heading: "The \"one switch\" problem",
        content: [
          { kind: "p", text: "Imagine a future where one digital identity controls access to: money + travel + work + healthcare + government + communication." },
          { kind: "p", text: "Then ask: what happens if that identity stops working? It could be:" },
          { kind: "list", items: ["Hacked", "Incorrectly suspended", "Lost", "Locked", "Revoked", "Technically unavailable", "Inaccessible because the system is offline"] },
          { kind: "p", text: "The more things connected to one identity, the greater the consequences of failure." },
        ],
      },
      {
        heading: "The government abuse problem",
        content: [
          { kind: "p", text: "A democratic government today may have no intention of abusing a digital identity system. But governments change. Laws change. Emergencies happen. Political systems change. Future governments may have different ideas about what behaviour should be permitted." },
          { kind: "p", text: "Therefore the important question isn't \"do we trust today's government?\" It is \"would we trust every future government with the same power?\" That is a much harder question." },
        ],
      },
      {
        heading: "The most important Sovereign principle",
        content: [
          { kind: "p", text: "A digital identity should help you prove who you are. It should not become a mechanism that determines what you are allowed to do with your life." },
          { kind: "p", text: "There should always be a clear separation between:" },
          { kind: "list", items: ["Identity", "Authority", "Permission", "Surveillance"] },
        ],
      },
      {
        heading: "What a Sovereign Digital ID should look like",
        content: [
          { kind: "p", text: "A freedom-preserving system would aim for:" },
          {
            kind: "definitions",
            items: [
              { term: "You control it", text: "You hold your credentials." },
              { term: "Minimum disclosure", text: "You disclose only what is necessary." },
              { term: "No universal tracking", text: "Using your ID does not automatically create a central record of everything you do." },
              { term: "No behavioural score", text: "Your identity does not become a score determining your access to society." },
              { term: "No function creep", text: "New uses require explicit scrutiny and authorisation." },
              { term: "Due process", text: "Your identity cannot simply be switched off without meaningful recourse." },
              { term: "Alternatives", text: "People are not forced into a purely digital existence." },
              { term: "Transparency", text: "The system can be independently examined." },
              { term: "Separation", text: "No single organisation controls identity, information and permission." },
              { term: "Exit", text: "You can leave or change providers without losing your ability to function in society." },
            ],
          },
        ],
      },
      {
        heading: "The simple test",
        content: [
          { kind: "p", text: "Whenever someone proposes a new use for Digital ID, ask five questions:" },
          { kind: "list", items: ["Who knows?", "What do they know?", "Who can connect it?", "Who can stop me?", "What happens if they get it wrong?"] },
          { kind: "p", text: "Those five questions expose most of the important risks." },
        ],
      },
      {
        heading: "The Sovereign position",
        content: [
          { kind: "p", text: "SOVEREIGN does not need to argue \"Digital ID is evil.\" That is too simplistic." },
          { kind: "p", text: "Nor should it argue \"Digital ID is safe because the government says it is safe.\" That is equally simplistic." },
          { kind: "p", text: "The proper position is: digital identity is a powerful technology. It can increase privacy, convenience and security. It can also create unprecedented opportunities for surveillance, profiling, exclusion and control if identity becomes linked to permission and access." },
          { kind: "p", text: "Therefore: the technology must be scrutinised. The architecture must be scrutinised. The legislation must be scrutinised. And the powers it creates must be scrutinised." },
          { kind: "p", text: "Identity should belong to the individual. It should never become the government's permission slip for living." },
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
