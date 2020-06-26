/*================================================================
 * Description 自定义组件基类
 * Email huxiaoheigame@gmail.com
 * Created on Sun Mar 17 2019 16:46:2
 * Copyright (c) 2019 刘虎
================================================================*/

import { FrameworkBehavior } from "./FrameworkBehavior";

const { ccclass } = cc._decorator;

@ccclass
export class FrameworkComponent extends cc.Component {

    public readonly TAG: string = "FrameworkComponent";

    /**
     * 绑定函数
     *
     * @protected
     * @template A
     * @param {new() => A} Behavior
     * @memberof FrameworkComponent
     */
    protected bindBehavior<A extends FrameworkBehavior>(Behavior: new() => A) {
        let behavior: FrameworkBehavior = new Behavior();
        behavior.autoBindFunction(this);
    }

}


