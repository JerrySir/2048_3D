(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Fish.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '15031P3T7FM3ZIyMbaxUoAx', 'Fish', __filename);
// Script/Fish.ts

"use strict";
// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
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
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.text = 'hello';
        _this._waterNode = null;
        _this._runloopAction = null;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    NewClass.prototype.onLoad = function () {
        this._waterNode = this.node.parent;
        cc.systemEvent.on('FishJump', function () {
            this.node.stopAction(this._runloopAction);
            // 跳跃上升
            var jumpUp = cc.moveBy(0.2, cc.v2(0, 30)).easing(cc.easeCubicActionOut());
            // 下落
            var jumpDown = cc.moveBy(0.1, cc.v2(0, -30)).easing(cc.easeCubicActionIn());
            this.node.runAction(cc.sequence(cc.delayTime(Math.random() * 1), jumpUp, jumpDown, cc.callFunc(function () {
                this.refreshPosition();
            }.bind(this))));
        }.bind(this));
    };
    NewClass.prototype.start = function () {
        this.refreshPosition();
    };
    NewClass.prototype.refreshPosition = function () {
        var newPosition = this.getRandomPosition();
        var scaleAction = cc.scaleTo(0.3, this.node.x > newPosition.x ? 1 : -1, 1);
        var temp = this.node.position.sub(newPosition);
        var degree = this.getDegree(temp);
        var rotationAction = cc.rotateTo(0.2, this.node.x < newPosition.x ? degree : degree);
        var randomTime = Math.random() * 3;
        this.node.runAction(cc.sequence(scaleAction, rotationAction, cc.moveTo(randomTime + 2, newPosition).easing(cc.easeQuadraticActionOut()), cc.delayTime(randomTime + 1), cc.callFunc(function () {
            this.refreshPosition();
        }.bind(this))));
    };
    NewClass.prototype.getRandomPosition = function () {
        var waterPosition = this._waterNode.convertToNodeSpaceAR(cc.v2(0));
        // Fish的直径为80
        var randomPosition = cc.v2({ x: waterPosition.x + Math.random() * (this._waterNode.width - 80) + 40, y: waterPosition.y + Math.random() * (this._waterNode.height - 80) + 40 });
        return randomPosition;
    };
    NewClass.prototype.getDegree = function (vector) {
        var degree = Math.atan(vector.y / vector.x) / Math.PI * 180;
        if (vector.x >= 0) {
            if (vector.y < 0) {
                degree += 360;
            }
        }
        else {
            if (vector.y > 0) {
                // degree += 180;
            }
            else {
                // degree += 180;
            }
        }
        return degree;
    };
    NewClass.prototype.onDestroy = function () {
        this.node.stopAction(this._runloopAction);
        cc.systemEvent.off('FishJump');
    };
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "label", void 0);
    __decorate([
        property
    ], NewClass.prototype, "text", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

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
        //# sourceMappingURL=Fish.js.map
        