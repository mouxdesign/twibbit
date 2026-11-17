// HTML preview: opens a shared .html file in a side panel beside the conversation.
// The page runs in a sandboxed frame with scripts, forms, popups and top navigation
// all turned off. It asks for no host access (no manifest.host).

export const inject = ["react", "panels", "conversation", "relay"];

const PREFIX = "html-preview:?";
const MAX_BYTES = 5 * 1024 * 1024;

function isHtml(name, mime) {
  return /\.html?$/i.test(name || "") || /^text\/html\b/i.test(mime || "");
}

function previewTarget(file) {
  const params = new URLSearchParams({ url: file.url });
  if (file.name) params.set("name", file.name);
  return PREFIX + params.toString();
}

function parseTarget(target) {
  if (typeof target !== "string" || !target.startsWith(PREFIX)) return undefined;
  const params = new URLSearchParams(target.slice(PREFIX.length));
  const url = params.get("url");
  if (!url || !/^https?:\/\//i.test(url)) return undefined;
  return { url, name: (params.get("name") || "").trim() || "HTML preview" };
}

// Only media shared in the current community may be read.
function isCommunityMedia(url, origin) {
  try {
    if (!origin) return false;
    const u = new URL(url);
    return u.origin === new URL(origin).origin && /^\/media\/[0-9a-f]{64}/.test(u.pathname);
  } catch {
    return false;
  }
}

// The only kinds of address the app's own media source returns.
function isMediaSource(src) {
  if (typeof src !== "string") return false;
  if (src.startsWith("buzz-media://localhost/")) return true;
  if (src.startsWith("http://buzz-media.localhost/")) return true;
  return src.startsWith("/api/relay") && src.endsWith("/media");
}

// Adds a policy that blocks every network request from inside the page.
const POLICY =
  '<meta http-equiv="Content-Security-Policy" content="default-src \'none\'; img-src data:; style-src \'unsafe-inline\'; font-src data:">';

function withPolicy(html) {
  const head = /<head[^>]*>/i.exec(html);
  if (head) {
    const at = head.index + head[0].length;
    return html.slice(0, at) + POLICY + html.slice(at);
  }
  return POLICY + html;
}

export function apply(ctx) {
  const React = ctx.react;
  const h = React.createElement;
  const relay = ctx.relay;

  ctx.panels.register({
    id: "html-preview",
    title: "HTML preview",
    keepOpen: true,
    order: 0,
    matches: (target) => parseTarget(target) !== undefined,
    component: function HtmlPreviewPanel({ target }) {
      const snap = React.useSyncExternalStore(relay.subscribe, relay.snapshot);
      const file = React.useMemo(() => parseTarget(target), [target]);
      const [state, setState] = React.useState({ status: "loading" });
      const origin = snap && snap.origin;
      const session = snap && snap.session;
      const url = file && file.url;

      React.useEffect(() => {
        if (!url) return undefined;
        if (!origin || !session) {
          setState({ status: "loading" });
          return undefined;
        }
        if (!isCommunityMedia(url, origin)) {
          setState({ status: "error", message: "Only files shared in this community can be previewed." });
          return undefined;
        }
        const src = session.media(url);
        if (!isMediaSource(src)) {
          setState({ status: "error", message: "Buzz could not give access to this file." });
          return undefined;
        }
        const controller = new AbortController();
        setState({ status: "loading" });
        fetch(src, { signal: controller.signal })
          .then((res) => {
            if (!res.ok) throw new Error("The file could not be loaded (" + res.status + ").");
            const length = Number(res.headers.get("content-length") || 0);
            if (length > MAX_BYTES) throw new Error("This file is too large to preview.");
            return res.arrayBuffer();
          })
          .then((buffer) => {
            if (buffer.byteLength > MAX_BYTES) throw new Error("This file is too large to preview.");
            const text = new TextDecoder("utf-8").decode(buffer);
            setState({ status: "ready", html: withPolicy(text) });
          })
          .catch((error) => {
            if (controller.signal.aborted) return;
            setState({ status: "error", message: String((error && error.message) || error) });
          });
        return () => controller.abort();
      }, [url, origin, session]);

      if (typeof ctx.panels.useTabTitle === "function") ctx.panels.useTabTitle(file ? file.name : "HTML preview");
      if (!file) return null;

      const note = (text) =>
        h("p", { style: { padding: "var(--space-panel-inset)", color: "var(--muted-foreground, inherit)" } }, text);

      if (state.status === "loading") return note("Loading " + file.name + "...");
      if (state.status === "error") return note(state.message);

      return h(
        "div",
        { style: { display: "flex", flexDirection: "column", height: "100%", minHeight: 0, width: "100%" } },
        h(
          "p",
          { style: { padding: "var(--space-2, 8px) var(--space-panel-inset, 12px)", fontSize: 12, opacity: 0.7 } },
          "Preview with scripts turned off. Links inside the page do not open here.",
        ),
        h("iframe", {
          title: file.name,
          sandbox: "",
          srcDoc: state.html,
          referrerPolicy: "no-referrer",
          style: { flex: 1, width: "100%", minHeight: 0, border: 0, background: "#fff" },
        }),
      );
    },
  });

  function HtmlCard(props) {
    const { attachment, source, placement, FileCard, open } = props;
    if (!FileCard) return null;
    return h(FileCard, {
      attachment,
      source,
      onOpenLink: open,
      typeLabel: "HTML",
      ...(placement === "message" ? { onPreview: () => void open(previewTarget(attachment)) } : {}),
    });
  }

  ctx.conversation.registerAttachment({
    id: "html-card",
    title: "HTML preview",
    order: 0,
    matches: (attachment) =>
      attachment.kind === "file" &&
      isHtml(attachment.name, attachment.mime) &&
      isCommunityMedia(attachment.url, relay.snapshot().origin),
    component: HtmlCard,
  });
}
