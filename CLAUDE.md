# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

The Murree Sparkletts email marketing project: content and HTML templates, not an application. There is no build, lint, or test tooling, and no package manifest. Emails are static HTML with `{{placeholder}}` tokens that are filled by whatever sends them.

## Workflow (from README.md)

1. Define goal and audience in `campaigns/<name>/brief.md` (copy `campaigns/_example/`).
2. Write copy and build `email.html` from `templates/base.html`.
3. Test: subject, preview text, links, mobile, spam check.
4. Send, then record results in `reports/`.

## How the pieces fit

- `templates/base.html` is the shared layout: a 600px table-based, inline-styled email with a header logo, body, CTA button and footer. Its placeholders are `{{subject}}`, `{{preview_text}}`, `{{logo_url}}`, `{{headline}}`, `{{first_name}}`, `{{body}}`, `{{cta_url}}`, `{{cta_text}}`, `{{company_address}}` and `{{unsubscribe_url}}`.
- `campaigns/<name>/brief.md` holds the plan for one send: goal, audience, subject options for A/B, preview text, CTA and success metrics. The matching `email.html` is derived from `base.html`. `welcome-email` is the only real campaign so far.
- Each campaign's `email.html` is a copy of the base, not a live include. A change to `base.html` does not propagate, so update existing campaigns by hand.
- `docs/compliance-checklist.md` (CAN-SPAM/GDPR) applies to every send: opt-in, a physical address and an unsubscribe link in the footer, an accurate From name and subject, and stored consent records. Keep the `{{company_address}}` and `{{unsubscribe_url}}` footer in any new template.
- Email HTML must stay table-based with inline styles. Mail clients ignore external CSS and most modern layout.

## Studio rules

- Write in plain English.
- Never send email to real people.
- Ask the user before deleting anything. Never delete, move or overwrite files without explicit permission.

## Data handling

`.gitignore` excludes `lists/*.csv` and `.env`. Audience files and secrets stay local, so never commit real subscriber data. Segment definitions go in `lists/`, and only `.gitkeep` is tracked there.

## Local conventions

- `assignment.md` is the user's reference plan (the FDE-102 lab, adapted with Murree Sparkletts as the use case instead of the sample brand Kettlebird Tea). It is excluded from git through `.git/info/exclude`. Never stage or commit it, and don't `git add -A` without checking it is still ignored.
- The git remote is the private repo `zhdwalayat/sparklett-marketing`. The working branch is `master`.

## Brand voice

@brand/voice.md
