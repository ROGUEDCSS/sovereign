// One-off generator for the free "Sovereign Resilience Checklist" lead-magnet PDF.
// Run with: node scripts/generate-checklist-pdf.mjs
// Output: public/sovereign-resilience-checklist.pdf
import PDFDocument from "pdfkit";
import { createWriteStream } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, "..", "public", "sovereign-resilience-checklist.pdf");

const GOLD = "#e0c070";
const INK = "#1a1005";
const MUTED = "#5a5348";

const SECTIONS = [
  {
    title: "Water",
    items: [
      "At least 2 weeks of stored drinking water (1 gallon / 4L per person per day)",
      "A way to purify more — filter, tablets, or boiling capability, not just stored bottles",
      "You know where your water actually comes from and what shuts it off",
    ],
  },
  {
    title: "Food",
    items: [
      "2–4 weeks of food that needs no refrigeration or power to prepare",
      "A way to cook without mains electricity or gas (camp stove, fire, etc.)",
      "You know which nearby land, water, or contacts could realistically supply food if supply chains broke for a month",
    ],
  },
  {
    title: "Energy",
    items: [
      "A way to keep essential devices charged with the grid down for 72+ hours",
      "You know your home's actual daily power draw, not a guess",
      "At least one heat/cooling option that doesn't depend on mains power",
    ],
  },
  {
    title: "Finance",
    items: [
      "3–6 months of essential expenses in a cash emergency fund",
      "Savings are not all in a single bank or single account type",
      "Some physical cash on hand for when card networks or apps are down",
      "Household income doesn't depend entirely on one employer or one client",
    ],
  },
  {
    title: "Health",
    items: [
      "You train strength and cardio, not just one or neither",
      "You could describe your own sleep and stress patterns accurately, not just guess",
      "A stocked first-aid kit, and at least one person in the household who knows how to use it",
    ],
  },
  {
    title: "Identity & documents",
    items: [
      "Physical copies of core ID documents stored somewhere other than your main residence",
      "A second, independent way to prove who you are if your primary ID is lost or destroyed",
      "You know the actual process to replace a lost passport, licence, or birth certificate",
    ],
  },
  {
    title: "Communication",
    items: [
      "A way to reach family if mobile networks and internet are both down",
      "An agreed meeting point or check-in plan the whole household actually knows",
    ],
  },
  {
    title: "Home & security",
    items: [
      "Working smoke and CO detectors, checked in the last 12 months",
      "You know how to shut off your home's water, gas, and power manually",
      "Basic tools and materials on hand to secure doors, windows, or a leak without a hardware run",
    ],
  },
  {
    title: "Community",
    items: [
      "You know at least two neighbours well enough to ask for or offer real help",
      "You have a role, skill, or resource you could actually contribute if your street needed it",
    ],
  },
];

const doc = new PDFDocument({ size: "A4", margins: { top: 64, bottom: 64, left: 64, right: 64 } });
doc.pipe(createWriteStream(outPath));

doc
  .fillColor(INK)
  .font("Helvetica-Bold")
  .fontSize(9)
  .text("SOVEREIGN", { characterSpacing: 1.5 });

doc.moveDown(0.6);
doc
  .fillColor(INK)
  .font("Helvetica-Bold")
  .fontSize(26)
  .text("The Resilience Checklist");

doc.moveDown(0.3);
doc
  .fillColor(MUTED)
  .font("Helvetica")
  .fontSize(11)
  .text(
    "Nine areas, forty questions. Not a worst-case fantasy — the ordinary things that break first when a job, a bank, a network, or a body stops cooperating.",
    { lineGap: 3 }
  );

doc.moveDown(1.1);

SECTIONS.forEach((section) => {
  if (doc.y > 700) doc.addPage();

  doc
    .fillColor(INK)
    .font("Helvetica-Bold")
    .fontSize(14)
    .text(section.title.toUpperCase(), 64, doc.y, { characterSpacing: 0.5 });

  doc.moveDown(0.3);

  section.items.forEach((item) => {
    if (doc.y > 740) doc.addPage();
    const startY = doc.y;
    doc.rect(64, startY + 2, 11, 11).lineWidth(1).strokeColor(MUTED).stroke();
    doc
      .fillColor(INK)
      .font("Helvetica")
      .fontSize(10.5)
      .text(item, 86, startY, { width: 445, lineGap: 2 });
    doc.moveDown(0.45);
  });

  doc.moveDown(0.5);
});

if (doc.y > 680) doc.addPage();
doc.moveDown(0.5);
doc
  .fillColor(MUTED)
  .font("Helvetica")
  .fontSize(9)
  .text("sovereign — a practical guide to self-reliance, built one domain at a time.", {
    align: "left",
  });

doc.end();
