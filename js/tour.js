window.addEventListener("load", function () {
  // 1.외부 데이터를 불러온다.
  // : 외부 데이터 파일명.json
  const fileName = "tour.json";
  function add(name) {
    return name.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // 외부 데이터 가져올때 작성법
  const xhr = new XMLHttpRequest();
  // 외부의 파일을 열어라
  //Get 방식으로  파일을 열어준다.
  xhr.open("GET", fileName);
  //실제로 실행하자.
  xhr.send();
  // 데이터의 전송 상태를 체크
  xhr.onreadystatechange = function (event) {
    if (event.target.readyState === XMLHttpRequest.DONE) {
      // consol/e.log("자료 가져옴", event.target.response);
      // 코드가 가독성이 떨어지므로 변수에 담는다.
      // 규칙은 const 브타 직상히지.
      // const가 문제가 된다면 let으로 변경한다.
      const res = event.target.response;
      // res를 전달해서 html 태그를 만든다.
      // 데이터를 전달해서 정리해서 전달하는 것이 관례
      // 전달받은 문자열을 js에서
      // JSON 테이터를 해석(parse)하여
      // 객채화{원시데이터 묶음 }한다.
      const json = JSON.parse(res);
      makeHtmlTag(json);
    }
  };

  //html 태그를 만드는 기능
  function makeHtmlTag(_res) {
    // 2. html 태그를 백틱을 이용해서 만든다.
    let htmlTourTag = ``;
    //_res에 담겨진 객체에서 total 을 보관한다.

    // 우리가 몇번 반복(total)해야 하는지 안다.
    for (let i = 0; i < _res.total; i++) {
      const index = i + 1;
      const obj = _res["good_" + index];
      const tempTag = `
      <div class="swiper-slide">
        <div class="tour-slide-item">
          <a href="${obj.url}" class="tour-link">
            <div class="tour-link-img">
              <img src="${obj.image}" alt="${obj.desc}" />
            </div>
            <div class="tour-link-info">
              <div class="tour-link-info-1">${obj.title}</div>
              <div class="tour-link-info-2">
              ${obj.desc}
              </div>
              <div class="tour-link-info-3">
              ${obj.pkg}
              </div>
              <div class="tour-link-info-4">
                <em>${add(obj.price)}</em>원~
              </div>
            </div>
          </a>
        </div>
      </div>
    `;
      htmlTourTag += tempTag;
    }
    showHtml(htmlTourTag);
  }

  // html 출력 전용 기능을 만들자.
  function showHtml(_html) {
    //  swiper 태그에 백틱을 배치한다.
    const tourSlide = ".tour-slide .swiper-wrapper";
    const tag = document.querySelector(tourSlide);
    tag.innerHTML = _html;
    makeSwiper();
  }
  // swiper 만들고 실행하기
  function makeSwiper() {
    // 4. swiper 작동시킨다.
    const swiperTour = new Swiper(".tour-slide", {
      slidesPerView: 3,
      spaceBetween: 26,
      navigation: {
        nextEl: ".tour-slide-wrap .slide-next-bt",
        prevEl: ".tour-slide-wrap .slide-prev-bt",
      },
      slidesPerGroup: 3,
    });
  }
});
