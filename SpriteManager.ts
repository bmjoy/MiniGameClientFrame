/*================================================================
 * Description 图集管理
 * Email huliuworld@yahoo.com
 * Created on Thu Aug 01 2019 22:44:20
 * Copyright (c) 2019 刘虎
================================================================*/

import { Utils } from "./Utils";

export class SpriteManager extends cc.Object {

    private readonly TAG: string = "NotificationCenter";
    private static readonly instance: SpriteManager = new SpriteManager();
    private spriteFrameContent: {[key: string]: cc.SpriteFrame} = {};

    private constructor() {
        super();
        if (SpriteManager.getInstance()) {
            Utils.LOGE(this.TAG, "重复初始化");
        }
    }

    public static getInstance(): SpriteManager {
        return this.instance;
    }

    public setSpriteFrameForNode(node: cc.Node, url: string) {
        let callback: Function = (node: cc.Node, spriteFrame: cc.SpriteFrame) => {
            if (cc.isValid(node) && cc.isValid(node.getComponent(cc.Sprite))) {
                node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            }
        };
        if (this.spriteFrameContent[url]) {
            callback(node, this.spriteFrameContent[url]);
        } else {
            cc.loader.loadRes(url, cc.SpriteFrame, (err: Error, spriteFrame: cc.SpriteFrame)=>{
                if (!err) {
                    this.spriteFrameContent[url] = spriteFrame;
                    callback(node, spriteFrame);
                } else {
                    Utils.LOGE(this.TAG, "load " + url + "error: ");
                    Utils.LOGE(this.TAG, "error name: " + err.name || "");
                    Utils.LOGE(this.TAG, "error msg: " + err.message || "");
                    Utils.LOGE(this.TAG, "error stack: " + err.stack || "");
                }
            });
        }
    }

    public setSpriteFrameForSprite(sprite: cc.Sprite, url: string) {
        let callback: Function = (sprite: cc.Sprite, spriteFrame: cc.SpriteFrame) => {
            if (cc.isValid(sprite)) {
                sprite.spriteFrame = spriteFrame;
            }
        };
        if (this.spriteFrameContent[url]) {
            callback(sprite, this.spriteFrameContent[url]);
        } else {
            cc.loader.loadRes(url, cc.SpriteFrame, (err: Error, spriteFrame: cc.SpriteFrame) => {
                if (!err) {
                    this.spriteFrameContent[url] = spriteFrame;
                    callback(sprite, spriteFrame);
                } else {
                    Utils.LOGE(this.TAG, "load " + url + "error: ");
                    Utils.LOGE(this.TAG, "error name: " + err.name || "");
                    Utils.LOGE(this.TAG, "error msg: " + err.message || "");
                    Utils.LOGE(this.TAG, "error stack: " + err.stack || "");
                }
            });
        }
    }
}
