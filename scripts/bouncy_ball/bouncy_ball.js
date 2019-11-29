var bbCanvas = null;
var bbCtx = null;
var bbBgImage = null;
var bbImage = null;
var bbWallWidth = null;
var bbWallHeight = null;
var bbFloorY = null;

var bbDrawing = false;
var bbDrawTime = null;
var bbDrawTimer = null;
var bbTicking = false;
var bbTickTime = null;
var bbTickTimer = null;

var bbWallStrokeWidth = 2;
var bbRadius = 20;
var bbMaxSpeed = null;
var bbXPos = null;
var bbYPos = null;
var bbDirX = 0;
var bbDirY = 0;
var bbBounceRetardation = 0.2;
var bbGravity = 0.01;
var bbStopSpeed = null;
var bbLastFacedLeft = false;

function initBouncyBall( maxFps )
{
	bbCanvas = document.getElementById('bouncy_ball_canvas');
	bbCtx = bbCanvas.getContext('2d');
	
	bbBgImage = new Image();
	bbBgImage.onload = bbDraw;
	bbBgImage.src = 'http://static.iaibai.com/assets/production/bird_bg.png';
	
	bbImage = new Image();
	bbImage.onload = bbDraw;
	bbImage.src = 'http://static.iaibai.com/assets/production/ball.png';

	bbWallWidth = bbCanvas.width;
	bbWallHeight = bbCanvas.height;
	bbFloorY = bbWallHeight - 20;

	bbXPos = bbWallWidth / 2;
	bbYPos = bbFloorY - bbRadius;

	if ( !maxFps )
	{
		maxFps = 25;
	}

	bbTickTime = 10;
	bbDrawTime = 1000 / maxFps;
	bbMaxSpeed = bbTickTime * 2;
	bbStopSpeed = bbMaxSpeed * 0.08;
}


function bbKick()
{
	// send it off at a random angle at it's max speed
	var inDegress = 15 + Math.floor(Math.random()*60)+1;
	var inRadians = inDegress * (Math.PI/180);
	
	bbDirXSpeed = Math.cos(inRadians) * bbMaxSpeed;
	if ( Math.round(bbDirXSpeed)==0 )
	{
		bbDirX = bbDirXSpeed * ( Math.random()<0.5 ? 1 : -1 );
	}
	else
	{
		bbDirX += bbDirX<0 ? (-1*bbDirXSpeed) : bbDirXSpeed;
	}
	bbDirY += Math.sin(inRadians) * bbMaxSpeed * -1;

	bbStartTicking();
	bbStartDrawing();
}


function bbStartTicking()
{
	if ( !bbTickTimer )
	{
		bbTickTimer = setInterval(bbTick,bbTickTime);
	}
}


function bbStopTicking()
{
	if ( bbTickTimer )
	{
		clearInterval(bbTickTimer);
		bbTickTimer = null;
	}
}


function bbStartDrawing()
{
	if ( !bbDrawTimer )
	{
		bbDrawTimer = setInterval(bbDraw,bbDrawTime);
	}
}


function bbStopDrawing()
{
	if ( bbDrawTimer )
	{
		clearInterval(bbDrawTimer);
		bbDrawTimer = null;
	}
}


function bbTick()
{
	if ( !bbTicking )
	{
		bbTicking = true;
		
		bbXPos += bbDirX;
		bbYPos += bbDirY;
		var bounced = false;
		
		if ( (bbXPos+bbRadius)>=bbWallWidth )
		{
			bbXPos -= 2 * (bbXPos-bbWallWidth+bbRadius);
			bbDirX = -1 * bbDirX;
			bounced = true;
		}
		else if ( bbXPos<=bbRadius )
		{
			bbXPos += bbRadius - bbXPos;
			bbDirX = -1 * bbDirX;
			bounced = true;
		}
		
		if ( (bbYPos+bbRadius)>=bbFloorY )
		{
			bbYPos -= 2 * (bbYPos+bbRadius-bbFloorY);
			bbDirY = -1 * bbDirY;
			bounced = true;
		}
		else if ( bbYPos<=bbRadius )
		{
			bbYPos += bbRadius - bbYPos;
			bbDirY = -1 * bbDirY;
			bounced = true;
		}

		if ( bounced )
		{
			var bbDirX2 = bbDirX * (1 - bbBounceRetardation);
			bbDirX = (bbDirX + bbDirX2) * 0.5;
			
			var bbDirY2 = bbDirY * (1 - bbBounceRetardation);
			bbDirY = (bbDirY + bbDirY2) * 0.5;
		}
		
		bbDirY += bbMaxSpeed * bbGravity;
		
		// stop it if it's quite frankly finished
		var magY = bbDirY<0 ? (-1*bbDirY) : bbDirY;
		var magX = bbDirX<0 ? (-1*bbDirX) : bbDirX;
		var currentSpeed = Math.sqrt((magY*magY)+(magX*magX));
		if ( currentSpeed<bbStopSpeed && (bbYPos+bbRadius+1)>=bbFloorY )
		{
			bbDirY = 0;
			bbDirX = 0;
			bbStopDrawing();
			bbStopTicking();
			bbDraw();
		}
		
		bbTicking = false;
	}
}


function bbDraw()
{
	if ( !bbDrawing )
	{
		bbDrawing = true;
	
		bbCtx.clearRect(0,0,bbCanvas.width,bbCanvas.height);
		bbCtx.drawImage(bbBgImage,0,0,500,200,0,0,500,200);
		bbCtx.lineWidth = bbWallStrokeWidth;
		bbCtx.strokeStyle = "rgb(0,0,0)";
		bbCtx.strokeRect(0,0,bbWallWidth,bbWallHeight);
		
		var inRadians = 0;
		if ( bbDirX==0 && bbDirY>0 )
		{
			inRadians = 0.5 * Math.PI;
		}
		else if ( bbDirX==0 && bbDirY<0 )
		{
			inRadians = -0.5 * Math.PI;
		}
		else if ( bbDirX!=0 )
		{
			inRadians = Math.atan(bbDirY/bbDirX);
		}
		
		// smooth it out by saying the bird can never rotate too much
		var maxRotate = 0.15;
		if ( inRadians>maxRotate*Math.PI )
		{
			inRadians = maxRotate*Math.PI;
		}
		else if ( inRadians<-1*maxRotate*Math.PI )
		{
			inRadians = -1*maxRotate*Math.PI;
		}
		
		if ( bbDirX<0 || (bbDirX==0 && bbLastFacedLeft) )
		{
			bbLastFacedLeft = true;
			inRadians = -1 * inRadians;
			bbCtx.save();
			bbCtx.translate( bbXPos, bbYPos );
			bbCtx.scale(-1,1);
			bbCtx.rotate(inRadians);
			bbCtx.drawImage(bbImage,0,0,bbRadius*2,bbRadius*2,-1*bbRadius,-1*bbRadius,bbRadius*2,bbRadius*2);
			bbCtx.rotate(-inRadians);
			bbCtx.translate( -1*bbXPos, -1*bbYPos );
			bbCtx.restore();
		}
		else
		{
			bbLastFacedLeft = false;
			bbCtx.translate( bbXPos, bbYPos );
			bbCtx.rotate(inRadians);
			bbCtx.drawImage(bbImage,-1*bbRadius,-1*bbRadius,bbRadius*2,bbRadius*2);
			bbCtx.rotate(-inRadians);
			bbCtx.translate( -1*bbXPos, -1*bbYPos );
		}
	
		bbDrawing = false;
	}
}