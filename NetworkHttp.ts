/*================================================================
 * Description http请求网络
 * Email huliuworld@yahoo.com
 * Created on Fri Mar 22 2019 0:36:36
 * Copyright (c) 2019 刘虎
================================================================*/

import { Utils } from "./Utils";
import { FrameworkObject } from "./FrameworkObject";

export interface HttpBaseParams {
    url: string,
    data?: string | { [key: string]: any },
    header?: { [name: string]: string },
    method?: "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT",  //default GET 
    dataType?: "json" | "arraybuffer",                                          //default json
    responseType?: string,                                                      //default text
    timeout?: number,
    success?: (res: any) => void,
    fail?: (res?: any) => void,
    complete?: (res?: any) => void
}

export class NetworkHttp extends FrameworkObject {

    private static readonly TAG: string = "NetworkHttp";
    private constructor() {
        super();
        Utils.LOGE(NetworkHttp.TAG, "不需要初始化");
    }

    /**
     * http请求
     *
     * @static
     * @param {HttpBaseParams} params
     * @memberof NetworkHttp
     */
    public static httpRequest(params: HttpBaseParams) {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            wx.request({
                url: params.url,
                data: params.data,
                timeout: params.timeout || 30000,
                header: params.header,
                method: params.method || "GET",
                dataType: params.dataType,
                responseType: params.responseType || "text",
                success: (res: any) => {
                    Utils.LOGD(this.TAG, "success");
                    if (params.success) {
                        if (params.dataType == "json") {
                            params.success(JSON.parse(res));
                        } else {
                            params.success(res);
                        }
                    }
                },
                fail: (res: any) => {
                    Utils.LOGD(this.TAG, "failure");
                    if (params.fail) {
                        params.fail(res);
                    }
                },
                complete: (res) => {
                    Utils.LOGD(this.TAG, "complete");
                    if (params.complete) {
                        params.complete(res);
                    }
                }
            });
        } else {
            var xhr = cc.loader.getXMLHttpRequest();
            xhr.open(params.method || "GET", params.url, true);
            xhr.onreadystatechange = () => {
                switch (xhr.readyState) {
                    case 0:
                        Utils.LOGD(this.TAG, "delegate has created")
                        break;
                    case 1:
                        Utils.LOGD(this.TAG, "has called open function")
                        break;
                    case 2:
                        Utils.LOGD(this.TAG, "has called send function");
                        break;
                    case 3:
                        Utils.LOGD(this.TAG, "downloading");
                        break;
                    case 4:
                        Utils.LOGD(this.TAG, "done");
                        if (xhr.status >= 200 && xhr.status < 400 && params.success) {
                            if (params.dataType == "json") {
                                params.success(JSON.parse(xhr.responseText));
                            } else {
                                params.success(xhr.responseText);
                            }
                        } else if (params.fail) {
                            params.fail({ err: -1, status: xhr.status });
                        }
                        break;
                    default:
                        break;
                }
            };
            xhr.ontimeout = (error?: any) => {
                if (params.fail) {
                    params.fail(error);
                }
            };
            xhr.onerror = (error?: any) => {
                if (params.fail) {
                    params.fail(error);
                }
            };
            if (params.header) {
                for (const key in params.header) {
                    if (params.header.hasOwnProperty(key)) {
                        const element = params.header[key];
                        xhr.setRequestHeader(key, element);
                    }
                }
            }
            xhr.timeout = params.timeout || 30000;
            xhr.responseType = "json";
            if (params.dataType && params.dataType == "arraybuffer") {
                xhr.responseType = "arraybuffer";
            }
            if (params.data) {
                xhr.send(<Document>params.data);
            } else {
                xhr.send(null);
            }
        }
    }
}