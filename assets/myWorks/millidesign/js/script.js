/**
 * Created by Денис on 27.10.2016.
 */

"use strict";


$(window).on('load', function(){
    $('.header-menu, .header-main-content, .slicknav_nav').onePageNav({
        currentClass: 'current',
        changeHash: true,
        scrollSpeed: 750,
        scrollThreshold: 0.5,
        filter: ':not(.external)',
        easing: 'swing'
    });

});

$(document).ready(function(){
    $(function(){
        $('.header-menu').slicknav({
            label: '',
            appendTo: ".header-wrap .row",
            duration: 700,
            easingClose: "swing",
            closeOnClick:true
        });

        $('<i class="fa fa-bars" aria-hidden="true"></i>').prependTo($('.slicknav_btn'));
    });



    $('.header-callback-btn').magnificPopup({
        items: {
            src: '.callback-popup-form-wrap',
            type: 'inline'
        },
        type: 'image' // this is default type
    });

    $('.why_we-slider').slick({
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>'
    });

    $(".fancybox").fancybox({
            margin : 0,
            padding : 0,
            openEffect	: 'none',
            closeEffect	: 'none'
        });

    new WOW().init({
        offset: 200,
        mobile: false
    });
});


