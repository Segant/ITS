$(document).ready(function () {
    $('.slider').slick({
        infinite: false,
        draggable: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        // adaptiveHeight: true,
        prevArrow: "<a class='slick-prev'>Назад</a>",
        nextArrow: "<a class='btn slick-next'>Следующий вопрос</a>"
    });

    
    function tooltip(){
        if ($('.tooltip__text').length){
            var table_top = $('.js-scroll').offset().top;
            $(window).resize(function(){
                table_top = $('.js-scroll').offset().top;
            });
            $('.content').scroll(function(){
                table_top = $('.js-scroll').offset().top;
            });
            $('.tooltip__text').click(function (e) {
                e.preventDefault();
                var t = $(this).offset().top;
                var $this = $(this);
                if($(window).innerWidth() <= 1000) {
                    $('.tooltip__inner').css('top',t-table_top+50);
                } else {
                    $('.tooltip__inner').css('top',t-table_top+80);
                }
                $('.tooltip__inner').toggleClass('active');
                $('body').on('click', function (e) {
                    var div = $('.tooltip__inner, .tooltip__text');
                    if (!div.is(e.target) && div.has(e.target).length === 0) {
                        $('.tooltip__inner').removeClass('active');
                    }
                });
                $('.js-scroll').scroll(function(){
                    $('.tooltip__inner').removeClass('active');
                });
            });
            $('.ttcan').click(function (e) {
                $('.tooltip__inner').removeClass('active');
            });  
        }
    }
    tooltip();

    $('.slider').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {

        var slidePersent = 100 / slick.$slides.length;

        //set nums on progressbar and slides bg
        $('.progress-bar__total').text(slick.$slides.length);
        $('.quiz__num').html(currentSlide + 1);
        $('.progress-bar__curr').html(currentSlide + 1);

        // set progress bar width on change slide
        $('.progress-bar__progress').width(slidePersent * (currentSlide + 1) + '%');

        function calcProgressbarWidth() {

            var onePers = $('.progress-bar').width() / 100;
            var NUM = onePers * 48;
            $('.progress-bar__progress').width();

            // white text
            if ($('.progress-bar__progress').width() >= NUM) {
                $('.progress-bar').addClass('whiteText')
            } else {
                $('.progress-bar').removeClass('whiteText')
            }
        }

        calcProgressbarWidth();



        function linkToHref(elem) {
            document.location.href = elem.attr('href');
        }

        // change btn on last slide
        if ((currentSlide + 1) === slick.$slides.length) {
            console.log('lastslide');

            if ($('.input-wrap input[type="radio"]').length) {
                var radio = $('.input-wrap input[type="radio"]')

                radio.click(function (e) {
                    var res = $(this).data('res');
                    if (res) {
                        var resBtn = $('.slick-next').attr('href', res + '.html');
                        $('.slick-next').click(function (e) {
                            linkToHref($(this));
                        });
                    }
                });
            }

            slick.$nextArrow.text('Узнать результат');
        } else {
            // console.log(slick.$nextArrow.html("<a class='btn slick-next'>Следующий вопрос</a>"));

            slick.$nextArrow.text('Следующий вопрос');
        }


    });

    // if($('.up tbody tr').length < 4){

    // }

    if ($('.js-scroll').length) {
        if ($(window).width() > 1000) {
            $('.js-scroll').scrollbar();
        }
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

    function popupsControl() {
        function OpenPopup(popupId) {
            $('body').removeClass('no-scrolling');
            $('.popup').removeClass('js-popup-show');
            popupId = '#' + popupId;
            $(popupId).addClass('js-popup-show');
            $('body').addClass('no-scrolling');
        }

        $('.pop-op').click(function (e) {
            e.preventDefault();
            let data = $(this).data('popup');
            OpenPopup(data);
        });

        function closePopup() {
            $('.js-close-popup , .js-close').on('click', function (e) {
                e.preventDefault();
                $('.popup').removeClass('js-popup-show');
                $('body').removeClass('no-scrolling');
            });
        }
        closePopup();

        $('.js-close-popup-cookie').click(function (e) {
            e.preventDefault();
            $('.popup-cookies').removeClass('js-popup-show');
            $('body').removeClass('no-scrolling');
        })
    }
    popupsControl()

    function dnd() {
        $(".dropify").dropify({
            messages: {
                'default': 'Перетащите фото в область загрузки',
                'replace': 'Перетащите фото что-бы заменить+',
                'remove': 'Удалить',
                'error': 'Произошла ошибка'
            },
            tpl: {
                wrap: '<div class="dropify-wrapper"></div>',
                loader: '<div class="dropify-loader"></div>',

                message: '<div class="dropify-message"><div class="dropzone__inner"><img src="img/dropzone-img.png" alt=""><span>{{ default }}</span></div></div>',
                preview: '<div class="dropify-preview"><span class="dropify-render"></span><div class="dropify-infos"><div class="dropify-infos-inner"><p class="dropify-infos-message">{{ replace }}</p></div></div></div>',
                filename: '<p class="dropify-filename"><span class="file-icon"></span> <span class="dropify-filename-inner"></span></p>',
                clearButton: '<button type="button" class="dropify-clear">{{ remove }}</button>',
                errorLine: '<p class="dropify-error">{{ error }}</p>',
                errorsContainer: '<div class="dropify-errors-container"><ul></ul></div>'
            }
        });
    }

    if ($('.dropify').length) {
        dnd();
    }

    function select() {
        $('.select2').select2({
            minimumResultsForSearch: Infinity
        });
    }
    if ($('.select2').length) {
        select();
    }

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

    //  if ($('#revivesucc').length) {
    //      var startDate = $('.cd-start-date').text()
    //      $('.cd').countdown(startDate, function (event) {
    //          var $this = $(this).html(event.strftime('' +
    //              '<span>%D</span> д. ' +
    //              '<span>%H</span> ч. ' +
    //              '<span>%M</span> мин.'));
    //      });
    //  }
})