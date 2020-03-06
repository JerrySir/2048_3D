// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class DefaultBall extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.AudioClip)
    hitAudio: cc.AudioClip = null;

    @property(cc.AudioClip)
    destroyAudio: cc.AudioClip = null;

    text: string = 'hello';
    index: number = 0;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
    }

    onEnable() {
        this.label.string = this.text;
        // 播放射出的声音
        cc.audioEngine.play(this.hitAudio, false, 1);
    }

    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact(contact: any, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider) {
        if(otherCollider.node.group === 'Ground') {
            return;
        }
        const selfIndex = (selfCollider.node.getComponent(DefaultBall) as DefaultBall).index;
        const otherIndex = (otherCollider.node.getComponent(DefaultBall) as DefaultBall).index;
        if (otherIndex > selfIndex) {
            return;
        }

        const selfValue = (selfCollider.node.getComponent(DefaultBall) as DefaultBall).text;
        const otherValue = (otherCollider.node.getComponent(DefaultBall) as DefaultBall).text;
        cc.log(selfValue)
        cc.log(otherValue)
        if (selfValue === otherValue) {
            otherCollider.node.removeFromParent();
            if (cc.sys.platform === cc.sys.WECHAT_GAME) {
                wx.vibrateShort();
            }
            // 播放消除声音
            cc.audioEngine.play(this.destroyAudio, false, 1);
            const nextValue = +selfValue * 2;
            (selfCollider.node.getComponent(DefaultBall) as DefaultBall).setBallValue(nextValue +'');
            if (nextValue >= 2048) {
                selfCollider.node.removeFromParent();
                if (cc.sys.platform === cc.sys.WECHAT_GAME) {
                    wx.vibrateShort();
                }
            }
        }
    }

    setBallValue(text: string) {
        this.text = text;
        this.label.string = text;
    }

    // update (dt) {}
}
