/*================================================================
 * Description 微信API
 * Email huliuworld@yahoo.com
 * Created on Wed Jul 10 2019 0:1:7
 * Copyright (c) 2019 刘虎
================================================================*/

declare namespace wx {

    interface BaseCallback {
        success?: (res?: any) => void;
        fail?: (res?: any) => void;
        complete?: (res?: any) => void;
    }
    export interface LaunchOption {
        scene: number; // 场景值
        query: any; // 启动参数
        shareTicket: string; // 票据
        referrerInfo: { appId: string, extraData: any }; // 来源信息
    }

    // --生命周期
    export function exitMiniProgram(cb?: BaseCallback): void;
    export function getLaunchOptionsSync(): LaunchOption;
    export function onHide(cb: () => void): void;
    export function offHide(cb: () => void): void;
    export function onShow(cb: (res: LaunchOption) => void): void;
    export function offShow(cb: () => void): void;

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

    //--音效相关
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

    //--数据缓存
    interface SetStorageParams extends BaseCallback {
        key: string;
        data: any;
    }
    interface GetStorageResult {
        data: any
    }
    interface StorageParams extends BaseCallback {
        key: string;
    }
    interface GetStorageInfoResult {
        keys: [string];
        currentSize: number;
        limitSize: number;
    }
    export function setStorage(params: SetStorageParams): void; // 将数据存储在本地缓存中指定的key中 异步
    export function setStorageSync(key: string, data: string): void; // 将数据存储在本地缓存中指定的key中 同步
    export function removeStorage(params: StorageParams): void; // 从本地缓存中移除指定key 异步
    export function removeStorageSync(key: string): void; // 从本地缓存中移除指定key 同步
    export function getStorage(params: StorageParams): void; // 从本地缓存中异步获取指定key的内容 异步
    export function getStorageSync(key: string): GetStorageResult; // 从本地缓存中异步获取指定key的内容 同步
    export function getStorageInfo(params: BaseCallback): void; // 获取当前storage的相关信息 异步
    export function getStorageInfoSync(): GetStorageInfoResult; // 获取当前storage的相关信息 同步
    export function clearStorage(params: BaseCallback): void; // 清理本地数据缓存 异步
    export function clearStorageSync(): void; // 清理本地数据缓存 同步

    //--网络
    interface RequestParams {
        url: string;
        data?: string | { [key: string]: any };
        header?: { [name: string]: string };
        method?: "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT";
        dataType?: string; // "json" | "arraybuffer"
        timeout?: number;
        responseType?: string;
        success?: (res: { data: any, statusCode: number, header?: { [key: string]: string } }) => void;
        fail?: (res?: any) => void;
        complete?: (res?: any) => void;
    }
    export class RequestTask {
        abort(): void;
    }
    export function request(param: RequestParams): RequestTask;

    interface LoginParams extends BaseCallback {
        timeout?: number;
    }
    export function login(params?: LoginParams): void;

    //--用户信息
    interface style {
        left: number,
        top: number,
        width: number,
        height: number,
        backgroundColor?: string,
        borderColor?: string,
        borderWidth: number,
        borderRadius: number,
        textAlign: "left" | "center" | "right",
        fontSize: number,
        lineHeight: number
    }
    interface CreateUserInfoButtonParams {
        type: "text" | "image",             // 按钮的类型
        text?: string,                      // type是text时有效
        image?: string,                     // type是image时有效
        style?: style,                      // 按钮的样式
        withCredentials: boolean,           // 是否带上登录态信息
        lang?: "en" | "zh_CN" | "zh_TW"     // 描述用户信息的语言 default en
    }
    export class UserInfoButton {
        type: "text" | "image";
        text: string;
        image: string;
        style: style;
        textAlign: "left" | "center" | "right";
        show(): void;
        hide(): void;
        destroy(): void;
        onTap(cb: (res?: any) => void): void;
        offTap(cb: (res?: any) => void): void;
    }
    interface GetUserInfoParams extends BaseCallback {
        withCredentials?: boolean,           // 是否带上登录态信息
        lang?: "en" | "zh_CN" | "zh_TW"     // 描述用户信息的语言 default en
    }
    export function getSetting(cb: BaseCallback): void; // 获取用户的当前设置
    export function createUserInfoButton(params: CreateUserInfoButtonParams): UserInfoButton;
    export function getUserInfo(cb: GetUserInfoParams): void; //获取用户数据

    //--转发
    export interface ShowShareMenuParams extends BaseCallback {
        withShareTicket?: boolean,
    }
    export interface UpdateShareMenuParams extends ShowShareMenuParams {
        isUpdatableMessage?: boolean,
        activityId?: string,
        templateInfo?: { name: string, value: string }[]
    }
    export interface ShareAppMessageParams {
        title?: string,
        imageUrl?: string,
        query?: string,
        imageUrlId?: string
    }
    export interface GetShareInfoParams extends BaseCallback {
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

}



