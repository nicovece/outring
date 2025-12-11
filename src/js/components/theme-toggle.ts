export class ThemeToggle extends HTMLElement {
	private button: HTMLButtonElement | null = null;

	constructor() {
		super();
	}

	private getCurrentTheme(): "dark" | "light" {
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme === "dark" || savedTheme === "light") {
			return savedTheme;
		}

		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		return prefersDark ? "dark" : "light";
	}

	private updateButtonLabel(theme: "dark" | "light"): void {
		if (!this.button) return;

		const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

		this.button.setAttribute("aria-label", label);

		const srText = this.button.querySelector(".sr-only");
		if (srText) {
			srText.textContent = label;
		}
	}

	private applyTheme(theme: "dark" | "light"): void {
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}

		localStorage.setItem("theme", theme);

		this.updateButtonLabel(theme);
	}

	private toggleTheme(): void {
		const currentTheme = this.getCurrentTheme();
		const newTheme = currentTheme === "dark" ? "light" : "dark";
		this.applyTheme(newTheme);
	}

	connectedCallback() {
		this.button = this.querySelector("button");

		if (!this.button) {
			console.warn("ThemeToggle: No button found");
			return;
		}

		const initialTheme = this.getCurrentTheme();
		this.applyTheme(initialTheme);

		this.button.addEventListener("click", () => {
			this.toggleTheme();
		});
	}
}
