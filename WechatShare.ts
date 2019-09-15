/*================================================================
 * Description 微信分享相关接口
 * Email huliuworld@yahoo.com
 * Created on Sun Sep 15 2019 11:59:28
 * Copyright (c) 2019 刘虎
================================================================*/

import { FrameworkObject } from "./FrameworkObject";

export class WechatShare extends FrameworkObject {

    protected static readonly TAG: string = "WechatShare";


    public static updateShareMenu(params?: wx.UpdateShareMenuParams) {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            wx.updateShareMenu(params);
        }
    }

    public static showShareMenu(params?: wx.ShowShareMenuParams) {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            wx.showShareMenu(params);
        }
    }

    public static shareAppMessage(params?: wx.ShareAppMessageParams) {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            wx.shareAppMessage(params);
        }
    }

    public static onShareAppMessage(cb: () => wx.ShareAppMessageParams) {
        wx.onShareAppMessage(cb);
    }

    public static offShareAppMessage(cb: () => wx.ShareAppMessageParams) {
        wx.offShareAppMessage(cb);
    }

    public static hideShareMenu(params?: wx.BaseCallback) {
        wx.hideShareMenu(params);
    }

    public static getShareInfo(params: wx.GetShareInfoParams) {
        wx.getShareInfo(params);
    }
}
