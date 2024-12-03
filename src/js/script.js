const swiperTwo=new Swiper(".swiper_2",{slidesPerView:5,loop:!0}),swiperOne=new Swiper(".swiper_1",{initialSlide:2,thumbs:{swiper:swiperTwo}});

const swiperThree = new Swiper('.swiperClass3', {
    loop: true,
    slidesPerView: 5,
    spaceBetween: 30,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    loopFillGroupWithBlank: true,
    slidesPerGroup: 1,
    speed: 1000, 
});
