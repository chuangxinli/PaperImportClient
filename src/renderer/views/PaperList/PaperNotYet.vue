<template>
  <el-scrollbar class="papernotyet-view scroll-page">
    <div class="paperNotYetList">
      <div class="class-list mt-5">

        <p class="guideBar">
          <img src="../../assets/images/process.png"/>
          <span>待处理试卷</span>
        </p>

        <el-select class="w_120 mr-20" v-model="subjectId" @change="SubjectChange">
          <el-option v-for="item in SubjectArr" :label="item.subjectName"
                     :value="item.subjectId"></el-option>
        </el-select>
        <el-select class="w_120 mr-20" v-model="materialId" @change="MaterialChange">
          <el-option v-for="item in MaterialArr" :label="item.materialName"
                     :value="item.materialId"></el-option>
        </el-select>
        <importPaper class="inline_block"></importPaper>
        <div class="btn-medium-self-blue mr-20" @click="removeAll()">全部删除</div>
        <div class="btn-medium-self-blue fRight ml-20" @click="FilterPaper">搜索</div>
        <el-input class="w_200 input-search-self fRight"
                  placeholder="请输入内容"
                  prefix-icon="el-icon-search"
                  v-model="PaperName">
        </el-input>

        <el-table :data="tableData.filter( (item) => {
          if(materialId == '999' && subjectId == '999'){
            return true
          }else if(subjectId != '999' && item.SubjectId == subjectId && materialId == '999'){
            return true
          }else if(subjectId != '999' && materialId != '999' && item.SubjectId == subjectId && item.MaterialId == materialId){
            return true
          }else{
            return false
          }
        })" stripe class="mTop20 table_self_blue" >
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="Title" label="试卷名称" width="" class="text_left">
          </el-table-column>
          <el-table-column prop="Subject" label="学段学科" width="100"></el-table-column>
          <el-table-column prop="Material" label="教材版本" width="100"></el-table-column>
          <el-table-column label="总分" width="50" prop="TotalPoints"></el-table-column>
          <el-table-column label="试题总数" width="100"  prop="AllNum"></el-table-column>
          <el-table-column prop="Papersource" label="试卷来源" width="100"></el-table-column>
          <el-table-column prop="localId" label="上传时间" width="150" :formatter="FormatDatetime"></el-table-column>
          <el-table-column prop="address" label="操作" width="50">
            <template slot-scope="scope">
              <el-popover placement="left" title="" trigger="click">
                <ul class="popover-list">
                  <li @click="PaperAttributeEdit(scope.row)">试卷属性编辑</li>
                  <li @click="ItemEditMain(scope.row)">试题编辑</li>
                  <li @click="SetScopeData(scope.row)">考察范围</li>
                  <li @click="uploadPaper(scope.row)">上传至后台</li>
                  <li @click="TestClick(scope.row)">预览</li>
                  <li @click="ClearVuexData(scope.row)">删除</li>
                </ul>
                <span slot="reference" class="el-icon-setting pointer handle-icon"></span>
              </el-popover>
            </template>
          </el-table-column>

        </el-table>

        <!-- 设置 "考察范围" 弹窗 -->
        <el-dialog title="设置试卷考察范围" :visible.sync="setScopeDialog" width="40%" id="setScopeDialog">
          <el-button type="primary" @click="SetAllScope()" class="btn_style">全 选</el-button>
          <el-button type="primary" @click="SetSpaceScope()" class="btn_style">取消全选</el-button>
          <!-- 树状结构 -->
          <el-tree
            class="mTop20"
            :data="scopeTree"
            show-checkbox
            node-key="unitId"
            ref="rangeTree"
            highlight-current
            :props="defaultProps">
          </el-tree>

          <span slot="footer" class="dialog-footer">
				    <el-button @click="setScopeDialog = false">取 消</el-button>
				    <el-button type="primary" @click="confirmSetScope()">确 定</el-button>
				  </span>
        </el-dialog>

        <p>{{showVuexData}}</p>

        <!--试卷预览弹框-->
        <el-dialog
          title="试卷预览"
          :visible.sync="previewDialog"
          width="70%"
          id="setDialog"
          center>
          <div class="previewPaper">
            <div class="titleInfo" style="display: none;">
              <p>
                <span>试卷名称：</span>
                <span>{{items.Title}}</span>
              </p>
              <p>
                <span>试卷属性：</span>
                <span>{{items.Attribute}}</span>
              </p>
              <p>
                <span>教材版本：</span>
                <span>{{items.Material}}</span>
              </p>
              <p>
                <span>学段学科：</span>
                <span>{{items.Subject}}</span>
              </p>
              <p>
                <span>适用学期（册）：</span>
                <span>{{items.Term}}</span>
              </p>
              <p>
                <span>试卷总分值：</span>
                <span>{{items.TotalPoints}}</span>
              </p>
              <p>
                <span>建议答题时长：</span>
                <span>{{items.Time}}</span>
              </p>
              <p>
                <span>试卷类型：</span>
                <span>{{items.Papertype}}</span>
              </p>
              <p>
                <span>试卷来源：</span>
                <span>{{items.Papersource}}</span>
              </p>
              <p>
                <span>核心题库：</span>
                <span>{{items.Core}}</span>
              </p>
              <p>
                <span>同步试题：</span>
                <span>{{items.Synchronization}}</span>
              </p>
              <p>
                <span>双三试题：</span>
                <span>{{items.Douthree}}</span>
              </p>
              <p>
                <span>是否隐藏：</span>
                <span>{{items.IsHide}}</span>
              </p>
              <p>
                <span>是否正确：</span>
                <span>{{items.IsTrue}}</span>
              </p>
              <p>
                <span>区分度：</span>
                <span>{{items.Division}}</span>
              </p>
              <p>
                <span>答题时间：</span>
                <span>{{items.Spenttime}}</span>
              </p>
              <p>
                <span>难度方案：</span>
                <span>{{items.DiffcultyType}}</span>
              </p>
              <p>
                <span>难度：</span>
                <span>{{items.Difficulty}}</span>
              </p>
            </div>
            
            <p class="paperName">
              <span>试卷名称：</span>
              <span>{{items.Title}}</span>
            </p>
            <div v-for="part in items.AllQuestionArr">
              <div v-if="part.children.length == 0" class="part">
                <div v-html="global.formatFirstPToSpan(part.text)" class="partText"></div>
                <div v-for="question,qIndex in part.question">
                  <div
                    v-html="(question.Serial_num ? question.Serial_num : qIndex + 1) + '、' + (question.Score ? '（' + question.Score + '分）' : '') + global.formatFirstPToSpan(question.Text)"
                    class="text"></div>
                  <div v-if="question.Type == 1 || question.Type == 2 || question.Type == 5" class="question">
                    <div class="options" v-for="option in question.Options">
                      <div v-html="getOption(option.Index) + '.' + global.formatFirstPToSpan(option.Text)"
                           class="option" :class="{'trueOption': option.IsRight === true}"></div>
                    </div>
                  </div>
                  <div v-show="question.SubQuestionList.length > 0" class="sub">
                    <div v-for="subQuestion,subIndex in question.SubQuestionList">
                      <div class="subText" v-html="global.formatFirstPToSpan(subQuestion.Text)">
                      </div>
                      <div v-if="subQuestion.Type == 1 || subQuestion.Type == 2 || subQuestion.Type == 5" class="subQuestion">
                        <div class="options" v-for="option in subQuestion.Options">
                          <div v-html="getOption(option.Index) + '. ' + global.formatFirstPToSpan(option.Text)"
                               class="option" :class="{'trueOption': option.IsRight === true}"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="property">
                    <div>
                      <span class="bold">考点：</span>
                      <span>{{getExamPoints(question.ExaminationPointsName)}}</span>
                    </div>
                    <div>
                      <span class="bold">分析：</span>
                      <span v-html="global.formatFirstPToSpan(question.Analysis)"></span>
                    </div>
                    <div>
                      <span class="bold">点评：</span>
                      <span v-html="global.formatFirstPToSpan(question.Comments)"></span>
                    </div>
                    <div>
                      <span class="bold">解答：</span>
                      <span v-html="global.formatFirstPToSpan(question.Explain)"></span>
                    </div>
                    <div>
                      <span class="bold">学科能力：</span>
                      <span>{{question.AbilityName}}</span>
                    </div>
                    <div>
                      <span class="bold">思想方法：</span>
                      <span>{{question.ThoughtwayName}}</span>
                    </div>
                    <div>
                      <span class="bold">题目时间：</span>
                      <span>{{question.Year}}年</span>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="part">
                <div v-html="global.formatFirstPToSpan(part.text)" class="partText"></div>
                <div v-for="brief in part.children" class="brief">
                  <div v-html="global.formatFirstPToSpan(brief.text)" class="briefText"></div>
                  <div v-for="question,qIndex in brief.question">
                    <div
                      v-html="(question.Serial_num ? question.Serial_num : qIndex + 1) + '、' + (question.Score ? '（' + question.Score + '分）' : '') + global.formatFirstPToSpan(question.Text)"
                      class="text"></div>
                    <div v-if="question.Type == 1 || question.Type == 2 || question.Type == 5" class="question">
                      <div class="options" v-for="option in question.Options">
                        <div v-html="getOption(option.Index) + '.' + global.formatFirstPToSpan(option.Text)"
                             class="option" :class="{'trueOption': option.IsRight === true}"></div>
                      </div>
                    </div>
                    <div v-show="question.SubQuestionList.length > 0" class="sub">
                      <div v-for="subQuestion,subIndex in question.SubQuestionList">
                        <div class="subText"
                             v-html="global.formatFirstPToSpan(subQuestion.Text)">
                        </div>
                        <div v-if="subQuestion.Type == 1 || subQuestion.Type == 2 || subQuestion.Type == 5" class="subQuestion">
                          <div class="options" v-for="option in subQuestion.Options">
                            <div v-html="getOption(option.Index) + '. ' + global.formatFirstPToSpan(option.Text)"
                                 class="option" :class="{'trueOption': option.IsRight === true}"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="property">
                      <div>
                        <span class="bold">考点：</span>
                        <span>{{getExamPoints(question.ExaminationPointsName)}}</span>
                      </div>
                      <div>
                        <span class="bold">分析：</span>
                        <span v-html="global.formatFirstPToSpan(question.Analysis)"></span>
                      </div>
                      <div>
                        <span class="bold">点评：</span>
                        <span v-html="global.formatFirstPToSpan(question.Comments)"></span>
                      </div>
                      <div>
                        <span class="bold">解答：</span>
                        <span v-html="global.formatFirstPToSpan(question.Explain)"></span>
                      </div>
                      <div>
                        <span class="bold">学科能力：</span>
                        <span>{{question.AbilityName}}</span>
                      </div>
                      <div>
                        <span class="bold">思想方法：</span>
                        <span>{{question.ThoughtwayName}}</span>
                      </div>
                      <div>
                        <span class="bold">题目时间：</span>
                        <span>{{question.year}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-dialog>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
  import importPaper from '@/components/import.vue'
  export default {
    components: {
      importPaper
    },
    data() {
      return {
        SubjectArr: [{subjectId: '999', subjectName: '全部'}],
        MaterialArr: [{materialId: '999', materialName: '全部'}],
        subjectId: '999',		// 学段学科
        subjectName: '',		// 学段学科名称
        materialId: '999',	// 教材版本
        materialName: '',		// 教材版本名称
        PaperName: '',			// 试卷名称  => 检索用
        scopeArr: [],				// 设置试卷考察范围 全数组 学段学科 => 教材版本 => 章节知识点 层级数组显示
        ScopeDataStr: '',		// 最终形成的 paperData.ScopeDataStr 为 章_节@章_节@章_节 拼接的字符串
        setScopeDialog: false,
        tableData: [],
        paperData: {},			//单条试卷数据

        // 虚拟树状结构
        scopeTree: [],			// 章节知识点范围
        defaultProps: {children: 'subUnitList', label: 'unitName'},
        InitScopeIdArr: [],
        //预览
        previewDialog: false,
        items: {},
        optionList: {
          1: 'A',
          2: 'B',
          3: 'C',
          4: 'D',
          5: 'E',
          6: 'F',
          7: 'G',
          8: 'H',
          9: 'I',
          10: 'J',
          11: 'K',
          12: 'L',
          13: 'M',
          14: 'N',
          15: 'O',
          16: 'P',
          17: 'Q',
          18: 'R',
          19: 'S',
          20: 'T',
          21: 'U',
          22: 'V',
          23: 'W',
          24: 'X',
          25: 'Y',
          26: 'Z'
        },
        //难度方案
        defaultSection: {
          start: 0.2,
          end: 0.6
        },
        difficultyList: [
          {
            type: 1,
            single: {
              start: 0.1,
              end: 0.4
            },
            blank: {
              start: 0.1,
              end: 0.4
            },
            resolve: {
              start: 0.3,
              end: 0.8
            }
          },
          {
            type: 2,
            single: {
              start: 0.1,
              end: 0.6
            },
            blank: {
              start: 0.1,
              end: 0.6
            },
            resolve: {
              start: 0.2,
              end: 0.8
            }
          },
          {
            type: 3,
            single: {
              start: 0.1,
              end: 0.4
            },
            multiple: {
              start: 0.3,
              end: 0.4
            },
            blank: {
              start: 0.1,
              end: 0.4
            },
            resolve: {
              start: 0.3,
              end: 0.5
            }
          },
          {
            type: 4,
            single: {
              start: 0.25,
              end: 0.45
            },
            multiple: {
              start: 0.35,
              end: 0.45
            },
            blank: {
              start: 0.35,
              end: 0.45
            },
            resolve: {
              start: 0.4,
              end: 0.5
            }
          },
          {
            type: 5,
            single: {
              start: 0.2,
              end: 0.45
            },
            multiple: {
              start: 0.25,
              end: 0.45
            },
            blank: {
              start: 0.25,
              end: 0.45
            },
            resolve: {
              start: 0.3,
              end: 0.5
            }
          },
          {
            type: 6,
            single: {
              start: 0.2,
              end: 0.6
            },
            multiple: {
              start: 0.25,
              end: 0.5
            },
            blank: {
              start: 0.3,
              end: 0.5
            },
            resolve: {
              start: 0.4,
              end: 0.65
            }
          },
          {
            type: 7,
            single: {
              start: 0.2,
              end: 0.45
            },
            multiple: {
              start: 0.25,
              end: 0.5
            },
            blank: {
              start: 0.3,
              end: 0.5
            },
            resolve: {
              start: 0.4,
              end: 0.6
            }
          },
          {
            type: 8,
            single: {
              start: 0.1,
              end: 0.5
            },
            multiple: {
              start: 0.1,
              end: 0.5
            },
            blank: {
              start: 0.1,
              end: 0.4
            },
            resolve: {
              start: 0.3,
              end: 0.6
            }
          },
          {
            type: 9,
            single: {
              start: 0.1,
              end: 0.5
            },
            multiple: {
              start: 0.1,
              end: 0.5
            },
            blank: {
              start: 0.1,
              end: 0.4
            },
            resolve: {
              start: 0.3,
              end: 0.6
            }
          },
          {
            type: 10,
            single: {
              start: 0.1,
              end: 0.3
            },
            blank: {
              start: 0.1,
              end: 0.3
            },
            judge: {
              start: 0.1,
              end: 0.3
            },
            resolve: {
              start: 0.1,
              end: 0.6
            }
          },
          {
            type: 11,
            single: {
              start: 0.1,
              end: 0.3
            },
            multiple: {
              start: 0.1,
              end: 0.3
            },
            blank: {
              start: 0.1,
              end: 0.3
            },
            resolve: {
              start: 0.3,
              end: 0.6
            }
          },
        ],
        //上传json
        lackScoreArr: [],
        unitIdList: []
      }
    },
    computed: {
      showVuexData(){
        // 接收 Vuex 中未上传试卷列表数据
        this.tableData = JSON.parse(JSON.stringify(this.$store.state.Paper.jsonArr));
        // 接收 Vuex 学段学科教材版本数据					=> 只做 学段学科 教材版本 学科能力 思想方法 级联
        let subjectAboutInfo = JSON.parse(JSON.stringify(this.$store.state.Version.subjectAboutInfo));
        this.SubjectArr = this.SubjectArr.concat(subjectAboutInfo);		// 学段学科 加上全部 ''
        // 接收 Vuex 学段学科教材版本章节知识点树		=> 只做 学段学科 教材版本 章节知识点 树形结构
        this.scopeArr = JSON.parse(JSON.stringify(this.$store.state.Version.unitAndSubUnit));
      }
    },
    mounted() {

    },
    methods: {
      removeAll(){
        this.$confirm('此操作将删除所有已经导入的试卷请三思，是否继续？', '提示', {
          confirmButtonText: '确 定',
          cancelButtonText: '取 消',
          type: 'warning'
        }).then(() => {
          setTimeout( () => {
            this.$store.dispatch('DELETE_ONE_PAPER', {
              localId: -1
            })
            this.$message({
              showCloes: true,
              message: '全部删除成功！',
              type: 'success'
            })
          }, 1000)
        }).catch((err) => {
          console.log(err)
        })
      },
      TestClick(row){
        this.previewDialog = true
        this.items = row
      },
      //获取选项
      getOption(index){
        return this.optionList[index]
      },
      //获取考点
      getExamPoints(arr){
        if (!arr) {
          arr = []
        }
        return arr.join('；')
      },
      // 试卷属性编辑
      PaperAttributeEdit(row){
        this.setLocal('paperData', JSON.stringify(row));
        this.changeRouterByName('PaperAttributeEdit');
      },
      // 试题编辑
      ItemEditMain(row){
        this.setLocal('paperData', JSON.stringify(row));
        this.changeRouterByName('ItemEditMain');
      },
      // 清除单条数据
      ClearVuexData(row){
        this.$confirm('确定要删除该条数据，是否继续?', '提示', {
          confirmButtonText: '确 定',
          cancelButtonText: '取 消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('DELETE_ONE_PAPER', {
            localId: row.localId
          })
        }).catch(() => {

        })
      },
      // 时间戳处理成 年月日时分秒 格式
      FormatDatetime(row, column) {
        let time = new Date(Number(row.localId));
        let year = time.getFullYear();
        let month = time.getMonth() + 1;
        let date = time.getDate();
        let hours = time.getHours();
        let minutes = time.getMinutes();
        let seconds = time.getSeconds();
        return year + '-'
          + (month < 10 ? '0' + month : month) + '-'
          + (date < 10 ? '0' + date : date) + ' '
          + (hours < 10 ? '0' + hours : hours) + ':'
          + (minutes < 10 ? '0' + minutes : minutes) + ':'
          + (seconds < 10 ? '0' + seconds : seconds);
      },
      // 学段学科 <=> 教材版本
      SubjectChange(){
        if (this.subjectId == '999') {
          this.subjectName = '';
          this.MaterialArr = [{materialId: '999', materialName: '全部'}];
        } else {
          let SubjectArr = this.SubjectArr;
          for (let i = 0; i < SubjectArr.length; i++) {
            if (SubjectArr[i].materialList && SubjectArr[i].materialList.length > 0) {
              if (this.subjectId == SubjectArr[i].subjectId) {
                this.subjectName = SubjectArr[i].subjectName;
                this.MaterialArr = [{materialId: '999', materialName: '全部'}].concat(SubjectArr[i].materialList);
              }
            } else {
              this.subjectName = '';
              this.MaterialArr = [{materialId: '999', materialName: '全部'}];
            }
          }
        }
        this.materialId = '999';
        this.materialName = '';
      },
      // 教材版本改变 <=> 获取教材版本名称
      MaterialChange(){
        if (this.materialId == '999') {
          this.materialName = ''
        } else {
          let MaterialArr = this.MaterialArr;
          for (let i = 0; i < MaterialArr.length; i++) {
            if (this.materialId == MaterialArr[i].materialId) {
              this.materialName = MaterialArr[i].materialName;
            }
          }
        }
      },
      // 学段学科 教材版本 手动输入 全条件检索
      FilterPaper(){
        let tableData = JSON.parse(JSON.stringify(this.$store.state.Paper.jsonArr));
        let filterPapers = [];
        for (let i = 0; i < tableData.length; i++) {
          if (tableData[i].Title.includes(this.PaperName)) {
            filterPapers.push(tableData[i])
          }
        }
        this.tableData = filterPapers;
      },
      // 设置试卷考察范围
      SetScopeData(row){
        let subjectName = row.Subject;
        let materialName = row.Material;
        let scopeArr = this.scopeArr;
        this.paperData = row;
        // scopeArr => scopeTree => InitScopeIdArr => ScopeDataStr
        if (scopeArr && scopeArr.length > 0) {
          for (let i = 0; i < scopeArr.length; i++) {
            if (subjectName == scopeArr[i].subjectName) {
              let materialList = scopeArr[i].materialList;
              for (let j = 0; j < materialList.length; j++) {
                if (materialName == materialList[j].materialName) {
                  this.scopeTree = materialList[j].unitList;
                  for (let k = 0; k < this.scopeTree.length; k++) {
                    let unitId_parent = this.scopeTree[k].unitId;
                    if (this.scopeTree[k].subUnitList && this.scopeTree[k].subUnitList.length > 0) {
                      for (let m = 0; m < this.scopeTree[k].subUnitList.length; m++) {
                        this.scopeTree[k].subUnitList[m].unitId_parent = unitId_parent;
                      }
                      this.unitIdList.push(this.scopeTree[k].unitId)
                    }
                  }
                  this.setScopeDialog = true;
                  setTimeout(() => {
                    if (row.InitScopeIdArr && row.InitScopeIdArr.length > 0) {
                      // paperData.ScopeDataStr 中有原始数据
                      this.$refs.rangeTree.setCheckedKeys(row.InitScopeIdArr);
                    } else {
                      // paperData.ScopeDataStr 中无原始数据
                      this.$refs.rangeTree.setCheckedKeys([]);
                    }
                  }, 0)
                }
              }
            }
          }
        }
      },
      SetAllScope(){
        this.$refs.rangeTree.setCheckedKeys(this.unitIdList);
      },
      SetSpaceScope(){
        this.$refs.rangeTree.setCheckedKeys([]);
      },
      // 确定设置 "试卷考察范围"
      confirmSetScope(){
        let temp = this.$refs.rangeTree.getCheckedNodes();
        if (temp && temp.length > 0) {
          this.paperData.InitScopeIdArr = [];
          this.paperData.ScopeDataStr = '';
          for (let i = 0; i < temp.length; i++) {
            if (temp[i].level == 2) {
              this.paperData.InitScopeIdArr.push(temp[i].unitId);
              this.paperData.ScopeDataStr += temp[i].unitId_parent + '_' + temp[i].unitId + '@';
            }
          }
          this.paperData.ScopeDataStr = this.paperData.ScopeDataStr.slice(0, this.paperData.ScopeDataStr.length - 1);
          // 将其写入 vuex 原始数据
          this.$store.dispatch('CHANGE_ONE_PAPER', {paper: this.paperData});
          this.$refs.rangeTree.store.defaultExpandAll = false;
          this.setScopeDialog = false;
        } else {
          this.$refs.rangeTree.store.defaultExpandAll = false;
          this.setScopeDialog = false;
        }
      },
      //试卷难度值的添加和Num的重置
      addDifficulty(row){
        let difficultyList = this.difficultyList
        let defaultSection = this.defaultSection
        function getDifficulty(itemType, currentNum, count) {
          let curDiff = difficultyList[row.DiffcultyType - 1]
          let {start, end} = defaultSection
          if(curDiff[itemType]){
            start = curDiff[itemType].start
            end = curDiff[itemType].end
          }
          if(count == 1){
            return start
          }
          return (start + (end - start) / (count - 1) * currentNum).toFixed(3)
        }
        //OptionalFlag
        let Num = 0, paperDiffSum = 0, allScore = 0, OptionalScoreArr = []
        let singleNum = 0, multipleNum = 0, blankNum = 0, resolveNum = 0, judgeNum = 0
        let partLength = row.AllQuestionArr.length
        for(let i = 0; i < partLength; i ++){
          if(row.AllQuestionArr[i].children.length === 0){
            let qLength = row.AllQuestionArr[i].question.length
            for(let j = 0; j < qLength; j ++){
              Num++
              allScore = Number(row.AllQuestionArr[i].question[j].Score) + allScore
              row.AllQuestionArr[i].question[j].Num = Num
              if(row.AllQuestionArr[i].question[j].Type == 1){
                singleNum++
                row.AllQuestionArr[i].question[j].singleNum = singleNum
              }else if(row.AllQuestionArr[i].question[j].Type == 2){
                multipleNum++
                row.AllQuestionArr[i].question[j].multipleNum = multipleNum
              }else if(row.AllQuestionArr[i].question[j].Type == 3){
                blankNum++
                row.AllQuestionArr[i].question[j].blankNum = blankNum
              }else if(row.AllQuestionArr[i].question[j].Type == 4){
                resolveNum++
                row.AllQuestionArr[i].question[j].resolveNum = resolveNum
              }else if(row.AllQuestionArr[i].question[j].Type == 5){
                judgeNum++
                row.AllQuestionArr[i].question[j].judgeNum = judgeNum
              }
              if(row.AllQuestionArr[i].question[j].SubQuestionList.length > 0){
                let subLength = row.AllQuestionArr[i].question[j].SubQuestionList.length
                for(let m = 0; m < subLength; m ++){
                  if(row.AllQuestionArr[i].question[j].SubQuestionList[m].Type == 1){
                    singleNum++
                    row.AllQuestionArr[i].question[j].SubQuestionList[m].singleNum = singleNum
                  }else if(row.AllQuestionArr[i].question[j].SubQuestionList[m].Type == 2){
                    multipleNum++
                    row.AllQuestionArr[i].question[j].SubQuestionList[m].multipleNum = multipleNum
                  }else if(row.AllQuestionArr[i].question[j].SubQuestionList[m].Type == 3){
                    blankNum++
                    row.AllQuestionArr[i].question[j].SubQuestionList[m].blankNum = blankNum
                  }else if(row.AllQuestionArr[i].question[j].SubQuestionList[m].Type == 4){
                    resolveNum++
                    row.AllQuestionArr[i].question[j].SubQuestionList[m].resolveNum = resolveNum
                  }else if(row.AllQuestionArr[i].question[j].SubQuestionList[m].Type == 5){
                    judgeNum++
                    row.AllQuestionArr[i].question[j].SubQuestionList[m].judgeNum = judgeNum
                  }
                }
              }
            }
          }else{
            let briefLength = row.AllQuestionArr[i].children.length
            for(let j = 0; j < briefLength; j ++){
              let qLength = row.AllQuestionArr[i].children[j].question.length
              for(let m = 0; m < qLength; m++){
                Num++
                allScore = Number(row.AllQuestionArr[i].children[j].question[m].Score) + allScore
                row.AllQuestionArr[i].children[j].question[m].Num = Num
                if(row.AllQuestionArr[i].children[j].question[m].Type == 1){
                  singleNum++
                  row.AllQuestionArr[i].children[j].question[m].singleNum = singleNum
                }else if(row.AllQuestionArr[i].children[j].question[m].Type == 2){
                  multipleNum++
                  row.AllQuestionArr[i].children[j].question[m].multipleNum = multipleNum
                }else if(row.AllQuestionArr[i].children[j].question[m].Type == 3){
                  blankNum++
                  row.AllQuestionArr[i].children[j].question[m].blankNum = blankNum
                }else if(row.AllQuestionArr[i].children[j].question[m].Type == 4){
                  resolveNum++
                  row.AllQuestionArr[i].children[j].question[m].resolveNum = resolveNum
                }else if(row.AllQuestionArr[i].children[j].question[m].Type == 5){
                  judgeNum++
                  row.AllQuestionArr[i].children[j].question[m].judgeNum = judgeNum
                }
                if(row.AllQuestionArr[i].children[j].question[m].SubQuestionList.length > 0){
                  let subLength = row.AllQuestionArr[i].children[j].question[m].SubQuestionList.length
                  for(let n = 0; n < subLength; n ++){
                    if(row.AllQuestionArr[i].children[j].question[m].SubQuestionList[n].Type == 1){
                      singleNum++
                      row.AllQuestionArr[i].children[j].question[m].SubQuestionList[n].singleNum = singleNum
                    }else if(row.AllQuestionArr[i].children[j].question[m].SubQuestionList[n].Type == 2){
                      multipleNum++
                      row.AllQuestionArr[i].children[j].question[m].SubQuestionList[n].multipleNum = multipleNum
                    }else if(row.AllQuestionArr[i].children[j].question[m].SubQuestionList[n].Type == 3){
                      blankNum++
                      row.AllQuestionArr[i].children[j].question[m].SubQuestionList[n].blankNum = blankNum
                    }else if(row.AllQuestionArr[i].children[j].question[m].SubQuestionList[n].Type == 4){
                      resolveNum++
                      row.AllQuestionArr[i].children[j].question[m].SubQuestionList[n].resolveNum = resolveNum
                    }else if(row.AllQuestionArr[i].children[j].question[m].SubQuestionList[n].Type == 5){
                      judgeNum++
                      row.AllQuestionArr[i].children[j].question[m].SubQuestionList[n].judgeNum = judgeNum
                    }
                  }
                }
              }
            }
          }
        }
        for(let i = 0; i < partLength; i ++){
          if(row.AllQuestionArr[i].children.length === 0){
            let qLength = row.AllQuestionArr[i].question.length
            for(let j = 0; j < qLength; j ++){
              if(row.AllQuestionArr[i].question[j].Type == 1){
                row.AllQuestionArr[i].question[j].Difficulty = getDifficulty('single', row.AllQuestionArr[i].question[j].singleNum, singleNum)
              }else if(row.AllQuestionArr[i].question[j].Type == 2){
                row.AllQuestionArr[i].question[j].Difficulty = getDifficulty('multiple', row.AllQuestionArr[i].question[j].multipleNum, multipleNum)
              }else if(row.AllQuestionArr[i].question[j].Type == 3){
                row.AllQuestionArr[i].question[j].Difficulty = getDifficulty('blank', row.AllQuestionArr[i].question[j].blankNum, blankNum)
              }else if(row.AllQuestionArr[i].question[j].Type == 4){
                row.AllQuestionArr[i].question[j].Difficulty = getDifficulty('resolve', row.AllQuestionArr[i].question[j].resolveNum, resolveNum)
              }else if(row.AllQuestionArr[i].question[j].Type == 5){
                row.AllQuestionArr[i].question[j].Difficulty = getDifficulty('judge', row.AllQuestionArr[i].question[j].judgeNum, judgeNum)
              }
              if(row.AllQuestionArr[i].question[j].OptionalFlag){
                OptionalScoreArr.push(row.AllQuestionArr[i].question[j].Score)
              }
              if(row.AllQuestionArr[i].question[j].SubQuestionList.length > 0){
                let subLength = row.AllQuestionArr[i].question[j].SubQuestionList.length
                let diffSum = 0
                for(let m = 0; m < subLength; m ++){
                  if(row.AllQuestionArr[i].question[j].SubQuestionList[m].Type == 1){
                    row.AllQuestionArr[i].question[j].SubQuestionList[m].Difficulty = getDifficulty('single', row.AllQuestionArr[i].question[j].SubQuestionList[m].singleNum, singleNum)
                  }else if(row.AllQuestionArr[i].question[j].SubQuestionList[m].Type == 2){
                    row.AllQuestionArr[i].question[j].SubQuestionList[m].Difficulty = getDifficulty('multiple', row.AllQuestionArr[i].question[j].SubQuestionList[m].multipleNum, multipleNum)
                  }else if(row.AllQuestionArr[i].question[j].SubQuestionList[m].Type == 3){
                    row.AllQuestionArr[i].question[j].SubQuestionList[m].Difficulty = getDifficulty('blank', row.AllQuestionArr[i].question[j].SubQuestionList[m].blankNum, blankNum)
                  }else if(row.AllQuestionArr[i].question[j].SubQuestionList[m].Type == 4){
                    row.AllQuestionArr[i].question[j].SubQuestionList[m].Difficulty = getDifficulty('resolve', row.AllQuestionArr[i].question[j].SubQuestionList[m].resolveNum, resolveNum)
                  }else if(row.AllQuestionArr[i].question[j].SubQuestionList[m].Type == 5){
                    row.AllQuestionArr[i].question[j].SubQuestionList[m].Difficulty = getDifficulty('judge', row.AllQuestionArr[i].question[j].SubQuestionList[m].judgeNum, judgeNum)
                  }
                  diffSum = Number(row.AllQuestionArr[i].question[j].SubQuestionList[m].Difficulty) + diffSum
                }
                row.AllQuestionArr[i].question[j].Difficulty = (diffSum / subLength).toFixed(3)
              }
              paperDiffSum = Number(row.AllQuestionArr[i].question[j].Difficulty * row.AllQuestionArr[i].question[j].Score) + paperDiffSum
            }
          }else{
            let briefLength = row.AllQuestionArr[i].children.length
            for(let j = 0; j < briefLength; j ++){
              let qLength = row.AllQuestionArr[i].children[j].question.length
              for(let m = 0; m < qLength; m++){
                if(row.AllQuestionArr[i].children[j].question[m].Type == 1){
                  row.AllQuestionArr[i].children[j].question[m].Difficulty = getDifficulty('single', row.AllQuestionArr[i].children[j].question[m].singleNum, singleNum)
                }else if(row.AllQuestionArr[i].children[j].question[m].Type == 2){
                  row.AllQuestionArr[i].children[j].question[m].Difficulty = getDifficulty('multiple', row.AllQuestionArr[i].children[j].question[m].multipleNum, multipleNum)
                }else if(row.AllQuestionArr[i].children[j].question[m].Type == 3){
                  row.AllQuestionArr[i].children[j].question[m].Difficulty = getDifficulty('blank', row.AllQuestionArr[i].children[j].question[m].blankNum, blankNum)
                }else if(row.AllQuestionArr[i].children[j].question[m].Type == 4){
                  row.AllQuestionArr[i].children[j].question[m].Difficulty = getDifficulty('resolve', row.AllQuestionArr[i].children[j].question[m].resolveNum, resolveNum)
                }else if(row.AllQuestionArr[i].children[j].question[m].Type == 5){
                  row.AllQuestionArr[i].children[j].question[m].Difficulty = getDifficulty('judge', row.AllQuestionArr[i].children[j].question[m].judgeNum, judgeNum)
                }
                if(row.AllQuestionArr[i].children[j].question[m].OptionalFlag){
                  OptionalScoreArr.push(row.AllQuestionArr[i].children[j].question[m].Score)
                }
                if(row.AllQuestionArr[i].children[j].question[m].SubQuestionList.length > 0){
                  let subLength = row.AllQuestionArr[i].children[j].question[m].SubQuestionList.length
                  let diffSum = 0
                  for(let n = 0; n < subLength; n ++){
                    if(row.AllQuestionArr[i].children[j].question[m].SubQuestionList[n].Type == 1){
                      row.AllQuestionArr[i].children[j].question[m].SubQuestionList[n].Difficulty = getDifficulty('single', row.AllQuestionArr[i].children[j].question[m].SubQuestionList[n].singleNum, singleNum)
                    }else if(row.AllQuestionArr[i].children[j].question[m].SubQuestionList[n].Type == 2){
                      row.AllQuestionArr[i].children[j].question[m].SubQuestionList[n].Difficulty = getDifficulty('multiple', row.AllQuestionArr[i].children[j].question[m].SubQuestionList[n].multipleNum, multipleNum)
                    }else if(row.AllQuestionArr[i].children[j].question[m].SubQuestionList[n].Type == 3){
                      row.AllQuestionArr[i].children[j].question[m].SubQuestionList[n].Difficulty = getDifficulty('blank', row.AllQuestionArr[i].children[j].question[m].SubQuestionList[n].blankNum, blankNum)
                    }else if(row.AllQuestionArr[i].children[j].question[m].SubQuestionList[n].Type == 4){
                      row.AllQuestionArr[i].children[j].question[m].SubQuestionList[n].Difficulty = getDifficulty('resolve', row.AllQuestionArr[i].children[j].question[m].SubQuestionList[n].resolveNum, resolveNum)
                    }else if(row.AllQuestionArr[i].children[j].question[m].SubQuestionList[n].Type == 5){
                      row.AllQuestionArr[i].children[j].question[m].SubQuestionList[n].Difficulty = getDifficulty('judge', row.AllQuestionArr[i].children[j].question[m].SubQuestionList[n].judgeNum, judgeNum)
                    }
                    diffSum = Number(row.AllQuestionArr[i].children[j].question[m].SubQuestionList[n].Difficulty) + diffSum
                  }
                  row.AllQuestionArr[i].children[j].question[m].Difficulty = (diffSum / subLength).toFixed(3)
                }
                paperDiffSum = Number(row.AllQuestionArr[i].children[j].question[m].Difficulty * row.AllQuestionArr[i].children[j].question[m].Score) + paperDiffSum
              }
            }
          }
        }
        row.Difficulty = (paperDiffSum / allScore).toFixed(3)
        let tempSplitScore = 0
        if(OptionalScoreArr.length > 1){
          for(let i = 1; i < OptionalScoreArr.length; i++){
            tempSplitScore += Number(OptionalScoreArr[i])
          }
          row.Score = allScore - tempSplitScore
        } else {
          row.Score = allScore
        }
        row.IsSchoolUser = this.getSession('isSchoolUser')
        return row
      },
      //上传
      async uploadPaper(row){
        if (!row.AllNum) {
          this.$message({
            showClose: true,
            message: '试题总数不能为空！',
            type: 'warning'
          });
          return
        }
        // 20190125 对考察范围的限制 => 试卷考查范围为"" => 不能上传至后台
        if(!row.ScopeDataStr){
        	this.$message({
            showClose: true,
            message: '试卷考察范围不能为空，请设置试卷考察范围！',
            type: 'warning'
          });
          return
        }
        // 20190125 对每道试题的限制 => 大题小题主知识点为"" => 不能上传至后台
        var flagIndex = 0;
        row.AllQuestionArr.forEach((firstItem)=>{
        	if(firstItem.children==0){
        		// 一级题组
        		firstItem.question.forEach((item)=>{
        			if(item.Knowledge_main_points == ""){
        				this.$message({
			            showClose: true,
			            message: '该套试卷题目中有所有题目（题组题下小题在内）必须关联主知识点，请仔细核对！',
			            type: 'warning'
			          });
			          flagIndex++;
        			}else{
        				// 题组题小题处理
        				item.SubQuestionList.forEach((subItem)=>{
        					if(subItem.Knowledge_main_points == ""){
        						this.$message({
					            showClose: true,
					            message: '该套试卷题目中有所有题目（题组题下小题在内）必须关联主知识点，请仔细核对！',
					            type: 'warning'
					          });
					          flagIndex++;
        					}
        				})
        			}
        		})
        	}else{
        		// 二级题组
        		firstItem.children.forEach((secondItem)=>{
        			secondItem.question.forEach((item)=>{
        				if(item.Knowledge_main_points == ""){
	        				this.$message({
				            showClose: true,
				            message: '该套试卷题目中有所有题目（题组题下小题在内）必须关联主知识点，请仔细核对！',
				            type: 'warning'
				          });
				          flagIndex++;
	        			}else{
	        				// 题组题小题处理
	        				item.SubQuestionList.forEach((subItem)=>{
	        					if(subItem.Knowledge_main_points == ""){
	        						this.$message({
						            showClose: true,
						            message: '该套试卷题目中有所有题目（题组题下小题在内）必须关联主知识点，请仔细核对！',
						            type: 'warning'
						          });
						          flagIndex++;
	        					}
	        				})
	        			}
        			})
        		})
        	}
        })
        if(flagIndex == 0){
        	row = this.addDifficulty(row)
          if (row.Score != row.TotalPoints) {
            this.$message({
              showClose: true,
              message: `设置的试题总分值为${row.TotalPoints}与实际的试题总分值${row.Score}不同，请再次确认！`,
              type: 'warning'
            });
            return
          }
	        let url = '/paper/info/uploadPaperInfo'
	        let config = {
	          loading: true,
	          headers: {
	            'Content-Type': 'application/json'
	          }
	        }
	        let data = await this.api.post(url, row, config)
	        if (data) {
	          this.$message({
	            showClose: true,
	            message: '试卷上传成功！',
	            type: 'success'
	          });
	          this.$store.dispatch('DELETE_ONE_PAPER', {localId: row.localId})
	        }
        }else{
        	return;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .scroll-page {
    overflow: hidden;

  /deep/
  .el-scrollbar__wrap {
    overflow-x: hidden;

  .paperNotYetList {
    padding: 20px;

  /* 设置 '设置考查范围弹窗' 高度 */
  #setScopeDialog .el-dialog__body {
    height: 450px;
    overflow-y: auto;
  }

  }
  }
  }
  .papernotyet-view {
    flex: 1;
    overflow: hidden;
  }

  .el-dialog__wrapper {
    overflow: auto !important;
  }

  .detail {
    padding-left: 20px;
  }

  .bold {
    color: #409eff;
  }

  .partText {
    font-size: 18px;
    min-height: 50px;
    line-height: 50px;
  }

  .text {
    min-height: 24px;
    line-height: 24px;
  }

  .options {
    padding-left: 20px;
  }

  .option {
    min-height: 24px;
    line-height: 24px;
  }

  .briefText {
    font-size: 16px;
    min-height: 24px;
    line-height: 24px;
  }

  .property {
    padding-left: 10px;
  }

  .trueOption {
    color: red;
  }

  .property div {
    min-height: 24px;
    line-height: 24px;
  }

  .paperName{
    text-align: center;
    font-size: 20px;
    height: 40px;
    line-height: 40px;
  }

  .btn_style{
    padding: 9px 15px;
    font-size: 12px;
  }
  .text{
    border-top: 1px solid #cdcdcd;
    margin-top: 20px;
    padding-top: 20px;
  }
</style>