/*================================================================
 * Description 工具集合
 * Email huliuworld@yahoo.com
 * Created on Sun Nov 11 2018 11:4:17
 * Copyright (c) 2018 刘虎
================================================================*/

export class Utils extends cc.Object {

    private static readonly TAG: string = "Utils";
    private constructor() {
        super();
        Utils.LOGE(Utils.TAG, "不需要初始化");
    }

    /**
     * 版本号转数字
     *
     * @protected
     * @static
     * @param {string} version 3位版本号
     * @returns {number}
     * @memberof Utils
     */
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

    /**
     * 版本号比较
     *
     * @static
     * @param {string} version 3位版本号 
     * @param {string} baseVersion 3位版本号
     * @returns {number}
     * @memberof Utils
     */
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

    /**
     * 调试日志
     *
     * @static
     * @param {string} tag
     * @param {*} [msg]
     * @memberof Utils
     */
    public static LOGD(tag: string, msg?: any): void {
        console.log(tag, msg);
    }

    /**
     * 错误日志
     *
     * @static
     * @param {string} tag
     * @param {*} [msg]
     * @memberof Utils
     */
    public static LOGE(tag: string, msg?: any): void {
        console.error(tag, msg);
    }

    /**
     * 警告日志
     *
     * @static
     * @param {string} tag
     * @param {*} [msg]
     * @memberof Utils
     */
    public static LOGW(tag: string, msg?: any): void {
        console.warn(tag, msg);
    }

    /**
     * 获取本地指定key缓存
     *
     * @static
     * @param {string} key
     * @param {string} defaultValue
     * @returns {string}
     * @memberof Utils
     */
    public static getStorageSync(key: string, defaultValue: string): string {
        try {
            let tmp = cc.sys.localStorage.getItem(key);
            if (tmp) {
                return tmp;
            }
            return defaultValue;
        } catch (e) {
            Utils.LOGE(this.TAG, "getLocalStorage error = " + JSON.stringify(e));
            return defaultValue;
        }
    }

    /**
     * 设置本地缓存
     *
     * @static
     * @param {string} key
     * @param {*} value
     * @memberof Utils
     */
    public static setStorage(key: string, value: any): void {
        try {
            if (typeof value == "number" || typeof value == "string" || typeof value == "boolean") {
                value = value;
            } else if (value instanceof Array || value instanceof Object) {
                value = JSON.stringify(value);
            } else {
                Utils.LOGE(this.TAG, "set storage error key is " + key);
            }
            cc.sys.localStorage.setItem(key, value);
        } catch (e) {
            Utils.LOGE(this.TAG, "setLocalStorage error = " + e);
        }
    }

    /**
     * 为精灵设置纹理
     *
     * @static
     * @param {string} url
     * @param {cc.Sprite} sprite
     * @param {(tex: cc.Texture2D) => void} [success]
     * @param {(err: Error) => void} [fail]
     * @memberof Utils
     */
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

    /**
     * 格式化字符串
     *
     * @static
     * @param {string} str
     * @param {number} maxLength
     * @returns {string}
     * @memberof Utils
     */
    public static formateStr(str: string, maxLength: number): string {
        if (str.length <= maxLength) {
            return str;
        }
        return str.substr(0, maxLength);
    }

    /**
     * 查找节点
     *
     * @static
     * @param {cc.Node} parent
     * @param {string} childName
     * @returns {(cc.Node | null)}
     * @memberof Utils
     */
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

    /**
     * 深度拷贝
     *
     * @static
     * @param {*} obj
     * @returns {*}
     * @memberof Utils
     */
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

    //----微信
    /**
     * 权限检测(微信)
     *
     * @static
     * @param {("userInfo" | "userLocation" | "werun" | "writePhotosAlbum")} type
     * @param {(authorize: boolean)=>void} [cb]
     * @memberof Utils
     */
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

    /**
     * 获取用户信息(微信)
     *
     * @static
     * @param {wx.GetUserInfoParams} cb
     * @memberof Utils
     */
    public static getUserInfoWechat(cb: wx.GetUserInfoParams) {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            wx.getUserInfo(cb);
        }
    }

    /**
     * 创建微信授权按钮
     *
     * @static
     * @param {wx.CreateClubButtonParams} params
     * @returns {wx.GameClubButton}
     * @memberof Utils
     */
    public static createGameClubButton(params: wx.CreateClubButtonParams): wx.GameClubButton {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            return wx.createGameClubButton(params);
        }
    }
}
