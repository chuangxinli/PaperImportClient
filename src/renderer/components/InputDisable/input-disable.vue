<!-- input disable components -->
<template>
  <el-input class="w_120 input-search-self" prefix-icon="el-icon-edit" v-model="disableData" :disabled="true"></el-input>
</template>

<script>
	export default {
    name: 'input-disable',
    props: {
      disableData:{
      	type: String,
      	default: ''
      }
    }
	}
</script>
