
import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '../views/SignIn/SignIn.vue'			// 一级路由
import Main from '../views/Main/Main.vue'						// 一级路由
import PaperNotYet from '../views/PaperList/PaperNotYet.vue'													// 二级路由
import PaperAlready from '../views/PaperList/PaperAlready.vue'												// 二级路由
import PaperAttributeEdit from '../views/PaperAttributeEdit/PaperAttributeEdit.vue'		// 二级路由
import ItemEditMain from '../views/ItemEditMain/ItemEditMain.vue'											// 二级路由
import ItemEditSingle from '../views/ItemEditSingle/ItemEditSingle.vue'								// 二级路由
import ItemEditSingle_SubQuestion from '../views/ItemEditSingle_SubQuestion/ItemEditSingle_SubQuestion.vue'								// 二级路由

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/SignIn',			// 一级路由 SignIn
      name: 'SignIn',
      component: SignIn			
    },
    {
      path: '/Main',				// 一级路由 Main
      name: 'Main',
      component: Main,
      redirect: '/Main/PaperNotYet',
      children: [
        {
          path: '/Main/PaperNotYet',					// 二级路由 未上传试卷列表 PaperNotYet
          name: 'PaperNotYet',
          component: PaperNotYet
        },
        {
          path: '/Main/PaperAlready',					// 二级路由 已上传试卷列表 PaperAlready
          name: 'PaperAlready',
          component: PaperAlready
        },
        {
        	path: '/Main/PaperAttributeEdit',		// 二级路由 试卷属性编辑	PaperAttributeEdit
          name: 'PaperAttributeEdit',
          component: PaperAttributeEdit
        },
        {
        	path: '/Main/ItemEditMain',					// 二级路由 试题编辑主页	ItemEditMain
          name: 'ItemEditMain',
          component: ItemEditMain
        },
        {
        	path: '/Main/ItemEditSingle',				// 二级路由 试题单题编辑	ItemEditSingle
          name: 'ItemEditSingle',
          component: ItemEditSingle
        },
        {
        	path: '/Main/ItemEditSingle_SubQuestion',	// 二级路由 试题单题编辑(小题编辑)	ItemEditSingle_SubQuestion
          name: 'ItemEditSingle_SubQuestion',
          component: ItemEditSingle_SubQuestion
        }
      ]
    }
  ]
})

export default router
