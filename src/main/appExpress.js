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

let printJson = false

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

appExpress.post('/word-to-json', function (req, res) {
  htmlToJson(res, req.body.docxList, myEmitter)
})

appExpress.get('/hello', function (req, res) {
  res.send('hello！')
})

appExpress.post('/word-to-json-2', multer({
  dest: 'uploads'
}).array('file', 6), function (req, res, next) {
  let time = new Date().getTime()
  try{
    fs.accessSync('./static',fs.F_OK)
  }catch (e){
    fs.mkdirSync('./static')
  }
  fs.mkdirSync('./static/' + time)
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


      fs.renameSync('./uploads/' + file.filename, './static/' + time + '/' + file.originalname);//这里修改文件名。
      //fs.unlinkSync('./uploads/' + file.filename)
      //获取文件基本信息
      fileInfo.mimetype = file.mimetype;
      fileInfo.originalname = file.originalname;
      fileInfo.size = file.size;
      fileInfo.path = './static/' + time + '/' + file.originalname;
      fileInfo.dir = './static/' + time + '/';

      fileInfos.push(fileInfo);
    }
    htmlToJson(res, fileInfos, myEmitter)
    // 设置响应类型及编码
    /*res.set({
     'content-type': 'application/json; charset=utf-8'
     });
     res.end("success!");*/
  }
})
appExpress.listen(3004)
console.log('3004 success')
