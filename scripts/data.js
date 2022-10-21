let archivedData = {
  headlines: [],
};

let apiDataNews = [];

let loadingSpinner = document.querySelector(`.loading_ind`);
let newsImgCont = document.querySelector(`.news`);

let loggedInStatusView = document.querySelector(`.login_status`);

let isLoggedIn = JSON.parse(localStorage.getItem("isLoggedin"));

if (isLoggedIn) {
  loggedInStatusView.textContent = "Dashboard";
  loggedInStatusView.href = "./pages/userpage.html";
} else {
  loggedInStatusView.href = "./pages/login.html";
  loggedInStatusView.textContent = "Login/Register";
}
