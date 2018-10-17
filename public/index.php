<?php

function mobile_device()
{
	$device = '';
 
	if( stristr($_SERVER['HTTP_USER_AGENT'],'ipad') )
	{
		$device = "ipad";
	}
	else if( stristr($_SERVER['HTTP_USER_AGENT'],'iphone') || strstr($_SERVER['HTTP_USER_AGENT'],'iphone') )
	{
		$device = "iphone";
	}
	else if( stristr($_SERVER['HTTP_USER_AGENT'],'blackberry') )
	{
		$device = "blackberry";
	}
	else if( stristr($_SERVER['HTTP_USER_AGENT'],'android') )
	{
		$device = "android";
	}
	if ( $device )
	{
		return $device; 
	}
	return false;
}

$mobileDevice = mobile_device();

?><!DOCTYPE HTML><html>
	<head>
		<title>Iain's Exciting Website</title>
		<link rel="shortcut icon" href="favicon.png" />
		<link rel="apple-touch-icon" href="apple-touch-icon.png"/>
		<?php
		if ( $mobileDevice )
		{
			?>
			<meta name="viewport" content="width=device-width" />  
			<?php
		}
		?>
		<style>
			
			body
			{
				font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
				background: #333 url(bg.png);
			}
			
			#container
			{
				margin: auto;
				margin-top: 30px;
				width: 550px;
			}
			
			#header
			{
				text-align:center;
				color:white;
				overflow:auto;
				margin-top:2em;
			}
			
			h1
			{
				margin:0px;
				font-size: 50px;
				text-align:center;
				text-shadow: 1px 3px 5px rgba(0, 0, 0, 0.5);
			}
			
			h2
			{
				color: #494949;
				margin-bottom: 5px;
				font-size:16px;
			}
			
			.canvas_container
			{
				text-align:center;
				margin:1em;
			}
			
			div.article
			{
				font-size: 13px;
				padding: 10px;
				padding-top: 1px;
				color:#6E7173;
				background-color: white;
				-moz-border-radius: 15px;
				border-radius: 15px;
				margin-top:2em;
			}
			
			.instructions
			{
				text-align: center;
				font-style: italic;
			}
			
		</style>

		<script type="text/javascript">
			
			function init()
			{
				initSmiley();
				initCraps();
				<?php $maxFps = $mobileDevice ? 10 : 60; ?>
				initBouncyBall(<?php echo $maxFps ?>);
				alfy = new Alfy();
			}
			
		</script>
	</head>
	<body onload="init()">
	
		<div id="container">
		
			<div id="header">
				<img src="avatar.png" style="float:right">
				<h1>Iain's<br>Site</h1>
			</div>

			<div class="article">
				<h2>Dice Roller</h2>
				<p>This is a javascript 'widget' that rolls a number of dice for you. Less visually impressive than the Craps game below, but much more over-engineered.<p>
				<p>The javascript and the CSS behind it are hosted in an Amazon S3 bucket. When you roll die, the results are calculated by an Amazon API Gateway / Lambda API.</p>
				<p>I did this to see if it was possible to hand data into a widget hosted externally using "data-" attributes, and have those values used when contacting an external API.<p>
				<p>The script is non-blocking (it loads at the bottom of the page), and it loads all the jQuery and stylesheets it needs all by itself.</p>
				<p>Known issue: if the page already has a document.ready function, this may not work.</p>

                <div class="dice-roller" data-dice-sides="6" data-dice-quantity="7"></div>
                <div class="dice-roller" data-dice-sides="12" data-dice-quantity="4"></div>

			</div>

			<div class="article">
				<h2>Alfy The Wizard</h2>
				This is the current version of 'Alfy The Wizard'. It's written in HTML5/plain old javascript. It was fun, so some day I might try to re-make this in Unity2D.<br><br>
				<div class="instructions">Gaze upon the fantasy world before you. Left click anywhere on the map, and Alfy will go there if he can.</div>

                <div style="text-align:center;margin-top:10px;">
                    <canvas id="alfy" width="480" height="480"></canvas>
                </div>

			</div>
			
			<div class="article" id="bouncy_ball">
				<h2>Kick The Angry Bird</h2>
				A simulation of kicking an Angry Bird. Includes gravity and momentum effects.<br><br>
				<div class="instructions">Click 'Kick' to begin. Every time you click 'Kick' you give the bird a bit more of a kick. If the bird isn't moving when you click 'Kick', it will be kicked off in a random direction.</div>
				<div class="canvas_container">
					<canvas id="bouncy_ball_canvas" width="500" height="200">
						Your browser does not support canvas.
					</canvas>
					<input type="button" onclick="bbKick()" value="Kick">
				</div>
			</div>
			
			<div class="article" id="craps">
				<h2>Craps</h2>
				My first HTML5 game: Craps! It's called 'craps' because the rules are so complicated it's crap:<br><br>
				The player rolls two dice. He or she wins if the sum of the two dice is a 7 or an 11, and loses if it's a 2, 3 or 12. For any other result, the player rolls again.<br><br>
				On this second throw, the player wins if the result is the same as the result from the previous throw (called the 'point'), and loses if the result is 7. For any other result, the player rolls again.<br><br>
				On the third and subsequent throws the rules are the same as for the second throw. Continue until the player loses, wins, or gets tired of rolling dice.<br><br>
				<div class="instructions">Click 'First Throw' to begin, then keep clicking 'Throw' until you win or lose.<br>'Play Again' starts the game again.</div>
				<div class="canvas_container">
					<canvas id="craps_canvas" width="500" height="100">
					</canvas>
					<div id="craps_status"></div>
				</div>
			</div>
		
			<div class="article" id="smiley">
				<h2>Smiley Face</h2>
				My first HTML5 acheivement: a smiley face!<br>
				<div class="canvas_container">
					<canvas id="smiley_canvas" width="200" height="200">
						Your browser does not support canvas.
					</canvas>
				</div>
			</div>
			
		</div>

		<script type="text/javascript" src="craps.js"></script>
		<script type="text/javascript" src="smiley.js"></script>
		<script type="text/javascript" src="bouncy_ball.js"></script>
		<script type="text/javascript" src="alfy.js"></script>
        <script src="http://images.iaibai.co.uk/dice-roller/dice.js"></script>
	
	</body>
</html>