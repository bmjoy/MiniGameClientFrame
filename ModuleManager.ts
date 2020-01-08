/*================================================================
 * Description 模块管理器
 * Email huliuworld@yahoo.com
 * Created on Sun Sep 22 2019 12:46:12
 * Copyright (c) 2019 刘虎
================================================================*/

import { FrameworkObject } from "./FrameworkObject"

interface MoudleStruct {
    TAG: string;
    moduleCtr: FrameworkObject
}

export class ModuleManager extends FrameworkObject {

    protected readonly TAG: string = "ModuleManager";
    protected static instance: ModuleManager = null;
    protected modules: Map<string, MoudleStruct> = new Map();

    protected constructor() {
        super()
    }
    
    /**
     * 获取实例
     *
     * @static
     * @returns {ModuleManager}
     * @memberof ModuleManager
     */
    public static getInstance(): ModuleManager {
        if (this.instance == null) {
            this.instance = new ModuleManager();
        }
        return this.instance;
    }

    /**
     * 注册模块
     *
     * @param {string} moduleName
     * @param {new () => FrameworkObject} ModuleCtr
     * @param {*} [initParams]
     * @returns {FrameworkObject}
     * @memberof ModuleManager
     */
    public registerModule(moduleName: string, ModuleCtr: new () => FrameworkObject, initParams?: any): FrameworkObject {
        if (this.modules.has(moduleName)) {
            this.LOGE(this.TAG, "重复模块:" + moduleName);
            return null;
        }
        let moduleCtr = new ModuleCtr();
        "function" === typeof moduleCtr["init"] && moduleCtr["init"](initParams);
        this.modules.set(moduleName, {
            TAG: moduleName,
            moduleCtr: moduleCtr
        });
        return moduleCtr;
    }

    /**
     * 获取模块
     *
     * @param {string} moduleName
     * @returns {MoudleStruct}
     * @memberof ModuleManager
     */
    public getModule(moduleName: string): MoudleStruct {
        return this.modules.get(moduleName);
    }

    /**
     * 移除模块
     *
     * @param {string} moduleName
     * @returns
     * @memberof ModuleManager
     */
    public removeModule(moduleName: string) {
        if (!this.modules.has(moduleName)) {
            this.LOGE(this.TAG, "移除模块未注册:" + moduleName);
            return;
        }
        let moudleStruct = this.modules.get(moduleName);
        if ("function" === typeof moudleStruct.moduleCtr["onDestroy"]) {
            moudleStruct.moduleCtr["onDestroy"]();
        }
        if ("function" === typeof moudleStruct.moduleCtr.destroy) {
            moudleStruct.moduleCtr.destroy();
        }
        this.modules.delete(moduleName);
    }

}

