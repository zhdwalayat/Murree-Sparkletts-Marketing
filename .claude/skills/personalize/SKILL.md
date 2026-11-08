---
name: personalize
description: Write a version of each campaign email for every lead group in leads/leads.csv. Use when a campaign's emails are final and you want one copy per group.
argument-hint: "[campaign folder]"
context: fork
allowed-tools: Read, Glob, Grep, Write
---

Write one version of each email in a campaign for each lead group.

## Input

The argument is a campaign folder, for example `campaigns/murree-sparkletts-launch`.

If no campaign folder is given, stop. Use Glob to list the folders that exist under `campaigns/` and ask which one to use. Do not write any files.

## Steps

1. Read `leads/leads.csv` and `leads/CLAUDE.md`. The groups are `water-curious`, `gift-buyers` and `daily-drinkers`. Use the group descriptions in `leads/CLAUDE.md`.
2. Use Glob to find every file in `<campaign folder>/emails/*.md`.
3. Read `brand/voice.md` and `.claude/rules/emails.md`. Every version must follow both.
4. For each email and each group, write a version that keeps the same structure, subject, preview, link, button text, sign-off and footer. Change only two things:
   - the opening line after the greeting, so it fits that group
   - one example, so it fits that group
5. Save each version to `<campaign folder>/groups/<group>/emails/` with the same file name as the original.

## Rules

- Keep `Hello {{first_name}},` as the greeting. Keep the `Subject:` and `Preview:` lines exactly as in the original.
- Keep the one main link exactly as written. Do not add other links.
- Keep the sign-off and the two-line footer as plain text, word for word. No code blocks.
- Use only facts that are in `brand/voice.md` and `brand/products.md`. Make none of the claims `brand/voice.md` forbids and use none of the words it says to avoid.
- Do not mention prices, delivery or offers that are not confirmed.
- Never write another brand's name. Everything is for Murree Sparkletts.
- Write in plain English, in short, clear sentences.
- Never overwrite an existing file. If a target file already exists, skip it and list it in the summary.

## Reply

Reply with a short summary only: how many files you wrote, how many you skipped, and one example opening line per group.
