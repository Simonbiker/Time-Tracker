// fetch data

let json;
fetch('/data.json').then((response) => {  
  return response.json();
}).then((data) => {
  json = data;
  console.log(json);
});


// filter data depending on which part of the nav is clicked. 
// OR
// check if weekly is clicked then filter for weekly data

