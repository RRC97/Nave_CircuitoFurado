function Spider(x,y)
{
	this.x = x;
	this.y = y;
	this.width = 90;
	this.height = 117;
	this.lol = 2;
	this.jump = false;
	this.cooldown = 0;
	this.angle = -135;
	
	this.collider = {x: this.x, y: this.y, width: 90/2,height: 117/2};
	
	this.image = new Image();
	this.image.src = "./Images/spider1.png";
	
	this.draw = function(ctx)
	{
		ctx.save();
		ctx.beginPath();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.angle * (Math.PI/180));
		ctx.drawImage(this.image, -this.width/2, -this.height/2, this.width, this.height);
		ctx.closePath();
		ctx.restore();
	}

	this.update = function ()
	{
		if(this.lol == 1)
		{
			this.y = this.y - 10;
			this.angle = -135;
		}
		if(this.lol == 2)
		{
			this.y = this.y + 10;
			this.angle = -45;
		}
		if(this.cooldown > 0)
		{
			this.cooldown = this.cooldown -1;
		}
		else
		{
			this.lol = Math.floor(Math.random()*2) + 1;
			this.cooldown = 15;
		}
		if(this.y < 10){ this.lol = 2; this.cooldown = 35;}
		if(this.y > 700){ this.lol = 1; this.cooldown = 35;}
		
		this.collider.x = this.x;
		this.collider.y = this.y;
	}
}