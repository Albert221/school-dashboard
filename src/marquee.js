var marqueeSpeed=1
var actualHeight=0

function Init(containerId, content)
{
	var crossMarquee=document.getElementById(content)
	var marqueeheight=document.getElementById(containerId).offsetHeight
	actualHeight=crossMarquee.offsetHeight
	
	setInterval(function(){
		var crossMarquee=document.getElementById(content)
		actualHeight=crossMarquee.offsetHeight

		if (parseInt(crossMarquee.style.top)>(actualHeight * (-1) + 8)) 
		crossMarquee.style.top=parseInt(crossMarquee.style.top)-marqueeSpeed+"px" 
		else 
		crossMarquee.style.top=parseInt(marqueeheight)+8+"px"
	},1000/30)
}

export {Init}