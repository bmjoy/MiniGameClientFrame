/*================================================================
 * Description Common初始化脚本
 * Email huliuworld@yahoo.com
 * Created on Sun Nov 11 2018 11:0:7
 * Copyright (c) 2018 刘虎
================================================================*/

import { CommonEvent } from "./CommonEvent";
import { NotificationCenter } from "./NotificationCenter";
import { SystemUtil } from "./SystemUtil";
import { Utils } from "./Utils";

let TAG: string = "CommonInit";

if (cc.sys.platform == cc.sys.WECHAT_GAME) {
    try {
        wx.onHide(function () {
            NotificationCenter.trigger(CommonEvent.COMMON_EVENT_GAME_ON_HIDE);
        });
        wx.onShow((res?: wx.LaunchOption) => {
            NotificationCenter.trigger(CommonEvent.COMMON_EVENT_GAME_ON_SHOW, res)
        });
    } catch (e) {
        Utils.LOGE(TAG, "listen wechat callback error : " + JSON.stringify(e));
    }
    try {
        var systemInfo: wx.SystemInfo = wx.getSystemInfoSync();
        SystemUtil.getInstance().init(systemInfo);
    } catch (e) {
        Utils.LOGE(TAG, "get system info sysnc failure : " + JSON.stringify(e));
    }
} else {
    cc.game.on(cc.game.EVENT_SHOW, ()=>{
        NotificationCenter.trigger(CommonEvent.COMMON_EVENT_GAME_ON_SHOW);
    });
    cc.game.on(cc.game.EVENT_HIDE, ()=>{
        NotificationCenter.trigger(CommonEvent.COMMON_EVENT_GAME_ON_HIDE);
    });
}

