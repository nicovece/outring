export class SiteNav extends HTMLElement {
	connectedCallback() {
		const toggle = this.querySelector("[data-menu-toggle]");
		const nav = this.querySelector("nav");

		if (!toggle || !nav) return;

		toggle.addEventListener("click", () => {
			const isOpen = nav.classList.toggle("menu-open");
			toggle.setAttribute("aria-expanded", String(isOpen));
		});

		// Close on Escape
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") {
				nav.classList.remove("menu-open");
				toggle.setAttribute("aria-expanded", "false");
			}
		});
	}
}

customElements.define("site-nav", SiteNav);
