# Skills

This is where the Twibbit agent and its skill files live. Each skill is a folder with a `SKILL.md` that tells an AI agent how to check one part of a bitcoin app's UX.

The first skills are built from the tier 1 jobs in the [research report](../report/09-jobs-to-be-done-tiers-1-to-3.md).

## Published skills

| Skill | What it does |
|---|---|
| [`interview`](interview/SKILL.md) | Start here. Asks the builder ten questions, saves the answers to `TWIBBIT.md`, shows them a visual summary (`twibbit-brief.html`), and routes them to the skill files that matter most. |
| [`ux-review`](ux-review/SKILL.md) | Give your AI agent a screen from your bitcoin or Lightning wallet and get back a UX review you can act on. It reads the words on every screen first, then checks the design against the Twibbit 10 UX principles and compares it with the Bitcoin Design Guide. You get one HTML page with before and after sketches, numbered changes, and a source tag on every suggestion. Optional live preview, including plugins for Buzz. |

Coming next: `jobs-to-be-done`, `branding` and `copy`.

## Try it in Claude Code

Copy the `skills/` folders into your project's `.claude/skills/` folder, then tell Claude Code: "Use Twibbit. I'm building a Lightning wallet and I want help with the UX." Twibbit is built for Claude Code first.

To propose a skill, start from [`_template/SKILL.md`](_template/SKILL.md) and see [CONTRIBUTING.md](../CONTRIBUTING.md).
