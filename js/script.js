function openPage(pageName, element, color) {
  var i, tabContent, tabLinks;
  tabContent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }
  tabLinks = document.getElementsByClassName("tab-link");
  for (i = 0; i < tabLinks.length; i++) {
    tabLinks[i].style.backgroundColor = "";
  }
  document.getElementById(pageName).style.display = "block";
  element.style.backgroundColor = color;
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();