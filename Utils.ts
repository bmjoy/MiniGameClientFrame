/*================================================================
 * Description 工具集合
 * Email huxiaoheigame@gmail.com
 * Created on Sun Nov 11 2018 11:4:17
 * Copyright (c) 2018 刘虎
================================================================*/

export class Utils extends cc.Object {

    public static readonly TAG: string = "Utils";
    private constructor() {
        super();
        Utils.LOGE(Utils.TAG, "不需要初始化");
    }

    /**
     * 版本号转数字
     *
     * @protected
     * @static
     * @param {string} version 位版本号
     * @returns {number}
     * @memberof Utils
     */
    protected static versionToNumber(version: string): number {
        try {
            let tmpArr: string[] = version.split(".");
            let versionNum: number = 0;
            for (let index = 0; index < tmpArr.length; index++) {
                let element = tmpArr[index] || 0;
                versionNum += Number(element) * Math.pow(1000, tmpArr.length - index);
            }
            return versionNum;
        } catch (error) {
            this.LOGE(this.TAG, "version is invalid");
            return 0;
        }
    }

    /**
     * 版本号比较
     *
     * @static
     * @param {string} version 位版本号 
     * @param {string} baseVersion 位版本号
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
            this.LOGE(this.TAG, "getLocalStorage error = " + JSON.stringify(e));
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
                this.LOGE(this.TAG, "set storage error key is " + key);
            }
            cc.sys.localStorage.setItem(key, value);
        } catch (e) {
            this.LOGE(this.TAG, "setLocalStorage error = " + e);
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
        cc.loader.load({ url: url, type: "png" }, (err: Error, tex: cc.Texture2D) => {
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

}
