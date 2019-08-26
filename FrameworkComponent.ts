/*================================================================
 * Description 自定义组件基类
 * Email huliuworld@yahoo.com
 * Created on Sun Mar 17 2019 16:46:2
 * Copyright (c) 2019 刘虎
================================================================*/

import { NotificationCenter } from "./NotificationCenter";
import { Utils } from "./Utils";
import { SpriteManager } from "./SpriteManager"
import { SceneManager } from "./SceneManager";

const { ccclass, property } = cc._decorator;

@ccclass
export class FrameworkComponent extends cc.Component {

    /**
     * 监听指定事件
     * @param event 
     * @param cb 
     * @param target 
     */
    protected listen(event: string, cb: (res?: any) => void, target?: any): void {
        NotificationCenter.getInstance().listen(event, cb, target);
    }

    /**
     * 派发指定事件
     * @param event 
     * @param params 
     */
    protected trigger(event: string, params?: any): void {
        NotificationCenter.getInstance().trigger(event, params);
    }

    /**
     * 取消指定事件的监听
     * @param event 
     * @param cb 
     * @param target 
     */
    protected ignore(event: string, cb: (res?: any) => void, target?: any): void {
        NotificationCenter.getInstance().ignore(event, cb, target);
    }

    /**
     * 取消指定对象的所有监听事件
     * @param target 
     */
    protected ignoreAllTarget(target: any): void {
        NotificationCenter.getInstance().ignoreAllTarget(target);
    }

    /**
     * 为指定node节点上的cc.Sprites组建设置图片
     * @param node 
     * @param url 
     */
    protected setSpriteFrameForNode(node: cc.Node, url: string): void {
        SpriteManager.getInstance().setSpriteFrameForNode(node, url);
    }

    /**
     * 为cc.Sprite设置图片
     * @param sprite 
     * @param url 
     */
    protected setSpriteFrameForSprite(sprite: cc.Sprite, url: string): void {
        SpriteManager.getInstance().setSpriteFrameForSprite(sprite, url);
    }

    /**
     * 切换场景
     * @param from 
     * @param to 
     */
    protected changeScene(from: string, to: string) {
        SceneManager.getInstance().changeScene(from, to);
    }
    
    /**
     * 深度优先搜索子节点
     * @param parent 
     * @param childName 
     */
    protected searchNode(parent: cc.Node, childName: string): cc.Node | null {
        return Utils.searchNode(parent, childName);
    }

    /**
     * 深度拷贝一个对象
     * @param obj 
     */
    protected deepCopy(obj: any): any {
        return Utils.deepCopy(obj);
    }

    /**
     * 调试日志输出
     * @param tag 
     * @param msg 
     */
    protected LOGD(tag: string, msg: any): void {
        Utils.LOGD(tag, msg);
    }

    /**
     * 警告日志输出
     * @param tag 
     * @param msg 
     */
    protected LOGW(tag: string, msg: any): void {
        Utils.LOGW(tag, msg);
    }

    /**
     * 出错日志输出
     * @param tag 
     * @param msg 
     */
    protected LOGE(tag: string, msg: any): void {
        Utils.LOGE(tag, msg);
    }

    /**
     * 播放音效
     * @param url 
     */
    protected playEffect(url: string): void {
        Utils.playEffectSound(url);
    }

    /**
     * 播放背景音效
     * @param url 
     */
    protected playMusic(url: string): void {
        Utils.playMusic(url);
    }
}


