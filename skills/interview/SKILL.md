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
2. **Please attach a screenshot of your wallet.** We use it to find your main colour. Any screen works, ideally one with your header or main button visible.
3. **What does your application do?** Give me a high-level overview in a few sentences.
4. **Is it a Lightning wallet, an on-chain wallet, or both?**
5. **Is this a new build, or an existing product you want to protect and improve?**
6. **What platform is it on?** A desktop application or a mobile app?
7. **Which coding tool do you use?** For example Claude Code or Codex. This is only for learning how builders work. It does not change the routing.

### Round 2: direction

8. **Who is it for?** Beginners, technical users, activists, merchants, developers, or a specific community? How experienced are they with bitcoin?
9. **How clear is your target audience?** Very clear, somewhat clear, or not yet.
10. **Do you already have branding?** Yes, partly, or no. Do you have a design system?
11. **What would you like to work on today?** Jobs to be done, branding, copy, a UX review of a screen, or you are not sure.
12. **Are there any screens or flows you most want reviewed?** Or should we start from the beginning of the user journey?
13. **Are you using Buzz?** Yes or no. This is only used to offer the optional Buzz preview plugins after the interview. It does not change the routing.

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
- Primary colour: #RRGGBB
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

### Find the primary colour

Look at the screenshot from question 2 and pick the one main colour the wallet uses. That is usually the header bar, the main button or the highlight colour, not black, white or grey backgrounds. If you can, read the exact value from the image pixels. Otherwise estimate it and say it is an estimate. Save it in `TWIBBIT.md` as `Primary colour`. If the builder has no screenshot, ask for the colour in words or as a hex value, and if they cannot give one, keep the default purple `#6f63f5`.

### Show a visual summary

After saving `TWIBBIT.md`, write `twibbit-brief.html` next to it from [`brief-template.html`](brief-template.html). Fill in each placeholder with the builder's answers. The wallet name goes in `{{PROJECT_NAME}}`, the large title at the top of the page. The primary colour goes in `{{ACCENT}}` (hex), `{{ACCENT_RGB}}` (the same colour as three numbers, for example `188,102,15`) and `{{ACCENT_LIGHT}}` (a lighter tint of it, used for text and icons on the dark page), so the brief uses the builder's own accent colour. It must be a single self-contained file with no external requests, so nothing leaves the builder's machine. Capitalise the first letter of each answer you write into the files.

Then send this message, with real links to both files. Keep the wording and the order. Fill in nothing else.

> Thanks. That's everything I need.
>
> Here's a summary of your interview:
> - `twibbit-brief.html` opens a page with your answers.
> - `TWIBBIT.md` is the same information as plain text. Every Twibbit skill reads it first.
>
> Open the page and check each answer. Tell me what's wrong, and I'll update both files.
>
> When everything is right, say so. Then we move on to your next steps.

Wait for the builder to say it is right. Do not route until they do. If they correct something, update both files and reply in one short line, for example: "Got it. I changed \"Branding\" to \"Yes\". Both files are updated. Check the page again, or tell me if it's right." Repeat until they confirm.

### Offer the Buzz live preview

If the builder answered yes to question 13, point them to the Twibbit live preview plugin before routing. Say in two or three plain sentences: `twibbit.live-preview` is an optional Buzz plugin in `buzz/plugins/` of the Twibbit repo. It opens a `localhost` link in a side panel beside the conversation, so the `ux-review` page refreshes as it is written (macOS desktop). They install it in Buzz under Settings, Plugins, Manage plugins. Say that the plugin is early and optional. If they want something simpler, mention `twibbit.html-preview`, which opens a shared HTML file in a side panel without the live refresh.

Do not try to install a plugin for them. Do not start the live preview server now. The `ux-review` skill asks before it starts it. If the answer is no, say nothing about the plugins. Keep it to one short message, then carry on to routing.

### Route the builder

Do this only after the builder has said the brief is right. Choose one priority skill and rank the others from this table.

| What the answers show | Skill | Card text | Button |
|---|---|---|---|
| Audience is "not yet" or only somewhat clear | `jobs-to-be-done` | Find out who your audience is and what they use {name} for. | Start the interview |
| No branding, no design system, or the builder is unsure how the product should look or feel | `branding` | Shape how {name} looks and feels. | Start branding |
| The builder wants their words checked or written, or copy is unclear | `copy` | Check and write the words in your wallet. | Share your text |
| The builder has screens and wants feedback, or wants a UX review only | `ux-review` | Share a few screens. Get a review against the Twibbit 10 principles and the Bitcoin Design Guide. | Share your screens |

Order:
1. The skill the builder named in question 11 goes first.
2. The rest follow in this order: `jobs-to-be-done`, `branding`, `copy`, `ux-review`.
3. A skill that does not exist yet in the builder's Twibbit folder can never be first. The priority is the first skill in the order that exists. Keep the missing ones in the list, marked "Coming soon".
4. If the builder only wants a UX review, the priority is `ux-review`. Keep the others as optional.

The brief page already shows this order on its Next steps tab: four cards, card 1 is the priority, cards 2 to 4 are optional, each with a one line reason from the builder's answers. Fill it in when you write the brief, and fix it if the builder's corrections change the order. For a skill with no reason in the answers, write one line on what it does.

Then send this message. Keep the wording and the order. Change only the skill names, the reasons and the last line:

> Good. Here's what I suggest, in this order:
>
> 1. **[Priority skill] (start here).** [One sentence: why, and what happens next.]
> 2. **[Skill] (optional).** [One sentence reason.]
> 3. **[Skill] (optional, coming soon).** [One sentence reason.]
>
> Your full list is on the Next steps tab of `twibbit-brief.html`.
>
> Let's go into the [priority skill] now. Should we get started?

Link the file. Say "(optional, coming soon)" for a skill that does not exist yet. List at most three skills. When the builder says yes, load the priority skill and start it in the same conversation. Its first message is its own. For `ux-review` it asks for the first screen and what it is, for example welcome, home or receive.

Rules for routing:
- Do not ask which skill the builder prefers. If the table gives two equally good options, pick by the order above.
- If the builder says no or wants a different skill, start the one they ask for, if it exists.
- Never claim an app is trustworthy or safe because of the interview. The interview only gathers context.

## Sources

- Questions 3, 4 (audience part), 6 and 12 come from the Stage 0 developer interview in the [VibeDesignSkillBitcoin](https://github.com/mouxdesign/VibeDesignSkillBitcoin) skill.
- Questions 5, 9, 10 and 11 and the routing come from the Twibbit product flow (interview, direction, skill files, UX review) and the team call on 2026-11-16 about the MVP. Question 5 answers the tier 3 job in [report chapter 9](../../report/09-jobs-to-be-done-tiers-1-to-3.md): "I need the tool to ask whether I'm protecting an existing product or starting fresh."
- The target niche, Lightning and bitcoin wallets, comes from the [Twibbit product vision](../../PRODUCT_VISION.md).
