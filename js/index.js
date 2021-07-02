import refs from "./refs.js";
import apiService from "./apiService.js";

refs.iconMenu.addEventListener("click", onBurgerMenuClick);
dataFromApiService();

// API
function dataFromApiService() {
  const BASE_URL =
    "https://gist.githubusercontent.com/LilyNov/4b2e78776268f66201c7452e7246f73c/raw/2486806b6c1c4efcbd89674699b098601dc78394/table.json";

  apiService(BASE_URL)
    .then((data) => renderTable(data))
    .catch(new Error(`Could not fetch url`));
}

function renderTable(data) {
  console.log(data);
}

// burger menu
function onBurgerMenuClick() {
  console.log("click");
  document.body.classList.toggle("lock");
  refs.iconMenu.classList.toggle("active");
  refs.nav.classList.toggle("active");
  onNavClick();
}

function onNavClick() {
  refs.navLink.forEach((elem) => {
    elem.addEventListener("click", () => onBurgerMenuClick());
  });
}
