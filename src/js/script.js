const swiperTwo=new Swiper(".swiper_2",{slidesPerView:5,loop:!0}),swiperOne=new Swiper(".swiper_1",{initialSlide:2,thumbs:{swiper:swiperTwo}});
const sliderName = new Swiper(".swiperClass", {
    navigation: {
        nextEl: '.btn_1',
        prevEl: '.btn_2'
    },
    pagination: {
        el: '.pagination_1',
        clickable: true,
    },
    mousewheel: true,
    Keyboard: true
});