// src/components/swiperGeneros.js
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

export const iniciarSwiperGeneros = () => {
  new Swiper('.mySwiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    }
  });
};
