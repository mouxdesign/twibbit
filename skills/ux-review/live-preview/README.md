# Live preview server

`serve-live.py` serves one folder on your computer only and reloads the page about a second after any file in that folder changes. Use it to watch a UX review update while an agent edits it.

```
python3 serve-live.py /path/to/folder 8080
```

Open `http://localhost:8080/your-page.html`. Stop it with Ctrl+C.

- Listens on `127.0.0.1` only, so other computers cannot reach it.
- Serves only files inside the folder you name.
- Adds a small refresh script to HTML pages as they are served. Your files on disk are not changed.
- When the page reloads it starts over, for example a tab selection goes back to the first tab.

Needs Python 3. No other tools. Not tested on Windows or Linux.
