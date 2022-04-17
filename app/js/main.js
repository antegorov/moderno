$(function() {

    var mixer = mixitup('.products__inner-box');

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





});