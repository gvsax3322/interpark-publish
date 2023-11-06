window.addEventListener("load", function () {
  console.log("이벤트");
  //외부 데이터를 불러온다.
  const xhr = new XMLHttpRequest();

  // 2. html 태그를 백틱을 이용해서 만든다.
  const htmlEventTag = ``;

  // 3. swiper 태그에 백틱을 배치한다.
  const eventSlide = ".event-slide .swiper-wrapper";

  // 4. swiper 작동시킨다.
  const swiperevent = new Swiper(".event-slide", {
    slidesPerView: 4,
    spaceBetween: 28,
    navigation: {
      nextEl: ".event-slide-wrap .slide-next-bt",
      prevEl: ".event-slide-wrap .slide-prev-bt",
    },
    slidesPerGroup: 4,
  });
});
