# Live preview (draft)

Click a link to a local page, such as `http://localhost:8080/review.html`, and it opens in a side panel beside the conversation. It has an address bar, Back, Forward and Reload. Reload after the agent changes the page.

- Uses Buzz's own browser view. **macOS desktop only.** It leaves links alone on other platforms.
- Handles only `http://localhost` and `http://127.0.0.1` links, so ordinary web links keep their usual behaviour.
- Asks for no host access (the manifest has no `host` key).
- The local page runs in a separate browser view. Remote pages get no Buzz bridge.
- The page must be served by something running on your computer, for example `python3 -m http.server 8080 --bind 127.0.0.1` in the folder that holds the page.
- Draft. Not tested in a running Buzz.

## Install
Settings > Plugins > Manage plugins > Add > Browse (Add from folder), pick this folder, review the access (it should list none), Install plugin.
