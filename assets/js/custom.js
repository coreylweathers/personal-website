document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".terminal-menu-toggle");
  const navigation = document.getElementById("terminal-menu");
  if (!toggle || !navigation) return;
  const setOpen = open => {
    navigation.classList.toggle("open", open);
    toggle.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close primary navigation" : "Open primary navigation");
  };
  toggle.addEventListener("click", () => setOpen(!navigation.classList.contains("open")));
  navigation.addEventListener("click", event => {
    if (event.target.closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && navigation.classList.contains("open")) {
      setOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener("click", event => {
    if (navigation.classList.contains("open") && !event.target.closest(".terminal-header")) setOpen(false);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 960) setOpen(false);
  });
  const themeToggle = document.querySelector(".study-theme-toggle");
  const syncTheme = () => {
    const dark = document.body.getAttribute("theme") === "dark";
    const label = dark ? "Switch to light theme" : "Switch to dark theme";
    themeToggle?.setAttribute("aria-label", label);
    themeToggle?.setAttribute("aria-pressed", String(dark));
    themeToggle?.setAttribute("title", label);
    const themeColor = document.querySelector('meta[name="theme-color"]');
    themeColor?.setAttribute("content", themeColor.dataset[dark ? "dark" : "light"]);
  };
  themeToggle?.addEventListener("click", () => {
    const next = document.body.getAttribute("theme") === "dark" ? "light" : "dark";
    document.body.setAttribute("theme", next);
    document.body.setAttribute("cfg-theme", next);
    document.documentElement.style.colorScheme = next;
    try { localStorage.setItem("theme", next); } catch {}
    syncTheme();
  });
  window.addEventListener("site-theme-change", syncTheme);
  syncTheme();
});
