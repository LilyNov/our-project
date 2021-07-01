import refs from "./refs.js";

refs.btnBackPage.addEventListener("click", OnBackPage);
refs.btnFirstPage.addEventListener("click", OnfirstPage);
refs.btnLastPage.addEventListener("click", OnLastPage);
refs.btnToPage.addEventListener("click", OnToPage);
refs.iconMenu.addEventListener("click", onBurgerMenu);
refs.tableContainer.addEventListener("click", tableSort);

// burger menu

function onBurgerMenu() {
  document.body.classList.toggle("lock");
  refs.iconMenu.classList.toggle("active");
  refs.nav.classList.toggle("active");
  onMenu();
}

function onMenu() {
  refs.navLink.forEach((elem) => {
    elem.addEventListener("click", () => onBurgerMenu());
  });
}
