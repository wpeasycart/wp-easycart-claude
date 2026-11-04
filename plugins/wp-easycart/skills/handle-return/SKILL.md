---
name: handle-return
description: Handle a WP EasyCart return or EU withdrawal: find the order, prepare the refund for the store owner to make, mark the withdrawal handled and draft a reply to the customer, with the store's wp-easycart MCP tools. Use when a customer wants to return something, cancel, or a withdrawal statement arrived.
---

# Handle a return

You prepare; the store owner refunds. No tool on the server moves money, and you must never say a refund is made until the
user says they made it.

1. **Find the order.** From an order number, email or name: `wp-easycart-find-records`. EU withdrawal statements waiting:
   `wp-easycart-list-withdrawals` (it says whether each arrived in time).
2. **Read it.** `wp-easycart-get-order`: what was bought, when, what is refunded already, where it shipped.
3. **Agree what comes back.** Ask which items and how many, whether they go back into stock (only if they can be sold again)
   and whether shipping is refunded. For an EU withdrawal sent in time, the law usually means a full refund of the items and the
   original standard shipping; say so, and suggest the user checks their own returns page.
4. **Prepare it.** `wp-easycart-prepare-refund` with `items` (line_id and quantity), `restock` and `refund_shipping`. Show the
   estimate and where the money goes back, and give the "Open the refund" link: the refund window opens filled in, the user
   checks it and presses Refund.
5. **Close it.** When the user says it is refunded and an EU statement was open, `wp-easycart-mark-withdrawal-handled`.
6. **Reply.** `wp-easycart-draft-customer-reply` gives the facts; write a short, warm reply in the store's voice (what happens
   next, when the money arrives, usually a few business days depending on the bank). The user sends it from the order screen
   (Send Email › Message).
