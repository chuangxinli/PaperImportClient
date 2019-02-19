import {
  app,globalShortcut,		// 引入快捷键 	方法
  BrowserWindow,
  ipcMain
} from 'electron'
import global from '../renderer/global.js'
import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.headers =  {
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}


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

const isSecondInstance = app.makeSingleInstance(() => {
  // Someone tried to run a second instance, we should focus our window.
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.focus()
  }
})

if (isSecondInstance) {
  app.quit()
}

function startSever(subjectAboutInfo, unitAndSubUnit) {
  const express = require('express')
  const appExpress = express()
  const bodyParser = require('body-parser')
  const {htmlToJson} = require("./htmlToJson/htmlToJson.js")
  const fs = require('fs')
  const multer = require('multer')

//用于输出 json文件和html文件
  const path = require('path');
  const writeFile = require('write');
  const EventEmitter = require('events');
  class MyEmitter extends EventEmitter {
  }
  const myEmitter = new MyEmitter()

  let printJson = false  //查看json和html文件自己做测试时可以把printJson改为true,其他情况就为false

  let deleteFolder = function(path) {
    let files = [];
    if( fs.existsSync(path) ) {
      files = fs.readdirSync(path);
      files.forEach(function(file,index){
        var curPath = path + "/" + file;
        if(fs.statSync(curPath).isDirectory()) { // recurse
          deleteFolder(curPath);
        } else { // delete file
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    }
  };

  myEmitter.on('error', function (obj) {
    //输出错误的json测试时看
    if(printJson){
      writeFile(path.join(__dirname, `./errJson/${obj.jsonObj.fileName + '__' + new Date().getTime()}.json`), JSON.stringify(obj.jsonObj), err => {
        console.log(err)
        return
      })
      console.log(`errJson success!`)
    }
  })

  myEmitter.on('jsonObjSuccess', function (obj) {
    if(printJson){
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

  myEmitter.on('success', function (obj) {
    deleteFolder(obj.dir)
  })

  appExpress.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  appExpress.use(bodyParser.json())

  appExpress.use(bodyParser.urlencoded({extended: false}))

  appExpress.get('/test', function (req, res) {
    res.send({
      recode: 1,
      msg: 'success'
    })
  })

  appExpress.post('/word-to-json-2', multer({
    dest: 'uploads'
  }).array('file', 6), function (req, res, next) {
    let time = new Date().getTime()
    try{
      fs.accessSync('./public',fs.F_OK)
    }catch (e){
      fs.mkdirSync('./public')
    }
    fs.mkdirSync('./public/' + time)
    let files = req.files;
    console.log(files)
    if (files.length === 0) {
      res.render("error", {message: "上传文件不能为空！"});
      return
    } else {
      let fileInfos = [];
      for (let i in files) {
        let file = files[i];
        let fileInfo = {};


        fs.renameSync('./uploads/' + file.filename, './public/' + time + '/' + file.originalname);//这里修改文件名。
        //fs.unlinkSync('./uploads/' + file.filename)
        //获取文件基本信息
        fileInfo.mimetype = file.mimetype;
        fileInfo.originalname = file.originalname;
        fileInfo.size = file.size;
        fileInfo.path = './public/' + time + '/' + file.originalname;
        fileInfo.dir = './public/' + time + '/';

        fileInfos.push(fileInfo);
      }
      htmlToJson(res, fileInfos, myEmitter, subjectAboutInfo, unitAndSubUnit)
      // 设置响应类型及编码
      /*res.set({
       'content-type': 'application/json; charset=utf-8'
       });*/
    }
  })

  appExpress.listen(13004)
  console.log('13004 success')
}

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
  //mainWindow.webContents.openDevTools()
  mainWindow.loadURL(winURL)
  /*let appPath =  path.join(__dirname, '../renderer/api/appExpress.js')
  spawn('node', [appPath])*/
  ipcMain.on('startServe',function (e, user) {
    if(!user){
      startSever(store.state.Version.subjectAboutInfo, store.state.Version.unitAndSubUnit)
    }
  })
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

function logout() {
  axios.get(
    global.api_url + '/paper/system/logout'
  ).then( res => {
    if(res.data.recode == 0){
      console.log('logout success!')
      if (process.platform !== 'darwin') {
        app.quit()
      }
    }
  }).catch( err => {
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
