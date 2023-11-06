window.addEventListener("load", function () {
  console.log("라이브");
  //외부 데이터를 불러온다.
  const xhr = new XMLHttpRequest();

  // 2. html 태그를 백틱을 이용해서 만든다.
  const htmlLiveTag = ``;

  // 3. swiper 태그에 백틱을 배치한다.
  const liveSlide = ".live-slide .swiper-wrapper";

  // 4. swiper 작동시킨다.
  const swiperlive = new Swiper(".live-slide", {
    slidesPerView: 4,
    spaceBetween: 28,
    navigation: {
      nextEl: ".live-slide-wrap .slide-next-bt",
      prevEl: ".live-slide-wrap .slide-prev-bt",
    },
    slidesPerGroup: 4,
  });
});
