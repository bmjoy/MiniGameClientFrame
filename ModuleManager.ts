/*================================================================
 * Description 模块管理器
 * Email huxiaoheigame@gmail.com
 * Created on Sun Sep 22 2019 12:46:12
 * Copyright (c) 2019 刘虎
================================================================*/

import { FrameworkObject } from "./FrameworkObject"
import { Utils } from "./Utils";
import { ModuleBase } from "./ModuleBase";

export class ModuleManager extends FrameworkObject {

    public readonly TAG: string = "ModuleManager";
    protected static instance: ModuleManager = null;
    protected modules: Map<string, ModuleBase> = new Map();

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
    public registerModule(moduleName: string, ModuleCtr: new () => ModuleBase, initParams?: any): FrameworkObject {
        if (this.modules.has(moduleName)) {
            Utils.LOGE(this.TAG, "重复模块:" + moduleName);
            return null;
        }
        let moduleCtr: ModuleBase = new ModuleCtr();
        moduleCtr.init(initParams);
        this.modules.set(moduleName, moduleCtr);
        return moduleCtr;
    }

    /**
     * 获取模块
     *
     * @param {string} moduleName
     * @returns {MoudleStruct}
     * @memberof ModuleManager
     */
    public getModule(moduleName: string): ModuleBase {
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
            Utils.LOGE(this.TAG, "移除模块未注册:" + moduleName);
            return;
        }
        let moduleCtr = this.modules.get(moduleName);
        moduleCtr.willDestroy();
        moduleCtr.destroy();
        this.modules.delete(moduleName);
    }

}

