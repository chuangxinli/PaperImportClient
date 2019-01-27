import {
  app,globalShortcut,		// 引入快捷键 	方法
  BrowserWindow,
  ipcMain
} from 'electron'

const path = require('path')
//const {exec, spawn} = require('child_process')

import store from '../renderer/store'

console.log('version:',store.state.Version.version)

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

function createWindow () {
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
  mainWindow.webContents.openDevTools()
  mainWindow.loadURL(winURL)
  /*let appPath =  path.join(__dirname, '../renderer/api/appExpress.js')
  spawn('node', [appPath])*/
  ipcMain.on('startServe',function (e, arg) {
    console.log(arg)
    require('../renderer/api/appExpress.js')
  })
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()

  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})


ipcMain.on('close',e=>{
  mainWindow.close()
})
ipcMain.on('maximize',e=>{
  mainWindow.maximize()
})
ipcMain.on('unmaximize',e=>{
  mainWindow.unmaximize()
})
ipcMain.on('minimize',e=>{
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
