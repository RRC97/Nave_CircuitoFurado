
	var Time = function(x, y , ticks)
	{
		this.x = x;
		this.y = y;
		this.font = "32px Arial";
		this.color = "black";
		this.time = ticks;
		this.text = "";
		this.image = new Image();
		this.image.src = "./Images/clock.png";
		this.update = function()
		{
			var min = Math.floor(this.time/1200);
			var sec = "0"+Math.floor(this.time/20 - min * 60);
			this.text = min + ":" + sec.slice(-2);
			this.time--;
		}
		this.draw = function(ctx)
		{
			ctx.save();
			ctx.beginPath();
			ctx.translate(this.x, this.y);
			ctx.font = this.font;
			ctx.fillStyle = this.color;
			ctx.drawImage(this.image,-45, -172, 181, 237);
			ctx.fillText(this.text, 0, 0);
			ctx.closePath();
			ctx.restore();
		}
		this.finalTime = function()
		{
			if(this.time > 0)
			{
				return false;
			}
			else
			{
				return true;
			}
		}
	}