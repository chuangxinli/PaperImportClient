import {
  app,globalShortcut,		// 引入快捷键 	方法
  BrowserWindow,
  ipcMain
} from 'electron'
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path')
    .join(__dirname, '/static')
    .replace(/\\/g, '\\\\')
}
let mainWindow
const winURL = process.env.NODE_ENV === 'development' ?
  `http://localhost:9080/#/SignIn` :
  `file://${__dirname}/index.html`

const express = require("express");
const apicache = require("apicache");
const path = require("path");
const fs = require("fs");
let cache = apicache.middleware;
import routes from './routers'
function createWindow() {
  const app = express();
  // 跨域设置
  app.all("*", function(req, res, next) {
  	if (req.path !== "/" && !req.path.includes(".")) {
    	res.header("Access-Control-Allow-Credentials", true);
      // 这里获取 origin 请求头 而不是用 *
      res.header("Access-Control-Allow-Origin", req.headers["origin"] || "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
      res.header("Content-Type", "application/json;charset=utf-8");
    }
    next();
  });
  const onlyStatus200 = (req, res) => res.statusCode === 200;
  app.use(cache("2 minutes", onlyStatus200));
  app.use(express.static(path.resolve(__dirname, "public")));

  app.use(function(req, res, next) {
  	const proxy = req.query.proxy;
    if (proxy) {
    	req.headers.cookie = req.headers.cookie + `__proxy__${proxy}`;
    }
    next();
  });

  app.use('/', routes);
//const port = 3000;
//app.listen(port, () => {
//	console.log(`server running @ http://localhost:${port}`);
//});
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
  mainWindow.loadURL(winURL)
  mainWindow.on('closed', () => {
  	mainWindow = null
  })
  // 默认 全屏显示 => 按 ESC 键进行全屏和小屏幕切换
	globalShortcut.register('ESC', () => {
		if(mainWindow.isMaximized()){
			mainWindow.setFullScreen(false);
		}else if(!mainWindow.isMaximized()){
			mainWindow.setFullScreen(true);
		}
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

