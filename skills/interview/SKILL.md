---
name: interview
description: Start here. Use whenever a builder asks for help with the UX, design, branding, copy or review of a bitcoin or Lightning wallet, or mentions Twibbit, and has not yet been interviewed. Interviews the builder, saves their answers to TWIBBIT.md, shows them a visual summary, and routes them to the skill files that matter most.
---

# Interview

This is the first Twibbit skill. It listens for what the project is, who the audience is and what already exists, and then sends the builder to one or two skill files that matter most.

Twibbit is for bitcoin builders who are primarily building Lightning or bitcoin wallets with an AI-powered workflow. Keep the interview short, warm and specific. The builder should feel they are being streamlined in a specific direction, not filling in a form.

## What it checks

The interview collects the answers below. Ask them in two short rounds, not one long block. Wait for the answers to a round before starting the next. Do not ask a question the builder has already answered.

### Round 1: the project

1. **What is the name of your wallet?** Ask this first. It becomes the title of the brief.
2. **What does your application do?** Give me a high-level overview in a few sentences.
3. **Is it a Lightning wallet, an on-chain wallet, or both?**
4. **Is this a new build, or an existing product you want to protect and improve?**
5. **What platform is it on?** A desktop application or a mobile app?
6. **Which coding tool do you use?** For example Claude Code or Codex. This is only for learning how builders work. It does not change the routing.

### Round 2: direction

7. **Who is it for?** Beginners, technical users, activists, merchants, developers, or a specific community? How experienced are they with bitcoin?
8. **How clear is your target audience?** Very clear, somewhat clear, or not yet.
9. **Do you already have branding?** Yes, partly, or no. Do you have a design system?
10. **What would you like to work on today?** Jobs to be done, branding, copy, a UX review of a screen, or you are not sure.
11. **Are there any screens or flows you most want reviewed?** Or should we start from the beginning of the user journey?
12. **Are you using Buzz?** Yes or no. This is only used to offer the optional Buzz preview plugins after the interview. It does not change the routing.

## How to judge it

After round 2, confirm what you heard in 2 to 3 plain sentences. If an answer is missing or unclear, ask one follow up. Do not guess an answer.

### Save the answers

Write the answers to `TWIBBIT.md` in the builder's project root. Every other Twibbit skill reads this file first and updates it at the end. If the file already exists, read it, show the builder what it says, and ask what has changed before overwriting anything.

Use this format:

```markdown
# TWIBBIT.md

Project brief created by the Twibbit interview skill. Other Twibbit skills read this first.

- Updated: YYYY-MM-DD

## Project
- Name:
- What it does:
- Wallet type: Lightning | on-chain | both
- Build status: new | existing
- Platform: desktop | mobile
- Coding tool (for learning only):
- Uses Buzz: yes | no

## Direction
- Audience:
- Bitcoin experience level of the audience:
- Audience clarity: very clear | somewhat clear | not yet
- Branding: yes | partly | no
- Design system: yes | no
- Wants to work on today:
- Screens or flows to review first:

## Routing
- Recommended skills: (one or two, with the reason)

## Notes
- Anything else the builder said that later skills should know.
```

### Show a visual summary

After saving `TWIBBIT.md`, write `twibbit-brief.html` next to it from [`brief-template.html`](brief-template.html). Fill in each placeholder with the builder's answers. The wallet name goes in `{{PROJECT_NAME}}`, the large title at the top of the page. It must be a single self-contained file with no external requests, so nothing leaves the builder's machine. In the same message, tell the builder both files were saved, ask them to open `twibbit-brief.html` in their browser to confirm that their answers are right, and ask them to correct anything that is wrong. Then update both files. Capitalise the first letter of each answer you write into the files.

### Offer the Buzz live preview

If the builder answered yes to question 12, point them to the Twibbit live preview plugin before routing. Say in two or three plain sentences: `twibbit.live-preview` is an optional Buzz plugin in `buzz/plugins/` of the Twibbit repo. It opens a `localhost` link in a side panel beside the conversation, so the `ux-review` page refreshes as it is written (macOS desktop). They install it in Buzz under Settings, Plugins, Manage plugins. Say that the plugin is early and optional. If they want something simpler, mention `twibbit.html-preview`, which opens a shared HTML file in a side panel without the live refresh.

Do not try to install a plugin for them. Do not start the live preview server now. The `ux-review` skill asks before it starts it. If the answer is no, say nothing about the plugins. Keep it to one short message, then carry on to routing.

### Route the builder

Once the builder has confirmed their answers, choose one or two skills from this table. Tell the builder which you chose and why, in one or two sentences, then load the first one and carry on in the same conversation. Do not stop to ask which they prefer unless the table gives two equally good options. If the builder named a skill in question 9, use that one first.

| What the answers show | Skill |
|---|---|
| Audience is "not yet" or only somewhat clear | `jobs-to-be-done` |
| No branding, no design system, or the builder is unsure how the product should look or feel | `branding` |
| The builder wants their words checked or written, or copy is unclear | `copy` |
| The builder has screens and wants feedback, or wants a UX review only | `ux-review` |

Rules for routing:
- Pick at most two. Do not list every skill.
- If a skill file does not exist yet in the builder's Twibbit folder, say it is coming soon and offer the next best one.
- If the builder says they only want a UX review, skip the rest and go straight to `ux-review`.
- Never claim an app is trustworthy or safe because of the interview. The interview only gathers context.

## Sources

- Questions 2, 3 (audience part), 5 and 11 come from the Stage 0 developer interview in the [VibeDesignSkillBitcoin](https://github.com/mouxdesign/VibeDesignSkillBitcoin) skill.
- Questions 4, 8, 9 and 10 and the routing come from the Twibbit product flow (interview, direction, skill files, UX review) and the team call on 2026-11-16 about the MVP. Question 4 answers the tier 3 job in [report chapter 9](../../report/09-jobs-to-be-done-tiers-1-to-3.md): "I need the tool to ask whether I'm protecting an existing product or starting fresh."
- The target niche, Lightning and bitcoin wallets, comes from the [Twibbit product vision](../../PRODUCT_VISION.md).
