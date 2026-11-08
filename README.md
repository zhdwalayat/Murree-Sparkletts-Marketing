# Murree Sparkletts Email Marketing

Email marketing project for Murree Sparkletts.

Premium Himalayan drinking water. *Drink Healthy, Live Healthy.*

## Structure
- `brand/`      Murree Sparkletts voice guide (`voice.md`) and product facts (`products.md`)
- `leads/`      made-up practice leads (`leads.csv`) in three groups: water-curious, gift-buyers, daily-drinkers
- `campaigns/`  one folder per campaign. `murree-sparkletts-launch/` holds the launch plan and emails; copy `_example` for new ones
- `notes/`      working notes, such as the skills we chose
- `.claude/`    shared Claude Code settings and `rules/emails.md`, which applies to every email file
- `templates/`  reusable HTML email templates
- `lists/`      audience/segment definitions (no raw personal data in git)
- `assets/`     images, logos
- `docs/`       strategy and compliance checklist
- `reports/`    campaign performance results

## Workflow
1. Define goal + audience in `campaigns/<name>/brief.md`
2. Write copy, build from a template
3. Test (subject, preview text, links, mobile, spam check)
4. Send, then record results in `reports/`
