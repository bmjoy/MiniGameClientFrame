/*================================================================
 * Description 音效管理器
 * Email huliuworld@yahoo.com
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

    protected onCommonEventGameOnShow() {
        if (this._isStopMusic || this._mute) {
            return;
        }
        this.resumeMusic();
    }

    protected onCommonEventGameOnHide() {
        this.pauseMusic();
    }

    /**
     * 初始化音效状态
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
     */
    public isMute(): boolean {
        return this._mute;
    }

    /**
     * 是否关闭音乐
     */
    public isStopMusic() {
        return this._isStopMusic;
    }

    /**
     * 是否关闭音效
     */
    public isStopEffect() {
        return this._isStopEffect;
    }

    /**
     * 播放音乐
     * @param url 
     * @param loop 
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
     * @param url 
     */
    public playEffectSound(url) {
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
     */
    public pauseMusic() {
        if (this._bgmAudioId >= 0) {
            cc.audioEngine.pauseMusic();
        }
    }

    /**
     * 停止音乐
     */
    public stopMusic() {
        if (this._bgmAudioId >= 0) {
            cc.audioEngine.stopMusic();
            this._bgmAudioId = -1;
        }
    }

    /**
     * 恢复音乐
     */
    public resumeMusic() {
        if (this._bgmAudioId >= 0) {
            cc.audioEngine.resumeMusic();
        }
    }

    /**
     * 关闭音乐
     */
    public closeMusic() {
        this._isStopMusic = true;
        Utils.setStorage(KEY_STORAGE_MUSIC_STATUS, "1");
        this.pauseMusic();
    }

    /**
     * 开启音乐
     */
    public openMusic() {
        this._isStopMusic = false;
        Utils.setStorage(KEY_STORAGE_MUSIC_STATUS, "0");
        this.resumeMusic();
    }

    /**
     *  关闭音效
     */
    public closeEffect() {
        this._isStopEffect = true;
        Utils.setStorage(KEY_STORAGE_EFFECT_STATUS, "1");
        cc.audioEngine.stopAllEffects();
    }

    /**
     * 开启音效
     */
    public openEffect() {
        this._isStopEffect = false;
        Utils.setStorage(KEY_STORAGE_EFFECT_STATUS, "0");
    }

    /**
     * 静音
     */
    public mute() {
        this._mute = true;
        cc.audioEngine.stopAllEffects();
        this.pauseMusic();
        Utils.setStorage(KEY_STORAGE_MUTE_STATUS, "1");
    }

    /**
     * 关闭静音
     */
    public unmute() {
        this._mute = false;
        this.resumeMusic();
        Utils.setStorage(KEY_STORAGE_MUTE_STATUS, "0");
    }
}