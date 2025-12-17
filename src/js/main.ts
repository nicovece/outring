// Import styles
import "../css/main.css";
import "./components/before-after-slider";
import "./components/filter-dropdown";

// Note: FOUC may occur in dev mode (Vite CSS injection)
// Production with Blitz caching eliminates this
document.documentElement.classList.add("js-loaded");

if (import.meta.hot) {
	import.meta.hot.accept();
}

import { ThemeToggle } from "./components/theme-toggle";
if (!customElements.get("theme-toggle")) {
	customElements.define("theme-toggle", ThemeToggle);
}

import { SiteNav } from "./components/site-nav";
if (!customElements.get("site-nav")) {
	customElements.define("site-nav", SiteNav);
}

if (document.querySelectorAll("[data-reveal-group]").length > 0) {
	import("./components/scroll-reveal");
}
