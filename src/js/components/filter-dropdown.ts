/**
 * Filter Dropdown Web Component
 * Handles open/close, outside click, keyboard navigation
 */
export class FilterDropdown extends HTMLElement {
	private button: HTMLButtonElement | null = null;
	private menu: HTMLElement | null = null;
	private isOpen = false;

	connectedCallback() {
		this.button = this.querySelector("button");
		this.menu = this.querySelector(".filter-dropdown-menu");

		if (!this.button || !this.menu) return;

		this.button.addEventListener("click", this.toggle.bind(this));
		document.addEventListener("click", this.handleOutsideClick.bind(this));
		document.addEventListener("keydown", this.handleKeydown.bind(this));
	}

	disconnectedCallback() {
		document.removeEventListener("click", this.handleOutsideClick.bind(this));
		document.removeEventListener("keydown", this.handleKeydown.bind(this));
	}

	private toggle() {
		this.isOpen ? this.close() : this.open();
	}

	private open() {
		this.isOpen = true;
		this.menu?.classList.remove("hidden");
		this.button?.setAttribute("aria-expanded", "true");
	}

	private close() {
		this.isOpen = false;
		this.menu?.classList.add("hidden");
		this.button?.setAttribute("aria-expanded", "false");
	}

	private handleOutsideClick(event: Event) {
		if (!this.contains(event.target as Node) && this.isOpen) {
			this.close();
		}
	}

	private handleKeydown(event: KeyboardEvent) {
		if (event.key === "Escape" && this.isOpen) {
			this.close();
			this.button?.focus();
		}
	}
}

customElements.define("filter-dropdown", FilterDropdown);
