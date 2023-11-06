window.addEventListener("load", function () {
  // 1.외부 데이터를 불러온다.
  // : 외부 데이터 파일명.json
  const fileName = "ticket.json";
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
    let htmlTicketTag = ``;
    //_res에 담겨진 객체에서 total 을 보관한다.

    // 우리가 몇번 반복(total)해야 하는지 안다.
    for (let i = 0; i < _res.total; i++) {
      const index = i + 1;
      const obj = _res["good_" + index];
      let discount = obj.discount === 0 ? "" : obj.discount + "%";
      let tempTag = ``;

      // 마지막 json에서는 url 만 읽어들인다.
      //그렇지 않으면 일반적으로 모두 출력한다.

      if (obj.event === "좌석우위") {
        tempTag = `
        <div class="swiper-slide">
        <div class="ticket-slide-item">
          <a href=${obj.url} class="ticket-link">
            <div class="ticket-link-info">
              <div class="ticket-link-img">
                <img src=${obj.image} alt="${obj.desc}" />
                <div class="ticket-link-h2">
                  <h2 class="ccc">${obj.ranking}</h2>
                </div>
              </div>
              <div class="ticket-link-f">
                <div><h3>${obj.title}</h3></div>
                <div>
                  <p class="ticket-link-f-p1">
                    ${obj.desc}
                  </p>
                </div>
                <div>
                  <p class="ticket-link-f-p2">
                    ${obj.date}
                  </p>
                </div>
                <div class="ticket-link-f-b">${obj.event}</div>
              </div>
            </div>
          </a>
        </div>
      </div>
    `;
      } else if (obj.event === "단독판매") {
        tempTag = `
        <div class="swiper-slide">
        <div class="ticket-slide-item">
          <a href=${obj.url} class="ticket-link">
            <div class="ticket-link-info">
              <div class="ticket-link-img">
                <img src=${obj.image} alt="${obj.desc}" />
                <div class="ticket-link-h2">
                  <h2 class="ccc">${obj.ranking}</h2>
                </div>
              </div>
              <div class="ticket-link-f">
                <div><h3>${obj.title}</h3></div>
                <div>
                  <p class="ticket-link-f-p1">
                    ${obj.desc}
                  </p>
                </div>
                <div>
                  <p class="ticket-link-f-p2">
                    ${obj.date}
                  </p>
                </div>
                <div class="ticket-link-f-r">${obj.event}</div>
              </div>
            </div>
          </a>
        </div>
      </div>
    `;
      } else if (obj.event === " ") {
        tempTag = `
        <div class="swiper-slide">
        <div class="ticket-slide-item">
          <a href=${obj.url} class="ticket-link">
            <div class="ticket-link-info">
              <div class="ticket-link-img">
                <img src=${obj.image} alt="${obj.desc}" />
                <div class="ticket-link-h2">
                  <h2 class="ccc">${obj.ranking}</h2>
                </div>
              </div>
              <div class="ticket-link-f">
                <div><h3>${obj.title}</h3></div>
                <div>
                  <p class="ticket-link-f-p1">
                    ${obj.desc}
                  </p>
                </div>
                <div>
                  <p class="ticket-link-f-p2">
                    ${obj.date}
                  </p>
                </div>
                <div>${obj.event}</div>
              </div>
            </div>
          </a>
        </div>
      </div>
    `;
      } else {
        tempTag = `
        <div class="swiper-slide">
        <div class="swiper-slide-view">
          <a href="${_res.url}" class="swiper-a-view"
            ><img src="images/btn_moreProduct.31dedf7e.svg" alt="" />
            <h3>전체보기</h3>
          </a>
        </div>
      </div>
        `;
      }

      htmlTicketTag += tempTag;
    }
    showHtml(htmlTicketTag);
  }

  // html 출력 전용 기능을 만들자.
  function showHtml(_html) {
    //  swiper 태그에 백틱을 배치한다.
    const ticketSlide = ".ticket-slide .swiper-wrapper";
    const tag = document.querySelector(ticketSlide);
    tag.innerHTML = _html;
    makeSwiper();
  }
  // swiper 만들고 실행하기
  function makeSwiper() {
    // 4. swiper 작동시킨다.
    const swiperRecommend = new Swiper(".ticket-slide", {
      slidesPerView: 4,
      spaceBetween: 27,
      // 좌, 우측 버튼
      navigation: {
        nextEl: ".ticket-slide-wrap .slide-next-bt",
        prevEl: ".ticket-slide-wrap .slide-prev-bt",
      },
      // 4장식
      slidesPerGroup: 4,
    });
  }
});
