/*================================================================
 * Description 微信分享相关接口(建议使用FrameworkShare中接口)
 * Email huxiaoheigame@gmail.com
 * Created on Sun Sep 15 2019 11:59:28
 * Copyright (c) 2019 途游游戏
================================================================*/


namespace TYSDK {

    enum ShareStatus {
        UNKNOW = 1,
        SHAREING = 2,
        SHARED = 3
    }

    export class WechatShare extends egret.HashObject implements ShareInterface {

        public readonly TAG: string = "WechatShare";
        private static instance: WechatShare = null;
        private shareStatus: ShareStatus = ShareStatus.UNKNOW;
        private shareTime: number = 0;
        private shareParams: {
            title?: string,
            imageUrl?: string,
            query?: string,
            imageUrlId?: string,
            success?: (res?: any) => void,
            fail?: (res: any) => void
        } = null;

        private constructor() {
            super();
            wx.onShareAppMessage(() => {
                return {
                    title: '三国经典重温，寻找往日激情！',
                    imageUrl: 'https://szh5.nalrer.cn/szmahjong/WXGames/HappyMJ/sharepic/sp3-49.jpg' // 图片 URL
                }
            })
        }

        public static getInstance() {
            if (this.instance == null) {
                this.instance = new WechatShare();
                this.instance.registerEvents();
            }
            return this.instance;
        }

        private registerEvents() {
            NotificationCenter.listen(CommonEvent.COMMON_EVENT_GAME_ON_SHOW, this.onShow, this);
            NotificationCenter.listen(CommonEvent.COMMON_EVENT_GAME_ON_HIDE, this.onHide, this);
        }

        private onShow() {
            this.shareStatus = ShareStatus.SHARED;
            if (!this.shareParams) {
                this.shareTime = 0;
                return;
            }
            let time = new Date().getTime();
            let interval = this.shareTime - time;
            if (interval < 2000) {
                this.shareParams.success && this.shareParams.success({ time: interval, errMsg: interval });
            } else {
                this.shareParams.fail && this.shareParams.fail({ time: interval, errMsg: interval });
            }
            this.shareParams = null;
        }

        private onHide() {
            if (ShareStatus.SHAREING) {
                this.shareTime = new Date().getTime();
            }
        }

        public updateShareMenu(params?: wx.UpdateShareMenuParams) {
            wx.updateShareMenu(params);
        }

        public showShareMenu(params?: wx.ShowShareMenuParams) {
            wx.showShareMenu(params);
        }

        public hideShareMenu(params?: wx.BaseCallback) {
            wx.hideShareMenu(params);
        }

        public shareAppMessage(params?: wx.ShareAppMessageParams) {
            this.shareStatus = ShareStatus.SHAREING;
            this.shareParams = params;
            wx.shareAppMessage(params);
        }

        public onShareAppMessage(cb: (params: wx.ShareAppMessageParams) => void) {
            wx.onShareAppMessage(cb);
        }

        public offShareAppMessage(cb: (params: wx.ShareAppMessageParams) => void) {
            wx.offShareAppMessage(cb);
        }

        public getShareInfo(params: wx.GetShareInfoParams) {
            wx.getShareInfo(params);
        }
    }
}