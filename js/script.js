$(document).ready(function(){
    
    //modal

    const scroll = calcScroll(),
          body = document.getElementsByTagName("body")[0];

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
        body.style.overflow = "hidden";
        body.style.marginRight = `${scroll}px`;
    });

    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks').fadeOut('slow');
        body.style.overflow = "";
        body.style.marginRight = `0px`;
    });

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }


    //validation forms

    function validateForms (form) {
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: false,
                    email: true
                }
            },
            messages: {
                name: "Пожалуйста, введите свое имя",
                phone: "Пожалуйста, введите номер телефона",
                email: "Неправильно введен адрес почты"
            }
        });
    }

    validateForms ('#consultation-form');
    validateForms ('#request-form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    // отправка писем

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation').fadeOut();
            $('.overlay, #thanks').css('display','block');
            $('form').trigger('reset');
        });
        return false;
    });

    // carousel

    $(function () {
        $('#carousel').carousel({
            interval: 2000
        });
    });
});