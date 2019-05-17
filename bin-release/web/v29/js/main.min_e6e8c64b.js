var __reflect=this&&this.__reflect||function(t,e,o){t.__class__=e,o?o.push(e):o=[e],t.__types__=t.__types__?o.concat(t.__types__):o},__extends=this&&this.__extends||function(t,e){function o(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);o.prototype=e.prototype,t.prototype=new o},GameObject=function(){function t(){this.compornent=null,this.shapes=[],this.destroyFlag=!1,t.objects.push(this)}return t.init=function(e){t.objects=[],t.display=e},t.prototype.destroy=function(){this.destroyFlag=!0},t.prototype.addDestroyMethod=function(){},t.prototype["delete"]=function(){var e=this;this.addDestroyMethod(),this.shapes&&this.compornent&&(this.shapes.forEach(function(t){e.compornent.removeChild(t),t=null}),this.shapes=[]),Util.remove(t.display,this.compornent);var o=t.objects.filter(function(t){return t.destroyFlag!==!0});t.objects=o},t.allDestroy=function(){t.objects=t.objects.filter(function(t){return t.destroy(),t["delete"](),!1})},t.update=function(){t.objects.forEach(function(t){return t.updateContent()}),t.objects=t.objects.filter(function(t){return t.destroyFlag&&t["delete"](),!t.destroyFlag}),t.transit&&(t.allDestroy(),t.transit(),t.transit=null)},t.objects=[],t}();__reflect(GameObject.prototype,"GameObject");var GameCompornent=function(t){function e(e,o,n,r){var i=t.call(this)||this;return i.setCompornent(e,o,n,r),i}return __extends(e,t),e.prototype.setCompornent=function(t,e,o,n){this.compornent=new egret.DisplayObjectContainer,this.compornent.x=t,this.compornent.y=e,this.compornent.width=o,this.compornent.height=n,GameStage.display.addChild(this.compornent)},e.prototype["delete"]=function(){var t=this;this.addDestroyMethod(),this.shapes&&this.compornent&&(this.shapes.forEach(function(e){t.compornent.removeChild(e),e=null}),this.shapes=[]),this.compornent&&Util.remove(GameStage.display,this.compornent);var e=GameObject.objects.filter(function(t){return t.destroyFlag!==!0});GameObject.objects=e},e}(GameObject);__reflect(GameCompornent.prototype,"GameCompornent");var UICompornent=function(t){function e(e,o,n,r){var i=t.call(this)||this;return i.setCompornent(e,o,n,r),i}return __extends(e,t),e.prototype.setCompornent=function(t,e,o,n){this.compornent=new egret.DisplayObjectContainer,this.compornent.x=t,this.compornent.y=e,this.compornent.width=o,this.compornent.height=n,UILayer.display.addChild(this.compornent)},e.prototype["delete"]=function(){var t=this;this.addDestroyMethod(),this.shapes&&this.compornent&&(this.shapes.forEach(function(e){t.compornent.removeChild(e),e=null}),this.shapes=[]),this.compornent&&Util.remove(UILayer.display,this.compornent);var e=GameObject.objects.filter(function(t){return t.destroyFlag!==!0});GameObject.objects=e},e.compornents=[],e}(GameObject);__reflect(UICompornent.prototype,"UICompornent");var GraphicShape;!function(t){t[t.NONE=Math.pow(2,0)]="NONE",t[t.CIECLE=Math.pow(2,1)]="CIECLE",t[t.BLOCK=Math.pow(2,2)]="BLOCK"}(GraphicShape||(GraphicShape={}));var PhysicsObject=function(t){function e(e,o,n,r){var i=t.call(this,e,o,n,r)||this;return i.body=null,i.bodyShape=null,i.setCompornent(e,o,n,r),i}return __extends(e,t),e.prepare=function(t){e.pixelPerMeter=t,e.meterPerPixel=1/t,e.width=e.pixelToMeter(Util.width),e.height=e.pixelToMeter(Util.height),e.world=new p2.World,e.world.gravity=[0,9.8]},e.prototype.updateContent=function(){return this.compornent&&this.compornent.y>Util.height?void this.destroy():void this.fixedUpdate()},e.prototype.updateDrowShape=function(){this.compornent.x=this.body.position[0],this.compornent.y=this.body.position[1]},e.prototype.addDestroyMethod=function(){this.body&&(e.world.removeBody(this.body),this.body=null),this.addDestroyPhysicsMethod()},e.prototype.addDestroyPhysicsMethod=function(){},e.step=function(t){return GameOver.gameOverFlag?!0:(e.world.step(1/60,t/1e3,e.maxSubStep),!1)},e.pixelToMeter=function(t){return t*e.meterPerPixel},e.meterToPixel=function(t){return t*e.pixelPerMeter},e.prototype.m2p=function(t){return e.meterToPixel(t)},e.prototype.p2m=function(t){return e.pixelToMeter(t)},Object.defineProperty(e.prototype,"px",{get:function(){return e.meterToPixel(this.mx)},set:function(t){this.mx=e.pixelToMeter(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"py",{get:function(){return e.meterToPixel(this.my)},set:function(t){this.my=e.pixelToMeter(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"mx",{get:function(){return this.body.position[0]},set:function(t){this.body.position[0]=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"my",{get:function(){return this.body.position[1]},set:function(t){this.body.position[1]=t},enumerable:!0,configurable:!0}),e.world=null,e.deltaScale=1,e.maxSubStep=30,e}(GameCompornent);__reflect(PhysicsObject.prototype,"PhysicsObject");var ColorPallet;!function(t){t[t.WHITE=16777215]="WHITE",t[t.BLUE=7581251]="BLUE",t[t.RED=14960194]="RED",t[t.ORANGE=14649137]="ORANGE"}(ColorPallet||(ColorPallet={}));var PIXEL_PER_METER=1,Main=function(t){function e(){var e=t.call(this)||this;return e.once(egret.Event.ADDED_TO_STAGE,e.addToStage,e),e}return __extends(e,t),e.prototype.addToStage=function(){Util.init(this),CheckDate.init(),SaveData.init(),GameObject.init(this.stage),PhysicsObject.prepare(PIXEL_PER_METER),Camera2D.initial(),Game.init(),egret.startTick(this.tickLoop,this)},e.prototype.tickLoop=function(t){return PhysicsObject.step(t),GameObject.update(),!1},e}(eui.UILayer);__reflect(Main.prototype,"Main");var Game=function(){function t(){}return t.init=function(){this.height=egret.MainContext.instance.stage.stageHeight,this.width=egret.MainContext.instance.stage.stageWidth,GameOver.gameOverFlag=!1,PhysicsObject.world.gravity=[0,0],PhysicsObject.maxSubStep=30,new Background,new GameStage,new UILayer,new Player(t.width/2,.5*t.height,.1*t.width),new Score(0,0,0,0,ColorPallet.ORANGE),new Description(0,0,0,0,ColorPallet.ORANGE),new CreateGameScene},t}();__reflect(Game.prototype,"Game");var Background=function(t){function e(){var o=t.call(this)||this;return o.color=ColorPallet.WHITE,e.I=o,e.createPosY=0,o.setCompornent(0,0,Game.width,Game.height),o.setShape(0,0,Game.width,Game.height,o.color),o}return __extends(e,t),e.prototype.setCompornent=function(t,e,o,n){this.compornent=new egret.DisplayObjectContainer,this.compornent.x=t,this.compornent.y=e,this.compornent.width=o,this.compornent.height=n,GameObject.display.addChild(this.compornent)},e.prototype.setShape=function(t,e,o,n,r){var i=Util.setRect(t,e,o,n,r,0,!0);this.compornent.addChild(i),this.compornent.addChild(i),this.shapes.push(i)},e.prototype.updateContent=function(){},e.I=null,e.createPosY=0,e}(GameObject);__reflect(Background.prototype,"Background");var Player=function(t){function e(o,n,r){var i=t.call(this,o,n,r,r)||this;return i.maxBallPosY=0,i.start=!1,i.clockwise=!1,i.nowJump=!1,i.touchLeftWall=!0,e.I=i,i.ballPosY=n,i.maxBallPosY=i.ballPosY,i.setBody(o,n,r/2),i.setShape(0,0,r/2,ColorPallet.RED),PhysicsObject.world.on("beginContact",i.collision,i),i}return __extends(e,t),e.prototype.setShape=function(t,e,o,n){var r=Util.setCircle(t,e,o,n,!0);this.compornent.addChild(r),this.shapes.push(r)},e.prototype.setBody=function(t,e,o){this.body=new p2.Body({mass:1,position:[t,e],fixedX:!0}),this.bodyShape=new p2.Circle({radius:o,fixedRotation:!0,sensor:!0,collisionGroup:GraphicShape.CIECLE,collisionMask:GraphicShape.BLOCK}),this.body.addShape(this.bodyShape),PhysicsObject.world.addBody(this.body)},e.prototype.setLine=function(t,e,o,n,r,i){var a=Util.setLine(t,e,o,n,r,i);this.compornent.addChild(a),this.shapes.push(a)},e.prototype.checkJump=function(){return this.body.velocity[1]<0?(this.nowJump=!0,void(this.bodyShape.sensor=!0)):void(this.nowJump=!1)},e.prototype.collision=function(t){var e=this,o=t.bodyA,n=t.shapeA,r=t.bodyB,i=t.shapeB;this.nowJump||(n.collisionGroup==GraphicShape.BLOCK||i.collisionGroup==GraphicShape.BLOCK)&&CreateGameScene.block.forEach(function(t){return t.body==o||t.body==r?(e.jump(),Score.addScore(),CreateGameScene.I.changeBlockWidth(),CreateGameScene.I.changeMaxSubStep(),void CreateGameScene.freshArray()):void 0})},e.prototype.fixedUpdate=function(){this.updateDrowShape(),this.checkJump(),this.maxBallPosY>this.compornent.y&&(this.maxBallPosY=this.compornent.y,Camera2D.y=this.ballPosY-this.compornent.y,Camera2D.transform(GameStage.display)),this.checkGameOver()},e.prototype.checkGameOver=function(){this.maxBallPosY-this.compornent.y<.54*-Game.height&&0==GameOver.gameOverFlag&&new GameOver(0,0,0,0)},e.prototype.jump=function(){this.nowJump=!0;var t=12e3;this.body.applyForce([0,-t],[0,0]),!this.nowJump},e.prototype.addDestroyPhysicsMethod=function(){PhysicsObject.world.off("beginContact",this.collision)},e.prototype.getStart=function(){return this.start},e.prototype.setStart=function(t){this.start=t},e.prototype.getPosX=function(){return this.body.position[0]},e.prototype.setPosX=function(t){this.body.position[0]=t},e.prototype.getMaxBallPosY=function(){return this.maxBallPosY},e.I=null,e}(PhysicsObject);__reflect(Player.prototype,"Player");var Camera2D=function(){function t(){}return t.initial=function(){t.x=0,t.y=0,t.scale=1},t.transform=function(e,o){void 0===o&&(o=1),e.x=t.transX(e.x),e.y=t.transY(e.y),e.scaleX=e.scaleY=t.scale*o},t.transX=function(e){return t.x*t.scale},t.transY=function(e){return t.y*t.scale},t.x=0,t.y=0,t.scale=1,t}();__reflect(Camera2D.prototype,"Camera2D");var CreateGameScene=function(t){function e(){var o=t.call(this)||this;return o.setInitialBlock=!1,o.limitMaxSubStep=40,e.I=o,e.createBlockPosY=.7*Game.height,o.blockWidth=.4*Game.width,o.blockHeight=.04*Game.width,o.blockInterval=.4*Game.height,e.block=[],o.initialBlock(),o}return __extends(e,t),e.prototype.initialBlock=function(){new Block(Game.width/2,e.createBlockPosY,Game.width,this.blockHeight);for(var t=0;5>t;t++)if(Player.I.compornent.y-e.createBlockPosY<1.5*Game.height){var o=Util.randomInt(.1*Game.width,.9*Game.width),n=e.createBlockPosY-this.blockInterval;e.createBlockPosY-=this.blockInterval,new Block(o,n,this.blockWidth,this.blockHeight)}this.setInitialBlock=!0},e.prototype.createBlock=function(){if(this.setInitialBlock&&Player.I.compornent.y-e.createBlockPosY<1.5*Game.height){var t=this.blockInterval,o=Util.randomInt(.12*Game.width,.86*Game.width),n=e.createBlockPosY-t;e.createBlockPosY-=t,new Block(o,n,this.blockWidth,this.blockHeight)}},e.prototype.changeBlockWidth=function(){this.blockWidth!=Player.I.compornent.width&&Score.score%10==0&&(this.blockWidth<Player.I.compornent.width?this.blockWidth=Player.I.compornent.width:this.blockWidth-=20)},e.prototype.changeMaxSubStep=function(){PhysicsObject.maxSubStep!=this.limitMaxSubStep&&Score.score%10==0&&(PhysicsObject.maxSubStep>=this.limitMaxSubStep?PhysicsObject.maxSubStep=this.limitMaxSubStep:PhysicsObject.maxSubStep+=1)},e.freshArray=function(){var t=e.block.filter(function(t){return t.destroyFlag!==!0});e.block=t},e.prototype.updateContent=function(){this.createBlock()},e.prototype.getBlockInterval=function(){return this.blockInterval},e.I=null,e.block=[],e.createBlockPosY=0,e}(GameObject);__reflect(CreateGameScene.prototype,"CreateGameScene");var GameOver=function(t){function e(o,n,r,i){var a=t.call(this,o,n,r,i)||this;return a.textGameOver=null,a.textScore=null,a.textColor=ColorPallet.ORANGE,e.gameOverFlag=!0,a.textGameOver=Util.myText(Game.width/2,Game.height/2-50,"GAME OVER",80,1,a.textColor,!0),a.textGameOver.anchorOffsetX=a.textGameOver.width/2,a.textGameOver.anchorOffsetY=a.textGameOver.height/2,a.compornent.addChild(a.textGameOver),a.textScore=Util.myText(Game.width/2,Game.height/2+50,"SCORE : "+Score.score,80,1,a.textColor,!0),a.textScore.anchorOffsetX=a.textScore.width/2,a.textScore.anchorOffsetY=a.textScore.height/2,a.compornent.addChild(a.textScore),UILayer.display.once(egret.TouchEvent.TOUCH_BEGIN,function(t){return a.tap(t)},a),Score.I.saveBestScore(),a}return __extends(e,t),e.prototype.addDestroyMethod=function(){this.compornent&&this.compornent.removeChildren(),this.textGameOver=null,this.textScore=null},e.prototype.updateContent=function(){},e.prototype.tap=function(t){UILayer.I.remove(),GameObject.transit=Game.init},e.gameOverFlag=!1,e}(UICompornent);__reflect(GameOver.prototype,"GameOver");var Block=function(t){function e(e,o,n,r){var i=t.call(this,e,o,n,r)||this;return i.setBody(e,o,n,r),i.setShape(0,0,n,r,ColorPallet.BLUE),CreateGameScene.block.push(i),i}return __extends(e,t),e.prototype.setBody=function(t,e,o,n){this.body=new p2.Body({mass:1,position:[t,e],type:p2.Body.STATIC}),this.bodyShape=new p2.Box({width:o,height:n,fixedRotation:!0,collisionGroup:GraphicShape.BLOCK,collisionMask:GraphicShape.CIECLE}),this.body.addShape(this.bodyShape),PhysicsObject.world.addBody(this.body)},e.prototype.setShape=function(t,e,o,n,r){var i=Util.setRect(t,e,o,n,r,0,!0);this.compornent.addChild(i),this.shapes.push(i),this.compornent.anchorOffsetX+=o/2,this.compornent.anchorOffsetY+=n/2},e.prototype.fixedUpdate=function(){this.compornent.y>Player.I.compornent.y+.44*Game.height&&this.destroy()},e}(PhysicsObject);__reflect(Block.prototype,"Block");var SaveData=function(){function t(){}return t.setObject=function(){t.object={gameName:t.gameName,playerID:t.playerID,gameID:t.gameID,registrationDate:CheckDate.registrationDate,lastDate:CheckDate.lastDate,bestScore:Score.bestScore}},t.save=function(){t.object.gameName=t.gameName,t.object.playerID=t.playerID,t.object.gameID=t.gameID,t.object.registrationDate=CheckDate.registrationDate,t.object.lastDate=CheckDate.lastDate,t.object.bestScore=Score.bestScore,Util.saveJSONLocalStrage(t.gameID,t.object),t.test()},t.load=function(){t.object=Util.loadJSONLocalStrage(t.gameID),t.test()},t.deleteData=function(){console.log("データを消去します"),t.object=null,CheckDate.registrationDate=null,Util.clearLocalStrage(t.gameID)},t.testUser=function(){t.deletePlayerID(),t.deleteGameID(),t.deleteData(),t.getPlayerID(),t.getGameID(),t.load(),t.save()},t.init=function(){t.getPlayerID(),t.getGameID(),t.load()},t.getPlayerID=function(){t.playerID=Util.loadStringLocalStrage("playerID"),null==t.playerID&&(console.log("playerIDがありません"),t.setPlayerID())},t.setPlayerID=function(){console.log("playerIDを新規作成"),CheckDate.deleteDate(),CheckDate.getDate(),t.playerID=CheckDate.registrationDate.toString(),Util.saveStringLocalStrage("playerID",t.playerID),console.log("playerIDを作成しました")},t.deletePlayerID=function(){console.log("playerIDを削除します"),Util.clearLocalStrage("playerID")},t.getGameID=function(){t.gameID=t.gameName+t.playerID.toString()},t.setGameID=function(){console.log("gameIDを作成します"),t.gameID=t.gameName+t.playerID.toString()},t.deleteGameID=function(){console.log("gameIDを消去します"),t.gameID=null,Util.clearLocalStrage(t.gameID)},t.test=function(){console.log(t.object)},t.object=null,t.gameName="High_Speed_Jump_Ball",t.playerID=null,t.gameID=null,t}();__reflect(SaveData.prototype,"SaveData");var Util=function(){function t(){}return t.init=function(t){this.height=t.stage.stageHeight,this.width=t.stage.stageWidth,this.ui=t},t.random=function(t,e){return t+Math.random()*(e-t)},t.randomInt=function(t,e){return Math.floor(t+Math.random()*(e+.999-t))},t.clamp=function(t,e,o){return e>t&&(t=e),t>o&&(t=o),t},t.color=function(t,e,o){var n=t.toFixed(0),r=e.toFixed(0),i=o.toFixed(0);n=t.toString(16),r=e.toString(16),i=o.toString(16),n=("00"+n).slice(-2),r=("00"+r).slice(-2),i=("00"+i).slice(-2);var a=parseInt("0x"+n+r+i,16);return a},t.myText=function(t,e,o,n,r,i,a){var s=new eui.Label;return s.scaleX=r,s.scaleY=r,s.bold=a,s.size=n,s.text=o,s.textColor=i,s.x=t,s.y=e,s.multiline=!0,s},t.myStrokeText=function(t,e,o,n,r,i,a,s,c){var l=new eui.Label;return l.x=t,l.y=e,l.scaleX=r,l.scaleY=r,l.textFlow=[{text:o,style:{textColor:i,size:n,fontFamily:a,strokeColor:s,stroke:c}}],l},t.saveLocalStrage=function(t,e){window.localStorage.setItem(t,e.toString())},t.loadLocalStrage=function(t,e){var o=window.localStorage.getItem(t);null==o&&(o=e.toString(),window.localStorage.setItem(t,o.toString()));var n=parseInt(o);return n},t.saveStringLocalStrage=function(t,e){window.localStorage.setItem(t,e)},t.loadStringLocalStrage=function(t){var e=window.localStorage.getItem(t),o=e;return o},t.clearLocalStrage=function(t){t&&window.localStorage.removeItem(t)},t.saveJSONLocalStrage=function(t,e){var o=JSON.stringify(e);window.localStorage.setItem(t,o)},t.loadJSONLocalStrage=function(t){var e=window.localStorage.getItem(t);null==e&&(SaveData.setObject(),e=JSON.stringify(SaveData.object),window.localStorage.setItem(t,e));var o=JSON.parse(e);return o},t.setRect=function(t,e,o,n,r,i,a,s){var c=new egret.Shape;return c.x=t,c.y=e,a?(c.graphics.beginFill(r),c.graphics.drawRoundRect(0,0,o,n,i),c.graphics.endFill()):(c.graphics.lineStyle(s,r),c.graphics.drawRoundRect(0,0,o,n,i)),c},t.setCircle=function(t,e,o,n,r,i){var a=new egret.Shape;return a.x=t,a.y=e,r?(a.graphics.beginFill(n),a.graphics.drawCircle(0,0,o),a.graphics.endFill()):(a.graphics.lineStyle(i,n),a.graphics.drawCircle(0,0,o)),a},t.setEllipse=function(t,e,o,n,r,i,a){var s=new egret.Shape;return s.x=t,s.y=e,i?(s.graphics.beginFill(r),s.graphics.drawEllipse(0,0,o,n),s.graphics.endFill()):(s.graphics.lineStyle(a,r),s.graphics.drawEllipse(0,0,o,n)),s},t.setLine=function(t,e,o,n,r,i){var a=(360-n)*Math.PI/180,s=new egret.Shape;return s.x=t,s.y=e,s.graphics.lineStyle(r,i),s.graphics.moveTo(t,e),s.graphics.lineTo(o*Math.cos(a),o*Math.sin(a)),s},t.remove=function(t,e){t&&e&&t.removeChild(e),e=null},t.vector=function(t,e,o,n){var r=(360-e)*Math.PI/180,i=[];return void 0==o&&void 0==n?(i[0]=t*Math.cos(r),i[1]=t*Math.sin(r)):(i[0]=t*Math.cos(r)-o,i[1]=t*Math.sin(r)-n),i[2]=t,i},t.cross=function(t,e){var o=t[0]*e[1]-t[1]*e[0];return o},t.dot=function(t,e){var o=t[0]*e[0]+t[1]*e[1];return o},t.cos=function(e,o){var n=Math.sqrt(Math.pow(e[0],2)+Math.pow(e[1],2)),r=Math.sqrt(Math.pow(o[0],2)+Math.pow(o[1],2));0>n&&(n*=-1),0>r&&(r*=-1);var i=t.dot(e,o)/(n*r);return i},t.sin=function(e,o){var n=Math.sqrt(Math.pow(e[0],2)+Math.pow(e[1],2)),r=Math.sqrt(Math.pow(o[0],2)+Math.pow(o[1],2));0>n&&(n*=-1),0>r&&(r*=-1);var i=t.cross(e,o)/(n*r);return i},t.size=function(t){var e=Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2));return e},t}();__reflect(Util.prototype,"Util");var CheckDate=function(){function t(){}return t.init=function(){t.getDate()},t.getDate=function(){!function(){var e=window.localStorage.getItem("registrationDate");(null==e||void 0==e)&&(e=(new Date).getTime().toString(),window.localStorage.setItem("registrationDate",e)),t.registrationDate=parseInt(e)}(),function(){var e=new Date;t.lastDate=e.getTime(),t.lastDate=parseInt(t.lastDate.toString())}()},t.save=function(){SaveData.object.registrationDate=t.registrationDate,SaveData.object.lastDate=t.lastDate,SaveData.save()},t.deleteDate=function(){t.registrationDate=null,t.lastDate=null,Util.clearLocalStrage("registrationDate")},t.I=null,t.registrationDate=null,t.lastDate=null,t}();__reflect(CheckDate.prototype,"CheckDate");var Description=function(t){function e(o,n,r,i,a){var s=t.call(this,o,n,r,i)||this;return s.text=null,s.textBest=null,s.textColor=0,e.I=s,s.textColor=a,Score.bestScore=SaveData.object.bestScore,s.setText(),s}return __extends(e,t),e.prototype.setText=function(){this.text=Util.myText(Game.width/2,Game.height/2.22,"スワイプでスタート\n\n\n← ← ←         　  → → →",80,.5,this.textColor,!0),this.text.anchorOffsetX=this.text.width/2,this.text.anchorOffsetY=this.text.height/2,this.text.textAlign=egret.HorizontalAlign.CENTER,this.compornent.addChild(this.text)},e.prototype.addDestroyMethod=function(){this.compornent&&this.compornent.removeChildren(),this.text=null},e.prototype.updateContent=function(){},e.I=null,e}(UICompornent);__reflect(Description.prototype,"Description");var GameStage=function(t){function e(){var o=t.call(this)||this;return o.setContainer(),e.index=GameObject.display.getChildIndex(e.display),o}return __extends(e,t),e.prototype.setContainer=function(){e.display=new egret.DisplayObjectContainer,GameObject.display.addChild(e.display)},e.prototype.addDestroyMethod=function(){e.display&&(e.display.removeChildren(),GameObject.display.removeChild(e.display),e.display=null)},e.prototype.updateContent=function(){},e.display=null,e}(GameObject);__reflect(GameStage.prototype,"GameStage");var Score=function(t){function e(o,n,r,i,a){var s=t.call(this,o,n,r,i)||this;return s.text=null,s.textBest=null,s.textColor=0,e.I=s,e.score=0,e.bestScore=0,s.textColor=a,e.bestScore=SaveData.object.bestScore,s.setText(),s}return __extends(e,t),e.prototype.setText=function(){this.text=Util.myText(0,0,"SCORE : 0",80,.5,this.textColor,!0),this.compornent.addChild(this.text),this.textBest=Util.myText(0,50,"BEST : "+e.bestScore.toString(),80,.5,this.textColor,!0),e.bestScore=SaveData.object.bestScore,this.textBest.text="BEST : "+e.bestScore.toString(),this.compornent.addChild(this.textBest)},e.prototype.saveBestScore=function(){e.bestScore>SaveData.object.bestScore&&(SaveData.object.bestScore=e.bestScore,SaveData.save())},e.prototype.addDestroyMethod=function(){this.compornent&&(this.compornent.removeChildren(),this.compornent=null),this.text=null,this.textBest=null,e.score=0},e.prototype.updateContent=function(){this.text.text="SCORE : "+e.score.toFixed(),e.bestScore<e.score&&(e.bestScore=e.score,this.textBest.text="BEST : "+e.bestScore.toFixed())},e.addScore=function(){e.score+=1},e.I=null,e.score=0,e.bestScore=0,e}(UICompornent);__reflect(Score.prototype,"Score");var UILayer=function(){function t(){this.pushPos=0,this.releasePos=0,this.initialBallPos=0,t.I=this,this.setContainer(),t.index=GameObject.display.getChildIndex(t.display),t.display.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.push,this),t.display.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.move,this),t.display.addEventListener(egret.TouchEvent.TOUCH_END,this.end,this)}return t.prototype.setContainer=function(){t.display=new eui.UILayer,GameObject.display.addChild(t.display)},t.prototype.push=function(e){t.onTouch=!0,this.initialBallPos=Player.I.getPosX(),this.pushPos=e.stageX},t.prototype.move=function(e){Player.I.getStart()||this.deleteDescription(),t.onTouch=!0,this.releasePos=e.stageX;var o=this.releasePos-this.pushPos+this.initialBallPos;Player.I.setPosX(o)},t.prototype.end=function(){t.onTouch=!1,this.pushPos=0,this.releasePos=0},t.prototype.deleteDescription=function(){Description.I.destroy(),PhysicsObject.world.gravity=[0,9.8],Player.I.setStart(!0)},t.prototype.remove=function(){t.display&&(t.display.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.push,this),t.display.removeEventListener(egret.TouchEvent.TOUCH_END,this.end,this),t.display.removeChildren(),GameObject.display.removeChild(t.display),t.display=null)},t.I=null,t.display=null,t.onTouch=!1,t}();__reflect(UILayer.prototype,"UILayer");