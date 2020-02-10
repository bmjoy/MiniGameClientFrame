/*================================================================
* Description 微信广告
* Email huxiaoheigame@gmail.com
* Created on Mon Feb 10 2020
* Copyright (c) 2020 刘虎
================================================================*/

import { FrameworkObject } from "./FrameworkObject"
import { SystemUtil } from "./SystemUtil";

export class WechatAd extends FrameworkObject {

    protected static readonly TAG: string = "WechatAd";
    protected static banners: { [key: string]: {
            bannerAd: wx.BannerAd,
            type: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"
        }} = {};
    protected static videoAd: wx.RewardedVideoAd = null;
    protected static interstitialAd: wx.InterstitialAd = null;
    protected static grids: { [key: string]: wx.GridAd} = {};
    
    static showBanner(params: {
            adUnitId: string, 
            type: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right",
            adIntervals?: boolean, 
            errorCallBack?: (res: {errMsg: string, errCode: number}) => void }) {
                
        var style: {left: number, top: number, width: number, height: number} = {
            left: 0, top: 0, width: 0, height: 0
        };
        if (cc.isValid(this.banners[params.adUnitId]) && this.banners[params.adUnitId].type != params.type) {
            this.destroyBanner(params.adUnitId);
        }
        if (!cc.isValid(this.banners[params.adUnitId])) {
            this.createBannerAd({
                adUnitId: params.adUnitId, adIntervals: params.adIntervals, style: style
            });
            this.banners[params.adUnitId].type = params.type;
        }
        if (!cc.isValid(this.banners[params.adUnitId])) {
            return
        }
        this.banners[params.adUnitId].bannerAd.offError();
        this.banners[params.adUnitId].bannerAd.onError((res: {errMsg: string, errCode: number}) => {
            this.LOGE(this.TAG, "show banner ad error : " + JSON.stringify(res));
            typeof params.errorCallBack == "function" && params.errorCallBack(res);
        });
        let screenWidth = SystemUtil.getInstance().screenWidth;
        let screenHeight = SystemUtil.getInstance().screenHeight;
        this.banners[params.adUnitId].bannerAd.onResize(() => {
            let bannerAd = this.banners[params.adUnitId].bannerAd;
            if (params.type.indexOf("top") >= 0) bannerAd.style.top = 0;
            if (params.type.indexOf("bottom") >= 0) bannerAd.style.top = screenHeight - bannerAd.style.realHeight;
            if (params.type === "top-left" || params.type === "bottom-left") {
                bannerAd.style.left = 0;
            } else if (params.type === "top-center" || params.type === "bottom-center") {
                bannerAd.style.left = (screenWidth - bannerAd.style.realWidth) / 2;
            } else if (params.type === "top-right" || params.type === "bottom-right") {
                bannerAd.style.left = screenWidth - bannerAd.style.realWidth;
            }
        });
        this.banners[params.adUnitId].bannerAd.show();
    }

    static hideBanner(adUnitId: string) {
        if (cc.isValid(this.banners[adUnitId])) {
            this.banners[adUnitId].bannerAd.hide();
        }
    }

    static hideAllBanners() {
        for (let key in this.banners) {
            this.hideBanner(key);
        }
    }

    static destroyBanner(adUnitId: string) {
        if (cc.isValid(this.banners[adUnitId])) {
            this.banners[adUnitId].bannerAd.offError();
            this.banners[adUnitId].bannerAd.offResize();
            this.banners[adUnitId].bannerAd.offLoad();
            this.banners[adUnitId].bannerAd.destroy();
            delete this.banners[adUnitId];
        }
    }

    static destroyAllBanners() {
        for (let key in this.banners) {
            this.destroyBanner(key);
        }
    }
    
    protected static createBannerAd(params: {
            adUnitId: string,
            style: {left: number, top: number, width: number, height: number}
            adIntervals?: boolean,
            errorCallBack?: (res: {errMsg: string, errCode: number}) => {} }) {
        let bannerAd: wx.BannerAd = wx.createBannerAd(params);
        bannerAd.onError((res: {errMsg: string, errCode: number}) => {
            this.LOGE(this.TAG, "show banner ad error : " + JSON.stringify(res));
            typeof params.errorCallBack == "function" && params.errorCallBack(res);
        });
        this.banners[params.adUnitId] = {
            bannerAd: bannerAd,
            type: "top-left"
        };
    }

    static showRewardedVideoAd(params: {
            adUnitId: string,
            finished: () => void,
            unfinish: () => void,
            errorCallBack?: (res: {errMsg: string, errCode: number})=> void }) {
        if (!cc.isValid(this.videoAd)) {
            this.createRewardedVideoAd({
                adUnitId: params.adUnitId,
                errorCallback: params.errorCallBack
            });
        }
        if (!cc.isValid(this.videoAd)) return;
        this.videoAd.onClose((isEnd: boolean) => {
            this.videoAd.destroy();
            if (isEnd) {
                typeof params.finished === "function" && params.finished();
            } else {
                typeof params.unfinish === "function" && params.unfinish();
            }
        });
    }

    protected static createRewardedVideoAd(params: {
            adUnitId: string, 
            multiton?: boolean,
            errorCallback?: (res: {errMsg: string, errCode: number}) => void }) {
        if (cc.isValid(this.videoAd)) {
            this.videoAd.destroy();
        }
        this.videoAd = wx.createRewardedVideoAd(params);
        this.videoAd.onError((res: {errMsg: string, errCode: number}) => {
            this.LOGE(this.TAG, "show video ad error : " + JSON.stringify(res));
            typeof params.errorCallback == "function" && params.errorCallback(res);
        });
        this.videoAd.onLoad(() => {
            this.videoAd.show();
        });
        this.videoAd.load();
    }


    static showInterstitialAd(params: {
            adUnitId: string,
            close?: () => void
            errorCallBack?: (res: {errMsg: string, errCode: number})=> void }) {
        if (!cc.isValid(this.interstitialAd)) {
            this.createInterstitialAd({
                adUnitId: params.adUnitId,
                errorCallback: params.errorCallBack
            });
        }
        if (!cc.isValid(this.interstitialAd)) return;
        this.interstitialAd.onClose(() => {
            this.interstitialAd.destroy();
            typeof params.close == "function" && params.close();
        });
    }

    protected static createInterstitialAd(params: { 
            adUnitId: string,
            errorCallback?: (res: {errMsg: string, errCode: number}) => void }) {
        if (cc.isValid(this.interstitialAd)) {
            this.interstitialAd.destroy();
        }
        this.interstitialAd = wx.createInterstitialAd({adUnitId: params.adUnitId});
        this.interstitialAd.onError((res: {errMsg: string, errCode: number}) => {
            this.LOGE(this.TAG, "show interstitial ad error : " + JSON.stringify(res));
            typeof params.errorCallback == "function" && params.errorCallback(res)
        });
        this.interstitialAd.onLoad(() => {
            this.interstitialAd.show();
        });
        this.interstitialAd.load();
    }

    static showGridAd(params: {
            adUnitId: string,
            adTheme: "white",
            gridCount: number,
            style: { left: number, top: number, width: number, opacity: number },
            errorCallback?: (res: {errMsg: string, errCode: number}) => void }) {
        if (cc.isValid(this.grids[params.adUnitId])) {
            this.grids[params.adUnitId].show();
            return;
        }
        this.grids[params.adUnitId] = wx.createGridAd(params);
        if (!cc.isValid(this.grids[params.adUnitId])) {
            return;
        }
        this.grids[params.adUnitId].onError((res: { errMsg: string, errCode: number }) => {
            this.LOGE(this.TAG, "show grid ad error : " + JSON.stringify(res));
            typeof params.errorCallback == "function" && params.errorCallback(res);
        });
        this.grids[params.adUnitId].onResize(() => {
            this.LOGE(this.TAG, "resize: " + JSON.stringify(this.grids[params.adUnitId].style));
        });
        this.grids[params.adUnitId].show();
    }

    static hideGridAd(adUnitId: string) {
        if (cc.isValid(this.grids[adUnitId])) {
            this.grids[adUnitId].hide();
        }
    }

    static hideAllGridAds() {
        for (let key in this.grids) {
            this.hideGridAd(key);
        }
    }

    static destroyGridAd(adUnitId: string) {
        if (cc.isValid(this.grids[adUnitId])) {
            this.grids[adUnitId].destroy();
        }
    }

    static destroyAllGridAds() {
        for (let key in this.grids) {
            this.destroyGridAd(key);
        }
    }
    
}
