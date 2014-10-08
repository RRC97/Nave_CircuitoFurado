
	var Preload = function(m)
	{
		this.elements = new Array();
		this.srcs = new Array(
			"./Images/buttonCredits.png",
			"./Images/buttonGame.png",
			"./Images/clovis.png",
			"./Images/clovisUse.png",
			"./Images/spider1.png",
			"./Images/spider2.png",
			"./Images/pipe1.png",
			"./Images/pipe2.png",
			"./Images/menu.png",
			"./Images/open.png",
			"./Images/trapeze.png",
			"./Images/logo.png",
			"./Images/credits.png",
			"./Images/game.png",
			"./Images/intro.png",
			"./Images/menuSpider.png",
			"./Images/creditsText.png",
			"./Images/clock.png",
			"./Images/rope.png",
			"./Images/difficulty.png",
			"./Images/interfaceLife.png",
			"./Images/life.png"
		);
			
		for(var i = 0; i < 20; i++)
		{
			this.srcs.push("./Images/" + i + ".png");
		}
		for(var i = 0; i < 6; i++)
		{
			for(var j = 0; j < 4; j++)
			{
				var nameImage = "./Images/buttons/button" + (i + 1) + "_" + (j + 1);
				this.srcs.push(nameImage + ".png");
				this.srcs.push(nameImage + "over.png");
			}
		}
		for(var i = 1; i < 41; i++)
		{
			var nameImage = "./Images/animationLose/lose (" + i + ").jpg";
			this.srcs.push(nameImage);
		}
		
		for(var i = 1; i < 38; i++)
		{
			var nameImage = "./Images/animationWin/win (" + i + ").jpg";
			this.srcs.push(nameImage);
		}
		
		for(var i = 1; i < 69; i++)
		{
			var nameImage = "./Images/animationIntro/intro (" + i + ").jpg";
			this.srcs.push(nameImage);
		}
		
		for(var i = 1; i < 113; i++)
		{
			var nameImage = "./Images/animationInstrutions/instrutions (" + i + ").jpg";
			this.srcs.push(nameImage);
		}
		this.manager = m;
		
		this.imagesLoaded = 1;
		this.sizeLoad;
		this.width = 0;
		this.logo = new ImageElement("./Images/logoPreload.jpg", 640, 360, 593, 93);
		
		for(var i = 0; i < this.srcs.length; i++)
		{
			this.elements[i] = new Image();
			this.elements[i].src = this.srcs[i];
		}
		
		this.draw = function(c)
		{
			
			this.logo.draw(c);
			
			c.save();
			c.fillStyle = "#032a40";
			c.fillRect(100, 570, 1080, 50);
			c.restore();
			
			c.save();
			c.fillStyle = "#105170";
			c.fillRect(110, 580, this.width, 30);
			c.restore();
		}
		
		this.update = function()
		{
			this.imagesLoaded = 0;
			for(var i = 0; i < this.elements.length; i++)
			{
				if(this.elements[i].complete)
				{
					this.imagesLoaded++;
				}
			}
			this.width = (1060 * this.imagesLoaded) / this.srcs.length;
			
			if(this.srcs.length == this.imagesLoaded && this.width >= 1060)
			{
				this.manager.soundBackground.play();
				this.manager.setCurrentScene("open");
			}
		}
	}