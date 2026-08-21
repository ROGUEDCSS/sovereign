# Topic Framework — the standard shape for explaining any World/Codex topic

This is the repeatable structure for writing up a topic on SOVEREIGN,
replacing ad-hoc essay writing. It's tightened from an earlier 15-section
draft down to 9, specifically to match what the two entities that already
went through the full treatment — Digital ID and CBDCs — proved actually
works, and to map cleanly onto `KGEntity` in `src/lib/knowledge-graph.ts`
instead of existing only as prose headings.

**The rule that matters most:** every topic gets exactly one tier's worth
of this, not always all nine steps. Forcing a stub-tier entity like C40
Cities through the full deep-dive treatment produces padding; skipping it
for something like Digital ID undersells the topic. Pick the tier first.

---

## Voice — the standard, stated plainly

This is the canonical instruction. Every other rule in this document —
Features vs. Benefits, short/concrete/named, degrees + a simple analogy
— is a specific case of this one:

> Write in brutally simple, concrete, reader-first language. Use short
> sentences and ordinary words. Explain one idea at a time. Never use
> jargon, academic language, vague concepts, or unnecessary qualifiers.
> Name specific people, systems, actions and consequences. Give concrete
> real-world examples. Always explain what this means for the individual
> reader and what could happen to them. Do not try to sound intelligent.
> Make the idea impossible to misunderstand.

Applies to every field on every entity and every Codex node — `sections`
prose, `facts`, `whoControls`, `whatCouldGoWrong`, `tldr`, all of it.
Before publishing any of it, read it back against this paragraph. If a
sentence would need explaining to a smart 14-year-old, it's not done yet.

---

## The nine steps

| # | Step | KGEntity field | Tier |
|---|------|-----------------|------|
| 1 | What is it? | `summary` | Stub |
| 2 | Why does it matter? | `whyItMatters` | Standard |
| 3 | How does it work? (+ a concrete example immediately, not saved for later) | `sections` | Deep-dive |
| 4 | Arguments for / against — steelmanned, named sources | `pros` / `cons` | Standard |
| 5 | **Who controls it?** — who owns it, operates it, sets the rules, can change the rules, can switch it off, can see the data | `whoControls` | Standard |
| 6 | **What could go wrong?** — misuse, function creep, concentration of power, failure of safeguards, what happens if the assumptions are wrong | `whatCouldGoWrong` | Standard |
| 7 | Safeguards, and what's genuinely unresolved | `safeguards` / `unresolvedQuestions` | Standard |
| 8 | The Sovereign position — a short, direct stance; not "it's evil," not "it's fine because they say so" | `sovereignPosition` | Standard |
| 9 | **The practical test** — numbered questions the reader runs themselves before accepting the thing | `practicalTest` | Standard |

Steps 5, 6, and 9 are the non-negotiable ones — they're what makes a
write-up read as *SOVEREIGN* rather than a generic explainer, and they're
cheap enough (a handful of bullets, not an essay) to include at Standard
tier, not just Deep-dive.

Step 3 is the one expensive step — full narrative `sections` content,
built from `ArticleContentBlock`s (`p` / `subheading` / `list` / `diagram`
/ `definitions`) — and it's the only thing gated to Deep-dive tier.

---

## Tiers

### Stub
`summary` + `facts` only. This is the default state for a newly-added
entity, and it's a legitimate permanent state for minor topics — it does
not need to be "finished" later. Most of the 13 World categories are
mostly stub-tier today.

### Standard
Stub, plus: `whyItMatters`, `pros`/`cons`, `furtherReading`, `whoControls`,
`whatCouldGoWrong`, `safeguards`, `unresolvedQuestions`, `sovereignPosition`,
`practicalTest`. This is the right tier for most topics worth writing up —
it covers every mandatory step without committing to a full essay.

### Deep-dive
Standard, plus full narrative `sections` (and grounding `blocks` —
short Fact/Scenario/Opinion statements, rendered below the sections).
Reserved for the handful of topics that carry enough weight to earn a
real essay — Digital ID and CBDCs today; Agenda 2030 and digital assets
are likely next.

---

## What this replaces

The earlier 15-section draft had five separate places a reader evaluated
whether a topic was "good or bad" — Benefits, Disadvantages, Arguments in
favour, Arguments against, What could go wrong — which in practice all
produce the same paragraph reworded four times. That's collapsed here to
two: `pros`/`cons` (steelmanned, named-source arguments — already
`KGEntity`'s existing discipline, see its own interface comment) and
`whatCouldGoWrong` (failure modes and power, which is a genuinely
different question from "the other side's best argument").

Real-world examples also moved earlier — into step 3, immediately after
mechanism — instead of being held back until after five sections of
abstract evaluation. The Digital ID essay already does this correctly
(the alcohol-purchase example lands right after the issuer/holder/verifier
mechanism, not two-thirds of the way through); the 15-section draft would
have buried it.

---

## Sourcing discipline (unchanged, restated for clarity)

World/Codex citation rules are different by design, and this framework
doesn't change either:

- **Codex facts** never cite a named external authority (WHO, W3C, a
  government body) — state facts plainly. This is the Sovereign No-
  Authority-Citations rule and it's Codex-specific.
- **World entities** (`pros`, `cons`, `furtherReading`, and by extension
  `whoControls`/`whatCouldGoWrong`/`safeguards` under this framework) DO
  cite named sources — Hayek, Marx, the RBA, the BIS, W3C, Kim Cameron.
  Steelmanned arguments need a named school of thought behind them, not a
  strawman.

---

## Degrees, not a yes/no — with a simple analogy

Standing rule, applies to every topic that has real gradations of
severity or power, which is most of them: don't present the topic as a
flat list of dangers or a binary "is this bad." Name the actual **degrees**
— a spectrum or ladder from mild to extreme — and anchor it with one
simple, concrete analogy the reader already understands.

Digital ID's version of this is the boiling-frog framing: no one system
rolls out at "total control" on day one; every step looks reasonable in
isolation, and the danger is the direction of travel, not any single
rung. The actual ladder — Situational → Time-and-place → Persistent →
Pervasive → Linked → Behavioural → Permission → Conditional →
Programmable → Total Identity System — replaced "is Digital ID
dangerous, yes or no" with "how much power does this specific system
actually have, and how far has it already travelled." That's a sharper,
more honest question, and it's the one readers actually need answered.

When writing or reworking a topic (`sections` narrative or the shorter
structured fields alike), ask: does this topic have a real spectrum of
severity underneath it? If yes, name the rungs explicitly and give the
reader one simple analogy to hold the whole shape in their head — don't
just list dangers in whatever order they occurred to you.

---

## TL;DR — for readers who won't read the whole thing

Deep-dive entities get a `tldr?: string[]` — rendered at the very top,
before "Why it matters," no bullets, just stacked short lines. Not a
teaser for the essay below it — a genuinely complete summary someone
could stop reading after and still walk away with the real answer.
Only worth adding once a topic has real `sections`; a Standard-tier
entity is already short enough not to need one.

It's not a bullet list of facts — it's a tiny narrative with rhythm.
One short sentence per line. Real repetition where the pattern itself
makes the point. Digital ID's:

> Today, Digital ID proves who you are.
>
> The extreme version can go further.
>
> It can determine what you are allowed to do.
>
> You try to open a bank account.
> The system checks your Digital ID.
>
> You try to access a government service.
> The system checks your Digital ID.
>
> You try to buy something restricted.
> The system checks your Digital ID.
>
> Your identity has changed from proof of who you are into a system
> that controls what you can do.

Notice what's doing the work: the three-beat repetition ("The system
checks your Digital ID") isn't padding, it's the argument — the same
check appearing everywhere is the actual point. The closing line names
the transformation in one sentence. No qualifiers, no "in some cases,"
no citation. That's the bar.

---

## Short, concrete, named — not hedged

A recurring failure mode in the structured fields (`whoControls`,
`whatCouldGoWrong`, `safeguards`) specifically: writing in the abstract
instead of naming the real thing. Compare:

> "Whoever operates the wallet infrastructure controls whether you can
> access and present your own credentials — this can be government, or
> a private technology provider under a public-private partnership."

against:

> "The wallet operator controls whether you can open and use your own
> credentials. In Australia, that's myID, or a private provider
> accredited under the Digital ID Act 2024."

Same fact. The second version is shorter, names the real thing (myID,
the Digital ID Act 2024) instead of describing a hypothetical category
of thing, and doesn't hedge with "this can be... or..." when the essay
already knows the actual answer. Rules of thumb:

- If the essay elsewhere names the real institution, program, or law,
  use that name in the structured fields too — don't retreat to a
  generic description once you already know the specific.
- Cut hedge words ("typically," "can be," "in some cases") unless the
  uncertainty is real and worth flagging. Most of the time it's padding.
- One idea per sentence. If a sentence needs a semicolon to fit
  everything in, it's probably two sentences that got tired of waiting.

---

## Features vs. benefits — every fact needs a "so what"

A **feature** is a fact about the thing itself. A **benefit** is what
that fact actually means for the person reading it. `facts` arrays
routinely lapse into pure feature-listing — naming a standard or a
mechanism and stopping there, never landing the consequence for the
reader. The test, after writing any fact: ask "so what?" If the next
clause doesn't answer that, the fact is dangling.

> Feature only: "The W3C's Verifiable Credentials Data Model formalises
> the three roles: an issuer creates and signs a credential, a holder
> stores and controls it, and a verifier checks it's valid without
> needing to contact the issuer directly."
>
> Feature + benefit, isolated:
> - The standard used for Digital ID is the W3C's Verifiable
>   Credentials Data Model. It has three parts: 1. Issuer, 2. Holder,
>   3. Verifier.
> - 1. Issuer: the organisation that certifies a fact about you.
>   Example: the government confirms you're over 18.
> - 2. Holder: you. You hold the credential. You decide when to show it.
> - 3. Verifier: whoever is asking for proof. Example: a shop checking
>   your age.
> - The rule: these three cannot be the same entity. If they are, the
>   danger starts.
> - Example: a shop (Verifier) checks your ID. It never calls the
>   government (Issuer). The government never learns you were at the
>   shop. Only you, the Holder, know both things happened.

Same underlying fact. Notice this isn't one dense sentence any more —
it's seven short bullets, each one idea, each its own line. That's not
an accident; see "Isolate, don't merge" below.

---

## Isolate, don't merge — one idea per bullet, real numbering

The single most common failure once the earlier rules are being
followed on paper: writing something that's technically short and
concrete, but still crams a rule, a definition, and an example into one
merged paragraph. That's still flowery by the time it's assembled, even
if each clause on its own was plain. The fix isn't better sentences —
it's fewer ideas per sentence, each one on its own line:

- **When you name multiple entities (issuer/holder/verifier;
  who/what/when), give each one its own bullet** — not one sentence
  naming all three. "1. Issuer: ...", "2. Holder: ...", "3. Verifier:
  ..." as three separate lines a reader can scan, not three clauses in
  one they have to parse.
- **State the rule as its own short, standalone bullet.** "The rule:
  these three cannot be the same entity." Not folded into the sentence
  before or after it.
- **Give the example its own bullet, prefixed "Example:"** (sentence
  case, not caps — caps is for emphasis in a live conversation, not for
  the published page) — never merged into the same bullet as the rule
  it's illustrating.
- **Tag each role inline where it appears in the example** — "a shop
  (Verifier) checks your ID... the government (Issuer)... you, the
  Holder" — so the reader maps the abstract model onto the concrete
  case without holding both in their head at once.
- A named test can still read in caps on the page when it's genuinely
  functioning as a named thing — "THE UNIVERSAL DIGITAL ID TEST:" — but
  that's a title, not a device to reach for on every sentence. Use it
  sparingly, for the one or two tests a topic actually has.

The result reads like a checklist, not an essay paragraph. That's
correct for `facts`, `whoControls`, `whatCouldGoWrong`, and similar
structured fields — save actual flowing prose for the `sections`
narrative, where connective tissue between ideas is the point.
