/*================================================================
 * Description 模块基类
 * Email huliuworld@yahoo.com
 * Created on Fri Jun 26 2020 18:31:50
 * Copyright (c) 2020 刘虎
================================================================*/

import { FrameworkObject } from "./FrameworkObject";

export class ModuleBase extends FrameworkObject {

    public readonly TAG: string = "ModuleBase";

    public init(data: any) {

    }

    public willDestroy() {

    }
}