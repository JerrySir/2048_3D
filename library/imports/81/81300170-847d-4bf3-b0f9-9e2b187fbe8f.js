"use strict";
cc._RF.push(module, '81300FwhH1L87D5nisYf76P', 'DefaultBall');
// Script/DefaultBall.ts

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
var DefaultBall = /** @class */ (function (_super) {
    __extends(DefaultBall, _super);
    function DefaultBall() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.hitAudio = null;
        _this.destroyAudio = null;
        _this.text = 'hello';
        _this.index = 0;
        return _this;
        // update (dt) {}
    }
    DefaultBall_1 = DefaultBall;
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    DefaultBall.prototype.start = function () {
    };
    DefaultBall.prototype.onEnable = function () {
        this.label.string = this.text;
        // 播放射出的声音
        cc.audioEngine.play(this.hitAudio, false, 1);
    };
    // 只在两个碰撞体开始接触时被调用一次
    DefaultBall.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        if (otherCollider.node.group === 'Ground') {
            return;
        }
        var selfIndex = selfCollider.node.getComponent(DefaultBall_1).index;
        var otherIndex = otherCollider.node.getComponent(DefaultBall_1).index;
        if (otherIndex > selfIndex) {
            return;
        }
        var selfValue = selfCollider.node.getComponent(DefaultBall_1).text;
        var otherValue = otherCollider.node.getComponent(DefaultBall_1).text;
        cc.log(selfValue);
        cc.log(otherValue);
        if (selfValue === otherValue) {
            otherCollider.node.removeFromParent();
            if (cc.sys.platform === cc.sys.WECHAT_GAME) {
                wx.vibrateShort();
            }
            // 播放消除声音
            cc.audioEngine.play(this.destroyAudio, false, 1);
            var nextValue = +selfValue * 2;
            selfCollider.node.getComponent(DefaultBall_1).setBallValue(nextValue + '');
            if (nextValue >= 2048) {
                selfCollider.node.removeFromParent();
                if (cc.sys.platform === cc.sys.WECHAT_GAME) {
                    wx.vibrateShort();
                }
            }
        }
    };
    DefaultBall.prototype.setBallValue = function (text) {
        this.text = text;
        this.label.string = text;
    };
    var DefaultBall_1;
    __decorate([
        property(cc.Label)
    ], DefaultBall.prototype, "label", void 0);
    __decorate([
        property(cc.AudioClip)
    ], DefaultBall.prototype, "hitAudio", void 0);
    __decorate([
        property(cc.AudioClip)
    ], DefaultBall.prototype, "destroyAudio", void 0);
    DefaultBall = DefaultBall_1 = __decorate([
        ccclass
    ], DefaultBall);
    return DefaultBall;
}(cc.Component));
exports.default = DefaultBall;

cc._RF.pop();