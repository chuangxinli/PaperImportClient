const filters = {
	formatYesOrNo(zeroOrOne) {						// 将 '0' 或 '1' 转化成    是或否
		if(zeroOrOne == '0') {
			return "否";
		} else {
			return "是";
		}
	},
	formatDatetime(timing){								// 时间戳 转化成 YY-MM-DD HH:MM:SS
		let time = new Date(Number(timing));
    let year = time.getFullYear();
    let month = time.getMonth()+1;
    let date = time.getDate();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    return 	year + '-' 
    				+ (month<10 ? '0'+month : month) + '-' 
    				+ (date<10 ? '0' + date : date)+ ' ' 
    				+ (hours<10 ? '0' + hours : hours)+ ':' 
    				+ (minutes<10 ? '0' + minutes : minutes)+ ':' 
    				+ (seconds<10 ? '0' + seconds : seconds);
	}
};
export default filters