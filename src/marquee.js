const marqueeSpeed=1
let actualHeight=0

export function Marquee(containerId) {
	var crossMarquee = document.getElementById(containerId).firstElementChild
	var marqueeheight = document.getElementById(containerId).offsetHeight
	actualHeight = crossMarquee.offsetHeight
	
	setInterval(function() {
		crossMarquee = document.getElementById(containerId).firstElementChild
		actualHeight = crossMarquee.offsetHeight

		if (parseInt(crossMarquee.style.top)>(actualHeight * (-1) + 8)) 
			crossMarquee.style.top = parseInt(crossMarquee.style.top) - marqueeSpeed + 'px' 
		else 
			crossMarquee.style.top = parseInt(marqueeheight) + 8 + 'px'
	}, 1000/30)
}
