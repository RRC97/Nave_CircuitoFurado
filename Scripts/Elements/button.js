
	var Button = function(x, y, width, height, srcDefault, srcOver)
	{
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		if(srcDefault != null)
		{
			this.imageDefault = new Image();
			this.imageDefault.src = srcDefault;
			this.imageOver = new Image();
			this.imageOver.src = srcOver;
		}
		this.over = false;
		this.draw = function(ctx)
		{
			if(this.over)
			{
				ctx.save();
				ctx.beginPath();
				ctx.translate(this.x, this.y);
				ctx.drawImage(this.imageOver, -this.width/2, -this.height/2, this.width, this.height);
				ctx.closePath();
				ctx.restore();
			}
			else
			{
				ctx.save();
				ctx.beginPath();
				ctx.translate(this.x, this.y);
				ctx.drawImage(this.imageDefault, -this.width/2, -this.height/2, this.width, this.height);
				ctx.closePath();
				ctx.restore();
			}
		}
		
		this.onCollision = function(collider)
		{
			if(this.x - this.width/2 < collider.x + collider.width/2
			&& this.x + this.width/2 > collider.x - collider.width/2
			&& this.y - this.height/2 < collider.y + collider.height/2
			&& this.y + this.height/2 > collider.y - collider.height/2)
			{
				return true;
			}
			else
			{
				return false;
			}
		}
	}