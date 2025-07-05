let searchBox = document.querySelector("#search");
searchBox.addEventListener('keydown', (event)=>{
    let key = event.key;

    if(key === "Enter") {
        search();
    }

})

let searchButton = document.querySelector("#search-button").addEventListener('click', ()=>{
    search();
})

function search() {
    let apikey = "8bb1275231afad8b9ec910cd6f639605";
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?&unit=metric&q=";
    let city = searchBox.value;
    if(city === "") {
        document.querySelector(".erro").style.display = "block";
        document.querySelector(".erro").innerHTML = "please enter a city name!!";
        document.querySelector(".section").style.display = "none";

        return;
    }
    async function checkWeather(city) {
        const respond = await fetch(apiUrl + city +`&appid=${apikey}`);
        
        if(respond.status === "404") {
            document.querySelector(".city-name").innerHTML = `<p>City not found</p>`;
            document.querySelector(".weather-dg").innerHTML = `<p>0°C</p>`;
            document.querySelector(".humidity-value").innerHTML = `0%`;
            document.querySelector(".speed-value").innerHTML = `0 m/s`;
            document.querySelector(".weather-icon").innerHTML = `<i class="fa-solid fa-question"></i>`;
            // document.querySelector(".erro").style.display = "block";
            // document.querySelector(".section").style.display = "none";
            // document.querySelector(".erro").innerHTML = "the city name not found";
            return;
        }
        else{
             const data = await respond.json();
            console.log(data);
            
            document.querySelector(".section").style.display = "block";
            document.querySelector(".erro").style.display = "none";
            

            let cityName = document.querySelector(".city-name").innerHTML = `<p>${data.name}</p>`;
            document.querySelector(".weather-dg").innerHTML = `<p>${Math.floor(data.main.temp)}°C</p>`;
            document.querySelector(".humidity-value").innerHTML = `${data.main.humidity}%`;
            document.querySelector(".speed-value").innerHTML = `${data.wind.speed} m/s`;

            
        

            if(data.weather[0].main === "Clouds") {
                document.querySelector(".weather-icon").innerHTML = `<i class="fa-solid fa-cloud"></i>`;
            }
            else if(data.weather[0].main === "Clear") {
                document.querySelector(".weather-icon").innerHTML = `<i class="fa-solid fa-sun"></i>`;
            }
            else if(data.weather[0].main === "Rain") {
                document.querySelector(".weather-icon").innerHTML = `<i class="fa-solid fa-cloud-showers-heavy"></i>`;
            }
            else if(data.weather[0].main === "Snow") {
                document.querySelector(".weather-icon").innerHTML = `<i class="fa-solid fa-snowflake"></i>`;
            }
            else if(data.weather[0].main === "Thunderstorm") {
                document.querySelector(".weather-icon").innerHTML = `<i class="fa-solid fa-bolt"></i>`;
            }
    
            else {
                document.querySelector(".weather-icon").innerHTML = `<i class="fa-solid fa-smog"></i>`;
            }
            }
       

       
  

    }
    checkWeather(city);
}


