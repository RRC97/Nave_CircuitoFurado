
	var Lose = function(m)
	{
		this.manager = m;
		this.nameEvent = "mouseup";
		this.mouse = new Button(0, 0, 0, 0);
		var typeButton = 1 + Math.floor(Math.random() * 4);
		this.buttonMenu = new Button(1170, 530, 120, 120,
		"./Images/buttons/button1_" + typeButton + ".png",
		"./Images/buttons/button1_" + typeButton + "over.png");
		this.buttonGame = new Button(1170, 650, 120, 120,
		"./Images/buttons/button3_" + typeButton + ".png",
		"./Images/buttons/button3_" + typeButton + "over.png");
		this.stop = true;
		this.alpha = 1;
		this.trasition = false;
		this.animation = new Array();
		this.time = 0;
		
		for(var i = 1; i < 41; i++)
		{
			var nameImage = "./Images/animationLose/lose (" + i + ").jpg";
			this.animation[i - 1] = new Image();
			this.animation[i - 1].src = nameImage;
		}
		
		this.draw = function(c)
		{
			c.drawImage(this.animation[this.time], 0, 0, c.canvas.width, c.canvas.height);
			
			this.buttonMenu.draw(c);
			this.buttonGame.draw(c);
			
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
			if(this.buttonMenu.onCollision(moviment))
			{
				this.buttonMenu.over = true;
			}
			else
			{
				this.buttonMenu.over = false;
			}
			
			if(this.buttonGame.onCollision(moviment))
			{
				this.buttonGame.over = true;
			}
			else
			{
				this.buttonGame.over = false;
			}
		}
		
		this.update = function()
		{
			if(!this.stop)
			{
				this.alpha = 0;
				
				if(this.time < 39) this.time++;
				else this.time = 0;
					
				if(this.buttonGame.onCollision(this.mouse))
				{
					this.option = "difficulty";
					this.trasition = true;
					this.stop = true;
				}
				
				if(this.buttonMenu.onCollision(this.mouse))
				{
					this.option = "menu";
					this.trasition = true;
					this.stop = true;
				}
			}
			else
			{
				if(this.trasition)
				{
					if(this.option == "difficulty")
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
					this.manager.setCurrentScene(this.option);
				}
			}
		}
	}