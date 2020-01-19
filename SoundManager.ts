/*================================================================
 * Description 音效管理器
 * Email huxiaoheigame@gmail.com
 * Created on Sun Dec 09 2018 16:55:43
 * Copyright (c) 2018 刘虎
================================================================*/

import { Utils } from "./Utils";
import { NotificationCenter } from "./NotificationCenter";
import { CommonEvent } from "./CommonEvent";

const KEY_STORAGE_MUSIC_STATUS: string = "KEY_STORAGE_MUSIC_STATUS";
const KEY_STORAGE_EFFECT_STATUS: string = "KEY_STORAGE_EFFECT_STATUS";
const KEY_STORAGE_MUTE_STATUS: string = "KEY_STORAGE_MUTE_STATUS";

export class SoundManager extends cc.Object {
    
    private readonly TAG: string = "SoundManager";
    private static _instance: SoundManager = null;
    private _bgmAudioId: number = -1;
    private _isStopEffect: boolean = false;
    private _isStopMusic: boolean = false;
    private _mute: boolean = false;

    private constructor() {
        super();
    }

    public static getInstance(): SoundManager {
        if (this._instance == null) {
            this._instance = new SoundManager();
            this._instance.initStatus();
            this._instance.registerEvents();
        }
        return this._instance;
    }

    protected registerEvents() {
        NotificationCenter.getInstance().listen(CommonEvent.COMMON_EVENT_GAME_ON_SHOW, this.onCommonEventGameOnShow, this);
        NotificationCenter.getInstance().listen(CommonEvent.COMMON_EVENT_GAME_ON_HIDE, this.onCommonEventGameOnHide, this);
    }

    /**
     * 进入前台恢复背景音效
     *
     * @protected
     * @returns
     * @memberof SoundManager
     */
    protected onCommonEventGameOnShow() {
        if (this._isStopMusic || this._mute) {
            return;
        }
        this.resumeMusic();
    }

    /**
     * 进入后台暂停背景音效
     *
     * @protected
     * @memberof SoundManager
     */
    protected onCommonEventGameOnHide() {
        this.pauseMusic();
    }

    /**
     * 初始化音效状态
     *
     * @protected
     * @memberof SoundManager
     */
    protected initStatus() {
        let musicStatus: string = Utils.getStorageSync(KEY_STORAGE_MUSIC_STATUS, "0");
        if (musicStatus == "1") {
            this._isStopMusic = true;
        }
        let effectStatus: string = Utils.getStorageSync(KEY_STORAGE_EFFECT_STATUS, "0");
        if (effectStatus == "1") {
            this._isStopEffect = true;
        }
        let muteStatus: string = Utils.getStorageSync(KEY_STORAGE_MUTE_STATUS, "0");
        if (muteStatus == "1") {
            this._mute = true;
        }
    }

    /**
     * 是否静音
     *
     * @returns {boolean}
     * @memberof SoundManager
     */
    public isMute(): boolean {
        return this._mute;
    }

    /**
     * 是否关闭音乐
     *
     * @returns
     * @memberof SoundManager
     */
    public isStopMusic() {
        return this._isStopMusic;
    }

    /**
     * 是否关闭音效
     *
     * @returns
     * @memberof SoundManager
     */
    public isStopEffect() {
        return this._isStopEffect;
    }

    /**
     * 播放音乐
     *
     * @param {string} url
     * @param {boolean} [loop=true]
     * @memberof SoundManager
     */
    public playMusic(url: string, loop: boolean = true) {
        if (!url) {
            Utils.LOGE(this.TAG, "music address is invalid");
        }
        this.stopMusic();
        if (url.indexOf("http") == 0) {
            cc.loader.load(url, (err, clip: cc.AudioClip) => {
                if (!err) {
                    Utils.LOGE(this.TAG, "play music error : " + url);
                } else {
                    this._bgmAudioId = cc.audioEngine.playMusic(clip, loop);
                    if (this._isStopMusic || this._mute) {
                        this.pauseMusic();
                    }
                }
            });
        } else {
            cc.loader.loadRes(url, (err, clip: cc.AudioClip) => {
                if (err) {
                    Utils.LOGE(this.TAG, "play music error : " + url);
                } else {
                    this._bgmAudioId = cc.audioEngine.playMusic(clip, loop);
                    if (this._isStopMusic || this._mute) {
                        this.pauseMusic();
                    }
                }
            });
        }
    }

    /**
     * 播放音效
     *
     * @param {string} url
     * @returns
     * @memberof SoundManager
     */
    public playEffectSound(url: string) {
        if (this._mute || this._isStopEffect) {
            return;
        }
        if (!url) {
            Utils.LOGE(this.TAG, "effect sound address is invalid");
            return;
        }
        if (url.indexOf("http") == 0) {
            cc.loader.load(url, (err: any, clip: cc.AudioClip) => {
                if (err) {
                    Utils.LOGE(this.TAG, "play effect error : " + url);
                } else {
                    cc.audioEngine.playEffect(clip, false);
                }
            });
        } else {
            cc.loader.loadRes(url, (err: any, clip: cc.AudioClip) => {
                if (err) {
                    Utils.LOGE(this.TAG, "play effect error : " + url);
                } else {
                    cc.audioEngine.playEffect(clip, false);
                }
            })
        }
    }

    /**
     * 暂停音乐
     *
     * @memberof SoundManager
     */
    public pauseMusic() {
        if (this._bgmAudioId >= 0) {
            cc.audioEngine.pauseMusic();
        }
    }

    /**
     * 停止音乐
     *
     * @memberof SoundManager
     */
    public stopMusic() {
        if (this._bgmAudioId >= 0) {
            cc.audioEngine.stopMusic();
            this._bgmAudioId = -1;
        }
    }

    /**
     * 恢复音乐
     *
     * @memberof SoundManager
     */
    public resumeMusic() {
        if (this._bgmAudioId >= 0) {
            cc.audioEngine.resumeMusic();
        }
    }

    /**
     * 关闭音乐
     *
     * @memberof SoundManager
     */
    public closeMusic() {
        this._isStopMusic = true;
        Utils.setStorage(KEY_STORAGE_MUSIC_STATUS, "1");
        this.pauseMusic();
    }

    /**
     * 开启音乐
     *
     * @memberof SoundManager
     */
    public openMusic() {
        this._isStopMusic = false;
        Utils.setStorage(KEY_STORAGE_MUSIC_STATUS, "0");
        this.resumeMusic();
    }

    /**
     * 关闭音效
     *
     * @memberof SoundManager
     */
    public closeEffect() {
        this._isStopEffect = true;
        Utils.setStorage(KEY_STORAGE_EFFECT_STATUS, "1");
        cc.audioEngine.stopAllEffects();
    }

    /**
     * 开启音效
     *
     * @memberof SoundManager
     */
    public openEffect() {
        this._isStopEffect = false;
        Utils.setStorage(KEY_STORAGE_EFFECT_STATUS, "0");
    }

    /**
     * 静音
     *
     * @memberof SoundManager
     */
    public mute() {
        this._mute = true;
        cc.audioEngine.stopAllEffects();
        this.pauseMusic();
        Utils.setStorage(KEY_STORAGE_MUTE_STATUS, "1");
    }

    /**
     * 关闭静音
     *
     * @memberof SoundManager
     */
    public unmute() {
        this._mute = false;
        this.resumeMusic();
        Utils.setStorage(KEY_STORAGE_MUTE_STATUS, "0");
    }
}