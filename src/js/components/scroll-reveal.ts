import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function initScrollReveal() {
	const groups = document.querySelectorAll("[data-reveal-group]");

	groups.forEach((group) => {
		const items = group.querySelectorAll("[data-reveal-item]");

		if (items.length === 0) return;

		gsap.fromTo(
			items,
			{
				opacity: 0,
				y: 40
			},
			{
				opacity: 1,
				y: 0,

				duration: 0.6,
				stagger: 0.1,
				ease: "power2.out",

				scrollTrigger: {
					trigger: group,
					start: "top 75%"
					//markers: true
				}
			}
		);
	});
}

initScrollReveal();
