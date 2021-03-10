function openPage(pageName, element, color) {
  var i, tabContent, tabLinks;
  tabContent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }
  tabLinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tabLinks.length; i++) {
    tabLinks[i].style.backgroundColor = "";
  }
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