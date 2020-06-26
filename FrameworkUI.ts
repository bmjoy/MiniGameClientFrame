/*================================================================
 * Description 系统UI
 * Email liuhu@tuyoogame.com
 * Created on Wed May 06 2020
 * Copyright (c) 2020 途游游戏
================================================================*/

namespace TYSDK {

    export interface UI {
        showModal(params: {
            title?: string,
            content?: string,
            showCancel?: boolean,
            cancelText?: string,
            cancelColor?: string,
            confirmText?: string,
            confirmColor?: string,
            success: (res: { confirm: boolean, cancel: boolean }) => void,
            fail: (res: { resMsg: string }) => void,
            complete?: () => void
        });
    }

    export class FrameworkUI extends egret.HashObject {

        private static instance: FrameworkUI = null;
        private uiInstance: UI = null;

        private constructor() {
            super();
        }

        public static getInstance() {
            if (this.instance == null) {
                this.instance = new FrameworkUI();
                if (TYGlobal.isWechatPlatform()) {
                    this.instance.uiInstance = new WechatUI();
                }
            }
            return this.instance;
        }

        public showModal(params: {
            title?: string,
            content?: string,
            showCancel?: boolean,
            cancelText?: string,
            cancelColor?: string,
            confirmText?: string,
            confirmColor?: string,
            success: (res: { confirm: boolean, cancel: boolean }) => void,
            fail: (res: { resMsg: string }) => void,
            complete?: () => void
        }) {
            this.uiInstance && this.uiInstance.showModal(params)
        }
    }
}