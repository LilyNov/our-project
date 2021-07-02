import refs from "./refs.js";

refs.iconMenu.addEventListener("click", onBurgerMenuClick);

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
