
export default {
  api_url: 'http://cs.emingren.com:8085',
  //api_url: 'http://192.168.1.107/YouPuPaperUpload',
  token: '',
  getParamFromUrl,
  formatPToSpan,
  formatFirstPToSpan,
  formatPToSpan2,
  numToChinese,
  removePtag,
  addPtag
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
//将第一个P标签替换为span标签并且去掉空的p标签
function formatFirstPToSpan(txt) {
  //如果传过来的是[2,3]这种形式的字符串会被解析成数组，需要特殊处理
  if (txt && typeof txt === 'object' && Array == txt.constructor) {
    txt = '[' + txt.toString() + ']';
  } else {
    txt = txt.trim();
  }
  if(txt.match(/^<p>(.*?)<\/p>/) != null){
    let str = txt.match(/^<p>(.*?)<\/p>/)[1]
    let str2 = txt.replace(/^<p>(.*?)<\/p>/, '').replace(/<p>\s*<\/p>/g, '')
    txt = '<span>' + str + '</span>' + str2
  }
  // 替换图片地址
  let reg = new RegExp('src="/Public/pic/', "g");
  txt = txt.replace(reg, 'src="http://img.51youpu.com/Public/pic/');
  return txt;
}

// 1-99 转化成 一-九十九
function numToChinese(num){
	switch(num){
		case 1: return "一"; break;
		case 2: return "二"; break;
		case 3: return "三"; break;
		case 4: return "四"; break;
		case 5: return "五"; break;
		case 6: return "六"; break;
		case 7: return "七"; break;
		case 8: return "八"; break;
		case 9: return "九"; break;
		case 10: return "十"; break;
		
		case 11: return "十一"; break;
		case 12: return "十二"; break;
		case 13: return "十三"; break;
		case 14: return "十四"; break;
		case 15: return "十五"; break;
		case 16: return "十六"; break;
		case 17: return "十七"; break;
		case 18: return "十八"; break;
		case 19: return "十九"; break;
		case 20: return "二十"; break;
		
		case 21: return "二十一"; break;
		case 22: return "二十二"; break;
		case 23: return "二十三"; break;
		case 24: return "二十四"; break;
		case 25: return "二十五"; break;
		case 26: return "二十六"; break;
		case 27: return "二十七"; break;
		case 28: return "二十八"; break;
		case 29: return "二十九"; break;
		case 30: return "三十"; break;
		
		case 31: return "三十一"; break;
		case 32: return "三十二"; break;
		case 33: return "三十三"; break;
		case 34: return "三十四"; break;
		case 35: return "三十五"; break;
		case 36: return "三十六"; break;
		case 37: return "三十七"; break;
		case 38: return "三十八"; break;
		case 39: return "三十九"; break;
		case 40: return "四十"; break;
		
		case 41: return "四十一"; break;
		case 42: return "四十二"; break;
		case 43: return "四十三"; break;
		case 44: return "四十四"; break;
		case 45: return "四十五"; break;
		case 46: return "四十六"; break;
		case 47: return "四十七"; break;
		case 48: return "四十八"; break;
		case 49: return "四十九"; break;
		case 50: return "五十"; break;
		
		case 51: return "五十一"; break;
		case 52: return "五十二"; break;
		case 53: return "五十三"; break;
		case 54: return "五十四"; break;
		case 55: return "五十五"; break;
		case 56: return "五十六"; break;
		case 57: return "五十七"; break;
		case 58: return "五十八"; break;
		case 59: return "五十九"; break;
		case 60: return "六十"; break;
		
		case 61: return "六十一"; break;
		case 62: return "六十二"; break;
		case 63: return "六十三"; break;
		case 64: return "六十四"; break;
		case 65: return "六十五"; break;
		case 66: return "六十六"; break;
		case 67: return "六十七"; break;
		case 68: return "六十八"; break;
		case 69: return "六十九"; break;
		case 70: return "七十"; break;
		
		case 71: return "七十一"; break;
		case 72: return "七十二"; break;
		case 73: return "七十三"; break;
		case 74: return "七十四"; break;
		case 75: return "七十五"; break;
		case 76: return "七十六"; break;
		case 77: return "七十七"; break;
		case 78: return "七十八"; break;
		case 79: return "七十九"; break;
		case 80: return "八十"; break;
		
		case 81: return "八十一"; break;
		case 82: return "八十二"; break;
		case 83: return "八十三"; break;
		case 84: return "八十四"; break;
		case 85: return "八十五"; break;
		case 86: return "八十六"; break;
		case 87: return "八十七"; break;
		case 88: return "八十八"; break;
		case 89: return "八十九"; break;
		case 90: return "九十"; break;
		
		case 91: return "九十一"; break;
		case 92: return "九十二"; break;
		case 93: return "九十三"; break;
		case 94: return "九十四"; break;
		case 95: return "九十五"; break;
		case 96: return "九十六"; break;
		case 97: return "九十七"; break;
		case 98: return "九十八"; break;
		case 99: return "九十九"; break;
		case 100: return "一百"; break;
		default: 						   break;
	}
}
function removePtag(str){
	if(str != ''){
		if(str.indexOf('<p>') > -1){
			let str_new = str.replace('<p>','').replace('</p>','');
			return str_new;
		}else{
			return str;
		}
	}else{
		return '';
	}
}
function addPtag(str){
	return '<p>' + str + '</p>';
}
