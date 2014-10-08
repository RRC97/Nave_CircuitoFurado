function Pipe(x, id)
{
	this.x = x;
	this.y = 0;
	this.width = 60;
	this.height = 100;
	
	this.image = document.createElement("img");
	
	if(id == 1)
	{
		this.image.src = "./Images/pipe2.png";
		this.collider1 = {x: 0, y: -60, width: 30,height: 90};
		this.collider2 = {x: -30, y: 10, width: 60,height: 35};
	}
	else
	{
		this.image.src = "./Images/pipe1.png";
		this.collider1 = {x: -30, y: -50, width: 35,height: 100};
		this.collider2 = {x: -30, y: -15, width: 60,height: 30};
	}
	
	this.draw = function(ctx)
	{
		ctx.beginPath();
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.drawImage(this.image, -this.width/2, -this.height/2, this.width, this.height);
		ctx.restore();
		ctx.closePath();
	}

	this.update = function ()
	{
		this.y += 10;
	
		if(this.y > 1280)
		{
			this.x =  Math.floor(Math.random()*1248) +1;
			this.y = 0
		}
	}
	
	this.onCollision = function(collider)
	{
		if(this.x + this.collider1.x < collider.x + collider.width/2
		&& this.x + this.collider1.x + this.collider1.width > collider.x - collider.width/2
		&& this.y + this.collider1.y < collider.y + collider.height/2
		&& this.y + this.collider1.y + this.collider1.height > collider.y - collider.height/2)
		{
			return true;
		}
		else if(this.x + this.collider2.x < collider.x + collider.width/2
		&& this.x + this.collider2.x + this.collider2.width > collider.x - collider.width/2
		&& this.y + this.collider2.y < collider.y + collider.height/2
		&& this.y + this.collider2.y + this.collider2.height > collider.y - collider.height/2)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
}
