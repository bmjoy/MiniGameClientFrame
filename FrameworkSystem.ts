/*================================================================
 * Description 系统信息
 * Email liuhu@tuyoogame.com
 * Created on Wed May 06 2020
 * Copyright (c) 2020 途游游戏
================================================================*/

import { FrameworkObject } from "./FrameworkObject";
import { WechatSystem } from "./SDK/WeChatMini/WechatSystem";
import { Utils } from "./Utils";
import { NotificationCenter } from "./NotificationCenter";
import { CommonEvent } from "./CommonEvent";

export enum GameStatus {
    UNKNOW = 1,
    SHOW = 2,
    HIDE = 3
}

export interface SystemInfo {
    init(); // 初始化
    brand: string; // 手机品牌
    model: string; // 手机型号
    pixelRatio: number; // 设备像素比
    screenWidth: number; // 屏幕宽度
    screenHeight: number; // 屏幕高度
    windowWidth: number; // 可使用窗口宽度
    windowHeight: number; // 可使用窗口高度
    statusBarHeight: number; // 状态栏高度
    language: string; // 微信设置的语言
    version: string; // 微信版本号
    system: string; // 操作系统版本
    platform: string; // 客户端平台
    fontSizeSetting: string; // 用户字体大小设置。
    SDKVersion: string; // 客户端基础库版本
    benchmarkLevel: number; // 设备性能等级（仅Android小游戏）。取值为：-2 或 0（该设备无法运行小游戏），-1（性能未知），>=1（设备性能值，该值越高，设备性能越好，目前最高不到50)
    albumAuthorized: boolean; // 允许微信使用相册的开关（仅 iOS 有效）
    cameraAuthorized: boolean; // 允许微信使用摄像头的开关
    locationAuthorized: boolean; // 允许微信使用定位的开关
    microphoneAuthorized: boolean; // 允许微信使用麦克风的开关
    notificationAuthorized: boolean; // 允许微信通知的开关
    notificationAlertAuthorized: boolean; // 允许微信通知带有提醒的开关（仅 iOS 有效)
    notificationBadgeAuthorized: boolean; // 允许微信通知带有标记的开关（仅 iOS 有效）
    notificationSoundAuthorized: boolean; // 允许微信通知带有声音的开关（仅 iOS 有效）
    bluetoothEnabled: boolean; // 蓝牙的系统开关
    locationEnabled: boolean; // 地理位置的系统开关 
    wifiEnabled: boolean; // Wi-Fi 的系统开关
    onNetworkStatusChange(callback: (res: { isConnected: boolean, networkType: "wifi" | "2g" | "3g" | "4g" | "5g" | "unknown" | "none" }) => void): void;
    offNetworkStatusChange(callback: () => void): void;
    getNetworkType(params: { success: (res: { networkType: "wifi" | "2g" | "3g" | "4g" | "5g" | "unknown" | "none" }) => void, fail: (res: { errMsg: string }) => void, complete?: () => void });
    getMenuButtonBoundingClientRect(): { width: number, height: number, top: number, right: number, bottom: number, left: number }; // 获取按钮信息
}

export class FrameworkSystem extends FrameworkObject {

    public readonly TAG: string = "FrameworkSystem";
    private static instance: FrameworkSystem = null;
    private systemInstance: SystemInfo = null;
    private gameStatus: GameStatus = GameStatus.UNKNOW;

    private constructor() {
        super();
    }

    public static getInstance(): FrameworkSystem {
        if (this.instance == null) {
            this.instance = new FrameworkSystem();
            if (cc.sys.platform == cc.sys.WECHAT_GAME) {
                this.instance.systemInstance = new WechatSystem();
            }
            this.instance.init();
            this.instance.onNetworkStatusChange();
        }
        return this.instance;
    }

    private init() {
        this.systemInstance && this.systemInstance.init();
    }

    public setGameStatus(status: GameStatus) {
        this.gameStatus = status;
    }

    public getGameStatus(): GameStatus {
        return this.gameStatus;
    }

    public getBrand(): string {
        if (this.systemInstance) {
            return this.systemInstance.brand;
        }
        return "";
    }

    public getModel(): string {
        if (this.systemInstance) {
            return this.systemInstance.model;
        }
        return "unkonw";
    }

    public getPixelRatio(): number {
        if (this.systemInstance) {
            return this.systemInstance.pixelRatio;
        }
        return 0;
    };

    public getScreenWidth(): number {
        if (this.systemInstance) {
            return this.systemInstance.screenWidth;
        }
        return 0;
    };

    public getScreenHeight(): number {
        if (this.systemInstance) {
            return this.systemInstance.screenWidth;
        }
        return 0;
    }

    public getWindowWidth(): number {
        if (this.systemInstance) {
            return this.systemInstance.windowWidth;
        }
        return 0;
    }

    public getWindowHeight(): number {
        if (this.systemInstance) {
            return this.systemInstance.windowHeight;
        }
        return 0;
    }

    public getStatusBarHeight(): number {
        if (this.systemInstance) {
            return this.systemInstance.statusBarHeight;
        }
        return 0;
    }

    public getLanguage(): string {
        if (this.systemInstance) {
            return this.systemInstance.language;
        }
        return "";
    }

    public getVersion(): string {
        if (this.systemInstance) {
            return this.systemInstance.version;
        }
        return "";
    }

    public getSystem(): string {
        if (this.systemInstance) {
            return this.systemInstance.system;
        }
        return "";
    }

    public getPlatform(): string {
        if (this.systemInstance) {
            return this.systemInstance.platform;
        }
        return "";
    }

    public isAppleSystem(): boolean {
        if (this.systemInstance) {
            return this.systemInstance.system.indexOf("iOS") >= 0;
        }
        return false;
    }

    public getFontSizeSetting(): string {
        if (this.systemInstance) {
            return this.systemInstance.fontSizeSetting;
        }
        return "";
    }

    public getSDKVersion(): string {
        if (this.systemInstance) {
            return this.systemInstance.SDKVersion;
        }
        return "";
    }

    public getBenchmarkLevel(): number {
        if (this.systemInstance) {
            return this.systemInstance.benchmarkLevel;
        }
        return -1;
    }

    public getAlbumAuthorized(): boolean {
        if (this.systemInstance) {
            return this.systemInstance.albumAuthorized;
        }
        return false;
    }

    public getCameraAuthorized(): boolean {
        if (this.systemInstance) {
            return this.systemInstance.cameraAuthorized;
        }
        return false;
    }

    public getLocationAuthorized(): boolean {
        if (this.systemInstance) {
            return this.systemInstance.locationAuthorized;
        }
        return false;
    }

    public getMicrophoneAuthorized(): boolean {
        if (this.systemInstance) {
            return this.systemInstance.microphoneAuthorized;
        }
        return false;
    }

    public getNotificationAuthorized(): boolean {
        if (this.systemInstance) {
            return this.systemInstance.notificationAuthorized;
        }
        return false;
    }

    public getNotificationAlertAuthorized(): boolean {
        if (this.systemInstance) {
            return this.systemInstance.notificationAlertAuthorized;
        }
        return false;
    }

    public getNotificationBadgeAuthorized(): boolean {
        if (this.systemInstance) {
            return this.systemInstance.notificationBadgeAuthorized;
        }
        return false;
    }

    public getNotificationSoundAuthorized(): boolean {
        if (this.systemInstance) {
            return this.systemInstance.notificationSoundAuthorized;
        }
        return false;
    }

    public getBluetoothEnabled(): boolean {
        if (this.systemInstance) {
            return this.systemInstance.bluetoothEnabled;
        }
        return false;
    }

    public getLocationEnabled(): boolean {
        if (this.systemInstance) {
            return this.systemInstance.locationEnabled;
        }
        return false;
    }

    public getWifiEnabled(): boolean {
        if (this.systemInstance) {
            return this.systemInstance.wifiEnabled;
        }
        return false;
    }

    public getNetworkType(params: { success: (res: { networkType: "wifi" | "2g" | "3g" | "4g" | "5g" | "unknown" | "none" }) => void, fail: (res: { errMsg: string }) => void, complete?: () => void }) {
        this.systemInstance && this.systemInstance.getNetworkType(params);
    }

    public getMenuButtonBoundingClientRect(): { width: number, height: number, top: number, right: number, bottom: number, left: number } {
        if (this.systemInstance) {
            return this.systemInstance.getMenuButtonBoundingClientRect();
        }
        return { width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0 };
    }

    public onNetworkStatusChange() {
        this.offNetworkStatusChange();
        Utils.LOGW(this.TAG, "onNetworkStatusChange");
        this.systemInstance && this.systemInstance.onNetworkStatusChange(this.networkStatusChange.bind(this));
    }

    public offNetworkStatusChange() {
        this.systemInstance && this.systemInstance.offNetworkStatusChange(this.networkStatusChange.bind(this));
    }

    private networkStatusChange(params: { isConnected: boolean, networkType: "wifi" | "2g" | "3g" | "4g" | "5g" | "unknown" | "none" }) {
        Utils.LOGW(this.TAG, "networkStatusChange");
        NotificationCenter.getInstance().trigger(CommonEvent.COMMON_EVENT_NETWORK_STATUS_CHANGE, params);
    }

    /**
     * 世界坐标转换成系统坐标
     *
     * @param {cc.Vec2} pos
     * @returns {cc.Vec2}
     * @memberof FrameworkSystemInfo
     */
    public worldPosToSystemPos(pos: number[]): number[] {
        if (!this.systemInstance) {
            return pos;
        }
        let wxScreenWidth = this.systemInstance.screenWidth;
        let wxScreenHeight = this.systemInstance.screenHeight;
        let screenWidth = cc.winSize.width;
        let screenHeight = cc.winSize.height;
        let rateW = wxScreenWidth / screenWidth;
        let rateH = wxScreenHeight / screenHeight;
        return [pos[0] * rateW, (screenHeight - pos[1]) * rateH];
    }

    /**
     * 游戏像素转换成系统像素
     *
     * @param {number} px
     * @param {("width" | "height")} type
     * @returns {number}
     * @memberof FrameworkSystemInfo
     */
    public gamePxToSystemPx(px: number, type: "width" | "height"): number {
        if (type == "width") return px / cc.winSize.width * this.systemInstance.screenWidth;
        if (type == "height") return px / cc.winSize.height * this.systemInstance.screenHeight;
        return px;
    }
}