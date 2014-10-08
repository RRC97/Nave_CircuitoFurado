
	var Clovis = function(x, y)
	{
		this.result = false;
		this.active = false;
		this.canActive = true;
		this.time = 0;
		this.alpha = 1;
		this.width = 180;
		this.height = 150;
		this.x = x;
		this.y = y;
		this.timeTick = 0;
		this.timeActive = 499;
		this.image = new Image();
		this.image.src = "./Images/clovis.png";
		
		this.update = function()
		{
			if(this.active)
			{
				if(this.time < 100)
				{
					this.result = true;
					this.time++;
					if(this.timeTick < 5)
					{
						this.timeTick++;
					}
					else
					{
						if(this.alpha == 1)
						{
							this.alpha = 0;
						}
						else
						{
							this.alpha = 1;
						}
						this.timeTick = 0;
					}
				}
				else
				{
					this.result = false;
					this.canActive = false;
					this.active = false;
					this.time = 0;
					this.timeActive = 0;
					this.timeTick = 0;
				}
			}
			else
			{
				this.alpha = this.timeActive/250;
			}
			
			if(this.timeActive > 499)
			{
				this.canActive = true;
				this.image.src = "./Images/clovisUse.png";
			}
			else
			{
				this.timeActive++;
				this.image.src = "./Images/clovis.png";
			}
		}
		this.draw = function(ctx)
		{
			ctx.beginPath();
			ctx.save();
			ctx.globalAlpha = this.alpha;
			ctx.translate(this.x, this.y);
			ctx.drawImage(this.image, -this.width/2, -this.height/2, this.width, this.height);
			ctx.restore();
			ctx.closePath();
		}
	}