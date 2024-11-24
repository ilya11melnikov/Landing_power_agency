const body = document.querySelector('body');

document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.swiper', {
      loop: true, // Зациклювання слайдера
      slidesPerView: 1, // Кількість видимих слайдів
      spaceBetween: 30, // Відстань між слайдами
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      autoplay: {
        delay: 5000, // Автоперехід кожні 5 секунд
      },
    });
  });
  