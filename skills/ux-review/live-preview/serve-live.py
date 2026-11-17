#!/usr/bin/env python3
"""Serve one folder on this computer only, and refresh the page when a file changes.

Usage:  python3 serve-live.py [folder] [port]
Then open  http://localhost:PORT/your-page.html  (for example from a link in Buzz).
Stop it with Ctrl+C, or end the process.

- Listens on 127.0.0.1 only, so other computers cannot reach it.
- Serves only files inside the folder you name.
- Adds a small refresh script to HTML pages as they are served. Your files on disk are not changed.
"""
import http.server, os, sys, functools

FOLDER = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else ".")
PORT = int(sys.argv[2]) if len(sys.argv) > 2 else 8080
MAX_FILES = 2000

SNIPPET = (
    b"<script>(function(){var last=null;function t(){fetch('/__live',{cache:'no-store'})"
    b".then(function(r){return r.text()}).then(function(v){if(last!==null&&v!==last){location.reload()}"
    b"last=v}).catch(function(){})}setInterval(t,1000);t()})();</script>"
)

def newest_change():
    newest, n = 0.0, 0
    for root, dirs, files in os.walk(FOLDER):
        dirs[:] = [d for d in dirs if not d.startswith(".") and d != "node_modules"]
        for f in files:
            n += 1
            if n > MAX_FILES:
                return newest
            try:
                newest = max(newest, os.stat(os.path.join(root, f)).st_mtime)
            except OSError:
                pass
    return newest

class Handler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_GET(self):
        path = self.path.split("?", 1)[0]
        if path == "/__live":
            body = str(newest_change()).encode()
            self.send_response(200)
            self.send_header("Content-Type", "text/plain")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        local = self.translate_path(path)
        if path.endswith("/"):
            local = os.path.join(local, "index.html")
        if local.lower().endswith((".html", ".htm")) and os.path.isfile(local):
            with open(local, "rb") as fh:
                data = fh.read()
            i = data.lower().rfind(b"</body>")
            data = data[:i] + SNIPPET + data[i:] if i != -1 else data + SNIPPET
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            self.wfile.write(data)
            return
        super().do_GET()

if __name__ == "__main__":
    handler = functools.partial(Handler, directory=FOLDER)
    with http.server.ThreadingHTTPServer(("127.0.0.1", PORT), handler) as srv:
        print(f"Serving {FOLDER} at http://localhost:{PORT}/  (this computer only). Ctrl+C to stop.")
        srv.serve_forever()
