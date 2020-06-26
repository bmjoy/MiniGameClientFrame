/*================================================================
 * Description 微信交互
 * Email liuhu@tuyoogame.com
 * Created on Wed May 06 2020
 * Copyright (c) 2020 途游游戏
================================================================*/


namespace TYSDK {

    export class WechatUI extends egret.HashObject implements UI {

        public constructor() {
            super();
        }

        public showModal(params: {
            title?: string,
            content?: string,
            showCancel?: boolean,
            cancelText?: string,
            cancelColor?: string,
            confirmText?: string,
            confirmColor?: string,
            success?: (res: { confirm: boolean, cancel: boolean }) => void,
            fail?: (res: { resMsg: string }) => void,
            complete?: () => void
        }) {
            wx.showModal(params);
        }
    }

}
