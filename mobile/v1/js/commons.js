var _timeFormat = {
		utcFull			: "YYYY-MM-DD HH:mm:ss Z",
		localFull		: "YYYY-MM-DD HH:mm:ss",
		YYYYMMDDHHmm	: "YYYY-MM-DD HH:mm",
		MMDDHHmm		: "MM-DD HH:mm",
		HHmm	 		: "HH:mm",
		hhmm            : "A hh:mm"    
};

/*
 * LOCAL -> UTC
 */
function modifyUtcTime(time, format) {
	return moment.utc(time).format(format);
}

/*
 * UTC -> LOCAL
 */
function modifyLocalTime(time, format) {
	return moment(time).format(format);
}

function closePopup() {
	if(isMobile.iOS()) {
		window.location = "jscall://closePopup";
	} else {
		window.close();
	}
}

var isMobile =	{
					Android: function() {
						return this.isItem(navigator.userAgent.match(/Android/i));
					},
					BlackBerry: function() {
						return this.isItem(navigator.userAgent.match(/BlackBerry/i));
					},
					iOS: function() {
						return this.isItem(navigator.userAgent.match(/iPhone|iPad|iPod/i));
					},
					Opera: function() {
						return this.isItem(navigator.userAgent.match(/Opera Mini/i));
					},
					Windows: function() {
						return this.isItem(navigator.userAgent.match(/IEMobile/i));
					},
					any: function() {
						return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
					},
					isItem: function(data) {
						if(data == null) 
							return false;
						else 
							return true;
					}
				};

function redirectLoginView() {
	if(isMobile.Android()) {
    	androidInterface.sessionClosed(); 
    } else if(isMobile.iOS()) { 
		window.location = 'jscall://sessionClosed'; 
    }
}

function addComma(n) {
	if(isNaN(n)) {
		return 0;
	}
	var reg = /(^[+-]?\d+)(\d{3})/;   
	n += '';
	while (reg.test(n))
		n = n.replace(reg, '$1' + ',' + '$2');
	return n;
}

function roundXL(n, digits) {
	if (digits >= 0) { 
		var returnTxt = parseFloat(n.toFixed(digits))+"";
		if(returnTxt.indexOf(".") == -1) {
			returnTxt += ".0";
		}
		return returnTxt; // 소수부 반올림
	}
	digits = Math.pow(10, digits); // 정수부 반올림
	var t = Math.round(n * digits) / digits;
	var returnTxt = parseFloat(t.toFixed(0))+"";;
	if(returnTxt.indexOf(".") == -1) {
		returnTxt += ".0";
	}
	return returnTxt;
}

function formatDate(dt) {
    var val = '';  
    if (dt == '' || dt == null || dt == 'undefined'){
        return val;
    }
    
    if (dt.length == 14) {
        val = dt.substring(0,4)+'-'+dt.substring(4,6)+'-'+dt.substring(6,8)+' '+dt.substring(8,10)+':'+dt.substring(10,12); //+':'+dt.substring(12,14);
    }
    else if (dt.length == 12) {
        val = dt.substring(0,4)+'-'+dt.substring(4,6)+'-'+dt.substring(6,8)+' '+dt.substring(8,10)+':'+dt.substring(10,12);
    }
    else if (dt.length == 8) {
        val = dt.substring(0,4)+'-'+dt.substring(4,6)+'-'+dt.substring(6,8);
    }
    else if (dt.length == 6) {
        val = dt.substring(0,4)+'-'+dt.substring(4,6);
    }
    return val;
}

var dateArray = new Array();
var now;
function getDatepickerShowDate() {
	$.ajax({
        type: 'POST',
        url: "<c:url value='/m/trip.do'/>",
        data: "cmd=qSelectUserDrivingTripDate",
        dataType: 'json',
        success: function(data) {
        	if(data.session != null & !data.session) {
        		redirectLoginView();
        	}
        	var list = eval(data.data.IsSelectUserEcoDate);
        	for (var i = 0; i < list.length; i++) {
        		var item = list[i];
        		dateArray.push(item);
        	}
        	var temp = new Date();
        	now = temp.getFullYear() + "-" + (temp.getMonth() + 1) + "-" + temp.getDate(); // 금일 날짜 넣기
        	dateArray.push(now);
        }, error: function(xhr, status, err) {
        	//alert("3 :" + status);
        }
    });
}
