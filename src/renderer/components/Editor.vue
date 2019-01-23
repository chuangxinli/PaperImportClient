<template>
    <div>
        <div ref="editor" style="text-align:left"></div>
    </div>
</template>

<script>
    import E from 'wangeditor'

    export default {
      props: ['txt'],
      name: 'editor',
      data () {
        return {
          editorContent: '',
          editor: {}
        }
      },
      methods: {
        getContent: function () {
          this.$emit('getHtml', this.editorContent)
        }
      },
      watch:{
      	txt: function(){
      		this.editor.txt.html(this.txt)
        	this.editor.change && this.editor.change()
      	}
      },
      mounted() {
        this.editor = new E(this.$refs.editor)
        this.editor.customConfig.uploadImgShowBase64 = true
        this.editor.customConfig.onchange = (html) => {
          this.editorContent = html;
          this.getContent();
        }
        this.editor.customConfig.menus = [          //菜单配置
          'head',
          'list',  		// 列表
          'justify',  // 对齐方式
          'bold',
          'fontSize', // 字号
          'italic',
          'underline',
          'image',  	// 插入图片
          'foreColor',// 文字颜色
          'undo',  		// 撤销
          'redo',  		// 重复
        ]
        this.editor.customConfig.linkImgCallback = (url) => {
          this.editor.change && this.editor.change()
        }
        this.editor.create()
        this.editor.txt.html(this.txt)
        this.editor.change && this.editor.change()
      }
    }
</script>

<style scoped>
</style>
