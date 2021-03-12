let Locatio = document.getElementById("search-bar");
let Locbutton = document.getElementById("search-button");
let Visbi = document.getElementById("visibility-status");
let Sunrise = document.getElementById("sunrise-time");
let Sunset = document.getElementById("sunset-time");
let CloudStatus = document.getElementById("visibility-desc");
let H3ours = document.getElementById("soon");
let H6ours = document.getElementById("later")
let Longi;
let Lati;

let formSubmitHandler = function (event) {
    event.preventDefault();

    let uSer = Locatio.value.trim();

    if (uSer) {
        getWeatherApi(uSer);
        Locatio.value = "";
    }
};

let getWeatherApi = function (pLace) {
    let requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + pLace + '&appid=3ee6de7b8fdeda946857956b40bd39af';
    fetch(requestUrl)
        .then(function (response) {
            if (response.ok) {

                response.json().then(function (data) {
                    console.log(data);

                    //visibility
                    console.log(data.list[0].visibility);
                    para = data.list[0].visibility;
                    //console.log(para);
                    let visityInMile = para * 0.000621371;
                    //console.log(visityInMile);
                    Visbi.textContent = " " + visityInMile + " mi";

                    // surise 
                    //  calling moment function for converting UTC time to current time zone
                    let SunR = moment.unix(data.city.sunrise).format("hh:mm:ss a");
                    Sunrise.textContent = SunR;


                    //  Sunset 
                    let SunS = moment.unix(data.city.sunset).format("hh:mm:ss a");
                    //console.log(SunS);
                    Sunset.textContent = SunS;

                    // Getting Latitude & Longitude 
                    Longi = data.city.coord.lon;
                    Lati = data.city.coord.lat;
                    // console.log(Longi);
                    //console.log(Lati);

                    // New API 
                    let apiURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + Longi + '&lon=' + Lati + '&appid=3ee6de7b8fdeda946857956b40bd39af';
                    console.log(apiURL);
                    fetch(apiURL)
                        .then(function (response) {
                            return response.json();

                        })
                        .then(function (data) {
                            console.log(data)
                            //cloud status currently
                            CloudStatus.textContent = data.current.weather[0].description;
                            // Cloud status after 3 hours
                            H3ours.textContent = data.hourly[2].weather[0].description;
                            // Cloud status after 6 hours
                            console.log(data.hourly[5].weather[0].description);
                            H6ours.textContent = data.hourly[5].weather[0].description;

                        });


                })
            }
        })

}

Locbutton.addEventListener('click', formSubmitHandler);


