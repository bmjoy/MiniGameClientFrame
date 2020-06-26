/*================================================================
 * Description 微信文件系统
 * Email liuhu@tuyoogame.com
 * Created on Mon May 11 2020
 * Copyright (c) 2020 途游游戏
================================================================*/

import { FrameworkObject } from "../../FrameworkObject";
import { Utils } from "../../Utils";
import { FileSystem, Stats } from "../../FrameworkFile";

export class WechatFile extends FrameworkObject implements FileSystem {

    public readonly TAG: string = "WechatFileSystem";

    public getSavedFileList(params: { success: (res: { fileList: { filePath: string, size: number, createTime: number }[] }) => void, fail: (res: { errMsg: string }) => void, complete?: () => void }) {
        try {
            wx.getFileSystemManager().getSavedFileList(params);
        } catch (err) {
            Utils.LOGE(this.TAG, "get saved file list error: " + JSON.stringify(err));
        }
    }

    public readDir(params: { dirPath: string, success: (res: { files: string[] }) => void, fail: (res: { errMsg: string }) => void, complete?: () => void }) {
        try {
            wx.getFileSystemManager().readdir(params);
        } catch (err) {
            Utils.LOGE(this.TAG, "read dir error: " + JSON.stringify(err));
        }
    }

    public readDirSync(dirPath: string): string[] {
        try {
            return wx.getFileSystemManager().readdirSync(dirPath);
        } catch (err) {
            Utils.LOGE(this.TAG, "read dir error: " + JSON.stringify(err));
        }
    }

    public readFile(params: { filePath: string, encoding: string, position?: string, success: (res: { data: string | ArrayBuffer }) => void, fail: (res: { errMsg: string }) => void, complete?: () => void }) {
        try {
            wx.getFileSystemManager().readFile(params);
        } catch (err) {
            Utils.LOGE(this.TAG, "read file error: " + JSON.stringify(err));
        }
    }

    public readFileSync(filePath: string, encoding: string = "utf-8", position?: string, length?: string): string | ArrayBuffer {
        try {
            return wx.getFileSystemManager().readFileSync(filePath, encoding, position, length);
        } catch (err) {
            Utils.LOGE(this.TAG, "read file error: " + JSON.stringify(err));
        }
    }

    public stat(params: { path: string, recursive?: boolean, success: (res: { stats: Stats | { [key: string]: Stats } }) => void, fail: (res: { errMsg: string }) => void, complete?: () => void }) {
        try {
            wx.getFileSystemManager().stat(params);
        } catch (err) {
            Utils.LOGE(this.TAG, "stat error: " + JSON.stringify(err));
        }
    }

    public statSync(path: string): Stats {
        try {
            return wx.getFileSystemManager().statSync(path, false);
        } catch (err) {
            Utils.LOGE(this.TAG, "stat sync error: " + JSON.stringify(err));
        }
    }

    public unlink(params: { filePath: string, success: (res: { errMsg: string }) => void, fail: (res: { errMsg: string }) => void, complete?: () => void }) {
        try {
            return wx.getFileSystemManager().unlink(params);
        } catch (err) {
            Utils.LOGE(this.TAG, "unlink error: " + JSON.stringify(err));
        }
    }

    public unzip(params: { zipFilePath: string, targetPath: string, success: (res: { errMsg: string }) => void, fail: (res: { errMsg: string }) => void, complete?: () => void }) {
        try {
            return wx.getFileSystemManager().unzip(params);
        } catch (err) {
            Utils.LOGE(this.TAG, "unzip error: " + JSON.stringify(err));
        }
    }
}
