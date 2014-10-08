function ImageElement(src, x, y, w, h)
{
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	
	this.image = new Image();
	this.image.src = src;
	
	this.draw = function(ctx)
	{
		ctx.beginPath();
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.drawImage(this.image, -this.width/2, -this.height/2, this.width, this.height);
		ctx.restore();
		ctx.closePath();
	}
}
