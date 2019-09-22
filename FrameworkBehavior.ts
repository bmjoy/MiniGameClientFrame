/*================================================================
 * Description 基础组件
 * Email huliuworld@yahoo.com
 * Created on Sun Sep 22 2019 0:51:37
 * Copyright (c) 2019 刘虎
================================================================*/

import { FrameworkObject } from "./FrameworkObject";

export class FrameworkBehavior extends FrameworkObject {

    protected exportFunctionNameList: string[] = [];
    protected object: cc.Object = null;
    protected readonly TAG: string = "FrameworkBehavior"

    /**
     * 自动绑定
     * @param object 需要绑定的对象
     */
    public autoBindFunction(object: cc.Object) {
        if (!cc.isValid(object)) {
            this.LOGE(this.TAG, "object is invalid");
            return;
        }
        this.object = object;
        for (let index = 0, length = this.exportFunctionNameList.length; index < length; index++) {
            this.bindFunction(this.exportFunctionNameList[index], this.exportFunctionNameList[index], false, false);
        }
        this.manualBindFunction();
    }

    /*
    * 扩展函数
    *   1. 默认情况下先执行 oldFunctionName 后执行 newFunctionName
    *   2. oldFunctionName 函数的所有参数都会当参数传递给 newFunctionName
    *   3. 如果 oldFunctionName 有返回值 返回值将作为 newFunctionName 最后一个参数传入
    * @params
    * object class 被扩展对象
    * oldFunctionName string 被扩展对象中的函数名称
    * newFunctionName string 扩展的函数名称
    * deprecated bool 废弃被扩展对象中的函数 只执行 newFunctionName
    * endCallBack bool 后调用 oldFunctionName
    * */
    protected bindFunction(oldFunctionName, newFunctionName, deprecated, endCallBack) {
        if (!this[newFunctionName]) {
            this.LOGE(this.TAG, "不存在函数:" + newFunctionName);
            return;
        }
        var oldFunc = this.object[oldFunctionName];
        var newFunc = this[newFunctionName];
        if (typeof this.object[oldFunctionName] !== "function") {
            this.object[oldFunctionName] = (...args) => {
                newFunc.call(this, args);
            };
            return;
        }
        if (deprecated) {
            this.object[oldFunctionName] = (...args) => {
                newFunc.call(this, args);
            };
            return;
        }
        if (endCallBack) {
            this.object[oldFunctionName] = (...args) => {
                newFunc.call(this, args);
                oldFunc.call(this.object, args);
            };
        } else {
            this.object[oldFunctionName] = (...args) => {
                var returnValue = oldFunc.call(this.object, args);
                newFunc.call(this, args, returnValue);
            };
        }
    }

    /*
    * 手动绑定函数 主要给子类重载
    * */
    protected manualBindFunction() {

    }

}
