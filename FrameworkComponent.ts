/*================================================================
 * Description 自定义组件基类
 * Email huliuworld@yahoo.com
 * Created on Sun Mar 17 2019 16:46:2
 * Copyright (c) 2019 刘虎
================================================================*/

import { NotificationCenter } from "./NotificationCenter";
import { Utils } from "./Utils";
import { SpriteManager } from "./SpriteManager"
import { SceneManager, ChangeSceneResult } from "./SceneManager";
import { SoundManager } from "./SoundManager";
import { FrameworkBehavior } from "./FrameworkBehavior";

const { ccclass, property } = cc._decorator;

@ccclass
export class FrameworkComponent extends cc.Component {

    /**
     * 绑定函数
     *
     * @protected
     * @template A
     * @param {new() => A} Behavior
     * @memberof FrameworkComponent
     */
    protected bindBehavior<A extends FrameworkBehavior>(Behavior: new() => A) {
        let behavior: FrameworkBehavior = new Behavior();
        behavior.autoBindFunction(this);
    }

    /**
     * 监听指定事件
     *
     * @protected
     * @param {string} event
     * @param {(res?: any) => void} cb
     * @param {*} [target]
     * @memberof FrameworkComponent
     */
    protected listen(event: string, cb: (res?: any) => void, target?: any): void {
        NotificationCenter.getInstance().listen(event, cb, target);
    }

    /**
     * 派发指定事件
     *
     * @protected
     * @param {string} event
     * @param {*} [params]
     * @memberof FrameworkComponent
     */
    protected trigger(event: string, params?: any): void {
        NotificationCenter.getInstance().trigger(event, params);
    }

    /**
     * 取消指定事件的监听
     *
     * @protected
     * @param {string} event
     * @param {(res?: any) => void} cb
     * @param {*} [target]
     * @memberof FrameworkComponent
     */
    protected ignore(event: string, cb: (res?: any) => void, target?: any): void {
        NotificationCenter.getInstance().ignore(event, cb, target);
    }

    /**
     * 取消指定对象的所有监听事件
     *
     * @protected
     * @param {*} target
     * @memberof FrameworkComponent
     */
    protected ignoreAllTarget(target: any): void {
        NotificationCenter.getInstance().ignoreAllTarget(target);
    }

    /**
     * 为指定node节点上的cc.Sprites组建设置图片
     *
     * @protected
     * @param {cc.Node} node
     * @param {string} url
     * @memberof FrameworkComponent
     */
    protected setSpriteFrameForNode(node: cc.Node, url: string): void {
        SpriteManager.getInstance().setSpriteFrameForNode(node, url);
    }

    /**
     * 为cc.Sprite设置图片
     *
     * @protected
     * @param {cc.Sprite} sprite
     * @param {string} url
     * @memberof FrameworkComponent
     */
    protected setSpriteFrameForSprite(sprite: cc.Sprite, url: string): void {
        SpriteManager.getInstance().setSpriteFrameForSprite(sprite, url);
    }

    /**
     * 切换场景
     *
     * @protected
     * @param {string} from
     * @param {string} to
     * @param {() => void} [onBeforeLoadScene]
     * @param {() => void} [onLaunched]
     * @param {(res: ChangeSceneResult) => void} [fail]
     * @param {(completed: number, total: number, item: any) => void} [progress]
     * @memberof FrameworkComponent
     */
    protected changeScene(from: string, to: string, onBeforeLoadScene?: () => void, onLaunched?: () => void, fail?: (res: ChangeSceneResult) => void, progress?: (completed: number, total: number, item: any) => void) {
        SceneManager.getInstance().changeScene(from, to, onBeforeLoadScene, onLaunched, fail, progress);
    }
    
    /**
     * 深度优先搜索子节点
     *
     * @protected
     * @param {cc.Node} parent
     * @param {string} childName
     * @returns {(cc.Node | null)}
     * @memberof FrameworkComponent
     */
    protected searchNode(parent: cc.Node, childName: string): cc.Node | null {
        return Utils.searchNode(parent, childName);
    }

    /**
     * 深度拷贝一个对象
     *
     * @protected
     * @param {*} obj
     * @returns {*}
     * @memberof FrameworkComponent
     */
    protected deepCopy(obj: any): any {
        return Utils.deepCopy(obj);
    }

    /**
     * 调试日志输出
     *
     * @protected
     * @param {string} tag
     * @param {*} msg
     * @memberof FrameworkComponent
     */
    protected LOGD(tag: string, msg: any): void {
        Utils.LOGD(tag, msg);
    }

    /**
     * 警告日志输出
     *
     * @protected
     * @param {string} tag
     * @param {*} msg
     * @memberof FrameworkComponent
     */
    protected LOGW(tag: string, msg: any): void {
        Utils.LOGW(tag, msg);
    }

    /**
     * 出错日志输出
     *
     * @protected
     * @param {string} tag
     * @param {*} msg
     * @memberof FrameworkComponent
     */
    protected LOGE(tag: string, msg: any): void {
        Utils.LOGE(tag, msg);
    }

    /**
     * 播放音效
     *
     * @protected
     * @param {string} url
     * @memberof FrameworkComponent
     */
    protected playEffect(url: string): void {
        SoundManager.getInstance().playEffectSound(url);
    }

    /**
     * 播放背景音效
     *
     * @protected
     * @param {string} url
     * @param {boolean} [loop=true]
     * @memberof FrameworkComponent
     */
    protected playMusic(url: string, loop: boolean = true): void {
        SoundManager.getInstance().playMusic(url, loop);
    }
}


