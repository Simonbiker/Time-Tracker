let json = {};
let timeframe = "Weekly";

function getData() {
  fetch('/data.json')
    .then((response) => response.json())
    .then((data) => {
      json = data;

      data.forEach((item) => {
        const title = item.title;
        const weekly = item["timeframes"].weekly.current;
        const previous = item["timeframes"].weekly.previous;

        // Populate the default data when the page loads
        getDefaultData(title, weekly, previous);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function getDefaultData(title, weekly, previous) {
  // Create elements to display the data
  const titleElement = document.createElement("div");
  const currentElement = document.createElement("div");
  const previousElement = document.createElement("div");

  // Add the text to the elements
  titleElement.textContent = title;
  currentElement.textContent = `${weekly} hrs`;
  previousElement.textContent = `Last week - ${previous} hrs`;

  if (title == "Work") {
    // Append the elements to the respective containers
    document.getElementById("work").appendChild(titleElement);
    document.getElementById("time").appendChild(currentElement);
    document.getElementById("previousTime").appendChild(previousElement);
  } else if (title == "Play") {
    document.getElementById("play").appendChild(titleElement);
    document.getElementById("playTime").appendChild(currentElement);
    document.getElementById("previousPlayTime").appendChild(previousElement);
  } else if (title == "Study") {
    document.getElementById("study").appendChild(titleElement);
    document.getElementById("studyTime").appendChild(currentElement);
    document.getElementById("previousStudyTime").appendChild(previousElement);
  }
  
}

document.addEventListener("DOMContentLoaded", () => {
  getData();
});


// function getFilteredData(String) {

// }

// function getWorkDataByDay() {

// }



// filter data depending on which part of the nav is clicked. 
// OR
// check if weekly is clicked then filter for weekly data

