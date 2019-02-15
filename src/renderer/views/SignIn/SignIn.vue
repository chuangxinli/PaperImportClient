<template>
  <div id="wrapper" class="signin-view">
    <div class="signPage">
			
			<div class="login-body">
				<div :style="{height: height}" class="iconContainer">
					<p class="fLeft">有谱试卷导入客户端 v2.0</p>
					<el-button @click="minimize" class="no-drag" size="mini" type="text">
						<i class="btn el-icon-minus"></i>
					</el-button>
					<el-button @click="close" class="no-drag hover-color" size="mini" type="text">
						<i class="btn el-icon-close"></i>
					</el-button>
				</div>
				
				<!--左侧图标-->
				<div class="flexLeft">
					<img src="../../assets/images/pic_kid@2x.png" alt="" />
				</div>
				
				<!--右侧登录页-->
				<div class="flexRight">
					<div class="from">
						<img src="../../assets/images/logo@2x.png" alt="" />
						<el-form :label-position="labelPosition" class="whiteFont marginLeft_auti200" label-width="200px" :model="formLabelAlign">
						  <el-form-item label="">
						  	<img src="../../assets/images/icon_user_green@2x.png"/>
						    <el-input
							    placeholder="请输入您的账号"
							    v-model="formLabelAlign.account">
							  </el-input>
						  </el-form-item>
						  
						  <el-form-item label="">
						  	<img src="../../assets/images/icon_password_green@2x.png"/>
						    <el-input type="password" 
						    	placeholder="请输入账户密码"
						    	v-model="formLabelAlign.userPwd" autocomplete="off"></el-input>
						  </el-form-item>
						  
						  <el-form-item label="" class="fLeft">
						    <el-checkbox-group v-model="formLabelAlign.isSetCookie">
						      <el-checkbox label="记住密码" name="type"></el-checkbox>
						    </el-checkbox-group>
						  </el-form-item>
						</el-form>
						
						<div class="btn_self" @click="signIn">
							登录
						</div>
					</div>
				</div>
				<div class="bottomContainer">
					<p class="top">铭仁（北京）教育科技有限公司@Copyright2018&nbsp;&nbsp;&nbsp;&nbsp;版本号：{{version}}</p>
					<p class="bottom">服务电话：400-0052-365</p>
					<span style="display: none">{{version}}</span>
				</div>
			</div>
    </div>
  </div>
</template>

<script>
	const writeFile = require('write')
	const path = require('path')
	import axios from 'axios'
	const {ipcRenderer} = require('electron')
	import { Message, Loading } from 'element-ui'
  let loadOptions = {
    lock: true,
    text: '数据更新中，请稍等！',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.5)'
  }
  let loadingInstance
	export default {
	  computed: {
	    version() {
	      this.tempVersion = this.$store.state.Version.version
	      return this.$store.state.Version.version
			},
      subjectAboutInfo() {
	      return this.$store.state.Version.subjectAboutInfo
			},
      unitAndSubUnit() {
	      return this.$store.state.Version.unitAndSubUnit
			}
		},
		watch: {
      version: function () {
        if(!this.serving){
          setTimeout(() => {
            ipcRenderer.send('startServe', '111', this.oldSessionUser)
          }, 4000)
          this.$router.push({
            path: '/Main'
          })
				}
      }
		},
		props: {
			height: {
				type: String,
				default: '40px'
			}
		},
    data () {
      return {
      	isFullScreen: false,
      	labelPosition: 'center',
      	formLabelAlign: {
      		account: '441731229@qq.com',
      		userPwd: '123456',
      		isSetCookie: false
      	},
				isGetSubjectAboutInfo: false,
				isGetUnitAndSubUnit: false,
				newVersion: '',
				tempVersion: '',
				jsonData: '',
				oldSessionUser: '',
				serving: true
      };
    },
    mounted() {
      this.test()
	    this.oldSessionUser = this.getSession('account')
	    console.log(this.unitAndSubUnit)
			console.log(this.subjectAboutInfo)
	    if(this.getLocal('isSetCookie') == 'true'){
        this.formLabelAlign.isSetCookie = true
        /*this.formLabelAlign.account = this.getCookie('account')
        this.formLabelAlign.userPwd = this.getCookie('userPwd')*/
        this.formLabelAlign.account = this.getLocal('account')
        this.formLabelAlign.userPwd = this.getLocal('userPwd')
			}else{
        this.formLabelAlign.isSetCookie = false
        this.formLabelAlign.account = ''
        this.formLabelAlign.userPwd = ''
			}
		},
    methods: {
    	close() {
				this.$confirm('此操作将退出 "试卷导入客户端",是否继续?', '提示', {
					confirmButtonText: '确 定',
					cancelButtonText: '取 消',
					type: 'warning'
				}).then(() => {
					this.$electron.ipcRenderer.send('close')
				}).catch(() => {

				})
			},
			minimize() {
				this.$electron.ipcRenderer.send('minimize')
			},
      // 先调用激活页面进行激活 => 返回成功之后免登录 ActivateMember => 参数 string email, string sid, int language
			async ActivateMember() {
				let url = 'schoolManage/getClassList';
				let params = {
					sid: 'ec2f6872-4500-437b-8746-58d4b9041fef',
	        uid: '1070777126',
	        status: '1',
	        schoolId: '108',
	        phase: '0',
	        phaseYear: '0',
	        pageSize: 10,
	        currentPage: 1
				}
				let data = await this.api.get(url, params, { loading: true });
				if (data.recode == 0) { 
	        console.log(data);
	      }else{
	      	console.log(data);
	        this.$message.error(data.errmsg);
	      }
			},
			test(){
    	  let url = 'http://localhost:13004/test'
				axios.get(
					url,
					{
					  timeout: 2000,
            withCredentials: false,
						headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
					}
				).then((response) => {
    	    console.log(response)
					if(!response){
    	      this.serving = false
					}
				}).catch((err) => {
    	    console.log(err)
				})
			},
      getSubjectAboutInfo() {
        let url = '/paper/baseData/getSubjectAboutInfo'
    	  return axios.get(this.global.api_url + url)
			},
      getUnitAndSubUnit() {
        let url = '/paper/baseData/getUnitAndSubUnit'
    	  return axios.get(this.global.api_url + url)
			},
			// 20190123 添加 UserMarkList 到 vuex
			getUseMarkList(){
				let url = '/paper/baseData/getQuestionType';
				return axios.get(this.global.api_url + url)
			},
			async signIn() {
    	  if(!this.formLabelAlign.account){
          this.$message({
            message: '账号不能为空！',
            type: 'warning'
          });
          return
				}
        if(!this.formLabelAlign.userPwd){
          this.$message({
            message: '密码不能为空！',
            type: 'warning'
          });
          return
        }
    	  let url = '/paper/system/login'
				let params = {
    	    username: this.formLabelAlign.account,
					password: this.formLabelAlign.userPwd,
          isLogin: 1 //测试用
				}
				let data = await this.api.get(url, params)
				if(data){
          this.setSession('account', this.formLabelAlign.account)
    	    if(!this.formLabelAlign.isSetCookie){
						/*this.clearCookie()*/
						this.setLocal('isSetCookie', false)
						this.setLocal('account', '')
						this.setLocal('userPwd', '')
					}else{
            this.setLocal('isSetCookie', true)
    	      //this.saveUserAndPassword(this.formLabelAlign.account, this.formLabelAlign.userPwd)
						this.setLocal('account', this.formLabelAlign.account)
						this.setLocal('userPwd', this.formLabelAlign.userPwd)
					}
          this.setSession('isSchoolUser', data.data.isSchoolUser)
					this.jsonData = data.data
					if(data.data.version == this.version){
    	      this.newVersion = data.data.version
						loadingInstance = Loading.service(loadOptions)
    	      axios.all([this.getSubjectAboutInfo(), this.getUnitAndSubUnit(), this.getUseMarkList()]).then(axios.spread( (SubjectAboutInfo, UnitAndSubUnit, UserMarkList) => {
              loadingInstance.close()
    	        if(SubjectAboutInfo.data.recode == 0 && UnitAndSubUnit.data.recode == 0){
                this.$store.dispatch('CHANGE_VERSION', {version: this.newVersion})
                this.$store.dispatch('UNIT_AND_SUBUINT', {unitAndSubUnit: UnitAndSubUnit.data.data})
                this.$store.dispatch('SUBJECT_ABOUT_INFO', {subjectAboutInfo: SubjectAboutInfo.data.data})
                writeFile(path.join(__dirname, '../../../main/json/subjectAboutInfo.json'), JSON.stringify({subjectAboutInfo: SubjectAboutInfo.data.data}), err => {
                  console.log(err)
                  return
                })
                writeFile(path.join(__dirname, '../../../main/json/unitAndSubUnit.json'), JSON.stringify({unitAndSubUnit: UnitAndSubUnit.data.data}), err => {
                  console.log(err)
                  return
                })
                this.$store.dispatch('USE_TAG_CHANGE', {userMarkList: UserMarkList.data.data})
							}else{
                Message({
                  showClose: true,
                  message: '数据获取失败！',
                  type: 'error'
                });
							}
            })).catch((err) => {
              loadingInstance.close()
              Message({
                showClose: true,
                message: '数据请求异常！',
                type: 'error'
              });
							console.log(err)
            })
					}else{
					  if(!this.serving){
              ipcRenderer.send('startServe', '222', this.oldSessionUser)
						}
            this.$router.push({
              path: '/Main'
            })
					}
				}
				// 登陆成功后向父级组件传值
			}
    }
	}
</script>

<style lang="scss" scoped>
	.login-body {
		background: #FFFFFF;
		color: #555555;
		.icon {
			color: #f56c6c;
			font-size: 80px;
		}
		/deep/ .iconContainer {
			height: 50px !important;
			line-height: 50px;
			padding: 0 20px;
			width: 100vw;
			box-sizing: border-box;
			text-align: right;
			p.fLeft{
				margin: 0 !important;
				font-size: 18px;
			}
			.btn {
				font-size: 17px;
				color: #333;
			}
			.btn:hover {
				opacity: 0.5;
			}
		}
		
		div.flexLeft{
			width: 50vw;
			height: 100vh;
			line-height: 90vh;
			box-sizing: border-box;
			float: left;
			border: 1px;
			img{
				width: 40vw;
				height: auto;
				margin-left: 5vw;
			}
		}
		div.flexRight{
			float: right;
			width: 50vw;
			height: 100vh;
			box-sizing: border-box;
			.from {
				img{
					width: 272px;
					height: auto;
					margin-top: 10vh;
					margin-left: 14px;
					margin-bottom: 26px;
				}
				width: 300px;
				color: #A1A1A1;
				margin: 0 auto !important;
				margin-top: 50px;
				.el-form{
					.input-items {
						background: #00CCCC;
						border: 1px solid #f0f0f0;
						border-radius: 2px;
						overflow: hidden;
					}
					img{
						height: 24px;
						width: 24px;
						margin: 0;
						padding: 0;
						position: absolute;
						top: 8px;
						left: 5px;
						z-index: 999999;
					}
					.el-checkbox:hover{
						color: #41C0BC;
					}
					.el-input{
						margin-bottom: 10px;
						.border-t {
							border-top: 1px solid #f0f0f0;
						}
					}
					.fLeft{
						margin-top: -22px;
					}
				}
				.btn_self{
					clear: both;
					width: 300px;
					height: 56px;
					line-height: 56px;
					color: white;
					background: #41C0BC;
					border-radius: 28px;
					font-size: 26px;
					text-align: center;
				}
				.btn_self:hover{
					cursor: pointer;
					opacity: 0.8;
				}
			}
		}
		
		.bottomContainer{
			position: fixed;
			width: 100vw;
			height: 50px;
			bottom: 10px;
			left: 0px;
			text-align: center;
			color: #A1A1A1;
			p.top{
				height: 30px;
				line-height: 30px;
				font-size: 16px;
				padding: 0 !important;
			}
			p.bottom{
				height: 20px;
				line-height: 20px;
				font-size: 14px;
				padding: 0 !important;
			}
		}
	}
</style>