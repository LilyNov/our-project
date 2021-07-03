import refs from "./refs.js";
import getPosts from "./apiService.js";
import { tableMarkup, pagiBtnsMarkup } from "./markup.js";

const strInTable = 10;
let posts = null;
const BASE_URL =
  "https://gist.githubusercontent.com/LilyNov/23f9788f6e158e9d61e60b40c1b7086c/raw/ec4490cf35e4c6cdd9e1f6f3b46bfd4efc213240/bd.json";

refs.iconMenu.addEventListener("click", onBurgerMenuClick);
getDataFromApiService(BASE_URL);

// API
function getDataFromApiService() {
  getPosts(BASE_URL)
    .then((data) => {
      posts = data.posts;
      renderTable(strInTable, 1);
      renderPagiButtons(0);
    })
    .catch(new Error(`Could not fetch url`));
}

function renderTable(rows, pages) {
  refs.tableBody.innerHTML = "";
  for (let i = rows * (pages - 1); i < rows * pages; i++) {
    const elem = posts[i];
    if (!elem) return;
    const markup = tableMarkup(elem);

    refs.tableBody.insertAdjacentHTML("beforeend", markup);
  }
}

function sortTable(col) {
  posts.sort((a, b) => {
    return b[col] - a[col];
  });
  renderTable(strInTable, 1);
}

refs.sortTable.forEach((sortItem) => {
  sortItem.addEventListener("click", () => {
    let sortValue;

    switch (sortItem.id) {
      case "estimation":
        sortValue = "estimation";
        break;
      case "totalTime":
        sortValue = "totalTimeSpentByAll";
        break;
      case "spentTime":
        sortValue = "myTimeSpentByPeriod";
        break;
      case "efficiency":
        sortValue = "efficiency";
        break;

      default:
        break;
    }
    sortTable(sortValue);
  });
});

function renderPagiButtons(page) {
  refs.pages.innerHTML = pagiBtnsMarkup;
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  prevBtn.removeAttribute("disabled");
  nextBtn.removeAttribute("disabled");

  const blockPagiBtns = document.querySelector(".table__pagination_buttons");

  for (let i = 0; i < Math.ceil(posts.length / 10); i++) {
    blockPagiBtns.insertAdjacentHTML(
      "beforeend",
      `
          <li class="table__pagination_button">
              <button class="pagibtn">${i + 1}</button>
          </li>
      `
    );
  }

  const pagiBtns = [...document.querySelectorAll(".pagibtn")];
  pagiBtns[page].classList.add("active");

  if (page === 0) {
    prevBtn.setAttribute("disabled", "disabled");
  }

  if (page === pagiBtns.length - 1) {
    nextBtn.setAttribute("disabled", "disabled");
  }

  pagiBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      pagiBtns.forEach((btn) => btn.classList.remove("active"));
      btn.classList.add("active");
      renderTable(10, +btn.textContent);
      renderPagiButtons(+btn.textContent - 1);
    });
  });

  nextBtn.addEventListener("click", () => {
    renderTable(10, page + 2);
    renderPagiButtons(page + 1);
  });

  prevBtn.addEventListener("click", () => {
    renderTable(10, page);
    renderPagiButtons(page - 1);
  });
}

// refs.estimation.addEventListener("click", () => {
//   sortTable("estimation");
// });
// refs.totalTime.addEventListener("click", () => {
//   sortTable("totalTimeSpentByAll");
// });
// refs.spentTime.addEventListener("click", () => {
//   sortTable("myTimeSpentByPeriod");
// });
// refs.efficiency.addEventListener("click", () => {
//   sortTable("efficiency");
// });

// burger menu
function onBurgerMenuClick() {
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
