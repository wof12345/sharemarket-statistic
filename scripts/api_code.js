async function requestDataWithContext(context) {
  const response = await fetch(
    `https://cloud.iexapis.com/v1/data/${context}/NEWS?last=10&token=sk_909213ce3a0a4e46853b42438af41ba4`,
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

requestDataWithContext("CORE").then((data) => {
  console.log(data);
  apiDataNews = data;
  populateData(apiDataNews);
  extractAndUpdateHeadLines(apiDataNews);
});
