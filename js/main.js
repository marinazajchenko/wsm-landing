

$(function(){
                            

                                /* Slider http://kenwheeler.github.io/slick/ && animated*/ 
            
            $('.features__slider').slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                dots: false,
                autoplay: true,
                autoplaySpeed: 4000,
                pauseOnHover: false,
                pauseOnFocus: false,
                speed: 300
              });

                                 /*Navigation*/
                function resizeNav() {
                    if($(window).innerWidth() > 1083 ) 
                    {   
                        

                        $('.header__navigation').removeAttr('style');
                        $('.header__hide-nav').removeClass('active');
                    }   
                    }
                

                $(document).on('click','.header__hide-nav', function() {
                        var nav = $('.header__navigation');
                        $('.header__hide-nav').toggleClass('active');
                        nav.slideToggle(300, function (){
                            if ($(this).css('display')=== 'none') {
                                $(this).removeAttr('style');
                            }
                        });                 
                        });

                        $(window).resize(function() {
                            resizeNav();
});




                            /* Smooth scroll to the blocks */

    		$('.header__navigation a').on('click', function(e){
    			e.preventDefault();
    			var currentBlock = $(this).attr('href');
    			var currentBlockOffset = $(currentBlock).offset().top;
    			$('html, body').animate({
    				scrollTop: currentBlockOffset 
    			}, 500);
                   $('.header__hide-nav').removeClass('active');
                   $('.header__navigation').removeAttr('style');

    		});


                             /*Fixed header */



    var headerHeight = $('header').innerHeight();
    var navHeight = $('.header__navigation').innerHeight();
   

    $(document).on('scroll', function(){
    	var documentScroll = $(this).scrollTop();

    	if ((documentScroll > headerHeight) && ($(window).innerWidth() > 1083 )/*(!$('.header__hide-nav').hasClass('active'))*/ ) {
    		 $('.header__navigation').addClass('nav__fixed');
    		$('.header').css('paddingTop',navHeight);
    	}
    	else {
    		$('.header__navigation').removeClass('nav__fixed');
    		$('.header').removeAttr('style');
    	
    	}

    });


               
                                            /* AJAX */
       
       //КОГДА РАБОТАЕТ СЕРВЕР     

     $.ajax({
             url: "http://app.wsmengine.com.ua/api/licenses",
             cache: false,
             success: 
              function(tariffs) {
                 addTariffs(tariffs);
              },
                error: 
                    function() {$('.tariffs__title').text('Информация о тарифах временно недоступна. Для получения необходимой информации обратитесь к администратору, заполнив форму ниже').css({'fontSize': 26, 'lineHeight': 1.5});} 
                
     }); 

// // КОГДА НЕ РАБОТАЕТ СЕРВЕР
// var tarrifsJSON = '[{"id":2,"name":"Дневной (1 день)","price":1.99,"days":1,"description":"Описание тестовое №1","activationType":"firstUsage"},{"id":3,"name":"Месячный (30 дней)","price":49.99,"days":30,"description":"Описание тестовое №2","activationType":"period"},{"id":5,"name":"One more tariff","price":14.00,"days":14,"description":"ez ez","activationType":"period"},{"id":6,"name":"Another one","price":10.00,"days":10,"description":"Another..","activationType":"period"},{"id":7,"name":"Новый","price":5.00,"days":1,"hidden":false,"description":"Бесплатная акция до конца ноября","activationType":"period"}]';
// //var tarrifsJSON = '[]';
// addTariffs(JSON.parse(tarrifsJSON));




function addTariffs(tariffs) {
    var priceHolder = $('#tariffs__holder');
    if (tariffs.length == 0)   {
        $('section.tariffs').remove();
    }

    else {
        for (var i = 0; i < tariffs.length; i++) {
        var tariff = tariffs[i];
        
        var tariffBlock = $('<div>', {'class': 'col-lg-3 offset-lg-1 text-center col-md-5 offset-md-1 col-sm-8 offset-sm-0 col-10 offset-0 tariffs__block mb-2'});    
        var tariffName = $('<h3>', {'class': 'tariffs__block_name'});
        var tariffDescription = $('<p>', {'class': 'tariffs__description'});
        var tariffDays = $('<p>', {'class': 'tariffs__period'});
        var tariffPrice = $('<p>', {'class': 'tariffs__price'});
        var tariffCondition = $('<div>', {'class': 'tariffs__condition'});

        tariffName.text(tariff.name);
        tariffDescription.text(tariff.description);
        tariffDays.text('Действует дней:  ' + tariff.days);
        tariffPrice.text(tariff.price.toFixed(2) + '$');

        tariffBlock.append(tariffName).append(tariffCondition);

        tariffCondition.append(tariffDescription);
        tariffCondition.append(tariffDays);
        tariffBlock.append(tariffPrice);

        priceHolder.append(tariffBlock);
    };
    }
} 



    
                                                /* Modal */

                
    $(".js-modal").each(function() {
        var modalWidth = $(this).innerWidth() / 2;

        $(this).css({
            "marginLeft": "-" + modalWidth + "px"
        });
    });

    

    $(".js-modal-close").on("click", function(e) {

        e.preventDefault();
        $(".js-modal").fadeOut(100);
        $("body").removeClass("open-modal");
        $("#js-overlay").remove();

    });


    $("body").on("click", "#js-overlay", function() {
        $(".js-modal").fadeOut(100);
        $("body").removeClass("open-modal");
        $("#js-overlay").remove();
    });






                                    /*FORM'S VALIDATION */

         
    $('.contact__form input, .contact__form textarea').on('input', function () {
        $(this).tooltip('hide');
        $(this).removeClass('error__input');

        if ((!$('input').hasClass('error__input')) && (!$('textarea').hasClass('error__input'))) {
            $('#submit').prop('disabled', false); 
        } else if ((!$('input').hasClass('error__input')) || (!$('textarea').hasClass('error__input'))) {
            $('#submit').prop('disabled', true);
        };
        
       
    });

        $('#submit').on('click', function(e){
        e.preventDefault();
       
        var name = $('#name').val(),
            email = $('#email').val(),
            message = $('#message').val ();

        var email_regex = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;


            if (name.length == 0) { 
                $('#name').addClass('error__input');
                $('#name').tooltip({
                    trigger: 'manual',
                    placement: 'top',
                    title: 'Укажите Ваше имя'
                }).tooltip('show');
                $('#submit').prop('disabled', true);
               
            };

           if (!email.match(email_regex) || email.length == 0) {
                $('#email').addClass('error__input');
                $('#email').tooltip({
                    trigger: 'manual',
                    placement: 'top',
                    title: 'Введите правильный адрес электронной почты'
                }).tooltip('show');
                $('#submit').prop('disabled', true);
              
            };

            if (message.length == 0) {
                console.log('Напишите здесь что-нибудь');
                $('#message').addClass('error__input');
                $('#message').tooltip({
                    trigger: 'manual',
                    placement: 'top',
                    title: 'Пожалуйста, оставьте свое сообщение'
                }).tooltip('show');
                $('#submit').prop('disabled', true);
               
            
            };

             if (($('input').val() == '') || ($('textarea').val() == '') || (!email.match(email_regex))) {
               return false;
        };


        var mail = {name: $('#name').val(), email: $('#email').val(), message: $('#message').val()}; 


                        /* AJAX - SEND FORM */

        $.ajax({
            type: 'POST',
            url: 'http://app.wsmengine.com.ua/api/email/public-message',
            // The key needs to match your method's input parameter (case-sensitive).
            data: JSON.stringify(mail),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function(data){
                $('#js-modal-success').fadeIn(500);
                $('body').append('<div class="overlay" id="js-overlay"></div>').addClass('open-modal');
            },
            error: function() {
                $('#js-modal-error').fadeIn(500);
                $('body').append('<div class="overlay" id="js-overlay"></div>').addClass('open-modal');
            } 
            
        }); 

        $('input').val('');
        $('textarea').val('');


    });  

  


});



