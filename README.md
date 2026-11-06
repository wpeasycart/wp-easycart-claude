# WP EasyCart for Claude

Set up and run your [WP EasyCart](https://www.wpeasycart.com) store from Claude. This plugin connects Claude to your store's own
MCP server and adds five skills: set up the store, restyle it, ship orders, handle a return, and a weekly marketing check.

Nothing in this plugin runs on your store, and it holds no keys or store data. Claude signs in to your store through WordPress,
and the store decides what Claude may do.

## What your store needs

- WP EasyCart 6.0.7 or newer, on WordPress 6.9 or newer. Restyling the store ( the `design-store` skill ) needs WP EasyCart 6.1.
- The MCP Adapter plugin. WP EasyCart › Settings › AI assistants installs it in one click.
- "Let AI assistants read the store" on ( the default ). For setup and day-to-day changes, also "Let AI assistants make changes".
- For claude.ai, the Claude apps and sign-in without a password: HTTPS, pretty permalinks and "Let AI apps such as Claude, ChatGPT
  and Gemini sign in" ( on by default ).

## Install in Claude Code

Set your store's address, then add this marketplace and install the plugin:

```bash
export WP_EASYCART_URL=https://your-store.com
```

On Windows, in PowerShell, then open a new terminal:

```powershell
setx WP_EASYCART_URL https://your-store.com
```

```bash
claude plugin marketplace add wpeasycart/wp-easycart-claude
```

```bash
claude plugin install wp-easycart@wp-easycart
```

In Claude Code, run `/mcp`, choose **wp-easycart** and sign in: your store opens its own Allow page. Then ask Claude, for example,
"Use WP EasyCart to show me my store overview."

To get new versions as they come out, turn on auto-update for this marketplace in `/plugin` › Marketplaces, or run
`claude plugin marketplace update wp-easycart` from time to time.

**Without the plugin, or a store without sign-in by OAuth:** WP EasyCart › Settings › AI assistants › Connect Claude Code makes an
application password and shows a `claude mcp add` command with it.

## Use it in claude.ai and the Claude apps

You don't need this plugin there. Open Customize › Connectors, press + Add and choose Add custom connector, name it WP EasyCart
and paste your store's MCP server address from WP EasyCart › Settings › AI assistants ( `https://your-store.com/wp-json/wp-easycart/mcp` ).
Claude opens your store: sign in to WordPress and press Allow. You can disconnect it any time in the same settings. ChatGPT and
Gemini connect to the same address; WP EasyCart › Settings › AI assistants has the steps for each.

## Skills

| Skill | Use it for |
|---|---|
| `set-up-store` | A new store, or finishing setup: location and currency, tax, shipping, products, policy pages. |
| `design-store` | Restyling the store ( WP EasyCart 6.1 ): colours, fonts, layouts, a part's settings, CSS and HTML, made into a draft you publish. |
| `ship-orders` | What to ship today, tracking numbers, delivered orders. |
| `handle-return` | Returns and EU withdrawals: the refund prepared for you, the withdrawal closed, a reply drafted. |
| `weekly-marketing` | Sales against last week, best sellers, carts left behind, reviews, offers and one idea to try. |

## The design skill for ChatGPT and Gemini

**[Download wp-easycart-store-design.zip](https://github.com/wpeasycart/wp-easycart-claude/releases/latest/download/wp-easycart-store-design.zip)**
( always the latest version ). It teaches ChatGPT, Gemini or Claude how a WP EasyCart store's Modern storefront is built and how to
answer in the format WP EasyCart's Store Designer reads. Its README says how to set it up as a ChatGPT project, a Gemini Gem or a
Claude skill. Your AI also needs your store's design guide, from WP EasyCart › Store Designer › Use your AI.

## A weekly check as a scheduled task

In claude.ai, with the WP EasyCart connector added: start a chat, ask "Give me my weekly WP EasyCart marketing check", and choose
Schedule ( every Monday at 8:00, for example ). Scheduled tasks run with no one there to ask, so the skill only reports: it never
calls a tool that changes the store. Tools that run the store ( adding tracking, drafting offers ) ask before each call when you
are there.

## What Claude never does

Take payments, refund, cancel, delete, connect or change payment settings, change the license, or publish a design. Those stay
with you. When you ask for a refund, Claude prepares it and opens the refund window filled in; you press Refund.

## Help

This repository doesn't take issues or pull requests. For help with the plugin or your store, contact
[WP EasyCart support](https://www.wpeasycart.com/contact-information/). The documentation is at
[docs.wpeasycart.com](https://docs.wpeasycart.com/).

## Building the design zip

`node tools/build-design-zip.js` builds `dist/wp-easycart-store-design.zip` from the `design-store` skill and `zip/design-store/`;
`--check` only checks the sources. The same sources make the same zip. Each release attaches it, so the download link above stays
current. Raise `version` in `plugins/wp-easycart/.claude-plugin/plugin.json` for every release ( and only there: the
marketplace entry has none ), or Claude Code keeps people on the copy they have.

## License

GPL-2.0-or-later, as WP EasyCart. See [LICENSE](LICENSE).
