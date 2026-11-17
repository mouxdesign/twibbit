# HTML preview (draft)

Opens an HTML file shared in a Buzz conversation in a side panel. The page is shown in a sandboxed frame with scripts, forms, popups and top navigation turned off, and a policy that blocks network requests from inside the page.

- Asks for **no host access** (the manifest has no `host` key).
- Reads only files shared in the current community, through Buzz's own media source. 5 MB limit.
- Links inside the preview do not open. Clicking the file card's download still saves the file.
- Draft. Not yet tested in a running Buzz.

## Install
Settings > Plugins > Manage plugins > Add > Browse (under "Add from folder"), pick this folder, review the access shown (it should list none) and select Install plugin.

## Try
Click the card of an attached `.html` file. It should open "HTML preview" beside the conversation.
