export interface ThreatSystem {
  name: string;
  vulnerabilities: string[];
}

export const THREAT_SYSTEMS: ThreatSystem[] = [
  {
    name: "Global food system",
    vulnerabilities: [
      "Drought",
      "War",
      "Fertiliser shortages",
      "Fuel costs",
      "Transport disruption",
      "Disease",
      "Trade restrictions",
      "Inflation",
      "Cyberattack on distribution systems",
    ],
  },
  {
    name: "Digital system",
    vulnerabilities: [
      "Cyberattack",
      "Identity theft",
      "Platform failure",
      "Internet outage",
      "Power outage",
      "Account lockout",
      "Data breach",
    ],
  },
  {
    name: "Financial system",
    vulnerabilities: [
      "Bank failure",
      "Payment outage",
      "Inflation",
      "Capital controls",
      "Cyberattack",
      "Liquidity restrictions",
    ],
  },
  {
    name: "Energy system",
    vulnerabilities: [
      "Grid failure",
      "Fuel shortage",
      "Extreme weather",
      "Infrastructure failure",
    ],
  },
];
