# Skills

This is where the Twibbit agent and its skill files live. Each skill is a folder with a `SKILL.md` that tells an AI agent how to check one part of a bitcoin app's UX.

The first skills are built from the tier 1 jobs in the [research report](../report/09-jobs-to-be-done-tiers-1-to-3.md).

## Published skills

| Skill | What it does |
|---|---|
| [`interview`](interview/SKILL.md) | Start here. Asks the builder ten questions, saves the answers to `TWIBBIT.md`, shows them a visual summary (`twibbit-brief.html`), and routes them to the skill files that matter most. |

Coming next: `jobs-to-be-done`, `branding`, `copy` and `ux-review`.

## Try it in Claude Code

Copy the `skills/` folders into your project's `.claude/skills/` folder, then tell Claude Code: "Use Twibbit. I'm building a Lightning wallet and I want help with the UX." Twibbit is built for Claude Code first.

To propose a skill, start from [`_template/SKILL.md`](_template/SKILL.md) and see [CONTRIBUTING.md](../CONTRIBUTING.md).
