import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import api from './api.js'
import {Message} from 'element-ui'
import ElementUI from 'element-ui';
import './assets/styles/theme.scss';
Vue.use(ElementUI);
import App from './App'
import router from './router'
import store from './store'
import global from './global.js'
import filters from './filters'

Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
});

Vue.http = Vue.prototype.$http = axios
Vue.prototype.global = global
Vue.prototype.api = api
Vue.use(require('vue-electron'))
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
Vue.prototype.session = require('electron').remote.session;
const winURL = process.env.NODE_ENV === 'development' ?
  `http://localhost:9080` :
  `file://${__dirname}/index.html`

// 定义全局点击函数
Vue.prototype.globalClick = function(callback) {
	document.getElementById('main').onclick = function() {
		callback();
	};
};
// 定义全局点击函数
Vue.prototype.playlistClick = function(callback) {
	document.getElementById('playlist').onclick = function() {
		callback();
	};
};

// token 过期处理		原生 ajax 封装
Vue.prototype.bringTokenBack = function(callbackFun) {
  let ajax = new XMLHttpRequest();
  let url = Vue.prototype.global.api_url + 'schoolManage/getClassList?name=' + Vue.prototype.getCookie('account') +'&pwd='+ Vue.prototype.getCookie('userPwd');
  ajax.open('get',url);
  ajax.send();
  ajax.onreadystatechange = function () {
    if (ajax.readyState==4&&ajax.status==200) {
      let data = JSON.parse(ajax.responseText);
      console.log(typeof data, data);
      if(data.recode == 0){
      	if(callbackFun && typeof callbackFun === 'function'){
      		// 将最新的 token 写入 global.token
      		Vue.prototype.global.token = data.token;
	      	callbackFun(data);
	      }else{
	      	return false;
	      }
      }else{
      	Message({
		      message: '当前会话已过期，稍后将会重新登录！',
		      type: 'warning',
		      showClose: true,
		      duration: 3000,
		      onClose: function(){
		      	// 跳转到登录页面, 进行重新进行登录
		      	router.push({
		          name: 'SignIn'
		        })
		      }
		    })
      }
    }
  }
}

// 获取单个 cookie 值
Vue.prototype.getCookie = function (name){
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	return (arr=document.cookie.match(reg)) ? unescape(arr[2]) : null;
}
// 设置单个 cookie 值
Vue.prototype.setCookie = (name, value) => {
  let Days = 30;
  let exp = new Date();
  let date = Math.round(exp.getTime() / 1000) + Days * 24 * 60 * 60;
  const cookie = {
  	url: winURL,
    name: name,
    value: value,
    expirationDate: date
  };
  Vue.prototype.session.defaultSession.cookies.set(cookie, (error) => {
    if (error) console.error(error);
  });
};
// 设置 '用户名' '密码' cookie
Vue.prototype.saveUserAndPassword = (account, userPwd) => {
	Vue.prototype.setCookie('account', account);
	Vue.prototype.setCookie('userPwd', userPwd);
};
// 清空cookie值
Vue.prototype.clearCookie = () => {
  Vue.prototype.session.defaultSession.clearStorageData({
  	origin: winURL,
    storages: ['cookies']
  }, function (error) {
    if (error) console.error(error);
  })
};

// session 存储机制
Vue.prototype.getSession = (name)=>{
	return sessionStorage.getItem(name);
}
Vue.prototype.setSession = (name,value)=>{
	return sessionStorage.setItem(name,value);
}
Vue.prototype.clearSession = ()=>{
	return sessionStorage.clear();
}

// 通过 name 进行更改路由页面
Vue.prototype.changeRouterByName = (name)=>{
	router.push({ name: name })
}

// local 存储机制
Vue.prototype.getLocal = (name)=>{
	return localStorage.getItem(name);
}
Vue.prototype.setLocal = (name,value)=>{
	return localStorage.setItem(name,value);
}
Vue.prototype.clearLocal = ()=>{
	return localStorage.clear();
}

router.beforeEach((to, from, next) => {
  store.commit('change_route', {route_name: to.path})
  next()
})

/* eslint-disable no-new */
new Vue({
	components: {
		App
	},
	router,
	store,
	template: '<App/>'
}).$mount('#app');