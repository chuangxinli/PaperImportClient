<template>
	<div>
		<el-container class="container" id="main">
			<el-header class="header" height="77px" style="-webkit-app-region: drag">
				<header-view/>
			</el-header>
			<el-container style="position: relative;">
				
				<el-aside width="130px" class="aside">
					<aside-view padding="20px" />
				</el-aside>
				
				<router-view></router-view>
				
			</el-container>
		</el-container>
	</div>
</template>
<script>
	import HeaderView from '../../components/Header/Header.vue'
	import AsideView from '../../components/Aside/Aside.vue'

	export default {
		data(){
			return {
				
			}
		},
		mounted(){
			
		},
		methods:{
			
		},
		components: {
			HeaderView,
			AsideView
		}
	}
</script>
<style lang="scss" scoped>
	
	.header {
		background: #41C0BC;
		width: 100vw;
	}

	.aside {
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	
	.container {
		height: 100vh;
	}
	
</style>