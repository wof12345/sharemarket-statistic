async function requestDataWithContext(context) {
  const response = await fetch(
    `https://cloud.iexapis.com/v1/data/CORE/${context}?last=40&token=sk_909213ce3a0a4e46853b42438af41ba4`,
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

async function requestDataWithContextSymbol(symbol) {
  const response = await fetch(
    `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=pk_2d6c7eb0bcf0428885f31929d749694f`,
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

requestDataWithContext("NEWS").then((data) => {
  loadingSpinner.style.display = "none";
  console.log(data);
  apiDataNews = data;
  populateData(apiDataNews);
  extractAndUpdateHeadLines(apiDataNews);
});

// requestDataWithContext("ECONOMIC").then((data) => {
//   console.log(data);
//   apiDataNews = data;
//   // populateData(apiDataNews);
//   // extractAndUpdateHeadLines(apiDataNews);
// });
