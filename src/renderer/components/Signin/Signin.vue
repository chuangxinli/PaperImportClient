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
							    placeholder="请输入您的账号..."
							    v-model="formLabelAlign.account">
							  </el-input>
						  </el-form-item>
						  
						  <el-form-item label="">
						  	<img src="../../assets/images/icon_password_green@2x.png"/>
						    <el-input type="password" 
						    	placeholder="请输入账户密码..." 
						    	v-model="formLabelAlign.userPwd" autocomplete="off"></el-input>
						  </el-form-item>
						  
						  <el-form-item label="" class="fLeft">
						    <el-checkbox-group v-model="formLabelAlign.isSetCookie">
						      <el-checkbox label="15天内免登录" name="type"></el-checkbox>
						    </el-checkbox-group>
						  </el-form-item>
						</el-form>
						
						<div class="btn_self" @click="signIn">
							登录
						</div>
					</div>
				</div>
				
				<div class="bottomContainer">
					<p class="top">铭仁（北京）教育科技有限公司@Copyr</p>
					<p class="bottom">服务电话：400-0052-365</p>
				</div>
				
			</div>
		  
    </div>
  </div>
</template>

<script>
	const {BrowserWindow} = require('electron')
	export default {
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
      		account: '',
      		userPwd: '',
      		isSetCookie: false
      	}
      	
      };
    },
    mounted() {
    	// this.ActivateMember();
    	// this.bringTokenBack();
		},
    methods: {
    	close() {
				this.$confirm('此操作将退出 "试卷导入客户端",是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
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
			signIn() {
				// 登陆成功后向父级组件传值
				this.$emit('listenToChildEvent',false);
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