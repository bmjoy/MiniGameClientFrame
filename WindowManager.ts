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
    protected static instance: WindowManager = null;
    protected windowList: WindowInfo[] = [];
    protected maskNode: cc.Node = null;
    protected maskBgPath: string = "Texture/Common/common_mask_1";
    protected windowMaxIndex: number = 100;

    protected constructor() {
        super();
    }

    /**
     * 获取实例
     *
     * @static
     * @returns {WindowManager}
     * @memberof WindowManager
     */
    public static getInstance(maskBgPath?: string): WindowManager {
        if (this.instance == null) {
            this.instance = new WindowManager();
        }
        if (this.instance.maskBgPath != maskBgPath) {
            this.instance.maskBgPath = maskBgPath;
            this.instance.createMaskNode();
        }
        return this.instance;
    }

    /**
     * 打开窗口
     *
     * @template T
     * @param {string} prefabPath
     * @param {new () => T} component
     * @param {OpenWindowParams} [params]
     * @returns
     * @memberof WindowManager
     */
    public openWindow<T extends cc.Component>(prefabPath: string, component: new () => T, params?: OpenWindowParams) {
        if (!cc.isValid(this.maskNode)) {
            this.createMaskNode();
        }
        if (params && params.repeat === false) {
            for (let index = 0, length = this.windowList.length; index < length; index++) {
                if (prefabPath === this.windowList[index].prefabPath) {
                    this.LOGW(this.TAG, prefabPath + " can not repeat");
                    return;
                }
            }
        }
        if (params && params.isSequence === false) {
            this.windowList.unshift({
                prefabPath: prefabPath,
                component: component,
                params: params,
                hasShow: false
            });
        } else {
            this.windowList.push({
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
     *
     * @template T
     * @param {new () => T} component
     * @returns
     * @memberof WindowManager
     */
    public closeWindow<T extends cc.Component>(component: new () => T) {
        for (let index = 0, length = this.windowList.length; index < length; index++) {
            let windowInfo = this.windowList[index];
            if (windowInfo.component === component && windowInfo.hasShow) {
                let script = windowInfo.node.getComponent(component);
                script && typeof script["willDestroy"] === "function" && script["willDestroy"]();
                this.windowList.splice(index, 1);
                windowInfo.node.destroy();
                this.checkShowWindow();
                return;
            }
        }
        this.checkShowWindow();
    }

    /**
     * 检测需要弹出的弹窗
     *
     * @protected
     * @returns
     * @memberof WindowManager
     */
    protected checkShowWindow() {
        if (this.windowList.length <= 0) {
            this.hideMaskNode();
            return;
        }
        let topWindowInfo = this.windowList[0];
        // 是否隐藏其它弹窗
        if (topWindowInfo.params && topWindowInfo.params.hideOther === true) {
            for (let index = 0, length = this.windowList.length; index < length; index++) {
                if (this.windowList[index].hasShow && cc.isValid(this.windowList[index].node)) {
                    this.windowList[index].node.active = false;
                }
            }
        }
        this.showWindow(topWindowInfo);
    }

    /**
     * 展示指定弹窗
     *
     * @protected
     * @param {WindowInfo} windowInfo
     * @memberof WindowManager
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
                        if (windowInfo === this.windowList[0]) { // 依然队列的头部
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
                        if (this.windowList.indexOf(windowInfo) >= 0) {
                            this.windowList.splice(this.windowList.indexOf(windowInfo), 1);
                        }
                        this.checkShowWindow();

                    }
                });
            }
        }
    }

    /**
     * 调整弹窗的蒙版的层级
     *
     * @protected
     * @memberof WindowManager
     */
    protected adjustIndex() {
        let length = this.windowList.length;
        for (let index = 0; index < length; index++) {
            let windowInfo = this.windowList[index];
            if (cc.isValid(windowInfo.node)) {
                windowInfo.node.zIndex = this.windowMaxIndex - index * 2;
            }
            if (index == 0 && cc.isValid(this.maskNode)) {
                this.maskNode.zIndex = this.windowMaxIndex - 1;
                if (windowInfo.params && windowInfo.params.needMask === false) {
                    this.maskNode.active = false;
                } else {
                    this.maskNode.active = true;
                }
            }
        }
    }
    
    /**
     * 创建蒙版
     *
     * @protected
     * @memberof WindowManager
     */
    protected createMaskNode() {
        if (cc.isValid(this.maskNode)) {
            this.maskNode.destroy();
        }
        this.maskNode = new cc.Node();
        this.maskNode.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        this.maskNode.width = cc.winSize.width;
        this.maskNode.height = cc.winSize.height;
        let sp = this.maskNode.addComponent(cc.Sprite);
        sp.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        this.setSpriteFrameForSprite(sp, this.maskBgPath);
        this.maskNode.on(cc.Node.EventType.TOUCH_END, () => {
            for (let index = this.windowList.length - 1; index >= 0; index--) {
                let panel = this.windowList[index];
                if (panel.node && panel.node.active && panel.params && panel.params.touchMaskClose) {
                    this.closeWindow(panel.component);
                    break;
                }
            }
        });
        this.maskNode.active = false;
        cc.director.getScene().addChild(this.maskNode);
    }

    /**
     * 展示蒙版
     *
     * @protected
     * @memberof WindowManager
     */
    protected showMaskNode() {
        if (cc.isValid(this.maskNode)) {
            this.maskNode.active = true;
        }
    }

    /**
     * 隐藏蒙版
     *
     * @protected
     * @memberof WindowManager
     */
    protected hideMaskNode() {
        if (this.maskNode) {
            this.maskNode.active = false;
        }
    }
}
