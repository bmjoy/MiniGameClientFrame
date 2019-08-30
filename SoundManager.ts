/*================================================================
 * Description 音效管理器
 * Email huliuworld@yahoo.com
 * Created on Sun Dec 09 2018 16:55:43
 * Copyright (c) 2018 刘虎
================================================================*/

import { Utils } from "./Utils";

export class SoundManager {
    private static readonly _instance: SoundManager = new SoundManager();
    private readonly TAG: string = "SoundManager";
    private _bgmAudioId: number = -1;
    private _isStopEffect: boolean = false;
    private _mute: boolean = false;

    private constructor() {
        if (SoundManager.getInstance()) {
            Utils.LOGE(this.TAG, "重复初始化");
        }
    }

    public static getInstance(): SoundManager {
        return this._instance;
    }

    /**
     * 是否静音
     */
    public isMute(): boolean {
        return this._mute;
    }

    /**
     * 播放音乐
     * @param url 
     * @param loop 
     */
    public playMusic(url: string, loop: boolean = true) {
        if (!url || this._mute) {
            Utils.LOGE(this.TAG, "music address is invalid");
            return;
        }
        this.stopMusic();
        if (url.indexOf("http") == 0) {
            cc.loader.load(url, (err, clip: cc.AudioClip) => {
                if (!err) {
                    Utils.LOGE(this.TAG, "play music error : " + url);
                } else {
                    this._bgmAudioId = cc.audioEngine.playMusic(clip, true);
                }
            });
        } else {
            cc.loader.loadRes(url, (err, clip: cc.AudioClip) => {
                if (err) {
                    Utils.LOGE(this.TAG, "play music error : " + url);
                } else {
                    this._bgmAudioId = cc.audioEngine.playMusic(clip, true);
                }
            })
        }
    }

    /**
     * 播放音效
     * @param url 
     */
    public playEffectSound(url) {
        if (this._isStopEffect || this._mute) {
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
     * 停止音效
     */
    public closeEffect() {
        this._isStopEffect = true;
        cc.audioEngine.stopAllEffects();
    }

    /**
     * 开启音效
     */
    public openEffect() {
        this._isStopEffect = false;
    }

    /**
     * 静音
     */
    public mute() {
        this._mute = true;
        cc.audioEngine.stopAllEffects();
        this.pauseMusic();
    }

    /**
     * 关闭静音
     */
    public unmute() {
        this._mute = false;
        this.resumeMusic();
    }
}