let iexUrlProps = {
  url: `https://cloud.iexapis.com`,
  param1News: "/v1",
  param2News: "/data",
  param3News: "/CORE",
  param4News: "last=40",
  param1Statistics: "/stable",
  param2Statistics: "/stock",
  param3Statistics: "",
  param4Statistics: "/quote",
  tokenNews: "sk_ea9218b6a48f4defa07828a6521198cd",
  tokenStatistics: "pk_2d6c7eb0bcf0428885f31929d749694f",
};

async function requestDataWithContext(
  url,
  param1,
  param2,
  param3,
  param4,
  token,
  context
) {
  const response = await fetch(
    `${url}${param1}${param2}${param3}${context}?${param4}&token=${token}`,
    {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    }
  );
  return response.json();
}

requestDataWithContext(
  iexUrlProps.url,
  iexUrlProps.param1News,
  iexUrlProps.param2News,
  iexUrlProps.param3News,
  iexUrlProps.param4News,
  iexUrlProps.tokenNews,
  "/NEWS"
).then((data) => {
  console.log(data);
  apiDataNews = data;

  if (loadingSpinner) {
    loadingSpinner.style.display = "none";
    populateData(apiDataNews);
    extractAndUpdateHeadLines(apiDataNews);
  }
});
