# Written Explanation — LabelLens (Task 5.2C)

LabelLens helps shoppers check food additives quickly, often while standing in an
aisle on a phone, so the layout puts one clear action per screen. The header uses
Flexbox with a collapsible hamburger menu below 48rem so navigation stays usable
with one thumb on mobile, then expands to an inline row on desktop where space is
available. CSS Grid organises the feature cards, result cards, and footer into a
single column on mobile and three columns from 48rem, with a second breakpoint at
64rem widening the hero split and increasing spacing for larger screens, so the
site reads well at phone, tablet, and desktop widths.

The new "Compare across scanned products" table lists four yoghurt products and
their additives. On small screens it sits inside a scrollable container
(`overflow-x: auto`) with a fixed minimum width, so every column stays aligned and
readable instead of squashing text, while the user simply swipes sideways.

Compared with 5.1P, this version adds the responsive comparison table, the
collapsible navigation, a second breakpoint for wide screens, and a fluid
`clamp()` heading size using `vw` units for smoother scaling between breakpoints.
