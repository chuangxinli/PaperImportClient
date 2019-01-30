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
				  @blur="changeInputValue">
				</el-input>
				
				<div class="btn-medium-self-blue fRight ml-20" @click="goBack()">返回</div>
				
				<!-- 题号部分 -->
				<ul class="itemNumList">
					<li v-for="(item,key) in itemList" :class="item.isSelected ? 'active' : ''" @click="SingleItemInfo(item)">{{ key+1 }}</li>
				</ul>
				
				<!-- 试题保存(提示单题保存,不保存将视为无效修改) -->
				<div class="restore_one_item">
					<i class="el-icon-warning warnFont"> 每修改一道题目，请记得保存一次，否则将视为无效！</i>
					<div class="btn-medium-self-blue fRight ml-20" @click="restoreItemForVuexAndLocal()">保存试题</div>
				</div>
				
				<div class="leftMarkBox">
					
					<!-- 基本标签 -->
					<div class="box-left">
						<div class="boderRadiusBox commonMarkBox fLeft">
							<div class="headerSpread">
								基本标签
							</div>
							<el-checkbox class="checkbox-self block ml-30" v-model="itemData.Core" true-label="1" false-label="0" @change="vuexDataChange()">核心题库</el-checkbox>
							<el-checkbox class="checkbox-self block" v-model="itemData.Synchronization" true-label="1" false-label="0" @change="vuexDataChange()">同步试题</el-checkbox>
							<el-checkbox class="checkbox-self block" v-model="itemData.Douthree" true-label="1" false-label="0" @change="vuexDataChange()">双三试题</el-checkbox>
							<el-checkbox class="checkbox-self block" v-model="itemData.IsHide" true-label="1" false-label="0" @change="vuexDataChange()">是否隐藏</el-checkbox>
							<el-checkbox class="checkbox-self block" v-model="itemData.Correct" true-label="1" false-label="0" @change="vuexDataChange()">是否正确</el-checkbox>
							<el-checkbox class="checkbox-self block" v-model="itemData.IsCombination" true-label="1" false-label="0" @change="vuexDataChange('IsCombination')">是否题组题</el-checkbox>
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
						  <ul class="pointList" v-show="itemData.Knowledge_points_show && itemData.Knowledge_points_show.length>0">
						  	<li v-for="(pointItem, key) in itemData.Knowledge_points_show" :key="key" :title="'考点ID：' + pointItem.pointId">
						  		{{ pointItem.pointName }} 
						  		<i class="el-icon-delete" @click="delPointShow(key)"></i>
						  		<i v-if="pointItem.isMain" class="el-icon-circle-check warnFont" @click="setMainOrNot(key)" title="取消主知识点"></i>
						  		<i v-else class="el-icon-circle-check" @click="setMainOrNot(key)" title="设置为主知识点"></i>
						  	</li>
						  </ul>
						  <!-- 学科能力 box -->
						  <p class="coreMarkTitle">学科能力</p>
						  <p class="checkListNoData" v-if="AbilityNameList.length == 0">该学科下暂无对应的学科能力，数据完善中，敬请期待。。。</p>
						  <el-checkbox-group v-model="itemData.AbilityNameList" @change="AbilityNameListChange">
						    <el-checkbox v-for="item in AbilityNameList" class="checkbox-self ml-30 w_100" :label="item" :key="item">{{item}}</el-checkbox>
						  </el-checkbox-group>
						  <!-- 思想方法 box -->
						  <p class="coreMarkTitle">思想方法</p>
						  <p class="checkListNoData" v-if="ThoughtwayNameList.length == 0">该学科下暂无对应的思想方法，数据完善中，敬请期待。。。</p>
						  <el-checkbox-group v-model="itemData.ThoughtwayNameList" @change="ThoughtwayNameListChange">
						    <el-checkbox v-for="item in ThoughtwayNameList" class="checkbox-self ml-30 w_100" :label="item" :key="item">{{item}}</el-checkbox>
						  </el-checkbox-group>
						  <!-- 应用标签 box -->
						  <p class="coreMarkTitle">应用标签（ 只能选一个 ）</p>
						  <p class="checkListNoData" v-if="UseTagNameList.length == 0">该学科下暂无对应的应用标签题型，数据完善中，敬请期待。。。</p>
						  <el-checkbox-group v-model="itemData.UseTagNameList" @change="UseTagNameListChange" :min="0" :max="1">
						    <el-checkbox v-for="item in UseTagNameList" class="checkbox-self ml-30 w_100" :label="item" :key="item">{{item}}</el-checkbox>
						  </el-checkbox-group>
					  </div>
					</div>
				</div>
				
				<div class="rightMarkBox boderRadiusBox">
					<div class="headerSpread">
						试题预览
					</div>
					<!-- 右侧苹果pad 显示区域 -->
					<img class="ipadFram" src="../../assets/images/ipad.png"/>
					<div class="itemContentBox">
						<!-- 题干信息 -->
						<p class="contentTitle">{{itemData.Num}}、
							<span v-html="itemData.Text"></span>
							<!-- 单选题和多选题(非题组题) -->
							<ul v-if="itemData.Type == 1 || itemData.Type == 2 || itemData.Type == 5">
								<li v-for="(option, optionIndex) in itemData.Options" :key="optionIndex" :class="option.IsRight?'redFont':''">
									<p class="choice_one" v-html="'<span>'+optionList[optionIndex]+'：'+'</span>'+ option.Text"></p>
								</li>
							</ul>
						</p>
						
						<!-- 题组题 -->
						<p class="subQuesBox" v-show="itemData.Type == 6 && itemData.SubQuestionList.length>0" v-for="(subQuestion,key) in itemData.SubQuestionList" :key="key">
							{{ '（' + subQuestion.Combination_index + '）' }} 
							<span v-html="subQuestion.Text"></span>
							<!-- 题组题小题为选择题 -->
							<ul v-if="subQuestion.Type == 1 || subQuestion.Type == 2">
								<li v-for="(option, optionIndex) in subQuestion.Options" :key="optionIndex" :class="option.IsRight?'redFont':''">
									<p class="choice_one" v-html="'<span>'+optionList[optionIndex]+'：'+'</span>'+ option.Text"></p>
								</li>
							</ul>
						</p>
						
					</div>
				</div>
				
				<!--试题信息-->
				<div class="itemInfoBox boderRadiusBox">
					<div class="headerSpread">
						试题信息
					</div>
					<div class="itemSelect">
						<div class="block w_50 blueFont fLeft indentTitle">试题类型</div>
						<el-select class="w_100 ml-10 mr-10" v-model="itemData.Type" @change="changeInputValue">
		          <el-option v-for="item in itemTypeList" :key="item.type" :label="item.typeName" :value="item.type"></el-option>
		        </el-select>
		        <i class="cursor_pointer blueFont el-icon-plus" v-show="itemData.Type == 1 || itemData.Type == 2 || itemData.Type == 5" @click="EditHtml('添加选项', '<p>选项内容</p>', 'Options', 9999)"> 添加选项</i>
						<div class="inline_block notice"></div>
					</div>
					
					<div class="itemSelect">
						<div class="block w_50 blueFont fLeft indentTitle">试题题干</div>
						<p class="Text" v-html="itemData.Text"></p>
						<i class="cursor_pointer el-icon-edit" @click="EditHtml('编辑题干', itemData.Text, 'Text')"> 编辑</i>
						<div class="inline_block notice"></div>
					</div>
					
					<div class="itemSelect" v-show="itemData.Type==1 || itemData.Type==2 || itemData.Type == 5">
						<div class="block w_50 blueFont fLeft indentTitle">试题选项</div>
						<ul class="ChoiceBox" v-if="itemData.Options.length>0">
							<li v-for="(option, key) in itemData.Options" :class="option.IsRight?'redFont':''">
								<p class="choice_one" v-html="'<span>'+optionList[key]+'：'+'</span>'+ option.Text"></p>
								<i :class="option.IsRight?'redFont cursor_pointer el-icon-delete':'blueFont cursor_pointer el-icon-delete'" @click="deleteOption(key)"> 删除</i>
								<i class="blueFont cursor_pointer" v-if="!option.IsRight" @click="setRightOrWrong(key)">设置为正确选项</i>
								<i class="redFont cursor_pointer" v-else @click="setRightOrWrong(key)">设置为错误选项</i>
								<i :class="option.IsRight?'redFont cursor_pointer el-icon-edit':'cursor_pointer el-icon-edit'" @click="EditHtml('编辑选项', option.Text, 'Options', key)"> 编辑</i>
							</li>
						</ul>
						<div class="inline_block notice"></div>
					</div>
					
					<div class="itemSelect" v-show="itemData.Type==6">
						<div class="block w_50 blueFont fLeft indentTitle">小题数目</div>
						<span class="ml-10 blueFont font_bold mr-20">{{itemData.SubQuestionList.length}} 个</span>
						<i class="cursor_pointer blueFont el-icon-plus" v-show="itemData.Type == 6" @click="vuexDataChange('addCombination')">添加小题</i>
						<ul class="ChoiceBox" v-if="itemData.SubQuestionList.length>0">
							<li class="subQuestion_li" v-for="(subItem, key) in itemData.SubQuestionList" :key="key">
								<!-- 20190124 小题是选择题 1:有题干(显示题干和选项) 2:没有题干(只显示选项) -->
								<div class="clearfix">
									<p class="choice_one" v-html="'<span>（'+(key+1)+'）</span>'+ subItem.Text"></p>
									<i :class="subItem.IsRight?'redFont cursor_pointer el-icon-delete':'blueFont cursor_pointer el-icon-delete'" @click="deleteSubQuestion(key)"> 删除小题</i>
									<i :class="subItem.IsRight?'redFont cursor_pointer el-icon-edit':'blueFont cursor_pointer el-icon-edit'" @click="editSubQuestion(itemData,key)"> 编辑小题</i>
								</div>
								<p :class="option.IsRight?'choice_one subOption redFont':'choice_one subOption'" v-if="subItem.Type == 1 || subItem.Type == 2" v-for="(option, optionInde) in subItem.Options" :key="optionInde" v-html="'<span>'+optionList[optionInde]+'：'+'</span>'+ option.Text"></p>
							</li>
						</ul>
						<div class="inline_block notice"></div>
					</div>
					
					<div class="itemSelect clearfix">
						<div class="block w_50 blueFont fLeft indentTitle">显示题号</div>
						<el-input class="w_100 ml-10 input-search-self"
							@change="vuexDataChange()"
							placeholder="显示题号"
							prefix-icon="el-icon-edit"
							v-model="itemData.Serial_num">
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
						<div class="block w_50 blueFont fLeft indentTitle">分析</div>
						<p class="analysis" v-html="itemData.Analysis"></p>
						<i class="cursor_pointer el-icon-edit" @click="EditHtml('编辑分析', itemData.Analysis, 'Analysis')"> 编辑</i>
						<div class="inline_block notice"></div>
					</div>
					
					<div class="itemSelect">
						<div class="block w_50 blueFont fLeft indentTitle">解答</div>
						<p class="explain" v-html="itemData.Explain"></p>
						<i class="cursor_pointer el-icon-edit" @click="EditHtml('编辑解答', itemData.Explain, 'Explain')"> 编辑</i>
						<div class="inline_block notice"></div>
					</div>
					
					<div class="itemSelect">
						<div class="block w_50 blueFont fLeft indentTitle">点评</div>
						<p class="comments" v-html="itemData.Comments"></p>
						<i class="cursor_pointer el-icon-edit" @click="EditHtml('编辑点评', itemData.Comments, 'Comments')"> 编辑</i>
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
							    <div class="name" :title="'考点ID：' + item.pointId">{{ item.pointName }}</div>
							  </template>
							</el-autocomplete>
					  </el-form-item>
					</el-form>
					
					<p class="sel_points_title mTop20 mBottom10 blueFont">您选中的知识点：</p>
					<!--已选知识点-->
					<div class="selectedPointsBySearch">
						<span class="singlePointBySel" v-show="selPointsList && selPointsList.length > 0" v-for="(pointItem,key) in selPointsList" :key="key" :title="'考点ID：' + pointItem.pointId">
							{{pointItem.pointName}}
							<i class="el-icon-remove-outline cursor_pointer redFont" @click="deleteSelPoints(key)"></i>
						</span>
					</div>
					
				  <span slot="footer" class="dialog-footer">
				    <el-button @click="addPointsDialog = false">取 消</el-button>
				    <el-button type="primary" @click="confirmAddPoints()">确 定</el-button>
				  </span>
				</el-dialog>
				
				<!-- 修改 '富文本' 弹窗 -->
				<el-dialog :title="editorInfo.editorTitle" :visible.sync="editorInfo.editTextDialog" width="500px">
				  <!-- 组件有两个属性 value 传入内容双向绑定 setting传入配置信息 -->
				  <editor :txt="editorInfo.txt" @getHtml="getHtml"></editor>
				  <span slot="footer" class="dialog-footer">
				    <el-button @click="editorInfo.editTextDialog = false">取 消</el-button>
				    <el-button type="primary" @click="confirmHtml">确 定</el-button>
				  </span>
				</el-dialog>
				
				
				
			</div>
		</div>
	</el-scrollbar>
</template>

<script>
	import Editor from '@/components/Editor.vue'
	export default {
		components: {
			Editor
    },
    name: 'heshaoxu-modal',
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
					IsCombination: '',				// 是否是题组题
					Division: '',							// 区分度
					Difficulty: '',						// 难度值
					Spenttime:  '',						// 答题时长
					Knowledge_main_points:'',	// 主知识点
					Knowledge_points: [],			// 已选知识点(包含 '主知识点')	=> 只存放 pointId	
					Knowledge_points_show: [],// 添加时将  this.selPointsList  进行 concat 合并 , 并将 this.selPointsList 置空  this.pointName 置空
																		// { pointName: '分式方程的定义', pointId: 142, isMain: false }	=> 最终选中知识点
					Ability: '',							// 学科能力 code 值 以','分割
					AbilityName: '',					// 学科能力 name 值 以','分割
					AbilityCodeList: [],			// 学科能力 [12, 15]								选中的
					AbilityNameList: [],			// 学科能力 ['写作能力', '创新能力']	选中的
					Thoughtway: '',						// 思想方法 code 值 以','分割
					ThoughtwayName: '',				// 思想方法 name 值 以','分割
					ThoughtwayCodeList: [],		// 思想方法 [15,56]									选中的
					ThoughtwayNameList: [],		// 思想方法 { '函数思想'}						选中的
					UseTag: '',								// 应用标签 code 值 以','分割
					UseTagName: '',						// 应用标签 name 值 以','分割
					UseTagCodeList: [],				// 应用标签 [12, 15]								选中的
					UseTagNameList: [],				// 应用标签 ['写作能力', '创新能力']	选中的
					
					SubjectCode:'',						// 学科 code 值
					Type: '1',								// 试题类型
					Options: [],							// 选项数组
					SubQuestionList:[],				// 题组题小题 个数
					Serial_num: '',						// 显示题号
					
				},
				AbilityCodeList: [],				// 学科能力 全数组	(静态数据中获取)
				AbilityNameList: [],				// 学科能力 全数组	(静态数据中获取)
				ThoughtwayCodeList: [],			// 思想方法 全数组	(静态数据中获取)
				ThoughtwayNameList: [],			// 思想方法 全数组	(静态数据中获取)
				
				UseTagCodeList: [],					// 应用标签 全数组	(静态数据中获取)
				UseTagNameList: [],					// 应用标签 全数组	(静态数据中获取)
				
				
				addPointsDialog: false,	// 知识点	弹窗		
				allPointsList: [],			// 知识点全数组		(静态数据中获取)
				selPointsList: [],			// 知识点	检索得到的
				pointName: '',
				
				itemTypeList: [ 
					{type: '1', typeName: '单选题'}, 
					{type: '2', typeName: '多选题'}, 
					{type: '3', typeName: '填空题'}, 
					{type: '4', typeName: '简答题'}, 
					{type: '5', typeName: '判断题'}, 
					{type: '6', typeName: '题组题'} 
				],
				// 选项
				optionList: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
				// 富文本 编辑器
				editorInfo:{
					editTextDialog: false,	// 富文本 弹窗
					editorTitle:'',					// 富文本 标题
					txt: '',								// 父传子 数据
					editHtml: '',						// 子传父 数据
					editHtmlType: '',				// 编辑 试题部分类型 => '题干', '选项', '分析', '解答', '点评'
					editOptionIndex: 1,			// 编辑 试题选项下标 => '选项' 下标
				},
				
				
			}
		},
		mounted() {
			this.paperData = JSON.parse(this.getLocal('paperData'));
			this.initItemList();
			this.initStaticData(this.paperData.SubjectId, this.paperData.MaterialId, this.paperData.SubjectCode);
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
									question[k].Type =  String(question[k].Type);
									question[k].moveMin = moveMin + 1;
									question[k].moveMax = moveMax + 1;
									question[k].Num = moveMin + k + 1;						// 试题序号
									question[k].index_group = k;									// 试题 			题内部下标
									if(question[k].isSelected == true){
										this.initSelectKnowList(question[k]);
										// this.initAbilityOrThoughtWay(question[k]);
										this.itemData = question[k];
									}
									question[k].firstIndex = i;										// 一级题组 	指向
									question[k].secondIndex = j;									// 二级题组 	指向
									// 题目所在的 一级题组二级题组 中文
									question[k].group_name = question[k].Num + '（' + this.global.numToChinese(i+1) + '、' + String(i+1) + '.' + String(j+1) +'）';
									// 题组题情况
									if(question[k].SubQuestionList && question[k].SubQuestionList.length > 0){
										for(let m=0; m<question[k].SubQuestionList.length; m++){
											question[k].SubQuestionList[m].Type = String(question[k].SubQuestionList[m].Type);
											question[k].SubQuestionList[m].Combination_index = m+1;
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
								question[k].Type =  String(question[k].Type);
								question[k].moveMin = moveMin + 1;
								question[k].moveMax = moveMax + 1;
								question[k].Num = moveMin + k + 1;						// 试题序号
								question[k].index_group = k;									// 试题 			题内部下标
								if(question[k].isSelected == true){
									this.initSelectKnowList(question[k]);
									// this.initAbilityOrThoughtWay(question[k]);
									this.itemData = question[k];
								}
								question[k].firstIndex = i;										// 一级题组 	指向
								question[k].secondIndex = 9999;								// 二级题组 	指向
								// 题目所在的 一级题组二级题组 中文
								question[k].group_name = question[k].Num + '（' + this.global.numToChinese(i+1) + '）';
								// 题组题情况
								if(question[k].SubQuestionList && question[k].SubQuestionList.length > 0){
									for(let m=0; m<question[k].SubQuestionList.length; m++){
										question[k].SubQuestionList[m].Type = String(question[k].SubQuestionList[m].Type);
										question[k].SubQuestionList[m].Combination_index = m+1;
									}
								}
								this.itemList.push(question[k]);
							}
						}
					}
					// 将 paperData.AllQuestionArr 提交到 vuex
					this.setLocal('paperData',JSON.stringify(this.paperData));
					this.$store.dispatch('CHANGE_ONE_PAPER',{paper: this.paperData});
				}
			},
			// 单题保存
			restoreItemForVuexAndLocal(){
				// 将 paperData.AllQuestionArr 提交到 vuex
				this.setLocal('paperData',JSON.stringify(this.paperData));
				this.$store.dispatch('CHANGE_ONE_PAPER',{paper: this.paperData});
				this.$message({
					showClose: true,
					message: '第'+this.itemData.Num+'的修改信息保存成功！',
					type: 'success',
					duration: 2000
				});
			},
			changeInputValue(){					// 修改试卷名称		修改试题类型
				switch (this.itemData.Type){
					case '1':
						/*if(this.itemData.Options && this.itemData.Options.length>0){
							// 多选题 <=> 单选题 => 选项全设为false(错误选项)
							this.itemData.Options.forEach((option)=>{
								option.IsRight = false;
							})
						}*/
						this.itemData.IsCombination = '0';
						break;
					case '2':
						if(this.itemData.Options && this.itemData.Options.length>0){
							// 单选题 <=> 多选题
						}
						this.itemData.IsCombination = '0';
						break;
					case '3':
						// 填空题
						this.itemData.IsCombination = '0';
						break;
					case '4':
						// 简答题
						this.itemData.IsCombination = '0';
						break;
					case '5':
						// 判断题
						this.itemData.IsCombination = '0';
						break;
					case '6':
						// 题组题
						this.itemData.IsCombination = '1';
						break;
					default:
						break;
				}
			},
			vuexDataChange(type){
				if(type == 'IsCombination'){
					if(this.itemData.IsCombination == '1'){
						this.itemData.Type = '6';
					}else{
						this.itemData.Type = '1';		// 不勾选题组题 	默认为选择题
					}
				}else if(type == 'addCombination'){
					let item_parent = JSON.parse(JSON.stringify(this.itemData));																// 题组题父题
					this.itemData.SubQuestionList[this.itemData.SubQuestionList.length] = item_parent;					// 默认继承 题组题 父级题所有内容
					this.itemData.SubQuestionList[this.itemData.SubQuestionList.length-1].SubQuestionList = [];	// 小题数组 为空数组
					this.itemData.SubQuestionList[this.itemData.SubQuestionList.length-1].IsCombination = '0';	// 小题显示为非题组题
					this.itemData.SubQuestionList[this.itemData.SubQuestionList.length-1].Type = '1';						// 小题 默认题型为单选题
					this.itemData.SubQuestionList[this.itemData.SubQuestionList.length-1].Combination_index = this.itemData.SubQuestionList.length;	// 小题 序号(决定小题顺序)
					this.$message({
						showClose: true,
						message: '题组题第 ' +this.itemData.SubQuestionList.length+ ' 小题添加成功，该小题将继承大题所有属性，默认题型为单选题！',
						type: 'success',
						duration: 4000
					});
					this.initItemList();
				}else{
					
				}
			},
			deleteOption(optionIndex){
				// 删除选项
				let option_new = [];
				this.itemData.Options.forEach((option,key)=>{
					if(key != optionIndex){
						option_new.push(option);
					}
				})
				this.itemData.Options = option_new;
			},
			deleteSubQuestion(subQuestionIndex){
				let SubQuestionList_new = [];
				this.itemData.SubQuestionList.forEach((subQuestion,key)=>{
					if(key != subQuestionIndex){
						SubQuestionList_new.push(subQuestion);
					}
				})
				this.itemData.SubQuestionList = SubQuestionList_new;
			},
			editSubQuestion(itemData,subKey){
				// 编辑题组题小题 itemData 为 题组题题号 key 为小题索引	=> 跳转到 题组题编辑小题页面
				console.log(itemData);
				console.log(subKey);
				// 将 itemData (题组题) 和 小题下标subKey 存入session
				this.setSession('itemData',JSON.stringify(itemData));
				this.setSession('subKey',JSON.stringify(subKey));
				this.changeRouterByName('ItemEditSingle_SubQuestion');
			},
			EditHtml(title, html, type, optionIndex){
				this.editorInfo.editTextDialog = true;
				this.editorInfo.editorTitle = title;
				this.editorInfo.txt = html;
				this.editorInfo.editHtmlType = type;
				this.editorInfo.editOptionIndex = optionIndex;
			},
			getHtml(data){							// 子传父 数据
      	this.editorInfo.editHtml = data;
   		},
			confirmHtml(){
				this.editorInfo.editTextDialog = false;
				// 试题编辑的部分 Text, Options, Analysis, Explain, Comments.
				switch(this.editorInfo.editHtmlType){
					case 'Text':
						this.itemData.Text = this.editorInfo.editHtml;
						break;
					case 'Options':
						if(this.editorInfo.editOptionIndex == 9999){
							this.itemData.Options[this.itemData.Options.length] = {};
							this.itemData.Options[this.itemData.Options.length-1].Id = '';
							this.itemData.Options[this.itemData.Options.length-1].Index = this.itemData.Options.length;
							this.itemData.Options[this.itemData.Options.length-1].IsRight = false;
							this.itemData.Options[this.itemData.Options.length-1].Text = this.editorInfo.editHtml;	// 新增选项
						}else{
							this.itemData.Options[this.editorInfo.editOptionIndex].Text = this.editorInfo.editHtml;	// 修改选项
						}
						break;
					case 'Analysis':
						this.itemData.Analysis = this.editorInfo.editHtml;
						break;
					case 'Explain':
						this.itemData.Explain = this.editorInfo.editHtml;
						break;
					case 'Comments':
						this.itemData.Comments = this.editorInfo.editHtml;
						break;
					default:
						break;
				}
				this.editorInfo.txt = '';
			},
			setRightOrWrong(key){
				// 设置为 '正确选项' 或者 '错误选项'
				if(this.itemData.Type == 1 || this.itemData.Type == 5){
          for(let i = 0, len = this.itemData.Options.length; i < len; i++){
            this.itemData.Options[i].IsRight = false
            this.$set(this.itemData.Options, i, this.itemData.Options[i])
          }
          this.itemData.Options[key].IsRight = !this.itemData.Options[key].IsRight
          this.$set(this.itemData.Options, key, this.itemData.Options[key])
        }else{
          this.itemData.Options[key].IsRight = !this.itemData.Options[key].IsRight
          this.$set(this.itemData.Options, key, this.itemData.Options[key])
        }
			},
			goBack(){
				this.changeRouterByName('ItemEditMain');
			},
			// 单题信息展示
			SingleItemInfo(row){
				this.itemData.isSelected = false;
				row.isSelected = true;
				this.itemData = JSON.parse(JSON.stringify(row));
				this.setLocal('paperData',JSON.stringify(this.paperData));
				this.initItemList();
			},
			
			// 弹窗方法
			openAddPointsDialog(){
				this.addPointsDialog = true; 
				this.pointName=''; 
				this.selPointsList=[];
			},
			querySearch(pointName, cb) {
        var allPointsList = this.allPointsList;
        var results = pointName ? allPointsList.filter((item) => {return item.pointName.toLowerCase().includes(pointName.toLowerCase())}) : allPointsList;
        cb(results);
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
			deleteSelPoints(index){								// 删除选中 知识点
				let selPointsList_new = [];
				for(let i=0; i<this.selPointsList.length; i++){
					if(i != index){
						selPointsList_new.push(this.selPointsList[i]);
					}
				}
				this.selPointsList = selPointsList_new;
			},
			confirmAddPoints(){										// 确认添加 知识点
				for (let i=0; i<this.selPointsList.length; i++){
					this.selPointsList[i].isMain = false;
					if( !this.itemData.Knowledge_points.includes(this.selPointsList[i].pointId) ){
						this.itemData.Knowledge_points.push(this.selPointsList[i].pointId);
						this.itemData.Examination_points.push(this.selPointsList[i].pointId);
						this.itemData.ExaminationPointsName.push(this.selPointsList[i].pointName);
						this.itemData.Knowledge_points_show.push(this.selPointsList[i]);
					}
				}
				this.addPointsDialog = false;
			},
			initStaticData(SubjectId,MaterialId,SubjectCode){	// 初始化  学科能力  思想方法  知识点  接收 Vuex 学段学科教材版本数据					=> 只做 学段学科 教材版本 学科能力 思想方法 级联
				let subjectAboutInfo = JSON.parse(JSON.stringify(this.$store.state.Version.subjectAboutInfo));
				// 接收 Vuex 学科下的应用标签
      	let userMarkList = JSON.parse(JSON.stringify(this.$store.state.Version.userMarkList));
				this.AbilityCodeList = [];
				this.AbilityNameList = [];
				this.ThoughtwayCodeList = [];
				this.ThoughtwayNameList = [];
				this.UseTagCodeList = [];
				this.UseTagNameList = [];
				// 学科能力  思想方法  知识点
				for(let i=0; i<subjectAboutInfo.length; i++){
					if(SubjectId == subjectAboutInfo[i].subjectId){
						this.allPointsList = subjectAboutInfo[i].knowledgePointList;		// 弹窗中	知识点检索全数据
						subjectAboutInfo[i].subjectAbilityList.forEach((item)=>{
							this.AbilityCodeList.push(item.subjectAbilityId);							// 学科能力 code值 全数据
							this.AbilityNameList.push(item.subjectAbilityName);						// 学科能力 name值 全数据
						});
						subjectAboutInfo[i].thoughtwayList.forEach((item)=>{
							this.ThoughtwayCodeList.push(item.thoughtWayId);							// 思想方法 code值 全数据
							this.ThoughtwayNameList.push(item.thoughtWayName);						// 思想方法 name值 全数据 thoughtWayName
						});
					}
				}
				// 应用标签
				for(let i=0; i<userMarkList.length; i++){
					if(userMarkList[i].subjectcode==0 || SubjectCode == userMarkList[i].subjectcode){
						this.UseTagCodeList.push(userMarkList[i].id);										// 应用标签 code值 全数据
						this.UseTagNameList.push(userMarkList[i].name);									// 应用标签 name值 全数据
					}
				}
			},
			initSelectKnowList(itemData){		// 初始化  知识点选框循环 生成 itemData.Knowledge_points_show
				let Knowledge_points_show = [];
				if(itemData.Examination_points.length > 0){
					for(let i=0; i<itemData.Examination_points.length; i++){
						Knowledge_points_show[i] = {};
						Knowledge_points_show[i].pointName = itemData.ExaminationPointsName[i];
						Knowledge_points_show[i].pointId = itemData.Examination_points[i];
						if(itemData.Knowledge_main_points == itemData.Examination_points[i]){
							Knowledge_points_show[i].isMain = true;
						}else{
							Knowledge_points_show[i].isMain = false;
						}
					}
				}
				this.itemData.Knowledge_points_show = Knowledge_points_show;
			},
			delPointShow(key){			// 删除显示框中 知识点
				if(this.itemData.Knowledge_points_show.length >0){
					let Knowledge_points_show = [];
					let Knowledge_main_points = '';
					let Knowledge_points = [];
					let Examination_points = [];
					let ExaminationPointsName = [];
					for(let i=0; i<this.itemData.Knowledge_points_show.length; i++){
						if(i != key){
							Knowledge_points_show.push(this.itemData.Knowledge_points_show[i]);
							Knowledge_points.push(this.itemData.Knowledge_points_show[i].pointId);
							Examination_points.push(this.itemData.Knowledge_points_show[i].pointId);
							ExaminationPointsName.push(this.itemData.Knowledge_points_show[i].pointName);
						}else{
							if(this.itemData.Knowledge_points_show[i].isMain == true){
								Knowledge_main_points = '';
							}
						}
					}
					this.itemData.Knowledge_points_show = Knowledge_points_show;
					this.itemData.Knowledge_main_points = Knowledge_main_points;
					this.itemData.Knowledge_points = Knowledge_points;
					this.itemData.Examination_points = Examination_points;
					this.itemData.ExaminationPointsName = ExaminationPointsName;
				}
			},
			setMainOrNot(key){			// 设置或取消 '主知识点'
				let Knowledge_points_show = JSON.parse(JSON.stringify(this.itemData.Knowledge_points_show));
				if(Knowledge_points_show[key].isMain){
					Knowledge_points_show[key].isMain = false;
					this.itemData.Knowledge_main_points = '';
				}else{
					Knowledge_points_show.forEach((item)=>{
						item.isMain = false;
					})
					Knowledge_points_show[key].isMain = true;
					this.itemData.Knowledge_main_points = this.itemData.Knowledge_points_show[key].pointId;
				}
				this.itemData.Knowledge_points_show = JSON.parse(JSON.stringify(Knowledge_points_show));
			},
			initAbilityOrThoughtWay(itemData){	// 初始化 学科能力 思想方法
				if(itemData.Ability == ''){
					itemData.AbilityName = '';
					itemData.AbilityCodeList = [];
					itemData.AbilityNameList = [];
				}
				if(itemData.Thoughtway == ''){
					itemData.ThoughtwayName = '';
					itemData.ThoughtwayCodeList = [];
					itemData.ThoughtwayNameList = [];
				}
				if(itemData.UseTag == ''){
					itemData.UseTagName = '';
					itemData.UseTagCodeList = [];
					itemData.UseTagNameList = [];
				}
			},
			AbilityNameListChange(){
				let Ability = '';
				let AbilityName = '';
				let AbilityCodeList = [];
				if(this.itemData.AbilityNameList.length == 0){
					this.itemData.Ability = '';
					this.itemData.AbilityName = '';
					this.itemData.AbilityCodeList = [];
				}else{
					for(let i=0; i<this.itemData.AbilityNameList.length; i++){
						AbilityName += this.itemData.AbilityNameList[i] + ',';
						for(let j=0; j<this.AbilityNameList.length; j++){
							if(this.itemData.AbilityNameList[i] == this.AbilityNameList[j]){
								Ability += this.AbilityCodeList[j] + ',';
								AbilityCodeList.push(this.AbilityCodeList[j]);
							}
						}
					}
					Ability = Ability.slice(0, Ability.length-1);
					AbilityName = AbilityName.slice(0, AbilityName.length-1);
					this.itemData.Ability = Ability;
					this.itemData.AbilityName = AbilityName;
					this.itemData.AbilityCodeList = AbilityCodeList;
				}
			},
			ThoughtwayNameListChange(value){
				let Thoughtway = '';
				let ThoughtwayName = '';
				let ThoughtwayCodeList = [];
				if(this.itemData.ThoughtwayNameList.length == 0){
					this.itemData.Thoughtway = '';
					this.itemData.ThoughtwayName = '';
					this.itemData.ThoughtwayCodeList = [];
				}else{
					for(let i=0; i<this.itemData.ThoughtwayNameList.length; i++){
						ThoughtwayName += this.itemData.ThoughtwayNameList[i] + ',';
						for(let j=0; j<this.ThoughtwayNameList.length; j++){
							if(this.itemData.ThoughtwayNameList[i] == this.ThoughtwayNameList[j]){
								Thoughtway += this.ThoughtwayCodeList[j] + ',';
								ThoughtwayCodeList.push(this.ThoughtwayCodeList[j]);
							}
						}
					}
					Thoughtway = Thoughtway.slice(0, Thoughtway.length-1);
					ThoughtwayName = ThoughtwayName.slice(0, ThoughtwayName.length-1);
					this.itemData.Thoughtway = Thoughtway;
					this.itemData.ThoughtwayName = ThoughtwayName;
					this.itemData.ThoughtwayCodeList = ThoughtwayCodeList;
				}
			},
			UseTagNameListChange(){
				let UseTag = '';
				let UseTagName = '';
				let UseTagCodeList = [];
				if(this.itemData.UseTagNameList.length == 0){
					this.itemData.UseTag = '';
					this.itemData.UseTagName = '';
					this.itemData.UseTagCodeList = [];
				}else{
					for(let i=0; i<this.itemData.UseTagNameList.length; i++){
						UseTagName += this.itemData.UseTagNameList[i] + ',';
						for(let j=0; j<this.UseTagNameList.length; j++){
							if(this.itemData.UseTagNameList[i] == this.UseTagNameList[j]){
								UseTag += this.UseTagCodeList[j] + ',';
								UseTagCodeList.push(this.UseTagCodeList[j]);
							}
						}
					}
					UseTag = UseTag.slice(0, UseTag.length-1);
					UseTagName = UseTagName.slice(0, UseTagName.length-1);
					this.itemData.UseTag = UseTag;
					this.itemData.UseTagName = UseTagName;
					this.itemData.UseTagCodeList = UseTagCodeList;
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
			.itemEditSingle {
				padding: 20px;
				
				/* 保存试题提示语 以及保存按钮 */
				div.restore_one_item{ height: 30px; line-height: 30px; margin-bottom: 15px; font-size: 14px;}
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
							p.coreMarkTitle{ width: 100%; height: 12px; line-height: 12px; padding: 20px 0px 0px 20px; font-size: 12px; color: #41C0BC; text-align: left; }
							p.checkListNoData{ width: 100%; height: 30px; line-height: 40px; text-align: center; font-size: 12px; color: #e6a23c; letter-spacing: 1px; }
							ul.pointList{ list-style: none; -webkit-padding-start: 30px;
								li{ width: 100%; height: 12px; line-height: 12px; margin: 10px 0px; color: #555555; font-size: 12px;
									i{ margin-left: 10px; color: #41C0BC; cursor: pointer; font-size: 14px; }
									i.el-icon-circle-check{ color: #606266; }
								}
							}
							/* 学科能力 思想方法 checkbox 组 */
							.el-checkbox-group{}
							
						}
					}
				}
				.rightMarkBox{ width: 36%; height: 500px; float: right; margin: 0 auto; position: relative;
					img.ipadFram{ height: 450px; width: 84%; position: absolute; top: 0; bottom: 0; left: 0; right: 0; margin: auto; margin-top: 45px; }
					div.itemContentBox{ height: 360px; width: 74%; position: absolute; top: 0; bottom: 0; left: 0; right: 0; margin: auto; margin-top: 90px; box-sizing: border-box; padding: 10px 10px; overflow-y: auto; font-size: 12px; color: #555555;
						/* 题干信息		题组题信息 */
						p.contentTitle, p.subQuesBox{display: block; line-height: 30px;
							img{ max-width: 100%; }
							ul{ display: block; -webkit-margin-before: 0em; -webkit-margin-after: 0em; -webkit-padding-start: 30px;
								li{ display: block; width: 100%; line-height: 30px;
									.choice_one{ 
										*{ display: inline; } 
									}
								}
							}
						}
						p.contentTitle>span>*:first-child{ display: inline; 
							*{ display: inline; }
						}
						p.subQuesBox>span>*:first-child{ display: inline; 
							*{ display: inline; }
						}
					}
				}
				/* 试题信息 */
				.itemInfoBox{ width: 100%; mim-height: 300px; margin-bottom: 10px;
					.itemSelect{ color: #555555; font-size: 12px; padding: 5px 10px 5px 20px; line-height: 30px;
						.input-search-self .el-input__inner{ font-size: 12px; height: 30px; line-height: 30px; }
						.el-input--suffix .el-input__inner {font-size: 12px; height: 30px; line-height: 30px; }
						.el-select .is-focus .el-input__suffix{top: -5px;}
						.el-select .el-input__suffix{top: 5px;}
						.el-icon-edit{ color: #41C0BC; }
						/* 选项 */
						.ChoiceBox{ list-style: none; margin-left: 20px; margin-top: 0px;
							li{ display: block; line-height: 30px;
								p.choice_one{ display: inline-block; width: 75%; margin-right: 5px; 
									*{ display: inline-block; }
								}
								i{ display: inline; font-style: normal; margin-left: 10px; margin-right: 10px;}
							}
							li.subQuestion_li{ display: block; height: 30px; line-height: 30px;
								p.choice_one{ display: block; width:81% !important; float: left; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
									*{ display: inline-block;}
								}
								p.subOption{ width: 100% !important; box-sizing: border-box; padding-left: 3em;}
							}
						}
						div.indentTitle{ line-height: 30px; }
						/* 题干 选项 分析 解答 点评 */
						p.Text, p.analysis, p.explain, p.comments{ display: inline-block; line-height: 30px; width: 90%; }
						div.notice{ overflow:hidden; clear: both; }
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
					.singlePointBySel{ display: block; line-height: 30px; color: #41C0BC; font-size: 12px; margin: 0 10px; border-bottom: 1px dashed #E4E4E4;
						i{ float: right; font-size: 14px; margin-top: 8px; }
					}
				}
				
				
				.editor-container{
					width: 100%;
				}
				.info{
			    border-radius: 10px;
			    line-height: 20px;
			    padding: 10px;
			    margin: 10px;
			    background-color: #ffffff;
			  }
				
				
			}
		}
	}
	.itemEditSingle-view { flex: 1; overflow: hidden; }
</style>

<!--将线上 scr 图片地址 http 或者 https 转化成 base64 格式
      	var base64Img = require('base64-img');
      	var url = 'http://img1.imgtn.bdimg.com/it/u=2904533061,568393156&fm=200&gp=0.jpg';
				base64Img.requestBase64(url, function(err, res, body) {
				  console.log(body);
				});-->