$('.slider').slick({
    dots: true,
    responsive: [
        {
            breakpoint: 480,
            settings: {

            }
        }
    ]
});

$('.clients-slider').slick({
    arrows: false,
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 5
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 4
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1
            }
        }
    ]
});

$('.clients-left').click(function () {
    $(".clients-slider").slick('slickPrev');
});

$('.clients-right').click(function () {
    $(".clients-slider").slick('slickNext');
});



$(function() {
    $('#dg-container').gallery();
    $(".header-nav-list").slicknav({
        prependTo: '.header-nav'
    });
});