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
							<div class="inline_block w_100">学段学科</div>
							<input-disable :disableData='paperData.Material'></input-disable>
					  </div>
					  <div class="itemSelect">
							<div class="inline_block w_100">教材版本</div>
							<input-disable :disableData='paperData.Subject'></input-disable>
					  </div>
					  <div class="itemSelect">
							<div class="inline_block w_100">试卷类型</div>
							<input-disable :disableData='paperData.Papertype'></input-disable>
					  </div>
					  <div class="itemSelect">
							<div class="inline_block w_100">适用学期</div>
							<input-disable :disableData='paperData.Term'></input-disable>
					  </div>
					  
					  <div class="itemSelect">
							<div class="inline_block w_100">试卷总分值</div>
						  <el-input class="w_120 input-search-self" placeholder="请输入试卷总分值" prefix-icon="el-icon-edit" min="1" max="300" step="1" type="number"
							  @change="checkInputValid(1)"
							  v-model="paperData.TotalPoints">
							</el-input>
							<div class="inline_block notice">分</div>
					  </div>
					  <div class="itemSelect">
							<div class="inline_block w_100">建议答题时长</div>
						  <el-input class="w_120 input-search-self" placeholder="请输入答题总时长" prefix-icon="el-icon-edit" min="1" max="300" step="1" type="number"
							  @change="checkInputValid(2)"
							  v-model="paperData.Time">
							</el-input>
							<div class="inline_block notice">分钟</div>
					  </div>
					  
					  <div class="itemSelect">
							<div class="inline_block w_100">试卷来源</div>
						  <el-input class="w_120 input-search-self" placeholder="请输入试卷来源" prefix-icon="el-icon-edit"v-model="paperData.Papersource"></el-input>
					  </div>
					</div>
					
					<div class="boderRadiusBox w_60p fRight" v-show="isMainSelect">
						<div class="itemSelect">
							<div class="inline_block w_100">难度值</div>
							<input-disable :disableData='paperData.Difficulty'></input-disable>
							<div class="inline_block notice">请填写0-1之间的数，若试卷难度为X</div>
					  </div>
					  <div class="itemSelect">
							<div class="inline_block w_100">难度方案</div>
							<input-disable :disableData='paperData.DiffcultyType'></input-disable>
							<div class="inline_block notice">需要参考专业设置文档</div>
					  </div>
					  <div class="itemSelect">
							<div class="inline_block w_100">区分度</div>
							<input-disable :disableData='paperData.Division'></input-disable>
							<div class="inline_block notice"></div>
					  </div>
					  <div class="itemSelect">
							<div class="inline_block w_100">核心题库</div>
							<select-yes-or-no :yesOrNo='paperData.Core' :YesOrNoArr="YesOrNoArr" :componentName='"Core"' @listenChild="listenChildData"></select-yes-or-no>
							<div class="inline_block notice">是否进入核心题库</div>
					  </div>
					  <div class="itemSelect">
							<div class="inline_block w_100">同步试题</div>
							<select-yes-or-no :yesOrNo='paperData.Synchronization' :YesOrNoArr="YesOrNoArr" :componentName='"Synchronization"' @listenChild="listenChildData"></select-yes-or-no>
							<div class="inline_block notice">是否用于同步测试</div>
					  </div>
					  <div class="itemSelect">
							<div class="inline_block w_100">双三试题</div>
							<select-yes-or-no :yesOrNo='paperData.Douthree' :YesOrNoArr="YesOrNoArr" :componentName='"Douthree"' @listenChild="listenChildData"></select-yes-or-no>
							<div class="inline_block notice">是否适用于初三、高三总复习测试</div>
					  </div>
					  <div class="itemSelect">
							<div class="inline_block w_100">是否隐藏</div>
							<select-yes-or-no :yesOrNo='paperData.IsHide' :YesOrNoArr="YesOrNoArr" :componentName='"IsHide"' @listenChild="listenChildData"></select-yes-or-no>
							<div class="inline_block notice">默认选择否</div>
					  </div>
					</div>
					<div class="subBottom text_center" v-show="isMainSelect">
						<div class="btn-medium-self-blue" @click="submitChange()">同步修改</div>
					</div>
					
					<!-- 分组信息 -->
					<div :class="isMainSelect?'headerFold':'headerSpread'" @click="alterMainOrSub()">
						分组信息 
						<img src="../../assets/images/arrow_down.png" v-show="isMainSelect" class="left_6em" alt="" />
						<img src="../../assets/images/arrow_up.png" v-show="!isMainSelect" class="left_6em" alt="" />
					</div>
					
					<!--试题结构 => 一级试题组 => 二级试题组 -->
	        <ul class="ul_section_title ul_common" v-show="!isMainSelect">
	        	<li>序号</li><li>答题指导语</li><li>包含试题号</li><li>操作</li>
	        </ul>
	        <ul class="ul_section_empty ul_common" v-show="!isMainSelect && paperData.AllQuestionArr && paperData.AllQuestionArr.length==0">
	        	<li>暂无数据！</li>
	        </ul>
	        <ul class="ul_section_content ul_common" v-show="!isMainSelect && paperData.AllQuestionArr && paperData.AllQuestionArr.length>0">
	        	<li v-for="(itemMain,key) in paperData.AllQuestionArr">
	        		<span @click="openOrNotChild(itemMain)">
	        			{{ key+1 }} 
	        			<img src="../../assets/images/arrow_up_gray.png" v-show="itemMain.children.length > 0 && itemMain.isOpen" class="left_6em" alt="" />
	        			<img src="../../assets/images/arrow_down.png" v-show="itemMain.children.length > 0 && !itemMain.isOpen" class="left_6em" alt="" />
	        		</span>
	        		<span :title="itemMain.text" v-html="itemMain.text"></span>
	        		<span v-if="itemMain.rangeMin == itemMain.rangeMax">{{ itemMain.rangeMin }}</span>
	        		<span v-else>{{ itemMain.rangeMin + '-' + itemMain.rangeMax }}</span>
	        		<span>
	        			<i class="el-icon-edit" @click='editInfo(itemMain,key,9999)'></i>
			        	<!-- 上移下移 -->
			        	<i @click='moveUpOrDown(key,9999,"up")'><img src="../../assets/images/MoveUp.png"/></i>
			        	<i @click='moveUpOrDown(key,9999,"down")'><img src="../../assets/images/MoveDown.png"/></i>
	            	<i class="el-icon-delete" @click='deleteItem(key,9999)'></i>
	        		</span>
	        		<ul class="ul_sub_section" v-show="itemMain.children.length > 0 && itemMain.isOpen">
	        			<li v-for="(itemSub,index) in itemMain.children">
	        				<span></span>
			        		<span :title="itemSub.text" v-html="itemSub.text"></span>
			        		<span v-if="itemSub.rangeMin == itemSub.rangeMax">{{ itemSub.rangeMin }}</span>
			        		<span v-else>{{ itemSub.rangeMin + '-' + itemSub.rangeMax }}</span>
			        		<span>
			        			<i class="el-icon-edit" @click='editInfo(itemSub,key,index)'></i>
			        			<!-- 上移下移 -->
			        			<i @click='moveUpOrDown(key,index,"up")'><img src="../../assets/images/MoveUp.png"/></i>
			        			<i @click='moveUpOrDown(key,index,"down")'><img src="../../assets/images/MoveDown.png"/></i>
			            	<i class="el-icon-delete" @click='deleteItem(key,index)'></i>
			        		</span>
	        			</li>
	        		</ul>
	        	</li>
	        </ul>
	        <div class="subBottom text_center" v-show="!isMainSelect"></div>
				</div>
				
				<!-- 编辑 "答题指导语" 弹窗 -->
				<el-dialog title="编辑答题指导语" :visible.sync="editBigTitleDialog" width="40%">
				  <el-form ref="form" label-width="85px">
					  <el-form-item label="答题指导语">
					    <el-input type="textarea" v-model="sectionTitle"></el-input>
					  </el-form-item>
					</el-form>
				  <span slot="footer" class="dialog-footer">
				    <el-button @click="editBigTitleDialog = false">取 消</el-button>
				    <el-button type="primary" @click="confirmEidt()">确 定</el-button>
				  </span>
				</el-dialog>
				
				<!-- 删除 "一级或二级题组" 弹窗 -->
				<el-dialog title="试题组删除" :visible.sync="deleteItemDialog" width="420px">
				  <div class="el-message-box__content">
				  	<div class="el-message-box__status el-icon-warning"></div>
				  	<div class="el-message-box__message"><p>删除试题组将不可恢复，且“不可添加新试题组”，是否继续 ？</p></div>
				  </div>
				  <span slot="footer" class="dialog-footer">
				    <el-button @click="deleteItemDialog = false">取 消</el-button>
				    <el-button type="primary" @click="confirmDelete()">确 定</el-button>
				  </span>
				</el-dialog>
				
			</div>
		</div>
	</el-scrollbar>
</template>

<script>
	
	// 学段学科 教材版本 试卷类型(套卷) 难度方案 均不可编辑
	import selectYesOrNo from '@/components/SelectYesOrNO/select-yes-or-no.vue'
	import inputDisable from '@/components/InputDisable/input-disable.vue'
	export default {
		components: {
			selectYesOrNo,
			inputDisable
		},
		data() {
			return {
				isMainSelect: true,
				editBigTitleDialog: false,		// 编辑 '答题指导语' 中的动态数据 弹窗
				deleteItemDialog: false,			// 删除 '一级或二级题组' 弹窗
				sectionTitle: "",							// 编辑 '答题指导语' 弹窗 Model
				first_flag: 0,								// 一级标题索引值
				second_flag: 0,								// 二级标题索引值
				paperData:{										// 试卷 '总信息' 
					Title:'',
					// 下拉框 => '是否组件'
					Core: '',							// 是否是 '核心'
					Synchronization: '',	// 是否是 '同步'
					Douthree: '',					// 是否是 '双三'
					IsHide: '',						// 是否是 '隐藏'
					Difficulty: '',				// 难度值
					DiffcultyType:'',			// 难度方案
					Division:'',					// 区分度
					// 输入框 => '不可编辑组件'
					Subject: '',					// 学段学科
					Material:'',					// 教材版本
					Papertype:'',					// 试卷类型
					Term:'',							// 适用学期
					// 输入框 => '数字校验'
					TotalPoints:'',				// 试卷总分值		=>	从试题中统计
					Time:'',							// 答题总时长		=>	从试题中统计
					// 输入框 => '不做校验'
					Papersource:'',				// 试卷来源
					AllQuestionArr: [],		// 试卷结构大数组
				},
				YesOrNoArr: [ { name: '是', valueCode: '1' },{ name: '否', valueCode: '0' } ],
			}
		},
		mounted() {
			let paperData = JSON.parse(this.getLocal('paperData'));
			if(paperData.AllQuestionArr && paperData.AllQuestionArr.length>0){
				for(let i=0; i<paperData.AllQuestionArr.length; i++){
					paperData.AllQuestionArr[i].isOpen = false;
				}
			}
			this.paperData = paperData;
		},
		methods: {
			alterMainOrSub(){
				this.isMainSelect = !this.isMainSelect;
			},
			goBack(){
				this.changeRouterByName('PaperNotYet');
			},
			checkInputValid(type){
				switch (type){
					case 1:
						if(this.paperData.TotalPoints == ''){ this.paperData.TotalPoints = '0'; }
						break;
					case 2:
						if(this.paperData.Time == ''){ this.paperData.Time = '0'; }
						break;
					default:
						break;
				}
			},
			changPaperTitle(){
				this.$store.dispatch('CHANGE_ONE_PAPER',{paper: this.paperData});
			},
			editInfo(item, key, index){
				this.editBigTitleDialog = true;
				this.first_flag = key;
				this.second_flag = index;
				this.sectionTitle = this.global.removePtag(item.text);
			},
			confirmEidt(){
				// 提交 "答题指导语" => 一级标题索引 => 二级标题索引
				this.eidtOrDeleteOrRemove('edit', this.first_flag, this.second_flag);
			},
			deleteItem(key, index){
				this.deleteItemDialog = true;
				this.first_flag = key;
				this.second_flag = index;
			},
			confirmDelete(){
				this.eidtOrDeleteOrRemove('delete', this.first_flag, this.second_flag);
			},
			moveUpOrDown(key, index, upOrDown){
				this.eidtOrDeleteOrRemove('moveUpOrDown', key, index, upOrDown);
			},
			eidtOrDeleteOrRemove(dealType, key, index, upOrDown){
				// 编辑 删除 上移下移
				switch (dealType){
					case 'edit':
						// 编辑 '答题指导语'
						if(index == '9999'){
							this.paperData.AllQuestionArr[Number(key)].text = this.global.addPtag(this.sectionTitle);
						}else{
							this.paperData.AllQuestionArr[Number(key)].children[Number(index)].text = this.global.addPtag(this.sectionTitle);
						}
						this.$store.dispatch('CHANGE_ONE_PAPER',{paper: this.paperData});
						this.editBigTitleDialog = false;
						break;
					case 'delete':
						let firstArr = this.paperData.AllQuestionArr;
						let firstArr_new = [];
						let numFlag = 0;				// 标记 rangeMin rangeMax
						if(index == '9999'){
							// 删除 '一级题组'
							for(let i=0; i<firstArr.length; i++){
								if(i != key){
									let firstArr_temp = firstArr[i];
									if(firstArr_temp.children.length == 0){
										// 无 "二级题组"
										firstArr_temp.rangeMin = numFlag + 1;
										numFlag =  firstArr_temp.rangeMin + firstArr_temp.question.length - 1;
										firstArr_temp.rangeMax = numFlag;
									}else{
										// 有 '二级题组'
										if(firstArr_temp.children.length == 1){
											// 有一个 '二级题组'
											firstArr_temp.rangeMin = numFlag + 1;
											firstArr_temp.children[0].rangeMin = numFlag + 1;
											numFlag =  firstArr_temp.rangeMin + firstArr_temp.question.length - 1;
											firstArr_temp.rangeMax = numFlag;
											firstArr_temp.children[0].rangeMax = numFlag;
										}else{
											// 有多个 '二级题组'
											for(let j=0; j<firstArr_temp.children.length; j++){
												if(j == 0){
													firstArr_temp.rangeMin = numFlag + 1;
													firstArr_temp.children[j].rangeMin = numFlag + 1;
													numFlag =  firstArr_temp.children[j].rangeMin + firstArr_temp.children[j].question.length - 1;
													firstArr_temp.children[j].rangeMax = numFlag;
												}else if(j == firstArr_temp.children.length-1){
													firstArr_temp.children[j].rangeMin = numFlag + 1;
													numFlag =  firstArr_temp.children[j].rangeMin + firstArr_temp.children[j].question.length - 1;
													firstArr_temp.children[j].rangeMax = numFlag;
													firstArr_temp.rangeMax = numFlag;
												}else{
													firstArr_temp.children[j].rangeMin = numFlag + 1;
													numFlag =  firstArr_temp.children[j].rangeMin + firstArr_temp.children[j].question.length - 1;
													firstArr_temp.children[j].rangeMax = numFlag;
												}
											}
										}
									}
									firstArr_new.push(firstArr_temp);
								}
							}
						}else{
							// 删除 '二级题组'
							let numRange = Number(firstArr[Number(key)].children[Number(index)].rangeMax) - Number(firstArr[Number(key)].children[Number(index)].rangeMin) + 1;
							for(let i=0; i<firstArr.length; i++){
								// 一级题组 < key 值 => 题号不变
								if(i<key){
									firstArr_new.push(firstArr[i]);
								}else{
									let firstArr_temp = firstArr[i];
									if(i == key){
										// 一级题组 > key => 二级题组 length == 1 整道大题清空
										if(firstArr_temp.children.length > 1){
											// 一级题组 rangeMin rangeMax 减少 numRange 
											firstArr_temp.rangeMax = Number(firstArr_temp.rangeMax) - numRange;
											let temp_arr = []; 		// 存放 二级题组(不为删除下标的)
											for(let j=0; j<firstArr_temp.children.length; j++){
												if(j >= index){
													if(j>index){
														firstArr_temp.children[j].rangeMin = Number(firstArr_temp.children[j].rangeMin) - numRange;
														firstArr_temp.children[j].rangeMax = Number(firstArr_temp.children[j].rangeMax) - numRange;
														temp_arr.push(firstArr_temp.children[j]);
													}
												}else{
													// 二级题组 < index 题号不变	全部 push 进去
													temp_arr.push(firstArr_temp.children[j]);
												}
											}
											firstArr_temp.children = temp_arr;
											firstArr_new.push(firstArr_temp);
										}
									}else{
										// 一级题组 > key
										firstArr_temp.rangeMin = Number(firstArr_temp.rangeMin) - numRange;
										firstArr_temp.rangeMax = Number(firstArr_temp.rangeMax) - numRange;
										if(firstArr_temp.children.length == 0){
											// 二级题组 => 无 => 上面已经处理
										}else{
											// 二级题组 => 有
											for(let j=0; j<firstArr_temp.children.length; j++){
												firstArr_temp.children[j].rangeMin = Number(firstArr_temp.children[j].rangeMin) - numRange;
												firstArr_temp.children[j].rangeMax = Number(firstArr_temp.children[j].rangeMax) - numRange;
											}
										}
										firstArr_new.push(firstArr_temp);
									}
								}
							}
						}
						this.paperData.AllQuestionArr = firstArr_new;
						this.$store.dispatch('CHANGE_ONE_PAPER',{paper: this.paperData});
						this.deleteItemDialog = false;
						break;
					case 'moveUpOrDown':
						let firstItem = this.paperData.AllQuestionArr;
						if(index == '9999'){
							// 一级题组		上下移
							if(upOrDown === 'up'){
								// 上移
								if(key == 0){
									this.$message({
					          showClose: true,
					          message: '亲，已经到第一大部分啦！',
					          type: 'warning',
					          duration: 2000
					        });
								}else{
									// 非第一位上移
									let rangeUpper = firstItem[key-1].rangeMax - firstItem[key-1].rangeMin + 1; // 移动上一位的 题目 总数
									let rangeLower = firstItem[key].rangeMax - firstItem[key].rangeMin + 1; 		// 被移动 		    题目 总数
									let firstUpper = firstItem[key-1];
									let firstLower = firstItem[key];
									firstItem[key-1] = firstLower;
									firstItem[key] = firstUpper;
									firstItem[key-1].rangeMin = firstItem[key-1].rangeMin - rangeUpper;
									firstItem[key-1].rangeMax = firstItem[key-1].rangeMax - rangeUpper;
									firstItem[key].rangeMin = Number(firstItem[key].rangeMin) + rangeLower;
									firstItem[key].rangeMax = Number(firstItem[key].rangeMax) + rangeLower;
									if(firstItem[key-1].children.length > 0){
										// 有 二级题组
										for(let i=0; i<firstItem[key-1].children.length; i++){
											firstItem[key-1].children[i].rangeMin = firstItem[key-1].children[i].rangeMin - rangeUpper;
											firstItem[key-1].children[i].rangeMax = firstItem[key-1].children[i].rangeMax - rangeUpper;
										}
									}
									if(firstItem[key].children.length > 0){
										// 有 二级题组
										for(let i=0; i<firstItem[key].children.length; i++){
											firstItem[key].children[i].rangeMin = Number(firstItem[key].children[i].rangeMin) + rangeLower;
											firstItem[key].children[i].rangeMax = Number(firstItem[key].children[i].rangeMax) + rangeLower;
										}
									}
								}
							}else{
								// 下移
								if(key == firstItem.length-1){
									this.$message({
					          showClose: true,
					          message: '亲，已经到最后一大部分啦！',
					          type: 'warning',
					          duration: 2000
					        });
								}else{
									// 非最后一位下移
									let rangeUpper = firstItem[key].rangeMax - firstItem[key].rangeMin + 1; 		// 被移动 		    题目 总数
									let rangeLower = firstItem[key+1].rangeMax - firstItem[key+1].rangeMin + 1; // 移动上一位的 题目 总数
									let firstUpper = firstItem[key];
									let firstLower = firstItem[key+1];
									firstItem[key] = firstLower;
									firstItem[key+1] = firstUpper;
									firstItem[key].rangeMin = firstItem[key].rangeMin - rangeUpper;
									firstItem[key].rangeMax = firstItem[key].rangeMax - rangeUpper;
									firstItem[key+1].rangeMin = Number(firstItem[key+1].rangeMin) + rangeLower;
									firstItem[key+1].rangeMax = Number(firstItem[key+1].rangeMax) + rangeLower;
									if(firstItem[key].children.length > 0){
										// 有 二级题组
										for(let i=0; i<firstItem[key].children.length; i++){
											firstItem[key].children[i].rangeMin = firstItem[key].children[i].rangeMin - rangeUpper;
											firstItem[key].children[i].rangeMax = firstItem[key].children[i].rangeMax - rangeUpper;
										}
									}
									if(firstItem[key+1].children.length > 0){
										// 有 二级题组
										for(let i=0; i<firstItem[key+1].children.length; i++){
											firstItem[key+1].children[i].rangeMin = Number(firstItem[key+1].children[i].rangeMin) + rangeLower;
											firstItem[key+1].children[i].rangeMax = Number(firstItem[key+1].children[i].rangeMax) + rangeLower;
										}
									}
								}
							}
						}else{
							// 二级题组 	上下移
							if(upOrDown === 'up'){
								// 上移
								if(index == 0){
									// 二级题组 => 第一组
									this.$message({
					          showClose: true,
					          message: '亲，已经是组内第一部分！',
					          type: 'warning',
					          duration: 2000
					        });
								}else{
									// 二级题组 => 非第一组 上移
									let rangeUpper = firstItem[key].children[index-1].rangeMax - firstItem[key].children[index-1].rangeMin + 1; // 移动上一位的 题目 总数
									let rangeLower = firstItem[key].children[index].rangeMax - firstItem[key].children[index].rangeMin + 1; 		// 被移动 		    题目 总数
									let firstUpper = firstItem[key].children[index-1];
									let firstLower = firstItem[key].children[index];
									firstItem[key].children[index-1] = firstLower;
									firstItem[key].children[index] = firstUpper;
									firstItem[key].children[index-1].rangeMin = firstItem[key].children[index-1].rangeMin - rangeUpper;
									firstItem[key].children[index-1].rangeMax = firstItem[key].children[index-1].rangeMax - rangeUpper;
									firstItem[key].children[index].rangeMin = Number(firstItem[key].children[index].rangeMin) + rangeLower;
									firstItem[key].children[index].rangeMax = Number(firstItem[key].children[index].rangeMax) + rangeLower;
								}
							}else{
								// 下移
								if(index == firstItem[key].children.length - 1){
									// 二级题组 => 最后一组
									this.$message({
					          showClose: true,
					          message: '亲，已经是组内最后一部分！',
					          type: 'warning',
					          duration: 2000
					        });
								}else{
									// 二级题组 => 非最后一组 下移
									let rangeUpper = firstItem[key].children[index].rangeMax - firstItem[key].children[index].rangeMin + 1; 		// 被移动 		    题目 总数
									let rangeLower = firstItem[key].children[index+1].rangeMax - firstItem[key].children[index+1].rangeMin + 1; // 移动上一位的 题目 总数
									let firstUpper = firstItem[key].children[index];
									let firstLower = firstItem[key].children[index+1];
									firstItem[key].children[index] = firstLower;
									firstItem[key].children[index+1] = firstUpper;
									firstItem[key].children[index].rangeMin = firstItem[key].children[index].rangeMin - rangeUpper;
									firstItem[key].children[index].rangeMax = firstItem[key].children[index].rangeMax - rangeUpper;
									firstItem[key].children[index+1].rangeMin = Number(firstItem[key].children[index+1].rangeMin) + rangeLower;
									firstItem[key].children[index+1].rangeMax = Number(firstItem[key].children[index+1].rangeMax) + rangeLower;
								}
							}
						}
						this.paperData.AllQuestionArr = firstItem;
						this.$store.dispatch('CHANGE_ONE_PAPER',{paper: this.paperData});
						break;
					default:
						break;
				}
			},
			listenChildData(data){
				switch (data.componentName){
					case 'Core':
						this.paperData.Core = data.valueCode;
						break;
					case 'Synchronization':
						this.paperData.Synchronization = data.valueCode;
						break;
					case 'Douthree':
						this.paperData.Douthree = data.valueCode;
						break;
					case 'IsHide':
						this.paperData.IsHide = data.valueCode;
						break;
					default:
						break;
				}
			},
			syncItemProperty(){
			  for(let i = 0, len = this.paperData.AllQuestionArr.length; i < len; i++){
			    if(this.paperData.AllQuestionArr[i].children.length == 0){
			      let qLength = this.paperData.AllQuestionArr[i].question.length
			      for(let j = 0; j < qLength; j++){
			        this.paperData.AllQuestionArr[i].question[j].Synchronization = this.paperData.Synchronization
              this.paperData.AllQuestionArr[i].question[j].Douthree = this.paperData.Douthree
              this.paperData.AllQuestionArr[i].question[j].Hide = this.paperData.IsHide
              this.paperData.AllQuestionArr[i].question[j].Core = this.paperData.Core
							if(this.paperData.AllQuestionArr[i].question[j].SubQuestionList.length > 0){
			          let subQLength = this.paperData.AllQuestionArr[i].question[j].SubQuestionList.length
								for(let k = 0; k < subQLength; k ++){
                  this.paperData.AllQuestionArr[i].question[j].SubQuestionList[k].Synchronization = this.paperData.Synchronization
                  this.paperData.AllQuestionArr[i].question[j].SubQuestionList[k].Douthree = this.paperData.Douthree
                  this.paperData.AllQuestionArr[i].question[j].SubQuestionList[k].Hide = this.paperData.IsHide
                  this.paperData.AllQuestionArr[i].question[j].SubQuestionList[k].Core = this.paperData.Core
								}
							}
						}
					}else{
			      let briefLength = this.paperData.AllQuestionArr[i].children.length
						for(let j = 0; j < briefLength; j++){
              let qLength = this.paperData.AllQuestionArr[i].children[j].question.length
							for(let k = 0; k < qLength; k++){
                this.paperData.AllQuestionArr[i].children[j].question[k].Synchronization = this.paperData.Synchronization
                this.paperData.AllQuestionArr[i].children[j].question[k].Douthree = this.paperData.Douthree
                this.paperData.AllQuestionArr[i].children[j].question[k].Hide = this.paperData.IsHide
                this.paperData.AllQuestionArr[i].children[j].question[k].Core = this.paperData.Core
								if(this.paperData.AllQuestionArr[i].children[j].question[k].SubQuestionList.length > 0){
                  let subQLength = this.paperData.AllQuestionArr[i].children[j].question[k].SubQuestionList.length
									for(let p = 0; p < subQLength; p ++){
                    this.paperData.AllQuestionArr[i].children[j].question[k].SubQuestionList[p].Synchronization = this.paperData.Synchronization
                    this.paperData.AllQuestionArr[i].children[j].question[k].SubQuestionList[p].Douthree = this.paperData.Douthree
                    this.paperData.AllQuestionArr[i].children[j].question[k].SubQuestionList[p].Hide = this.paperData.IsHide
                    this.paperData.AllQuestionArr[i].children[j].question[k].SubQuestionList[p].Core = this.paperData.Core
									}
								}
							}
						}
					}
				}
			},
			// 提交所有更改
			submitChange(){
			  this.syncItemProperty()
				this.$store.dispatch('CHANGE_ONE_PAPER',{paper: this.paperData});
				this.$message({
          showClose: true,
          message: '提交数据并同步！',
          type: 'success',
          duration: 3000
        });
			},
			// 展开收起方法
			openOrNotChild(itemMain){
				itemMain.isOpen = !Boolean(itemMain.isOpen);
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
					margin: 20px 3% 0px;
					min-height: 100px;
					padding: 24px;
					box-sizing: border-box;
					.itemSelect{
						color: #555555;
						font-size: 14px;
						margin: 10px 0px;
						.notice{
							font-size: 12px;
							margin-left: 5px;
							color: #41C0BC;
						}
					}
				}
				.w_60p{
					width: 60%;
					margin: 20px 3% 0px 0;
					min-height: 100px;
					padding: 24px;
					box-sizing: border-box;
					.itemSelect{
						color: #555555;
						font-size: 14px;
						margin: 10px 0px;
						.notice{
							font-size: 12px;
							margin-left: 5px;
							color: #41C0BC;
						}
					}
				}
				.subBottom{
					height: 50px;
					margin: 0 auto;
					line-height: 50px;
					clear: both;
				}
				
				.ul_common{
					list-style: none;
					width: 100% ;
					padding: 0 20px;
					margin: 0;
					box-sizing: border-box;
					height: 35px; 
					line-height: 35px;
					font-size: 14px;
					color: #555;
				}
				
				/* 试题结构展示 => 表头 */
				.ul_section_title{
					height: 50px; line-height: 50px;
					li{ float: left; text-align: center; color: #41C0BC; font-weight: bold; }
					li:first-child{ width: 5%; }
					li:nth-child(2){ width: 70%;}
					li:nth-child(3){ width: 10%; }
					li:last-child{ width: 15%; }
				}
				/* 试题结构展示 => 暂无数据 */
				.ul_section_empty{
					border-top: 1px solid #F0F0F0; border-bottom: 1px solid #F0F0F0; 
					li{ color: #41C0BC; letter-spacing: 2px; word-spacing: 2px; width: 100%; text-align: center; }
				}
				/* 试题结构展示 => 主干内容 */
				.ul_section_content{
					height: auto;
					li:first-child{
						border-top: 1px solid #F0F0F0;
					}
					li{ 
						border-bottom: 1px solid #F0F0F0;
						min-height: 35px;
						span{ float: left; text-align: center; display: block; height: 35px;}
						span:nth-of-type(4n+1){ 
							width: 5%; 
							text-align: left; 
							text-indent: 1.5em;
							cursor: pointer; 
							img{ height: 9px; float: right; margin-top: 12px; }
						}
						span:nth-of-type(4n+2){ width: 70%; padding: 0 20px; box-sizing: border-box;
							p{ width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-align: left; }
						}
						span:nth-of-type(4n+3){ width: 10%; }
						span:nth-of-type(4n+4){ 
							width: 15%;
							text-align: center;
							margin: 0 auto;
							i{
								color: #41C0BC;
								line-height: 35px;
								margin: 0 5px;
								cursor: pointer;
								font-style: normal;
							}
						}
						ul.ul_sub_section{
							width: 100%;
							height: auto;
							padding: 0;
							margin: 0;
							clear: both;
							list-style: none;
							li{
								height: 35px;
								line-height: 35px;
								width: 100%;
								border-bottom: none;
								border-top: 1px solid #F0F0F0;
								span{
									font-size: 12px;
								}
							}
						}
					}
					li:hover{
						background: #BAE8E7;
					}
				}
				
			}
		}
	}
	.el-message-box__content{
		
	}
	.paperAttributeEdit-view {
		flex: 1;
		overflow: hidden;
	}
</style>