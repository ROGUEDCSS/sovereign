export type DomainId =
  | "identity"
  | "money"
  | "property"
  | "food"
  | "water"
  | "energy"
  | "transport"
  | "communications"
  | "digital-security"
  | "health"
  | "skills"
  | "community";

export interface QuestionOption {
  label: string;
  score: number;
}

export interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
}

export interface QuickAction {
  title: string;
  cost: string;
  time: string;
  why: string;
}

export interface TierAdvice {
  red: string;
  amber: string;
  green: string;
}

export interface Domain {
  id: DomainId;
  name: string;
  tagline: string;
  questions: Question[];
  quickAction: QuickAction;
  tierAdvice: TierAdvice;
}

export const DOMAINS: Domain[] = [
  {
    id: "identity",
    name: "Identity",
    tagline: "Reduce dependence on any single digital identity or authentication method.",
    quickAction: {
      title: "Create an offline document archive",
      cost: "$0–50",
      time: "1 evening",
      why: "Certified copies of key documents mean a lost phone or locked account isn't a lost identity.",
    },
    tierAdvice: {
      red: "Everything about you routes through one phone and one login. Get certified copies of your key documents made this week, and set up at least one backup way to prove who you are.",
      amber: "You've got a fallback or two, but no offline backup. Add a certified paper copy of your ID and one non-digital recovery method.",
      green: "You've got real redundancy across identity and authentication — keep your backups current as documents expire.",
    },
    questions: [
      {
        id: "identity-1",
        text: "If your main phone was lost or your primary digital ID was locked tomorrow, could you prove who you are and recover access?",
        options: [
          { label: "No backup — everything routes through one phone or account", score: 0 },
          { label: "Email backup — no physical documents", score: 3 },
          { label: "Certified copies of key documents — stored securely", score: 7 },
          { label: "Certified copies of key documents, an offline recovery record, and a non-digital ID form", score: 10 },
        ],
      },
      {
        id: "identity-2",
        text: "How many independent ways can you authenticate yourself, not counting one phone number?",
        options: [
          { label: "One method — my phone", score: 0 },
          { label: "Two methods — phone and email", score: 3 },
          { label: "Three methods — phone, email, and a hardware key or backup device", score: 7 },
          { label: "Four or more methods — phone, email, hardware key, and offline or physical options", score: 10 },
        ],
      },
      {
        id: "identity-3",
        text: "Do you know what personal data each major service actually requires from you, versus what you've handed over by default?",
        options: [
          { label: "No awareness — never thought about it", score: 0 },
          { label: "Some awareness — vaguely aware of what's shared", score: 3 },
          { label: "Active awareness — reviewed my main accounts", score: 7 },
          { label: "Active awareness and action — minimise what I share, and know my rights to limit disclosure", score: 10 },
        ],
      },
    ],
  },
  {
    id: "money",
    name: "Money",
    tagline: "Maintain financial redundancy across institutions and payment methods.",
    quickAction: {
      title: "Build a $500 emergency cash reserve",
      cost: "$500",
      time: "Ongoing",
      why: "Cash still works when card networks, apps, or the power itself do not.",
    },
    tierAdvice: {
      red: "You need to open a second bank account, and start putting at least 10% of your monthly income aside as a cash reserve.",
      amber: "You've got a start, but it's concentrated in one place. Open an account at a second institution and grow your cash reserve toward a week's expenses.",
      green: "Your money is genuinely spread across institutions and forms — keep the reserve topped up as expenses change.",
    },
    questions: [
      {
        id: "money-1",
        text: "If electronic payments were unavailable for 72 hours, could your household still buy essentials?",
        options: [
          { label: "No cash — nothing on hand at all", score: 0 },
          { label: "Some cash — under a day's needs", score: 3 },
          { label: "Several days' cash — enough to get by for a while", score: 7 },
          { label: "Several days' cash, plus a dedicated reserve and alternative payment options", score: 10 },
        ],
      },
      {
        id: "money-2",
        text: "How many genuinely independent places is your money held?",
        options: [
          { label: "One bank — a single account", score: 0 },
          { label: "One bank — multiple accounts", score: 3 },
          { label: "Two or more banks — separate institutions", score: 7 },
          { label: "Two or more banks, plus assets held outside the banking system entirely", score: 10 },
        ],
      },
      {
        id: "money-3",
        text: "Do you have an emergency fund that could cover essential expenses if income stopped?",
        options: [
          { label: "No emergency fund", score: 0 },
          { label: "Under two weeks of expenses covered", score: 3 },
          { label: "One to three months of expenses covered", score: 7 },
          { label: "Three months or more covered", score: 10 },
        ],
      },
    ],
  },
  {
    id: "property",
    name: "Property",
    tagline: "Own or access productive assets where financially and legally practical.",
    quickAction: {
      title: "Audit your land and equipment for productive use",
      cost: "$0",
      time: "1 weekend",
      why: "Most households already have unused capacity — a yard, a shed, a spare room — worth mapping before buying anything.",
    },
    tierAdvice: {
      red: "You have no productive land or equipment, and no housing-stability plan. Start by mapping what you already have — a yard, a shed, unused space — before buying anything.",
      amber: "You've got some space or a basic plan, but it's not doing much yet. Pick one part of it and put it to use this month.",
      green: "You've got real productive capacity — keep expanding it deliberately, not opportunistically.",
    },
    questions: [
      {
        id: "property-1",
        text: "Do you have access to land or property that could produce something useful — food, water, energy — if needed?",
        options: [
          { label: "No access to productive land", score: 0 },
          { label: "A balcony or small yard only", score: 3 },
          { label: "A garden or block with real growing space", score: 7 },
          { label: "Land already set up and actively producing", score: 10 },
        ],
      },
      {
        id: "property-2",
        text: "If you rent, do you have a housing-stability plan; if you own, is your position genuinely secure?",
        options: [
          { label: "No plan — highly exposed", score: 0 },
          { label: "Aware of the risk — no plan yet", score: 3 },
          { label: "A basic plan in place", score: 7 },
          { label: "A secure position, with a real contingency plan", score: 10 },
        ],
      },
      {
        id: "property-3",
        text: "Do you have any productive assets beyond your home itself — tools, land, equipment?",
        options: [
          { label: "No productive assets", score: 0 },
          { label: "A few basic tools", score: 3 },
          { label: "A meaningful set of tools and equipment", score: 7 },
          { label: "Tools and equipment — or land — that could genuinely sustain part of your needs", score: 10 },
        ],
      },
    ],
  },
  {
    id: "food",
    name: "Food",
    tagline: "Develop household food security through storage and production.",
    quickAction: {
      title: "Store 30 days of essential food",
      cost: "$150–300",
      time: "Ongoing, start this week",
      why: "The single highest-leverage action in the whole assessment — covers disruption from inflation, supply shocks, or income loss alike.",
    },
    tierAdvice: {
      red: "You have under three days of food in the house and no growing capability. Start a 30-day pantry this week — it's the single highest-leverage action in the whole assessment.",
      amber: "You've got some stock and maybe a small garden, but not enough to matter in a real disruption. Push your pantry toward a month and get one growing bed producing.",
      green: "You're genuinely food-secure — keep rotating stock and expanding what you grow or preserve.",
    },
    questions: [
      {
        id: "food-1",
        text: "How many days could your household eat using only what's already in the house?",
        options: [
          { label: "Under three days of food in the house", score: 0 },
          { label: "About a week of food in the house", score: 3 },
          { label: "Two to four weeks of food in the house", score: 7 },
          { label: "More than a month of food in the house", score: 10 },
        ],
      },
      {
        id: "food-2",
        text: "Can you grow, preserve, or produce any of your own food?",
        options: [
          { label: "No growing capability or space", score: 0 },
          { label: "A little growing — herbs, a small pot garden", score: 3 },
          { label: "A real vegetable garden, actively used", score: 7 },
          { label: "A real vegetable garden, plus preserving and storing capability", score: 10 },
        ],
      },
      {
        id: "food-3",
        text: "If your usual supermarket was disrupted for weeks, do you have alternative food sources?",
        options: [
          { label: "No alternatives identified", score: 0 },
          { label: "Alternatives identified — not yet used", score: 3 },
          { label: "One alternative — already in regular use", score: 7 },
          { label: "Multiple independent alternatives — already in regular use", score: 10 },
        ],
      },
    ],
  },
  {
    id: "water",
    name: "Water",
    tagline: "Establish independent water storage, collection, and purification capability.",
    quickAction: {
      title: "Establish a 72-hour water reserve",
      cost: "$30–80",
      time: "1 afternoon",
      why: "Water is the shortest-fuse dependency of all — most people can go weeks without food but only days without water.",
    },
    tierAdvice: {
      red: "You have no stored water and no independent access. A 72-hour reserve costs under $80 and takes an afternoon — do it this week.",
      amber: "You've got a few days covered, but no way to get more. Add basic rainwater collection or a filter so a short outage doesn't become a long one.",
      green: "You've got real water independence — keep your filtration and storage tested and current.",
    },
    questions: [
      {
        id: "water-1",
        text: "If mains water was cut for 72 hours, does your household have enough stored to drink and cook?",
        options: [
          { label: "No stored water", score: 0 },
          { label: "Some stored water — under a day's supply", score: 3 },
          { label: "Several days' supply stored", score: 7 },
          { label: "Several days' supply stored, plus a way to purify more", score: 10 },
        ],
      },
      {
        id: "water-2",
        text: "Do you have any way to collect or access water independent of the mains supply?",
        options: [
          { label: "No independent access", score: 0 },
          { label: "Aware of options nearby — not set up", score: 3 },
          { label: "Basic collection set up — rainwater, bore, or tank", score: 7 },
          { label: "A full independent water system, in regular use", score: 10 },
        ],
      },
      {
        id: "water-3",
        text: "Could you make questionable water safe to drink if you had to?",
        options: [
          { label: "No idea how", score: 0 },
          { label: "One method known — boiling", score: 3 },
          { label: "One method on hand — a filter or purification tablets", score: 7 },
          { label: "Multiple methods on hand — filtration, purification, and know-how", score: 10 },
        ],
      },
    ],
  },
  {
    id: "energy",
    name: "Energy",
    tagline: "Develop backup energy capacity that has actually been tested.",
    quickAction: {
      title: "Install 48-hour backup power for essentials",
      cost: "$150–1,200",
      time: "1 weekend",
      why: "Lighting, refrigeration, and communications charging cover most of what a household actually needs during an outage.",
    },
    tierAdvice: {
      red: "You have no backup power at all. Start with lighting and phone charging — a battery bank and a plan cost under $200 and cover the two things you'll miss most.",
      amber: "You've got something, but you've never tested it under real conditions. Run it for a full evening this month and find the gaps before an outage does.",
      green: "You've got tested backup power — keep it maintained and rehearse it at least once a year.",
    },
    questions: [
      {
        id: "energy-1",
        text: "If the grid went down for 48 hours, could your household maintain light, basic refrigeration, and phone charging?",
        options: [
          { label: "No backup at all", score: 0 },
          { label: "Basic backup — torches or candles only", score: 3 },
          { label: "Real backup — a generator or battery bank covering essentials", score: 7 },
          { label: "Tested backup — a solar or battery system covering most needs", score: 10 },
        ],
      },
      {
        id: "energy-2",
        text: "Do you have stored fuel or an independent energy source?",
        options: [
          { label: "No stored fuel or independent source", score: 0 },
          { label: "A small, untracked amount of fuel", score: 3 },
          { label: "A deliberate fuel reserve, kept rotated", score: 7 },
          { label: "A deliberate fuel reserve, plus independent generation", score: 10 },
        ],
      },
      {
        id: "energy-3",
        text: "Have you actually tested your backup energy setup, or is it theoretical?",
        options: [
          { label: "No backup to test", score: 0 },
          { label: "Backup exists — never tested", score: 3 },
          { label: "Backup tested once", score: 7 },
          { label: "Backup tested regularly, as part of routine", score: 10 },
        ],
      },
    ],
  },
  {
    id: "transport",
    name: "Transport",
    tagline: "Maintain transportation that remains usable during infrastructure failures.",
    quickAction: {
      title: "Learn one real repair skill for your main vehicle",
      cost: "$0–100",
      time: "A few hours",
      why: "Mechanical self-sufficiency reduces dependence on parts availability and service networks under strain.",
    },
    tierAdvice: {
      red: "You have no alternative to your car and no ability to repair it. Learn one real repair — a tyre change is the place to start — and identify a genuine backup option.",
      amber: "You've got a fallback, but it's not one you actually use. Ride or drive your alternative route once this month so it's proven, not theoretical.",
      green: "You've got genuine transport redundancy — keep your alternatives current and your vehicle maintained.",
    },
    questions: [
      {
        id: "transport-1",
        text: "If fuel became scarce or expensive for weeks, could you still get to essential places?",
        options: [
          { label: "No alternative to my car", score: 0 },
          { label: "A limited alternative — walking or cycling short distances", score: 3 },
          { label: "One genuine alternative — bike, public transport, or proximity", score: 7 },
          { label: "Multiple genuine alternatives, already used regularly", score: 10 },
        ],
      },
      {
        id: "transport-2",
        text: "Could you do basic maintenance or repairs on your main vehicle or bike yourself?",
        options: [
          { label: "No idea how", score: 0 },
          { label: "Very basic — checking oil, changing a tyre", score: 3 },
          { label: "Comfortable with common repairs", score: 7 },
          { label: "Confident with common repairs, and could keep it running with limited parts", score: 10 },
        ],
      },
      {
        id: "transport-3",
        text: "Do you have recovery equipment or a plan if your main transport failed away from home?",
        options: [
          { label: "No equipment or plan", score: 0 },
          { label: "A vague idea — nothing concrete", score: 3 },
          { label: "A basic kit and a plan", score: 7 },
          { label: "A full kit and plan, plus backup transport identified", score: 10 },
        ],
      },
    ],
  },
  {
    id: "communications",
    name: "Communications",
    tagline: "Have communication alternatives that don't depend on the mobile network.",
    quickAction: {
      title: "Establish backup communications",
      cost: "$40–150",
      time: "1 afternoon",
      why: "A battery radio and a household reconnection plan cover the two things that actually fail together — information and coordination.",
    },
    tierAdvice: {
      red: "You have no plan for reaching family or getting information if networks go down. A battery radio costs under $50 — get one, and agree a fallback meeting point with your household.",
      amber: "You've got a device or two, but no agreed household plan. Sit down this week and actually write the plan down.",
      green: "You've got real, tested communications redundancy — keep the charging and the plan current.",
    },
    questions: [
      {
        id: "comms-1",
        text: "If mobile networks and internet were down, how would you reach family or get information?",
        options: [
          { label: "No idea, no plan", score: 0 },
          { label: "Word of mouth only — relying on neighbours", score: 3 },
          { label: "A working alternative — battery radio or backup charging", score: 7 },
          { label: "A working alternative, plus an agreed household plan", score: 10 },
        ],
      },
      {
        id: "comms-2",
        text: "Do you have a way to charge or power communication devices without mains power?",
        options: [
          { label: "No independent power", score: 0 },
          { label: "A basic power bank", score: 3 },
          { label: "Solar or generator-fed charging", score: 7 },
          { label: "Multiple redundant charging options, tested", score: 10 },
        ],
      },
      {
        id: "comms-3",
        text: "Does your household have an agreed plan for reconnecting if separated during a disruption?",
        options: [
          { label: "No plan at all", score: 0 },
          { label: "A vague understanding — nothing agreed", score: 3 },
          { label: "A basic agreed plan", score: 7 },
          { label: "A written, practiced plan with a fallback meeting point", score: 10 },
        ],
      },
    ],
  },
  {
    id: "digital-security",
    name: "Digital security",
    tagline: "Control your own data, credentials, and backups.",
    quickAction: {
      title: "Set up a password manager and MFA on key accounts",
      cost: "$0–60/yr",
      time: "1 evening",
      why: "The highest-leverage digital-security action available — closes off the most common route attackers actually use.",
    },
    tierAdvice: {
      red: "One password unlocks everything you own online. Set up a password manager and multi-factor authentication on your email this week — it's the highest-leverage security action available.",
      amber: "You've separated a few accounts, but the important ones are still exposed. Put MFA on your email and financial accounts specifically — those are the ones that unlock everything else.",
      green: "You've got real digital security discipline — keep your recovery methods tested as accounts change.",
    },
    questions: [
      {
        id: "digsec-1",
        text: "If your main email or cloud account was compromised, how much of your life could an attacker access?",
        options: [
          { label: "Everything — one password unlocks it all", score: 0 },
          { label: "Most things — only a few accounts kept separate", score: 3 },
          { label: "Key accounts separated and protected", score: 7 },
          { label: "Full separation — key accounts protected, hardware keys, and tested recovery", score: 10 },
        ],
      },
      {
        id: "digsec-2",
        text: "Do you have backups of your important files or photos that don't rely on a single cloud provider?",
        options: [
          { label: "No backups", score: 0 },
          { label: "One cloud backup only", score: 3 },
          { label: "One cloud backup, plus one local backup", score: 7 },
          { label: "Multiple independent backups, at least one offline", score: 10 },
        ],
      },
      {
        id: "digsec-3",
        text: "Do you use unique passwords and multi-factor authentication on your important accounts?",
        options: [
          { label: "Reused passwords — no MFA", score: 0 },
          { label: "Some unique passwords — little MFA", score: 3 },
          { label: "A password manager, plus MFA on key accounts", score: 7 },
          { label: "A password manager, MFA everywhere, and a hardware key where possible", score: 10 },
        ],
      },
    ],
  },
  {
    id: "health",
    name: "Health",
    tagline: "Develop first-aid capability, medication buffer, and access redundancy.",
    quickAction: {
      title: "Build a proper first-aid kit and learn to use it",
      cost: "$60–150",
      time: "A weekend course",
      why: "Most household medical events are minor — the gap is usually knowledge and supplies, not access to a hospital.",
    },
    tierAdvice: {
      red: "You have no first-aid kit and no training. A proper kit costs $60–150 and a weekend course covers the basics that actually come up.",
      amber: "You've got a kit, but not the knowledge to use it well. Book a first-aid course — the kit is only as good as the person using it.",
      green: "You've got real first-aid capability in the household — keep certifications current and the kit stocked.",
    },
    questions: [
      {
        id: "health-1",
        text: "Could your household manage a minor medical issue — a cut, burn, sprain, or fever — without needing to leave home immediately?",
        options: [
          { label: "No first-aid supplies or knowledge", score: 0 },
          { label: "A basic kit — little knowledge to go with it", score: 3 },
          { label: "A decent kit, plus basic first-aid training", score: 7 },
          { label: "Well-stocked and trained, and know when escalation is actually needed", score: 10 },
        ],
      },
      {
        id: "health-2",
        text: "Do you hold at least a few weeks' supply of any essential medication your household depends on?",
        options: [
          { label: "No buffer at all", score: 0 },
          { label: "A few days' buffer", score: 3 },
          { label: "Two to four weeks' buffer", score: 7 },
          { label: "A month or more, with a renewal plan in place", score: 10 },
        ],
      },
      {
        id: "health-3",
        text: "Does anyone in your household have real first-aid or emergency-care training?",
        options: [
          { label: "No one trained", score: 0 },
          { label: "Basic awareness only — no certification", score: 3 },
          { label: "One person certified", score: 7 },
          { label: "Multiple people trained, certification current", score: 10 },
        ],
      },
    ],
  },
  {
    id: "skills",
    name: "Skills",
    tagline: "Acquire practical skills that reduce dependence on external services.",
    quickAction: {
      title: "Start building one practical skill deliberately",
      cost: "$0–200",
      time: "Ongoing",
      why: "A single well-developed skill — repair, growing, preserving — compounds across every other domain.",
    },
    tierAdvice: {
      red: "You have no practical skill you could rely on without paying someone else. Pick one — repair, growing, preserving — and start deliberately this month.",
      amber: "You've got one skill, but it's not compounding into others. Add a second, ideally one that supports the first.",
      green: "You've got real, actively-used practical skills — keep building rather than plateauing.",
    },
    questions: [
      {
        id: "skills-1",
        text: "How many practical skills could you rely on without paying someone else — repair, food preservation, basic construction, growing food?",
        options: [
          { label: "No practical skills to rely on", score: 0 },
          { label: "One practical skill", score: 3 },
          { label: "Two or three practical skills", score: 7 },
          { label: "Several practical skills, actively used", score: 10 },
        ],
      },
      {
        id: "skills-2",
        text: "If something in your home broke tomorrow, could you diagnose the problem even if you couldn't fully fix it?",
        options: [
          { label: "No idea where to start", score: 0 },
          { label: "Could look it up — wouldn't trust myself to act", score: 3 },
          { label: "Could diagnose it, and handle simple fixes", score: 7 },
          { label: "Could diagnose and fix most common issues myself", score: 10 },
        ],
      },
      {
        id: "skills-3",
        text: "Are you actively building any practical skill right now?",
        options: [
          { label: "Not at all", score: 0 },
          { label: "Thought about it — not started", score: 3 },
          { label: "Learning casually", score: 7 },
          { label: "Actively and consistently building a specific skill", score: 10 },
        ],
      },
    ],
  },
  {
    id: "community",
    name: "Community",
    tagline: "Build reciprocal relationships with competent people nearby.",
    quickAction: {
      title: "Have one real conversation with a neighbour this week",
      cost: "$0",
      time: "20 minutes",
      why: "Community is the domain money can't buy quickly — it compounds slowly, so the best time to start is before you need it.",
    },
    tierAdvice: {
      red: "You don't know your neighbours and have no one nearby to call. Have one real conversation with a neighbour this week — it's the slowest-compounding domain, so the best time to start is now.",
      amber: "You know a few people, but the relationships aren't reciprocal yet. Offer to help someone before you need help yourself — that's what makes it reciprocal.",
      green: "You've got a genuine, reciprocal network — keep showing up for it, not just drawing on it.",
    },
    questions: [
      {
        id: "community-1",
        text: "If you needed help urgently — a ride, a meal, a place to stay — how many people nearby could you actually call?",
        options: [
          { label: "No one nearby to call", score: 0 },
          { label: "One person I could call", score: 3 },
          { label: "A handful of people I could call", score: 7 },
          { label: "A real network — people I could call, who could call on me too", score: 10 },
        ],
      },
      {
        id: "community-2",
        text: "Do you know your immediate neighbours well enough to ask for or offer help?",
        options: [
          { label: "Don't know them at all", score: 0 },
          { label: "Know them to nod to — nothing more", score: 3 },
          { label: "Know a few of them well", score: 7 },
          { label: "Genuine, reciprocal relationships with several", score: 10 },
        ],
      },
      {
        id: "community-3",
        text: "Are you part of any group — formal or informal — that could mobilise in a disruption?",
        options: [
          { label: "Not part of any group", score: 0 },
          { label: "Loosely connected to one", score: 3 },
          { label: "Active member of one", score: 7 },
          { label: "Active in more than one, with a real role", score: 10 },
        ],
      },
    ],
  },
];

export function domainScore(domain: Domain, answers: Record<string, number>): number {
  const scores = domain.questions.map((q) => answers[q.id] ?? 0);
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  return Math.round(avg);
}

