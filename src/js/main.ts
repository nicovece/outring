// Import styles
import "../css/main.css";
import "./components/before-after-slider";

// Main TypeScript entry point
console.log("Outring - Vite + TypeScript ready");

// HMR support for development
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
