/*================================================================
 * Description 公共事件
 * Email huliuworld@yahoo.com
 * Created on Sun Nov 11 2018 11:0:58
 * Copyright (c) 2018 刘虎
================================================================*/

import {Utils} from "./Utils";

export class CommonEvent extends cc.Object {
    public readonly TAG: string = "CommonEvent";
    private constructor() {
        super();
        Utils.LOGE(this.TAG, "不需要实例化");
    }
    public static readonly COMMON_EVENT_GAME_ON_SHOW: string = "COMMON_EVENT_GAME_ON_SHOW";
    public static readonly COMMON_EVENT_GAME_ON_HIDE: string = "COMMON_EVENT_GAME_ON_HIDE";
    public static readonly COMMON_EVENT_LOGIN_SUCCESS: string = "COMMON_EVENT_LOGIN_SUCCESS";
    public static readonly COMMON_EVENT_LOGIN_FAILURE: string = "COMMON_EVENT_LOGIN_FAILURE";
    public static readonly COMMON_EVENT_TCP_CONNECTED: string = "COMMON_EVENT_TCP_CONNECTED";
    public static readonly COMMON_EVENT_TCP_SEND_HEART_BEAT: string = "COMMON_EVENT_TCP_SEND_HEART_BEAT";
    public static readonly COMMON_EVENT_TCP_ERROR: string = "COMMON_EVENT_TCP_ERROR";
    public static readonly COMMON_EVENT_TCP_CLOSED: string = "COMMON_EVENT_TCP_CLOSED";
    public static readonly COMMON_EVENT_AUTH_SUCCESS: string = "COMMON_EVENT_AUTH_SUCCESS";
    public static readonly COMMON_EVENT_AUTH_FAILURE: string = "COMMON_EVENT_AUTH_FAILURE";
}
