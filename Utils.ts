/*================================================================
 * Description 工具集合
 * Email huliuworld@yahoo.com
 * Created on Sun Nov 11 2018 11:4:17
 * Copyright (c) 2018 刘虎
================================================================*/

export class Utils {

    private static readonly TAG: string = "Utils";
    private constructor() {
        Utils.LOGE(Utils.TAG, "不需要初始化");
    }

    protected static versionToNumber(version: string): number {
        try {
            var tmpArr: string[] = version.split(".");
            var versionNum: number = 0;
            for (let index = 0; index < 3; index++) {
                const element = tmpArr[index] || 0;
                versionNum += Number(element) * Math.pow(1000, 3 - index);
            }
            return versionNum;
        } catch (error) {
            console.error(this.TAG, "version is invalid");
            return 0;
        }
    }

    public static compareVersion(version: string, baseVersion: string): number {
        let versionNumber = this.versionToNumber(version);
        let baseVersionNumber = this.versionToNumber(baseVersion);
        if (versionNumber == baseVersionNumber) {
            return 0;
        } else if (versionNumber > baseVersionNumber) {
            return 1;
        }
        return -1;
    }

    public static LOGD(tag: string, msg?: any): void {
        console.log(tag, msg);
    }

    public static LOGE(tag: string, msg?: any): void {
        console.error(tag, msg);
    }

    public static LOGW(tag: string, msg?: any): void {
        console.warn(tag, msg);
    }

    public static getStorageSync(key: string, defaultValue: string): string {
        try {
            if (cc.sys.platform == cc.sys.WECHAT_GAME) {
                let storage = wx.getStorageSync(key);
                if (storage && storage.data) {
                    return storage.data;
                }
                return defaultValue;
            } else {
                let tmp = cc.sys.localStorage.getItem(key);
                if (tmp) {
                    return tmp;
                }
            }
            return defaultValue;
        } catch (e) {
            Utils.LOGE(this.TAG, "getLocalStorage error = " + JSON.stringify(e));
            return defaultValue;
        }
    }

    public static setStorage(key: string, value: any, isSync?: boolean, cb?: { success?: () => void, fail?: () => void, complete?: () => void }): void {
        try {
            if (typeof value == "number" || typeof value == "string" || typeof value == "boolean") {
                value = value;
            } else if (value instanceof Array || value instanceof Object) {
                value = JSON.stringify(value);
            } else {
                Utils.LOGE(this.TAG, "set storage error key is " + key);
            }
            if (cc.sys.platform == cc.sys.WECHAT_GAME) {
                if (isSync) {
                    wx.setStorage({
                        key: key,
                        data: value,
                        success: () => {
                            if (cb && cb.success) { cb.success(); }
                        },
                        fail: () => {
                            if (cb && cb.fail) { cb.fail(); }
                        },
                        complete: () => {
                            if (cb && cb.complete) { cb.complete(); }
                        }
                    });
                } else {
                    wx.setStorageSync(key, value);
                }
            } else {
                cc.sys.localStorage.setItem(key, value);
            }
        } catch (e) {
            Utils.LOGE(this.TAG, "setLocalStorage error = " + e);
        }
    }

    public static setImageToSpriteByUrl(url: string, sprite: cc.Sprite, success?: (tex: cc.Texture2D) => void, fail?: (err: Error) => void): void {
        if (!url || url.length == 0) {
            fail && fail(Error("url is error"));
        }
        cc.loader.load({url: url, type: "png"}, (err: Error, tex: cc.Texture2D) => {
            if (!err) {
                if (cc.isValid(sprite)) {
                    sprite.spriteFrame = new cc.SpriteFrame(tex);
                    success && success(tex);
                } else {
                    fail && fail(Error("sprite error"));
                }
            } else {
                fail && fail(err);
            }
        });
    }

    public static isAuthorWechat(type: "userInfo" | "userLocation" | "werun" | "writePhotosAlbum", cb?: (authorize: boolean)=>void) {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            wx.getSetting({
                success: (res: any) => {
                    cb && type === "userInfo" && cb(res.authSetting["scope.userInfo"]);
                    cb && type === "userLocation" && cb(res.authSetting["scope.userLocation"]);
                    cb && type === "werun" && cb(res.authSetting["scope.werun"]);
                    cb && type === "writePhotosAlbum" && cb(res.authSetting["scope.writePhotosAlbum"]);
                },
                fail: (res: any) => {
                    this.LOGE(this.TAG, JSON.stringify(res));
                }
            });
        } else {
            this.LOGW(this.TAG, "不是微信平台");
        }
    }

    public static getUserInfoWechat(cb: wx.GetUserInfoParams) {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            wx.getUserInfo(cb);
        }
    }

    public static formateStr(str: string, maxLength: number): string {
        if (str.length <= maxLength) {
            return str;
        }
        return str.substr(0, maxLength);
    }

    public static searchNode(parent: cc.Node, childName: string): cc.Node | null {
        for (let i = 0; i < parent.childrenCount; i++) {
            let childNode = parent.children[i];
            if (childNode.name === childName) {
                return childNode;
            }
            if (childNode.childrenCount > 0) {
                let node = this.searchNode(childNode, childName);
                if (cc.isValid(node)) {
                    return node;
                }
            }
        }
        return null;
    }

    public static deepCopy(obj: any): any {
        if (obj == undefined || obj == null) {
            return obj;
        }
        if (typeof obj != "object") {
            return obj;
        }
        var newObj = obj instanceof Array ? [] : {};
        for (let key in obj) {
            newObj[key] = this.deepCopy(obj[key]);
        }
        return newObj;
    }
}
