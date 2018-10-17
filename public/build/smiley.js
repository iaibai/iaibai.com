function initSmiley()
{
	var ctx = document.getElementById('smiley_canvas').getContext('2d');
	var height = document.getElementById('smiley_canvas').height;
	var width = document.getElementById('smiley_canvas').width;
	var centerX = width/2;
	var centerY = height/2;
	var radius = (height - 2) / 2;
	var smileRadius = 0.65 * radius;
	var eyeRadius = radius / 6;
	var eyeXOffset = 0.4 * radius;
	var eyeYOffset = 0.4 * radius;
	
	ctx.beginPath();
	ctx.strokeStyle = "rgb(0,0,0)";
	ctx.arc(centerX,centerY,radius,0,2*Math.PI,false);
	ctx.fillStyle = "rgb(255,255,50)";
	ctx.fill();
	ctx.lineWidth = 3;
	ctx.stroke();
	
	ctx.lineWidth = 5;
	ctx.beginPath();
	ctx.strokeStyle = "rgb(0,0,0)";
	ctx.arc(centerX,centerY,smileRadius,0.1*Math.PI,0.9*Math.PI,false);
	ctx.stroke();
	
	ctx.beginPath();
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.arc(centerX-eyeXOffset,centerY-eyeYOffset,eyeRadius,0,2*Math.PI,false);
	ctx.closePath();
	ctx.fill();
	
	ctx.beginPath();
	ctx.arc(centerX+eyeXOffset,centerY-eyeYOffset,eyeRadius,0,2*Math.PI,false);
	ctx.closePath();
	ctx.fill();
}