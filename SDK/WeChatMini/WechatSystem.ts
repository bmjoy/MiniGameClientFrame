/*================================================================
 * Description 微信系统信息(建议使用FrameworkSystemInfo中接口)
 * Email huxiaoheigame@gmail.com
 * Created on Sun Nov 11 2018 11:3:26
 * Copyright (c) 2018 途游游戏
================================================================*/

import { FrameworkObject } from "../../FrameworkObject";
import { Utils } from "../../Utils";
import { SystemInfo } from "../../FrameworkSystem";

export class WechatSystem extends FrameworkObject implements SystemInfo {

    public readonly TAG: string = "WechatSystemInfo";
    private systemInfo: wx.SystemInfo = null;

    public init() {
        this.systemInfo = wx.getSystemInfoSync();
    }

    public get brand(): string {
        if (!this.systemInfo.SDKVersion || Utils.compareVersion(this.systemInfo.SDKVersion, "1.5.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return "unknown";
        }
        return this.systemInfo.brand;
    }

    public get model(): string {
        return this.systemInfo.model;
    }

    public get pixelRatio(): number {
        return this.systemInfo.pixelRatio;
    }

    public get screenWidth(): number {
        if (!this.systemInfo.SDKVersion || Utils.compareVersion(this.systemInfo.SDKVersion, "1.1.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return 0;
        }
        return this.systemInfo.screenWidth;
    }

    public get screenHeight(): number {
        if (!this.systemInfo.SDKVersion || Utils.compareVersion(this.systemInfo.SDKVersion, "1.1.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return 0;
        }
        return this.systemInfo.screenHeight;
    }

    public get windowWidth(): number {
        return this.systemInfo.windowWidth;
    }

    public get windowHeight(): number {
        if (!this.systemInfo.SDKVersion || Utils.compareVersion(this.systemInfo.SDKVersion, "1.1.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return 0;
        }
        return this.systemInfo.windowHeight;
    }

    public get statusBarHeight(): number {
        if (!this.systemInfo.SDKVersion || Utils.compareVersion(this.systemInfo.SDKVersion, "1.9.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return 0;
        }
        return this.systemInfo.statusBarHeight;
    }

    public get language(): string {
        return this.systemInfo.language;
    }

    public get version(): string {
        return this.systemInfo.version;
    }

    public get system(): string {
        return this.systemInfo.system;
    }

    public get platform(): string {
        return this.systemInfo.platform;
    }

    public get fontSizeSetting(): string {
        if (!this.systemInfo.SDKVersion || Utils.compareVersion(this.systemInfo.SDKVersion, "1.5.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return "unknown";
        }
        return this.systemInfo.fontSizeSetting;
    }

    public get SDKVersion(): string {
        if (!this.systemInfo.SDKVersion || Utils.compareVersion(this.systemInfo.SDKVersion, "1.1.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return "unknown";
        }
        return this.systemInfo.SDKVersion;
    }

    public get benchmarkLevel(): number {
        if (!this.systemInfo.SDKVersion || Utils.compareVersion(this.systemInfo.SDKVersion, "1.8.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return -1;
        }
        return this.systemInfo.benchmarkLevel;
    }

    public get albumAuthorized(): boolean {
        if (!this.systemInfo.SDKVersion || Utils.compareVersion(this.systemInfo.SDKVersion, "2.6.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return true;
        }
        return this.systemInfo.albumAuthorized;
    }

    public get cameraAuthorized(): boolean {
        if (!this.systemInfo.SDKVersion || Utils.compareVersion(this.systemInfo.SDKVersion, "2.6.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return true;
        }
        return this.systemInfo.cameraAuthorized;
    }

    public get locationAuthorized(): boolean {
        if (!this.systemInfo.SDKVersion || Utils.compareVersion(this.systemInfo.SDKVersion, "2.6.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return true;
        }
        return this.systemInfo.locationAuthorized;
    }

    public get microphoneAuthorized(): boolean {
        if (!this.systemInfo.SDKVersion || Utils.compareVersion(this.systemInfo.SDKVersion, "2.6.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return true;
        }
        return this.systemInfo.microphoneAuthorized;
    }

    public get notificationAuthorized(): boolean {
        if (!this.systemInfo.SDKVersion || Utils.compareVersion(this.systemInfo.SDKVersion, "2.6.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return true;
        }
        return this.systemInfo.notificationAuthorized;
    }

    public get notificationAlertAuthorized(): boolean {
        if (!this.systemInfo.SDKVersion || Utils.compareVersion(this.systemInfo.SDKVersion, "2.6.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return true;
        }
        return this.systemInfo.notificationAlertAuthorized;
    }

    public get notificationBadgeAuthorized(): boolean {
        if (!this.systemInfo.SDKVersion || Utils.compareVersion(this.systemInfo.SDKVersion, "2.6.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return true;
        }
        return this.systemInfo.notificationBadgeAuthorized;
    }

    public get notificationSoundAuthorized(): boolean {
        if (!this.systemInfo.SDKVersion || Utils.compareVersion(this.systemInfo.SDKVersion, "2.6.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return true;
        }
        return this.systemInfo.notificationSoundAuthorized;
    }

    public get bluetoothEnabled(): boolean {
        if (!this.systemInfo.SDKVersion || Utils.compareVersion(this.systemInfo.SDKVersion, "2.6.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return true;
        }
        return this.systemInfo.bluetoothEnabled;
    }

    public get locationEnabled(): boolean {
        if (!this.systemInfo.SDKVersion || Utils.compareVersion(this.systemInfo.SDKVersion, "2.6.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return true;
        }
        return this.systemInfo.locationEnabled;
    }

    public get wifiEnabled(): boolean {
        if (!this.systemInfo.SDKVersion || Utils.compareVersion(this.systemInfo.SDKVersion, "2.6.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return true;
        }
        return this.systemInfo.wifiEnabled;
    }

    public getMenuButtonBoundingClientRect(): { width: number, height: number, top: number, right: number, bottom: number, left: number } {
        if (!this.systemInfo.SDKVersion || Utils.compareVersion(this.systemInfo.SDKVersion, "2.1.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return { width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0 };
        }
        return wx.getMenuButtonBoundingClientRect();
    }

    public onNetworkStatusChange(callback: (res: { isConnected: boolean, networkType: "wifi" | "2g" | "3g" | "4g" | "5g" | "unknown" | "none" }) => void) {
        wx.onNetworkStatusChange(callback);
    }

    public offNetworkStatusChange(callback: () => void) {
        wx.offNetworkStatusChange(callback);
    }

    public getNetworkType(params: { success: (res: { networkType: "wifi" | "2g" | "3g" | "4g" | "5g" | "unknown" | "none" }) => void, fail: (res: { errMsg: string }) => void, complete?: () => void }) {
        wx.getNetworkType(params);
    }

}