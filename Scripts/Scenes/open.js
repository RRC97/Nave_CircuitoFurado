/*TODO:
1- OPEN - Background do fundo se movendo. - FEITO
2- MENU - Mouse over.
3- CREDITS - Igual ao de filme, alterar a multimidia.
4 - Mais movimentação. - ANDANMENTO
5 - LOSE, WIN - Montagem de cenário temporario.


*/
	var Open = function(m)
	{
		this.background = new ImageElement("Images/open.png", 1280/2, 720/2, 1280, 720);
		this.background2 = new ImageElement("Images/open.png", 1280 + 1280/2 + 1280/47, 720/2, 1280, 720);
		this.nameEvent = "keyup";
		this.manager = m;
		this.alpha = 0;
		this.trasition;
		this.logoTransition = true;
		this.stop = true;
		this.logo = new ImageElement("Images/logo.png",  1280/2, 720/2, 0, 0);
		this.update = function()
		{
			this.background.x -= 5;
			this.background2.x -= 5;
			
			if(this.background.x <= -1280/2 - 1280/47)
			{
				this.background.x = 1280 + 1280/2 + 1280/47;
			}
			
			if(this.background2.x <= -1280/2 - 1280/47)
			{
				this.background2.x = 1280 + 1280/2 + 1280/47;
			}
			
			if(this.logoTransition)
			{
				if(this.logo.height < 800)
				{
					this.logo.width += 5 * 10;
					this.logo.height += 3.8 * 10;
				}
				else
				{
					this.logoTransition = false;
					
				}
			}
			else
			{
				if(this.logo.height > 700)
				{
					this.logo.width -= 5 * 10;
					this.logo.height -= 3.8 * 10;
				}
				else
				{
					this.stop = false;
				}
			}
			if(!this.stop)
			{
				if(this.trasition)
				{
					this.alpha += 0.1;
				}
				
				if(this.trasition && this.alpha >= 1)
				{
					this.manager.setCurrentScene("menu");
				}
			}
		}
		this.actionEvent = function(a)
		{
			if(a.keyCode == 13)
			{
				if(!this.stop) this.trasition = true;
			}
		}
		this.draw = function(c)
		{
			this.background.draw(c);
			this.background2.draw(c);
			this.logo.draw(c);
			
			c.save();
			c.beginPath();
			c.globalAlpha = this.alpha;
			c.fillStyle = "white";
			c.fillRect(0, 0, c.canvas.width, c.canvas.height);
			c.closePath();
			c.restore();
		}
	}