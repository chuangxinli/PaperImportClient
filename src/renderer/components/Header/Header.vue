<template>
	<div class="header-view">
		<div class="left flex-c-l wHalfPercent">
			<img src="../../assets/images/logo_header@2x.png"/>
			<p class="headerTitle text_left">有谱试卷导入客户端</p>
		</div>
		<div class="right wHalfPercent">
			<div class="topContainer">
				<el-button @click="minimize" class="no-drag" size="mini" type="text">
					<i class="btn el-icon-minus"></i>
				</el-button>
				<el-button @click="maximize" class="no-drag" size="mini" type="text">
					<i v-if="isFullScreen"><span class="normalScreen"></span></i>
					<i v-else><span class="fullScreen"></span></i>
				</el-button>
				<el-button @click="close" class="no-drag hover-color" size="mini" type="text">
					<i class="btn el-icon-close"></i>
				</el-button>
			</div>
			<div class="bottomContainer">
				<div class="userLogout fRight no-drag" @click="userLogout()">退出</div>
				<div class="userInfo fRight">欢迎您！Tes******om</div>
			</div>
		</div>
	</div>
</template>

<script>
	const {BrowserWindow} = require('electron')
	export default {
		data(){
			return {
				isFullScreen: false
			}
		},
		methods: {
			userLogout() {
				// 退出登录
				this.$router.push({
					name: 'SignIn'
				})
			},
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
			maximize() {
				this.isFullScreen = ! this.isFullScreen;
				if(this.isFullScreen){
					this.$electron.ipcRenderer.send('maximize')
				}else{
					this.$electron.ipcRenderer.send('unmaximize')
				}
			},
			unmaximize() {
				this.$electron.ipcRenderer.send('unmaximize')
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.header-view {
		display: flex;
		align-items: center;
		justify-content: space-between;
		/deep/ .left {
			img{
				width: 110px;
				height: 40px;
				margin: 18px 0px;
			}
		}
		.right {
			height: 77px;
			div.topContainer{
				width: 100%;
				height: 40px;
				line-height: 50px;
				text-align: right;
				.btn {
					font-size: 17px;
					color: #FFFFFF;
				}
				.btn:hover {
					opacity: 0.5;
				}
				.fullScreen{
					display: inline-block;
					width: 17px;
					height: 17px;
					margin-bottom: -2px;
					background-image: url(../../assets/images/fullScreen.png);
				}
				.fullScreen:hover{
					opacity: 0.5;
				}
				.normalScreen{
					display: inline-block;
					width: 17px;
					height: 17px;
					margin-bottom: -2px;
					background-image: url(../../assets/images/nornalScreen.png);
				}
				.normalScreen:hover{
					opacity: 0.3;
				}
			}
			div.bottomContainer{
				cursor: pointer;
				width: 100%;
				height: 27px;
				line-height: 20px;
				color: #FFFFFF;
				font-size: 14px;
				text-align: right;
			}
			.userInfo{
				display: inline-block;
				padding-right: 10px;
			}
			.userLogout{
				width: 2em;
				height: 20px;
				padding-left: 10px;
				border-left: 1px solid #FFFFFF;
			}
			.userLogout:hover{
				cursor: pointer;
			}
		}
	}
</style>