<template>
  <div>
    <div class="btn-medium-self-blue mr-20" @click="importPaper()">导入试卷</div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {remote} from 'electron'
  import { Loading } from 'element-ui'
  export default {
    name: 'export-paper',
    computed: {
      jsonArr() {
        this.arr = this.$store.state.jsonArr
        return this.$store.state.jsonArr
      },
      num() {
        return this.$store.state.main
      }
    },
    data() {
      return {
        arr: []
      }
    },
    methods: {
      async postPaper(filePaths){
        let url = '/word-to-json'
        let params = {
          docxList: filePaths
        }
        let data = await this.api.post(url, params)
        if(data){
          console.log(data)
        }
      },
      async hello(){
        let url = '/hello'
        let params = {}
        let data = await this.api.get(url, params)
        if(data){
          console.log(data)
        }
      },
      importPaper() {
        remote.dialog.showOpenDialog({
          title: '选择需要导入的.docx格式的word试卷！',
          properties: ['openFile', 'multiSelections'],
          filters: [
            {
              name: 'word', extensions: ['docx']
            }
          ]
        }, (filePaths) => {
          if (filePaths) {
            let loadingInstance
            let loadOptions = {
              lock: true,
              text: 'Loading...',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.5)'
            }
            loadingInstance = Loading.service(loadOptions)
            axios({
              method:"POST",
              url:'http://localhost:3003/word-to-json',
              data:{
                docxList: filePaths
              },
              withCredentials: false,
              timeout: 2000000
            })
              .then((response) => {
                console.log(response)
                loadingInstance.close()
                if(response.data.errArr.length == 0){
                  this.$message({
                    showClose: true,
                    message: '试卷导入成功！',
                    type: 'success'
                  });
                } else {
                  let arr = []
                  for(let i = 0, len = response.data.errArr.length; i < len; i++){
                    arr.push(response.data.errArr[i].fileName)
                  }
                  this.$alert(`<p>解析失败的试卷为：</p><p>${arr.join('，')}</p><p>请仔细检查试卷的结构是否正确！</p>`, '试卷导入提示', {
                    dangerouslyUseHTMLString: true
                  });
                  /*this.$message({
                    showClose: true,
                    message: `解析失败的试卷为：${arr.join('，')}，请仔细检查试卷的结构是否正确！`,
                    type: 'success',
                    duration: 5000
                  });*/
                }
                this.$store.dispatch('CHANGE_jSON_ARR',
                  {
                    jsonArr: response.data.jsonArr
                  }
                )
              })
              .catch((err) => {
                console.log(err)
                loadingInstance.close()
              })
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>