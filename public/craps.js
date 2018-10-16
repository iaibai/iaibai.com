var crapsNumThrows = null;
var crapsPoint = null;
var crapsState = null; // 'not started', 'keep throwing', 'win', 'lose'
var crapsDiceWidth = 90;
var crapsDicePadding = 10;

function initCraps()
{
	newCrapsGame();
}

function newCrapsGame()
{
	crapsNumThrows = 0;
	crapsPoint = null;
	crapsState = 'not started';
	clearDice();
	updateCrapsStatus();
}

function crapsThrow()
{
	clearDice();
	var crapsCanvas = document.getElementById('craps_canvas');
	var dice1XPos = (crapsCanvas.width-crapsDicePadding)/2 - crapsDiceWidth;
	var dice1YPos = (crapsCanvas.height-crapsDiceWidth)/2;
	var dice2XPos = dice1XPos + crapsDicePadding + crapsDiceWidth;
	var dice2YPos = dice1YPos;

	if ( crapsState=='not started' )
	{
		var dice1 = Math.floor(Math.random()*6)+1;
		drawDice(crapsCanvas,dice1XPos,dice1YPos,crapsDiceWidth,dice1);
		
		var dice2 = Math.floor(Math.random()*6)+1;
		drawDice(crapsCanvas,dice2XPos,dice2YPos,crapsDiceWidth,dice2);
		
		var result = dice1 + dice2;
		if ( result==7 || result==11 )
		{
			crapsState = 'win';
			updateCrapsStatus();
		}
		else if ( result==2 || result==3 || result==12 )
		{
			crapsState = 'lose';
			updateCrapsStatus();
		}
		else
		{
			crapsPoint = result;
			crapsState = 'keep throwing';
			updateCrapsStatus();
		}
	}
	else if ( crapsState=='keep throwing' )
	{
		var dice1 = Math.floor(Math.random()*6)+1;
		drawDice(crapsCanvas,dice1XPos,dice1YPos,crapsDiceWidth,dice1);
		
		var dice2 = Math.floor(Math.random()*6)+1;
		drawDice(crapsCanvas,dice2XPos,dice2YPos,crapsDiceWidth,dice2);
		
		var result = dice1 + dice2;
		if ( result==7 )
		{
			crapsState = 'lose';
			updateCrapsStatus();
		}
		else if ( result==crapsPoint )
		{
			crapsState = 'win';
			updateCrapsStatus();
		}
		else
		{
			crapsPoint = result;
			crapsState = 'keep throwing';
			updateCrapsStatus();
		}
	}
}

function updateCrapsStatus()
{
	var crapsStatusDiv = document.getElementById('craps_status');
	switch ( crapsState )
	{
		case 'win':
			crapsStatusDiv.innerHTML = 'You Win <input type="button" value="Play Again" onclick="newCrapsGame()">';
			break;
		case 'lose':
			crapsStatusDiv.innerHTML = 'You Lose <input type="button" value="Play Again" onclick="newCrapsGame()">';
			break;
		case 'keep throwing':
			crapsStatusDiv.innerHTML = 'Throw again - your \'point\' is '+crapsPoint+' <input type="button" value="Throw" onclick="crapsThrow()">';
			break;
		case 'not started':
			crapsStatusDiv.innerHTML = '<input type="button" value="First Throw" onclick="crapsThrow()">';
			break;
	}
}

function clearDice()
{
	var crapsCanvas = document.getElementById('craps_canvas');
	var ctx = document.getElementById('craps_canvas').getContext('2d');
	ctx.clearRect(0,0,crapsCanvas.width,crapsCanvas.height);
}

// face should be a number 1-6
// xPos, yPos is the top left of the dice
function drawDice( canvas, xPos, yPos, width, face )
{
	var cornerRadius = width / 6;
	
	var dicePadding = width / 10;
	var dotRadius = (width - dicePadding) / 8;
	var centreX = xPos + (width / 2);
	var centreY = yPos + (width / 2);
	var leftDotX = xPos + dicePadding + dotRadius;
	var rightDotX = xPos + width - dicePadding - dotRadius;
	var topDotY = yPos + dicePadding + dotRadius;
	var bottomDotY = yPos + width - dicePadding - dotRadius;

	var ctx = document.getElementById('craps_canvas').getContext('2d');
	
	ctx.beginPath();
	ctx.moveTo(xPos+cornerRadius,yPos);
	ctx.arcTo(xPos+width,yPos, xPos+width,yPos+cornerRadius, cornerRadius);
	ctx.lineTo(xPos+width,yPos+cornerRadius+1);
	ctx.arcTo(xPos+width,yPos+width, xPos+width-cornerRadius,yPos+width, cornerRadius);
	ctx.lineTo(xPos+width-cornerRadius-1,yPos+width);
	ctx.arcTo(xPos,yPos+width, xPos,yPos+width-cornerRadius, cornerRadius);
	ctx.lineTo(xPos,yPos+width-cornerRadius-1);
	ctx.arcTo(xPos,yPos, xPos+cornerRadius,yPos, cornerRadius);
	ctx.closePath();
	ctx.strokeStyle = "rgb(0,0,0)";
	ctx.stroke();
	
	ctx.fillStyle = "rgb(73,73,73)";
	if ( face==1 || face==5 || face==3 )
	{
		ctx.beginPath();
		ctx.arc(centreX,centreY,dotRadius,0,2*Math.PI,false);
		ctx.closePath();
		ctx.fill();
	}
	
	if ( face!=1 )
	{
		ctx.beginPath();
		ctx.arc(leftDotX,topDotY,dotRadius,0,2*Math.PI,false);
		ctx.closePath();
		ctx.fill();
		
		ctx.beginPath();
		ctx.arc(rightDotX,bottomDotY,dotRadius,0,2*Math.PI,false);
		ctx.closePath();
		ctx.fill();
	}
	
	if ( face==6 )
	{
		ctx.beginPath();
		ctx.arc(leftDotX,centreY,dotRadius,0,2*Math.PI,false);
		ctx.closePath();
		ctx.fill();
		
		ctx.beginPath();
		ctx.arc(rightDotX,centreY,dotRadius,0,2*Math.PI,false);
		ctx.closePath();
		ctx.fill();
	}
	
	if ( face==4 || face==5 || face==6 )
	{
		ctx.beginPath();
		ctx.arc(leftDotX,bottomDotY,dotRadius,0,2*Math.PI,false);
		ctx.closePath();
		ctx.fill();
		
		ctx.beginPath();
		ctx.arc(rightDotX,topDotY,dotRadius,0,2*Math.PI,false);
		ctx.closePath();
		ctx.fill();
	}
}