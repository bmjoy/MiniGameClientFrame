/*================================================================
 * Description 自定义对象基类
 * Email huxiaoheigame@gmail.com
 * Created on Sat Jul 13 2019 2:50:34
 * Copyright (c) 2019 刘虎
================================================================*/

import { FrameworkBehavior } from "./FrameworkBehavior";

const { ccclass } = cc._decorator;

@ccclass
export class FrameworkObject extends cc.Object {

    public readonly TAG: string = "FrameworkObject";

    /**
     * 绑定函数
     *
     * @template A
     * @param {new () => A} Behavior
     * @memberof FrameworkObject
     */
    public bindBehavior<A extends FrameworkBehavior>(Behavior: new () => A) {
        let behavior: FrameworkBehavior = new Behavior();
        behavior.autoBindFunction(this);
    }

}
