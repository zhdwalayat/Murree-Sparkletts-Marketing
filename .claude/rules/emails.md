---
paths:
  - "campaigns/**/emails/*.md"
---

# Email file rules

Every email file must follow these rules. Write in plain English.

1. **Subject and preview.** Start the file with a line `Subject: ...` of 50 characters or fewer. The next line is `Preview: ...` of 90 characters or fewer.
2. **Greeting.** Greet the reader with `{{first_name}}`.
3. **One main link.** Have exactly one main link, written as `[Button text](https://sparklett.example/launch)`. The URL is a placeholder until the real launch page is confirmed.
4. **Ending.** End with the sign-off from `brand/voice.md`, then this two-line footer as plain text, not inside a code block:

You're getting this because you joined the Murree Sparkletts waitlist.
Murree Sparkletts, {{company_address}} · Unsubscribe: {{unsubscribe_url}}

Also follow `brand/voice.md`: use none of its avoided words and make none of its forbidden claims.
