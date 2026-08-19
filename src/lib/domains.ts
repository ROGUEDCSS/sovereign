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

export interface Domain {
  id: DomainId;
  name: string;
  tagline: string;
  questions: Question[];
  quickAction: QuickAction;
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
    questions: [
      {
        id: "identity-1",
        text: "If your main phone was lost or your primary digital ID was locked tomorrow, could you prove who you are and recover access?",
        options: [
          { label: "No backup — everything routes through one phone or account", score: 0 },
          { label: "A backup email, but no physical documents on hand", score: 3 },
          { label: "Certified copies of key documents stored securely", score: 7 },
          { label: "Certified copies, an offline recovery record, and a non-digital ID form", score: 10 },
        ],
      },
      {
        id: "identity-2",
        text: "How many independent ways can you authenticate yourself, not counting one phone number?",
        options: [
          { label: "Just one — my phone", score: 0 },
          { label: "Two — phone and email", score: 3 },
          { label: "Three, including a hardware key or backup device", score: 7 },
          { label: "Four or more, including offline or physical options", score: 10 },
        ],
      },
      {
        id: "identity-3",
        text: "Do you know what personal data each major service actually requires from you, versus what you've handed over by default?",
        options: [
          { label: "Never thought about it", score: 0 },
          { label: "Vaguely aware", score: 3 },
          { label: "I've reviewed my main accounts", score: 7 },
          { label: "I actively minimise what I share, and know my rights to limit disclosure", score: 10 },
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
    questions: [
      {
        id: "money-1",
        text: "If electronic payments were unavailable for 72 hours, could your household still buy essentials?",
        options: [
          { label: "No cash on hand at all", score: 0 },
          { label: "A small amount, under a day's needs", score: 3 },
          { label: "Enough cash for several days", score: 7 },
          { label: "A dedicated emergency cash reserve plus alternative payment options", score: 10 },
        ],
      },
      {
        id: "money-2",
        text: "How many genuinely independent places is your money held?",
        options: [
          { label: "One bank, one account", score: 0 },
          { label: "One bank, multiple accounts", score: 3 },
          { label: "Two or more separate institutions", score: 7 },
          { label: "Multiple institutions plus assets outside the banking system entirely", score: 10 },
        ],
      },
      {
        id: "money-3",
        text: "Do you have an emergency fund that could cover essential expenses if income stopped?",
        options: [
          { label: "None", score: 0 },
          { label: "Under 2 weeks", score: 3 },
          { label: "1–3 months", score: 7 },
          { label: "3 months or more", score: 10 },
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
    questions: [
      {
        id: "property-1",
        text: "Do you have access to land or property that could produce something useful — food, water, energy — if needed?",
        options: [
          { label: "None", score: 0 },
          { label: "A balcony or small yard only", score: 3 },
          { label: "A garden or block with real growing space", score: 7 },
          { label: "Land actively set up for production", score: 10 },
        ],
      },
      {
        id: "property-2",
        text: "If you rent, do you have a housing-stability plan; if you own, is your position genuinely secure?",
        options: [
          { label: "No plan — highly exposed", score: 0 },
          { label: "Some awareness, no plan", score: 3 },
          { label: "A basic plan in place", score: 7 },
          { label: "Secure position with a real contingency", score: 10 },
        ],
      },
      {
        id: "property-3",
        text: "Do you have any productive assets beyond your home itself — tools, land, equipment?",
        options: [
          { label: "None", score: 0 },
          { label: "A few basic tools", score: 3 },
          { label: "A meaningful set of productive equipment", score: 7 },
          { label: "Land or equipment that could genuinely sustain part of your needs", score: 10 },
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
    questions: [
      {
        id: "food-1",
        text: "How many days could your household eat using only what's already in the house?",
        options: [
          { label: "Under 3 days", score: 0 },
          { label: "About a week", score: 3 },
          { label: "2–4 weeks", score: 7 },
          { label: "More than a month", score: 10 },
        ],
      },
      {
        id: "food-2",
        text: "Can you grow, preserve, or produce any of your own food?",
        options: [
          { label: "No capability or space", score: 0 },
          { label: "A little — herbs, a small pot garden", score: 3 },
          { label: "A real vegetable garden, actively used", score: 7 },
          { label: "Growing plus preserving or storing capability", score: 10 },
        ],
      },
      {
        id: "food-3",
        text: "If your usual supermarket was disrupted for weeks, do you have alternative food sources?",
        options: [
          { label: "None identified", score: 0 },
          { label: "I know of alternatives but haven't used them", score: 3 },
          { label: "I use at least one alternative regularly", score: 7 },
          { label: "Multiple independent food sources already in use", score: 10 },
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
    questions: [
      {
        id: "water-1",
        text: "If mains water was cut for 72 hours, does your household have enough stored to drink and cook?",
        options: [
          { label: "No stored water", score: 0 },
          { label: "A little, under a day's supply", score: 3 },
          { label: "Several days' supply", score: 7 },
          { label: "A proper reserve plus a way to purify more", score: 10 },
        ],
      },
      {
        id: "water-2",
        text: "Do you have any way to collect or access water independent of the mains supply?",
        options: [
          { label: "None", score: 0 },
          { label: "Aware of options nearby, not set up", score: 3 },
          { label: "Basic rainwater collection or access to a bore or tank", score: 7 },
          { label: "A working independent water system in regular use", score: 10 },
        ],
      },
      {
        id: "water-3",
        text: "Could you make questionable water safe to drink if you had to?",
        options: [
          { label: "No idea how", score: 0 },
          { label: "I know boiling works, no other method", score: 3 },
          { label: "I have a filter or purification tablets on hand", score: 7 },
          { label: "I have filtration and purification, and know multiple methods", score: 10 },
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
    questions: [
      {
        id: "energy-1",
        text: "If the grid went down for 48 hours, could your household maintain light, basic refrigeration, and phone charging?",
        options: [
          { label: "No backup at all", score: 0 },
          { label: "A few torches or candles only", score: 3 },
          { label: "A generator or battery bank that covers essentials", score: 7 },
          { label: "A tested solar or battery system covering most needs", score: 10 },
        ],
      },
      {
        id: "energy-2",
        text: "Do you have stored fuel or an independent energy source?",
        options: [
          { label: "None", score: 0 },
          { label: "A small amount, untracked", score: 3 },
          { label: "A deliberate fuel reserve, rotated", score: 7 },
          { label: "Independent generation plus storage", score: 10 },
        ],
      },
      {
        id: "energy-3",
        text: "Have you actually tested your backup energy setup, or is it theoretical?",
        options: [
          { label: "No backup to test", score: 0 },
          { label: "I have something but have never tested it", score: 3 },
          { label: "Tested once", score: 7 },
          { label: "Tested and part of a regular routine", score: 10 },
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
    questions: [
      {
        id: "transport-1",
        text: "If fuel became scarce or expensive for weeks, could you still get to essential places?",
        options: [
          { label: "No alternative to my car", score: 0 },
          { label: "I could walk or cycle short distances only", score: 3 },
          { label: "I have a genuine alternative — bike, public transport, proximity", score: 7 },
          { label: "Multiple real alternatives, already used regularly", score: 10 },
        ],
      },
      {
        id: "transport-2",
        text: "Could you do basic maintenance or repairs on your main vehicle or bike yourself?",
        options: [
          { label: "No idea", score: 0 },
          { label: "Very basic — check oil, change a tyre", score: 3 },
          { label: "Comfortable with common repairs", score: 7 },
          { label: "Confident mechanically, could keep it running with limited parts", score: 10 },
        ],
      },
      {
        id: "transport-3",
        text: "Do you have recovery equipment or a plan if your main transport failed away from home?",
        options: [
          { label: "None", score: 0 },
          { label: "A vague idea", score: 3 },
          { label: "Basic kit and a plan", score: 7 },
          { label: "Full kit, plan, and backup transport identified", score: 10 },
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
    questions: [
      {
        id: "comms-1",
        text: "If mobile networks and internet were down, how would you reach family or get information?",
        options: [
          { label: "No idea, no plan", score: 0 },
          { label: "I'd rely on neighbours or word of mouth only", score: 3 },
          { label: "I have a battery radio or backup phone charging", score: 7 },
          { label: "A working alternative and an agreed household plan", score: 10 },
        ],
      },
      {
        id: "comms-2",
        text: "Do you have a way to charge or power communication devices without mains power?",
        options: [
          { label: "No", score: 0 },
          { label: "A basic power bank", score: 3 },
          { label: "Solar charger or generator-fed charging", score: 7 },
          { label: "Multiple redundant charging options, tested", score: 10 },
        ],
      },
      {
        id: "comms-3",
        text: "Does your household have an agreed plan for reconnecting if separated during a disruption?",
        options: [
          { label: "No plan at all", score: 0 },
          { label: "A vague understanding", score: 3 },
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
    questions: [
      {
        id: "digsec-1",
        text: "If your main email or cloud account was compromised, how much of your life could an attacker access?",
        options: [
          { label: "Everything — one password unlocks it all", score: 0 },
          { label: "Most things, a few accounts separate", score: 3 },
          { label: "Key accounts are separated and protected", score: 7 },
          { label: "Strong separation, hardware keys, and tested recovery", score: 10 },
        ],
      },
      {
        id: "digsec-2",
        text: "Do you have backups of your important files or photos that don't rely on a single cloud provider?",
        options: [
          { label: "No backups", score: 0 },
          { label: "One cloud backup only", score: 3 },
          { label: "Cloud plus one local backup", score: 7 },
          { label: "Multiple independent backups, at least one offline", score: 10 },
        ],
      },
      {
        id: "digsec-3",
        text: "Do you use unique passwords and multi-factor authentication on your important accounts?",
        options: [
          { label: "Reused passwords, no MFA", score: 0 },
          { label: "Some unique passwords, little MFA", score: 3 },
          { label: "Password manager plus MFA on key accounts", score: 7 },
          { label: "Password manager, MFA everywhere, hardware key where possible", score: 10 },
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
    questions: [
      {
        id: "health-1",
        text: "Could your household manage a minor medical issue — a cut, burn, sprain, or fever — without needing to leave home immediately?",
        options: [
          { label: "No first-aid supplies or knowledge", score: 0 },
          { label: "A basic kit, little knowledge", score: 3 },
          { label: "A decent kit and basic first-aid training", score: 7 },
          { label: "Well-stocked, trained, and know when escalation is actually needed", score: 10 },
        ],
      },
      {
        id: "health-2",
        text: "Do you hold at least a few weeks' supply of any essential medication your household depends on?",
        options: [
          { label: "No buffer at all", score: 0 },
          { label: "A few days' buffer", score: 3 },
          { label: "2–4 weeks' buffer", score: 7 },
          { label: "A month or more, with a renewal plan", score: 10 },
        ],
      },
      {
        id: "health-3",
        text: "Does anyone in your household have real first-aid or emergency-care training?",
        options: [
          { label: "No one", score: 0 },
          { label: "Basic awareness only", score: 3 },
          { label: "At least one person certified", score: 7 },
          { label: "Multiple people trained, certification current", score: 10 },
        ],
      },
    ],
  },
  {
    id: "skills",
    name: "Skills",
    tagline: "Acquire practical capabilities that reduce dependence on external services.",
    quickAction: {
      title: "Start building one practical skill deliberately",
      cost: "$0–200",
      time: "Ongoing",
      why: "A single well-developed skill — repair, growing, preserving — compounds across every other domain.",
    },
    questions: [
      {
        id: "skills-1",
        text: "How many practical skills could you rely on without paying someone else — repair, food preservation, basic construction, growing food?",
        options: [
          { label: "None really", score: 0 },
          { label: "One", score: 3 },
          { label: "Two or three", score: 7 },
          { label: "Several, actively used", score: 10 },
        ],
      },
      {
        id: "skills-2",
        text: "If something in your home broke tomorrow, could you diagnose the problem even if you couldn't fully fix it?",
        options: [
          { label: "No idea where to start", score: 0 },
          { label: "I could look it up but wouldn't trust myself", score: 3 },
          { label: "I could diagnose and handle simple fixes", score: 7 },
          { label: "I could diagnose and fix most common issues myself", score: 10 },
        ],
      },
      {
        id: "skills-3",
        text: "Are you actively building any practical skill right now?",
        options: [
          { label: "Not at all", score: 0 },
          { label: "Thought about it, not started", score: 3 },
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
    questions: [
      {
        id: "community-1",
        text: "If you needed help urgently — a ride, a meal, a place to stay — how many people nearby could you actually call?",
        options: [
          { label: "No one nearby", score: 0 },
          { label: "One person", score: 3 },
          { label: "A handful of people", score: 7 },
          { label: "A real network I could call on, and who could call on me", score: 10 },
        ],
      },
      {
        id: "community-2",
        text: "Do you know your immediate neighbours well enough to ask for or offer help?",
        options: [
          { label: "Don't know them at all", score: 0 },
          { label: "Know them to nod to", score: 3 },
          { label: "Know a few well", score: 7 },
          { label: "Genuine reciprocal relationships with several", score: 10 },
        ],
      },
      {
        id: "community-3",
        text: "Are you part of any group — formal or informal — that could mobilise in a disruption?",
        options: [
          { label: "No", score: 0 },
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

export function totalScore(answers: Record<string, number>): number {
  return DOMAINS.reduce((sum, d) => sum + domainScore(d, answers), 0);
}

export function statusForScore(total: number): string {
  if (total < 40) return "Fragile";
  if (total < 70) return "Developing";
  if (total < 95) return "Resilient";
  return "High sovereignty";
}
