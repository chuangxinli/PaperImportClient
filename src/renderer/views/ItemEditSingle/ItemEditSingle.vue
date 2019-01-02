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
				  v-model="paperName">
				</el-input>
				<div class="btn-medium-self-blue fRight ml-20" @click="goBack()">返回</div>
				
				<!-- 题号部分 -->
				<ul class="itemNumList">
					<li class="active" @click="SingleItemInfo()">1</li>
					<li @click="SingleItemInfo()">2</li>
					<li @click="SingleItemInfo()">3</li>
					<li @click="SingleItemInfo()">4</li>
					<li @click="SingleItemInfo()">5</li>
					<li @click="SingleItemInfo()">6</li>
					<li @click="SingleItemInfo()">7</li>
					<li @click="SingleItemInfo()">8</li>
					<li @click="SingleItemInfo()">9</li>
					<li @click="SingleItemInfo()">10</li>
					<li @click="SingleItemInfo()">11</li>
					<li @click="SingleItemInfo()">12</li>
					<li @click="SingleItemInfo()">13</li>
					<li @click="SingleItemInfo()">14</li>
					<li @click="SingleItemInfo()">15</li>
					<li @click="SingleItemInfo()">16</li>
					<li @click="SingleItemInfo()">17</li>
					<li @click="SingleItemInfo()">18</li>
					<li @click="SingleItemInfo()">19</li>
					<li @click="SingleItemInfo()">20</li>
					<li @click="SingleItemInfo()">21</li>
					<li @click="SingleItemInfo()">22</li>
					<li @click="SingleItemInfo()">23</li>
					<li @click="SingleItemInfo()">24</li>
					<li @click="SingleItemInfo()">25</li>
					<li @click="SingleItemInfo()">26</li>
					<li @click="SingleItemInfo()">27</li>
					<li @click="SingleItemInfo()">28</li>
					<li @click="SingleItemInfo()">29</li>
					<li @click="SingleItemInfo()">30</li>
					<li @click="SingleItemInfo()">31</li>
				</ul>
				
				<div class="leftMarkBox">
					
					<!-- 基本标签 -->
					<div class="box-left">
						<div class="boderRadiusBox commonMarkBox fLeft">
							<div class="headerSpread">
								基本标签
							</div>
							<el-checkbox class="checkbox-self block ml-30" v-model="isCore">核心题库</el-checkbox>
							<el-checkbox class="checkbox-self block" v-model="isSynh">同步试题</el-checkbox>
							<el-checkbox class="checkbox-self block" v-model="isDthree">双三试题</el-checkbox>
							<el-checkbox class="checkbox-self block" v-model="isHidden">是否隐藏</el-checkbox>
							<el-checkbox class="checkbox-self block" v-model="isRight">是否正确</el-checkbox>
							<el-checkbox class="checkbox-self block" v-model="isTZT">是否题主题</el-checkbox>
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
								  v-model="seperation">
								</el-input>
								<div class="inline_block notice"></div>
						  </div>
							<div class="itemSelect">
								<div class="inline_block w_50">难度值</div>
							  <el-input class="w_100 input-search-self"
									placeholder="难度值"
								  prefix-icon="el-icon-edit"
								  v-model="difficulty">
								</el-input>
						  </div>
						  
						  <div class="itemSelect">
								<div class="inline_block w_50">答题时间</div>
							  <el-input class="w_100 input-search-self"
									placeholder="答题时间"
								  prefix-icon="el-icon-edit"
								  v-model="duration">
								</el-input>
						  </div>
						</div>
					
					</div>
					<!-- 核心标签 -->
					<div class="boderRadiusBox coreMarkBox fRight">
						<div class="headerSpread">
							核心标签
						</div>
						
						<div class="scroll-container">
							<!-- 知识点列表(暂无) -->
							<p class="coreMarkTitle">知识点  <i class="el-icon-delete"></i></p>
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
						  <el-checkbox class="checkbox-self ml-30 w_100" v-model="isCore">空间想象能力</el-checkbox>
						  <el-checkbox class="checkbox-self ml-30 w_100"  v-model="isCore">运算求解能力</el-checkbox>
						  <el-checkbox class="checkbox-self ml-30 w_100" v-model="isCore">抽象概括能力</el-checkbox>
						  <el-checkbox class="checkbox-self ml-30 w_100" v-model="isCore">应用能力</el-checkbox>
						  <el-checkbox class="checkbox-self ml-30 w_100" v-model="isCore">创新意识</el-checkbox>
						  <el-checkbox class="checkbox-self ml-30 w_100" v-model="isCore">应用意识</el-checkbox>
						  <el-checkbox class="checkbox-self ml-30 w_100" v-model="isCore">动手思考能力</el-checkbox>
						  <el-checkbox class="checkbox-self ml-30 w_100" v-model="isCore">抽象剥离能力</el-checkbox>
						  <el-checkbox class="checkbox-self ml-30 w_100" v-model="isCore">创造力</el-checkbox>
						  
						  <!-- 思想方法 box -->
						  <p class="coreMarkTitle">思想方法</p>
						  <el-checkbox class="checkbox-self ml-30 w_100" v-model="isCore">函数思想</el-checkbox>
						  <el-checkbox class="checkbox-self ml-30 w_100" v-model="isCore">数相结合思想</el-checkbox>
						  <el-checkbox class="checkbox-self ml-30 w_100" v-model="isCore">转化与化归</el-checkbox>
						  <el-checkbox class="checkbox-self ml-30 w_100" v-model="isCore">分类讨论</el-checkbox>
						  <el-checkbox class="checkbox-self ml-30 w_100" v-model="isCore">抽象剥离</el-checkbox>
						  <el-checkbox class="checkbox-self ml-30 w_100" v-model="isCore">类比思想</el-checkbox>
						  <el-checkbox class="checkbox-self ml-30 w_100" v-model="isCore">举一反三思想</el-checkbox>
						  <el-checkbox class="checkbox-self ml-30 w_100" v-model="isCore">创造与毁灭</el-checkbox>
						  <el-checkbox class="checkbox-self ml-30 w_100" v-model="isCore">新生与重生</el-checkbox>
					  
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
				paperName: "2016-2017学年云南省玉溪市峨山县",
				isCore: false,						// 是否是核心
				isSynh: false,					// 是否是同步
				isDthree: false,				// 是否是双三
				isHidden: false,				// 是否是隐藏
				isRight: false,					// 是否是正确
				isTZT: true,						// 是否是题主题
				
				seperation: '0.15',			// 区分度
				difficulty: '0.85',			// 难度值
				duration:   '120',			// 答题时长
				
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
			editItem(row){
				alert('稍后请编辑！');	
			},
			upTowards(row){
				alert('上移一行！');
			},
			downTowards(row){
				alert('下移一行！');
			},
			addItem(){
				alert('新添加一行！');
			},
			// 单题信息展示
			SingleItemInfo(){
				alert('单题信息展示!');
			}
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
				.leftMarkBox{
					width: 62%;
					float: left;
					div.box-left{
						width: 28%;
						float: left;
						/* 基本标签 */
						div.commonMarkBox{
							width: 100%;
							height: 210px;
						}
						/* 其他标签 */
						div.othersMarkBox{
							width: 100%;
							height: 132px;
							margin-top: 12px;
							.itemSelect{
								color: #555555;
								font-size: 12px;
								padding: 5px 10px;
								height: 20px;
								line-height: 20px;
								.input-search-self .el-input__inner{
									font-size: 12px;
									height: 20px;
									line-height: 20px;
								}
							}
						}
					}
					/* 核心标签 */
					div.coreMarkBox{
						width: 70%;
						height: 500px;
						overflow-y: auto;
						
						div.scroll-container{
							height: 464px;
							overflow-x: hidden;
							overflow-y: auto;
							p.coreMarkTitle{
								width: 100%;
								height: 12px;
								line-height: 12px;
								padding: 20px 20px 0px;
								font-size: 12px;
								color: #41C0BC;
								text-align: left;
								.el-icon-delete{
									margin-left: 10px;
									color: #555555;
								}
								.el-icon-delete:hover{
									color: #41C0BC;
									cursor: pointer;
								}
							}
							ul.pointList{
								list-style: none;
								-webkit-padding-start: 30px;
								li{
									width: 100%;
									height: 12px;
									line-height: 12px;
									margin: 10px 0px;
									color: #555555;
									font-size: 12px;
									.el-icon-delete{
										margin-left: 10px;
									}
									.el-icon-delete:hover{
										color: #41C0BC;
										cursor: pointer;
									}
								}
							}
						}
						
					}
				}
				
				.rightMarkBox{
					width: 36%;
					height: 500px;
					float: right;
					margin: 0 auto;
					text-align: center;
					img{
						height: 400px;
						margin-top: 50px;
						
					}
				}
				
				
				
				
			}
		}
	}
	.itemEditSingle-view {
		flex: 1;
		overflow: hidden;
	}
</style>