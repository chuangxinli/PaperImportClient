<template>
  <div>
    <div class="btn-medium-self-blue mr-20" @click="importPaper()">
      <span>导入试卷2</span>
    </div>
    <el-dialog
      title="新增试卷"
      :visible.sync="addPaperDialog"
      width="400px">
      <div style="min-height: 100px">                            
        <p v-show="docxList.length < 1">暂无导入</p>
        <div v-for="item in docxList" style="min-height: 26px;">
          <p style="float: left;width: 300px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap" :title="item.name">{{item.name}}</p>
          <p style="float: right; color: red; cursor: pointer" @click="removeOneDocx(item)"><i class="el-icon-delete"></i></p>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
    <el-button @click="selectFile()">
      <span>选择文件</span>
      <input type="file" class="file" multiple="multiple" accept=".docx" style="display: none" @change="tirggerFile($event)">
    </el-button>
    <el-button type="primary" @click="confirmImport">点击上传</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import $ from 'jquery'
  import axios from 'axios'
  import { Loading } from 'element-ui'
  export default {
    name: 'export-paper-2',
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
        arr: [],
        addPaperDialog: false,
        docxList: []
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
      confirmImport(){
        if(this.docxList.length < 1){
          this.$message({
            showClose: true,
            message: '请至少选择一个.docx结尾的word试卷！',
            type: 'warning'
          });
        }
        let uploadUrl = 'http://192.168.1.149:3004/word-to-json-2'
        let fd = new FormData()
        for(let i = 0, len = this.docxList.length; i < len; i++){
          fd.append('file', this.docxList[i])
        }
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: false,
          timeout: 2000000
        }
        let loadingInstance
        let loadOptions = {
          lock: true,
          text: 'Loading...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.5)'
        }
        loadingInstance = Loading.service(loadOptions)
        axios.post(uploadUrl, fd, config).then(response => {
          console.log(response)
          loadingInstance.close()
          this.addPaperDialog = false
          this.docxList = []
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
          }
          this.$store.dispatch('CHANGE_jSON_ARR',
            {
              jsonArr: response.data.jsonArr
            }
          )
        }).catch(err => {
          console.log(err)
          loadingInstance.close()
        })
      },
      selectFile(){
        $('.file')[0].click()
      },
      importPaper() {
        this.addPaperDialog = true
      },
      removeOneDocx(item){
        for(let i = 0, len = this.docxList.length; i < len; i++){
          if(item == this.docxList[i]){
            this.docxList.splice(i, 1)
          }
        }
      },
      tirggerFile(event){
        this.docxList = []
        for(let i = 0, len = event.target.files.length; i < len; i++){
          if(/\.docx$/i.test(event.target.files[i].name)){
            this.docxList.push(event.target.files[i])
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>