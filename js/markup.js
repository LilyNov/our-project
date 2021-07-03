export const tableMarkup = (elem) => {
  let markup = `
      <div class="table__row">
          <div class="table__row_taskname row-item" data-label="Task name">${
            elem.taskName
          }</div>
          <div class="table__row_developer row-item" data-label="Developer">
              ${elem.developer}
          </div>
          <div class="table__row_worktype row-item" data-label="Work Type">
              ${elem.workType}<br>
          </div>
          <div class="table__row_status row-item  ${
            elem.status === "Completed" ? "completed" : "nonCompleted"
          }" data-label="Status">${elem.status}</div>
          <div class="table__row_estimation row-item" data-label="Estimation (h)" >${
            elem.estimation
          }</div>
          <div class="table__row_totaltime row-item" data-label="Total time spent by All">${
            elem.totalTimeSpentByAll
          }</div>
          <div class="table__row_spenttime row-item" data-label="My Time spent by Period (h)">${
            elem.myTimeSpentByPeriod
          }</div>
          <div class="table__row_efficiency row-item" data-label="Efficiency"> ${
            elem.efficiency ? elem.efficiency + "%" : "-"
          }</div>
      </div>
      `;
  return markup;
};

export const pagiBtnsMarkup = `
      <button class="prev">
      <svg class="pagination__button-icon" width="16" height="16" viewBox="0 0 16 16" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M6 12L10 8L6 4" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
      </button>

      <ul class="list table__pagination_buttons">
          
      </ul>

      <button class="next">
          <svg class="pagination__button-icon" width="16" height="16" viewBox="0 0 16 16" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M6 12L10 8L6 4" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
      </button>
  `;

export const loaderMarkup = `<div class="mask"><div class="loader"></div></div>`;
