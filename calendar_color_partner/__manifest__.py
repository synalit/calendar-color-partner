{
    'name': 'Calendar color partners',
    'version': '19.0.1.0.0',
    'category': 'Productivity/Calendar',
    'summary': 'Pick the color of every calendar attendee in one click.',
    'description': """
Calendar color partners
=======================

In Odoo the color of a calendar attendee is computed
automatically from the partner ID, which often makes two contacts share the
same color and the calendar hard to read.

This module:

* colors events and attendee filters from ``res.partner.color`` instead of a
  hash of the partner id, so you stay in control;
* adds a small color swatch next to each attendee in the calendar sidebar:
  click it to pick a color from a 12-color palette and the calendar refreshes
  on its own.

Pure frontend patch (no Python override, no extra column).
    """,
    'author': 'Synalit',
    'website': 'https://www.synalit.com',
    'support': 'contact@synalit.com',
    'license': 'LGPL-3',
    'depends': ['calendar'],
    'data': [],
    'assets': {
        'web.assets_backend': [
            'calendar_color_partner/static/src/**/*',
        ],
    },
    'images': [
        'static/description/after.png',
    ],
    'installable': True,
    'application': False,
    'auto_install': False,
}
