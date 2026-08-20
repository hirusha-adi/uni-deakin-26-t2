# Written Reflection — LabelLens (Task 5.3D)

LabelLens targets two personas defined in Task 1.1P: Raj Patel, a high-literacy
smartphone user who wants a fast scan and a quick correction of any OCR
mismatch, and Madison Taylor, a moderate-literacy user on phone and laptop who
needs readable text, categorised information, and the ability to revisit
results later. These needs held steady from 1.1P through to this version, but
5.3D adds a concrete answer to Madison's "revisit later" need: a "Saved for
later" list on the results page that keeps previously looked-up additives
available without re-searching, plus a visible `<label>` on the scan note
field instead of a placeholder-only input, since a placeholder disappears the
moment a moderate-literacy user starts typing.

The layout stays mobile-first. Flexbox drives the collapsible hamburger nav
below 48rem so navigation costs no vertical space on a phone, then switches to
an inline row at 48rem; CSS Grid arranges feature and result cards into a
single column on mobile and three columns from 48rem, with a second
breakpoint at 64rem widening the hero split and section padding for desktop
monitors. Headings use `clamp()` so type scales continuously instead of
jumping at each breakpoint, and the comparison table sits in an
`overflow-x: auto` wrapper with a `min-width` so columns stay legible on a
narrow screen instead of squashing.

Compared with 5.2C, this version adds landmark semantics (`aria-labelledby`
tying each `<section>` to its heading), a skip-link so keyboard users bypass
the repeated header, and a `prefers-reduced-motion` rule for the nav
animation — refinements aimed at presenting the site to a real, varied
audience rather than just passing a checklist.

The main trade-off was the note field: a placeholder alone looked cleaner but
failed Madison's readability need once real users were considered, so a
visible label was kept even though it adds vertical space on mobile.
