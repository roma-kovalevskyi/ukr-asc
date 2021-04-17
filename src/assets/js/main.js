$(window).on('load', function() {
    // Partners slider
    $('.partners-slider').each(function() {
        $(this).slick({
            autoplay: true,
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="slick-arrow slick-prev"><img src="img/slider-arrow-left.svg" alt=""></button>',
            nextArrow: '<button type="button" class="slick-arrow slick-next"><img src="img/slider-arrow-right.svg" alt=""></button>',
            responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4
                }
            }, {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            }, {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1
                }
            }]
        });
    });

    // About slider
    $('.about-slider__inner').slick({
        autoplay: true,
        dots: true,
        vertical: true,
        verticalSwiping: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        appendDots: $('.about-slider__dots'),
        appendArrows: $('.about-slider__navigation'),
        prevArrow: '<button type="button" class="slick-arrow slick-prev"><img src="img/slider-arrow-top.svg" alt=""></button>',
        nextArrow: '<button type="button" class="slick-arrow slick-next"><img src="img/slider-arrow-bottom.svg" alt=""></button>',
        responsive: [{
            breakpoint: 992,
            settings: {
                arrows: false,
                vertical: false,
                verticalSwiping: false
            }
        }]
    });

    // Roadmap slider
    const steps = ['Техническая консультация', 'Сопроводительная документация', 'Доставка до аэропорта', 'Подготовка к отправке', 'Доставка в Украину ', 'Растаможка', 'Доставка по адресу'];

    $('.roadmap-slider__content').slick({
        dots: true,
        arrows: false,
        vertical: true,
        verticalSwiping: true,
        customPaging: function(slider, i) {
            return `<button type="button" role="button"><span>${steps[i]}</span></button>`;
        },
        appendDots: $('.roadmap-slider__steps'),
        responsive: [{
            breakpoint: 768,
            settings: {
                vertical: false,
                verticalSwiping: false
            }
        }]
    });

    // Scroll to calculation
    $('.scroll-to-calc').on('click', function(e) {
        e.preventDefault();

        let target = $(this).attr('data-target');

        $('html, body').animate({
            scrollTop: $(`.${target}`).offset().top
        }, 'slow');
    });

    // Scroll to top
    $('#to-top').on('click', function(e) {
        e.preventDefault();

        $('body, html').animate({
            scrollTop: 0
        }, 'slow');
    });

    // Open popup
    $('.open-popup').on('click', function(e) {
        e.preventDefault();

        let popup = $(this).attr('href');
        $(popup).fadeIn();
        $('body').addClass('locked');
    });

    $('.header__btn-toggle').on('click', function(e) {
        $('.menu-popup').fadeIn();
        $('body').addClass('locked');
    });

    // Close popup
    $('.close-popup, .menu-popup .scroll-to-calc').on('click', function() {
        $('body').removeClass('locked');
        $(this).closest('.popup').fadeOut();
    });

    // Select language on mobile
    $('.languages__item.active').on('click', function(e) {
        e.preventDefault();
        $(this).siblings().toggleClass('visible');
    });

    // Init nice select
    $('.select-airport').niceSelect();

    // Change file name after upload
    $('#file').on('change', function() {
        $('.computation-form__file-choose-name').text($('#file')[0].files[0].name);
    });

    // Show additional form inputs
    $('.computation-form__show-more').on('click', function(e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $('.computation-form__additional-box').slideToggle();
    });
});