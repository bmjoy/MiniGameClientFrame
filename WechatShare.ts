/*================================================================
 * Description 微信分享相关接口
 * Email huliuworld@yahoo.com
 * Created on Sun Sep 15 2019 11:59:28
 * Copyright (c) 2019 刘虎
================================================================*/

import { FrameworkObject } from "./FrameworkObject";

export class WechatShare extends FrameworkObject {

    protected static readonly TAG: string = "WechatShare";

    /**
     * 更新转发菜单
     *
     * @static
     * @param {wx.UpdateShareMenuParams} [params]
     * @memberof WechatShare
     */
    public static updateShareMenu(params?: wx.UpdateShareMenuParams) {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            wx.updateShareMenu(params);
        }
    }

    /**
     * 展示转发菜单
     *
     * @static
     * @param {wx.ShowShareMenuParams} [params]
     * @memberof WechatShare
     */
    public static showShareMenu(params?: wx.ShowShareMenuParams) {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            wx.showShareMenu(params);
        }
    }

    /**
     * 分享
     *
     * @static
     * @param {wx.ShareAppMessageParams} [params]
     * @memberof WechatShare
     */
    public static shareAppMessage(params?: wx.ShareAppMessageParams) {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            wx.shareAppMessage(params);
        }
    }

    /**
     * 监听分享被拉起
     *
     * @static
     * @param {() => wx.ShareAppMessageParams} cb
     * @memberof WechatShare
     */
    public static onShareAppMessage(cb: () => wx.ShareAppMessageParams) {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            wx.onShareAppMessage(cb);
        }
    }

    /**
     * 移除分享被拉起的监听
     *
     * @static
     * @param {() => wx.ShareAppMessageParams} cb
     * @memberof WechatShare
     */
    public static offShareAppMessage(cb: () => wx.ShareAppMessageParams) {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            wx.offShareAppMessage(cb);
        }
    }

    /**
     * 隐藏转发
     *
     * @static
     * @param {wx.BaseCallback} [params]
     * @memberof WechatShare
     */
    public static hideShareMenu(params?: wx.BaseCallback) {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            wx.hideShareMenu(params);
        }
    }

    /**
     * 获取分享信息
     *
     * @static
     * @param {wx.GetShareInfoParams} params
     * @memberof WechatShare
     */
    public static getShareInfo(params: wx.GetShareInfoParams) {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            wx.getShareInfo(params);
        }
    }
}
