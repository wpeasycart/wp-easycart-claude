# The change format ( WPEC-CHANGES v1 ) and the store's checks

For orientation. Each store's design guide has its own copy of this, with the names and bases that store has: the guide wins
wherever they differ.

## An answer

```text
WPEC-CHANGES v1
One sentence saying what the changes do.

(one code block per change)
```

The block's first word says what it changes:

| Block | What it changes | Lines in it |
|---|---|---|
| `tokens` | Colours, fonts and sizes, always for the whole store | `name: value` ( `main-color: #1f5c46` ) |
| `layout scope=…` | A page's layout | `area: layout` ( `product: focus` ) |
| `settings part=… scope=…` | One part's settings, and whether it shows | `key: value`, `shown: true` or `shown: false` |
| `css part=… base=… scope=…` | CSS for one part | CSS |
| `html part=… base=… scope=…` | The template of a part that takes HTML | HTML in the template language |

- `part` is a part's id and `base` its base, both from the guide.
- `scope` is `store` ( the default ), `category:<id>`, `type:<type>` or `product:<id>`.
- One block per part and scope: a later block for the same one replaces an earlier one.
- A `css` block replaces that part's CSS in its scope, and an `html` block its HTML: keep the store's own rules you are not
  changing.
- Nothing else goes in code blocks.

The same answer can be one `json` block:

```json
{ "format": "WPEC-CHANGES", "version": 1, "summary": "…", "changes": [
  { "kind": "tokens", "values": { "main-color": "#1f5c46" } },
  { "kind": "layout", "area": "product", "layout": "focus", "scope": "store" },
  { "kind": "settings", "part": "…", "scope": "store", "values": { "shown": false } },
  { "kind": "css", "part": "…", "base": "…", "scope": "store", "css": "selector { gap: 1rem; }" },
  { "kind": "html", "part": "…", "base": "…", "scope": "store", "html": "…" }
] }
```

## CSS

- `selector` is the part itself: `selector { gap: 1rem }`, `selector:hover { … }`. A rule without it reaches inside the part
  ( `.wpec-card__name { … }` ). Every rule is kept to its part: a rule for the price can only restyle the price.
- No url() to another site, no @import, @font-face or @keyframes, no at-rule but @media, @supports and @container ( three deep at
  most ), no nesting, nothing that reaches the part's neighbours ( `selector + …`, `selector ~ …`, `:has( + … )` ), no
  expression(), javascript:, -moz-binding or behavior. Fonts come from the font tokens.
- Strict parts ( the cart, checkout, account and order confirmation pages ) take no url(), image-set() or any function that loads
  something.
- The store's CSS prints after WP EasyCart's own, so it wins without !important.

## HTML

Only for parts the guide marks "CSS and HTML", keeping everything the part lists under "Must keep". The template language:

- `{{ product.name }}`: a data token the part lists, or a setting ( `{{ settings.size }}` ).
- `{{#if …}} … {{else}} … {{/if}}`, `{{#unless …}} … {{/unless}}`, `{{#each store.trust}} {{ this.text }} {{/each}}`.
- `{{ part "price.amount" }}`: a piece WP EasyCart draws; `{{ slot "price.after" }}`: what extensions add; `{{ icon "truck" }}`.
- `{{! a note }}` prints nothing.
- No triple braces, includes, functions, PHP or scripts. Values go in text or a quoted attribute only. Links keep only http,
  https, mailto, tel, a path or #.

## What the store does with each change

| State | What it means | What the owner sees |
|---|---|---|
| Ready | It goes into the draft as written. | Ready |
| Changed | The checks took something out ( a rule loading a file from another site, a setting the part does not have, a value the store cannot use ); the rest goes in. | Changed, with what was taken out |
| Check | Written for another version of the part ( its base differs ), or HTML without a base. It goes in marked, and Publish waits until the owner compares it in the Code tab. | Check |
| Refused | A part, page, layout, setting or token the guide does not list, PHP, a script, HTML for a part that takes CSS only, a change the store's plan does not include, or code that would stop Publish. | Refused, with why |

## Plans

- On the Free plan the guide covers tokens and CSS for the whole store, and the owner applies an answer by hand: tokens in the
  Store Designer's Style panel, CSS in the theme's Additional CSS with `selector` written as `[data-wpec-part="<part>"]`.
- With Pro every part, its settings and HTML, layouts and every scope are in the guide, and the Store Designer reads an answer
  into a draft.
