/*! CrucialPain - v0.0.1 - 2015-04-04
* http://outofscope-dev.com/
* Copyright (c) 2015 Jan Geselle */
var Blank,CameraManager,Controls,Crab,Crosshair,CrucialPain,FPS,Goal,Helpers,Hermit,Item,Level,MovingWall,OneUp,Portal,PreloadBar,Puck,Stopper,Walker,Wall,game,indexOf=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1},extend=function(a,b){function c(){this.constructor=a}for(var d in b)hasProp.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a},hasProp={}.hasOwnProperty;Helpers={GetRandom:function(a,b){return~~(Math.random()*(b-a))+a},GetDirectionFromVelocity:function(a,b){var c,d,e,f,g;return e=a.body.velocity,d=void 0,c=void 0,f=e.x,g=e.y,0===f&&(c="none"),f>0&&(c="Right"),0>f&&(c="Left"),0===g&&(d="none"),g>0&&(d="Down"),0>g&&(d="Up"),"none"===c&&"none"===d?"standDown":(f=Math.abs(f),g=Math.abs(g),f>g?c=b>f?"stand"+c:"walk"+c:d=b>g?"stand"+d:"walk"+d)}},Controls=function(){return this.up=!1,this.down=!1,this.left=!1,this.right=!1,this.esc=!1,this.f=!1,this.e=!1,this.primary=!1,this.newPrimary=!1,this.newSecondary=!1,this.previousPrimary=!1,this.previousSecondary=!1,this.secondary=!1,this.x=0,this.y=0,this.worldX=0,this.worldY=0,this.cursors={},this.formerMouse=-1,this.mobile=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),this},Controls.prototype.create=function(){return this.cursors.up=game.input.keyboard.addKey(Phaser.Keyboard.W),this.cursors.left=game.input.keyboard.addKey(Phaser.Keyboard.A),this.cursors.down=game.input.keyboard.addKey(Phaser.Keyboard.S),this.cursors.right=game.input.keyboard.addKey(Phaser.Keyboard.D),this.shift=game.input.keyboard.addKey(Phaser.Keyboard.SHIFT),this.esc=game.input.keyboard.addKey(Phaser.Keyboard.ESC),this.f=game.input.keyboard.addKey(Phaser.Keyboard.F),this.e=game.input.keyboard.addKey(Phaser.Keyboard.E),this},Controls.prototype.update=function(){return this.previousPrimary=this.primary,this.previousSecondary=this.secondary,(-1!==game.input.mouse.button||this.fomerMouse>-1)&&(game.input.mouse.button<0&&0===this.fomerMouse?this.primary=!1:game.input.mouse.button<0&&2===this.fomerMouse?this.secondary=!1:0===game.input.mouse.button&&this.fomerMouse!==game.input.mouse.button?(this.secondary=!1,this.primary=!0):2===game.input.mouse.button&&this.fomerMouse!==game.input.mouse.button&&(this.primary=!1,this.secondary=!0),this.fomerMouse=game.input.mouse.button),this.newPrimary=!1,this.newSecondary=!1,this.primary&&!this.previousPrimary&&(this.newPrimary=!0),this.secondary&&!this.previousSecondary&&(this.newSecondary=!0),this.worldX=game.input.activePointer.worldX,this.worldY=game.input.activePointer.worldY,this.x=game.input.activePointer.x,this.y=game.input.activePointer.y,this.up=this.cursors.up.isDown,this.down=this.cursors.down.isDown,this.left=this.cursors.left.isDown,this.right=this.cursors.right.isDown,this},CameraManager=function(){function a(a){var b;null==a&&(a={}),this.lerp=null!=(b=a.lerp)?b:.1,this.cameraPosition=new Phaser.Point(0,0)}return a.prototype.update=function(){var a,b;return a=null!=(b=game.puck)?b.sprite.body.center:void 0,a?(this.updateCameraPosition(a),this.applyPositionToCamera()):void 0},a.prototype.updateCameraPosition=function(a){return this.cameraPosition.x+=(a.x-this.cameraPosition.x)*this.lerp,this.cameraPosition.y+=(a.y-this.cameraPosition.y)*this.lerp},a.prototype.applyPositionToCamera=function(){return game.camera.focusOnXY(this.cameraPosition.x,this.cameraPosition.y)},a}(),Blank=function(){function a(a){var b,c,d,e;null==a&&(a={}),e=null!=(b=a.visible)?b:!1,this.color=null!=(c=a.color)?c:"#000000",this.speed=null!=(d=a.speed)?d:400,this.width=game.camera.width,this.height=game.camera.height,this.x=0,this.y=0,this.sprite=this.createSprite(),this.sprite.visible=e,this.sprite.alpha=e?1:0}return a.prototype.createBitmapData=function(){var a;return a=game.add.bitmapData(this.width,this.height),a.context.fillStyle=this.color,a.context.fillRect(0,0,this.width,this.height),a},a.prototype.createSprite=function(){var a;return a=game.add.sprite(0,0,this.createBitmapData()),a.fixedToCamera=!0,a.cameraOffset.x=this.x,a.cameraOffset.y=this.y,a},a.prototype.isFading=function(){var a;return 0<(a=this.sprite.alpha)&&1>a},a.prototype.show=function(){return this.isFading()?void 0:(this.sprite.alpha=1,this.sprite.visible=!0)},a.prototype.hide=function(){return this.isFading()?void 0:(this.sprite.alpha=0,this.sprite.visible=!1)},a.prototype.fadeTo=function(a){var b;if(0===this.sprite.alpha)return this.sprite.bringToTop(),this.sprite.visible=!0,b=game.add.tween(this.sprite),b.to({alpha:1},this.speed),a&&b.onComplete.add(a,this),b.start(),this},a.prototype.fadeFrom=function(a){var b;if(1===this.sprite.alpha)return b=game.add.tween(this.sprite),b.to({alpha:0},this.speed),b.onComplete.add(function(){return this.sprite.visible=!1,a?a():void 0},this),b.start(),this},a}(),FPS=function(){function a(){this.text=game.add.bitmapText(0,0,"silkscreen","",32),this.text.fixedToCamera=!0}return a.prototype.update=function(){return 60!==game.time.fps?(this.text.visible=!0,this.text.cameraOffset.x=game.camera.width-32-this.text.width,this.text.cameraOffset.y=32,this.text.setText((game.time.fps||"--")+" FPS")):this.text.visible=!1,this},a}(),Crosshair=function(){function a(a){var b,c,d,e;null==a&&(a={}),this.color=null!=(b=a.color)?b:"#ffffff",this.width=null!=(c=a.width)?c:1,this.height=null!=(d=a.height)?d:1,this.scale=null!=(e=a.scale)?e:1,this.showHelper=!1,this.x=0,this.y=0,this.offset={x:14,y:14},this.sprite=this.createSprite(),this.showHelper&&(this.helper=this.createHelper())}return a.prototype.createBitmapData=function(){var a;return a=game.add.bitmapData(this.width,this.height),a.context.fillStyle=this.color,a.context.fillRect(0,0,this.width,this.height),a},a.prototype.createHelper=function(){var a,b;return a=this.createBitmapData(),b=game.add.sprite(this.x,this.y,a),b.scale.setTo(this.scale),game.physics.enable(b),b.anchor.setTo(.5),b.fixedToCamera=!0,b},a.prototype.createSprite=function(){var a;return a=game.add.sprite(this.x+this.offset.x,this.y+this.offset.y,"cursor"),a.scale.setTo(this.scale),game.physics.enable(a),a.anchor.setTo(.5),a.fixedToCamera=!0,a.animations.add("loop",[0,1,2],10,!0),a.animations.add("click",[3,4,5,6,5,4,3],40,!1),a.animations.play("loop"),a},a.prototype.update=function(){var a,b;return b=this.sprite.animations.currentAnim.name,a=this.sprite.animations.currentAnim.isFinished,game.controls.newPrimary&&"click"!==b&&this.sprite.animations.play("click"),"click"===b&&a&&this.sprite.animations.play("loop"),this.x=game.controls.worldX,this.x=this.x?this.x:0,this.y=game.controls.worldY,this.y=this.y?this.y:0,this.showHelper&&this.helper.cameraOffset.setTo(this.x-game.camera.x,this.y-game.camera.y),this.sprite.cameraOffset.setTo(this.x-game.camera.x+this.offset.x,this.y-game.camera.y+this.offset.y),this},a}(),PreloadBar=function(){function a(a){var b,c,d,e,f;null==a&&(a={}),this.bg=null!=(b=a.bg)?b:!1,this.bg=this.createBg(),this.bar=null!=(c=a.bar)?c:!1,this.bar=this.createBar(),this.x=null!=(d=a.x)?d:0,this.y=null!=(e=a.y)?e:0,this.center=null!=(f=a.center)?f:!1,"vertical"===this.center&&this.vAlignCenter(),"horizontal"===this.center&&this.hAlignCenter(),this.center===!0&&this.alignCenter()}return a.prototype.createBg=function(){return this.bg?game.add.sprite(this.x,this.y,this.bg):!1},a.prototype.createBar=function(){return this.bar?game.add.sprite(this.x,this.y,this.bar):!1},a.prototype.vAlignCenter=function(){return this.bg&&(this.bg.position.y=game.height/2-this.bg.height/2),this.bar?this.bar.position.y=game.height/2-this.bar.height/2:void 0},a.prototype.hAlignCenter=function(){return this.bg&&(this.bg.position.x=game.width/2-this.bg.width/2),this.bar?this.bar.position.x=game.width/2-this.bar.width/2:void 0},a.prototype.alignCenter=function(){return this.vAlignCenter(),this.hAlignCenter()},a.prototype.getSprite=function(){return console.log(this.bar),this.bar},a}(),Level=function(){function a(a){var b;null==a&&(a={}),this.index=null!=(b=a.index)?b:1,this.map=this.createMap(),this.setBounds(),this.walls=this.createWalls(),this.goal=this.createGoal(),this.walkers=this.createWalkers(),this.stoppers=this.createStoppers(),this.oneUps=this.createOneUps(),this.portals=this.createPortals()}return a.prototype.createMap=function(){return game.add.tilemap(""+this.index)},a.prototype.setBounds=function(){return game.world.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels)},a.prototype.createWalls=function(){var a,b,c,d,e,f,g;for(g=[],a=this.map.objects.walls,c=0,d=a.length;d>c;c++)b=a[c],f=this.getWallSize(b),e=new Wall({x:b.x,y:b.y,width:f.width,height:f.height}),e.sprite.position.y=e.sprite.position.y-e.sprite.body.height,g.push(e);return g},a.prototype.getWallSize=function(a){var b;return b={gid1:{width:1,height:1},gid2:{width:1,height:2},gid3:{width:1,height:3},gid4:{width:2,height:1},gid5:{width:3,height:1}},b["gid"+a.gid]},a.prototype.createWalkers=function(){var a;return a=[],this.createWalker("crab",Crab,a),this.createWalker("hermit",Hermit,a),this.createWalker("movingwall",MovingWall,a)},a.prototype.createWalker=function(a,b,c){var d,e,f,g,h,i,j,k,l,m;for(d=this.map.objects.entities,f=0,g=d.length;g>f;f++)e=d[f],e.name===a&&(h=null!=(j=null!=(k=e.properties)?k.rangeX:void 0)?j:0,h=1*h,i=null!=(l=null!=(m=e.properties)?m.rangeY:void 0)?l:0,i=1*i,c.push(new b({x:e.x,y:e.y,rangeX:h,rangeY:i})));return c},a.prototype.createStoppers=function(){var a,b,c,d,e;for(e=[],a=this.map.objects.entities,c=0,d=a.length;d>c;c++)b=a[c],"stopper"===b.name&&e.push(new Stopper({x:b.x,y:b.y}));return e},a.prototype.getSpawn=function(a){var b,c,d,e,f;for(f=!1,b=this.map.objects.entities,d=0,e=b.length;e>d;d++)c=b[d],"spawn"===c.name&&(f=new Phaser.Point(c.x,c.y-a.body.height));return f||(f=new Phaser.Point(0,0)),f},a.prototype.createOneUps=function(){var a,b,c,d,e;for(e=[],a=this.map.objects.entities,c=0,d=a.length;d>c;c++)b=a[c],"oneup"===b.name&&e.push(new OneUp({x:b.x,y:b.y}));return e},a.prototype.createPortals=function(){var a,b,c,d,e,f,g,h;for(f=[],a=this.map.objects.entities,c=0,d=a.length;d>c;c++)b=a[c],"portal"===b.name&&(e=null!=(g=null!=(h=b.properties)?h.pid:void 0)?g:0,e=1*e,f.push(new Portal({x:b.x,y:b.y,pid:e})));return f},a.prototype.createGoal=function(){var a,b,c,d,e;for(c=!1,a=this.map.objects.entities,d=0,e=a.length;e>d;d++)b=a[d],"goal"===b.name&&(c=new Goal({x:b.x,y:b.y}));return c},a.prototype.update=function(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u;for(n=this.walls,b=0,f=n.length;f>b;b++)u=n[b],u.update();for(o=this.walkers,c=0,g=o.length;g>c;c++)t=o[c],t.update();for(p=this.stoppers,d=0,h=p.length;h>d;d++)s=p[d],s.update();for(q=this.oneUps,e=0,i=q.length;i>e;e++)l=q[e],l.update();for(r=this.portals,k=0,j=r.length;j>k;k++)m=r[k],m.update();return"function"==typeof(a=this.goal).update?a.update():void 0},a}(),Wall=function(){function a(a){var b,c,d,e;null==a&&(a={}),this.width=null!=(b=a.width)?b:1,this.height=null!=(c=a.height)?c:1,this.x=null!=(d=a.x)?d:0,this.y=null!=(e=a.y)?e:0,this.sizes=["1x1","1x2","1x3","2x1","3x1"],this.bodySizes={"1x1":[42,73,15,16],"1x2":[42,114,16,15],"1x3":[42,154,15,15],"2x1":[83,74,14,15],"3x1":[122,74,16,15]},this.sanitizeSize(),this.sprite=this.createSprite(),this.addAnimations(this.sprite)}return a.prototype.sanitizeSize=function(){var a;return a=this.getSize(),indexOf.call(this.sizes,a)<0?(this.width=1,this.height=1):void 0},a.prototype.getSize=function(){return this.width+"x"+this.height},a.prototype.createSprite=function(){var a;return a=game.add.sprite(0-this.bodySizes[this.getSize()][2],0-this.bodySizes[this.getSize()][3],"wall_"+this.getSize()),game.physics.enable(a,Phaser.Physics.ARCADE),a.anchor.setTo(0,0),a.body.immovable=!0,a.body.setSize(this.bodySizes[this.getSize()][0],this.bodySizes[this.getSize()][1],this.bodySizes[this.getSize()][2],this.bodySizes[this.getSize()][3]),a.position.setTo(this.x-this.bodySizes[this.getSize()][2],this.y-this.bodySizes[this.getSize()][3]),a},a.prototype.addAnimations=function(a){var b;return b=10,this.sprite.animations.add("loop",[0,1,2],b,!0),a.animations.play("loop")},a.prototype.update=function(){return this.checkForCollisions()},a.prototype.checkForCollisions=function(){return game.physics.arcade.collide(game.puck.sprite,this.sprite)?game.puck.damage():void 0},a}(),Item=function(){function a(a){var b,c;null==a&&(a={}),this.x=null!=(b=a.x)?b:0,this.y=null!=(c=a.y)?c:0,this.sprite=this.createSprite(),this.moveTo(this.x,this.y),this.addAnimations()}return a.prototype.createSprite=function(){var a;return a=game.add.sprite(0-this.bodySize[2],0-this.bodySize[3],this.spritesheet),game.physics.enable(a,Phaser.Physics.ARCADE),a.body.immovable=!0,a.body.setSize(this.bodySize[0],this.bodySize[1],this.bodySize[2],this.bodySize[3]),a},a.prototype.addAnimations=function(){var a;return a=10,this.sprite.animations.add("loop",this.loopFrames,a,!0),this.sprite.animations.play("loop")},a.prototype.moveTo=function(a,b){return this.sprite.position.setTo(a-this.bodySize[2],b-this.bodySize[3]-this.bodySize[1])},a.prototype.update=function(){return this.checkForCollisions(),this.updateSmoke()},a.prototype.checkForCollisions=function(){return game.physics.arcade.overlap(game.puck.sprite,this.sprite)?this.onCollision():void 0},a.prototype.kill=function(){return this.createSmoke(),this.sprite.kill()},a.prototype.createSmoke=function(){var a;return this.smoke=game.add.sprite(this.x-this.bodySize[2],this.y-this.bodySize[3],this.smokeSpritesheet),a=10,this.smoke.animations.add("smoke",this.smokeFrames,a,!1),this.smoke.animations.play("smoke")},a.prototype.updateSmoke=function(){var a,b,c;return(null!=(a=this.smoke)&&null!=(b=a.animations)&&null!=(c=b.currentAnim)?c.isFinished:void 0)?(this.smoke.kill(),this.smokeDone=!0):void 0},a}(),Portal=function(a){function b(a){var c;null==a&&(a={}),this.pid=null!=(c=a.pid)?c:1,b.__super__.constructor.call(this,a)}return extend(b,a),b.prototype.bodySize=[40,40,30,45],b.prototype.spritesheet="portal",b.prototype.loopFrames=[0,1,2],b.prototype.smokeSpritesheet="portalsmoke",b.prototype.smokeFrames=[0,1,2,3,4,5,6,7,8,9,10],b.prototype.onCollision=function(){var a,b,c;return this.kill(),c=this.getTarget(),a=c.sprite.position.x-this.sprite.position.x,b=c.sprite.position.y-this.sprite.position.y,c.kill(),game.puck.sprite.position.x+=a,game.puck.sprite.position.y+=b},b.prototype.getTarget=function(){var a,b,c,d,e;for(d=game.level.portals,a=0,b=d.length;b>a;a++)c=d[a],c.pid===this.pid&&c!==this&&(e=c);return e},b}(Item),Goal=function(a){function b(){return b.__super__.constructor.apply(this,arguments)}return extend(b,a),b.prototype.reached=!1,b.prototype.bodySize=[40,40,30,45],b.prototype.spritesheet="goal",b.prototype.loopFrames=[0,1,2],b.prototype.smokeSpritesheet="goalsmoke",b.prototype.smokeFrames=[0,1,2,3,4,5,6,7,8,9,10],b.prototype.onCollision=function(){return this.kill(),game.puck.stop(),this.reached=!0},b.prototype.isReached=function(){return this.smokeDone&&this.reached},b}(Item),OneUp=function(a){function b(){return b.__super__.constructor.apply(this,arguments)}return extend(b,a),b.prototype.bodySize=[40,40,30,45],b.prototype.spritesheet="1up",b.prototype.loopFrames=[0,1,2],b.prototype.smokeSpritesheet="1upsmoke",b.prototype.smokeFrames=[0,1,2,3,4,5,6,7,8,9,10],b.prototype.onCollision=function(){return this.kill(),game.puck.health<3?game.puck.health++:void 0},b}(Item),Puck=function(){function a(a){null==a&&(a={}),this.paused=!1,this.ready=!0,this.health=3,this.hitTimeout=!1,this.bodySize=[65,65,0,48],this.bounce=.5,this.sprite=this.createSprite(),this.addAnimations(),this.moveToSpawn()}return a.prototype.createSprite=function(){var a;return a=game.add.sprite(0-this.bodySize[2],0-this.bodySize[3],"puck"),game.physics.enable(a,Phaser.Physics.ARCADE),a.anchor.setTo(.5,.5),a.body.collideWorldBounds=!0,a.body.bounce.setTo(this.bounce,this.bounce),a.body.setSize(this.bodySize[0],this.bodySize[1],this.bodySize[2],this.bodySize[3]),a},a.prototype.addAnimations=function(){var a,b;return b=10,a=10,this.sprite.animations.add("firstLoop",[7,0,1,2,3,4,5,6],b,!0),this.sprite.animations.add("firstDeath",[8,9,10,11,12,13,14,15,16,17,18,19,20,21],a,!1),this.sprite.animations.add("secondLoop",[29,23,24,25,26,27,28,22],b,!0),this.sprite.animations.add("secondDeath",[30,31,32,33,34,35,36,37,38,39,40,41,42,43],a,!1),this.sprite.animations.add("thirdLoop",[51,45,46,47,48,49,50,44],b,!0),this.sprite.animations.add("thirdDeath",[52,53,54,55,56,57,58,59,60,61,62,63,64,65],a,!1),this.sprite.animations.play("firstLoop")},a.prototype.updateAnimation=function(){var a;if(a=this.sprite.animations.currentAnim.name,this.sprite.animations.currentAnim.isFinished)switch(a){case"firstDeath":this.sprite.animations.play("secondLoop");break;case"secondDeath":this.sprite.animations.play("thirdLoop")}return 2===this.health&&"firstDeath"!==a&&"secondLoop"!==a&&this.sprite.animations.play("firstDeath"),1===this.health&&"secondDeath"!==a&&"thirdLoop"!==a&&this.sprite.animations.play("secondDeath"),0===this.health&&"thirdDeath"!==a&&this.sprite.animations.play("thirdDeath"),3===this.health&&"secondLoop"===a&&this.sprite.animations.play("firstLoop"),2===this.health&&"thirdLoop"===a?this.sprite.animations.play("secondLoop"):void 0},a.prototype.moveToSpawn=function(){var a;return game.level?(a=game.level.getSpawn(this.sprite),this.moveTo(a.x,a.y)):void 0},a.prototype.update=function(){return game.controls.newPrimary&&this.smash(),this.updateAnimation()},a.prototype.smash=function(){var a,b,c;return a=1.5,b=(game.controls.worldX-this.sprite.body.center.x)*a,c=(game.controls.worldY-this.sprite.body.center.y)*a,this.health>0&&this.ready?(this.deactivate(),this.sprite.body.velocity.setTo(b,c)):void 0},a.prototype.stop=function(){return this.sprite.body.velocity.setTo(0)},a.prototype.activate=function(){return this.ready=!0},a.prototype.deactivate=function(){return this.ready=!1},a.prototype.moveTo=function(a,b){return this.sprite.position.setTo(a+this.sprite.body.width/2-this.bodySize[2],b+this.sprite.body.height/2-this.bodySize[3])},a.prototype.damage=function(){return this.health--,this.activate(),0===this.health?this.stop():void 0},a}(),Walker=function(){function a(a){var b,c,d,e,f;null==a&&(a={}),this.x=null!=(b=a.x)?b:0,this.y=null!=(c=a.y)?c:0,this.rangeX=null!=(d=a.rangeX)?d:0,this.rangeY=null!=(e=a.rangeY)?e:0,this.speed=null!=(f=a.speed)?f:1,this.stepX=this.getStepX(),this.stepY=this.getStepY(),this.sprite=this.createSprite(),this.moveTo(this.x,this.y),this.addAnimations()}return a.prototype.createSprite=function(){var a;return a=game.add.sprite(0-this.bodySize[2],0-this.bodySize[3],this.spritesheet),game.physics.enable(a,Phaser.Physics.ARCADE),a.body.immovable=!0,a.body.setSize(this.bodySize[0],this.bodySize[1],this.bodySize[2],this.bodySize[3]),a},a.prototype.addAnimations=function(){var a;return a=10,this.sprite.animations.add("loop",this.loopFrames,a,!0),this.sprite.animations.play("loop")},a.prototype.moveTo=function(a,b){return this.sprite.position.setTo(a-this.bodySize[2],b-this.bodySize[3]-this.bodySize[1])},a.prototype.getStepX=function(){switch(!1){case!(this.rangeX>0):return this.speed;case!(this.rangeX<0):return-1*this.speed;default:return 0}},a.prototype.getStepY=function(){switch(!1){case!(this.rangeY>0):return this.speed;case!(this.rangeY<0):return-1*this.speed;default:return 0}},a.prototype.update=function(){return this.updateMovement(),this.checkForCollisions()},a.prototype.updateMovement=function(){var a,b;return a=this.sprite.body.position.x+this.stepX,b=this.sprite.body.position.y+this.stepY+this.bodySize[1],this.moveTo(a,b),(a===this.x+this.rangeX||a===this.x)&&this.changeDirectionX(),b===this.y+this.rangeY||b===this.y?this.changeDirectionY():void 0},a.prototype.changeDirectionX=function(){return this.stepX=-1*this.stepX},a.prototype.changeDirectionY=function(){return this.stepY=-1*this.stepY},a.prototype.checkForCollisions=function(){return game.physics.arcade.collide(game.puck.sprite,this.sprite)?this.onCollision():void 0},a}(),MovingWall=function(a){function b(){return b.__super__.constructor.apply(this,arguments)}return extend(b,a),b.prototype.bodySize=[40,66,16,16],b.prototype.spritesheet="movingwall",b.prototype.loopFrames=[0,1,2,3,4,5,6,7],b.prototype.onCollision=function(){},b}(Walker),Stopper=function(){function a(a){var b,c;null==a&&(a={}),this.x=null!=(b=a.x)?b:0,this.y=null!=(c=a.y)?c:0,this.sprite=this.createSprite(),this.moveTo(this.x,this.y),this.addAnimations()}return a.prototype.bodySize=[39,73,17,15],a.prototype.spritesheet="stopper",a.prototype.loopFrames=[0,1,2],a.prototype.createSprite=function(){var a;return a=game.add.sprite(0-this.bodySize[2],0-this.bodySize[3],this.spritesheet),game.physics.enable(a,Phaser.Physics.ARCADE),a.body.immovable=!0,a.body.setSize(this.bodySize[0],this.bodySize[1],this.bodySize[2],this.bodySize[3]),a},a.prototype.addAnimations=function(){var a;return a=10,this.sprite.animations.add("loop",this.loopFrames,a,!0),this.sprite.animations.play("loop")},a.prototype.moveTo=function(a,b){return this.sprite.position.setTo(a-this.bodySize[2],b-this.bodySize[3]-this.bodySize[1])},a.prototype.update=function(){return this.checkForCollisions()},a.prototype.checkForCollisions=function(){return game.physics.arcade.collide(game.puck.sprite,this.sprite)?this.onCollision():void 0},a.prototype.onCollision=function(){return game.puck.stop(),game.puck.ready=!0},a}(),Crab=function(a){function b(){return b.__super__.constructor.apply(this,arguments)}return extend(b,a),b.prototype.bodySize=[38,38,28,39],b.prototype.spritesheet="crab",b.prototype.loopFrames=[0,1,2,3],b.prototype.onCollision=function(){return game.puck.stop(),game.puck.health=0},b}(Walker),Hermit=function(a){function b(){return b.__super__.constructor.apply(this,arguments)}return extend(b,a),b.prototype.spritesheet="hermit",b}(Crab),CrucialPain={},CrucialPain.Boot=function(a){},CrucialPain.Boot.prototype={preload:function(){game.time.advancedTiming=!0,this.load.image("preloaderBg","asset/sprites/preload_bg.png"),this.load.image("preloaderBar","asset/sprites/preload_bar.png")},create:function(){game.stage.disableVisibilityChange=!0,game.onBlur.add(function(){game.input.reset(),game.inactive=!0},this),game.onFocus.add(function(){game.inactive=!1},this),this.state.start("Preloader")}},CrucialPain.Default=function(a){},CrucialPain.Default.prototype={create:function(){null==game.controls&&(game.controls=new Controls,game.controls.create()),game.cameraManager=new CameraManager,null==game.ui&&(game.ui={}),game.ui.fps=new FPS,game.ui.blank=new Blank({visible:!0}),game.controls.mobile||(game.ui.crosshair=new Crosshair)},update:function(){game.controls.update(),game.cameraManager.update(),game.ui.fps.update(),game.controls.mobile||game.ui.crosshair.update()},render:function(){}},CrucialPain.Preloader=function(a){},CrucialPain.Preloader.prototype={preload:function(){this.stage.backgroundColor="#000000",this.preloadBar=new PreloadBar({bg:"preloaderBg",bar:"preloaderBar",center:!0}),this.load.setPreloadSprite(this.preloadBar.getSprite()),this.load.spritesheet("titlescreen","asset/sprites/titlescreen.png",1024,768),this.load.spritesheet("cursor","asset/sprites/cursor.png",48,48),this.load.spritesheet("puck","asset/sprites/puck.png",96,192),this.load.spritesheet("crab","asset/sprites/crab.png",96,96),this.load.spritesheet("hermit","asset/sprites/hermit.png",96,96),this.load.spritesheet("movingwall","asset/sprites/movingwall.png",72,96),this.load.spritesheet("stopper","asset/sprites/stopper.png",72,96),this.load.spritesheet("1up","asset/sprites/1up.png",96,96),this.load.spritesheet("1upsmoke","asset/sprites/1upsmoke.png",96,96),this.load.spritesheet("portal","asset/sprites/portal.png",96,96),this.load.spritesheet("portalsmoke","asset/sprites/portalsmoke.png",96,96),this.load.spritesheet("goal","asset/sprites/goal.png",96,96),this.load.spritesheet("goalsmoke","asset/sprites/goalsmoke.png",96,96),this.load.spritesheet("wall_1x1","asset/sprites/wall_1x1.png",72,96),this.load.spritesheet("wall_1x2","asset/sprites/wall_1x2.png",72,136),this.load.spritesheet("wall_1x3","asset/sprites/wall_1x3.png",72,176),this.load.spritesheet("wall_2x1","asset/sprites/wall_2x1.png",112,96),this.load.spritesheet("wall_3x1","asset/sprites/wall_3x1.png",152,96),this.load.tilemap("1","asset/level/1.json",null,Phaser.Tilemap.TILED_JSON),this.load.tilemap("2","asset/level/2.json",null,Phaser.Tilemap.TILED_JSON),this.load.bitmapFont("silkscreen","asset/fonts/silkscreen/silkscreen.png","asset/fonts/silkscreen/silkscreen.fnt")},create:function(){return this.state.start("MainMenu")},render:function(){}},CrucialPain.MainMenu=function(a){},CrucialPain.MainMenu.prototype={create:function(){game.mode="menu",game.stage.setBackgroundColor("#000000"),window.splashScreen=this.add.sprite(0,0,"titlescreen"),splashScreen.animations.add("loop",[0,1,2],10,!0),splashScreen.animations.play("loop"),game.state.states.Default.create(),game.ui.blank.hide()},startGame:function(){game.ui.blank.fadeTo(function(){return game.state.clearCurrentState(),game.state.start("Level")})},update:function(){game.state.states.Default.update(),game.controls.primary&&this.startGame()},render:function(){}},CrucialPain.Level=function(a){},CrucialPain.Level.prototype={create:function(){return game.mode="level",game.physics.startSystem(Phaser.Physics.ARCADE),game.stage.setBackgroundColor("#000000"),this.stateChange=!1,null==game.levelIndex&&(game.levelIndex=1),this.level=game.level=new Level({index:game.levelIndex}),game.puck=new Puck,game.state.states.Default.create(),game.ui.blank.fadeFrom()},update:function(){var a;return a=this,game.state.states.Default.update(),this.stateChange&&this.stateChange(),this.level.update(),game.puck.update(),game.puck.health<=0&&"stateChange"!==game.mode&&(game.mode="stateChange",game.ui.blank.fadeTo(function(a){return function(){return game.state.clearCurrentState(),a.state.start("Level")}}(this))),this.level.goal.isReached()&&"stateChange"!==game.mode?(game.levelIndex++,game.mode="stateChange",game.ui.blank.fadeTo(function(a){return function(){return game.state.clearCurrentState(),a.state.start("Level")}}(this))):void 0},render:function(){}},game=new Phaser.Game(1024,768,Phaser.CANVAS,"crucialPain",{},!1,!1),game.state.add("Boot",CrucialPain.Boot),game.state.add("Default",CrucialPain.Default),game.state.add("Preloader",CrucialPain.Preloader),game.state.add("MainMenu",CrucialPain.MainMenu),game.state.add("Level",CrucialPain.Level),game.state.start("Boot");