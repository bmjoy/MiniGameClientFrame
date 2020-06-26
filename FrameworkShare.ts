/*================================================================
 * Description 分享
 * Email huliuworld@yahoo.com
 * Created on Fri Jun 26 2020 19:54:04
 * Copyright (c) 2020 刘虎
================================================================*/

import { FrameworkObject } from "./FrameworkObject";
import { WechatShare } from "./SDK/WeChatMini/WechatShare";

export interface Share {
    updateShareMenu: (params?: {
        isUpdatableMessage?: boolean,
        activityId?: string,
        templateInfo?: { parameterList: { name: string, value: string }[] },
        toDoActivityId?: string, //   新增群待办消息的id
        withShareTicket?: boolean,
        success?: (res?: any) => void;
        fail?: (res?: any) => void;
        complete?: (res?: any) => void;
    }) => void;
    showShareMenu: (params?: {
        withShareTicket?: boolean,
        success?: (res?: any) => void;
        fail?: (res?: any) => void;
        complete?: (res?: any) => void;
    }) => void;
    shareAppMessage: (params?: {
        title?: string,
        imageUrl?: string,
        query?: string,
        imageUrlId?: string,
        success?: (res?: any) => void;
        fail?: (res?: any) => void;
        complete?: (res?: any) => void;
    }) => void;
    onShareAppMessage: (cb: () => {
        title?: string,
        imageUrl?: string,
        query?: string,
        imageUrlId?: string,
        success?: (res?: any) => void,
        fail?: (res?: any) => void,
        complete?: (res?: any) => void
    }) => void;
    offShareAppMessage: (cb: () => {
        title?: string,
        imageUrl?: string,
        query?: string,
        imageUrlId?: string,
        success?: (res?: any) => void,
        fail?: (res?: any) => void,
        complete?: (res?: any) => void
    }) => void;
    hideShareMenu: (params?: {
        success?: (res?: any) => void;
        fail?: (res?: any) => void;
        complete?: (res?: any) => void;
    }) => void;
    getShareInfo: (params: {
        shareTicket: string,
        timeout?: number,
        success?: (res?: any) => void,
        fail?: (res?: any) => void,
        complete?: (res?: any) => void
    }) => void;
}


export class FrameworkShare extends FrameworkObject {

    public readonly TAG: string = "FrameworkShare";
    private static instance: FrameworkShare = null;
    private shareInstance: Share = null;

    private constructor() {
        super();
    }

    public static getInstance(): FrameworkShare {
        if (this.instance) {
            this.instance = new FrameworkShare();
            if (cc.sys.platform == cc.sys.WECHAT_GAME) {
                this.instance.shareInstance = new WechatShare();
            }
        }
        return this.instance;
    }

    /**
     * 更新转发菜单
     *
     * @param {{
     *         isUpdatableMessage?: boolean,
     *         activityId?: string,
     *         templateInfo?: { parameterList: { name: string, value: string }[] },
     *         toDoActivityId?: string, //   新增群待办消息的id
     *         withShareTicket?: boolean,
     *         success?: (res?: any) => void;
     *         fail?: (res?: any) => void;
     *         complete?: (res?: any) => void;
     *     }} [params]
     * @memberof FrameworkShare
     */
    public updateShareMenu(params?: {
        isUpdatableMessage?: boolean,
        activityId?: string,
        templateInfo?: { parameterList: { name: string, value: string }[] },
        toDoActivityId?: string, //   新增群待办消息的id
        withShareTicket?: boolean,
        success?: (res?: any) => void;
        fail?: (res?: any) => void;
        complete?: (res?: any) => void;
    }) {
        this.shareInstance && this.shareInstance.updateShareMenu(params);
    }

    /**
     * 展示转发菜单
     *
     * @param {{
     *         withShareTicket?: boolean,
     *         success?: (res?: any) => void;
     *         fail?: (res?: any) => void;
     *         complete?: (res?: any) => void;
     *     }} [params]
     * @memberof FrameworkShare
     */
    public showShareMenu(params?: {
        withShareTicket?: boolean,
        success?: (res?: any) => void;
        fail?: (res?: any) => void;
        complete?: (res?: any) => void;
    }) {
        this.shareInstance && this.shareInstance.showShareMenu(params);
    }

    /**
     * 分享
     *
     * @param {{
     *         title?: string,
     *         imageUrl?: string,
     *         query?: string,
     *         imageUrlId?: string,
     *         success?: (res?: any) => void,
     *         fail?: (res?: any) => void,
     *         complete?: (res?: any) => void
     * 
     *     }} [params]
     * @memberof FrameworkShare
     */
    public shareAppMessage(params?: {
        title?: string,
        imageUrl?: string,
        query?: string,
        imageUrlId?: string,
        success?: (res?: any) => void,
        fail?: (res?: any) => void,
        complete?: (res?: any) => void

    }) {
        this.shareInstance && this.shareInstance.shareAppMessage(params);
    }

    /**
     * 监听转发被拉起
     *
     * @param {() => {
     *         title?: string,
     *         imageUrl?: string,
     *         query?: string,
     *         imageUrlId?: string,
     *         success?: (res?: any) => void,
     *         fail?: (res?: any) => void,
     *         complete?: (res?: any) => void
     *     }} cb
     * @memberof FrameworkShare
     */
    public onShareAppMessage(cb:() => {
        title?: string,
        imageUrl?: string,
        query?: string,
        imageUrlId?: string,
        success?: (res?: any) => void,
        fail?: (res?: any) => void,
        complete?: (res?: any) => void
    }) {
        this.shareInstance && this.shareInstance.onShareAppMessage(cb);
    }

    /**
     * 移除转发被拉起的监听
     *
     * @param {() => {
     *         title?: string,
     *         imageUrl?: string,
     *         query?: string,
     *         imageUrlId?: string,
     *         success?: (res?: any) => void,
     *         fail?: (res?: any) => void,
     *         complete?: (res?: any) => void
     *     }} cb
     * @memberof FrameworkShare
     */
    public offShareAppMessage(cb: () => {
        title?: string,
        imageUrl?: string,
        query?: string,
        imageUrlId?: string,
        success?: (res?: any) => void,
        fail?: (res?: any) => void,
        complete?: (res?: any) => void
    }) {
        this.shareInstance && this.shareInstance.offShareAppMessage(cb);
    }

    /**
     * 隐藏转发
     *
     * @param {{
     *         success?: (res?: any) => void,
     *         fail?: (res?: any) => void,
     *         complete?: (res?: any) => void
     *     }} [params]
     * @memberof FrameworkShare
     */
    public hideShareMenu(params?: {
        success?: (res?: any) => void,
        fail?: (res?: any) => void,
        complete?: (res?: any) => void
    }) {
        this.shareInstance && this.shareInstance.hideShareMenu(params);
    }

    /**
     * 获取分享信息
     *
     * @param {{
     *         shareTicket: string,
     *         timeout?: number,
     *         success?: (res?: any) => void,
     *         fail?: (res?: any) => void,
     *         complete?: (res?: any) => void
     *     }} params
     * @memberof FrameworkShare
     */
    public getShareInfo(params: {
        shareTicket: string,
        timeout?: number,
        success?: (res?: any) => void,
        fail?: (res?: any) => void,
        complete?: (res?: any) => void
    }) {
        this.shareInstance && this.shareInstance.getShareInfo(params);
    }

}

