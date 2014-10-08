
	var Player = function(x, y)
	{
		this.defaultX = x;
		this.defaultY = y;
		this.x = x;
		this.y = y;
		this.image = new Image();
		this.image.src = "./Images/0.png";
		this.srcref = "./Images/"
		this.srcref2 = ".png";
		this.anim = 0;
		this.width = 80;
		this.height = 120;
		this.angle = 0;
		this.rotation = true;
		this.moveLeft = false;
		this.moveRight = false;
		this.moveUp = false;
		this.moveDown = false;
		this.speed = 5;
		this.gravity = true;
		this.velocity = 0;
		this.jump = false;
		this.jumping = 0;
		this.canJump = false;
		this.limitActive = false;
		this.hit = false;
		this.time = 0;
		this.alpha = 1;
		
		this.update = function()
		{
			if(this.velocity > 0 && !this.moveRight) this.velocity -= this.speed/10;
			else if (this.velocity < 0 && !this.moveLeft) this.velocity += this.speed/10;
			
			if(this.x >= 640)
			{
				this.limitActive = true;
			}
			else
			{
				this.limitActive = false;
			}
			if(this.moveRight)
			{
				if(this.velocity < this.speed)this.velocity += this.speed/10;
				this.anim ++;
				if(this.anim > 9){this.anim = 1;}
			}
			if(this.moveLeft)
			{
				if(this.velocity > -this.speed)this.velocity -= this.speed/10;
				this.anim ++;
				if(this.anim > 9){this.anim = 1;}
				
			}
			if(!this.moveLeft && !this.moveRight)
			{
				this.anim = 0;
				this.image.src = this.srcref+this.anim+this.srcref2;
			}
			
			if(!this.limitActive)
			{
				this.x += this.velocity;
			}
			else if(!this.moveRight)
			{
				this.x += this.velocity;
			}
			
			if(!this.jump)
			{
				if(this.gravity)
				{
					this.y += 9.8;
					if(this.anim < 15){this.anim = 15;}
					else{this.anim++;}
					if(this.anim > 19){this.anim  = 15;}
					
				}
				
			}
			else
			{
				this.canJump = false;
				if(this.jumping >= 10)
				{
					this.jumping = 0;
					this.jump = false;
				}
				else
				{
					this.jumping += 0.5;
					this.y -= -0.5 * (this.jumping * this.jumping) + 5 * this.jumping;
					if(this.anim < 10){this.anim = 10;}
					else{this.anim++;}
					if(this.anim > 14){this.anim  = 10;}
				}
			}
			
			if(this.hit)
			{
				if(this.time < 30)
				{
					if(this.alpha == 0)this.alpha = 1;
					else if(this.alpha == 1)this.alpha = 0;
					this.time++;
				}
				else
				{
					this.time = 0;
					this.hit = false;
				}
			}
			this.image.src = this.srcref+this.anim+this.srcref2;
		}
		
		this.draw = function(ctx)
		{
			ctx.save();
			ctx.beginPath();
			ctx.globalAlpha = this.alpha;
			ctx.translate(this.x, this.y);
			ctx.rotate(this.angle * Math.PI/180);
			if(this.moveLeft){ctx.scale(-1,1);}
			else{ctx.scale(1,1);}
			ctx.drawImage(this.image, -this.width/2, -this.height/2, this.width, this.height);
			ctx.closePath();
			ctx.restore();
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