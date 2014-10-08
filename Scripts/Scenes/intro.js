
	var Intro = function(m)
	{
		this.screens = new Array();
		this.screens[0] = new Image();
		this.screens[0].src = "./Images/intro.png";
		this.screens[1] = new Array();
		this.screens[2] = new Array();
		
		for(var i = 1; i < 69; i++)
		{
			this.screens[1][i - 1] = new Image();
			this.screens[1][i - 1].src = "./Images/animationIntro/intro (" + i + ").jpg";
		}
		
		for(var i = 1; i < 113; i++)
		{
			this.screens[2][i - 1] = new Image();
			this.screens[2][i - 1].src = "./Images/animationInstrutions/instrutions (" + i + ").jpg";
		}
		
		this.idScreen = 0;
		this.manager = m;
		this.nameEvent = "mouseup";
		this.mouse = new Button(0, 0, 0, 0);
		var typeButton = 1 + Math.floor(Math.random() * 4);
		this.buttonSkip = new Button(1135, 620, 120, 120,
		"./Images/buttons/button6_" + typeButton + ".png",
		"./Images/buttons/button6_" + typeButton + "over.png");
		this.stop = true;
		this.alpha = 1;
		this.trasition = false;
		this.time = 0;
		
		this.draw = function(c)
		{
			switch(this.idScreen)
			{
				case 0:
					c.drawImage(this.screens[0], 0, 0, c.canvas.width, c.canvas.height);
					break;
				case 1:
					c.drawImage(this.screens[1][this.time], 0, 0, c.canvas.width, c.canvas.height);
					break;
				case 2:
					c.drawImage(this.screens[2][this.time], 0, 0, c.canvas.width, c.canvas.height);
					break;
			}
			
			this.buttonSkip.draw(c);
			
			if(this.stop)
			{
				c.save();
				c.beginPath();
				c.globalAlpha = this.alpha;
				c.fillStyle = "white";
				c.fillRect(0, 0, c.canvas.width, c.canvas.height);
				c.closePath();
				c.restore();
			}
		}
		
		this.actionEvent = function(a)
		{
			if(!this.stop)
			{
				this.mouse.x = a.offsetX;
				this.mouse.y = a.offsetY;
			}
		}
		
		this.actionMove = function(a)
		{
			var moviment = new Button(a.x, a.y, 0, 0);
			if(this.buttonSkip.onCollision(moviment))
			{
				this.buttonSkip.over = true;
			}
			else
			{
				this.buttonSkip.over = false;
			}
		}
		
		this.update = function()
		{
			if(!this.stop)
			{
				switch(this.idScreen)
				{
					case 0:
						this.background = this.screens[0];
						break;
						
					case 1:
						if(this.time < 67) this.time++;
						else
						{
							this.trasition = true;
							this.stop = true;
						}
						break;
						
					case 2:
						if(this.time < 111) this.time++;
						else this.time = 0;
						break;
				}
				
				this.alpha = 0;
				if(this.buttonSkip.onCollision(this.mouse))
				{
					this.trasition = true;
					this.stop = true;
				}
			}
			else
			{
				if(this.trasition)
				{
					if(this.idScreen == 1)
					{
						this.manager.activeSound = false;
					}
					this.alpha += 0.1;
				}
				else
				{
					this.alpha -= 0.1;
				}
				
				if(!this.trasition && this.alpha <= 0)
				{
					this.stop = false;
				}
				
				if(this.trasition && this.alpha >= 1)
				{
					if(this.idScreen != 2)
					{
						this.alpha = 1;
						this.trasition = false;
						this.idScreen++;
						this.background = this.screens[this.idScreen];
						this.mouse.x = 0;
						this.mouse.y = 0;
						this.time = 0;
					}
					else
					{
						this.manager.setCurrentScene("difficulty");
					}
				}
			}
		}
	}