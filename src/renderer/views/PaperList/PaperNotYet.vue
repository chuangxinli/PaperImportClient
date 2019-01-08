<template>
	<el-scrollbar class="papernotyet-view scroll-page">
		<div class="paperNotYetList">
			<div class="class-list mt-5">
				
				<p class="guideBar">
					<img src="../../assets/images/process.png"/>
					<span>待处理试卷</span>
				</p>
				
				<el-select class="w_120 mr-20" v-model="subjectId" @change="SubjectChange">
					<el-option v-for="item in SubjectArr" :key="item.subjectId" :label="item.subjectName" :value="item.subjectId"></el-option>
				</el-select>
				<el-select class="w_120 mr-20" v-model="materialId" @change="MaterialChange">
					<el-option v-for="item in MaterialArr" :key="item.subjectId" :label="item.materialName" :value="item.materialId"></el-option>
				</el-select>
				<importPaper class="inline_block"></importPaper>
				<importPaper2 class="inline_block"></importPaper2>
				<div class="btn-medium-self-blue mr-20" @click="removeAll()">全部删除</div>
				<div class="btn-medium-self-blue fRight ml-20" @click="FilterPaper">搜索</div>
				<el-input class="w_200 input-search-self fRight"
					placeholder="请输入内容"
				  prefix-icon="el-icon-search"
				  v-model="PaperName">
				</el-input>
				
				<el-table :data="tableData" stripe class="mTop20 table_self_blue">
          <el-table-column type="index" label="序号" width="50" ></el-table-column>
          <el-table-column prop="Title" label="试卷名称" width="" class="text_left"></el-table-column>
          <el-table-column prop="Subject" label="学段学科" width="100"></el-table-column>
          <el-table-column prop="Material" label="教材版本" width="100"></el-table-column>
          <el-table-column prop="TotalPoints" label="总分" width="50"></el-table-column>
          <el-table-column prop="question.length" label="试题总数" width="100"></el-table-column>
          <el-table-column prop="Papersource" label="试卷来源" width="100"></el-table-column>
          <el-table-column prop="localId" label="上传时间" width="150" :formatter="FormatDatetime"></el-table-column>
          <el-table-column prop="useStatus" label="可用性" width="80"></el-table-column>
          <el-table-column prop="address" label="操作" width="50">
            <template slot-scope="scope">
              <el-popover placement="left" title="" trigger="click">
                <ul class="popover-list">
                	<li @click="PaperAttributeEdit(scope.row)">试卷属性编辑</li>
                  <li @click="ItemEditMain(scope.row)">试题编辑</li>
                  <li @click="SetScopeData(scope.row)">考察范围</li>
                  <li @click="TestClick(scope.row)">上传至后台</li>
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
				  
				  <!-- 树状结构 -->
				  <el-tree
					  :data="scopeTree"
					  show-checkbox
					  node-key="unitId"
					  ref="rangeTree"
					  highlight-current
					  :default-checked-keys="InitScopeIdArr"
					  :props="defaultProps">
					</el-tree>
				  
				  <span slot="footer" class="dialog-footer">
				    <el-button @click="setScopeDialog = false">取 消</el-button>
				    <el-button type="primary" @click="confirmSetScope()">确 定</el-button>
				  </span>
				</el-dialog>

				<!--试卷预览弹框-->
				<el-dialog
					title="试卷预览"
					:visible.sync="previewDialog"
					width="70%"
					center>
					<div>
						<div class="titleInfo">
							<p>
								<span>试卷属性：</span>
								<span>{{items.Title}}</span>
							</p>
							<p>
								<span>试卷名称：</span>
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
						<div v-show="single.length > 0">
							<div>一、单项选择题 </div>
							<div v-for="item in single">
								<div class="title">
									<span>{{item.Num}}、</span>
									<span>({{item.Score}}分)</span>
									<span v-html="item.Text"></span>
								</div>
								<div class="detail">
									<div v-for="subItem in item.Options" v-html="subItem.holeAnwser"></div>
									<div>
										<span class="bold">考点：</span>
										<span v-html="item.ExaminationPointsName.join(';')"></span>
									</div>
									<div>
										<span class="bold">分析：</span>
										<span v-html="item.Analysis"></span>
									</div>
									<div>
										<span class="bold">点评：</span>
										<span v-html="item.Comments"></span>
									</div>
									<div>
										<span class="bold">解答：</span>
										<span v-html="item.Analysis"></span>
									</div>
								</div>
							</div>
						</div>
						<div v-show="multiple.length > 0">
							<div>一、多项选择题 </div>
							<div v-for="item in multiple">
								<div class="title">
									<span>{{item.Num}}、</span>
									<span>({{item.Score}}分)</span>
									<span v-html="item.Text"></span>
								</div>
								<div class="detail">
									<div v-for="subItem in item.Options" v-html="subItem.holeAnwser"></div>
									<div>
										<span class="bold">考点：</span>
										<span v-html="item.ExaminationPointsName.join(';')"></span>
									</div>
									<div>
										<span class="bold">分析：</span>
										<span v-html="item.Analysis"></span>
									</div>
									<div>
										<span class="bold">点评：</span>
										<span v-html="item.Comments"></span>
									</div>
									<div>
										<span class="bold">解答：</span>
										<span v-html="item.Analysis"></span>
									</div>
								</div>
							</div>
						</div>
						<div v-show="blank.length > 0">
							<div>一、填空题 </div>
							<div v-for="item in blank">
								<div class="title">
									<span>{{item.Num}}、</span>
									<span>({{item.Score}}分)</span>
									<span v-html="item.Text"></span>
								</div>
								<div class="detail">
									<div v-for="subItem in item.Options" v-html="subItem.holeAnwser"></div>
									<div>
										<span class="bold">考点：</span>
										<span v-html="item.ExaminationPointsName.join(';')"></span>
									</div>
									<div>
										<span class="bold">分析：</span>
										<span v-html="item.Analysis"></span>
									</div>
									<div>
										<span class="bold">点评：</span>
										<span v-html="item.Comments"></span>
									</div>
									<div>
										<span class="bold">解答：</span>
										<span v-html="item.Analysis"></span>
									</div>
								</div>
							</div>
						</div>
						<div v-show="resolve.length > 0">
							<div>一、解答题 </div>
							<div v-for="item in resolve">
								<div class="title">
									<span>{{item.Num}}、</span>
									<span>({{item.Score}}分)</span>
									<span v-html="item.Text"></span>
								</div>
								<div v-show="item.SubQuestionList.length > 0">
									<div v-for="subItem in item.SubQuestionList" v-html="subItem.Text"></div>
								</div>
								<div class="detail">
									<div v-for="subItem in item.Options" v-html="subItem.holeAnwser"></div>
									<div>
										<span class="bold">考点：</span>
										<span v-html="item.ExaminationPointsName.join(';')"></span>
									</div>
									<div>
										<span class="bold">分析：</span>
										<span v-html="item.Analysis"></span>
									</div>
									<div>
										<span class="bold">点评：</span>
										<span v-html="item.Comments"></span>
									</div>
									<div>
										<span class="bold">解答：</span>
										<span v-html="item.Analysis"></span>
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
  import importPaper2 from '@/components/import2.vue'
	export default {
		components: {
      importPaper,
      importPaper2
		},
		data() {
			return {
				SubjectArr:	[ { subjectId: '999',   subjectName: '全部'} ],
				MaterialArr:[ { materialId: '999', materialName: '全部'} ],
				subjectId: '999',		// 学段学科
				subjectName: '',		// 学段学科名称
				materialId: '999',	// 教材版本
				materialName:'',		// 教材版本名称
				PaperName: '',			// 试卷名称  => 检索用
				scopeArr: [],				// 设置试卷考察范围 全数组 学段学科 => 教材版本 => 章节知识点 层级数组显示
				scopeDataStr: '',		// 最终形成的 paperData.scopeDataStr 为 章_节@章_节@章_节 拼接的字符串
				setScopeDialog: false,
				tableData: [],
				
				// 虚拟树状结构
				scopeTree: [],			// 章节知识点范围
        defaultProps: { children: 'subUnitList', label: 'unitName' },
        InitScopeIdArr: [],
				//预览
				previewDialog: false,
				items: {},
				single: [],
				multiple: [],
				blank: [],
				resolve: []
			}
		},
		mounted() {
			// 接收 Vuex 中未上传试卷列表数据
			this.tableData = JSON.parse(JSON.stringify(this.$store.state.Paper.jsonArr));
			// 接收 Vuex 学段学科教材版本数据					=> 只做 学段学科 教材版本 学科能力 思想方法 级联
			let subjectAboutInfo = JSON.parse(JSON.stringify(this.$store.state.Version.subjectAboutInfo));
			this.SubjectArr = this.SubjectArr.concat(subjectAboutInfo);		// 学段学科 加上全部 ''
			// 接收 Vuex 学段学科教材版本章节知识点树		=> 只做 学段学科 教材版本 章节知识点 树形结构
			this.scopeArr = JSON.parse(JSON.stringify(this.$store.state.Version.unitAndSubUnit));
		},
		methods: {
			removeAll(){
        this.$store.dispatch('DELETE_ONE_PAPER',{
          localId: -1
        })
      },
			TestClick(row){
			  console.log(row)
			  this.single = []
				this.multiple = []
				this.blank = []
				this.resolve = []
			  this.previewDialog = true
				this.items = row
				for(let i = 0, len = this.items.question.length; i < len; i++){
			    this.items.question[i].Text = this.global.formatPToSpan2(this.global.formatPToSpan(this.items.question[i].Text))
					this.items.question[i].Explain = this.global.formatPToSpan(this.items.question[i].Explain)
          this.items.question[i].Analysis = this.global.formatPToSpan(this.items.question[i].Analysis)
          this.items.question[i].Comments = this.global.formatPToSpan(this.items.question[i].Comments)
          if (this.items.question[i].Options && this.items.question[i].Options.length > 0) {
            for (let j = 0; j < this.items.question[i].Options.length; j++) {
              if (this.items.question[i].Type == 1 || this.items.question[i].Type == 2) {
                if (this.items.question[i].Options[j].Index == 1) {
                  this.items.question[i].Options[j].choice = 'A';
                  if (this.items.question[i].Options[j].IsRight) {
                    this.items.question[i].rightanswer = 'A；';
                  }
                } else if (this.items.question[i].Options[j].Index == 2) {
                  this.items.question[i].Options[j].choice = 'B';
                  if (this.items.question[i].Options[j].IsRight) {
                    this.items.question[i].rightanswer = 'B；';
                  }
                } else if (this.items.question[i].Options[j].Index == 3) {
                  this.items.question[i].Options[j].choice = 'C';
                  if (this.items.question[i].Options[j].IsRight) {
                    this.items.question[i].rightanswer = 'C；';
                  }
                } else if (this.items.question[i].Options[j].Index == 4) {
                  this.items.question[i].Options[j].choice = 'D';
                  if (this.items.question[i].Options[j].IsRight) {
                    this.items.question[i].rightanswer = 'D；';
                  }
                } else if (this.items.question[i].Options[j].Index == 5) {
                  this.items.question[i].Options[j].choice = 'E';
                  if (this.items.question[i].Options[j].IsRight) {
                    this.items.question[i].rightanswer = 'E；';
                  }
                } else if (this.items.question[i].Options[j].Index == 6) {
                  this.items.question[i].Options[j].choice = 'F';
                  if (this.items.question[i].Options[j].IsRight) {
                    this.items.question[i].rightanswer = 'F；';
                  }
                } else if (this.items.question[i].Options[j].Index == 7) {
                  this.items.question[i].Options[j].choice = 'G';
                  if (this.items.question[i].Options[j].IsRight) {
                    this.items.question[i].rightanswer = 'G；';
                  }
                } else if (this.items.question[i].Options[j].Index == 8) {
                  this.items.question[i].Options[j].choice = 'H';
                  if (this.items.question[i].Options[j].IsRight) {
                    this.items.question[i].rightanswer = 'H；';
                  }
                }
                this.items.question[i].Options[j].holeAnwser = this.items.question[i].Options[j].choice + "、" + this.global.formatPToSpan(this.items.question[i].Options[j].Text);
                this.items.question[i].Options[j].holeAnwser = this.global.formatPToSpan(this.items.question[i].Options[j].holeAnwser);
              }
            }
          }
			    if(this.items.question[i].Type == 1){
			      this.single.push(this.items.question[i])
					}else if(this.items.question[i].Type == 2){
			      this.multiple.push(this.items.question[i])
					}else if(this.items.question[i].Type == 3){
					  this.blank.push(this.items.question[i])
					}else if(this.items.question[i].Type == 4){
					  this.resolve.push(this.items.question[i])
					}
				}
				console.log(this.single)
				console.log(this.multiple)
				console.log(this.blank)
				console.log(this.resolve)
			},
			// 试卷属性编辑
			PaperAttributeEdit(row){
				this.setLocal('paperData',JSON.stringify(row));
				this.changeRouterByName('PaperAttributeEdit');
			},
			// 试题编辑
			ItemEditMain(row){
				this.setLocal('paperData',JSON.stringify(row));
				this.changeRouterByName('ItemEditMain');
			},
			// 清除单条数据
			ClearVuexData(row){
				this.$confirm('确定要删除该条数据，是否继续?', '提示', {
					confirmButtonText: '确 定',
					cancelButtonText: '取 消',
					type: 'warning'
				}).then(() => {
					this.$store.dispatch('DELETE_ONE_PAPER',{
          	localId: row.localId
        	})
				}).catch(() => {

				})
			},
			// 时间戳处理成 年月日时分秒 格式
			FormatDatetime(row, column) {
        let time = new Date(Number(row.localId));
		    let year = time.getFullYear();
		    let month = time.getMonth()+1;
		    let date = time.getDate();
		    let hours = time.getHours();
		    let minutes = time.getMinutes();
		    let seconds = time.getSeconds();
		    return 	year + '-' 
		    				+ (month<10 ? '0'+month : month) + '-' 
		    				+ (date<10 ? '0' + date : date)+ ' ' 
		    				+ (hours<10 ? '0' + hours : hours)+ ':' 
		    				+ (minutes<10 ? '0' + minutes : minutes)+ ':' 
		    				+ (seconds<10 ? '0' + seconds : seconds);
     	},
			// 学段学科 <=> 教材版本
			SubjectChange(){
				if(this.subjectId == '999'){
					this.subjectName = '';
					this.MaterialArr = [ { materialId: '999', materialName: '全部'} ];
				}else{
					let SubjectArr = this.SubjectArr;
					for(let i=0; i<SubjectArr.length; i++){
						if(SubjectArr[i].materialList && SubjectArr[i].materialList.length>0){
							if(this.subjectId == SubjectArr[i].subjectId){
								this.subjectName = SubjectArr[i].subjectName;
								this.MaterialArr = [ { materialId: '999', materialName: '全部'} ].concat(SubjectArr[i].materialList);
							}
						}else{
							this.subjectName = '';
							this.MaterialArr = [ { materialId: '999', materialName: '全部'} ];
						}
					}
				}
				this.materialId = '999';
				this.materialName = '';
			},
			// 教材版本改变 <=> 获取教材版本名称
			MaterialChange(){
				if(this.materialId == '999'){
					this.materialName = ''
				}else{
					let MaterialArr = this.MaterialArr;
					for(let i=0; i<MaterialArr.length; i++){
						if(this.materialId == MaterialArr[i].materialId){
							this.materialName = MaterialArr[i].materialName;
						}
					}
				}
			},
			// 学段学科 教材版本 手动输入 全条件检索
			FilterPaper(){
				let tableData    = JSON.parse(JSON.stringify(this.$store.state.Paper.jsonArr));
				let filterPapers = [];
				for(let i=0; i<tableData.length; i++){
					if( tableData[i].Subject.includes(this.subjectName) && tableData[i].Material.includes(this.materialName) && tableData[i].Title.includes(this.PaperName) ){
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
				
				console.log(this.scopeArr);
				
				// scopeArr => scopeTree => InitScopeIdArr => scopeDataStr
				if(scopeArr && scopeArr.length>0){
					for(let i=0; i<scopeArr.length; i++){
						if(subjectName == scopeArr[i].subjectName){
							let materialList = scopeArr[i].materialList;
							for(let j=0; j<materialList.length; j++){
								if(materialName == materialList[j].materialName){
									this.scopeTree = materialList[j].unitList;
									for(let k=0; k<this.scopeTree.length; k++){
										let unitId_parent = this.scopeTree[k].unitId;
										if(this.scopeTree[k].subUnitList && this.scopeTree[k].subUnitList.length>0){
											for(let m=0; m<this.scopeTree[k].subUnitList.length; m++){
												this.scopeTree[k].subUnitList[m].unitId_parent = unitId_parent;
											}
										}
									}
//									if(row.scopeDataStr && row.scopeDataStr.length>0){
//										// paperData.scopeDataStr 中有原始数据
//					
//									}else{
//										// paperData.scopeDataStr 中无原始数据
//									}
									this.setScopeDialog = true;
								}
							}
						}
					}
				}
			},
			// 确定设置 "试卷考察范围"
			confirmSetScope(){
				let temp = this.$refs.rangeTree.getCheckedNodes();
				console.log(temp);
				if(temp && temp.length>0){
					for(let i =0; i<temp.length; i++){
						
					}
				}else{
					
				}
				
				
			},
			
			
			
		}
		
	}
</script>

<style lang="scss" scoped>
	.scroll-page {
		overflow: hidden;
		/deep/ .el-scrollbar__wrap {
			overflow-x: hidden;
			.paperNotYetList {
				padding: 20px;
				
				/* 设置 '设置考查范围弹窗' 高度 */
				#setScopeDialog .el-dialog__body{
					height: 500px;
					overflow-y: auto;
				}
			}
		}
	}
	.papernotyet-view {
		flex: 1;
		overflow: hidden;
	}
	.el-dialog__wrapper{
		overflow: auto !important;
	}
	.detail{
		padding-left: 20px;
	}
	.bold{
		font-weight: 800;
	}
</style>