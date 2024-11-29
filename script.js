let json = {};
let currentTimeframe = "weekly";

function getData() {
  fetch('/data.json')
    .then((response) => response.json())
    .then((data) => {
      json = data;

      displayData(currentTimeframe);
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function displayData(timeframe) {
  json.forEach((item) => {
    const {title, timeframes} = item;
    const current = timeframes[timeframe].current;
    const previous = timeframes[timeframe].previous;
    updateUI(title, current, previous, timeframe);
  });
}

function updateUI(title, current, previous, timeframe) {

  let amendedTitle = title.toLowerCase().replace(" ", "-");

  let titleElement = document.getElementById(`${amendedTitle}`);
  let currentElement = document.getElementById(`${amendedTitle}Time`);
  let previousElement = document.getElementById(`previous${amendedTitle}Time`);

  if (titleElement && currentElement && previousElement) {
    titleElement.textContent = title;
    currentElement.textContent = `${current} hrs`;
    previousElement.textContent = getPreviousText(timeframe, previous);
  }
}

function getPreviousText(timeframe, previous) {
  switch (timeframe.toLowerCase()) {
    case 'daily':
      return `Yesterday - ${previous} hrs`;
    case 'weekly':
      return `Last Week - ${previous} hrs`;
    case 'monthly':
      return `Last Month - ${previous} hrs`;
    default:
      return '';
  }
}

document.querySelectorAll(".nav-buttons").forEach(button => {
  button.addEventListener("click", (e) => {
    const selectedTimeframe = e.target.textContent.toLowerCase();
    currentTimeframe = selectedTimeframe;
    displayData(selectedTimeframe);
  });
});

document.querySelectorAll(".nav-buttons").forEach((button) => {
  button.addEventListener("click", (e) => {
    // Remove "active" class from all buttons
    document.querySelectorAll(".nav-buttons").forEach((btn) => btn.classList.remove("active"));

    e.target.classList.add("active");

    const selectedTimeframe = e.target.textContent.toLowerCase();
    currentTimeframe = selectedTimeframe;
    displayData(selectedTimeframe);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  getData();
  document.querySelector(".nav-buttons:nth-child(2)").classList.add("active");
});
