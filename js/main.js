$(document).ready(function () {

    $('.share__icon').click(function (e) {
        console.log(e);
        $(this).parent().toggleClass('active');
    })

    $('.burger').click(function () {
        $('.nav').addClass('active');
    })

    $('.nav').click(function () {
        console.log('yo');
        $(this).removeClass('active');
    })

    $('.nav__link').click(function () {
        $('.nav__link').removeClass('active');
        $(this).addClass('active');
    })

    $(document).on('click', 'a.nav__link[href^="#"] , .hero__btn', function (event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 1000);
    });

    $(window).on('scroll', function () {
        $('.nav-el').each(function () {
            if ($(window).scrollTop() >= $(this).offset().top - 400) {
                var id = $(this).attr('id');

                if ($(this).hasClass('js-black-text')) {
                    $('.nav a[href="#' + id + '"]').parent().parent().addClass('js-dark-text');
                }
                // else if ($(this).offset().top >= $('.nav-el').last().offset().top) {
                //     $('.nav a[href="#' + id + '"]').parent().parent().removeClass('js-dark-text');
                // }
                else {
                    $('.nav a[href="#' + id + '"]').parent().parent().removeClass('js-dark-text');
                }

                $('.nav a').removeClass('active');
                $('.nav a[href="#' + id + '"]').addClass('active');
            }
        });
    });

    function articleSwitch () {
        $('.arcticles .acco__item-head').click(function(){
            // $('.arcticles .acco__item-head').parent().parent().toggleClass('active');
            // $('.arcticles .acco__item-head').parent().toggleClass('active');
            $(this).parent().parent().toggleClass('active');
            $(this).parent().toggleClass('active');
        })
    }

    articleSwitch();


    function accoDesktop() {
        $('.acco__item-head').click(function (e) {

            
            if ($(this).hasClass('active')){
                
                $('.acco').css('margin-bottom', 20);
                $('.acco__item-head').removeClass('active');
                $('.acco__item-head').next().removeClass('active');
                $(this).removeClass('active');
                $(this).next().removeClass('active');

            } else {

                $('.acco').css('margin-bottom', 20);
                $('.acco__item-head').removeClass('active');
                $('.acco__item-head').next().removeClass('active');

                $(this).addClass('active');
                $(this).next().addClass('active');
                $(this).parent().parent().css('margin-bottom', $(this).next().outerHeight() + 44);
                
            }



        })
    }

    function accoMobile() {

        function stretchAccoBodies() {
            var gridRow = document.querySelector('.portf .grid-row');
            var accoBodies = document.querySelectorAll('.portf .acco__item-body.grid__item')

            // set width equals width gridRow
            for (let i = 0; i < accoBodies.length; i++) {
                var accoBody = accoBodies[i];

                accoBody.style.width = gridRow.offsetWidth + 'px';
            }
        }

        stretchAccoBodies();

        function init() {

            // $.each($('.portf .acco__item-body.grid__item'), function (i, el) {

            //     if (!($(this).show().offset().left === 15)) {
            //         console.log('find');
            //         console.log($(this).css({
            //             // transform: 'translateX(-' + $('.portf .acco__item-head').last().width() + 'px)'
            //         }));
            //     }

            //     $(this).hide();
            // })


            $('.acco__item-head').click(function (e) {

                if ($(this).hasClass('active')) {
    
                    $('.acco__item-head').removeClass('active');
                    $('.acco__item-head').next().removeClass('active');
                    $(this).removeClass('active');
                    $(this).next().removeClass('active');
    
                } else {
    
                    $('.acco__item-head').removeClass('active');
                    $('.acco__item-head').next().removeClass('active');
    
                    $(this).addClass('active');
                    $(this).next().addClass('active');
    
                }
            })
        }

        init();
    }

    if ($(window).width() > 1300) {
        accoDesktop();
    } else {
        accoMobile();
    }


    function filter() {
        $('.filters .filters__item').click(function(){
            $('.filters .filters__item').removeClass('active')
            $(this).toggleClass('active')

            var filterValue = $(this).data().filter;
    
            $.each($('.portf__inner .acco__item'), function(i , el){

                if (filterValue === $(this).data().value) {
                    $(this).fadeIn();
                } else {
                    $(this).fadeOut();
                }

                if (filterValue === 'ALL') {
                    $(this).fadeIn();
                }
            })

            // $('.portf__inner .acco__item').addClass()
        })
    }

    filter();

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