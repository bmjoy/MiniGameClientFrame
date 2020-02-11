/*================================================================
* Description 广告
* Email huxiaoheigame@gmail.com
* Created on Mon Feb 10 2020
* Copyright (c) 2020 刘虎
================================================================*/

import { FrameworkObject } from "./FrameworkObject"
import { WechatAd } from "./WechatAd"

export class FrameworkAd extends FrameworkObject {

    protected static readonly TAG: string = "FrameworkAd";

    static showBanner(params: {
            adUnitId: string, 
            type: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right",
            adIntervals?: boolean, 
            errorCallBack?: (res: {errMsg: string, errCode: number}) => void }) {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            WechatAd.showBanner(params);
        }
    }

    static hideBanner(adUnitId: string) {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            WechatAd.hideBanner(adUnitId);
        }
    }

    static hideAllBanners() {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            WechatAd.hideAllBanners();
        }
    }

    static destroyBanner(adUnitId: string) {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            WechatAd.destroyBanner(adUnitId);
        }
    }

    static destroyAllBanner() {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            WechatAd.destroyAllBanners();
        }
    }

    static showRewardedVideoAd(params: {
            adUnitId: string,
            finished: () => void,
            unfinish: () => void,
            errorCallBack?: (res: {errMsg: string, errCode: number})=> void }) {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            WechatAd.showRewardedVideoAd(params);
            this.LOGE(this.TAG, "show rewarded video Ad");
        }
    }

    static showInterstitialAd(params: {
            adUnitId: string,
            close?: () => void
            errorCallBack?: (res: {errMsg: string, errCode: number})=> void }) {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            WechatAd.showInterstitialAd(params);
        }
    }
   
    static showGridAd(params: {
        adUnitId: string,
        adTheme: "white" | "black",
        gridCount: number,
        style: { left: number, top: number, width: number, opacity: number },
        resize?: (gridAd: { style: { top: number, left: number, width: number, height: number, realWidth: number, realHeight: number } }) => void,
        errorCallback?: (res: {errMsg: string, errCode: number}) => void }) {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            WechatAd.showGridAd(params);
        }
    }

    static hideGridAd(adUnitId: string) {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            WechatAd.hideGridAd(adUnitId);
        }
    }
}
