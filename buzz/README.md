# Twibbit for Buzz (optional, early)

Two small plugins for builders who work in the [Buzz](https://buzz.relay.nostrver.se) desktop app. Neither is needed to use the Twibbit skills.

| Plugin | What it does |
|---|---|
| `plugins/twibbit.html-preview` | Click a shared `.html` file and it opens in a side panel beside the conversation, in a locked frame with scripts off. |
| `plugins/twibbit.live-preview` | Click a `http://localhost` link and it opens in a side panel with an address bar and Reload. macOS desktop only. Pair it with `skills/ux-review/live-preview/serve-live.py` to reload as files change. |

Both ask for no host access (their manifests have no `host` key).

## Install
In Buzz: Settings > Plugins > Manage plugins > Add > Browse (under "Add from folder"). Pick the plugin **folder** (not a zip), check the access it lists, and select Install plugin. Buzz requires you to confirm every install.

## Status
Early drafts.
- `twibbit.live-preview` was shown working in a real Buzz on macOS, rendering a local page beside the conversation.
- `twibbit.html-preview` was installed in a real Buzz by one tester. We have not yet seen confirmation that its preview opens. It was tested with a mock host and in a browser stand-in.

Plugins are trusted code that runs inside the app, so read `plugin.js` before you install. Each is about 150 lines or fewer.
