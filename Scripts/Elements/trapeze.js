var Trapeze = function(x, y)
{
	this.x = x;
	this.y = y;
	this.base = document.createElement("img");
	this.base.src = "./Images/trapeze.png";
	this.rope = document.createElement("img");
	this.rope.src = "./Images/rope.png";
	this.width = 25;
	this.height = 500;
	
	this.collisionX;
	this.collisionY;
	this.collisionWidth = 160;
	this.collisionHeight = 20;
	
	this.update = function()
	{
		this.collisionX = this.x;
		this.collisionY = this.y + 495;
	}
	
	this.draw = function(ctx)
	{
		ctx.save();
		ctx.beginPath();
		ctx.translate(this.x - 50, this.y - 5);
		ctx.drawImage(this.rope, -this.width/2, 0, this.width, this.height);
		ctx.closePath();
		ctx.restore();
		
		ctx.save();
		ctx.beginPath();
		ctx.translate(this.x + 50, this.y - 5);
		ctx.drawImage(this.rope, -this.width/2, 0, this.width, this.height);
		ctx.closePath();
		ctx.restore();
		
		ctx.save();
		ctx.beginPath();
		ctx.translate(this.collisionX, this.collisionY - 25);
		ctx.drawImage(this.base, -this.collisionWidth/2, this.collisionHeight/2, this.collisionWidth, this.collisionHeight);
		ctx.closePath();
		ctx.restore();
	}
	
	this.onCollision = function(collider)
	{
		if(this.collisionX - this.collisionWidth/2 < collider.x + collider.width/2
		&& this.collisionX + this.collisionWidth/2 > collider.x - collider.width/2
		&& this.collisionY - this.collisionHeight/2 < collider.y + collider.height/2
		&& this.collisionY + this.collisionHeight/2 > collider.y - collider.height/2)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
}