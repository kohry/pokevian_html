var isMobile =  {
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

function getInternetExplorerVersion() {    
    var rv = -1; // Return value assumes failure.    
    if (navigator.appName == 'Microsoft Internet Explorer') {        
         var ua = navigator.userAgent;        
         var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");        
         if (re.exec(ua) != null)            
             rv = parseFloat(RegExp.$1);    
        }    
    return rv; 
} 

function ajaxExecute(url, method, resultType, param, callback) {
	if(method == null) {
		method = "POST";
	}
	
	if(url == null) {
		alert("ERROR");
		return;
	}
	
	if(resultType == null) {
		resultType = "json";
	}
	
	$.ajax({
		type: method
		, url: url
		, data: param
		, dataType: resultType
		, success: callback
		,error: function(request,status,error) {
			alert(error);
		}
	});
}

/**
 * JQuery 버젼업으로 작동하지 않음. 필요하면 수정할 것.
 * Ajax call setup
 */
function ajaxSetup() {
    $.ajaxSetup({
        beforeSend: function(xhr) {
            xhr.setRequestHeader("AJAX", true);
        },
        
        error: function(xhr, status, err) {
/*            alert(xhr.status);
            
            //Unauthorized 
            if (xhr.status == 401) {
                alert('go 401 page');
            }
            //Forbidden
            else if (xhr.status == 403) {
                alert('go 403 page');
            }
            //Not Acceptable (세션종료) 
            else if (xhr.status == 406) {
                alert('go login page');
            }
            else {
                alert('go exception page');
            }*/
        }
    });
}

/**
 * Ajax Error 메시지 생성
 * @param request
 * @param status
 * @param error
 */
function getAjaxErrorMsg(request,status,error) {
    return  "code:" + request.status + "\n" + 
            "error:" + error + "\n" +
            "message:" + request.responseText;
}

/**
 * keydown 이벤트에서 양의 정수만 입력시키는 이벤트
 * @param event
 * @returns {Boolean}
 */
function keydownUnsignedIntOnly(event) {
    var keycode = (event.keycode ? event.keycode : event.which);
    //alert(keycode);
    //alert(event.shiftKey);
    if (keycode >= 48 && keycode <= 57 && !event.shiftKey) return true; // 0~9 까지의 키 값
    if (keycode >= 16 && keycode <= 18) return true;                    // Shift,Ctrl,Alt키 값
    if (keycode >= 37 && keycode <= 40) return true;                    // 방향키값
    if (keycode >= 33 && keycode <= 36 ) return true;                   // PageUp, PageDn, End, Home키 값 
    if (keycode == 8 || keycode == 9  || keycode == 13) return true;    // Backspace, Tab, Enter키 값 
    if (keycode == 27 || keycode == 45 || keycode == 46) return true;   // Esc, Insert, Delete키 값 
    if (keycode >= 112 && keycode <= 123) return true;                  // 펑션키값
    return false;
}

/**
 * 테이블 오브젝트의 특정 행 선택시 css 처리 
 * @param icon - &lt;td&gt;태그 오브젝트
 */
function selDisplay(icon) {
    var tr = $(icon).parent().parent();
    tr.parent().find('td').css('background-color', '');
    tr.find('td').css('background-color', '#FFFFC8');
}

/**
 * 테이블 오브젝트의 특정 행 선택시 css 처리 
 * @param tr - &lt;tr&gt;태그 오브젝트
 */
function selDisplayTr(tr) {
    $(tr).parent().find('td').css('background-color', '');
    $(tr).find('td').css('background-color', '#FFFFC8');
}

/**
 * 테이블 오브젝트의 각 행의 css를 교대로 셋팅하고 mouseover 이벤트를 처리한다  
 * @param id - &lt;table&gt;오브젝트의 id
 */
function paintGrid(id) {
    //stripeTables();
    //highlightRows();
    $("#"+id+" tbody tr:odd").addClass("odd");
    $("#"+id+" tbody tr").mouseover(function() {
        $(this).addClass("highlight");
    });
    $("#"+id+" tbody tr").mouseout(function() {
        $(this).removeClass("highlight");
    });
}

function initTabs(cnt, no, sub) {
    if (!sub) {
        for (var i = 0; i < gvclonetables.length; i++) {
            var clone = gvclonetables[i];
            clone.hide();
        }
    }
    for (var i = 1; i <= cnt; i++) {
        if (i == no) {
            if ($('#tab'+i+'_top'+(sub||'')).hasClass("off")) {
                $('#tab'+i+'_top'+(sub||'')).removeClass("off");
                $('#tab'+i+'_top'+(sub||'')).addClass("on");
            }
        }
        else {
            if ($('#tab'+i+'_top'+(sub||'')).hasClass("on")) {
                $('#tab'+i+'_top'+(sub||'')).removeClass("on");
                $('#tab'+i+'_top'+(sub||'')).addClass("off");
            }
        }        
        $('#tab'+i+'_page'+(sub||'')).hide();
    }
    $('#tab'+no+'_page'+(sub||'')).show();
}

function formReset(frmId){
    $('#'+frmId)[0].reset();
    $('#'+frmId).find('input[type=hidden]').each(function(){
        $(this).val('');
    });
}

function formSerialize(id) {
    var disabled = $(":disabled");
    $(":disabled").each(function() {
        $(this).removeAttr("disabled");
    });
    
    var form = $('<form></form>');
    var sc = $(id).serializeArray();

    for (var i = 0; i < sc.length; i++) {
        //alert(sc[i].name);
        var el = $("<input type='hidden'/>");
        if (sc[i].name.indexOf("i_") == 0)
            el.attr('name', sc[i].name.substring("i_".length));
        else if (sc[i].name.indexOf("h_") == 0)
            el.attr('name', sc[i].name.substring("h_".length));
        else if (sc[i].name.indexOf("s_") == 0)
            el.attr('name', sc[i].name.substring("s_".length));
        else if (sc[i].name.indexOf("a_") == 0)
            el.attr('name', sc[i].name.substring("a_".length));
        else
            el.attr('name', sc[i].name);
        
        if (sc[i].name.indexOf("_dy") > -1)
            el.val(sc[i].value.replace(/-/gi,''));
        else
            el.val(sc[i].value);
        //alert(sc[i].name+" : "+sc[i].value);
        el.appendTo(form);
    }
    
    disabled.attr("disabled", true);
    
    form.appendTo($("body"));
    return form.serialize();
}

/**
 * Date 객체를 yyyyMMddHHmmss로 변환 리턴. 구분자를 옵션으로 줄 수 있다. 구분자가 없으면 yyyy-MM-dd HH:nn:ss 형식이다.
 * @param dateObj - Date 객체
 * @param dateDivider - 년월일 사이의 구분자. 주지 않으면 -
 * @param timeDivider - 시분초 사이의 구분자. 주지 않으면 :
 * @returns {String}
 */
function dateToString(dateObj, dateDivider, midDivider, timeDivider){
    var year = dateObj.getFullYear();
    var month = dateObj.getMonth()+1;
    var day = dateObj.getDate();
    var hour = dateObj.getHours();
    var min = dateObj.getMinutes();
    var sec = dateObj.getSeconds();

    if (dateDivider == null) dateDivider = "-";
    if (midDivider == null) midDivider = " ";
    if (timeDivider == null) timeDivider = ":";
    
    if(month < 10) {
        month = "0"+month;
    }
    if(day < 10) {
        day = "0"+day;
    }
    if(hour < 10) {
        hour = "0"+hour;
    }
    if(min < 10) {
        min = "0"+min;
    }
    if(sec < 10) {
        sec = "0"+sec;
    }
    
    return year + dateDivider + month + dateDivider + day + midDivider + hour + timeDivider + min + timeDivider + sec;
}

/**
 * UTC 시간대의 Date 객체를 로컬 시간대의 Date 객체로 변환한다
 * @param dateObj
 * @returns {Date}
 */
function toLocalDate(dateObj) {
    var diff = -1 * dateObj.getTimezoneOffset() * 60 * 1000;
    
    dateObj.setMilliseconds(dateObj.getMilliseconds() + diff);
    return dateObj;
}


/**
 * 영문자로 시작하고 점(.)은 중간에 하나만 허용되며 숫자,영문자,언더바(_)만 허용되는 패턴의 문자열 검사
 * @param str
 * @returns boolean
 */
function checkPatternOfId(str) {
    var pattern = /^[a-zA-Z]\w*.?\w+$/;
    return pattern.test(str);
}

/**
 * 숫자,영소문자,영대문자,특수문자 패턴의 비밀번호 패턴 검사
 * Whitespace는 허용하지 않음
 * @param str
 * @returns boolean
 */
function checkPatternOfPasswd(str) {
    var pattern;
    
    // 특수문자, 숫자, 영소문자 패턴 검사
    pattern = /^(?=.*\W)(?=.*\d)(?=.*[a-z])(?!.*\s).{8,20}$/g;
    if (pattern.test(str)) return true;
    
    // 특수문자, 영소문자, 영대문자 패턴 검사
    pattern = /^(?=.*\W)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,20}$/g;
    if (pattern.test(str)) return true;
    
    // 특수문자, 숫자, 영대문자 패턴 검사
    pattern = /^(?=.*\W)(?=.*\d)(?=.*[A-Z])(?!.*\s).{8,20}$/g;
    if (pattern.test(str)) return true;
    
    // 숫자, 영소문자, 영대문자 패턴 검사
    pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,20}$/g;
    if (pattern.test(str)) return true;
    
    return false;
}

/**
 * 이메일 패턴의 문자열 검사
 * @param str
 * @returns
 */
function checkPatternOfEmail(str) {
    var pattern = /^[a-zA-Z]\w*.?\w+@[a-zA-Z]\w*.[a-zA-Z]+.?[a-zA-Z]+$/;
    return pattern.test(str);
}

$(function() {
	try{
		$.datepicker.regional['ko'] = {
		        closeText: '닫기',
		        prevText: '이전달',
		        nextText: '다음달',
		        currentText: '오늘',
		        monthNames: ['1월','2월','3월','4월','5월','6월', '7월','8월','9월','10월','11월','12월'],
		        monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		        dayNames: ['일','월','화','수','목','금','토'],
		        dayNamesShort: ['일','월','화','수','목','금','토'],
		        dayNamesMin: ['일','월','화','수','목','금','토'],
		        dateFormat: 'yy-mm-dd',
		        firstDay: 0,
		        isRTL: false
		    };
			
			// datepicker 설정.
		    $.datepicker.setDefaults(
				$.extend(
					{
						showMonthAfterYear: true, 
						//showButtonPanel: true
						changeMonth: true,
						changeYear: true
					},
					$.datepicker.regional['ko']
				)
		    );
	} catch(e) {
		//
	}
});

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

var _timeFormat = {
		utcFull			: "YYYY-MM-DD HH:mm:ss Z",
		localFull		: "YYYY-MM-DD HH:mm:ss",
		YYYYMMDDHHmm	: "YYYY-MM-DD HH:mm",
		MMDDHHmm		: "MM-DD HH:mm",
		HHmm	 		: "HH:mm",
		hhmm            : "A hh:mm"
};

/**
 * 기상.날씨 아이콘 코드 얻기
 * @param jsonData
 * @returns
 */
function getWeatherIcon(jsonData) {
    var result = "";
    if (jsonData == null || jsonData == "") return "";
    
    var weatherData = eval("(" + jsonData + ")");
    if (weatherData != null && weatherData.weather[0] != null && weatherData.weather[0].icon != null)
        result =  weatherData.weather[0].icon.substring(0,2);
    
    return result;
}

/**
 * 기상.온도(섭씨로 변환) 얻기
 * @param jsonData
 * @returns
 */
function getWeatherTemp(jsonData) {
    if (jsonData == null || jsonData == "") return "";
    var weatherData = eval("(" + jsonData + ")");
    return Math.round(Number(weatherData.main.temp) - 273.15);
}
