window.addEventListener("load", function () {
  // 1.외부 데이터를 불러온다.
  // : 외부 데이터 파일명.json
  const fileName = "live.json";
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
    let htmlLiveTag = ``;
    //_res에 담겨진 객체에서 total 을 보관한다.

    // 우리가 몇번 반복(total)해야 하는지 안다.
    for (let i = 0; i < _res.total; i++) {
      const index = i + 1;
      const obj = _res["good_" + index];
      let discount = obj.discount === "" ? "" : obj.discount + "%";
      let price =
        obj.price === ""
          ? ""
          : obj.price + `<span class="live-good-info-price-span">원<span>`;
      const tempTag = `
      <div class="swiper-slide">
        <div class="live-link">
          <a href="${obj.url}" alt="${obj.desc}" class="live-link-a">
          <img src="${obj.image}" alt="" class="live-link-img" />
            ${
              obj.date === ""
                ? `<div class="live-link-info">`
                : `<div class="live-link-info live-link-info-bg">`
            }
              <div class="live-link-info-1">
                <i>${obj.title}</i><em>${obj.desc}</em>
              </div>
              <div class="live-link-info-2">
                <div class="live-link-info-2-a">${obj.date}</div>
                <div class="live-link-info-2-b">${obj.hour}</div>
              </div>
              <a href="${obj.url2}">
                <div class="live-link-info-3">
                ${
                  obj.simage === "" ? `` : ` <img src="${obj.simage}" alt="" />`
                }
                  <div class="live-link-info-3-a">
                    ${obj.detail}<span class="live-good-info-price">
                      <b>${discount}</b>
                      <em>${add(price)}</em>
                    </span>
                  </div>
                </div>
              </a>
            </div>
          </a>
        </div>
      </div>              
    `;
      htmlLiveTag += tempTag;
    }
    showHtml(htmlLiveTag);
  }

  // html 출력 전용 기능을 만들자.
  function showHtml(_html) {
    //  swiper 태그에 백틱을 배치한다.
    const liveSlide = ".live-slide .swiper-wrapper";
    const tag = document.querySelector(liveSlide);
    tag.innerHTML = _html;
    makeSwiper();
  }
  // swiper 만들고 실행하기
  function makeSwiper() {
    // 4. swiper 작동시킨다.
    const swiperTour = new Swiper(".live-slide", {
      slidesPerView: 4,
      spaceBetween: 27,
      navigation: {
        nextEl: ".live-slide-wrap .slide-next-bt",
        prevEl: ".live-slide-wrap .slide-prev-bt",
      },
      slidesPerGroup: 4,
    });
  }
});
