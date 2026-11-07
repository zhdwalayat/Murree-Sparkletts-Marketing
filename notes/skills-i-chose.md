
# Skills I chose (Step 1)

Nothing is installed. Stars were checked on GitHub on 2026-11-07. The `npx skills find` command was blocked in this session, so results came from web search and the GitHub API. skills.sh's own pages did not show install counts. Some counts quoted elsewhere conflict (for example 39K vs 59.5K installs for the same skill), so treat them as rough.

## Use these

1. **Writing campaigns: `anthropics/knowledge-work-plugins` (marketing plugin).** It is published by Anthropic itself, has about 35,000 GitHub stars, and was updated today. It includes campaign-plan, email-sequence and brand-review commands, and it is the plugin Step 2 installs. Backup for sequence ideas: `coreyhaines31/marketingskills` (about 59,000 stars, active), a well-known community collection with `emails` and `email-sequence` skills. Read it before trusting it, because one listing rated its security audit LOW.
2. **Sending email: `resend/resend-skills` and `resend/resend-mcp`.** These are published by Resend, the email service itself, so they are the official way to connect to it. Stars are modest (about 211 and 580), but that is normal for a vendor's own repos, and both were updated within the last day. We use practice mode, so no real key or account is needed.

## Avoid these

1. **`atxinsky/skills` (an `email-sequence` skill).** The repository has only about 5 stars, an unknown publisher, and no sign of review. It does the same job as better-known options.
2. **`fefogarcia/approved-skills` (an `email-sequence` skill).** The repository has about 2 stars, and "approved" in the name is a self-description, not a check by anyone. The name is meant to make it look vetted.

I have not read the contents of either skill, only judged where it comes from. Also be wary of any result whose install count is high but whose repo has very few stars. Install counts are easy to inflate.

## How I decided

Check these three things before installing any skill:

1. **Who publishes it.** Prefer the official owner (`anthropics`, `resend`). For anyone else, look at their other work and whether they are a real, active maintainer.
2. **Whether the GitHub repository backs up the numbers.** Check stars and the last update date. Many installs with almost no stars is a warning sign.
3. **What the skill actually does.** Open the repo and read the `SKILL.md` and any scripts before installing. Look for commands it runs, files it touches and any sending or network access.
