<!-- 试题编辑主页面 -->
<template>
	<el-scrollbar class="itemEditMain-view scroll-page">
		<div class="itemEditMain">
			<div class="class-list mt-5">
				
				<p class="guideBar">
					<img src="../../assets/images/process.png"/>
					<span @click="changeRouterByName('PaperNotYet')">待处理试卷</span> 》 
					<a href="javascript: void(0);">试题编辑</a>
				</p>
				
				<el-table :data="tableData" stripe class="table_self_blue">
          <el-table-column type="index" label="序号" width="50" ></el-table-column>
          <el-table-column prop="paperName" label="题干" width=""></el-table-column>
          <el-table-column prop="gradeSubject" label="所属题主" width="100"></el-table-column>
          <el-table-column prop="bookVersion" label="学段学科" width="100"></el-table-column>
          <el-table-column prop="totalScore" label="是否关联主知识点" width="80"></el-table-column>
          <el-table-column prop="itemTotal" label="试题类型" width="80"></el-table-column>
          <el-table-column prop="resource" label="选项个数" width="80"></el-table-column>
          <el-table-column prop="uploadTime" label="是否关联学科能力" width="80"></el-table-column>
          <el-table-column prop="useStatus" label="是否关联思想方法" width="80"></el-table-column>
          
        	<el-table-column
	          prop="address"
	          label="操作"
	          width="150">
	          <template slot-scope="scope">
	          	<span class="el-icon-edit" @click='editItem(scope.row)'></span>
	          	<span class="el-icon-sort-up" @click='upTowards(scope.row)'></span>
	          	<span class="el-icon-sort-down" @click='downTowards(scope.row)'></span>
	     			</template>
	        </el-table-column>
          
        </el-table>
				
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
				tableData:[
					{ paperName: '2016-2017学年云南省玉溪市峨山县 ', gradeSubject:'解答题', bookVersion:'小学语文', totalScore:'是', itemTotal:'选择题', resource:'4', uploadTime:'是', useStatus:'是' },
					{ paperName: '2016-2017学年云南省玉溪市峨山县 ', gradeSubject:'解答题', bookVersion:'小学语文', totalScore:'是', itemTotal:'选择题', resource:'4', uploadTime:'是', useStatus:'是' },
					{ paperName: '2016-2017学年云南省玉溪市峨山县 ', gradeSubject:'解答题', bookVersion:'小学语文', totalScore:'是', itemTotal:'选择题', resource:'4', uploadTime:'是', useStatus:'是' },
					{ paperName: '2016-2017学年云南省玉溪市峨山县 ', gradeSubject:'解答题', bookVersion:'小学语文', totalScore:'是', itemTotal:'选择题', resource:'4', uploadTime:'是', useStatus:'是' },
					{ paperName: '2016-2017学年云南省玉溪市峨山县 ', gradeSubject:'解答题', bookVersion:'小学语文', totalScore:'是', itemTotal:'选择题', resource:'4', uploadTime:'是', useStatus:'是' },
					{ paperName: '2016-2017学年云南省玉溪市峨山县 ', gradeSubject:'解答题', bookVersion:'小学语文', totalScore:'是', itemTotal:'选择题', resource:'4', uploadTime:'是', useStatus:'是' },
					{ paperName: '2016-2017学年云南省玉溪市峨山县 ', gradeSubject:'解答题', bookVersion:'小学语文', totalScore:'是', itemTotal:'选择题', resource:'4', uploadTime:'是', useStatus:'是' },
					{ paperName: '2016-2017学年云南省玉溪市峨山县 ', gradeSubject:'解答题', bookVersion:'小学语文', totalScore:'是', itemTotal:'选择题', resource:'4', uploadTime:'是', useStatus:'是' },
					{ paperName: '2016-2017学年云南省玉溪市峨山县 ', gradeSubject:'解答题', bookVersion:'小学语文', totalScore:'是', itemTotal:'选择题', resource:'4', uploadTime:'是', useStatus:'是' },
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
			editItem(row){
				this.$router.push({
					name: 'ItemEditSingle'
				})
			},
			upTowards(row){
				alert('上移一行！');
			},
			downTowards(row){
				alert('下移一行！');
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
			.itemEditMain {
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
	.itemEditMain-view {
		flex: 1;
		overflow: hidden;
	}
</style>