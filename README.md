# 休闲游戏前端框架

> 基于`cocos creator`内含部分微信小游戏`API`

## 游戏案例

![微信小游戏-逻辑大挑战](https://www.huxiaohei.com/res/logi/logo.jpg)

## 框架定位

基于框架快速开发包括但不限于`微信`、`百度`、`头条`等平台小游戏。统一的框架设计便于后续项目的维护与升级，灵活的业务组件方便应对不同平台的定制需求。

## 架构特色

* 继承于`cc.Object`的基类对象
* 继承于`cc.Component`的基类组件
* 基于装饰器模式设计的业务组件(有效应对多渠道定制，功能AB测试等)
* 场景管理器
* 模块管理器
* 弹窗管理器
* 图集资源管理器
* 音频管理器
* 消息通知中心
* http网络请求封装
* 微信小游戏部分`API`
* 游戏常用函数封装

## 使用说明

在创建控制器、数据等对象时尽量继承`FrameworkObject`，在创建`UI`组件时尽量继承`FrameworkComponent`。因为里面已经集成了消息中心，图集资源管理，场景管理器，音效管理器，业务组件等常用接口，使用非常方便也便于代码风格统一。

### 业务组件

基于装饰器模式设计，有效解决多渠道对界面和功能定制需求，不用在源码中处处添加`if...else..`语句。当然也可以将游戏中原有脚本对比成`Node`节点，而业务组件对比成`Component`，将业务组件绑定到原有脚本上，对原有功能原有脚本进行扩展，函数替换，修改等。要添加业务组件的对象需继承`FrameworkObject`或者`FrameworkComponent`，业务组价必须继承`FrameworkBehavior`。

* 替换原函数
    ```ts
    import { ABehavior } from "./ABehavior"
    class AObject extends FrameworkObject {
        protected readonly TAG: string = "AObject";
        public num: number = 1;
        init() {
            this.autoBindFunction(ABehavior);
            functionNameA();
            functionNameB();
        }

        functionNameA() {
            this.LOGD(this.TAG, "functionNameA_" + this.num);    
        }

        functionNameB() {
            this.LOGD(this.TAG, "functionNameB_" + this.num);
        }
    }

    import { AObject } from "./AObject"
    class ABehavior extends FrameworkBehavior {
        protected readonly TAG: string = "ABehavior";
        protected exportFunctionNameList: string[] = [
            'functionNameA',
            'functionNameB'
        ];

        functionNameA() {
            let object = this.object as AObject
            object.num = 2;
            this.object.LOGD(this.TAG, "functionNameA_", object.num);
        }

        functionNameB() {
            let object = this.object as AObject
            object.num = 2;
            this.object.LOGD(this.TAG, "functionNameB_", object.num);
        }
    }
    ```
    `AObject`中的函数`functionNameA`和`functionNameB`将会被替换成`ABehavior`中对应的`functionNameA`和`functionNameB`函数。因此执行代码会发现输出
    ```
    ABehavior functionNameA_2
    ABehavior functionNameB_2
    ```

* 扩展函数
    ```ts
    import { ABehavior } from "./ABehavior"
    class AObject extends FrameworkObject {
        protected readonly TAG: string = "AObject";

        init() {
            this.autoBindFunction(ABehavior);
            functionNameA(1);
            functionNameB(1); 
        }

        functionNameA(num: number): number {
            this.LOGD(this.TAG, "functionNameA_" + num);
            return num + 1;
        }

        functionNameB(num: number) {
            this.LOGD(this.TAG, "functionNameB_" + num);
        }
    }

    import { AObject } from "./AObject"
    class ABehavior extends FrameworkBehavior {
        protected readonly TAG: string = "ABehavior";

        functionNameA(num: number, returnValue: number) {
            this.LOGD(this.TAG, "functionNameA_" + (num + returnValue));
        }

        functionNameB(num: number) {
            this.LOGD(this.TAG, "functionNameB_" + num);
        }

        protected manualBindFunction() {
            // 函数名不必一直
            // 先执行AObject中functionNameA 在执行ABehavior中functionNameA 并且AObject中functionNameA函数如果有返回值，则将返回值作为参数传递给ABehavior中functionNameA函数
            this.bindFunction("functionNameA", "functionNameA", false, false);
            // 先执行ABehavior中functionNameA 在执行AObject中functionNameA
            this.bindFunction("functionNameA", "functionNameA", false, true);
        }
    }
    ```
    执行结果
    ```ts
    AObject functionNameA_1
    ABehavior functionNameA_3
    ABehavior functionNameB_1
    AObject functionNameB_1
    ```

### 场景管理器

单例设计模式，初始化的时候指定从当前场景(`from`)可以切换到哪些场景(`to`)，类似状态机有效控制场景的切换。
* 初始化
    ```ts
    export interface SceneParams {
        from: string,       // scene name
        to: string[]        // [scene name]
    }
    public init(params: SceneParams[], currSceneName: string): void;
    ```
* 切换场景
    ```ts
    public changeScene(from: string, to: string, onBeforeLoadScene?: () => void, onLaunched?: () => void, fail?: (res: ChangeSceneResult) => void, progress?: (completed: number, total: number, item: any) => void): void;
    ```
    如果脚本继承于`FrameworkObject`或者`FrameworkComponent`可以直接在脚本中调用(推荐使用)
    ```ts
    this.changeScene(from, to, onBeforeLoadScene, onLaunched, fail, progress)
    ```

### 模块管理器

单例设计模式，在游戏启动时初始化必要的游戏模块。模块控制器必须继承`FrameworkObject`

* 模块注册

    在模块控制器脚本中实现`init`函数，模块被实例化时将会被调用，并且为`init`函数传入`initParams`参数
    ```ts
    public registerModule(moduleName: string, ModuleCtr: new () => FrameworkObject, initParams?: any): FrameworkObject;
    ```
* 移除模块
    
    在游戏退出某个场景或者某些操作之后，确定该模块暂时不在使用可以将其销毁并且移除。移除模块时，如果模块控制器实现函数`onDestroy`，那么`onDestroy`函数将会被调用。
    ```ts
    public removeModule(moduleName: string);
    ```
* 获取模块
    
    比如在`UI`脚本中，需要获取该脚本所属模块控制器中的某些数据或者调用模块控制器中的函数。但不建议跨模块控制器调用，因为模块分化的目的就是为了降低代码耦合度，而跨模块调用会增加代码耦合度，并且代码不稳定性增大。
    ```ts
    public getModule(moduleName: string): MoudleStruct;
    ```

### 弹窗管理器

单例设计模式，管理游戏弹窗。弹窗队列可以控制弹窗顺序弹出，弹出时是否隐藏已经弹出接口，是否需要遮罩，是否可重复弹出等。如果一个弹窗在两个及以上界面弹出，建议使用弹窗管理器。如果确认此弹窗只在一个界面使用，不需要使用`cc.loader`那么不必将`Prefab`放在`resource`目录下，可以减小包体积。

* 打开弹窗

    如果弹窗脚本有实现对应函数，那么会依次调用`willShow`、`initData`、`showed`。`initData`会传入`data`;
    ```ts
    interface OpenWindowParams {
        isSequence?: boolean;               // 是否在队列等待 default true
        hideOther?: boolean;                // 是否隐藏其他界面 default false
        data?: any;                         // 参数
        touchMaskClose?: boolean;           // 点击遮罩关闭 default false
        repeat?: boolean;                   // 是的支持在队列中存在多个 default true
        needMask?: boolean;                 // 是否需要mask default true
        maskOpacity?: number;                // mask透明度
        errorCallback?: Function            // 失败回调
    }
    public openWindow<T extends cc.Component>(prefabPath: string, component: new () => T, params?: OpenWindowParams);
    ```
* 关闭弹窗

    如果使用`openWindow`接口打开的弹窗，一定要使用`closeWindow`去关闭。如果弹窗脚本实现了`willDestroy`，那么在销毁前会调用`willDestroy`。
    ```ts
    public closeWindow<T extends cc.Component>(component: new () => T);
    ```
### 图集资源管理器

单例设计模式，为图集资源提供缓存，对外提供两个接口为`cc.Sprite`设置纹理。

* 设置纹理

    ```ts
    // 为节点上的精灵设置纹理
    public setSpriteFrameForNode(node: cc.Node, url: string);
    // 为精灵设置纹理
    public setSpriteFrameForSprite(sprite: cc.Sprite, url: string);
    ```
    如果脚本继承于`FrameworkObject`或者`FrameworkComponent`可以直接在脚本中调用(推荐使用)
    ```ts
    this.setSpriteFrameForNode(node, url);
    this.setSpriteFrameForSprite(sprite, url);
    ```
### 音频管理器

单例设计模式，在游戏切入后台会自动暂停播放，回到前台会恢复。提供音乐和音频的播放，暂停，静音等接口。

* 播放音频
    
    ```ts
    // 播放音乐
    public playMusic(url: string, loop: boolean = true);
    // 播放音效
    public playEffectSound(url: string);
    ```
    如果脚本继承于`FrameworkObject`或者`FrameworkComponent`可以直接在脚本中调用(推荐使用)
    ```ts
    // 播放音乐
    this.playMusic(url, loop);
    // 播放音效
    this.playEffect(url);
    ```

### 消息通知中心

单例设计模式，游戏本地消息中心。

* 监听消息
    
    ```ts
    public static listen(event: string, callback: (params?: any) => void, target?: any);
    public listen(event: string, callback: (params?: any) => void, target?: any);
    ```
    如果脚本继承于`FrameworkObject`或者`FrameworkComponent`可以直接在脚本中调用(推荐使用)
    ```ts
    this.listen(event, callback, target);
    ```

* 移除消息
    
    在对象被销毁时一定要要
    ```ts
    // 移除指定消息
    public static ignore(event: string, callback: (params?: any) => void, target?: any): void;
    public ignore(event: string, callback: (params?: any) => void, target?: any): void;
    // 移除target监听的所有消息
    public static ignoreAllTarget(target: any): void;
    public ignoreAllTarget(target: any): void;
    ```
    如果脚本继承于`FrameworkObject`或者`FrameworkComponent`可以直接在脚本中调用(推荐使用)
    ```ts
    // 移除指定消息
    this.ignore(event, callback, target);
    // 移除target监听的所有消息
    this.ignoreAllTarget(target);
    ```

### http网络请求封装

兼容微信平台和浏览器

* 请求
    ```ts
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
    public static httpRequest(params: HttpBaseParams);
    ```

### 微信相关

#### 授权

将逐渐`AuthComponent`绑定到对应节点，如果玩家没有授权则会在对应节点上创建透明授权按钮，玩家授权成功游戏内创建的所有透明授权按钮将会被销毁。

#### 分享

封装相关接口在`WechatShare`，按照微信官方文档说明调用即可。

## 欢迎讨论

EMail: huxiaoheigame@gmail.com