---
name: weekly-marketing
description: A weekly marketing check of a WP EasyCart store (sales against last week, best sellers, carts left behind, reviews, offers, one idea to try) with the store's wp-easycart MCP tools. Use when the user asks how the store is doing, for a weekly report, or what to do to sell more. Works well as a scheduled task.
---

# Weekly marketing check

Keep the report short: a few lines per part, then one recommendation.

1. **Sales.** `wp-easycart-get-sales-summary` with the last 7 days and `compare: true`. Orders, revenue, average order and the
   change against the week before.
2. **Products.** `wp-easycart-get-report` with `tab: products` for the same days: best sellers, and products viewed often but
   rarely bought. If the tab is locked, say in one line what it needs and move on.
3. **Carts left behind.** `wp-easycart-get-cart-reminders` with `days: 7`: carts left, money still in them, how many reminders
   brought back. If reminders are off, say what switching them on does.
4. **Reviews.** `wp-easycart-get-review-requests`: reviews waiting for approval and whether review requests are on.
5. **Offers.** If the store has `wp-easycart-list-offers`, list what is live, scheduled or ending soon, and how much each was used.
6. **Ideas.** `wp-easycart-list-growth-ideas` for what the store has not set up yet.
7. **This week.** Recommend one thing. If it is a discount, offer to draft it with `wp-easycart-create-offer` (it is saved as a
   draft; the user sets it live). If it is a price or stock change, use `wp-easycart-preview-product-changes` first and
   `wp-easycart-update-products` only after the user agrees.

When this runs as a scheduled task with nobody to ask, report only: never call a tool that changes the store.
