
	var Credits = function(m)
	{
		this.background = new Image();
		this.background.src = "Images/credits.png";
		this.text = new ImageElement("./Images/creditsText.png", 640, 1000, 444, 444);
		this.manager = m;
		this.nameEvent = "mouseup";
		this.mouse = new Button(0, 0, 0, 0);
		var typeButton = 1 + Math.floor(Math.random() * 4);
		this.buttonReturn = new Button(1135, 620, 120, 120,
		"./Images/buttons/button2_" + typeButton + ".png",
		"./Images/buttons/button2_" + typeButton + "over.png");
		this.stop = true;
		this.alpha = 1;
		this.trasition = false;
		
		this.draw = function(c)
		{
			c.drawImage(this.background, 0, this.text.y - 490, c.canvas.width, c.canvas.height);
			
			this.text.draw(c);
			this.buttonReturn.draw(c);
			
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
			if(this.buttonReturn.onCollision(moviment))
			{
				this.buttonReturn.over = true;
			}
			else
			{
				this.buttonReturn.over = false;
			}
		}
		
		this.update = function()
		{
			if(!this.stop)
			{
				if(this.text.y > 490) this.text.y -= 5;
				this.alpha = 0;
				if(this.buttonReturn.onCollision(this.mouse))
				{
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
					this.alpha -= 0.1;
				}
				
				if(!this.trasition && this.alpha <= 0)
				{
					this.stop = false;
				}
				
				if(this.trasition && this.alpha >= 1)
				{
					this.manager.setCurrentScene("menu");
				}
			}
		}
	}