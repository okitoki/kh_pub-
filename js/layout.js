$(function() {
	$('.header').load("/static/user/pages/layout/header.html .h_inner", function(){
		// 헤더 인클루드 

		// 스크롤시 헤더 상단고정!
		$(window).scroll(function() {
			if ($(this).scrollTop() > 0) {
				$('.header').addClass('fixed');
			} else {
				$('.header').removeClass('fixed');
			}
		});
	});

	// 모바일 하단 tap bar 인클루드 
	$('.mo_tap_bar').load("/static/user/pages/layout/mobile_tap_bar.html .mot_lists_w", function(){
		moTapActive(motActive);
	});

	// 스크롤시 헤더 상단고정!
	$(window).scroll(function() {
		if ($(this).scrollTop() > 0) {
			$('.header').addClass('fixed');
		} else {
			$('.header').removeClass('fixed');
		}
	});

	$('.bubble_wrap .btnIcon_help').click(function() {
		if($(this).hasClass('show')) {
			$(this).next('.bubble_pop').hide();
			$(this).removeClass('show');
		} else {
			$(this).next('.bubble_pop').show();
			$(this).addClass('show');
		}
	});

	$('.bubble_pop .btn_close').click(function() {
		$('.btnIcon_help').removeClass('show');
		$('.bubble_pop').hide();
	});

	$('.facilities_wrap .btnLine_dark').click(function() {
		if($(this).hasClass('toggle')) {
			$(this).next('.fcw_inner').slideToggle();
			$(this).removeClass('toggle');
		} else {
			$(this).next('.fcw_inner').slideToggle();
			$(this).addClass('toggle');
		}
	});

	/* 카드 버튼 말풍선 노출/숨김 */
	$('.cb_btn_w li button').mouseover(function() {
		$(this).next('.ballon').show();
	});
	$('.cb_btn_w li button').mouseleave(function() {
		$(this).next('.ballon').hide();
	});

	/* 문의하기 답변 상세보기 버튼 */
	$('.contact .btn_w .btnLine_dark').click(function() {
		if($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).parent().parent().find('.reply_wrap').hide();
			$(this).find('.txt_s12').text('상세보기');
		} else {
			$(this).addClass('active');
			$(this).parent().parent().find('.reply_wrap').show();
			$(this).find('.txt_s12').text('상세닫기');
		}
	})

	$('.facilities_wrap .btnLine_dark').click(function() {
		if($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).next('.fcw_inner').hide();
		} else {
			$(this).addClass('active');
			$(this).next('.fcw_inner').show();
		}
	});	
});

// 모바일 하단 tap 활성화
var motActive;
function moTapActive(_motActive) {
	if (_motActive == 0) {
		$('.mot_lists_w [class^="btnIcon_tap"]').parent().removeClass('on');
	} else {
		$('.mot_lists_w > .mot_list:eq(' + (_motActive - 1) + ') > [class^="btnIcon_tap"]').parent().addClass('on');
	}

	$('[class^="btnIcon_tap"]').on({
		'click touchend': function(){
			$('.mot_lists_w [class^="btnIcon_tap"]').parent().removeClass('on');
			$(this).parent().addClass('on');
		}
	});	
};

$(document).ready(function() {
	var btnToast = $('.toast_area .btn_primaryh50, .btn_primaryh50_toast, .btn_toast');
	var toast = $('#toastcnt');
	var toastHeight = toast.outerHeight();

	toast.css('bottom', -toastHeight);

	if (window.innerWidth > 767) {
		btnToast.on('click',function(){
			$(this).next(toast).animate({
				left:0,
				bottom : '150px',
				opacity: '1',
			}, 700).delay(2000).animate({
				left:0,
				bottom : -toastHeight,
				opacity: '0',
			}, 700);
		});	
	} else {
		btnToast.on('click',function(){
			$(this).next(toast).animate({
				left:0,
				bottom : '20px',
				opacity: '1',
			}, 700).delay(2000).animate({
				left:0,
				bottom : -toastHeight,
				opacity: '0',
			}, 700);
		});	
	}	
});

// go to top 
$(document).ready(function() {
	
		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
			$('#bt_go_top').fadeIn(500);
			} else {
			$('#bt_go_top').fadeOut('slow');
			}
		});
		
		$('#bt_go_top').click(function (e) {
			e.preventDefault();
			$('html, body').animate({scrollTop: 0}, 200);
		});

});




// 레이어 팝업
var popID;
function popOpen(popID) {	

	$('html, body').css({'overflow': 'hidden'});
	
	$('#' + popID).addClass('show');
	
	setTimeout(function(){
		$('#' + popID + ' > [class^="popup_"]').addClass('show');
		popHeightCheck(popID);
	},10);
	
	$('#' + popID).find('.pop_inner > [class*="close"]').click(function(){
		$('html, body').removeAttr('style');
		popShowCheck();
		$('#' + popID + ' > [class^="popup_"]').removeClass('show');
		setTimeout(function(){
			$('#' + popID).removeClass('show');
		},100);
	});

	$('#' + popID).find('.pop_inner > .pop_footer [class*="close"]').click(function(){
		$('html, body').removeAttr('style');
		popShowCheck();
		$('#' + popID + ' > [class^="popup_"]').removeClass('show');
		setTimeout(function(){
			$('#' + popID).removeClass('show');
		},100);
	});

	$('#' + popID).find('.pop_inner > .pop_header [class*="close"]').click(function(){
		$('html, body').removeAttr('style');
		popShowCheck();
		$('#' + popID + ' > [class^="popup_"]').removeClass('show');
		setTimeout(function(){
			$('#' + popID).removeClass('show');
		},100);
	});

	$('#' + popID + ' > .dim').click(function(){
		popShowCheck();
		$('#' + popID + ' > [class^="popup_"]').removeClass('show');
		setTimeout(function(){
			$('#' + popID).removeClass('show');
		},100);	
	});
};

//팝업 띄울때 전체 스크롤 막기
function popShowCheck() {
	var popShow = $('[class^="pop_wrap"].show').length;
	if (popShow > 1)
	{
		$('html, body').css({'overflow': 'hidden'});					
	}
	else if (popShow == 1)
	{
		$('html, body').removeAttr('style');
	}
};

function popHeightCheck(popID) {
	$(window).on({
		'load resize' : function() {
			$('#' + popID + ' [class^="popup_"]').each(function(){
				var screenH = $(window).height(),
					screenW = $(window).width(),
					popH = $(this).outerHeight(),
					popW = $(this).outerWidth(),
					popContH = $(this).find('.pop_content').outerHeight();

				if (screenW > 768 && screenH < popH)
				{
					$(this).css({'position':'absolute', 'left':'50%', 'top':'0', 'overflow-y':'auto', 'margin-left': '-' + (popW/2) + 'px', 'height': screenH + 'px'});					
				}
				else if (screenW <= 768 && screenH > popH)
				{
					$(this).removeAttr('style');
				}				
			});
		}
	});
};
