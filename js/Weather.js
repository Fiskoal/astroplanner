let Locatio = document.getElementById("search-bar");
//id="search-button"
let Locbutton = document.getElementById("search-button");
let Visbi = document.getElementById("visibility-status");
let Sunrise = document.getElementById("rise");
let Sunset = document.getElementById("set");
let CloudStatus = document.getElementById("cloud-status");
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
    //api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    let requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + pLace + '&appid=3ee6de7b8fdeda946857956b40bd39af';
    fetch(requestUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    // console.log(data.city.name);

                   //visibility
                   console.log(data.list[0].visibility);
                   para = data.list[0].visibility;
                   console.log(para);
                   let  visityInMile = para * 0.000621371;
                   console.log(visityInMile) ;
                   Visbi.textContent = " " + visityInMile + " mi";
                    
                   // surise 
                   console.log(data.city.sunrise);
                  // let lates=data.city.sunrise;
                   
                 //  calling moment function for converting UTC time to current time zone
                   let SunR = moment.unix(data.city.sunrise).format("hh:mm:ss a");
                   console.log(SunR);  
                   Sunrise.textContent = SunR;
                     
                 //  Sunset 
                   console.log(data.city.sunset); 
                   let SunS = moment.unix(data.city.sunset).format("hh:mm:ss a");
                   console.log(SunS);
                   Sunset.textContent = SunS;
                        
                   
                        
                        
                        
                       
                      
                        

                    // //cloud status
                   
                    // CloudStatus.textContent = data.list[0].weather[0].description;

                    // geting logitude and latitude 
                 //   console.log(data.city.coord.lon);
                     Longi =data.city.coord.lon;
                    //longi.textContent=data.city.coord[1];
                    console.log(Longi);
                    Lati=data.city.coord.lat;
                    console.log(Lati);


                    let apiURL= 'https://api.openweathermap.org/data/2.5/onecall?lat='+ Longi + '&lon='+ Lati +'&appid=3ee6de7b8fdeda946857956b40bd39af';
                    console.log(apiURL);
                    fetch(apiURL)
                    .then(function(response){
                        return response.json();
                        console.log(response);
                    })
                    .then(function (data) {
                        console.log(data)
                        //cloud status
                        console.log(data.daily[0].weather[0].description);
                        CloudStatus.textContent =data.daily[0].weather[0].description;

                        // SunRise 
                        //let SunR = moment.unix(1615480953).format("hh:mm:ss a");
                       // console.log(SunR);

//data.current.sunrise


                        // console.log(data.hourly[5].dt);
                        // let tiMe7=moment.unix(data.hourly[19].dt).format("hh:mm:ss a");
                        // let tiMe11=moment.unix(data.hourly[23].dt).format("hh:mm:ss a");
                        // console.log(tiMe7);
                        // console.log(tiMe11);

                        


                        
                      });


                    
                









                })
            }
        })

}

Locbutton.addEventListener('click', formSubmitHandler);


