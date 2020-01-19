/*================================================================
 * Description 全局消息模块
 * Email huxiaoheigame@gmail.com
 * Created on Sun Nov 11 2018 11:2:21
 * Copyright (c) 2018 刘虎
================================================================*/

import { Utils } from "./Utils";

interface NotificationHandler {
    callback: (params?: any) => void,
    target: any
}

export class NotificationCenter extends cc.Object {

    private readonly TAG: string = "NotificationCenter";
    private static readonly instance: NotificationCenter = new NotificationCenter();
    private _events: { [key: string]: Array<NotificationHandler> } = {};
    private constructor() {
        super();
        if (NotificationCenter.getInstance()) {
            Utils.LOGE(this.TAG, "重复初始化");
        }
    }

    /**
     * 实例
     *
     * @static
     * @returns {NotificationCenter}
     * @memberof NotificationCenter
     */
    public static getInstance(): NotificationCenter {
        return this.instance;
    }

    /**
     * 监听指定消息
     *
     * @static
     * @param {string} event
     * @param {(params?: any) => void} callback
     * @param {*} [target]
     * @memberof NotificationCenter
     */
    public static listen(event: string, callback: (params?: any) => void, target?: any) {
        this.instance.listen(event, callback, target);
    }

    /**
     * 监听指定消息
     *
     * @param {string} event
     * @param {(params?: any) => void} callback
     * @param {*} [target]
     * @memberof NotificationCenter
     */
    public listen(event: string, callback: (params?: any) => void, target?: any) {
        this._events[event] = this._events[event] || [];
        let notificationHandler: NotificationHandler = {
            callback: callback,
            target: target || this
        }
        this._events[event].push(notificationHandler)
    }

    /**
     * 移除指定消息的监听
     *
     * @static
     * @param {string} event
     * @param {(params?: any) => void} callback
     * @param {*} [target]
     * @memberof NotificationCenter
     */
    public static ignore(event: string, callback: (params?: any) => void, target?: any): void {
        this.instance.ignore(event, callback, target);
    }

    /**
     * 移除指定消息的监听
     *
     * @param {string} event
     * @param {(params?: any) => void} callback
     * @param {*} [target]
     * @returns {void}
     * @memberof NotificationCenter
     */
    public ignore(event: string, callback: (params?: any) => void, target?: any): void {
        target = target || this;
        var callbacks = this._events[event];
        if (!callbacks) {
            return;
        }
        this._events[event] = callbacks.filter(function (notificationHandler: NotificationHandler) {
            return notificationHandler.target != target || notificationHandler.callback != callback;
        })
    }

    /**
     * 移除目标所有监听的消息
     *
     * @static
     * @param {*} target
     * @memberof NotificationCenter
     */
    public static ignoreAllTarget(target: any): void {
        this.instance.ignoreAllTarget(target);
    }

    /**
     * 移除目标所有监听的消息
     *
     * @param {*} target
     * @memberof NotificationCenter
     */
    public ignoreAllTarget(target: any): void {
        for (const event in this._events) {
            var notificationHandlers = this._events[event];
            if (notificationHandlers) {
                this._events[event] = notificationHandlers.filter(function (notificationHandler: NotificationHandler) {
                    if (notificationHandler.target != target) {
                        return true;
                    } else {
                        return false;
                    }
                }.bind(this))
            }
        }
    }

    /**
     * 触发指定消息
     *
     * @static
     * @param {string} event
     * @param {*} [params]
     * @memberof NotificationCenter
     */
    public static trigger(event: string, params?: any): void {
        this.instance.trigger(event, params);
    }

    /**
     * 触发指定消息
     *
     * @param {string} event
     * @param {*} [params]
     * @memberof NotificationCenter
     */
    public trigger(event: string, params?: any) {
        var notificationHandlers = this._events[event];
        if (notificationHandlers) {
            for (let index = 0; index < notificationHandlers.length; index++) {
                const element = notificationHandlers[index];
                element.callback.call(element.target, params);
            }
        } else {
            Utils.LOGD(this.TAG, event + "没有监听");
        }
    }
}