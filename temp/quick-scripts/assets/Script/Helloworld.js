(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Helloworld.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e1b90/rohdEk4SdmmEZANaD', 'Helloworld', __filename);
// Script/Helloworld.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DefaultBall_1 = require("./DefaultBall");
var level = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024];
var Helloworld = /** @class */ (function (_super) {
    __extends(Helloworld, _super);
    function Helloworld() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.gameBox = null;
        _this.defaultBall = null;
        // 鱼塘 --- Start ---
        _this.water = null;
        _this.fishPrefab = null;
        _this.fishAtlas = null;
        // 鱼塘 --- End ---
        _this.bgmList = [null];
        _this._touchDownState = false;
        _this._touchDownEvent = null;
        _this._gameBoxLife_Y = 0;
        _this._nextBall = null;
        _this._lastTouchPosition = null;
        _this._ballIndex = 0;
        return _this;
    }
    Helloworld.prototype.onLoad = function () {
        cc.director.getPhysicsManager().enabled = true;
        // cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        //     cc.PhysicsManager.DrawBits.e_jointBit |
        //     cc.PhysicsManager.DrawBits.e_shapeBit;
        cc.director.getPhysicsManager().gravity = cc.v2(0, -640);
        // 球顶部位置
        var _gameBoxWidth = this.gameBox.width;
        var _gameBoxHeight = this.gameBox.height;
        this._gameBoxLife_Y = this.gameBox.convertToNodeSpaceAR(cc.v2(0)).y + _gameBoxHeight * (4 / 5);
        // this._lastTouchPosition = cc.v2(this.gameBox.convertToNodeSpaceAR(cc.v2(0)).x + cc.view.getCanvasSize().width / 2, this._gameBoxLife_Y);
        // 生成第一个球/读档上一次退出时的球
        this.makeDefaultBall();
    };
    Helloworld.prototype.start = function () {
        this.gameBox.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            if (this._nextBall == null) {
                return;
            }
            this.onMoveBall(event.touch.getDelta());
        }.bind(this));
        // 单次点击
        this.gameBox.on(cc.Node.EventType.TOUCH_END, function (event) {
            if (this._nextBall == null) {
                return;
            }
            this.onClick(event);
        }.bind(this));
        this.generateFishes();
    };
    Helloworld.prototype.update = function () {
    };
    Helloworld.prototype.makeDefaultBall = function () {
        var _nextBallNum = level[Math.ceil(Math.random() * level.length - 1)];
        this._ballIndex += 1;
        var ball = cc.instantiate(this.defaultBall);
        ball.getComponent(DefaultBall_1.default).text = _nextBallNum + '';
        ball.getComponent(DefaultBall_1.default).index = this._ballIndex;
        ball.opacity = 0;
        ball.scale = 0.5;
        this.gameBox.addChild(ball);
        var point = this._lastTouchPosition;
        if (point == null) {
            point = cc.v2(0, this._gameBoxLife_Y);
        }
        point.y = this._gameBoxLife_Y;
        ball.setPosition(point);
        // 类型改为Static不可掉落
        ball.getComponent(cc.RigidBody).type = cc.RigidBodyType.Static;
        var _scale = 1 + Math.log(_nextBallNum) / Math.log(2) / 10.0;
        ball.runAction(cc.sequence(cc.spawn(cc.rotateBy(0.5, 360), cc.scaleTo(0.5, _scale), cc.fadeIn(0.5)), cc.callFunc(function () {
            this._nextBall = ball;
        }.bind(this))));
    };
    Helloworld.prototype.onClick = function (event) {
        var _startLocation = event.touch.getStartLocation();
        var _endLocation = event.touch.getLocation();
        // 因为手指滑动的时候增加了加速度,这里需要判断是拖拽后触发还是点击触发
        if (Math.abs(_startLocation.x - _endLocation.x) < 0.2) {
            var point = this.gameBox.convertTouchToNodeSpaceAR(event);
            point.y = this._gameBoxLife_Y;
            this._lastTouchPosition = point;
            this._nextBall.setPosition(point);
        }
        this._nextBall.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic;
        this._nextBall = null;
        // 生成下一个球
        setTimeout(function () {
            this.makeDefaultBall();
        }.bind(this), 500);
    };
    Helloworld.prototype.onMoveBall = function (delta) {
        var _nextBallPosition = this._nextBall.position;
        // 拖拽加速度
        var _position = cc.v2(_nextBallPosition.x + (delta.x * 1.5), _nextBallPosition.y);
        // 边界检查
        if (_position.x < this.gameBox.convertToNodeSpaceAR(cc.v2(0)).x + this._nextBall.width / 2) {
            _position.x = this.gameBox.convertToNodeSpaceAR(cc.v2(0)).x + this._nextBall.width / 2;
        }
        if (_position.x > this.gameBox.convertToNodeSpaceAR(cc.v2(0)).x + this.gameBox.width - this._nextBall.width / 2) {
            _position.x = this.gameBox.convertToNodeSpaceAR(cc.v2(0)).x + this.gameBox.width - this._nextBall.width / 2;
        }
        this._nextBall.setPosition(_position);
        this._lastTouchPosition = _position;
    };
    // 生成鱼儿
    Helloworld.prototype.generateFishes = function () {
        this.fishAtlas.getSpriteFrames().forEach(function (spriteFrameItem) {
            var fish = cc.instantiate(this.fishPrefab);
            fish.getComponent(cc.Sprite).spriteFrame = spriteFrameItem;
            this.water.addChild(fish);
        }.bind(this));
    };
    __decorate([
        property(cc.Node)
    ], Helloworld.prototype, "gameBox", void 0);
    __decorate([
        property(cc.Prefab)
    ], Helloworld.prototype, "defaultBall", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "鱼塘Node" })
    ], Helloworld.prototype, "water", void 0);
    __decorate([
        property({ type: cc.Prefab, displayName: "鱼的Prefab" })
    ], Helloworld.prototype, "fishPrefab", void 0);
    __decorate([
        property({ type: cc.SpriteAtlas, displayName: "鱼的资源图片" })
    ], Helloworld.prototype, "fishAtlas", void 0);
    __decorate([
        property({ type: [cc.AudioClip], displayName: "BGM" })
    ], Helloworld.prototype, "bgmList", void 0);
    Helloworld = __decorate([
        ccclass
    ], Helloworld);
    return Helloworld;
}(cc.Component));
exports.default = Helloworld;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Helloworld.js.map
        