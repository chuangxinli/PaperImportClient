const cmd = process.platform == 'win32' ? 'netstat -ano' : 'ps aux'
const path = require('path')
const exec = require('child_process').exec
const port = '3004';

exec(cmd, function(err, stdout, stderr) {
  if(err){
    return console.log(err)
  }
  stdout.split('\n').filter(function(line){
    let p = line.trim().split(/\s+/)
    let address = p[1]
    if(address != undefined){
      if(address.split(':')[1] == port)
      {
        exec('taskkill /F /T /pid ' + p[4], function(err, stdout, stderr){
          if(err){
            return console.log('释放指定端口失败！！')
          }
          console.log('占用指定端口的程序被成功杀掉！')
        })
      }
    }
  })
})
let appPath =  path.join(__dirname, './appExpress.js')
exec(`node ${appPath}`, function (err) {
  console.log(err)
})
