<template>
	<el-scrollbar class="paperalready-view scroll-page">
		<div class="paperAreadyList">
			<div class="class-list mt-5">
				
				<p class="guideBar">
					<img src="../../assets/images/process.png"/>
					<span>已上传试卷</span>
				</p>
				
				<el-select class="w_120 mr-20" v-model="selectSubjectId" @change="SubjectChange">
					<el-option v-for="item in subjectList"
						:label="item.subjectName"
						:value="item.subjectId">
					</el-option>
				</el-select>
				<el-select class="w_120 mr-20" v-model="selectGradeId" @change="GradeChange">
					<el-option v-for="item in filterGradeList"
						:label="item.gradeName"
						:value="item.gradeId">
					</el-option>
				</el-select>
				
				<div class="btn-medium-self-blue fRight ml-20" @click="getPaperList()">搜索</div>
				<el-input class="w_200 input-search-self fRight"
					placeholder="请输入内容"
				  prefix-icon="el-icon-search"
				  v-model="searchStr">
				</el-input>
				
				<el-table :data="paperList" stripe class="mTop20 table_self_blue">
          <el-table-column type="index" label="序号" width="50" ></el-table-column>
          <el-table-column prop="paperName" label="试卷名称" width=""></el-table-column>
          <el-table-column prop="subjectName" label="学段学科" width="100"></el-table-column>
          <el-table-column prop="materialName" label="教材版本" width="100"></el-table-column>
          <el-table-column prop="score" label="试卷总分" width="100"></el-table-column>
          <el-table-column prop="allNum" label="试题数量" width="100"></el-table-column>
          <el-table-column prop="source" label="试卷来源" width="100"></el-table-column>
          <el-table-column prop="createTime" label="上传时间" width="150">
						<template slot-scope="scope">
							{{scope.row.createTime | formatTime('YMDHMS')}}
						</template>
					</el-table-column>
          <el-table-column prop="useStatus" label="可用性" width="80"></el-table-column>
          <el-table-column prop="address" label="操作" width="80">
            <template slot-scope="scope">
              <el-popover placement="left" title="" trigger="click">
                <ul class="popover-list">
                	<li @click="testClick(scope.row)">查看试题ID</li>
                  <li @click="testClick(scope.row)">同步至前端</li>
                  <li @click="previewPaper(scope.row)">预览</li>
                </ul>
                <span slot="reference" class="el-icon-setting pointer handle-icon"></span>
              </el-popover>
            </template>
          </el-table-column>
          
        </el-table>
			</div>
			<div>
				<paging :current-page="currentPage" :total-num="total" :page-size="pageSize" @childrenChange="pageChange"></paging>
			</div>
		</div>
		<!--试卷预览弹框-->
		<el-dialog
			title="试卷预览"
			:visible.sync="previewDialog"
			width="70%"
			id="setDialog"
			center>
			<div class="previewPaper" v-show="items.children && items.children.length > 0">
				<div v-for="part in items.children">
					<div v-if="part.hasChild == 0" class="part">
						<div v-html="global.formatFirstPToSpan(part.text)" class="partText"></div>
						<div v-for="question,qIndex in part.questionList">
							<div
								v-html="(question.serial_num ? question.serial_num : qIndex + 1) + '.' + (question.score ? '（' + question.score + '分）' : '') + global.formatFirstPToSpan(question.text)"
								class="text"></div>
							<div v-if="question.qType == 1 || question.qType == 2" class="question">
								<div class="options" v-for="option in question.answerList">
									<div v-html="getOption(option.index) + '.' + global.formatFirstPToSpan(option.text)"
											 class="option" :class="{'trueOption': option.isRight == 1}"></div>
								</div>
							</div>
							<div v-show="question.subQuestionList && question.subQuestionList.length > 0" class="sub">
								<div v-for="subQuestion,subIndex in question.subQuestionList">
									<div class="subText" v-html="(subQuestion.serial_num
 ? subQuestion.serial_num : subIndex + 1)  + ' ' + (subQuestion.score ? '（' + subQuestion.score + '分）' : '') + global.formatFirstPToSpan(subQuestion.text)">
									</div>
									<div v-if="subQuestion.qType == 1 || subQuestion.qType == 2" class="subQuestion">
										<div class="options" v-for="option in subQuestion.answerList">
											<div v-html="getOption(option.index) + '. ' + global.formatFirstPToSpan(option.text)"
													 class="option" :class="{'trueOption': option.isRight == 1}"></div>
										</div>
									</div>
								</div>
							</div>
							<div class="property">
								<div>
									<span class="bold">考点：</span>
									<span>{{getPropertyName(question.pointList)}}</span>
								</div>
								<div>
									<span class="bold">分析：</span>
									<span v-html="global.formatFirstPToSpan(question.analysis)"></span>
								</div>
								<div>
									<span class="bold">点评：</span>
									<span v-html="global.formatFirstPToSpan(question.comments)"></span>
								</div>
								<div>
									<span class="bold">解答：</span>
									<span v-html="global.formatFirstPToSpan(question.qexplain)"></span>
								</div>
								<div>
									<span class="bold">学科能力：</span>
									<span v-html="getPropertyName(question.abilityList)"></span>
								</div>
								<div>
									<span class="bold">思想方法：</span>
									<span v-html="getPropertyName(question.thoughWayList)"></span>
								</div>
							</div>
						</div>
					</div>
					<div v-else class="part">
						<div v-html="global.formatFirstPToSpan(part.text)" class="partText"></div>
						<div v-for="brief in part.children" class="brief">
							<div v-html="global.formatFirstPToSpan(brief.text)" class="briefText"></div>
							<div v-for="question,qIndex in brief.questionList">
								<div
									v-html="(question.serial_num ? question.serial_num : qIndex + 1) + '.' + (question.score ? '（' + question.score + '分）' : '') + global.formatFirstPToSpan(question.text)"
									class="text"></div>
								<div v-if="question.qType == 1 || question.qType == 2" class="question">
									<div class="options" v-for="option in question.answerList">
										<div v-html="getOption(option.index) + '.' + global.formatFirstPToSpan(option.text)"
												 class="option" :class="{'trueOption': option.isRight == 1}"></div>
									</div>
								</div>
								<div v-show="question.subQuestionList && question.subQuestionList.length > 0" class="sub">
									<div v-for="subQuestion,subIndex in question.subQuestionList">
										<div class="subText"
												 v-html="(subQuestion.serial_num ? subQuestion.serial_num : subIndex + 1) + ' ' + (subQuestion.score ? '（' + subQuestion.score + '分）' : '') + global.formatFirstPToSpan(subQuestion.text)">
										</div>
										<div v-if="subQuestion.qType == 1 || subQuestion.qType == 2" class="subQuestion">
											<div class="options" v-for="option in subQuestion.answerList">
												<div v-html="getOption(option.index) + '. ' + global.formatFirstPToSpan(option.text)"
														 class="option" :class="{'trueOption': option.isRight == 1}"></div>
											</div>
										</div>
									</div>
								</div>
								<div class="property">
									<div>
										<span class="bold">考点：</span>
										<span>{{getPropertyName(question.pointList)}}</span>
									</div>
									<div>
										<span class="bold">分析：</span>
										<span v-html="global.formatFirstPToSpan(question.analysis)"></span>
									</div>
									<div>
										<span class="bold">点评：</span>
										<span v-html="global.formatFirstPToSpan(question.comments)"></span>
									</div>
									<div>
										<span class="bold">解答：</span>
										<span v-html="global.formatFirstPToSpan(question.qexplain)"></span>
									</div>
									<div>
										<span class="bold">学科能力：</span>
										<span v-html="getPropertyName(question.abilityList)"></span>
									</div>
									<div>
										<span class="bold">思想方法：</span>
										<span v-html="getPropertyName(question.thoughWayList)"></span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</el-dialog>
	</el-scrollbar>
</template>

<script>
	export default {
		components: {
			
		},
		data() {
			return {
        gradeList: [],
        subjectList: [],
				filterGradeList: [],
				selectGradeId: 0,
				selectSubjectId: 0,
				searchStr: '',
				paperList: [],
				currentPage: 1,
				pageSize: 10,
				total: 0,
				//试卷预览
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
        }
			}
		},
		mounted() {
      this.selectCondition()
			this.getPaperList()
		},
		methods: {
      //获取选项
      getOption(index){
        return this.optionList[index]
      },
		  previewPaper(row){
				this.getPaperQuestionDetail(row.paperId)
			},
			async getPaperQuestionDetail(paperId){
		    let url = '/paper/info/getPaperQuestionDetail'
				let params = {
		      paperId
				}
				let data = await this.api.get(url, params, {loading: true})
				if(data){
		      this.items = data.data
          this.previewDialog = true
				}
			},
      pageChange(currentPage, pageSize){
        this.currentPage = currentPage
        this.pageSize = pageSize
        this.getPaperList()
      },
			testClick(row){
				console.log(row);
			},
			async getPaperList(){
			  let url = '/paper/info/getPaperList'
				let params = {
          subjectId: this.selectSubjectId ? this.selectSubjectId : '',
          gradeId: this.selectGradeId ? this.selectGradeId : '',
          name: this.searchStr,
					currentPage: this.currentPage,
					pageSize: this.pageSize
				}
				let data = await this.api.get(url, params, { loading: true})
				if(data){
			    console.log(data)
					//paperStatus  1正式  2草稿
					this.paperList = data.data.paperInfoList
					this.total = data.data.count
				}
			},
			async selectCondition(){
			  let url = '/paper/info/selectCondition'
				let params = {}
				let data = await this.api.get(url, params)
				if(data){
          this.gradeList = []
					this.subjectList = []
			    console.log(data)
					this.gradeList = data.data.gradeList
					this.gradeList.unshift({
            gradeId: 0,
            gradeName: '全部'
          })
          this.filterGradeList = this.gradeList
					this.selectGradeId = this.filterGradeList[0].gradeId
					this.subjectList = data.data.subjectList
					this.subjectList.unshift({
            subjectId: 0,
            subjectName: '全部'
          })
					this.selectSubjectId = this.subjectList[0].subjectId
				}
			},
      SubjectChange(){
				if(this.selectSubjectId != 0){
          let phase
			    for(let i = 0, len = this.subjectList.length; i < len; i ++){
			      if(this.selectSubjectId == this.subjectList[i].subjectId){
			        phase = this.subjectList[i].phase
						}
					}
					if(phase){
			      this.filterGradeList = this.gradeList.filter(function (item) {
							if(item.gradeId == 0){
							  return true
							}else if(item.phase == phase){
							  return true
							}else{
							  return false
							}
            })
					}
				}else{
          this.filterGradeList = this.gradeList
				}
				console.log(this.filterGradeList)
        this.selectGradeId = this.filterGradeList[0].gradeId
        this.getPaperList()
			},
      getPropertyName(list){
        console.log(list)
        let arr = []
				for(let i = 0, len = list.length; i < len; i++){
          arr.push(list[i].name)
				}
				console.log(arr.join(','))
				return arr.join(',')
			},
      GradeChange(){
        this.getPaperList()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.scroll-page {
		overflow: hidden;
		/deep/ .el-scrollbar__wrap {
			overflow-x: hidden;
			.paperAreadyList {
				padding: 20px;
			}
		}
	}
	.paperalready-view {
		flex: 1;
		overflow: hidden;
	}

	.detail {
		padding-left: 20px;
	}

	.bold {
		color: #409eff;
	}

	.partText {
		font-size: 18px;
		min-height: 28px;
		line-height: 28px;
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
</style>