// ! for JavaScript to work, add dashes to the class names on lines 11 & 17


function openPage(pageName, element, color) {
//? onclick = "openPage('forecast', this, 'green')

  // declares variables;
  var i, tabContent, tabLinks;

  // loops through all <div> elements with .tab-content class, hides them as default
  tabContent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }

  // loops through all <button> elements with .tab-link class, empties background color.
  tabLinks = document.getElementsByClassName("tab-link");
  for (i = 0; i < tabLinks.length; i++) {
    tabLinks[i].style.backgroundColor = "";
  }

  // takes page and displays as block element, adds color to the tab button
  document.getElementById(pageName).style.display = "block";
  element.style.backgroundColor = color;
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

//=================================================
//previous searches

$("#search-button").on("click", function() {
  let searchValue = $("#search-bar").val().trim();
  const previousSearches = JSON.parse(localStorage.
  getItem("astro-searches")) || [];
  previousSearches.push(searchValue);
  localStorage.setItem("astro-searches", JSON.stringify(previousSearches));
})

let isDropdownVis = false;

$("#search-bar").on("click", function (e) {
  console.log("clicked");
  e.stopPropagation();
  const previousSearches = JSON.parse(localStorage.
  getItem("astro-searches")) || [];
  if (previousSearches.length > 0){
    $(".previousSearches").attr("id", "previousSearches");
    isDropdownVis = true;
    for (i=0; i<previousSearches.length; i++) {
      $("#previousSearches").append($("<p></p>").text(previousSearches[i]).addClass("searchItem").on("click", function(e) {
        e.stopPropagation();
        $("#search-bar").val($(this).text());
        $("#previousSearches").empty();
        $(".previousSearches").attr("id", "");
        isDropdownVis = false;
      }));
    }
  } else {
    return;
  }
})

$("body").on("click", function (e) {
  console.log(isDropdownVis);
  if (isDropdownVis) {
    isDropdownVis = false;
    $("#previousSearches").empty();
    $(".previousSearches").attr("id", "");
  }
})