
export default {
  api_url: 'http://cs.emingren.com:8085',
  //api_url: 'http://192.168.1.107/YouPuPaperUpload',
  token: '',
  getParamFromUrl,
  formatPToSpan,
  formatFirstPToSpan,
  formatPToSpan2
}

// 1: 截取地址栏中字符串方法
function getParamFromUrl(name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]); return null;
}
function formatPToSpan(txt) {
  //如果传过来的是[2,3]这种形式的字符串会被解析成数组，需要特殊处理
  if (txt && typeof txt === 'object' && Array == txt.constructor) {
    txt = '[' + txt.toString() + ']';
  } else {
    txt = txt.trim();
  }
  if (txt.indexOf("<P>") == 0 || txt.indexOf("<p>") == 0) {
    txt = txt.substring(3, txt.length - 4);
  }
  txt = "<SPAN>" + txt + "</SPAN>";
  // 替换图片地址
  var reg = new RegExp('src="/Public/pic/', "g");

  txt = txt.replace(reg, 'src="http://img.51youpu.com/Public/pic/');

  return txt;
}
function formatPToSpan2(txt) {
  txt = txt.trim();
  var begin = txt.indexOf('<P>');
  var end = txt.lastIndexOf('</P>');
  if (begin != -1) {
    txt = txt.substring(0, begin) + "<SPAN>" + txt.substring(begin + 3, end) + "</SPAN>" + txt.substring(end + 4);
  }
  // 替换图片地址
  var reg = new RegExp('src="/Public/pic/', "g");

  txt = txt.replace(reg, 'src="http://img.51youpu.com/Public/pic/');

  return txt;
}
function formatFirstPToSpan(txt) {
  //如果传过来的是[2,3]这种形式的字符串会被解析成数组，需要特殊处理
  if (txt && typeof txt === 'object' && Array == txt.constructor) {
    txt = '[' + txt.toString() + ']';
  } else {
    txt = txt.trim();
  }
  if(txt.match(/^<p>(.*?)<\/p>/) != null){
    let str = txt.match(/^<p>(.*?)<\/p>/)[1]
    let str2 = txt.replace(/^<p>(.*?)<\/p>/, '')
    txt = '<span>' + str + '</span>' + str2
  }
  // 替换图片地址
  let reg = new RegExp('src="/Public/pic/', "g");
  txt = txt.replace(reg, 'src="http://img.51youpu.com/Public/pic/');
  return txt;
}

