console.log("Hello from App.js");

let viz;

// let is a type of variable: constant, let or var

const hideButton = document.getElementById("hideButton");
const showButton = document.getElementById("showButton");
const exportPDFbutton = document.getElementById("exportPDFbutton");
const exportPowerPointbutton = document.getElementById(
  "exportPowerPointbutton"
);
const applyFilter = document.getElementById("applyFilter");

const url =
  "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard";

// this is the constant that retrieves the URL

const vizContainer = document.getElementById("vizcontainer");

// this constant reference the viz container in the HTML

const options = {
  device: "desktop",
  height: "600px",
  width: "1000px",
};

// this option lets you select the dashboard layout

function initViz() {
  console.log("My viz is loading...");
  viz = new tableau.Viz(vizContainer, url, options);
}

function hideTheViz() {
  console.log("Going to Hide the viz...");
  viz.hide();
}

function showTheViz() {
  console.log("Going to show the viz...");
  viz.show();
}

function getRangeValues() {
  const minValue = document.getElementById("MinValue").value;
  const maxValue = document.getElementById("MaxValue").value;
  console.log(
    `your min value is ${MinValue} and your max value is ${MaxValue}`
  );
  const workbook = viz.getWorkbook();
  const activeSheet = workbook.getActiveSheet();
  const sheets = activeSheet.getWorksheets();
  console.log(sheets);
  const sheetToFilter = sheets[1];
  sheetToFilter
    .applyRangeFilterAsync("SUM(Sales)", {
      min: minValue,
      max: maxValue,
    })
    .then(console.log("Your filter was applied"));
  console.log(sheetToFilter);
}

hideButton.addEventListener("click", hideTheViz);

showButton.addEventListener("click", showTheViz);

applyFilter.addEventListener("click", getRangeValues);

document.addEventListener("DOMContentLoaded", initViz);

// event listener waits for the HTML code to completely load, and THEN loads the VIZ

function exportPDFfunction() {
  console.log("generating PDF export");
  viz.showExportPDFDialog();
}

exportPDFbutton.addEventListener("click", exportPDFfunction);

function exportPowerPointfunction() {
  console.log("generating PowerPoint export");
  viz.showExportPowerPointDialog();
}

exportPowerPointbutton.addEventListener("click", exportPowerPointfunction);

// event listner and function for PFD and PPT extract
