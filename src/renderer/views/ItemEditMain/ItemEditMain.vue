<!-- 试题编辑主页面 -->
<template>
	<el-scrollbar class="itemEditMain-view scroll-page">
		<div class="itemEditMain">
			<div class="class-list mt-5">
				
				<p class="guideBar">
					<img src="../../assets/images/process.png"/>
					<a @click="changeRouterByName('PaperNotYet')">待处理试卷</a> 》 
					<a href="javascript: void(0);">试题编辑</a>
					<span class="fRight blueFont">&nbsp;题目 “上下移” 不能跨 “大题” 或 “小节” 。</span>
					<span class="el-icon-info blueFont fRight"></span>
				</p>
				
				<el-table :data="itemList" stripe class="table_self_blue">
          <el-table-column prop="group_name" label="序号" width="150"></el-table-column>
          <el-table-column label="题干" width="">
          	<template slot-scope="scope">
			        <p class="ItemTitle" v-html="scope.row.Text"></p>
			      </template>
          </el-table-column>
          
          <!-- 应用题型标签 -->
          <el-table-column prop="UseTagName" label="应用标签" width="100"></el-table-column>
          <el-table-column label="试题类型" width="80">
          	<template slot-scope="scope">
			        <p class="ItemTitle" v-if="scope.row.Type == 1">单选题</p>
			        <p class="ItemTitle" v-else-if="scope.row.Type == 2">多选题</p>
			        <p class="ItemTitle" v-else-if="scope.row.Type == 3">填空题</p>
			        <p class="ItemTitle" v-else-if="scope.row.Type == 4">简答题</p>
			        <p class="ItemTitle" v-else-if="scope.row.Type == 5">判断题</p>
			        <p class="ItemTitle" v-else>题主题</p>
			      </template>
          </el-table-column>
          <el-table-column label="是否关联主知识点" width="80">
          	<template slot-scope="scope">
			        <p class="ItemTitle blueFont" v-if="scope.row.Knowledge_main_points">是</p>
			        <p class="ItemTitle" v-else>否</p>
			      </template>
          </el-table-column>
          <el-table-column label="是否关联学科能力" width="80">
          	<template slot-scope="scope">
			        <p class="ItemTitle blueFont" v-if="scope.row.Ability">是</p>
			        <p class="ItemTitle" v-else>否</p>
			      </template>
          </el-table-column>
          <el-table-column label="是否关联思想方法" width="80">
          	<template slot-scope="scope">
			        <p class="ItemTitle blueFont" v-if="scope.row.Thoughtway">是</p>
			        <p class="ItemTitle" v-else>否</p>
			      </template>
          </el-table-column>
        	<el-table-column
	          prop="address"
	          label="操作"
	          width="110">
	          <template slot-scope="scope">
	          	<span class="el-icon-edit" @click='editItem(scope.row)'></span>
	          	<i class="cursor_pointer" @click='moveUpOrDown(scope.row,"up")'><img src="../../assets/images/MoveUp.png"/></i>
			        <i class="cursor_pointer" @click='moveUpOrDown(scope.row,"down")'><img src="../../assets/images/MoveDown.png"/></i>
	          	<span class="el-icon-delete" @click='deleteItem(scope.row)'></span>
	     			</template>
	        </el-table-column>
        </el-table>
        
        <!-- 删除 "试题" 弹窗 -->
				<el-dialog title="试题删除" :visible.sync="deleteItemDialog" width="420px">
				  <div class="el-message-box__content">
				  	<div class="el-message-box__status el-icon-warning"></div>
				  	<div class="el-message-box__message"><p>您正在删除 <span class="redFont">“第{{this.itemDelete.Num}}题”</span> ，删除试题将<span class="redFont">“不可恢复”</span> ，且 <span class="redFont">“不可添加新试题”</span>，是否继续 ？</p></div>
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
	export default {
		data() {
			return {
				paperData: {
					AllQuestionArr: [],		// 试卷结构大数组
				},
				itemList:[],
				itemDelete: {Num:''},		// 将被删除的题
				deleteItemDialog: false	// 试题删除 弹窗
			}
		},
		mounted() {
			this.paperData = JSON.parse(this.getLocal('paperData'));
			this.initItemList();
		},
		methods: {
			// 初始化数据
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
									question[k].isSelected = false;								// 试题 			默认不被选中
									
									// 学科能力 思想方法 应用标签 
									if(question[k].Ability == ''){
										question[k].AbilityName = '';
										question[k].AbilityCodeList = [];
										question[k].AbilityNameList = [];
									}
									if(question[k].Thoughtway == ''){
										question[k].ThoughtwayName = '';
										question[k].ThoughtwayCodeList = [];
										question[k].ThoughtwayNameList = [];
									}
									if(question[k].UseTag == ''){
										question[k].UseTagName = '';
										question[k].UseTagCodeList = [];
										question[k].UseTagNameList = [];
									}
									if(question[k].Examination_points.length == 0){
										question[k].Knowledge_points_show = [];
									}else{
										let Knowledge_points_show = JSON.parse(JSON.stringify(question[k].Examination_points));
										for(let y=0; y<question[k].Examination_points.length; y++){
											Knowledge_points_show[y] = {};
											if(question[k].Knowledge_main_points == question[k].Examination_points[y]){
												Knowledge_points_show[y].isMain = true;
											}else{
												Knowledge_points_show[y].isMain = false;
											}
											Knowledge_points_show[y].pointId = question[k].Examination_points[y];
											Knowledge_points_show[y].pointName = question[k].ExaminationPointsName[y];
										}
										question[k].Knowledge_points_show = JSON.parse(JSON.stringify(Knowledge_points_show));
									}
									
									question[k].firstIndex = i;										// 一级题组 	指向
									question[k].secondIndex = j;									// 二级题组 	指向
									
									// 题目所在的 一级题组二级题组 中文
									question[k].group_name = question[k].Num + '（' + this.global.numToChinese(i+1) + '、' + String(i+1) + '.' + String(j+1) +'）';
									
									// 题主题情况
									if(question[k].SubQuestionList && question[k].SubQuestionList.length > 0){
										for(let m=0; m<question[k].SubQuestionList.length; m++){
											question[k].SubQuestionList[m].Combination_index = m+1;
											if(question[k].SubQuestionList[m].Ability == ''){
												question[k].SubQuestionList[m].AbilityName = '';
												question[k].SubQuestionList[m].AbilityCodeList = [];
												question[k].SubQuestionList[m].AbilityNameList = [];
											}
											if(question[k].SubQuestionList[m].Thoughtway == ''){
												question[k].SubQuestionList[m].ThoughtwayName = '';
												question[k].SubQuestionList[m].ThoughtwayCodeList = [];
												question[k].SubQuestionList[m].ThoughtwayNameList = [];
											}
											if(question[k].SubQuestionList[m].UseTag == ''){
												question[k].SubQuestionList[m].UseTagName = '';
												question[k].SubQuestionList[m].UseTagCodeList = [];
												question[k].SubQuestionList[m].UseTagNameList = [];
											}
											if(question[k].SubQuestionList[m].Examination_points.length == 0){
												question[k].SubQuestionList[m].Knowledge_points_show = [];
											}else{
												var Knowledge_points_show_sub = [];
												for(let y=0; y<question[k].SubQuestionList[m].Examination_points.length; y++){
													let Knowledge_points_show_new = {
														isMain: false,
														pointId: '',
														pointName: ''
													};
													if(question[k].SubQuestionList[m].Knowledge_main_points == question[k].SubQuestionList[m].Examination_points[y]){
														Knowledge_points_show_new.isMain = true;
													}else{
														Knowledge_points_show_new.isMain = false;
													}
													Knowledge_points_show_new.pointId = question[k].SubQuestionList[m].Examination_points[y];
													Knowledge_points_show_new.pointName = question[k].SubQuestionList[m].ExaminationPointsName[y];
													Knowledge_points_show_sub.push(Knowledge_points_show_new);
												}
												question[k].SubQuestionList[m].Knowledge_points_show = JSON.parse(JSON.stringify(Knowledge_points_show_sub));
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
								question[k].isSelected = false;								// 试题 			默认不被选中
								
								// 学科能力 思想方法 应用标签 
								if(question[k].Ability == ''){
									question[k].AbilityName = '';
									question[k].AbilityCodeList = [];
									question[k].AbilityNameList = [];
								}
								if(question[k].Thoughtway == ''){
									question[k].ThoughtwayName = '';
									question[k].ThoughtwayCodeList = [];
									question[k].ThoughtwayNameList = [];
								}
								if(question[k].UseTag == ''){
									question[k].UseTagName = '';
									question[k].UseTagCodeList = [];
									question[k].UseTagNameList = [];
								}
								if(question[k].Examination_points.length == 0){
									question[k].Knowledge_points_show = [];
								}else{
									let Knowledge_points_show = JSON.parse(JSON.stringify(question[k].Examination_points));
									for(let y=0; y<question[k].Examination_points.length; y++){
										Knowledge_points_show[y] = {};
										if(question[k].Knowledge_main_points == question[k].Examination_points[y]){
											Knowledge_points_show[y].isMain = true;
										}else{
											Knowledge_points_show[y].isMain = false;
										}
										Knowledge_points_show[y].pointId = question[k].Examination_points[y];
										Knowledge_points_show[y].pointName = question[k].ExaminationPointsName[y];
									}
									question[k].Knowledge_points_show = JSON.parse(JSON.stringify(Knowledge_points_show));
								}
								
								question[k].firstIndex = i;										// 一级题组 	指向
								question[k].secondIndex = 9999;								// 二级题组 	指向
								// 题目所在的 一级题组二级题组 中文
								question[k].group_name = question[k].Num + '（' + this.global.numToChinese(i+1) + '）';
								// 题主题情况																		// 小题顺序
								if(question[k].SubQuestionList && question[k].SubQuestionList.length > 0){
									for(let m=0; m<question[k].SubQuestionList.length; m++){
										question[k].SubQuestionList[m].Combination_index = m+1;
										if(question[k].SubQuestionList[m].Ability == ''){
											question[k].SubQuestionList[m].AbilityName = '';
											question[k].SubQuestionList[m].AbilityCodeList = [];
											question[k].SubQuestionList[m].AbilityNameList = [];
										}
										if(question[k].SubQuestionList[m].Thoughtway == ''){
											question[k].SubQuestionList[m].ThoughtwayName = '';
											question[k].SubQuestionList[m].ThoughtwayCodeList = [];
											question[k].SubQuestionList[m].ThoughtwayNameList = [];
										}
										if(question[k].SubQuestionList[m].UseTag == ''){
											question[k].SubQuestionList[m].UseTagName = '';
											question[k].SubQuestionList[m].UseTagCodeList = [];
											question[k].SubQuestionList[m].UseTagNameList = [];
										}
										if(question[k].SubQuestionList[m].Examination_points.length == 0){
											question[k].SubQuestionList[m].Knowledge_points_show = [];
										}else{
											var Knowledge_points_show_sub = [];
											for(let y=0; y<question[k].SubQuestionList[m].Examination_points.length; y++){
												let Knowledge_points_show_new = {
													isMain: false,
													pointId: '',
													pointName: ''
												};
												if(question[k].SubQuestionList[m].Knowledge_main_points == question[k].SubQuestionList[m].Examination_points[y]){
													Knowledge_points_show_new.isMain = true;
												}else{
													Knowledge_points_show_new.isMain = false;
												}
												Knowledge_points_show_new.pointId = question[k].SubQuestionList[m].Examination_points[y];
												Knowledge_points_show_new.pointName = question[k].SubQuestionList[m].ExaminationPointsName[y];
												Knowledge_points_show_sub.push(Knowledge_points_show_new);
											}
											question[k].SubQuestionList[m].Knowledge_points_show = JSON.parse(JSON.stringify(Knowledge_points_show_sub));
										}
									}
								}
								this.itemList.push(question[k]);
							}
						}
					}
					// 将 paperData.AllQuestionArr 提交到 vuex
					this.$store.dispatch('CHANGE_ONE_PAPER',{paper: this.paperData});
				}
			},
			editItem(row){
				if(row.secondIndex == 9999){
					// 一级题组 题目
					this.paperData.AllQuestionArr[Number(row.firstIndex)].question[Number(row.index_group)].isSelected = true;
				}else{
					// 二级题组 题目
					this.paperData.AllQuestionArr[Number(row.firstIndex)].children[Number(row.secondIndex)].question[Number(row.index_group)].isSelected = true;
				}
				this.setLocal('paperData',JSON.stringify(this.paperData));
				this.$router.push({
					name: 'ItemEditSingle'
				})
			},
			deleteItem(row){
				this.itemDelete = row;
				this.deleteItemDialog = true;
			},
			// 删除 试题开始
			confirmDelete(){
				let firstIndex = this.itemDelete.firstIndex;
				let secondIndex= this.itemDelete.secondIndex;
				let itemNumber = this.itemDelete.Num;
				if(secondIndex === 9999){
					// 一级题组 	试题 		删除
					if(this.paperData.AllQuestionArr[firstIndex].question.length == 1){
						// 一级题组 => 只有一道试题 => 整个一级题组删除
						let firstItem = this.paperData.AllQuestionArr;
						let firstItem_new = [];
						for(let i=0; i<firstItem.length; i++){
							if(i != firstIndex){
								firstItem_new.push(firstItem[i]);
							}
						}
						this.paperData.AllQuestionArr = firstItem_new;
						this.initItemList();
					}else{
						// 一级题组 	有多道试题
						let firstItem = this.paperData.AllQuestionArr[firstIndex].question;
						let firstItem_new = [];
						for(let i=0; i<firstItem.length; i++){
							if(firstItem[i].Num != itemNumber){
								firstItem_new.push(firstItem[i]);
							}
						}
						this.paperData.AllQuestionArr[firstIndex].question = firstItem_new;
						this.initItemList();
					}
				}else{
					// 二级题组 	试题 		删除
					if(this.paperData.AllQuestionArr[firstIndex].children[secondIndex].question.length == 1){
						// 1: 二级题组有一道题
						if(this.paperData.AllQuestionArr[firstIndex].children.length == 1){
							// 1.1 一级题组中只有	1个	二级题组
							let firstItem = this.paperData.AllQuestionArr;
							let firstItem_new = [];
							for(let i=0; i<firstItem.length; i++){
								if(i != firstIndex){
									firstItem_new.push(firstItem[i]);
								}
							}
							this.paperData.AllQuestionArr = firstItem_new;
							this.initItemList();
						}else{
							// 1.2 一级题组中有		多个	二级题组
							let firstItem = this.paperData.AllQuestionArr[firstIndex].children;
							let firstItem_new = [];
							for(let i=0; i<firstItem.length; i++){
								if(i != secondIndex){
									firstItem_new.push(firstItem[i]);
								}
							}
							this.paperData.AllQuestionArr[firstIndex].children = firstItem_new;
							this.initItemList();
						}
					}else{
						// 2: 二级题组有多道题
						let firstItem = this.paperData.AllQuestionArr[firstIndex].children[secondIndex].question;
						let firstItem_new = [];
						for(let i=0; i<firstItem.length; i++){
							if(firstItem[i].Num != itemNumber){
								firstItem_new.push(firstItem[i]);
							}
						}
						this.paperData.AllQuestionArr[firstIndex].children[secondIndex].question = firstItem_new;
						this.initItemList();
					}
				}
				this.deleteItemDialog = false;
				this.$message({
					showClose: true,
					message: '删除 第' +itemNumber+ '题 成功！',
					type: 'success',
					duration: 2000
				});
			},
			// 删除 试题结束
			moveUpOrDown(row,moveType){
				let moveMin = Number(row.moveMin);
				let moveMax = Number(row.moveMax);
				let itemNum = Number(row.Num);
				let firstIndex = Number(row.firstIndex);
				let secondIndex = Number(row.secondIndex);
				let index_group = Number(row.index_group);
				switch (moveType){
					case 'up':
						// 上移
						if(itemNum>moveMin){
							if(row.secondIndex == 9999){
								// 一级题组 题目上移
								let question = this.paperData.AllQuestionArr[firstIndex].question;
								let itemUpper = question[index_group-1];
								let itemLower = question[index_group];
								question[index_group-1] = itemLower;
								question[index_group] = itemUpper;
								this.paperData.AllQuestionArr[firstIndex].question = question;
								this.initItemList();
								this.$message({
									showClose: true,
									message: '成功将 “第' +itemNum+ '题” 移动成 “第' +String(itemNum-1)+'题” ！',
									type: 'success',
									duration: 3000
								});
							}else{
								// 二级题组 题目上移
								let question = this.paperData.AllQuestionArr[firstIndex].children[secondIndex].question;
								let itemUpper = question[index_group-1];
								let itemLower = question[index_group];
								question[index_group-1] = itemLower;
								question[index_group] = itemUpper;
								this.paperData.AllQuestionArr[firstIndex].children[secondIndex].question = question;
								this.initItemList();
								this.$message({
									showClose: true,
									message: '成功将 “第' +itemNum+ '题” 移动成 “第' +String(itemNum-1)+'题” ！',
									type: 'success',
									duration: 3000
								});
							}
						}else{
							// 提示语
							if(row.secondIndex === 9999){
								// 没有 二级题组
								this.$message({
									showClose: true,
									message: '已经是 “第' +this.global.numToChinese(Number(row.firstIndex)+1)+ '大题” 的 “第一题” ，不能在向上移动了！',
									type: 'warning',
									duration: 3000
								});
							}else{
								// 有	 二级题组
								this.$message({
									showClose: true,
									message: '已经是 “第' +this.global.numToChinese(Number(row.firstIndex)+1)+ '大题” 的 “第' +this.global.numToChinese(Number(row.secondIndex)+1)+ '小节” 的 “第一题” ，不能在向上移动了！',
									type: 'warning',
									duration: 3000
								});
							}
						}
						break;
					case 'down':
						// 下移
						if(itemNum<moveMax){
							if(row.secondIndex == 9999){
								// 一级题组 题目下移
								let question = this.paperData.AllQuestionArr[firstIndex].question;
								let itemUpper = question[index_group];
								let itemLower = question[index_group+1];
								question[index_group] = itemLower;
								question[index_group+1] = itemUpper;
								this.paperData.AllQuestionArr[firstIndex].question = question;
								this.initItemList();
								this.$message({
									showClose: true,
									message: '成功将 “第' +itemNum+ '题” 移动成 “第' +String(itemNum+1)+'题” ！',
									type: 'success',
									duration: 3000
								});
							}else{
								// 二级题组 题目下移
								let question = this.paperData.AllQuestionArr[firstIndex].children[secondIndex].question;
								let itemUpper = question[index_group];
								let itemLower = question[index_group+1];
								question[index_group] = itemLower;
								question[index_group+1] = itemUpper;
								this.paperData.AllQuestionArr[firstIndex].children[secondIndex].question = question;
								this.initItemList();
								this.$message({
									showClose: true,
									message: '成功将 “第' +itemNum+ '题” 移动成 “第' +String(itemNum+1)+'题” ！',
									type: 'success',
									duration: 3000
								});
							}
						}else{
							// 提示语
							if(row.secondIndex == 9999){
								this.$message({
									showClose: true,
									message: '已经是 “第' +this.global.numToChinese(Number(row.firstIndex)+1)+ '大题” 的 “最后一题” ，不能在向上移动了！',
									type: 'warning',
									duration: 3000
								});
							}else{
								this.$message({
									showClose: true,
									message: '已经是 “第' +this.global.numToChinese(Number(row.firstIndex)+1)+ '大题” 的 “第' +this.global.numToChinese(Number(row.secondIndex)+1)+ '小节” 的 “最后一题” ，不能在向下移动了！',
									type: 'warning',
									duration: 3000
								});
							}
						}
						break;
					default:
						break;
				}
			},
			// 上移下移结束
			
			
		}
	}
</script>

<style lang="scss" scoped>
	.scroll-page {
		overflow: hidden;
		/deep/ .el-scrollbar__wrap {
			overflow-x: hidden;
			.itemEditMain{
				padding: 20px;
				.warnInfo{
					letter-spacing: 0.5px;
				}
				.el-table__row{
					td:first-child div{
						text-align: left;
					}
					td:nth-child(2) div{
						text-align: left;
						p.ItemTitle { height: 50px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
							*{ overflow: hidden; text-overflow: ellipsis; line-height: 50px;}
						}
					}
				}
				
			}
		}
	}
	.itemEditMain-view {
		flex: 1;
		overflow: hidden;
	}
</style>