var storedCities = JSON.parse(localStorage.getItem('storedCities')) || []
const searchBtn = document.getElementById('searchBtn');
var cityName = '';

if(storedCities != []){
storedCities.forEach(city=>{
  document.getElementById('searchedCities').innerHTML += `
  <a href="#" data-city="${city}" class="storedCity dropdown-item"> ${city} </a>
  `
})
};

document.addEventListener('click', event=> {
  if(event.target.classList.contains('storedCity')){
    handleSearchSubmit();
  }
})

searchBtn.addEventListener("click", handleSearchSubmit);

function handleSearchSubmit(){

  storedCities.push(cityName);

  localStorage.setItem('storedCities', JSON.stringify(storedCities));

  cityName = document.getElementById('cityName').value

  if (!cityName) {
    document.getElementById('error').textContent = "You need a search input value!";
    return;
  }

  if(document.getElementById('fiveDayContainer').innerHTML){
    document.getElementById('fiveDayContainer').innerHTML = '';
  };
  searchApi(cityName);
}

function searchApi(cityName) {

  axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=dc88d9691d36ff9db53aa82ae4744296`)
  .then(res=>{
    console.log(res.data)
    axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${res.data.city.coord.lat}&lon=${res.data.city.coord.lon}&appid=dc88d9691d36ff9db53aa82ae4744296`)
    .then(response=>{
      let uvi
      if(response.data.current.uvi<2){
        uvi= 'green'
      }else if(response.data.current.uvi<6){
        uvi= 'yellow'
      }else{
        uvi= 'red'
      }
      document.getElementById('currentContainer').innerHTML = `
        <div class="level-item has-text-centered currentImg">
          <img src="http://openweathermap.org/img/wn/${res.data.list[0].weather[0].icon}@4x.png">
          <span class="m-4 currentTitle">${res.data.city.name}</span>
          <div class="level-center has-text-centered currentContent">
            <p>${res.data.list[0].dt_txt}</p>
            <p>Temp: ${res.data.list[0].main.temp}°F</p>
            <p>Humidity: ${res.data.list[0].main.humidity} %</p>
            <p>Wind Speed: ${res.data.list[0].wind.speed} mph</p>
            <p>UVI: <p class="${uvi}">${response.data.current.uvi}</p></p>
          </div>
        </div>
      `;

      let day1 = {
        date: res.data.list[8].dt_txt,
        icon: res.data.list[8].weather[0].icon,
        temp: res.data.list[8].main.temp,
        wind: res.data.list[8].wind.speed,
        humidity: res.data.list[8].main.humidity
      }
      let day2 = {
        date: res.data.list[16].dt_txt,
        icon: res.data.list[16].weather[0].icon,
        temp: res.data.list[16].main.temp,
        wind: res.data.list[16].wind.speed,
        humidity: res.data.list[16].main.humidity
      }
      let day3 = {
        date: res.data.list[24].dt_txt,
        icon: res.data.list[24].weather[0].icon,
        temp: res.data.list[24].main.temp,
        wind: res.data.list[24].wind.speed,
        humidity: res.data.list[24].main.humidity
      }
      let day4 = {
        date: res.data.list[32].dt_txt,
        icon: res.data.list[32].weather[0].icon,
        temp: res.data.list[32].main.temp,
        wind: res.data.list[32].wind.speed,
        humidity: res.data.list[32].main.humidity
      }
      let day5 = {
        date: res.data.list[39].dt_txt,
        icon: res.data.list[39].weather[0].icon,
        temp: res.data.list[39].main.temp,
        wind: res.data.list[39].wind.speed,
        humidity: res.data.list[39].main.humidity
      }
      const fiveDayArr = [day1, day2, day3, day4, day5]
      console.log(fiveDayArr)
      fiveDayArr.forEach(days=>{
        document.getElementById('fiveDayContainer').innerHTML += `
        <div class="tile is-parent is-4x2">
          <div class="tile is-child">
                <figure class="image is-48x48">
                  <img src="http://openweathermap.org/img/wn/${days.icon}@4x.png" alt="Placeholder image">
                </figure> 
                <p class="title is-4">${days.date}</p>
            <div class="subtitle">
              <p>Temp: ${days.temp}°F</p>
              <p>Wind: ${days.wind} mph</p>
              <p>Humidity: ${days.humidity}%</p>
            </div>
          </div>
        </div>
        `
      });
    });
  });
};

