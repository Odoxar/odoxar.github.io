/**
 * Created by Денис on 22.10.2016.
 */

"use strict"

$(document).ready(function() {

    $(function(){
        $('.header-menu').slicknav({
            prependTo: ".header-menu-nav"
        });
    });

    $(".fancybox").fancybox();

    $('.header-slider').slick({
        arrows: false
    });
});


