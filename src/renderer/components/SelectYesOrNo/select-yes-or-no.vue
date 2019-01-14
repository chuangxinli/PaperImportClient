<template>
  <el-select class="w_120" v-model="yesOrNo" @change="YesOrNoChange">
		<el-option v-for="item in YesOrNoArr" :key="item.valueCode" :label="item.name" :value="item.valueCode"></el-option>
	</el-select>
</template>

<script>
	export default {
    name: 'select-yes-or-no',
    props: {
      YesOrNoArr: {
      	type: Array,
      	default: [{
      		name: '是',
      		valueCode: '1'
      	},{
      		name: '否',
      		valueCode: '0'
      	}]
      },
      yesOrNo:{
      	type: String,
      	default: '1'
      },
      componentName:{
      	type: String,
      	default: ''
      }
    },
    methods: {
      YesOrNoChange (yesOrNo) {
        this.$emit('listenChild',{
        	valueCode: this.yesOrNo,
        	componentName: this.componentName
        })
      }
    }
	}
</script>
