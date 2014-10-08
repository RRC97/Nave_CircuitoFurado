
	var Menu = function(m)
	{
		this.background = new Image();
		this.background.src = "Images/menu.png";
		this.nameEvent = "mouseup";
		this.manager = m;
		this.mouse = new Button(0, 0, 0, 0);
		this.buttonCredits = new Button(735, 565, 530, 65, "", "./Images/buttonCredits.png");
		this.buttonGame = new Button(745, 480, 440, 60, "", "./Images/buttonGame.png");
		this.menuSpider = new ImageElement("./Images/menuSpider.png",210, 545, 223, 310);
		this.moveSpiderDown = false;
		this.alpha = 1;
		this.trasition = false;
		this.option = "";
		this.stop = true;
		this.update = function()
		{
			if(!this.stop)
			{
				this.alpha = 0;
				
				this.menuSpider.y += this.moveSpiderDown ? 10 : -10;
				
				if(this.menuSpider.y <= 440) this.moveSpiderDown = true;
				else if(this.menuSpider.y >= 540) this.moveSpiderDown = false;
				if(this.buttonGame.onCollision(this.mouse))
				{
					this.option = "intro";
					this.trasition = true;
					this.stop = true;
					this.manager.activeSound = false;
				}
				
				if(this.buttonCredits.onCollision(this.mouse))
				{
					this.option = "credits";
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
					this.manager.setCurrentScene(this.option);
				}
			}
		}
		this.draw = function(c)
		{
			c.drawImage(this.background, 0, 0, c.canvas.width, c.canvas.height);
			
			if(this.buttonGame.over)
			{
				c.save();
				c.beginPath();
				c.fillStyle = "#ab9789";
				c.fillRect(this.buttonGame.x - this.buttonGame.width/2, this.buttonGame.y - this.buttonGame.height/2 - 5, this.buttonGame.width, this.buttonGame.height + 10);
				c.closePath();
				c.restore();
			}
			
			if(this.buttonCredits.over)
			{
				c.save();
				c.beginPath();
				c.fillStyle = "#ab9789";
				c.fillRect(this.buttonCredits.x - this.buttonCredits.width/2, this.buttonCredits.y - this.buttonCredits.height/2 - 5, this.buttonCredits.width, this.buttonCredits.height + 10);
				c.closePath();
				c.restore();
			}
			
			this.buttonGame.draw(c);
			this.buttonCredits.draw(c);
			this.menuSpider.draw(c);
			
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
			if(this.buttonCredits.onCollision(moviment))
			{
				this.buttonCredits.over = true;
			}
			else
			{
				this.buttonCredits.over = false;
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
		
		this.actionEvent = function(a)
		{
			if(!this.stop)
			{
				this.mouse.x = a.clientX;
				this.mouse.y = a.clientY;
			}
		}
	}