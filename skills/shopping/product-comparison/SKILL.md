---
name: product-comparison
description: Research and compare buyer-facing products using current web evidence, exact variants, weighted scorecards, claim verification, and purchase recommendations. Use for product links, pros and cons, alternatives near a budget, or deciding whether a product fits a use case, especially across Indian e-commerce listings, food and beverages, and electrical or electronic products.
---

# Product Comparison

Produce three connected outcomes: a factual comparison, a weighted scorecard, and a recommendation grounded in the buyer's use case. Treat current price, availability, seller details, specifications, ingredients, claims, and policies as live facts that require web research and citations.

## Route the comparison

- For food, beverages, supplements, or packaged consumables, read [references/food-beverages.md](references/food-beverages.md).
- For electrical appliances, electronics, accessories, or devices, read [references/electrical-electronics.md](references/electrical-electronics.md).
- For another category, apply the shared workflow and derive category-specific criteria from authoritative sources. Explain any material criteria that are not obvious.
- When products cross categories, read every applicable reference and keep category-specific claims separate.

## Ground the decision

At the start, identify or ask for the missing preferences that could materially change the weights or recommendation. Ask one concise batch rather than an open-ended questionnaire. Depending on the purchase, establish:

- intended use, frequency, and buyer priorities;
- budget or acceptable price range;
- must-have features and deal-breakers;
- dietary restrictions, allergies, compatibility, dimensions, ecosystem, or other relevant constraints;
- market and delivery location when they are not India.

Default to the Indian market and INR only when the user does not name another market. Do not repeat questions the user has already answered. If the user declines to clarify, state reasonable assumptions and show how they affect the weights.

## Establish comparable products

Resolve each item to an exact variant before comparing it: model or SKU, generation, capacity, size, flavor, pack count, quantity, color when functionally relevant, and seller where applicable. Use model numbers, product codes, manufacturer pages, and label images to disambiguate.

Do not silently compare different variants. Normalize quantities and units, but preserve the listed pack configuration. If exact matching is impossible, label the mismatch and either compare only the shared attributes or stop the ranking when the mismatch could change the result.

For alternatives, build a small relevant candidate set around the buyer's use case and stated price range. Include a different price tier only when it offers a meaningful tradeoff, and label the tier clearly. Avoid padding the list with weak substitutes.

## Research current evidence

Search the live web. Open the supplied links and corroborate material facts rather than relying on search snippets. For price and availability in India, check sources in this order when accessible:

1. Amazon India
2. Flipkart
3. the manufacturer or brand store
4. other reputable Indian retailers or marketplaces

For claims and product facts, prefer evidence in this order:

1. manufacturer documentation, packaging, manuals, and specification sheets;
2. applicable Indian regulators, standards bodies, and certification databases;
3. retailer listings for the exact variant;
4. independent professional testing and reviews;
5. aggregated user-review patterns.

Use the listed product price only. Exclude delivery charges, taxes added later, coupons, memberships, exchange bonuses, bank offers, subscriptions, and other conditional discounts. State the source and observation date for each price. Never present a stale cached price as current.

Separate these evidence types:

- **Verified fact:** directly supported by an authoritative source for the exact variant.
- **Corroborated observation:** consistently reported by credible testing or multiple independent reviewers.
- **User-review pattern:** a recurring experience, not a proven product property.
- **Inference:** a conclusion drawn from cited facts; explain the reasoning.
- **Unknown or conflicting:** unavailable, inaccessible, variant-mismatched, or contradicted evidence.

Never turn absence of evidence into a negative fact. When a page is inaccessible or evidence conflicts, name the limitation and reduce confidence.

## Verify claims

Extract the product's material claims and test each against the exact variant's ingredients, specifications, certifications, instructions, or credible independent evidence. Classify each as:

- **Supported:** the evidence directly substantiates the claim.
- **Partially supported:** a narrower interpretation is supported, but the wording overreaches or omits an important condition.
- **Unsupported:** reliable evidence contradicts the claim or the product data cannot produce the stated property.
- **Unverifiable:** available evidence is insufficient to decide.

Distinguish ingredient or feature presence from amount, performance, efficacy, and real-world outcome. Quote only the minimum wording needed to identify a claim, then cite the supporting or conflicting evidence. Do not make medical, safety, authenticity, or certification claims without appropriate evidence.

## Assess seller and review signals

When the data is available, evaluate seller quality separately from product quality: seller identity, rating and volume, fulfillment, return policy, warranty eligibility, and authenticity risk. Do not lower the intrinsic product score solely because one listing has a weak seller; flag the listing risk and look for an authorized alternative.

Summarize repeated review themes only after checking recency, exact-variant relevance, sample size, and whether the reviews appear verified or incentivized. Treat suspicious duplication, rating spikes, mixed variants, and review hijacking as confidence issues. Do not infer manipulation from a low or high rating alone.

## Build the scorecard

Use a 0–10 score for each criterion and weights totaling 100%. Derive the criteria and weights from the buyer's stated use case; do not use one fixed weighting across categories. Explain the weighting in one sentence and give the buyer's must-haves enough weight to affect the result.

Calculate each total as:

```text
weighted total out of 10 = sum(criterion score × criterion weight) / 100
```

Keep evidence confidence outside the product score so missing data is not mistaken for poor performance. Assign each product an overall confidence of High, Medium, or Low and explain any material gaps. Do not rank products when missing or conflicting evidence could plausibly reverse the result.

## Deliver the decision

Present, in this order:

1. the recommendation and who it suits;
2. exact variants and current listed prices;
3. a factual comparison table;
4. the weighted scorecard, including weights and evidence confidence;
5. material pros and cons for each product;
6. claim-verification findings when claims are in scope;
7. better alternatives, including why they are better and the tradeoff;
8. seller, safety, health, warranty, or uncertainty caveats that could change the decision.

Cite every time-sensitive or decision-critical claim near the statement it supports. State the research date and market. Make the final recommendation conditional when buyer preferences, availability, or uncertain evidence could change it. If no product can be recommended responsibly, say so and identify the missing evidence needed to decide.
