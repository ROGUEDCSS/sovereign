import { DomainId } from "./domains";

export interface Scenario {
  id: string;
  letter: string;
  title: string;
  description: string;
  domains: DomainId[];
}

export const SCENARIOS: Scenario[] = [
  {
    id: "power-failure",
    letter: "A",
    title: "72-hour power failure",
    description: "The grid goes down across your area for three full days.",
    domains: ["energy", "communications"],
  },
  {
    id: "internet-outage",
    letter: "B",
    title: "30-day internet outage",
    description: "A major infrastructure failure takes out internet access for a month.",
    domains: ["communications", "digital-security", "money"],
  },
  {
    id: "banking-disruption",
    letter: "C",
    title: "Banking disruption",
    description: "Your bank suffers an extended systems failure — cards and transfers stop working.",
    domains: ["money"],
  },
  {
    id: "cyberattack",
    letter: "D",
    title: "Major cyberattack",
    description: "A large-scale cyberattack hits critical infrastructure and services you rely on.",
    domains: ["digital-security", "identity", "money"],
  },
  {
    id: "fuel-shortage",
    letter: "E",
    title: "Fuel shortage",
    description: "Fuel becomes scarce and expensive for several weeks.",
    domains: ["transport", "energy"],
  },
  {
    id: "food-inflation",
    letter: "F",
    title: "Food inflation",
    description: "Food prices rise sharply and stay elevated for months.",
    domains: ["food", "money"],
  },
  {
    id: "natural-disaster",
    letter: "G",
    title: "Natural disaster",
    description: "A major weather event disrupts your area for a week or more.",
    domains: ["water", "energy", "food", "communications", "health"],
  },
  {
    id: "supply-chain",
    letter: "H",
    title: "Extended supply-chain disruption",
    description: "Shipping and logistics networks are disrupted for an extended period.",
    domains: ["food", "energy", "transport"],
  },
  {
    id: "recession",
    letter: "I",
    title: "Severe economic recession",
    description: "A serious downturn hits incomes, asset values, and job security.",
    domains: ["money", "property", "skills"],
  },
  {
    id: "restrictive-digital",
    letter: "J",
    title: "Highly restrictive digital environment",
    description: "Access to services becomes tightly conditioned on a single digital credential.",
    domains: ["identity", "digital-security", "money"],
  },
];
