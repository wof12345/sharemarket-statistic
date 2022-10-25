let isLoggedIn = JSON.parse(localStorage.getItem("isLoggedin"));
console.log(isLoggedIn);

if (!isLoggedIn) {
  //redirection
  window.location = "../pages/login.html";
}

let stock_input = document.querySelector(`#stock`);
let stock_input_number = document.querySelector(`#stock_number`);
let stock_input_number_btn = document.querySelector(`.buy_stock`);
let stock_input_btn = document.querySelector(`.s_search`);
let infoContainer = document.querySelector(`.info_container`);
let pagesInd = document.querySelectorAll(`.navigation`);
let pages = document.querySelectorAll(`.page`);
let loginView = document.querySelector(`.login_status`);

let table = document.querySelector(`.table`);
let sharesCont = document.querySelector(`.shares`);

let input_token = "";

let user_data = [];

let relevantData = {
  cost: 0,
  name: "",
};

getSpecDBDataFull({
  username: localStorage.getItem("username"),
});

pages[0].style = "display:block";
pagesInd[0].classList.add("active");

let historyPrefab = function (data) {
  let date = new Date(+data.dateUnformatted);
  date = date.toLocaleString("en-US");
  return `<tr>
<td>${data.marketName}</td>
<td>${data.shareBought}</td>
<td>${data.cost}</td>
<td>${date}</td>
</tr>`;
};

let dataRowPrefab = function (it, data) {
  if (it.toLowerCase().includes("price" || "value" || "high" || "low")) {
    data += " " + "$";
  }
  if (it === "latestPrice") {
    relevantData.cost = data;
    it = "cost";
  }
  if (it === "symbol") {
    relevantData.name = data;
    it = "name";
  }

  return `<div class="data_row ${it}">
  <div class="row-header">${it}</div>
  <div class="row-info">${data}</div> 
  </div>`;
};

let shareRowInfo = function (data) {
  return `<div class="share_owned">
    <div class="share_info">
      <label  class="market_name" for="Sell">Market : ${data[0]} </label>
      <p class="share_num">Shares : ${data[3]}</p>
      <p>Spent : ${data[1]}$</p>
    </div>
    
    <input type="text" id="Sell${data[0]}" />
    <button class="sell">sell</button>
  </div>`;
};

stock_input_btn.addEventListener("click", (e) => {
  e.preventDefault();
  input_token = stock_input.value;
  console.log(input_token);

  requestStockData(input_token);
});

function requestStockData(symbol) {
  if (symbol && symbol !== "")
    requestDataWithContext(
      iexUrlProps.url,
      iexUrlProps.param1Statistics,
      iexUrlProps.param2Statistics,
      "/" + symbol,
      iexUrlProps.param3Statistics,
      iexUrlProps.tokenStatistics,
      iexUrlProps.param4Statistics
    ).then((data) => {
      console.log(data);
      populateInfoContainer(data);
    });
}

function populateInfoContainer(data) {
  infoContainer.innerHTML = "";
  for (let it in data) {
    if (data[it] !== null)
      infoContainer.innerHTML += dataRowPrefab(it, data[it]);
  }
}

function populateTable(data) {
  table.innerHTML = `<th>Company</th>
    <th>Shares exchanged</th>
    <th>Cost</th>
    <th>Date</th>`;

  data.forEach((elm, ind) => {
    table.innerHTML += historyPrefab(data[ind]);
  });
}

function populateShares(data) {
  console.log(data);

  sharesCont.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    if (data[i][3] > 0) sharesCont.innerHTML += shareRowInfo(data[i]);
  }
}

function populateUserData(data) {
  user_data = [];
  console.log("populated data", data);
  data.sort(function (a, b) {
    return a.marketName.localeCompare(b.marketName);
  });

  let lastMarketName = "";
  for (let i = 0; i < data.length; i++) {
    if (lastMarketName !== data[i].marketName) {
      let currentSum = data[i].cost;
      let currentShare = data[i].shareBought;
      let totalShare = data[i].sharesInCompany;
      for (let j = i + 1; j < data.length; j++) {
        if (data[i].marketName === data[j].marketName) {
          currentSum += data[j].cost;
          currentShare += data[j].shareBought;
        }
        lastMarketName = data[i].marketName;
      }
      user_data.push([
        data[i].marketName,
        currentSum,
        currentShare,
        totalShare,
      ]);
    }
  }
  //   console.log("populatedDtaa", user_data);

  populateShares(user_data);
}

pagesInd.forEach((elm, ind) => {
  elm.addEventListener("click", () => {
    pages[ind].style = "display:block";

    pagesInd[ind].classList.add("active");

    for (let i = 0; i < pagesInd.length; i++) {
      //   console.log(ind !== i);

      if (ind !== i) {
        pages[i].style = "display:none";
        pagesInd[i].classList.remove("active");
      }
    }
  });
});

stock_input_number_btn.addEventListener("click", () => {
  let stockShare = stock_input_number.value;
  let currentDate = new Date().getTime();

  console.log(relevantData);

  if (isNaN(relevantData.cost))
    relevantData.cost = +relevantData.cost.split(" ")[0];

  let dataToPush;
  for (let i = 0; i < user_data.length; i++) {
    if (user_data[i][0] === relevantData.name) {
      dataToPush =
        +(user_data[i][3] === 0 ? user_data[i][2] : user_data[i][3]) +
        +stockShare;
    }
  }
  console.log("data_buy", +stockShare, +relevantData.cost);

  updateSpecDBData({
    username: localStorage.getItem("username"),
    shareOwned: dataToPush ? dataToPush : 0,
    marketName: relevantData.name,
  });

  insertdataSpecDB({
    username: localStorage.getItem("username"),
    marketName: relevantData.name,
    shareBought: stockShare,
    cost:
      +stockShare * +relevantData.cost ? +stockShare * +relevantData.cost : 0,
    dateUnformatted: currentDate,
    shareOwned: dataToPush ? dataToPush : 0,
  });
});

loginView.addEventListener("click", () => {
  let isLoggedIn = false;
  localStorage.setItem("isLoggedin", isLoggedIn);

  window.location = `../homepage.html`;
});

document.addEventListener("click", (e) => {
  let target = e.target;
  let targetClass = e.target.className;

  if (targetClass === "sell") {
    let parent = target.closest(".share_owned");
    let share = parent.querySelector(".share_num");
    let input = parent.querySelector("input");
    let marketName = parent
      .querySelector(".market_name")
      .textContent.split(" ")[2];
    let value = +share.textContent.split(" ")[2] - +input.value;
    let dataToPush, dataCost;
    console.log("data_buy", input.value, relevantData);

    if (value >= 0 && value != undefined) {
      let stockShare = stock_input_number.value;
      let currentDate = new Date().getTime();

      for (let i = 0; i < user_data.length; i++) {
        if (user_data[i][0] === marketName) {
          dataToPush =
            +(user_data[i][3] === 0 ? user_data[i][2] : user_data[i][3]) +
            +stockShare;

          dataCost = user_data[i][1];
        }
      }

      requestStockData(marketName);

      insertdataSpecDB({
        username: localStorage.getItem("username"),
        marketName: marketName,
        shareBought: input.value,
        cost: -(+input.value * +relevantData.cost)
          ? -(+input.value * +relevantData.cost)
          : 0,
        dateUnformatted: currentDate,
        shareOwned: dataToPush,
      });

      updateSpecDBData({
        username: localStorage.getItem("username"),
        shareOwned: value,
        marketName: marketName,
      });
    }

    setTimeout(() => {
      getSpecDBDataFull({
        username: localStorage.getItem("username"),
      });
    }, 500);
  }
});
