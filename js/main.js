
$(document).ready( function() {
    
/*--------------------------------------------------
    Portfolio Isotope Plugin
---------------------------------------------------*/	
    
    if ($('.isotope_items').length) {
        jQuery( function() {
            var $container = $('.isotope_items');
            $container.imagesLoaded( function() {   
                $container.isotope({
                  layoutMode: 'packery',
                  itemSelector: '.single_item',
                  gutter:0,
                  transitionDuration: "0.5s",
                columnWidth: '.single_item'
                });
            })
        });
    }

    $('.portfolio_filter ul li a').on("click", function(){
        $('body,html').animate({scrollTop: $(".isotope_items").offset().top - 30}, 800);
        $(".portfolio_filter ul li a").removeClass("select-cat");
        $(this).addClass("select-cat");				 
        var selector = $(this).attr('data-filter');
        $(".isotope_items").isotope({
            filter: selector,
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false,
            }
    });
        return false;
    }); 
    
    $(".vf").on("click", function(){
      $('.portfolio_filter').addClass('show');
    });     
    
    
    $(".portfolio_filter").on("click", function (event) {
    if (!$(event.target).is(".portfolio_filter ul li a")) {
            $('.portfolio_filter').removeClass('show');
            return false;
        }
    });     
    
    
    
/*-------------------------------------------------- 
Preloader
---------------------------------------------------*/	
	

    var width = 100,
        perfData = window.performance.timing, 
        EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
        time = ((EstimatedTime/1000)%50) * 100


    // Percentage Increment Animation
    var PercentageID = $(".percentage"),
            start = 0,
            end = 100,
            durataion = time;
            animateValue(PercentageID, start, end, durataion);

    function animateValue(id, start, end, duration) {

        var range = end - start,
          current = start,
          increment = end > start? 1 : -1,
          stepTime = Math.abs(Math.floor(duration / range)),
          obj = $(id);


        var timer = setInterval(function() {
            current += increment;
            $(obj).text(current);
          //obj.innerHTML = current;
            if (current == end) {
                clearInterval(timer);
            }
        }, stepTime);
    }
    

    
	setTimeout(function(){
        $('.preloader').fadeOut();
        
        $('.cd-transition-layer').addClass('closing').delay(1000).queue(function(){
            $(this).removeClass("visible closing opening").dequeue();
        });
        
	}, time);
		
    


   // FADE OUT EFFECT WHEN CLICK A LINK
    $(document).on("click", "a:not(.lightbox)", function () {
        var newUrl = $(this).attr("href");
        if (!newUrl || newUrl[0] === "#") {
            location.hash = newUrl;
            return;
        }
        $("html").fadeOut(function () {
            location = newUrl;
        });
        return false;
    });
    

    var paget = $(".page-title .title").text();

    $( ".page-title").append("<span></span>");
    $( ".page-title span").append(paget);


    
    //posts page hover 
    $('.blog-post .blog-link').hover(function(){
        $(this).parent('.content-outter').parent('.blog-post').toggleClass('mousef');
        $(this).parent('.blog-post').toggleClass('mousef');
    });

    


    
    

/*--------------------------------------------------
Smoke Effect
---------------------------------------------------*/	

function smokeeffect () {

    //cache some jQuery objects
    var modalTrigger = $('.nav-icon'),
        transitionLayer = $('.cd-transition-layer'),
        transitionBackground = transitionLayer.children(),
        modalWindow = $('.full-menu');

    var frameProportion = 1.78, //png frame aspect ratio
        frames = 25, //number of png frames
        resize = false;

    //set transitionBackground dimentions
    setLayerDimensions();
    $(window).on('resize', function(){
        if( !resize ) {
            resize = true;
            (!window.requestAnimationFrame) ? setTimeout(setLayerDimensions, 300) : window.requestAnimationFrame(setLayerDimensions);
        }
    });

    //open modal window
    modalTrigger.on('click', function(event){   
        event.preventDefault();
        transitionLayer.addClass('visible opening');
        var delay = ( $('.no-cssanimations').length > 0 ) ? 0 : 600;
        setTimeout(function(){
            modalWindow.addClass('visible');
        }, delay);
    });

    //close modal window
    modalWindow.on('click', '.modal-close', function(event){
        event.preventDefault();
        transitionLayer.addClass('closing');
        modalWindow.removeClass('visible');
        transitionBackground.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
            transitionLayer.removeClass('closing opening visible');
            transitionBackground.off('webkitAnimationEnd oanimationend msAnimationEnd animationend');
        });
    });

    function setLayerDimensions() {
        var windowWidth = $(window).width(),
            windowHeight = $(window).height(),
            layerHeight, layerWidth;

        if( windowWidth/windowHeight > frameProportion ) {
            layerWidth = windowWidth;
            layerHeight = layerWidth/frameProportion;
        } else {
            layerHeight = windowHeight*1.2;
            layerWidth = layerHeight*frameProportion;
        }

        transitionBackground.css({
            'width': layerWidth*frames+'px',
            'height': layerHeight+'px',
        });

        resize = false;
    }

}
smokeeffect()


    
/*-------------------------------------------------- 
Magnific Lightbox
---------------------------------------------------*/   
    
if ($('.lightbox').length) {  
    $('.lightbox').magnificPopup({
        type:'image',
        gallery:{enabled:true},
        zoom:{enabled: true, duration: 300}
    });    
    
    }
 
    
/*--------------------------------------------------
 Hero Section Height
---------------------------------------------------*/	
     function homeh() {
        var hometext = $('.main')

        hometext.css({
            "height": $(window).height() + "px"
        });
        $('.content').css({
           "margin-top":  $(window).height() + "px"
        });
         
    }
        
    homeh();
    $(window).resize(homeh);

    $( ".page-menu li:not(.social) a, .portfolio_filter ul li a").append( "<span></span>" );
    
    $(".hassub ul").hide();
    $('li.hassub .arrow').on("click", function(){
            $('li.hassub a').not(this).next('ul').slideUp();
            $(this).next('ul').slideToggle();
            
    });
    
    

    

    $('.nav-icon').on("click", function(){
            $(this).toggleClass('modal-close');
    });


    //Filter Show
    $(window).scroll(function() {               
        var scroll = $(window).scrollTop();
        var homeheight = $(".main").height();    
        var vf = $(".vf").height();   
        var content = $(".content").height();          


        if (scroll+homeheight/1.5 > homeheight - 1 ) { 
            $(".vf").addClass("show");
        }else {
            $(".vf").removeClass("show");
        }

        if (scroll+homeheight > homeheight+content ) { 
            $(".vf").addClass("fix");
        }else {
            $(".vf").removeClass("fix");
        }
        
        

    });

    //Main Down Arrow
    $('.down-arrow').on('click', function(){
        $('body,html').animate({ scrollTop: $('.main').height() }, 800);
    });
    
   //Up To Top Link
   function uptotop(){
        var pagetop = $('body').scrollTop();
        $('.uptotop').on('click', function(){
            $('html, body').animate({ 
                scrollTop: pagetop
            }, 800);
        });
    }

    uptotop();

window.onpageshow = function(event) {
    if (event.persisted) {
        window.location.reload() 
    }
};

$(window).bind("pageshow", function(event) {
    if (event.originalEvent.persisted) {
        window.location.reload() 
    }
});
    
/*--------------------------------------------------
 Footer Height
---------------------------------------------------*/	
    // var wind = $(window)
    // function footsize() {
    //     if ($('footer').height() < wind.height()) {
    //         $('body').css({
    //             "padding-bottom": $('footer').height() + "px"
    //         });
    //         $('footer').css({
    //             "position": 'fixed'
    //         });
    //     }
    //     else {
    //         $('body').css({
    //             "padding-bottom": '0'
    //         });
    //         $('footer').css({
    //             "position": 'relative'
    //         });
    //     }
    // }
    // footsize();
    // wind.resize(footsize);


/*--------------------------------------------------
 Hero Effect
---------------------------------------------------*/   

if ($(window).width() > 481) {
      function promoEffect() {
        var pro = $('.main');
        var where =  window.pageYOffset || document.documentElement.scrollTop;
        pro.css({
            'transform': 'scale('+(100 - where/100)/100+')',
             'opacity' : (1 - (where/20) / 19)
        }) 
    }
    promoEffect();
    $(window).scroll(promoEffect);
}else{
      function promoEffect() {
        var pro = $('.main');
        var where =  window.pageYOffset || document.documentElement.scrollTop;
        pro.css({
            'transform': 'scale('+(100 - where/100)/99+')',
             'opacity' : (1 - (where/20) / 15)
        }) 
    }
    promoEffect();
    $(window).scroll(promoEffect);

}

  
 /*--------------------------------------------------
    Owl Carousel General Js
---------------------------------------------------*/	   

    var owlcar = $('.owl-carousel');
    if (owlcar.length) {
        owlcar.each(function () {
            var $owl = $(this);
            var itemsData = $owl.data('items');
            var autoplayData = $owl.data('autoplay');
            var autoPlayTimeoutData = $owl.data('autoplaytimeout');
            var dotsData = $owl.data('dots');
            var navData = $owl.data('nav');
            var marginData = $owl.data('margin');
            var stagePaddingData = $owl.data('stagepadding');
            var itemsDesktopData = $owl.data('items-desktop');
            var itemsTabletData = $owl.data('items-tablet');
            var itemsTabletSmallData = $owl.data('items-tablet-small');
            $owl.owlCarousel({
                  items: itemsData
                , dots: dotsData
                , nav: navData
                , margin: marginData
                , loop: true
                , stagePadding: stagePaddingData
                , autoplay: autoplayData
                , autoplayTimeout: autoPlayTimeoutData
                , navText: ["<i class='fas fa-arrow-left'></i>","<i class='fas fa-arrow-right'></i>"]
                , responsive:{
                        0:{
                            items:itemsTabletSmallData,
                            stagePadding:0
                        },
                        600:{
                            items:itemsTabletData,
                            stagePadding:0
                        },
                        1000:{
                            items:itemsDesktopData
                        }
                    }
            , });
        });
    }
 

    
		
    
}); // document read end 




$(window).load( function() {
    


}); // document load end 




