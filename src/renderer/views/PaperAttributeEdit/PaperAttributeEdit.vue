<!-- 试卷属性编辑页 -->
<template>
	<el-scrollbar class="paperAttributeEdit-view scroll-page">
		<div class="paperAttributeMain">
			<div class="class-list mt-5">
				
				<p class="guideBar">
					<img src="../../assets/images/process.png"/>
					<span @click="changeRouterByName('PaperNotYet')">待处理试卷</span> 》 
					<a href="javascript: void(0);">试卷属性编辑</a>
				</p>
				
				<!-- 编辑试卷名称 -->
				<el-input class="w_500 input-search-self"
					placeholder="请输入试卷名称"
				  prefix-icon="el-icon-edit"
				  @blur="changPaperTitle"
				  v-model="paperData.Title">
				</el-input>
				
				<div class="btn-medium-self-blue fRight ml-20" @click="goBack()">返回</div>
				
				<div class="boderRadiusBox mTop20 mBottom20">
					<!-- 整体属性 -->
					<div :class="isMainSelect?'headerSpread':'headerFold'" @click="alterMainOrSub()">
						整卷属性 
						<img src="../../assets/images/arrow_up.png" v-show="isMainSelect" class="left_6em" alt="" />
						<img src="../../assets/images/arrow_down.png" v-show="!isMainSelect" class="left_6em" alt="" />
					</div>
					<div class="boderRadiusBox w_30p fLeft" v-show="isMainSelect">
						
						<div class="itemSelect">
							<div class="inline_block w_120">学段学科</div>
						  <el-select class="w_120" v-model="model_test1">
								<el-option v-for="item in testArr1" 
									:key="item.name" 
									:label="item.name" 
									:value="item.value">
								</el-option>
							</el-select>
					  </div>
					  
					  <div class="itemSelect">
							<div class="inline_block w_120">教材版本</div>
						  <el-select class="w_120" v-model="model_test1">
								<el-option v-for="item in testArr1" 
									:key="item.name" 
									:label="item.name" 
									:value="item.value">
								</el-option>
							</el-select>
					  </div>
					  
					  <div class="itemSelect">
							<div class="inline_block w_120">试卷类型</div>
						  <el-select class="w_120" v-model="model_test1">
								<el-option v-for="item in testArr1" 
									:key="item.name" 
									:label="item.name" 
									:value="item.value">
								</el-option>
							</el-select>
					  </div>
					  
					  <div class="itemSelect">
							<div class="inline_block w_120">适用学期</div>
						  <el-select class="w_120" v-model="model_test1">
								<el-option v-for="item in testArr1" 
									:key="item.name" 
									:label="item.name" 
									:value="item.value">
								</el-option>
							</el-select>
					  </div>
					  
					  <div class="itemSelect">
							<div class="inline_block w_120">试卷总分值</div>
						  <el-select class="w_120" v-model="model_test1">
								<el-option v-for="item in testArr1" 
									:key="item.name" 
									:label="item.name" 
									:value="item.value">
								</el-option>
							</el-select>
					  </div>
					  
					  <div class="itemSelect">
							<div class="inline_block w_120">建议答题时长</div>
						  <el-select class="w_120" v-model="model_test1">
								<el-option v-for="item in testArr1" 
									:key="item.name" 
									:label="item.name" 
									:value="item.value">
								</el-option>
							</el-select>
					  </div>
					  
					  <div class="itemSelect">
							<div class="inline_block w_120">试卷来源</div>
						  <el-select class="w_120" v-model="model_test1">
								<el-option v-for="item in testArr1" 
									:key="item.name" 
									:label="item.name" 
									:value="item.value">
								</el-option>
							</el-select>
					  </div>
						
					</div>
					<div class="boderRadiusBox w_60p fRight" v-show="isMainSelect">
						
						<div class="itemSelect">
							<div class="inline_block w_100">难度值</div>
						  <el-input class="w_120 input-search-self"
								placeholder="请输入难度值"
							  prefix-icon="el-icon-edit"
							  v-model="difficulty">
							</el-input>
							<div class="inline_block notice">请填写0-1之间的数，若试卷难度为X</div>
					  </div>
					  
					  <div class="itemSelect">
							<div class="inline_block w_100">难度方案</div>
						  <el-input class="w_120 input-search-self"
								placeholder="请输入难度方案"
							  prefix-icon="el-icon-edit"
							  v-model="difficulty">
							</el-input>
							<div class="inline_block notice">需要参考专业设置文档</div>
					  </div>
					  
					  <div class="itemSelect">
							<div class="inline_block w_100">区分度</div>
						  <el-input class="w_120 input-search-self"
								placeholder="请输入区分度"
							  prefix-icon="el-icon-edit"
							  v-model="difficulty">
							</el-input>
							<div class="inline_block notice"></div>
					  </div>
					  
					  <div class="itemSelect">
							<div class="inline_block w_100">核心题库</div>
						  <el-select class="w_120" v-model="model_test1">
								<el-option v-for="item in testArr1" 
									:key="item.name" 
									:label="item.name" 
									:value="item.value">
								</el-option>
							</el-select>
							<div class="inline_block notice">是否进入核心题库</div>
					  </div>
					  
					  <div class="itemSelect">
							<div class="inline_block w_100">同步试题</div>
						  <el-select class="w_120" v-model="model_test1">
								<el-option v-for="item in testArr1" 
									:key="item.name" 
									:label="item.name" 
									:value="item.value">
								</el-option>
							</el-select>
							<div class="inline_block notice">是否用于同步测试</div>
					  </div>
					  
					  <div class="itemSelect">
							<div class="inline_block w_100">双三试题</div>
						  <el-select class="w_120" v-model="model_test1">
								<el-option v-for="item in testArr1" 
									:key="item.name" 
									:label="item.name" 
									:value="item.value">
								</el-option>
							</el-select>
							<div class="inline_block notice">是否适用于初三、高三总复习测试</div>
					  </div>
					  
					  <div class="itemSelect">
							<div class="inline_block w_100">是否隐藏</div>
						  <el-select class="w_120" v-model="model_test1">
								<el-option v-for="item in testArr1" 
									:key="item.name" 
									:label="item.name" 
									:value="item.value">
								</el-option>
							</el-select>
							<div class="inline_block notice">默认选择否</div>
					  </div>
					
					</div>
					
					<!-- 分组信息 -->
					<div :class="isMainSelect?'headerFold':'headerSpread'" @click="alterMainOrSub()">
						分组信息 
						<img src="../../assets/images/arrow_down.png" v-show="isMainSelect" class="left_6em" alt="" />
						<img src="../../assets/images/arrow_up.png" v-show="!isMainSelect" class="left_6em" alt="" />
					</div>
					<el-table :data="themeList" stripe class="table_self_white" v-show="!isMainSelect">
	          <el-table-column type="index" label="序号" width="100" ></el-table-column>
	          <el-table-column prop="Name" label="题型" width="100"></el-table-column>
	          <el-table-column prop="BigTitle.instruction" label="答题指导语" width=""></el-table-column>
	          <el-table-column prop="NumberRange" label="包含试题序号" width="150"></el-table-column>
	          <el-table-column prop="address" label="操作" width="100">
	            <template slot-scope="scope">
	            	<span class="el-icon-edit" @click='editInfo(scope.row)'></span>
	            	<span class="el-icon-delete" @click='deleteItem(scope.row)'></span>
	      			</template>
	          </el-table-column>
	        </el-table>
					<div class="subBottom text_center" v-show="!isMainSelect">
						<div class="btn-medium-self-blue" @click="addItem()">新增</div>
					</div>
				</div>
				
				<!-- 编辑 "答题指导语" 弹窗 -->
				<el-dialog title="编辑答题指导语" :visible.sync="editBigTitleDialog" width="40%">
				  <el-form ref="form" label-width="85px">
					  <el-form-item label="答题指导语">
					    <el-input type="textarea" v-model="BigTitle"></el-input>
					  </el-form-item>
					</el-form>
				  <span slot="footer" class="dialog-footer">
				    <el-button @click="editBigTitleDialog = false">取 消</el-button>
				    <el-button type="primary" @click="confirmEidt()">确 定</el-button>
				  </span>
				</el-dialog>
				
				
			</div>
		</div>
	</el-scrollbar>
</template>

<script>
	export default {
		components: {
			
		},
		data() {
			return {
				testArr1:[
					{ name: '全部', value: '0'},
					{ name: '初中数学', value: '1'},
					{ name: '初中物理', value: '2'},
					{ name: '初中化学', value: '3'},
					{ name: '高中数学', value: '4'},
					{ name: '高中物理', value: '5'},
					{ name: '高中化学', value: '6'}
				],
				testArr2:[
					{ name: '全部', value: '0'},
					{ name: '初一', value: '1'},
					{ name: '初二', value: '2'},
					{ name: '初三', value: '3'},
					{ name: '高一', value: '4'},
					{ name: '高二', value: '5'},
					{ name: '高三', value: '6'}
				],
				model_test1: '0',
				model_test2: '0',
				Title: '',
				difficulty: '0.25',
				
				isMainSelect: true,
				editBigTitleDialog: false,		// 编辑 '答题指导语' 中的动态数据 弹窗
				BigTitle: "",									// 编辑 '答题指导语' 中的动态数据
				BigTitle_Name: "",						// 编辑 '答题指导语' 类型 "单多填简"
				paperData:{ Title:'' },				// 试卷名称修改
				themeList:[],									// 单多填简		大题统计数组列表
				
			}
		},
		mounted() {
			this.paperData = JSON.parse(this.getLocal('paperData'));
			console.log(this.paperData);
			
			// 初始化数据 => 1: 原始数据(没有动态数据统计) => 2: 非原始数据(已经有单多填简统计数据)
			if(this.paperData.SingleObj || this.paperData.MultiObj || this.paperData.GapObj || this.paperData.ResolveObj){
				// 有原始数据
				if(this.paperData.SingleObj.QuesArr.length > 0){
					this.themeList.push(this.paperData.SingleObj); 
				}
				if(this.paperData.MultiObj.QuesArr.length > 0){
					this.themeList.push(this.paperData.MultiObj); 
				}
				if(this.paperData.GapObj.QuesArr.length > 0){
					this.themeList.push(this.paperData.GapObj); 
				}
				if(this.paperData.ResolveObj.QuesArr.length > 0){
					this.themeList.push(this.paperData.ResolveObj);
				}
			}else{
				// 无原始数据
				this.InitOrDeleteQuestion('Init', this.paperData.question, '99')
			}
			
		},
		methods: {
			alterMainOrSub(){
				this.isMainSelect = !this.isMainSelect;
			},
			goBack(){
				this.changeRouterByName('PaperNotYet');
			},
			changPaperTitle(){
				this.$store.dispatch('CHANGE_ONE_PAPER',{paper: this.paperData});
			},
			editInfo(row){
				console.log(row);
				this.editBigTitleDialog = true;
				this.BigTitle_Name = row.Name;
				this.BigTitle = row.BigTitle.dynamic;
			},
			confirmEidt(){
				// 提交 "答题指导语" => 单多填简数组中的 BigTitle 中的 dynamic 变动 => 对应的 SingleTitle MultiTitle ...变动 => 提交vuex
				switch (this.BigTitle_Name){
					case '单选题': 
						this.paperData.SingleObj.BigTitle.dynamic = this.BigTitle;
						this.paperData.SingleObj.BigTitle.instruction = this.paperData.SingleObj.BigTitle.statics + this.BigTitle;
						this.paperData.SingleTitle = this.paperData.SingleObj.BigTitle.instruction;
						break;
					case '多选题': 
						this.paperData.MultiObj.BigTitle.dynamic = this.BigTitle;
						this.paperData.MultiObj.BigTitle.instruction = this.paperData.MultiObj.BigTitle.statics + this.BigTitle;
						this.paperData.MultiTitle = this.paperData.MultiObj.BigTitle.instruction;
						break;
					case '填空题': 
						this.paperData.GapObj.BigTitle.dynamic = this.BigTitle;
						this.paperData.GapObj.BigTitle.instruction = this.paperData.GapObj.BigTitle.statics + this.BigTitle;
						this.paperData.GapTitle = this.paperData.GapObj.BigTitle.instruction;
						break;
					case '简答题': 
						this.paperData.ResolveObj.BigTitle.dynamic = this.BigTitle;
						this.paperData.ResolveObj.BigTitle.instruction = this.paperData.ResolveObj.BigTitle.statics + this.BigTitle;
						this.paperData.ResolveTitle = this.paperData.ResolveObj.BigTitle.instruction;
						break;
					default:
						this.paperData.SingleObj.BigTitle.dynamic = this.BigTitle;
						this.paperData.SingleObj.BigTitle.instruction = this.paperData.SingleObj.BigTitle.statics + this.BigTitle;
						this.paperData.SingleTitle = this.paperData.SingleObj.BigTitle.instruction;
						break;
				}
				// 将其写入 vuex 原始数据
				this.$store.dispatch('CHANGE_ONE_PAPER',{paper: this.paperData});
				this.editBigTitleDialog = false;
				
			},
			deleteItem(row){
				this.$confirm('确定要删除该种题型，是否继续?', '提示', {
					confirmButtonText: '确 定',
					cancelButtonText: '取 消',
					type: 'warning'
				}).then(() => {
					// 删除 "单多填简" => 1:单多填简数组 清空为原始数据 => 2:对应的 themeList 删除该条数据 (对应序号重新排列) => 3:paperData.question剔除对应类型的题目 => 4:提交vuex
					switch (row.Name){
						case '单选题': 
							this.InitOrDeleteQuestion('Delete', this.paperData.question, '1');
							break;
						case '多选题': 
							this.InitOrDeleteQuestion('Delete', this.paperData.question, '2');
							break;
						case '填空题': 
							this.InitOrDeleteQuestion('Delete', this.paperData.question, '3');
							break;
						case '简答题': 
							this.InitOrDeleteQuestion('Delete', this.paperData.question, '4');
							break;
						default:
							this.InitOrDeleteQuestion('Delete', this.paperData.question, '1');
							break;
					}
				}).catch(() => {

				})
			},
			
			// 删除 paperData.question 的方法	1: 处理题目方法(初始化Init 或 删除Delete)	 2: 全数据  		3: 被删除数据类型
			// paperData 中定义数组=> SingleObj MultiObj GapObj ResolveObj
			//			    且每个数组包含=> BigTitle:{ statics:"", dynamic:"" } 		NumberRange: 1-10 	Name:"单选题" 		QuesArr:[] 四个字段
			// paperData根数据同步   => SingleTitle, MultiTitle, GapTitle, ResolveTitle: 字段中 statics和dynamic 字符串拼接
			// this.themeList同步   => SingleObj MultiObj GapObj ResolveObj
			InitOrDeleteQuestion(dealType, questionArr, questionType){
				let newQuestionArr = [];
				let sortNumber = 0;
				let _this = this;
				let singNum = 0; let multiNum = 0; let gapNum = 0; let resolveNum = 0;
				let singScore = 0; let multiScore = 0; let gapScore = 0; let resolveScore = 0;
				this.paperData.SingleObj  = { BigTitle:{}, NumberRange: '', Name: '单选题', QuesArr: [] };
				this.paperData.MultiObj   = { BigTitle:{}, NumberRange: '', Name: '多选题', QuesArr: [] };
				this.paperData.GapObj  	  = { BigTitle:{}, NumberRange: '', Name: '填空题', QuesArr: [] };
				this.paperData.ResolveObj = { BigTitle:{}, NumberRange: '', Name: '简答题', QuesArr: [] };
				this.paperData.SingleTitle = '';
				this.paperData.MultiTitle = '';
				this.paperData.GapTitle = '';
				this.paperData.ResolveTitle = '';
				this.themeList = [];
				for(let i=0; i<questionArr.length; i++){
					if(questionArr[i].Type != questionType){
						sortNumber++;
						questionArr[i].Num = String(sortNumber);		// 题号进行更改
						if(dealType == 'Delete'){										// 删除操作时进行重组
							newQuestionArr.push(questionArr[i]);      // 重组 question 题目数组
						}
						// 目前只有四种题目 => 单多填简
						if(questionArr[i].Type == 1){
							singNum ++
							singScore += Number(questionArr[i].Score)
							_this.paperData.SingleObj.QuesArr.push(questionArr[i]);
						}else if(questionArr[i].Type == 2){
							multiNum ++
							multiScore += Number(questionArr[i].Score)
							_this.paperData.MultiObj.QuesArr.push(questionArr[i]);
						}else if(questionArr[i].Type == 3){
							gapNum ++
							gapScore += Number(questionArr[i].Score)
							_this.paperData.GapObj.QuesArr.push(questionArr[i]);
						}else if(questionArr[i].Type == 4){
							resolveNum ++
							resolveScore += Number(questionArr[i].Score)
							_this.paperData.ResolveObj.QuesArr.push(questionArr[i]);
						}else{
							// 未来未知题型
						}
					}
				}
				if(singNum != 0){
					this.paperData.SingleObj.Name = "单选题";
					this.paperData.SingleObj.NumberRange = (singNum == 1) ? '1' : (1 + '-' + singNum);
					this.paperData.SingleObj.BigTitle.statics = '本题共' + singNum + '小题，共' + singScore + '分。';
					this.paperData.SingleObj.BigTitle.dynamic = '';
					this.paperData.SingleObj.BigTitle.instruction = this.paperData.SingleObj.BigTitle.statics + this.paperData.SingleObj.BigTitle.dynamic;
					this.paperData.SingleTitle = this.paperData.SingleObj.BigTitle.instruction; 
					this.themeList.push(this.paperData.SingleObj); 
				}
				if(multiNum != 0){
					this.paperData.MultiObj.Name = "多选题";
					this.paperData.MultiObj.NumberRange = (multiNum == 1) ? String(singNum + 1) : (singNum + 1 + '-' + (singNum + multiNum));
					this.paperData.MultiObj.BigTitle.statics = '本题共' + multiNum + '小题，共' + multiScore + '分。';
					this.paperData.MultiObj.BigTitle.dynamic = '';
					this.paperData.MultiObj.BigTitle.instruction = this.paperData.MultiObj.BigTitle.statics + this.paperData.MultiObj.BigTitle.dynamic;
					this.paperData.MultiTitle = this.paperData.MultiObj.BigTitle.instruction; 
					this.themeList.push(this.paperData.MultiObj); 
				}
				if(gapNum != 0){
					this.paperData.GapObj.Name = "填空题";
					this.paperData.GapObj.NumberRange = (gapNum == 1) ? String(singNum + multiNum + 1) : (singNum + multiNum + 1 + '-' + (singNum + multiNum + gapNum));
					this.paperData.GapObj.BigTitle.statics = '本题共' + gapNum + '小题，共' + gapScore + '分。';
					this.paperData.GapObj.BigTitle.dynamic = '';
					this.paperData.GapObj.BigTitle.instruction = this.paperData.GapObj.BigTitle.statics + this.paperData.GapObj.BigTitle.dynamic;
					this.paperData.GapTitle = this.paperData.GapObj.BigTitle.instruction; 
					this.themeList.push(this.paperData.GapObj); 
				}
				if(resolveNum != 0){
					this.paperData.ResolveObj.Name = "简答题";
					this.paperData.ResolveObj.NumberRange = (resolveNum == 1) ? String(singNum + multiNum + gapNum + 1) : (singNum + multiNum + gapNum + 1 + '-' + (singNum + multiNum + gapNum + resolveNum));
					this.paperData.ResolveObj.BigTitle.statics = '本题共' + resolveNum + '小题，共' + resolveScore + '分。';
					this.paperData.ResolveObj.BigTitle.dynamic = '';
					this.paperData.ResolveObj.BigTitle.instruction = this.paperData.ResolveObj.BigTitle.statics + this.paperData.ResolveObj.BigTitle.dynamic;
					this.paperData.GapTitle = this.paperData.ResolveObj.BigTitle.instruction;
					this.themeList.push(this.paperData.ResolveObj);
				}
				if(dealType == 'Delete'){										// 删除操作时进行重组
					this.paperData.question = newQuestionArr;;// 重组 question 题目数组
				}
				console.log(this.paperData);
				// 将其写入 vuex 原始数据
				this.$store.dispatch('CHANGE_ONE_PAPER',{paper: this.paperData});
			},
			
			addItem(){
				alert('新添加一行！');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.scroll-page {
		overflow: hidden;
		/deep/ .el-scrollbar__wrap {
			overflow-x: hidden;
			.paperAttributeMain {
				padding: 20px;
				.w_30p{
					width: 30%;
					margin: 20px 3%;
					min-height: 100px;
					padding: 24px;
					box-sizing: border-box;
					.itemSelect{
						color: #555555;
						font-size: 14px;
						margin: 10px 0px;
					}
				}
				.w_60p{
					width: 60%;
					margin: 20px 3% 20px 0;
					min-height: 100px;
					padding: 24px;
					box-sizing: border-box;
					.itemSelect{
						color: #555555;
						font-size: 14px;
						margin: 10px 0px;
						.notice{
							font-size: 12px;
							margin-left: 50px;
						}
					}
				}
				.subBottom{
					height: 50px;
					margin: 0 auto;
					line-height: 50px;
				}
				
			}
		}
	}
	.paperAttributeEdit-view {
		flex: 1;
		overflow: hidden;
	}
</style>