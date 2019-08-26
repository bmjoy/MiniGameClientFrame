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
    private _recyclePool: wx.InnerAudioContext[] = [];
    private _bgmAudioContext: wx.InnerAudioContext = null;
    private _bgmAudioId: number = -1;
    private _isStopEffect: boolean = false;

    private constructor() {
        if (SoundManager.getInstance()) {
            Utils.LOGE(this.TAG, "重复初始化");
        }
    }

    public static getInstance(): SoundManager {
        return this._instance;
    }

    public playMusic(url: string, loop?: boolean) {
        if (!url) {
            Utils.LOGE(this.TAG, "music address is invalid");
            return;
        }
        if (loop === false) {
            loop = false;
        } else {
            loop = true;
        }
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            if (!this._bgmAudioContext) {
                this._bgmAudioContext = wx.createInnerAudioContext();
            }
            this._bgmAudioContext.stop();
            this._bgmAudioContext.src = url;
            this._bgmAudioContext.loop = loop;
            this._bgmAudioContext.play();
        } else {
            cc.loader.load(url, function (err, clip) {
                if (!err) {
                    Utils.LOGE(this.TAG, "play music error : " + url);
                } else {
                    this._bgmAudioId = cc.audioEngine.playMusic(clip, true);
                }
            }.bind(this));
        }
    }

    public playEffectSound(url) {
        if (this._isStopEffect) {
            return;
        }
        if (!url) {
            Utils.LOGE(this.TAG, "effect sound address is invalid");
            return;
        }
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            var effectContext: wx.InnerAudioContext = null;
            if (this._recyclePool.length == 0) {
                effectContext = wx.createInnerAudioContext();
            } else {
                effectContext = this._recyclePool.pop();
            }
            effectContext.src = url;
            effectContext.loop = false;
            effectContext.onStop(function () {
                effectContext.offStop(function () {
                    Utils.LOGD(this.TAG, "off stop success");
                }.bind(this));
                this._recyclePool.push(effectContext);
            }.bind(this));
        } else {
            cc.loader.load(url, function (err: any, clip: cc.AudioClip) {
                if (err) {
                    Utils.LOGE(this.TAG, "play effect error : " + url);
                } else {
                    cc.audioEngine.playEffect(clip, false);
                }
            }.bind(this));
        }
    }

    public stopMusic() {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            if (this._bgmAudioContext) {
                this._bgmAudioContext.stop();
            }
        } else {
            if (this._bgmAudioId > 0) {
                cc.audioEngine.stopMusic();
            }
        }
    }

    public resumeMusic() {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            if (this._bgmAudioContext) {
                this._bgmAudioContext.play();
            }
        } else {
            if (this._bgmAudioId > 0) {
                cc.audioEngine.resumeMusic();
            }
        }
    }

    public stopEffect() {
        this._isStopEffect = true;
    }

    public resumeEffect() {
        this._isStopEffect = false;
    }
}