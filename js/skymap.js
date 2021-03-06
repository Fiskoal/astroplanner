$("#search-button").on("click", function () {
  fetch("https://api.opencagedata.com/geocode/v1/json?q=" + $("#search-bar").val().replace(" ", "%20") + "&key=fb50173e34c341a88957c0a94c3f2032&pretty=1")
    .then(function (response) {
      if (response.status !== 200) {
        console.log("Yikes! opencagedata returned status code " + response.status);
        return
      }
      response.json().then(function (data) {
        // console logs
        console.log("====================")
        console.log("geocode api data")
        console.log(data)
        console.log(data.results[0].formatted + ": " + data.results[0].bounds.northeast.lat + ", " + data.results[0].bounds.northeast.lng)
        console.log("====================")
        // console logs

        $("#location-name").text(data.results[0].formatted);

        $("#map-header").text("Star Map for " + data.results[0].geometry.lat + ", " + data.results[0].geometry.lng);

        let ra = 180 + data.results[0].geometry.lng
        let de = data.results[0].geometry.lat

        $("#map-img").attr("src", "http://server1.sky-map.org/skywindow?ra=" + ra + "&de=" + de + "&zoom=4")

        // fetch("http://server1.sky-map.org/skywindow?ra=" + ra + "&de=" + de + "&angle=30&max_stars=1000&max_vmag=5", {
        //   mode: "no-cors"
        // }
        // )
        //   .then(function (response) {
        //     if (response.status !== 200) {
        //       console.log("Yikes! Skymap returned status code " + response.status);
        //       return
        //     }
        //     response.json().then(function (data) {
        //       // console logs
        //       console.log("====================")
        //       console.log(data)
        //       console.log("====================")
        //       // console logs
        //     })
        //   })

      })
    }
    )
})