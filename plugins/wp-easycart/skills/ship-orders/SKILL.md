---
name: ship-orders
description: Work through a WP EasyCart store's orders waiting to ship, add tracking numbers and mark orders delivered, using the store's wp-easycart MCP tools. Use when the user asks what to ship, wants to add tracking, or says orders went out.
---

# Ship WP EasyCart orders

1. Call `wp-easycart-list-orders-to-ship`. Show the orders oldest first: number, customer, what to pack, the shipping method
   and how long it has waited. Mention pickups separately.
2. For an order the user wants details of, `wp-easycart-get-order` (and `wp-easycart-get-packing-slip` for the slip's link).
3. When the user gives a tracking number, call `wp-easycart-add-tracking` with the order, carrier and number. Ask once whether
   customers should get the shipped email; then use that answer for the rest of the batch. Claude asks before each
   `add-tracking` call: that is expected, the store marks the order shipped.
4. Buying labels costs postage, so you never buy one: give the order's link and say "Buy the label there".
5. An order the user says arrived: `wp-easycart-mark-delivered` (only when the store does not track deliveries itself).
6. Finish with what is still waiting.

Never refund, cancel or change payments here; those stay with the user in the order screen.
