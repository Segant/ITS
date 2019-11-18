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

    function tabs(wrapper){
        wrapper = $(wrapper) || $(".wrapper");
        var tab = wrapper.find(".tab");
        $(".tab_item").not(":first").hide();
        tab.click(function () {
            tab.removeClass("active").eq($(this).index()).addClass("active");
            $(".tab_item").hide().eq($(this).index()).fadeIn()
        }).eq(0).addClass("active");
    }

    tabs(".tabs-wrap");

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

    $('input[placeholder="Номер телефона"]').inputmask('+7(999)999-99-99');

})