/*================================================================
 * Description 文件系统
 * Email liuhu@tuyoogame.com
 * Created on Mon May 11 2020
 * Copyright (c) 2020 途游游戏
================================================================*/

import { FrameworkObject } from "./FrameworkObject";
import { WechatFile } from "./SDK/WeChatMini/WechatFile";
import { Utils } from "./Utils";

export interface FileSystem {
    getSavedFileList(params: { success: (res: { fileList: { filePath: string, size: number, createTime: number }[] }) => void, fail: (res: { errMsg: string }) => void, complete?: () => void });
    readDir(params: { dirPath: string, success: (res: { files: string[] }) => void, fail: (res: { errMsg: string }) => void, complete?: () => void });
    readDirSync(dirPath: string): string[];
    stat(params: { path: string, recursive?: boolean, success: (res: { stats: Stats | { [key: string]: Stats } }) => void, fail: (res: { errMsg: string }) => void, complete?: () => void });
    statSync(path: string): Stats;
    readFile(params: { filePath: string, encoding: string, position?: string, success: (res: { data: string | ArrayBuffer }) => void, fail: (res: { errMsg: string }) => void, complete?: () => void });
    readFileSync(filePath: string, encoding: string, position?: string, length?: string): string | ArrayBuffer;
    unlink(params: { filePath: string, success: (res: { errMsg: string }) => void, fail: (res: { errMsg: string }) => void, complete?: () => void });
    unzip(params: { zipFilePath: string, targetPath: string, success: (res: { errMsg: string }) => void, fail: (res: { errMsg: string }) => void, complete?: () => void });
}

export interface Stats {
    mode: string;
    size: number;
    lastAccessedTime: number;
    lastModifiedTime: number;
    isFile(): boolean;
    isDirectory(): boolean;
}

export class FrameworkFile extends FrameworkObject {

    public readonly TAG: string = "FileSystemManager";
    private static instance: FrameworkFile = null;
    private fileSystem: FileSystem = null;
    private rootPath: string = null;

    private constructor() {
        super();
    }

    public static getInstance() {
        if (this.instance == null) {
            this.instance = new FrameworkFile();
            if (cc.sys.platform == cc.sys.WECHAT_GAME) {
                this.instance.fileSystem = new WechatFile();
                this.instance.rootPath = wx.env.USER_DATA_PATH;
            }
        }
        return this.instance;
    }

    /**
     * 获取根目录
     *
     * @returns {string}
     * @memberof FrameworkFile
     */
    public getRootPath(): string {
        return this.rootPath;
    }

    /**
     * 获取指定目录下文件列表
     *
     * @param {{ success: (res: { fileList: { filePath: string, size: number, createTime: number }[] }) => void, fail: (res: { errMsg: string }) => void, complete?: () => void }} params
     * @memberof FrameworkFile
     */
    public getSavedFileList(params: { success: (res: { fileList: { filePath: string, size: number, createTime: number }[] }) => void, fail: (res: { errMsg: string }) => void, complete?: () => void }) {
        this.fileSystem && this.fileSystem.getSavedFileList(params);
    }

    /**
     * 获取目录
     *
     * @param {{ dirPath: string, success: (res: { files: string[] }) => void, fail: (res: { errMsg: string }) => void, complete?: () => void }} params
     * @memberof FrameworkFile
     */
    public readDir(params: { dirPath: string, success: (res: { files: string[] }) => void, fail: (res: { errMsg: string }) => void, complete?: () => void }) {
        this.fileSystem && this.fileSystem.readDir(params);
    }

    /**
     * 同步读取一个目录
     *
     * @param {string} path
     * @returns {string[]}
     * @memberof FrameworkFile
     */
    public readDirSync(path: string): string[] {
        if (this.fileSystem) {
            return this.fileSystem.readDirSync(path);
        } else {
            return [];
        }
    }

    /**
     * 读取一个文件
     *
     * @param {({ filePath: string, encoding: string, position?: string, success: (res: { data: string | ArrayBuffer }) => void, fail: (res: { errMsg: string }) => void, complete?: () => void })} params
     * @memberof FrameworkFile
     */
    public readFile(params: { filePath: string, encoding: string, position?: string, success: (res: { data: string | ArrayBuffer }) => void, fail: (res: { errMsg: string }) => void, complete?: () => void }) {
        this.fileSystem && this.fileSystem.readFile(params);
    }

    /**
     * 同步读取一个文件
     *
     * @param {string} filePath
     * @param {string} [encoding="utf-8"]
     * @param {string} [position]
     * @param {string} [length]
     * @returns {(string | ArrayBuffer)}
     * @memberof FrameworkFile
     */
    public readFileSync(filePath: string, encoding: string = "utf-8", position?: string, length?: string): string | ArrayBuffer {
        if (!this.fileSystem) {
            return "";
        }
        return this.fileSystem.readFileSync(filePath, encoding, position, length);
    }

    /**
     * 获取一个文件或路径状态
     *
     * @param {({ path: string, recursive?: boolean, success: (res: { stats: Stats | { [key: string]: Stats } }) => void, fail: (res: { errMsg: string }) => void, complete?: () => void })} params
     * @memberof FrameworkFile
     */
    public stat(params: { path: string, recursive?: boolean, success: (res: { stats: Stats | { [key: string]: Stats } }) => void, fail: (res: { errMsg: string }) => void, complete?: () => void }) {
        this.fileSystem && this.fileSystem.stat(params);
    }

    /**
     * 同步获取一个路径或者文件状态
     *
     * @param {string} path
     * @returns {Stats}
     * @memberof FrameworkFile
     */
    public statSync(path: string): Stats {
        if (this.fileSystem) {
            return this.fileSystem.statSync(path);
        }
    }

    /**
     * 删除文件
     *
     * @param {{ filePath: string, success: (res: { errMsg: string }) => void, fail: (res: { errMsg: string }) => void, complete?: () => void }} params
     * @memberof FrameworkFile
     */
    public unlink(params: { filePath: string, success: (res: { errMsg: string }) => void, fail: (res: { errMsg: string }) => void, complete?: () => void }) {
        this.fileSystem && this.fileSystem.unlink(params);
    }

    /**
     * 解压文件
     *
     * @param {{ zipFilePath: string, targetPath: string, success: (res: { errMsg: string }) => void, fail: (res: { errMsg: string }) => void, complete?: () => void }} params
     * @memberof FrameworkFile
     */
    public unzip(params: { zipFilePath: string, targetPath: string, success: (res: { errMsg: string }) => void, fail: (res: { errMsg: string }) => void, complete?: () => void }) {
        this.fileSystem && this.fileSystem.unzip(params);
    }

    /**
     * 删除多个文件
     *
     * @param {string[]} files
     * @returns {Promise<boolean>}
     * @memberof FrameworkFile
     */
    public async deleteFiles(files: string[]): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            let unlinkCount = 0;
            let success = true;
            let callback = () => {
                if (success) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            };
            for (let i = 0; i < files.length; i++) {
                window.setTimeout(() => {
                    this.unlink({
                        filePath: files[i],
                        success: (res: { errMsg: string }) => {
                            unlinkCount++;
                            (unlinkCount == files.length) && callback();
                        },
                        fail: (res: { errMsg: string }) => {
                            Utils.LOGE(this.TAG, JSON.stringify(res) + " file: " + files[i]);
                            unlinkCount++;
                            success = false;
                            (unlinkCount == files.length) && callback();
                        }
                    });
                }, 100 * i);
            }
        });
    }
}

