# Calendar Partner Colors

Pick the color of every calendar attendee in one click, in Odoo 18.

## Why

In Odoo 18 the color of a calendar attendee is computed
automatically from the partner ID. Two contacts often end up sharing the same
color and the calendar becomes hard to read — and there is no built-in way to
change it.

## What it does

- Events and attendee filters are colored from `res.partner.color` instead of
  a hash of the partner id.
- A small color swatch appears next to each attendee in the calendar sidebar
  on hover. Click it to pick a color from a 12-color palette; the calendar
  refreshes by itself.

Pure frontend patch on the attendee calendar model and filter panel — no
Python override, no extra database column.

## Install

1. Drop the module in your addons path.
2. Update the apps list.
3. Install **Calendar Partner Colors**.

## Use

1. Open the **Calendar** app.
2. Hover any attendee in the "Attendees" section of the left sidebar.
3. Click the small color square that appears on the right side of the row.
4. Pick a color — done.

## Compatibility

- Odoo 18
- Depends only on the standard `calendar` module

## License

LGPL-3

## Author

Synalit — <https://www.synalit.com> — <contact@synalit.com>
