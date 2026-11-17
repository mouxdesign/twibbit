// Live preview: a link to a page on this computer (localhost or 127.0.0.1) opens in a
// side panel beside the conversation, using Buzz's own browser view.
// Needs the desktop browser capability (macOS desktop). Asks for no host access.

export const inject = ["react", "panels", "browser"];

// Loopback addresses only. Anything else keeps Buzz's normal link handling.
const LOOPBACK = /^http:\/\/(localhost|127\.0\.0\.1)(:\d{1,5})?(\/|$)/i;

export function apply(ctx) {
  ctx.panels.register({
    id: "live-preview",
    title: "Live preview",
    // Catch-all band, so a panel made for one specific site wins over this one.
    order: 100,
    matches: (target) =>
      ctx.browser.available === true && typeof target === "string" && LOOPBACK.test(target),
    component: function LivePreviewPanel({ target }) {
      if (typeof ctx.panels.useTabTitle === "function") ctx.panels.useTabTitle("Live preview");
      return ctx.react.createElement(ctx.browser.View, { url: target });
    },
  });
}
