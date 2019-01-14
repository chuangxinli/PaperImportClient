<template>
  <div @click="open"></div>
</template>

<script>
	export default {
    name: 'select-mutiple',
    props: {
      SelectArr: {
      	type: Array,
      	default: []
      }
    },
    methods: {
      open (name, age) {
        this.$emit('introduce',{
        	name: name,
          age: age
        })
      }
    }
	}
</script>
