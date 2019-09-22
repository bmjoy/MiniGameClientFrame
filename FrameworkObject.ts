/*================================================================
 * Description 自定义对象基类
 * Email huliuworld@yahoo.com
 * Created on Sat Jul 13 2019 2:50:34
 * Copyright (c) 2019 刘虎
================================================================*/

import { NotificationCenter } from "./NotificationCenter";
import { Utils } from "./Utils";
import { SpriteManager } from "./SpriteManager";
import { SceneManager, ChangeSceneResult } from "./SceneManager";
import { SoundManager } from "./SoundManager";
import { FrameworkBehavior } from "./FrameworkBehavior";

const { ccclass, property } = cc._decorator;

@ccclass
export class FrameworkObject extends cc.Object {

    /**
     * 绑定函数
     * @param Behavior
     */
    public bindBehavior<A extends FrameworkBehavior>(Behavior: new () => A) {
        let behavior: FrameworkBehavior = new Behavior();
        behavior.autoBindFunction(this);
    }

    /**
     * 监听指定事件
     * @param event 
     * @param cb 
     * @param target 
     */
    protected listen(event: string, cb: (res?: any) => void, target?: any): void {
        NotificationCenter.listen(event, cb, target);
    }

    /**
     * 监听指定事件
     * @param event 
     * @param cb 
     * @param target 
     */
    protected static listen(event: string, cb: (res?: any) => void, target?: any): void {
        NotificationCenter.listen(event, cb, target);
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
     * 派发指定事件
     * @param event 
     * @param params 
     */
    protected static trigger(event: string, params?: any): void {
        NotificationCenter.getInstance().trigger(event, params);
    }

    /**
     * 取消指定事件的监听
     * @param event 
     * @param cb 
     * @param target 
     */
    protected ignore(event: string, cb: (res?: any) => void, target?: any): void {
        NotificationCenter.ignore(event, cb, target);
    }

    /**
     * 取消指定事件的监听
     * @param event 
     * @param cb 
     * @param target 
     */
    protected static ignore(event: string, cb: (res?: any) => void, target?: any): void {
        NotificationCenter.ignore(event, cb, target);
    }

    /**
     * 取消指定对象的所有监听事件
     * @param target 
     */
    protected ignoreAllTarget(target: any): void {
        NotificationCenter.ignoreAllTarget(target);
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
     * 为指定node节点上的cc.Sprites组建设置图片
     * @param node 
     * @param url 
     */
    protected static setSpriteFrameForNode(node: cc.Node, url: string): void {
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
     * 为cc.Sprite设置图片
     * @param sprite 
     * @param url 
     */
    protected static setSpriteFrameForSprite(sprite: cc.Sprite, url: string): void {
        SpriteManager.getInstance().setSpriteFrameForSprite(sprite, url);
    }

    /**
     * 切换场景
     * @param from 
     * @param to 
     * @param onBeforeLoadScene 
     * @param onLaunched 
     * @param fail 
     * @param progress 
     */
    protected changeScene(from: string, to: string, onBeforeLoadScene?: () => void, onLaunched?: () => void, fail?: (res: ChangeSceneResult) => void, progress?: (completed: number, total: number, item: any) => void) {
        SceneManager.getInstance().changeScene(from, to, onBeforeLoadScene, onLaunched, fail, progress);
    }

    /**
     * 切换场景
     * @param from 
     * @param to 
     * @param onBeforeLoadScene 
     * @param onLaunched 
     * @param fail 
     * @param progress 
     */
    protected static changeScene(from: string, to: string, onBeforeLoadScene?: () => void, onLaunched?: () => void, fail?: (res: ChangeSceneResult) => void, progress?: (completed: number, total: number, item: any) => void) {
        SceneManager.getInstance().changeScene(from, to, onBeforeLoadScene, onLaunched, fail, progress);
    }

    /**
     * 深度拷贝一个对象
     * @param obj 
     */
    protected deepCopy(obj: any): any {
        return Utils.deepCopy(obj);
    }

    /**
     * 深度拷贝一个对象
     * @param obj 
     */
    protected static deepCopy(obj: any): any {
        return Utils.deepCopy(obj);
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
     * 深度优先搜索子节点
     * @param parent 
     * @param childName 
     */
    protected static searchNode(parent: cc.Node, childName: string): cc.Node | null {
        return Utils.searchNode(parent, childName);
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
     * 调试日志输出
     * @param tag 
     * @param msg 
     */
    protected static LOGD(tag: string, msg: any): void {
        Utils.LOGD(tag, msg);
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
     * 出错日志输出
     * @param tag 
     * @param msg 
     */
    protected static LOGE(tag: string, msg: any): void {
        Utils.LOGE(tag, msg);
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
     * 警告日志输出
     * @param tag 
     * @param msg 
     */
    protected static LOGW(tag: string, msg: any): void {
        Utils.LOGW(tag, msg);
    }

    /**
     * 播放音效
     * @param url 
     */
    protected playEffect(url: string): void {
        SoundManager.getInstance().playEffectSound(url);
    }

    /**
     * 播放音效
     * @param url 
     */
    protected playMusic(url: string, loop: boolean = true): void {
        SoundManager.getInstance().playMusic(url, loop);
    }

    /**
     * 播放背景音效
     * @param url 
     */
    protected static playEffect(url: string): void {
        SoundManager.getInstance().playEffectSound(url);
    }

    /**
     * 播放背景音效
     * @param url 
     */
    protected static playMusic(url: string, loop: boolean = true): void {
        SoundManager.getInstance().playMusic(url, loop);
    }
}
