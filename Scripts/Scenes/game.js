
	var Game = function(m)
	{
		this.player = new Player(200, 300);
		
		this.pipes = new Array();
		
		
		
		this.createTimePipe = 0;
		this.mouse = new Button(0, 0, 0, 0);
		
		this.clovis = new Clovis(120, 100);
		
		this.manager = m;
		
		this.level = this.manager.level;
		
		this.life = 3;
		
		switch (this.level)
		{
		case 1:
		this.time = new Time(1160, 150, 2409);
		break;
		case 2:
		this.time = new Time(1160, 150, 1809);
		break;
		case 3:
		this.time = new Time(1160, 150, 1209);
		}
		
		this.interfaceLife = new ImageElement("./Images/interfaceLife.png", 640, 100, 160, 37);
		
		this.background = new Image();
		this.background.src = "Images/game.png";
		this.backgroundPause = new ImageElement("./Images/pause.png", 640, 360, 1280, 720);
		
		this.nameEvent = "mouseup";
		
		this.spider = new Spider(1000, 300);
		
		this.pause = false;
		this.soundPlay = 0;
		
		this.comingNear = false;
		
		this.trapezes = new Array();
		this.lifes = new Array();
		
		this.stepPlayer = false;
		
		this.buttonPlay = new Button(480, 360, 120, 120,
		"./Images/buttons/button4_2.png",
		"./Images/buttons/button4_2over.png");
		this.buttonReplay = new Button(640, 360, 120, 120,
		"./Images/buttons/button4_3.png",
		"./Images/buttons/button4_3over.png");
		this.buttonPause = new Button(1170, 640, 120, 120,
		"./Images/buttons/button4_1.png",
		"./Images/buttons/button4_1over.png");
		this.buttonMenu = new Button(800, 360, 120, 120,
		"./Images/buttons/button5_4.png",
		"./Images/buttons/button5_4over.png");
		
		for(var i = 0; i < 6; i++)
		{
			this.trapezes.push(new Trapeze(200 + i * 400, -20));
		}
		
		for(var i = 0; i < this.life; i++)
		{
			this.lifes.push(new ImageElement("./Images/life.png", 640 + (this.life * 60)/this.life - 60 * i, 50, 60, 60));
		}
		
		this.update = function()
		{
			if(!this.pause)
			{
				this.player.gravity = true;
				if(!this.player.moveRight)
				{
					this.player.x -= 4;
				}
				for(var i = 0; i < this.trapezes.length; i++)
				{
					if(this.trapezes[i].onCollision(this.player) && this.stepPlayer)
					{
						this.player.gravity = false;
						this.player.canJump = true;
						break;
					}
					else
					{
						this.player.canJump = false;
					}
				}
				
				if(!this.stepPlayer && this.soundPlay >= 2) this.manager.soundFalling.play();
				
				for(var i = 0; i < this.trapezes.length; i++)
				{
					if(this.player.y + this.player.height/2 < this.trapezes[i].collisionY)
					{
						this.stepPlayer = true;
						break;
					}
					else
					{
						this.stepPlayer = false;
					}
				}
				
				this.soundPlay++;
				
				if(this.clovis.result)
				{
					this.player.speed = 10;
				}
				else
				{
					this.player.speed = 5;
				}
				
				if(this.pipes.length < 5*this.level)
				{
					if(this.createTimePipe > 100/this.level)
					{
						var pipe = new Pipe(Math.floor(Math.random() * 1280), this.pipes.length%2);
						this.pipes.push(pipe);
						this.createTimePipe = 0;
					}
					else this.createTimePipe++;
				}
				
				for(var i = 0; i < this.pipes.length; i++)
				{
					this.pipes[i].update();
					this.pipes[i].x -= 4;
					if(this.player.limitActive && this.player.moveRight)
					{
						this.pipes[i].x -= this.player.velocity;
					}
				}
				
				for(var i = 0; i < this.trapezes.length; i++)
				{
					if(this.trapezes[i].x < -200)
					{
						this.trapezes[i].x = this.trapezes[this.trapezes.length - 1].x + 400;
						this.trapezes.push(this.trapezes[i]);
						this.trapezes.splice(i, 1);
					}
					this.trapezes[i].x -= 4;
					if(this.player.limitActive && this.player.moveRight)
					{
						this.trapezes[i].x -= this.player.velocity;
					}
				}
				
				if(this.player.limitActive && this.player.moveRight)
				{
					this.spider.x -= this.player.velocity/5;
				}
				else
				{
					this.spider.x += 0.5*this.level;
				}
				
				if(this.spider.x - this.spider.width/2 < this.player.x + this.player.width/2) this.comingNear = true;
				else if(this.spider.x - this.spider.width/2 < this.player.x + this.player.width/2 + 100) this.comingNear = !this.comingNear;
				else this.comingNear = false;
				
				
				
				if(this.comingNear) this.spider.image.src = "./Images/spider2.png";
				else this.spider.image.src = "./Images/spider1.png";
				
				if(this.spider.x > 1350 || this.player.y >= 900 || this.player.x <= -80 || this.time.finalTime() || this.life == 0)
				{
					this.manager.activeSound = true;
					this.manager.setCurrentScene("lose");
					return;
				}
				
				for(var i = 0; i < this.pipes.length; i++)
				{
					if(this.pipes[i].onCollision(this.player))
					{
						if(!this.player.hit)
						{
							this.manager.soundPape.play();
							this.life -= 1;
							this.player.hit = true;
							break;
						}
					}
				}
				if(this.player.onCollision(this.spider.collider))
				{
					this.manager.activeSound = true;
					this.manager.setCurrentScene("win");
					return;
				}
				
				if(this.buttonPause.onCollision(this.mouse))
				{
					this.pause = true;
				}
				
				this.player.update();
				this.spider.update();
				this.time.update();
				this.clovis.update();
				
				for(var i = 0; i < this.trapezes.length; i++)
				{
					this.trapezes[i].update();
				}
			}
			else
			{
				if(this.buttonPlay.onCollision(this.mouse))
				{
					this.pause = false;
				}
				if(this.buttonReplay.onCollision(this.mouse))
				{
					this.manager.setCurrentScene("game");
				}
				if(this.buttonMenu.onCollision(this.mouse))
				{
					this.manager.setCurrentScene("menu");
				}
			}
		}
		
		this.actionMove = function(a)
		{
			var moviment = new Button(a.x, a.y, 0, 0);
			if(this.buttonPause.onCollision(moviment))
			{
				this.buttonPause.over = true;
			}
			else
			{
				this.buttonPause.over = false;
			}
			if(this.buttonPlay.onCollision(moviment))
			{
				this.buttonPlay.over = true;
			}
			else
			{
				this.buttonPlay.over = false;
			}
			if(this.buttonReplay.onCollision(moviment))
			{
				this.buttonReplay.over = true;
			}
			else
			{
				this.buttonReplay.over = false;
			}
			if(this.buttonMenu.onCollision(moviment))
			{
				this.buttonMenu.over = true;
			}
			else
			{
				this.buttonMenu.over = false;
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
		
		this.keyDown = function(a)
		{
			switch(a.keyCode)
			{
				case 37:
					this.player.moveLeft = true;
					break;
				case 38:
					if(this.player.canJump)
					{
						this.player.jump = true;
					}
					break;
				case 39:
					this.player.moveRight = true;
					break;
				case 67:
					if(this.clovis.canActive)this.clovis.active = true;
					break;
			}
		}
		
		this.keyUp = function(a)
		{
			switch(a.keyCode)
			{
				case 37:
					this.player.moveLeft = false;
					break;
				case 39:
					this.player.moveRight = false;
					break;
			}
		}
		
		this.draw = function(c)
		{
			c.save();
			c.beginPath();
			c.drawImage(this.background, 0, 0, c.canvas.width, c.canvas.height);
			c.closePath();
			c.restore();
			this.spider.draw(c);
			for(var i = 0; i < this.trapezes.length; i++)
			{
				this.trapezes[i].draw(c);
			}
			this.time.draw(c);
			this.interfaceLife.draw(c);
			this.clovis.draw(c);
			this.player.draw(c);
			for(var i = 0; i < this.pipes.length; i++)
			{
				this.pipes[i].draw(c);
			}
			for(var i = 0; i < this.life; i++)
			{
				this.lifes[i].draw(c);
			}
			if(!this.pause)
			{
				this.buttonPause.draw(c);
			}
			else
			{
				this.backgroundPause.draw(c);
				this.buttonPlay.draw(c);
				this.buttonReplay.draw(c);
				this.buttonMenu.draw(c);
			}
		}
	}