let newsPrefabSide = function (data) {
  return `<div class="col-lg-5">
  <div class="news-news d-flex flex-column">
    <div class="news-img">
    <img src="${data.imageUrl}" alt=""/>
    <h3>${data.headline}</h3>
    <div class="d-flex flex-column text-center">
      <p class="news-date">${data.date}</p>
      <p class="news-date">${data.summary}</p>
    </div>
    </div>
  </div>
</div>`;
};

let newsPrefab = function (data, extraHtml) {
  return ` <div class="row">
  <div class="col-lg-1"></div>
  <div class="newscont col-lg-6">
    <div class="col-lg-4">
      <a class="news1" href="${data.qmUrl}"
        ><img src="${data.imageUrl}" alt="img"
      /></a>
    </div>

    <div class="col-lg-8">
            <a
              class="news1"
              href="${data.qmUrl}"
              ><b
                >${data.headline}<br />
                <p class="news-date">${data.date}</p></b
              ></a
            >
          </div>
  </div>
  ${extraHtml}
</div>`;
};

function populateData(data) {
  refineData(data);
  console.log(data);

  for (let i = 0; i < data.length; i++) {
    newsImgCont.innerHTML += newsPrefab(
      data[i],
      i === 0 ? newsPrefabSide(data.pop()) : ""
    );
  }
}
