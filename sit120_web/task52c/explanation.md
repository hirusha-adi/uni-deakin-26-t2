# Written Explanation — LabelLens (Task 5.2C)

## How the layout supports users

LabelLens is used by shoppers checking additives while standing in an aisle on
a phone, so mobile usability came first. The header uses Flexbox with a
collapsible hamburger menu (a hidden checkbox toggled by a label, no
JavaScript) below 48rem, so navigation stays reachable with one thumb instead
of eating screen space; from 48rem it expands into an inline row across the
header. CSS Grid organises the feature cards, result cards, and footer links
into a single column on mobile and three columns from 48rem, so related
content groups visually instead of running as one long scroll. A second
breakpoint at 64rem widens the hero image/copy split and increases section
padding and grid gaps, giving the page breathing room on larger monitors
rather than just stretching mobile spacing. Headings use `clamp()` with `vw`
units so font size scales smoothly across the whole range instead of jumping
at each breakpoint.

## How the responsive table handles small screens

The new "Compare across scanned products" table lists four yoghurt products
against their key additive, category, and a shopper note. On narrow screens
the table sits inside a `.table-scroll` wrapper with `overflow-x: auto` and
the table itself has a `min-width`, so columns keep their spacing and stay
readable instead of squashing text or wrapping awkwardly; the user scrolls or
swipes sideways to see the remaining columns, and a caption plus intro text
make it clear the table can be scrolled.

## Changes compared with 5.1P

5.1P had a static, always-expanded nav and only one breakpoint. This version
adds: the collapsible hamburger navigation, a second breakpoint at 64rem for
wide-desktop layout refinement, the new responsive comparison table with
horizontal scroll, and fluid `clamp()`/`vw` heading sizing. The CSS file was
also documented with section and rule-level comments explaining what each
block does and why, to make the responsive techniques easier to follow.
