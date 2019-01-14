<template>
	<el-scrollbar class="papernotyet-view scroll-page">
		<div class="paperNotYetList">
			<div class="class-list mt-5">
				
				<p class="guideBar">
					<img src="../../assets/images/process.png"/>
					<span>待处理试卷</span>
				</p>
				
				<el-select class="w_120 mr-20" v-model="subjectId" @change="SubjectChange">
					<el-option v-for="item in SubjectArr" :key="item.subjectId" :label="item.subjectName" :value="item.subjectId"></el-option>
				</el-select>
				<el-select class="w_120 mr-20" v-model="materialId" @change="MaterialChange">
					<el-option v-for="item in MaterialArr" :key="item.subjectId" :label="item.materialName" :value="item.materialId"></el-option>
				</el-select>
				<importPaper class="inline_block"></importPaper>
				<importPaper2 class="inline_block"></importPaper2>
				<div class="btn-medium-self-blue mr-20" @click="removeAll()">全部删除</div>
				<div class="btn-medium-self-blue fRight ml-20" @click="FilterPaper">搜索</div>
				<el-input class="w_200 input-search-self fRight"
					placeholder="请输入内容"
				  prefix-icon="el-icon-search"
				  v-model="PaperName">
				</el-input>
				
				<el-table :data="tableData" stripe class="mTop20 table_self_blue">
          <el-table-column type="index" label="序号" width="50" ></el-table-column>
          <el-table-column prop="Title" label="试卷名称" width="" class="text_left"></el-table-column>
          <el-table-column prop="Subject" label="学段学科" width="100"></el-table-column>
          <el-table-column prop="Material" label="教材版本" width="100"></el-table-column>
          <el-table-column prop="TotalPoints" label="总分" width="50"></el-table-column>
          <el-table-column prop="question.length" label="试题总数" width="100"></el-table-column>
          <el-table-column prop="Papersource" label="试卷来源" width="100"></el-table-column>
          <el-table-column prop="localId" label="上传时间" width="150" :formatter="FormatDatetime"></el-table-column>
          <el-table-column prop="useStatus" label="可用性" width="80"></el-table-column>
          <el-table-column prop="address" label="操作" width="50">
            <template slot-scope="scope">
              <el-popover placement="left" title="" trigger="click">
                <ul class="popover-list">
                	<li @click="PaperAttributeEdit(scope.row)">试卷属性编辑</li>
                  <li @click="ItemEditMain(scope.row)">试题编辑</li>
                  <li @click="SetScopeData(scope.row)">考察范围</li>
                  <li @click="TestClick(scope.row)">上传至后台</li>
                  <li @click="TestClick(scope.row)">预览</li>
                  <li @click="ClearVuexData(scope.row)">删除</li>
                </ul>
                <span slot="reference" class="el-icon-setting pointer handle-icon"></span>
              </el-popover>
            </template>
          </el-table-column>
          
        </el-table>
        
        <!-- 设置 "考察范围" 弹窗 -->
				<el-dialog title="设置试卷考察范围" :visible.sync="setScopeDialog" width="40%" id="setScopeDialog">
				  
				  <!-- 树状结构 -->
				  <el-tree
					  :data="scopeTree"
					  show-checkbox
					  node-key="unitId"
					  ref="rangeTree"
					  highlight-current
					  :props="defaultProps">
					</el-tree>
				  
				  <span slot="footer" class="dialog-footer">
				    <el-button @click="setScopeDialog = false">取 消</el-button>
				    <el-button type="primary" @click="confirmSetScope()">确 定</el-button>
				  </span>
				</el-dialog>
        
        <p>{{showVuexData}}</p>
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
		data() {
			return {
				SubjectArr:	[ { subjectId: '999',   subjectName: '全部'} ],
				MaterialArr:[ { materialId: '999', materialName: '全部'} ],
				subjectId: '999',		// 学段学科
				subjectName: '',		// 学段学科名称
				materialId: '999',	// 教材版本
				materialName:'',		// 教材版本名称
				PaperName: '',			// 试卷名称  => 检索用
				scopeArr: [],				// 设置试卷考察范围 全数组 学段学科 => 教材版本 => 章节知识点 层级数组显示
				scopeDataStr: '',		// 最终形成的 paperData.scopeDataStr 为 章_节@章_节@章_节 拼接的字符串
				setScopeDialog: false,
				tableData: [],
				paperData: {},			//单条试卷数据
				
				// 虚拟树状结构
				scopeTree: [],			// 章节知识点范围
        defaultProps: { children: 'subUnitList', label: 'unitName' }
			}
		},
		computed:{
			showVuexData(){
				// 接收 Vuex 中未上传试卷列表数据
				this.tableData = JSON.parse(JSON.stringify(this.$store.state.Paper.jsonArr));
				// 接收 Vuex 学段学科教材版本数据					=> 只做 学段学科 教材版本 学科能力 思想方法 级联
				let subjectAboutInfo = JSON.parse(JSON.stringify(this.$store.state.Version.subjectAboutInfo));
				this.SubjectArr = this.SubjectArr.concat(subjectAboutInfo);		// 学段学科 加上全部 ''
				// 接收 Vuex 学段学科教材版本章节知识点树		=> 只做 学段学科 教材版本 章节知识点 树形结构
				this.scopeArr = JSON.parse(JSON.stringify(this.$store.state.Version.unitAndSubUnit));
			}
		},
		mounted() {
			
		},
		methods: {
			removeAll(){
        this.$store.dispatch('DELETE_ONE_PAPER',{
          localId: -1
        })
      },
			TestClick(row){
				
			},
			// 试卷属性编辑
			PaperAttributeEdit(row){
				this.setLocal('paperData',JSON.stringify(row));
				this.changeRouterByName('PaperAttributeEdit');
			},
			// 试题编辑
			ItemEditMain(row){
				this.setLocal('paperData',JSON.stringify(row));
				this.changeRouterByName('ItemEditMain');
			},
			// 清除单条数据
			ClearVuexData(row){
				this.$confirm('确定要删除该条数据，是否继续?', '提示', {
					confirmButtonText: '确 定',
					cancelButtonText: '取 消',
					type: 'warning'
				}).then(() => {
					this.$store.dispatch('DELETE_ONE_PAPER',{
          	localId: row.localId
        	})
				}).catch(() => {

				})
			},
			// 时间戳处理成 年月日时分秒 格式
			FormatDatetime(row, column) {
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
     	},
			// 学段学科 <=> 教材版本
			SubjectChange(){
				if(this.subjectId == '999'){
					this.subjectName = '';
					this.MaterialArr = [ { materialId: '999', materialName: '全部'} ];
				}else{
					let SubjectArr = this.SubjectArr;
					for(let i=0; i<SubjectArr.length; i++){
						if(SubjectArr[i].materialList && SubjectArr[i].materialList.length>0){
							if(this.subjectId == SubjectArr[i].subjectId){
								this.subjectName = SubjectArr[i].subjectName;
								this.MaterialArr = [ { materialId: '999', materialName: '全部'} ].concat(SubjectArr[i].materialList);
							}
						}else{
							this.subjectName = '';
							this.MaterialArr = [ { materialId: '999', materialName: '全部'} ];
						}
					}
				}
				this.materialId = '999';
				this.materialName = '';
			},
			// 教材版本改变 <=> 获取教材版本名称
			MaterialChange(){
				if(this.materialId == '999'){
					this.materialName = ''
				}else{
					let MaterialArr = this.MaterialArr;
					for(let i=0; i<MaterialArr.length; i++){
						if(this.materialId == MaterialArr[i].materialId){
							this.materialName = MaterialArr[i].materialName;
						}
					}
				}
			},
			// 学段学科 教材版本 手动输入 全条件检索
			FilterPaper(){
				let tableData    = JSON.parse(JSON.stringify(this.$store.state.Paper.jsonArr));
				let filterPapers = [];
				for(let i=0; i<tableData.length; i++){
					if( tableData[i].Subject.includes(this.subjectName) && tableData[i].Material.includes(this.materialName) && tableData[i].Title.includes(this.PaperName) ){
						filterPapers.push(tableData[i])
					}
				}
				this.tableData = filterPapers; 
			},
			// 设置试卷考察范围
			SetScopeData(row){
				let subjectName = row.Subject;
				let materialName = row.Material;
				let scopeArr = this.scopeArr;
				this.paperData = row;
				// scopeArr => scopeTree => InitScopeIdArr => scopeDataStr
				if(scopeArr && scopeArr.length>0){
					for(let i=0; i<scopeArr.length; i++){
						if(subjectName == scopeArr[i].subjectName){
							let materialList = scopeArr[i].materialList;
							for(let j=0; j<materialList.length; j++){
								if(materialName == materialList[j].materialName){
									this.scopeTree = materialList[j].unitList;
									for(let k=0; k<this.scopeTree.length; k++){
										let unitId_parent = this.scopeTree[k].unitId;
										if(this.scopeTree[k].subUnitList && this.scopeTree[k].subUnitList.length>0){
											for(let m=0; m<this.scopeTree[k].subUnitList.length; m++){
												this.scopeTree[k].subUnitList[m].unitId_parent = unitId_parent;
											}
										}
									}
									this.setScopeDialog = true;
									setTimeout(()=>{
										if(row.InitScopeIdArr && row.InitScopeIdArr.length>0){
											// paperData.scopeDataStr 中有原始数据
											this.$refs.rangeTree.setCheckedKeys(row.InitScopeIdArr);
										}else{
											// paperData.scopeDataStr 中无原始数据
											this.$refs.rangeTree.setCheckedKeys([]);
										}
									},0)
								}
							}
						}
					}
				}
			},
			// 确定设置 "试卷考察范围"
			confirmSetScope(){
				let temp = this.$refs.rangeTree.getCheckedNodes();
				if(temp && temp.length>0){
					this.paperData.InitScopeIdArr = [];
					this.paperData.scopeDataStr = '';
					for(let i =0; i<temp.length; i++){
						if(temp[i].level == 2){
							this.paperData.InitScopeIdArr.push(temp[i].unitId);
							this.paperData.scopeDataStr += temp[i].unitId_parent + '_' + temp[i].unitId + '@';
						}
					}
					this.paperData.scopeDataStr = this.paperData.scopeDataStr.slice(0,this.paperData.scopeDataStr.length-1);
					// 将其写入 vuex 原始数据
					this.$store.dispatch('CHANGE_ONE_PAPER',{paper: this.paperData});
					this.$refs.rangeTree.store.defaultExpandAll = false;
					this.setScopeDialog = false;
				}else{
					this.$refs.rangeTree.store.defaultExpandAll = false;
					this.setScopeDialog = false;
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
			.paperNotYetList {
				padding: 20px;
				
				/* 设置 '设置考查范围弹窗' 高度 */
				#setScopeDialog .el-dialog__body{
					height: 450px;
					overflow-y: auto;
				}
			}
		}
	}
	.papernotyet-view {
		flex: 1;
		overflow: hidden;
	}
</style>