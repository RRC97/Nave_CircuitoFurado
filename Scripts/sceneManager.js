
	var SceneManager = function(event, eventDown, eventUp, eventMove)
	{
		this.mainScene;
		this.currentScene;
		this.beforeEventName;
		this.mainEventName;
		this.event = event;
		this.eventDown = eventDown;
		this.eventUp = eventUp;
		this.eventMove = eventMove;
		this.soundBackground = new Audio();
		this.soundBackground.src = "./Sounds/menu.mp3";
		this.soundPape = new Audio();
		this.soundPape.src = "./Sounds/pape.mp3";
		this.soundFalling = new Audio();
		this.soundFalling.src = "./Sounds/falling.mp3";
		this.soundJump = new Audio();
		this.soundJump.src = "./Sounds/jump.mp3";
		this.soundBackground.loop = true;
		this.activeSound = true;
		this.buttonMute = new Button(25, 695, 30, 30,
		"./Images/buttons/button4_4.png",
		"./Images/buttons/button4_4over.png");
		this.mute = false;
		this.level = 1;
		
		this.setScene = function()
		{
			switch(this.currentScene)
			{
				case "open": this.mainScene = new Open(this); break;
				case "menu": this.mainScene = new Menu(this); break;
				case "game": this.mainScene = new Game(this); break;
				case "intro": this.mainScene = new Intro(this); break;
				case "credits": this.mainScene = new Credits(this); break;
				case "win": this.mainScene = new Win(this); break;
				case "lose": this.mainScene = new Lose(this); break;
				case "preload": this.mainScene = new Preload(this); break;
				case "difficulty": this.mainScene = new Difficulty(this); break;
			}
		}
		
		this.setCurrentScene = function(sceneName)
		{
			this.beforeEventName = this.mainEventName;
			this.currentScene = sceneName;
			this.setScene();
			this.mainEventName = this.mainScene.nameEvent;
			this.activeEventScene();
		}
		
		this.update = function()
		{
			this.soundBackground.muted = this.mute;
			this.soundFalling.muted = this.mute;
			this.soundPape.muted = this.mute;
			this.soundJump.muted = this.mute;
			if(this.currentScene == "game" && this.mainScene.pause)
			{
				this.soundBackground.muted = true;
				this.soundPape.muted = true;
				this.soundFalling.muted = true;
				this.soundJump.muted = true;
			}
			if(this.activeSound)
			{
				if(this.soundBackground.volume < 1) this.soundBackground.volume += 0.02;
			}
			else
			{
				if(this.soundBackground.volume >= 0.2) this.soundBackground.volume -= 0.02;
			}
			
			if(this.currentScene == "game" && this.mainScene.player.jump && this.mainScene.player.canJump)
			{
				this.soundJump.play();
			}
			
			this.mainScene.update();
		}
		
		this.draw = function(c)
		{
			c.clearRect(0, 0, c.canvas.width, c.canvas.height);
			this.mainScene.draw(c);
			if(this.currentScene != "preload"
			&& this.currentScene != "open")
			{
				this.buttonMute.draw(c);
			}
		}
		
		this.keyUp = function(actionEvent)
		{
			this.mainScene.keyUp(actionEvent);
		}
		
		this.keyDown = function(actionEvent)
		{
			this.mainScene.keyDown(actionEvent);
		}
		
		this.eventScene = function(actionEvent)
		{
			this.mainScene.actionEvent(actionEvent);
			if(this.currentScene != "preload"
			&& this.currentScene != "open"
			&& this.mainEventName == "mouseup"
			&& this.buttonMute.onCollision(this.mainScene.mouse))
			{
				this.mute = !this.mute;
				this.buttonMute.over = !this.buttonMute.over;
			}
		}
		
		this.mouseMove = function(actionEvent)
		{
			this.mainScene.actionMove(actionEvent);
		}
		this.activeEventScene = function()
		{
			this.activeSound = true;
			document.onkeyup = null;
			document.onkeydown = null;
			document.onmousemove = null;
			document.removeEventListener(this.beforeEventName, this.event, true);
			if(this.currentScene != "preload")
			{
				if(this.currentScene != "game" && this.currentScene != "open")
				{
					document.addEventListener(this.mainEventName, this.event, true);
					document.onmousemove = this.eventMove;
					this.activeSound = true;
				}
				else if(this.currentScene == "game")
				{
					this.activeSound = false;
					document.onkeydown = this.eventDown;
					document.onkeyup = this.eventUp;
					document.onmousemove = this.eventMove;
					document.addEventListener(this.mainEventName, this.event, true);
				}
				else
				{
					document.addEventListener(this.mainEventName, this.event, true);
					this.activeSound = true;
				}
				
			}
		}
	}