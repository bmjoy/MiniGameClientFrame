/*================================================================
 * Description 窗口基类接口
 * Email huliuworld@yahoo.com
 * Created on Fri Jun 26 2020 17:13:24
 * Copyright (c) 2020 刘虎
================================================================*/

import { FrameworkComponent } from "./FrameworkComponent";

export class WindowBase extends FrameworkComponent {

    public readonly TAG: string = "WindowBase";

    /**
     * 弹窗即将展示(不要手动调用)
     *
     * @memberof WindowBase
     */
    public willShow() {

    }

    /**
     * 弹窗初始化(不要手动调用)
     *
     * @memberof WindowBase
     */
    public initData(data: any) {

    }

    /**
     * 弹窗即将销毁哦(不要手动调用)
     *
     * @memberof WindowBase
     */
    public willDestroy() {

    }
}

