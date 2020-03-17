const {ccclass, property} = cc._decorator;

import DefaultBall from './DefaultBall'

const level: number[] = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024];

@ccclass
export default class Helloworld extends cc.Component {

    @property(cc.Node)
    gameBox: cc.Node = null;

    @property(cc.Prefab)
    defaultBall: cc.Prefab = null;

    // 鱼塘 --- Start ---
    @property({type: cc.Node, displayName: "鱼塘Node"})
    water: cc.Node = null;

    @property({type: cc.Prefab, displayName: "鱼的Prefab"})
    fishPrefab: cc.Prefab = null;

    @property({type: cc.SpriteAtlas, displayName: "鱼的资源图片"})
    fishAtlas: cc.SpriteAtlas = null;
    // 鱼塘 --- End ---

    @property({type: [cc.AudioClip], displayName: "BGM"})
    bgmList: [cc.AudioClip] = [null];

    _touchDownState: boolean = false;
    _touchDownEvent: any = null;

    _gameBoxLife_Y: number = 0;

    _nextBall: cc.Node = null;
    _lastTouchPosition: cc.Vec2 = null;

    _ballIndex: number = 0;
    
    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        // cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        //     cc.PhysicsManager.DrawBits.e_jointBit |
        //     cc.PhysicsManager.DrawBits.e_shapeBit;
        cc.director.getPhysicsManager().gravity = cc.v2(0, -640);

        // 球顶部位置
        const _gameBoxWidth = this.gameBox.width;
        const _gameBoxHeight = this.gameBox.height;
        this._gameBoxLife_Y = this.gameBox.convertToNodeSpaceAR(cc.v2(0)).y + _gameBoxHeight * (4/5);

        // this._lastTouchPosition = cc.v2(this.gameBox.convertToNodeSpaceAR(cc.v2(0)).x + cc.view.getCanvasSize().width / 2, this._gameBoxLife_Y);

        // 生成第一个球/读档上一次退出时的球
        this.makeDefaultBall();
    }

    start () {
        this.gameBox.on(cc.Node.EventType.TOUCH_MOVE, function(event){
            if (this._nextBall == null) {
                return;
            }
            this.onMoveBall((event.touch as cc.Touch).getDelta());
        }.bind(this));

        // 单次点击
        this.gameBox.on(cc.Node.EventType.TOUCH_END, function(event){
            if (this._nextBall == null) {
                return;
            }
            this.onClick(event)
        }.bind(this));

        this.generateFishes();
    }

    update() {
    }

    makeDefaultBall() {
        const _nextBallNum = level[Math.ceil(Math.random()*level.length-1)];
        this._ballIndex += 1;

        var ball = cc.instantiate(this.defaultBall);
        (ball.getComponent(DefaultBall) as DefaultBall).text = _nextBallNum + '';
        (ball.getComponent(DefaultBall) as DefaultBall).index = this._ballIndex;
        ball.opacity = 0;
        ball.scale = 0.5;
        this.gameBox.addChild(ball);

        var point = this._lastTouchPosition;
        if(point == null) {
            point = cc.v2(0, this._gameBoxLife_Y);
        }
        point.y = this._gameBoxLife_Y;
        ball.setPosition(point);
        // 类型改为Static不可掉落
        (ball.getComponent(cc.RigidBody) as cc.RigidBody).type = cc.RigidBodyType.Static;
        let _scale = 1 + Math.log(_nextBallNum)/Math.log(2)/10.0
        ball.runAction(cc.sequence(cc.spawn(cc.rotateBy(0.5,360), cc.scaleTo(0.5,_scale), cc.fadeIn(0.5)), cc.callFunc(function(){
            this._nextBall = ball;
        }.bind(this))))
    }

    onClick(event) {
        const _startLocation = (event.touch as cc.Touch).getStartLocation();
        const _endLocation = (event.touch as cc.Touch).getLocation();
        // 因为手指滑动的时候增加了加速度,这里需要判断是拖拽后触发还是点击触发
        if (Math.abs(_startLocation.x - _endLocation.x) < 0.2) {
            var point = this.gameBox.convertTouchToNodeSpaceAR(event);
            point.y = this._gameBoxLife_Y;
            this._lastTouchPosition = point;
            this._nextBall.setPosition(point);
        }
        (this._nextBall.getComponent(cc.RigidBody) as cc.RigidBody).type = cc.RigidBodyType.Dynamic;

        this._nextBall = null;
        // 生成下一个球
        setTimeout(function() {
            this.makeDefaultBall();
        }.bind(this), 500);
    }

    onMoveBall(delta: cc.Vec2) {
        const _nextBallPosition = this._nextBall.position;
        // 拖拽加速度
        const _position = cc.v2(_nextBallPosition.x + (delta.x * 1.5), _nextBallPosition.y)
        // 边界检查
        if (_position.x < this.gameBox.convertToNodeSpaceAR(cc.v2(0)).x + this._nextBall.width/2) {
            _position.x = this.gameBox.convertToNodeSpaceAR(cc.v2(0)).x + this._nextBall.width/2;
        }
        if (_position.x > this.gameBox.convertToNodeSpaceAR(cc.v2(0)).x + this.gameBox.width - this._nextBall.width/2) {
            _position.x = this.gameBox.convertToNodeSpaceAR(cc.v2(0)).x + this.gameBox.width - this._nextBall.width/2;
        }
        this._nextBall.setPosition(_position);
        this._lastTouchPosition = _position;
    }

    // 生成鱼儿
    generateFishes() {
        this.fishAtlas.getSpriteFrames().forEach(function(spriteFrameItem) {
            let fish = cc.instantiate(this.fishPrefab);
            fish.getComponent(cc.Sprite).spriteFrame = spriteFrameItem;
            this.water.addChild(fish);
        }.bind(this));
    }
}
