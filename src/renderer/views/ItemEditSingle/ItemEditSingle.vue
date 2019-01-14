<!-- 试题单题编辑页面 -->
<template>
	<el-scrollbar class="itemEditSingle-view scroll-page">
		<div class="itemEditSingle">
			<div class="class-list mt-5">
				
				<p class="guideBar">
					<img src="../../assets/images/process.png"/>
					<span @click="changeRouterByName('PaperNotYet')">待处理试卷</span> 》 
					<span @click="changeRouterByName('ItemEditMain')">试题编辑</span> 》 
					<a href="javascript: void(0);">单道试题编辑</a>
				</p>
				
				<!-- 编辑试卷名称 -->
				<el-input class="w_500 input-search-self"
					placeholder="请输入试卷名称"
				  prefix-icon="el-icon-edit"
				  v-model="paperData.Title"
				  @blur="changePaperName">
				</el-input>
				<div class="btn-medium-self-blue fRight ml-20" @click="goBack()">返回</div>
				
				<!-- 题号部分 -->
				<ul class="itemNumList">
					<li v-for="(item,key) in itemList" :class="item.isSelected ? 'active' : ''" @click="SingleItemInfo(item)">{{ key+1 }}</li>
				</ul>
				
				<div class="leftMarkBox">
					
					<!-- 基本标签 -->
					<div class="box-left">
						<div class="boderRadiusBox commonMarkBox fLeft">
							<div class="headerSpread">
								基本标签
							</div>
							<el-checkbox class="checkbox-self block ml-30" v-model="itemData.Core" true-label="1" false-label="0" @change="checkboxChange(1)">核心题库</el-checkbox>
							<el-checkbox class="checkbox-self block" v-model="itemData.Synchronization" true-label="1" false-label="0" @change="checkboxChange(2)">同步试题</el-checkbox>
							<el-checkbox class="checkbox-self block" v-model="itemData.Douthree" true-label="1" false-label="0" @change="checkboxChange(3)">双三试题</el-checkbox>
							<el-checkbox class="checkbox-self block" v-model="itemData.IsHide" true-label="1" false-label="0" @change="checkboxChange(4)">是否隐藏</el-checkbox>
							<el-checkbox class="checkbox-self block" v-model="itemData.Correct" true-label="1" false-label="0" @change="checkboxChange(5)">是否正确</el-checkbox>
							<el-checkbox class="checkbox-self block" v-model="itemData.isCombination" true-label="1" false-label="0" @change="checkboxChange(6)">是否题主题</el-checkbox>
						</div>
						
						<div class="boderRadiusBox othersMarkBox fLeft">
							<div class="headerSpread">
								其他标签
							</div>
							
							<div class="itemSelect">
								<div class="inline_block w_50">区分度</div>
							  <el-input class="w_100 input-search-self"
									placeholder="区分度"
								  prefix-icon="el-icon-edit"
								  v-model="itemData.Division"
								  :disabled="true">
								</el-input>
								<div class="inline_block notice"></div>
						  </div>
							<div class="itemSelect">
								<div class="inline_block w_50">难度值</div>
							  <el-input class="w_100 input-search-self"
									placeholder="难度值"
								  prefix-icon="el-icon-edit"
								  v-model="itemData.Difficulty"
								  :disabled="true">
								</el-input>
						  </div>
						  
						  <div class="itemSelect">
								<div class="inline_block w_50">答题时间</div>
							  <el-input class="w_100 input-search-self"
									placeholder="答题时间"
								  prefix-icon="el-icon-edit"
								  v-model="itemData.Spenttime"
								  :disabled="true">
								</el-input>
						  </div>
						</div>
					
					</div>
					<!-- 核心标签 -->
					<div class="boderRadiusBox coreMarkBox fRight mBottom10">
						<div class="headerSpread">
							核心标签
						</div>
						
						<div class="scroll-container">
							<!-- 知识点列表(暂无) -->
							<p class="coreMarkTitle cursor_pointer" @click="openAddPointsDialog">知识点  <i class="el-icon-circle-plus-outline"></i></p>
						  <ul class="pointList">
						  	<li>MaSr050210余弦函数定义 <i class="el-icon-delete"></i></li>
						  	<li>MaSr050210余弦函数定义余弦函数定义 <i class="el-icon-delete"></i></li>
						  	<li>MaSr050210余弦函数定义 <i class="el-icon-delete"></i></li>
						  	<li>MaSr050210余弦函数定义余弦函数定义 <i class="el-icon-delete"></i></li>
						  	<li>MaSr050210余弦函数定义 <i class="el-icon-delete"></i></li>
						  	<li>MaSr050210余弦函数定义 <i class="el-icon-delete"></i></li>
						  	<li>MaSr050210余弦函数定义余弦函数定义 <i class="el-icon-delete"></i></li>
						  	<li>MaSr050210余弦函数定义 <i class="el-icon-delete"></i></li>
						  	<li>MaSr050210余弦函数定义 <i class="el-icon-delete"></i></li>
						  	<li>MaSr050210余弦函数定义余弦函数定义 <i class="el-icon-delete"></i></li>
						  </ul>
						  
						  <!-- 学科能力 box -->
						  <p class="coreMarkTitle">学科能力</p>
						  <el-checkbox class="checkbox-self ml-30 w_100" v-model="itemData.Core">空间想象能力</el-checkbox>
						  <el-checkbox class="checkbox-self ml-30 w_100"  v-model="itemData.Core">运算求解能力</el-checkbox>
						  <el-checkbox class="checkbox-self ml-30 w_100" v-model="itemData.Core">抽象概括能力</el-checkbox>
						  <el-checkbox class="checkbox-self ml-30 w_100" v-model="itemData.Core">应用能力</el-checkbox>
						  <el-checkbox class="checkbox-self ml-30 w_100" v-model="itemData.Core">创新意识</el-checkbox>
						  <el-checkbox class="checkbox-self ml-30 w_100" v-model="itemData.Core">应用意识</el-checkbox>
						  <el-checkbox class="checkbox-self ml-30 w_100" v-model="itemData.Core">动手思考能力</el-checkbox>
						  <el-checkbox class="checkbox-self ml-30 w_100" v-model="itemData.Core">抽象剥离能力</el-checkbox>
						  <el-checkbox class="checkbox-self ml-30 w_100" v-model="itemData.Core">创造力</el-checkbox>
						  
						  <!-- 思想方法 box -->
						  <p class="coreMarkTitle">思想方法</p>
						  <el-checkbox class="checkbox-self ml-30 w_100" v-model="itemData.Core">函数思想</el-checkbox>
						  <el-checkbox class="checkbox-self ml-30 w_100" v-model="itemData.Core">数相结合思想</el-checkbox>
						  <el-checkbox class="checkbox-self ml-30 w_100" v-model="itemData.Core">转化与化归</el-checkbox>
						  <el-checkbox class="checkbox-self ml-30 w_100" v-model="itemData.Core">分类讨论</el-checkbox>
						  <el-checkbox class="checkbox-self ml-30 w_100" v-model="itemData.Core">抽象剥离</el-checkbox>
						  <el-checkbox class="checkbox-self ml-30 w_100" v-model="itemData.Core">类比思想</el-checkbox>
						  <el-checkbox class="checkbox-self ml-30 w_100" v-model="itemData.Core">举一反三思想</el-checkbox>
						  <el-checkbox class="checkbox-self ml-30 w_100" v-model="itemData.Core">创造与毁灭</el-checkbox>
						  <el-checkbox class="checkbox-self ml-30 w_100" v-model="itemData.Core">新生与重生</el-checkbox>
					  
					  </div>
					  
					</div>
					
				</div>
				
				<div class="rightMarkBox boderRadiusBox">
					<div class="headerSpread">
						试题预览
					</div>
					<!-- 右侧苹果pad 显示区域 -->
					<img src="../../assets/images/ipad.png"/>
				</div>
				
				<!--试题信息-->
				<div class="itemInfoBox boderRadiusBox">
					<div class="headerSpread">
						试题信息
					</div>
					<div class="itemSelect">
						<div class="inline_block w_50 blueFont">试题信息</div>
						<el-input class="w_100 input-search-self"
							placeholder="试题信息"
							prefix-icon="el-icon-edit"
							v-model="itemData.Core">
						</el-input>
						<div class="inline_block notice"></div>
					</div>
					
					<div class="itemSelect">
						<div class="inline_block w_50 blueFont">试题题干</div>
						<el-input class="w_100 input-search-self"
							placeholder="试题题干"
							prefix-icon="el-icon-edit"
							v-model="itemData.Core">
						</el-input>
						<div class="inline_block notice"></div>
					</div>
					
					<div class="itemSelect">
						<div class="inline_block w_50 blueFont">试题选项</div>
						<el-input class="w_100 input-search-self"
							placeholder="试题选项"
							prefix-icon="el-icon-edit"
							v-model="itemData.Core">
						</el-input>
						<div class="inline_block notice"></div>
					</div>
					
					<div class="itemSelect">
						<div class="inline_block w_50 blueFont">小题数目</div>
						<el-input class="w_100 input-search-self"
							placeholder="小题数目"
							prefix-icon="el-icon-edit"
							v-model="itemData.Core">
						</el-input>
						<div class="inline_block notice"></div>
					</div>
					
					<div class="itemSelect">
						<div class="inline_block w_50 blueFont">显示题号</div>
						<el-input class="w_100 input-search-self"
							placeholder="显示题号"
							prefix-icon="el-icon-edit"
							v-model="itemData.Core">
						</el-input>
						<div class="inline_block notice"></div>
					</div>
				</div>
				
				<!--试题详解-->
				<div class="itemInfoBox boderRadiusBox">
					<div class="headerSpread">
						试题详解
					</div>
					<div class="itemSelect">
						<div class="inline_block w_50 blueFont">分析</div>
						<el-input class="w_100 input-search-self"
							placeholder="分析"
							prefix-icon="el-icon-edit"
							v-model="itemData.Core">
						</el-input>
						<div class="inline_block notice"></div>
					</div>
					
					<div class="itemSelect">
						<div class="inline_block w_50 blueFont">解答</div>
						<el-input class="w_100 input-search-self"
							placeholder="解答"
							prefix-icon="el-icon-edit"
							v-model="itemData.Core">
						</el-input>
						<div class="inline_block notice"></div>
					</div>
					
					<div class="itemSelect">
						<div class="inline_block w_50 blueFont">注释</div>
						<el-input class="w_100 input-search-self"
							placeholder="注释"
							prefix-icon="el-icon-edit"
							v-model="itemData.Core">
						</el-input>
						<div class="inline_block notice"></div>
					</div>
				</div>
				
				<!-- 添加 "知识点" 弹窗 -->
				<el-dialog title="新增知识点" :visible.sync="addPointsDialog" width="500px">
				  <el-form ref="form" class="text_left" label-width="125px">
					  <el-form-item label="知识点名称检索：">
					    <el-autocomplete popper-class="autocomplete_points" v-model="pointName" :fetch-suggestions="querySearch" placeholder="请输入内容" @select="pushToSelPointsList">
  							<i class="el-icon-edit el-input__icon cursor_pointer" slot="suffix"></i>
							  <template slot-scope="{ item }">
							    <div class="name">{{ item.value }}</div>
							    <!--<span class="addr">{{ item.address }}</span>-->
							  </template>
							</el-autocomplete>
					  </el-form-item>
					</el-form>
					
					<p class="sel_points_title mTop20 mBottom10 blueFont">您选中的知识点：</p>
					<!--已选知识点-->
					<div class="selectedPointsBySearch">
						<span class="singlePointBySel" v-show="selPointsList && selPointsList.length > 0" v-for="(pointItem,key) in selPointsList" :key="key">{{pointItem.value}}<i class="el-icon-remove-outline cursor_pointer redFont" @click="deleteSelPoints(key)"></i></span>
					</div>
					
				  <span slot="footer" class="dialog-footer">
				    <el-button @click="addPointsDialog = false">取 消</el-button>
				    <el-button type="primary" @click="confirmAddPoints()">确 定</el-button>
				  </span>
				</el-dialog>
				
				
			</div>
		</div>
	</el-scrollbar>
</template>

<script>
	export default {
		data() {
			return {
				paperData: {						// 试卷结构大数组 
					AllQuestionArr: [],
					Title: '',
				},
				itemList: [],						// 试题总数组
				itemData : {						// 单道题目数组
					Core: '',									// 是否是核心
					Synchronization: '',			// 是否是同步
					Douthree: '',							// 是否是双三
					IsHide: '',								// 是否是隐藏
					Correct: '',							// 是否是正确
					isCombination: '',				// 是否是题主题
					Division: '',							// 区分度
					Difficulty: '',						// 难度值
					Spenttime:  '',						// 答题时长
					Knowledge_main_point:'',	// 主知识点
					Knowledge_points: [],			// 已选知识点(包含 '主知识点')			
																		// 添加时将  this.selPointsList  进行 concat 合并 , 并将 this.selPointsList 置空  this.pointName 置空
					Ability: '',							// 学科能力 name 值 以','分割
					AbilityCode: '',					// 学科能力 code 值 以'@'分割
					Thoughtway: '',						// 思想方法 name 值 以','分割
					ThoughtwayCode: '',				// 思想方法 code 值 以'@'分割
					
				},
				AbilityList: [],				// 学科能力 全数组	(静态数据中获取)
				ThoughtwayList: [],			// 思想方法 全数组	(静态数据中获取)
				
				addPointsDialog: false,	// 知识点	弹窗		
				allPointsList: [],			// 知识点全数组		(静态数据中获取)
				selPointsList: [],			// 知识点	检索得到的
        pointName: ''
				
				
			}
		},
		mounted() {
			this.paperData = JSON.parse(this.getLocal('paperData'));
			this.initItemList();
			console.log(this.itemList);
			console.log(this.itemData);
			this.allPointsList = this.loadAllPoints();
			
			// 接收 Vuex 学段学科教材版本数据					=> 只做 学段学科 教材版本 学科能力 思想方法 级联
			let subjectAboutInfo = JSON.parse(JSON.stringify(this.$store.state.Version.subjectAboutInfo));
			console.log(subjectAboutInfo);
		},
		methods: {
			// 初始化 题目数据
			initItemList(){
				this.itemList = [];																			// 总试题数组
				let num_flag = 0;																				// 试题题号指针
				if(this.paperData.AllQuestionArr && this.paperData.AllQuestionArr.length > 0){
					let allItems = this.paperData.AllQuestionArr;
					for(let i=0; i<allItems.length; i++){
						let firstItem = allItems[i];  											// 一个个 	一级题组 { rangeMin, rangeMax, children:[ {'二级题组1'}, {'二级题组2'} ] }
						firstItem.rangeMin = num_flag + 1;
						if(firstItem.children && firstItem.children.length>0){
							// 有 '二级题组' 并循环
							for(let j=0; j<firstItem.children.length; j++){
								let secondItem = firstItem.children[j];					// 一个个 	二级题组 { rangeMin, rangeMax, question:[ {'考试试题1'}, {'考试试题2'} ] }
								let question = secondItem.question;
								secondItem.rangeMin = num_flag + 1;							// 矫正 二级题组 rangeMin 值
								let moveMin = num_flag;													// 判断向上移动的 		最小下标
								num_flag += question.length;
								secondItem.rangeMax = num_flag;									// 矫正 二级题组 rangeMax 值
								if(j === firstItem.children.length-1){
									firstItem.rangeMax = num_flag;								// 矫正 一级题组 rangeMax 值
								}
								let moveMax = num_flag - 1;											// 判断向下移动的		最大下标
								for(let k=0; k<question.length; k++ ){
									question[k].moveMin = moveMin + 1;
									question[k].moveMax = moveMax + 1;
									question[k].Num = moveMin + k + 1;						// 试题序号
									question[k].index_group = k;									// 试题 			题内部下标
									if(question[k].isSelected == true){
										this.itemData = question[k];
									}
									question[k].firstIndex = i;										// 一级题组 	指向
									question[k].secondIndex = j;									// 二级题组 	指向
									// 题目所在的 一级题组二级题组 中文
									question[k].group_name = question[k].Num + '（' + this.global.numToChinese(i+1) + '、' + String(i+1) + '.' + String(j+1) +'）';
									
									if(question[k].UseTag == undefined){
										question[k].UseTag = "";										// 试题 			应用题型标签
									}
									if(question[k].Knowledge_main_point == undefined){
										question[k].Knowledge_main_point = "";			// 试题 			主知识点 id
									}
									// 题主题情况
									if(question[k].SubQuestionList && question[k].SubQuestionList.length > 0){
										for(let m=0; m<question[k].SubQuestionList.length; m++){
											if(question[k].SubQuestionList[m].UseTag == undefined){
												question[k].SubQuestionList[m].UseTag = "";										// 题主题小题			应用题型标签
											}
											if(question[k].SubQuestionList[m].Knowledge_main_point == undefined){
												question[k].SubQuestionList[m].Knowledge_main_point = "";			// 题主题小题			主知识点 id
											}
										}
									}
									this.itemList.push(question[k]);
								}
							}
						}else{
							// 没有 '二级题组' 并循环
							let question = firstItem.question;
							firstItem.rangeMin = num_flag + 1;							// 矫正 一级题组 rangeMin 值
							let moveMin = num_flag;													// 判断向上移动的 		最小下标
							num_flag += question.length;
							firstItem.rangeMax = num_flag;
							let moveMax = num_flag - 1;											// 判断向下移动的		最大下标
							for(let k=0; k<question.length; k++ ){
								question[k].moveMin = moveMin + 1;
								question[k].moveMax = moveMax + 1;
								question[k].Num = moveMin + k + 1;						// 试题序号
								question[k].index_group = k;									// 试题 			题内部下标
								
								if(question[k].isSelected == true){
									this.itemData = question[k];
								}
								
								question[k].firstIndex = i;										// 一级题组 	指向
								question[k].secondIndex = 9999;								// 二级题组 	指向
								// 题目所在的 一级题组二级题组 中文
								question[k].group_name = question[k].Num + '（' + this.global.numToChinese(i+1) + '）';
								
								this.itemList.push(question[k]);
							}
						}
					}
					// 将 paperData.AllQuestionArr 提交到 vuex
					this.$store.dispatch('CHANGE_ONE_PAPER',{paper: this.paperData});
				}
			},
			initAbilityList(){					// 初始化 学科能力 数组
				
			},
			initThoughtwayList(){				// 初始化 思想方法 数组
				
			},
			changePaperName(){					// 修改试卷名称
				this.setLocal('paperData',JSON.stringify(this.paperData));
				this.$store.dispatch('CHANGE_ONE_PAPER',{paper: this.paperData});
			},
			checkboxChange(type){
				
			},
			goBack(){
				this.changeRouterByName('ItemEditMain');
			},
			// 单题信息展示
			SingleItemInfo(row){
				this.itemData.isSelected = false;
				row.isSelected = true;
				this.itemData = row;
			},
			
			
			
			// 弹窗方法
			openAddPointsDialog(){
				this.addPointsDialog = true; 
				this.pointName=''; 
				this.selPointsList=[];
			},
			querySearch(pointName, cb) {
        var allPointsList = this.allPointsList;
        var results = pointName ? allPointsList.filter(this.pointNameFilter(pointName)) : allPointsList;
        cb(results);
      },
      pointNameFilter(pointName) {
        return (singlePoint) => {
          return (singlePoint.value.toLowerCase().indexOf(pointName.toLowerCase()) === 0);
        };
      },
      loadAllPoints() {
        return [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
          { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
          { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
          { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
          { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
          { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
        ];
      },
      pushToSelPointsList(item) {
        // this.selPointsList 添加时去重
        if(this.selPointsList.length > 0){
        	if(!this.selPointsList.includes(item)){
        		this.selPointsList.push(item);
        	}
        }else{
        	this.selPointsList.push(item);
        }
        this.pointName = '';
      },
			deleteSelPoints(index){				// 删除选中 知识点
				let selPointsList_new = [];
				for(let i=0; i<this.selPointsList.length; i++){
					if(i != index){
						selPointsList_new.push(this.selPointsList[i]);
					}
				}
				this.selPointsList = selPointsList_new;
			},
			confirmAddPoints(){						// 确认添加 知识点
				
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.scroll-page {
		overflow: hidden;
		/deep/ .el-scrollbar__wrap {
			overflow-x: hidden;
			.itemEditSingle {
				padding: 20px;
				/* 基本标签  核心标签  其他标签 (左侧盒子)*/
				.leftMarkBox{ width: 62%; float: left;
					div.box-left{ width: 28%; float: left;
						/* 基本标签 */
						div.commonMarkBox{ width: 100%; height: 310px; }
						/* 其他标签 */
						div.othersMarkBox{ width: 100%; height: 178px; margin-top: 12px;
							.itemSelect{ color: #555555; font-size: 12px; padding: 5px 10px; height: 20px; line-height: 20px;
								.input-search-self .el-input__inner{ font-size: 12px; height: 20px; line-height: 20px; }
							}
						}
					}
					/* 核心标签 */
					div.coreMarkBox{ width: 70%; height: 500px; overflow-y: hidden;
						div.scroll-container{ height: 464px; padding-bottom: 20px; box-sizing: border-box; overflow-x: hidden; overflow-y: auto;
							p.coreMarkTitle{ width: 100%; height: 12px; line-height: 12px; padding: 20px 20px 0px; font-size: 12px; color: #41C0BC; text-align: left;
								.el-icon-delete{ margin-left: 10px; color: #555555; }
								.el-icon-delete:hover{ color: #41C0BC; cursor: pointer; }
							}
							ul.pointList{ list-style: none; -webkit-padding-start: 30px;
								li{ width: 100%; height: 12px; line-height: 12px; margin: 10px 0px; color: #555555; font-size: 12px;
									.el-icon-delete{ margin-left: 10px; }
									.el-icon-delete:hover{ color: #41C0BC; cursor: pointer; }
								}
							}
						}
					}
				}
				.rightMarkBox{ width: 36%; height: 500px; float: right; margin: 0 auto; text-align: center;
					img{ height: 400px; margin-top: 50px; }
				}
				/* 试题信息 */
				.itemInfoBox{ width: 100%; height: 300px;
					.itemSelect{ color: #555555; font-size: 12px; padding: 5px 10px; height: 20px; line-height: 20px;
						.input-search-self .el-input__inner{ font-size: 12px; height: 20px; line-height: 20px; }
					}
				}
				
				/*新增知识点弹窗*/
				.el-autocomplete{
					width: 333px;
					.autocomplete_points { 
						li { line-height: normal; padding: 7px;
					    .name { text-overflow: ellipsis; overflow: hidden; }
					    .addr { font-size: 12px; color: #b4b4b4; }
					    .highlighted .addr { color: #ddd; }
					  }
					}
				}
				.selectedPointsBySearch{ width: 100%; height: 250px; border: 1px solid #dcdfe6; border-radius: 8px; padding: 10px; box-sizing: border-box; overflow-y: auto;
					.singlePointBySel{ display: block; height: 30px; line-height: 30px; color: #41C0BC; font-size: 12px; margin: 0 10px; }
				}
				
				
				
				
			}
		}
	}
	.itemEditSingle-view { flex: 1; overflow: hidden; }
</style>