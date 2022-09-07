// X-CSRF-TOKEN
$.ajaxSetup({ headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') } });
// X-CSRF-TOKEN 
$(window).resize(function () { var width = $(window).width(); if (width < 440) { $('#header-top').hide(); } else { $('#header-top').show(); } }).resize();
$(window).resize(function () {
	var width = $(window).width(); if (width < 440) {
		$('#mobile-modal-course-categories').show(); $('#modal-course-categories').hide(); $('#banner-desktop').hide(); $('#header-top').hide(); $('#trending-desktop').hide(); $('#services').hide(); $('#Corporatez').hide(); $('#lp').hide(); $('#bottom-fixed').hide(); $('#mobile-icon-disable').hide(); $('#mobile-corporates').show(); $('#master-program-banner').hide();
	} else {
		$('#modal-course-categories').show(); $('#master-program-banner').show(); $('#banner-desktop').show(); $('#header-top').show(); $('#trending-desktop').show(); $('#services').show(); $('#Corporatez').show(); $('#lp').show(); $('#bottom-fixed').show(); $('#mobile-icon-disable').show(); $('#mobile-modal-course-categories').hide();
		$('#mobile-corporates').hide();
	}
}).resize();

$(document).ready(function () {
	$(".share-btn").click(function (e) {
		$('.networks-5').not($(this).next(".networks-5")).each(function () { $(this).removeClass("active"); });
		$(this).next(".networks-5").toggleClass("active");
	});
});
$(window).resize(function () {
	var width = $(window).width(); if (width < 440) {
		$('#nav-items').hide(); $('#sticky-form-inline').hide(); $('#certificate-preview').hide(); $('#self-img').hide();
	} else { $('#nav-items').show(); $('#sticky-form-inline').show(); $('#certificate-preview').show(); $('#self-img').show(); }
}).resize();
$(document).ready(function () {
	$(window).scroll(function () {
		if ($(this).scrollTop() > 600) {
			$('#scroll').fadeIn(); $('#fix-rig').fadeIn();
		} else { $('#scroll').fadeOut(); $('#fix-rig').fadeOut(); }
	});
	$('#scroll').click(function () { $("html, body").animate({ scrollTop: 0 }, 600); return false; });
});

/* $("#getGooglePayImage,#getPhonePayImage,#getPayTmImage ").click(function(){
var id   = $(this).attr("data-pid"); 
$(id).trigger('click'); 
	
});	 */
$('#PayGooglePay,#PayPhonePay,#PayPayTm').on('change', function () {
	var id = $(this).attr("data-pid");

	$(".loadview").html('<img src="../public/img/loading.gif" alt="Uploading...." style="width:120px;height:120px;"/>');
	var form = new FormData(document.getElementById(id));

	//return false;
	//	if( confirm("Are You sure you want to upload screen short?") ) {
	$.ajax({
		url: '/payGateway/save',
		type: "POST",
		dataType: "json",
		data: form,
		cache: false,
		contentType: false,
		processData: false,
		success: function (response) {
			if (response.status) {
				$('.loadview').hide();
				window.location.href = "/confirmation?status=Success&o=" + response.oo;
			} else {
				window.location.href = "/confirmation?status=failed&o=" + response.oo;

			}

		}
	});



});



jQuery(document).on('click', '#razor-pay-now', function (e) {
	var total = (jQuery('form#razorpay-frm-payment').find('input#amount').val() * 100);
	var merchant_order_id = jQuery('form#razorpay-frm-payment').find('input#merchant_order_id').val();
	var merchant_surl_id = jQuery('form#razorpay-frm-payment').find('input#surl').val();
	var merchant_furl_id = jQuery('form#razorpay-frm-payment').find('input#furl').val();
	var card_holder_name_id = jQuery('form#razorpay-frm-payment').find('input#billing-name').val();
	// var address = jQuery('form#razorpay-frm-payment').find('input#billing_address').val();
	var merchant_total = total;
	var merchant_amount = jQuery('form#razorpay-frm-payment').find('input#amount').val();
	var currency_code_id = jQuery('form#razorpay-frm-payment').find('input#currency').val();
	var key_id = jQuery('form#razorpay-frm-payment').find('input#RAZOR_KEY_ID').val();
	var store_name = 'Croma Campus Pvt Ltd';
	var store_description = 'Fees Pay';
	var store_logo = 'https://www.cromacampus.com/wp-content/themes/cromacampus/assets/img/logo.png';
	var email = jQuery('form#razorpay-frm-payment').find('input#billing-email').val();
	var phone = jQuery('form#razorpay-frm-payment').find('input#billing-phone').val();
	var course = jQuery('form#razorpay-frm-payment').find('input#course').val();
	var billing_country = jQuery('form#razorpay-frm-payment').find('input#billing_country').val();
	var billing_state = jQuery('form#razorpay-frm-payment').find('input#billing_state').val();
	var city = jQuery('form#razorpay-frm-payment').find('input#city').val();
	jQuery('.text-danger').remove();
	if (card_holder_name_id == "") {
		jQuery('input#billing-name').after('<small class="text-danger">Please enter full mame.</small>');
		return false;
	}
	if (email == "") {
		jQuery('input#billing-email').after('<small class="text-danger">Please enter valid email.</small>');
		return false;
	}
	if (phone == "") {
		jQuery('input#billing-phone').after('<small class="text-danger">Please enter valid phone.</small>');
		return false;
	}
	var razorpay_options = {
		key: key_id,
		amount: merchant_total,
		name: store_name,
		description: store_description,
		image: store_logo,
		netbanking: true,
		currency: currency_code_id,
		prefill: {
			name: card_holder_name_id,
			email: email,
			contact: phone
		},
		notes: {
			soolegal_order_id: merchant_order_id,
		},
		handler: function (transaction) {
			jQuery.ajax({
				url: '/razorPayCheckout',
				type: 'post',
				data: { razorpay_payment_id: transaction.razorpay_payment_id, merchant_order_id: merchant_order_id, merchant_surl_id: merchant_surl_id, merchant_furl_id: merchant_furl_id, card_holder_name_id: card_holder_name_id, merchant_total: merchant_total, merchant_amount: merchant_amount, currency_code_id: currency_code_id, pay: store_name, course: course, email: email, phone: phone, billing_country: billing_country, billing_state: billing_state, city: city },
				dataType: 'json',
				success: function (res) {
					var obj = jQuery.parseJSON(res.data);
					if (res.msg) {
						alert(res.msg);
						return false;
					}
					window.location = res.redirectURL + '?getpay=' + obj.getpay + '&card_holder_name=' + obj.card_holder_name + '&merchant_amount=' + obj.merchant_amount + '&order_id=' + obj.order_id + '&currency_code_id=' + obj.currency_code + '&pay_to=' + obj.pay_to + '&course=' + obj.course + '&email=' + obj.email + '&phone=' + obj.phone + '&payment_id=' + obj.razorpay_payment_id + '&billing_country=' + obj.billing_country + '&billing_state=' + obj.billing_state + '&city=' + obj.city;
				}
			});
		},
		"modal": {
			"ondismiss": function () {

			}
		}
	};
	// obj        
	var objrzpv1 = new Razorpay(razorpay_options);
	objrzpv1.open();
	e.preventDefault();
});
$('.req-zone').click(function () { var THIS = $(this); var id = THIS.data('id'); var title = THIS.data('title'); var rz_from = THIS.data('rzfrom'); $("#" + id + "-modal .headertitle").html(title); $("#" + id + "-modal .from_title").val(title); $("#" + id + "-modal .rz_form").val(rz_from); $("#" + id + "-modal").modal(); });

//for careers page 
$('.req-careers').click(function () {

	var THIS = $(this);
	var id = THIS.data('id');
	var title = THIS.data('title');
	var type = THIS.data('type');
	$("#" + id + "-modal .modal-heading").html(title);
	$("#" + id + "-modal .from_title").val(title);
	$("#" + id + "-modal .type").val(type);
	$("#" + id + "-modal").modal();
});

$('.slider').owlCarousel({ autoplay: true, autoplayTimeout: 10000, autoplayHoverPause: true, loop: true, nav: true, margin: 10, navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"], responsive: { 0: { items: 1 }, 600: { items: 1 }, 1000: { items: 1 } } });
$('.Trecou').owlCarousel({ autoplay: true, autoplayTimeout: 3000, autoplayHoverPause: true, navigation: true, loop: true, responsive: { 0: { items: 1 }, 600: { items: 3 }, 1000: { items: 4 } } });
$('.relatedblog').owlCarousel({ autoplay: true, autoplayTimeout: 3000, autoplayHoverPause: true, navigation: true, loop: true, responsive: { 0: { items: 1 }, 600: { items: 3 }, 1000: { items: 4 } } });
$('.partner').owlCarousel({ autoplay: true, autoplayTimeout: 3000, autoplayHoverPause: true, navigation: true, loop: true, margin: 10, responsive: { 0: { items: 2 }, 600: { items: 3 }, 1000: { items: 5 } } });
$('.lct').owlCarousel({ autoplay: true, autoplayTimeout: 3000, autoplayHoverPause: true, navigation: true, loop: true, margin: 10, responsive: { 0: { items: 1 }, 600: { items: 3 }, 1000: { items: 1 } } });
$('.review-video').owlCarousel({ autoplay: false, autoplayTimeout: 3000, autoplayHoverPause: true, navigation: true, loop: false, margin: 10, responsive: { 0: { items: 1 }, 600: { items: 3 }, 1000: { items: 1 } } });
$('.values-join').owlCarousel({ loop: true, margin: 10, responsive: { 0: { items: 1 }, 600: { items: 3 }, 1000: { items: 3 } } });
$('.allclients').owlCarousel({ autoplay: false, autoplayTimeout: 4000, autoplayHoverPause: true, loop: true, nav: true, margin: 10, responsive: { 0: { items: 1 }, 600: { items: 2 }, 1000: { items: 3 } } });
$('.test-slide-jobs').owlCarousel({ autoplay: true, autoplayTimeout: 4000, navigation: false, dots: false, loop: true, responsive: { 0: { items: 1 }, 600: { items: 3 }, 1000: { items: 2 } } });

$('.related-blg').owlCarousel({
	autoplay: true,
	autoplayTimeout: 4000,
	autoplayHoverPause: true,
	itemsDesktop: true,
	itemsDesktopSmall: true,
	itemsTablet: true,
	itemsMobilel: true,
	loop: true,
	nav: true,
	responsive: {
		0: {
			items: 1
		},
		500: {
			items: 2
		},

		991: {
			items: 4
		}

	}
});
$(document).ready(function () {
	$(".collapse.show").each(function () { $(this).prev(".card-header").find(".fa").addClass("fa-minus").removeClass("fa-plus"); });
	$(".collapse").on('show.bs.collapse', function () { $(this).prev(".card-header").find(".fa").removeClass("fa-plus").addClass("fa-minus"); }).on('hide.bs.collapse', function () { $(this).prev(".card-header").find(".fa").removeClass("fa-minus").addClass("fa-plus"); });
});
function loadmore() { var x = document.getElementById("morelessons"); var y = document.getElementById("les"); if (x.style.display === 'block') { x.style.display = 'none'; y.innerHTML = '+ More Lessons'; } else { x.style.display = 'block'; y.innerHTML = '- Less Lessons'; } }
function loadqueries() { var fq = document.getElementById("morefaqs"); var qr = document.getElementById("mq"); if (fq.style.display === 'block') { fq.style.display = 'none'; qr.innerHTML = '+ More Queries'; } else { fq.style.display = 'block'; qr.innerHTML = '- Less Queries'; } }
function loadprograms() { var ap = document.getElementById("more-program-list"); var mp = document.getElementById("mp"); if (ap.style.display === 'flex') { ap.style.display = 'none'; mp.innerHTML = '+'; } else { ap.style.display = 'flex'; mp.innerHTML = '-'; } };
$(document).ready(function () {
	var showChar = 450; var ellipsestext = "..."; var moretext = "Read More"; var lesstext = "Read less"; $('.more').each(function () {
		var content = $(this).html(); if (content.length > showChar) {
			var c = content.substr(0, showChar); var h = content.substr(showChar, content.length - showChar);
			var html = c + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>'; $(this).html(html);
		}
	});
	$(".morelink").click(function () { if ($(this).hasClass("less")) { $(this).removeClass("less"); $(this).html(moretext); } else { $(this).addClass("less"); $(this).html(lesstext); } $(this).parent().prev().toggle(); $(this).prev().toggle(); return false; });
});
$(document).ready(function () {
	loadDataTwoBlog();
	function loadDataTwoBlog() {
		$.ajax({
			"url": "/site/course/loadDataTwoBlog",
			"type": "POST",
			"success": function (data, textStatus, jqXHR) {
				$('.show_two_blog').append(data);
			}
		});
	}
});


loadDataMenuPopup();
function loadDataMenuPopup() {
	$.ajax({
		"url": "/site/course/loadDataMenuPopup",
		"type": "POST",
		"success": function (data, textStatus, jqXHR) {

			$('#menupopup').append(data);



		}
	});
}

$(document).on('click', '.menuclose', function () {
	var THIS = $(this);
	$(".resetform").click(); $(".result").hide();
});

// careers form 
$(document).on('click', '.careerformmodal', function () {
	var THIS = $(this);
	var title = THIS.data('title');
	var button = THIS.data('button');
	$("#careerformmodal").modal();
	$("#careerformmodal .modal-heading").html(title);
	$("#careerformmodal .from_title").val(title);
	$("#careerformmodal .modal-placement-button").html(button);
});

$(document).on('click', '.downloadModalPopup', function () {
	var THIS = $(this);
	var title = THIS.data('title'); var button = THIS.data('button'); $("#downloadModalPopup").modal();
	$("#downloadModalPopup .modal-heading").html(title); $('.from_title').val(title); $("#downloadModalPopup .iq_from").val(title);
	$("#downloadModalPopup .modal-placement-button").html(button);
});
$(document).on('click', '.downloadPopup', function () {
	var THIS = $(this); var title = THIS.data('title'); var button = THIS.data('button'); $("#downloadPopup").modal();
	$("#downloadPopup .modal-heading").html(title); $('.from_title').val(title); $("#downloadPopup .iq_from").val(title);
	$("#downloadPopup .modal-placement-button").html(button);
});
$(document).on('click', '.downloadCurriculum', function () {
	var THIS = $(this); var title = THIS.data('title'); var button = THIS.data('button'); $("#downloadCurriculum").modal();
	$("#downloadCurriculum .modal-heading").html(title); $('.from_title').val(title); $("#downloadCurriculum .iq_from").val(title);
	$("#downloadCurriculum .modal-placement-button").html(button);
});

$(document).on('click', '.myModal4', function () {
	var THIS = $(this); var title = THIS.data('title'); var button = THIS.data('button'); $("#myModal4").modal();
	$("#myModal4 .modal-heading").html(title); $('.from_title').val(title); $("#myModal4 .iq_from").val(title);
	$("#myModal4 .modal-placement-button").html(button);
});

$(document).on('click', '.commanModalCourse', function () {
	var THIS = $(this); var title = THIS.data('title'); var button = THIS.data('button'); $("#commanModalCourse").modal();
	$("#commanModalCourse .modal-heading").html(title); $('.from_title').val(title); $("#commanModalCourse .iq_from").val(title);
	$("#commanModalCourse .modal-placement-button").html(button);
});
$(document).on('click', '.downloadsyllbus', function () {
	var THIS = $(this); var title = THIS.data('title'); var button = THIS.data('button');
	$("#downloadsyllbus").modal(); $("#downloadsyllbus .modal-heading").html(title);
	$('.from_title').val(title); $("#downloadsyllbus .iq_from").val(title);
	$("#downloadsyllbus .modal-placement-button").html(button);
});
$(document).on('click', '.inquerySide', function () {
	var THIS = $(this); var title = THIS.data('title'); var paragraph = THIS.data('paragraph');
	$("#sidemodalclass").modal(); $("#sidemodalclass #myModalLabel2").html(title);
	$('.from_title').val(title); $("#sidemodalclass .iq_from").val(title);
	$("#sidemodalclass .paragrap").html(paragraph);
});
$(document).on('click', '.videotrigger', function () {
	var THIS = $(this); var title = THIS.data('title'); var button = THIS.data('button');
	$("#videotrigger").modal(); $("#videotrigger .modal-heading").html(title);
	$('.from_title').val(title); $("#videotrigger .iq_from").val(title);
	$("#videotrigger #modal-placement-button").html(button);
});
$(".videoclose").click(function () {
	$("#VideoPlay").modal();
});
$(document).on('click', '.VideoPlay', function () {
	var THIS = $(this); $("#VideoPlay").modal();
});
$(document).on('click', '.CromaVideoPlay', function () {
	var THIS = $(this); $("#CromaVideoPlay").modal();
});
$(document).on('click', '.corporateVideoPlay', function () {
	var THIS = $(this); $("#corporateVideoPlay").modal();
});
$(document).on('click', '.videoreviews', function () {
	var THIS = $(this); var title = THIS.data('title'); var button = THIS.data('button');
	$("#videoreviews").modal(); $("#videoreviews .modal-heading").html(title); $('.from_title').val(title);
	$("#videoreviews .iq_from").val(title); $("#videoreviews #modal-placement-button").html(button);
});
$(".videoreviewclose").click(function () {
	$("#VideoReviwsPlay").modal();
});
$(".downloadclose").click(function () {
	$("#downloadCurriculum").modal('hide'); $("#download_pdf").modal();
});
$(".downloadclosemaster").click(function () {
	$("#videotrigger").modal('hide'); $("#download_pdf_master").modal();
});
$(document).on('click', '.offercovid', function () {
	$("#offerspopup").modal();
});
//timer count
/*

var countDownDate = new Date("March 29, 2021 15:37:25").getTime();
var x = setInterval(function() {  
  var now = new Date().getTime();
  var distance = countDownDate - now;
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
document.getElementById("endingtime").innerHTML = "<span class='time'><span class='time-end'>"+days+"</span>D</span><span class='time'><span class='time-end'>"+ hours +"</span>H</span><span class='time'><span class='time-end'>" + minutes + "</span>M</span><span class='time'><span class='time-end'>" +seconds + "</span>S</span>";
document.getElementById("endingtimemobile").innerHTML = "<span class='time'><span class='time-end'>"+days+"</span>D</span><span class='time'><span class='time-end'>"+ hours +"</span>H</span><span class='time'><span class='time-end'>" + minutes + "</span>M</span><span class='time'><span class='time-end'>" +seconds + "</span>S</span>";
document.getElementById("offerEnding").innerHTML = "<div class='times'><span class='time-ends'>"+days+"</span>D</span><span class='times'><span class='time-ends'>"+ hours +"</span>H</span><span class='times'><span class='time-ends'>" + minutes + "</span>M</span><span class='times'><span class='time-ends'>" +seconds + "</span>S</div>";
  if (distance < 0) {
	clearInterval(x);
	document.getElementById("endingtime").innerHTML = "EXPIRED";
   document.getElementById("endingtimemobile").innerHTML = "EXPIRED";
	document.getElementById("offerEnding").innerHTML = "EXPIRED";
  }  
}, 1000);
*/

$(document).on('change', '.select_country', function (e) {
	e.preventDefault(); $this = $(this);
	if ($this.val() == '') return;
	$.ajax({
		"url": "/get_state_ajax/" + $this.val(),
		"type": "GET",
		"success": function (data, textStatus, jqXHR) {
			if (data.length > 0) {
				var html = '<option value="">Select State</option>';
				for (var i in data) {
					html += '<option value="' + data[i].state_id + '">' + data[i].state_name + '</option>';
				}
				$('.show_state').html(html);
			}
		}
	});
});
$(document).on('change', '.choosestate', function (e) {
	e.preventDefault(); $this = $(this);
	if ($this.val() == '') return;
	$.ajax({
		"url": "/get_city_ajax/" + $this.val(),
		"type": "GET",
		"success": function (data, textStatus, jqXHR) {
			if (data.length > 0) {
				var html = '<option value="">Select City</option>';

				for (var i in data) {
					html += '<option value="' + data[i].city_id + '">' + data[i].city_name + '</option>';
				}
				$('.show_city').html(html);
			}
		}
	});
});
var homeController = (function () {
	return {
		checked_Ids: [], saveEnquiry: function (THIS) {
			var $this = $(THIS), data = $this.serialize();
			$('button[type="submit"]').prop('disabled', 'disabled');
			$('input[type="text"],input[type="tel"]').keyup(function () {
				if ($(this).val() != '') {
					$(':input[type="submit"]').prop('disabled', false);
				}
			});
			$.ajax({
				url: "/saveEnquiry",
				type: "POST",
				data: data,
				success: function (response) {
					if (response.status) {
						$('button[type="submit"]').removeAttr('disabled');
						$("#downloadModalPopup").modal('hide');
						$("#downloadPopup").modal('hide');
						$("#commanModalCourse").modal('hide');
						$("#myModal4").modal('hide');
						$("#myModal2").modal('hide');
						$(".resetform").click();

						//$("#messagemodel").modal();
						//	$('.imgclass').html('<img src="../public/img/thankpopup.png" style="width: 100%;text-align: center;margin: auto;display: block;">');					
						//	$('.successhtml').html("<p class='text-center' style='font-weight: 600;'>Your Submission has been received. <br> Our experts will reach out to you in the next 24 hours.</p>");
						//	$('#messagemodel').modal({backdrop:"static",keyboard:false});
						removeValidationErrors($this);
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();
						window.location.href = "/thanks";

					} else {
						$("#downloadModalPopup").modal('hide');
						$("#myModal2").modal('hide');
						$("#myModal4").modal('hide');
						$("#downloadPopup").modal('hide');
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/message_alert.png" style="width: 50%;text-align: center;margin: auto;display: block;">');
						$('.failedhtml').html("<p class='text-center'>Some Errot Please Tray again.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					var response = JSON.parse(jqXHR.responseText);
					if (response.status) {
						var errors = response.errors;
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();
						for (var key in errors) {
							if (errors.hasOwnProperty(key)) {
								var el = $this.find('*[name="' + key + '"]');
								$('<span class="help-block"><strong>' + errors[key][0] + '</strong></span>').insertAfter(el);
								el.closest('.form-inline').addClass('has-error');
							}
						}

					} else {
						$("#downloadModalPopup").modal('hide');
						$("#myModal2").modal('hide');
						$("#myModal4").modal('hide');
						$("#downloadPopup").modal('hide');
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/message_alert.png" style="width: 50%;text-align: center;margin: auto;display: block;">');
						$('.failedhtml').html("<p class='text-center'>Some Errot Please Tray again.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
					}

				}
			});
			return false;
		},
		saveCoursePopup: function (THIS) {
			var $this = $(THIS),
				data = $this.serialize();

			//$('button[type="submit"]').prop('disabled','disabled');	
			$('button[type="submit"]').prop('disabled', 'disabled');
			$('input[type="text"],input[type="tel"]').keyup(function () {
				if ($(this).val() != '') {
					$(':input[type="submit"]').prop('disabled', false);
				}
			});

			$.ajax({
				url: "/saveCoursePopup",
				type: "POST",
				data: data,
				success: function (response) {

					if (response.status) {
						$('button[type="submit"]').removeAttr('disabled');
						$("#downloadModalPopup").modal('hide');
						$("#downloadPopup").modal('hide');
						$("#myModal4").modal('hide');
						$("#myModal2").modal('hide');
						$(".resetform").click();
						window.location.href = "/thanks";

						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/thankpopup.png" style="width: 100%;text-align: center;margin: auto;display: block;">');
						$('.successhtml').html("<p class='text-center' style='font-weight: 600;'>Your Submission has been received. <br> Our experts will reach out to you in the next 24 hours.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
						removeValidationErrors($this);
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();


					} else {
						$("#downloadModalPopup").modal('hide');
						$("#myModal2").modal('hide');
						$("#myModal4").modal('hide');
						$("#downloadPopup").modal('hide');
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/message_alert.png" style="width: 50%;text-align: center;margin: auto;display: block;">');
						$('.failedhtml').html("<p class='text-center'>Some Errot Please Tray again.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					var response = JSON.parse(jqXHR.responseText);
					if (response.status) {
						var errors = response.errors;
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();
						for (var key in errors) {
							if (errors.hasOwnProperty(key)) {
								var el = $this.find('*[name="' + key + '"]');
								$('<span class="help-block"><strong>' + errors[key][0] + '</strong></span>').insertAfter(el);
								el.closest('.form-inline').addClass('has-error');

							}
						}

					} else {
						alert('Something went wrong');
					}

				}
			});
			return false;
		},
		saveRequestZone: function (THIS) {
			$('button[type="submit"]').prop('disabled', 'disabled');
			$('input[type="text"],input[type="radio"],input[type="tel"],textarea[type="text"]').keyup(function () {
				if ($(this).val() != '') {
					$(':input[type="submit"]').prop('disabled', false);
				}
			});
			var $this = $(THIS);
			var form = new FormData(THIS);
			$.ajax({
				url: "/saveRequestZone",
				type: "POST",
				dataType: "json",
				data: form,
				cache: false,
				contentType: false,
				processData: false,
				success: function (response) {
					if (response.status) {
						$('button[type="submit"]').removeAttr('disabled');
						$this.closest('.modal').modal('hide');
						$(".resetform").click();
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/thankpopup.png" style="width: 100%;text-align: center;margin: auto;display: block;">');
						$('.successhtml').html("<p class='text-center' style='font-weight: 600;'>Your Submission has been received. <br> Our experts will reach out to you in the next 24 hours.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
						removeValidationErrors($this);
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();


					} else {
						$("#downloadModalPopup").modal('hide');
						$("#myModal2").modal('hide');
						$("#myModal4").modal('hide');
						$("#downloadPopup").modal('hide');
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/message_alert.png" style="width: 50%;text-align: center;margin: auto;display: block;">');
						$('.failedhtml').html("<p class='text-center'>Some Errot Please Tray again.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					var response = JSON.parse(jqXHR.responseText);
					if (response.status) {
						var errors = response.errors;
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();
						for (var key in errors) {
							if (errors.hasOwnProperty(key)) {
								var el = $this.find('*[name="' + key + '"]');
								$('<span class="help-block"><strong>' + errors[key][0] + '</strong></span>').insertAfter(el);
								el.closest('.form-inline').addClass('has-error');

							}
						}

					} else {
						$("#downloadModalPopup").modal('hide');
						$("#myModal2").modal('hide');
						$("#myModal4").modal('hide');
						$("#downloadPopup").modal('hide');
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/message_alert.png" style="width: 50%;text-align: center;margin: auto;display: block;">');
						$('.failedhtml').html("<p class='text-center'>Some Errot Please Tray again.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
					}

				}
			});
			return false;
		},

		checkmobilefeedback: function (THIS) {

			var $this = $(THIS),
				data = $this.serialize();

			$('button[type="submit"]').prop('disabled', 'disabled');
			$('input[type="text"],input[type="tel"]').keyup(function () {
				if ($(this).val() != '') {
					$(':input[type="submit"]').prop('disabled', false);
				}
			});

			$.ajax({
				type: "POST",
				url: "/checkmobilefeedback",
				data: data,
				beforeSend: function () {
					$("#error").fadeOut();
					$("#btn-login").html("<span class=\"glyphicon glyphicon-transfer\"></span> &nbsp; sending ...");
				},
				success: function (data, textStatus, jqXHR) {
					if (data.statusCode && data.statusCode == 1) {

						$('.form-result-mobile').replaceWith(data.data.payload);
						$("#btn-login").html('<span><span>Continue</span></span>');
						$('.input-otp').before(data.data.message);
						//document.getElementById("vas").style.display = "block";
						//document.getElementById("ret").style.display = "none";
						$('.inpsuts').keyup(function () {

							if (this.value.length == this.maxLength) {
								$(this).next('.inpsuts').focus();
							}
						});
					}
					else {
						$(".alert").remove();
						$('.help-block').html('<strong>' + data.data.message + '</strong>');
						$("#btn-login").html('<span><span>Continue</span></span>');
					}
				}
			});

			return false;
		},
		checkjobportal: function (THIS) {

			var $this = $(THIS),
				data = $this.serialize();
			$('button[type="submit"]').prop('disabled', 'disabled');
			$('input[type="text"],input[type="tel"]').keyup(function () {
				if ($(this).val() != '') {
					$(':input[type="submit"]').prop('disabled', false);
				}
			});

			$.ajax({
				type: "POST",
				url: "/checkjobportal",
				data: data,
				beforeSend: function () {
					$("#error").fadeOut();
					$("#btn-login").html("<span class=\"glyphicon glyphicon-transfer\"></span> &nbsp; sending ...");
				},
				success: function (data, textStatus, jqXHR) {
					if (data.statusCode && data.statusCode == 1) {

						$('.form-result-job-portal').replaceWith(data.data.payload);
						$("#btn-login").html('<span><span>Continue</span></span>');
						$('.input-otp').before(data.data.message);
						//document.getElementById("vas").style.display = "block";
						//document.getElementById("ret").style.display = "none";
						$('.inpsuts').keyup(function () {

							if (this.value.length == this.maxLength) {
								$(this).next('.inpsuts').focus();
							}
						});
					}
					else {
						$(".alert").remove();
						$('.help-block').html('<strong>' + data.data.message + '</strong>');
						$("#btn-login").html('<span><span>Continue</span></span>');
					}
				}
			});

			return false;
		},

		saveTrainingFeedback: function (THIS) {
			var $this = $(THIS);
			var form = new FormData(THIS);
			$.ajax({
				url: "/saveRequestZone",
				type: "POST",
				dataType: "json",
				data: form,
				cache: false,
				contentType: false,
				processData: false,
				success: function (response) {
					if (response.status) {
						$('button[type="submit"]').removeAttr('disabled');
						$this.closest('.modal').modal('hide');
						$(".resetform").click();
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/thankpopup.png" style="width: 100%;text-align: center;margin: auto;display: block;">');
						$('.successhtml').html("<p class='text-center' style='font-weight: 600;'>Your Submission has been received. <br> Our experts will reach out to you in the next 24 hours.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
						removeValidationErrors($this);
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();

						window.location = document.location.href;


					} else {
						$("#downloadModalPopup").modal('hide');
						$("#myModal2").modal('hide');
						$("#myModal4").modal('hide');
						$("#downloadPopup").modal('hide');
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/message_alert.png" style="width: 50%;text-align: center;margin: auto;display: block;">');
						$('.failedhtml').html("<p class='text-center'>Some Errot Please Tray again.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					var response = JSON.parse(jqXHR.responseText);
					if (response.status) {
						var errors = response.errors;
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();
						for (var key in errors) {
							if (errors.hasOwnProperty(key)) {
								var el = $this.find('*[name="' + key + '"]');
								$('<span class="help-block"><strong>' + errors[key][0] + '</strong></span>').insertAfter(el);
								el.closest('.form-inline').addClass('has-error');

							}
						}

					} else {
						alert('Something went wrong');
					}

				}
			});
			return false;
		},
		getstdfeedback: function (THIS) {

			var $this = $(THIS),
				data = $this.serialize();

			$.ajax({
				type: "POST",
				url: "/getstdfeedback",
				data: data,
				beforeSend: function () {
					$("#error").fadeOut();
					$("#btn-login").html("<span class=\"glyphicon glyphicon-transfer\"></span> &nbsp; sending ...");
				},
				success: function (data, textStatus, jqXHR) {
					if (data.statusCode && data.statusCode == 1) {
						//$('.student-details').replaceWith(data.data.payload);
						$('.certraid').hide();
						$('.feedback-details').html(data.data.payload);


					}
					else {
						$(".alert").remove();
						$('.help-block').html('<strong>' + data.data.message + '</strong>');
						$("#btn-login").html('<span><span>Continue</span></span>');
					}
				}
			});





			return false;
		},
		getstdjobportal: function (THIS) {

			var $this = $(THIS),
				data = $this.serialize();

			$.ajax({
				type: "POST",
				url: "/getstdjobportal",
				data: data,
				beforeSend: function () {
					$("#error").fadeOut();
					$("#btn-login").html("<span class=\"glyphicon glyphicon-transfer\"></span> &nbsp; sending ...");
				},
				success: function (data, textStatus, jqXHR) {
					if (data.statusCode && data.statusCode == 1) {
						//$('.student-details').replaceWith(data.data.payload);
						$('.certraid').hide();
						$('.jobportal-details').html(data.data.payload);


					}
					else {
						$(".alert").remove();
						$('.help-block').html('<strong>' + data.data.message + '</strong>');
						$("#btn-login").html('<span><span>Continue</span></span>');
					}
				}
			});





			return false;
		},

		getjobportaldetails: function (THIS) {
			var $this = $(THIS),
				data = $this.serialize();

			$.ajax({
				type: "POST",
				url: "/getjobportaldetails",
				data: data,
				beforeSend: function () {
					$("#error").fadeOut();
					$("#btn-login").html("<span class=\"glyphicon glyphicon-transfer\"></span> &nbsp; sending ...");
				},
				success: function (data, textStatus, jqXHR) {

					if (data.statusCode && data.statusCode == 1) {
						//$('.student-details').replaceWith(data.data.payload);
						$('.certraid').hide();
						$('.jobportal-details').html(data.data.payload);


					}
					else {
						$(".alert").remove();
						$('.help-block').html('<strong>' + data.data.message + '</strong>');
						$("#btn-login").html('<span><span>Continue</span></span>');
					}
				}, error: function (jqXHR, textStatus, errorThrown) {
					var response = JSON.parse(jqXHR.responseText);
					if (response.status) {
						var errors = response.errors;
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();
						for (var key in errors) {
							if (errors.hasOwnProperty(key)) {
								var el = $this.find('*[name="' + key + '"]');
								$('<span class="help-block"><strong>' + errors[key][0] + '</strong></span>').insertAfter(el);
								el.closest('.form-inline').addClass('has-error');

							}
						}

					} else {
						alert('Something went wrong');
					}

				}
			});





			return false;
		},

		saveEnquirySide: function (THIS) {
			var $this = $(THIS),
				data = $this.serialize();

			$('button[type="submit"]').prop('disabled', 'disabled');
			$('input[type="text"],input[type="tel"]').keyup(function () {
				if ($(this).val() != '') {
					$(':input[type="submit"]').prop('disabled', false);
				}
			});
			$.ajax({
				url: "/saveEnquirySide",
				type: "POST",
				data: data,
				success: function (response) {
					if (response.status) {

						$(".resetform").click();
						$("#sidemodalclass").modal('hide');
						//	$("#messagemodel").modal();
						//	$('.imgclass').html('<img src="../img/thankpopup.png" style="width: 100%;text-align: center;margin: auto;display: block;">');					
						//	$('.successhtml').html("<p class='text-center' style='font-weight: 600;'>Your Submission has been received. <br> Our experts will reach out to you in the next 24 hours.</p>");
						//	$('#messagemodel').modal({backdrop:"static",keyboard:false});
						removeValidationErrors($this);
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();
						window.location.href = "/thanks";

					} else {
						$("#messagemodel").modal();
						$("#sidemodalclass").modal('hide');
						$('.imgclass').html('<img src="../public/img/message_alert.png" style="width: 50%;text-align: center;margin: auto;display: block;">');
						$('.failedhtml').html("<p class='text-center'>Some Errot Please Tray again.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					var response = JSON.parse(jqXHR.responseText);
					if (response.status) {
						var errors = response.errors;
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();
						for (var key in errors) {
							if (errors.hasOwnProperty(key)) {
								var el = $this.find('*[name="' + key + '"]');
								$('<span class="help-block"><strong>' + errors[key][0] + '</strong></span>').insertAfter(el);
								el.closest('.form-inline').addClass('has-error');
							}
						}
					} else {
						$("#messagemodel").modal();
						$("#sidemodalclass").modal('hide');
						$('.imgclass').html('<img src="../public/img/message_alert.png" style="width: 50%;text-align: center;margin: auto;display: block;">');
						$('.failedhtml').html("<p class='text-center'>Some Errot Please Tray again.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
					}

				}
			});
			return false;
		},
		saveCalling: function (THIS) {
			var $this = $(THIS),
				data = $this.serialize();

			$.ajax({
				url: "/saveCalling",
				type: "POST",
				data: data,
				success: function (response) {

					if (response.status) {

						$(".resetform").click();
						$("#sidemodalclass").modal('hide');
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/thankpopup.png" style="width: 100%;text-align: center;margin: auto;display: block;">');
						$('.successhtml').html("<p class='text-center' style='font-weight: 600;'>Your Submission has been received. <br> Our experts will reach out to you in the next 24 hours.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
						removeValidationErrors($this);
						$this.find('.ans').removeClass('has-error');
						$this.find('.help-block').remove();


					} else {
						$("#messagemodel").modal();
						$("#sidemodalclass").modal('hide');
						$('.imgclass').html('<img src="../public/img/message_alert.png" style="width: 50%;text-align: center;margin: auto;display: block;">');
						$('.failedhtml').html("<p class='text-center'>Some Errot Please Tray again.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					var response = JSON.parse(jqXHR.responseText);
					if (response.status) {
						var errors = response.errors;
						$this.find('.ans').removeClass('has-error');
						$this.find('.help-block').remove();
						for (var key in errors) {
							if (errors.hasOwnProperty(key)) {
								var el = $this.find('*[name="' + key + '"]');
								$('<span class="help-block"><strong>' + errors[key][0] + '</strong></span>').insertAfter(el);
								el.closest('.ans').addClass('has-error');

							}
						}

					} else {
						alert('Something went wrong');
					}

				}
			});
			return false;
		},
		saveLead: function (THIS) {
			var $this = $(THIS),
				data = $this.serialize();

			$.ajax({
				url: "/saveLead",
				type: "POST",
				data: data,
				success: function (response) {

					if (response.status) {

						$(".resetform").click();
						$("#sidemodalclass").modal('hide');
						$("#messagemodelrefresh").modal();
						$('.imgclass').html('<img src="../public/img/thankpopup.png" style="width: 100%;text-align: center;margin: auto;display: block;">');
						$('.successhtml').html("<p class='text-center' style='font-weight: 600;'>Your Submission has been received. <br> Our experts will reach out to you in the next 24 hours.</p>");
						$('#messagemodelrefresh').modal({ backdrop: "static", keyboard: false });
						removeValidationErrors($this);
						$this.find('.ans').removeClass('has-error');
						$this.find('.help-block').remove();
						location.reload();

					} else {
						$("#messagemodel").modal();
						$("#sidemodalclass").modal('hide');
						$('.imgclass').html('<img src="../public/img/message_alert.png" style="width: 50%;text-align: center;margin: auto;display: block;">');
						$('.failedhtml').html("<p class='text-center'>Some Errot Please Tray again.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					var response = JSON.parse(jqXHR.responseText);
					if (response.status) {
						var errors = response.errors;
						$this.find('.ans').removeClass('has-error');
						$this.find('.help-block').remove();
						for (var key in errors) {
							if (errors.hasOwnProperty(key)) {
								var el = $this.find('*[name="' + key + '"]');
								$('<span class="help-block"><strong>' + errors[key][0] + '</strong></span>').insertAfter(el);
								el.closest('.ans').addClass('has-error');

							}
						}

					} else {
						alert('Something went wrong');
					}

				}
			});
			return false;
		},
		saveLeadSocial: function (THIS) {
			var $this = $(THIS),
				data = $this.serialize();

			$.ajax({
				url: "/saveLeadSocial",
				type: "POST",
				data: data,
				success: function (response) {

					if (response.status) {

						$(".resetform").click();
						$("#sidemodalclass").modal('hide');
						$("#messagemodelrefresh").modal();
						$('.imgclass').html('<img src="../public/img/thankpopup.png" style="width: 100%;text-align: center;margin: auto;display: block;">');
						$('.successhtml').html("<p class='text-center' style='font-weight: 600;'>Your Submission has been received. <br> Our experts will reach out to you in the next 24 hours.</p>");
						$('#messagemodelrefresh').modal({ backdrop: "static", keyboard: false });
						removeValidationErrors($this);
						$this.find('.ans').removeClass('has-error');
						$this.find('.help-block').remove();


					} else {
						$("#messagemodel").modal();
						$("#sidemodalclass").modal('hide');
						$('.imgclass').html('<img src="../public/img/message_alert.png" style="width: 50%;text-align: center;margin: auto;display: block;">');
						$('.failedhtml').html("<p class='text-center'>Some Errot Please Tray again.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					var response = JSON.parse(jqXHR.responseText);
					if (response.status) {
						var errors = response.errors;
						$this.find('.ans').removeClass('has-error');
						$this.find('.help-block').remove();
						for (var key in errors) {
							if (errors.hasOwnProperty(key)) {
								var el = $this.find('*[name="' + key + '"]');
								$('<span class="help-block"><strong>' + errors[key][0] + '</strong></span>').insertAfter(el);
								el.closest('.ans').addClass('has-error');

							}
						}

					} else {
						alert('Something went wrong');
					}

				}
			});
			return false;
		},
		saveLeadSocialShruti: function (THIS) {
			var $this = $(THIS),
				data = $this.serialize();

			$.ajax({
				url: "/saveLeadSocialShruti",
				type: "POST",
				data: data,
				success: function (response) {

					if (response.status) {

						$(".resetform").click();
						$("#sidemodalclass").modal('hide');
						$("#messagemodelrefresh").modal();
						$('.imgclass').html('<img src="../public/img/thankpopup.png" style="width: 100%;text-align: center;margin: auto;display: block;">');
						$('.successhtml').html("<p class='text-center' style='font-weight: 600;'>Your Submission has been received. <br> Our experts will reach out to you in the next 24 hours.</p>");
						$('#messagemodelrefresh').modal({ backdrop: "static", keyboard: false });
						removeValidationErrors($this);
						$this.find('.ans').removeClass('has-error');
						$this.find('.help-block').remove();


					} else {
						$("#messagemodel").modal();
						$("#sidemodalclass").modal('hide');
						$('.imgclass').html('<img src="../public/img/message_alert.png" style="width: 50%;text-align: center;margin: auto;display: block;">');
						$('.failedhtml').html("<p class='text-center'>Some Errot Please Tray again.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					var response = JSON.parse(jqXHR.responseText);
					if (response.status) {
						var errors = response.errors;
						$this.find('.ans').removeClass('has-error');
						$this.find('.help-block').remove();
						for (var key in errors) {
							if (errors.hasOwnProperty(key)) {
								var el = $this.find('*[name="' + key + '"]');
								$('<span class="help-block"><strong>' + errors[key][0] + '</strong></span>').insertAfter(el);
								el.closest('.ans').addClass('has-error');

							}
						}

					} else {
						alert('Something went wrong');
					}

				}
			});
			return false;
		},
		saveLeadSocialSachin: function (THIS) {
			var $this = $(THIS),
				data = $this.serialize();

			$.ajax({
				url: "/saveLeadSocialSachin",
				type: "POST",
				data: data,
				success: function (response) {

					if (response.status) {

						$(".resetform").click();
						$("#sidemodalclass").modal('hide');
						$("#messagemodelrefresh").modal();
						$('.imgclass').html('<img src="../public/img/thankpopup.png" style="width: 100%;text-align: center;margin: auto;display: block;">');
						$('.successhtml').html("<p class='text-center' style='font-weight: 600;'>Your Submission has been received. <br> Our experts will reach out to you in the next 24 hours.</p>");
						$('#messagemodelrefresh').modal({ backdrop: "static", keyboard: false });
						removeValidationErrors($this);
						$this.find('.ans').removeClass('has-error');
						$this.find('.help-block').remove();


					} else {
						$("#messagemodel").modal();
						$("#sidemodalclass").modal('hide');
						$('.imgclass').html('<img src="../public/img/message_alert.png" style="width: 50%;text-align: center;margin: auto;display: block;">');
						$('.failedhtml').html("<p class='text-center'>Some Errot Please Tray again.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					var response = JSON.parse(jqXHR.responseText);
					if (response.status) {
						var errors = response.errors;
						$this.find('.ans').removeClass('has-error');
						$this.find('.help-block').remove();
						for (var key in errors) {
							if (errors.hasOwnProperty(key)) {
								var el = $this.find('*[name="' + key + '"]');
								$('<span class="help-block"><strong>' + errors[key][0] + '</strong></span>').insertAfter(el);
								el.closest('.ans').addClass('has-error');

							}
						}

					} else {
						alert('Something went wrong');
					}

				}
			});
			return false;
		},
		saveLeadSocialAnmol: function (THIS) {
			var $this = $(THIS),
				data = $this.serialize();

			$.ajax({
				url: "/saveLeadSocialAnmol",
				type: "POST",
				data: data,
				success: function (response) {

					if (response.status) {

						$(".resetform").click();
						$("#sidemodalclass").modal('hide');
						$("#messagemodelrefresh").modal();
						$('.imgclass').html('<img src="../public/img/thankpopup.png" style="width: 100%;text-align: center;margin: auto;display: block;">');
						$('.successhtml').html("<p class='text-center' style='font-weight: 600;'>Your Submission has been received. <br> Our experts will reach out to you in the next 24 hours.</p>");
						$('#messagemodelrefresh').modal({ backdrop: "static", keyboard: false });
						removeValidationErrors($this);
						$this.find('.ans').removeClass('has-error');
						$this.find('.help-block').remove();


					} else {
						$("#messagemodel").modal();
						$("#sidemodalclass").modal('hide');
						$('.imgclass').html('<img src="../public/img/message_alert.png" style="width: 50%;text-align: center;margin: auto;display: block;">');
						$('.failedhtml').html("<p class='text-center'>Some Errot Please Tray again.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					var response = JSON.parse(jqXHR.responseText);
					if (response.status) {
						var errors = response.errors;
						$this.find('.ans').removeClass('has-error');
						$this.find('.help-block').remove();
						for (var key in errors) {
							if (errors.hasOwnProperty(key)) {
								var el = $this.find('*[name="' + key + '"]');
								$('<span class="help-block"><strong>' + errors[key][0] + '</strong></span>').insertAfter(el);
								el.closest('.ans').addClass('has-error');

							}
						}

					} else {
						alert('Something went wrong');
					}

				}
			});
			return false;
		},
		saveinquiry: function (THIS) {
			var $this = $(THIS),
				data = $this.serialize();

			$.ajax({
				url: "/saveInquiry",
				type: "POST",
				data: data,
				success: function (response) {

					if (response.status) {

						$(".resetform").click();
						$("#sidemodalclass").modal('hide');
						//	$("#messagemodel").modal();
						//	$('.imgclass').html('<img src="../public/img/thankpopup.png" style="width: 100%;text-align: center;margin: auto;display: block;">');					
						//	$('.successhtml').html("<p class='text-center' style='font-weight: 600;'>Your Submission has been received. <br> Our experts will reach out to you in the next 24 hours.</p>");
						//	$('#messagemodel').modal({backdrop:"static",keyboard:false});
						removeValidationErrors($this);
						$this.find('.ans').removeClass('has-error');
						$this.find('.help-block').remove();

						window.location.href = "/thanks";
					} else {
						$("#messagemodel").modal();
						$("#sidemodalclass").modal('hide');
						$('.imgclass').html('<img src="../public/img/message_alert.png" style="width: 50%;text-align: center;margin: auto;display: block;">');
						$('.failedhtml').html("<p class='text-center'>Some Errot Please Tray again.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					var response = JSON.parse(jqXHR.responseText);
					if (response.status) {
						var errors = response.errors;
						$this.find('.ans').removeClass('has-error');
						$this.find('.help-block').remove();
						for (var key in errors) {
							if (errors.hasOwnProperty(key)) {
								var el = $this.find('*[name="' + key + '"]');
								$('<span class="help-block"><strong>' + errors[key][0] + '</strong></span>').insertAfter(el);
								el.closest('.ans').addClass('has-error');

							}
						}

					} else {
						alert('Something went wrong');
					}

				}
			});
			return false;
		},

		saveTeamLead: function (THIS) {
			var $this = $(THIS),
				data = $this.serialize();

			$.ajax({
				url: "/saveTeamLead",
				type: "POST",
				data: data,
				success: function (response) {

					if (response.status) {

						$(".resetform").click();
						$("#sidemodalclass").modal('hide');
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/thankpopup.png" style="width: 100%;text-align: center;margin: auto;display: block;">');
						$('.successhtml').html("<p class='text-center' style='font-weight: 600;'>Your Submission has been received. <br> Our experts will reach out to you in the next 24 hours.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
						removeValidationErrors($this);
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();


					} else {
						$("#messagemodel").modal();
						$("#sidemodalclass").modal('hide');
						$('.imgclass').html('<img src="../public/img/message_alert.png" style="width: 50%;text-align: center;margin: auto;display: block;">');
						$('.failedhtml').html("<p class='text-center'>Some Errot Please Tray again.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					var response = JSON.parse(jqXHR.responseText);
					if (response.status) {
						var errors = response.errors;
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();
						for (var key in errors) {
							if (errors.hasOwnProperty(key)) {
								var el = $this.find('*[name="' + key + '"]');
								$('<span class="help-block"><strong>' + errors[key][0] + '</strong></span>').insertAfter(el);
								el.closest('.form-inline').addClass('has-error');

							}
						}

					} else {
						alert('Something went wrong');
					}

				}
			});
			return false;
		},
		saveWatchVideoEnquiry: function (THIS) {
			var $this = $(THIS), data = $this.serialize();
			$('button[type="submit"]').prop('disabled', 'disabled');
			$('input[type="text"],input[type="tel"]').keyup(function () {
				if ($(this).val() != '') {
					$(':input[type="submit"]').prop('disabled', false);
				}
			});
			$.ajax({
				url: "/saveEnquiry",
				type: "POST",
				data: data,
				success: function (response) {

					if (response.status) {

						$("#videotrigger").modal('hide');
						$(".resetform").click();
						$("#VideoPlay").modal();
						removeValidationErrors($this);
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();


					} else {
						$("#downloadModalPopup").modal('hide');
						$("#downloadPopup").modal('hide');
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/message_alert.png" style="width: 50%;text-align: center;margin: auto;display: block;">');
						$('.failedhtml').html("<p class='text-center'>Some Errot Please Tray again.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					var response = JSON.parse(jqXHR.responseText);
					if (response.status) {
						var errors = response.errors;
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();
						for (var key in errors) {
							if (errors.hasOwnProperty(key)) {
								var el = $this.find('*[name="' + key + '"]');
								$('<span class="help-block"><strong>' + errors[key][0] + '</strong></span>').insertAfter(el);
								el.closest('.form-inline').addClass('has-error');
							}
						}
					} else {
						$("#downloadModalPopup").modal('hide');
						$("#downloadPopup").modal('hide');
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/message_alert.png" style="width: 50%;text-align: center;margin: auto;display: block;">');
						$('.failedhtml').html("<p class='text-center'>Some Errot Please Tray again.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
					}

				}
			});
			return false;
		},
		savedownloadCurriculumCroma: function (THIS) {
			var $this = $(THIS), data = $this.serialize();
			$('button[type="submit"]').prop('disabled', 'disabled');
			$('input[type="text"],input[type="tel"]').keyup(function () {
				if ($(this).val() != '') {
					$(':input[type="submit"]').prop('disabled', false);
				}
			});
			$.ajax({
				url: "/saveEnquiry",
				type: "POST",
				data: data,
				success: function (response) {

					if (response.status) {

						$("#downloadCurriculum").modal('hide');
						$(".resetform").click();
						//	$("#download_pdf").modal();							 
						removeValidationErrors($this);
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();
						window.location.href = "/thanks";

					} else {
						$("#downloadCurriculum").modal('hide');
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/message_alert.png" style="width: 50%;text-align: center;margin: auto;display: block;">');
						$('.failedhtml').html("<p class='text-center'>Some Errot Please Tray again.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					var response = JSON.parse(jqXHR.responseText);
					if (response.status) {
						var errors = response.errors;
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();
						for (var key in errors) {
							if (errors.hasOwnProperty(key)) {
								var el = $this.find('*[name="' + key + '"]');
								$('<span class="help-block"><strong>' + errors[key][0] + '</strong></span>').insertAfter(el);
								el.closest('.form-inline').addClass('has-error');
							}
						}
					} else {
						$("#downloadCurriculum").modal('hide');
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/message_alert.png" style="width: 50%;text-align: center;margin: auto;display: block;">');
						$('.failedhtml').html("<p class='text-center'>Some Errot Please Tray again.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
					}

				}
			});
			return false;
		},
		savedownloadCurriculum: function (THIS) {
			var $this = $(THIS),
				data = $this.serialize();
			$('button[type="submit"]').prop('disabled', 'disabled');
			$('input[type="text"],input[type="tel"]').keyup(function () {
				if ($(this).val() != '') {
					$(':input[type="submit"]').prop('disabled', false);
				}
			});
			$.ajax({
				url: "/saveEnquiryDownload",
				type: "POST",
				data: data,
				success: function (response) {

					if (response.status) {

						$("#downloadCurriculum").modal('hide');
						$(".resetform").click();
						//$("#download_mobileotp").modal();							 
						$("#download_pdf").modal();
						removeValidationErrors($this);
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();


					} else {
						$("#downloadCurriculum").modal('hide');
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/message_alert.png" style="width: 50%;text-align: center;margin: auto;display: block;">');
						$('.failedhtml').html("<p class='text-center'>Some Errot Please Tray again.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					var response = JSON.parse(jqXHR.responseText);
					if (response.status) {
						var errors = response.errors;
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();
						for (var key in errors) {
							if (errors.hasOwnProperty(key)) {
								var el = $this.find('*[name="' + key + '"]');
								$('<span class="help-block"><strong>' + errors[key][0] + '</strong></span>').insertAfter(el);
								el.closest('.form-inline').addClass('has-error');

							}
						}

					} else {
						alert('Something went wrong');
					}

				}
			});
			return false;
		},
		getOTP: function (THIS) {
			var $this = $(THIS),
				data = $this.serialize();

			$.ajax({
				url: "/getOTP",
				type: "POST",
				data: data,
				success: function (response) {

					if (response.status) {

						$("#download_mobileotp").modal('hide');
						$(".resetform").click();
						//	var pdf= $this.find('.pdfdata').data('pdfdata');
						var pdf = $this.find("input[name=\"pdfdata\"]").val();

						if (pdf) {
							$("#download_pdf").modal();
						} else {
							$("#messagemodel").modal();
							$('.imgclass').html('<img src="../public/img/thankpopup.png" style="width: 100%;text-align: center;margin: auto;display: block;">');
							$('.successhtml').html("<p class='text-center' style='font-weight: 600;'>Your Submission has been received. <br> Our experts will reach out to you in the next 24 hours.</p>");
							$('#messagemodel').modal({ backdrop: "static", keyboard: false });
						}
						removeValidationErrors($this);
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();


					} else {

						var el = $this.find('*[name="otp"]');
						$('<span class="help-block"><strong>' + response.errors + '</strong></span>').insertAfter(el);
						el.closest('.form-inline').addClass('has-error');
						$("#downloadCurriculum").modal('hide');


					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					var response = JSON.parse(jqXHR.responseText);
					if (response.status) {
						var errors = response.errors;
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();
						for (var key in errors) {
							if (errors.hasOwnProperty(key)) {
								var el = $this.find('*[name="' + key + '"]');
								$('<span class="help-block"><strong>' + errors[key][0] + '</strong></span>').insertAfter(el);
								el.closest('.form-inline').addClass('has-error');

							}
						}

					} else {
						alert('Something went wrong');
					}

				}
			});
			return false;
		},


		savedownloadSyllabus: function (THIS) {
			var $this = $(THIS), data = $this.serialize();
			$('button[type="submit"]').prop('disabled', 'disabled');
			$('input[type="text"],input[type="tel"]').keyup(function () {
				if ($(this).val() != '') {
					$(':input[type="submit"]').prop('disabled', false);
				}
			});
			$.ajax({
				url: "/saveEnquiryDownload",
				type: "POST",
				data: data,
				success: function (response) {
					if (response.status) {
						$("#downloadsyllbus").modal('hide');
						$(".resetform").click();
						//	$("#download_pdf_master").modal();	
						$("#download_master_otp").modal();
						removeValidationErrors($this);
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();


					} else {
						$("#downloadsyllbus").modal('hide');
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/message_alert.png" style="width: 50%;text-align: center;margin: auto;display: block;">');
						$('.failedhtml').html("<p class='text-center'>Some Errot Please Tray again.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					var response = JSON.parse(jqXHR.responseText);
					if (response.status) {
						var errors = response.errors;
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();
						for (var key in errors) {
							if (errors.hasOwnProperty(key)) {
								var el = $this.find('*[name="' + key + '"]');
								$('<span class="help-block"><strong>' + errors[key][0] + '</strong></span>').insertAfter(el);
								el.closest('.form-inline').addClass('has-error');

							}
						}

					} else {
						$("#downloadsyllbus").modal('hide');
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/message_alert.png" style="width: 50%;text-align: center;margin: auto;display: block;">');
						$('.failedhtml').html("<p class='text-center'>Some Errot Please Tray again.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
					}

				}
			});
			return false;
		},

		getMasterOTP: function (THIS) {
			var $this = $(THIS),
				data = $this.serialize();

			$.ajax({
				url: "/getOTP",
				type: "POST",
				data: data,
				success: function (response) {
					if (response.status) {
						$("#downloadsyllbus").modal('hide');
						$("#download_master_otp").modal('hide');
						$(".resetform").click();
						$("#download_pdf_master").modal();
						removeValidationErrors($this);
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();


					} else {

						var el = $this.find('*[name="otp"]');
						$('<span class="help-block"><strong>' + response.errors + '</strong></span>').insertAfter(el);
						el.closest('.form-inline').addClass('has-error');
						$("#downloadCurriculum").modal('hide');


					}

				},
				error: function (jqXHR, textStatus, errorThrown) {
					var response = JSON.parse(jqXHR.responseText);
					if (response.status) {
						var errors = response.errors;
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();
						for (var key in errors) {
							if (errors.hasOwnProperty(key)) {
								var el = $this.find('*[name="' + key + '"]');
								$('<span class="help-block"><strong>' + errors[key][0] + '</strong></span>').insertAfter(el);
								el.closest('.form-inline').addClass('has-error');

							}
						}

					} else {
						alert('Something went wrong');
					}

				}
			});
			return false;
		},

		saveOffer: function (THIS) {
			var $this = $(THIS),
				data = $this.serialize();
			$.ajax({
				url: "/saveEnquiry",
				type: "POST",
				data: data,
				success: function (response) {

					if (response.status) {
						$("#offerspopup").modal('hide');
						$(".resetform").click();
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/thankpopup.png" style="width: 100%;text-align: center;margin: auto;display: block;">');
						$('.successhtml').html("<p class='text-center' style='font-weight: 600;'>Your Submission has been received. <br> Our experts will reach out to you in the next 24 hours.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
						removeValidationErrors($this);

					} else {
						$("#offerspopup").modal('hide');
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/message_alert.png" style="width: 50%;text-align: center;margin: auto;display: block;">');
						$('.failedhtml').html("<p class='text-center'>Some Errot Please Tray again.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					var response = JSON.parse(jqXHR.responseText);
					if (response.status) {
						var errors = response.errors;
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();
						for (var key in errors) {
							if (errors.hasOwnProperty(key)) {
								var el = $this.find('*[name="' + key + '"]');
								$('<span class="help-block"><strong>' + errors[key][0] + '</strong></span>').insertAfter(el);
								el.closest('.form-inline').addClass('has-error');

							}
						}

					} else {
						$("#offerspopup").modal('hide');
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/message_alert.png" style="width: 50%;text-align: center;margin: auto;display: block;">');
						$('.failedhtml').html("<p class='text-center'>Some Errot Please Tray again.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
					}

				}
			});
			return false;
		},
		saveCorporateEnquiry: function (THIS) {
			var $this = $(THIS),
				data = $this.serialize();
			$.ajax({
				url: "/saveCorporateEnquiry",
				type: "POST",
				data: data,
				success: function (response) {
					if (response.status) {
						$("#offerspopup").modal('hide');
						$(".resetform").click();
						//	$("#messagemodel").modal();
						//	$('.imgclass').html('<img src="../public/img/thankpopup.png" style="width: 100%;text-align: center;margin: auto;display: block;">');					
						//	$('.successhtml').html("<p class='text-center' style='font-weight: 600;'>Your Submission has been received. <br> Our experts will reach out to you in the next 24 hours.</p>");
						//	$('#messagemodel').modal({backdrop:"static",keyboard:false});
						removeValidationErrors($this);
						window.location.href = "/thanks";
					} else {
						$("#offerspopup").modal('hide');
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/message_alert.png" style="width: 50%;text-align: center;margin: auto;display: block;">');
						$('.failedhtml').html("<p class='text-center'>Some Errot Please Tray again.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					var response = JSON.parse(jqXHR.responseText);
					if (response.status) {
						var errors = response.errors;
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();
						for (var key in errors) {
							if (errors.hasOwnProperty(key)) {
								var el = $this.find('*[name="' + key + '"]');
								$('<span class="help-block"><strong>' + errors[key][0] + '</strong></span>').insertAfter(el);
								el.closest('.form-inline').addClass('has-error');
							}
						}
					} else {
						$("#offerspopup").modal('hide');
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/message_alert.png" style="width: 50%;text-align: center;margin: auto;display: block;">');
						$('.failedhtml').html("<p class='text-center'>Some Errot Please Tray again.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
					}
				}
			});
			return false;
		},
		saveFranchise: function (THIS) {
			var $this = $(THIS), data = $this.serialize();
			$.ajax({
				url: "/saveFranchise",
				type: "POST",
				data: data,
				success: function (response) {

					if (response.status) {
						$("#fran").modal('hide');
						$(".resetform").click();
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/thankpopup.png" style="width: 100%;text-align: center;margin: auto;display: block;">');
						$('.successhtml').html("<p class='text-center' style='font-weight: 600;'>Your Submission has been received. <br> Our experts will reach out to you in the next 24 hours.</p>");
						$('#.messagemodel').modal({ backdrop: "static", keyboard: false });
						//removeValidationErrors($this);
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();

					} else {
						$("#fran").modal('hide');
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/message_alert.png" style="width: 50%;text-align: center;margin: auto;display: block;">');
						$('.failedhtml').html("<p class='text-center'>Some Errot Please Tray again.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					var response = JSON.parse(jqXHR.responseText);
					if (response.status) {
						//showValidationErrors($this,response.errors);
						var errors = response.errors;
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();
						for (var key in errors) {
							if (errors.hasOwnProperty(key)) {
								var el = $this.find('*[name="' + key + '"]');
								$('<span class="help-block"><strong>' + errors[key][0] + '</strong></span>').insertAfter(el);
								el.closest('.form-inline').addClass('has-error');

							}
						}

					} else {
						$("#fran").modal('hide');
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/message_alert.png" style="width: 50%;text-align: center;margin: auto;display: block;">');
						$('.failedhtml').html("<p class='text-center'>Some Errot Please Tray again.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
					}

				}
			});
			return false;
		},
		mobileOtp: function (THIS) {

			var $this = $(THIS),
				data = $this.serialize();
			$.ajax({
				url: "/get-leadshowdataotp",
				type: "POST",
				data: data,
				success: function (response) {
					var obj = JSON.parse(response);
					if (obj.status) {

						$("#enquirypopups").modal('hide');
						$("#showotppopups").modal();
						$("#showotppopups .pastmobile").text($('.newmobsection-input option:selected').val());

						$('#showotppopups').modal({ backdrop: "static", keyboard: false });
						//removeValidationErrors($this);
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();

					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					var response = JSON.parse(jqXHR.responseText);
					if (response.status) {
						//showValidationErrors($this,response.errors);
						var errors = response.errors;
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();
						for (var key in errors) {
							if (errors.hasOwnProperty(key)) {
								var el = $this.find('*[name="' + key + '"]');
								$('<span class="help-block"><strong>' + errors[key][0] + '</strong></span>').insertAfter(el);
								el.closest('.form-inline').addClass('has-error');

							}
						}

					}

				}
			});
			return false;
		},

		matchmobileOtp: function (THIS) {

			var $this = $(THIS),
				data = $this.serialize();
			$.ajax({
				url: "/get-matchmobileOtp",
				type: "POST",
				data: data,
				success: function (response) {
					var obj = JSON.parse(response);
					if (obj.status) {

						$("#showotppopups").modal('hide');
						location.reload();

						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();

					} else {

						$("#showotppopups .validation").text('does not match');
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					var response = JSON.parse(jqXHR.responseText);
					if (response.status) {
						//showValidationErrors($this,response.errors);
						var errors = response.errors;
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();
						for (var key in errors) {
							if (errors.hasOwnProperty(key)) {
								var el = $this.find('*[name="' + key + '"]');
								$('<span class="help-block"><strong>' + errors[key][0] + '</strong></span>').insertAfter(el);
								el.closest('.form-inline').addClass('has-error');

							}
						}

					} else {
						alert('Something went wrong');
					}

				}
			});
			return false;
		},

		saveScholarship: function (THIS) {
			var $this = $(THIS), data = $this.serialize();
			$.ajax({
				url: "/saveScholarship",
				type: "POST",
				data: data,
				success: function (response) {

					if (response.status) {
						$this.closest('.modal').modal('hide');
						$(".resetform").click();
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/thankpopup.png" style="width: 100%;text-align: center;margin: auto;display: block;">');
						$('.successhtml').html("<p class='text-center' style='font-weight: 600;'>Your Submission has been received. <br> Our experts will reach out to you in the next 24 hours.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
						//removeValidationErrors($this);
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();

					} else {
						$("#sclrsp").modal('hide');
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/message_alert.png" style="width: 50%;text-align: center;margin: auto;display: block;">');
						$('.failedhtml').html("<p class='text-center'>Some Errot Please Tray again.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					var response = JSON.parse(jqXHR.responseText);
					if (response.status) {
						//showValidationErrors($this,response.errors);
						var errors = response.errors;
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();
						for (var key in errors) {
							if (errors.hasOwnProperty(key)) {
								var el = $this.find('*[name="' + key + '"]');
								$('<span class="help-block"><strong>' + errors[key][0] + '</strong></span>').insertAfter(el);
								el.closest('.form-inline').addClass('has-error');

							}
						}

					} else {
						$("#sclrsp").modal('hide');
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/message_alert.png" style="width: 50%;text-align: center;margin: auto;display: block;">');
						$('.failedhtml').html("<p class='text-center'>Some Errot Please Tray again.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
					}

				}
			});
			return false;
		},
		saveHireCroma: function (THIS) {
			var $this = $(THIS),
				data = $this.serialize();
			$.ajax({
				url: "/saveHireCroma",
				type: "POST",
				data: data,
				success: function (response) {

					if (response.status) {
						$this.closest('.modal').modal('hide');
						$(".resetform").click();
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/thankpopup.png" style="width: 100%;text-align: center;margin: auto;display: block;">');
						$('.successhtml').html("<p class='text-center' style='font-weight: 600;'>Your Submission has been received. <br> Our experts will reach out to you in the next 24 hours.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
						//removeValidationErrors($this);
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();

					} else {
						$("#sclrsp").modal('hide');
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/message_alert.png" style="width: 50%;text-align: center;margin: auto;display: block;">');
						$('.failedhtml').html("<p class='text-center'>Some Errot Please Tray again.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					var response = JSON.parse(jqXHR.responseText);
					if (response.status) {
						//showValidationErrors($this,response.errors);
						var errors = response.errors;
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();
						for (var key in errors) {
							if (errors.hasOwnProperty(key)) {
								var el = $this.find('*[name="' + key + '"]');
								$('<span class="help-block"><strong>' + errors[key][0] + '</strong></span>').insertAfter(el);
								el.closest('.form-inline').addClass('has-error');

							}
						}

					} else {
						alert('Something went wrong');
					}

				}
			});
			return false;
		},
		saveReview: function (THIS) {
			var $this = $(THIS);
			var form = new FormData(THIS);
			$.ajax({
				url: "/saveReview",
				type: "POST",
				dataType: "json",
				data: form,
				cache: false,
				contentType: false,
				processData: false,
				success: function (response) {

					if (response.status) {
						$this.closest('.modal').modal('hide');
						$(".resetform").click();
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/thankpopup.png" style="width: 100%;text-align: center;margin: auto;display: block;">');
						$('.successhtml').html("<p class='text-center' style='font-weight: 600;'>Your Submission has been received. <br> Our experts will reach out to you in the next 24 hours.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
						//removeValidationErrors($this);
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();

					} else {
						$("#sclrsp").modal('hide');
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/message_alert.png" style="width: 50%;text-align: center;margin: auto;display: block;">');
						$('.failedhtml').html("<p class='text-center'>Some Errot Please Tray again.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					var response = JSON.parse(jqXHR.responseText);
					if (response.status) {
						//showValidationErrors($this,response.errors);
						var errors = response.errors;
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();
						for (var key in errors) {
							if (errors.hasOwnProperty(key)) {
								var el = $this.find('*[name="' + key + '"]');
								$('<span class="help-block"><strong>' + errors[key][0] + '</strong></span>').insertAfter(el);
								el.closest('.form-inline').addClass('has-error');
							}
						}

					} else {
						$("#sclrsp").modal('hide');
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/message_alert.png" style="width: 50%;text-align: center;margin: auto;display: block;">');
						$('.failedhtml').html("<p class='text-center'>Some Errot Please Tray again.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
					}

				}
			});
			return false;
		},
		saveNewsLetter: function (THIS) {
			var $this = $(THIS), data = $this.serialize();
			$.ajax({
				url: "/saveNewsLetter",
				type: "POST",
				data: data,
				success: function (response) {

					if (response.status) {
						$this.closest('.modal').modal('hide');
						$(".resetform").click();
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/thankpopup.png" style="width: 100%;text-align: center;margin: auto;display: block;">');
						$('.successhtml').html("<p class='text-center' style='font-weight: 600;'>Your Submission has been received. <br> Our experts will reach out to you in the next 24 hours.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
						//removeValidationErrors($this);
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();

					} else {
						$("#sclrsp").modal('hide');
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/message_alert.png" style="width: 50%;text-align: center;margin: auto;display: block;">');
						$('.failedhtml').html("<p class='text-center'>Some Errot Please Tray again.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					var response = JSON.parse(jqXHR.responseText);
					if (response.status) {
						//showValidationErrors($this,response.errors);
						var errors = response.errors;
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();
						for (var key in errors) {
							if (errors.hasOwnProperty(key)) {
								var el = $this.find('*[name="' + key + '"]');
								$('<span class="help-block"><strong>' + errors[key][0] + '</strong></span>').insertAfter(el);
								el.closest('.form-inline').addClass('has-error');

							}
						}

					} else {
						$("#sclrsp").modal('hide');
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/message_alert.png" style="width: 50%;text-align: center;margin: auto;display: block;">');
						$('.failedhtml').html("<p class='text-center'>Some Errot Please Tray again.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
					}

				}
			});
			return false;
		},

		saveNotifications: function (THIS) {
			var $this = $(THIS), data = $this.serialize();
			$.ajax({
				url: "/saveNotifications",
				type: "POST",
				data: data,
				success: function (response) {

					if (response.status) {
						$this.closest('.modal').modal('hide');
						$(".resetform").click();
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/thankpopup.png" style="width: 100%;text-align: center;margin: auto;display: block;">');
						$('.successhtml').html("<p class='text-center' style='font-weight: 600;'>Your Submission has been received. <br> Our experts will reach out to you in the next 24 hours.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
						//removeValidationErrors($this);
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();

					} else {
						$("#sclrsp").modal('hide');
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/message_alert.png" style="width: 50%;text-align: center;margin: auto;display: block;">');
						$('.failedhtml').html("<p class='text-center'>Some Errot Please Tray again.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					var response = JSON.parse(jqXHR.responseText);
					if (response.status) {
						//showValidationErrors($this,response.errors);
						var errors = response.errors;
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();
						for (var key in errors) {
							if (errors.hasOwnProperty(key)) {
								var el = $this.find('*[name="' + key + '"]');
								$('<span class="help-block"><strong>' + errors[key][0] + '</strong></span>').insertAfter(el);
								el.closest('.form-inline').addClass('has-error');
							}
						}
					} else {
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/message_alert.png" style="width: 50%;text-align: center;margin: auto;display: block;">');
						$('.failedhtml').html("<p class='text-center'>Some Errot Please Tray again.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
					}

				}
			});
			return false;
		},
		faceAnIssue: function (THIS) {
			var $this = $(THIS),
				data = $this.serialize();
			$.ajax({
				url: "/faceAnIssue",
				type: "POST",
				data: data,
				success: function (response) {

					if (response.status) {
						$this.closest('.modal').modal('hide');
						$(".resetform").click();
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/thankpopup.png" style="width: 100%;text-align: center;margin: auto;display: block;">');
						$('.successhtml').html("<p class='text-center' style='font-weight: 600;'>Your Submission has been received. <br> Our experts will reach out to you in the next 24 hours.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
						//removeValidationErrors($this);
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();

					} else {
						$("#sclrsp").modal('hide');
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/message_alert.png" style="width: 50%;text-align: center;margin: auto;display: block;">');
						$('.failedhtml').html("<p class='text-center'>Some Errot Please Tray again.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					var response = JSON.parse(jqXHR.responseText);
					if (response.status) {
						//showValidationErrors($this,response.errors);
						var errors = response.errors;
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();
						for (var key in errors) {
							if (errors.hasOwnProperty(key)) {
								var el = $this.find('*[name="' + key + '"]');
								$('<span class="help-block"><strong>' + errors[key][0] + '</strong></span>').insertAfter(el);
								el.closest('.form-inline').addClass('has-error');

							}
						}

					} else {
						alert('Something went wrong');
					}

				}
			});
			return false;
		},
		saveApplyJob: function (THIS) {
			var $this = $(THIS); var form = new FormData(THIS);
			$.ajax({
				url: "/saveApplyJob",
				type: "POST",
				dataType: "json",
				data: form,
				cache: false,
				contentType: false,
				processData: false,
				success: function (response) {

					if (response.status) {
						$this.closest('.modal').modal('hide');
						$(".resetform").click();
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/thankpopup.png" style="width: 100%;text-align: center;margin: auto;display: block;">');
						$('.successhtml').html("<p class='text-center' style='font-weight: 600;'>Your Submission has been received. <br> Our experts will reach out to you in the next 24 hours.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
						//removeValidationErrors($this);
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();

					} else {
						$("#sclrsp").modal('hide');
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/message_alert.png" style="width: 50%;text-align: center;margin: auto;display: block;">');
						$('.failedhtml').html("<p class='text-center'>Some Errot Please Tray again.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					var response = JSON.parse(jqXHR.responseText);
					if (response.status) {
						//showValidationErrors($this,response.errors);
						var errors = response.errors;
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();
						for (var key in errors) {
							if (errors.hasOwnProperty(key)) {
								var el = $this.find('*[name="' + key + '"]');
								$('<span class="help-block"><strong>' + errors[key][0] + '</strong></span>').insertAfter(el);
								el.closest('.form-inline').addClass('has-error');

							}
						}

					} else {
						$this.closest('.modal').modal('hide');
						$(".resetform").click();
						$("#messagemodel").modal();
						$('.imgclass').html('<img src="../public/img/thankpopup.png" style="width: 100%;text-align: center;margin: auto;display: block;">');
						$('.successhtml').html("<p class='text-center' style='font-weight: 600;'>Your Submission has been received. <br> Our experts will reach out to you in the next 24 hours.</p>");
						$('#messagemodel').modal({ backdrop: "static", keyboard: false });
						//removeValidationErrors($this);
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();
					}

				}
			});
			return false;
		},

		mobileverifiction: function (THIS) {
			var $this = $(THIS), data = $this.serialize();
			$('button[type="submit"]').prop('disabled', 'disabled');
			$('input[type="password"],input[type="tel"],input[type="text"]').keyup(function () {
				if ($(this).val() != '') {
					$(':input[type="submit"]').prop('disabled', false);
				}
			});
			$.ajax({
				type: "POST",
				url: "/mobileverifiction",
				data: data,
				beforeSend: function () {
					$("#error").fadeOut();
					$("#btn-login").html("<span class=\"glyphicon glyphicon-transfer\"></span> &nbsp; sending ...");
				},
				success: function (data, textStatus, jqXHR) {
					if (data.statusCode && data.statusCode == 1) {

						$('.input-otp').replaceWith(data.data.payload);
						$("#btn-login").html('<span><span>Continue</span></span>');
						$('.input-otp').before(data.data.message);
						document.getElementById("vas").style.display = "block";
						document.getElementById("ret").style.display = "none";
						$('.inpsuts').keyup(function () {

							if (this.value.length == this.maxLength) {
								$(this).next('.inpsuts').focus();
							}
						});
					}
					else {
						$(".alert").remove();
						$('.help-blocks').html('<strong>' + data.data.message + '</strong>');
						$("#btn-login").html('<span><span>Continue</span></span>');
					}
				}
			});
			return false;
		},
		GetCertificateId: function (THIS) {

			var $this = $(THIS),
				data = $this.serialize();

			$.ajax({
				type: "POST",
				url: "/GetCertificateId",
				data: data,
				beforeSend: function () {
					$("#error").fadeOut();
					$("#btn-login").html("<span class=\"glyphicon glyphicon-transfer\"></span> &nbsp; sending ...");
				},
				success: function (data, textStatus, jqXHR) {
					if (data.statusCode && data.statusCode == 1) {

						$('.input-certificate-tracking').replaceWith(data.data.payload);
						$("#btn-login").html('<span><span>Continue</span></span>');
						$('.input-certificate-tracking').before(data.data.message);
						document.getElementById("vas").style.display = "block";
						document.getElementById("certraid").style.display = "none";
						$('.inpsuts').keyup(function () {

							if (this.value.length == this.maxLength) {
								$(this).next('.inpsuts').focus();
							}
						});
					}
					else {
						$(".alert").remove();
						$('.help-block').html('<strong>' + data.data.message + '</strong>');
						$("#btn-login").html('<span><span>Continue</span></span>');
					}
				}
			});





			return false;
		},
		otpVerifiction: function (THIS) {
			var $this = $(THIS), data = $this.serialize();
			$.ajax({
				type: "POST",
				url: "/otpVerifiction",
				data: data,
				beforeSend: function () {
					$("#error").fadeOut();
					$("#btn-login").html("<span class=\"glyphicon glyphicon-transfer\"></span> &nbsp; sending ...");
				},
				success: function (data, textStatus, jqXHR) {
					if (data.statusCode && data.statusCode == 2) {
						//	$('a[href="#track"]').trigger('click');
						$(".resetform").click();
						$('a[href="#track"]').removeClass('disabled').trigger('click');
					}
					else {
						$(".alert").remove();
						$('.help-blocks').html('<strong>' + data.data.message + '</strong>');
						$("#btn-login").html('<span><span>Continue</span></span>');
					}
				}
			});

			return false;
		},
		getCertificateno: function (THIS) {
			var $this = $(THIS), data = $this.serialize();
			$.ajax({
				type: "POST",
				url: "/getCertificateno",
				data: data,
				beforeSend: function () {
					$("#error").fadeOut();
					$("#btn-login").html("<span class=\"glyphicon glyphicon-transfer\"></span> &nbsp; sending ...");
				},
				success: function (data, textStatus, jqXHR) {
					if (data.statusCode && data.statusCode == 1) {
						//$('.student-details').replaceWith(data.data.payload);
						$('.certraid').hide();
						//	$('.student-details').html(data.data.payload);
						$('.student-data').html(data.data.payload);
					}
					else {
						$(".alert").remove();
						$('.help-block').html('<strong>' + data.data.message + '</strong>');
						$("#btn-login").html('<span><span>Continue</span></span>');
					}
				}
			});
			return false;
		},

		mobileCheckCertificate: function (THIS) {

			var $this = $(THIS),
				data = $this.serialize();
			$.ajax({
				type: "GET",
				url: "/mobileCheckCertificate",
				data: data,
				success: function (data, textStatus, jqXHR) {

					if (data.statusCode == 1) {
						var payload = data.data.payload;
						if (payload.length > 1) {

							$this.find('.help-block').remove();
							$('#leadsPayloadModal').modal();
							var $html = "";
							for (var i in payload) {

								if (payload[i].next_due_amt <= 0) {
									$html += "<div class=\"col-sm-12 select-technology\"><label for=\"" + payload[i].id + "\">" + payload[i].course_name + "<p></p></label><input type=\"radio\"  name=\"fav_language\" id=\"" + payload[i].id + "\" value=\"" + payload[i].stdid + "\" ><br></div>";
								} else {
									$html += "<div class=\"col-sm-12 select-technology\"><label for=\"" + payload[i].id + "\">" + payload[i].course_name + "<p>[Please clear your Fees Dues before applying for certificate]</p></label><input type=\"radio\"  name=\"fav_language\" id=\"" + payload[i].id + "\" value=\"" + payload[i].stdid + "\" disabled><br></div>";

								}
							}

							$('#leadsPayloadModal .nit-form').html($html);
							$('#leadsPayloadModal .choke').off('click');
							$('#leadsPayloadModal .choke').on('click', function () {
								$('#applycertificate').modal();
								var target_id = $('#leadsPayloadModal input[name="fav_language"]').filter(':checked').val();
								for (var i in payload) {
									if (payload[i].stdid == target_id) {

										var stat_date = $.datepicker.formatDate("yy-mm-dd", new Date(payload[i].student_registered));
										var date = new Date(payload[i].student_registered);
										date.setDate(date.getDate() + 239);
										var enddate = $.datepicker.formatDate("yy-mm-dd", new Date(date));

										$newhtml = "<div class=\"name\"><div class=\"col-2\"><p>Name*</p></div><div class=\"col-2\"><select name=\"title\" style=\"color:#495057;\"><option value=\"Mr.\" selected>Mr.</option><option value=\"Mrs.\">Mrs.</option><option value=\"Miss.\">Miss.</option></select></div><div class=\"col-8\" style=\"padding-left:10px;\"><input type=\"text\" name=\"name\" value=\"" + payload[i].name + "\" placeholder=\"Enter Name\" readonly></div></div><div class=\"name\"><div class=\"col-2\"><p>Email*</p></div><div class=\"col-10\"><input type=\"email\" name=\"email\" value=\"" + payload[i].email + "\" placeholder=\"Enter Email\" readonly></div></div><div class=\"name\"><div class=\"col-2\"><p>Mobile*</p></div><div class=\"col-10\"><input type=\"tel\" name=\"phone\" value=\"" + payload[i].phone + "\" onkeypress=\"return isNumberKey(event);\"  placeholder=\"Enter mobile\" readonly></div></div><div class=\"name\"><div class=\"col-2\"><p>Course*</p></div><div class=\"col-10\"><input type=\"text\" name=\"technology\" value=\"" + payload[i].course_name + "\" placeholder=\"Enter technology\" readonly></div></div><div class=\"name\"><div class=\"col-3\" style=\"flex: 0 0 20%; max-width: 20%;\"><p>Start Date*</p></div><div class=\"col-3\"><input type=\"text\" class=\"start-date\" name=\"start-date\" value=\"" + stat_date + "\" placeholder=\"Entet start date *\"  readonly></div><div class=\"col-3\" style=\"flex: 0 0 20%; max-width: 20%;\"><p class=\"text-center\">End Date*</p></div><div class=\"col-3\"><input type=\"text\" name=\"end-date\" class=\"end-date\" value=\"\" readonly></div><div class=\"col-1\" style=\"text-align:center;\"><p style=\"font-size:23px; color: #777c81;\"><i class=\"fa-solid fa-calendar-day\"></i></p></div></div><div class=\"name\" style=\"display: flex;align-items: center;\"><div class=\"col-6\" ><p>If Above Details are correct</p></div><div class=\"col-1\"></div><div class=\"col-2\" ><label for=\"select\" style=\"display: flex; align-items: center;\">Yes<input type=\"radio\" id=\"select\" value=\"Yes\" name=\"checkbox\" class=\"dtl-incorect\"></label></div><div class=\"col-2\" ><label for=\"select2\" style=\"display: flex; align-items: center;\">No<input type=\"radio\" id=\"select2\" value=\"No\" name=\"checkbox\" class=\"dtl-incorect\"></label></div></div><div class=\"name\" style=\"margin:0;\"><div class=\"issue-form col-12\" ><p class=\"text\">LET US KNOW WHAT IS NOT CORRECT</p><hr style=\"margin:.5rem 0 !important;\"><textarea name=\"remark\" rows=\"3\" placeholder=\"Your message here.\"></textarea></div></div>";

										$('#applycertificate .form-data-result').html($newhtml);

										$('.end-date').datepicker(
											{
												dateFormat: 'yy-mm-dd',
												maxDate: 0,
												beforeShow: function () {
													$(this).datepicker('option', 'minDate', $('.start-date').val());
													if ($('.start-date').val() === '') $(this).datepicker('option', 'maxDate', 0);
												}
											});

										$('.issue-form').hide();
										$(".dtl-incorect").click(function () {
											var value = $(this).val();

											if (value == 'Yes') {

												$('.issue-form').hide();
											} else if (value == 'No') {

												$('.issue-form').show();
											}

										});



									}
								}
								$('#leadsPayloadModal').modal('hide');
							});



							return;
						} else {


							$this.find('.help-block').remove();


							for (var i in payload) {

								if (payload[i].next_due_amt <= 0) {
									$('#applycertificate').modal();
									var stat_date = $.datepicker.formatDate("yy-mm-dd", new Date(payload[i].student_registered));
									var date = new Date(payload[i].student_registered);
									date.setDate(date.getDate() + 239);
									var enddate = $.datepicker.formatDate("yy-mm-dd", new Date(date));


									$newhtml = "<div class=\"name\"><div class=\"col-2\"><p>Name*</p></div><div class=\"col-2\"><select name=\"title\" style=\"color:#495057;\"><option value=\"Mr.\" selected>Mr.</option><option value=\"Mrs.\">Mrs.</option></select></div><div class=\"col-8\" style=\"padding-left:10px;\"><input type=\"text\" name=\"name\" value=\"" + payload[i].name + "\" placeholder=\"Enter Name\" readonly></div></div><div class=\"name\"><div class=\"col-2\"><p>Email*</p></div><div class=\"col-10\"><input type=\"email\" name=\"email\" value=\"" + payload[i].email + "\" placeholder=\"Enter Email\" readonly></div></div><div class=\"name\"><div class=\"col-2\"><p>Mobile*</p></div><div class=\"col-10\"><input type=\"tel\" name=\"phone\" value=\"" + payload[i].phone + "\" onkeypress=\"return isNumberKey(event);\"  placeholder=\"Enter mobile\" readonly></div></div><div class=\"name\"><div class=\"col-2\"><p>Course*</p></div><div class=\"col-10\"><input type=\"text\" name=\"technology\" value=\"" + payload[i].course_name + "\" placeholder=\"Enter technology\" readonly></div></div><div class=\"name\"><div class=\"col-3\" style=\"flex: 0 0 20%; max-width: 20%;\"><p>Start Date*</p></div><div class=\"col-3\"><input type=\"text\" class=\"start-date\" name=\"start-date\" value=\"" + stat_date + "\" placeholder=\"Entet start date *\"  readonly></div><div class=\"col-3\" style=\"flex: 0 0 20%; max-width: 20%;\"><p class=\"text-center\">End Date*</p></div><div class=\"col-3\"><input type=\"text\" name=\"end-date\" class=\"end-date\" value=\"\" readonly ></div><div class=\"col-1\" style=\"text-align:center;\"><p style=\"font-size:23px; color: #777c81;\"><i class=\"fa-solid fa-calendar-day\"></i></p></div></div><div class=\"name\" style=\"display: flex;align-items: center;\"><div class=\"col-6\" ><p>If Above Details are correct</p></div><div class=\"col-1\"></div><div class=\"col-2\" ><label for=\"select\" style=\"display: flex; align-items: center;\">Yes<input type=\"radio\" id=\"select\" value=\"Yes\" name=\"checkbox\" class=\"dtl-incorect\"></label></div><div class=\"col-2\" ><label for=\"select2\" style=\"display: flex; align-items: center;\">No<input type=\"radio\" id=\"select2\" value=\"No\" name=\"checkbox\" class=\"dtl-incorect\"></label></div></div><div class=\"name\" style=\"margin:0;\"><div class=\"issue-form col-12\" ><p class=\"text\">LET US KNOW WHAT IS NOT CORRECT</p><hr style=\"margin:.5rem 0 !important;\"><textarea name=\"remark\" rows=\"3\" placeholder=\"Your message here.\"></textarea></div></div>";

									$('#applycertificate .form-data-result').html($newhtml);
									$('.end-date').datepicker(
										{
											dateFormat: 'yy-mm-dd',
											maxDate: 0,
											beforeShow: function () {
												$(this).datepicker('option', 'minDate', $('.start-date').val());

												if ($('.start-date').val() === '') $(this).datepicker('option', 'maxDate', 0);
											}
										});

									$('.issue-form').hide();
									$(".dtl-incorect").click(function () {
										var value = $(this).val();

										if (value == 'Yes') {

											$('.issue-form').hide();
										} else if (value == 'No') {

											$('.issue-form').show();
										}

									});

								} else {

									$(".alert").remove();
									$('.help-blocks').html('<strong>Please clear your Fees Dues before applying for certificate</strong>');


								}

							}

						}

					} else if (data.statusCode && data.statusCode == 2) {
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();

						$("#apllymessage").modal();
						$('.imgclass').html('<img src="../public/img/applycertificate.png" style="width: 100%;text-align: center;margin: auto;display: block;">');
						$('.applytext').html("<p class='text-center' style='font-weight:400;'>Certificate has <b>already been applied.</b></p>");
						$('#apllymessage').modal({ backdrop: "static", keyboard: false });

					} else {

						$(".alert").remove();
						$('.help-blocks').html('<strong>' + data.data.message + '</strong>');
						$("#btn-login").html('<span><span>Continue</span></span>');
					}


				}
			});





			return false;
		},

		mobileCheckCertificate4_5_22: function (THIS) {

			var $this = $(THIS),
				data = $this.serialize();

			$.ajax({
				type: "POST",
				url: "/mobileCheckCertificate",
				data: data,

				success: function (data, textStatus, jqXHR) {


					if (data.statusCode && data.statusCode == 1) {
						//$('.student-details').replaceWith(data.data.payload);
						$('#applycertificate').modal();
						//	$('.student-details').html(data.data.payload);
						$('#applycertificate .form-data-result').html(data.data.payload);

						$('#end-date').datepicker(
							{
								dateFormat: 'yy-mm-dd',
								maxDate: 0,
								beforeShow: function () {
									$(this).datepicker('option', 'minDate', $('#start-date').val());
									$(this).datepicker('option', 'maxDate', $('#end-date').val());
									if ($('#start-date').val() === '') $(this).datepicker('option', 'maxDate', 0);
								}
							});


						$('.issue-form').hide();
						$(".dtl-incorect").click(function () {
							var value = $(this).val();
							if (value == 'Yes') {
								$('.issue-form').hide();
							} else if (value == 'No') {
								$('.issue-form').show();
							}
						});


					} else if (data.statusCode && data.statusCode == 2) {

						$("#apllymessage").modal();
						$('.imgclass').html('<img src="../public/img/applycertificate.png" style="width: 100%;text-align: center;margin: auto;display: block;">');
						$('.applytext').html("<p class='text-center' style='font-weight:400;'>Certificate has <b>already been applied.</b></p>");
						$('#apllymessage').modal({ backdrop: "static", keyboard: false });


					} else {


						$(".alert").remove();
						$('.help-blocks').html('<strong>' + data.data.message + '</strong>');
						$("#btn-login").html('<span><span>Continue</span></span>');
					}
				}
			});





			return false;
		},

		SaveCheckCertificate: function (THIS) {

			var $this = $(THIS),
				data = $this.serialize();
			//alert(data);			
			$.ajax({
				type: "POST",
				url: "/SaveCheckCertificate",
				data: data,


				success: function (data, textStatus, jqXHR) {

					if (data.statusCode && data.statusCode == 1) {
						$(".resetform").click();

						$('#applycertificate').modal('hide');
						$('.upper-boxs').hide();;
						$('.student-data').html(data.data.payload);
					} else {
						if (data.status) {
							$this.closest('.modal').modal('hide');
							$(".resetform").click();

							$("#applycertificate").modal('hide');
							$("#successmessage").modal();
							$('.imgclass').html('<img src="../public/img/Thanks_success.jpg" style="width: 100%;text-align: center;margin: auto;display: block;margin-bottom: 7px;">');
							$('.nit-form').html("<p class='text-center' style='font-weight: 600;font-size: 13px;color: #4e4e4e;'>You Request for certificate have been Successfully submited.</p>");
							$('#successmessage').modal({ backdrop: "static", keyboard: false });
							removeValidationErrors($this);
							$this.find('.form-inline').removeClass('has-error');
							$this.find('.help-block').remove();
						} else {

							$("#applycertificate").modal('hide');
							$("#successmessage").modal();
							$('.imgclass').html('<img src="../public/img/message_alert.png" style="width: 50%;text-align: center;margin: auto;display: block;">');
							$('.nit-form').html("<p class='text-center'>Already Apply Certificate.</p>");
							$('#successmessage').modal({ backdrop: "static", keyboard: false });
						}
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					var response = JSON.parse(jqXHR.responseText);
					if (response.status) {
						//showValidationErrors($this,response.errors);
						var errors = response.errors;
						$this.find('.form-inline').removeClass('has-error');
						$this.find('.help-block').remove();
						for (var key in errors) {
							if (errors.hasOwnProperty(key)) {
								var el = $this.find('*[name="' + key + '"]');
								$('<span class="help-block"><strong>' + errors[key][0] + '</strong></span>').insertAfter(el);
								el.closest('.form-inline').addClass('has-error');

							}
						}

					} else {
						alert('Something went wrong');
					}

				}


			});





			return false;
		},
	};
})();
function removeValidationErrors($this) {
	$this.find('.form-group').removeClass('has-error');
	$this.find('.help-block').remove();
}

function showValidationErrors($this, errors) {
	$this.find('.form-group').removeClass('has-error');
	$this.find('.help-block').remove();
	for (var key in errors) {
		if (errors.hasOwnProperty(key)) {
			var el = $this.find('*[name="' + key + '"]');
			$('<span class="help-block"><strong>' + errors[key][0] + '</strong></span>').insertAfter(el);
			el.closest('.form-group').addClass('has-error');
		}
	}
}

function mycategory() {
	var cat = document.getElementById("myLinks");
	var caticon = document.getElementById("croptabicon");
	if (cat.style.display === "none") {
		cat.style.display = "block";
		caticon.classList.add("fa-angle-up");
		caticon.classList.remove("fa-angle-down");
	} else {
		cat.style.display = "none";
		caticon.classList.add("fa-angle-down");
		caticon.classList.remove("fa-angle-up");
	}
}

function loadprogram() {
	var mp = document.getElementById("more-program");
	var sp = document.getElementById("more-show-program");
	var famore = document.getElementById("show-more-fa-program");
	if (mp.style.display == 'block') {
		mp.style.display = 'none';
		sp.innerHTML = 'Show More';
		famore.classList.add("fa-angle-down");
		famore.classList.remove("fa-angle-up");
	}
	else {
		mp.style.display = 'block';
		sp.innerHTML = 'Show Less';
		famore.classList.add("fa-angle-up");
		famore.classList.remove("fa-angle-down");
	}
};

function showCategory() {
	$.ajax({
		"url": "/get_category_ajax",
		"type": "GET",
		"success": function (data, textStatus, jqXHR) {

			if (data.length > 0) {
				var html = '';

				for (var i in data) {
					html += ' <a class="dropdown-item" href="#" onclick="showCategoryCourse(this,' + data[i].categoryid + ')">' + data[i].categoryname + '</a>';
				}
				$('.dropdown-menu').html(html);
			}
		}
	});

}


function showCategoryCourse(THIS, catid) {
	var $this = $(THIS);
	$(".cortablinks").removeClass("active");
	if (!$this.hasClass('active')) {
		$this.addClass('active');
		$('.modal-course-list .cortablinks').addClass('active');
	}
	$.ajax({
		"url": "/get_category_course/" + catid,
		"type": "GET",
		"success": function (data, textStatus, jqXHR) {

			if (data.length > 0) {
				$('.show-all-category-courses').html(data);
			}
		}
	});
}

function showCategoryMaster(THIS, catid) {
	var $this = $(THIS);
	$(".mptablinks").removeClass("active");

	if (!$this.hasClass('active')) {
		$this.addClass('active');
	}


	$.ajax({
		"url": "/get_category_master/" + catid,
		"type": "GET",
		"success": function (data, textStatus, jqXHR) {

			if (data.length > 0) {
				$('.show-category-master').html(data);

			}
		}
	});


}

$('.showCategoryMaster').on('click', function () {

	$(".mptablinks").removeClass("active");

	$(".showCategoryProgram").removeClass("active");
	$(".showCategoryMaster").addClass("active");

	$.ajax({
		"url": "/get_category_master/" + 17,
		"type": "GET",
		"success": function (data, textStatus, jqXHR) {

			if (data.length > 0) {
				$('.show-category-master').html(data);
			}
		}
	});
});

$('.showCategoryProgram').on('click', function () {

	$(".mptablinks").removeClass("active");
	$(".cortablinks").removeClass("active");
	$(".showCategoryProgram").addClass("active");
	$(".showCategoryMaster").removeClass("active");
	$("#allprogram .cortablinks:first").addClass("active");

	$.ajax({
		"url": "/get_category_course/",
		"type": "GET",
		"success": function (data, textStatus, jqXHR) {
			if (data.length > 0) {
				$('.show-all-category-courses').html(data);
			} else {

			}
		}
	});

	$.ajax({
		"url": "/get_category_master/" + 17,
		"type": "GET",
		"success": function (data, textStatus, jqXHR) {

			if (data.length > 0) {
				$('.show-category-master').html(data);

			}
		}
	});


});

function showCategoryAllCourse(THIS, catid) {
	var $this = $(THIS);
	$(".corptablinks").removeClass("active");
	if (!$this.hasClass('active')) {
		$this.addClass('active');
	}

	$.ajax({
		"url": "/get_all_course_page/" + catid,
		"type": "GET",
		"success": function (data, textStatus, jqXHR) {

			if (data.length > 0) {
				$('.show-all-courses-list').html(data);
			} else {

			}
		}
	});
}

//Search course   
function studentdata(name, id) {
	$('.plocation').val(name); $('.location').val(id); get_courses(id); $('.result').hide();
}


//Search course   
function masterdata(name, id) {
	$('.plocation').val(name);
	$('.location').val(id);
	get_coursesmaster(id);
	$('.result').hide();
}

function searchid(a) {
	$('.submit-btns').prop("disabled", true);
	if (a.length > 0) {
		$('.loader').show();
		$.ajax({
			url: "/courses/ajax_view",
			type: 'post',
			data: { id: a },
			success: function (data) {
				$('.result-body').html(data);
				$('.loader').hide();
			}
		});
	} else {
		$('.result').hide();
	}
}

function search() {
	$.ajax({
		url: "/courses/ajax_course",
		type: 'post',
		success: function (data) {
			$('.result-body').html(data);
			$('.loader').hide();
		}
	});
}
function get_courses(id) {
	$.ajax({
		type: "post",
		url: "/courses/get_courses",
		data: { id: id },
		cache: false,
		success: function (data) {
			var obj = JSON.parse(data);
			window.location = "/courses/" + obj.slug;
		}
	});
}

function get_coursesmaster(id) {

	$.ajax({
		type: "post",
		url: "/master/get_courses",
		data: { id: id },
		cache: false,
		success: function (data) {
			var obj = JSON.parse(data);


			window.location = "/master-program/" + obj.slug;


		}
	});
}



//Search course   
function categorydata(name, id) {
	$('.pcategory').val(name);
	$('.searchlocation').val(id);
	showCategoryAllCourse(this, id);
	$('.result').hide();
}

function searchCategoryid(a) {

	$('.submit-btns').prop("disabled", true);
	if (a.length > 0) {
		$('.result').show();

		$.ajax({
			url: "/courses/ajax_searchCategoryid",
			type: 'post',
			data: { id: a },
			success: function (data) {


				$('.result-category-list').html(data);
				$('.result').show();



			}
		});
	} else {
		$('.result-category-list').show();
	}
}

function searchCategory() {

	$.ajax({
		url: "/courses/ajax_searchCategory",
		type: 'post',
		success: function (data) {

			$('.result-category-list').html(data);
			$('.result').show();

		}
	});

}


function searchTechnologyId(a) {
	$('.submit-btns').prop("disabled", true);
	if (a.length > 0) {
		$('.result').show();
		$.ajax({
			url: "/reviews/ajax_technologyId",
			type: 'post',
			data: { id: a },
			success: function (data) {
				$('.result-category-list').html(data);
				$('.result').show();
			}
		});
	} else {
		$('.result-category-list').show();
	}
}

function searchTechnology() {
	$.ajax({
		url: "/reviews/ajax_technology",
		type: 'post',
		success: function (data) {

			$('.result-category-list').html(data);
			$('.result').show();

		}
	});

}

function choosecode() {
	$(".choosecode").select2({
		theme: "bootstrap",
		placeholder: "SELECT CODE",
		maximumSelectionSize: 6,
		containerCssClass: ":all:",
		ajax: {
			url: "/getCountryCode",
			dataType: 'json',
			delay: 250,
			data: function (params) {
				return {
					q: params.term
				}
			},
			processResults: function (data) {
				return {
					results: $.map(data, function (obj) {
						return {
							id: obj.phonecode,
							text: '+' + obj.phonecode + '(' + obj.sortname + ')',
						};
					})
				}
			},
			cache: true
		}
	});

}

function choosestate() {
	$(".choosestate").select2({
		theme: "bootstrap",
		placeholder: "Select Franchise State",
		maximumSelectionSize: 6,
		containerCssClass: ":all:",
		ajax: {
			url: "/getSelectState",
			dataType: 'json',
			delay: 250,
			data: function (params) {
				return {
					q: params.term
				}
			},
			processResults: function (data) {
				return {
					results: $.map(data, function (obj) {
						return {
							id: obj.state_id,
							text: obj.state_name,
						};
					})
				}
			},
			cache: true
		}
	});

}



function choosecourse() {
	$(".choosecourse").select2({
		theme: "bootstrap",
		placeholder: "Search Course",
		maximumSelectionSize: 6,
		containerCssClass: ":all:",
		ajax: {
			url: "/getSelectCourse",
			dataType: 'json',
			delay: 250,
			data: function (params) {
				return {
					q: params.term
				}
			},
			processResults: function (data) {
				return {
					results: $.map(data, function (obj) {
						return {
							id: obj.id,
							text: obj.course,
						};
					})
				}
			},
			cache: true
		}
	});

}

choosecode();
choosecourse();
choosestate();

function offerclose() {
	$('.mob-offer').hide(); $('.offer-container').hide(); $('.afterclose_open').show();
}
function openoffer() {
	$('.mob-offer').show(); $('.offer-container').show(); $('.afterclose_open').hide();
}
function refreshfunction() {

	location.reload();
}

$('.select_country').select2({ placeholder: "Search Country", });
$('.select2_state').select2({ placeholder: "Search State", });
$('.course_select2').select2({ placeholder: "Search Course", });
$('input[name="demo_date"]').datepicker({ dateFormat: 'yy-mm-dd' });
$('input[name="time_of_call"]').datepicker({ dateFormat: 'yy-mm-dd hh:mm:ss' });
$(document).find('input[name="name"]').attr('maxlength', 35);
$(document).on('keypress', 'input[name="name"]', function (event) {
	if (event.charCode != 0) {
		var regex = new RegExp("^[a-zA-Z ]+$");
		var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
		if (!regex.test(key)) {
			event.preventDefault();
			return true;
		}
	}
});

function isNumberKey(e) {
	var keyCode = e.keyCode || e.charCode;
	if (keyCode >= 48 && keyCode <= 57)
		return true;
	else
		return false;
}
$(document).on('click', '#invoicePrintPdf', function (e) {
	var THIS = $(this);
	var id = THIS.data('sid');

	$.ajax({
		url: "/getInvoicePrintPdf",
		type: "POST",
		data: { action: 'getInvoicePrintPdf', pid: id },

		success: function (response) {
			var printWindow = window.open('', '', 'width=700,height=500');
			printWindow.document.write(response);
			return false;

		}

	});

});

$(document).on('click', '#ccavenuePrintPdf', function (e) {

	var THIS = $(this);
	var id = THIS.data('sid');
	$.ajax({
		url: "/getCcavenuePrintPdf",
		type: "POST",
		data: { action: 'getCcavenuePrintPdf', pid: id },

		success: function (response) {
			var printWindow = window.open('', '', 'width=700,height=500');
			printWindow.document.write(response);
			return false;
		}
	});
});





$('.bookmark-it').on('click', function (e) { e.preventDefault(); var bookmarkUrl = $(this).attr('href'); var bookmarkTitle = $(this).data('title'); if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) { alert("Press Ctrl + D to bookmark this page.") } else if (window.sidebar && window.sidebar.addPanel) { window.sidebar.addPanel(bookmarkTitle, bookmarkURL, '') } else if ((window.sidebar && /Firefox/i.test(navigator.userAgent)) || (window.opera && window.print)) { $(this).attr({ href: bookmarkUrl, title: bookmarkTitle, rel: 'sidebar' }).off(e); return !0 } else if (window.external && ('AddFavorite' in window.external)) { window.external.AddFavorite(bookmarkUrl, bookmarkTitle) } else { alert('Your browser does not support this bookmark action'); return !1 } });

$(".youtubeclose").click(function () {
	$(".video1")[0].src += "?autoplay=false";
});


$(document).ready(function () {
	$(".traningpopbtn").click(function () {
		$(".opennexttab").addClass("active");
	});
	$(".traningpopbtn").click(function () {
		$(".closemaintab").removeClass("active");
	});
});



// use careers page 
$('#upload').change(function () {
	var filename = $('#upload').val();
	if (filename.substring(3, 11) == 'fakepath') {
		filename = filename.substring(12);
	} // For Remove fakepath
	$("label[for='file_name']").html(filename);
	$("label[for='file_default']").text('Selected File: ');
	if (filename == "") {
		$("label[for='file_default']").text('No File Choosen');
	}
});
$('#uploadd').change(function () {
	var filename = $('#uploadd').val();
	if (filename.substring(3, 11) == 'fakepath') {
		filename = filename.substring(12);
	} // For Remove fakepath
	$("label[for='file_name']").html(filename);
	$("label[for='file_default']").text('Selected File: ');
	if (filename == "") {
		$("label[for='file_default']").text('No File Choosen');
	}
});


