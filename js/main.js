$(document).ready(function () {
    // $('.slider').slick({
    //     infinite: false,
    //     draggable: false,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     // adaptiveHeight: true,
    //     prevArrow: "<a class='slick-prev'>Назад</a>",
    //     nextArrow: "<a class='btn slick-next'>Следующий вопрос</a>"
    // });
    // $(".nav__link").click(function () {
    //     $('.nav__link').addClass('active');
    //     $('html, body').animate({
    //         // scrollTop: $(".footer").offset().top
    //     }, 1000);
    // });

    $('.share__icon').click(function(e){
        console.log(e);
        $(this).parent().toggleClass('active');
    })

    $('.burger').click(function(){
        $('.nav').addClass('active');
    })

    $('.nav__link').click(function () {
        $('.nav__link').removeClass('active');
        $(this).addClass('active');
    })

    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 1000);
    });

    // function tabs(wrapper){
    //     wrapper = $(wrapper) || $(".wrapper");
    //     var tab = wrapper.find(".tab");
    //     $(".tab_item").not(":first").hide();
    //     tab.click(function () {
    //         tab.removeClass("active").eq($(this).index()).addClass("active");
    //         $(".tab_item").hide().eq($(this).index()).fadeIn()
    //     }).eq(0).addClass("active");
    // }

    // tabs(".tabs-wrap");

    function accoDesktop() {
        $('.acco__item-head').click(function (e) {
            $('.acco').css('margin-bottom', 20);
            $('.acco__item-head').removeClass('active');
            $('.acco__item-head').next().removeClass('active');
            $(this).addClass('active');
            $(this).next().addClass('active');
            $(this).parent().parent().css('margin-bottom', $(this).next().outerHeight() + 44);
        })
    }

    function accoMobile() {


        function stretchAccoBodies(){
            var gridRow = document.querySelector('.portf .grid-row');
            var accoBodies = document.querySelectorAll('.portf .acco__item-body.grid__item')

            // set width equals width gridRow
            for (let i = 0; i < accoBodies.length; i++) {
                var accoBody = accoBodies[i];
    
                accoBody.style.width = gridRow.offsetWidth + 'px';
            }
        }

        stretchAccoBodies();
        
        function init(){

            $.each($('.portf .acco__item-body.grid__item'), function (i, el) {

                if (!($(this).show().offset().left === 15)){
                    console.log('find');
                    console.log($(this).css({
                        // transform: 'translateX(-' + $('.portf .acco__item-head').last().width() + 'px)'
                    }));
                }

                $(this).hide();
            })

            $('.acco__item-head').click(function(e) {
                $('.acco__item-head').removeClass('active');
                $('.acco__item-head').next().hide().removeClass('active');
                $(this).addClass('active');
                $(this).next().show().offset().left = 150;
                $(this).next().addClass('active');

            })
        }

        init();
    }

    if($(window).width() > 1300){
        accoDesktop();
    } else{
        accoMobile();
    }



    function mobileMenu() {
        $('.burger').click(function (e) {
            $('.header-nav-wrap').addClass('active');
            $('.main-bg').addClass('mobile-blur');
            $('body').addClass('no-scrolling');
        })

        $('.close-menu').click(function (e) {
            $('.header-nav-wrap').removeClass('active');
            $('.main-bg').removeClass('mobile-blur');
            $('body').removeClass('no-scrolling');
        })

    }
    mobileMenu();



    function checkValidate() {
        var form = $('form');

        $.each(form, function () {
            $(this).validate({
                ignore: [],
                errorClass: 'error',
                validClass: 'success',
                rules: {
                    name: {
                        required: true
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    phone: {
                        required: true,
                        phone: true
                    },
                    message: {
                        required: true
                    },
                    pass: {
                        required: true,
                        normalizer: function normalizer(value) {
                            return $.trim(value);
                        }
                    }
                },
                errorElement: 'span',
                errorPlacement: function (error, element) {
                    var placement = $(element).data('error');
                    if (placement) {
                        $(placement).append(error);
                    } else {
                        error.insertBefore(element);
                    }
                },
                messages: {
                    regacept: 'Необходимо согласие',
                    phone: 'Некорректный номер',
                    email: 'Некорректный e-mail'
                }
            });
        });
        jQuery.validator.addMethod('email', function (value, element) {
            return this.optional(element) || /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/.test(value);
        });
        jQuery.validator.addMethod('phone', function (value, element) {
            return this.optional(element) || /\+7\(\d+\)\d{3}-\d{2}-\d{2}/.test(value);
        });
    }
    checkValidate();

    $('input[placeholder="Ваш телефон"]').inputmask('+7(999)999-99-99');

})