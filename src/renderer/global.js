
export default {
  //api_url: 'http://cs.emingren.com:8085',
  api_url: 'http://192.168.1.107/YouPuPaperUpload',
  token: ''
}

// 1: 截取地址栏中字符串方法
function getParamFromUrl(name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]); return null;
}

