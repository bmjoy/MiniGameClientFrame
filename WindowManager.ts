/*================================================================
 * Description 弹窗管理器
 * Email huxiaoheigame@gmail.com
 * Created on Fri Aug 30 2019 22:16:41
 * Copyright (c) 2019 刘虎
================================================================*/

import { FrameworkObject } from "./FrameworkObject";
import { WindowBase } from "./WindowBase";
import { Utils } from "./Utils";

interface OpenWindowParams {
    isSequence?: boolean;                                                               // 是否在队列等待 default true
    hideOther?: boolean;                                                                // 是否隐藏其他界面 default false
    data?: any;                                                                         // 窗口初始化参数
    touchMaskClose?: boolean;                                                           // 点击遮罩关闭 default false
    repeat?: boolean;                                                                   // 是的支持在队列中存在多个 default true
    needMask?: boolean;                                                                 // 是否需要mask default true
    maskOpacity?: number;                                                               // mask透明度
    closeCallback?: () => void;                                                         // 关闭回调
    errorCallback?: (err: Error) => void;                                               // 加载失败回调
    loadCallback?: (completedCount: number, totalCount: number, item: any) => void;     // 加载进度回调  
}


interface WindowInfo {
    node?: cc.Node;                             // 窗口节点实例对象
    prefabPath: string;                         // 预制件路径
    component: new () => WindowBase;            // 预制件控制器类
    hasShow: boolean;                           // 是否已经在管理器中展示
    params?: OpenWindowParams;                  // 打开节点的初始化参数
}

export class WindowManager extends FrameworkObject {

    public readonly TAG: string = "WindowManager";
    private static instance: WindowManager = null;
    private windowList: WindowInfo[] = [];
    private maskNode: cc.Node = null;
    private maskBgPath: string = "Texture/Common/common_mask_1";
    private windowMaxIndex: number = 100;

    private constructor() {
        super();
    }

    /**
     * 获取实例
     *
     * @static
     * @param {string} [maskBgPath]
     * @returns {WindowManager}
     * @memberof WindowManager
     */
    public static getInstance(maskBgPath?: string): WindowManager {
        if (this.instance == null) {
            this.instance = new WindowManager();
        }
        if (maskBgPath && this.instance.maskBgPath != maskBgPath) {
            this.instance.maskBgPath = maskBgPath;
            this.instance.createMaskNode();
        }
        return this.instance;
    }

    /**
     * 打开窗口
     *
     * @param {string} prefabPath
     * @param {new () => WindowBase} component
     * @param {OpenWindowParams} [params]
     * @returns
     * @memberof WindowManager
     */
    public openWindow(prefabPath: string, component: new () => WindowBase, params?: OpenWindowParams) {
        if (!cc.isValid(this.maskNode)) {
            this.createMaskNode();
        }
        if (params && params.repeat === false) {
            for (let index = 0, length = this.windowList.length; index < length; index++) {
                if (prefabPath === this.windowList[index].prefabPath) {
                    Utils.LOGW(this.TAG, prefabPath + " has exit in windows manager can not create again");
                    return;
                }
            }
        }
        let info: WindowInfo = { prefabPath: prefabPath, component: component, params: params, hasShow: false };
        if (params && params.isSequence === false) {
            this.windowList.unshift(info);
        } else {
            this.windowList.push(info);
        }
        this.checkShowWindow();
    }

    /**
     * 关闭窗口
     *
     * @param {new () => WindowBase} component
     * @returns
     * @memberof WindowManager
     */
    public closeWindow(component: new () => WindowBase) {
        for (let index = 0, length = this.windowList.length; index < length; index++) {
            let windowInfo = this.windowList[index];
            if (windowInfo.component === component && windowInfo.hasShow) {
                let script: WindowBase = windowInfo.node.getComponent(WindowBase);
                script.willDestroy();
                this.windowList.splice(index, 1);
                windowInfo.node.destroy();
                windowInfo.params && typeof windowInfo.params.closeCallback === "function" && windowInfo.params.closeCallback();
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
                let script: WindowBase = windowInfo.node.getComponent(windowInfo.component);
                script.willShow();
                script.initData(windowInfo.params && windowInfo.params.data);
                cc.director.getScene().addChild(windowInfo.node);
                windowInfo.hasShow = true;
            } else {
                cc.loader.loadRes(windowInfo.prefabPath, cc.Prefab, (completedCount: number, totalCount: number, item: any) => {
                    windowInfo.params && windowInfo.params.loadCallback && typeof windowInfo.params.loadCallback === "function" && windowInfo.params.loadCallback(completedCount, totalCount, item);
                }, (err, prefab) => {
                    if (!err) {
                        if (windowInfo === this.windowList[0]) { // 依然队列的头部(可能在加载过程中有其它弹窗弹出)
                            windowInfo.node = cc.instantiate(prefab);
                            this.adjustIndex();
                            let script: WindowBase = windowInfo.node.getComponent(windowInfo.component);
                            script.willShow();
                            script.initData(windowInfo.params && windowInfo.params.data);
                            cc.director.getScene().addChild(windowInfo.node);
                            windowInfo.hasShow = true;
                        }
                    } else {
                        Utils.LOGE(this.TAG, windowInfo.prefabPath + " error: " + JSON.stringify(err));
                        windowInfo.params && windowInfo.params.errorCallback && typeof windowInfo.params.errorCallback === "function" && windowInfo.params.errorCallback(err);
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
                    this.maskNode.opacity = windowInfo.params.maskOpacity || 255;
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
        Utils.setImageToSpriteByUrl(this.maskBgPath, sp);
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
