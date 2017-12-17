const marqueeSpeed = 1
let actualHeight = 0

export default class Marquee {
	constructor(selector, duration = 30 * 1000) {
		this.selector = selector
		this.duration = duration
	}

	update() {
		const container = document.querySelector(this.selector)
		const child = container.firstElementChild
		let offset = child.clientHeight - container.clientHeight
		offset = offset > 0 ? offset : 0
		
		this.animation = child.animate([
			{
				transform: 'translateY(0)',
				offset: 0.05
			},
			{
				transform: `translateY(-${offset}px)`,
				offset: 0.45
			},
			{
				transform: `translateY(-${offset}px)`,
				offset: 0.55
			},
			{
				transform: 'translateY(0)',
				offset: 0.95
			}
		], {
			duration: this.duration,
			iterations: Infinity
		})

		this.animation.play()
	}
}