import refs from "./refs.js";
import apiService from "./apiService.js";

refs.iconMenu.addEventListener("click", onBurgerMenuClick);
dataFromApiService();

// API
function dataFromApiService() {
  const BASE_URL =
    "https://gist.githubusercontent.com/LilyNov/23f9788f6e158e9d61e60b40c1b7086c/raw/ec4490cf35e4c6cdd9e1f6f3b46bfd4efc213240/bd.json";

  apiService(BASE_URL)
    .then((data) => renderTable(data))
    .catch(new Error(`Could not fetch url`));
}

function renderTable(data) {
  console.log(data); //posts
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
