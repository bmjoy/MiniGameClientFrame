/*================================================================
 * Description 微信分享相关接口
 * Email huxiaoheigame@gmail.com
 * Created on Sun Sep 15 2019 11:59:28
 * Copyright (c) 2019 刘虎
================================================================*/

import { FrameworkObject } from "../../FrameworkObject";
import { Share } from "../../FrameworkShare";

export class WechatShare extends FrameworkObject implements Share {

    public static readonly TAG: string = "WechatShare";

    /**
     * 更新转发菜单
     *
     * @param {wx.UpdateShareMenuParams} [params]
     * @memberof WechatShare
     */
    public updateShareMenu(params?: wx.UpdateShareMenuParams) {
        wx.updateShareMenu(params);
    }

    /**
     * 展示转发菜单
     *
     * @param {wx.ShowShareMenuParams} [params]
     * @memberof WechatShare
     */
    public showShareMenu(params?: wx.ShowShareMenuParams) {
        wx.showShareMenu(params);
    }

    /**
     * 分享
     *
     * @param {wx.ShareAppMessageParams} [params]
     * @memberof WechatShare
     */
    public shareAppMessage(params?: wx.ShareAppMessageParams) {
        wx.shareAppMessage(params);
    }

    /**
     * 监听分享被拉起
     *
     * @param {() => wx.ShareAppMessageParams} cb
     * @memberof WechatShare
     */
    public onShareAppMessage(cb: () => wx.ShareAppMessageParams) {
        wx.onShareAppMessage(cb);
    }

    /**
     * 移除分享被拉起的监听
     *
     * @param {() => wx.ShareAppMessageParams} cb
     * @memberof WechatShare
     */
    public  offShareAppMessage(cb: () => wx.ShareAppMessageParams) {
        wx.offShareAppMessage(cb);
    }

    /**
     * 隐藏转发
     *
     * @param {wx.BaseCallback} [params]
     * @memberof WechatShare
     */
    public hideShareMenu(params?: wx.BaseCallback) {
        wx.hideShareMenu(params);
    }

    /**
     * 获取分享信息
     *
     * @param {wx.GetShareInfoParams} params
     * @memberof WechatShare
     */
    public getShareInfo(params: wx.GetShareInfoParams) {
        wx.getShareInfo(params);
    }
}
