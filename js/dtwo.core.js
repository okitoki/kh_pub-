/**D2WO Core*/
var dtwo = {};
(function($) {
    dtwo = {
        version: '0.0.1',	/**스크립트 버전*/
        isWriteLog: true,	/**로그 출력여부*/
        init: function(){
            /**
             * 스크립트 초기설정
             * - CALL 			: dtwo.init();
             * */

            //스크립트디버그여부
            dtwo.isWriteLog = true;
            dtwo.debug(dtwo);
            
            //ajax로딩바
            dtwo.ajaxLoading(true);
            
            

			//이벤트 키정의
            try{
            	document.onkeydown = parent.frame.noEvent;
            }catch (e) {
                dtwo.debug("프레임이 없습니다.["+ e +"]");
			}
        },
        debug: function (msg, data){
            /**
             * 디버그 함수
             * - CALL 			: dtwo.debug(msg, data);
             * - PARAM
             * 		msg 		: 로그메시지
             * 		data 		: 로그오브젝트 Object (생략가능)
             * */

            //로그작성여부
            if(dtwo.isWriteLog){
                if(data) {
                    console.log(msg, data);
                }else{
                    console.log(msg);
                }
            }
        },
        validDate: function (date){
			/**
			 * 날짜여부를 확인
			 * - CALL			: dtwo.validDate(date)	
			 * - PARAM 
			 * 		date 		: 날짜형문자
			 */
			
			if(date.length == 8 ) {
		        year  = date.substring(0,4);
		        month = date.substring(4,6);
		        day   = date.substring(6,8);
		    } else if ( date.length == 6) {
		        year  = date.substring(0,2);
		        month = date.substring(2,4);
		        day   = date.substring(4,6);
		    } else {
		        return false;
		    }

		    if (year < '1900') return false;
		    if (month < '01' || month > '12') return false;
		    if (day < '01' || day > '31') return false;
		    switch (month) {
		        case '02' :  if ((year%4 == 0 && year%100 != 0) || year%400 == 0) {
		                     if (day > 29) return false;
		                  } else {
		                    if (day > 28) return false;
		                  }
		                  break;
		        case '04' :
		        case '06' :
		        case '09' :
		        case '11' : if (day > 30) return false;
		    }
		    return true;
		},
		validTime: function (time){
			/**
			 * 날짜여부를 확인
			 * - CALL			: dtwo.validTime(time)	
			 * - PARAM 
			 * 		time 		: 시간형문자
			 */
			
			if(val.length == 0) return true;
			if(val.length != 6) return false;
			if(parseInt(val) == "NaN") return false;
			
			var hh = val.substr(0, 2);
			var mi = val.substr(2, 2);
			var ss = val.substr(4, 2);
			
			if(parseInt(hh, 10) < 0 || parseInt(hh, 10) > 23) return false;
			if(parseInt(mi, 10) < 0 || parseInt(mi, 10) > 59) return false;
			if(parseInt(ss, 10) < 0 || parseInt(ss, 10) > 59) return false;

		    return true;
		},
		trim: function (str){
			/**
			 * 문자의 앞/뒤 공백을 제거
			 * - CALL			: dtwo.trim(str)	
			 * - PARAM 
			 * 		str 		: 문자열
			 */
			
			var strValue = new String(str)
			return $.trim(strValue);
		},
		getLength: function (str){
			/**
			 * 입력받은 문자열의 Length길이 반환
			 * - CALL			: dtwo.getLength(str)	
			 * - PARAM 
			 * 		str 		: 문자열
			 */
			
			var len = 0;
			if(str != null){
				for(var i = 0; i < str.length; i++) {
					len += str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255 ? 2 : 1;
				}
			}
			return len;
		},
		getByte: function (str){
			/**
			 * 입력받은 문자열의 byte길이 반환
			 * - CALL			: dtwo.getByte(str)	
			 * - PARAM 
			 * 		str 		: 문자열
			 */
			
			if(str == null){
				str = ""
			}
			return unescape(encodeURI(str)).length;
		},
		nvl: function (str, defaultStr){
			/**
			 * 문자열이 ""일경우 defaultStr로 대체
			 * - CALL			: dtwo.nvl(str, defaultStr)	
			 * - PARAM 
			 * 		str 		: 문자열
			 * 		str 		: 대체문자열
			 */
			
			if(defaultStr == null){
				defaultStr = ""
			}
			return (str == "") ? defaultStr : str;
		},
		chkAll: function (allId, chkName){
			/**
			 * 체크박스 전체선택 및 해지
			 * - CALL			: dtwo.chkAll(allId, chkName)
			 * - PARAM
			 * 		allId 		: 전체지정 체크박스 아이디
			 * 		chkName 	: 체크박스 Name
			 */

			$("input:checkbox[name='"+ chkName +"']").click(function(){

				var len = $("input:checkbox[name='"+ chkName +"']").length;
				var chk_len = $("input:checkbox[name='"+ chkName +"']:checked").length;

				if(len == chk_len){
					$("#"+ allId).prop("checked", true);
				}else{
					$("#"+ allId).prop("checked", false);
				}
			});

			$("#"+ allId).click(function(){
				if($(this).is(":checked")){
					$("input:checkbox[name='"+ chkName +"']").prop("checked", true);
				}else{
					$("input:checkbox[name='"+ chkName +"']").prop("checked", false);
				}
			});
		},
		valid: function (objId, msg, ispostfix){
			/**
			 * 입력받은 objId의 값을 확인
			 * - CALL			: dtwo.valid(objId, msg, ispostfix)	
			 * - PARAM 
			 * 		objId 		: 엘레먼트 아이디
			 * 		msg 		: 출력메시지
			 * 		ispostfix   : 메시지 뒷 문구 자동완성 여부 (default : false)
			 */
			objId = "#" + objId;
			if($(objId).length < 1){
				alert("입력하신 ID의 Element가 없습니다!");
				return false;
			} 
			
			//검사할 엘리먼트 속성
			
			var tagName = $(objId)[0].tagName.toLowerCase();	//태그명
			var attrName = $(objId).attr("name");	//태그 Name
			var tagType = "";	//태그타입
			if(tagName == "input"){
				tagType = $(objId).attr("type").toLowerCase();	
			}
			
			var attrValue = "";	//입력값
			var attrSize = 0;	//선택여부 (checkbox or radio버튼)
			var isValid = false;//유효성여부
			
			//체크박스와 라디오의 경우 선택된 값 확인
			if(tagName == "input" && (tagType == "checkbox" || tagType == "radio")){
				attrSize = $(':'+ tagType +'[name="'+ attrName +'"]:checked').size();
				if(attrSize > 0){
					isValid = true;
				}
			}
			
			//텍스트, 셀렉트박스, textarea
			if(		(tagName == "input" && tagType == "text") || 
					(tagName == "input" && tagType == "hidden") || 
					(tagName == "input" && tagType == "password") || 
					(tagName == "input" && tagType == "file") || 
					tagName == "select" || 
					tagName == "textarea"
			){
				attrValue = dtwo.trim($(objId).val());
				if(attrValue != ""){ 
					isValid = true;
				}
			}
			
			//dtwo.debug("tagName", tagName);
			//dtwo.debug("tagType", tagType);
			//dtwo.debug("attrName", attrName);
			//dtwo.debug("attrSize", attrSize);
			//dtwo.debug("attrValue", attrValue);
			
			if(!isValid){
				
				if(!ispostfix){
					
					switch (tagName) {
					case "input":
						//INPUT 타입에 따른 메시지 처리
						switch (tagType) {
						case "text":
							msg = msg + " 입력하세요.";
							break;
						case "hidden":
							msg = msg + " 입력하세요.";
							break;
						case "password":
							msg = msg + " 입력하세요.";
							break;
						case "checkbox":
							msg = msg + " 선택하세요.";
							break;
						case "radio":
							msg = msg + " 선택하세요.";
							break;
						case "file":
							msg = msg + " 파일을 선택하세요.";
							break;
						}
						break;
					case "select":
						msg = msg + " 선택하세요.";
						break;
					case "textarea":
						msg = msg + " 입력하세요.";
						break;
					default:
					}
				}
				
				//메시지 및 포커스 처리
				alert(msg);
			}
			return isValid;
		},
		dateTime: function (inputId){
			/**
			 * 인풋박스의 캘린다
			 * - CALL			: dtwo.dateTime(inputId)	
			 * - PARAM 
			 * 		inputId 	: 아이디
			 */
			
			 $("#" + inputId).bootstrapMaterialDatePicker({
		 	      weekStart: 0,
			      format : 'YYYY-MM-DD HH:mm',
			      shortTime: true,
			      nowButton : false,
			      minDate : new Date(),
			      clearButton: true
			 });
		},
		calendar: function (inputId){
			/**
			 * 인풋박스의 캘린다
			 * - CALL			: dtwo.calendar(inputId)	
			 * - PARAM 
			 * 		inputId 	: 아이디
			 */
			
			 $("#" + inputId).bootstrapMaterialDatePicker({
				 	weekStart: 0,
				    time: false,
				    clearButton: true
			 });
		},
		calendarRange: function (startId, endId){
			/**
			 * 인풋박스의 캘린다
			 * - CALL			: dtwo.calendarRange(startId, endId)	
			 * - PARAM 
			 * 		startId 	: 시작 엘리먼트 아이디
			 * 		endId 		: 종료 엘리먼트 아이디
			 */
			
			  $("#" + endId).bootstrapMaterialDatePicker({ 
				  weekStart : 0,
				  time:false, 
				  clearButton: true
			  });
			  
			  $("#" + startId).bootstrapMaterialDatePicker({ 
				  weekStart : 0,
				  time:false, 
				  clearButton: true 
			  }).on('change', function(e, date){
				  
				  	$("#" + endId).bootstrapMaterialDatePicker('setMinDate', date);
				  	$("#" + endId).bootstrapMaterialDatePicker('setMaxDate', moment(date).add(3600, 'day').format());
		      });
		},
		daterangepicker: function (dataId){
			/**
			 * 인풋박스의 캘린다
			 * - CALL			: dtwo.daterangepicker(dataId)	
			 * - PARAM 
			 * 		dataId 		: 기간 엘리먼트 아이디
			 */
			
			  $("#" + dataId).daterangepicker({
    		  	locale: {
    		      format: 'YYYY-MM-DD',
    		      daysOfWeek: [
    		            "일",
    		            "월",
    		            "화",
    		            "수",
    		            "목",
    		            "금",
    		            "토"
    		      ],
    		      monthNames: [
    		            "1월",
    		            "2월",
    		            "3월",
    		            "4월",
    		            "5월",
    		            "6월",
    		            "7월",
    		            "8월",
    		            "9월",
    		            "10월",
    		            "11월",
    		            "12월"
    		      ],
	    	      customRangeLabel: "직접 기간 설정"
    		    },
    		    ranges: {
    		      '오늘': [moment(), moment()],
    		      '어제': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    		      '지난 7일': [moment().subtract(6, 'days'), moment()],
    		      '지난 30일': [moment().subtract(29, 'days'), moment()],
    		      '이번 달': [moment().startOf('month'), moment().endOf('month')],
    		      '지난 달': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
    		      '이번 연도': [moment().startOf('year'), moment().endOf('year')],
    		      '지난 연도': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')]
    		    },
    		    opens: ($('body').attr('dir') === 'rtl' || $('html').attr('dir') === 'rtl') ? 'right' : 'left'
  		  });
		},
		textMask: function (inputId, maskStr){
			/**
			 * 인풋박스의 입력형태를 전화번호 형태로 고정
			 * - CALL			: dtwo.textMask(inputId, maskStr)	
			 * - PARAM 
			 * 		inputId 	: 아이디
			 * 		maskStr 	: 마스킹값
			 */
			
			
			vanillaTextMask.maskInput({
				inputElement: $("#" + inputId)[0],
				mask: maskStr
			});
		},
		isEmail: function (inputId){
			/**
			 * 인풋박스의 입력형태를 이메일 형태로 고정
			 * - CALL			: dtwo.isEmail(inputId)	
			 * - PARAM 
			 * 		inputId 	: 아이디
			 */
			
			vanillaTextMask.maskInput({
				inputElement: $("#" + inputId)[0],
				mask: textMaskAddons.emailMask
			});
		},
		isMobile: function (inputId){
			/**
			 * 인풋박스의 입력형태를 전화번호 형태로 고정
			 * - CALL			: dtwo.isMobile(inputClass)	
			 * - PARAM 
			 * 		inputId 	: 아이디
			 * 		isTen 		: 자리수 (integer : true, false)
			 */
			 
			var isTen =  $("#" + inputId).val().length;
			//console.log("isTen", isTen);
			
			
			if(isTen == 9){
				dtwo.textMask(inputId, [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]);
			}else if(isTen == 10){
				dtwo.textMask(inputId, [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]);
			}else if(isTen == 11){
				dtwo.textMask(inputId, [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]);
			}else{
				dtwo.textMask(inputId, [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]);
			}
		},
		isCompResno: function (inputId){
			/**
			 * 인풋박스의 입력형태를 사업자 번호 형태로 고정
			 * - CALL			: dtwo.isCompResno(isCompResno)	
			 * - PARAM 
			 * 		inputId 	: 아이디
			 */
			
			dtwo.textMask(inputId, [/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/]);
		},
		isMomeyClass: function (inputClass, isComma){
			/**
			 * 인풋박스의 입력형태를 숫자로 고정
			 * - CALL			: dtwo.isMomeyClass(inputClass, isComma)	
			 * - PARAM 
			 * 		inputClass 	: 숫자형문자
			 * 		isComma 	: 콤마여부 (boolean : true, false)
			 */
			
			$("." + inputClass).on("keyup focusout",function(event){
				
				var val = $(this).val().replace(/[^0-9]/gi,"");
				if(val == ""){
					val = 0;
				}
				
				if(isComma){
					$(this).val(dtwo.setComma(parseInt( val, 10) * 1));
				}else{
					$(this).val(parseInt( val, 10) * 1);
				}
			});
			
			$("." + inputClass).trigger("keyup");
		},
		isMomey: function (inputId, isComma){
			/**
			 * 인풋박스의 입력형태를 숫자로 고정
			 * - CALL			: dtwo.isMomey(inputId, isComma)	
			 * - PARAM 
			 * 		inputId 	: 숫자형문자
			 * 		isComma 	: 콤마여부 (boolean : true, false)
			 */
			
			$("#" + inputId).on("keyup focusout",function(event){
				
				var val = $(this).val().replace(/[^0-9]/gi,"");
				if(val == ""){
					val = 0;
				}
				
				if(isComma){
					$(this).val(dtwo.setComma(parseInt( val, 10) * 1));
				}else{
					$(this).val(parseInt( val, 10) * 1);
				}
			});
			
			$("#" + inputId).trigger("keyup");
		},
		isNumberClass: function (inputClass, isComma){
			/**
			 * 인풋박스의 입력형태를 숫자로 고정
			 * - CALL			: dtwo.isNumberClass(inputClass, isComma)	
			 * - PARAM 
			 * 		inputClass 	: 숫자형문자
			 * 		isComma 	: 콤마여부 (boolean : true, false)
			 */
			
			$("." + inputClass).bind("keyup focusout",function(event){
				
				if(isComma){
					$(this).val(dtwo.setComma($(this).val().replace(/[^0-9]/gi,"")));
				}else{
					$(this).val($(this).val().replace(/[^0-9]/gi,""));
				}
			});

			$("." + inputClass).trigger("keyup");
		},
		isNumber: function (inputId, isComma){
			/**
			 * 인풋박스의 입력형태를 숫자로 고정
			 * - CALL			: dtwo.isNumber(inputId, isComma)	
			 * - PARAM 
			 * 		inputId 	: 숫자형문자
			 * 		isComma 	: 콤마여부 (boolean : true, false)
			 */
			
			$("#" + inputId).bind("keyup focusout",function(event){
				if(isComma){
					$(this).val(dtwo.setComma($(this).val().replace(/[^0-9]/gi,"")));
				}else{
					$(this).val($(this).val().replace(/[^0-9]/gi,""));
				}
	  		});

			$("#" + inputId).trigger("keyup");
		},
		isSlug: function (inputId){
			/**
			 * 인풋박스의 입력형태를 숫자,소문자로 고정
			 * - CALL			: dtwo.isSlug(inputId)	
			 * - PARAM 
			 * 		inputId 	: 아이디
			 */
			
			$("#" + inputId).bind("keyup focusout",function(event){
				$(this).val($(this).val().replace(/[^0-9|A-Z|a-z]/gi,""));
			});
			
			$("#" + inputId).trigger("keyup");
		},
		isBucket: function (inputId){
			/**
			 * 인풋박스의 입력형태를 숫자,소문자로 고정
			 * - CALL			: dtwo.isBucket(inputId)	
			 * - PARAM 
			 * 		inputId 	: 아이디
			 */
			
			$("#" + inputId).bind("keyup focusout",function(event){
				$(this).val($(this).val().replace(/[^0-9a-z-]/gi,"").toLowerCase());
			});
			
			$("#" + inputId).trigger("keyup");
		},
		isFileDir: function (inputId){
			/**
			 * 인풋박스의 입력형태를 파일경로로 고정
			 * - CALL			: dtwo.isFileDir(inputId)	
			 * - PARAM 
			 * 		inputId 	: 숫자형문자
			 */
			
			$("#" + inputId).bind("keydown keyup focusout",function(event){
				$(this).val($(this).val().replace(/[`~!@#$%^&*|\\\'\";:=+?<>,.{}\[\]]/gi,"").replace(/(\/\/)/gi,"/").replace(" ", ""));
			});
			
			$("#" + inputId).trigger("keyup");
		},
		isFolder: function (inputId){
			/**
			 * 인풋박스의 입력형태를 폴더형태로 고정
			 * - CALL			: dtwo.isFolder(inputId)	
			 * - PARAM 
			 * 		inputId 	: 숫자형문자
			 */
			
			$("#" + inputId).bind("keydown keyup focusout",function(event){
				$(this).val($(this).val().replace(/[`~!@#$%^&*|\\\'\";:=+?<>,.{}/\[\]]/gi,"").replace(" ", ""));
			});
			
			$("#" + inputId).trigger("keyup");
		},
		isFile: function (inputId){
			/**
			 * 인풋박스의 입력형태를 폴더형태로 고정
			 * - CALL			: dtwo.isFile(inputId)	
			 * - PARAM 
			 * 		inputId 	: 숫자형문자
			 */
			
			$("#" + inputId).bind("keydown keyup focusout",function(event){
				$(this).val($(this).val().replace(/[`~!@#$%^&*|\\\'\";:=+?<>,{}/\[\]]/gi,""));
			});
			
			$("#" + inputId).trigger("keyup");
		},
		isRequired: function (inputId){
			/**
			 * 인풋박스의 필수값 저장
			 * - CALL			: dtwo.isRequired(inputId)
			 * - PARAM
			 * 		inputId 	: 아이디
			 */

			$("#" + inputId).bind("keyup focusout",function(event){

				$("#" + inputId).removeClass("correct");
				$("#" + inputId).removeClass("wrong");

				var v = $.trim($(this).val());
				if(v == ""){
					$("#" + inputId).addClass("wrong");
				}else{
					$("#" + inputId).addClass("correct");
				}
			});

			//$("#" + inputId).trigger("keyup");
		},
		toast: function (inputId, msg){
			/**
			 * Toast 팝업 호출
			 * - CALL			: dtwo.toast(inputId, msg)
			 * - PARAM
			 * 		inputId 	: 아이디
			 */

			$("#" + inputId).off();
			$("#" + inputId).html("<p class=\"txt_s14\">"+ msg +"</p>");
			$("#" + inputId).animate({
				bottom : '-4px',
				opacity: '1',
			}, 100).delay(1000).animate({
				bottom : '-4px',
				opacity: '0',
			}, 100);
		},
		setComma: function (str){
			/**
			 * 숫자 천단위 콤마찍기
			 * - CALL			: dtwo.setComma(str)	
			 * - PARAM 
			 * 		str 		: 숫자형문자
			 */
			
			str = String(str);
			return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
		},
		unComma: function (str){
			/**
			 * 숫자 천단위 콤마제거
			 * - CALL			: dtwo.unComma(str)	
			 * - PARAM 
			 * 		str 		: 콤마가찍힌 문자
			 */
			str = String(str);
		    return str.replace(/[^\d]+/g, '');
		},
		ajaxLoading: function (state){
			/**
			 * Ajax로딩바를 컨트롤 하는 함수
			 * - CALL 			: dtwo.ajaxLoading(state);
			 * - PARAM 
			 * 		state 		: Ajax로딩 표시여부	
			 * */
			
			if(state){
				//로딩바 바인딩
				$(document).ajaxStart(function(obj){
			    	$("body").append("<div id='ajaxMask'></div>");
			    	$("#viewLoading").fadeIn(50);
					var popMargTop = ($("#viewLoading").height()) / 2; 
					var popMargLeft = ($("#viewLoading").width()) / 2; 
					$("#viewLoading").css({ 
						"margin-top" : -popMargTop,
						"margin-left" : -popMargLeft
					});
					$("#ajaxMask").fadeIn(50);
			    }).ajaxStop(function(){
			        $("#ajaxMask").fadeOut(50 , function() {
			        	$("#viewLoading").fadeOut(50);
						$("#ajaxMask").remove();  
					}); 
			    });
			}
		},
        resizeJqGrid: function (gridId, divId, wid){
            /**
             * jQgrid 화면변경시 넓이 리사이징 함수
             * - CALL 			: dtwo.resizeJqGrid(gridId, divId);
             * - PARAM
             * 		gridId 		: 그리드 아이디
             * 		divId 		: 그리드영역 아이디
             * 		wid 		: 그리드 width (px) 속성 (선택입력)
             * */

            $(window).on("resize", function() {

                //스크롤바 여부
                var grid_wid = parseInt($('#' + divId).width() ,10) -2;
                if(grid_wid < 0){
                    grid_wid = 0;
                }


                if(wid){
                    grid_wid = wid;
                }else{
                    grid_wid = parseInt($('#' + divId).width() ,10) -2;
                }


                var columns = $('#' + gridId).jqGrid('getGridParam', 'colModel');
                var colsTotalWidth = 0;
                var width_state = true;


                for (var i = 0; columns[i]; i++) {
                    colsTotalWidth += columns[i].width;
                }

                if(grid_wid < (colsTotalWidth)){
                    width_state = false;
                }

                //dtwo.debug(grid_wid);
                //dtwo.debug(width_state);
                //dtwo.debug(colsTotalWidth);

                //그리드 Width 재설정
                $('#' + gridId).jqGrid('setCaption', '전체 0건');
                $('#' + gridId).setGridWidth(grid_wid, width_state);
            }).trigger('resize');

        },
        reloadJqGrid: function (gridId, gridData){
			/**
			 * jQgrid 데이터 갱신과 페이지를 그리는 함수
			 * - CALL 			: dtow.reloadJqGrid(gridId, gridData);
			 * - PARAM 
			 * 		gridId 		: 그리드 아이디	
             * 		pagerId 	: 페이지 아이디
			 * 		gridData 	: 그리드 데이타	
			 * */ 
			//그리드객체 존재여부 검사
			if(gridId == null || gridId == "" || !$('#'+gridId)){
				alert("그리드를 찾을수 없습니다!\n[그리드ID : "+ gridId +"]");
				return;
				
			}
			
			//CLEAR 후 APPEND
			$('#'+gridId).jqGrid('clearGridData');
			$('#'+gridId).addRowData(null, gridData);
			
			//데이터 갯수 확인
			var gridRow = $('#'+gridId).getGridParam('reccount');
			var pageInfoText = "총 " + (dtwo.setComma(gridRow)) + " 건";

			//전체건수 출력
            $('#' + gridId).jqGrid('setCaption', pageInfoText);
		},
		setJqPageno: function(gridId, formId, pageno){
			/**
			 * jQgrid 조회시 페이지번호 설정하는 함수
			 * - CALL 			: dtwo.setJqPageno(gridId, formId, pageNo);
			 * - PARAM 
			 * 		gridId 		: 그리드 아이디	
			 * 		formId 		: ajaxSubmit 폼아이디	
			 * 		pageNo 		: 페이지번호 	
			 * */ 
			
			//페이지번호 갱신
			if(pageno == null || pageno == "" || pageno == "undefined"){
				pageno = 1;
			}
			
			//페이지사이즈
			var pagesize = $('#'+gridId).getGridParam('pageSize');
			
			//이전페이지 정보 삭제
			$("#" + formId).find(".grid_pageno").remove();
			$("#" + formId).find(".grid_pagesize").remove();
			
			//페이지정보 출력
			$("#" + formId).prepend("<input type='hidden' name='pageno' id='"+ gridId +"_pageno' class='grid_pageno' value='"+ pageno +"' />");
			$("#" + formId).prepend("<input type='hidden' name='pagesize' id='"+ gridId +"_pagesize' class='grid_pagesize' value='"+ pagesize +"' />");
		},
		callJqPageno: function(gridId, pageno){
			/**
			 * jQgrid 조회시 페이지번호 설정하는 함수
			 * - CALL 			: dtwo.callJqPageno(gridId, pageNo);
			 * - PARAM 
			 * 		gridId 		: 그리드 아이디	
			 * 		formId 		: ajaxSubmit 폼아이디	
			 * 		pageNo 		: 페이지번호 	
			 * */ 
			
			//페이지 처리함수 존재유무 검사
			if($("#"+ gridId).getGridParam("goPage")){
				//그리드의 goPage 함수 호출
				$("#"+ gridId).getGridParam("goPage")(pageno);
			}else{
				alert("goPage가 정의되지 않았습니다.\n[그리드 ID : "+ gridId +"]");
			}
			
			
		},
		reloadPageJqGrid: function (gridId, pagerId, gridData){
			/**
			 * jQgrid 데이터 갱신과 페이지를 그리는 함수
			 * - CALL 			: dtwo.reloadPageJqGrid(gridId, pagerId, gridData);
			 * - PARAM 
			 * 		gridId 		: 그리드 아이디	
			 * 		pagerId 	: 페이지영역 아이디	
			 * 		gridData 	: 그리드 데이타	
			 * */ 
			//그리드객체 존재여부 검사
			if(gridId == null || gridId == "" || !$('#'+gridId)){
				alert("그리드를 찾을수 없습니다!\n[그리드ID : "+ gridId +"]");
				return;
				
			}else if(pagerId == null || pagerId == "" || !$('#'+pagerId)){
				alert("페이지영역을 찾을수 없습니다!\n[페이지ID : "+ pagerId +"]");
				return;
			}
			

			//CLEAR 후 APPEND
			$('#'+gridId).jqGrid('clearGridData');
			$('#'+gridId).addRowData(null, gridData);
			
			
			//데이터 확인
			var totalcount = 0;
			var totalpage = 0;
			var currpage = 0;
			var pagesize = 0;
			var blocksize = 10; //한페지당 페이지수
			var ispaging = true;
			if(gridData != null && Object.keys(gridData).length > 0){
				if(typeof (gridData[0].totalcount) != "undefined"){
					totalcount = parseInt(gridData[0].totalcount, 10);
					totalpage = parseInt(gridData[0].totalpage, 10);
					currpage = parseInt(gridData[0].pageno, 10);
					pagesize = parseInt(gridData[0].pagesize, 10);
				}else{
					ispaging = false;
				}
		    }
			
			var pageInfoText = ""; // 페이지 정보를 담을 변수
			var gridRow = $('#'+gridId).getGridParam('reccount');
			if(ispaging){
				//그리드 rowNum갯수 수정
				$('#'+gridId).jqGrid('setGridParam', {rowNum: totalcount});

				// 페이지 정보 셋팅
				if(totalcount == 0){
					ispaging = false;
					pageInfoText = "총 0 건";
				}else{
					pageInfoText = (dtwo.setComma(gridRow))+ "건 / 총 " + (dtwo.setComma(totalcount)) + " 건";
				}
			}else{
				pageInfoText = "총 " + (dtwo.setComma(gridRow)) + " 건";
			}
			
			
			//전체건수 출력
            $('#' + gridId).jqGrid('setCaption', pageInfoText);

			var table = "";
			table+= "	<div class=\"col-sm-12 col-md-5 ui-jqgrid-info\">";
			table+= "	</div>";
			table+= "	<div class=\"col-sm-12 col-md-7\">";
			table+= "		<div class=\"ui-jqgrid-pager\" >";

			
			
			if(ispaging){
				
				var block = Math.ceil(currpage / blocksize);
				var startpage = (block - 1) * blocksize + 1; 
		    	
		    	// 처음 페이지 번호
		    	var firstpage = 1;
		    	
		    	// 이전 페이지 번호 = 시작 페이지 번호 - 1
		    	var prevpage = (startpage == 1) ? startpage : startpage - 1;
		    	
		    	// 다음 페이지 번호 = 시작 페이지 번호 + 한 페이지당 게시물 수
		    	var nextpage = startpage + blocksize;
		    	
		    	// 끝 페이지 번호 = 전체 페이지 수
		    	var endpage = totalpage;

		    	
				table+= "<ul class=\"ui-jqgrid-pagination\">";
				
				if(totalpage > 10){
					table+= "		<li class=\"paginate_button page-item previous\" ><a href=\"#\" onclick=\"dtwo.callJqPageno('"+ gridId +"', '1'); return false;\"  class=\"page-link\">First</a></li>";
					table+= "		<li class=\"paginate_button page-item previous\" ><a href=\"#\" onclick=\"dtwo.callJqPageno('"+ gridId +"', '"+ prevpage +"'); return false;\"  class=\"page-link\">Previous</a></li>";
				}else{
					table+= "		<li class=\"paginate_button page-item previous disabled\" ><a href=\"#\" onclick=\"dtwo.callJqPageno('"+ gridId +"', '1'); return false;\"  class=\"page-link\">First</a></li>";
					table+= "		<li class=\"paginate_button page-item previous disabled\" ><a href=\"#\" onclick=\"dtwo.callJqPageno('"+ gridId +"', '"+ prevpage +"'); return false;\"  class=\"page-link\">Previous</a></li>";
				}
				
				// 페이징
		    	for( var pagecnt = 1; startpage <= totalpage; startpage++ ) {

		    		if( startpage == currpage ) {
		    			table+= "		<li class=\"paginate_button page-item active\" ><a href=\"#\" onclick=\"dtwo.callJqPageno('"+ gridId +"', '"+ startpage +"'); return false;\" class=\"page-link\" >"+ startpage +"</a></li>";
		    		} else {
		    			table+= "		<li class=\"paginate_button page-item\" ><a href=\"#\" onclick=\"dtwo.callJqPageno('"+ gridId +"', '"+ startpage +"'); return false;\" class=\"page-link\">"+ startpage +"</a></li>";
		    		}
		    		
		    		// 한 블럭당 페이지 수 최대 10개
		    		if( pagecnt == blocksize ){
		    			break;
		    		}
		    		pagecnt++;
		    	}
		    	
		    	if( nextpage > totalpage ) {
		    		nextpage = totalpage;
		    	}
		    	
		    	if(totalpage > 10){
		    		table+= "		<li class=\"paginate_button page-item next\" ><a href=\"#\" onclick=\"dtwo.callJqPageno('"+ gridId +"', '"+ nextpage +"'); return false;\"  class=\"page-link\">Next</a></li>";
		    		table+= "		<li class=\"paginate_button page-item next\" ><a href=\"#\" onclick=\"dtwo.callJqPageno('"+ gridId +"', '"+ totalpage +"'); return false;\"  class=\"page-link\">Last</a></li>";
		    	}else{
		    		table+= "		<li class=\"paginate_button page-item next disabled\" ><a href=\"#\" onclick=\"dtwo.callJqPageno('"+ gridId +"', '"+ nextpage +"'); return false;\"  class=\"page-link\">Next</a></li>";
		    		table+= "		<li class=\"paginate_button page-item next disabled\" ><a href=\"#\" onclick=\"dtwo.callJqPageno('"+ gridId +"', '"+ totalpage +"'); return false;\"  class=\"page-link\">Last</a></li>";
		    	}
				table+= "</ul>";
			}
			
			
			
			table+= "		</div>";
			table+= "	</div>";

			
			//console.log(table);
			
			//페이징 출력
			$("#"+pagerId).html("");
			$("#"+pagerId).html(table);
		},
		popup: function (path, name, w, h){
			/**
			 * 윈도우팝업 함수
			 * - CALL			: dtwo.popup(path, name, w, h)	
			 * - PARAM 
			 * 		path 		: 팝업호출경로
			 * 		name 		: 팝업이름
			 * 		w	 		: width값
			 * 		h	 		: height값
			 */
			
			var settings = {
					height:600, 	//윈도우의 높이를 픽셀 단위로 설정
					width:600, 		// 윈도우의 너비를 픽셀 단위로 설정
					toolbar:0, 		// 도구 모음 (앞으로 및 뒤로 단추 포함)이 {1 (예) 또는 0 (아니오)}으로 표시되는지 여부를 결정
					scrollbars:1,  	// 스크롤 막대가 {1 (YES) 또는 0 (NO)} 창에 나타날지 여부를 결정
					status:0,  		// 상태 줄이 창 {1 (YES) 또는 0 (NO)}의 맨 아래에 표시되는지 여부.
					resizable:1, 	// 창 크기를 조정할 수 있는지 여부는 {1 (예) 또는 0 (아니오)}입니다. resizable을 사용하여 오버로드 될 수도 있습니다.
					left:0, 		// 창이 나타날 때 왼쪽 위치.
					top:0, 			// 윈도우가 나타날 때의 최상위 위치.
					center:1, 		// 창 중앙에 위치여부 {1 (예) 또는 0 (아니오)}. 위쪽과 왼쪽을 무시
					createnew:1, 	// 새창여부 {1 (YES) 또는 0 (NO)}
					location:0, 	// 주소 표시 줄이 {1 (YES) 또는 0 (NO)}으로 표시되는지 여부
					menubar:0,  	// 메뉴 막대가 {1 (YES) 또는 0 (NO)}으로 표시되는지 여부
					onUnload:null 	// 윈도우가 닫힐 때 호출 할 함수
				};
			
			//정중앙값 설정
			if (settings.center == 1){
				settings.top = (screen.height-(settings.height + 110))/2;
				settings.left = (screen.width-settings.width)/2;
			}
			
			//팝업크기 설정
			if(h != null && h > 0){
				settings.height = h;
			}
			if(w != null && w > 0){
				settings.width = w;
			}
			
			
			
			var parameters = "location=" + settings.location + ",menubar=" + settings.menubar + ",height=" + settings.height + ",width=" + settings.width + ",toolbar=" + settings.toolbar + ",scrollbars=" + settings.scrollbars  + ",status=" + settings.status + ",resizable=" + settings.resizable + ",left=" + settings.left  + ",screenX=" + settings.left + ",top=" + settings.top  + ",screenY=" + settings.top;
			var winObj = window.open(path, name, parameters);
			winObj.focus();

		},
		modalLoad: function (path, formId, loc){
			/**
			 * 모달로드 함수
			 * - CALL			: dtwo.modal(path, formId, loc)	
			 * - PARAM 
			 * 		path 		: 팝업호출경로
			 * 		formId 		: 폼아이디
			 * 		loc 		: 모달스타일
			 */
			
			//모달영역 비우기
			$("#modals-area").empty();
			
			//모달스타일 수정
			$("#modals-area").removeClass("modal-top");
			$("#modals-area").removeClass("modal-slide");
			if(loc == "modals-top"){
				$("#modals-area").addClass("modal-top");
			}else if(loc == "modals-slide"){
				$("#modals-area").addClass("modal-slide");
			}
			
			
			if(formId == null || formId == "") {
				//단순링크
				$.ajax({
			        type: "POST",
					url:path,
			        cache: false,
			        async: false,
			        global: false,
			        dataType:"html",
			        success: function(obj) {
						$("#modals-area").html(obj);
						$("#modals-area").modal("show");
			        },
					error:function (){
						alert("서버와 통신 실패");
					}
			  	});
				
			}else{
				
				//ajax 호출
				var options = { 
						target:'_self', 
						success: function(obj){
							$("#modals-area").html(obj);
							$("#modals-area").modal("show");
						},
						url:path,
						type:"post",
						dataType:"html",
						resetForm: false, 
				        global: false,
						timeout:20000};
				$("#"+formId).ajaxSubmit(options);
			}
		},
		modal: function (path, formId){
			/**
			 * 모달 함수
			 * - CALL			: dtwo.modal(path, formId)	
			 * - PARAM 
			 * 		path 		: 팝업호출경로
			 * 		formId 		: 폼아이디
			 */
			
			if(formId == null || formId == "") {
				formId = "";
			}
			
			dtwo.modalLoad(path, formId, "modals-default");
		},
		modalTop: function (path, formId){
			/**
			 * 모달 함수
			 * - CALL			: dtwo.modal(path, formId)	
			 * - PARAM 
			 * 		path 		: 팝업호출경로
			 * 		formId 		: 폼아이디
			 */
			
			if(formId == null || formId == "") {
				formId = "";
			}
			
			dtwo.modalLoad(path, formId, "modals-top");
		},
		modalSlide: function (path, formId){
			/**
			 * 모달 함수
			 * - CALL			: dtwo.modal(path, formId)	
			 * - PARAM 
			 * 		path 		: 팝업호출경로
			 * 		formId 		: 폼아이디
			 */
			
			if(formId == null || formId == "") {
				formId = "";
			}
			
			dtwo.modalLoad(path, formId, "modals-slide");
		},
		userMmodal: function (path, formId){
			/**
			 * 모달로드 함수
			 * - CALL			: dtwo.userMmodal(path, formId)
			 * - PARAM
			 * 		path 		: 팝업호출경로
			 * 		formId 		: 폼아이디
			 */

			//모달영역 비우기
			$("#user-modals-area").empty();



			if(formId == null || formId == "") {
				//단순링크
				$.ajax({
					type: "POST",
					url:path,
					cache: false,
					async: false,
					global: false,
					dataType:"html",
					success: function(obj) {
						$("#user-modals-area").html(obj);
						$("#user-modals-area").show();

						var modalId = $("#user-modals-area > div:first").attr("id");
						console.log("modalId1", modalId);
						popOpen(modalId);
					},
					error:function (){
						alert("서버와 통신 실패");
					}
				});

			}else{

				//ajax 호출
				var options = {
					target:'_self',
					success: function(obj){
						$("#user-modals-area").html(obj);
						$("#user-modals-area").show();

						var modalId = $("#user-modals-area > div:first").attr("id");
						console.log("modalId1", modalId);
						popOpen(modalId);

					},
					url:path,
					type:"post",
					dataType:"html",
					resetForm: false,
					global: false,
					timeout:20000};
				$("#"+formId).ajaxSubmit(options);
			}
		},
		clipboard: function (copyTxt){
			/**
			 * 클립보드 복사
			 * - CALL			: dtwo.clipboard(copyTxt)	
			 * - PARAM 
			 * 		copyTxt		: 클립보드 복사문자열
			 */
			
			if (Clipboard.isSupported()) {
				$("#_clipboard_copy_button").remove();
				var button = $('<button></button>');
	    		button.attr('data-clipboard-text', copyTxt);
	    		button.attr('id', '_clipboard_copy_button');
	    		button.appendTo('body');
				var dtwo_clipboard = new Clipboard("#_clipboard_copy_button");
				$("#_clipboard_copy_button").trigger("click");
				$("#_clipboard_copy_button").remove();
				dtwo_clipboard.destroy();
				dtwo.toastr('', "클립보드에 복사되었습니다.", "success");
			}else{
				dtwo.toastr('', "클립보드 복사가 지원하지 않습니다!", "error");
			}
		},
		toastr: function (title, msg, type){
			/**
			 * 클립보드 복사
			 * - CALL			: dtwo.toastr(title, msg, type)	
			 * - PARAM 
			 * 		title		: 노티제목
			 * 		msg			: 노티내용
			 * 		msg			: 효과 (success, info, warning, error)
			 */
			
			msg   = msg || '';
		    title = title || '';
		    type  = type || 'success';
			
			 toastr[type](msg, title, {
			      positionClass:     'toast-bottom-right',
			      closeButton:       true,
			      progressBar:       true,
			      preventDuplicates: false,
			      newestOnTop:       true,
			      rtl:               $('body').attr('dir') === 'rtl' || $('html').attr('dir') === 'rtl'
		    });
			
		},
		zipcode: function (zipId, addrId, focusId){
			/**
			 * 캘린다 지정
			 * - CALL			: dtwo.zipcode(zipId, addrId, focusId)	
			 * - PARAM 
			 * 		zipId 		: 우편번호 엘리먼트 아이디
			 * 		addrId 		: 주소 엘리먼트 아이디
			 * 		focusId 	: 포커스 엘리먼트 아이디
			 */
			
			//우편번호조회
			new daum.Postcode({
	            oncomplete: function(data) {
	            	
	                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
	                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
	                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
	                var fullAddr = ''; // 최종 주소 변수
	                var extraAddr = ''; // 조합형 주소 변수

	                // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
	                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
	                    fullAddr = data.roadAddress;

	                } else { // 사용자가 지번 주소를 선택했을 경우(J)
	                    fullAddr = data.jibunAddress;
	                }

	                // 사용자가 선택한 주소가 도로명 타입일때 조합한다.
	                if(data.userSelectedType === 'R'){
	                    //법정동명이 있을 경우 추가한다.
	                    if(data.bname !== ''){
	                        extraAddr += data.bname;
	                    }
	                    // 건물명이 있을 경우 추가한다.
	                    if(data.buildingName !== ''){
	                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
	                    }
	                    // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
	                    fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
	                }

	                
	                //결과지정
	                if(zipId){
	                	$("#" + zipId).val(data.zonecode);
	                }
	                if(addrId){
	                	$("#" + addrId).val(fullAddr);
	                }
	                if(focusId){
	                	$("#" + focusId).focus();
	                }
	            }
	        }).open();
			
		},
		zipcodeIFrameClose: function (iframeId){
			/**
			 * 우편번호 지정
			 * - CALL			: dtwo.zipcodeIFrameClose(iframeId)	
			 * - PARAM 
			 * 		iframeId 	: 프레임 아이디
			 */
			var element_wrap = document.getElementById(iframeId);
			element_wrap.style.display = 'none';
		},
		zipcodeIFrame: function (zipId, addrId, focusId, iframeId){
			/**
			 * 우편번호 지정
			 * - CALL			: dtwo.zipcodeIFrame(zipId, addrId, focusId, iframeId)	
			 * - PARAM 
			 * 		zipId 		: 우편번호 엘리먼트 아이디
			 * 		addrId 		: 주소 엘리먼트 아이디
			 * 		focusId 	: 포커스 엘리먼트 아이디
			 * 		iframeId 	: 프레임 아이디
			 */
			
			// 현재 scroll 위치를 저장해놓는다.
			var element_wrap = document.getElementById(iframeId);
	        var currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
	        new daum.Postcode({
	            oncomplete: function(data) {
	                // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
	
	                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
	                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
	                var addr = ''; // 주소 변수
	                var extraAddr = ''; // 참고항목 변수
	
	                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
	                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
	                    addr = data.roadAddress;
	                } else { // 사용자가 지번 주소를 선택했을 경우(J)
	                    addr = data.jibunAddress;
	                }
	
	                // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
	                if(data.userSelectedType === 'R'){
	                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
	                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
	                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
	                        extraAddr += data.bname;
	                    }
	                    // 건물명이 있고, 공동주택일 경우 추가한다.
	                    if(data.buildingName !== '' && data.apartment === 'Y'){
	                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
	                    }
	                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
	                    if(extraAddr !== ''){
	                        extraAddr = ' (' + extraAddr + ')';
	                    }
	                }
	
	                // 우편번호와 주소 정보를 해당 필드에 넣는다.
	                if(zipId){
	                	$("#" + zipId).val(data.zonecode);
	                }
	                if(addrId){
	                	$("#" + addrId).val(addr);
	                }
	                if(focusId){
	                	$("#" + focusId).focus();
	                }
	                
	                
	
	                // iframe을 넣은 element를 안보이게 한다.
	                // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
	                element_wrap.style.display = 'none';
	
	                // 우편번호 찾기 화면이 보이기 이전으로 scroll 위치를 되돌린다.
	                document.body.scrollTop = currentScroll;
	            },
	            // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분. iframe을 넣은 element의 높이값을 조정한다.
	            onresize : function(size) {
	                element_wrap.style.height = size.height+'px';
	            },
	            width : '100%',
	            height : '100%'
	        }).embed(element_wrap);
	
	        // iframe을 넣은 element를 보이게 한다.
	        element_wrap.style.display = 'block';
			
		}
		
		
    };
    dtwo.init();

}(jQuery));




