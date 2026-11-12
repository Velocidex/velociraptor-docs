// Open an expand panel when the URL fragment points at content inside it.
//
// Headings inside an expand panel still appear in the page table of contents
// and are linkable, but the panel is closed by default, so a fragment
// navigation would land on hidden content. This opens the panel first, then
// re-scrolls so the target ends up in view once the layout has settled.
(() => {
  const reveal = () => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const target = id && document.getElementById(id);
    const panel = target && target.closest("details");
    if (!panel || panel.open) {
      return;
    }
    panel.open = true;
    requestAnimationFrame(() => target.scrollIntoView());
  };

  if (window.__expandAnchorReveal) {
    reveal();
    return;
  }
  window.__expandAnchorReveal = true;
  window.addEventListener("hashchange", reveal);
  window.addEventListener("DOMContentLoaded", reveal);
})();
