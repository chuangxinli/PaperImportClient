<template>
	<el-scrollbar class="papernotyet-view scroll-page">
		<div class="paperNotYetList">
			<div class="class-list mt-5">
				
				<p class="guideBar">
					<img src="../../assets/images/process.png"/>
					<span>待处理试卷</span>
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
				<importPaper class="inline_block"></importPaper>
				<importPaper2 class="inline_block"></importPaper2>
				<div class="btn-medium-self-blue mr-20" @click="removeAll()">全部删除</div>
				<div class="btn-medium-self-blue fRight ml-20">搜索</div>
				<el-input class="w_200 input-search-self fRight"
					placeholder="请输入内容"
				  prefix-icon="el-icon-search"
				  v-model="model_test3">
				</el-input>
				
				<el-table :data="tableData" stripe class="mTop20 table_self_blue">
          <el-table-column type="index" label="序号" width="50" ></el-table-column>
          <el-table-column prop="Title" label="试卷名称" width=""></el-table-column>
          <el-table-column prop="Term" label="学段学科" width="100"></el-table-column>
          <el-table-column prop="Subject" label="教材版本" width="100"></el-table-column>
          <el-table-column prop="TotalPoints" label="总分" width="50"></el-table-column>
          <el-table-column prop="question.length" label="试题总数" width="100"></el-table-column>
          <el-table-column prop="Papersource" label="试卷来源" width="100"></el-table-column>
          <el-table-column prop="localId" label="上传时间" width="150" :formatter="formatDatetime"></el-table-column>
          <el-table-column prop="useStatus" label="可用性" width="80"></el-table-column>
          <el-table-column prop="address" label="操作" width="50">
            <template slot-scope="scope">
              <el-popover placement="left" title="" trigger="click">
                <ul class="popover-list">
                	<li @click="PaperAttributeEdit(scope.row)">试卷属性编辑</li>
                  <li @click="ItemEditMain(scope.row)">试题编辑</li>
                  <li @click="testClick(scope.row)">考察范围</li>
                  <li @click="testClick(scope.row)">上传至后台</li>
                  <li @click="testClick(scope.row)">预览</li>
                  <li @click="clearVuexData(scope.row)">删除</li>
                  <li @click="changePaperName(scope.row)">改变试卷名称</li>
                </ul>
                <span slot="reference" class="el-icon-setting pointer handle-icon"></span>
              </el-popover>
            </template>
          </el-table-column>
          
        </el-table>
        
        <div>{{tableData_store}}</div>
				
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
		computed:{
			tableData_store(){
				//this.tableData = JSON.parse(JSON.stringify(this.$store.state.Paper.jsonArr));
				this.tableData = JSON.parse(JSON.stringify(this.$store.getters.dealNull));
			}
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
				tableData: []
			}
		},
		mounted() {
			console.log(this.tableData)
		},
		methods: {
      removeAll(){
        this.$store.dispatch('DELETE_ONE_PAPER',{
          localId: -1
        })
      },
			testClick(row){
				console.log(row);
			},
			// 试卷属性编辑
			PaperAttributeEdit(row){
				this.setLocal('paperData',JSON.stringify(row));
				this.$router.push({
					name: 'PaperAttributeEdit'
				})
			},
			// 试题编辑
			ItemEditMain(row){
				this.$router.push({
					name: 'ItemEditMain'
				})
			},
			// 改变试卷名称
			changePaperName(row){
				console.log(row);
				this.rowData = row;
				this.rowData.Title = "测试"
				this.$store.dispatch('CHANGE_ONE_PAPER',{paper: this.rowData});
			},
			clearVuexData(row){
				this.$confirm('此操作将退出 "试卷导入客户端",是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$store.dispatch('DELETE_ONE_PAPER',{
          	localId: row.localId
        	})
				}).catch(() => {

				})
			},
			// 时间戳处理成 年月日时分秒 格式
			formatDatetime(row, column) {
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
      }
		},
		
	}
</script>

<style lang="scss" scoped>
	.scroll-page {
		overflow: hidden;
		/deep/ .el-scrollbar__wrap {
			overflow-x: hidden;
			.paperNotYetList {
				padding: 20px;
			}
		}
	}
	.papernotyet-view {
		flex: 1;
		overflow: hidden;
	}
</style>