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
