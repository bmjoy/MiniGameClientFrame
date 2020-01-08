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
    protected systemInfo: SystemInfo;

    private constructor() {
        super();
        if (SystemUtil.getInstance()) {
            Utils.LOGE(this.TAG, "重复初始化");
        }
    }

    /**
     * 获取实例
     *
     * @static
     * @returns {SystemUtil}
     * @memberof SystemUtil
     */
    public static getInstance(): SystemUtil {
        return this._instance;
    }

    /**
     * 初始化
     *
     * @param {SystemInfo} systemInfo
     * @memberof SystemUtil
     */
    public init(systemInfo: SystemInfo) {
        this.systemInfo = systemInfo;
    }

    /**
     * 手机品牌
     *
     * @readonly
     * @type {string}
     * @memberof SystemUtil
     */
    public get brand(): string {
        if (!this.systemInfo.SDKVersion || Utils.compareVersion(this.systemInfo.SDKVersion, "1.5.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return "unknown";
        }
        return this.systemInfo.brand;
    }
    
    /**
     * 手机型号
     *
     * @readonly
     * @type {string}
     * @memberof SystemUtil
     */
    public get model(): string {
        return this.systemInfo.model;
    }
    
    /**
     * 设备像素比
     *
     * @readonly
     * @type {number}
     * @memberof SystemUtil
     */
    public get pixelRatio(): number {
        return this.systemInfo.pixelRatio;
    }
    
    /**
     * 屏幕宽度
     *
     * @readonly
     * @type {number}
     * @memberof SystemUtil
     */
    public get screenWidth(): number {
        if (!this.systemInfo.SDKVersion || Utils.compareVersion(this.systemInfo.SDKVersion, "1.1.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return 0;
        }
        return this.systemInfo.screenWidth;
    }
    
    /**
     * 屏幕高度
     *
     * @readonly
     * @type {number}
     * @memberof SystemUtil
     */
    public get screenHeight(): number {
        if (!this.systemInfo.SDKVersion || Utils.compareVersion(this.systemInfo.SDKVersion, "1.1.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return 0;
        }
        return this.systemInfo.screenHeight;
    }
    
    /**
     * 可使用窗口宽度
     *
     * @readonly
     * @type {number}
     * @memberof SystemUtil
     */
    public get windowWidth(): number {
        return this.systemInfo.windowWidth;
    }
    
    /**
     * 可使用窗口高度
     *
     * @readonly
     * @type {number}
     * @memberof SystemUtil
     */
    public get windowHeight(): number {
        if (!this.systemInfo.SDKVersion || Utils.compareVersion(this.systemInfo.SDKVersion, "1.1.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return 0;
        }
        return this.systemInfo.windowHeight;
    }
    
    /**
     * 状态栏高度
     *
     * @readonly
     * @type {number}
     * @memberof SystemUtil
     */
    public get statusBarHeight(): number {
        if (!this.systemInfo.SDKVersion || Utils.compareVersion(this.systemInfo.SDKVersion, "1.9.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return 0;
        }
        return this.systemInfo.statusBarHeight;
    }
    
    /**
     * 微信设置的语言
     *
     * @readonly
     * @type {string}
     * @memberof SystemUtil
     */
    public get language(): string {
        return this.systemInfo.language;
    }
    
    /**
     * 微信版本号
     *
     * @readonly
     * @type {string}
     * @memberof SystemUtil
     */
    public get version(): string {
        return this.systemInfo.version;
    }
    
    /**
     * 操作系统版本
     *
     * @readonly
     * @type {string}
     * @memberof SystemUtil
     */
    public get system(): string {
        return this.systemInfo.system;
    }
    
    /**
     * 客户端平台
     *
     * @readonly
     * @type {string}
     * @memberof SystemUtil
     */
    public get platform(): string {
        return this.systemInfo.platform;
    }
    
    /**
     * 用户字体大小设置
     *
     * @readonly
     * @type {string}
     * @memberof SystemUtil
     */
    public get fontSizeSetting(): string {
        if (!this.systemInfo.SDKVersion || Utils.compareVersion(this.systemInfo.SDKVersion, "1.5.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return "unknown";
        }
        return this.systemInfo.fontSizeSetting;
    }
    
    /**
     * 客户端基础库版本
     *
     * @readonly
     * @type {string}
     * @memberof SystemUtil
     */
    public get sdkVersion(): string {
        if (!this.systemInfo.SDKVersion || Utils.compareVersion(this.systemInfo.SDKVersion, "1.1.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return "unknown";
        }
        return this.systemInfo.SDKVersion;
    }
    
    /**
     * 设备性能等级
     *
     * @readonly
     * @type {number}
     * @memberof SystemUtil
     */
    public get benchmarkLevel(): number {
        if (!this.systemInfo.SDKVersion || Utils.compareVersion(this.systemInfo.SDKVersion, "1.8.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return -1;
        }
        return this.systemInfo.benchmarkLevel;
    }
    
    /**
     * 允许微信使用相册的开关
     *
     * @readonly
     * @type {boolean}
     * @memberof SystemUtil
     */
    public get albumAuthorized(): boolean {
        if (!this.systemInfo.SDKVersion || Utils.compareVersion(this.systemInfo.SDKVersion, "2.6.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return true;
        }
        return this.systemInfo.albumAuthorized;
    }
    
    /**
     * 允许微信使用摄像头的开关
     *
     * @readonly
     * @type {boolean}
     * @memberof SystemUtil
     */
    public get cameraAuthorized(): boolean {
        if (!this.systemInfo.SDKVersion || Utils.compareVersion(this.systemInfo.SDKVersion, "2.6.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return true;
        }
        return this.systemInfo.cameraAuthorized;
    }
    
    /**
     * 允许微信使用定位的开关
     *
     * @readonly
     * @type {boolean}
     * @memberof SystemUtil
     */
    public get locationAuthorized(): boolean {
        if (!this.systemInfo.SDKVersion || Utils.compareVersion(this.systemInfo.SDKVersion, "2.6.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return true;
        }
        return this.systemInfo.locationAuthorized;
    }
    
    /**
     * 允许微信使用麦克风的开关
     *
     * @readonly
     * @type {boolean}
     * @memberof SystemUtil
     */
    public get microphoneAuthorized(): boolean {
        if (!this.systemInfo.SDKVersion || Utils.compareVersion(this.systemInfo.SDKVersion, "2.6.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return true;
        }
        return this.systemInfo.microphoneAuthorized;
    }
    
    /**
     * 允许微信通知的开关
     *
     * @readonly
     * @type {boolean}
     * @memberof SystemUtil
     */
    public get notificationAuthorized(): boolean {
        if (!this.systemInfo.SDKVersion || Utils.compareVersion(this.systemInfo.SDKVersion, "2.6.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return true;
        }
        return this.systemInfo.notificationAuthorized;
    }
    
    /**
     * 允许微信通知带有提醒的开关
     *
     * @readonly
     * @type {boolean}
     * @memberof SystemUtil
     */
    public get notificationAlertAuthorized(): boolean {
        if (!this.systemInfo.SDKVersion || Utils.compareVersion(this.systemInfo.SDKVersion, "2.6.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return true;
        }
        return this.systemInfo.notificationAlertAuthorized;
    }
    
    /**
     * 允许微信通知带有标记的开关
     *
     * @readonly
     * @type {boolean}
     * @memberof SystemUtil
     */
    public get notificationBadgeAuthorized(): boolean {
        if (!this.systemInfo.SDKVersion || Utils.compareVersion(this.systemInfo.SDKVersion, "2.6.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return true;
        }
        return this.systemInfo.notificationBadgeAuthorized;
    }
    
    /**
     * 允许微信通知带有声音的开关
     *
     * @readonly
     * @type {boolean}
     * @memberof SystemUtil
     */
    public get notificationSoundAuthorized(): boolean {
        if (!this.systemInfo.SDKVersion || Utils.compareVersion(this.systemInfo.SDKVersion, "2.6.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return true;
        }
        return this.systemInfo.notificationSoundAuthorized;
    }
    
    /**
     * 蓝牙的系统开关
     *
     * @readonly
     * @type {boolean}
     * @memberof SystemUtil
     */
    public get bluetoothEnabled(): boolean {
        if (!this.systemInfo.SDKVersion || Utils.compareVersion(this.systemInfo.SDKVersion, "2.6.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return true;
        }
        return this.systemInfo.bluetoothEnabled;
    }
    
    /**
     * 地理位置的系统开关
     *
     * @readonly
     * @type {boolean}
     * @memberof SystemUtil
     */
    public get locationEnabled(): boolean {
        if (!this.systemInfo.SDKVersion || Utils.compareVersion(this.systemInfo.SDKVersion, "2.6.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return true;
        }
        return this.systemInfo.locationEnabled;
    }
    
    /**
     * wifi系统开关
     *
     * @readonly
     * @type {boolean}
     * @memberof SystemUtil
     */
    public get wifiEnabled(): boolean {
        if (!this.systemInfo.SDKVersion || Utils.compareVersion(this.systemInfo.SDKVersion, "2.6.0") < 0) {
            Utils.LOGE(this.TAG, "the wechat sdk version too low");
            return true;
        }
        return this.systemInfo.wifiEnabled;
    }
}
