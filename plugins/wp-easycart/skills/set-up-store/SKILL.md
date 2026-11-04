---
name: set-up-store
description: Set up a WP EasyCart store end to end (location and currency, tax, shipping, products, policy pages) through the store's wp-easycart MCP tools. Use when the user wants to set up, finish setting up or check the setup of their WP EasyCart store.
---

# Set up a WP EasyCart store

The store's MCP server (`wp-easycart`) does the work; every tool name below is on it. Changes need the store's
"Let AI assistants make changes" switch (WP EasyCart › Settings › Integrations › AI assistants). If a change tool answers
that changes are off, give the user that link and stop changing things.

1. **Where it stands.** Call `wp-easycart-get-store-overview`. Tell the user in two or three lines what is ready and what is left, in
   the order the overview gives (first sale, how shoppers buy, the storefront).
2. **Location and money.** Ask where the business is and which currency it sells in. Preview with `wp-easycart-preview-settings`
   (keys `country`, `currency`), show the before → after list, and only after the user agrees call `wp-easycart-update-settings` with
   the `plan_id`.
3. **Tax.** `wp-easycart-preview-tax-setup` with the country and the user's answers (US: their state; Canada: their province;
   VAT countries: whether prices include VAT, and for EU stores home or OSS). Show the changes and notes, then
   `wp-easycart-apply-tax-setup`. Never give tax advice beyond what the tool's notes say; suggest an accountant for anything else.
4. **Shipping.** `wp-easycart-preview-shipping` lists the ways that work in their country. Ask which one, starter rates or their own,
   free shipping over an amount, and where they ship. Preview, agree, `wp-easycart-set-shipping`.
5. **Products.** `wp-easycart-list-product-kinds`, then `wp-easycart-create-product` for each product the user describes. Products
   are drafts: tell the user they switch each one on in Products when it is ready.
6. **Policies.** `wp-easycart-draft-policy` shows what a terms, privacy or returns page would say;
   `wp-easycart-create-policy-page` makes it as a draft page for the user to read, edit and publish. Say clearly these are drafts,
   not legal advice.
7. **Payments.** You cannot connect payments. Give the payments link from `wp-easycart-get-setup-steps` (area `payments`) and say
   Stripe or Square is connected there in a few clicks.
8. **Finish.** `wp-easycart-get-store-overview` again, and list what is left.

Every change is listed in WP EasyCart's Recent changes with Undo; mention that after each change, and use
`wp-easycart-undo-change` if the user asks to put something back.
