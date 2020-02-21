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

    /**
     * 展示指定banner广告，
     *  1.id所对应实例存在，不重复创建。
     *  2.id所对应实例存在，但此次展示位置与之前不同，会先销毁原有广告，然后从新创建实例
     *
     * @static
     * @param {({
     *             adUnitId: string, 
     *             type: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right",
     *             adIntervals?: boolean, 
     *             errorCallBack?: (res: {errMsg: string, errCode: number}) => void })} params
     * @memberof FrameworkAd
     */
    static showBanner(params: {
            adUnitId: string, 
            type: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right",
            adIntervals?: boolean, 
            errorCallBack?: (res: {errMsg: string, errCode: number}) => void }) {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            WechatAd.showBanner(params);
        }
    }

    /**
     * 隐藏指定banner广告
     *
     * @static
     * @param {string} adUnitId
     * @memberof FrameworkAd
     */
    static hideBanner(adUnitId: string) {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            WechatAd.hideBanner(adUnitId);
        }
    }

    /**
     * 隐藏所有的banner广告
     *
     * @static
     * @memberof FrameworkAd
     */
    static hideAllBanners() {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            WechatAd.hideAllBanners();
        }
    }

    /**
     * 销毁指定广告实例
     *
     * @static
     * @param {string} adUnitId
     * @memberof FrameworkAd
     */
    static destroyBanner(adUnitId: string) {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            WechatAd.destroyBanner(adUnitId);
        }
    }

    /**
     * 销毁所有广告实例
     *
     * @static
     * @memberof FrameworkAd
     */
    static destroyAllBanner() {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            WechatAd.destroyAllBanners();
        }
    }

    /**
     * 展示视频激励广告
     *
     * @static
     * @param {{
     *             adUnitId: string,
     *             finished: () => void,
     *             unfinish: () => void,
     *             errorCallBack?: (res: {errMsg: string, errCode: number})=> void }} params
     * @memberof FrameworkAd
     */
    static showRewardedVideoAd(params: {
            adUnitId: string,
            finished: () => void,
            unfinish: () => void,
            errorCallBack?: (res: {errMsg: string, errCode: number})=> void }) {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            WechatAd.showRewardedVideoAd(params);
        }
    }

    /**
     * 展示插屏广告
     *
     * @static
     * @param {{
     *             adUnitId: string,
     *             close?: () => void
     *             errorCallBack?: (res: {errMsg: string, errCode: number})=> void }} params
     * @memberof FrameworkAd
     */
    static showInterstitialAd(params: {
            adUnitId: string,
            close?: () => void
            errorCallBack?: (res: {errMsg: string, errCode: number})=> void }) {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            WechatAd.showInterstitialAd(params);
        }
    }
    
    /**
     * 展示格子广告
     *
     * @static
     * @param {({
     *         adUnitId: string,
     *         adTheme: "white" | "black",
     *         gridCount: number,
     *         style: { left: number, top: number, width: number, opacity: number },
     *         resize?: (gridAd: { style: { top: number, left: number, width: number, height: number, realWidth: number, realHeight: number } }) => void,
     *         errorCallback?: (res: {errMsg: string, errCode: number}) => void })} params
     * @memberof FrameworkAd
     */
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

    /**
     * 隐藏格子广告
     *
     * @static
     * @param {string} adUnitId
     * @memberof FrameworkAd
     */
    static hideGridAd(adUnitId: string) {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            WechatAd.hideGridAd(adUnitId);
        }
    }
}
