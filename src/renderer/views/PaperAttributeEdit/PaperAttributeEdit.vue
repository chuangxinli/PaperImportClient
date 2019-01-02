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
				  v-model="paperName">
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
					<el-table :data="tableData" stripe class="table_self_white" v-show="!isMainSelect">
	          <el-table-column type="index" label="序号" width="100" ></el-table-column>
	          <el-table-column prop="paperName" label="题型" width="150"></el-table-column>
	          <el-table-column prop="gradeSubject" label="答题指导语" width=""></el-table-column>
	          <el-table-column prop="bookVersion" label="包含试题序号" width="150"></el-table-column>
	          <el-table-column
	            prop="address"
	            label="操作"
	            width="300">
	            <template slot-scope="scope">
	            	<span class="el-icon-edit" @click='editInfo(scope.row)'></span>
	            	<span class="el-icon-sort-up" @click='upTowards(scope.row)'></span>
	            	<span class="el-icon-sort-down" @click='downTowards(scope.row)'></span>
	            	<span class="el-icon-delete" @click='deleteItem(scope.row)'></span>
	      			</template>
	          </el-table-column>
	          
	        </el-table>
					<div class="subBottom text_center" v-show="!isMainSelect">
						<div class="btn-medium-self-blue" @click="addItem()">新增</div>
					</div>
				</div>
				
				
				
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
				paperName: '2016-2017学年天津市南开区高二期',
				difficulty: '0.25',
				isMainSelect: true,
				tableData:[
					{ paperName: '选择题', gradeSubject:'高中化学', bookVersion:'1-10', useStatus:'1/4' },
					{ paperName: '填空题', gradeSubject:'高中化学', bookVersion:'11-15', useStatus:'1/4' },
					{ paperName: '简答题', gradeSubject:'高中化学', bookVersion:'15-30', useStatus:'1/4' }
				]
			}
		},
		mounted() {

		},
		methods: {
			alterMainOrSub(){
				this.isMainSelect = !this.isMainSelect;
			},
			goBack(){
				alert('返回上一级！');
			},
			editInfo(row){
				alert('稍后请编辑！');	
			},
			upTowards(row){
				alert('上移一行！');
			},
			downTowards(row){
				alert('下移一行！');
			},
			deleteItem(row){
				alert('删除这一行！');
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