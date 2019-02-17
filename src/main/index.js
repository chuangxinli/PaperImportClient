import {
    app, globalShortcut,		// 引入快捷键 	方法
    BrowserWindow,
    ipcMain
} from 'electron'
import global from '../renderer/global.js'
import axios from 'axios'


const {htmlToJson} = require("./htmlToJson/htmlToJson.js")
const fs = require('fs')
//用于输出 json文件和html文件
const path = require('path');
const writeFile = require('write');
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter()

axios.defaults.withCredentials = true
axios.defaults.headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}


import store from '../renderer/store'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}
let mainWindow
const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        height: 900,
        useContentSize: true,
        width: 1200,
        frame: false,
        resizable: false,
        skipTaskbar: false,
        transparent: false,
        title: "试卷导入客户端",
        autoHideMenuBar: true,
        maximizable: true				// 支持最大化
    });
    //mainWindow.webContents.openDevTools()
    mainWindow.loadURL(winURL)
    mainWindow.on('closed', () => {
        mainWindow = null
    })
}
(function(){
    let printJson = false  //查看json和html文件自己做测试时可以把printJson改为true,其他情况就为false

    myEmitter.on('error', function (obj) {
        //输出错误的json测试时看
        if (printJson) {
            writeFile(path.join(__dirname, `./errJson/${obj.jsonObj.fileName + '__' + new Date().getTime()}.json`), JSON.stringify(obj.jsonObj), err => {
                console.log(err)
                return
            })
            console.log(`errJson success!`)
        }
    })

    myEmitter.on('jsonObjSuccess', function (obj) {
        if (printJson) {
            //输出json和html文件用来测试看
            let fileBaseName = obj.jsonObj.fileName
            let time = new Date().getTime()
            writeFile(path.join(__dirname, `./fileOfJsonAndHtml/${time}__${fileBaseName}/${fileBaseName}.json`), JSON.stringify(obj.jsonObj), (err) => {
                if (err) {
                    console.log(err)
                    return
                }
                console.log('json_success！')
            })
            writeFile(path.join(__dirname, `./fileOfJsonAndHtml/${time}__${fileBaseName}/${fileBaseName}.html`), obj.temp, (err) => {
                if (err) {
                    console.log(err)
                    return
                }
                console.log('html_success！')
            })
        }
    })

})()
ipcMain.on('docxList', function (e, docxList) {
    htmlToJson(docxList, myEmitter, store.state.Version.subjectAboutInfo, store.state.Version.unitAndSubUnit)
    myEmitter.once('success', function (obj) {
        e.sender.send('reply', obj)
    })
})


app.on('ready', createWindow)

function logout() {
    axios.get(
        global.api_url + '/paper/system/logout'
    ).then(res => {
        if (res.data.recode == 0) {
            console.log('logout success!')
            if (process.platform !== 'darwin') {
                app.quit()
            }
        }
    }).catch(err => {
        console.log(err)
    })
}

app.on('window-all-closed', () => {
    logout()
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})


ipcMain.on('close', e => {
    mainWindow.close()
})
ipcMain.on('maximize', e => {
    mainWindow.maximize()
})
ipcMain.on('unmaximize', e => {
    mainWindow.unmaximize()
})
ipcMain.on('minimize', e => {
    mainWindow.minimize()
})


/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
