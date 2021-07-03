import refs from "./js/refs.js";
import getPosts from "./js/apiService.js";

let posts = null;

refs.iconMenu.addEventListener("click", onBurgerMenuClick);
getDataFromApiService(
  "https://gist.githubusercontent.com/LilyNov/23f9788f6e158e9d61e60b40c1b7086c/raw/ec4490cf35e4c6cdd9e1f6f3b46bfd4efc213240/bd.json"
);

// API
async function getDataFromApiService(BASE_URL) {
  posts = (await getPosts(BASE_URL)).posts;
  await renderTable(10, 1);
  await renderPagiButtons(0);
}

function renderTable(rows, pages) {
  refs.tableBody.innerHTML = "";
  for (let i = rows * (pages - 1); i < rows * pages; i++) {
    if (!posts[i]) return;

    refs.tableBody.insertAdjacentHTML(
      "beforeend",
      `
      <div class="table__row">
          <div class="table__row_taskname row-item" data-label="Task name">${
            posts[i].taskName
          }</div>
          <div class="table__row_developer row-item" data-label="Developer">
              ${posts[i].developer}
          </div>
          <div class="table__row_worktype row-item" data-label="Work Type">
              ${posts[i].workType}<br>
          </div>
          <div class="table__row_status row-item completed" data-label="Status">${
            posts[i].status
          }</div>
          <div class="table__row_estimation row-item" data-label="Estimation (h)" >${
            posts[i].estimation
          }</div>
          <div class="table__row_totaltime row-item" data-label="Total time spent by All">${
            posts[i].totalTimeSpentByAll
          }</div>
          <div class="table__row_spenttime row-item" data-label="My Time spent by Period (h)">${
            posts[i].myTimeSpentByPeriod
          }</div>
          <div class="table__row_efficiency row-item" data-label="Efficiency>${
            posts[i].efficiency ? posts[i].efficiency + "%" : "-"
          }</div>
      </div>
      `
    );
  }
}

function sortTable(col) {
  posts.sort((a, b) => {
    return b[col] - a[col];
  });
  renderTable(10, 1);
}

function renderPagiButtons(page) {
  refs.pages.innerHTML = `
      <button class="prev">
      <svg class="pagination__button-icon" width="16" height="16" viewBox="0 0 16 16" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M6 12L10 8L6 4" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
      </button>

      <ul class="table__pagination_buttons">
          
      </ul>

      <button class="next">
          <svg class="pagination__button-icon" width="16" height="16" viewBox="0 0 16 16" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M6 12L10 8L6 4" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
      </button>
  `;
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

refs.estimation.addEventListener("click", () => {
  sortTable("estimation");
});
refs.totalTime.addEventListener("click", () => {
  sortTable("totalTimeSpentByAll");
});
refs.spentTime.addEventListener("click", () => {
  sortTable("myTimeSpentByPeriod");
});
refs.efficiency.addEventListener("click", () => {
  sortTable("efficiency");
});

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
