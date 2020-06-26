/*================================================================
* Description 广告
* Email huxiaoheigame@gmail.com
* Created on Mon Feb 10 2020
* Copyright (c) 2020 刘虎
================================================================*/

import { FrameworkObject } from "./FrameworkObject"
import { WechatAd } from "./SDK/WeChatMini/WechatAd";

export interface AD {
    showBanner: (params: {
        adUnitId: string,
        type: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right",
        adIntervals?: boolean,
        errorCallBack?: (res: { errMsg: string, errCode: number }) => void
    }) => void;
    hideBanner: (adUnitId: string) => void;
    hideAllBanners: () => void;
    destroyBanner: (adUnitId: string) => void;
    destroyAllBanners: () => void;
    showRewardedVideoAd: (params: {
        adUnitId: string,
        finished: () => void,
        unfinish: () => void,
        errorCallBack?: (res: { errMsg: string, errCode: number }) => void
    }) => void;
    showInterstitialAd: (params: {
        adUnitId: string,
        close?: () => void
        errorCallBack?: (res: { errMsg: string, errCode: number }) => void
    }) => void;
    showGridAd: (params: {
        adUnitId: string,
        adTheme: "white" | "black",
        gridCount: number,
        style: { left: number, top: number, width: number, opacity: number },
        resize?: (gridAd: { style: { top: number, left: number, width: number, height: number, realWidth: number, realHeight: number } }) => void,
        errorCallback?: (res: { errMsg: string, errCode: number }) => void
    }) => void;
    hideGridAd: (adUnitId: string) => void;
    hideAllGridAds: () => void;
    destroyGridAd: (adUnitId: string) => void;
    destroyAllGridAds: () => void;
}


export class FrameworkAd extends FrameworkObject {

    public static readonly TAG: string = "FrameworkAd";
    private static instance: FrameworkAd = null;
    private adInstance: AD = null;

    private constructor() {
        super();
    }

    public static getInstance(): FrameworkAd {
        if (this.instance == null) {
            this.instance = new FrameworkAd();
            if (cc.sys.platform == cc.sys.WECHAT_GAME) {
                this.instance.adInstance = new WechatAd();
            }
        }
        return this.instance;
    }

    /**
     * 展示指定banner广告，
     *  1.id所对应实例存在，不重复创建。
     *  2.id所对应实例存在，但此次展示位置与之前不同，会先销毁原有广告，然后从新创建实例
     *
     * @param {({
     *             adUnitId: string, 
     *             type: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right",
     *             adIntervals?: boolean, 
     *             errorCallBack?: (res: {errMsg: string, errCode: number}) => void })} params
     * @memberof FrameworkAd
     */
    public showBanner(params: {
        adUnitId: string,
        type: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right",
        adIntervals?: boolean,
        errorCallBack?: (res: { errMsg: string, errCode: number }) => void
    }) {
        this.adInstance && this.adInstance.showBanner(params);
    }

    /**
     * 隐藏指定banner广告
     *
     * @param {string} adUnitId
     * @memberof FrameworkAd
     */
    public hideBanner(adUnitId: string) {
        this.adInstance && this.adInstance.hideBanner(adUnitId);
    }

    /**
     * 隐藏所有的banner广告
     *
     * @memberof FrameworkAd
     */
    public hideAllBanners() {
        this.adInstance && this.adInstance.hideAllBanners();
    }

    /**
     * 销毁指定广告实例
     *
     * @param {string} adUnitId
     * @memberof FrameworkAd
     */
    public destroyBanner(adUnitId: string) {
        this.adInstance && this.adInstance.destroyBanner(adUnitId);
    }

    /**
     * 销毁所有广告实例
     *
     * @memberof FrameworkAd
     */
    public destroyAllBanner() {
        this.adInstance && this.adInstance.destroyAllBanners();
    }

    /**
     * 展示视频激励广告
     *
     * @param {{
     *             adUnitId: string,
     *             finished: () => void,
     *             unfinish: () => void,
     *             errorCallBack?: (res: {errMsg: string, errCode: number})=> void }} params
     * @memberof FrameworkAd
     */
    public showRewardedVideoAd(params: {
        adUnitId: string,
        finished: () => void,
        unfinish: () => void,
        errorCallBack?: (res: { errMsg: string, errCode: number }) => void
    }) {
        this.adInstance && this.adInstance.showRewardedVideoAd(params);
    }

    /**
     * 展示插屏广告
     *
     * @param {{
     *             adUnitId: string,
     *             close?: () => void
     *             errorCallBack?: (res: {errMsg: string, errCode: number})=> void }} params
     * @memberof FrameworkAd
     */
    public showInterstitialAd(params: {
        adUnitId: string,
        close?: () => void
        errorCallBack?: (res: { errMsg: string, errCode: number }) => void
    }) {
        this.adInstance && this.adInstance.showInterstitialAd(params);
    }

    /**
     * 展示格子广告
     *
     * @param {({
     *         adUnitId: string,
     *         adTheme: "white" | "black",
     *         gridCount: number,
     *         style: { left: number, top: number, width: number, opacity: number },
     *         resize?: (gridAd: { style: { top: number, left: number, width: number, height: number, realWidth: number, realHeight: number } }) => void,
     *         errorCallback?: (res: {errMsg: string, errCode: number}) => void })} params
     * @memberof FrameworkAd
     */
    public showGridAd(params: {
        adUnitId: string,
        adTheme: "white" | "black",
        gridCount: number,
        style: { left: number, top: number, width: number, opacity: number },
        resize?: (gridAd: { style: { top: number, left: number, width: number, height: number, realWidth: number, realHeight: number } }) => void,
        errorCallback?: (res: { errMsg: string, errCode: number }) => void
    }) {
        this.adInstance && this.adInstance.showGridAd(params);
    }

    /**
     * 隐藏格子广告
     *
     * @param {string} adUnitId
     * @memberof FrameworkAd
     */
    public hideGridAd(adUnitId: string) {
        this.adInstance && this.adInstance.hideGridAd(adUnitId);
    }

    /**
     * 隐藏所有格子广告
     *
     * @memberof FrameworkAd
     */
    public hideAllGridAds() {
        this.adInstance && this.adInstance.hideAllGridAds();
    }

    /**
     * 销毁指定格子广告
     *
     * @param {string} adUnitId
     * @memberof FrameworkAd
     */
    public destroyGridAd(adUnitId: string) {
        this.adInstance && this.adInstance.destroyGridAd(adUnitId);
    }

    /**
     * 销毁所有格子广告
     *
     * @memberof FrameworkAd
     */
    public destroyAllGridAds() {
        this.adInstance && this.adInstance.destroyAllGridAds();
    }
}
