# World Taxonomy — Full Spec (for future implementation)

Not implemented yet. The current `/world` build (as of the 13-category
restructure) only has each category's name, an entity count, and an empty
"Not yet mapped" state for categories with no entities. This doc is the
target structure to build toward — Subsections per category, and each
category's special connection/scrutiny rules.

The 13 top-level categories, in canonical order, are defined in
`src/lib/knowledge-graph.ts` as `ENTITY_TYPES`. This doc adds the next layer
down (Subsections) plus category-specific rules that don't fit the generic
`KGEntity` shape yet — those will likely require type changes when this
gets built out.

---

## 2. GOVERNANCE
How collective political authority is organised and exercised.

**Subsections:** Governments · Political systems · Executive government ·
Legislatures · Public administration · Elections · Political parties ·
Public policy · Government agencies · Local government · International
governance · Treaties & agreements · Public spending · Government
accountability · Political power & influence

**Connections:** Law · Finance · Economics · Geography · Organisations ·
Events · People

---

## 3. LAW
The rules that are legally enforceable within a jurisdiction.

**Subsections:** Constitutional law · Property law · Contract law ·
Criminal law · Civil law · Family law · Employment law · Business law ·
Tax law · Planning & development · Environmental law · Agricultural law ·
Consumer law · Privacy & data · Intellectual property · Courts & tribunals ·
Regulation · Legal rights & obligations

**Rule:** every legal item should be tied to **Jurisdiction → Date →
Source → Status**. Particularly important for Sovereign because law
changes and differs geographically — never state a legal fact as if it
holds everywhere.

---

## 4. CORPORATES
Commercial entities and the relationships between them.

**Subsections:** Companies · Ownership · Shareholders · Directors &
executives · Subsidiaries · Parent companies · Mergers & acquisitions ·
Investments · Products · Services · Brands · Supply chains · Distributors ·
Competitors · Partnerships · Corporate governance · Corporate influence ·
Corporate history

**Rule:** a company is an entity, not merely an article. Model real
relationships, e.g.:
- Company → owns → Company
- Company → produces → Product
- Company → employs → People
- Company → operates in → Geography
- Company → subject to → Law

---

## 5. FINANCE
The institutions, instruments and mechanisms through which money and
capital move.

**Subsections:** Banks · Central banks · Credit unions · Payment systems ·
Lending · Mortgages · Credit · Debt · Bonds · Shares · Investment funds ·
Insurance · Financial markets · Commodities · Digital assets · Monetary
systems · Financial regulation · Personal finance · Business finance

**Scope:** the financial system and its mechanisms — contrast with
Economics below.

---

## 6. ECONOMICS
How resources, production, exchange and incentives operate.

**Subsections:** Supply & demand · Markets · Prices · Inflation ·
Deflation · Employment · Productivity · Trade · Taxation · Government
spending · Economic growth · Recessions · Interest rates · Monetary
policy · Fiscal policy · International economics · Economic schools of
thought · Economic data

**Distinction from Finance:** Finance = money and capital systems.
Economics = how economic systems behave. They obviously interconnect.

---

## 7. MEDIA
The systems through which information is created, distributed and
consumed.

**Subsections:** Newspapers · Television · Radio · Magazines ·
Journalism · Independent media · Digital media · Social media ·
Podcasts · Video platforms · Publishers · Media ownership · Funding ·
Editorial policy · Algorithms · Advertising · Propaganda ·
Misinformation · Fact-checking · Media literacy

**Rule:** media claims must be traceable to sources. A media article isn't
automatically "truth." Model it as: **Claim → Source → Evidence →
Counterclaim → Scrutiny**.

---

## 8. TECHNOLOGY
Tools, systems and technologies that humans create and use.

**Subsections:** Computing · Artificial intelligence · Software ·
Hardware · Telecommunications · Internet · Cybersecurity · Robotics ·
Energy technology · Manufacturing · Agriculture technology · Medical
technology · Transportation · Construction technology · Biotechnology ·
Open-source technology · Emerging technology

**Rule:** Technology connects directly into the Codex, e.g. Technology →
Rainwater, Technology → Home, Technology → Farming, Technology → Energy,
Technology → Capability.

---

## 9. SCIENCE
The systematic investigation and understanding of the natural and
physical world.

**Subsections:** Physics · Chemistry · Biology · Earth science ·
Astronomy · Environmental science · Medicine · Engineering · Mathematics ·
Scientific methodology · Research · Studies · Datasets · Scientific
institutions · Scientific controversies · Replication · Peer review ·
Competing hypotheses

**Rule:** needs particularly strong Scrutiny functionality. A scientific
claim should be able to show: **Claim → Study → Data → Method → Authors →
Funding → Replication → Criticism → Current status** — much better than
just displaying an AI-generated answer.

---

## 10. HISTORY
What happened, when it happened and what evidence remains.

**Subsections:** Ancient history · Medieval history · Modern history ·
Political history · Economic history · Military history · Social
history · Technological history · Religious history · Corporate
history · Local history · Family history · Historical documents ·
Archaeology · Historical interpretation

**Note:** this is where the (future) Sovereign Almanac becomes
particularly valuable.

---

## 11. GEOGRAPHY
Where things are and how place affects them.

**Subsections:** Countries · States & provinces · Regions · Cities ·
Towns · Rural areas · Land · Terrain · Water · Climate · Natural
resources · Infrastructure · Population · Borders · Jurisdictions ·
Transport · Local economies

**Rule:** Geography is a major filter across the entire system. E.g.
"Rainwater system + Queensland + rural property" produces a completely
different information set from "Rainwater system + Arizona + urban
property."

---

## 12. ORGANISATIONS
Broader than Corporates. Corporates = commercial companies.
Organisations = any structured collective entity.

**Subsections:** Governments · Companies · Non-profits · Charities ·
Foundations · Universities · Research institutions · Cooperatives ·
Associations · Clubs · Religious organisations · Community
organisations · International organisations · Standards bodies ·
Professional bodies · Advocacy organisations

**Rule:** an organisation can have relationships with People · Money ·
Government · Companies · Media · Law · Events.

---

## 13. PEOPLE
Explicitly **not** a giant "list of people." People should be entities
referenced because they are relevant to something, e.g.:
- Person → founded → Company
- Person → wrote → Book
- Person → invented → Technology
- Person → contributed → Knowledge
- Person → holds → Government position
- Person → teaches → Skill

**Subsections are about roles, not a directory:** Authors · Researchers ·
Scientists · Inventors · Entrepreneurs · Business leaders · Politicians ·
Public officials · Journalists · Educators · Tradespeople ·
Craftspeople · Farmers · Engineers · Contributors · Community leaders ·
Historical figures

**Privacy rule:** ordinary members are not automatically public entities.
This distinction is essential.

---

## 14. EVENTS
Things that happened or are happening at a particular time and place.

**Subsections:** Political events · Elections · Wars & conflicts ·
Natural events · Economic events · Corporate events · Scientific
discoveries · Product launches · Conferences · Protests · Court
decisions · Regulatory changes · Disasters · Community events ·
Historical events

**Rule:** an event is a powerful connection point: EVENT → PEOPLE, EVENT →
ORGANISATIONS, EVENT → LOCATION, EVENT → LAW, EVENT → MEDIA, EVENT →
CORPORATES, EVENT → HISTORY.
