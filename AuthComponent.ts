/*================================================================
 * Description 用户授权(微信)
 * Email huliuworld@yahoo.com
 * Created on Mon Jul 15 2019 23:4:44
 * Copyright (c) 2019 刘虎
================================================================*/

import { FrameworkComponent } from "./FrameworkComponent";
import { SystemUtil } from "./SystemUtil";
import { CommonEvent } from "./CommonEvent";


const { ccclass, property } = cc._decorator;

@ccclass
export default class AuthComponent extends FrameworkComponent {

    protected TAG: string = "AuthComponent";
    protected authBtn: any = null;
    @property(cc.Boolean)
    canRefuse: boolean = false;

    onLoad() {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            wx.getSetting({
                // {"errMsg":"getSetting:ok","authSetting":{}}
                success: (res: any) => {
                    if (!res.authSetting["scope.userInfo"]) {
                        this.createAuthBtn();
                    }
                },
                fail: (res: any) => {
                    this.LOGE(this.TAG, JSON.stringify(res));
                }
            });
            this.registerEvents();
        }
    }

    protected registerEvents() {
        this.listen(CommonEvent.COMMON_EVENT_AUTH_SUCCESS, this.onEventAuthSuccess, this);
    }

    onEnable() {
        if (cc.sys.platform == cc.sys.WECHAT_GAME && this.authBtn) {
            (this.authBtn as wx.UserInfoButton).show();
        }
    }

    onDisable() {
        if (cc.sys.platform == cc.sys.WECHAT_GAME && this.authBtn) {
            (this.authBtn as wx.UserInfoButton).hide();
        }
    }

    onDestroy() {
        if (cc.sys.platform == cc.sys.WECHAT_GAME && this.authBtn) {
            (this.authBtn as wx.UserInfoButton).destroy();
        }
    }

    protected onEventAuthSuccess() {
        if (cc.sys.platform == cc.sys.WECHAT_GAME && this.authBtn) {
            (this.authBtn as wx.UserInfoButton).destroy();
        }
    }

    protected createAuthBtn() {
        this.authBtn = wx.createUserInfoButton({
            type: "image",
            image: "https://szh5.nalrer.cn/szmahjong/WXGames/Shousi/authorizeBtn.png",
            style: {
                left: 0,
                top: 0,
                width: 0,
                height: 0,
                backgroundColor: '#ff0000',
                borderColor: '#ffffff',
                borderWidth: 0,
                borderRadius: 4,
                textAlign: 'center',
                fontSize: 16,
                lineHeight: 40
            },
            lang: "zh_CN",
            withCredentials: false
        });
        this.authBtn && (this.authBtn as wx.UserInfoButton).onTap((res?: any) => {
            if (res && res["errMsg"] === "getUserInfo:ok" && res["userInfo"]) {
                this.trigger(CommonEvent.COMMON_EVENT_AUTH_SUCCESS, res["userInfo"]);
                (this.authBtn as wx.UserInfoButton).destroy();
            } else {
                this.trigger(CommonEvent.COMMON_EVENT_AUTH_FAILURE);
                this.canRefuse && (this.authBtn as wx.UserInfoButton).destroy();
            }
        });
        this.authBtn && this.node.on("position-changed", () => {
            this.updateUserInfoButtonPos();
        });
        this.authBtn && this.updateUserInfoButtonPos();
    }

    protected updateUserInfoButtonPos() {
        let authBtn: wx.UserInfoButton = this.authBtn as wx.UserInfoButton;
        let widthRatio = SystemUtil.getInstance().windowWidth / cc.winSize.width;
        let heightRatio = SystemUtil.getInstance().screenHeight / cc.winSize.height;
        authBtn.style.width = this.node.width * widthRatio;
        authBtn.style.height = this.node.height * heightRatio;
        let worldPos: cc.Vec2 = this.node.parent.convertToWorldSpaceAR(this.node.getPosition());
        authBtn.style.left = worldPos.x * widthRatio - authBtn.style.width / 2;
        authBtn.style.top = (cc.winSize.height - worldPos.y) * heightRatio - authBtn.style.height / 2;
    }
}
