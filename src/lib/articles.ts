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
