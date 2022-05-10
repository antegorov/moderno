$(function() {

  

  $(".js-range-slider").ionRangeSlider({
    type: "double",
    grid: true,
    min: 0,
    max: 1000,
    from: 0,
    to: 600,
    step: 100,
    min_interval: 100,
    from_shadow: true,
    grid_num: 2,
    grid: false,
    hide_min_max: true,
    values_separator: " - ",
    prefix: "$",
    onFinish: function (data) {
      console.log(data.from);
      console.log(data.to);
    }
  });

    $('.product-slider__inner').slick({
        slidesToShow: 4,
        slidesToScroll: 4,
        dots: true,
        arrows: false,
    });

    $('.rate-star').rateYo({
        rating: 5,
        starWidth: "12px",
        readOnly: true
    });


    

    
    $('.menu__btn').on('click', function () {
      $('.menu__list').slideToggle(); 
    });


    $('.header__btn-menu').on('click',function () {
      $('.header__box').toggleClass('active');
    });
  



    $('.catalog__filter-button').on('click', function () {
      $('.catalog__filter-button').removeClass('button__active'); 
      $(this).addClass('button__active');
    })

    $('.icon-sort').on('click', function () {
      $('.icon-sort').removeClass('icon-sort__active'); 
      $(this).addClass('icon-sort__active');
    })

  
    
    $('.icon-th-list').on('click', function (){
      $('.product__item').addClass('active__list-item')
    })
  
    $('.icon-th-large').on('click', function (){
      $('.product__item').removeClass('active__list-item')
    })
    
    
    var mixer = mixitup('.products__inner-box, product-page__items');
    var mixer = mixitup('.product-page__items');
    var mixer2 = mixitup('.product-page__items');
    $('.product-page__items').mixItUp({
      
    });

    
});