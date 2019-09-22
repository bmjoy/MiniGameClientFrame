/*================================================================
 * Description 系统信息
 * Email huliuworld@yahoo.com
 * Created on Sun Nov 11 2018 11:3:26
 * Copyright (c) 2018 刘虎
================================================================*/

import { Utils } from "./Utils";

interface SystemInfo extends wx.SystemInfo {

}

export class SystemUtil extends cc.Object {

    private readonly TAG: string = "SystemUtil";
    protected static readonly _instance: SystemUtil = new SystemUtil();
    protected _systemInfo: SystemInfo;

    private constructor() {
        super();
        if (SystemUtil.getInstance()) {
            Utils.LOGE(this.TAG, "重复初始化");
        }
    }

    public static getInstance(): SystemUtil {
        return this._instance;
    }

    public init(systemInfo: SystemInfo) {
        this._systemInfo = systemInfo;
    }

    // 手机品牌
    public get brand(): string {
        if (!this._systemInfo.SDKVersion || Utils.compareVersion(this._systemInfo.SDKVersion, "1.5.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return "unknown";
        }
        return this._systemInfo.brand;
    }
    // 手机型号
    public get model(): string {
        return this._systemInfo.model;
    }
    // 设备像素比
    public get pixelRatio(): number {
        return this._systemInfo.pixelRatio;
    }
    // 屏幕宽度
    public get screenWidth(): number {
        if (!this._systemInfo.SDKVersion || Utils.compareVersion(this._systemInfo.SDKVersion, "1.1.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return 0;
        }
        return this._systemInfo.screenWidth;
    }
    // 屏幕高度
    public get screenHeight(): number {
        if (!this._systemInfo.SDKVersion || Utils.compareVersion(this._systemInfo.SDKVersion, "1.1.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return 0;
        }
        return this._systemInfo.screenHeight;
    }
    // 可使用窗口宽度
    public get windowWidth(): number {
        return this._systemInfo.windowWidth;
    }
    // 可使用窗口高度
    public get windowHeight(): number {
        if (!this._systemInfo.SDKVersion || Utils.compareVersion(this._systemInfo.SDKVersion, "1.1.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return 0;
        }
        return this._systemInfo.windowHeight;
    }
    // 状态栏高度
    public get statusBarHeight(): number {
        if (!this._systemInfo.SDKVersion || Utils.compareVersion(this._systemInfo.SDKVersion, "1.9.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return 0;
        }
        return this._systemInfo.statusBarHeight;
    }
    // 微信设置的语言
    public get language(): string {
        return this._systemInfo.language;
    }
    // 微信版本号
    public get version(): string {
        return this._systemInfo.version;
    }
    // 操作系统版本
    public get system(): string {
        return this._systemInfo.system;
    }
    // 客户端平台
    public get platform(): string {
        return this._systemInfo.platform;
    }
    // 用户字体大小设置
    public get fontSizeSetting(): string {
        if (!this._systemInfo.SDKVersion || Utils.compareVersion(this._systemInfo.SDKVersion, "1.5.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return "unknown";
        }
        return this._systemInfo.fontSizeSetting;
    }
    // 客户端基础库版本
    public get sdkVersion(): string {
        if (!this._systemInfo.SDKVersion || Utils.compareVersion(this._systemInfo.SDKVersion, "1.1.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return "unknown";
        }
        return this._systemInfo.SDKVersion;
    }
    // 设备性能等级
    public get benchmarkLevel(): number {
        if (!this._systemInfo.SDKVersion || Utils.compareVersion(this._systemInfo.SDKVersion, "1.8.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return -1;
        }
        return this._systemInfo.benchmarkLevel;
    }
    // 允许微信使用相册的开关
    public get albumAuthorized(): boolean {
        if (!this._systemInfo.SDKVersion || Utils.compareVersion(this._systemInfo.SDKVersion, "2.6.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return true;
        }
        return this._systemInfo.albumAuthorized;
    }
    // 允许微信使用摄像头的开关
    public get cameraAuthorized(): boolean {
        if (!this._systemInfo.SDKVersion || Utils.compareVersion(this._systemInfo.SDKVersion, "2.6.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return true;
        }
        return this._systemInfo.cameraAuthorized;
    }
    // 允许微信使用定位的开关
    public get locationAuthorized(): boolean {
        if (!this._systemInfo.SDKVersion || Utils.compareVersion(this._systemInfo.SDKVersion, "2.6.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return true;
        }
        return this._systemInfo.locationAuthorized;
    }
    // 允许微信使用麦克风的开关
    public get microphoneAuthorized(): boolean {
        if (!this._systemInfo.SDKVersion || Utils.compareVersion(this._systemInfo.SDKVersion, "2.6.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return true;
        }
        return this._systemInfo.microphoneAuthorized;
    }
    // 允许微信通知的开关
    public get notificationAuthorized(): boolean {
        if (!this._systemInfo.SDKVersion || Utils.compareVersion(this._systemInfo.SDKVersion, "2.6.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return true;
        }
        return this._systemInfo.notificationAuthorized;
    }
    // 允许微信通知带有提醒的开关
    public get notificationAlertAuthorized(): boolean {
        if (!this._systemInfo.SDKVersion || Utils.compareVersion(this._systemInfo.SDKVersion, "2.6.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return true;
        }
        return this._systemInfo.notificationAlertAuthorized;
    }
    // 允许微信通知带有标记的开关
    public get notificationBadgeAuthorized(): boolean {
        if (!this._systemInfo.SDKVersion || Utils.compareVersion(this._systemInfo.SDKVersion, "2.6.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return true;
        }
        return this._systemInfo.notificationBadgeAuthorized;
    }
    // 允许微信通知带有声音的开关
    public get notificationSoundAuthorized(): boolean {
        if (!this._systemInfo.SDKVersion || Utils.compareVersion(this._systemInfo.SDKVersion, "2.6.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return true;
        }
        return this._systemInfo.notificationSoundAuthorized;
    }
    // 蓝牙的系统开关
    public get bluetoothEnabled(): boolean {
        if (!this._systemInfo.SDKVersion || Utils.compareVersion(this._systemInfo.SDKVersion, "2.6.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return true;
        }
        return this._systemInfo.bluetoothEnabled;
    }
    // 地理位置的系统开关
    public get locationEnabled(): boolean {
        if (!this._systemInfo.SDKVersion || Utils.compareVersion(this._systemInfo.SDKVersion, "2.6.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return true;
        }
        return this._systemInfo.locationEnabled;
    }
    // 的系统开关
    public get wifiEnabled(): boolean {
        if (!this._systemInfo.SDKVersion || Utils.compareVersion(this._systemInfo.SDKVersion, "2.6.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return true;
        }
        return this._systemInfo.wifiEnabled;
    }
}
