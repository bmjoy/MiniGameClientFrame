/*================================================================
 * Description 场景管理器
 * Email huliuworld@yahoo.com
 * Created on Thu Jul 18 2019 23:39:56
 * Copyright (c) 2019 刘虎
================================================================*/

import { Utils } from "./Utils"

export enum ChangeSceneResultCode {
    CHANGE_SCENE_SCUUSESS = 1000,
    CURRENT_SCENE_NOT_FIND = -1000,
    TARGET_SCENE_NOT_FIND = -1001,
    LOAD_SCENE_RES_ERROR = -1002
}

export interface SceneParams {
    from: string,       // scene name
    to: string[]        // [scene name]
}

export interface ChangeSceneResult {
    errMsg: string,
    code: ChangeSceneResultCode
}

export class SceneManager {

    private readonly TAG: string = "SceneManager";
    private static instance: SceneManager = new SceneManager();
    private sceneParmas: SceneParams[] = null;
    private hasInit: boolean = false;
    private curSceneName: string = null;

    private constructor() {
        if (SceneManager.getInstance()) {
            Utils.LOGE(this.TAG, "重复初始化");
        }
    }

    public static getInstance(): SceneManager {
        return this.instance;
    }

    public init(params: SceneParams[], currSceneName: string): void {
        if (this.hasInit) {
            Utils.LOGW(this.TAG, "You should never call this method again, unless you know what you are doing");
        }
        this.sceneParmas = params;
        this.hasInit = true;
        for (let i = 0; i < params.length; i++) {
            if (currSceneName == params[i].from) {
                this.curSceneName = currSceneName;
                break;
            }
        }
        (this.curSceneName == null) && Utils.LOGE(this.TAG, "current scene not find in params");
    }

    public changeScene(from: string, to: string, onLaunched?: () => void, fail?: (res: ChangeSceneResult) => void, progress?: (completed: number, total: number, item: any) => void): void {
        if (!this.hasInit) {
            Utils.LOGE(this.TAG, "You should call init method before calling changeScene method");
            return;
        }
        for (let i = 0; i < this.sceneParmas.length; i++) {
            let params = this.sceneParmas[i];
            if (from == params.from) {
                for (let j = 0; j < params.to.length; j++) {
                    if (to == params.to[j]) {
                        cc.director.preloadScene(params.to[j], progress, (error: Error, asset: cc.SceneAsset) => {
                            if (error) {
                                fail && fail({ errMsg: "load scene res error", code: ChangeSceneResultCode.LOAD_SCENE_RES_ERROR });
                            } else {
                                cc.director.runSceneImmediate(asset.scene, onLaunched);
                            }
                        });
                        return;
                    }
                }
                fail && fail({ errMsg: "target scene not find", code: ChangeSceneResultCode.TARGET_SCENE_NOT_FIND });
            }
        }
        fail && fail({ errMsg: "current scene not find", code: ChangeSceneResultCode.CURRENT_SCENE_NOT_FIND });
    }

}

