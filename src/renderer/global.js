export default {
  api_url: 'http://120.27.195.10:8090/das/',
  token: ''
}

// 1: 截取地址栏中字符串方法
function getParamFromUrl(name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]); return null;
}

