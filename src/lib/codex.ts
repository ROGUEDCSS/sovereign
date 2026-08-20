import { CommunitySignal, SovereignAlignment } from "./knowledge-graph";

export interface CodexItem {
  name: string;
  description?: string;
}

export interface CodexFact {
  label: string;
  text: string;
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
  /** Optional bullet breakout under the definition intro, for a list-shaped definition instead of one dense paragraph. */
  definitionPoints?: string[];
  /** Optional closing line after definitionPoints. */
  definitionOutro?: string;
  /** A plain string renders as-is; a labeled fact renders with a bold lead-in word/phrase so a reader can scan the topic before deciding to read the sentence. */
  facts?: (string | CodexFact)[];
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
  definition: "Identity is your ability to prove who you are — to institutions, strangers, and yourself. A resilient identity doesn't rest on any single:",
  definitionPoints: ["Document", "Device", "Company"],
  definitionOutro: "Lose any one of those, and you should still be able to prove who you are.",
  facts: [
    { label: "Single channel", text: "For most people, identity is provable through only one primary channel — a phone, or a single government-issued document. Losing that one channel is an ordinary event, not a rare catastrophe." },
    { label: "Three roles", text: "Digital identity works best split into issuer, holder, and verifier, so no single party controls everything — the same way a driver's licence works: the government issues it, you hold it, a bar checks it without calling the government." },
    { label: "Replacement", text: "Replacing a lost primary ID document typically requires other forms of ID to apply for it — a bootstrapping problem if your identity proof was concentrated in that one document." },
    { label: "Weakest link", text: "Account-takeover attacks overwhelmingly target the single weakest verification channel available — SIM-swap attacks against phone-based two-factor authentication are a well-documented example." },
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
  definition: "Personal development is the deliberate practice of getting better at things that matter to you — not:",
  definitionPoints: ["A classroom's curriculum", "An employer's agenda", "Anyone else's judgment about what's worth learning"],
  definitionOutro: "You choose what's worth learning, and you're the one who has to do it.",
  facts: [
    { label: "Deliberate practice", text: "Structured practice — with clear feedback and a specific stretch goal — beats passive repetition or just logging hours." },
    { label: "Skill stacking", text: "Rare combinations of skills are what's actually scarce — not being merely excellent at one narrow thing." },
    { label: "Applied learning", text: "Knowledge sticks when it's tied to a real problem you're solving, not learned in the abstract." },
    { label: "Credentials vs competence", text: "A credential and actual competence are different things — holding one doesn't reliably predict the other." },
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
  definition: "Health, in practical terms, comes down to four things:",
  definitionPoints: ["What you eat and drink", "How much you move — cardio and strength training", "How well you sleep", "How you manage stress"],
  definitionOutro: "It's the one form of capacity you can't borrow, outsource, or buy back once it's gone.",
  facts: [
    { label: "Capacity, not absence of disease", text: "Health is your actual physical and mental capacity, and it declines measurably when movement, sleep, or nutrition are neglected for long enough." },
    { label: "Chronic disease", text: "Sedentary behaviour and poor nutrition are strongly linked to higher rates of chronic disease — cardiovascular problems, diabetes, reduced life expectancy — even in people who exercise occasionally." },
    { label: "Sleep", text: "Sleep deprivation impairs cognitive function, decision-making, and immune response within days, not months." },
    { label: "Mental health", text: "Mental health conditions are common, not rare or exceptional — most people will experience real mental strain, or a diagnosable condition, at some point in their life." },
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
  definition: "Financial independence is the ability to meet your own needs and absorb a shock without depending on:",
  definitionPoints: ["Credit", "Family", "The state"],
  definitionOutro: "A lost job, a medical bill, a bad month — the shock is ordinary. What matters is whether you can bridge the gap yourself.",
  facts: [
    { label: "Emergency fund", text: "A cash emergency fund covering three to six months of essential expenses is a real buffer, not overkill — the exact number varies by household, but having no buffer at all is the actual risk." },
    { label: "Single bank", text: "Concentrating savings in a single bank exposes you to that one institution's outages, freezes, or failures — bank failures are rare, but real, and losing access to your only account is not a hypothetical." },
    { label: "Income concentration", text: "Income concentrated in a single employer or client is a single point of failure in the same way savings in a single account are — job loss is one of the most common triggers of financial hardship." },
    { label: "Physical cash", text: "Cash and physical currency remain functional when card networks, apps, or the power grid itself do not — a form of resilience a purely digital financial life doesn't have." },
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
  definition: "Mindset and responsibility is the discipline to:",
  definitionPoints: [
    "Do what you said you'd do",
    "Own the consequences of your own decisions",
    "Make sound calls under pressure — without waiting for someone else to hold you accountable",
  ],
  definitionOutro:
    "Every skill and resource in this Codex is inert without it. It's the difference between having what you need and actually using it when it counts.",
  facts: [
    { label: "Accountability", text: "Most people default to blaming circumstances, other people, or bad luck for outcomes they had real influence over — it's the easier story to tell, not the honest one." },
    { label: "Discipline", text: "Discipline consistently outperforms motivation because motivation is unreliable — it shows up under good conditions and disappears exactly when you need it most." },
    { label: "Pressure", text: "Under real pressure, most people don't rise to some higher standard — they fall back to whatever they've actually practiced, not what they intended to do." },
    { label: "Follow-through", text: "Following through on a commitment you made to yourself, with no one else watching or checking, is one of the few things that reliably builds genuine self-trust." },
  ],
  practicalQuestion:
    "When was the last time you did something hard and inconvenient purely because you said you would — with no one else checking?",
  detailed: true,
  items: [
    { name: "Self-discipline", description: "Doing the necessary thing on schedule, regardless of how you feel about it that day." },
    { name: "Decision-making under pressure", description: "Making sound calls with incomplete information and real consequences — not in a classroom, with a deadline." },
    { name: "Accountability", description: "Owning the outcome of your own decisions first, before looking at what anyone else did or didn't do." },
    { name: "Follow-through", description: "Finishing what you started, especially once the initial motivation has worn off." },
    { name: "Emotional regulation", description: "Staying functional and clear-headed when the situation genuinely isn't." },
  ],
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
  definition: "Family life is the coordination that keeps a household running:",
  definitionPoints: [
    "Who does what, and whether that's ever actually been discussed",
    "How decisions get made when people disagree",
    "How conflict gets resolved without it derailing everything else",
  ],
  definitionOutro: "None of it runs on goodwill alone — it runs on whether the coordination actually exists.",
  facts: [
    { label: "Unspoken division", text: "Most households divide labour by habit, not agreement — and habits formed early rarely get renegotiated even after circumstances change." },
    { label: "Conflict avoidance", text: "Avoiding a disagreement doesn't resolve it — it just moves the cost to whoever brings it up next, usually with more frustration attached." },
    { label: "Decision fatigue", text: "A household where one person makes every decision isn't more efficient — it's one person quietly carrying a load the rest have stopped noticing." },
    { label: "Repair, not perfection", text: "Families that function well aren't the ones that never argue — they're the ones that know how to actually repair things afterward." },
  ],
  practicalQuestion: "If you had to name who actually decided the last five things in your household, would everyone agree on the list?",
  detailed: true,
  items: [
    { name: "Division of labour", description: "Who actually does what, and whether that division was ever agreed to or just settled by default." },
    { name: "Decision-making", description: "How choices get made when people disagree — and what happens when no one owns the decision." },
    { name: "Conflict resolution", description: "The actual process for resolving disagreement, not just avoiding it until it passes." },
    { name: "Communication rhythm", description: "The regular check-ins, or lack of them, that keep small issues from becoming big ones." },
  ],
};

const CHILDREN: CodexNode = {
  slug: "children",
  name: "Children",
  tagline: "Raising capable, responsible, and independent children while respecting their privacy, development, and individual sovereignty.",
  definition: "Raising capable children means giving them, in age-appropriate doses:",
  definitionPoints: [
    "Real responsibility, not just chores assigned and checked",
    "The room to make small mistakes before the mistakes get expensive",
    "Privacy and autonomy that grows as their judgement does",
  ],
  definitionOutro: "The goal isn't a child who obeys well — it's an adult who doesn't need you.",
  facts: [
    { label: "Overprotection cost", text: "Shielding a child from every small failure doesn't produce a more capable adult — it produces one who hasn't practiced recovering from anything." },
    { label: "Responsibility gap", text: "Most children are given chores, but far fewer are given real responsibility — a task where the consequence of skipping it actually falls on them." },
    { label: "Privacy as development", text: "As judgement develops, so should privacy — treating a teenager's need for autonomy as a discipline problem usually backfires." },
    { label: "Modelling over instruction", text: "Children calibrate their own behaviour against what they watch you actually do, not what you tell them to do." },
  ],
  practicalQuestion: "What's one real responsibility your child holds, where the consequence of dropping it actually falls on them — not you?",
  detailed: true,
  items: [
    { name: "Responsibility & chores", description: "The difference between a task that's assigned and checked, and one where the consequence is genuinely theirs." },
    { name: "Independence & judgement", description: "Age-appropriate freedom to make decisions, including some that turn out wrong." },
    { name: "Privacy & autonomy", description: "Respecting a growing need for their own space, thoughts, and decisions as they mature." },
    { name: "Safety & boundaries", description: "The limits that actually matter, held consistently — not a long list applied selectively." },
  ],
};

const EDUCATION: CodexNode = {
  slug: "education",
  name: "Education",
  tagline: "Formal education, home education, practical education, apprenticeships, and the Sovereign learning system.",
  definition: "Education is whatever actually builds a child's capability to think, learn, and do. It can come through:",
  definitionPoints: [
    "A formal school system",
    "Home education, structured or unstructured",
    "Practical apprenticeship — learning by doing, under someone who already knows",
  ],
  definitionOutro: "The method matters less than whether the child comes out more capable than they went in.",
  facts: [
    { label: "Credential vs capability", text: "A completed curriculum and an actually capable learner are not the same outcome — one is measured by attendance, the other by what a child can do unsupervised." },
    { label: "Home-education stigma", text: "Home-educated children are often assumed to be under-socialised — a claim rarely checked against the actual child in front of you." },
    { label: "Apprenticeship model", text: "Learning a trade by doing it, under someone who already knows, remains one of the fastest ways to build real competence — and one of the most overlooked." },
    { label: "Parent as default teacher", text: "Whether or not you formally home-educate, you are already your child's first and most consistent teacher — by example, if nothing else." },
  ],
  practicalQuestion: "If school stopped tomorrow, what's your actual plan for your child's education — not the fallback, the plan?",
  detailed: true,
  items: [
    { name: "Formal schooling", description: "Public, private, or alternative schools — the default most families use by default, not necessarily by choice." },
    { name: "Home education", description: "Structured or self-directed learning led by the family, inside or outside any curriculum." },
    { name: "Practical apprenticeship", description: "Learning a real skill or trade by doing it, under someone who already knows how." },
    { name: "Sovereign learning system", description: "Combining formal, home, and practical education deliberately, instead of defaulting to whichever is easiest." },
  ],
  connections: [{ path: ["individual", "personal-development"] }],
};

const RESPONSIBILITY: CodexNode = {
  slug: "responsibility",
  name: "Responsibility",
  tagline: "The responsibilities family members voluntarily assume toward one another.",
  definition: "Family responsibility is what you owe each other by choice, not by law. It shows up as:",
  definitionPoints: [
    "Care obligations — for children, ageing parents, or anyone who can't fully provide for themselves",
    "Financial commitments made to each other, formal or not",
    "The unspoken expectation that you show up when it actually matters",
  ],
  definitionOutro: "None of it is enforceable. It only exists because you keep it.",
  facts: [
    { label: "Voluntary, not legal", text: "Most family obligations aren't legally enforceable — they hold because someone keeps choosing to honour them, not because a contract requires it." },
    { label: "Caregiver load", text: "Care responsibilities for children or ageing parents usually concentrate on one person by default, rarely by an actual decision." },
    { label: "Unspoken expectations", text: "Most family conflict over responsibility isn't about who does the work — it's about an expectation that was never actually stated out loud." },
    { label: "Consistency over grand gestures", text: "Showing up reliably for the small, unremarkable things builds more trust than any single large gesture." },
  ],
  practicalQuestion: "What responsibility do you carry for someone else in your family that's never actually been discussed out loud?",
  detailed: true,
  items: [
    { name: "Care obligations", description: "For children, ageing parents, or anyone in the family who can't fully provide for themselves." },
    { name: "Financial commitments", description: "Money owed, lent, or promised between family members — formal or not." },
    { name: "Showing up", description: "The reliability that actually builds trust — being there for the ordinary things, not just the emergencies." },
    { name: "Boundaries", description: "Knowing which responsibilities you've genuinely taken on, and which ones you've just quietly absorbed." },
  ],
};

const FAMILY_FINANCE: CodexNode = {
  slug: "family-finance",
  name: "Family finance",
  tagline: "Household income, expenditure, assets, ownership, planning, and financial resilience.",
  definition: "Family finance is individual finance scaled to a household where more than one person's decisions actually matter. It adds:",
  definitionPoints: [
    "Shared visibility — does everyone actually know the numbers, or does one person carry them alone?",
    "Joint decisions — how spending and saving choices actually get made, together",
    "Combined risk — one household's single point of failure instead of one person's",
  ],
  definitionOutro: "A family can be individually financially literate and still be collectively blind to its own numbers.",
  facts: [
    { label: "Financial secrecy", text: "In many households, one partner manages the finances alone and the other genuinely doesn't know the numbers — not through malice, just through drift." },
    { label: "Combined risk", text: "A household's financial single point of failure is often invisible until it's tested — one income, one bank, one person who knows where anything is." },
    { label: "Asset visibility", text: "It's common for one family member to be unable to name the household's major assets, debts, or account locations if asked without notice." },
    { label: "Planning avoidance", text: "Money conversations get avoided more often out of discomfort than disagreement — silence isn't the same as consensus." },
  ],
  practicalQuestion: "If something happened to the person who manages your household's money, could anyone else actually find and access everything?",
  detailed: true,
  items: [
    { name: "Household income", description: "All sources coming into the household, and how concentrated or spread out they actually are." },
    { name: "Shared expenses", description: "What the household spends on, and whether both or all adults can actually see it." },
    { name: "Assets & ownership", description: "What the family owns, how it's held, and whether everyone knows where the records actually are." },
    { name: "Financial planning", description: "Decisions made together, deliberately — not by default or by whoever happened to be paying attention." },
  ],
  connections: [{ path: ["individual", "finance"] }],
};

const FAMILY_CAPABILITY: CodexNode = {
  slug: "family-capability",
  name: "Family capability",
  tagline: "What the family collectively knows and can do — the practical skills no one had to look up.",
  definition: "Family capability is what your household can actually do without needing to look it up, call someone, or pay for it. It's not the same as one person's expertise:",
  definitionPoints: [
    "Knowledge that only exists in one person's head, never written down or taught",
    "Skill that quietly disappears if that one person is unavailable",
  ],
  definitionOutro: "A family's real capability is what survives losing its most capable member for a month.",
  facts: [
    { label: "Single point of knowledge", text: "Most households have exactly one person who knows how to do a given essential task — and no backup if that person is unavailable." },
    { label: "Untaught skill", text: "Skills that live in one person's head and are never demonstrated or taught don't transfer — they just disappear with that person." },
    { label: "Outsourced capability", text: "Paying someone else to do something isn't the same as being unable to do it yourself — but for most households, it's become the same thing by default." },
    { label: "Practice, not knowledge", text: "Knowing how a skill works in theory and being able to actually perform it under pressure are different levels of capability entirely." },
  ],
  practicalQuestion: "Pick the skill your household relies on most. If the person who knows it was gone for a month, who else could actually do it?",
  detailed: true,
  items: [
    { name: "Growing food", description: "Producing at least some of what the household eats, not just knowing it's theoretically possible." },
    { name: "Repairing equipment", description: "Fixing what breaks instead of replacing it — tools, appliances, vehicles." },
    { name: "Building", description: "Basic construction and repair — enough to maintain or extend what you already have." },
    { name: "Cooking", description: "Turning raw ingredients into food, not just reheating what's already prepared." },
    { name: "First aid", description: "Responding to an injury or medical event before professional help arrives." },
    { name: "Managing animals", description: "Caring for livestock or working animals, if the household keeps any." },
    { name: "Emergency preparedness", description: "Knowing the household's actual plan, not just that one probably exists." },
  ],
};

const FAMILY_LEGACY: CodexNode = {
  slug: "family-legacy",
  name: "Family legacy",
  tagline: "Knowledge, skills, traditions, property, records, and practical experience passed between generations.",
  definition: "Family legacy is what actually gets passed down — not what you intend to pass down, but what your children or grandchildren could genuinely access after you're gone. It includes:",
  definitionPoints: [
    "Practical knowledge — skills, methods, and hard-won lessons, not just stories about them",
    "Records — where things are, how they work, what to do next",
    "Property, and its actual condition, not just its existence",
  ],
  definitionOutro: "Most of it exists only in someone's memory, which means most of it is one event away from being lost.",
  facts: [
    { label: "Undocumented knowledge", text: "Most family knowledge is never written down — it exists only in conversation, which means it survives only as long as someone remembers to ask." },
    { label: "Silent inheritance", text: "Property and records are commonly passed down with no explanation of their condition, history, or how to actually maintain them." },
    { label: "Story vs skill", text: "Being told about a skill a grandparent had is not the same as having been taught it — the story survives; the capability usually doesn't." },
    { label: "One generation gap", text: "Most family knowledge is lost within a single generation of not being actively used or taught — it doesn't take three generations, it takes one." },
  ],
  practicalQuestion: "What does someone in your family know how to do that no one younger than them has ever been taught?",
  detailed: true,
  items: [
    { name: "Practical knowledge", description: "Skills and methods, actually taught and practiced — not just described." },
    { name: "Family records", description: "Documents, histories, and the practical information someone will need after you're gone." },
    { name: "Property & heirlooms", description: "What's owned, its actual condition, and how to maintain or use it." },
    { name: "Traditions", description: "The practices and rituals that carry meaning across generations, kept deliberately, not by accident." },
  ],
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
  definition: "Household systems are the utilities you rely on constantly and think about rarely. It covers:",
  definitionPoints: [
    "What keeps the lights, water, and climate control running",
    "How each system fails, and how you'd actually know",
    "What you can fix yourself versus what needs a technician",
  ],
  definitionOutro: "Most households can name their systems. Few know what actually happens when one of them stops.",
  facts: [
    { label: "Invisible until broken", text: "Most people can't describe how their home's systems actually work — only that they work, until the day they don't." },
    { label: "Cascading failure", text: "A single failed system rarely stays isolated — a burst pipe becomes an electrical hazard, a power outage becomes a spoiled fridge." },
    { label: "No manual on hand", text: "Manuals, warranties, and service records for household systems are commonly lost or never kept anywhere anyone else could find them." },
    { label: "DIY ceiling", text: "Most household systems have a real point past which a repair genuinely requires a licensed trade — knowing where that line is saves both money and risk." },
  ],
  practicalQuestion: "If your hot water system failed today, do you know what actually failed, or just that there's no hot water?",
  detailed: true,
  items: [
    { name: "Electrical", description: "Wiring, the switchboard, and the system most households understand least." },
    { name: "Plumbing", description: "Pipes, drainage, and hot water — usually invisible until something leaks or stops." },
    { name: "Heating & cooling", description: "Climate control systems, and what happens to the home without them." },
    { name: "Connectivity", description: "Internet and communication infrastructure the household has come to depend on." },
  ],
  connections: [{ path: ["home", "energy"] }, { path: ["home", "water"] }],
};

const HOUSEHOLD_SECURITY: CodexNode = {
  slug: "household-security",
  name: "Household security",
  tagline: "The physical security of the home itself — and what you're actually allowed to do to protect it.",
  definition: "Household security is protecting your home and the people in it, within limits that aren't entirely up to you. It covers:",
  definitionPoints: [
    "Deterrence — locks, lighting, and visibility that discourage trouble before it starts",
    "Detection — knowing something's wrong before it's already happened",
    "Response — what you're actually able to do, and what crosses into a legal grey area",
  ],
  definitionOutro: "Most households have thought about the first. Fewer have thought honestly about the third.",
  facts: [
    { label: "Deterrence over detection", text: "Visible deterrents — lighting, locks, occupied appearance — prevent far more incidents than any response after entry, because most intrusions are opportunistic, not planned." },
    { label: "Response gap", text: "Most households have never actually discussed what they'd do in the first sixty seconds of a break-in — the plan exists only as an assumption." },
    { label: "Legal grey area", text: "What you're legally permitted to do to defend your home varies significantly by jurisdiction, and most people are working from assumption, not from having actually checked." },
    { label: "False confidence", text: "Owning a security measure and having practiced using it are different things — an unfamiliar tool under stress is often worse than no tool at all." },
  ],
  practicalQuestion: "What can a household reasonably do to secure itself, and where does that right actually stop?",
  detailed: true,
  sovereignFramework: true,
  items: [
    { name: "Physical deterrence", description: "Locks, lighting, fencing, and visibility — reducing the chance trouble starts at all." },
    { name: "Detection", description: "Alarms, cameras, and the systems that tell you something's wrong before you'd otherwise notice." },
    { name: "Response planning", description: "What the household would actually do, decided before it's needed, not improvised in the moment." },
    { name: "Legal boundaries", description: "What you're actually permitted to do to protect your home and family, checked for your jurisdiction, not assumed." },
  ],
  connections: [{ path: ["family", "responsibility"] }],
};

const HOUSEHOLD_STORES: CodexNode = {
  slug: "household-stores",
  name: "Household stores",
  tagline: "What's kept in reserve inside the home — food, water, supplies, and documents, ready before they're needed.",
  definition: "Household stores are what you'd actually have on hand if you couldn't restock for a while — not what you assume you'd manage to buy in time. It covers:",
  definitionPoints: [
    "Consumables — food, water, and medical supplies with a real, checked quantity",
    "Documents — copies of what you'd need if the originals were lost or inaccessible",
    "Rotation — stores that get used and replaced, not just accumulated and forgotten",
  ],
  definitionOutro: "A store no one has checked in a year isn't a reserve — it's a guess.",
  facts: [
    { label: "Untested stores", text: "Most households that believe they have 'a couple of weeks' of supplies have never actually counted — the number is usually smaller than assumed." },
    { label: "Expiry drift", text: "Stored food and medical supplies expire quietly, and without a rotation system, a store can look complete while being mostly unusable." },
    { label: "Document gap", text: "Critical documents are commonly stored in only one place, in only their original form — the exact single point of failure a store is supposed to remove." },
    { label: "Panic buying", text: "The households that scramble hardest during a shortage are usually the ones with no standing reserve at all — the rush itself is what empties shelves." },
  ],
  practicalQuestion: "If you actually counted right now, how many real days of food and water does your household have on hand?",
  detailed: true,
  items: [
    { name: "Food reserves", description: "Stored food that needs no power or refrigeration, actually counted and rotated." },
    { name: "Water reserves", description: "Stored drinking water, separate from whatever your mains connection provides." },
    { name: "Medical supplies", description: "First aid and any regular medications, with a real buffer beyond the next refill." },
    { name: "Document copies", description: "Physical or backed-up copies of what you'd need if the originals were lost." },
  ],
  connections: [{ path: ["home", "food-production"] }, { path: ["individual", "identity"] }],
  relatedTools: [{ label: "Build my system", href: "/build-my-system" }],
};

const HOUSEHOLD_MAINTENANCE: CodexNode = {
  slug: "household-maintenance",
  name: "Household maintenance",
  tagline: "Keeping the dwelling itself in working order — what breaks, what's diagnosed, what's actually fixed, and the tools that make it possible.",
  definition: "Household maintenance is catching what's wrong before it becomes expensive — not just fixing what's already broken. It covers:",
  definitionPoints: [
    "Diagnosis — actually knowing what's wrong, not guessing",
    "Repair — doing the job yourself where it's reasonable to",
    "Knowing your limit — recognising the point where a repair needs a professional",
  ],
  definitionOutro: "Deferred maintenance doesn't disappear. It just gets more expensive while you're not looking at it.",
  facts: [
    { label: "Deferred cost", text: "A small, cheap repair ignored for long enough reliably becomes a large, expensive one — deferred maintenance doesn't pause the clock, it just compounds." },
    { label: "Tool ownership gap", text: "Owning the right tool and knowing how to use it safely are different things — an unfamiliar tool can turn a simple job into an injury." },
    { label: "Diagnosis first", text: "Fixing the wrong thing is a common and expensive mistake — most maintenance failures start with a guess instead of an actual diagnosis." },
    { label: "Professional line", text: "Knowing when a job genuinely needs a licensed trade — for safety or legal reasons — is itself a real skill, not a lack of one." },
  ],
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
  definition: "Household routines are the rhythm that keeps daily life running without constant renegotiation. It covers:",
  definitionPoints: [
    "The ordinary rhythm — who does what, and when, without it needing to be discussed every time",
    "The disruption plan — what actually happens when the normal rhythm can't run",
    "Recovery — how quickly the household gets back to normal after it's interrupted",
  ],
  definitionOutro: "Most households have a rhythm. Few have ever tested what happens when it's disrupted.",
  facts: [
    { label: "Untested disruption", text: "Most households have a working daily rhythm and no actual plan for what happens when a key part of it — school, transport, power — is unavailable." },
    { label: "Rhythm as buffer", text: "A household with a strong routine absorbs a disruption more easily, because fewer decisions need to be made from scratch under pressure." },
    { label: "Recovery lag", text: "How fast a household returns to normal after a disruption depends more on whether a recovery plan existed beforehand than on the severity of the disruption itself." },
    { label: "Silent renegotiation", text: "Routines that were never explicitly agreed on tend to quietly fall apart the moment one person's circumstances change." },
  ],
  practicalQuestion: "If your normal weekday routine was impossible tomorrow, does your household actually have a plan B, or just an assumption that you'd figure it out?",
  detailed: true,
  items: [
    { name: "Daily rhythm", description: "The routine that runs without needing to be discussed — until something disrupts it." },
    { name: "Disruption plan", description: "What actually happens when a normal part of the routine — school, transport, power — isn't available." },
    { name: "Recovery", description: "How the household gets back to its normal rhythm after an interruption, and how long that actually takes." },
  ],
  connections: [{ path: ["family", "family-life"] }],
  relatedTools: [{ label: "Scenario room", href: "/scenario-room" }],
};

const FOOD_PRODUCTION: CodexNode = {
  slug: "food-production",
  name: "Food production",
  tagline: "How much of your own food can your land reliably provide?",
  definition: "Food production is how much of your household's food your own land can reliably provide — not in theory, but measured against what you actually eat. It covers:",
  definitionPoints: [
    "What you're currently growing, keeping, or catching",
    "How much of your diet that actually covers",
    "What it would take to genuinely increase that share",
  ],
  definitionOutro: "Most households that think they're 'doing some food production' have never measured what percentage of their actual diet it covers.",
  facts: [
    { label: "Symbolic gardening", text: "A backyard vegetable garden, however well-tended, typically supplies a small fraction of a household's actual caloric intake — useful, but rarely as significant as it feels." },
    { label: "Land vs skill", text: "Having land capable of producing food and actually knowing how to produce food on it are two separate requirements, and most households are missing the second, not the first." },
    { label: "Preservation gap", text: "Food grown in a single season is only useful year-round if it's actually preserved — a skill most food-producing households never develop past fresh eating." },
    { label: "Livestock commitment", text: "Keeping animals for food is a daily, non-optional commitment, not a project you can pause — a fact that surprises many people after the fact, not before." },
  ],
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
  definition: "Building is turning materials and skill into something finished on your own land — not hiring it out, and not just planning to someday. It covers:",
  definitionPoints: [
    "What you actually know how to build, versus what you'd need to pay for",
    "What's already built, and its real condition",
    "What's genuinely missing before the land does what you need it to",
  ],
  definitionOutro: "A plan to build something isn't the same as the capability to build it.",
  facts: [
    { label: "Permission reality", text: "What you're permitted to build on your own land is governed by regulation that varies significantly by location — and is rarely checked until it becomes a problem." },
    { label: "Skill before materials", text: "Most failed building projects fail on skill and planning, not on access to materials — materials are usually the easy part." },
    { label: "Maintenance debt", text: "A structure that's built but never maintained degrades faster than the effort it took to build it in the first place." },
    { label: "Method fit", text: "The right building method depends heavily on local climate, materials, and regulation — a method that works well elsewhere can be the wrong choice on your specific land." },
  ],
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
    "Water is the most essential input for human life — and for most households, the least self-reliant one. Nearly all of it comes from a mains connection you don't own, can't repair, and have probably never tested a backup for.",
  facts: [
    { label: "Your body", text: "The human body is roughly 60% water, and every major bodily system depends on it functioning." },
    { label: "Survival window", text: "Most people can survive only about 3 days without water — compared to several weeks without food." },
    { label: "Mild dehydration", text: "Losing just 2% of your body's water is enough to measurably impair concentration and physical performance." },
    { label: "Mains reserve", text: "Municipal water systems typically hold only a few days of treated reserve — a mains failure, contamination event, or extended outage can interrupt supply with very little warning." },
    { label: "Daily minimum", text: "A single adult needs a minimum of roughly 3 litres a day just to survive — more for cooking, hygiene, and any physical exertion." },
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
  definition: "Energy independence is how many of your household's power sources you actually control — not how many exist, but how many you could keep running yourself. It covers:",
  definitionPoints: [
    "Generation — where your power actually comes from",
    "Storage — how much you can keep on hand for when generation stops",
    "Efficiency — how much you actually need, before adding more supply",
  ],
  definitionOutro: "Most households have one power source and have never tested what happens when it's the only thing that fails.",
  facts: [
    { label: "Single source", text: "Most households draw from exactly one power source and have never actually tested what a multi-day outage does to daily life." },
    { label: "Battery reality", text: "Battery storage capacity is usually described in ideal conditions — real-world output is lower, especially under sustained heavy use." },
    { label: "Efficiency first", text: "Reducing a household's actual power draw is consistently cheaper than adding equivalent backup generation — but it's the less exciting fix, so it's often skipped." },
    { label: "Fuel shelf life", text: "Stored fuel for generators degrades over time and needs rotation — a generator with old, degraded fuel can fail at exactly the moment it's needed." },
  ],
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
  definition: "Materials are the raw inputs behind everything you might build, repair, or make. It covers:",
  definitionPoints: [
    "What's already stored or salvageable on your property",
    "What you'd need to source locally if supply chains were disrupted",
    "What you actually know how to work with, not just what you own",
  ],
  definitionOutro: "A pile of materials with no matching skill is just storage.",
  facts: [
    { label: "Stockpile vs skill", text: "Owning building materials and knowing how to use them correctly are different capabilities — a stockpile doesn't compensate for the missing skill." },
    { label: "Local sourcing", text: "Most households have never identified where they'd actually source key materials locally if normal supply chains were disrupted for an extended period." },
    { label: "Reclaimed materials", text: "Salvaged and reclaimed materials are consistently underused, despite often being cheaper and more available than new supply." },
    { label: "Storage conditions", text: "Materials stored improperly — exposed to moisture, pests, or sun — degrade well before they're actually needed, quietly wasting the investment." },
  ],
  practicalQuestion: "If you had to build or repair something significant tomorrow using only what's already on your property, what would you actually be able to do?",
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
  definition: "Mobility is how you and your household actually move, and what happens when the usual way stops working. It covers:",
  definitionPoints: [
    "Your default mode — what you rely on for almost everything",
    "Your backup — what you'd actually use if the default wasn't available",
    "Maintenance — whether you can keep what you have running, not just replace it",
  ],
  definitionOutro: "Most households have exactly one way to get anywhere, and no tested plan for when it's unavailable.",
  facts: [
    { label: "Single mode", text: "Most households rely on a single primary vehicle for essentially all transport, with no genuinely tested alternative." },
    { label: "Fuel dependency", text: "A personal vehicle is only as reliable as its fuel supply chain — a short-term shortage can immobilise a household that has no stored buffer at all." },
    { label: "Maintenance neglect", text: "Vehicles that are only ever serviced reactively — after something fails — cost more over time and fail at less convenient moments than those maintained proactively." },
    { label: "Alternative atrophy", text: "Skills for alternative transport — cycling long distances, using public transport confidently — tend to fade with disuse, exactly when they'd be most useful." },
  ],
  practicalQuestion: "If your main vehicle was unavailable for a week, what's your household's actual plan — not the theoretical one?",
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
  definition: "Nature is the ecosystem, soil, and climate your land and home actually depend on — the working system underneath everything you try to build or grow on it. It covers:",
  definitionPoints: [
    "What condition your soil and local ecosystem are actually in",
    "How much you're working with the local climate versus against it",
    "How much you're permitted to shape the land before it requires approval",
  ],
  definitionOutro: "Ignoring the land's actual condition doesn't make it more productive — it just makes the eventual correction more expensive.",
  facts: [
    { label: "Soil first", text: "Most food and land productivity problems trace back to soil condition, not seed choice or effort — and soil health is rarely tested before it's blamed." },
    { label: "Working with climate", text: "Fighting a local climate's natural pattern — planting or building against it rather than with it — consistently costs more effort for a worse result." },
    { label: "Regulatory reality", text: "What you're permitted to do with your own land — clearing, water use, structures — is governed by regulation that varies significantly by location and is easy to assume rather than check." },
    { label: "Ecosystem service", text: "A functioning local ecosystem does real, uncosted work — pollination, pest control, water filtration — that a degraded one forces you to replace at real expense." },
  ],
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
  definition: "Neighbours are the people close enough to actually help, or be helped, before anyone official could arrive. It covers:",
  definitionPoints: [
    "Who you'd actually knock on the door for, not just recognise",
    "What you know about their situation, and what they know about yours",
    "The small, ongoing exchanges that build trust before it's tested",
  ],
  definitionOutro: "Proximity alone isn't a relationship — most neighbours who could help each other never actually have.",
  facts: [
    { label: "Proximity isn't relationship", text: "Living next to someone for years doesn't automatically create a relationship you could actually rely on in an emergency." },
    { label: "First responders", text: "In most emergencies, the people who help first are physically nearby, not officially dispatched — long before any formal service arrives." },
    { label: "Reciprocity gap", text: "Most people underestimate how willing a neighbour would be to help, because they've never actually tested the relationship by asking for anything small." },
    { label: "Small exchanges", text: "Trust between neighbours is built through small, low-stakes exchanges over time, not through a single large gesture when a crisis hits." },
  ],
  practicalQuestion: "How many of your neighbours could you actually ask for help tonight, and how many would you be a stranger to?",
  detailed: true,
  items: [
    { name: "Knowing them", description: "Actually knowing names, situations, and how to reach them — not just recognising faces." },
    { name: "Small exchanges", description: "The low-stakes favours and check-ins that build real trust before it's ever tested." },
    { name: "Shared awareness", description: "Knowing who's vulnerable, who has useful skills or equipment, and who to check on." },
  ],
  connections: [{ path: ["home", "household-routines"] }],
};

const LOCAL_NETWORK: CodexNode = {
  slug: "local-network",
  name: "Local network",
  tagline: "Friends, tradespeople, and local relationships that aren't formal but are genuinely reliable.",
  definition: "Your local network is the people you could actually call — not because it's their job, but because the relationship is real. It covers:",
  definitionPoints: [
    "Tradespeople you trust, not just the nearest listing",
    "Friends close enough to ask for a genuine favour",
    "The reach of your network beyond your own household",
  ],
  definitionOutro: "A phone full of contacts isn't a network. A network is who'd actually pick up and help.",
  facts: [
    { label: "Contact vs relationship", text: "Having someone's number saved and having a relationship you could actually call on are not the same thing, and most people confuse the two." },
    { label: "Trusted trade", text: "A tradesperson you've used before and trust is measurably faster to reach in an emergency than searching for one cold." },
    { label: "Network reach", text: "A household's actual resilience often depends more on the size and quality of its network than on what it owns — most people underinvest in the relationship side." },
    { label: "Reciprocal effort", text: "Networks that only take and never give tend to quietly weaken until they're not there when needed." },
  ],
  practicalQuestion: "Who outside your household would you actually call first if something went wrong tonight?",
  detailed: true,
  items: [
    { name: "Trusted tradespeople", description: "People you've used before and would call again, not just the nearest search result." },
    { name: "Close friends", description: "Relationships strong enough to ask for a genuine, inconvenient favour." },
    { name: "Professional contacts", description: "People whose skills or knowledge you could draw on outside a formal arrangement." },
  ],
};

const GROUPS_INSTITUTIONS: CodexNode = {
  slug: "groups-institutions",
  name: "Groups & institutions",
  tagline: "Clubs, faith communities, and associations — the groups you're actually part of, not just aware of.",
  definition: "Groups and institutions are the organisations you're actually part of — showing up, contributing, known by name. It covers:",
  definitionPoints: [
    "Active membership — attending, contributing, being known",
    "Passive awareness — knowing a group exists, without ever engaging",
    "What the group could actually provide if you needed it",
  ],
  definitionOutro: "Knowing a community group exists isn't the same as being part of it when it matters.",
  facts: [
    { label: "Passive vs active", text: "Most people can name several local groups or institutions nearby and belong to none of them — awareness isn't membership." },
    { label: "Late engagement", text: "Groups are far more willing to help someone who's shown up before they needed anything, than someone reaching out for the first time in a crisis." },
    { label: "Institutional resilience", text: "Established groups — faith communities, clubs, associations — often have resources and coordination that individual households don't: space, equipment, organised people." },
    { label: "Membership decay", text: "Membership that isn't renewed through actual participation quietly lapses into just a name on an old list." },
  ],
  practicalQuestion: "Name one local group you're an actual, active member of — not just aware of.",
  detailed: true,
  items: [
    { name: "Faith communities", description: "Congregations and religious groups, if part of your life, as an actual support network." },
    { name: "Clubs & associations", description: "Sporting, hobby, or interest groups with real ongoing participation." },
    { name: "Civic organisations", description: "Local associations, volunteer groups, and community organisations you actually contribute to." },
  ],
};

const MUTUAL_AID: CodexNode = {
  slug: "mutual-aid",
  name: "Mutual aid",
  tagline: "Reciprocal help in practice — what you'd offer, what you'd ask for, and the trust that makes both possible.",
  definition: "Mutual aid is reciprocal help that actually happens — not charity, and not a favour bank kept in anyone's head. It covers:",
  definitionPoints: [
    "What you'd genuinely offer, before being asked",
    "What you'd actually be willing to ask for",
    "The trust that makes both of those possible without resentment",
  ],
  definitionOutro: "A community that only takes, or only gives, doesn't stay a community for long.",
  facts: [
    { label: "Asking is harder", text: "Most people are more comfortable offering help than asking for it — which quietly unbalances every relationship that depends on both happening." },
    { label: "Reciprocity, not debt", text: "Functional mutual aid isn't a ledger of exact favours owed — it's a general trust that it evens out over time, and keeping strict score usually breaks that trust." },
    { label: "Untested offers", text: "An offer to help that's never actually been taken up is untested — you don't know if it would hold until it's actually asked of you." },
    { label: "Capacity honesty", text: "Overcommitting to help beyond your actual capacity erodes trust worse than never offering — reliability matters more than generosity." },
  ],
  practicalQuestion: "What would you genuinely be willing to offer a neighbour or friend before they had to ask — and have you ever actually said so?",
  detailed: true,
  items: [
    { name: "What you'd offer", description: "Skills, equipment, time, or space you'd genuinely make available to others." },
    { name: "What you'd ask for", description: "Being honest about what you'd actually need, and willing to ask for it." },
    { name: "Trust & reciprocity", description: "The ongoing exchange that makes both sides of mutual aid sustainable, not one-directional." },
  ],
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
