document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".site-nav-wrap");
  if (!toggle || !navigation) return;
  const setOpen = open => {
    navigation.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "Close" : "Menu";
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
    if (navigation.classList.contains("open") && !event.target.closest(".site-header")) setOpen(false);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) setOpen(false);
  });
});
