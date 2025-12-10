/**
 * Before/After Image Slider Component
 *
 * Features:
 * - Mouse drag
 * - Touch drag
 * - Keyboard controls (arrow keys)
 * - Progressive enhancement
 * - Accessible
 */

class BeforeAfterSlider {
	private container: HTMLElement
	private slider: HTMLInputElement
	private handle: HTMLElement
	private isDragging = false
	private reveal = 50 // Percentage (0-100)

	constructor(element: HTMLElement) {
		this.container = element.querySelector(".before-after__container")!
		this.slider = element.querySelector(".before-after__slider")!
		this.handle = element.querySelector(".before-after__handle")!

		this.init()
	}

	private init(): void {
		// Mark as enhanced
		this.container.closest(".before-after")!.setAttribute("data-enhanced", "")

		// Mouse events
		this.handle.addEventListener("mousedown", this.onDragStart.bind(this))
		document.addEventListener("mousemove", this.onDragMove.bind(this))
		document.addEventListener("mouseup", this.onDragEnd.bind(this))

		// Touch events
		this.handle.addEventListener("touchstart", this.onDragStart.bind(this), { passive: true })
		document.addEventListener("touchmove", this.onDragMove.bind(this), { passive: false })
		document.addEventListener("touchend", this.onDragEnd.bind(this))

		// Keyboard events (on container for accessibility)
		this.container.setAttribute("tabindex", "0")
		this.container.setAttribute("role", "slider")
		this.container.setAttribute("aria-label", "Compare before and after images")
		this.container.setAttribute("aria-valuemin", "0")
		this.container.setAttribute("aria-valuemax", "100")
		this.container.setAttribute("aria-valuenow", "50")
		this.container.addEventListener("keydown", this.onKeyDown.bind(this))

		// Range slider fallback (still functional)
		this.slider.addEventListener("input", this.onSliderInput.bind(this))

		// Click anywhere on container to jump
		this.container.addEventListener("click", this.onContainerClick.bind(this))
	}

	private onDragStart(e: MouseEvent | TouchEvent): void {
		this.isDragging = true
		this.container.style.cursor = "ew-resize"
		e.preventDefault()
	}

	private onDragMove(e: MouseEvent | TouchEvent): void {
		if (!this.isDragging) return

		const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
		this.updateReveal(clientX)
	}

	private onDragEnd(): void {
		this.isDragging = false
		this.container.style.cursor = ""
	}

	private onKeyDown(e: KeyboardEvent): void {
		let newReveal = this.reveal

		switch (e.key) {
			case "ArrowLeft":
				newReveal = Math.max(0, this.reveal - 5)
				break
			case "ArrowRight":
				newReveal = Math.min(100, this.reveal + 5)
				break
			case "Home":
				newReveal = 0
				break
			case "End":
				newReveal = 100
				break
			default:
				return // Don't prevent default for other keys
		}

		e.preventDefault()
		this.setReveal(newReveal)
	}

	private onSliderInput(e: Event): void {
		const value = parseInt((e.target as HTMLInputElement).value)
		this.setReveal(value)
	}

	private onContainerClick(e: MouseEvent): void {
		// Don't interfere with dragging
		if (e.target === this.handle || this.handle.contains(e.target as Node)) {
			return
		}

		this.updateReveal(e.clientX)
	}

	private updateReveal(clientX: number): void {
		const rect = this.container.getBoundingClientRect()
		const x = clientX - rect.left
		const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
		this.setReveal(percentage)
	}

	private setReveal(percentage: number): void {
		this.reveal = percentage

		// Update CSS custom property
		this.container.style.setProperty("--reveal", `${percentage}%`)

		// Update slider
		this.slider.value = percentage.toString()

		// Update ARIA
		this.container.setAttribute("aria-valuenow", Math.round(percentage).toString())
	}
}

// Auto-initialize all before/after sliders
export function initBeforeAfterSliders(): void {
	const sliders = document.querySelectorAll<HTMLElement>("[data-before-after]")
	sliders.forEach((slider) => new BeforeAfterSlider(slider))
}

// Initialize on DOM ready
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", initBeforeAfterSliders)
} else {
	initBeforeAfterSliders()
}
