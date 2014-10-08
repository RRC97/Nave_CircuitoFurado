
	var Difficulty = function(m)
	{
		this.background = new Image();
		this.background.src = "Images/difficulty.png";
		this.nameEvent = "mouseup";
		this.manager = m;
		this.mouse = new Button(0, 0, 0, 0);
		this.buttonDifficulty2 = new Button(645, 370, 200, 80, "./Images/buttons/button5_2.png", "./Images/buttons/button5_2over.png");
		this.buttonDifficulty1 = new Button(645, 285, 200, 80, "./Images/buttons/button5_1.png", "./Images/buttons/button5_1over.png");
		this.buttonDifficulty3 = new Button(645, 450, 200, 80, "./Images/buttons/button5_3.png", "./Images/buttons/button5_3over.png");
		this.alpha = 1;
		this.trasition = false;
		this.option = 1;
		this.stop = true;
		this.update = function()
		{
			if(!this.stop)
			{
				this.alpha = 0;
				
				if(this.buttonDifficulty1.onCollision(this.mouse))
				{
					this.option = 1;
					this.trasition = true;
					this.stop = true;
				}
				
				if(this.buttonDifficulty2.onCollision(this.mouse))
				{
					this.option = 2;
					this.trasition = true;
					this.stop = true;
				}
				
				if(this.buttonDifficulty3.onCollision(this.mouse))
				{
					this.option = 3;
					this.trasition = true;
					this.stop = true;
				}
			}
			else
			{
				if(this.trasition)
				{
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
					this.manager.level = this.option;
					this.manager.setCurrentScene("game");
				}
			}
		}
		this.draw = function(c)
		{
			c.drawImage(this.background, 0, 0, c.canvas.width, c.canvas.height);
			
			if(this.buttonDifficulty1.over)
			{
				c.save();
				c.beginPath();
				c.fillStyle = "#a4958b";
				c.fillRect(this.buttonDifficulty1.x - this.buttonDifficulty1.width/2,
						   this.buttonDifficulty1.y - this.buttonDifficulty1.height/2 + 10,
						   this.buttonDifficulty1.width, this.buttonDifficulty1.height - 10);
				c.fill();
				c.closePath();
				c.restore();
			}
			
			if(this.buttonDifficulty2.over)
			{
				c.save();
				c.beginPath();
				c.fillStyle = "#a4958b";
				c.fillRect(this.buttonDifficulty2.x - this.buttonDifficulty2.width/2,
						   this.buttonDifficulty2.y - this.buttonDifficulty2.height/2 + 10,
						   this.buttonDifficulty2.width, this.buttonDifficulty2.height - 10);
				c.fill();
				c.closePath();
				c.restore();
			}
			
			if(this.buttonDifficulty3.over)
			{
				c.save();
				c.beginPath();
				c.fillStyle = "#a4958b";
				c.fillRect(this.buttonDifficulty3.x - this.buttonDifficulty3.width/2,
						   this.buttonDifficulty3.y - this.buttonDifficulty3.height/2 + 10,
						   this.buttonDifficulty3.width, this.buttonDifficulty3.height - 10);
				c.fill();
				c.closePath();
				c.restore();
			}
			
			this.buttonDifficulty1.draw(c);
			this.buttonDifficulty2.draw(c);
			this.buttonDifficulty3.draw(c);
			
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
		
		this.actionMove = function(a)
		{
			var moviment = new Button(a.x, a.y, 0, 0);
			if(this.buttonDifficulty1.onCollision(moviment))
			{
				this.buttonDifficulty1.over = true;
			}
			else
			{
				this.buttonDifficulty1.over = false;
			}
			
			if(this.buttonDifficulty2.onCollision(moviment))
			{
				this.buttonDifficulty2.over = true;
			}
			else
			{
				this.buttonDifficulty2.over = false;
			}
			
			if(this.buttonDifficulty3.onCollision(moviment))
			{
				this.buttonDifficulty3.over = true;
			}
			else
			{
				this.buttonDifficulty3.over = false;
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
	}