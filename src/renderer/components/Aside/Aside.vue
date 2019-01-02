<template>
  <div id="wrapper" class="aside-view">
  	
  	<div class="notYetBar">
	  	<img @click="skipTo('PaperNotYet')" v-show="isNotYet == true" class="notYetBar_native" src="../../assets/images/notYetBar_native.png" alt="" />
	  	<img @click="skipTo('PaperNotYet')" v-show="isNotYet == false" class="notYetBar" src="../../assets/images/notYetBar.png" alt="" />
  	</div>
  	
  	<div class="alreadyBar">
	  	<img @click="skipTo('PaperAlready')" v-show="isAlready == true" class="alreadyBar_native" src="../../assets/images/alreadyBar_native.png" alt="" />
	  	<img @click="skipTo('PaperAlready')" v-show="isAlready == false" class="alreadyBar" src="../../assets/images/alreadyBar.png" alt="" />
  	</div>
  	
  </div>
</template>

<script>
	const {BrowserWindow} = require('electron')
	export default {
    data () {
      return {
      	isNotYet: true,
      	isAlready: false
      };
    },
    mounted() {
    	
		},
    methods: {
    	skipTo(name) {
	      if(name=='PaperNotYet'){
	      	this.isNotYet = true;
	      	this.isAlready = false;
	      }else{
	      	this.isNotYet = false;
	      	this.isAlready = true;
	      }
	      this.$router.push({ name: name });
	    },
    }
	}
</script>

<style lang="scss" scoped>
	.el-aside{
		.aside-view{
			padding-top: 50px;
			background: #FFFFFF;
			height: 100vh;
			box-sizing: border-box;
			div.notYetBar{
				width: 130px;
				overflow: visible;
				img.notYetBar, img.notYetBar_native{
					width: 142px;
					height: auto;
					position: absolute;
					top: 15px;
					left: 0;
					z-index: 199;
					cursor: pointer;
				}
			}
			div.alreadyBar{
				width: 130px;
				overflow: visible;
				img.alreadyBar, img.alreadyBar_native{
					width: 142px;
					height: auto;
					position: absolute;
					top: 65px;
					left: 0;
					z-index: 199;
					cursor: pointer;
				}
			}
		}
	}
</style>