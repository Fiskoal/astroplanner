// ***** ACCESS ASTRONOMY API
const apiAstro = {
  key: 'f19a0b3ef89541fc86e5a367eddf220e',
  base: 'https://api.ipgeolocation.io/'
};
const apiMoon = {
  key: 'F8FKBZ5J85TFBX3ZATBURMFXW',
  base: 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/timeline'
};

$("#search-button").on("click", function () {
  fetch("https://api.opencagedata.com/geocode/v1/json?q=" + $("#search-bar").val().replace(" ", "%20") + "&key=fb50173e34c341a88957c0a94c3f2032&pretty=1")
    .then(function (response) {
      if (response.status !== 200) {
        console.log("Yikes! opencagedata returned status code " + response.status);
        return;
      }
      response.json().then(function (data) {
        // console logs
        console.log("====================");
        console.log("geocode api data");
        console.log(data);
        console.log(data.results[0].formatted + ": " + data.results[0].bounds.northeast.lat + ", " + data.results[0].bounds.northeast.lng);
        console.log("====================");
        // console logs

        $("#location-name").text(data.results[0].formatted);

        $("#map-header").text("Star Map for: " + data.results[0].geometry.lat + ", " + data.results[0].geometry.lng);

        let ra = 180 + data.results[0].geometry.lng;
        let de = data.results[0].geometry.lat;

        $("#map-img").attr("src", "https://server1.sky-map.org/skywindow?ra=" + ra + "&de=" + de + "&zoom=0");

        console.log($("#map-img").attr())

        // ***** ACCESS IPGEOLOCATION.IO ASTRONOMY API

        console.log(data.results[0].geometry.lng);
        console.log(data.results[0].geometry.lat);

        let astroAPILink = `${apiAstro.base}/astronomy?apiKey=${apiAstro.key}&lat=${data.results[0].geometry.lat}&long=${data.results[0].geometry.lng}`;

        fetch(astroAPILink)
          .then(function (response) {
            console.log(response);
            return response.json();
          })
          .then(data2 => {
            console.log("data is: ");
            console.log(data2);
            // links javascript to API data
            let sunriseTime = data2.sunrise;
            let sunsetTime = data2.sunset;
            let moonriseTime = data2.moonrise;
            let moonsetTime = data2.moonset;
            // links javascript to HTML elements
            let sunriseDisplay = document.querySelector('#sunrise-time');
            let sunsetDisplay = document.querySelector('#sunset-time');
            let moonriseDisplay = document.querySelector('#moonrise-time');
            let moonsetDisplay = document.querySelector('#moonset-time');
            // updates html text
            sunriseDisplay.innerHTML = sunriseTime;
            sunsetDisplay.innerHTML = sunsetTime;
            moonriseDisplay.innerHTML = moonriseTime;
            moonsetDisplay.innerHTML = moonsetTime;
            console.log('sunrise', sunriseTime);

            // ***** ACCESS VISUALCROSSING.COM MOON PHASE API

            console.log(data);
            console.log(data.results[0].geometry.lng);
            console.log(data.results[0].geometry.lat);
            console.log(data.results[0].geometry.lat);

            let moonAPILink = `${apiMoon.base}?includeAstronomy=true&key=${apiMoon.key}&period=today&contentType=json&locations=${data.results[0].geometry.lat}%2C%20${data.results[0].geometry.lng}`;
            console.log(moonAPILink);

            fetch(moonAPILink)
              .then(function (response) {
                console.log(response);
                return response.json();
              })
              .then(data3 => {
                console.log("====================");
                console.log("data is: ");
                console.log(data3);
                console.log(data3.days[0].moonphase);
                console.log("====================");
                //// links javascript to API data
                //let sunriseTime = data.sunrise;
                ////let sunriseTime = data.sunrise;
              });
          });

      });
    });
});
