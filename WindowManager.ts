/*================================================================
 * Description 弹窗管理器
 * Email huliuworld@yahoo.com
 * Created on Fri Aug 30 2019 22:16:41
 * Copyright (c) 2019 刘虎
================================================================*/

import { FrameworkObject } from "./FrameworkObject";

interface WindowInfo {
    node?: cc.Node;
    prefabPath: string;
    component: new () => cc.Component;
    hasShow: boolean
    params?: OpenWindowParams;
}


interface OpenWindowParams {
    isSequence?: boolean;              // 是否在队列等待 default true
    hideOther?: boolean;               // 是否隐藏其他界面 default false
    data?: any;                        // 参数
    touchMaskClose?: boolean;          // 点击遮罩关闭 default false
    repeat?: boolean;                  // 是的支持在队列中存在多个 default true
    needMask?: boolean;                // 是否需要mask default true
    errorCallback?: Function           // 失败回调
}

export class WindowManager extends FrameworkObject {

    protected readonly TAG: string = "WindowManager";
    protected static _instance: WindowManager = null;
    protected _windowList: WindowInfo[] = [];
    protected _maskNode: cc.Node = null;
    protected _maskBgPath: string = "Common/common_mask_1";
    protected _windowMaxIndex: number = 100;

    protected constructor() {
        super();
    }

    public static getInstance(): WindowManager {
        if (this._instance == null) {
            this._instance = new WindowManager();
        }
        return this._instance;
    }

    /**
     * 打开窗口
     * @param prefabPath 
     * @param component 
     * @param params 
     */
    public openWindow<T extends cc.Component>(prefabPath: string, component: new () => T, params?: OpenWindowParams) {
        if (!cc.isValid(this._maskNode)) {
            this.createMaskNode();
        }
        if (params && params.repeat === false) {
            for (let index = 0, length = this._windowList.length; index < length; index++) {
                if (prefabPath === this._windowList[index].prefabPath) {
                    this.LOGW(this.TAG, prefabPath + " can not repeat");
                    return;
                }
            }
        }
        if (params && params.isSequence === false) {
            this._windowList.unshift({
                prefabPath: prefabPath,
                component: component,
                params: params,
                hasShow: false
            });
        } else {
            this._windowList.push({
                prefabPath: prefabPath,
                component: component,
                params: params,
                hasShow: false
            });
        }
        this.checkShowWindow();
    }

    /**
     * 关闭窗口
     * @param component 
     */
    public closeWindow<T extends cc.Component>(component: new () => T) {
        for (let index = 0, length = this._windowList.length; index < length; index++) {
            let windowInfo = this._windowList[index];
            if (windowInfo.component === component && windowInfo.hasShow) {
                let script = windowInfo.node.getComponent(component);
                script && typeof script["willDestroy"] === "function" && script["willDestroy"]();
                this._windowList.splice(index, 1);
                windowInfo.node.destroy();
                this.checkShowWindow();
                return;
            }
        }
        this.checkShowWindow();
    }

    /**
     * 检测需要弹出的弹窗
     */
    protected checkShowWindow() {
        if (this._windowList.length <= 0) {
            this.hideMaskNode();
            return;
        }
        let topWindowInfo = this._windowList[0];
        // 是否隐藏其它弹窗
        if (topWindowInfo.params && topWindowInfo.params.hideOther === true) {
            for (let index = 0, length = this._windowList.length; index < length; index++) {
                if (this._windowList[index].hasShow && cc.isValid(this._windowList[index].node)) {
                    this._windowList[index].node.active = false;
                }
            }
        }
        this.showWindow(topWindowInfo);
    }

    /**
     * 展示指定弹窗
     * @param windowInfo 
     */
    protected showWindow(windowInfo: WindowInfo) {
        if (windowInfo.hasShow) { // 已经弹出过
            this.adjustIndex();
            windowInfo.node.active = true;
        } else { // 还没有弹出过
            if (cc.loader.getRes(windowInfo.prefabPath)) {
                windowInfo.node = cc.instantiate(cc.loader.getRes(windowInfo.prefabPath));
                this.adjustIndex();
                let script = windowInfo.node.getComponent(windowInfo.component);
                script && typeof script["willShow"] === "function" && script["willShow"]();
                script && typeof script["initData"] === "function" && script["initData"](windowInfo.params && windowInfo.params.data);
                cc.director.getScene().addChild(windowInfo.node);
                windowInfo.hasShow = true;
                script && typeof script["showed"] === "function" && script["showed"]();
            } else {
                cc.loader.loadRes(windowInfo.prefabPath, cc.Prefab, (completedCount: number, totalCount: number, item: any) => {

                }, (err, prefab) => {
                    if (!err) {
                        if (windowInfo === this._windowList[0]) { // 依然队列的头部
                            windowInfo.node = cc.instantiate(prefab);
                            this.adjustIndex();
                            let script = windowInfo.node.getComponent(windowInfo.component);
                            script && typeof script["willShow"] === "function" && script["willShow"]();
                            script && typeof script["initData"] === "function" && script["initData"](windowInfo.params && windowInfo.params.data);
                            cc.director.getScene().addChild(windowInfo.node);
                            windowInfo.hasShow = true;
                            script && typeof script["showed"] === "function" && script["showed"]();
                        }
                    } else {
                        this.LOGE(this.TAG, windowInfo.prefabPath + " error: " + JSON.stringify(err));
                        windowInfo.params && windowInfo.params.errorCallback && windowInfo.params.errorCallback(err);
                        if (this._windowList.indexOf(windowInfo) >= 0) {
                            this._windowList.splice(this._windowList.indexOf(windowInfo), 1);
                        }
                        this.checkShowWindow();

                    }
                });
            }
        }
    }

    /**
     * 调整弹窗的蒙版的层级
     */
    protected adjustIndex() {
        let length = this._windowList.length;
        for (let index = 0; index < length; index++) {
            let windowInfo = this._windowList[index];
            if (cc.isValid(windowInfo.node)) {
                windowInfo.node.zIndex = this._windowMaxIndex - index * 2;
            }
            if (index == 0 && cc.isValid(this._maskNode)) {
                this._maskNode.zIndex = this._windowMaxIndex - 1;
                if (windowInfo.params && windowInfo.params.needMask === false) {
                    this._maskNode.active = false;
                } else {
                    this._maskNode.active = true;
                }
            }
        }
    }
    /**
     * 创建蒙版
     */
    protected createMaskNode() {
        this._maskNode = new cc.Node();
        this._maskNode.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        this._maskNode.width = cc.winSize.width;
        this._maskNode.height = cc.winSize.height;
        let sp = this._maskNode.addComponent(cc.Sprite);
        sp.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        this.setSpriteFrameForSprite(sp, this._maskBgPath);
        this._maskNode.on(cc.Node.EventType.TOUCH_END, () => {
            for (let index = this._windowList.length - 1; index >= 0; index--) {
                let panel = this._windowList[index];
                if (panel.node && panel.node.active && panel.params && panel.params.touchMaskClose) {
                    this.closeWindow(panel.component);
                    break;
                }
            }
        });
        this._maskNode.active = false;
        cc.director.getScene().addChild(this._maskNode);
    }

    /**
     * 展示蒙版
     */
    protected showMaskNode() {
        if (cc.isValid(this._maskNode)) {
            this._maskNode.active = true;
        }
    }

    /**
     * 隐藏蒙版
     */
    protected hideMaskNode() {
        if (this._maskNode) {
            this._maskNode.active = false;
        }
    }
}
