<template>
  <div>
    <div class="btn-medium-self-blue mr-20" @click="importPaper()">
      <span>导入试卷</span>
    </div>
    <el-dialog
      title="新增试卷"
      :visible.sync="addPaperDialog"
      width="400px">
      <div style="min-height: 100px">
        <p v-show="docxList.length < 1">暂无导入</p>
        <div v-for="item in docxList" style="min-height: 26px;">
          <p style="float: left;width: 300px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap"
             :title="item.name">{{item.name}}</p>
          <p style="float: right; color: red; cursor: pointer" @click="removeOneDocx(item)"><i
            class="el-icon-delete"></i></p>
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


    <!--试卷导入提示弹框-->
    <el-dialog
      title="提示"
      :visible.sync="paperTipDialog"
      width="50%"
      center>
      <div class="paperTip">
        <p v-show="errArr.length > 0">解析失败的试卷为：</p>
        <div v-for="errItem,index in errArr" class="rowHeight mLeft">
          <span>({{index + 1}})&nbsp;&nbsp;</span>
          <span>{{errItem.fileName}}</span>
          <span>.docx，请仔细检查规则是否正确！</span>
        </div>
        <p v-show="lackArr.length > 0">解析成功但是不和要求的试卷为：</p>
        <div v-for="lackItem,index in lackArr" class="mLeft rowHeight">
          <div>
            <span>({{index + 1}})&nbsp;&nbsp;</span>
            <span>{{lackItem.fileName}}</span>
            <span>.docx</span>
          </div>
          <div v-for="titleItem in lackItem.titleArr" class="mLeft rowHeight">{{titleItem}}</div>
          <div v-for="examPointItem in lackItem.examPointsArr" class="mLeft rowHeight">{{examPointItem}}</div>
        </div>
        <p v-show="successArr.length > 0">解析成功的试卷为：</p>
        <div v-for="item,index in successArr" class="rowHeight mLeft">
          <span>({{index + 1}})&nbsp;&nbsp;</span>
          <span>{{item.fileName}}.docx</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="paperTipDialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import $ from 'jquery'
  import axios from 'axios'
  import {Loading} from 'element-ui'
  export default {
    name: 'export-paper',
    data() {
      return {
        arr: [],
        addPaperDialog: false,
        paperTipDialog: false,
        docxList: [],
        errArr: [],
        lackArr: [],
        successArr: []
      }
    },
    methods: {
      async postPaper(params){
        let url = 'http://39.96.186.199:3004/word-to-json-2'
        let config = {
          loading: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: false,
          timeout: 2000000
        }
        let data = await this.api.post(url, params, config)
        if (data) {
          console.log(data)
          this.docxList = []
          this.errArr = data.errArr
          this.lackArr = data.lackArr
          this.successArr = data.jsonArr

          if (data.errArr.length == 0 && data.lackArr.length == 0) {
            this.$message({
              showClose: true,
              message: '试卷导入成功！',
              type: 'success'
            });
          } else {
            this.paperTipDialog = true
          }
          this.$store.dispatch('CHANGE_jSON_ARR',
            {
              jsonArr: data.jsonArr
            }
          )
        }
      },
      confirmImport(){
        if (this.docxList.length < 1) {
          this.$message({
            showClose: true,
            message: '请至少选择一个.docx结尾的word试卷！',
            type: 'warning'
          });
          return
        }
        if(this.docxList.length > 6){
          this.$message({
            showClose: true,
            message: '一次上传不能超过6张试卷！',
            type: 'warning'
          });
          return
        }
        this.addPaperDialog = false
        let fd = new FormData()
        for (let i = 0, len = this.docxList.length; i < len; i++) {
          fd.append('file', this.docxList[i])
        }
        this.postPaper(fd)
      },
      selectFile(){
        $('.file')[0].click()
        $('.file:eq(0)').val('')
      },
      importPaper() {
        this.docxList = []
        this.addPaperDialog = true
      },
      removeOneDocx(item){
        for (let i = 0, len = this.docxList.length; i < len; i++) {
          if (item == this.docxList[i]) {
            this.docxList.splice(i, 1)
          }
        }
      },
      tirggerFile(event){
        for (let i = 0, len = event.target.files.length; i < len; i++) {
          if (/\.docx$/i.test(event.target.files[i].name)) {
            this.docxList.push(event.target.files[i])
          }
        }
      }
    }
  }
</script>

<style scoped>
  .paperTip > p{
    min-height: 20px;
    line-height: 30px;
  }
  .rowHeight{
    min-height: 20px;
    line-height: 30px;
  }
  .mLeft{
    margin-left: 20px;
  }
  .el-dialog .el-dialog__body{
    max-height: 600px !important;
    overflow-y: scroll !important;
  }
</style>