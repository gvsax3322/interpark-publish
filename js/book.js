window.addEventListener("load", function () {
  console.log("오늘의 도서");
  //외부 데이터를 불러온다.
  const xhr = new XMLHttpRequest();

  // 2. html 태그를 백틱을 이용해서 만든다.
  const htmlBookTag = ``;

  // 3. swiper 태그에 백틱을 배치한다.
  const bookSlide = ".book-slide .swiper-wrapper";

  // 4. swiper 작동시킨다.
  const swiperbook = new Swiper(".book-slide", {
    slidesPerView: 5,
    spaceBetween: 28,
    navigation: {
      nextEl: ".book-slide-wrap .slide-next-bt",
      prevEl: ".book-slide-wrap .slide-prev-bt",
    },
    slidesPerGroup: 5,
  });
});
