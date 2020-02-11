/*================================================================
 * Description 微信API
 * Email huxiaoheigame@gmail.com
 * Created on Wed Jul 10 2019 0:1:7
 * Copyright (c) 2019 刘虎
================================================================*/

declare namespace wx {

    // --基本数据结构
    interface BaseCallback {
        success?: (res?: any) => void;
        fail?: (res?: any) => void;
        complete?: (res?: any) => void;
    }

    // --渲染
    interface CanvasPattern {

    }
    interface Image {
        src: string;
        width: number;
        height: number;
        onload: (res: any) => void;
        onerror: (res: any) => void
    }
    interface RenderingContext {
        fillStyle: string | CanvasPattern;
        textAlign: string,
        baseLine: string,
        font: string;
        fill();
        fillRect(x: number, y: number, width: number, height: number);
        fillText(content: string, offsetX: number, offsetY: number);
        drawImage(image: Image | Canvas, dx: number, dy: number, dWidth: number, dHeight: number);
        drawImage(image: Image | Canvas, sx: number, sy: number, sWidth: number, sHeight: number, dx: number, dy: number, dWidth: number, dHeight: number);
        clearRect(x: number, y: number, width: number, height: number);
        createPattern(image: Image | Canvas, repetition: "repeat" | "repeat-x" | "repeat-y" | "no-repeat"): CanvasPattern;
        arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise: boolean);
    }
    export class Canvas {
        width: number;
        height: number;
        toTempFilePath(params: {
            x?: number,
            y?: number,
            width?: number,
            height?: number,
            destWidth?: number,
            destHeight?: number,
            fileType: "jpg" | "png",
            quality?: number,
            success?: (res: { tempFilePath: string }) => void,
            fail?: () => void,
            complete?: () => void
        }): void;
        getContext(contextType: "2d" | "webgl", contextAttributes?: { antialias?: boolean, preserveDrawingBuffer?: boolean, antialiasSamples?: number }): RenderingContext;
        toDataURL(): string;
    }
    export function createCanvas(): Canvas;
    export function createImage(): Image;


    // --生命周期
    interface LaunchOption {
        scene: number;                                  // 场景值
        query: any;                                     // 启动参数
        shareTicket: string;                            // 票据
        referrerInfo: { appId: string, extraData: any }; // 来源信息
    }
    export function exitMiniProgram(cb?: BaseCallback): void;
    export function getLaunchOptionsSync(): LaunchOption;
    export function onHide(cb: () => void): void;
    export function offHide(cb: () => void): void;
    export function onShow(cb: (res: LaunchOption) => void): void;
    export function offShow(cb: () => void): void;

    // --登录
    export function login(params?: { timeout?: number, fail?: (res: any) => void, success?: (res: { code: string }) => void, complete?: () => void }): void;

    // --系统信息
    export interface SystemInfo {
        brand?: string; // 手机品牌 > 1.5.0
        model: string; // 手机型号
        pixelRatio: number; // 设备像素比
        screenWidth?: number; // 屏幕宽度 > 1.1.0
        screenHeight?: number; // 屏幕高度 > 1.1.0
        windowWidth: number; // 可使用窗口宽度
        windowHeight: number; // 可使用窗口高度
        statusBarHeight?: number; // 状态栏高度 > 1.9.0
        language: string; // 微信设置的语言
        version: string; // 微信版本号
        system: string; // 操作系统版本
        platform: string; // 客户端平台
        fontSizeSetting?: string; // 用户字体大小设置。以“我-设置-通用-字体大小”中的设置为准，单位 px。 > 1.5.0
        SDKVersion?: string; // 客户端基础库版本 > 1.1.0
        benchmarkLevel?: number; // 设备性能等级（仅Android小游戏）。取值为：-2 或 0（该设备无法运行小游戏），-1（性能未知），>=1（设备性能值，该值越高，设备性能越好，目前最高不到50) > 1.8.0
        albumAuthorized?: boolean; // 允许微信使用相册的开关（仅 iOS 有效）> 2.6.0
        cameraAuthorized?: boolean; // 允许微信使用摄像头的开关 > 2.6.0
        locationAuthorized?: boolean; // 允许微信使用定位的开关 > 2.6.0
        microphoneAuthorized?: boolean; // 允许微信使用麦克风的开关 > 2.6.0
        notificationAuthorized?: boolean; // 允许微信通知的开关 > 2.6.0
        notificationAlertAuthorized?: boolean; // 允许微信通知带有提醒的开关（仅 iOS 有效) > 2.6.0
        notificationBadgeAuthorized?: boolean; // 允许微信通知带有标记的开关（仅 iOS 有效）> 2.6.0
        notificationSoundAuthorized?: boolean; // 允许微信通知带有声音的开关（仅 iOS 有效）> 2.6.0
        bluetoothEnabled?: boolean; // 蓝牙的系统开关 > 2.6.0
        locationEnabled?: boolean; // 地理位置的系统开关 > 2.6.0
        wifiEnabled?: boolean; // Wi-Fi 的系统开关
    }
    export function getSystemInfoSync(): SystemInfo;

    // --音效相关
    export class InnerAudioContext {
        src: string; // 音频资源的地址
        autoplay: boolean; // 是否自动播放
        loop: boolean; // 是否循环播放
        obeyMuteSwitch: boolean; // 是否遵循系统静音开关，当此参数为 false 时，即使用户打开了静音开关，也能继续发出声音
        readonly duration: number; // 当前音频的长度，单位 s。只有在当前有合法的 src 时返回
        readonly currentTime: number; // 当前音频的播放位置，单位 s。只有在当前有合法的 src 时返回，时间不取整，保留小数点后 6 位
        paused: boolean; // 当前是是否暂停或停止状态，true 表示暂停或停止，false 表示正在播放
        readonly buffered: number; // 音频缓冲的时间点，仅保证当前播放时间点到此时间点内容已缓冲
        volume: number; // 音量。范围 0~1。
        play(): void; // 播放
        pause(): void; // 暂停。暂停后的音频再播放会从暂停处开始播放
        stop(): void; // 停止。停止后的音频再播放会从头开始播放。
        seek(position: number): void; // 跳转到指定位置，单位 s
        destroy(): void; // 销毁当前实例
        onCanplay(callback: () => void): void; // 监听音频进入可以播放状态的事件
        offCanplay(callback: () => void): void; // 取消监听音频进入可以播放状态的事件
        onPlay(callback: () => void): void; // 监听音频播放事件
        offPlay(callback: () => void): void; // 取消监听音频播放事件
        onPause(callback: () => void): void; // 监听音频暂停事件
        offPause(callback: () => void): void; // 取消监听音频暂停事件
        onStop(callback: () => void): void; // 监听音频停止事件
        offStop(callback: () => void): void; // 取消监听音频停止事件
        onEnded(callback: () => void): void; // 监听音频自然播放至结束的事件
        offEnded(callback: () => void): void; // 取消监听音频自然播放至结束的事件
        onTimeUpdate(callback: () => void): void; // 监听音频播放进度更新事件
        offTimeUpdate(callback: () => void): void; // 取消监听音频播放进度更新事件
        onError(callback: () => void): void; // 监听音频播放错误事件
        offError(callback: () => void): void; // 取消监听音频播放错误事件
        onWaiting(callback: () => void): void; // 监听音频加载中事件，当音频因为数据不足，需要停下来加载时会触发
        offWaiting(callback: () => void): void; // 取消监听音频加载中事件，当音频因为数据不足，需要停下来加载时会触发
        onSeeking(callback: () => void): void; // 监听音频进行跳转操作的事件
        offSeeking(callback: () => void): void; // 取消监听音频进行跳转操作的事件
        onSeeked(callback: () => void): void; // 监听音频完成跳转操作的事件
        offSeeked(callback: () => void): void; // 取消监听音频完成跳转操作的事件
    }
    export function createInnerAudioContext(): InnerAudioContext;

    // --Http网络
    interface HttpRequestParams {
        url: string;
        data?: string | { [key: string]: any };
        header?: { [name: string]: string };
        method?: "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT";
        dataType?: "json" | "arraybuffer";
        timeout?: number;
        responseType?: string;
        success?: (res: { data: any, statusCode: number, header?: { [key: string]: string } }) => void;
        fail?: (res?: any) => void;
        complete?: (res?: any) => void;
    }
    export class RequestTask {
        abort(): void;
    }
    export function request(param: HttpRequestParams): RequestTask;

    // --用户信息
    export interface UserInfo {
        nickName: string,
        avatarUrl: string,
        gender: 0 | 1 | 2,
        country: string,
        province: string,
        city: string,
        language: "en" | "zh_CN" | "zh_TW",
    }
    interface Style {
        left: number,
        top: number,
        width: number,
        height: number,
        backgroundColor?: string,
        borderColor?: string,
        borderWidth?: number,
        borderRadius?: number,
        textAlign?: "left" | "center" | "right",
        fontSize?: number,
        lineHeight?: number
    }
    export class UserInfoButton {
        type: "text" | "image";
        text: string;
        image: string;
        style: Style;
        textAlign: "left" | "center" | "right";
        show(): void;
        hide(): void;
        destroy(): void;
        onTap(cb: (res?: any) => void): void;
        offTap(cb: (res?: any) => void): void;
    }
    export function getSetting(cb: BaseCallback): void; // 获取用户的当前设置
    export function createUserInfoButton(params: {
        type: "text" | "image",             // 按钮的类型
        text?: string,                      // type是text时有效
        image?: string,                     // type是image时有效
        style?: Style,                      // 按钮的样式
        withCredentials: boolean,           // 是否带上登录态信息
        lang?: "en" | "zh_CN" | "zh_TW"     // 描述用户信息的语言 default en
    }): UserInfoButton;
    interface GetUserInfoParams {
        withCredentials?: boolean,              // 是否带上登录态信息
        lang?: "en" | "zh_CN" | "zh_TW",        // 描述用户信息的语言 default en
        success?: (res: {
            errMsg: string,
            userInfo: UserInfo,
            rawData: string,
            signature: string,
            encryptedData: string,
            iv: string,
            cloudID: string
        }) => void,
        fail?: (res: any) => void,
        complete?: (res: any) => void
    }
    export function getUserInfo(cb: GetUserInfoParams): void; //获取用户数据

    // --转发
    interface ShowShareMenuParams extends BaseCallback {
        withShareTicket?: boolean
    }
    interface UpdateShareMenuParams extends ShowShareMenuParams {
        isUpdatableMessage?: boolean,
        activityId?: string,
        templateInfo?: { name: string, value: string }[]
    }
    interface ShareAppMessageParams {
        title?: string,
        imageUrl?: string,
        query?: string,
        imageUrlId?: string
    }
    interface GetShareInfoParams extends BaseCallback {
        shareTicket: string,
        timeout?: number
    }
    export function updateShareMenu(params?: UpdateShareMenuParams);
    export function showShareMenu(params?: ShowShareMenuParams);
    export function shareAppMessage(params?: ShareAppMessageParams);
    export function onShareAppMessage(cb: () => ShareAppMessageParams);
    export function offShareAppMessage(cb: () => ShareAppMessageParams);
    export function hideShareMenu(params?: BaseCallback);
    export function getShareInfo(params: GetShareInfoParams);

    // --开放数据
    interface KVData {
        key: string,
        value: string
    }
    interface UserGameData {
        avatarUrl: string,
        nickname: string,
        openid: string,
        KVDataList: KVData[]
    }
    export function setUserCloudStorage(params: { KVDataList: KVData[], success?: (res: any) => void, fail?: (res: any) => void, complete?: (res: any) => void });
    export function getUserCloudStorage(params: { keyList: string[], success?: (res: any) => void, fail?: (res: any) => void, complete?: (res: any) => void });
    export function getSharedCanvas(): Canvas;
    export function getGroupCloudStorage(params: {
        shareTicket: string,
        keyList: string[],
        success?: (res: { errMsg: string, data: UserGameData[] }) => void,
        fail?: (res: any) => void,
        complete?: (res: any) => void
    });
    export function getFriendCloudStorage(params: {
        keyList: string[],
        success?: (res: { errMsg: string, data: UserGameData[] }) => void,
        fail?: (res: any) => void,
        complete?: (res: any) => void
    });

    export class OpenDataContext {
        canvas: Canvas | HTMLImageElement;
        postMessage(data: { [propName: string]: number | string | boolean }): void;
    }
    export function getOpenDataContext(): OpenDataContext;
    export function onMessage(cb: (res: { key: string, value: number | string | boolean }) => void);

    // --游戏圈
    interface CreateClubButtonParams {
        type: "text" | "image",
        style: Style,
        text?: string,
        image?: string,
        icon?: string
    }
    export class GameClubButton {
        icon: "green" | "white" | "dark" | "light";
        type: "text" | "image";
        text: string;
        image: string;
        style: Style;
        show();
        hide();
        destroy();
        onTap(callback: () => void);
        offTap(callback: () => void);
    }
    export function createGameClubButton(params: CreateClubButtonParams): GameClubButton;

    // --广告
    export class BannerAd {
        style: {top: number, left: number, width: number, height: number, realWidth: number, realHeight: number};
        show(): Promise;
        hide();
        destroy();
        onResize(callback: () => void);
        offResize(callback?: () => void);
        onLoad(callback: () => void);
        offLoad(callback?: () => void);
        onError(callback: (res: {errMsg: string, errCode: number}) => void);
        offError(callback?: () => void);
    }
    export function createBannerAd(params: {adUnitId: string, adIntervals?: boolean, style: {left: number, top: number, width: number, height: number}}): BannerAd;

    export class RewardedVideoAd {
        load(): Promise;
        show(): Promise;
        destroy();
        onLoad(callback: () => void);
        offLoad(callback?: () => void);
        onError(callback: (res: {errMsg: string, errCode: number}) => void);
        offError(callback?: () => void);
        onClose(callback: (isEnded: boolean) => void);
        offClose(callback?: () => void);
    }
    export function createRewardedVideoAd(params: {adUnitId: string, multiton?: boolean}): RewardedVideoAd;

    export class InterstitialAd {
        load(): Promise;
        show(): Promise;
        destroy();
        onLoad(callback: () => void);
        offLoad(callback?: () => void);
        onError(callback: (res: {errMsg: string, errCode: number}) => void);
        offError(callback?: () => void);
        onClose(callback: () => void);
        offClose(callback?: () => void);
    }
    export function createInterstitialAd(params: {adUnitId: string}): InterstitialAd;

    export class GridAd {
        style: {top: number, left: number, width: number, height: number, realWidth: number, realHeight: number};
        show(): Promise;
        hide();
        onResize(callback?: () => void);
        onError(callback: (res: {errMsg: string, errCode: number}) => void);
        offError(callback?: () => void);
        destroy();
    }
    export function createGridAd(params: { adUnitId: string, adTheme: "white" | "black", gridCount: number, style: { left: number, top: number, width: number, opacity: number } });

}



