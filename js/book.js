window.addEventListener("load", function () {
  console.log("오늘의 도서");
  //외부 데이터를 불러온다.
  const fileName = "book.json";
  function add(name) {
    return name.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const xhr = new XMLHttpRequest();

  xhr.open("GET", fileName);

  xhr.send();

  xhr.onreadystatechange = function (event) {
    if (event.target.readyState === XMLHttpRequest.DONE) {
      const res = event.target.response;
      const json = JSON.parse(res);
      makeHtmlTag(json);
    }
  };

  function makeHtmlTag(_res) {
    // 2. html 태그를 백틱을 이용해서 만든다.
    let htmlBookTag = ``;
    //_res에 담겨진 객체에서 total 을 보관한다.

    // 우리가 몇번 반복(total)해야 하는지 안다.
    for (let i = 0; i < _res.total; i++) {
      const index = i + 1;
      const obj = _res["good_" + index];
      const tempTag = `
      <div class="swiper-slide">
        <div class="book-slide-item">
        <a href="${obj.url}">
          <div class="book-slide-img">
            <img src="${obj.image}" alt="${obj.desc}" />
          </div>
          <div class="book-slide-item-f">
            <div class="book-slide-desc">${obj.desc}</div>
            <div class="book-slide-price">
            ${add(obj.price)}<span>원</span>
            </div>
          </div>
        </a>
      </div>
    </div>
    `;
      htmlBookTag += tempTag;
    }
    showHtml(htmlBookTag);
  }
  function showHtml(_html) {
    //  swiper 태그에 백틱을 배치한다.
    const bookSlide = ".book-slide .swiper-wrapper";
    const tag = document.querySelector(bookSlide);
    tag.innerHTML = _html;
    makeSwiper();
  }

  // 3. swiper 태그에 백틱을 배치한다.

  // 4. swiper 작동시킨다.
  function makeSwiper() {
    // 4. swiper 작동시킨다.
    const swiperBook = new Swiper(".book-slide", {
      slidesPerView: 5,
      spaceBetween: 28,
      navigation: {
        nextEl: ".book-slide-wrap .slide-next-bt",
        prevEl: ".book-slide-wrap .slide-prev-bt",
      },
      slidesPerGroup: 5,
    });
  }
});
