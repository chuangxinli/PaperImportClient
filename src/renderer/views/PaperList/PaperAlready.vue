<template>
	<el-scrollbar class="paperalready-view scroll-page">
		<div class="paperAreadyList">
			<div class="class-list mt-5">
				
				<p class="guideBar">
					<img src="../../assets/images/process.png"/>
					<span>已上传试卷</span>
				</p>
				
				<el-select class="w_120 mr-20" v-model="model_test1">
					<el-option v-for="item in testArr1" 
						:key="item.name" 
						:label="item.name" 
						:value="item.value">
					</el-option>
				</el-select>
				<el-select class="w_120 mr-20" v-model="model_test2">
					<el-option v-for="item in testArr2" 
						:key="item.name" 
						:label="item.name" 
						:value="item.value">
					</el-option>
				</el-select>
				
				<div class="btn-medium-self-blue fRight ml-20">搜索</div>
				<el-input class="w_200 input-search-self fRight"
					placeholder="请输入内容"
				  prefix-icon="el-icon-search"
				  v-model="model_test3">
				</el-input>
				
				<el-table :data="tableData" stripe class="mTop20 table_self_blue">
          <el-table-column type="index" label="序号" width="50" ></el-table-column>
          <el-table-column prop="paperName" label="试卷名称" width=""></el-table-column>
          <el-table-column prop="gradeSubject" label="学段学科" width="100"></el-table-column>
          <el-table-column prop="bookVersion" label="教材版本" width="100"></el-table-column>
          <el-table-column prop="totalScore" label="试卷总分" width="100"></el-table-column>
          <el-table-column prop="itemTotal" label="试题数量" width="100"></el-table-column>
          <el-table-column prop="resource" label="试卷来源" width="100"></el-table-column>
          <el-table-column prop="uploadTime" label="上传时间" width="150"></el-table-column>
          <el-table-column prop="useStatus" label="可用性" width="80"></el-table-column>
          
          <el-table-column prop="address" label="操作" width="80">
            <template slot-scope="scope">
              <el-popover placement="left" title="" trigger="click">
                <ul class="popover-list">
                	<li @click="testClick(scope.row)">查看试题ID</li>
                  <li @click="testClick(scope.row)">同步至前端</li>
                  <li @click="testClick(scope.row)">预览</li>
                </ul>
                <span slot="reference" class="el-icon-setting pointer handle-icon"></span>
              </el-popover>
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
				model_test3: '',
				tableData:[
					{ paperName: '2018-2019学年北京市海淀区教育厅化学命题试卷', gradeSubject:'高中化学', bookVersion:'人教版', totalScore:'100', itemTotal:'21', resource:'数学组', uploadTime:'2018-12-09 21:23', useStatus:'1/4' },
					{ paperName: '2018-2019学年北京市海淀区教育厅化学命题试卷', gradeSubject:'高中化学', bookVersion:'人教版', totalScore:'100', itemTotal:'21', resource:'数学组', uploadTime:'2018-12-09 21:23', useStatus:'1/4' },
					{ paperName: '2018-2019学年北京市海淀区教育厅化学命题试卷', gradeSubject:'高中化学', bookVersion:'人教版', totalScore:'100', itemTotal:'21', resource:'数学组', uploadTime:'2018-12-09 21:23', useStatus:'1/4' },
					{ paperName: '2018-2019学年北京市海淀区教育厅化学命题试卷', gradeSubject:'高中化学', bookVersion:'人教版', totalScore:'100', itemTotal:'21', resource:'数学组', uploadTime:'2018-12-09 21:23', useStatus:'1/4' },
					{ paperName: '2018-2019学年北京市海淀区教育厅化学命题试卷', gradeSubject:'高中化学', bookVersion:'人教版', totalScore:'100', itemTotal:'21', resource:'数学组', uploadTime:'2018-12-09 21:23', useStatus:'1/4' },
					{ paperName: '2018-2019学年北京市海淀区教育厅化学命题试卷', gradeSubject:'高中化学', bookVersion:'人教版', totalScore:'100', itemTotal:'21', resource:'数学组', uploadTime:'2018-12-09 21:23', useStatus:'1/4' },
					{ paperName: '2018-2019学年北京市海淀区教育厅化学命题试卷', gradeSubject:'高中化学', bookVersion:'人教版', totalScore:'100', itemTotal:'21', resource:'数学组', uploadTime:'2018-12-09 21:23', useStatus:'1/4' },
				]
			}
		},
		mounted() {

		},
		methods: {
			testClick(row){
				console.log(row);
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
</style>