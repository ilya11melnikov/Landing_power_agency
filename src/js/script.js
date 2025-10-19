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

    breakpoints: {
        
        320: {
            slidesPerView: 3, 
            spaceBetween: 20
        },
        
        480: {
            slidesPerView: 4,
            spaceBetween: 25
        },

        780: {
            slidesPerView: 5,
            spaceBetween: 30
        },
    }
});

const menuButton = document.querySelector(".menu_button");
const menuCloseButton = document.querySelector(".nav_close");
const menu = document.querySelector(".nav");
const body = document.querySelector(".body");

menuButton.addEventListener("click", function () {
  menu.classList.add("active");
  body.classList.add("body--overflow_hidden");
});

menuCloseButton.addEventListener("click", function () {
  menu.classList.remove("active");
  body.classList.remove("body--overflow_hidden");
});

