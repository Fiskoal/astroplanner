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

// 'media query' for small screens, finds <button> with #defaultOpen id and clicks it
if (window.innerWidth < 750) {
  document.getElementById("defaultOpen").click();
}