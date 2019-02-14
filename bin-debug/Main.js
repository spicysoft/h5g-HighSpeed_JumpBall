var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
//衝突判定用の列挙
var GraphicShape;
(function (GraphicShape) {
    GraphicShape[GraphicShape["CIECLE"] = Math.pow(2, 0)] = "CIECLE";
    GraphicShape[GraphicShape["BOX"] = Math.pow(2, 1)] = "BOX";
    GraphicShape[GraphicShape["PLANE"] = Math.pow(2, 2)] = "PLANE";
})(GraphicShape || (GraphicShape = {}));
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.addToStage, _this);
        return _this;
    }
    Main.prototype.addToStage = function () {
        GameObject.initial(this.stage);
        CreateGameScene.init();
        egret.startTick(this.tickLoop, this);
    };
    Main.prototype.tickLoop = function (timeStamp) {
        if (timeStamp === void 0) { timeStamp = Main.timeStamp; }
        GameObject.update();
        CreateWorld.worldBegin(timeStamp);
        return false;
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
var CreateGameScene = (function () {
    function CreateGameScene() {
    }
    CreateGameScene.init = function () {
        this.height = egret.MainContext.instance.stage.stageHeight;
        this.width = egret.MainContext.instance.stage.stageWidth;
        /* new メソッドを記入*/
        new CreateWorld();
        new Ball();
        for (var i = 1; i < 10; i++)
            new NormalBox(50 * i + 100, 100 * i + 200, 100, 30);
    };
    return CreateGameScene;
}());
__reflect(CreateGameScene.prototype, "CreateGameScene");
var GameObject = (function () {
    //public static transit:()=>void;
    function GameObject() {
        this.shape = null;
        this.body = null;
        this.bodyShape = null;
        this.world = null;
        GameObject.objects.push(this);
    }
    GameObject.initial = function (displayObjectContainer) {
        GameObject.objects = [];
        GameObject.display = displayObjectContainer;
    };
    GameObject.update = function () {
        GameObject.objects.forEach(function (obj) { return obj.updateContent(); });
    };
    return GameObject;
}());
__reflect(GameObject.prototype, "GameObject");
var CreateWorld = (function (_super) {
    __extends(CreateWorld, _super);
    function CreateWorld() {
        var _this = _super.call(this) || this;
        _this.createWorld();
        _this.createWall();
        return _this;
        //egret.startTick(CreateWorld.worldBegin, this);
    }
    CreateWorld.prototype.createWorld = function () {
        CreateWorld.world = new p2.World();
        CreateWorld.world.sleepMode = p2.World.BODY_SLEEPING;
        CreateWorld.world.gravity = [0, 9.8];
    };
    CreateWorld.prototype.createWall = function () {
        //見えない壁や地面の生成
        for (var i = 0; i < 3; i++) {
            var planeBody = [];
            planeBody[i] = new p2.Body({ fixedRotation: true, type: p2.Body.STATIC });
            var planeShape = [];
            planeShape[i] = new p2.Plane();
            switch (i) {
                //地面
                case 0:
                    planeBody[i].position = [0, CreateGameScene.height];
                    planeBody[i].angle = Math.PI; //rad表記
                    break;
                //右の壁
                case 1:
                    planeBody[i].position = [CreateGameScene.width, CreateGameScene.height];
                    planeBody[i].angle = Math.PI / 2; //rad表記
                    break;
                //左の壁
                case 2:
                    planeBody[i].position = [0, CreateGameScene.height];
                    planeBody[i].angle = 3 * Math.PI / 2; //rad表記
                    break;
            }
            planeBody[i].addShape(planeShape[i]);
            CreateWorld.world.addBody(planeBody[i]);
        }
    };
    CreateWorld.prototype.updateContent = function () {
    };
    CreateWorld.worldBegin = function (dt) {
        CreateWorld.world.step(1 / 60, dt / 1000, 10);
        return false;
    };
    CreateWorld.world = null;
    return CreateWorld;
}(GameObject));
__reflect(CreateWorld.prototype, "CreateWorld");
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball() {
        var _this = _super.call(this) || this;
        _this.radius = 20;
        Ball.I = _this;
        _this.setBody(CreateGameScene.width / 2 * 0.5, 0, _this.radius);
        _this.setShape(_this.radius);
        GameObject.display.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) { return _this.touchMove(e); }, _this);
        return _this;
    }
    Ball.prototype.setBody = function (x, y, radius) {
        this.body = new p2.Body({ mass: 1, position: [x, y] });
        this.bodyShape = new p2.Circle({
            radius: radius, collisionGroup: GraphicShape.CIECLE, collisionMask: GraphicShape.BOX | GraphicShape.PLANE
        });
        this.body.addShape(this.bodyShape);
        CreateWorld.world.addBody(this.body);
    };
    Ball.prototype.setShape = function (radius) {
        if (this.shape) {
            GameObject.display.removeChild(this.shape);
        }
        this.shape = new egret.Shape();
        this.shape.x = this.body.position[0];
        this.shape.y = this.body.position[1];
        this.shape.graphics.beginFill(0xff0000);
        this.shape.graphics.drawCircle(0, 0, radius);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
    };
    Ball.prototype.updateDrowShape = function () {
        this.shape.x = this.body.position[0];
        this.shape.y = this.body.position[1];
        GameObject.display.addChild(this.shape);
    };
    Ball.prototype.updateContent = function () {
        this.updateDrowShape();
    };
    Ball.prototype.touchMove = function (e) {
        if (e.stageX <= this.shape.x) {
            this.body.applyForceLocal([-500, 0], [0, 0]);
        }
        else {
            this.body.applyForceLocal([500, 0], [0, 0]);
        }
    };
    Ball.I = null; // singleton instance
    return Ball;
}(GameObject));
__reflect(Ball.prototype, "Ball");
var Box = (function (_super) {
    __extends(Box, _super);
    function Box(boxPositionX, boxPositionY, boxWidth, boxHeight) {
        var _this = _super.call(this) || this;
        _this.boxPositionX = boxPositionX;
        _this.boxPositionY = boxPositionY;
        _this.boxWidth = boxWidth;
        _this.boxHeight = boxHeight;
        _this.setBody(_this.boxPositionX, _this.boxPositionY, _this.boxWidth, _this.boxHeight);
        _this.setShape(_this.boxWidth, _this.boxHeight);
        CreateWorld.world.on("beginContact", _this.collision, _this);
        return _this;
    }
    Box.prototype.setBody = function (x, y, width, height) {
        //y -= height/2;
        this.body = new p2.Body({ mass: 1, position: [x, y], type: p2.Body.STATIC });
        this.bodyShape = new p2.Box({
            width: width, height: height, collisionGroup: GraphicShape.BOX, collisionMask: GraphicShape.CIECLE | GraphicShape.PLANE
        });
        this.body.addShape(this.bodyShape);
        CreateWorld.world.addBody(this.body);
    };
    Box.prototype.setShape = function (width, height) {
        if (this.shape) {
            GameObject.display.removeChild(this.shape);
        }
        this.shape = new egret.Shape();
        this.shape.anchorOffsetX += width / 2; //p2とEgretは座標軸とアンカー位置が違うので調整
        this.shape.anchorOffsetY += height / 2;
        this.shape.x = this.body.position[0] /*+ width*/;
        this.shape.y = this.body.position[1] /*- height/2*/;
        this.shape.graphics.beginFill(0xff0000);
        this.shape.graphics.drawRect(0, 0, width, height);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
    };
    Box.prototype.updateContent = function () {
    };
    Box.prototype.collision = function (evt) {
        /*
               
                const bodyA: p2.Body = evt.bodyA;
                const bodyB: p2.Body = evt.bodyB;*/
        var shapeA = evt.shapeA;
        var shapeB = evt.shapeB;
        if ((shapeA.collisionGroup == GraphicShape.BOX && shapeB.collisionGroup == GraphicShape.CIECLE)
            || (shapeB.collisionGroup == GraphicShape.BOX && shapeA.collisionGroup == GraphicShape.CIECLE)) {
            Ball.I.body.applyForceLocal([0, -10000], [0, 0]);
        }
    };
    return Box;
}(GameObject));
__reflect(Box.prototype, "Box");
var NormalBox = (function (_super) {
    __extends(NormalBox, _super);
    function NormalBox(boxPositionX, boxPositionY, boxWidth, boxHeight) {
        var _this = _super.call(this, boxPositionX, boxPositionY, boxWidth, boxHeight) || this;
        console.log(_this.boxPositionX);
        return _this;
    }
    return NormalBox;
}(Box));
__reflect(NormalBox.prototype, "NormalBox");
//# sourceMappingURL=Main.js.map